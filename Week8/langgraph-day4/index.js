// CLI Chatbot with branching (Gemini + Calculator)
import * as dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import readline from "readline";
import chalk from "chalk";
import { evaluate } from "mathjs";

import { Client as LangSmithClient } from "langsmith";
import { LangChainTracer } from "langchain/callbacks";

// --- Initialize LangSmith
const langsmithClient = new LangSmithClient({
    apiKey: process.env.LANGCHAIN_API_KEY,
});
const tracer = new LangChainTracer({
    projectName: process.env.LANGCHAIN_PROJECT || "GeminiCalcBot",
    client: langsmithClient,
});

// --- 1. Initialize Gemini model
const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.5-flash",
});

// --- 2. Tool: Calculator (using mathjs)
const calculator = async (state) => {
    const lastUser = state.messages[state.messages.length - 1].content;

    try {
        const result = evaluate(lastUser); // mathjs safely evaluates expressions
        return { messages: [{ role: "assistant", content: `Result: ${result}` }] };
    } catch (err) {
        return {
            messages: [
                { role: "assistant", content: "Sorry, I couldn't calculate that." },
            ],
        };
    }
};

// --- 3. Node: Gemini AI for normal chat
const callModel = async (state) => {
    const response = await model.invoke(state.messages, { callbacks: [tracer] });
    return { messages: [response] };
};

// --- 4. Node: Math detector + expression parser (using LLM)
const mathDetector = async (state) => {
    const lastUser = state.messages[state.messages.length - 1].content;

    const prompt = `
You are a math parser.
Task: Decide if the user is asking a math calculation.
If yes, return ONLY strict JSON: {"isMath": true, "expression": "<math expression>"}.
If no, return {"isMath": false}.

User input: "${lastUser}"
`;

    let parsed;
    try {
        const resp = await model.invoke([{ role: "user", content: prompt }], {
            callbacks: [tracer],
        });

        // Clean response: remove markdown fences/backticks
        let clean = resp.content.trim();
        clean = clean.replace(/```json/i, "").replace(/```/g, "").trim();

        parsed = JSON.parse(clean);

        if (parsed && parsed.isMath && typeof parsed.expression === "string") {
            return {
                messages: [
                    { role: "user", content: parsed.expression }, // clean expression
                ],
                next: "calculator",
            };
        }
    } catch (err) {
        console.warn("⚠️ MathDetector fallback:", err.message);
    }


    // fallback → normal chatbot
    return { messages: state.messages, next: "chatbot" };
};


// --- 5. Router using mathDetector
const router = async (state) => {
    const result = await mathDetector(state);
    return result.next;
};

// --- 6. Build Graph
const graph = new StateGraph(MessagesAnnotation)
    .addNode("chatbot", callModel)
    .addNode("calculator", calculator)
    .addConditionalEdges("__start__", router, {
        calculator: "calculator",
        chatbot: "chatbot",
    });

// Compile app
const app = graph.compile({ callbacks: [tracer] });

// --- 7. CLI setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log(
    chalk.green("🤖 Gemini + Calculator Chatbot started! Type 'exit' to quit.")
);

async function ask(state = { messages: [] }) {
    rl.question(chalk.blue("You: "), async (input) => {
        if (input.toLowerCase() === "exit") {
            rl.close();
            console.log(chalk.green("Chatbot ended. Goodbye!"));
            return;
        }

        try {
            const newState = await app.invoke({
                messages: [...state.messages, { role: "user", content: input }],
            });

            const lastMessage = newState.messages[newState.messages.length - 1];
            console.log(chalk.yellow("AI:"), lastMessage.content);

            ask(newState);
        } catch (err) {
            console.error(chalk.red("Error:"), err.message);
            ask(state);
        }
    });
}

ask();

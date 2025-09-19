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
    model: "gemini-1.5-flash",
});

// --- 2. Tool: Calculator (using mathjs)
function isMathExpression(input) {
    // crude check: only numbers, + - * / () .
    return /^[0-9+\-*/().\s]+$/.test(input);
}

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


// --- 3. Node: Gemini AI
const callModel = async (state) => {
    const response = await model.invoke(state.messages, { callbacks: [tracer] });
    return { messages: [response] };
};

// --- 4. Router: decide branch
const router = async (state) => {
    const lastUser = state.messages[state.messages.length - 1].content;
    if (isMathExpression(lastUser)) {
        return "calculator";
    }
    return "chatbot";
};

// --- 5. Build Graph
const graph = new StateGraph(MessagesAnnotation)
    .addNode("chatbot", callModel)
    .addNode("calculator", calculator)
    .addConditionalEdges("__start__", router, {
        calculator: "calculator",
        chatbot: "chatbot",
    });

// Compile app
const app = graph.compile({ callbacks: [tracer] });

// --- 6. CLI setup
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

            const lastMessage =
                newState.messages[newState.messages.length - 1];
            console.log(chalk.yellow("AI:"), lastMessage.content);

            ask(newState);
        } catch (err) {
            console.error(chalk.red("Error:"), err.message);
            ask(state);
        }
    });
}

ask();

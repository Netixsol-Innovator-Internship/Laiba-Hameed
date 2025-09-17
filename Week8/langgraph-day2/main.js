// CLI Chatbot using Gemini model with LangGraph
import * as dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import readline from "readline";
import chalk from "chalk"; 

// 1. Initialize Gemini model
const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-1.5-flash",
});

// 2. Node function to call the AI
const callModel = async (state) => {
    const response = await model.invoke(state.messages);
    return { messages: [response] };
};

// 3. Create a LangGraph state graph to maintain conversation
const graph = new StateGraph(MessagesAnnotation)
    .addNode("chatbot", callModel)
    .addEdge("__start__", "chatbot");

const app = graph.compile();

// 4. Setup CLI interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log(chalk.green("🤖 Gemini LangGraph Chatbot started! Type 'exit' to quit."));

async function ask(state = { messages: [] }) {
    rl.question(chalk.blue("You: "), async (input) => {
        if (input.toLowerCase() === "exit") {
            rl.close();
            console.log(chalk.green("Chatbot ended. Goodbye!"));
            return;
        }

        try {
            // Invoke LangGraph with conversation history
            const newState = await app.invoke({
                messages: [...state.messages, { role: "user", content: input }],
            });

            // Get last AI message
            const lastMessage =
                newState.messages[newState.messages.length - 1];
            console.log(chalk.yellow("AI:"), lastMessage.content);

            // Continue conversation with updated state
            ask(newState);
        } catch (err) {
            console.error(chalk.red("Error:"), err.message);
            ask(state); // retry without losing history
        }
    });
}

ask();
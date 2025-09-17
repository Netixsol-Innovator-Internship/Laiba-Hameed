import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";

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

const appAI = graph.compile();

// 4. Express server setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

let conversationState = { messages: [] }; // Keep track of conversation per server instance

// 5. API endpoint for chat
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    try {
        // Add user message to state
        conversationState.messages.push({ role: "user", content: message });

        // Get AI response
        const newState = await appAI.invoke(conversationState);
        const lastMessage = newState.messages[newState.messages.length - 1];

        // Update conversation state
        conversationState = newState;

        res.json({ response: lastMessage.content });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ error: "Failed to get AI response" });
    }
});

// 6. Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🤖 Gemini AI server running on http://localhost:${PORT}`);
});

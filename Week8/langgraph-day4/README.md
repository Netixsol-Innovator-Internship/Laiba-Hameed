# LangGraph Day 4: CLI Chatbot with Calculator Tool

This project is a CLI chatbot application built with Node.js that can answer both math questions and general chat queries. If you type a math expression (e.g., `2+5`), the assistant will calculate and return the answer. For other inputs, it continues as a chatbot using Gemini. LangGraph Day 2 Chatbot App

This project is a simple chatbot application built with Node.js.

## Setup Instructions

1. **Clone the repository**  
    ```bash
    git clone <repository-url>
    cd langgraph-day2
    ```

2. **Install dependencies**  
    ```bash
    npm install
    ```

3. **Configure environment variables**  
    Create a `.env` file in the root directory and add your Gemini API key:
    ```
    GEMINI_API_KEY=
    ```

4. **Run the application**  
    ```bash
    node main.js
    ```

## Chatbot App Usage

- Start the app as described above.
- Interact with the chatbot via the terminal or as specified in your implementation.

---

**Note:**  
Ensure you have Node.js and npm installed on your system.

## Examples
🤖 Gemini + Calculator Chatbot started! Type 'exit' to quit.
You: hi
AI: Hello! How are you doing today?

You: 2+5
AI: Result: 7

You: (10 * 3) - 4
AI: Result: 26

You: tell me a joke
AI: Why don’t skeletons fight each other? They don’t have the guts.

You: 100/0
AI: Sorry, I couldn't calculate that.

You: exit
Chatbot ended. Goodbye!

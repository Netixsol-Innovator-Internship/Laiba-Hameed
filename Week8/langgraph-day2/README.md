# LangGraph Day 2 Chatbot App

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


# LangGraph Day 2 Chatbot App with UI

This project extends the basic chatbot by providing a user-friendly web interface built with Node.js and Express, allowing users to interact with the chatbot directly from their browser.

## Features

- **Web-based Chat Interface:**  
    Communicate with the chatbot through a responsive and intuitive web UI.

- **Real-time Messaging:**  
    Messages are sent and received instantly without page reloads.

- **API Integration:**  
    Utilizes the Gemini API for intelligent chatbot responses.

- **Markdown Formatting Support:**  
    The chatbot can reply with formatted text, including **bold**, *italic*, and inline `code` snippets for enhanced readability.

- **Environment Configuration:**  
    Securely manage API keys and configuration using environment variables.

- **Easy Setup:**  
    Simple installation and startup process.

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
    PORT=3000
    ```

4. **Run the application**  
    ```bash
    node index.js
    ```

5. **Access the Chatbot UI**  
    run the html file and start chatting

## Chatbot UI Usage

- Type your message in the input box and press Enter or click Send.
- The chatbot will respond in real time within the chat window.
- The chatbot supports markdown formatting in its replies, including bold, italic, and code blocks.
- All interactions are handled securely and efficiently.

---

**Note:**  
Ensure you have Node.js and npm installed on your system.  

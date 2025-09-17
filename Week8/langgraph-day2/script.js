class AIChatInterface {
    constructor() {
        this.messages = [];
        this.isProcessing = false;
        this.initializeElements();
        this.setupEventListeners();
        this.focusInput();
    }

    initializeElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.statusText = document.getElementById('statusText');
        this.connectionStatus = document.getElementById('connectionStatus');
    }

    setupEventListeners() {
        // Send button click
        this.sendButton.addEventListener('click', () => this.handleSend());

        // Enter key handling
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        // Auto-resize textarea
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        });
    }

    focusInput() {
        this.messageInput.focus();
    }

    async handleSend() {
        const message = this.messageInput.value.trim();
        if (!message || this.isProcessing) return;

        // Add user message
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';

        // Show processing state
        this.setProcessing(true);

        try {
            // Simulate API call (replace with actual API integration)
            const response = await this.callAI(message);
            this.addMessage(response, 'ai');
        } catch (error) {
            this.showError('Failed to get AI response. Please try again.');
        } finally {
            this.setProcessing(false);
            this.focusInput();
        }
    }

    async callAI(message) {
        // Add user message to conversation history
        this.messages.push({ role: "user", content: message });

        try {
            const response = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });
            const data = await response.json();
            if (data.response) {
                // Add AI response to conversation history
                this.messages.push({ role: "assistant", content: data.response });
                return data.response;
            } else {
                throw new Error("No response from AI");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch AI response");
        }
    }


    addMessage(content, type) {
        const welcomeMessage = this.chatMessages.querySelector('.welcome-message');
        if (welcomeMessage) welcomeMessage.remove();

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';

        // Convert Markdown to HTML
        bubbleDiv.innerHTML = marked.parse(content);

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.appendChild(bubbleDiv);
        messageDiv.appendChild(timeDiv);
        this.chatMessages.appendChild(messageDiv);

        this.scrollToBottom();
    }

    setProcessing(processing) {
        this.isProcessing = processing;
        this.sendButton.disabled = processing;
        this.messageInput.disabled = processing;

        if (processing) {
            this.typingIndicator.style.display = 'flex';
            this.statusText.textContent = 'AI is thinking...';
            this.connectionStatus.className = 'connection-status';
        } else {
            this.typingIndicator.style.display = 'none';
            this.statusText.textContent = 'Ready to chat';
        }

        this.scrollToBottom();
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.chatMessages.appendChild(errorDiv);
        this.scrollToBottom();

        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }
}

// Initialize the chat interface when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AIChatInterface();
});

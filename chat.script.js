document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    
    // --- Theme switcher logic ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('carlosTheme');
        if (savedTheme === 'light') {
            body.classList.add('light-theme');
        }
    };

    const toggleTheme = () => {
        body.classList.toggle('light-theme');
        localStorage.setItem('carlosTheme', body.classList.contains('light-theme') ? 'light' : 'dark');
    };

    applySavedTheme();
    themeSwitcher.addEventListener('click', toggleTheme);
    // --- End theme logic ---

    // Function to add a message to the chat window
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const p = document.createElement('p');
        p.textContent = message;
        
        messageDiv.appendChild(p);
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to bottom
        return p; // Return the paragraph element for the typewriter
    }

    // Typewriter function for AI responses
    function typewriterForAi(text, pElement) {
        let i = 0;
        const speed = 20;
        pElement.textContent = '';
        pElement.classList.add('typing');

        function type() {
            if (i < text.length) {
                pElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                pElement.classList.remove('typing');
            }
        }
        type();
    }

    // Handle form submission
    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userInput = chatInput.value.trim();
        if (userInput === '') return;

        addMessage(userInput, 'user');
        chatInput.value = '';

        // Show thinking indicator
        const thinkingMessage = addMessage("...", 'ai');
        thinkingMessage.classList.add('typing');

        try {
            const response = await fetch('/api/ask-carlos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: userInput
                    // No contextFact is sent here, so the backend knows it's a general question
                }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            // Remove typing indicator and start typewriter for the real answer
            thinkingMessage.classList.remove('typing');
            typewriterForAi(data.answer, thinkingMessage);

        } catch (error) {
            thinkingMessage.classList.remove('typing');
            thinkingMessage.textContent = "Sorry, an error occurred. Please try again.";
            console.error('Error:', error);
        }
    });
});

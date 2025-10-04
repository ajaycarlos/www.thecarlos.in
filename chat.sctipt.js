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

    // Function to add a message to the chat window (UPDATED for terminal style)
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'user') {
            messageDiv.textContent = message;
        }
        
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageDiv; // Return the div for the typewriter
    }

    // Typewriter function for AI responses (UPDATED for terminal style)
    function typewriterForAi(text, divElement) {
        let i = 0;
        const speed = 20;
        divElement.textContent = '';
        divElement.classList.add('typing');

        function type() {
            if (i < text.length) {
                divElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                divElement.classList.remove('typing');
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

        const thinkingMessage = addMessage("", 'ai'); // Create an empty AI message line

        try {
            const response = await fetch('/api/ask-carlos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: userInput
                }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            typewriterForAi(data.answer, thinkingMessage);

        } catch (error) {
            thinkingMessage.classList.remove('typing');
            thinkingMessage.textContent = "Sorry, an error occurred. Please try again.";
            console.error('Error:', error);
        }
    });

    // Initial welcome message typewriter
    const welcomeMessage = document.querySelector('.ai-message');
    if (welcomeMessage) {
        const welcomeText = welcomeMessage.textContent;
        typewriterForAi(welcomeText, welcomeMessage);
    }
});

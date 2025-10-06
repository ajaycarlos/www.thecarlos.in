document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    let thinkingInterval = null; // To hold the interval for the thinking animation
    
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

    // --- NEW: "Living AI" Thinking Animation ---
    function startThinkingAnimation(divElement) {
        // Stop any previous animation
        if (thinkingInterval) clearInterval(thinkingInterval);
        
        const characters = ['▓', '▒', '░'];
        let count = 0;
        
        thinkingInterval = setInterval(() => {
            let dots = '';
            for (let i = 0; i < 3; i++) {
                dots += characters[(count + i) % characters.length];
            }
            divElement.textContent = `Processing${dots}`;
            count++;
        }, 150); // Update speed
    }

    function stopThinkingAnimation() {
        if (thinkingInterval) {
            clearInterval(thinkingInterval);
            thinkingInterval = null;
        }
    }

    // Function to add a message to the chat window
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = message;
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageDiv;
    }

    // Typewriter function for AI responses
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

    // Handle form submission (UPDATED)
    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userInput = chatInput.value.trim();
        if (userInput === '') return;

        addMessage(userInput, 'user');
        chatInput.value = '';

        // Show thinking indicator
        const thinkingMessage = addMessage("", 'ai');
        startThinkingAnimation(thinkingMessage); // Start the new animation

        try {
            const response = await fetch('/api/ask-carlos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: userInput
                }),
            });
            
            stopThinkingAnimation(); // Stop the animation once response is received

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            typewriterForAi(data.answer, thinkingMessage);

        } catch (error) {
            stopThinkingAnimation(); // Also stop the animation on error
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

document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatButton = chatForm.querySelector('button'); // Select the submit button
    
    let thinkingInterval = null; 
    
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

    // --- Thinking Animation ---
    function startThinkingAnimation(divElement) {
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
        }, 150);
    }

    function stopThinkingAnimation() {
        if (thinkingInterval) {
            clearInterval(thinkingInterval);
            thinkingInterval = null;
        }
    }

    // Securely add message (Using textContent prevents XSS)
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = message; // SECURITY: textContent prevents HTML injection
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
                chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll while typing
                setTimeout(type, speed);
            } else {
                divElement.classList.remove('typing');
            }
        }
        type();
    }

    // Handle form submission with UI Locking
    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userInput = chatInput.value.trim();
        if (userInput === '') return;

        // 1. Lock UI to prevent spam/abuse
        chatInput.disabled = true;
        if (chatButton) chatButton.disabled = true;

        addMessage(userInput, 'user');
        chatInput.value = '';

        const thinkingMessage = addMessage("", 'ai');
        startThinkingAnimation(thinkingMessage);

        try {
            const response = await fetch('/api/ask-carlos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: userInput
                }),
            });
            
            stopThinkingAnimation();

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            typewriterForAi(data.answer, thinkingMessage);

        } catch (error) {
            stopThinkingAnimation();
            thinkingMessage.textContent = "Connection error. Please try again.";
            console.error('Error:', error);
        } finally {
            // 2. Unlock UI always
            chatInput.disabled = false;
            if (chatButton) chatButton.disabled = false;
            chatInput.focus(); // Restore focus for better UX
        }
    });

    // Initial welcome message typewriter
    const welcomeMessage = document.querySelector('.ai-message');
    if (welcomeMessage) {
        const welcomeText = welcomeMessage.textContent;
        typewriterForAi(welcomeText, welcomeMessage);
    }
});
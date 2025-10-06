document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    let thinkingInterval = null;
    
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

    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        // Use createTextNode for security and to prevent HTML injection
        messageDiv.appendChild(document.createTextNode(message));
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageDiv;
    }

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

    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userInput = chatInput.value.trim();
        if (userInput === '') return;
        addMessage(`USER> ${userInput}`, 'user');
        chatInput.value = '';
        const thinkingMessage = addMessage("", 'ai');
        thinkingMessage.textContent = "C.A.R.L.O.S> ";
        const aiResponseSpan = document.createElement('span');
        thinkingMessage.appendChild(aiResponseSpan);
        startThinkingAnimation(aiResponseSpan);
        try {
            const response = await fetch('/api/ask-carlos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: userInput }),
            });
            stopThinkingAnimation();
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            typewriterForAi(data.answer, aiResponseSpan);
        } catch (error) {
            stopThinkingAnimation();
            aiResponseSpan.textContent = "Sorry, an error occurred. Please try again.";
            console.error('Error:', error);
        }
    });

    const welcomeMessage = document.querySelector('.ai-message');
    if (welcomeMessage) {
        const welcomeText = welcomeMessage.textContent.trim();
        welcomeMessage.textContent = ''; // Clear it before typing
        typewriterForAi(welcomeText, welcomeMessage);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    let isAiResponding = false;

    const delay = ms => new Promise(res => setTimeout(res, ms));

    function softTypewriter(text, divElement, onComplete) {
        divElement.innerHTML = '';
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.animationDelay = `${index * 100}ms`;
            divElement.appendChild(span);
        });
        setTimeout(() => {
            if (onComplete) onComplete();
        }, words.length * 100 + 500); // Wait for animation to finish
    }

    function addMessage(message, sender, isThinking = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        if (!isThinking) {
            softTypewriter(message, messageDiv);
        } else {
            messageDiv.textContent = message;
        }
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageDiv;
    }
    
    async function runBreathingExercise(steps) {
        for (const step of steps) {
            const stepMessage = addMessage(step.text, 'ai');
            await delay(1200);

            for (let i = step.duration; i > 0; i--) {
                stepMessage.textContent = `${step.text} ${i}...`;
                await delay(1000);
            }
        }
        addMessage("Well done. I hope that helped bring a moment of calm.", 'ai');
        isAiResponding = false;
    }

    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (isAiResponding) return;

        const userInput = chatInput.value.trim();
        if (userInput === '') return;

        addMessage(userInput, 'user');
        chatInput.value = '';
        isAiResponding = true;

        const thinkingMessage = addMessage("...", 'ai', true);

        try {
            const response = await fetch('/api/ask-sanctuary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: userInput }),
            });

            if (!response.ok) throw new Error('Network response error');
            
            const data = await response.json();
            
            thinkingMessage.remove();

            if (data.action === 'breathe') {
                runBreathingExercise(data.steps);
            } else {
                addMessage(data.answer, 'ai');
                isAiResponding = false;
            }

        } catch (error) {
            thinkingMessage.remove();
            addMessage("I'm sorry, I encountered a connection error. Please try again.", 'ai');
            isAiResponding = false;
            console.error('Error:', error);
        }
    });

    // Initial welcome disclaimer
    const initialMessageDiv = document.createElement('div');
    initialMessageDiv.className = 'message ai-message';
    chatWindow.appendChild(initialMessageDiv);
    softTypewriter("I am an AI, not a therapist. For crises, please seek professional help.", initialMessageDiv);
});

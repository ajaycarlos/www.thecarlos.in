function startCalmBackground() {
    const canvas = document.getElementById('calm-background');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 1.5 + 0.5;
            this.speed = Math.random() * 0.3 + 0.1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
            this.angle = Math.random() * Math.PI * 2;
        }

        update() {
            this.y -= this.speed;
            this.angle += this.fadeSpeed;
            this.opacity = Math.abs(Math.sin(this.angle));

            if (this.y < -this.radius) {
                this.y = height + this.radius;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(234, 234, 234, ${this.opacity})`;
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();
}


document.addEventListener("DOMContentLoaded", () => {
    startCalmBackground();

    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    let isAiResponding = false;
    
    // EDITED: Added the theme switcher logic
    const themeSwitcher = document.getElementById('theme-switcher');
    if(themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            const isLightTheme = document.documentElement.classList.toggle('light-theme');
            localStorage.setItem('carlosTheme', isLightTheme ? 'light' : 'dark');
        });
    }

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
        }, words.length * 100 + 500);
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

// ========================
// 1️⃣ Global Variables
let knowledgeBits = [];
let currentFact = {};
let isTyping = false;
let isAiResponding = false;


// ========================
// 2️⃣ Function to load knowledge from JSON file
async function loadKnowledgeBits() {
    try {
        const response = await fetch('knowledge.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        knowledgeBits = await response.json();
    } catch (error) {
        console.error("Could not load knowledge bits:", error);
        knowledgeBits = [{
            fact: "Error: Could not load facts.",
            explanation: "The knowledge.json file could not be loaded."
        }];
    }
}

// ========================
// 3️⃣ localStorage Helper Functions
function getSeenFacts() {
    const seen = localStorage.getItem('carlosSeenFacts');
    return seen ? JSON.parse(seen) : [];
}

function addSeenFact(index) {
    let seen = getSeenFacts();
    if (!seen.includes(index)) {
        seen.push(index);
        localStorage.setItem('carlosSeenFacts', JSON.stringify(seen));
    }
}


// ========================
// 4️⃣ Live Clock (India Time)
function startLiveClock() {
    const clockElement = document.getElementById("live-clock");
    function updateClock() {
        const now = new Date();
        const istOffset = 5.5 * 60;
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const istTime = new Date(utc + istOffset * 60000);
        const hours = String(istTime.getHours()).padStart(2, '0');
        const minutes = String(istTime.getMinutes()).padStart(2, '0');
        const seconds = String(istTime.getSeconds()).padStart(2, '0');
        clockElement.innerText = `${hours}:${minutes}:${seconds}`;
    }
    updateClock();
    setInterval(updateClock, 1000);
}

// ========================
// 5️⃣ Random Knowledge Bit
function showKnowledgeBit() {
    if (knowledgeBits.length === 0) return;
    let seenFacts = getSeenFacts();
    let availableIndices = knowledgeBits.map((_, i) => i).filter(i => !seenFacts.includes(i));
    if (availableIndices.length === 0) {
        localStorage.removeItem('carlosSeenFacts');
        availableIndices = knowledgeBits.map((_, i) => i);
    }
    const randomAvailableIndex = Math.floor(Math.random() * availableIndices.length);
    const newFactIndex = availableIndices[randomAvailableIndex];
    currentFact = knowledgeBits[newFactIndex];

    document.getElementById('ask-carlos-trigger').style.visibility = 'hidden';
    document.getElementById('ask-carlos-trigger').style.opacity = '0';
    document.body.classList.remove('ai-modal-open');

    const factTextElement = document.getElementById("knowledge-bit-text");
    const explanationElement = document.getElementById("knowledge-explanation");
    explanationElement.innerHTML = '';
    isTyping = false;
    isAiResponding = false;
    if (currentFact && currentFact.fact) {
        factTextElement.innerText = currentFact.fact;
        addSeenFact(newFactIndex);
    }
}

// ========================
// 6️⃣ Typewriter Effect
function typeWriter() {
    const explanation = currentFact.explanation || '';
    if (isTyping || !explanation) return;

    const explanationElement = document.getElementById("knowledge-explanation");
    const askTrigger = document.getElementById('ask-carlos-trigger');
    explanationElement.innerHTML = '';
    explanationElement.classList.add('typing');
    isTyping = true;
    let i = 0;
    const speed = 30;
    function type() {
        if (i < explanation.length) {
            explanationElement.innerHTML += explanation.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            explanationElement.classList.remove('typing');
            isTyping = false;
            
            askTrigger.style.visibility = 'visible';
            askTrigger.style.opacity = '1';
        }
    }
    type();
}

// ========================
// 7️⃣ Accumulating Letters Animation (UPDATED)
function animateAiResponse(text) {
    const responseArea = document.getElementById('ai-response-area');
    responseArea.innerHTML = '';
    isAiResponding = true;

    const words = text.split(/(\s+)/);
    let charCount = 0;

    words.forEach(word => {
        if (word.trim() === '') {
            responseArea.append(document.createTextNode(word));
            return;
        }

        word.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.textContent = char;

            // EDITED: Increased the random range for a full-screen effect
            const x = (Math.random() - 0.5) * 1000; // Increased horizontal range
            const y = (Math.random() - 0.5) * 600;  // Increased vertical range
            const rot = (Math.random() - 0.5) * 720; // More rotation
            charSpan.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
            
            // EDITED: Slightly faster stagger effect
            charSpan.style.transitionDelay = `${charCount * 0.015}s`;

            responseArea.appendChild(charSpan);
            charCount++;
        });
    });

    setTimeout(() => {
        const allChars = responseArea.querySelectorAll('.char');
        allChars.forEach(char => {
            char.style.opacity = '1';
            char.style.transform = 'translate(0, 0) rotate(0deg)';
        });
    }, 100);
    
    setTimeout(() => {
        isAiResponding = false;
    }, (charCount * 15) + 1500);
}


// ========================
// 8️⃣ Video Animation + Logo Fade-in
function startAnimations() {
    const video = document.getElementById("intro-video");
    const elementsToFadeIn = [
        document.getElementById("logo"),
        document.getElementById("since-text"),
        document.getElementById("since-logo-text"),
        document.getElementById("footer-text"),
        document.getElementById("live-clock")
    ];
    let animationHasRun = false;
    const runExitAnimation = () => {
        if (animationHasRun) return;
        animationHasRun = true;
        video.style.transition = "all 2s ease";
        video.style.transform = "scale(0.1)";
        video.style.opacity = "0";
        elementsToFadeIn.forEach(el => el.style.opacity = "1");
        setTimeout(() => {
            document.getElementById("video-container").style.display = "none";
            document.getElementById("main-content-container").style.opacity = "1";
        }, 2000);
    };
    video.addEventListener('ended', runExitAnimation);
    video.play().catch(error => {
        console.error("Autoplay was prevented. Starting animation immediately.", error);
        runExitAnimation();
    });
    setTimeout(runExitAnimation, 7000);
}


// ========================
// 9️⃣ Share Functionality
async function shareFact() {
    const factTextElement = document.getElementById("knowledge-bit-text");
    const shareText = `Check out this fact from The C.A.R.L.O.S Project:\n\n"${factTextElement.innerText}"\n\nwww.thecarlos.in`;
    const shareData = {
        title: 'A Fact from The C.A.R.L.O.S Project',
        text: `"${factTextElement.innerText}"`,
        url: 'https://www.thecarlos.in'
    };
    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.error('Share failed:', err);
        }
    } else {
        try {
            await navigator.clipboard.writeText(shareText);
            const shareButton = document.getElementById('share-button');
            const originalIcon = shareButton.innerHTML;
            shareButton.innerHTML = 'Copied!';
            setTimeout(() => {
                shareButton.innerHTML = originalIcon;
            }, 1500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }
}


// ========================
// 10️⃣ Start everything when DOM content loaded
document.addEventListener("DOMContentLoaded", async () => {
    const body = document.body;

    // --- Theme switcher logic ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const applySavedTheme = () => {
        if (localStorage.getItem('carlosTheme') === 'light') {
            body.classList.add('light-theme');
        }
    };
    const toggleTheme = () => {
        body.classList.toggle('light-theme');
        localStorage.setItem('carlosTheme', body.classList.contains('light-theme') ? 'light' : 'dark');
    };
    applySavedTheme();
    themeSwitcher.addEventListener('click', toggleTheme);
    
    // --- Sidebar toggle logic ---
    document.getElementById('logo').addEventListener('click', (event) => {
      event.preventDefault();
      body.classList.toggle('sidebar-open');
    });
    
    document.getElementById('sidebar-close-button').addEventListener('click', () => {
        body.classList.remove('sidebar-open');
    });
    
    // --- Load initial content ---
    await loadKnowledgeBits(); 
    showKnowledgeBit();
    startLiveClock();
    startAnimations();
    
    // --- Main event listeners ---
    document.getElementById("knowledge-box").addEventListener("click", () => {
        const explanationElement = document.getElementById("knowledge-explanation");
        const askTrigger = document.getElementById('ask-carlos-trigger');

        if (explanationElement.innerHTML !== '' && !isTyping) {
            explanationElement.innerHTML = '';
            askTrigger.style.opacity = '0';
            askTrigger.style.visibility = 'hidden';
        } 
        else if (explanationElement.innerHTML === '' && !isTyping) {
            typeWriter();
        }
    });

    document.getElementById("refresh-button").addEventListener("click", (event) => {
        event.stopPropagation();
        showKnowledgeBit();
    });
    
    document.getElementById("share-button").addEventListener("click", (event) => {
        event.stopPropagation();
        shareFact();
    });

    // --- AI Chat MODAL Listeners ---
    document.getElementById('ask-carlos-trigger').addEventListener('click', (event) => {
        event.stopPropagation();
        body.classList.add('ai-modal-open');
    });
    
    document.getElementById('ai-modal-close-button').addEventListener('click', () => {
        body.classList.remove('ai-modal-open');
    });

    document.getElementById('ai-chat-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        if (isAiResponding) return;

        const input = document.getElementById('ai-chat-input');
        const userInput = input.value.trim();
        if (userInput === '') return;
        
        const responseArea = document.getElementById('ai-response-area');
        responseArea.innerHTML = 'C.A.R.L.O.S. is thinking...';
        input.value = '';

        try {
            const response = await fetch('/api/ask-carlos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: userInput,
                    contextFact: currentFact.fact 
                }),
            });

            if (!response.ok) { throw new Error('Network response was not ok'); }
            const data = await response.json();
            animateAiResponse(data.answer);

        } catch (error) {
            console.error('Error fetching AI response:', error);
            responseArea.innerText = 'Sorry, an error occurred. Please try again.';
            isAiResponding = false;
        }
    });
});

// ========================
// 1️⃣ Global Variables
let knowledgeBits = [];
let currentFact = {}; // Store the whole current fact object
let isTyping = false;


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
            explanation: "The knowledge.json file could not be loaded. Please check the file path and that it is valid JSON."
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
// 5️⃣ Random Knowledge Bit (UPDATED)
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
    
    currentFact = knowledgeBits[newFactIndex]; // Store the current fact object

    const factTextElement = document.getElementById("knowledge-bit-text");
    const explanationElement = document.getElementById("knowledge-explanation");
    
    // Hide all AI chat elements when a new fact is shown
    document.getElementById('ask-carlos-prompt').style.display = 'none';
    document.getElementById('ai-chat-form').style.display = 'none';
    document.getElementById('ai-response-area').innerHTML = '';

    explanationElement.innerHTML = '';
    isTyping = false;

    if (currentFact && currentFact.fact) {
        factTextElement.innerText = currentFact.fact;
        addSeenFact(newFactIndex);
    }
}

// ========================
// 6️⃣ Typewriter Effect (UPDATED)
function typeWriter() {
    const explanation = currentFact.explanation || '';
    if (isTyping || !explanation) {
        return;
    }

    const explanationElement = document.getElementById("knowledge-explanation");
    const askPrompt = document.getElementById('ask-carlos-prompt');
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
            
            // NEW: Show the "Ask Carlos" prompt when typing is done
            askPrompt.style.display = 'block';
            setTimeout(() => askPrompt.style.opacity = '1', 10); // Fade in
        }
    }
    type();
}


// ========================
// 7️⃣ Video Animation + Logo Fade-in
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
// 8️⃣ Share Functionality
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
// 9️⃣ Start everything when DOM content loaded
document.addEventListener("DOMContentLoaded", async () => {
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
        if (body.classList.contains('light-theme')) {
            localStorage.setItem('carlosTheme', 'light');
        } else {
            localStorage.setItem('carlosTheme', 'dark');
        }
    };

    applySavedTheme();
    themeSwitcher.addEventListener('click', toggleTheme);
    
    // --- Sidebar toggle logic ---
    const logo = document.getElementById('logo');
    logo.addEventListener('click', (event) => {
      event.preventDefault();
      body.classList.toggle('sidebar-open');
    });
    
    // --- Load initial content ---
    await loadKnowledgeBits(); 
    showKnowledgeBit();
    startLiveClock();
    startAnimations();
    
    // --- Main event listeners ---
    document.getElementById("knowledge-box").addEventListener("click", () => {
        const explanationElement = document.getElementById("knowledge-explanation");
        if (explanationElement.innerHTML === '' && !isTyping) {
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

    // --- NEW: AI Chat UI Listeners ---
    const askPrompt = document.getElementById('ask-carlos-prompt');
    const aiForm = document.getElementById('ai-chat-form');
    
    askPrompt.addEventListener('click', (event) => {
        event.stopPropagation();
        askPrompt.style.opacity = '0';
        setTimeout(() => {
            askPrompt.style.display = 'none';
            aiForm.style.display = 'flex';
            setTimeout(() => aiForm.style.opacity = '1', 10);
        }, 500);
    });

    aiForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userInput = document.getElementById('ai-chat-input').value;
        console.log("User asked:", userInput);
        console.log("Context fact:", currentFact.fact);
        // In the next step, we will send this to the backend API.
    });
});

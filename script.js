// ========================
// 1️⃣ Global Variables
let knowledgeBits = []; // This will be populated from knowledge.json
let currentExplanation = '';
let isTyping = false;


// ========================
// 2️⃣ NEW: Function to load knowledge from JSON file
async function loadKnowledgeBits() {
    try {
        const response = await fetch('knowledge.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        knowledgeBits = await response.json();
    } catch (error) {
        console.error("Could not load knowledge bits:", error);
        // Provide a fallback fact in case the fetch fails
        knowledgeBits = [{
            fact: "Error: Could not load facts.",
            explanation: "The knowledge.json file could not be loaded. Please check the file path and that it is valid JSON."
        }];
    }
}


// ========================
// 3️⃣ Live Clock (India Time)
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
        const millis = String(istTime.getMilliseconds()).padStart(3, '0');
        clockElement.innerText = `${hours}:${minutes}:${seconds}:${millis}`;
        requestAnimationFrame(updateClock);
    }
    updateClock();
}

// ========================
// 4️⃣ Random Knowledge Bit
function showKnowledgeBit() {
    if (knowledgeBits.length === 0) return; // Don't run if facts haven't loaded

    const factTextElement = document.getElementById("knowledge-bit-text");
    const explanationElement = document.getElementById("knowledge-explanation");
    
    const index = Math.floor(Math.random() * knowledgeBits.length);
    const selectedBit = knowledgeBits[index];
    
    // Clear previous explanation and stop any typing animation
    explanationElement.innerHTML = '';
    isTyping = false;

    if (selectedBit && selectedBit.fact) {
        factTextElement.innerText = selectedBit.fact;
        currentExplanation = selectedBit.explanation || '';
    }
}

// ========================
// 5️⃣ Typewriter Effect
function typeWriter() {
    if (isTyping || !currentExplanation) {
        return; // Don't run if already typing or no explanation exists
    }

    const explanationElement = document.getElementById("knowledge-explanation");
    explanationElement.innerHTML = ''; // Clear previous text
    explanationElement.classList.add('typing'); // Add class for blinking cursor
    isTyping = true;
    
    let i = 0;
    const speed = 30; // Speed of typing in milliseconds

    function type() {
        if (i < currentExplanation.length) {
            explanationElement.innerHTML += currentExplanation.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            explanationElement.classList.remove('typing'); // Remove cursor when done
            isTyping = false;
        }
    }
    type();
}


// ========================
// 6️⃣ Video Animation + Logo Fade-in
function startAnimations() {
    const video = document.getElementById("intro-video");
    const elementsToFadeIn = [
        document.getElementById("logo"),
        document.getElementById("since-text"),
        document.getElementById("since-logo-text"),
        document.getElementById("footer-text")
    ];

    let animationHasRun = false;

    const runExitAnimation = () => {
        if (animationHasRun) return; // Ensure this only runs once
        animationHasRun = true;

        // Shrink video smoothly
        video.style.transition = "all 2s ease";
        video.style.transform = "scale(0.1)";
        video.style.opacity = "0";

        // Show all other elements
        elementsToFadeIn.forEach(el => el.style.opacity = "1");

        // After shrink animation (2s), hide video container and show main content
        setTimeout(() => {
            document.getElementById("video-container").style.display = "none";
            document.getElementById("knowledge-box").style.opacity = "1";
            document.getElementById("live-clock").style.opacity = "1";
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
// 7️⃣ Start everything when DOM content loaded
document.addEventListener("DOMContentLoaded", async () => {
    // Make sure to load the facts before trying to show one
    await loadKnowledgeBits(); 
    
    showKnowledgeBit();
    startLiveClock();
    startAnimations();
    
    document.getElementById("knowledge-box").addEventListener("click", () => {
        const explanationElement = document.getElementById("knowledge-explanation");

        if (explanationElement.innerHTML !== '' && !isTyping) {
            explanationElement.innerHTML = '';
        } 
        else if (explanationElement.innerHTML === '') {
            typeWriter();
        }
    });
});

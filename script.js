// ========================
// 1️⃣ Global Variables
let knowledgeBits = [];
let currentExplanation = '';
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
// 3️⃣ localStorage Helper Functions to remember seen facts
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
    
    let availableIndices = knowledgeBits
        .map((_, i) => i)
        .filter(i => !seenFacts.includes(i));

    if (availableIndices.length === 0) {
        console.log("All facts have been seen! Resetting history.");
        localStorage.removeItem('carlosSeenFacts');
        availableIndices = knowledgeBits.map((_, i) => i);
    }

    const randomAvailableIndex = Math.floor(Math.random() * availableIndices.length);
    const newFactIndex = availableIndices[randomAvailableIndex];

    const factTextElement = document.getElementById("knowledge-bit-text");
    const explanationElement = document.getElementById("knowledge-explanation");
    const selectedBit = knowledgeBits[newFactIndex];
    
    explanationElement.innerHTML = '';
    isTyping = false;

    if (selectedBit && selectedBit.fact) {
        factTextElement.innerText = selectedBit.fact;
        currentExplanation = selectedBit.explanation || '';
        addSeenFact(newFactIndex);
    }
}

// ========================
// 6️⃣ Typewriter Effect
function typeWriter() {
    if (isTyping || !currentExplanation) {
        return;
    }

    const explanationElement = document.getElementById("knowledge-explanation");
    explanationElement.innerHTML = '';
    explanationElement.classList.add('typing');
    isTyping = true;
    
    let i = 0;
    const speed = 30;

    function type() {
        if (i < currentExplanation.length) {
            explanationElement.innerHTML += currentExplanation.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            explanationElement.classList.remove('typing');
            isTyping = false;
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
// 8️⃣ NEW: Share Functionality (Native Share + Clipboard Fallback)
async function shareFact() {
    const factTextElement = document.getElementById("knowledge-bit-text");
    const shareText = `Check out this fact from The C.A.R.L.O.S Project:\n\n"${factTextElement.innerText}"\n\nwww.thecarlos.in`;

    const shareData = {
        title: 'A Fact from The C.A.R.L.O.S Project',
        text: `"${factTextElement.innerText}"`,
        url: 'https://www.thecarlos.in'
    };

    // Try using the native Web Share API
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            console.log('Fact shared successfully');
        } catch (err) {
            console.error('Share failed:', err);
        }
    } else {
        // Fallback to copying to the clipboard
        try {
            await navigator.clipboard.writeText(shareText);
            
            // Give user feedback that text was copied
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
    await loadKnowledgeBits(); 
    
    showKnowledgeBit();
    startLiveClock();
    startAnimations();
    
    // Listener for toggling the explanation
    document.getElementById("knowledge-box").addEventListener("click", () => {
        const explanationElement = document.getElementById("knowledge-explanation");

        if (explanationElement.innerHTML !== '' && !isTyping) {
            explanationElement.innerHTML = '';
        } 
        else if (explanationElement.innerHTML === '') {
            typeWriter();
        }
    });

    // Listener for the refresh button
    document.getElementById("refresh-button").addEventListener("click", (event) => {
        event.stopPropagation();
        showKnowledgeBit();
    });
    
    // NEW: Listener for the share button
    document.getElementById("share-button").addEventListener("click", (event) => {
        event.stopPropagation();
        shareFact();
    });
});
}

// ========================
// 5️⃣ Random Knowledge Bit (UPDATED with memory)
function showKnowledgeBit() {
    if (knowledgeBits.length === 0) return;

    let seenFacts = getSeenFacts();
    
    // Create a list of indices for facts that have NOT been seen yet
    let availableIndices = knowledgeBits
        .map((_, i) => i) // Create an array of all possible indices [0, 1, 2, ...]
        .filter(i => !seenFacts.includes(i)); // Filter out indices that are in the seen list

    // If the user has seen all the facts, reset their history and start over
    if (availableIndices.length === 0) {
        console.log("All facts have been seen! Resetting history.");
        localStorage.removeItem('carlosSeenFacts');
        availableIndices = knowledgeBits.map((_, i) => i);
    }

    // Pick a random index from the list of AVAILABLE (unseen) facts
    const randomAvailableIndex = Math.floor(Math.random() * availableIndices.length);
    const newFactIndex = availableIndices[randomAvailableIndex];

    const factTextElement = document.getElementById("knowledge-bit-text");
    const explanationElement = document.getElementById("knowledge-explanation");
    const selectedBit = knowledgeBits[newFactIndex];
    
    explanationElement.innerHTML = '';
    isTyping = false;

    if (selectedBit && selectedBit.fact) {
        factTextElement.innerText = selectedBit.fact;
        currentExplanation = selectedBit.explanation || '';
        
        // After showing the fact, add its index to the 'seen' list in localStorage
        addSeenFact(newFactIndex);
    }
}

// ========================
// 6️⃣ Typewriter Effect
function typeWriter() {
    if (isTyping || !currentExplanation) {
        return;
    }

    const explanationElement = document.getElementById("knowledge-explanation");
    explanationElement.innerHTML = '';
    explanationElement.classList.add('typing');
    isTyping = true;
    
    let i = 0;
    const speed = 30;

    function type() {
        if (i < currentExplanation.length) {
            explanationElement.innerHTML += currentExplanation.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            explanationElement.classList.remove('typing');
            isTyping = false;
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
// 8️⃣ Start everything when DOM content loaded
document.addEventListener("DOMContentLoaded", async () => {
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

    document.getElementById("refresh-button").addEventListener("click", (event) => {
        event.stopPropagation();
        showKnowledgeBit();
    });
});

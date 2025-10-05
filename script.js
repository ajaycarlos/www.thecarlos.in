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
    const digitBoxes = document.querySelectorAll('#live-clock .digit-box');

    function updateDigit(digitBox, newValue) {
        const currentTop = digitBox.querySelector('.digit-top');
        const currentBottom = digitBox.querySelector('.digit-bottom');
        const displayedValue = currentTop.textContent;

        if (displayedValue === newValue) {
            return;
        }
        
        currentTop.textContent = displayedValue;
        currentBottom.textContent = newValue;

        digitBox.classList.add('drop');

        setTimeout(() => {
            currentTop.textContent = newValue;
            digitBox.classList.remove('drop');
            currentTop.style.transform = 'translateY(0)';
            currentBottom.style.transform = 'translateY(100%)';
        }, 400);
    }

    function updateClockDisplay() {
        const now = new Date();
        const istOffset = 5.5 * 60;
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const istTime = new Date(utc + istOffset * 60000);
        
        const hours = String(istTime.getHours()).padStart(2, '0');
        const minutes = String(istTime.getMinutes()).padStart(2, '0');
        const seconds = String(istTime.getSeconds()).padStart(2, '0');

        const timeString = `${hours}${minutes}${seconds}`;

        for (let i = 0; i < 6; i++) {
            updateDigit(digitBoxes[i], timeString[i]);
        }
    }
    
    const now = new Date();
    const istOffset = 5.5 * 60;
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const istTime = new Date(utc + istOffset * 60000);
    const initialTime = [
        ...String(istTime.getHours()).padStart(2, '0'),
        ...String(istTime.getMinutes()).padStart(2, '0'),
        ...String(istTime.getSeconds()).padStart(2, '0')
    ];
    
    digitBoxes.forEach((digitBox, index) => {
        digitBox.querySelector('.digit-top').textContent = initialTime[index];
    });

    setInterval(updateClockDisplay, 1000);
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
    document.documentElement.classList.remove('ai-modal-open');

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
// 6️⃣ Typewriter Effect (for explanations)
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
// 7️⃣ AI Typewriter
function typewriterForAi(text, responseArea, onComplete) {
    let i = 0;
    const speed = 30;
    responseArea.innerHTML = '';
    responseArea.classList.add('typing');

    function type() {
        if (i < text.length) {
            responseArea.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            responseArea.classList.remove('typing');
            if (onComplete) onComplete();
        }
    }
    type();
}


// ========================
// 8️⃣ Video Animation + Logo Fade-in
function startAnimations() {
    const videoContainer = document.getElementById("video-container");
    const video = document.getElementById("intro-video");
    const tapToEnter = document.getElementById("tap-to-enter");
    
    const elementsToFadeIn = [
        document.getElementById("logo"),
        document.getElementById("since-text"),
        document.getElementById("since-logo-text"),
        document.getElementById("footer-text"),
        document.getElementById("live-clock"),
        document.getElementById("menu-button")
    ];

    let animationHasRun = false;

    const runExitAnimation = () => {
        if (animationHasRun) return;
        animationHasRun = true;
        sessionStorage.setItem('introPlayed', 'true');

        if (videoContainer) {
            videoContainer.style.transition = "opacity 2s ease";
            videoContainer.style.opacity = "0";
        }
        
        elementsToFadeIn.forEach(el => {
            if (el) el.style.opacity = "1";
        });

        setTimeout(() => {
            if (videoContainer) videoContainer.style.display = "none";
            const mainContent = document.getElementById("main-content-container");
            if (mainContent) mainContent.style.opacity = "1";
        }, 2000);
    };

    function skipIntro() {
        if (videoContainer) videoContainer.style.display = "none";
        elementsToFadeIn.forEach(el => {
            if (el) el.style.opacity = "1";
        });
        const mainContent = document.getElementById("main-content-container");
        if (mainContent) mainContent.style.opacity = "1";
    }

    if (sessionStorage.getItem('introPlayed') === 'true') {
        skipIntro();
        return;
    }

    if (video) {
        video.addEventListener('ended', runExitAnimation);
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error("Autoplay was prevented:", error);
                if (video) video.style.display = 'none';
                if (tapToEnter) {
                    tapToEnter.style.visibility = 'visible';
                    tapToEnter.style.opacity = '1';
                }
                if (videoContainer) videoContainer.addEventListener('click', runExitAnimation);
            });
        }
    }

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

// EDITED: Added new function for the System Failure effect
// ========================
// 11️⃣ System Failure Animation
// ========================
function initializeSystemFailure() {
    const triggerButton = document.getElementById('since-text'); // Trigger is now the main title
    const overlay = document.getElementById('failure-overlay');
    const failureText = document.getElementById('failure-text');
    const rebootText = document.getElementById('reboot-text');
    let isAnimating = false;

    if (!triggerButton) return;

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const runFailureSequence = async () => {
        if (isAnimating) return;
        isAnimating = true;

        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';

        await delay(500);

        failureText.classList.add('flashing');
        
        await delay(2500); // Duration of failure message (2.5 seconds)

        failureText.classList.remove('flashing');
        rebootText.style.visibility = 'visible';
        rebootText.style.opacity = '1';

        await delay(2000); // Duration of reboot message

        rebootText.style.opacity = '0';
        overlay.style.opacity = '0';

        await delay(500);
        
        overlay.style.visibility = 'hidden';
        rebootText.style.visibility = 'hidden';
        isAnimating = false;
    };

    triggerButton.addEventListener('click', runFailureSequence);
}


// ========================
// 10️⃣ Start everything when DOM content loaded
// ========================
document.addEventListener("DOMContentLoaded", async () => {
    const body = document.body;

    const themeSwitcher = document.getElementById('theme-switcher');
    
    const toggleTheme = () => {
        const isLightTheme = document.documentElement.classList.toggle('light-theme');
        localStorage.setItem('carlosTheme', isLightTheme ? 'light' : 'dark');
    };

    if(themeSwitcher) themeSwitcher.addEventListener('click', toggleTheme);
    
    const menuButton = document.getElementById('menu-button');
    if(menuButton) menuButton.addEventListener('click', (event) => {
      event.preventDefault();
      document.documentElement.classList.toggle('sidebar-open');
    });
    
    const closeButton = document.getElementById('sidebar-close-button');
    if(closeButton) closeButton.addEventListener('click', () => {
        document.documentElement.classList.remove('sidebar-open');
    });
    
    await loadKnowledgeBits(); 
    showKnowledgeBit();
    startLiveClock();
    startAnimations();
    initializeSystemFailure(); // EDITED: Added call to initialize the new animation
    
    const knowledgeBox = document.getElementById("knowledge-box");
    if(knowledgeBox) knowledgeBox.addEventListener("click", () => {
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

    const refreshButton = document.getElementById("refresh-button");
    if(refreshButton) refreshButton.addEventListener("click", (event) => {
        event.stopPropagation();
        showKnowledgeBit();
    });
    
    const shareButton = document.getElementById("share-button");
    if(shareButton) shareButton.addEventListener("click", (event) => {
        event.stopPropagation();
        shareFact();
    });

    const askTrigger = document.getElementById('ask-carlos-trigger');
    if(askTrigger) askTrigger.addEventListener('click', (event) => {
        event.stopPropagation();
        document.documentElement.classList.add('ai-modal-open');
    });
    
    const modalCloseButton = document.getElementById('ai-modal-close-button');
    if(modalCloseButton) modalCloseButton.addEventListener('click', () => {
        document.documentElement.classList.remove('ai-modal-open');
    });

    const aiForm = document.getElementById('ai-chat-form');
    if(aiForm) aiForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (isAiResponding) return;

        const input = document.getElementById('ai-chat-input');
        const userInput = input.value.trim();
        if (userInput === '') return;
        
        const responseArea = document.getElementById('ai-response-area');
        responseArea.innerHTML = 'C.A.R.L.O.S. is thinking...';
        input.value = '';
        isAiResponding = true;

        try {
            const apiResponse = await fetch('/api/ask-carlos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: userInput,
                    contextFact: currentFact.fact 
                }),
            });

            if (!apiResponse.ok) { throw new Error('Network response was not ok'); }
            
            const data = await apiResponse.json();
            
            typewriterForAi(data.answer, responseArea, () => {
                isAiResponding = false;
            });

        } catch (error) {
            console.error('Error fetching AI response:', error);
            responseArea.innerText = 'Sorry, an error occurred. Please try again.';
            isAiResponding = false;
        }
    });
});

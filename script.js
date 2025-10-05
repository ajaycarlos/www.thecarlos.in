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
<<<<<<< HEAD
// 4️⃣ Live Clock (India Time) (REWRITTEN FOR DROP-DOWN ANIMATION)
function startLiveClock() {
    const digitBoxes = document.querySelectorAll('#live-clock .digit-box'); // Get all 6 digit containers

    function updateDigit(digitBox, newValue) {
        // Get the current top and bottom spans
        const currentTop = digitBox.querySelector('.digit-top');
        const currentBottom = digitBox.querySelector('.digit-bottom');
        
        // Get the value currently displayed at the top
        const displayedValue = currentTop.textContent;

        // Only animate if the value has actually changed
        if (displayedValue === newValue) {
            return;
        }

        // Set the current value to the top span
        currentTop.textContent = displayedValue;
        // Set the new value to the bottom span
        currentBottom.textContent = newValue;

        // Trigger the animation by adding the 'drop' class
        digitBox.classList.add('drop');

        // After the animation (must match CSS transition duration), reset for next flip
        setTimeout(() => {
            currentTop.textContent = newValue; // New value becomes the "current" top
            currentTop.style.transform = 'translateY(0)'; // Reset top span transform
            currentBottom.style.transform = 'translateY(100%)'; // Reset bottom span transform

            digitBox.classList.remove('drop'); // Remove class to reset animation state
        }, 400); // Must match CSS transition duration (0.4s)
    }

    function updateClockDisplay() {
=======
// 4️⃣ Live Clock (India Time) (REWRITTEN)
function startLiveClock() {
    const digits = document.querySelectorAll('#live-clock .digit');

    function updateDigit(digitElement, newValue) {
        const currentValue = digitElement.querySelector('.digit-inner:last-child').textContent;
        if (currentValue === newValue) {
            return;
        }

        const newDigitInner = document.createElement('span');
        newDigitInner.className = 'digit-inner';
        newDigitInner.textContent = newValue;
        newDigitInner.style.transform = 'translateY(-100%)';
        
        const oldDigitInner = digitElement.querySelector('.digit-inner');
        
        digitElement.appendChild(newDigitInner);
        digitElement.classList.add('drop');

        // Force a reflow to apply the initial state before transitioning
        void newDigitInner.offsetWidth;

        newDigitInner.style.transform = 'translateY(0)';
        oldDigitInner.style.transform = 'translateY(100%)';
        
        oldDigitInner.addEventListener('transitionend', () => {
            oldDigitInner.remove();
            digitElement.classList.remove('drop');
        }, { once: true });
    }

    function updateClock() {
>>>>>>> 9da3259 (newclock)
        const now = new Date();
        const istOffset = 5.5 * 60;
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const istTime = new Date(utc + istOffset * 60000);
        
        const hours = String(istTime.getHours()).padStart(2, '0');
        const minutes = String(istTime.getMinutes()).padStart(2, '0');
        const seconds = String(istTime.getSeconds()).padStart(2, '0');

<<<<<<< HEAD
        const timeString = `${hours}${minutes}${seconds}`; // e.g., "123456"

        // Update each digit box
        for (let i = 0; i < 6; i++) {
            updateDigit(digitBoxes[i], timeString[i]);
        }
    }
    
    // Set initial values without animation when page loads
=======
        updateDigit(digits[0], hours[0]);
        updateDigit(digits[1], hours[1]);
        updateDigit(digits[2], minutes[0]);
        updateDigit(digits[3], minutes[1]);
        updateDigit(digits[4], seconds[0]);
        updateDigit(digits[5], seconds[1]);
    }
    
    // Set initial state without animation
>>>>>>> 9da3259 (newclock)
    const now = new Date();
    const istOffset = 5.5 * 60;
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const istTime = new Date(utc + istOffset * 60000);
    const initialTime = [
        ...String(istTime.getHours()).padStart(2, '0'),
        ...String(istTime.getMinutes()).padStart(2, '0'),
        ...String(istTime.getSeconds()).padStart(2, '0')
    ];
<<<<<<< HEAD
    
    digitBoxes.forEach((digitBox, index) => {
        digitBox.querySelector('.digit-top').textContent = initialTime[index];
        digitBox.querySelector('.digit-top').style.transform = 'translateY(0)'; // Ensure initial position
        digitBox.querySelector('.digit-bottom').textContent = initialTime[index];
        digitBox.querySelector('.digit-bottom').style.transform = 'translateY(100%)'; // Ensure initial position
    });


    // Start the animation loop
    setInterval(updateClockDisplay, 1000);
=======
    digits.forEach((digit, index) => {
        digit.innerHTML = `<span class="digit-inner">${initialTime[index]}</span>`;
    });

    setInterval(updateClock, 1000);
>>>>>>> 9da3259 (newclock)
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
        document.getElementById("live-clock")
    ];

    let animationHasRun = false;

    const runExitAnimation = () => {
        if (animationHasRun) return;
        animationHasRun = true;
        sessionStorage.setItem('introPlayed', 'true');

        videoContainer.style.transition = "opacity 2s ease";
        videoContainer.style.opacity = "0";
        
        elementsToFadeIn.forEach(el => {
            if (el) el.style.opacity = "1";
        });

        setTimeout(() => {
            videoContainer.style.display = "none";
            const mainContent = document.getElementById("main-content-container");
            if (mainContent) mainContent.style.opacity = "1";
        }, 2000);
    };

    function skipIntro() {
        videoContainer.style.display = "none";
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

    video.addEventListener('ended', runExitAnimation);

    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error("Autoplay was prevented:", error);
            video.style.display = 'none';
            tapToEnter.style.visibility = 'visible';
            tapToEnter.style.opacity = '1';
            videoContainer.addEventListener('click', runExitAnimation);
        });
    }

    setTimeout(runExitAnimation, 4000);
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
    
    document.getElementById('logo').addEventListener('click', (event) => {
      event.preventDefault();
      body.classList.toggle('sidebar-open');
    });
    
    document.getElementById('sidebar-close-button').addEventListener('click', () => {
        body.classList.remove('sidebar-open');
    });
    
    await loadKnowledgeBits(); 
    showKnowledgeBit();
    startLiveClock(); // Initialize and start the new clock
    startAnimations();
    
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
        isAiResponding = true;

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

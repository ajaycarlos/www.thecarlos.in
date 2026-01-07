document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. HERO TYPEWRITER EFFECT (Renovated) ---
    const textElement = document.getElementById('typewriter');
    
    if (textElement) {
        const phrases = [
    "Self-Taught Developer.",
    "Creative Technologist.",
    "Vibe Coder.",
    "Problem Solver.",

    "മലയാളി.",
    "ലേണർ.",   
    "കേരളക്കാരൻ.",
    "ഡെവലപ്പർ.",
    "മല്ലു.",
    "സ്റ്റുഡന്റ്.",
    

    "Proud Mallu.",
    "Bug Hunter.",
    "Open Source Enthusiast.",
    "Ronaldo Admirer."
    
];


        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Deleting text
                textElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Deleting is faster
            } else {
                // Typing text
                textElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Normal typing speed
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Finished typing whole phrase, pause before deleting
                isDeleting = true;
                typeSpeed = 2000; // Wait 2 seconds so people can read it
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting, move to next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause briefly before typing new one
            }

            setTimeout(typeEffect, typeSpeed);
        }

        // Start the loop
        typeEffect();
    }

    // --- 2. TERMINAL ANIMATION (Unchanged) ---
    const terminalOutput = document.getElementById('terminal-output');
    
    if (terminalOutput) {
        const bootSequence = [
            "Initializing environment...",
            "Loading modules...",
            "System ready."
        ];
        
        let lineIndex = 0;

        function runBootSequence() {
            if (lineIndex < bootSequence.length) {
                const newLine = document.createElement('div');
                newLine.className = 'terminal-line';
                newLine.innerHTML = `<span style="color:#555; margin-right:8px;">></span> ${bootSequence[lineIndex]}`;
                terminalOutput.appendChild(newLine);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                
                lineIndex++;
                setTimeout(runBootSequence, 200);
            } else {
                // Final Interactive Prompt
                setTimeout(() => {
                    const finalLine = document.createElement('div');
                    finalLine.className = 'terminal-line typing-cursor';
                    finalLine.innerHTML = '<span style="color: #ff5f56;">ajay@portfolio</span> <span style="color: #ffbd2e;">~$</span> echo \'welcome to my portfolio\'';
                    terminalOutput.appendChild(finalLine);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }, 400);
            }
        }
        
        // Start animation after slight delay
        setTimeout(runBootSequence, 800);
    }
});
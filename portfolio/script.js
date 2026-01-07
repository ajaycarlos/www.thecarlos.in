document.addEventListener('DOMContentLoaded', () => {
    // --- 1. HERO TYPING EFFECT (Original) ---
    const textElement = document.querySelector('.hero p');
    if (textElement) {
        const textToType = textElement.innerText;
        textElement.innerText = '';
        
        let i = 0;
        const speed = 50; 

        function typeWriter() {
            if (i < textToType.length) {
                textElement.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // --- 2. TERMINAL ANIMATION (New) ---
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
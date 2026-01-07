document.addEventListener('DOMContentLoaded', () => {
    // === TERMINAL ANIMATION LOGIC ===
    const terminalOutput = document.getElementById('terminal-output');

    // The sequence of loading lines before the final prompt
    const bootSequence = [
        "Initializing environment...",
        "[OK] Loaded kernel modules.",
        "[OK] Mounted file systems.",
        "Starting network services...",
        "Loading assets: style.css [Done]",
        "Loading assets: script.js [Done]",
        "Compiling layout metrics...",
        "System ready."
    ];

    let lineIndex = 0;

    function runBootSequence() {
        if (lineIndex < bootSequence.length) {
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line';
            // Add a subtle prompt character for boot lines
            newLine.innerHTML = `<span class="prompt-char">></span> ${bootSequence[lineIndex]}`;
            terminalOutput.appendChild(newLine);
            
            // Auto-scroll to bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            
            lineIndex++;
            // Randomize typing speed for realism
            setTimeout(runBootSequence, Math.random() * 200 + 100);
        } else {
            // Sequence finished, show the final interactive prompt after a short pause
            setTimeout(showFinalPrompt, 500);
        }
    }

    function showFinalPrompt() {
        const finalLine = document.createElement('div');
        finalLine.className = 'terminal-line typing-cursor';
        // The exact final line requested
        finalLine.innerHTML = '<span style="color: #ff5f56;">ajay@portfolio</span> <span style="color: #ffbd2e;">~$</span> echo \'welcome to my portfolio\'';
        terminalOutput.appendChild(finalLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Start the terminal animation a moment after page load
    setTimeout(runBootSequence, 800);
});
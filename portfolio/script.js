document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Live Clock & Date
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        const dateString = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        document.getElementById('clock').innerText = timeString;
        document.getElementById('date').innerText = dateString.toUpperCase();
    }
    setInterval(updateTime, 1000);
    updateTime();

    // 2. Terminal Typing Effect
    const terminalText = "echo 'Welcome to The Carlos OS'";
    const typeWriterElement = document.getElementById('typewriter');
    let i = 0;

    function typeTerminal() {
        if (i < terminalText.length) {
            typeWriterElement.innerHTML += terminalText.charAt(i);
            i++;
            setTimeout(typeTerminal, 100);
        }
    }
    setTimeout(typeTerminal, 1000);

    // 3. 3D Tilt Effect Logic (Custom Physics)
    const cards = document.querySelectorAll('.card[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt amount (max 15 deg)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            // Add lighting effect
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(0,0,0,0.5)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset position
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        });
    });
    
    // 4. Staggered Entry Animation
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            
            // Remove transition after animation so tilt works smoothly
            setTimeout(() => {
                card.style.transition = 'transform 0.1s ease-out';
            }, 500);
        }, index * 100);
    });
});
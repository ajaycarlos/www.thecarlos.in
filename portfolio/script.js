document.addEventListener('DOMContentLoaded', () => {
    // Typing effect for the Intro
    const textElement = document.querySelector('.hero p');
    const textToType = textElement.innerText;
    textElement.innerText = '';
    
    let i = 0;
    const speed = 50; // typing speed in ms

    function typeWriter() {
        if (i < textToType.length) {
            textElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // Delay slightly for effect
    setTimeout(typeWriter, 500);

    // Hover effect for language segments
    const segments = document.querySelectorAll('.segment');
    segments.forEach(seg => {
        seg.addEventListener('mouseenter', () => {
            seg.style.opacity = '1';
            segments.forEach(s => {
                if(s !== seg) s.style.opacity = '0.3';
            });
        });
        seg.addEventListener('mouseleave', () => {
            segments.forEach(s => s.style.opacity = '1');
        });
    });
});
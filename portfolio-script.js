// ====================================================== //
// ============ PORTFOLIO ANIMATION SCRIPT ============== //
// ====================================================== //

document.addEventListener('DOMContentLoaded', () => {

    // --- Register GSAP Plugins ---
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. Initialize Vanilla-Tilt.js for Project Cards ---
    // This adds the 3D tilt effect on hover.
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
        scale: 1.05
    });

    // --- 2. Hero Section Animations ---
    // Animate title, subtitle, and social icons on load.
    const heroTimeline = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power3.out'
        }
    });

    heroTimeline
        .to('.hero-title', {
            opacity: 1,
            y: 0
        })
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0
        }, "-=0.8") // Start 0.8s before the previous animation ends
        .to('.social-icon', {
            opacity: 1,
            y: 0,
            stagger: 0.15 // Animate icons one after another
        }, "-=0.7");


    // --- 3. Scroll-Triggered Animations for Sections ---
    const sectionsToAnimate = [
        '.section-title',
        '.project-card',
        '.motto',
        '.footer-email',
        '.copyright'
    ];

    sectionsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);

        gsap.to(elements, {
            opacity: 1,
            y: 0,
            scale: 1, // For project cards
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2, // Stagger elements if there are multiple (like project cards)
            scrollTrigger: {
                trigger: elements[0].closest('section') || elements[0].closest('footer'), // Use parent section/footer as trigger
                start: 'top 80%', // Start animation when 80% of the section is in view
                toggleActions: 'play none none none',
                // markers: true, // Uncomment for debugging
            },
        });
    });
});

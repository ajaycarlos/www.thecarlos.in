// ====================================================== //
// ============ PORTFOLIO ANIMATION SCRIPT ============== //
// ====================================================== //

// We wrap everything in a function so we can call it AFTER loading HTML
function initPortfolio() {

    // --- Register GSAP Plugins ---
    gsap.registerPlugin(ScrollTrigger);

    // --- Hero Section Animations ---
    const heroTimeline = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power3.out'
        }
    });

    // Check if elements exist before animating to avoid errors
    if (document.querySelector('.hero-title')) {
        heroTimeline
            .to('.hero-title', {
                opacity: 1,
                y: 0
            })
            .to('.hero-subtitle', {
                opacity: 1,
                y: 0
            }, "-=0.8")
            .to('.social-icon', {
                opacity: 1,
                y: 0,
                stagger: 0.15
            }, "-=0.7");
    }

    // --- Scroll-Triggered Animations for Sections ---
    const sectionsToAnimate = [
        '.section-title',
        '.project-card',
        '.motto',
        '.footer-email',
        '.copyright'
    ];

    sectionsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);

        if (elements.length > 0) {
            gsap.to(elements, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: elements[0].closest('section') || elements[0].closest('footer'),
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
        }
    });

    // --- Spotlight Cursor Effect ---
    const portfolioWrapper = document.getElementById('portfolio-wrapper');
    if (portfolioWrapper) {
        portfolioWrapper.addEventListener('mousemove', e => {
            const rect = portfolioWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            portfolioWrapper.style.setProperty('--x', `${x}px`);
            portfolioWrapper.style.setProperty('--y', `${y}px`);
        });
    }
    
    // Force GSAP to recalculate positions now that content is there
    ScrollTrigger.refresh();
}
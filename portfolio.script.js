document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Fade-In Animation ---
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Tabbed Projects Section ---
    const tabList = document.querySelector('.project-tab-list');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabList) {
        tabList.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('button');
            if (!clickedTab) return;

            tabButtons.forEach(button => button.classList.remove('active'));
            clickedTab.classList.add('active');

            const tabId = clickedTab.dataset.tab;

            tabPanes.forEach(pane => {
                if (pane.id === tabId) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    }

});

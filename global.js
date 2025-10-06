// This file contains logic shared across all pages of the site.

// ========================
// 1️⃣ Automatic Cache Busting
// ========================
(function() {
  // This script will automatically bust the cache for local CSS and JS files on every load.
  const timestamp = new Date().getTime();
  
  // Find all local stylesheets
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http')) { // Only apply to local files
      link.href = `${href.split('?')[0]}?t=${timestamp}`;
    }
  });

  // Find all local scripts
  document.querySelectorAll('script[src]').forEach(script => {
    const src = script.getAttribute('src');
    // Only apply to local files, ignore external libraries
    if (src && !src.startsWith('http')) {
      script.src = `${src.split('?')[0]}?t=${timestamp}`;
    }
  });
})();


// ========================
// 2️⃣ Global Theme Switcher Logic
// ========================
document.addEventListener("DOMContentLoaded", () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    
    // The initial theme is applied by a script in the <head> of the HTML.
    // This listener just handles the click to toggle the theme.
    if(themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            const isLightTheme = document.documentElement.classList.toggle('light-theme');
            localStorage.setItem('carlosTheme', isLightTheme ? 'light' : 'dark');
        });
    }
});

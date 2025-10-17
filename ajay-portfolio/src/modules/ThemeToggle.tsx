import React, { useEffect, useState } from 'react';

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition focus-ring"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span className="h-4 w-4 rounded-full bg-gradient-to-br from-ink-400 to-ink-700 dark:from-ink-300 dark:to-ink-500" />
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}

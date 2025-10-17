import { useEffect, useState } from 'react';
import './styles.css';

export function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur border-b border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <span className="h-8 w-8 grid place-items-center rounded-lg bg-ink-900 text-white dark:bg-ink-100 dark:text-ink-900 shadow" title="carlos">AP</span>
          <a href="#work" className="hidden sm:inline-flex items-center rounded-full px-3 py-1.5 border border-black/10 dark:border-white/15">Explore my work</a>
        </div>
      </header>
      <main>
        <section className="py-24 mx-auto max-w-6xl px-4">
          <h1 className="text-5xl font-extrabold">Ajay Pulikkal</h1>
          <p className="mt-2 opacity-80">Self-taught dev</p>
        </section>
      </main>
    </div>
  );
}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Hero } from './Hero';
import { Projects } from './Projects';
import { About } from './About';
import { Contact } from './Contact';
import { Footer } from './Footer';

export function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Intersection-based reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen selection:bg-ink-400/25">
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-ink-900/50 border-b border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#top" className="group inline-flex items-center gap-3" aria-label="Ajay Pulikkal home">
          <span className="h-8 w-8 grid place-items-center rounded-lg bg-ink-900 text-white dark:bg-ink-100 dark:text-ink-900 shadow">
            AP
          </span>
          <div>
            <span className="font-semibold">Ajay Pulikkal</span>
            <span className="ml-2 text-sm opacity-70">Self-taught dev</span>
          </div>
          <span className="sr-only">carlos</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a className="opacity-80 hover:opacity-100" href="#work">Work</a>
          <a className="opacity-80 hover:opacity-100" href="#about">About</a>
          <a className="opacity-80 hover:opacity-100" href="#contact">Contact</a>
          <a className="opacity-80 hover:opacity-100" href="https://thecarlos.in" target="_blank" rel="noreferrer">thecarlos.in</a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="#work" className="hidden sm:inline-flex items-center rounded-full px-3 py-1.5 border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition focus-ring text-sm">Explore my work</a>
        </div>
      </div>
    </header>
  );
}

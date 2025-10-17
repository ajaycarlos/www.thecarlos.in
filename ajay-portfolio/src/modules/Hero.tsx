import React from 'react';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_80%_-20%,rgba(88,115,164,0.12),transparent),radial-gradient(800px_400px_at_-10%_0%,rgba(120,146,189,0.12),transparent)]" />
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-24 md:py-32 lg:py-36">
          <p className="text-sm uppercase tracking-widest text-ink-500 dark:text-ink-400">Portfolio</p>
          <h1 id="hero-title" className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold">
            Ajay Pulikkal
          </h1>
          <p className="mt-4 text-lg sm:text-xl opacity-80">Self-taught dev</p>
          <p className="mt-4 max-w-2xl text-ink-700 dark:text-ink-200">
            Building thoughtful interfaces, clever tools, and premium experiences. Curious about AI and product-minded.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="#work" className="inline-flex items-center rounded-full px-4 py-2 bg-ink-900 text-white dark:bg-ink-100 dark:text-ink-900 hover:opacity-95 focus-ring">
              Explore my work
            </a>
            <a href="https://thecarlos.in" className="inline-flex items-center rounded-full px-4 py-2 border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 focus-ring" target="_blank" rel="noreferrer">
              thecarlos.in
            </a>
          </div>
          <p className="mt-4 text-xs opacity-70">
            Integration alias: Add this portfolio to the Explore page on thecarlos.in at <code className="px-1 rounded bg-black/5 dark:bg-white/10">/explore/portfolio</code>.
          </p>
        </div>
      </div>
    </section>
  );
}

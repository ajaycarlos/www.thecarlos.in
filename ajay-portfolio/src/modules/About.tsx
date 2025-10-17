import React from 'react';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 reveal">
        <h2 id="about-title" className="text-2xl md:text-3xl font-semibold">About</h2>
        <p className="mt-4 opacity-85">
          I’m Ajay Pulikkal, a self-taught dev who likes shipping clever tools and clean interfaces. Product-minded by default, I care about performance and the tiny details people actually feel.
        </p>
        <p className="mt-3 opacity-80">
          Currently exploring offline-first AI utilities and playful UI systems. I also enjoy turning messy ideas into polished experiences that feel obvious in hindsight.
        </p>
      </div>
    </section>
  );
}

import React, { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { ProjectModal } from './ProjectsModal';
import projectsData from '../projects.json';

export type Project = {
  id: string;
  title: string;
  url: string;
  repo?: string;
  blurb: string;
  tech: string[];
  image: string; // hero image path
  lqip: string; // tiny base64 placeholder
};

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" aria-labelledby="work-title" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="work-title" className="text-2xl md:text-3xl font-semibold">Featured work</h2>
        <p className="mt-2 opacity-75 max-w-2xl">Three quick case studies — live links, tech stack, and a deep-dive template if you want to go nerdy.</p>

        <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectsData.map(p => (
            <li key={p.id} className="card overflow-hidden reveal">
              <button onClick={() => setActive(p)} className="block text-left">
                <LQIPImage src={p.image} lqip={p.lqip} alt={p.title} />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <div className="flex items-center gap-2">
                      <a href={p.url} className="text-sm underline opacity-80 hover:opacity-100" target="_blank" rel="noreferrer">Live</a>
                      {p.repo && (
                        <a href={p.repo} className="text-sm underline opacity-80 hover:opacity-100" target="_blank" rel="noreferrer">Repo</a>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-sm opacity-80 min-h-[3rem]">{p.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map(t => (
                      <span key={t} className="inline-flex items-center rounded-full bg-black/5 dark:bg-white/10 px-2 py-1 text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs opacity-70">
          Badge: Integrated with live site thecarlos.in — Explore page will link to <code className="px-1 rounded bg-black/5 dark:bg-white/10">/explore/portfolio</code>.
        </p>
      </div>

      {active && (
        <ProjectModal project={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}

function LQIPImage({ src, lqip, alt }: { src: string; lqip: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[16/10] bg-black/5 dark:bg-white/5">
      <img
        src={lqip}
        aria-hidden
        alt=""
        className={clsx('absolute inset-0 h-full w-full object-cover blur-md scale-105 transition-opacity', loaded ? 'opacity-0' : 'opacity-100')}
      />
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className={clsx('absolute inset-0 h-full w-full object-cover transition-opacity', loaded ? 'opacity-100' : 'opacity-0')}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

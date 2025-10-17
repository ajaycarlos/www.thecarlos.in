import React, { useEffect } from 'react';
import type { Project } from './Projects';

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={`Deep dive: ${project.title}`} className="fixed inset-0 z-50">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-x-0 top-[10vh] mx-auto max-w-3xl rounded-2xl bg-white dark:bg-ink-900 border border-black/10 dark:border-white/10 shadow-glow overflow-hidden">
        <div className="aspect-[16/9] bg-black/5 dark:bg-white/5">
          <img src={project.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="mt-2 opacity-80">{project.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="inline-flex items-center rounded-full bg-black/5 dark:bg-white/10 px-2 py-1 text-xs">{t}</span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full px-4 py-2 bg-ink-900 text-white dark:bg-ink-100 dark:text-ink-900 hover:opacity-95 focus-ring">Live</a>
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full px-4 py-2 border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 focus-ring">Repo</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

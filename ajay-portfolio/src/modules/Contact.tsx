import React, { useState } from 'react';

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 reveal">
        <h2 id="contact-title" className="text-2xl md:text-3xl font-semibold">Contact</h2>
        <p className="mt-2 opacity-80">Email or DM me — I’m friendly and quick to respond.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <ContactForm />
          <div className="card p-4">
            <h3 className="font-semibold">Elsewhere</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a className="underline opacity-85 hover:opacity-100" href="mailto:hi@ajaypulikkal.dev">hi@ajaypulikkal.dev</a></li>
              <li><a className="underline opacity-85 hover:opacity-100" href="https://github.com/ajaycarlos" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a className="underline opacity-85 hover:opacity-100" href="https://x.com/ajaycarloss" target="_blank" rel="noreferrer">X</a></li>
              <li><a className="underline opacity-85 hover:opacity-100" href="https://www.linkedin.com/in/ajaycarloss" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a className="underline opacity-85 hover:opacity-100" href="https://www.instagram.com/ajaycarloss/" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string) || '/api/contact';
    setState('sending');
    try {
      const res = await fetch(endpoint, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Request failed');
      setState('sent');
      form.reset();
    } catch {
      setState('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-4" aria-describedby="contact-help">
      <label className="block text-sm font-medium" htmlFor="name">Name</label>
      <input className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-ink-900 px-3 py-2 focus-ring" name="name" id="name" required />
      <label className="block text-sm font-medium mt-3" htmlFor="email">Email</label>
      <input className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-ink-900 px-3 py-2 focus-ring" type="email" name="email" id="email" required />
      <label className="block text-sm font-medium mt-3" htmlFor="message">Message</label>
      <textarea className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-ink-900 px-3 py-2 focus-ring" name="message" id="message" rows={4} required />
      <p id="contact-help" className="mt-2 text-xs opacity-70">This form posts to a configurable endpoint. Fallback: <a className="underline" href="mailto:hi@ajaypulikkal.dev">mailto</a>.</p>
      <div className="mt-3">
        <button disabled={state==='sending'} className="inline-flex items-center rounded-full px-4 py-2 bg-ink-900 text-white dark:bg-ink-100 dark:text-ink-900 focus-ring">
          {state==='sending' ? 'Sending…' : state==='sent' ? 'Sent ✓' : state==='error' ? 'Try again' : 'Send'}
        </button>
      </div>
    </form>
  );
}

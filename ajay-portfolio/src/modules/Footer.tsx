import React from 'react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm opacity-80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Ajay Pulikkal — Self-taught dev
            <span className="ml-3 inline-flex items-center gap-1" title="carlos">●</span>
          </p>
          <p>
            <span className="opacity-70">Integrated with live site thecarlos.in</span>
          </p>
        </div>

        {/*
           ____            _            _
          / ___|__ _ _ __ | | ___   ___| | ___  ___
         | |   / _` | '_ \| |/ _ \ / __| |/ _ \/ __|
         | |__| (_| | |_) | | (_) | (__| |  __/\__ \
          \____\__,_| .__/|_|\___/ \___|_|\___||___/
                     |_|
          carlos — subtle signature
        */}
      </div>
    </footer>
  );
}

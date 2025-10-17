## Ajay Pulikkal — Creative Portfolio (React + Vite + Tailwind, TypeScript)

Premium, production-ready portfolio built for integration into an existing site — specifically accessible from thecarlos.in Explore page at `/explore/portfolio`.

- **Tech**: React 18, TypeScript, Vite, Tailwind, ESLint, Vitest
- **Performance**: lazy images with LQIP, small bundle, no heavy deps
- **Accessibility**: semantic HTML, ARIA modals, keyboard dismiss
- **Theme**: Light/Dark with persistence
- **Easter-egg**: subtle `carlos` signature in footer tooltip/comment

### Quick start
```bash
npm i
npm run dev
# open http://localhost:5173
```

### Build & run
```bash
npm run build
npm run start
```

### Lint & test
```bash
npm run lint
npm run test
```

### Project structure
```
ajay-portfolio/
  public/
    favicon.svg
    og-cover.png
    robots.txt
  src/
    modules/ (components)
    assets/ (project images)
    projects.json
    styles.css
  index.html
  tailwind.config.ts
  vite.config.ts
```

### Configure contact endpoint
- Set `VITE_CONTACT_ENDPOINT` in `.env` or deployment env vars. Defaults to `/api/contact`.
- Fallback available: `mailto:hi@ajaypulikkal.dev`.

### Add screenshots and LQIP
- Replace `src/assets/*.jpg` with real screenshots (16:10 recommended). Update `src/projects.json` with paths.
- To generate LQIP (base64), you can use `lqip-modern` or Squoosh. Keep placeholders tiny.

### Deploy (Vercel/Netlify)
- Vercel: Import the repo, set project root to `ajay-portfolio`, build command `npm run build`, output `dist/`.
- Netlify: Drag+drop `dist/` or connect repo. Set `build = "npm run build"` and `publish = "ajay-portfolio/dist"`.
- Static hosting: any static host can serve `dist/`.

### Integration on thecarlos.in (Explore page)
- **Canonical**: `https://thecarlos.in/explore/portfolio`
- Add a link or inline embed on the Explore page.

1) Lightweight iframe embed (copy‑paste):
```html
<!-- Explore page section -->
<section id="ajay-portfolio" aria-label="Ajay Pulikkal portfolio">
  <iframe
    src="https://YOUR_DEPLOY_DOMAIN/" 
    title="Ajay Pulikkal — Portfolio"
    loading="lazy"
    style="width:100%;height:80vh;border:0;border-radius:16px;"
    referrerpolicy="strict-origin-when-cross-origin"
  ></iframe>
</section>
```

2) Route link at `/explore/portfolio` (static/Node):
- Add a route entry that serves the built `dist/` folder under `/explore/portfolio`.
- Express example:
```js
// server.js
app.use('/explore/portfolio', express.static(path.join(__dirname, 'ajay-portfolio/dist')));
```

3) Next.js page module (drop‑in page):
```tsx
// app/explore/portfolio/page.tsx
export const metadata = {
  title: 'Ajay Pulikkal — Portfolio',
  description: 'Creative portfolio for Ajay Pulikkal — Self-taught dev.',
  alternates: { canonical: 'https://thecarlos.in/explore/portfolio' },
  openGraph: { images: ['/og-cover.png'] },
};

export default function Page() {
  return (
    <iframe
      src="https://YOUR_DEPLOY_DOMAIN/"
      title="Ajay Pulikkal — Portfolio"
      style={{ width: '100%', height: '80vh', border: 0, borderRadius: 16 }}
      loading="lazy"
    />
  );
}
```

4) Next.js custom serverless route (optional static export inline):
```ts
// next.config.js
module.exports = {
  async rewrites() {
    return [{ source: '/explore/portfolio', destination: 'https://YOUR_DEPLOY_DOMAIN/' }];
  },
};
```

### SEO
- `index.html` contains title, description, canonical, OG/Twitter tags.
- Update `public/og-cover.png` and titles as needed.

### Export options
- **Option A — SPA**: Deploy `ajay-portfolio` as a static app. Easiest; embed via iframe or reverse-proxy route.
- **Option B — Next page module**: Use the Next code above to mount as a page; gives server-rendered metadata easily.

### Deploy checklist
- Replace screenshots in `src/assets` and update `projects.json`
- Set `VITE_CONTACT_ENDPOINT`
- Verify social links in header/footer
- Update `og-cover.png` and favicon
- Run `npm run build` without errors
- Add Explore page link/iframe on thecarlos.in

---
THIS PORTFOLIO IS A PREMIUM CREATIVE BUILD FOR Ajay Pulikkal — Self-taught dev. Integrate into thecarlos.in Explore page at `/explore/portfolio`.

# Grogg's Traditional Irish Pub — groggsclovis.com

A complete refresh of the Grogg's Traditional Irish Pub website, built for speed, SEO, and easy content editing.

> **Status:** Phase 0 (bootstrap) complete. See [`BUILD-CHECKLIST.md`](./BUILD-CHECKLIST.md) for the phased roadmap.

---

## Tech Stack

- **Framework:** [Astro 6](https://astro.build/) with [`@astrojs/react`](https://docs.astro.build/en/guides/integrations-guide/react/) for interactive islands
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (via the official Vite plugin) + CSS variables for theme tokens (`--pub-green`, `--wood-dark`, `--wood-darker`, `--text-primary`, `--text-secondary`)
- **Content:** Astro Content Collections (Markdown / MDX) for menu items, events, and specials — editable without a CMS, fully indexable by search engines
- **Fonts:** [Cinzel](https://fonts.google.com/specimen/Cinzel) (display) + [Lato](https://fonts.google.com/specimen/Lato) (body) via [`@fontsource`](https://fontsource.org/)
- **Icons:** [`lucide-react`](https://lucide.dev/)
- **SEO:** `@astrojs/sitemap` + JSON-LD generators (Phase 8)
- **Build optimization:** `astro-compress` (HTML/CSS/JS/SVG minification)

---

## Quick start

```bash
npm install         # install dependencies (Node 22.12+ required)
npm run dev         # start the dev server at http://localhost:4321
npm run build       # produce a static build in ./dist
npm run preview     # preview the production build locally
npm run lint        # ESLint across .ts/.tsx/.astro
npm run format      # Prettier write
```

---

## Project structure

```
src/
  layouts/           Page-level layouts (BaseLayout.astro, etc.)
  components/        Static .astro components
  components/react/  Interactive React islands
  content/           Astro Content Collections (menu, events, specials)
  pages/             File-based routes
  assets/            Images / SVGs imported by components
  styles/            Global CSS + design tokens
  lib/               Shared TS helpers (schema generators, utils)
public/              Static files served as-is (favicon, robots.txt, etc.)
```

---

## Editing content

All editable content lives under `src/content/` as plain Markdown / MDX files. Each collection has a Zod schema (defined in `src/content/config.ts` once Phase 3 lands) so the build will fail fast if a required field is missing.

| Collection | Where        | What lives here                                    |
| ---------- | ------------ | -------------------------------------------------- |
| `menu`     | `content/menu/`     | Food + drink items (name, price, category, tags) |
| `events`   | `content/events/`   | Trivia, live music, watch parties, holidays      |
| `specials` | `content/specials/` | Daily / weekly specials shown on the home page   |

To add an item, drop a new `.md` (or `.mdx`) file into the appropriate folder, fill out the frontmatter, and re-run `npm run dev` — the new entry will appear on the relevant page automatically.

---

## Reference docs

- [`BUILD-CHECKLIST.md`](./BUILD-CHECKLIST.md) — Phased build plan
- [`design.md`](./design.md) — Visual design specifications
- [`gemini-report.md`](./gemini-report.md) — Strategic / SEO analysis driving the rebuild

---

## Deployment

Hosting target is Netlify or Vercel (free tier, SSG). DNS cutover and 301 redirect map are handled in Phase 10.

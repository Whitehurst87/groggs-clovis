# Grogg's Traditional Irish Pub — Website Refresh Build Checklist

A phased, paste-into-Gemini-CLI checklist for rebuilding [groggsclovis.com](https://www.groggsclovis.com/) as a fast, SEO-rich, React-powered site.

---

## Tech Stack (locked in)

- **Framework:** Astro 4.x with `@astrojs/react` integration (React islands for interactive bits, static HTML everywhere else)
- **Styling:** Tailwind CSS via `@astrojs/tailwind` + CSS variables for theme tokens (`--pub-green`, `--wood-dark`, `--wood-darker`, `--text-primary`, `--text-secondary`)
- **Content:** Astro Content Collections (Markdown / MDX) for menu items, events, specials — editable without a CMS, fully indexable by search engines
- **Forms:** Netlify Forms or Formspree for the catering Quote form (no backend to maintain)
- **Hosting:** Netlify or Vercel (free tier, SSG)
- **Fonts:** Cinzel (headings) + Lato (body) via `@fontsource`
- **Icons:** `lucide-react`
- **Analytics:** GA4 + a lightweight consent banner (e.g. `vanilla-cookieconsent`)
- **Image handling:** Astro `<Image>` component (auto WebP/AVIF, responsive)

### Why Astro + React islands
The Gemini report leans hard on SEO (entity disambiguation away from the Cleveland "Grog Shop", schema markup, indexable menu copy, Core Web Vitals). Astro ships zero JS by default and renders everything to static HTML, which is ideal for those goals. React is brought in only where genuine interactivity is needed: the menu filter, event calendar, catering quote form, mobile nav, and lightbox.

---

## How to drive Gemini CLI with this checklist

Feed Gemini one phase at a time, in order. After each phase:

1. Run `npm run dev` and visually verify the output.
2. Commit the work in git with a descriptive message.
3. Move to the next phase.

Phases 0–2 form the foundation and should be done back-to-back. Phases 3–6 are content pages and can be parallelized. Phases 7–10 are polish/launch.

---

## Phase 0 — Project Bootstrap & Tooling

- [ ] Run `npm create astro@latest` → choose **Empty**, **TypeScript: strict**, **install dependencies: yes**, **initialize git: yes**
- [ ] Add integrations:
  - `npx astro add react`
  - `npx astro add tailwind`
  - `npx astro add sitemap`
  - `npx astro add mdx`
- [ ] Configure `astro.config.mjs` with `site: 'https://www.groggsclovis.com'`, sitemap, compress
- [ ] Set up Tailwind config with the `design.md` palette as CSS variables
- [ ] Install fonts: `npm i @fontsource/cinzel @fontsource/lato`
- [ ] Install icons: `npm i lucide-react`
- [ ] Set up ESLint + Prettier + `.editorconfig`
- [ ] Create folder structure:
  ```
  src/
    layouts/
    components/        ← .astro components
    components/react/  ← React islands
    content/
    pages/
    assets/
    styles/
    lib/
  ```
- [ ] Push to GitHub
- [ ] Add a README documenting `npm run dev`, `npm run build`, and how to edit content collections

## Phase 1 — Design System & Global Layout

- [ ] Create `BaseLayout.astro` with `<head>` SEO defaults (title, description, OG, Twitter, canonical, favicon)
- [ ] Build a reusable `<SEO>` component that accepts page-level overrides (title, description, image, type)
- [ ] Build `Header.astro`:
  - Solid green bar
  - Shamrock icon + "GROGG'S TRADITIONAL IRISH PUB" wordmark (Cinzel, all caps)
  - Center-right nav: Menu, Events, Catering, Gallery, Contact
  - Far-right green-pill CTA: "Book a Table" / "Call Us"
  - Mobile hamburger menu (React island)
- [ ] Build `Footer.astro`:
  - 3-column grid: Contact · Hours · Quick Links
  - Bottom green bar with shamrock + dynamic-year copyright
- [ ] Build a sticky mobile bottom action bar: **Call · Directions · Menu** (per Gemini's mobile UX mandate)
- [ ] Create reusable woodgrain background texture (subtle SVG or tileable WebP) and apply to `<main>`
- [ ] Build atomic components: `<Button>`, `<SectionTitle>` (with flanking dividers), `<PriceTag>`, `<Card>`
- [ ] Wire Cinzel for headings (uppercase utility class) and Lato for body
- [ ] Verify Lighthouse perf > 95 and WCAG AA contrast on dark wood backgrounds

## Phase 2 — Home Page

- [ ] Hero section: full-width image, dark gradient scrim, H1 "GROGG'S TRADITIONAL IRISH PUB", tagline "Where Tradition Meets Modern Hospitality", "VIEW MENU" CTA
- [ ] Announcement marquee bar (CSS-only scrolling text) — Trivia Tuesdays, Live DJs Fri/Sat, Beer Tasting Thursdays
- [ ] "Our Brews & Spirits" 3-card grid (pulled from content collection)
- [ ] "Daily Specials" 3-card grid with green price tags (pulled from content collection)
- [ ] "Our Story" short section addressing the Irish-pub authenticity narrative + the Leprechaun mascot (per Gemini Phase 1 identity resolution)
- [ ] "The Perfect Pour" feature block (image + caption) — directly addresses the Guinness Reddit critique
- [ ] Instagram feed section: 4-column grid (start static, hook up API/widget in Phase 7)
- [ ] Add LocalBusiness + Restaurant JSON-LD schema to the home page

## Phase 3 — Menu Page (the big SEO win)

- [ ] Define `src/content/menu/` collection schema: `name`, `description`, `price`, `category`, `tags[]`, `image?`, `featured?`
- [ ] Seed with placeholder items across categories: Traditional Irish Classics, American Pub Fare, Starters, Draft Beers, Bottles & Cans, Whiskey & Spirits, Cocktails, Non-Alcoholic
- [ ] Build `pages/menu.astro` rendering all categories as fully crawlable HTML — **no PDFs, no image-only menus** (per Gemini)
- [ ] Add a React island `<MenuFilter />` for client-side category/tag filtering
- [ ] Add Menu schema (`Menu` + `MenuSection` + `MenuItem` JSON-LD)
- [ ] Add a "Live Taps" placeholder section ready for Untappd API wiring in Phase 7
- [ ] Add anchor links from header dropdown to each menu category

## Phase 4 — Events / Calendar Page

- [ ] Define `src/content/events/` collection: `title`, `date`, `endDate?`, `recurrence?`, `description`, `image?`, `eventbriteUrl?`
- [ ] Seed with weekly recurring events (Trivia Tues, Live DJs Fri/Sat, Beer Tasting Thurs) + sample one-offs (UFC nights, St. Patrick's Day)
- [ ] Build `pages/events.astro` with **Upcoming** and **This Month** groupings
- [ ] React island `<EventCalendar />` (month grid view) — use `date-fns` only, no heavy calendar libs
- [ ] Emit `Event` JSON-LD per item with explicit `location` set to the Clovis address — **this kills the Grog Shop / Cleveland entity confusion**
- [ ] Add "Add to Calendar" `.ics` download per event

## Phase 5 — Catering / Private Events Funnel (B2B)

- [ ] Build `pages/catering.astro` as a dedicated landing page with its own hero, value prop, packages, gallery, FAQ
- [ ] Build a React `<QuoteRequestForm />` island: event date, guest count, venue location, package interest, contact info
- [ ] Wire the form to Netlify Forms or Formspree; success/error states; spam honeypot
- [ ] Add `Organization` + `Service` JSON-LD scoped to this URL
- [ ] Add a clear secondary nav path from the main header so the B2B funnel is always one click away

## Phase 6 — Gallery & Contact

- [ ] `pages/gallery.astro`: masonry/grid with lightbox (use `yet-another-react-lightbox` as a React island)
- [ ] Categories: Interior · Food · Drinks · Events · Crew
- [ ] `pages/contact.astro`: address, phone (click-to-call), hours table, embedded Google Map iframe, contact form
- [ ] Hours schema + LocalBusiness `openingHoursSpecification` (11am – 12am daily)
- [ ] "Get Directions" deep link to Google/Apple Maps

## Phase 7 — Integrations & Live Data

- [ ] **Untappd:** claim the venue at [untappd.com/v/groggs-traditional-irish-pub/116040](https://untappd.com/v/groggs-traditional-irish-pub/116040), then add an Astro endpoint or build-time fetch that pulls the live tap list and renders into `pages/menu.astro`
- [ ] **Instagram:** pick one — Instagram Basic Display API token at build time, or a third-party widget (e.g. LightWidget)
- [ ] **Eventbrite:** push event data to Eventbrite for backlinks; cross-link from the events page
- [ ] *(Optional)* OpenTable / Resy embed for "Book a Table"

## Phase 8 — SEO, Schema & Local Dominance

- [ ] Centralize JSON-LD generators in `src/lib/schema.ts` (LocalBusiness, Restaurant, Menu, Event, Organization, BreadcrumbList)
- [ ] Generate `sitemap.xml` (auto via `@astrojs/sitemap`) and `robots.txt`
- [ ] Add Open Graph images per page (`@vercel/og` or `astro-og-canvas` for auto-generation)
- [ ] Set canonical URLs on every page
- [ ] Implement 301 redirects for all old WordPress URLs (`/menu/`, `/calendar/`, `/contact-us/`, etc.) in `_redirects` (Netlify) or `vercel.json`
- [ ] Audit with Lighthouse, PageSpeed Insights, [Rich Results Test](https://search.google.com/test/rich-results), and [Schema.org Validator](https://validator.schema.org/) — fix all warnings

## Phase 9 — Compliance, Analytics & Privacy

- [ ] Add GA4 with anonymized IP
- [ ] Add `vanilla-cookieconsent` with the four categories (Essential, Functional, Analytics, Marketing) per the Gemini report
- [ ] Privacy Policy + Terms pages (templated, then customized)
- [ ] Track conversion events: menu views, click-to-call, directions click, catering form submit, reservation click

## Phase 10 — Launch & QA

- [ ] Cross-browser/device QA matrix (iOS Safari, Android Chrome, desktop Chrome/Firefox/Safari/Edge)
- [ ] Run an `axe-core` accessibility scan, fix WCAG AA violations
- [ ] Lighthouse CI in GitHub Actions to prevent perf regressions
- [ ] DNS cutover plan: configure new host, set TTL low 24h before, point `A`/`CNAME` records, monitor 301s
- [ ] Re-submit `sitemap.xml` to Google Search Console + Bing Webmaster Tools
- [ ] Update Google Business Profile, Yelp, Untappd, Facebook, Instagram bio links to the new URL
- [ ] Post-launch: set 2-week and 30-day reviews for analytics, search rankings, and bug list

---

## Parallel Track — Asset & Content Gathering (human side)

Gemini CLI can't generate these. Collect in parallel so they're ready when each phase needs them:

- [ ] Final menu copy + prices (text doc, per category)
- [ ] Professional photography: interior, food close-ups, drinks — **especially the perfect Guinness pour** to address the Reddit critique
- [ ] Hi-res logo/wordmark in SVG if possible (existing `site-logo.png` is fallback)
- [ ] Catering packages, pricing tiers, sample contracts
- [ ] Decision on the Leprechaun mascot's role / story
- [ ] Untappd venue claim
- [ ] Choose hosting (Netlify vs Vercel) and form provider (Netlify Forms vs Formspree)

---

## Reference Documents

- [`design.md`](./design.md) — Visual design specifications (colors, type, layout, components)
- [`gemini-report.md`](./gemini-report.md) — Strategic / SEO / competitive analysis driving the rebuild
- [`modern_irish_pub_home_page_dark_sophisticated_variant.png`](./modern_irish_pub_home_page_dark_sophisticated_variant.png) — Visual reference mock
- [`site-logo.png`](./site-logo.png) — Current logo (replace with SVG when available)

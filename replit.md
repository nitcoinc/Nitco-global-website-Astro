# NITCO Inc. — Next.js + TinaCMS

Marketing site built with Next.js 14 (Pages Router) and TinaCMS for content.

## Running on Replit

- Workflow `Start application` runs `npm run dev` which executes `next dev -p 5000 -H 0.0.0.0`.
- Replit's preview proxies port 5000 — the dev server must bind to `0.0.0.0:5000`.

## Scripts

- `npm run dev` — Plain Next.js dev server on port 5000 (used by the Replit workflow).
- `npm run dev:tina` — Wrapped with `tinacms dev` (requires Tina Cloud env vars: `TINA_TOKEN`, `NEXT_PUBLIC_TINA_CLIENT_ID`).
- `npm run build` / `npm run start` — Production build / start, also bound to port 5000.

## TinaCMS generated client

`lib/seoCache.js` imports from `tina/__generated__/client`. This folder is produced by `tinacms build`. To regenerate after editing `tina/` collections, run:

```
TINA_PUBLIC_IS_LOCAL=true npx tinacms build --local
```

Without Tina Cloud credentials, the local build is sufficient for the site to render. With credentials, use `npm run dev:tina` for the full editing experience.

## Porting progress (Vite/React source → Next.js Pages Router)

### Completed
- **About page** — `components/Company/AboutNew/AboutNew.js` + CSS module; `pages/company/about.js` updated
- **Navbar** — Full rewrite at `components/Navbar/Navbar.js` + `Navbar.module.css`. Glassmorphism fixed header, mega-menu dropdowns (Solutions 7-item 3-col, Partners 4-item 2-col, Company 2-item), mobile accordion, always-dark. No Bootstrap, no framer-motion — CSS modules only.
  - `NavBarMobile` stubbed to `() => null`
  - All 13 affected pages cleaned up (removed NavBarMobile imports, home-dark-nav hacks, Bootstrap wrapper divs)
  - `body { padding-top: 72px; }` added globally for fixed-nav offset
- **Resources page** — `pages/resources.js` + `components/Resources/Resources.js` + `Resources.module.css` + `lib/resourcesData.js`
  - Hero: kicker, h1, description, Library card (7 NITCO solution areas)
  - Filter bar: 5 content-type tab pills (Case Studies, Blogs, White Papers, Explainer Videos, Webinars) + topic chips for Case Studies (All, AI, RPA, Intelligent Automation, Enterprise Integration)
  - Responsive 3→2→1 column card grid with 16:9 image, type badge, title, description, date/duration footer, Read/Watch CTA
  - `getStaticProps` reads MDX files from disk (`content/allPosts/` + `content/whitepaperspost/`) via `gray-matter` — no TinaCMS API server needed at runtime; TinaCMS still manages the files
  - Case study images: `public/images/case-studies/[slug].webp` (12 local files)
  - Static enrichment data (topics, descriptions, Vimeo explainer videos) in `lib/resourcesData.js`
  - Links: Case Studies → `/case-studies/[slug]` (TinaCMS), Blogs → `/blog/[slug]` (TinaCMS), Whitepapers → `/whitepapers/[slug]` (TinaCMS), Webinars → `/webinar/[slug]` (TinaCMS), Explainer Videos → external Vimeo URLs

### Completed (continued)
- **Home page** — `components/Company/HomePage/NewHome/NewHome.js` + `NewHome.module.css`
  - Hero: full-screen video (`/HomeHero.mp4`) with gradient overlay, star-field pseudo-element, h1 + sub + 3 CTA buttons
  - "What NITCO Does": 3 scroll-reveal cards (Financial Execution, Operational Workflows, Business Decision-Making) with illustration images
  - "Our Programs": 7 icon-cards in dark navy 3-col grid (Working Capital, Workflow Automation, Decision-Ready Data, Knowledge, Customer Support, AI Delivery, AI Governance)
  - "Powered by Platforms": CSS marquee (no JS deps) auto-scrolling 13 partner logos (AWS, Automation Anywhere, Blue Prism, Boomi, Celigo, Saidot, IBM, Jitterbit, Kore.ai, Microsoft, Tray.io, UiPath, Workato) — greyscale fading in on hover
  - "Trusted by Industry Leaders": 2-up testimonial cards with prev/next arrows + dot navigation — 8 client testimonials with company logos
  - "Why NITCO": numbered list layout (01–04) with large numerals
  - "Outcomes": hover-interactive list linked to right-side image panel
  - "Engagement Model": full-bleed image BG section with CTA
  - Partner logos + testimonial SVGs copied to `public/images/HomePage/`
  - TinaCMS slug pages (`blog`, `case-studies`, `webinar`, `whitepapers`, `insights/[page]`, `[page]`) — `getStaticPaths` AND `getStaticProps` now read from disk via `gray-matter` (no TinaCMS API server required at dev/build time)

### Remaining (in order)
- Working Capital page hero
- Service pages (AI Services, AI Governance, Automation, Data, Integration)
- Platform page
- Partners pages
- Careers page

## Migration notes (Vercel → Replit)

- Dev/start scripts updated to bind `0.0.0.0:5000` (Replit preview requirement).
- TinaCMS wrapper removed from the default `dev`/`start` scripts so the app boots without Tina Cloud secrets; the wrapped versions remain available as `dev:tina`/`start:tina`.
- Generated TinaCMS client (`tina/__generated__/`) created via local Tina build.

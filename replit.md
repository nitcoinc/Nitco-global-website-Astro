# NITCO Inc. — Next.js + TinaCMS

Marketing site built with Next.js 14 (Pages Router) and TinaCMS for content.

## Run & Operate

- Workflow `Start application` runs `PORT=5000 npm run dev` → `next dev -p 5000 -H 0.0.0.0`.
- `npm run dev:tina` — requires `TINA_TOKEN` + `NEXT_PUBLIC_TINA_CLIENT_ID` env vars.
- `npm run build` / `npm run start` — production build/start bound to port 5000.
- Regenerate TinaCMS client after editing `tina/` collections: `TINA_PUBLIC_IS_LOCAL=true npx tinacms build --local`

## Stack

- **Framework**: Next.js 14.2.3 Pages Router, plain JS (no TypeScript)
- **Styling**: CSS Modules only — no Tailwind, no Bootstrap, no framer-motion
- **CMS**: TinaCMS (local-build mode; Tina Cloud optional)
- **Icons**: Inline SVG in component files (no lucide-react or other icon libs)
- **Brand**: navy bg `#080715`, primary indigo `#5C5AE0`/`#2E2D78`, cyan `#53eafd`

## Where things live

- `pages/` — Next.js pages (Pages Router)
- `components/` — React components, each folder has a CSS Module alongside
- `lib/solutionsData.js` — All 7 Solutions pages content (source of truth for copy/data)
- `lib/resourcesData.js` — Resources page enrichment data
- `content/` — MDX files managed by TinaCMS (blog, case-studies, whitepapers, webinars)
- `tina/__generated__/` — Generated TinaCMS client (do not edit manually)
- `styles/css/style.css` — Global CSS (`body { padding-top: 72px; background: #080715; }`)
- `public/images/` — Static images (logos, case-study webps, partner logos, home page assets)

## Architecture decisions

- **No TinaCMS API at runtime**: all `getStaticProps` functions read from disk via `gray-matter` or `lib/solutionsData.js`. The app builds/runs without Tina Cloud credentials.
- **Inline SVG icons**: each component defines its own `Icon({name})` switch — avoids external icon library bundle weight.
- **CSS Modules only**: each component has a co-located `.module.css` file; no global utility classes.
- **Solutions pages**: single shared template `components/Solutions/SolutionPage.js` + data in `lib/solutionsData.js`; dynamic route at `pages/solutions/[page].js`.
- **Hero visual variants**: `type: "steps" | "sparkline" | "kpigrid"` in solutionsData controls which hero card widget renders.

## Product

- **AI Agent Command Center** — `/ai-agent-command-center` — hero with live agent-status card (Data Quality Monitoring/Ask Your Data/Document Mapping), Explore Agents grid (3 cards with hover FX), How It Works 3-step section, CTA banner. Component: `components/AIAgentCommandCenter/`.
- **7 Solutions pages** — `/solutions/[slug]` — fully ported from V20 design. Each has: hero (glassmorphic card + floating chips), Problems, Focus Areas, What You Get + Outcomes (2-col), Use Cases grid, How It Starts steps, Explore Other Solutions, CTA banner.
- **Home page** — Full V20 port with video hero, 7-section layout, partner marquee, testimonial carousel.
- **Resources page** — Filterable content library (Case Studies, Blogs, White Papers, Explainer Videos, Webinars).
- **About page** — Company overview.
- **Navbar** — Glassmorphic fixed header, mega-menu dropdowns (Solutions 7-item, Partners 4-item, Company 2-item), mobile accordion.
- **TinaCMS slug pages** — blog, case-studies, webinar, whitepapers (disk-based, no API server needed).

## User preferences

- Dark navy `#080715` background everywhere — matches V20 `bg-background`.
- No animations/framer-motion — CSS transitions only.
- Inline SVG icon pattern (no icon libraries).
- Pages Router (not App Router).

## Gotchas

- `blurWidth`/`blurHeight` warnings in Footer are pre-existing and unrelated to new work.
- `body { padding-top: 72px }` is set in `styles/css/style.css` to offset the fixed navbar — do not remove.
- TinaCMS-driven catch-all `pages/[page].js` and `pages/insights/[page].js` still exist for legacy MDX content.
- Solutions navbar link for "Working Capital" must point to `/solutions/working-capital-spend-integrity` (not `/services/...`).

## Remaining pages (in order)

- Service pages (AI Services, AI Governance, Automation, Data, Integration)
- Platform page
- Partners pages
- Careers page

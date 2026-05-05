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

### Remaining (in order)
- Home page (NewHome component)
- Working Capital page hero
- Service pages (AI Services, AI Governance, Automation, Data, Integration)
- Platform page
- Partners pages
- Resources / Insights
- Careers page

## Migration notes (Vercel → Replit)

- Dev/start scripts updated to bind `0.0.0.0:5000` (Replit preview requirement).
- TinaCMS wrapper removed from the default `dev`/`start` scripts so the app boots without Tina Cloud secrets; the wrapped versions remain available as `dev:tina`/`start:tina`.
- Generated TinaCMS client (`tina/__generated__/`) created via local Tina build.

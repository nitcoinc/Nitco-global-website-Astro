# Nitco Website — Next.js → Astro Migration Context

**Started:** 2026-06-04  
**Status:** COMPLETE — Astro 6 static site live, Next.js decommissioned (2026-06-05)

---

## Architecture Decisions

| Decision | Choice | Reason |
|---|---|---|
| Island strategy | Hybrid: static → `.astro`, interactive → React islands (`@astrojs/react`) | Maximum static HTML; JS only where state/effects required |
| Output mode | `output: 'static'` (SSG) + Docker/nginx | Zero server runtime; matches current Next.js export model |
| CSP headers | nginx.conf `add_header` directives | Static hosting; Next.js headers config not available |
| Parallel structure | `astro/` subdir — Next.js untouched until cutover | Zero-risk parallel build; can A/B compare |
| TypeScript | No conversion — keep JS/JSX | Scope control; TS migration is separate backlog item |
| Sanity Studio | Untouched — fetches via `@sanity/client` at build time | Studio runs independently; Astro replaces only frontend |
| Styling | CSS Modules + global CSS carried over | No styled-components in production; no rewrite needed |
| Parity oracle | Playwright e2e + screenshot diff + Lighthouse | Objective regression detection before cutover |

---

## Conventions

### Directory layout (inside `astro/`)
```
astro/
  src/
    layouts/
      BaseLayout.astro        ← BaseLayout foundation unit
    pages/
      index.astro             ← home
      [page].astro            ← dynamic Sanity block-builder pages
      insights/[page].astro
      blog/[slug].astro
      case-studies/[slug].astro
      webinar/[slug].astro
      whitepapers/[slug].astro
      solutions/[page].astro
      partners/[slug].astro
      resources.astro
      contact.astro
      company/
        about.astro
        careers.astro
      ai-agent-command-center.astro
    components/
      islands/                ← React islands (.jsx)
      ui/                     ← Static Astro components (.astro)
    lib/
      sanity.js               ← ported from lib/sanity.js
      sanityImage.js          ← ported from lib/sanityImage.js
    styles/                   ← copied global CSS
  public/                     ← static assets
  astro.config.mjs
```

### Island directive rules
- `client:load` — visible above fold, needed immediately (Navbar)
- `client:idle` — needed soon but not blocking (GoTop)
- `client:visible` — below fold / deferred (chatbot, CountUp, video players)
- `client:only="react"` — no SSR possible (HubSpot forms, GTM-dependent widgets)

### Naming
- Static component files: `PascalCase.astro`
- Island files: `PascalCase.jsx` inside `components/islands/`
- Foundation docs: `_foundation-<unit>.md`
- Page docs: `page-<slug>.md`

### Data fetching
- All GROQ queries run at build time in `.astro` frontmatter
- `getStaticPaths()` → Astro `getStaticPaths()` equivalent
- No ISR/SSR; full rebuild on Sanity content change

---

## Section Index

### Foundation Units (port first, in order)

1. [sanity-client-lib](docs/migration/_foundation-sanity-client-lib.md) — `lib/sanity.js` + `lib/sanityImage.js`
2. [image-helper](docs/migration/_foundation-image-helper.md) — `urlFor()` → Astro remote patterns
3. [seo-head](docs/migration/_foundation-seo-head.md) — `lib/fetchSeoData.js` + `lib/seoCache.js` → Astro head slot
4. [global-styles-and-scripts](docs/migration/_foundation-global-styles-and-scripts.md) — `_app.js` + `_document.js` GTM
5. [base-layout](docs/migration/_foundation-base-layout.md) — `components/Layout.js` → `BaseLayout.astro`
6. [navbar-island](docs/migration/_foundation-navbar-island.md) — `components/Navbar/Navbar.js` → React island
7. [footer](docs/migration/_foundation-footer.md) — `components/Footer/` → static `.astro`
8. [gotop-island](docs/migration/_foundation-gotop-island.md) — `components/GoTop.js` → React island

### Pages (port after foundation; in recommended order)

| # | Route | Doc | Complexity | Status |
|---|---|---|---|---|
| 1 | `/company/about` | [page-company-about](docs/migration/page-company-about.md) | low | pending |
| 2 | `/company/careers` | [page-company-careers](docs/migration/page-company-careers.md) | low | pending |
| 3 | `/contact` | [page-contact](docs/migration/page-contact.md) | med | pending |
| 4 | `/resources` | [page-resources](docs/migration/page-resources.md) | med | pending |
| 5 | `/blog/[slug]` | [page-blog-slug](docs/migration/page-blog-slug.md) | med | pending |
| 6 | `/case-studies/[slug]` | [page-case-studies-slug](docs/migration/page-case-studies-slug.md) | med | pending |
| 7 | `/webinar/[slug]` | [page-webinar-slug](docs/migration/page-webinar-slug.md) | med | pending |
| 8 | `/solutions/[page]` | [page-solutions-page](docs/migration/page-solutions-page.md) | med | pending |
| 9 | `/partners/[slug]` | [page-partners-slug](docs/migration/page-partners-slug.md) | med | pending |
| 10 | `/ai-agent-command-center` | [page-ai-agent-command-center](docs/migration/page-ai-agent-command-center.md) | med | pending |
| 11 | `/whitepapers/[slug]` | [page-whitepapers-slug](docs/migration/page-whitepapers-slug.md) | high | pending |
| 12 | `/insights/[page]` | [page-insights-page](docs/migration/page-insights-page.md) | high | pending |
| 13 | `/[page]` | [page-dynamic-page](docs/migration/page-dynamic-page.md) | high | pending |
| 14 | `/` | [page-index](docs/migration/page-index.md) | high | pending |

---

## Risk Register Summary

| Risk | Item | Mitigation |
|---|---|---|
| HIGH | **Kore.ai chatbot** — injected via `<script>` + DOM callbacks in `LazyChatbot.js` | Wrap in `client:only="react"` island; load script via Effect; test bot appears post-hydration |
| HIGH | **GROQ block-builder** — `Blocks.js` with 10 block types, dynamic component map | Port each block type individually; test each block variant in Playwright |
| HIGH | **HubSpot dynamic injection** — form embed + whitepaper gating in `HubSpotWhitepapersForm` | `client:only="react"` island; HubSpot script loaded in Effect; fallback if script blocked |
| HIGH | **GTM in `_document.js`** — custom `<Document>` injects GTM head/body scripts | Move to `BaseLayout.astro` head slot; verify dataLayer fires on page load |

---

## Improvement Backlog (deferred — NOT applied during parity phase)

- Remove `next-auth` (dead dep — zero usage in production code)
- Remove `graphql` (dead dep)
- Remove `next-video` (dead dep)
- Remove `react-google-recaptcha-v3` (dead dep — ContactForm calls HubSpot directly)
- Remove `styled-components` (in deps, zero production usage)
- Dedup Bootstrap / CSS (currently loaded via CDN + npm)
- Astro Content Collections for blog/insights MDX (post-parity)
- TypeScript adoption (separate workstream)
- Image optimization — replace `<img>` tags with Astro `<Image>` component (post-parity)

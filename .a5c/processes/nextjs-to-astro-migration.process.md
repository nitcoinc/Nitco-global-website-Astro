# Process — Next.js 14 → Astro Migration (Nitco)

**Process ID:** `specializations/code-migration-modernization/nextjs-to-astro-migration`
**Entry:** `.a5c/processes/nextjs-to-astro-migration.js#process`
**Mode:** interactive · breakpoints route to `owner`

## Confirmed decisions
| Dimension | Choice |
|---|---|
| Component conversion | **Hybrid islands** — static → `.astro`, interactive → React islands (`@astrojs/react`); styled-components survives only inside islands |
| Render/host | **Static SSG + Docker** — `output: 'static'`, nginx serves `/dist`, CSP/headers → `nginx.conf` |
| Scope | **Strict 1:1 parity** + improvement backlog applied only after approval (Phase 7) |
| Sequencing | **Incremental page-by-page, gated** per route |
| Repo layout | **Parallel `astro/` subdir** — Next untouched until cutover, swap at end |
| Parity oracle | **Playwright e2e + screenshot diff + Lighthouse**, baseline captured from current Next build |
| Language | **Keep JS/JSX** (TypeScript → backlog) |
| Sanity Studio | **Untouched** — Astro fetches via `@sanity/client` at build time, same GROQ |

## Subject inventory (from analysis)
- 18 routes, all SSG (`getStaticProps`/`getStaticPaths`); **zero API routes** → clean static target
- Sanity block page-builder (`components/Blocks.js` + `sanity/schemas/blocks/*`)
- 3rd-party scripts: Iubenda, GTM/GA, Kore.ai chatbot, RB2B/leadsy, HubSpot, reCAPTCHA, LinkedIn
- Styling: styled-components + SCSS + Bootstrap + boxicons/flaticon/switzer
- Dead dep: `next-auth` (in deps, no usage) → backlog removal

## Phases
0. **Inventory + Root Context Doc + Baseline** — read every file; write `MIGRATION_CONTEXT.md` (root) linking one `docs/migration/<section>.md` per page/foundation unit; capture parity baseline (build + 22 e2e + screenshots + Lighthouse + sitemap/redirects/CSP snapshot). → gate
1. **Migration Plan** — `docs/migration/PLAN.md`: route map, styling/island/Sanity/scripts/SEO/headers strategy, deferred backlog. → refine loop + gate
2. **Astro Scaffold** (`astro/`) — integrations, base layout, global CSS, scripts, sitemap, redirects, `nginx.conf`; smoke build. → gate
3. **Foundation Port** — Layout, Navbar, Footer, SEO head, GoTop, Sanity client/image, global styles+scripts. Each: build + gate
4. **Per-Page Migration Loop** (the core) — for each route, ordered simple→complex→home: `convert → build → verify (e2e+diff+LH) → adversarial regression review → refine loop → per-page gate`
5. **Full-Site Integration** — full build + all 22 e2e + Lighthouse + sitemap/redirects/headers parity + broken-link crawl. → gate
6. **Cutover (DESTRUCTIVE)** — explicit gate → create revert tag → swap `astro/`→root, remove Next, rewrite Docker→nginx static → post-cutover full regression → final gate
7. **Improvement Backlog (opt-in)** — propose prioritized list (remove next-auth, dedupe CSS, a11y, perf, TS); apply only selected items, each parity-verified

## Task kinds
`agent` (general-purpose) for analysis/coding/docs/QA orchestration · `shell` for `pnpm build` · `breakpoint` for every gate. No `node` kind.

## Quality gates
- No page advances without: e2e pass + screenshot diff ≤ 2% + Lighthouse ≥ baseline + adversarial review verdict `pass` + owner approval
- Cutover requires explicit destructive-git approval and a pre-cutover revert ref
- Parity (Phase 0–6) never mixes with improvements (Phase 7)

## Failure handling
Every gate uses a 3-attempt refine loop; rejection feeds feedback into a re-run, never hard-fails the run. Cutover always creates a revert ref first.

## Outputs
`MIGRATION_CONTEXT.md`, `docs/migration/*` (per-section + `PLAN.md`), working Astro app, nginx/Docker config, parity report, improvement backlog.

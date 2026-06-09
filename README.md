# Nitco Inc — Global Website

Astro 6 static marketing site for [nitcoinc.com](https://nitcoinc.com). Content managed via Sanity v5. Deployed as a Docker container (nginx serving static output).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 6.4.4 (`output: static`) |
| UI | React 19 |
| CMS | Sanity v5 (hosted at sanity.io) |
| Styling | Bootstrap 5 + custom CSS |
| Package manager | pnpm 10 |
| Runtime | Node.js 22 build → nginx:alpine serving `dist/` |
| Testing | Playwright (E2E) + Lighthouse CI |
| CI | GitHub Actions |

## Prerequisites

- Node.js 22+
- pnpm 10+ (`npm install -g pnpm`)
- Git

## Local Development

```sh
git clone https://github.com/pmandapati-nitcoinc/Nitco-global-website-v1.git
cd Nitco-global-website-v1
pnpm install
```

Copy env file and fill in values:

```sh
cp .env.example .env
```

Required env vars (see `.env.example` for full list):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=   # from sanity.io project settings
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_TOKEN=                    # read token from sanity.io
```

Run dev server:

```sh
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```sh
pnpm run build
pnpm run start
```

## Testing

```sh
# E2E smoke tests (requires built + running server)
pnpm run test:e2e

# Lighthouse CI
pnpm run lhci
```

## Docker

```sh
docker build -t nitco-global .
docker run -p 3000:3000 --env-file .env nitco-global
```

## Content Management

Content lives in two places:

- **Sanity Studio** — blog posts, case studies, whitepapers, team, pages. Access at [nitcoinc.sanity.studio](https://nitcoinc.sanity.studio).
- **`content/`** — local MDX files for allPosts, whitepapers, users (legacy, being migrated to Sanity).

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (production) |
| `SANITY_TOKEN` | Sanity read token |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID |
| `NEXT_PUBLIC_IUBENDA_SITE_ID` | Iubenda cookie consent |
| `NEXT_PUBLIC_KORE_API_KEY` | Kore.ai chatbot SDK key |

## Branch Workflow

```sh
# Feature work
git checkout -b feat/your-feature
git push origin feat/your-feature
gh pr create
```

Main branch deploys automatically via CI/CD pipeline.

## Deployment — Cloudflare Pages

### CF Pages dashboard settings

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| Node.js version | `22` |
| Root directory | `/` |

### Environment variables (set in CF Pages dashboard)

| Variable | Example value | Required |
|---|---|---|
| PUBLIC_SANITY_PROJECT_ID | t8ctf4dg | Yes |
| PUBLIC_SANITY_DATASET | production | Yes |
| PUBLIC_GTM_ID | GTM-K6CXJBJN | Yes |
| PUBLIC_IUBENDA_SITE_ID | 2053600 | Yes |
| PUBLIC_IUBENDA_COOKIE_POLICY_ID | 12542728 | Yes |
| PUBLIC_LEADSY_PID | — | Optional |
| PUBLIC_RB2B_KEY | — | Optional |
| PUBLIC_SCRIPTINTEL_TAG_URL | — | Optional |
| PUBLIC_KORE_API_KEY | — | Optional |

> Note: `SANITY_TOKEN` is NOT required — the site uses `useCdn: true` for public content.
> Docker/nginx setup is for staging — see `Dockerfile` and `nginx.conf`.

### Auto-rebuild on Sanity content publish

1. In CF Pages dashboard → **Settings → Builds & Deployments → Deploy hooks** → Add deploy hook → name it "Sanity publish" → copy the generated URL.
2. In Sanity Studio → **Manage project** (manage.sanity.io) → **API → Webhooks** → Add webhook:
   - Name: CF Pages rebuild
   - URL: (paste the deploy hook URL)
   - Dataset: production
   - Trigger on: Document published
3. Test by publishing a document in Sanity Studio — CF Pages should auto-trigger a build within seconds.

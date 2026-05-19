# Nitco Inc — Global Website

Next.js 14 marketing site for [nitcoinc.com](https://nitcoinc.com). Content managed via Sanity v5. Deployed as a Docker container.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2.3 (`output: standalone`) |
| UI | React 19 |
| CMS | Sanity v5 (hosted at sanity.io) |
| Styling | Bootstrap 5 + custom CSS |
| Package manager | pnpm 10 |
| Runtime | Node.js 22 (Alpine Docker image) |
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

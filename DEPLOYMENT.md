# Deployment Guide

> Astro 6 static site. **Production** → Cloudflare Pages (git integration, auto-build on push). **Staging** → Docker / nginx.

## Quick-start checklist

Steps to go from zero to live on Cloudflare Pages:

1. Connect the GitHub repo to a new CF Pages project
2. Set build settings (see table below)
3. Add all required environment variables in CF Pages dashboard
4. Push to `main` — CF Pages builds and deploys automatically
5. Set up Sanity webhook for auto-rebuild on content publish (optional but recommended)

---

## Cloudflare Pages

### Dashboard build settings

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| Node.js version | `22` |
| Root directory | `/` |

### Environment variables

Set these in **CF Pages → Settings → Environment variables → Production** (and Preview if needed):

| Variable | Example value | Required | Description |
|---|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | `t8ctf4dg` | ✅ Required | Sanity project ID |
| `PUBLIC_SANITY_DATASET` | `production` | ✅ Required | Sanity dataset name |
| `PUBLIC_GTM_ID` | `GTM-K6CXJBJN` | ✅ Required | Google Tag Manager container ID |
| `PUBLIC_IUBENDA_SITE_ID` | `2053600` | ✅ Required | Iubenda consent management site ID |
| `PUBLIC_IUBENDA_COOKIE_POLICY_ID` | `12542728` | ✅ Required | Iubenda cookie policy ID |
| `PUBLIC_LEADSY_PID` | *(your value)* | Optional | Leadsy tracking pixel ID |
| `PUBLIC_RB2B_KEY` | *(your value)* | Optional | RB2B pixel key |
| `PUBLIC_SCRIPTINTEL_TAG_URL` | *(full URL with API key)* | Optional | ScriptIntel visitor intelligence tag URL |
| `PUBLIC_KORE_API_KEY` | *(your value)* | Optional | Kore.ai chatbot widget API key |

> **Note:** `SANITY_TOKEN` is **not required**. The site uses `useCdn: true` which reads public content from Sanity's CDN without authentication. Only add `SANITY_TOKEN` if you need to query draft or private content.

### Config files (committed to repo, auto-deployed)

These files live in `public/` and are copied to `dist/` at build time — Cloudflare Pages picks them up automatically:

| File | Purpose |
|---|---|
| `public/_headers` | Security headers for all routes: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, full `Content-Security-Policy`. Plus 1-year immutable cache headers for `/assets/*` and `/_astro/*`. |
| `public/_redirects` | URL redirects (currently empty — placeholder only). Add `301`/`302` rules here as needed. |
| `.nvmrc` | Pins Node.js to version `22`. CF Pages reads this automatically. |

> Cloudflare handles HTTPS and HSTS at the edge — `Strict-Transport-Security` is intentionally omitted from `_headers`.

### Git integration

CF Pages is connected via git integration. Every push to `main` triggers an automatic build (`pnpm run build`) and deploys the `dist/` output globally. No manual `wrangler` commands are needed for routine deployments. Preview deployments are created automatically for non-main branches.

---

## Sanity CMS

### Project details

| Property | Value |
|---|---|
| Project ID | `t8ctf4dg` |
| Dataset | `production` |
| Studio host | `nitco-global.sanity.studio` |
| API version | `2024-01-01` |

### Auto-rebuild on content publish (webhook)

Configure a webhook so that publishing content in Sanity Studio automatically triggers a CF Pages rebuild:

1. In **CF Pages dashboard** → **Settings → Builds & Deployments → Deploy hooks** → click **Add deploy hook**.
   - Name: `Sanity publish`
   - Branch: `main`
   - Copy the generated webhook URL.

2. Go to [manage.sanity.io](https://manage.sanity.io) → select your project → **API → Webhooks** → click **Add webhook**:
   - **Name:** CF Pages rebuild
   - **URL:** *(paste the deploy hook URL from step 1)*
   - **Dataset:** `production`
   - **Trigger on:** Document published
   - Leave other settings as defaults.

3. Click **Save**. Test by publishing any document in Sanity Studio — a new CF Pages build should appear within ~30 seconds.

### Notes on authentication

The Astro site uses `useCdn: true` in `src/lib/sanity.js`, which means:

- All Sanity reads go through the public CDN — **no API token needed**.
- Content is fetched **client-side** by React island components at runtime.
- `SANITY_TOKEN` (in `.env`) is only needed if you add server-side queries for **draft** or **private** content. Leave it empty for standard production use.

---

## Staging (Docker)

Build and run the nginx-based staging image locally:

```bash
# Build the image
docker build -t nitco-web .

# Run on port 8080
docker run -p 8080:80 nitco-web

# Open http://localhost:8080
```

The `Dockerfile` uses a two-stage build (Node 22 Alpine → nginx Alpine). `nginx.conf` applies the same security headers as `public/_headers` plus gzip compression. The staged image is identical to production except it uses nginx instead of Cloudflare's edge.

---

## Local development

```bash
# Start dev server (hot reload, :4321)
pnpm dev

# Production build to dist/
pnpm build

# Preview the production build locally
pnpm preview

# Run end-to-end tests
pnpm test:e2e
```

---

## Troubleshooting

- **Build fails: "projectId is undefined"** — `PUBLIC_SANITY_PROJECT_ID` is not set in CF Pages environment variables. Add it in the dashboard.
- **Sanity images not loading** — `cdn.sanity.io` is in the `img-src` CSP directive in `public/_headers`. If adding a new image domain, update that file.
- **Content not updating after publish** — The Sanity webhook may not be configured. Check **manage.sanity.io → API → Webhooks** and verify it points to the correct CF Pages deploy hook URL.
- **`SANITY_TOKEN` left blank** — This is correct for production. The site reads public content via CDN; no token is needed.
- **404 pages** — Astro generates `dist/404.html`. Both CF Pages and nginx serve it automatically on missing routes.
- **Tracking scripts not loading** — If `PUBLIC_GTM_ID` or other tracking vars are empty, the scripts are guarded and will not render. Set the values in CF Pages environment variables.

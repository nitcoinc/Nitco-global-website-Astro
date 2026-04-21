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

## Migration notes (Vercel → Replit)

- Dev/start scripts updated to bind `0.0.0.0:5000` (Replit preview requirement).
- TinaCMS wrapper removed from the default `dev`/`start` scripts so the app boots without Tina Cloud secrets; the wrapped versions remain available as `dev:tina`/`start:tina`.
- Generated TinaCMS client (`tina/__generated__/`) created via local Tina build.

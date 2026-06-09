# Foundation: sanity-client-lib

**Status:** done  
**Source files:** `lib/sanity.js`, `lib/sanityImage.js`  
**Used by:** All 14 page docs — every page fetches from Sanity

---

## Current Implementation

`lib/sanity.js` creates and exports a `sanityClient` via `@sanity/client`:
- Reads `projectId`, `dataset`, `apiVersion`, `useCdn` from `next.config.js` env or process.env
- Used directly in `getStaticProps` / `getServerSideProps` calls throughout pages

`lib/sanityImage.js` exports `urlFor()` which wraps `@sanity/image-url` builder against the same client config.

Both files are plain JS modules — no React, no Next.js API. Port is straightforward.

---

## Port Strategy

1. Copy `lib/sanity.js` → `astro/src/lib/sanity.js`
2. Replace any `process.env.NEXT_PUBLIC_*` references with `import.meta.env.PUBLIC_*`
3. Copy `lib/sanityImage.js` → `astro/src/lib/sanityImage.js` (no changes needed beyond env vars)
4. Verify `@sanity/client` and `@sanity/image-url` are in `astro/package.json`

Env var mapping:
| Next.js var | Astro var |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `PUBLIC_SANITY_PROJECT_ID` |
| `NEXT_PUBLIC_SANITY_DATASET` | `PUBLIC_SANITY_DATASET` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `PUBLIC_SANITY_API_VERSION` |

---

## Astro Target

```js
// astro/src/lib/sanity.js
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION ?? '2023-01-01',
  useCdn: true,
});
```

`urlFor` moves to `_foundation-image-helper`.

---

## Port Notes (2026-06-04)

- `astro/src/lib/sanity.js` already used `PUBLIC_*` env vars — no changes needed.
- Created `astro/src/lib/sanityImage.js`: verbatim copy of `lib/sanityImage.js`, import updated to `./sanity.js`.
- Copied `solutionsData.js`, `partnersData.js`, `resourcesData.js` verbatim — pure static data, no Next.js deps.
- Fixed `fetchSeoData.js` glob path: `../../content/seo/` → `../../../content/seo/` (content dir is at project root, not inside astro/).
- Build exit code: 0. 1 page built successfully.

---

## Parity Checklist

- [ ] `sanityClient.fetch()` returns same data shape as Next.js version
- [ ] Env vars present in `.env` and `.env.production`
- [ ] `urlFor()` generates identical image URLs
- [ ] No `NEXT_PUBLIC_` references remain in `astro/src/lib/`

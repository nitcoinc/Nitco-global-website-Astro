# Sanity Image Migration + v4 Upgrade

**Date:** 2026-05-19
**Status:** Approved

## Problem

- All 122 Sanity documents (`post`, `whitepaper`) store `image` as `type: 'string'` containing local paths like `/uploads/posts-Details/Blogs/137 filename.webp`
- Images are served from `public/uploads/` (static files bundled with the app) — no CDN, no transforms
- Sanity v3 deprecates on July 15, 2026; v4 requires Node 20+ (already on Node 24)
- PDFs are already on HubSpot CDN — no migration needed

## Goals

1. Upgrade Sanity to v4
2. Migrate `image` fields to native `type: 'image'` assets hosted on Sanity CDN
3. Enable `@sanity/image-url` transforms (WebP, resize by context)
4. Normalize asset filenames on upload (strip numeric prefixes, lowercase, hyphens)
5. Document all migration errors in `migration-errors.md` for manual review
6. Remove `public/uploads/posts-Details/` after successful migration

## Out of Scope

- PDF migration (`pdfFileUrl` stays as `type: 'url'`, already on HubSpot CDN)
- Video migration (explainer videos use Vimeo, local MP4s are orphaned)
- `type: 'image'` upgrade for `page` schema blocks (separate task)

## Architecture

### Schema Changes

Three schema files updated:

**`sanity/schemas/post.js`**
```js
// before
{ name: 'image', title: 'Image path', type: 'string' }
// after
{ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
```

**`sanity/schemas/whitepaper.js`**
```js
// before
{ name: 'image', title: 'Image path', type: 'string' }
// after
{ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
```

**`sanity/schemas/navbar.js`**
```js
// before
{ name: 'navbarImage', title: 'Logo image path', type: 'string' }
// after
{ name: 'navbarImage', title: 'Logo', type: 'image' }
```

### Migration Script: `scripts/migrate-images.mjs`

Runs once, standalone Node script.

**Flow per document:**
1. Fetch all docs with `image != null` via GROQ
2. Resolve local file: strip leading `/`, join with `public/` directory
3. Normalize filename: strip leading digits+space (`137 ` → ``), replace spaces with `-`, lowercase, keep extension
4. Upload to Sanity asset store via `client.assets.upload('image', fileStream, { filename })`
5. Patch document: `{ image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } } }`
6. On any error: append row to `migration-errors.md`

**Error log format (`migration-errors.md`):**
```
| Doc ID | Title | Type | Original Image Path | Error |
|--------|-------|------|---------------------|-------|
```

**Script env vars needed:**
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_TOKEN` (write token — already in `.env.local`)

### Image URL Helper: `lib/sanityImage.js`

```js
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity.js'

const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source) => builder.image(source)
```

Usage:
```js
import { urlFor } from '@/lib/sanityImage'
<img src={urlFor(image).width(800).format('webp').url()} />
```

### GROQ Query Updates

All pages fetching `image` must project:
```js
image { asset->{ _id, url, metadata { dimensions } } }
```

Affected pages (9 files):
- `pages/blog/[slug].js`
- `pages/whitepapers/[slug].js`
- `pages/case-studies/[slug].js`
- `pages/webinar/[slug].js`
- `pages/partners/[slug].js`
- `pages/resources.js`
- `pages/index.js`
- `pages/[page].js`
- `pages/company/about.js`

### Component Updates

All `<img src={image}>` → `<img src={urlFor(image).width(W).format('webp').url()}>`.

Widths by context:
- Card thumbnails: `width(400)`
- Hero/detail images: `width(1200)`
- Listing row images: `width(600)`

Affected components (10 files):
- `components/Resources/resourceListingPage/blogpage.js`
- `components/Resources/resourceListingPage/casestudies.js`
- `components/Resources/resourceListingPage/webinar.js`
- `components/Resources/resourceListingPage/WhitePapers.js`
- `components/Resources/resourceDetailedPage/AllPost.js`
- `components/Resources/resourceDetailedPage/whitepaperpost.js`
- `components/Resources/Resources.js`
- `components/Partners/PartnerPage.js`
- `components/AboutUs/AboutUs.js`
- `components/Navbar/` (for navbarImage)

## Implementation Phases

| Phase | Task | Effort |
|-------|------|--------|
| 1 | Sanity v4 upgrade | 30 min |
| 2 | Schema changes + Studio redeploy | 30 min |
| 3 | Migration script + run | 2–3 hrs |
| 4 | `lib/sanityImage.js` helper | 15 min |
| 5 | GROQ query updates (9 files) | 1 hr |
| 6 | Component updates (10 files) | 1–2 hrs |
| 7 | Cleanup `public/uploads/posts-Details/` | 15 min |

## Risks

- **File not found**: some Sanity image strings may not match a local file (typo, deleted). Script logs to `migration-errors.md`, skips, continues.
- **Duplicate uploads**: script is not idempotent — running twice uploads assets twice. Add a check: if document's `image` is already `type: 'image'` (object), skip it.
- **Navbar image**: `navbar` schema has `navbarImage` — check current value before migration, may be empty.
- **`about.js` leader images**: `AboutUs.js` renders `leader.image` — check if leader images come from Sanity or a local data file.

## Success Criteria

- All 122 documents have `image` as a Sanity asset reference (not a string)
- `migration-errors.md` reviewed and all errors resolved or accepted
- All pages render images from `cdn.sanity.io`
- `public/uploads/posts-Details/` deleted from repo
- Studio shows native image upload UI for all content types

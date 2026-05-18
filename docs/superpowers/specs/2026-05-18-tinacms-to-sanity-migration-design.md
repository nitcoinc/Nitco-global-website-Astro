# TinaCMS → Sanity CMS Migration Design

**Date:** 2026-05-18
**Approach:** Phased sequential (schema → content migration → component rewrites → cutover)
**Estimate:** 8–11 days

---

## Context

Nitco global website is a Next.js 14 app using TinaCMS for content management. TinaCMS requires a running server at `localhost:4001` during development and TinaCloud credentials at runtime — causing friction in Docker builds and deployment. Sanity CMS replaces TinaCMS with a hosted Studio, GROQ-based queries, and no local server dependency.

### Content inventory (pre-migration)
| Type | Count | Location |
|------|-------|----------|
| Blog/case-study/webinar posts | 64 | `content/allPosts/*.mdx` |
| Whitepapers | 58 | `content/whitepaperspost/*.mdx` |
| Page blocks | 7 | `content/pages/*.mdx` |
| Navbar | 1 | `content/singleDocumentCollections/` |
| SEO | per-page JSON | `content/singleDocumentCollections/` |

### JSX/HTML audit result
No JSX components, no imports, no JS expressions in any MDX file. 4 files contain basic HTML (`<ul><li>` in tables, `<span id="">` anchors) — all handled by `@portabletext/from-markdown` natively.

### Media strategy
Keep `public/uploads/` self-hosted. All image fields store `/uploads/...` path strings. No Sanity CDN migration.

---

## Architecture

### Sanity document types

| Tina collection | Sanity type | Notes |
|----------------|-------------|-------|
| `allPosts` | `post` | `postType` field: `blog` \| `caseStudy` \| `webinar` \| `casestudy` |
| `whitePaper` | `whitepaper` | direct field mapping |
| `page` | `page` | `blocks[]` array of 9 object schemas |
| `navBar` | `navbar` | singleton document |
| `seoCollection` | `seo` | per-page SEO metadata |

### Block schemas (9 object types)

Derived from `components/Blocks.js` `__typename` cases:

| Sanity name | Tina `__typename` | Purpose |
|------------|-------------------|---------|
| `blogBlock` | `PageBlocksBlogBlock` | Blog listing page — filter options only |
| `caseStudiesBlock` | `PageBlocksCaseStudiesBlock` | Case studies listing |
| `whitePapersBlock` | `PageBlocksWhitePapersBlock` | Whitepapers listing |
| `webinarBlock` | `PageBlocksWebinarBlock` | Webinar listing |
| `buttonBlock` | `PageBlocksButtonBlock` | Video buttons area |
| `leftVideoBlock` | `PageBlocksLeftVideoBlock` | Left-aligned video |
| `rightVideoBlock` | `PageBlocksRightVideoBlock` | Right-aligned video |
| `policyBlock` | `PageBlocksPolicydefinitionsBlock` | Privacy policy content |
| `cookieBlock` | `PageBlocksCookieTypesBlock` | Cookie policy content |

### Key architectural change: listing blocks

Current Tina approach embeds all post data inline inside `blocks[].blogpost[]` arrays in page MDX frontmatter. This means `content/pages/insights__blogs.mdx` contains a full copy of every blog post's metadata.

Sanity approach: listing blocks (`blogBlock`, `caseStudiesBlock`, etc.) store only filter options (category, postType, limit). `getStaticProps` runs a GROQ query against `post` and `whitepaper` documents to fetch listing data at build time. No inline duplication.

---

## Phases

### Phase 1: Sanity schema setup

**Goal:** All document types defined and visible in Sanity Studio. Zero content.

**Deliverables:**
- `sanity/` directory with schema files
- `sanity.config.js` at repo root
- `lib/sanity.js` — client singleton + GROQ query helpers
- Sanity Studio deployable via `npx sanity dev`

**Verification gate:** `npx sanity dev` starts without errors. Studio shows all 5 document types. Can manually create a test document.

### Phase 2: Content migration script

**Goal:** All 130 MDX files imported as Sanity documents.

**Deliverables:**
- `scripts/migrate-to-sanity.mjs` — reads MDX, transforms, uploads via Sanity mutations
- Handles: gray-matter frontmatter parsing, `@portabletext/from-markdown` for body, `postType` derivation from filename prefix, slug extraction

**Filename → postType mapping:**
```
blog__*         → postType: "blog"
case-studies__* → postType: "caseStudy"
webinar__*      → postType: "webinar"
```

**Verification gate:** Sanity Studio shows exactly 64 posts, 58 whitepapers, 7 pages after script runs. Spot-check 3 documents for field accuracy.

### Phase 3: Component and route rewrites

**Goal:** App fetches all content from Sanity. TinaCMS code removed.

**Files changed:**

| File | Change |
|------|--------|
| `lib/sanity.js` | New — Sanity client + GROQ helpers |
| `pages/[page].js` | Replace `client.queries.page()` with GROQ. `getStaticPaths` from Sanity slugs. |
| `pages/insights/[page].js` | Same pattern |
| `components/Blocks.js` | Update switch-case data access to Sanity field names |
| `components/Page.js` | Remove `useTina` hook, accept plain props |
| `components/AllPost.js` | Remove `useTina` hook, accept plain props |
| `components/whitepaperpost.js` | Remove `useTina` hook, accept plain props |

**GROQ query pattern (example):**
```js
// getStaticProps for [page].js
const page = await client.fetch(
  `*[_type == "page" && slug.current == $slug][0]{
    _id, slug, pageType,
    blocks[]{
      _type,
      // block-specific fields
    }
  }`,
  { slug }
)
```

**Listing block GROQ (blogBlock example):**
```js
const posts = await client.fetch(
  `*[_type == "post" && postType == "blog"] | order(postedOn desc) {
    slug, headingpro, image, postedOn, postedBy, duration, description,
    blogcategory, blogindustry, blogdepartment
  }`
)
```

### Phase 4: Cutover and cleanup

**Goal:** TinaCMS fully removed. Build passes. Docs updated.

**Deliverables:**
- Remove `tina/` directory
- Remove `public/admin/` directory
- Remove TinaCMS deps: `tinacms`, `@tinacms/datalayer`, `tinacms-authjs`, `tinacms-gitprovider-github`, `mongodb-level`, `mongodb`
- Update `.env.example` (already done — Sanity vars added)
- Update `next.config.js` to remove any TinaCMS webpack config
- Update `.gitignore` — remove `tina/.tina__temp/` entry, add `sanity/` Studio build output if applicable
- Remove `tina/__generated__/` committed files

---

## Dependencies

### Add
```
@sanity/client       — Sanity JS client (runtime)
next-sanity          — Next.js integration helpers
@portabletext/react  — Render Portable Text in React components
```

### Add (dev/migration only)
```
@portabletext/from-markdown  — Convert Markdown body to Portable Text AST
gray-matter                  — Parse MDX frontmatter (already installed — verify)
```

### Remove
```
tinacms
@tinacms/datalayer
tinacms-authjs
tinacms-gitprovider-github
mongodb-level
mongodb
```

---

## Environment variables

### New (add to `.env`)
```
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_TOKEN=                        # editor token — server-side only

NEXT_PUBLIC_SANITY_PROJECT_ID=       # same value as SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
```

### Remove (after cutover)
```
TINA_TOKEN
NEXT_PUBLIC_TINA_CLIENT_ID
NEXT_PUBLIC_TINA_BRANCH
GITHUB_PERSONAL_ACCESS_TOKEN
MONGODB_URI
NEXTAUTH_SECRET
```

---

## Testing

Each phase has a hard verification gate before proceeding.

| Phase | Gate |
|-------|------|
| 1 — Schema | `npx sanity dev` starts. Studio shows 5 document types. |
| 2 — Content | Studio: 64 posts, 58 whitepapers, 7 pages. Spot-check 3 docs. |
| 3 — Components | `pnpm run build` exits 0. All 148 pages generate without error. |
| 4 — Cutover | `pnpm run build` still passes. Playwright smoke test: home, one blog post, one insights listing. |

---

## Risks and mitigations

| Risk | Mitigation |
|------|-----------|
| Portable Text conversion loses formatting | Spot-check 5 longest posts in Studio after migration |
| GROQ query returns wrong post subset | Verify document counts per postType in Studio before rewriting components |
| Sanity rate limits during bulk import | Migration script uses batched mutations (100 docs per transaction) |
| `next.config.js` has TinaCMS-specific webpack config | Audit before removing — CSS url() fix must be preserved |

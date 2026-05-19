# Sanity Image Migration + v4 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all post/whitepaper images from `public/uploads/` static files to Sanity CDN, upgrade Sanity to v4, switch schemas to `type: 'image'`, and enable image transforms via a unified helper.

**Architecture:** Pages read images from two sources — MDX frontmatter (most pages) and Sanity GROQ queries (`pages/[page].js`). The migration script uploads images to Sanity, updates MDX frontmatter with CDN URL strings, and patches Sanity documents with native image references. A unified `lib/sanityImage.js` helper handles transforms for both string URLs (MDX) and Sanity image objects (GROQ), so component code stays consistent.

**Tech Stack:** Node.js 24, Sanity v4, `@sanity/client`, `@sanity/image-url`, gray-matter (MDX parsing), Next.js 14

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | Modify | Upgrade sanity, @sanity/client; add @sanity/image-url |
| `sanity/schemas/post.js` | Modify | `image` → `type: 'image'` |
| `sanity/schemas/whitepaper.js` | Modify | `image` → `type: 'image'` |
| `sanity/schemas/navbar.js` | Modify | `navbarImage` → `type: 'image'` |
| `scripts/migrate-images.mjs` | Create | Upload images, patch MDX + Sanity docs |
| `migration-errors.md` | Create (auto) | Error log from migration script |
| `lib/sanityImage.js` | Create | Unified image URL/transform helper |
| `pages/[page].js` | Modify | GROQ queries project `image.asset->url` as string |
| `components/Resources/resourceListingPage/blogpage.js` | Modify | Use `urlFor` helper |
| `components/Resources/resourceListingPage/casestudies.js` | Modify | Use `urlFor` helper |
| `components/Resources/resourceListingPage/webinar.js` | Modify | Use `urlFor` helper |
| `components/Resources/resourceListingPage/WhitePapers.js` | Modify | Use `urlFor` helper |
| `components/Resources/resourceDetailedPage/AllPost.js` | Modify | Use `urlFor` helper |
| `components/Resources/resourceDetailedPage/whitepaperpost.js` | Modify | Use `urlFor` helper |
| `components/Resources/Resources.js` | Modify | Use `urlFor` helper |

---

## Task 1: Upgrade Sanity to v4

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Upgrade packages**

```bash
pnpm add sanity@latest @sanity/client@latest
```

Expected: installs sanity v4.x and @sanity/client v7.x

- [ ] **Step 2: Verify Studio starts**

```bash
pnpm exec sanity dev
```

Expected: Studio starts on http://localhost:3333 with no errors. Ctrl+C to stop.

- [ ] **Step 3: Verify data fetch works**

```bash
node -e "
const {createClient} = require('@sanity/client');
const c = createClient({ projectId: 't8ctf4dg', dataset: 'production', apiVersion: '2024-01-01', useCdn: false });
c.fetch('count(*[_type == \"post\"])').then(n => console.log('posts:', n));
"
```

Expected: `posts: 122` (or similar non-zero number)

- [ ] **Step 4: Install image-url package**

```bash
pnpm add @sanity/image-url
```

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: upgrade sanity to v4, add @sanity/image-url"
```

---

## Task 2: Update Sanity Schemas

**Files:**
- Modify: `sanity/schemas/post.js`
- Modify: `sanity/schemas/whitepaper.js`
- Modify: `sanity/schemas/navbar.js`

- [ ] **Step 1: Update post schema**

In `sanity/schemas/post.js`, replace:
```js
{ name: 'image', title: 'Image path', type: 'string' },
```
With:
```js
{ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
```

- [ ] **Step 2: Update whitepaper schema**

In `sanity/schemas/whitepaper.js`, replace:
```js
{ name: 'image', title: 'Image path', type: 'string' },
```
With:
```js
{ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
```

- [ ] **Step 3: Update navbar schema**

In `sanity/schemas/navbar.js`, replace:
```js
{ name: 'navbarImage', title: 'Logo image path', type: 'string' },
```
With:
```js
{ name: 'navbarImage', title: 'Logo', type: 'image' },
```

- [ ] **Step 4: Redeploy Studio**

```bash
npx sanity deploy
```

When prompted for hostname, use the same hostname as before (check `.sanity/` folder for existing deployment name). Expected: Studio deploys with updated schemas showing native image upload UI.

- [ ] **Step 5: Commit**

```bash
git add sanity/schemas/post.js sanity/schemas/whitepaper.js sanity/schemas/navbar.js
git commit -m "feat: upgrade image fields to native Sanity image type"
```

---

## Task 3: Create Migration Script

**Files:**
- Create: `scripts/migrate-images.mjs`

This script: reads all MDX files + Sanity docs → finds each image file locally → uploads to Sanity → updates MDX frontmatter with CDN URL → patches Sanity doc with native image reference → logs errors to `migration-errors.md`.

- [ ] **Step 1: Create the script**

Create `scripts/migrate-images.mjs` with the following content:

```js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { createClient } from '@sanity/client'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 't8ctf4dg',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const errors = []

function normalizeFilename(filePath) {
  const base = path.basename(filePath)
  return base
    .replace(/^\d+\s+/, '')       // strip leading "137 "
    .replace(/\s+/g, '-')         // spaces to hyphens
    .toLowerCase()
}

function resolveLocalPath(imagePath) {
  // imagePath is like /uploads/posts-Details/Blogs/137 filename.webp
  const relative = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  return path.join(ROOT, 'public', relative)
}

async function uploadImage(localPath, filename) {
  const stream = fs.createReadStream(localPath)
  const ext = path.extname(localPath).slice(1)
  const asset = await client.assets.upload('image', stream, {
    filename,
    contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
  })
  return asset
}

function buildImageRef(assetId) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
  }
}

// Cache: imagePath -> { assetId, cdnUrl }
const uploadCache = new Map()

async function getOrUploadImage(imagePath) {
  if (uploadCache.has(imagePath)) return uploadCache.get(imagePath)

  const localPath = resolveLocalPath(imagePath)
  if (!fs.existsSync(localPath)) {
    return null
  }

  const filename = normalizeFilename(imagePath)
  try {
    const asset = await uploadImage(localPath, filename)
    const result = { assetId: asset._id, cdnUrl: asset.url }
    uploadCache.set(imagePath, result)
    return result
  } catch (err) {
    return null
  }
}

// ── MDX migration ────────────────────────────────────────────────────────────

async function migrateMdxDir(dirPath, label) {
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
  console.log(`\n[${label}] ${files.length} files`)

  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const raw = fs.readFileSync(filePath, 'utf8')
    const parsed = matter(raw)

    const imagePath = parsed.data.image
    if (!imagePath || !imagePath.startsWith('/uploads/')) continue
    if (!imagePath.includes('posts-Details')) continue

    console.log(`  Uploading: ${imagePath}`)
    const result = await getOrUploadImage(imagePath)

    if (!result) {
      errors.push({ file: filePath, imagePath, error: 'File not found or upload failed' })
      console.log(`  ERROR: ${imagePath}`)
      continue
    }

    // Update frontmatter
    parsed.data.image = result.cdnUrl
    const newContent = matter.stringify(parsed.content, parsed.data)
    fs.writeFileSync(filePath, newContent, 'utf8')
    console.log(`  Updated MDX: ${result.cdnUrl}`)
  }
}

// ── Sanity migration ─────────────────────────────────────────────────────────

async function migrateSanityDocs() {
  console.log('\n[Sanity] Fetching documents...')
  const docs = await client.fetch(
    `*[_type in ["post","whitepaper"] && defined(image) && image._type != "image"]{_id, _type, title, image}`
  )
  console.log(`[Sanity] ${docs.length} documents to migrate`)

  for (const doc of docs) {
    const imagePath = doc.image
    if (typeof imagePath !== 'string') continue
    if (!imagePath.startsWith('/uploads/')) {
      errors.push({ sanityId: doc._id, title: doc.title, imagePath, error: 'Unexpected image format (not /uploads/ path)' })
      continue
    }

    console.log(`  [${doc._type}] ${doc.title?.slice(0, 50)}`)
    const result = await getOrUploadImage(imagePath)

    if (!result) {
      errors.push({ sanityId: doc._id, title: doc.title, imagePath, error: 'File not found or upload failed' })
      console.log(`  ERROR: ${imagePath}`)
      continue
    }

    try {
      await client.patch(doc._id).set({ image: buildImageRef(result.assetId) }).commit()
      console.log(`  Patched Sanity doc: ${result.assetId}`)
    } catch (err) {
      errors.push({ sanityId: doc._id, title: doc.title, imagePath, error: `Patch failed: ${err.message}` })
    }
  }
}

// ── Error report ─────────────────────────────────────────────────────────────

function writeErrorReport() {
  const outPath = path.join(ROOT, 'migration-errors.md')
  if (errors.length === 0) {
    fs.writeFileSync(outPath, '# Migration Errors\n\nNo errors. All images migrated successfully.\n')
    console.log('\nAll done. No errors.')
    return
  }

  const rows = errors.map(e => {
    const id = e.sanityId || e.file || ''
    const title = e.title || path.basename(e.file || '')
    return `| ${id} | ${title} | ${e.imagePath || ''} | ${e.error} |`
  })

  const md = [
    '# Migration Errors',
    '',
    'Review each row and fix manually in Sanity Studio or by re-running the script after fixing the local file.',
    '',
    '| ID / File | Title | Image Path | Error |',
    '|-----------|-------|------------|-------|',
    ...rows,
    '',
  ].join('\n')

  fs.writeFileSync(outPath, md, 'utf8')
  console.log(`\n${errors.length} errors written to migration-errors.md`)
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('SANITY_TOKEN env var required')
    process.exit(1)
  }

  await migrateMdxDir(path.join(ROOT, 'content', 'allPosts'), 'allPosts')
  await migrateMdxDir(path.join(ROOT, 'content', 'whitepaperspost'), 'whitepaperspost')
  await migrateSanityDocs()
  writeErrorReport()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
```

- [ ] **Step 2: Add script to package.json**

In `package.json`, add to `"scripts"`:
```json
"migrate:images": "node --env-file=.env.local scripts/migrate-images.mjs"
```

- [ ] **Step 3: Commit**

```bash
git add scripts/migrate-images.mjs package.json
git commit -m "feat: add image migration script for Sanity CDN upload"
```

---

## Task 4: Run Migration Script

**Prerequisites:** Task 2 (schemas deployed) and Task 3 (script created) must be complete.

- [ ] **Step 1: Dry-run check — verify one file**

Check a known file exists locally before running full migration:
```bash
ls "public/uploads/posts-Details/Blogs/137 What-to-Look-for-When-Evaluating-RPA-Solutions.webp" 2>/dev/null && echo "exists" || echo "MISSING"
```

- [ ] **Step 2: Run the migration**

```bash
pnpm run migrate:images
```

Expected output: lines showing `Uploading:` and `Updated MDX:` for each image. Final line shows error count.

- [ ] **Step 3: Verify MDX updated**

```bash
head -10 content/allPosts/blog__uniting-boomi-and-rpa-for-efficiency-and-precision.mdx
```

Expected: `image:` field now shows `https://cdn.sanity.io/images/t8ctf4dg/production/...`

- [ ] **Step 4: Verify Sanity doc updated**

```bash
node -e "
const {createClient} = require('@sanity/client');
const c = createClient({ projectId: 't8ctf4dg', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token: process.env.SANITY_TOKEN });
c.fetch('*[_type==\"post\"][0]{title, image}').then(r => console.log(JSON.stringify(r, null, 2)));
" --env-file=.env.local
```

Expected: `image` field is now `{ "_type": "image", "asset": { "_type": "reference", "_ref": "image-..." } }`

- [ ] **Step 5: Review error report**

```bash
cat migration-errors.md
```

Document any errors. If errors exist, investigate and fix before continuing.

- [ ] **Step 6: Commit migrated MDX files**

```bash
git add content/
git commit -m "chore: migrate image paths to Sanity CDN URLs in MDX frontmatter"
```

---

## Task 5: Create `lib/sanityImage.js` Helper

**Files:**
- Create: `lib/sanityImage.js`

The helper handles two cases: string URLs (from MDX after migration) and Sanity image objects (from GROQ on `pages/[page].js`). Both produce a transform-enabled URL.

- [ ] **Step 1: Create the helper**

Create `lib/sanityImage.js`:

```js
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity.js'

const builder = imageUrlBuilder(sanityClient)

/**
 * Returns a transformed image URL.
 * Accepts either a Sanity image object { _type: 'image', asset: {...} }
 * or a plain CDN URL string (from MDX frontmatter).
 *
 * @param {object|string} source
 * @param {{ width?: number, height?: number, format?: string }} opts
 * @returns {string}
 */
export function urlFor(source, opts = {}) {
  if (!source) return ''

  if (typeof source === 'string') {
    try {
      const url = new URL(source)
      if (opts.width) url.searchParams.set('w', String(opts.width))
      if (opts.height) url.searchParams.set('h', String(opts.height))
      url.searchParams.set('auto', 'format')
      return url.toString()
    } catch {
      return source
    }
  }

  // Sanity image object
  let b = builder.image(source).auto('format')
  if (opts.width) b = b.width(opts.width)
  if (opts.height) b = b.height(opts.height)
  if (opts.format) b = b.format(opts.format)
  return b.url()
}
```

- [ ] **Step 2: Verify helper works**

```bash
node -e "
import('./lib/sanityImage.js').then(({ urlFor }) => {
  // Test string URL
  const str = urlFor('https://cdn.sanity.io/images/t8ctf4dg/production/test.webp', { width: 800 });
  console.log('string result:', str);
  // Should contain ?w=800&auto=format
  console.assert(str.includes('w=800'), 'missing width param');
  console.log('PASS');
});
"
```

- [ ] **Step 3: Commit**

```bash
git add lib/sanityImage.js
git commit -m "feat: add sanityImage urlFor helper for image transforms"
```

---

## Task 6: Update `pages/[page].js` GROQ Queries

**Files:**
- Modify: `pages/[page].js`

This page reads directly from Sanity. After the schema change, `image` is a native Sanity image object. Project it as a URL string so components receive consistent data.

- [ ] **Step 1: Update POSTS_QUERY**

In `pages/[page].js`, replace:
```js
const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  "slug": slug.current, postType, title, image, publishedAt, postedBy, duration,
  description, blogcategory, blogindustry, blogdepartment
}`
```
With:
```js
const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  "slug": slug.current, postType, title,
  "image": image.asset->url,
  publishedAt, postedBy, duration,
  description, blogcategory, blogindustry, blogdepartment
}`
```

- [ ] **Step 2: Update WHITEPAPERS_QUERY**

Replace:
```js
const WHITEPAPERS_QUERY = `*[_type == "whitepaper"] | order(_createdAt desc) {
  "slug": slug.current, title, image, pdfFileUrl, description
}`
```
With:
```js
const WHITEPAPERS_QUERY = `*[_type == "whitepaper"] | order(_createdAt desc) {
  "slug": slug.current, title,
  "image": image.asset->url,
  pdfFileUrl, description
}`
```

- [ ] **Step 3: Commit**

```bash
git add pages/[page].js
git commit -m "fix: project Sanity image as URL string in [page].js GROQ queries"
```

---

## Task 7: Update Components to Use `urlFor`

**Files:**
- Modify: `components/Resources/resourceListingPage/blogpage.js`
- Modify: `components/Resources/resourceListingPage/casestudies.js`
- Modify: `components/Resources/resourceListingPage/webinar.js`
- Modify: `components/Resources/resourceListingPage/WhitePapers.js`
- Modify: `components/Resources/resourceDetailedPage/AllPost.js`
- Modify: `components/Resources/resourceDetailedPage/whitepaperpost.js`
- Modify: `components/Resources/Resources.js`

Width guidelines:
- Card thumbnail in listing grid: `width: 400`
- Hero image in detail page: `width: 1200`
- Small card/row image: `width: 600`

For each component below, add the import and replace `src={image}` with `src={urlFor(image, { width: X })}`.

- [ ] **Step 1: Update `blogpage.js`**

Add import at top of file:
```js
import { urlFor } from '../../../lib/sanityImage.js'
```

Replace all occurrences of `src={image}` with:
```js
src={urlFor(image, { width: 400 })}
```

- [ ] **Step 2: Update `casestudies.js`**

Add import at top of file:
```js
import { urlFor } from '../../../lib/sanityImage.js'
```

Replace all occurrences of `src={image}` with:
```js
src={urlFor(image, { width: 400 })}
```

- [ ] **Step 3: Update `webinar.js`**

Add import at top of file:
```js
import { urlFor } from '../../../lib/sanityImage.js'
```

Replace all occurrences of `src={image}` with:
```js
src={urlFor(image, { width: 400 })}
```

- [ ] **Step 4: Update `WhitePapers.js`**

Add import at top of file:
```js
import { urlFor } from '../../../lib/sanityImage.js'
```

Replace all occurrences of `src={image}` with:
```js
src={urlFor(image, { width: 400 })}
```

- [ ] **Step 5: Update `AllPost.js`**

Add import at top of file:
```js
import { urlFor } from '../../lib/sanityImage.js'
```

Find the hero image render (line ~61):
```js
<img src={image} alt={title || pageType} className={styles.heroImg} />
```
Replace with:
```js
<img src={urlFor(image, { width: 1200 })} alt={title || pageType} className={styles.heroImg} />
```

Find the related posts images (line ~96):
```js
src={p.image}
```
Replace with:
```js
src={urlFor(p.image, { width: 400 })}
```

- [ ] **Step 6: Update `whitepaperpost.js`**

Add import at top of file:
```js
import { urlFor } from '../../lib/sanityImage.js'
```

Replace:
```js
src={whitepaper.image}
```
With:
```js
src={urlFor(whitepaper.image, { width: 1200 })}
```

- [ ] **Step 7: Update `Resources.js`**

Add import at top of file:
```js
import { urlFor } from '../../lib/sanityImage.js'
```

Find `src={image}` (line ~62) and replace with:
```js
src={urlFor(image, { width: 600 })}
```

- [ ] **Step 8: Build to check for errors**

```bash
pnpm run build
```

Expected: build completes with no errors. Fix any import path issues if they appear.

- [ ] **Step 9: Commit**

```bash
git add components/Resources/
git commit -m "feat: use urlFor helper for image transforms in all listing/detail components"
```

---

## Task 8: Cleanup

**Files:**
- Delete: `public/uploads/posts-Details/`

- [ ] **Step 1: Verify no MDX files still reference /uploads/posts-Details/**

```bash
grep -r "posts-Details" content/ --include="*.mdx" | wc -l
```

Expected: `0`. If non-zero, the migration script missed some files — re-run Task 4.

- [ ] **Step 2: Verify no component code references /uploads/posts-Details/**

```bash
grep -r "posts-Details" pages/ components/ lib/ --include="*.js" --include="*.ts" --include="*.tsx"
```

Expected: no output.

- [ ] **Step 3: Delete the folder**

```bash
rm -rf public/uploads/posts-Details
```

- [ ] **Step 4: Check build still passes**

```bash
pnpm run build
```

Expected: build succeeds.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: remove public/uploads/posts-Details after Sanity CDN migration"
```

---

## Notes for Subagent Parallelism

Tasks 1, 2, 3, 5 have no dependencies on each other and can run in parallel.
Task 4 (run migration) requires Tasks 2 and 3 complete first.
Task 6 (GROQ updates) requires Task 2 complete first.
Task 7 (component updates) requires Task 5 complete first.
Task 8 (cleanup) requires Task 4 complete first.

## Error Recovery

If `migration-errors.md` lists files with "File not found":
1. Search for the file with a looser name match: `find public/uploads -iname "*keyword*"`
2. If found under a different path, update the Sanity doc manually in Studio
3. If the file is truly missing, add the image manually via Studio's upload UI

If `migration-errors.md` lists "Patch failed":
1. The image was uploaded (CDN URL in MDX is correct)
2. Only the Sanity document reference is wrong
3. Open the document in Studio, upload the same image manually

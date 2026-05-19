# TinaCMS → Sanity CMS Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace TinaCMS with Sanity CMS across the Nitco Next.js app — schema, content migration, component rewrites, and full cutover — so the app builds without TinaCloud credentials or a local Tina server.

**Architecture:** Phased sequential: (1) define Sanity schemas and client, (2) run migration script to import 130 MDX files as Sanity documents, (3) rewrite Next.js pages and components to query Sanity via GROQ, (4) remove all TinaCMS code and dependencies. Each phase has a hard verification gate before proceeding.

**Tech Stack:** Next.js 14 (Pages Router), `@sanity/client` v6, Sanity Studio v3, `@portabletext/react`, `@portabletext/from-markdown` (migration only), `gray-matter` (migration only), pnpm.

---

## Content inventory (reference)

| Source MDX folder | Count | Sanity type | Key fields |
|---|---|---|---|
| `content/allPosts/` | 64 | `post` | slug, title, image, date, postType, body |
| `content/whitepaperspost/` | 58 | `whitepaper` | slug, title, image, pdfFileUrl, body |
| `content/pages/` | 7 | `page` | slug, pageType, blocks[] |
| `content/singleDocumentCollections/NavBar.mdx` | 1 | `navbar` (singleton) | navbarImage |

**postType derivation from MDX `pageType` field:**
- `pageType: blog` → `postType: "blog"` (48 files)
- `pageType: case-studies` → `postType: "caseStudy"` (12 files)
- `pageType: webinar` → `postType: "webinar"` (4 files)

**Block templates found in pages MDX:**
`blogBlock`, `CaseStudiesBlock`, `whitePapersBlock`, `webinarBlock`, `buttonBlock`, `RightVideoBlock`, `LeftVideoBlock`, `policydefinitionsBlock`, `CookieTypesBlock`, `Pagebannerblock`

---

## File map

### New files (Phase 1)
```
sanity.config.js                         Studio + CLI config
sanity.cli.js                            CLI project pointer
sanity/schemas/post.js                   Post document schema
sanity/schemas/whitepaper.js             Whitepaper document schema
sanity/schemas/page.js                   Page document schema (with blocks[])
sanity/schemas/navbar.js                 Navbar singleton schema
sanity/schemas/blocks/blogBlock.js       Blog listing block (no editable fields)
sanity/schemas/blocks/caseStudiesBlock.js
sanity/schemas/blocks/whitePapersBlock.js
sanity/schemas/blocks/webinarBlock.js
sanity/schemas/blocks/buttonBlock.js     buttonList: [{name, url}]
sanity/schemas/blocks/rightVideoBlock.js tagline_R_V, text_R_V, video_R_V, url_R_V
sanity/schemas/blocks/leftVideoBlock.js  tagline_L_V, text_L_V, video_L_V
sanity/schemas/blocks/policyBlock.js     mainheading, lastupdated, body (PT)
sanity/schemas/blocks/cookieBlock.js     mainheading, lastupdated, body (PT)
sanity/schemas/blocks/pageBannerBlock.js no fields (renders nothing in app)
sanity/schemas/index.js                  Schema registry — exports schemaTypes[]
lib/sanity.js                            Sanity client singleton
```

### New files (Phase 2)
```
scripts/migrate-to-sanity.mjs            Migration script — MDX → Sanity documents
```

### Modified files (Phase 3)
```
pages/[page].js                          GROQ replaces TinaCMS client queries
pages/insights/[page].js                 Same
components/Blocks.js                     Field names updated to Sanity shape
components/Page.js                       useTina removed, plain props
components/AllPost.js                    useTina removed, plain props
components/whitepaperpost.js             useTina removed, plain props
```

### Modified files (Phase 4)
```
next.config.js                           Remove /admin rewrite
.gitignore                               Remove tina/.tina__temp/, add .sanity/
package.json                             Remove TinaCMS deps (via pnpm remove)
```

### Deleted files (Phase 4)
```
tina/                                    Entire directory
public/admin/                            Entire directory
tina/__generated__/                      (inside tina/, deleted with it)
```

---

## Phase 1: Sanity schema setup

### Task 1: Install packages

**Files:** `package.json`, `pnpm-lock.yaml`

- [ ] **Step 1: Install runtime deps**

```bash
pnpm add @sanity/client @portabletext/react
```

- [ ] **Step 2: Install Studio as dev dep**

```bash
pnpm add -D sanity
```

- [ ] **Step 3: Verify installs**

```bash
node -e "require('@sanity/client'); console.log('client ok')"
node -e "require('@portabletext/react'); console.log('pt ok')"
```

Expected: two lines of `ok` output, no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "deps: add @sanity/client, @portabletext/react, sanity studio"
```

---

### Task 2: Create post schema

**Files:** Create `sanity/schemas/post.js`

- [ ] **Step 1: Create file**

```js
export const post = {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    },
    {
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: { list: ['blog', 'caseStudy', 'webinar'] },
      validation: (R) => R.required(),
    },
    { name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() },
    { name: 'image', title: 'Image path', type: 'string' },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    { name: 'postedBy', title: 'Posted by', type: 'string' },
    { name: 'duration', title: 'Read duration', type: 'string' },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'blogcategory', title: 'Category', type: 'string' },
    { name: 'blogindustry', title: 'Industry', type: 'string' },
    { name: 'blogdepartment', title: 'Department', type: 'string' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'postType' },
  },
}
```

---

### Task 3: Create whitepaper schema

**Files:** Create `sanity/schemas/whitepaper.js`

- [ ] **Step 1: Create file**

```js
export const whitepaper = {
  name: 'whitepaper',
  title: 'Whitepaper',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    },
    { name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() },
    { name: 'image', title: 'Image path', type: 'string' },
    { name: 'pdfFileUrl', title: 'PDF URL', type: 'url' },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
  ],
  preview: {
    select: { title: 'title' },
  },
}
```

---

### Task 4: Create block schemas

**Files:** Create `sanity/schemas/blocks/blogBlock.js` and 8 sibling files.

- [ ] **Step 1: Create blogBlock.js**

```js
export const blogBlock = {
  name: 'blogBlock',
  title: 'Blog Listing',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string' },
  ],
}
```

- [ ] **Step 2: Create caseStudiesBlock.js**

```js
export const caseStudiesBlock = {
  name: 'caseStudiesBlock',
  title: 'Case Studies Listing',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string' },
  ],
}
```

- [ ] **Step 3: Create whitePapersBlock.js**

```js
export const whitePapersBlock = {
  name: 'whitePapersBlock',
  title: 'Whitepapers Listing',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string' },
  ],
}
```

- [ ] **Step 4: Create webinarBlock.js**

```js
export const webinarBlock = {
  name: 'webinarBlock',
  title: 'Webinar Listing',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string' },
  ],
}
```

- [ ] **Step 5: Create buttonBlock.js**

```js
export const buttonBlock = {
  name: 'buttonBlock',
  title: 'Button List',
  type: 'object',
  fields: [
    {
      name: 'buttonList',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Label', type: 'string' },
            { name: 'url', title: 'URL', type: 'string' },
          ],
        },
      ],
    },
  ],
}
```

- [ ] **Step 6: Create rightVideoBlock.js**

```js
export const rightVideoBlock = {
  name: 'rightVideoBlock',
  title: 'Right Video',
  type: 'object',
  fields: [
    { name: 'tagline_R_V', title: 'Tagline', type: 'string' },
    { name: 'text_R_V', title: 'Text', type: 'text', rows: 3 },
    { name: 'video_R_V', title: 'Video URL', type: 'url' },
    { name: 'url_R_V', title: 'Link URL', type: 'string' },
  ],
}
```

- [ ] **Step 7: Create leftVideoBlock.js**

```js
export const leftVideoBlock = {
  name: 'leftVideoBlock',
  title: 'Left Video',
  type: 'object',
  fields: [
    { name: 'tagline_L_V', title: 'Tagline', type: 'string' },
    { name: 'text_L_V', title: 'Text', type: 'text', rows: 3 },
    { name: 'video_L_V', title: 'Video URL', type: 'url' },
  ],
}
```

- [ ] **Step 8: Create policyBlock.js**

```js
export const policyBlock = {
  name: 'policyBlock',
  title: 'Privacy Policy Content',
  type: 'object',
  fields: [
    { name: 'mainheading', title: 'Heading', type: 'string' },
    { name: 'lastupdated', title: 'Last updated', type: 'datetime' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
  ],
}
```

- [ ] **Step 9: Create cookieBlock.js**

```js
export const cookieBlock = {
  name: 'cookieBlock',
  title: 'Cookie Policy Content',
  type: 'object',
  fields: [
    { name: 'mainheading', title: 'Heading', type: 'string' },
    { name: 'lastupdated', title: 'Last updated', type: 'datetime' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
  ],
}
```

- [ ] **Step 10: Create pageBannerBlock.js**

```js
export const pageBannerBlock = {
  name: 'pageBannerBlock',
  title: 'Page Banner',
  type: 'object',
  fields: [
    { name: 'label', title: 'Label', type: 'string' },
  ],
}
```

---

### Task 5: Create page schema

**Files:** Create `sanity/schemas/page.js`

- [ ] **Step 1: Create file**

```js
export const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'pageType' },
      validation: (R) => R.required(),
    },
    {
      name: 'pageType',
      title: 'Page type',
      type: 'string',
      options: { list: ['insights', 'none'] },
    },
    {
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        { type: 'blogBlock' },
        { type: 'caseStudiesBlock' },
        { type: 'whitePapersBlock' },
        { type: 'webinarBlock' },
        { type: 'buttonBlock' },
        { type: 'rightVideoBlock' },
        { type: 'leftVideoBlock' },
        { type: 'policyBlock' },
        { type: 'cookieBlock' },
        { type: 'pageBannerBlock' },
      ],
    },
  ],
  preview: {
    select: { title: 'pageType', subtitle: 'slug.current' },
  },
}
```

---

### Task 6: Create navbar schema

**Files:** Create `sanity/schemas/navbar.js`

- [ ] **Step 1: Create file**

```js
export const navbar = {
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    { name: 'navbarImage', title: 'Logo image path', type: 'string' },
  ],
  __experimental_omnisearch_visibility: false,
}
```

---

### Task 7: Create schema index

**Files:** Create `sanity/schemas/index.js`

- [ ] **Step 1: Create file**

```js
import { post } from './post.js'
import { whitepaper } from './whitepaper.js'
import { page } from './page.js'
import { navbar } from './navbar.js'
import { blogBlock } from './blocks/blogBlock.js'
import { caseStudiesBlock } from './blocks/caseStudiesBlock.js'
import { whitePapersBlock } from './blocks/whitePapersBlock.js'
import { webinarBlock } from './blocks/webinarBlock.js'
import { buttonBlock } from './blocks/buttonBlock.js'
import { rightVideoBlock } from './blocks/rightVideoBlock.js'
import { leftVideoBlock } from './blocks/leftVideoBlock.js'
import { policyBlock } from './blocks/policyBlock.js'
import { cookieBlock } from './blocks/cookieBlock.js'
import { pageBannerBlock } from './blocks/pageBannerBlock.js'

export const schemaTypes = [
  post,
  whitepaper,
  page,
  navbar,
  blogBlock,
  caseStudiesBlock,
  whitePapersBlock,
  webinarBlock,
  buttonBlock,
  rightVideoBlock,
  leftVideoBlock,
  policyBlock,
  cookieBlock,
  pageBannerBlock,
]
```

---

### Task 8: Create sanity.config.js and sanity.cli.js

**Files:** Create `sanity.config.js`, `sanity.cli.js`

- [ ] **Step 1: Create sanity.config.js**

```js
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas/index.js'

export default defineConfig({
  name: 'nitco-global',
  title: 'Nitco Global',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
```

- [ ] **Step 2: Create sanity.cli.js**

```js
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
})
```

---

### Task 9: Create lib/sanity.js client

**Files:** Create `lib/sanity.js`

- [ ] **Step 1: Create file**

```js
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

- [ ] **Step 2: Verify client instantiates**

```bash
node -e "
const { createClient } = require('@sanity/client');
const c = createClient({ projectId: 'test', dataset: 'production', apiVersion: '2024-01-01', useCdn: true });
console.log('client ok:', !!c);
"
```

Expected: `client ok: true`

---

### Task 10: Verify Studio starts

**Files:** none

- [ ] **Step 1: Start Studio**

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=$(grep NEXT_PUBLIC_SANITY_PROJECT_ID .env | cut -d= -f2) \
NEXT_PUBLIC_SANITY_DATASET=production \
pnpm sanity dev
```

Expected: Studio opens at `http://localhost:3333`. Log in with Sanity account.

- [ ] **Step 2: Verify document types in Studio**

In the Studio sidebar confirm these document types appear:
- Post
- Whitepaper
- Page
- Navbar

Create one test Post document. Set slug, postType, title. Save. Confirm no errors.

- [ ] **Step 3: Delete test document and commit**

Delete the test document in Studio, then:

```bash
git add sanity/ sanity.config.js sanity.cli.js lib/sanity.js
git commit -m "feat: add Sanity schemas, Studio config, and client"
```

---

## Phase 2: Content migration script

### Task 11: Install migration devDeps

**Files:** `package.json`, `pnpm-lock.yaml`

- [ ] **Step 1: Install gray-matter and portable text converter**

```bash
pnpm add -D gray-matter @portabletext/from-markdown
```

- [ ] **Step 2: Verify**

```bash
node -e "require('gray-matter'); console.log('gray-matter ok')"
```

Expected: `gray-matter ok`

---

### Task 12: Write migration script

**Files:** Create `scripts/migrate-to-sanity.mjs`

- [ ] **Step 1: Create the script**

```js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fromMarkdown } from '@portabletext/from-markdown'
import { createClient } from '@sanity/client'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

function slugify(str) {
  return str.replace(/\s+/g, '-').toLowerCase()
}

function derivePostType(pageType) {
  if (pageType === 'case-studies') return 'caseStudy'
  if (pageType === 'webinar') return 'webinar'
  return 'blog'
}

function mdxToPortableText(mdxBody) {
  if (!mdxBody || mdxBody.trim() === '') return []
  try {
    return fromMarkdown(mdxBody)
  } catch {
    return []
  }
}

async function migratePosts() {
  const dir = path.join(ROOT, 'content/allPosts')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  const docs = files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
    const { data: fm, content } = matter(raw)
    return {
      _type: 'post',
      _id: `post-${fm.slug}`,
      slug: { _type: 'slug', current: fm.slug },
      postType: derivePostType(fm.pageType),
      title: fm.title || '',
      image: fm.image || '',
      publishedAt: fm.date || null,
      body: mdxToPortableText(content),
    }
  })
  console.log(`Migrating ${docs.length} posts...`)
  for (let i = 0; i < docs.length; i += 100) {
    const batch = docs.slice(i, i + 100)
    const tx = client.transaction()
    batch.forEach((doc) => tx.createOrReplace(doc))
    await tx.commit()
    console.log(`  committed batch ${Math.floor(i / 100) + 1}`)
  }
  console.log(`Done: ${docs.length} posts`)
}

async function migrateWhitepapers() {
  const dir = path.join(ROOT, 'content/whitepaperspost')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  const docs = files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
    const { data: fm, content } = matter(raw)
    return {
      _type: 'whitepaper',
      _id: `whitepaper-${fm.slug}`,
      slug: { _type: 'slug', current: fm.slug },
      title: fm.title || '',
      image: fm.image || '',
      pdfFileUrl: fm.pdfFileUrl || null,
      body: mdxToPortableText(content),
    }
  })
  console.log(`Migrating ${docs.length} whitepapers...`)
  for (let i = 0; i < docs.length; i += 100) {
    const batch = docs.slice(i, i + 100)
    const tx = client.transaction()
    batch.forEach((doc) => tx.createOrReplace(doc))
    await tx.commit()
    console.log(`  committed batch ${Math.floor(i / 100) + 1}`)
  }
  console.log(`Done: ${docs.length} whitepapers`)
}

async function migratePages() {
  const dir = path.join(ROOT, 'content/pages')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  const BLOCK_TYPE_MAP = {
    blogBlock: 'blogBlock',
    CaseStudiesBlock: 'caseStudiesBlock',
    whitePapersBlock: 'whitePapersBlock',
    webinarBlock: 'webinarBlock',
    buttonBlock: 'buttonBlock',
    RightVideoBlock: 'rightVideoBlock',
    LeftVideoBlock: 'leftVideoBlock',
    policydefinitionsBlock: 'policyBlock',
    CookieTypesBlock: 'cookieBlock',
    Pagebannerblock: 'pageBannerBlock',
  }

  const docs = files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
    const { data: fm } = matter(raw)
    const rawBlocks = fm.blocks || []
    const blocks = rawBlocks.map((b) => {
      const tinaType = b._template
      const sanityType = BLOCK_TYPE_MAP[tinaType] || tinaType
      const block = { _type: sanityType, _key: Math.random().toString(36).slice(2) }

      if (sanityType === 'buttonBlock' && b.buttonList) {
        block.buttonList = (b.buttonList || []).map((btn) => ({
          _key: Math.random().toString(36).slice(2),
          name: btn.name,
          url: btn.url,
        }))
      }
      if (sanityType === 'rightVideoBlock') {
        block.tagline_R_V = b.tagline_R_V || ''
        block.text_R_V = b.text_R_V || ''
        block.video_R_V = b.video_R_V || ''
        block.url_R_V = b.url_R_V || ''
      }
      if (sanityType === 'leftVideoBlock') {
        block.tagline_L_V = b.tagline_L_V || ''
        block.text_L_V = b.text_L_V || ''
        block.video_L_V = b.video_L_V || ''
      }
      if (sanityType === 'policyBlock' || sanityType === 'cookieBlock') {
        block.mainheading = b.mainheading || ''
        block.lastupdated = b.lastupdated || null
        block.body = mdxToPortableText(b.body || '')
      }
      return block
    })

    return {
      _type: 'page',
      _id: `page-${fm.slug}`,
      slug: { _type: 'slug', current: fm.slug },
      pageType: fm.pageType || '',
      blocks,
    }
  })
  console.log(`Migrating ${docs.length} pages...`)
  const tx = client.transaction()
  docs.forEach((doc) => tx.createOrReplace(doc))
  await tx.commit()
  console.log(`Done: ${docs.length} pages`)
}

async function migrateNavbar() {
  const file = path.join(ROOT, 'content/singleDocumentCollections/NavBar.mdx')
  const raw = fs.readFileSync(file, 'utf8')
  const { data: fm } = matter(raw)
  await client.createOrReplace({
    _type: 'navbar',
    _id: 'navbar-singleton',
    navbarImage: fm.navbarImage || '',
  })
  console.log('Done: navbar')
}

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
    process.exit(1)
  }
  if (!process.env.SANITY_TOKEN) {
    console.error('Missing SANITY_TOKEN')
    process.exit(1)
  }
  await migratePosts()
  await migrateWhitepapers()
  await migratePages()
  await migrateNavbar()
  console.log('\nMigration complete.')
}

main().catch((err) => { console.error(err); process.exit(1) })
```

---

### Task 13: Run migration and verify

**Files:** none (data operation)

- [ ] **Step 1: Dry-run on one post to verify output format**

```bash
node -e "
import('./scripts/migrate-to-sanity.mjs')
" 2>&1 | head -5
```

If env vars not auto-loaded, run with explicit env:

```bash
export $(grep -v '^#' .env | xargs) && node scripts/migrate-to-sanity.mjs
```

- [ ] **Step 2: Run full migration**

```bash
export $(grep -v '^#' .env | xargs) && node scripts/migrate-to-sanity.mjs
```

Expected output:
```
Migrating 64 posts...
  committed batch 1
Done: 64 posts
Migrating 58 whitepapers...
  committed batch 1
Done: 58 whitepapers
Migrating 7 pages...
Done: 7 pages
Done: navbar
Migration complete.
```

- [ ] **Step 3: Verify counts in Studio**

Open Studio at `http://localhost:3333`. Check document counts:
- Post: 64
- Whitepaper: 58
- Page: 7
- Navbar: 1

Spot-check 3 post documents: open a blog, a case-study, a webinar. Verify `title`, `postType`, `slug`, `body` (should have paragraphs not empty).

- [ ] **Step 4: Commit**

```bash
git add scripts/migrate-to-sanity.mjs
git commit -m "feat: add Sanity content migration script (130 MDX files)"
```

---

## Phase 3: Component and route rewrites

### Task 14: Rewrite pages/[page].js

**Files:** Modify `pages/[page].js`

- [ ] **Step 1: Read current file to understand structure before editing**

```bash
cat pages/\[page\].js
```

- [ ] **Step 2: Replace file content**

Replace the full file with:

```js
import Head from "next/head";
import { sanityClient } from "../lib/sanity.js";
import Blocks from "../components/Blocks.js";

const ALL_PAGES_QUERY = `*[_type == "page"]{ slug }`

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  slug,
  pageType,
  blocks[]{
    _type,
    label,
    buttonList,
    tagline_R_V, text_R_V, video_R_V, url_R_V,
    tagline_L_V, text_L_V, video_L_V,
    mainheading, lastupdated, body
  }
}`

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  "slug": slug.current, postType, title, image, publishedAt, postedBy, duration,
  description, blogcategory, blogindustry, blogdepartment
}`

const WHITEPAPERS_QUERY = `*[_type == "whitepaper"] | order(_createdAt desc) {
  "slug": slug.current, title, image, pdfFileUrl, description
}`

export async function getStaticPaths() {
  const pages = await sanityClient.fetch(ALL_PAGES_QUERY)
  const paths = pages.map((p) => ({ params: { page: p.slug.current } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const [page, posts, whitepapers] = await Promise.all([
    sanityClient.fetch(PAGE_QUERY, { slug: params.page }),
    sanityClient.fetch(POSTS_QUERY),
    sanityClient.fetch(WHITEPAPERS_QUERY),
  ])
  if (!page) return { notFound: true }
  return { props: { page, posts, whitepapers } }
}

export default function Page({ page, posts, whitepapers }) {
  return (
    <>
      <Head>
        <title>Nitco Inc.</title>
      </Head>
      <Blocks page={page} posts={posts} whitepapers={whitepapers} />
    </>
  )
}
```

---

### Task 15: Rewrite pages/insights/[page].js

**Files:** Modify `pages/insights/[page].js`

- [ ] **Step 1: Read current file**

```bash
cat "pages/insights/[page].js"
```

- [ ] **Step 2: Replace with Sanity version**

```js
import Head from "next/head";
import { sanityClient } from "../../lib/sanity.js";
import Blocks from "../../components/Blocks.js";

const ALL_INSIGHTS_QUERY = `*[_type == "page" && pageType == "insights"]{ slug }`

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  slug,
  pageType,
  blocks[]{
    _type,
    label,
    buttonList,
    tagline_R_V, text_R_V, video_R_V, url_R_V,
    tagline_L_V, text_L_V, video_L_V,
    mainheading, lastupdated, body
  }
}`

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  "slug": slug.current, postType, title, image, publishedAt, postedBy, duration,
  description, blogcategory, blogindustry, blogdepartment
}`

const WHITEPAPERS_QUERY = `*[_type == "whitepaper"] | order(_createdAt desc) {
  "slug": slug.current, title, image, pdfFileUrl, description
}`

export async function getStaticPaths() {
  const pages = await sanityClient.fetch(ALL_INSIGHTS_QUERY)
  const paths = pages.map((p) => ({ params: { page: p.slug.current } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const [page, posts, whitepapers] = await Promise.all([
    sanityClient.fetch(PAGE_QUERY, { slug: params.page }),
    sanityClient.fetch(POSTS_QUERY),
    sanityClient.fetch(WHITEPAPERS_QUERY),
  ])
  if (!page) return { notFound: true }
  return { props: { page, posts, whitepapers } }
}

export default function InsightsPage({ page, posts, whitepapers }) {
  return (
    <>
      <Head>
        <title>Nitco Inc. | Insights</title>
      </Head>
      <Blocks page={page} posts={posts} whitepapers={whitepapers} />
    </>
  )
}
```

---

### Task 16: Update Blocks.js

**Files:** Modify `components/Blocks.js`

- [ ] **Step 1: Read current Blocks.js to understand prop shape passed to each component**

```bash
cat components/Blocks.js
```

- [ ] **Step 2: Update to accept posts and whitepapers props and pass to listing components**

```js
import * as React from "react";
import CaseStudies from "./Resources/resourceListingPage/casestudies.js";
import WhitePapers from "./Resources/resourceListingPage/WhitePapers.js";
import BlogPage from "./Resources/resourceListingPage/blogpage.js";
import LeftVideoPage from "./Resources/resourceListingPage/explainerVideosDesign/leftVideoPage.js";
import RightVideoPage from "./Resources/resourceListingPage/explainerVideosDesign/rightVideoPage.js";
import WebinarsPage from "./Resources/resourceListingPage/webinar.js";
import VideosbuttonsListArea from "./Resources/resourceListingPage/explainerVideosDesign/Buttonareavideos.js";
import PrivacyPolicy from "../components/Policy/privacypolicy.js";
import CookiePolicy from "../components/Policy/cookiepolicy.js";

const { Fragment } = React;

export default ({ page, posts = [], whitepapers = [] }) => {
  const { blocks } = page || {};
  if (blocks == null) return <></>;
  return (
    <>
      {blocks.map((block, i) => {
        switch (block._type) {
          case "buttonBlock":
            return (
              <Fragment key={i + block._type}>
                <VideosbuttonsListArea data={block} />
              </Fragment>
            );
          case "blogBlock":
            return (
              <Fragment key={i + block._type}>
                <BlogPage posts={posts.filter((p) => p.postType === "blog")} />
              </Fragment>
            );
          case "caseStudiesBlock":
            return (
              <Fragment key={i + block._type}>
                <CaseStudies posts={posts.filter((p) => p.postType === "caseStudy")} />
              </Fragment>
            );
          case "whitePapersBlock":
            return (
              <Fragment key={i + block._type}>
                <WhitePapers whitepapers={whitepapers} />
              </Fragment>
            );
          case "leftVideoBlock":
            return (
              <Fragment key={i + block._type}>
                <LeftVideoPage data={block} />
              </Fragment>
            );
          case "rightVideoBlock":
            return (
              <Fragment key={i + block._type}>
                <RightVideoPage data={block} />
              </Fragment>
            );
          case "webinarBlock":
            return (
              <Fragment key={i + block._type}>
                <WebinarsPage posts={posts.filter((p) => p.postType === "webinar")} />
              </Fragment>
            );
          case "policyBlock":
            return (
              <Fragment key={i + block._type}>
                <PrivacyPolicy data={block} />
              </Fragment>
            );
          case "cookieBlock":
            return (
              <Fragment key={i + block._type}>
                <CookiePolicy data={block} />
              </Fragment>
            );
          default:
            return null;
        }
      })}
    </>
  );
};
```

**Note:** The listing components (BlogPage, CaseStudies, WhitePapers, WebinarsPage) currently receive `data={block}` where block contains the inline post arrays. After this change they receive `posts` or `whitepapers` arrays from Sanity. You MUST update each listing component in the next tasks to accept the new prop shape.

---

### Task 17: Rewrite listing components to use Sanity props

**Files:** Modify `components/Resources/resourceListingPage/blogpage.js`, `casestudies.js`, `WhitePapers.js`, `webinar.js`

**Sanity post field mapping (reference):**
| Tina field | Sanity field | Notes |
|---|---|---|
| `blogimage` / `caseimage` / `webinarImage` | `image` | same for all postTypes |
| `headingpro` / `heading` / `webinarConcept` | `title` | unified |
| `casedesc` / `webinarText` | `description` | unified |
| `slug` (string) | `slug` (string, pre-projected in GROQ) | |
| `postedon` | `publishedAt` | ISO date string |
| `blogcategory` | `blogcategory` | same |
| `casestudyindustry` | `blogindustry` | renamed |
| `casestudydepartment` | `blogdepartment` | renamed |
| `casestudytopic` | `blogcategory` | reused |
| `webinartopic` | `blogcategory` | reused |

Filter sidebar data (categories, industries lists) is now derived dynamically from the posts array itself — no separate filter arrays from the page block.

- [ ] **Step 1: Replace blogpage.js**

```js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css";

const BlogPage = ({ posts = [] }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => { setCurrentPage(1); }, [selectedCategories]);

  const categories = [...new Set(posts.map((p) => p.blogcategory).filter(Boolean))];

  const handleFilterClick = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => setSelectedCategories([]);

  const filteredPosts = posts.filter(
    (p) => selectedCategories.length === 0 || selectedCategories.includes(p.blogcategory)
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const truncateText = (text, limit) =>
    text?.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <div className={styles.listingWrap}>
      <div className={styles.listingHeader}>
        <div className={styles.listingHeaderLeft}>
          <h1>Latest Insights &amp; Updates</h1>
        </div>
        <div className={styles.listingHeaderRight}>
          <p>Keep up with our latest news — articles, reports, podcasts, and events.</p>
        </div>
      </div>

      <div className={styles.caseStudyContainer}>
        <div className={styles.sidebar}>
          <ButtonsListArea />

          {selectedCategories.length > 0 && (
            <div className={styles.selectedFilters}>
              <h3>Active Filters</h3>
              <div className={styles.filterGroup}>
                {selectedCategories.map((cat, i) => (
                  <button key={i} className={styles.filterButton}>{cat}</button>
                ))}
              </div>
              <button className={styles.clearButton} onClick={clearFilters}>Clear All</button>
            </div>
          )}

          {categories.length > 0 && (
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Categories</h3>
              <div className={styles.widgetContent}>
                {categories
                  .slice(0, showAllCategories ? categories.length : 3)
                  .map((cat, i) => (
                    <button
                      key={i}
                      className={styles.filterButton}
                      onClick={() => handleFilterClick(cat)}
                    >
                      {cat}
                    </button>
                  ))}
              </div>
              {categories.length > 3 && (
                <button
                  className={styles.toggleButton}
                  onClick={() => setShowAllCategories(!showAllCategories)}
                >
                  {showAllCategories ? "Show Less ▲" : "Show More ▼"}
                </button>
              )}
            </div>
          )}
        </div>

        <div className={styles.mainContent}>
          {currentPosts.length === 0 ? (
            <div className={styles.noResults}>
              <p>No blogs match your current filters.</p>
              <p>Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className={styles.caseStudyGrid}>
              {currentPosts.map((item, i) => {
                const { image, title, description, slug, blogcategory, duration, publishedAt } = item;
                const tags = [blogcategory].filter(Boolean);
                const dateDisplay = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

                if (i === 0) {
                  return (
                    <div key={i} className={styles.featuredItem}>
                      <div className={styles.featuredImage}>
                        <Link href={`/blog/${slug}`}>
                          <img src={image} alt={title} />
                        </Link>
                      </div>
                      <div className={styles.featuredContent}>
                        <div className={styles.tags}>
                          {tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}
                        </div>
                        <Link href={`/blog/${slug}`}>
                          <h3 className={styles.itemTitle}>{truncateText(title, 80)}</h3>
                        </Link>
                        <p className={styles.description}>{truncateText(description, 200)}</p>
                        <div className={styles.meta}>
                          {duration && <span>{duration}</span>}
                          {dateDisplay && <span>{dateDisplay}</span>}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={i} className={styles.card}>
                    <Link href={`/blog/${slug}`}>
                      <img src={image} alt={title} className={styles.cardImg} />
                    </Link>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <div className={styles.tags}>
                        {tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}
                      </div>
                      <Link href={`/blog/${slug}`}>
                        <h6 className={styles.itemTitle}>{truncateText(title, 80)}</h6>
                      </Link>
                      <p className={styles.description}>{truncateText(description, 150)}</p>
                      <div className={styles.meta}>
                        {duration && <span>{duration}</span>}
                        {dateDisplay && <span>{dateDisplay}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.paginationArea}>
              <ul className={styles.pagination}>
                <li className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ""}`}>
                  <button className={styles.pageLink} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                </li>
                {currentPage > 1 && <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button></li>}
                <li className={`${styles.pageItem} ${styles.active}`}><button className={styles.pageLink}>{currentPage}</button></li>
                {currentPage < totalPages && <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button></li>}
                {currentPage < totalPages - 1 && (
                  <>
                    <li className={`${styles.pageItem} ${styles.disabled}`}><span className={styles.pageLink}>…</span></li>
                    <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(totalPages)}>{totalPages}</button></li>
                  </>
                )}
                <li className={`${styles.pageItem} ${currentPage === totalPages ? styles.disabled : ""}`}>
                  <button className={styles.pageLink} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
```

- [ ] **Step 2: Replace casestudies.js**

```js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css";

const CaseStudies = ({ posts = [] }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    industries: [], departments: [], topics: [],
  });
  const [showIndustries, setShowIndustries] = useState(false);
  const [showDepartments, setShowDepartments] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => { setCurrentPage(1); }, [selectedFilters]);

  const industries = [...new Set(posts.map((p) => p.blogindustry).filter(Boolean))];
  const departments = [...new Set(posts.map((p) => p.blogdepartment).filter(Boolean))];
  const topics = [...new Set(posts.map((p) => p.blogcategory).filter(Boolean))];

  const handleFilterClick = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value) ? prev[type].filter((v) => v !== value) : [...prev[type], value],
    }));
  };

  const clearFilters = () => setSelectedFilters({ industries: [], departments: [], topics: [] });

  const filteredItems = posts.filter(
    (p) =>
      (selectedFilters.topics.length === 0 || selectedFilters.topics.includes(p.blogcategory)) &&
      (selectedFilters.industries.length === 0 || selectedFilters.industries.includes(p.blogindustry)) &&
      (selectedFilters.departments.length === 0 || selectedFilters.departments.includes(p.blogdepartment))
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const truncateText = (text, limit) =>
    text?.length > limit ? text.substring(0, limit) + "..." : text;

  const hasActiveFilters = Object.values(selectedFilters).some((arr) => arr.length > 0);

  return (
    <div className={styles.listingWrap}>
      <div className={styles.listingHeader}>
        <div className={styles.listingHeaderLeft}><h1>Case Studies</h1></div>
        <div className={styles.listingHeaderRight}>
          <p>Explore real-world success stories — see how NITCO drives results across industries and departments.</p>
        </div>
      </div>

      <div className={styles.caseStudyContainer}>
        <div className={styles.sidebar}>
          <ButtonsListArea />

          {hasActiveFilters && (
            <div className={styles.selectedFilters}>
              <h3>Active Filters</h3>
              <div className={styles.filterGroup}>
                {[...selectedFilters.topics, ...selectedFilters.industries, ...selectedFilters.departments].map((f, i) => (
                  <button key={i} className={styles.filterButton}>{f}</button>
                ))}
              </div>
              <button className={styles.clearButton} onClick={clearFilters}>Clear All</button>
            </div>
          )}

          {industries.length > 0 && (
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Industries</h3>
              <div className={styles.widgetContent}>
                {industries.slice(0, showIndustries ? undefined : 3).map((v, i) => (
                  <button key={i} className={styles.filterButton} onClick={() => handleFilterClick("industries", v)}>{v}</button>
                ))}
              </div>
              {industries.length > 3 && <button className={styles.toggleButton} onClick={() => setShowIndustries(!showIndustries)}>{showIndustries ? "Show Less ▲" : "Show More ▼"}</button>}
            </div>
          )}

          {departments.length > 0 && (
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Departments</h3>
              <div className={styles.widgetContent}>
                {departments.slice(0, showDepartments ? undefined : 3).map((v, i) => (
                  <button key={i} className={styles.filterButton} onClick={() => handleFilterClick("departments", v)}>{v}</button>
                ))}
              </div>
              {departments.length > 3 && <button className={styles.toggleButton} onClick={() => setShowDepartments(!showDepartments)}>{showDepartments ? "Show Less ▲" : "Show More ▼"}</button>}
            </div>
          )}

          {topics.length > 0 && (
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Topics</h3>
              <div className={styles.widgetContent}>
                {topics.slice(0, showTopics ? undefined : 3).map((v, i) => (
                  <button key={i} className={styles.filterButton} onClick={() => handleFilterClick("topics", v)}>{v}</button>
                ))}
              </div>
              {topics.length > 3 && <button className={styles.toggleButton} onClick={() => setShowTopics(!showTopics)}>{showTopics ? "Show Less ▲" : "Show More ▼"}</button>}
            </div>
          )}
        </div>

        <div className={styles.mainContent}>
          {currentItems.length === 0 ? (
            <div className={styles.noResults}>
              <p>No case studies match your current filters.</p>
              <p>Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className={styles.caseStudyGrid}>
              {currentItems.map((item, i) => {
                const { image, title, description = "", slug, blogdepartment, blogindustry, blogcategory, duration, publishedAt } = item;
                const tags = [blogindustry, blogdepartment, blogcategory].filter(Boolean);
                const dateDisplay = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

                if (i === 0) {
                  return (
                    <div key={i} className={styles.featuredItem}>
                      <div className={styles.featuredImage}>
                        <Link href={`/case-studies/${slug}`}><img src={image} alt={title} /></Link>
                      </div>
                      <div className={styles.featuredContent}>
                        <div className={styles.tags}>{tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}</div>
                        <Link href={`/case-studies/${slug}`}><h3 className={styles.itemTitle}>{truncateText(title, 80)}</h3></Link>
                        <p className={styles.description}>{truncateText(description, 200)}</p>
                        <div className={styles.meta}>{duration && <span>{duration}</span>}{dateDisplay && <span>{dateDisplay}</span>}</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={i} className={styles.card}>
                    <Link href={`/case-studies/${slug}`}><img src={image} alt={title} className={styles.cardImg} /></Link>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <div className={styles.tags}>{tags.map((tag, idx) => <span key={idx} className={styles.tag}>{tag}</span>)}</div>
                      <Link href={`/case-studies/${slug}`}><h6 className={styles.itemTitle}>{truncateText(title, 80)}</h6></Link>
                      <p className={styles.description}>{truncateText(description, 150)}</p>
                      <div className={styles.meta}>{duration && <span>{duration}</span>}{dateDisplay && <span>{dateDisplay}</span>}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.paginationArea}>
              <ul className={styles.pagination}>
                <li className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ""}`}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button></li>
                {currentPage > 1 && <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button></li>}
                <li className={`${styles.pageItem} ${styles.active}`}><button className={styles.pageLink}>{currentPage}</button></li>
                {currentPage < totalPages && <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button></li>}
                {currentPage < totalPages - 1 && (<><li className={`${styles.pageItem} ${styles.disabled}`}><span className={styles.pageLink}>…</span></li><li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(totalPages)}>{totalPages}</button></li></>)}
                <li className={`${styles.pageItem} ${currentPage === totalPages ? styles.disabled : ""}`}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
```

- [ ] **Step 3: Replace WhitePapers.js**

```js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css";

const WhitePapers = ({ whitepapers = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(whitepapers.length / itemsPerPage);
  const currentItems = whitepapers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const truncateText = (text, limit) =>
    text?.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <div className={styles.listingWrap}>
      <div className={styles.listingHeader}>
        <div className={styles.listingHeaderLeft}><h1>White Papers</h1></div>
        <div className={styles.listingHeaderRight}>
          <p>Download research-backed reports and expert opinions to stay ahead of the curve.</p>
        </div>
      </div>

      <div className={styles.caseStudyContainer}>
        <div className={styles.sidebar}><ButtonsListArea /></div>

        <div className={styles.mainContent}>
          {currentItems.length === 0 ? (
            <div className={styles.noResults}><p>No white papers found.</p></div>
          ) : (
            <div className={styles.caseStudyGrid}>
              {currentItems.map((item, i) => {
                const { image, title, description, slug } = item;

                if (i === 0) {
                  return (
                    <div key={i} className={styles.featuredItem}>
                      <div className={styles.featuredImage}>
                        <Link href={`/whitepapers/${slug}`}><img src={image} alt={title} /></Link>
                      </div>
                      <div className={styles.featuredContent}>
                        <Link href={`/whitepapers/${slug}`}><h3 className={styles.itemTitle}>{truncateText(title, 80)}</h3></Link>
                        <p className={styles.description}>{truncateText(description, 200)}</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={i} className={styles.card}>
                    <Link href={`/whitepapers/${slug}`}><img src={image} alt={title} className={styles.cardImg} /></Link>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <Link href={`/whitepapers/${slug}`}><h6 className={styles.itemTitle}>{truncateText(title, 80)}</h6></Link>
                      <p className={styles.description}>{truncateText(description, 150)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.paginationArea}>
              <ul className={styles.pagination}>
                <li className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ""}`}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button></li>
                {currentPage > 1 && <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button></li>}
                <li className={`${styles.pageItem} ${styles.active}`}><button className={styles.pageLink}>{currentPage}</button></li>
                {currentPage < totalPages && <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button></li>}
                {currentPage < totalPages - 1 && (<><li className={`${styles.pageItem} ${styles.disabled}`}><span className={styles.pageLink}>…</span></li><li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(totalPages)}>{totalPages}</button></li></>)}
                <li className={`${styles.pageItem} ${currentPage === totalPages ? styles.disabled : ""}`}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhitePapers;
```

- [ ] **Step 4: Replace webinar.js**

```js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ButtonsListArea from "./buttonAreaDesign/buttonsArea";
import styles from "./resorcesGlobal.module.css";

const WebinarsPage = ({ posts = [] }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => { setCurrentPage(1); }, [selectedTopics]);

  const topics = [...new Set(posts.map((p) => p.blogcategory).filter(Boolean))];

  const handleFilterClick = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const clearFilters = () => setSelectedTopics([]);

  const filteredItems = posts.filter(
    (p) => selectedTopics.length === 0 || selectedTopics.includes(p.blogcategory)
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const truncateText = (text, limit) =>
    text?.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <div className={styles.listingWrap}>
      <div className={styles.listingHeader}>
        <div className={styles.listingHeaderLeft}><h1>Webinars</h1></div>
        <div className={styles.listingHeaderRight}>
          <p>Expert talks and thought leadership sessions on the topics that matter most.</p>
        </div>
      </div>

      <div className={styles.caseStudyContainer}>
        <div className={styles.sidebar}>
          <ButtonsListArea />

          {selectedTopics.length > 0 && (
            <div className={styles.selectedFilters}>
              <h3>Active Filters</h3>
              <div className={styles.filterGroup}>
                {selectedTopics.map((t, i) => <button key={i} className={styles.filterButton}>{t}</button>)}
              </div>
              <button className={styles.clearButton} onClick={clearFilters}>Clear All</button>
            </div>
          )}

          {topics.length > 0 && (
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Topics</h3>
              <div className={styles.widgetContent}>
                {topics.slice(0, showAllTopics ? undefined : 3).map((t, i) => (
                  <button key={i} className={styles.filterButton} onClick={() => handleFilterClick(t)}>{t}</button>
                ))}
              </div>
              {topics.length > 3 && <button className={styles.toggleButton} onClick={() => setShowAllTopics(!showAllTopics)}>{showAllTopics ? "Show Less ▲" : "Show More ▼"}</button>}
            </div>
          )}
        </div>

        <div className={styles.mainContent}>
          {currentItems.length === 0 ? (
            <div className={styles.noResults}>
              <p>No webinars match your current filters.</p>
              <p>Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className={styles.caseStudyGrid}>
              {currentItems.map((item, i) => {
                const { title, description, image, slug, blogcategory, duration, publishedAt } = item;
                const dateDisplay = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

                if (i === 0) {
                  return (
                    <div key={i} className={styles.featuredItem}>
                      <div className={styles.featuredImage}>
                        <Link href={`/webinar/${slug}`}><img src={image} alt={title} /></Link>
                      </div>
                      <div className={styles.featuredContent}>
                        <div className={styles.tags}>{blogcategory && <span className={styles.tag}>{blogcategory}</span>}</div>
                        <Link href={`/webinar/${slug}`}><h3 className={styles.itemTitle}>{truncateText(title, 80)}</h3></Link>
                        <p className={styles.description}>{truncateText(description, 200)}</p>
                        <div className={styles.meta}>{duration && <span>{duration}</span>}{dateDisplay && <span>{dateDisplay}</span>}</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={i} className={styles.card}>
                    <Link href={`/webinar/${slug}`}><img src={image} alt={title} className={styles.cardImg} /></Link>
                    <div style={{ padding: "0.75rem 1rem 1rem" }}>
                      <div className={styles.tags}>{blogcategory && <span className={styles.tag}>{blogcategory}</span>}</div>
                      <Link href={`/webinar/${slug}`}><h6 className={styles.itemTitle}>{truncateText(title, 80)}</h6></Link>
                      <p className={styles.description}>{truncateText(description, 150)}</p>
                      <div className={styles.meta}>{duration && <span>{duration}</span>}{dateDisplay && <span>{dateDisplay}</span>}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.paginationArea}>
              <ul className={styles.pagination}>
                <li className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ""}`}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button></li>
                {currentPage > 1 && <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button></li>}
                <li className={`${styles.pageItem} ${styles.active}`}><button className={styles.pageLink}>{currentPage}</button></li>
                {currentPage < totalPages && <li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button></li>}
                {currentPage < totalPages - 1 && (<><li className={`${styles.pageItem} ${styles.disabled}`}><span className={styles.pageLink}>…</span></li><li className={styles.pageItem}><button className={styles.pageLink} onClick={() => setCurrentPage(totalPages)}>{totalPages}</button></li></>)}
                <li className={`${styles.pageItem} ${currentPage === totalPages ? styles.disabled : ""}`}><button className={styles.pageLink} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebinarsPage;
```

---

### Task 18: Remove useTina from Page.js, AllPost.js, whitepaperpost.js

**Files:** Modify `components/Page.js`, `components/AllPost.js`, `components/whitepaperpost.js`

- [ ] **Step 1: Read and update Page.js**

```bash
cat components/Page.js
```

Remove `useTina` import and hook call. The component currently wraps content in a Tina live-edit context. After removal, it receives plain props. Delete the `useTina({query, variables, data})` call and use the `data` prop directly.

- [ ] **Step 2: Read and update AllPost.js**

```bash
cat components/AllPost.js
```

Same pattern — remove `useTina`, accept plain props.

- [ ] **Step 3: Read and update whitepaperpost.js**

```bash
cat components/whitepaperpost.js
```

Same pattern.

---

### Task 19: Build verification

**Files:** none

- [ ] **Step 1: Run build**

```bash
pnpm run build 2>&1 | tail -30
```

Expected: exits 0, all pages generated with no errors.

- [ ] **Step 2: Fix any field reference errors**

If build fails with `Cannot read property X of undefined`, trace the error to the component and field name. Cross-reference the Sanity field names defined in Task 2 and Task 4.

- [ ] **Step 3: Commit**

```bash
git add pages/\[page\].js "pages/insights/[page].js" components/Blocks.js \
  components/Page.js components/AllPost.js components/whitepaperpost.js \
  components/Resources/resourceListingPage/
git commit -m "feat: rewrite pages and components to query Sanity via GROQ"
```

---

## Phase 4: Cutover and cleanup

### Task 20: Remove TinaCMS directories and deps

**Files:** Delete `tina/`, `public/admin/`; modify `package.json`

- [ ] **Step 1: Remove TinaCMS npm packages**

```bash
pnpm remove tinacms @tinacms/datalayer @tinacms/cli tinacms-authjs tinacms-gitprovider-github mongodb-level mongodb
```

- [ ] **Step 2: Remove directories**

```bash
rm -rf tina/ public/admin/
```

- [ ] **Step 3: Verify no remaining tina imports**

```bash
grep -r "tinacms\|from 'tina\|useTina" pages/ components/ lib/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"
```

Expected: zero results.

---

### Task 21: Update next.config.js

**Files:** Modify `next.config.js`

- [ ] **Step 1: Remove /admin rewrite**

Current `next.config.js` has a rewrite: `source: '/admin', destination: '/admin/index.html'`. Remove it since `public/admin/` no longer exists.

Replace the rewrites function:

```js
async rewrites() {
  return []
},
```

---

### Task 22: Update .gitignore

**Files:** Modify `.gitignore`

- [ ] **Step 1: Remove tina entry, add sanity**

Remove this line:
```
tina/.tina__temp/
```

Add this line under `# Build outputs`:
```
.sanity/
```

---

### Task 23: Final build and smoke test

**Files:** none

- [ ] **Step 1: Run final build**

```bash
pnpm run build 2>&1 | tail -20
```

Expected: exits 0, all pages generated.

- [ ] **Step 2: Run Playwright smoke tests**

```bash
pnpm exec playwright test --reporter=line 2>&1 | tail -20
```

If no Playwright tests exist yet, run the dev server and manually verify:
- Home page loads
- `/insights/blogs` shows blog listing
- One blog post detail page loads

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete TinaCMS→Sanity migration, remove all TinaCMS code"
```

---

## Verification summary

| Phase | Gate |
|-------|------|
| 1 — Schema | `sanity dev` starts, Studio shows 5 doc types, test doc saves |
| 2 — Content | Studio: 64 posts, 58 whitepapers, 7 pages, 1 navbar |
| 3 — Components | `pnpm run build` exits 0, all pages generate |
| 4 — Cutover | Build still passes, no tina imports anywhere, smoke test passes |

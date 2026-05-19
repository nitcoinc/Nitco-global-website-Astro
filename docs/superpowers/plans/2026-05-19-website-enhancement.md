# Nitco Website Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring nitcoinc.com to modern performance, security, and reliability standards — target Lighthouse mobile ≥ 85, full security header coverage, slim dependency tree, smoke-tested deploys.

**Architecture:** Next.js 14 marketing site staying on `output: "standalone"` (Docker-based deploy). Optimization focuses on (1) replacing raw `<img>` with `next/image`, (2) right-sizing media, (3) deferring third-party scripts, (4) adding security headers, (5) removing duplicate/dead dependencies, (6) adding Playwright smoke tests + Lighthouse CI.

**Tech Stack:** Next.js 14.2.3, React 19, Sanity v5, pnpm 10, Docker (node:22-alpine), Playwright (new), sharp (already installed).

**Branch convention:** All work on `feat/website-enhancement` branch. Commit after each task.

---

## Pre-flight

### Task 0: Create branch and baseline metrics

**Files:** None modified — baseline only.

- [ ] **Step 1: Create branch**

```bash
git checkout -b feat/website-enhancement
git status
```

- [ ] **Step 2: Capture baseline bundle size**

```bash
pnpm run build 2>&1 | tee artifacts/baseline-build.log
du -sh .next/static .next/standalone > artifacts/baseline-size.txt
```

Expected: build completes 153 pages. Save artifacts/baseline-* for later comparison.

- [ ] **Step 3: Capture baseline Lighthouse (optional but recommended)**

```bash
pnpm dlx unlighthouse-cli --site http://localhost:3000 --no-cache > artifacts/baseline-lighthouse.txt || echo "skip if no network"
```

If unlighthouse fails, skip — not blocking.

- [ ] **Step 4: Commit baseline**

```bash
git add artifacts/
git commit -m "chore: baseline metrics before enhancement"
```

---

## Phase 1: Image Optimization (highest perf ROI)

### Task 1: Enable Next image optimization

**Files:**
- Modify: `next.config.js`

- [ ] **Step 1: Update next.config.js**

Replace entire file contents with:

```js
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
]

module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [96, 128, 256, 384, 512],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  async redirects() {
    return [
      { source: '/:path*__:_slug.mdx', destination: '/:path*/:_slug', permanent: true },
    ]
  },
}
```

- [ ] **Step 2: Verify build still works**

```bash
pnpm run build
```

Expected: 153 pages, no errors. Static export removed — images now optimized at request time.

- [ ] **Step 3: Commit**

```bash
git add next.config.js
git commit -m "feat: enable next image optimization + security headers"
```

### Task 2: Compress large source images

**Files:**
- Modify (in place): `public/images/HomePage/programs-gears.png`, `public/images/HomePage/outcomes-image.png`, `public/images/HomePage/engagement-bg.jpg`, `public/images/leadership/lance.jpg`, `public/images/leadership/shailender.jpg`, `public/images/leadership/chandra.jpg`
- Create: `scripts/optimize-images.mjs`

- [ ] **Step 1: Write image optimization script**

Create `scripts/optimize-images.mjs`:

```js
import sharp from 'sharp'
import { readdirSync, statSync, renameSync, copyFileSync } from 'fs'
import { join, extname } from 'path'

const TARGETS = [
  { dir: 'public/images/HomePage', maxWidth: 1600, quality: 78 },
  { dir: 'public/images/leadership', maxWidth: 800, quality: 80 },
]

const MIN_BYTES = 150 * 1024 // only touch files > 150KB

async function processFile(filePath, opts) {
  const ext = extname(filePath).toLowerCase()
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return
  const stat = statSync(filePath)
  if (stat.size < MIN_BYTES) return

  const tmp = filePath + '.tmp'
  const pipeline = sharp(filePath).resize({ width: opts.maxWidth, withoutEnlargement: true })

  if (ext === '.png') {
    await pipeline.png({ quality: opts.quality, compressionLevel: 9, palette: true }).toFile(tmp)
  } else {
    await pipeline.jpeg({ quality: opts.quality, mozjpeg: true }).toFile(tmp)
  }

  const newSize = statSync(tmp).size
  if (newSize < stat.size) {
    renameSync(tmp, filePath)
    console.log(`${filePath}: ${(stat.size/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB`)
  } else {
    console.log(`${filePath}: skipped (no gain)`)
  }
}

for (const t of TARGETS) {
  for (const entry of readdirSync(t.dir)) {
    await processFile(join(t.dir, entry), t)
  }
}
```

- [ ] **Step 2: Run optimization**

```bash
node scripts/optimize-images.mjs
```

Expected output: each file shrinks. Verify `programs-gears.png` drops from 2.2MB to <500KB, `outcomes-image.png` from 1.6MB to <400KB, `lance.jpg` from 1.2MB to <300KB.

- [ ] **Step 3: Visually verify**

```bash
pnpm run dev
```

Open http://localhost:3000, scroll through homepage, About, leadership pages. Confirm no visible quality regression.

- [ ] **Step 4: Commit**

```bash
git add public/images/ scripts/optimize-images.mjs
git commit -m "perf: compress source images (50-70% size reduction)"
```

### Task 3: Convert remaining `<img>` tags to `next/image`

**Files (14 files, 40 occurrences):**
- Modify: `components/HomePage/HomePage.js` (2 occurrences)
- Modify: `components/Navbar/Navbar.js` (logo)
- Modify: `components/Footer/Footer.js` (7 occurrences)
- Modify: `components/Resources/Resources.js`
- Modify: `components/Resources/resourceListingPage/blogpage.js`
- Modify: `components/Resources/resourceListingPage/casestudies.js`
- Modify: `components/Resources/resourceListingPage/webinar.js`
- Modify: `components/Resources/resourceListingPage/WhitePapers.js`
- Modify: `components/Resources/resourceListingPage/news.js`
- Modify: `components/Resources/resourceDetailedPage/AllPost.js`
- Modify: `components/Resources/resourceDetailedPage/whitepaperpost.js`
- Plus any other `<img>` discovered via grep

- [ ] **Step 1: Inventory all `<img>` occurrences**

```bash
grep -rn "<img" components/ pages/ > artifacts/img-inventory.txt
cat artifacts/img-inventory.txt
```

- [ ] **Step 2: Convert each file**

For static images (e.g. logo, footer icons), replace:

```jsx
<img src="/images/logo-nitco.png" alt="NITCO" width="180" height="44" />
```

with:

```jsx
import Image from 'next/image'
// ...
<Image src="/images/logo-nitco.png" alt="NITCO" width={180} height={44} priority />
```

Use `priority` only on above-the-fold LCP image (logo, hero). Everything else gets default lazy loading.

For Sanity images via `urlFor()`, replace:

```jsx
<img src={urlFor(image, { width: 400 })} alt={title} />
```

with:

```jsx
<Image
  src={urlFor(image, { width: 400 })}
  alt={title}
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, 400px"
/>
```

**Rules per occurrence:**
- Must provide `width` and `height` (use intrinsic dimensions; if unknown, measure in browser devtools)
- LCP image gets `priority`; all others omit it
- Sanity images get `sizes` attribute matching their layout
- Decorative images keep `alt=""`
- If image is a background or uses `fill` layout, use `<Image fill ... sizes="..." />` with parent `position: relative`

- [ ] **Step 3: Handle background images (HomePage)**

In `components/HomePage/HomePage.js` line 413, 477 — `outcomesBgImg` and `engagementBgImg` are styled as backgrounds. Convert to:

```jsx
<Image src="/images/HomePage/outcomes-image.png" alt="" fill sizes="100vw" className={styles.outcomesBgImg} />
```

Verify the parent element has `position: relative` in the corresponding CSS module. If not, add it.

- [ ] **Step 4: Build and verify**

```bash
pnpm run build
```

Expected: no build errors. Warnings about missing `width`/`height` should be zero.

- [ ] **Step 5: Manual visual check**

```bash
pnpm run dev
```

Walk through: `/`, `/company/about`, `/resources`, `/blog`, `/whitepapers`, `/case-studies`, `/webinar`, `/contact`. Each page renders with no broken images and no layout shift on load.

- [ ] **Step 6: Commit**

```bash
git add components/ pages/
git commit -m "perf: migrate all <img> to next/image for lazy loading + format negotiation"
```

### Task 4: Move hero videos off origin

**Files:**
- Modify: any component referencing `/HomeHero.mp4`, `/Home_Page_Video_1.mp4`, `/Intigration.mp4`
- Delete: `public/HomeHero.mp4`, `public/Home_Page_Video_1.mp4`, `public/Intigration.mp4`

- [ ] **Step 1: Find video usage**

```bash
grep -rn "HomeHero.mp4\|Home_Page_Video_1.mp4\|Intigration.mp4" components/ pages/ styles/ > artifacts/video-usage.txt
cat artifacts/video-usage.txt
```

- [ ] **Step 2: For each `<video>` tag — add lazy attributes**

If keeping local (interim), update each `<video>` element to add:

```jsx
<video
  preload="none"
  poster="/images/HomePage/hero-poster.webp"
  playsInline
  muted
  loop
  // ... existing props
>
  <source src="/HomeHero.mp4" type="video/mp4" />
</video>
```

You must create `poster` images at `public/images/HomePage/hero-poster.webp` (et al.) by extracting frame 0 from each video:

```bash
ffmpeg -i public/HomeHero.mp4 -frames:v 1 -q:v 2 public/images/HomePage/hero-poster.jpg
sharp -i public/images/HomePage/hero-poster.jpg -o public/images/HomePage/hero-poster.webp -- resize 1600 -- webp --quality 75
```

(If ffmpeg/sharp CLI unavailable, write a node script using `sharp` + `ffmpeg-static`.)

- [ ] **Step 3: Decision gate — Vimeo embed vs keep local**

If the team confirms Vimeo embedding (recommended), replace `<video>` with a Vimeo iframe player loaded on user intent (intersection observer). Otherwise, keep local but with `preload="none"` + poster image as above.

**For this plan, default to keeping local + adding poster + preload=none.** Decision to migrate to Vimeo is a separate task once stakeholders confirm.

- [ ] **Step 4: Verify**

```bash
pnpm run dev
```

Open homepage on throttled 3G in devtools. Verify videos do NOT download until user interaction or scroll-into-view. Poster image shows immediately.

- [ ] **Step 5: Commit**

```bash
git add public/images/HomePage/hero-poster.* components/
git commit -m "perf: add poster images + preload=none to hero videos"
```

---

## Phase 2: Third-party script optimization

### Task 5: Fix Iubenda script strategy

**Files:**
- Modify: `pages/_app.js`

- [ ] **Step 1: Change script strategies**

In `pages/_app.js`, change:

```jsx
<Script src="https://cdn.iubenda.com/cs/tcf/stub-v2.js" strategy="beforeInteractive" />
<Script src="https://cdn.iubenda.com/cs/tcf/safe-tcf-v2.js" strategy="beforeInteractive" />
<Script src="https://cdn.iubenda.com/cs/ccpa/stub.js" strategy="beforeInteractive" />
```

to:

```jsx
<Script src="https://cdn.iubenda.com/cs/tcf/stub-v2.js" strategy="afterInteractive" />
<Script src="https://cdn.iubenda.com/cs/tcf/safe-tcf-v2.js" strategy="afterInteractive" />
<Script src="https://cdn.iubenda.com/cs/ccpa/stub.js" strategy="afterInteractive" />
```

Also keep the `iubenda-config` inline as `beforeInteractive` only if config must exist before TCF loads. If unsure, also change to `afterInteractive` and verify banner still appears.

- [ ] **Step 2: Verify banner still appears**

```bash
pnpm run dev
```

Open in incognito, verify Iubenda banner appears within ~1s of load. Check console — no errors about `_iub` undefined.

- [ ] **Step 3: Commit**

```bash
git add pages/_app.js
git commit -m "perf: defer Iubenda scripts to afterInteractive (unblock LCP)"
```

### Task 6: Lazy-load Kore.ai chatbot

**Files:**
- Modify: `pages/_app.js`
- Create: `components/Chatbot/LazyChatbot.js`

- [ ] **Step 1: Create lazy chatbot wrapper**

Create `components/Chatbot/LazyChatbot.js`:

```jsx
import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function LazyChatbot() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const triggers = ['scroll', 'mousemove', 'touchstart', 'keydown']
    let triggered = false
    const onTrigger = () => {
      if (triggered) return
      triggered = true
      setShouldLoad(true)
      triggers.forEach(t => window.removeEventListener(t, onTrigger))
    }
    const timer = setTimeout(onTrigger, 5000)
    triggers.forEach(t => window.addEventListener(t, onTrigger, { passive: true, once: true }))
    return () => {
      clearTimeout(timer)
      triggers.forEach(t => window.removeEventListener(t, onTrigger))
    }
  }, [])

  if (!shouldLoad) return null

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/kore-web-sdk@11.19.1/dist/umd/kore-web-sdk-umd-chat.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.KoreChatSDK) {
            window.KoreChatSDK.chatConfig.botOptions.API_KEY_CONFIG.KEY =
              '724abd38ef7541939c8c13ea8efa4f1ac884140988204488bae0f4fc2e82a1bbstf3'
            window.KoreChatSDK.chatConfig.widgetOptions = { position: 'bottom-right' }
            new window.KoreChatSDK.chatWindow().show(window.KoreChatSDK.chatConfig)
          }
        }}
      />
    </>
  )
}
```

- [ ] **Step 2: Replace inline Kore.ai code in `_app.js`**

Remove both `<Script>` blocks for `kore-web-sdk` and `koreai-init`. Import and render `<LazyChatbot />` at the bottom of `MyApp` return:

```jsx
import LazyChatbot from '../components/Chatbot/LazyChatbot'
// ...
<LazyChatbot />
```

- [ ] **Step 3: Verify**

```bash
pnpm run dev
```

Open homepage with devtools Network tab clean. Confirm `kore-web-sdk-umd-chat.min.js` does NOT load until you scroll, move mouse, or wait 5s. Then verify chat widget appears.

- [ ] **Step 4: Commit**

```bash
git add components/Chatbot/ pages/_app.js
git commit -m "perf: lazy-load Kore.ai chatbot on user intent"
```

### Task 7: Convert RB2B to next/script

**Files:**
- Modify: `pages/_document.js`
- Modify: `pages/_app.js`

- [ ] **Step 1: Remove inline RB2B script from `_document.js`**

Delete the entire `{/* RB2B Visitor Identification */}` block (the raw `<script dangerouslySetInnerHTML>`).

- [ ] **Step 2: Add to `_app.js` as next/script**

In `_app.js`, add (after other tracking scripts):

```jsx
<Script id="rb2b" strategy="afterInteractive">
  {`
    !function(key){
      if(window.reb2b) return;
      window.reb2b = {loaded:true};
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";
      document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);
    }("4O7Z0HEQE9NX");
  `}
</Script>
```

- [ ] **Step 3: Verify**

```bash
pnpm run dev
```

Network tab: confirm `4O7Z0HEQE9NX.js.gz` loads after page interactive (not blocking).

- [ ] **Step 4: Commit**

```bash
git add pages/_document.js pages/_app.js
git commit -m "perf: convert RB2B inline script to next/script afterInteractive"
```

### Task 8: Move tracking IDs to env vars

**Files:**
- Modify: `pages/_app.js`, `pages/_document.js`
- Modify: `.env.example`
- Modify: `.env` (local only, NOT committed)

- [ ] **Step 1: Update .env.example**

Add to `.env.example`:

```
NEXT_PUBLIC_IUBENDA_SITE_ID=2053600
NEXT_PUBLIC_IUBENDA_COOKIE_POLICY_ID=12542728
NEXT_PUBLIC_LEADSY_PID=1dyBPBDbcXYcBnDGy
NEXT_PUBLIC_SCRIPTINTEL_TAG_URL=https://api-gateway.scriptintel.io/service/visitorintel/visitorTag/221764/script.js?apiKey=MjIxNzY0NDMyOWE4NDUtZDMxYy00MjEwLThkYzEtYTM5NzNlNTFjYjVj
NEXT_PUBLIC_KORE_API_KEY=724abd38ef7541939c8c13ea8efa4f1ac884140988204488bae0f4fc2e82a1bbstf3
NEXT_PUBLIC_GTM_ID=GTM-K6CXJBJN
NEXT_PUBLIC_RB2B_KEY=4O7Z0HEQE9NX
```

- [ ] **Step 2: Copy values into local `.env`**

```bash
# update .env locally — verify each var present
grep -E "NEXT_PUBLIC_(IUBENDA|LEADSY|SCRIPTINTEL|KORE|GTM|RB2B)" .env
```

- [ ] **Step 3: Update Dockerfile**

Add build args to `Dockerfile` builder stage:

```dockerfile
ARG NEXT_PUBLIC_IUBENDA_SITE_ID
ARG NEXT_PUBLIC_IUBENDA_COOKIE_POLICY_ID
ARG NEXT_PUBLIC_LEADSY_PID
ARG NEXT_PUBLIC_SCRIPTINTEL_TAG_URL
ARG NEXT_PUBLIC_KORE_API_KEY
ARG NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_RB2B_KEY
ENV NEXT_PUBLIC_IUBENDA_SITE_ID=$NEXT_PUBLIC_IUBENDA_SITE_ID \
    NEXT_PUBLIC_IUBENDA_COOKIE_POLICY_ID=$NEXT_PUBLIC_IUBENDA_COOKIE_POLICY_ID \
    NEXT_PUBLIC_LEADSY_PID=$NEXT_PUBLIC_LEADSY_PID \
    NEXT_PUBLIC_SCRIPTINTEL_TAG_URL=$NEXT_PUBLIC_SCRIPTINTEL_TAG_URL \
    NEXT_PUBLIC_KORE_API_KEY=$NEXT_PUBLIC_KORE_API_KEY \
    NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID \
    NEXT_PUBLIC_RB2B_KEY=$NEXT_PUBLIC_RB2B_KEY
```

- [ ] **Step 4: Replace hardcoded IDs in `_app.js` + `_document.js`**

Replace inline literal values with `process.env.NEXT_PUBLIC_*` references. Example for Iubenda config:

```jsx
siteId: ${process.env.NEXT_PUBLIC_IUBENDA_SITE_ID},
cookiePolicyId: ${process.env.NEXT_PUBLIC_IUBENDA_COOKIE_POLICY_ID},
```

For GTM in `_document.js`:

```jsx
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
```

For LazyChatbot KEY:

```jsx
window.KoreChatSDK.chatConfig.botOptions.API_KEY_CONFIG.KEY = process.env.NEXT_PUBLIC_KORE_API_KEY
```

For RB2B in `_app.js`:

```jsx
}("${process.env.NEXT_PUBLIC_RB2B_KEY}");
```

For Leadsy:

```jsx
<Script id="leadsy" src="https://r2.leadsy.ai/tag.js" strategy="afterInteractive" data-pid={process.env.NEXT_PUBLIC_LEADSY_PID} data-version="062024" />
```

For ScriptIntel:

```jsx
<Script id="scriptintel" src={process.env.NEXT_PUBLIC_SCRIPTINTEL_TAG_URL} strategy="afterInteractive" charSet="utf-8" />
```

For GTM noscript iframe in `_document.js`:

```jsx
<iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`} ... />
```

- [ ] **Step 5: Verify build**

```bash
pnpm run build
```

Verify no `undefined` appears in built HTML (check `.next/server/pages/index.html` for `siteId: ,` etc.).

- [ ] **Step 6: Commit**

```bash
git add Dockerfile .env.example pages/_app.js pages/_document.js components/Chatbot/LazyChatbot.js
git commit -m "chore: move tracking IDs to env vars"
```

---

## Phase 3: Security headers + CSP

### Task 9: Add Content-Security-Policy in report-only mode

**Files:**
- Modify: `next.config.js`

- [ ] **Step 1: Add CSP-Report-Only header**

In `next.config.js` `securityHeaders` array, add:

```js
{
  key: 'Content-Security-Policy-Report-Only',
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.iubenda.com https://www.googletagmanager.com https://www.google-analytics.com https://r2.leadsy.ai https://api-gateway.scriptintel.io https://cdn.jsdelivr.net https://ddwl4m2hdecbv.cloudfront.net https://js.hs-scripts.com https://js.hsforms.net https://www.google.com https://www.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://cdn.sanity.io https://www.googletagmanager.com https://www.google-analytics.com https://*.hsforms.net",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://cdn.sanity.io https://*.apicdn.sanity.io https://www.google-analytics.com https://api-gateway.scriptintel.io https://ddwl4m2hdecbv.cloudfront.net https://r2.leadsy.ai https://forms.hsforms.com https://*.hubspot.com",
    "frame-src 'self' https://player.vimeo.com https://www.googletagmanager.com https://www.google.com https://forms.hsforms.com",
    "media-src 'self' blob: https://player.vimeo.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://*.hubspot.com",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join('; ')
},
```

- [ ] **Step 2: Build and deploy to staging**

```bash
pnpm run build && pnpm run start
```

- [ ] **Step 3: Test in browser**

Open Chrome DevTools → Console. Walk through homepage, contact form, blog post. Note every CSP violation logged. Add missing hosts to the appropriate directive.

- [ ] **Step 4: Iterate until clean**

Re-test until console shows no CSP violations on any major page.

- [ ] **Step 5: Switch to enforcing mode**

Change header key from `Content-Security-Policy-Report-Only` to `Content-Security-Policy`. Re-verify nothing breaks.

- [ ] **Step 6: Commit**

```bash
git add next.config.js
git commit -m "feat: add Content-Security-Policy header"
```

### Task 10: Add CSP nonce for inline scripts (optional hardening)

**Skip if Task 9 enforcement is stable.** This task removes `'unsafe-inline'` from `script-src` by generating per-request nonces. Requires middleware. Defer to Phase 6 if time-constrained.

---

## Phase 4: SEO + Metadata

### Task 11: Add Open Graph + Twitter Card defaults

**Files:**
- Modify: `pages/_app.js`

- [ ] **Step 1: Extend Head block**

In `pages/_app.js`, expand the `<Head>` block to:

```jsx
<Head>
  <title>{seo?.title || defaultTitle}</title>
  <meta name="description" content={seo?.description || defaultDescription} />
  <link rel="canonical" href={seo?.canonical || defaultCanonical} />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

  {/* Open Graph */}
  <meta property="og:type" content={seo?.ogType || 'website'} />
  <meta property="og:site_name" content="NITCO Inc." />
  <meta property="og:title" content={seo?.title || defaultTitle} />
  <meta property="og:description" content={seo?.description || defaultDescription} />
  <meta property="og:url" content={seo?.canonical || defaultCanonical} />
  <meta property="og:image" content={seo?.ogImage || 'https://nitcoinc.com/images/og-default.jpg'} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seo?.title || defaultTitle} />
  <meta name="twitter:description" content={seo?.description || defaultDescription} />
  <meta name="twitter:image" content={seo?.ogImage || 'https://nitcoinc.com/images/og-default.jpg'} />
</Head>
```

- [ ] **Step 2: Add default OG image asset**

Create `public/images/og-default.jpg` — 1200×630 branded image. (Designer task — placeholder OK for now: use logo on dark background.)

- [ ] **Step 3: Extend `lib/fetchSeoData.js` to support `ogImage` + `ogType`**

Update return shape to include optional `ogImage` and `ogType` per path. Update content JSON files accordingly.

- [ ] **Step 4: Verify**

```bash
pnpm run build && pnpm run start
```

Run https://www.opengraph.xyz/ against localhost (or paste rendered HTML). Verify OG tags present.

- [ ] **Step 5: Commit**

```bash
git add pages/_app.js lib/fetchSeoData.js content/ public/images/og-default.jpg
git commit -m "feat: add Open Graph + Twitter Card meta tags"
```

### Task 12: Add JSON-LD structured data

**Files:**
- Create: `components/seo/StructuredData.js`
- Modify: `pages/_app.js`
- Modify: `components/Resources/resourceDetailedPage/AllPost.js` (BlogPosting schema)

- [ ] **Step 1: Create StructuredData component**

```jsx
// components/seo/StructuredData.js
export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NITCO Inc.',
    url: 'https://nitcoinc.com',
    logo: 'https://nitcoinc.com/images/logo-nitco.png',
    sameAs: [
      'https://www.linkedin.com/company/nitco-inc',
      // add other social profiles
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function WebSiteSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NITCO Inc.',
    url: 'https://nitcoinc.com',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function BlogPostingSchema({ title, description, image, datePublished, author }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image,
    datePublished,
    author: { '@type': 'Person', name: author || 'NITCO Inc.' },
    publisher: {
      '@type': 'Organization',
      name: 'NITCO Inc.',
      logo: { '@type': 'ImageObject', url: 'https://nitcoinc.com/images/logo-nitco.png' },
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
```

- [ ] **Step 2: Add to `_app.js`**

```jsx
import { OrganizationSchema, WebSiteSchema } from '../components/seo/StructuredData'
// inside <Head>:
<OrganizationSchema />
<WebSiteSchema />
```

- [ ] **Step 3: Add BlogPosting to AllPost.js**

In `components/Resources/resourceDetailedPage/AllPost.js`, inside the returned JSX:

```jsx
<BlogPostingSchema
  title={title}
  description={description}
  image={urlFor(image, { width: 1200 })}
  datePublished={publishedAt}
  author={postedBy}
/>
```

- [ ] **Step 4: Verify**

Use https://search.google.com/test/rich-results against staging URL. No errors.

- [ ] **Step 5: Commit**

```bash
git add components/seo/ pages/_app.js components/Resources/resourceDetailedPage/AllPost.js
git commit -m "feat: add JSON-LD structured data (Organization, WebSite, BlogPosting)"
```

### Task 13: Improve sitemap freshness

**Files:**
- Modify: `next-sitemap.config.js`

- [ ] **Step 1: Update sitemap config**

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://nitcoinc.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  autoLastmod: true,
  exclude: ['/api/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/'] },
    ],
  },
}
```

- [ ] **Step 2: Rebuild and verify sitemap**

```bash
pnpm run build
cat public/sitemap-0.xml | head -30
```

- [ ] **Step 3: Commit**

```bash
git add next-sitemap.config.js public/sitemap*.xml public/robots.txt
git commit -m "feat: improve sitemap freshness + robots policies"
```

---

## Phase 5: Dependency + bundle cleanup

### Task 14: Remove unused dependencies

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

- [ ] **Step 1: Run depcheck**

```bash
pnpm dlx depcheck --ignores="@types/*,eslint*,prettier,sass,cross-env,dotenv,next-sitemap,sanity,@sanity/cli,gray-matter,@portabletext/markdown" > artifacts/depcheck.txt
cat artifacts/depcheck.txt
```

- [ ] **Step 2: Remove confirmed-unused deps**

Audit candidates (verify each with grep before removing):

```bash
grep -rn "react-router-dom\|from 'moment'" components/ pages/ lib/
```

If zero occurrences, remove:

```bash
pnpm remove react-router-dom moment
```

- [ ] **Step 3: Pick one of each duplicate**

Markdown renderers — check usage:

```bash
grep -rn "from 'marked'\|from 'markdown-to-jsx'\|from 'react-markdown'" components/ pages/ lib/
```

Standardize on `react-markdown` (most React-native). Refactor any `marked`/`markdown-to-jsx` usage to `react-markdown`. Remove the other two:

```bash
pnpm remove marked markdown-to-jsx
```

Carousels — check usage:

```bash
grep -rn "react-slick\|slick-carousel\|from 'swiper" components/ pages/
```

Standardize on `swiper`. Refactor any `react-slick` to swiper. Remove:

```bash
pnpm remove react-slick slick-carousel
```

Animation libs — `aos` and `animate.css` both used? Check:

```bash
grep -rn "AOS\|animate__" components/ pages/ styles/
```

Keep one. Default: keep `aos` (more JS-driven), remove `animate.css`:

```bash
pnpm remove animate.css
```

Remove `animate.css` import from `_app.js`.

- [ ] **Step 4: Update eslint config**

```bash
pnpm remove eslint-config-next
pnpm add -D eslint-config-next@14.2.3 eslint@^8
```

- [ ] **Step 5: Build and verify**

```bash
pnpm run build
```

Expected: build succeeds. Bundle size dropped.

- [ ] **Step 6: Compare bundle**

```bash
du -sh .next/static
diff artifacts/baseline-size.txt <(du -sh .next/static .next/standalone)
```

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml pages/_app.js components/
git commit -m "chore: remove duplicate libs (moment, react-router-dom, marked, react-slick, animate.css)"
```

### Task 15: Trim global CSS imports

**Files:**
- Modify: `pages/_app.js`

- [ ] **Step 1: Audit each global CSS**

For each of these imports, grep codebase for actual class usage:

```bash
grep -rn "boxicon\|bx-\|flaticon\|aos-init\|swiper-" components/ pages/ styles/
```

- [ ] **Step 2: Remove unused**

If `boxicons` shows zero usage (FontAwesome is in deps and likely the primary icon set), remove its import + uninstall:

```bash
pnpm remove # any unused icon font packages
```

Similar audit for `flaticon`.

- [ ] **Step 3: Pick one icon system**

Default: standardize on FontAwesome (already in deps with React adapter). Remove others.

- [ ] **Step 4: Verify visual parity**

```bash
pnpm run dev
```

Walk through all major pages. Confirm no missing icons.

- [ ] **Step 5: Commit**

```bash
git add pages/_app.js package.json pnpm-lock.yaml styles/
git commit -m "chore: standardize on single icon font, remove unused CSS imports"
```

### Task 16: Replace `moment` if still present, audit Bootstrap usage

**Files:**
- Modify: any file importing `moment`
- Optional: migrate from `bootstrap.min.css` global to scoped usage

- [ ] **Step 1: Replace moment with native Intl**

If any `moment()` remains:

```js
// before
moment(post.publishedAt).format('MMM DD, YYYY')

// after
new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(post.publishedAt))
```

- [ ] **Step 2: Bootstrap audit (optional, time-permitting)**

```bash
grep -rn "className=\"[^\"]*col-\|row-\|btn-primary\|navbar-" components/ pages/ | wc -l
```

If usage is high, leave Bootstrap. If <50 occurrences, migrate to CSS modules + remove `bootstrap.min.css` (defer to separate plan).

- [ ] **Step 3: Commit**

```bash
git add components/ pages/ package.json pnpm-lock.yaml
git commit -m "chore: replace moment with Intl.DateTimeFormat"
```

---

## Phase 6: Testing + CI

### Task 17: Add Playwright smoke tests

**Files:**
- Create: `tests/e2e/smoke.spec.ts`
- Create: `playwright.config.ts`
- Modify: `package.json` (add test scripts)

- [ ] **Step 1: Install Playwright**

```bash
pnpm add -D @playwright/test
pnpm exec playwright install --with-deps chromium
```

- [ ] **Step 2: Create config**

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: 'pnpm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
```

- [ ] **Step 3: Write smoke tests**

```ts
// tests/e2e/smoke.spec.ts
import { test, expect } from '@playwright/test'

const PAGES = ['/', '/contact', '/resources', '/blog', '/whitepapers', '/case-studies', '/webinar', '/company/about']

for (const path of PAGES) {
  test(`page loads: ${path}`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBeLessThan(400)
    await expect(page).toHaveTitle(/.+/)
    const visibleHeading = page.locator('h1, h2').first()
    await expect(visibleHeading).toBeVisible()
  })
}

test('homepage hero renders', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('nav')).toBeVisible()
  await expect(page.locator('footer')).toBeVisible()
})

test('contact form is present', async ({ page }) => {
  await page.goto('/contact')
  const form = page.locator('form').first()
  await expect(form).toBeVisible()
})

test('navigation works', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /resources/i }).first().click()
  await expect(page).toHaveURL(/resources/)
})
```

- [ ] **Step 4: Add scripts to package.json**

```json
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui"
```

- [ ] **Step 5: Build + run tests**

```bash
pnpm run build
pnpm exec playwright test
```

Expected: all tests pass against built server.

- [ ] **Step 6: Commit**

```bash
git add tests/ playwright.config.ts package.json pnpm-lock.yaml
git commit -m "test: add Playwright smoke tests for key pages"
```

### Task 18: Add Lighthouse CI

**Files:**
- Create: `.github/workflows/lighthouse.yml` (or `lighthouserc.json` for CI)
- Create: `lighthouserc.json`

- [ ] **Step 1: Install LHCI**

```bash
pnpm add -D @lhci/cli
```

- [ ] **Step 2: Configure**

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "startServerCommand": "pnpm run start",
      "url": [
        "http://localhost:3000",
        "http://localhost:3000/contact",
        "http://localhost:3000/resources",
        "http://localhost:3000/company/about"
      ],
      "numberOfRuns": 3,
      "settings": { "preset": "desktop" }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.85 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

- [ ] **Step 3: Add script**

```json
"lhci": "lhci autorun"
```

- [ ] **Step 4: Run locally**

```bash
pnpm run build
pnpm run lhci
```

Address any assertion failures by tuning targets or fixing perf regressions.

- [ ] **Step 5: Add CI workflow**

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 10 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm run build
        env:
          NEXT_PUBLIC_SANITY_PROJECT_ID: t8ctf4dg
          NEXT_PUBLIC_SANITY_DATASET: production
      - run: pnpm run lhci
```

- [ ] **Step 6: Commit**

```bash
git add lighthouserc.json .github/workflows/lighthouse.yml package.json pnpm-lock.yaml
git commit -m "ci: add Lighthouse CI assertions"
```

### Task 19: Add error boundary + monitoring stub

**Files:**
- Create: `components/ErrorBoundary.js`
- Modify: `pages/_app.js`

- [ ] **Step 1: Create error boundary**

```jsx
// components/ErrorBoundary.js
import React from 'react'

export default class ErrorBoundary extends React.Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error, info) {
    console.error('App crash:', error, info)
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'app_error', error: String(error), stack: info?.componentStack })
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p>Please refresh or <a href="/contact">contact support</a>.</p>
        </div>
      )
    }
    return this.props.children
  }
}
```

- [ ] **Step 2: Wrap app**

```jsx
// pages/_app.js
import ErrorBoundary from '../components/ErrorBoundary'
// ...
<ErrorBoundary>
  <Component {...pageProps} />
</ErrorBoundary>
```

- [ ] **Step 3: Verify**

Force an error temporarily in a component, confirm boundary catches it. Revert force-error.

- [ ] **Step 4: Commit**

```bash
git add components/ErrorBoundary.js pages/_app.js
git commit -m "feat: add ErrorBoundary with GTM error event"
```

---

## Phase 7: Docker + repo cleanup

### Task 20: Slim Docker image

**Files:**
- Modify: `.dockerignore`
- Modify: `Dockerfile`

- [ ] **Step 1: Audit .dockerignore**

Current `.dockerignore` (read it first):

```bash
cat .dockerignore
```

Expand to:

```
node_modules
.next
.git
.gitignore
.dockerignore
Dockerfile
.env*
!.env.example
README.md
*.md
docs/
artifacts/
content/
sanity/
.sanity/
scripts/
tests/
playwright.config.ts
playwright-report/
test-results/
.vscode/
.idea/
.replit
replit.md
dist/
```

Verify nothing critical excluded — keep `pages/`, `components/`, `lib/`, `public/`, `styles/`, `package.json`, `pnpm-lock.yaml`, `next.config.js`, `next-sitemap.config.js`.

- [ ] **Step 2: Build with new ignore**

```bash
docker build -t nitco-global:slim .
docker images nitco-global
```

Compare disk usage to baseline 438MB. Target: <250MB.

- [ ] **Step 3: Smoke-test container**

```bash
docker run --rm -p 3001:3000 nitco-global:slim &
sleep 5
curl -fsS http://localhost:3001 | head -20
docker stop $(docker ps -q --filter ancestor=nitco-global:slim)
```

- [ ] **Step 4: Commit**

```bash
git add .dockerignore
git commit -m "chore: slim Docker image via expanded .dockerignore"
```

### Task 21: Repo dead-code purge

**Files:**
- Delete: `.replit`, `replit.md`, `dist/` (if untracked-stale), `content/pages/`, `content/singleDocumentCollections/`
- Modify: `next.config.js` (remove dead `output` var)

- [ ] **Step 1: Verify orphans**

```bash
grep -rln "content/pages\|content/singleDocumentCollections" pages/ components/ lib/
```

Expected: zero matches (confirmed previously).

- [ ] **Step 2: Delete**

```bash
rm -rf .replit replit.md dist/ content/pages content/singleDocumentCollections
```

- [ ] **Step 3: Clean up dead `output` variable**

Already done in Task 1's full rewrite of `next.config.js`. If still present, delete now.

- [ ] **Step 4: Build to confirm nothing breaks**

```bash
pnpm run build
pnpm exec playwright test
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: purge dead code (Replit, dist, orphaned TinaCMS MDX)"
```

---

## Phase 8: Verification + sign-off

### Task 22: Full regression + perf comparison

- [ ] **Step 1: Run all tests**

```bash
pnpm run build
pnpm exec playwright test
pnpm run lhci
```

- [ ] **Step 2: Build Docker + smoke test**

```bash
docker build -t nitco-global:enhanced .
docker run --rm -d -p 3002:3000 --name nitco-test nitco-global:enhanced
sleep 5
curl -fsS -o /dev/null -w "%{http_code}\n" http://localhost:3002
docker logs nitco-test | tail -30
docker stop nitco-test
```

- [ ] **Step 3: Capture final metrics**

```bash
du -sh .next/static .next/standalone > artifacts/final-size.txt
docker images nitco-global >> artifacts/final-size.txt
diff artifacts/baseline-size.txt artifacts/final-size.txt
```

- [ ] **Step 4: Update PROJECT.md**

Append "## Recent Decisions" entry: date + "Performed full enhancement pass — see plan 2026-05-19-website-enhancement.md".

- [ ] **Step 5: Final commit + PR**

```bash
git add artifacts/ PROJECT.md
git commit -m "chore: capture final perf metrics post-enhancement"
git push -u origin feat/website-enhancement
gh pr create --title "Website enhancement: perf, security, SEO, tests" --body "..."
```

---

## Success Criteria

Plan is complete when:

- [ ] Lighthouse mobile performance ≥ 85 on `/`, `/contact`, `/resources`
- [ ] All security headers present (verify with https://securityheaders.com)
- [ ] CSP enforced (not report-only) with zero console violations on key pages
- [ ] Playwright smoke tests pass on Chromium desktop + mobile Safari
- [ ] Lighthouse CI assertions pass in PR pipeline
- [ ] Docker image size < 250MB
- [ ] Zero `<img>` tags remain (all use `next/image`)
- [ ] All tracking IDs read from env vars
- [ ] No duplicate libraries (one markdown renderer, one carousel, one icon font, one animation lib)
- [ ] Build still produces 153 pages with no warnings

---

## Out of scope (separate plans)

- Migrating Bootstrap → Tailwind
- Switching `output: standalone` → `output: export` + CDN deploy (architectural decision)
- Adding Sentry / RUM (cost decision)
- Multi-region/i18n (`hreflang`)
- Vimeo embed migration (stakeholder decision)
- a11y full audit + WCAG AA remediation
- Sanity ISR / on-demand revalidation
- HubSpot form CSP nonce hardening (Task 10)

These should be brainstormed and planned separately when prioritized.

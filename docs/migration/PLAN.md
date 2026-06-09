# Next.js 14 → Astro Migration Plan

**Version:** 1.0  
**Date:** 2026-06-04  
**Scope:** Parity migration only. No features added. No UX changes. Implementation agents follow this doc exactly.

---

## Overview

Migrate `/home/pmandapati/Desktop/agent-projects/Nitco_global_website` from Next.js 14 (`pages/` router, `output: 'standalone'`) to Astro 4 (`output: 'static'`, `@astrojs/react` islands). The Astro build lives in `astro/` — a parallel subdirectory. Next.js is **untouched** until Phase 6 cutover. All decisions below are **final for parity phase** — backlog items are deferred.

**Language:** JS/JSX only. No TypeScript in Astro source.  
**Package manager:** pnpm.  
**Sanity Studio:** unchanged — Astro fetches via `@sanity/client` at build time.

---

## 1. Route Map

| Next.js Route | Astro File | Data Fetching | Layout | Islands | Complexity |
|---|---|---|---|---|---|
| `pages/index.js` | `src/pages/index.astro` | `getSeoForPath("/")` → JSON glob | `BaseLayout` | `LazyChatbot` (client:idle), `CountUp` (client:visible) | HIGH |
| `pages/[page].js` | `src/pages/[page].astro` | Sanity: 3 parallel GROQ queries | `BaseLayout` | `Blocks` dispatcher → block-type sub-islands | HIGH |
| `pages/insights/[page].js` | `src/pages/insights/[page].astro` | Sanity: same 3 GROQ queries filtered to `pageType=="insights"` | `BaseLayout` | Same as `[page]` — block-type sub-islands | HIGH |
| `pages/blog/[slug].js` | `src/pages/blog/[slug].astro` | `import.meta.glob` + gray-matter | `BaseLayout` | `AllPost` sticky sidebar (client:load), `InsightsSubscribeForm` (client:load) | MED |
| `pages/case-studies/[slug].js` | `src/pages/case-studies/[slug].astro` | `import.meta.glob` + gray-matter | `BaseLayout` | `AllPost` sticky sidebar (client:load) | MED |
| `pages/webinar/[slug].js` | `src/pages/webinar/[slug].astro` | `import.meta.glob` + gray-matter | `BaseLayout` | `AllPost` + Vimeo embed (client:load) | MED |
| `pages/whitepapers/[slug].js` | `src/pages/whitepapers/[slug].astro` | `import.meta.glob` + gray-matter | `BaseLayout` | `HubSpotWhitepapersForm` (client:only="react") | HIGH |
| `pages/solutions/[page].js` | `src/pages/solutions/[page].astro` | `lib/solutionsData.js` static import | `BaseLayout` | none — pure static | LOW |
| `pages/partners/[slug].js` | `src/pages/partners/[slug].astro` | `lib/partnersData.js` + MDX glob | `BaseLayout` | `PartnerPage` tabs (client:visible) | LOW |
| `pages/resources.js` | `src/pages/resources.astro` | MDX glob — allPosts + whitepaperspost | `BaseLayout` | `Resources` filters/pagination (client:load) | MED |
| `pages/contact.js` | `src/pages/contact.astro` | `getSeoForPath("/contact")` → JSON glob | `BaseLayout` | `ContactForm` with reCAPTCHA (client:only="react") | MED |
| `pages/company/about.js` | `src/pages/company/about.astro` | `getSeoForPath("/company/about")` → JSON glob | `BaseLayout` | `AboutUs` CountUp (client:visible) | LOW |
| `pages/company/careers.js` | `src/pages/company/careers.astro` | none | `BaseLayout` | none — pure static | LOW |
| `pages/ai-agent-command-center.js` | `src/pages/ai-agent-command-center.astro` | none | `BaseLayout` | `AICommandCenter` tabs/Vimeo (client:load) | MED |

**Notes:**
- `pages/_app.js` → dissolved into `BaseLayout.astro` (global CSS, scripts, SEO shell)
- `pages/_document.js` → dissolved into `BaseLayout.astro` (`<html lang="en">`, GTM, favicon)
- No API routes exist → nothing to port

---

## 2. Astro App Structure

```
astro/
├── astro.config.mjs              # output:'static', @astrojs/react, @astrojs/sitemap
├── package.json                  # pnpm workspace; deps listed in §2a
├── nginx.conf                    # security headers + static file serving (see §9)
├── Dockerfile                    # multi-stage: node builder → nginx:alpine runner
├── public/                       # copied from Next.js public/ verbatim
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── robots.txt
│   ├── llms.txt
│   └── images/                   # all existing public assets
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── [page].astro
│   │   ├── insights/
│   │   │   └── [page].astro
│   │   ├── blog/
│   │   │   └── [slug].astro
│   │   ├── case-studies/
│   │   │   └── [slug].astro
│   │   ├── webinar/
│   │   │   └── [slug].astro
│   │   ├── whitepapers/
│   │   │   └── [slug].astro
│   │   ├── solutions/
│   │   │   └── [page].astro
│   │   ├── partners/
│   │   │   └── [slug].astro
│   │   ├── resources.astro
│   │   ├── contact.astro
│   │   ├── company/
│   │   │   ├── about.astro
│   │   │   └── careers.astro
│   │   └── ai-agent-command-center.astro
│   ├── layouts/
│   │   └── BaseLayout.astro      # <html>, GTM, global CSS, global scripts, <slot/>
│   ├── components/
│   │   ├── SeoHead.astro         # <title>, meta, OG, Twitter, JSON-LD <slot/>
│   │   ├── Blocks.astro          # Sanity block dispatcher (static shell)
│   │   └── seo/
│   │       └── StructuredData.astro  # OrganizationSchema + WebSiteSchema as <script type="application/ld+json" is:inline>
│   ├── islands/                  # all React components that need client hydration
│   │   ├── LazyChatbot.jsx       # copied verbatim; Script → plain <script> tag via useEffect
│   │   ├── ContactForm.jsx       # copied verbatim from components/Contact/ContactForm.js
│   │   ├── HubSpotWhitepapersForm.jsx  # copied verbatim
│   │   ├── AllPost.jsx           # copied verbatim (blog/case-study/webinar detail)
│   │   ├── InsightsSubscribeForm.jsx
│   │   ├── Resources.jsx         # filters/pagination island
│   │   ├── AICommandCenter.jsx   # tabs + Vimeo
│   │   ├── PartnerPage.jsx       # tabs island
│   │   ├── AboutUs.jsx           # CountUp
│   │   ├── HomePage.jsx          # CountUp + animations
│   │   ├── Navbar.jsx            # interactive nav (client:load)
│   │   ├── GoTop.jsx             # scroll-to-top button
│   │   └── blocks/               # Sanity block-type islands (interactive ones only)
│   │       ├── BlogBlock.jsx
│   │       ├── CaseStudiesBlock.jsx
│   │       ├── WhitePapersBlock.jsx
│   │       ├── LeftVideoBlock.jsx
│   │       ├── RightVideoBlock.jsx
│   │       ├── WebinarBlock.jsx
│   │       ├── ButtonBlock.jsx
│   │       ├── PolicyBlock.jsx
│   │       └── CookieBlock.jsx
│   └── lib/
│       ├── sanity.js             # createClient using import.meta.env.PUBLIC_*
│       ├── sanityImage.js        # urlFor() — copied verbatim, env ref updated
│       ├── fetchSeoData.js       # loadAllSeoData() rewritten with import.meta.glob
│       ├── solutionsData.js      # copied verbatim (pure static data)
│       ├── partnersData.js       # copied verbatim
│       └── resourcesData.js      # copied verbatim
```

### 2a. astro/package.json key deps

```json
{
  "dependencies": {
    "astro": "^4.x",
    "@astrojs/react": "^3.x",
    "@astrojs/sitemap": "^3.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "@sanity/client": "^7.22.0",
    "@sanity/image-url": "^2.1.1",
    "gray-matter": "^4.0.3",
    "react-accessible-accordion": "^5.0.0",
    "react-countup": "^6.5.3",
    "react-intersection-observer": "^9.16.0",
    "react-markdown": "^9.0.1",
    "react-tabs": "^6.0.1",
    "react-responsive-masonry": "^2.1.7",
    "react-google-recaptcha": "^3.1.0",
    "rehype-raw": "^7.0.0",
    "remark-gfm": "^4.0.1",
    "isomorphic-dompurify": "^2.29.0",
    "react-feather": "^2.0.10",
    "@portabletext/react": "^6.2.0",
    "@fontsource/montserrat": "^5.x",
    "aos": "^2.3.4"
  }
}
```

### 2b. astro.config.mjs

```js
// astro/astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://nitcoinc.com',
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  redirects: {
    '/:path*__:_slug.mdx': '/:path*/:_slug',
  },
  vite: {
    css: { modules: { localsConvention: 'camelCase' } },
  },
});
```

---

## 3. Styling Strategy

### Global CSS import order in BaseLayout.astro

Reproduce the **exact** import order from `pages/_app.js`. Import in `<style is:global>` OR as `<link>` tags in `<head>` — use `<link>` tags for vendor CSS that must not be transformed, and a single `<style is:global>` import for project CSS.

Recommended approach: put all imports in a single `src/styles/global.css` that is imported in `BaseLayout.astro` frontmatter:

```js
// astro/src/styles/global.css  — IMPORT ORDER MUST MATCH _app.js EXACTLY
@import '../../../styles/css/bootstrap.min.css';           /* 1 */
@import '../../../styles/css/boxicons.min.css';            /* 2 */
@import 'react-accessible-accordion/dist/fancy-example.css'; /* 3 */
@import 'aos/dist/aos.css';                                /* 4 */
@import '../../../styles/css/switzer.css';                 /* 5 */
@import '@fontsource/montserrat';                          /* 6 */
@import '../../../styles/css/style.css';                   /* 7 — compiled from style.scss */
@import '../../../styles/css/responsive.css';              /* 8 — compiled from responsive.scss */
```

In `BaseLayout.astro` frontmatter:

```js
---
import '../styles/global.css';
---
```

**Rules:**
- Import `.css` files, **NOT** `.scss` sources. SCSS is already compiled in `styles/css/`.
- `styles/css/colors/` files (brink-pink, pink, purple) are **not imported anywhere** — do not add them.
- `styled-components` is listed in `package.json` but has **zero production usage** — do not install it in Astro.
- CSS Modules (`*.module.css`) work identically in `.astro` and `.jsx` files — import as `import styles from './Foo.module.css'` unchanged.
- All component-level `*.module.css` files are copied verbatim alongside their island counterparts under `src/islands/`.

---

## 4. Islands Strategy

| Next.js Component | Island File | client: directive | Reason |
|---|---|---|---|
| `components/Chatbot/LazyChatbot.js` | `islands/LazyChatbot.jsx` | `client:idle` | User-interaction / 5s timer triggers; defer until idle |
| `components/HomePage/HomePage.js` | `islands/HomePage.jsx` | `client:load` | AOS animations + CountUp need DOM |
| `components/Navbar/Navbar.js` | `islands/Navbar.jsx` | `client:load` | Dropdown menus need JS |
| `components/Footer/Footer.js` | `islands/Footer.jsx` | `client:load` | AOS init in footer |
| `components/Footer/FooterDesign/FooterDesignMobile.js` | `islands/FooterDesignMobile.jsx` | `client:load` | — |
| `components/AboutUs/AboutUs.js` | `islands/AboutUs.jsx` | `client:visible` | CountUp triggers on scroll into view |
| `components/Contact/ContactForm.js` | `islands/ContactForm.jsx` | `client:only="react"` | reCAPTCHA requires DOM + window; no SSR |
| `components/Hubspot/hubSpotWhitepapersForm.js` | `islands/HubSpotWhitepapersForm.jsx` | `client:only="react"` | `document.createElement` + `window.hbspt` in useEffect; no SSR |
| `components/Resources/resourceDetailedPage/AllPost.js` | `islands/AllPost.jsx` | `client:load` | Sticky sidebar scroll listener |
| `components/Hubspot/HubspotInsightsForm/insightsSubscribeForm.js` | `islands/InsightsSubscribeForm.jsx` | `client:load` | HubSpot form DOM injection |
| `components/Resources/Resources.js` | `islands/Resources.jsx` | `client:load` | Filter/pagination state |
| `components/AICommandCenter/AICommandCenter.js` | `islands/AICommandCenter.jsx` | `client:load` | Tabs + Vimeo player |
| `components/Partners/PartnerPage.js` | `islands/PartnerPage.jsx` | `client:visible` | Tab component |
| `components/GoTop.js` | `islands/GoTop.jsx` | `client:load` | Scroll position listener |
| `components/Blocks.js` dispatcher | `islands/Blocks.jsx` | `client:load` | Dispatches to block-type islands |
| Block: `BlogPage` | `islands/blocks/BlogBlock.jsx` | `client:load` | — |
| Block: `CaseStudies` | `islands/blocks/CaseStudiesBlock.jsx` | `client:load` | — |
| Block: `WhitePapers` | `islands/blocks/WhitePapersBlock.jsx` | `client:load` | — |
| Block: `LeftVideoPage` | `islands/blocks/LeftVideoBlock.jsx` | `client:load` | Vimeo |
| Block: `RightVideoPage` | `islands/blocks/RightVideoBlock.jsx` | `client:load` | Vimeo |
| Block: `WebinarsPage` | `islands/blocks/WebinarBlock.jsx` | `client:load` | — |
| Block: `VideosbuttonsListArea` | `islands/blocks/ButtonBlock.jsx` | `client:load` | — |
| Block: `PrivacyPolicy` | `islands/blocks/PolicyBlock.jsx` | `client:load` | — |
| Block: `CookiePolicy` | `islands/blocks/CookieBlock.jsx` | `client:load` | — |
| `components/ErrorBoundary.js` | `islands/ErrorBoundary.jsx` | `client:load` | React error boundary |

### Kore.ai chatbot special handling

`LazyChatbot.jsx` uses Next.js `<Script>` component. In Astro, replace with a plain `useEffect` that dynamically inserts the `<script>` tag:

```jsx
// islands/LazyChatbot.jsx
import { useEffect, useState } from 'react';

export default function LazyChatbot() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const triggers = ['scroll', 'mousemove', 'touchstart', 'keydown'];
    let triggered = false;
    const onTrigger = () => {
      if (triggered) return;
      triggered = true;
      setShouldLoad(true);
      triggers.forEach(t => window.removeEventListener(t, onTrigger));
    };
    const timer = setTimeout(onTrigger, 5000);
    triggers.forEach(t => window.addEventListener(t, onTrigger, { passive: true, once: true }));
    return () => {
      clearTimeout(timer);
      triggers.forEach(t => window.removeEventListener(t, onTrigger));
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/kore-web-sdk@11.19.1/dist/umd/kore-web-sdk-umd-chat.min.js';
    script.async = true;
    script.onload = () => {
      if (window.KoreChatSDK) {
        window.KoreChatSDK.chatConfig.botOptions.API_KEY_CONFIG.KEY =
          import.meta.env.PUBLIC_KORE_API_KEY;
        window.KoreChatSDK.chatConfig.widgetOptions = { position: 'bottom-right' };
        new window.KoreChatSDK.chatWindow().show(window.KoreChatSDK.chatConfig);
      }
    };
    document.body.appendChild(script);
  }, [shouldLoad]);

  return null;
}
```

Usage in `BaseLayout.astro`:
```astro
import LazyChatbot from '../islands/LazyChatbot.jsx';
---
<LazyChatbot client:idle />
```

---

## 5. Sanity Strategy

### astro/src/lib/sanity.js

Replace `process.env.NEXT_PUBLIC_*` with `import.meta.env.PUBLIC_*`:

```js
// astro/src/lib/sanity.js
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});
```

### astro/src/lib/sanityImage.js

Copied **verbatim** from `lib/sanityImage.js` — only change the import path:

```js
import { sanityClient } from './sanity.js';
// rest unchanged
```

### getStaticPaths + data fetching in Astro pages

Astro frontmatter replaces `getStaticPaths` + `getStaticProps`. Pattern for `[page].astro`:

```astro
---
// astro/src/pages/[page].astro
import { sanityClient } from '../lib/sanity.js';
import BaseLayout from '../layouts/BaseLayout.astro';
import Blocks from '../islands/Blocks.jsx';

const ALL_PAGES_QUERY = `*[_type == "page"]{ slug }`;
const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _id, slug, pageType,
  blocks[]{
    _type, label, buttonList,
    tagline_R_V, text_R_V, video_R_V, url_R_V,
    tagline_L_V, text_L_V, video_L_V,
    mainheading, lastupdated, body
  }
}`;
const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  "slug": slug.current, postType, title,
  "image": image.asset->url,
  publishedAt, postedBy, duration,
  description, blogcategory, blogindustry, blogdepartment
}`;
const WHITEPAPERS_QUERY = `*[_type == "whitepaper"] | order(_createdAt desc) {
  "slug": slug.current, title,
  "image": image.asset->url,
  pdfFileUrl, description
}`;

export async function getStaticPaths() {
  const pages = await sanityClient.fetch(ALL_PAGES_QUERY);
  return pages.map((p) => ({
    params: { page: p.slug.current },
  }));
}

const { page: slug } = Astro.params;
const [page, posts, whitepapers] = await Promise.all([
  sanityClient.fetch(PAGE_QUERY, { slug }),
  sanityClient.fetch(POSTS_QUERY),
  sanityClient.fetch(WHITEPAPERS_QUERY),
]);

if (!page) return Astro.redirect('/404');
---
<BaseLayout title="Nitco Inc.">
  <Blocks page={page} posts={posts} whitepapers={whitepapers} client:load />
</BaseLayout>
```

### insights/[page].astro

Identical pattern, but `ALL_INSIGHTS_QUERY` filters by `pageType == "insights"`:

```js
const ALL_INSIGHTS_QUERY = `*[_type == "page" && pageType == "insights"]{ slug }`;
```

---

## 6. Third-Party Scripts Strategy

### Script inventory (from `pages/_app.js` + `pages/_document.js`)

| Script | Original location | Astro location | Load strategy |
|---|---|---|---|
| Google Tag Manager (inline) | `_document.js` `<Head>` | `BaseLayout.astro` `<head>` | `<script is:inline>` — must fire synchronously before body |
| GTM noscript iframe | `_document.js` `<body>` | `BaseLayout.astro` after `<body>` open | `<noscript>` block, verbatim |
| Iubenda config (inline) | `_app.js` `afterInteractive` | `BaseLayout.astro` `<head>` | `<script is:inline defer>` |
| `cdn.iubenda.com/cs/tcf/stub-v2.js` | `_app.js` `afterInteractive` | `BaseLayout.astro` `<head>` | `<script src="..." defer></script>` |
| `cdn.iubenda.com/cs/tcf/safe-tcf-v2.js` | `_app.js` `afterInteractive` | `BaseLayout.astro` `<head>` | `<script src="..." defer></script>` |
| `cdn.iubenda.com/cs/ccpa/stub.js` | `_app.js` `afterInteractive` | `BaseLayout.astro` `<head>` | `<script src="..." defer></script>` |
| `cdn.iubenda.com/cs/iubenda_cs.js` | `_app.js` `afterInteractive` async | `BaseLayout.astro` `<head>` | `<script src="..." async defer></script>` |
| Leadsy/RB2B (`r2.leadsy.ai/tag.js`) | `_app.js` `afterInteractive` | `BaseLayout.astro` before `</body>` | `<script src="..." defer data-pid="..." data-version="..."></script>` |
| RB2B inline (`ddwl4m2hdecbv.cloudfront.net`) | `_app.js` `afterInteractive` | `BaseLayout.astro` before `</body>` | `<script is:inline defer>` |
| ScriptIntel (`api-gateway.scriptintel.io`) | `_app.js` `afterInteractive` | `BaseLayout.astro` before `</body>` | `<script src="..." defer charset="utf-8"></script>` |
| HubSpot tracking (`js.hs-scripts.com`) | `_app.js` — **commented out** | leave commented out | — |
| Kore.ai chatbot SDK | `_app.js` via `LazyChatbot` | `BaseLayout.astro` as `<LazyChatbot client:idle />` | user-interaction / 5s fallback |

### Concrete GTM snippet in BaseLayout.astro

```astro
<!-- BaseLayout.astro <head> — GTM must be first script -->
<script is:inline>
  (function(w,d,s,l,i){w[l]=w[l]||[];
  w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-K6CXJBJN');
</script>
```

**Note:** `import.meta.env` is not available in `<script is:inline>`. Hard-code the GTM ID OR inject via a template literal in the Astro frontmatter and pass it as a data attribute read by the inline script. Recommended: pass as `<meta name="gtm-id" content={Astro.locals.gtmId}>` or bake the ID literal at build time from `PUBLIC_GTM_ID` via a dynamic `<script is:inline define:vars={{gtmId: import.meta.env.PUBLIC_GTM_ID}}>` — Astro supports this:

```astro
<script is:inline define:vars={{ gtmId: import.meta.env.PUBLIC_GTM_ID || 'GTM-K6CXJBJN' }}>
  (function(w,d,s,l,i){ /* ... */ })(window,document,'script','dataLayer',gtmId);
</script>
```

### Iubenda config snippet

```astro
<script is:inline define:vars={{
  iubSiteId: import.meta.env.PUBLIC_IUBENDA_SITE_ID || 2053600,
  iubCookiePolicyId: import.meta.env.PUBLIC_IUBENDA_COOKIE_POLICY_ID || 12542728,
}} defer>
  var _iub = _iub || [];
  _iub.csConfiguration = {
    enableCcpa: true,
    /* ... full config ... */
    siteId: iubSiteId,
    cookiePolicyId: iubCookiePolicyId,
    /* ... */
  };
</script>
```

---

## 7. SEO Strategy

### Problem

`lib/seoCache.js` uses `fs.readdirSync` (Node.js runtime). Astro build runs in Node.js so `fs` works, but the recommended Astro pattern is `import.meta.glob` which is resolved at build time by Vite.

### Solution: rewrite `fetchSeoData.js` using import.meta.glob

```js
// astro/src/lib/fetchSeoData.js

const seoFiles = import.meta.glob('../../content/seo/*.json', { eager: true });

export function loadAllSeoData() {
  return Object.values(seoFiles).map((mod) => mod.default || mod).filter(Boolean);
}

const decodeHtmlEntities = (str = '') =>
  str
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");

const normalizePath = (p) => {
  if (!p) return '';
  return decodeURIComponent(decodeHtmlEntities(p))
    .toLowerCase()
    .replace(/https?:\/\/[^/]+/, '')
    .replace(/\?.*$/, '')
    .replace(/\/+$/, '')
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .trim();
};

export function getSeoForPath(pathname) {
  const entries = loadAllSeoData();
  const target = normalizePath(pathname);
  return (
    entries.find((e) => normalizePath(e.path) === target) ||
    entries.find((e) => target.startsWith(normalizePath(e.path))) ||
    null
  );
}
```

**Note:** `import.meta.glob` path must be relative to the file. From `src/lib/fetchSeoData.js` the path `../../content/seo/*.json` resolves to `astro/content/seo/` — symlink or copy `content/seo/` into `astro/content/seo/` (or adjust path to `../../../content/seo/*.json` if `astro/` is nested inside the project root). **Recommended:** symlink at build time — `ln -s ../../content astro/content`.

### SeoHead.astro

```astro
---
// astro/src/components/SeoHead.astro
const {
  title = 'NITCO Inc.',
  description = 'NITCO delivers AI, Automation, Data, and Integration solutions engineered to transform and scale enterprise operations.',
  canonical = 'https://nitcoinc.com',
  ogType = 'website',
  ogImage = 'https://nitcoinc.com/images/og-default.jpg',
} = Astro.props;
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

<!-- Open Graph -->
<meta property="og:type" content={ogType} />
<meta property="og:site_name" content="NITCO Inc." />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />

<!-- Favicon -->
<link rel="icon" href="/favicon.svg" />

<!-- Structured Data -->
<slot name="structured-data" />
```

### Sitemap

`@astrojs/sitemap` auto-generates from static pages. The 151-URL baseline from `public/sitemap-0.xml` must match. Configure in `astro.config.mjs`:

```js
sitemap({
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
  filter: (page) => !page.includes('/api/'),
}),
```

After first build, diff `dist/sitemap-0.xml` against `baseline/sitemap-0.xml`. If URLs differ, use `customPages` or `serialize` hook to match exactly.

---

## 8. Redirects Strategy

`next.config.js` has one redirect:

```js
{ source: '/:path*__:_slug.mdx', destination: '/:path*/:_slug', permanent: true }
```

In `astro.config.mjs`:

```js
redirects: {
  '/:path*__:_slug.mdx': {
    destination: '/:path*/:_slug',
    status: 301,
  },
},
```

Note: Astro `output: 'static'` redirects generate HTML meta-refresh files. For proper 301s at edge, the redirect must also be in `nginx.conf`:

```nginx
# nginx.conf — redirect rule (add to server block)
location ~* "^(.*?)__([^/]+)\.mdx$" {
    return 301 $1/$2;
}
```

---

## 9. Headers Strategy (nginx)

Full `astro/nginx.conf`. This is the production nginx config used in Docker:

```nginx
# astro/nginx.conf
events { worker_connections 1024; }

http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;
  sendfile      on;
  gzip          on;
  gzip_types    text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

  server {
    listen       80;
    server_name  _;
    root         /usr/share/nginx/html;
    index        index.html;

    # Security headers (mirror next.config.js)
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options    "nosniff" always;
    add_header X-Frame-Options           "SAMEORIGIN" always;
    add_header Referrer-Policy           "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy        "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;
    add_header Content-Security-Policy   "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.iubenda.com https://www.googletagmanager.com https://www.google-analytics.com https://r2.leadsy.ai https://api-gateway.scriptintel.io https://cdn.jsdelivr.net https://ddwl4m2hdecbv.cloudfront.net https://js.hs-scripts.com https://js.hsforms.net https://www.google.com https://www.gstatic.com https://snap.licdn.com https://www.linkedin.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://cdn.sanity.io https://www.googletagmanager.com https://www.google-analytics.com https://*.hsforms.net https://www.google.com https://ddwl4m2hdecbv.cloudfront.net; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://cdn.sanity.io https://*.apicdn.sanity.io https://www.google-analytics.com https://api-gateway.scriptintel.io https://ddwl4m2hdecbv.cloudfront.net https://r2.leadsy.ai https://forms.hsforms.com https://*.hubspot.com https://stats.g.doubleclick.net; frame-src 'self' https://player.vimeo.com https://www.googletagmanager.com https://www.google.com https://forms.hsforms.com https://www.youtube.com; media-src 'self' blob: https://player.vimeo.com; object-src 'none'; base-uri 'self'; form-action 'self' https://*.hubspot.com; frame-ancestors 'self'; upgrade-insecure-requests" always;
    add_header X-Powered-By              "" always;

    # MDX redirect (mirrors next.config.js redirect)
    location ~* "^(.*?)__([^/]+)\.mdx$" {
      return 301 $1/$2;
    }

    # Static assets — long cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|avif)$ {
      expires 1y;
      add_header Cache-Control "public, immutable";
      try_files $uri =404;
    }

    # SPA-style fallback for Astro static pages
    location / {
      try_files $uri $uri/ $uri.html $uri/index.html =404;
    }

    # Explicit 404
    error_page 404 /404.html;
  }
}
```

---

## 10. Content / MDX Strategy

### Current pattern

`pages/blog/[slug].js`, `pages/case-studies/[slug].js`, `pages/webinar/[slug].js`, and `pages/resources.js` use:
- `fs.readdirSync(dir)` to list files
- `gray-matter` to parse frontmatter
- File naming convention: `{type}__{slug}.mdx` in `content/allPosts/` (64 files) and `content/whitepaperspost/`

**148 SEO JSON files** live in `content/seo/`.

### Chosen approach: Option (a) — import.meta.glob + gray-matter (parity)

**Rationale:** Identical data shape to Next.js. No content transformation. Zero risk of parity regression. Astro Content Collections are backlog.

#### Pattern for blog/[slug].astro

```astro
---
// astro/src/pages/blog/[slug].astro
import matter from 'gray-matter';
import BaseLayout from '../../layouts/BaseLayout.astro';
import AllPost from '../../islands/AllPost.jsx';
import { getSeoForPath } from '../../lib/fetchSeoData.js';

// Vite resolves glob at build time; returns { path: moduleContent }
const allPostFiles = import.meta.glob('../../../content/allPosts/*.mdx', {
  eager: true,
  as: 'raw',
});

export function getStaticPaths() {
  return Object.keys(allPostFiles)
    .filter((path) => path.includes('/blog__'))
    .map((path) => {
      const slug = path.split('/blog__').pop().replace(/\.mdx$/, '');
      return { params: { slug } };
    });
}

const { slug } = Astro.params;
const filePath = Object.keys(allPostFiles).find((p) => p.endsWith(`/blog__${slug}.mdx`));
const raw = filePath ? allPostFiles[filePath] : '';
const { data, content } = matter(raw || '');

// Recent posts
const latestPosts = Object.keys(allPostFiles)
  .filter((p) => p.includes('/blog__') && !p.endsWith(`/blog__${slug}.mdx`))
  .map((p) => {
    const { data: d } = matter(allPostFiles[p]);
    return {
      slug: d.slug || p.split('/blog__').pop().replace(/\.mdx$/, ''),
      pageType: 'blog',
      title: d.title || '',
      image: d.image || null,
      date: d.date ? String(d.date) : null,
    };
  })
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  .slice(0, 5);

const seo = getSeoForPath(`/blog/${slug}`);

const postProps = {
  data: {
    allPosts: {
      slug: data.slug || slug,
      pageType: data.pageType || 'blog',
      pagetype: data.pagetype || 'Blog',
      title: data.title || '',
      image: data.image || null,
      date: data.date ? String(data.date) : null,
      body: content.trim(),
    },
  },
  query: '',
  variables: {},
  sorteddata: latestPosts,
  seo,
};
---
<BaseLayout seo={seo}>
  <AllPost {...postProps} client:load />
</BaseLayout>
```

Same pattern applies to `case-studies/[slug].astro` and `webinar/[slug].astro` — swap `blog__` prefix.

#### Resources page

```astro
---
const allPostFiles = import.meta.glob('../../../content/allPosts/*.mdx', { eager: true, as: 'raw' });
const wpFiles = import.meta.glob('../../../content/whitepaperspost/*.mdx', { eager: true, as: 'raw' });
// parse, filter by pageType, shape exactly as in pages/resources.js getStaticProps
---
```

**Content symlink requirement:** `astro/content` → `../content` (relative symlink from `astro/`). Add to `Dockerfile`:

```dockerfile
RUN ln -s /app/content /app/astro/content
```

Or copy at build: `COPY content ./content` (if `astro/` is built standalone).

---

## 11. Improvement Backlog

These are **not applied during parity phase**. Apply only after e2e + screenshot + Lighthouse gates pass on the parity build.

| # | Item | Risk | Effort | Parity-safe |
|---|---|---|---|---|
| 1 | Remove dead deps: `next-auth`, `graphql`, `next-video`, `react-google-recaptcha-v3`, `styled-components` | LOW — not imported in production | 0.5 session | YES — remove from Astro package.json; never install |
| 2 | Remove unused color theme CSS: `styles/css/colors/brink-pink-style.css`, `pink-style.css`, `purple-style.css` | LOW — confirmed not imported | 0.1 session | YES |
| 3 | Astro Content Collections: replace `import.meta.glob + gray-matter` with typed `defineCollection` | MED — data shape change | 2 sessions | NO — do after parity |
| 4 | TypeScript adoption: add `tsconfig.json`, rename `.jsx` → `.tsx`, add types | MED — broad file changes | 3 sessions | NO — do after parity |
| 5 | Drop `NavBarMobile` stub: `components/Navbar/NavBarMobile/navBarMobile.js` returns `null` | LOW | 0.1 session | YES — omit from Astro |
| 6 | Remove commented-out HubSpot tracking script from `BaseLayout.astro` | ZERO | 0.1 session | YES |
| 7 | `@astrojs/image` optimisation: replace `<img>` with `<Image>` for Sanity CDN URLs | MED — requires audit | 1 session | NO |
| 8 | AOS → CSS animations: replace `aos` library with native CSS scroll animations | MED | 2 sessions | NO |
| 9 | Replace `react-countup` with native Intersection Observer + CSS counter | LOW-MED | 1 session | NO |
| 10 | Consolidate `Footer` + `FooterDesignMobile` into single responsive component | LOW | 0.5 session | NO |

---

## 12. Parity Checklist (per page)

Before marking any page phase complete, run all three gates:

### Gate 1 — e2e (Playwright)

```bash
cd astro && pnpm exec playwright test
```

Must pass: **22/22 tests** (same suite as `tests/e2e/smoke.spec.ts` + `baseline-screenshots.spec.ts`, pointed at Astro dev server `localhost:4321`).

Astro port: `4321` (default). Update `playwright.config.ts` `baseURL` for Astro runs OR use a separate `playwright.astro.config.ts`.

### Gate 2 — Screenshot diff (≤2%)

```bash
pnpm exec playwright test tests/e2e/baseline-screenshots.spec.ts
```

Baseline: 16 files in `baseline/screenshots/`. Max diff per screenshot: **2%** pixel delta. Use `pixelmatch` or Playwright's built-in `toMatchSnapshot`. Run at 1280×800 (desktop) and 375×812 (mobile) to match existing baselines.

### Gate 3 — Lighthouse (≥ baseline)

Baseline (homepage desktop): perf=100, a11y=90, bp=96, seo=100.

```bash
lhci autorun --config=astro/lighthouserc.json
```

Create `astro/lighthouserc.json`:
```json
{
  "ci": {
    "collect": {
      "startServerCommand": "pnpm run preview",
      "url": ["http://localhost:4321", "http://localhost:4321/contact", "http://localhost:4321/resources", "http://localhost:4321/company/about"],
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
    }
  }
}
```

### Per-page checklist

For each of the 14 routes:

- [ ] `getStaticPaths` generates correct slug set
- [ ] Page renders without console errors
- [ ] All islands hydrate correctly
- [ ] SEO `<title>` and `<meta description>` match Next.js output
- [ ] `canonical` URL correct
- [ ] JSON-LD structured data present (where applicable)
- [ ] CSS Modules classes applied correctly
- [ ] No broken images
- [ ] All external links present
- [ ] Playwright e2e smoke passes
- [ ] Screenshot diff ≤2% vs baseline

---

## 13. Estimated Effort

| Phase | Scope | Estimate |
|---|---|---|
| Phase 1 (this doc) | Architecture planning, PLAN.md | 1 session (complete) |
| Phase 2 | Foundation: `astro/` scaffold, `astro.config.mjs`, `BaseLayout.astro`, `SeoHead.astro`, global CSS, `lib/sanity.js`, `lib/sanityImage.js`, `lib/fetchSeoData.js`, `nginx.conf`, Dockerfile | 2 sessions |
| Phase 3 | HIGH-complexity pages: `/` (index), `/[page]`, `/insights/[page]`, `Blocks.astro` + all block islands | 3 sessions |
| Phase 4 | MED-complexity pages: `/blog/[slug]`, `/case-studies/[slug]`, `/webinar/[slug]`, `/whitepapers/[slug]`, `/resources`, `/contact`, `/ai-agent-command-center` | 3 sessions |
| Phase 5 | LOW-complexity pages: `/solutions/[page]`, `/partners/[slug]`, `/company/about`, `/company/careers`. Parity gates on all pages. | 2 sessions |
| Phase 6 | Cutover: DNS/Docker switch, deprecate Next.js `pages/`, final Lighthouse run | 1 session |
| **Total** | | **12 sessions** |

---

## Appendix A — Env Var Rename Map

All `NEXT_PUBLIC_*` → `PUBLIC_*`. Update `.env`, `.env.example`, and `Dockerfile` `ARG`/`ENV` blocks.

| Next.js var | Astro var | Used in |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `PUBLIC_SANITY_PROJECT_ID` | `lib/sanity.js` |
| `NEXT_PUBLIC_SANITY_DATASET` | `PUBLIC_SANITY_DATASET` | `lib/sanity.js` |
| `NEXT_PUBLIC_GTM_ID` | `PUBLIC_GTM_ID` | `BaseLayout.astro` |
| `NEXT_PUBLIC_IUBENDA_SITE_ID` | `PUBLIC_IUBENDA_SITE_ID` | `BaseLayout.astro` |
| `NEXT_PUBLIC_IUBENDA_COOKIE_POLICY_ID` | `PUBLIC_IUBENDA_COOKIE_POLICY_ID` | `BaseLayout.astro` |
| `NEXT_PUBLIC_LEADSY_PID` | `PUBLIC_LEADSY_PID` | `BaseLayout.astro` |
| `NEXT_PUBLIC_SCRIPTINTEL_TAG_URL` | `PUBLIC_SCRIPTINTEL_TAG_URL` | `BaseLayout.astro` |
| `NEXT_PUBLIC_KORE_API_KEY` | `PUBLIC_KORE_API_KEY` | `islands/LazyChatbot.jsx` |
| `NEXT_PUBLIC_RB2B_KEY` | `PUBLIC_RB2B_KEY` | `BaseLayout.astro` |

---

## Appendix B — Astro Dockerfile (Phase 2 target)

```dockerfile
# astro/Dockerfile
FROM node:22-alpine AS base
RUN npm install -g pnpm@10

# ---- deps ----
FROM base AS deps
WORKDIR /app
COPY astro/package.json astro/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- builder ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . /workspace
WORKDIR /workspace/astro
# Symlink shared content from project root
RUN ln -s /workspace/content ./content

ARG PUBLIC_SANITY_PROJECT_ID
ARG PUBLIC_SANITY_DATASET
ARG PUBLIC_GTM_ID
ARG PUBLIC_IUBENDA_SITE_ID
ARG PUBLIC_IUBENDA_COOKIE_POLICY_ID
ARG PUBLIC_LEADSY_PID
ARG PUBLIC_SCRIPTINTEL_TAG_URL
ARG PUBLIC_KORE_API_KEY
ARG PUBLIC_RB2B_KEY
ENV PUBLIC_SANITY_PROJECT_ID=$PUBLIC_SANITY_PROJECT_ID \
    PUBLIC_SANITY_DATASET=$PUBLIC_SANITY_DATASET \
    PUBLIC_GTM_ID=$PUBLIC_GTM_ID \
    PUBLIC_IUBENDA_SITE_ID=$PUBLIC_IUBENDA_SITE_ID \
    PUBLIC_IUBENDA_COOKIE_POLICY_ID=$PUBLIC_IUBENDA_COOKIE_POLICY_ID \
    PUBLIC_LEADSY_PID=$PUBLIC_LEADSY_PID \
    PUBLIC_SCRIPTINTEL_TAG_URL=$PUBLIC_SCRIPTINTEL_TAG_URL \
    PUBLIC_KORE_API_KEY=$PUBLIC_KORE_API_KEY \
    PUBLIC_RB2B_KEY=$PUBLIC_RB2B_KEY

RUN pnpm run build

# ---- runner ----
FROM nginx:alpine AS runner
COPY --from=builder /workspace/astro/dist /usr/share/nginx/html
COPY astro/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

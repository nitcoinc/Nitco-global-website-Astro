# Foundation: seo-head

**Status:** done  
**Source files:** `lib/fetchSeoData.js`, `lib/seoCache.js`  
**Used by:** All 14 page docs — SEO head rendered on every route

---

## Current Implementation

`lib/fetchSeoData.js` — fetches SEO fields from Sanity for a given slug/type:
- GROQ query returns `{ title, description, ogImage, jsonLd, canonicalUrl }`
- Called in `getStaticProps` of each page

`lib/seoCache.js` — in-memory cache keyed by query string to avoid redundant GROQ calls during build. Relevant in Next.js SSG; Astro build is single-pass so cache may be less critical but harmless to keep.

SEO data rendered via a `<Head>` component (likely `components/Head.js` or inline in `_app.js`) using `next/head`.

---

## Port Strategy

1. Port `fetchSeoData.js` → `astro/src/lib/fetchSeoData.js` — replace `next/head` import patterns; function itself is plain JS
2. Port `seoCache.js` → `astro/src/lib/seoCache.js` unchanged (module-level Map cache works identically in Node build)
3. Create `astro/src/components/SeoHead.astro` — renders into Astro `<head>` slot:
   ```astro
   ---
   const { title, description, ogImage, canonicalUrl, jsonLd } = Astro.props;
   ---
   <title>{title}</title>
   <meta name="description" content={description} />
   <meta property="og:title" content={title} />
   <meta property="og:image" content={ogImage} />
   <link rel="canonical" href={canonicalUrl} />
   {jsonLd && <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />}
   ```
4. `BaseLayout.astro` exposes `<slot name="head" />` — pages inject `<SeoHead>` there

---

## Astro Target

```astro
<!-- astro/src/layouts/BaseLayout.astro -->
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <slot name="head" />
</head>
```

```astro
<!-- any page -->
---
import { fetchSeoData } from '../lib/fetchSeoData.js';
const seo = await fetchSeoData(slug);
---
<BaseLayout>
  <SeoHead slot="head" {...seo} />
  ...
</BaseLayout>
```

---

## Parity Checklist

- [ ] `<title>` matches Next.js output for all 14 routes
- [ ] `og:title`, `og:description`, `og:image` present
- [ ] `canonical` URL correct (no trailing slash mismatch)
- [ ] JSON-LD script block present where Next.js emitted it
- [ ] No `next/head` imports remain in `astro/src/`

# Migration: /[page]

**Status:** pending  
**Source:** `pages/[page].js`  
**Complexity:** high  
**Dependencies:** [base-layout](_foundation-base-layout.md), [sanity-client-lib](_foundation-sanity-client-lib.md), [image-helper](_foundation-image-helper.md), [seo-head](_foundation-seo-head.md)

---

## Current Next.js Implementation

Dynamic catch-all route for Sanity-powered pages. Uses `getStaticPaths` to enumerate all documents of relevant types, and `getStaticProps` to fetch full page data including `body` block content. Renders via `Blocks.js` which maps Sanity portable-text block types to React components.

**HIGH RISK:** `Blocks.js` contains a dynamic component map with 10 block types. Each block type is a separate React component. Some block types may have interactivity.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `Blocks` | React → mixed | Block-builder dispatcher — 10 block type components |
| Block type components (×10) | React → Astro/island per type | Audit each individually |

**Block types to audit and classify:**

| Block Type | Expected Interactivity | Directive |
|---|---|---|
| RichText / PortableText | None | Static Astro |
| ImageBlock | None | Static Astro |
| HeroBlock | None | Static Astro |
| CTABlock | None | Static Astro |
| VideoBlock | `client:visible` | Vimeo/YouTube embed |
| FormBlock | `client:only="react"` | HubSpot or similar |
| TestimonialsBlock | `client:visible` | Carousel/slider |
| StatsBlock | `client:visible` | CountUp |
| AccordionBlock | `client:load` | open/close state |
| TabsBlock | `client:load` | tab switch state |

*Exact block types must be confirmed by reading `Blocks.js` during implementation.*

---

## Islands (Interactive Components)

Each block type that has interactivity becomes its own island. Static blocks become inline Astro markup within `[page].astro`.

---

## Styling Notes

- Block components use global CSS classes and/or CSS Modules
- Each block component's CSS file must be copied alongside the island

---

## Third-Party Scripts

Depends on block content — `FormBlock` may inject HubSpot; `VideoBlock` may load Vimeo API.

---

## Sanity / Data

```js
// getStaticPaths
const pages = await sanityClient.fetch(`*[_type in ["page", "landingPage"]]{ slug }`);

// getStaticProps
const page = await sanityClient.fetch(
  `*[_type in ["page", "landingPage"] && slug.current == $slug][0]{
    title, body, seo, ...
  }`,
  { slug }
);
```

`body` is a Portable Text array. Each element has a `_type` field mapping to a block component.

---

## Astro Target Design

```
astro/src/pages/[page].astro
```

Strategy: render `body` array in Astro frontmatter, switch on `_type`, render static blocks as inline Astro markup, dynamic blocks as islands.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
// ... block component imports
export async function getStaticPaths() {
  const pages = await sanityClient.fetch(`*[_type in ["page"]]{ "slug": slug.current }`);
  return pages.map(p => ({ params: { page: p.slug } }));
}
const { page } = Astro.params;
const data = await sanityClient.fetch(pageQuery, { slug: page });
---
<BaseLayout>
  {data.body.map(block => {
    if (block._type === 'richText') return <RichTextBlock {...block} />;
    if (block._type === 'hero') return <HeroBlock {...block} />;
    if (block._type === 'video') return <VideoBlock client:visible {...block} />;
    // ...
  })}
</BaseLayout>
```

---

## Parity Checklist

- [ ] Route accessible at `/[page]` for all slugs enumerated in `getStaticPaths`
- [ ] All 10 block types render correctly
- [ ] Interactive block types hydrate (forms, videos, accordions, tabs)
- [ ] SEO head matches
- [ ] Screenshot diff < 2% per page variant
- [ ] e2e tests pass
- [ ] Lighthouse >= baseline

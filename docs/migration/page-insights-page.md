# Migration: /insights/[page]

**Status:** done  
**Source:** `pages/insights/[page].js`  
**Complexity:** high  
**Dependencies:** [base-layout](_foundation-base-layout.md), [sanity-client-lib](_foundation-sanity-client-lib.md), [image-helper](_foundation-image-helper.md), [seo-head](_foundation-seo-head.md), [page-dynamic-page](page-dynamic-page.md)

---

## Current Next.js Implementation

Dynamic route for Sanity-powered insights/article pages. Same block-builder pattern as `/[page]` — uses `Blocks.js` with the same 10 block types. `getStaticPaths` enumerates all `insight` type documents; `getStaticProps` fetches full body content.

Shares the same HIGH RISK as `/[page]`: block-builder with dynamic component map.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `Blocks` | React → mixed | Same block-builder as `/[page]`; reuse ported block components |

---

## Islands (Interactive Components)

Identical to [page-dynamic-page](page-dynamic-page.md). Reuse the same island components ported for `/[page]`.

---

## Styling Notes

Same global CSS and block component styles as `/[page]`. No additional CSS expected.

---

## Third-Party Scripts

Same as `/[page]` — depends on block content.

---

## Sanity / Data

```js
// getStaticPaths
const insights = await sanityClient.fetch(`*[_type == "insight"]{ "slug": slug.current }`);

// getStaticProps
const insight = await sanityClient.fetch(
  `*[_type == "insight" && slug.current == $slug][0]{
    title, body, publishedAt, author, seo, ...
  }`,
  { slug }
);
```

---

## Astro Target Design

```
astro/src/pages/insights/[page].astro
```

Identical structure to `[page].astro` — import same block components. Only difference is Sanity type filter (`_type == "insight"`) and URL namespace.

```astro
---
export async function getStaticPaths() {
  const docs = await sanityClient.fetch(`*[_type == "insight"]{ "slug": slug.current }`);
  return docs.map(d => ({ params: { page: d.slug } }));
}
---
```

---

## Parity Checklist

- [ ] Route accessible at `/insights/[page]` for all insight slugs
- [ ] All block types render correctly (shared with `/[page]` blocks)
- [ ] Article metadata (author, date) renders
- [ ] SEO head matches
- [ ] Screenshot diff < 2%
- [ ] e2e tests pass
- [ ] Lighthouse >= baseline

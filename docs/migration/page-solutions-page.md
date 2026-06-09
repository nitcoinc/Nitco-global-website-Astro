# Migration: /solutions/[page]

**Status:** done  
**Source:** `pages/solutions/[page].js`  
**Complexity:** med  
**Dependencies:** [base-layout](_foundation-base-layout.md), [sanity-client-lib](_foundation-sanity-client-lib.md), [image-helper](_foundation-image-helper.md), [seo-head](_foundation-seo-head.md)

---

## Current Next.js Implementation

Dynamic route for solution pages. Fetches solution data from Sanity by slug. Renders via `SolutionPage` component which displays solution details: hero, features, benefits, case studies, CTAs. Primarily static/presentational.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `SolutionPage` | React → Astro | Solution detail layout; likely static sections |

---

## Islands (Interactive Components)

No interactive islands expected unless `SolutionPage` contains a contact/demo request form. Audit `SolutionPage` source during implementation.

Potential island:
| Component | Directive | Reason |
|---|---|---|
| Demo request form (if present) | `client:visible` | Form submission |

---

## Styling Notes

`SolutionPage` CSS — likely global classes + possible CSS Module. Copy alongside component.

---

## Third-Party Scripts

None identified. If demo form is HubSpot, see [page-whitepapers-slug](page-whitepapers-slug.md) pattern.

---

## Sanity / Data

```js
// getStaticPaths
const solutions = await sanityClient.fetch(`*[_type == "solution"]{ "slug": slug.current }`);

// getStaticProps
const solution = await sanityClient.fetch(
  `*[_type == "solution" && slug.current == $slug][0]{
    title, hero, features, benefits, caseStudies[]->{title, slug}, seo
  }`,
  { slug }
);
```

---

## Astro Target Design

```
astro/src/pages/solutions/[page].astro
```

```astro
---
export async function getStaticPaths() {
  const docs = await sanityClient.fetch(`*[_type == "solution"]{ "slug": slug.current }`);
  return docs.map(d => ({ params: { page: d.slug } }));
}
const { page } = Astro.params;
const solution = await sanityClient.fetch(solutionQuery, { slug: page });
---
<BaseLayout>
  <SeoHead slot="head" {...solution.seo} />
  <!-- Static SolutionPage sections as Astro markup -->
</BaseLayout>
```

---

## Parity Checklist

- [ ] Route accessible at `/solutions/[page]` for all slugs
- [ ] Hero, features, benefits, case studies sections render
- [ ] CTA links navigate correctly
- [ ] Any interactive forms work
- [ ] SEO head matches
- [ ] Screenshot diff < 2%
- [ ] e2e tests pass
- [ ] Lighthouse >= baseline

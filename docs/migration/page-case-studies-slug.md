# Migration: /case-studies/[slug]

**Status:** done  
**Source:** `pages/case-studies/[slug].js`  
**Complexity:** med  
**Dependencies:** [base-layout](_foundation-base-layout.md), [sanity-client-lib](_foundation-sanity-client-lib.md), [image-helper](_foundation-image-helper.md), [seo-head](_foundation-seo-head.md)

---

## Current Next.js Implementation

Individual case study page. Fetches single case study by slug from Sanity. Renders via `AllPost` component (shared pattern with blog/webinar/whitepapers). No form component on this page — simpler than blog/whitepapers.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `AllPost` | React → Astro | Shared post-layout component; static content render |

---

## Islands (Interactive Components)

No interactive islands expected on this page. Fully static after migration.

---

## Styling Notes

Same `AllPost` styles as blog. No additional page-specific CSS expected.

---

## Third-Party Scripts

None identified for this route.

---

## Sanity / Data

```js
// getStaticPaths
const studies = await sanityClient.fetch(`*[_type == "caseStudy"]{ "slug": slug.current }`);

// getStaticProps
const study = await sanityClient.fetch(
  `*[_type == "caseStudy" && slug.current == $slug][0]{
    title, body, client, industry, results, mainImage, seo
  }`,
  { slug }
);
```

---

## Astro Target Design

```
astro/src/pages/case-studies/[slug].astro
```

```astro
---
export async function getStaticPaths() {
  const docs = await sanityClient.fetch(`*[_type == "caseStudy"]{ "slug": slug.current }`);
  return docs.map(d => ({ params: { slug: d.slug } }));
}
const { slug } = Astro.params;
const study = await sanityClient.fetch(studyQuery, { slug });
---
<BaseLayout>
  <SeoHead slot="head" {...study.seo} />
  <!-- Static AllPost-style layout: title, metadata, body -->
</BaseLayout>
```

`AllPost` → inline static Astro markup (no island needed).

---

## Parity Checklist

- [ ] Route accessible at `/case-studies/[slug]` for all slugs
- [ ] Title, client, industry, results fields render
- [ ] Body content renders
- [ ] Featured image renders via urlFor
- [ ] SEO head matches
- [ ] Screenshot diff < 2%
- [ ] e2e tests pass
- [ ] Lighthouse >= baseline

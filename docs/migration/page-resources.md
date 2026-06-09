# Migration: /resources

**Status:** in-progress  
**Source:** `pages/resources.js`  
**Complexity:** med  
**Dependencies:** [base-layout](_foundation-base-layout.md), [sanity-client-lib](_foundation-sanity-client-lib.md), [image-helper](_foundation-image-helper.md), [seo-head](_foundation-seo-head.md)

---

## Current Next.js Implementation

Resources listing page. Fetches all resources (blogs, case studies, webinars, whitepapers) from Sanity. Renders `Resources` component which provides client-side filtering by resource type and pagination. Filter/pagination state managed with `useState`.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `Resources` | React island | Client-side filters + pagination via `useState` |

---

## Islands (Interactive Components)

| Component | Directive | Reason |
|---|---|---|
| `Resources` | `client:load` | Filter and pagination state needed on first interaction |

Alternative approach (better performance): render all resources as static HTML, implement filter/pagination with `client:load` only for the filter controls. Pass all data as props to island. This avoids shipping all items to client via JS bundle if server renders the HTML — Astro SSG means HTML is already in the file.

---

## Styling Notes

`Resources` component CSS — copy alongside island. Pagination and filter UI styles.

---

## Third-Party Scripts

None identified.

---

## Sanity / Data

```js
export async function getStaticProps() {
  const resources = await sanityClient.fetch(`
    {
      "blogs": *[_type == "post"] | order(publishedAt desc) { title, slug, mainImage, publishedAt },
      "caseStudies": *[_type == "caseStudy"] | order(_createdAt desc) { title, slug, mainImage },
      "webinars": *[_type == "webinar"] | order(date desc) { title, slug, thumbnail, date },
      "whitepapers": *[_type == "whitepaper"] | order(_createdAt desc) { title, slug, thumbnail }
    }
  `);
  return { props: { resources } };
}
```

All data fetched at build time and passed to client island. No runtime Sanity calls.

---

## Astro Target Design

```
astro/src/pages/resources.astro
```

```astro
---
const resources = await sanityClient.fetch(resourcesQuery);
---
<BaseLayout>
  <SeoHead slot="head" {...seo} />
  <Resources client:load resources={resources} />
</BaseLayout>
```

`Resources` island receives all data as props — filtering/pagination happens client-side in React state with zero additional network requests.

---

## Parity Checklist

- [ ] Route accessible at `/resources`
- [ ] All resource types display (blogs, case studies, webinars, whitepapers)
- [ ] Filter by type works correctly
- [ ] Pagination works (next/prev or load-more)
- [ ] Resource cards link to correct routes
- [ ] SEO head matches
- [ ] Screenshot diff < 2%
- [ ] e2e tests pass (filter, pagination)
- [ ] Lighthouse >= baseline

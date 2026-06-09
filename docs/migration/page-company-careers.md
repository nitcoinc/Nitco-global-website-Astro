# Migration: /company/careers

**Status:** done  
**Source:** `pages/company/careers.js`  
**Complexity:** low  
**Dependencies:** [base-layout](_foundation-base-layout.md), [sanity-client-lib](_foundation-sanity-client-lib.md), [image-helper](_foundation-image-helper.md), [seo-head](_foundation-seo-head.md)

---

## Current Next.js Implementation

Careers page. Fetches open positions and careers page content from Sanity. Renders `CareersPage` component. Primarily static — job listings, culture section, benefits. May have a simple filter for job categories.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `CareersPage` | React → Astro | Job listings + culture content; mostly static |

---

## Islands (Interactive Components)

No interactive islands expected unless `CareersPage` has a category filter with `useState`. Audit source during implementation.

Potential island (if filter present):
| Component | Directive | Reason |
|---|---|---|
| Job category filter | `client:load` | Filter state |

---

## Styling Notes

`CareersPage` CSS — copy alongside. Job listing card styles, department filter styles.

---

## Third-Party Scripts

None identified. Job applications likely link to external ATS (Workday, Greenhouse, etc.) — external links, no embedded scripts.

---

## Sanity / Data

```js
export async function getStaticProps() {
  const careers = await sanityClient.fetch(`*[_type == "careersPage"][0]{
    hero, culture, benefits, openPositions[]->{
      title, department, location, type, slug
    }, seo
  }`);
  return { props: { careers } };
}
```

---

## Astro Target Design

```
astro/src/pages/company/careers.astro
```

```astro
---
const careers = await sanityClient.fetch(careersQuery);
const seo = await fetchSeoData('careers');
---
<BaseLayout>
  <SeoHead slot="head" {...seo} />
  <!-- Static: hero, culture, benefits -->
  <!-- Job listings: if no filter needed → static Astro loop -->
  {careers.openPositions.map(job => (
    <JobCard job={job} />
  ))}
</BaseLayout>
```

If category filter needed: wrap job listings in a `JobFilter` island that accepts all positions as props.

---

## Parity Checklist

- [ ] Route accessible at `/company/careers`
- [ ] Hero, culture, benefits sections render
- [ ] All open positions listed
- [ ] Job category filter works (if present)
- [ ] Job links (to detail/ATS) work
- [ ] SEO head matches
- [ ] Screenshot diff < 2%
- [ ] e2e tests pass
- [ ] Lighthouse >= baseline

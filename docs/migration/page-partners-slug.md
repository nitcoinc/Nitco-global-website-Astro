# Migration: /partners/[slug]

**Status:** done  
**Source:** `pages/partners/[slug].js`  
**Complexity:** med  
**Dependencies:** [base-layout](_foundation-base-layout.md), [sanity-client-lib](_foundation-sanity-client-lib.md), [image-helper](_foundation-image-helper.md), [seo-head](_foundation-seo-head.md)

---

## Current Next.js Implementation

Individual partner page. Fetches partner data from Sanity. Renders via `PartnerPage` component. `PartnerPage` uses `useState` for a tabs UI (likely: Overview / Solutions / Resources tabs or similar). Tab switching is client-side state — requires React island.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `PartnerPage` | React island | `useState` tabs — must be island |

---

## Islands (Interactive Components)

| Component | Directive | Reason |
|---|---|---|
| `PartnerPage` | `client:load` | Tabs need immediate interaction; visible above fold |

Alternative: decompose `PartnerPage` — render static tab content as Astro, only the tab-switcher logic as a small island. More optimal but higher effort. Defer decomposition to post-parity if needed.

---

## Styling Notes

`PartnerPage` CSS — copy CSS Module or global classes alongside island file.

---

## Third-Party Scripts

None identified.

---

## Sanity / Data

```js
// getStaticPaths
const partners = await sanityClient.fetch(`*[_type == "partner"]{ "slug": slug.current }`);

// getStaticProps
const partner = await sanityClient.fetch(
  `*[_type == "partner" && slug.current == $slug][0]{
    name, logo, description, overview, solutions, resources, seo
  }`,
  { slug }
);
```

All tab content fetched at build time and passed to island as props — no client-side Sanity calls.

---

## Astro Target Design

```
astro/src/pages/partners/[slug].astro
```

```astro
---
export async function getStaticPaths() {
  const docs = await sanityClient.fetch(`*[_type == "partner"]{ "slug": slug.current }`);
  return docs.map(d => ({ params: { slug: d.slug } }));
}
const { slug } = Astro.params;
const partner = await sanityClient.fetch(partnerQuery, { slug });
---
<BaseLayout>
  <SeoHead slot="head" {...partner.seo} />
  <!-- Static header: partner logo, name, description -->
  <PartnerPage client:load partnerData={partner} />
</BaseLayout>
```

---

## Parity Checklist

- [ ] Route accessible at `/partners/[slug]` for all slugs
- [ ] Partner logo, name, description render in static HTML
- [ ] Tab switching works (Overview / Solutions / Resources or equivalent)
- [ ] Tab content renders correctly for each tab
- [ ] SEO head matches
- [ ] Screenshot diff < 2%
- [ ] e2e tests pass (tab interaction)
- [ ] Lighthouse >= baseline

# Migration: /company/about

**Status:** in-progress  
**Source:** `pages/company/about.js`  
**Complexity:** low  
**Dependencies:** [base-layout](_foundation-base-layout.md), [sanity-client-lib](_foundation-sanity-client-lib.md), [image-helper](_foundation-image-helper.md), [seo-head](_foundation-seo-head.md)

---

## Current Next.js Implementation

About page. Fetches about page content from Sanity. Renders `AboutUs` component which includes animated CountUp numbers (team size, clients, years, etc.) using `IntersectionObserver`. CountUp triggers when stats section scrolls into viewport.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `AboutUs` | React island | CountUp + IntersectionObserver |

---

## Islands (Interactive Components)

| Component | Directive | Reason |
|---|---|---|
| `AboutUs` | `client:visible` | CountUp triggered by IntersectionObserver; deferred until in viewport |

Only the stats/counter section needs to be an island. Static sections (mission, team photos, history) can be inline Astro markup.

---

## Styling Notes

`AboutUs` CSS — copy CSS Module or global classes. Counter section likely has minimal specific styles.

---

## Third-Party Scripts

None identified.

---

## Sanity / Data

```js
export async function getStaticProps() {
  const about = await sanityClient.fetch(`*[_type == "aboutPage"][0]{
    hero, mission, values, stats, teamMembers[]->{name, role, photo}, seo
  }`);
  return { props: { about } };
}
```

Stats array: `[{ label: 'Clients', value: 200 }, { label: 'Years', value: 15 }, ...]`

---

## Astro Target Design

```
astro/src/pages/company/about.astro
```

```astro
---
const about = await sanityClient.fetch(aboutQuery);
const seo = await fetchSeoData('about');
---
<BaseLayout>
  <SeoHead slot="head" {...seo} />
  <!-- Static: hero, mission, values, team grid -->
  <AboutUs client:visible stats={about.stats} />
  <!-- Static: footer CTA section -->
</BaseLayout>
```

Decompose `AboutUs` — render static prose sections inline, only the stats counter block as island.

---

## Parity Checklist

- [ ] Route accessible at `/company/about`
- [ ] Hero, mission, values sections render in static HTML
- [ ] Team member photos and names render
- [ ] CountUp animation fires when stats section scrolls into view
- [ ] Final counter numbers match Sanity data
- [ ] SEO head matches
- [ ] Screenshot diff < 2%
- [ ] e2e tests pass
- [ ] Lighthouse >= baseline

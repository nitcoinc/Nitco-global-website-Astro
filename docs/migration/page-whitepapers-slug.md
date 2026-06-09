# Migration: /whitepapers/[slug]

**Status:** done  
**Source:** `pages/whitepapers/[slug].js`  
**Complexity:** high  
**Dependencies:** [base-layout](_foundation-base-layout.md), [sanity-client-lib](_foundation-sanity-client-lib.md), [image-helper](_foundation-image-helper.md), [seo-head](_foundation-seo-head.md)

---

## Current Next.js Implementation

Whitepaper gating page. Fetches whitepaper metadata from Sanity. Renders `HubSpotWhitepapersForm` — a HubSpot form that gates access to the whitepaper PDF download. User fills form → HubSpot webhook fires → download link revealed or emailed.

**HIGH RISK:** `HubSpotWhitepapersForm` dynamically injects HubSpot embed script and relies on HubSpot's JS callback (`onFormSubmit`) to gate the download. Cannot SSR. Depends on HubSpot portal ID + form ID from env or Sanity data.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `HubSpotWhitepapersForm` | React island | HIGH RISK — HubSpot script injection, gated download |
| `AllPost` (page wrapper) | React → Astro | Title, thumbnail, description — static |

---

## Islands (Interactive Components)

| Component | Directive | Reason |
|---|---|---|
| `HubSpotWhitepapersForm` | `client:only="react"` | HubSpot script cannot run during SSR; `window.hbspt` must exist |

---

## Styling Notes

HubSpot form renders with HubSpot's own CSS. May have local overrides in `HubSpotWhitepapersForm.module.css` — carry over.

---

## Third-Party Scripts

**HubSpot Forms JS** (`//js.hsforms.net/forms/v2.js`) — injected dynamically in `useEffect`:
```js
useEffect(() => {
  const script = document.createElement('script');
  script.src = '//js.hsforms.net/forms/v2.js';
  script.onload = () => {
    window.hbspt.forms.create({
      portalId: '...',
      formId: '...',
      target: '#hubspot-form',
      onFormSubmit: () => { /* reveal download */ }
    });
  };
  document.body.appendChild(script);
}, []);
```

Keep this pattern inside `client:only="react"` island. Do NOT attempt to SSR.

---

## Sanity / Data

```js
// getStaticPaths
const papers = await sanityClient.fetch(`*[_type == "whitepaper"]{ "slug": slug.current }`);

// getStaticProps
const paper = await sanityClient.fetch(
  `*[_type == "whitepaper" && slug.current == $slug][0]{
    title, description, thumbnail, hubspotFormId, downloadUrl, seo
  }`,
  { slug }
);
```

`hubspotFormId` may be stored in Sanity per whitepaper.

---

## Astro Target Design

```
astro/src/pages/whitepapers/[slug].astro
```

```astro
---
export async function getStaticPaths() {
  const docs = await sanityClient.fetch(`*[_type == "whitepaper"]{ "slug": slug.current }`);
  return docs.map(d => ({ params: { slug: d.slug } }));
}
const { slug } = Astro.params;
const paper = await sanityClient.fetch(paperQuery, { slug });
---
<BaseLayout>
  <SeoHead slot="head" {...paper.seo} />
  <!-- Static: title, description, thumbnail -->
  <HubSpotWhitepapersForm
    client:only="react"
    formId={paper.hubspotFormId}
    downloadUrl={paper.downloadUrl}
  />
</BaseLayout>
```

---

## Parity Checklist

- [ ] Route accessible at `/whitepapers/[slug]` for all slugs
- [ ] Static content (title, description, thumbnail) renders in HTML source (no JS needed)
- [ ] HubSpot form renders after hydration
- [ ] Form submission triggers gated download / confirmation
- [ ] `onFormSubmit` callback works correctly
- [ ] SEO head matches
- [ ] Screenshot diff < 2% (pre-hydration static content)
- [ ] e2e test: fill form → download available
- [ ] Lighthouse >= baseline

# Migration: /contact

**Status:** in-progress  
**Source:** `pages/contact.js`  
**Complexity:** med  
**Dependencies:** [base-layout](_foundation-base-layout.md), [seo-head](_foundation-seo-head.md), [sanity-client-lib](_foundation-sanity-client-lib.md)

---

## Current Next.js Implementation

Contact page with `ContactForm` component. Form submits to HubSpot API via `fetch` (not an embed — direct API call). May also use reCAPTCHA v3 for spam prevention. `react-google-recaptcha-v3` is in deps but listed as dead dep — confirm during implementation whether it's actually used here.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `ContactForm` | React island | HubSpot fetch + reCAPTCHA (possibly dead) |

---

## Islands (Interactive Components)

| Component | Directive | Reason |
|---|---|---|
| `ContactForm` | `client:load` | Form above fold; user expects immediate interaction |

---

## Styling Notes

`ContactForm` CSS — copy CSS Module or global form styles. Form layout classes from Bootstrap grid.

---

## Third-Party Scripts

- **HubSpot Forms API** — direct `fetch` to `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formId}` — no embed script needed, just a `fetch` call in form `onSubmit`
- **reCAPTCHA v3** — if actually used: `react-google-recaptcha-v3` injects `https://www.google.com/recaptcha/api.js` — confirm usage. If dead, remove import.

---

## Sanity / Data

Contact page may have minimal Sanity data (office addresses, contact info). Likely:
```js
export async function getStaticProps() {
  const contactInfo = await sanityClient.fetch(`*[_type == "contactPage"][0]{ address, phone, email }`);
  const seo = await fetchSeoData('contact');
  return { props: { contactInfo, seo } };
}
```

Form submission goes to HubSpot API — no Sanity involvement.

---

## Astro Target Design

```
astro/src/pages/contact.astro
```

```astro
---
const contactInfo = await sanityClient.fetch(contactQuery);
const seo = await fetchSeoData('contact');
---
<BaseLayout>
  <SeoHead slot="head" {...seo} />
  <!-- Static contact info: address, phone, email, map embed -->
  <ContactForm client:load />
</BaseLayout>
```

`ContactForm` island:
- Self-contained React component
- `fetch` to HubSpot API in `onSubmit`
- No server-side proxy needed (HubSpot API is CORS-safe from browser)
- If reCAPTCHA confirmed dead: remove import

---

## Conversion Notes (2026-06-04)

- `astro/src/islands/ContactForm.jsx` — direct port of `components/Contact/ContactForm.js`. No Next.js-specific imports used in source; no changes needed beyond CSS module path.
- `astro/src/islands/contactForm.module.css` — copied verbatim from `components/Contact/contactForm.module.css`.
- `astro/src/pages/contact.astro` — uses `BaseLayout` + `getSeoForPath('/contact')` + `<ContactForm client:only="react" />`.
- `react-google-recaptcha` v2 widget confirmed active (sitekey `6Lew4yoqAAAAALwuAWLLde2vNnO6TVqLcD15sbYP`, dark theme). Package already in astro deps.
- HubSpot direct fetch to `api.hsforms.com` — no server proxy needed.
- Build: exit 0. Only pre-existing CSS nesting warnings in unrelated global styles.

## Parity Checklist

- [ ] Route accessible at `/contact`
- [ ] Contact info (address, phone, email) renders in static HTML
- [ ] Form renders after hydration
- [ ] Form validation works (required fields)
- [ ] Form submission sends to HubSpot and shows success message
- [ ] reCAPTCHA confirmed dead or working (update this doc after audit)
- [ ] SEO head matches
- [ ] Screenshot diff < 2%
- [ ] e2e test: fill form → submit → success state
- [ ] Lighthouse >= baseline

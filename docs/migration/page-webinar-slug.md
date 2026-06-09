# Migration: /webinar/[slug]

**Status:** done  
**Source:** `pages/webinar/[slug].js`  
**Complexity:** med  
**Dependencies:** [base-layout](_foundation-base-layout.md), [sanity-client-lib](_foundation-sanity-client-lib.md), [image-helper](_foundation-image-helper.md), [seo-head](_foundation-seo-head.md)

---

## Current Next.js Implementation

Individual webinar page. Fetches single webinar by slug from Sanity. Renders via `AllPost` component. May include an embedded video player (Vimeo or YouTube) for the webinar recording. May include a registration form.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `AllPost` | React → Astro/island | Shared layout; if video embed present → island needed |

---

## Islands (Interactive Components)

| Component | Directive | Reason |
|---|---|---|
| Video player (if present) | `client:visible` | Vimeo/YouTube iframe or JS player needs hydration |
| Registration form (if present) | `client:visible` | Form submission logic |

*Confirm presence of video embed and registration form during implementation by reading source file.*

---

## Styling Notes

Shared `AllPost` styles. No additional page-specific CSS expected beyond video embed sizing.

---

## Third-Party Scripts

- Vimeo Player API (if webinar uses Vimeo) — load in island via `useEffect`
- YouTube IFrame API (if webinar uses YouTube) — same pattern

---

## Sanity / Data

```js
// getStaticPaths
const webinars = await sanityClient.fetch(`*[_type == "webinar"]{ "slug": slug.current }`);

// getStaticProps
const webinar = await sanityClient.fetch(
  `*[_type == "webinar" && slug.current == $slug][0]{
    title, description, videoUrl, date, speakers, body, seo
  }`,
  { slug }
);
```

---

## Astro Target Design

```
astro/src/pages/webinar/[slug].astro
```

```astro
---
export async function getStaticPaths() {
  const docs = await sanityClient.fetch(`*[_type == "webinar"]{ "slug": slug.current }`);
  return docs.map(d => ({ params: { slug: d.slug } }));
}
const { slug } = Astro.params;
const webinar = await sanityClient.fetch(webinarQuery, { slug });
---
<BaseLayout>
  <SeoHead slot="head" {...webinar.seo} />
  <!-- Static: title, date, speakers, description -->
  {webinar.videoUrl && <VideoEmbed client:visible url={webinar.videoUrl} />}
  <!-- Body content static -->
</BaseLayout>
```

---

## Parity Checklist

- [ ] Route accessible at `/webinar/[slug]` for all slugs
- [ ] Title, date, speakers render
- [ ] Video player loads and plays (if present)
- [ ] Registration/CTA form works (if present)
- [ ] Body content renders
- [ ] SEO head matches
- [ ] Screenshot diff < 2%
- [ ] e2e tests pass
- [ ] Lighthouse >= baseline

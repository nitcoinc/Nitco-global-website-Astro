# Migration: /blog/[slug]

**Status:** done  
**Source:** `pages/blog/[slug].js`  
**Complexity:** med  
**Dependencies:** [base-layout](_foundation-base-layout.md), [sanity-client-lib](_foundation-sanity-client-lib.md), [image-helper](_foundation-image-helper.md), [seo-head](_foundation-seo-head.md)

---

## Current Next.js Implementation

Individual blog post page. Fetches single post by slug from Sanity. Renders post content via `AllPost` component (shared with case-studies, webinar, whitepapers). Includes `InsightsSubscribeForm` for email subscription.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `AllPost` | React → Astro | Renders post header, body, related posts; likely mostly static |
| `InsightsSubscribeForm` | React island | Form submission — needs `client:visible` or `client:load` |

---

## Islands (Interactive Components)

| Component | Directive | Reason |
|---|---|---|
| `InsightsSubscribeForm` | `client:visible` | Below-fold form; email submission with fetch call |

---

## Styling Notes

`AllPost` component likely uses CSS Modules (`AllPost.module.css`) or global post-layout classes. Copy CSS alongside component.

---

## Third-Party Scripts

`InsightsSubscribeForm` may submit to HubSpot API or a custom endpoint. Confirm during implementation — if HubSpot embed, upgrade to `client:only="react"`.

---

## Sanity / Data

```js
// getStaticPaths
const posts = await sanityClient.fetch(`*[_type == "post"]{ "slug": slug.current }`);

// getStaticProps
const post = await sanityClient.fetch(
  `*[_type == "post" && slug.current == $slug][0]{
    title, body, publishedAt, author->{name, image}, mainImage, categories, seo
  }`,
  { slug }
);
```

Body is likely Portable Text — render with `@portabletext/react` or convert to static Astro.

---

## Astro Target Design

```
astro/src/pages/blog/[slug].astro
```

```astro
---
export async function getStaticPaths() {
  const posts = await sanityClient.fetch(`*[_type == "post"]{ "slug": slug.current }`);
  return posts.map(p => ({ params: { slug: p.slug } }));
}
const { slug } = Astro.params;
const post = await sanityClient.fetch(postQuery, { slug });
---
<BaseLayout>
  <SeoHead slot="head" {...post.seo} />
  <!-- Static post header: title, author, date, image -->
  <!-- Portable text body as static markup -->
  <InsightsSubscribeForm client:visible />
</BaseLayout>
```

---

## Parity Checklist

- [ ] Route accessible at `/blog/[slug]` for all post slugs
- [ ] Post title, author, date, featured image render
- [ ] Body content renders (text, images, embeds)
- [ ] Subscribe form submits successfully
- [ ] SEO head matches
- [ ] Screenshot diff < 2%
- [ ] e2e tests pass
- [ ] Lighthouse >= baseline

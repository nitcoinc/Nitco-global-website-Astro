# Foundation: image-helper

**Status:** done  
**Source files:** `lib/sanityImage.js`  
**Used by:** [page-index](page-index.md), [page-dynamic-page](page-dynamic-page.md), [page-blog-slug](page-blog-slug.md), [page-case-studies-slug](page-case-studies-slug.md), [page-solutions-page](page-solutions-page.md), [page-partners-slug](page-partners-slug.md), and most other pages that render Sanity image fields

---

## Current Implementation

`lib/sanityImage.js` exports `urlFor(source)` using `@sanity/image-url`:

```js
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './sanity';

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source) {
  return builder.image(source);
}
```

Usage pattern throughout components:
```jsx
<img src={urlFor(image).width(800).url()} alt={...} />
```

---

## Port Strategy

1. Port `urlFor` to `astro/src/lib/sanityImage.js` — identical logic, uses ported `sanityClient`
2. In `astro.config.mjs` add `image.remotePatterns` for Sanity CDN:
   ```js
   image: {
     remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }]
   }
   ```
3. **Do NOT** convert `<img>` to Astro `<Image>` during parity phase — deferred to backlog
4. `urlFor().url()` string output drops in as `src` on plain `<img>` tags unchanged

---

## Astro Target

```js
// astro/src/lib/sanityImage.js
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './sanity.js';

const builder = imageUrlBuilder(sanityClient);

/** @param {import('@sanity/image-url/lib/types/types').SanityImageSource} source */
export function urlFor(source) {
  return builder.image(source);
}
```

`astro.config.mjs` addition:
```js
image: {
  remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
}
```

---

## Parity Checklist

- [ ] `urlFor(img).width(N).url()` returns same URL format as Next.js build
- [ ] `cdn.sanity.io` in Astro remote patterns (no broken image warnings)
- [ ] No `<Image>` component imports introduced during parity phase
- [ ] All pages render Sanity images without 404s

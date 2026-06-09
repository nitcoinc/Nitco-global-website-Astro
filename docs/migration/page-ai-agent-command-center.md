# Migration: /ai-agent-command-center

**Status:** in-progress  
**Source:** `pages/ai-agent-command-center.js`  
**Complexity:** med  
**Dependencies:** [base-layout](_foundation-base-layout.md), [sanity-client-lib](_foundation-sanity-client-lib.md), [image-helper](_foundation-image-helper.md), [seo-head](_foundation-seo-head.md)

---

## Current Next.js Implementation

AI Agent Command Center feature page. Renders `AICommandCenter` component which has tabs (product feature tabs or demo tabs) and an embedded Vimeo video player. Tab state managed with `useState`. Vimeo player may use the Vimeo Player SDK.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `AICommandCenter` | React island | Tabs (`useState`) + Vimeo embed |

---

## Islands (Interactive Components)

| Component | Directive | Reason |
|---|---|---|
| `AICommandCenter` | `client:load` | Tabs visible above fold; Vimeo embed needs DOM |

Alternative: decompose into static Astro sections + `Tabs` island + `VimeoPlayer` island. More optimal but higher effort — defer if parity phase prioritizes speed.

---

## Styling Notes

`AICommandCenter` CSS — tab navigation styles, video container aspect ratio styles. Copy CSS Module alongside island.

---

## Third-Party Scripts

- **Vimeo Player SDK** (`https://player.vimeo.com/api/player.js`) — if using `@vimeo/player` npm package, add to `astro/package.json`. If loading via CDN script tag in `useEffect`, preserve that pattern.

---

## Sanity / Data

```js
export async function getStaticProps() {
  const page = await sanityClient.fetch(`*[_type == "aiCommandCenter"][0]{
    hero, tabs[]{
      label,
      content,
      videoUrl
    },
    seo
  }`);
  return { props: { page } };
}
```

All tab content and video URLs fetched at build time, passed as props to island — no client-side Sanity calls.

---

## Astro Target Design

```
astro/src/pages/ai-agent-command-center.astro
```

```astro
---
const page = await sanityClient.fetch(aiCommandCenterQuery);
const seo = await fetchSeoData('ai-agent-command-center');
---
<BaseLayout>
  <SeoHead slot="head" {...seo} />
  <!-- Static: page hero/intro -->
  <AICommandCenter client:load tabs={page.tabs} />
  <!-- Static: bottom CTA, supporting content -->
</BaseLayout>
```

---

## Parity Checklist

- [ ] Route accessible at `/ai-agent-command-center`
- [ ] Hero/intro content renders in static HTML
- [ ] Tabs render and switch correctly
- [ ] Active tab content displays
- [ ] Vimeo video loads and plays in active tab
- [ ] Video does not autoplay on page load (confirm current behavior)
- [ ] SEO head matches
- [ ] Screenshot diff < 2%
- [ ] e2e tests pass (tab switching, video present)
- [ ] Lighthouse >= baseline

# Migration: /

**Status:** pending  
**Source:** `pages/index.js`  
**Complexity:** high  
**Dependencies:** [base-layout](_foundation-base-layout.md), [sanity-client-lib](_foundation-sanity-client-lib.md), [image-helper](_foundation-image-helper.md), [seo-head](_foundation-seo-head.md), [global-styles-and-scripts](_foundation-global-styles-and-scripts.md)

---

## Current Next.js Implementation

Home page. Fetches SEO data and homepage content from Sanity via `getStaticProps`. Renders full-page sections through `HomePage` component. Includes `LazyChatbot` (Kore.ai) loaded lazily after mount. `AboutUs` section uses `CountUp` with `IntersectionObserver` for animated number counters.

---

## Components Used

| Component | Type | Notes |
|---|---|---|
| `Navbar` | React island | Handled by BaseLayout |
| `HomePage` | React → Astro | Top-level section orchestrator; likely pure presentational after refactor |
| `AboutUs` | React island | CountUp + IntersectionObserver — needs `client:visible` |
| `LazyChatbot` | React island | Kore.ai script injection — HIGH RISK |
| `Footer` | Static Astro | Handled by BaseLayout |
| `FooterDesignMobile` | Static Astro | Handled by BaseLayout |

---

## Islands (Interactive Components)

| Component | Directive | Reason |
|---|---|---|
| `Navbar` | `client:load` | Scroll + menu state; above fold |
| `AboutUs` | `client:visible` | CountUp triggers when section scrolls into view |
| `LazyChatbot` | `client:only="react"` | Kore.ai script cannot SSR; DOM injection after mount |
| `GoTop` | `client:idle` | Scroll state; non-critical |

---

## Styling Notes

- `styles/style.css` and `styles/responsive.css` applied globally via BaseLayout
- `HomePage` sub-sections likely use CSS classes from global CSS (no CSS Modules expected at page level)
- Bootstrap grid used for layout sections

---

## Third-Party Scripts

- **Kore.ai chatbot** — loaded via `LazyChatbot.js` dynamic script injection (HIGH RISK)
  - Script URL typically `https://bots.kore.ai/...`
  - Uses `window.addEventListener('load', ...)` or `useEffect` to inject `<script>` tag
  - Must be isolated in `client:only="react"` island

---

## Sanity / Data

`getStaticProps` pattern:
```js
export async function getStaticProps() {
  const homepageData = await sanityClient.fetch(`*[_type == "homepage"][0]{ ... }`);
  const seo = await fetchSeoData('home');
  return { props: { homepageData, seo } };
}
```

Data shape: homepage sections array (hero, features, about, stats, testimonials, CTA), each section has title/subtitle/body/image fields.

---

## Astro Target Design

```
astro/src/pages/index.astro
```

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SeoHead from '../components/SeoHead.astro';
import { sanityClient } from '../lib/sanity.js';
import { fetchSeoData } from '../lib/fetchSeoData.js';
import AboutUs from '../components/islands/AboutUs.jsx';
import LazyChatbot from '../components/islands/LazyChatbot.jsx';

const homepageData = await sanityClient.fetch(`*[_type == "homepage"][0]{ ... }`);
const seo = await fetchSeoData('home');
---
<BaseLayout>
  <SeoHead slot="head" {...seo} />
  <!-- static hero/features sections as inline Astro markup -->
  <AboutUs client:visible stats={homepageData.stats} />
  <LazyChatbot client:only="react" />
</BaseLayout>
```

`HomePage` component: decompose into static Astro markup sections. Only `AboutUs` (CountUp) and `LazyChatbot` remain as islands.

---

## Parity Checklist

- [ ] Route accessible at `/`
- [ ] All sections render (hero, features, about, testimonials, CTA)
- [ ] CountUp numbers animate on scroll (AboutUs island)
- [ ] Kore.ai chatbot widget appears and is interactive
- [ ] SEO head matches (title, og, json-ld)
- [ ] Screenshot diff < 2%
- [ ] e2e tests pass
- [ ] Lighthouse >= baseline

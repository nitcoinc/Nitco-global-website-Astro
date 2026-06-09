# Foundation: base-layout

**Status:** done  
**Source files:** `components/Layout.js`  
**Used by:** All 14 pages — wraps every route with Navbar + Footer + global scripts

---

## Current Implementation

`components/Layout.js` is a React wrapper component:
- Renders `<Navbar />`, `{children}`, `<Footer />`, `<FooterDesignMobile />`, `<GoTop />`
- Wraps output in a top-level `<div>` or fragment
- Imported and used inside `_app.js` to wrap every page
- May call `AOS.init()` in a `useEffect`

---

## Port Strategy

1. Create `astro/src/layouts/BaseLayout.astro`
2. Import and render static `Navbar.astro`, `Footer.astro`, `FooterDesignMobile.astro` directly
3. Import `GoTop` React island with `client:idle`
4. Import AOS init island or inline `<script is:inline>` for AOS
5. Include all global CSS imports and GTM from `_foundation-global-styles-and-scripts`
6. Expose `<slot />` for page content
7. Expose `<slot name="head" />` for per-page SEO head injection

Dependencies: must complete these foundation units first:
- [sanity-client-lib](_foundation-sanity-client-lib.md)
- [global-styles-and-scripts](_foundation-global-styles-and-scripts.md)
- [navbar-island](_foundation-navbar-island.md)
- [footer](_foundation-footer.md)
- [gotop-island](_foundation-gotop-island.md)
- [seo-head](_foundation-seo-head.md)

---

## Astro Target

```astro
---
// astro/src/layouts/BaseLayout.astro
import '../styles/style.css';
import '../styles/responsive.css';
import Navbar from '../components/islands/Navbar.jsx';
import Footer from '../components/ui/Footer.astro';
import FooterDesignMobile from '../components/ui/FooterDesignMobile.astro';
import GoTop from '../components/islands/GoTop.jsx';

const { title } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <!-- GTM head snippet -->
  <script is:inline>/* GTM */</script>
  <slot name="head" />
</head>
<body>
  <!-- GTM noscript -->
  <noscript><iframe ...></iframe></noscript>
  <Navbar client:load />
  <slot />
  <Footer />
  <FooterDesignMobile />
  <GoTop client:idle />
</body>
</html>
```

---

## Parity Checklist

- [ ] Navbar appears on all pages
- [ ] Footer appears on all pages (desktop + mobile variants)
- [ ] GoTop button appears and scrolls to top
- [ ] AOS animations fire on pages that use them
- [ ] GTM present in page source
- [ ] `<slot name="head" />` receives per-page SEO correctly
- [ ] Screenshot diff < 2% vs Next.js on home page

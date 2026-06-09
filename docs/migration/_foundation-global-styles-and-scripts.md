# Foundation: global-styles-and-scripts

**Status:** done  
**Source files:** `pages/_app.js`, `pages/_document.js`, `styles/style.css`, `styles/responsive.css`  
**Used by:** All 14 pages — loaded globally on every route

---

## Current Implementation

### `_app.js`
- Imports global CSS: `styles/style.css`, `styles/responsive.css`
- Imports Bootstrap CSS (likely from `node_modules/bootstrap/dist/css/bootstrap.min.css`)
- Imports boxicons, flaticon font CSS
- Wraps every page in `<Layout>` component
- May include AOS init call

### `_document.js`
- Extends Next.js `Document`
- Injects GTM `<script>` in `<Head>` (GTM head snippet)
- Injects GTM `<noscript>` iframe in `<body>` (GTM body snippet)
- May inject other global scripts (analytics, etc.)

**HIGH RISK: GTM** — `_document.js` pattern has no direct Astro equivalent. Must be manually moved.

---

## Port Strategy

### Global CSS
1. Copy `styles/style.css` and `styles/responsive.css` to `astro/src/styles/`
2. Import both in `BaseLayout.astro` frontmatter:
   ```astro
   import '../styles/style.css';
   import '../styles/responsive.css';
   ```
3. Bootstrap: add via CDN `<link>` in `BaseLayout.astro` head OR install `bootstrap` and import CSS — match current approach
4. Boxicons/flaticon: copy CDN links from current `_document.js` / `_app.js` into `BaseLayout.astro` head

### GTM (HIGH RISK)
Move GTM head snippet to `BaseLayout.astro` `<head>`:
```astro
<!-- GTM head snippet -->
<script is:inline>
  (function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
```

Move GTM body snippet immediately after `<body>`:
```astro
<body>
  <!-- GTM noscript -->
  <noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
  </noscript>
  <slot />
</body>
```

Use `is:inline` to prevent Astro from hoisting/bundling the GTM snippet.

### AOS (Animate on Scroll)
If AOS is initialized in `_app.js` via `useEffect`:
- Create `astro/src/components/islands/AOSInit.jsx` as `client:load` island
- Or use inline `<script>` with `is:inline` in `BaseLayout.astro`

---

## Astro Target

`BaseLayout.astro` contains all global concerns:
- All CSS imports in frontmatter or `<style is:global>`
- GTM head + body snippets with `is:inline`
- Font/icon CDN links in `<head>`
- AOS init script

---

## Parity Checklist

- [ ] GTM fires on initial page load (verify in browser network tab)
- [ ] GTM fires on client-side navigation (Astro has no built-in view transitions by default — confirm behavior)
- [ ] Bootstrap styles applied correctly (no layout regressions)
- [ ] Boxicons and flaticon render
- [ ] AOS animations trigger on scroll
- [ ] Screenshot diff < 2% on all pages using global styles
- [ ] No `_app.js` or `_document.js` references in `astro/src/`

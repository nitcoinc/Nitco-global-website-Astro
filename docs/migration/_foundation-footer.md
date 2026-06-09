# Foundation: footer

**Status:** done  
**Source files:** `components/Footer/Footer.js`, `components/Footer/FooterDesignMobile.js`  
**Used by:** [base-layout](_foundation-base-layout.md) → all 14 pages

---

## Current Implementation

`components/Footer/Footer.js` — desktop footer:
- Renders footer links, social icons, copyright
- Likely static content (hardcoded or fetched once from Sanity in parent)
- No interactive state — purely presentational

`components/Footer/FooterDesignMobile.js` — mobile footer:
- Separate layout for small screens
- Also purely presentational

Both are React components with no `useState` / `useEffect`. Safe to convert to static `.astro`.

---

## Port Strategy

1. Convert `Footer.js` → `astro/src/components/ui/Footer.astro`
2. Convert `FooterDesignMobile.js` → `astro/src/components/ui/FooterDesignMobile.astro`
3. Replace JSX syntax (`className` → `class`, `{expression}` preserved)
4. If footer fetches data (Sanity footer links), fetch in `BaseLayout.astro` frontmatter and pass as props
5. No client directive needed — fully static

---

## Astro Target

```astro
---
// astro/src/components/ui/Footer.astro
const { footerLinks, socialLinks } = Astro.props;
---
<footer class="footer-area">
  <!-- static markup, no JS -->
</footer>
```

```astro
<!-- In BaseLayout.astro -->
<Footer footerLinks={footerLinks} socialLinks={socialLinks} />
<FooterDesignMobile footerLinks={footerLinks} />
```

---

## Parity Checklist

- [ ] Footer renders on all 14 pages
- [ ] All footer links navigate correctly
- [ ] Social icons render with correct hrefs
- [ ] Mobile footer renders at correct breakpoint
- [ ] No hydration JS shipped for footer (zero JS cost)
- [ ] Screenshot diff < 2% desktop and mobile

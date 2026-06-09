# Foundation: navbar-island

**Status:** done  
**Source files:** `components/Navbar/Navbar.js` (and any sub-components in `components/Navbar/`)  
**Used by:** [base-layout](_foundation-base-layout.md) → all 14 pages

---

## Current Implementation

`components/Navbar/Navbar.js` — React component with:
- `useState` for mobile menu open/close toggle
- `useState` (or `useEffect` + scroll listener) to add sticky/scrolled class on scroll
- Renders logo, nav links, mobile hamburger button
- May fetch nav items from Sanity or use hardcoded links
- CSS Module: likely `Navbar.module.css` or global class names

This component has real interactivity (scroll + click state) — **must be a React island**.

---

## Port Strategy

1. Copy `components/Navbar/Navbar.js` → `astro/src/components/islands/Navbar.jsx`
2. Copy any sub-components (`NavItem.js`, etc.) alongside
3. Copy associated CSS Module file(s)
4. If nav links come from Sanity: fetch at build time in `BaseLayout.astro`, pass as prop to island
5. Directive: `client:load` — Navbar is above fold, needed immediately

If Navbar fetches its own data internally via `useEffect`, refactor to accept `navLinks` prop from `BaseLayout.astro` frontmatter fetch. This avoids client-side GROQ calls.

---

## Astro Target

```astro
<!-- In BaseLayout.astro -->
---
import { sanityClient } from '../lib/sanity.js';
const navLinks = await sanityClient.fetch(`*[_type == "navItem"] | order(order asc)`);
---
<Navbar client:load navLinks={navLinks} />
```

```jsx
// astro/src/components/islands/Navbar.jsx
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ navLinks }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // ... render
}
```

---

## Parity Checklist

- [ ] Navbar renders on all pages (SSR markup present before hydration)
- [ ] Mobile hamburger toggles menu open/close
- [ ] Sticky scroll behavior matches Next.js version
- [ ] Active link state correct on each page
- [ ] All nav links navigate to correct routes
- [ ] Screenshot diff < 2% for desktop and mobile breakpoints
- [ ] No Sanity fetches from client side (data passed as prop)

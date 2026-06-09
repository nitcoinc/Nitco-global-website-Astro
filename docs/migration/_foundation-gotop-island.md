# Foundation: gotop-island

**Status:** done  
**Source files:** `components/GoTop.js`  
**Used by:** [base-layout](_foundation-base-layout.md) → all 14 pages

---

## Current Implementation

`components/GoTop.js` — React component:
- `useState` tracks whether scroll position > threshold
- `useEffect` adds `scroll` event listener
- Renders a button (conditionally visible) that calls `window.scrollTo({ top: 0, behavior: 'smooth' })`
- Has interactive scroll state — **must be a React island**

---

## Port Strategy

1. Copy `components/GoTop.js` → `astro/src/components/islands/GoTop.jsx`
2. Directive: `client:idle` — not needed before page is interactive, no above-fold priority
3. No props needed — self-contained scroll logic
4. CSS: copy associated styles (CSS module or class names in global CSS)

---

## Astro Target

```jsx
// astro/src/components/islands/GoTop.jsx
import { useState, useEffect } from 'react';

export default function GoTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="go-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <i className="bx bx-chevrons-up" />
    </button>
  );
}
```

```astro
<!-- In BaseLayout.astro -->
<GoTop client:idle />
```

---

## Parity Checklist

- [ ] GoTop button hidden on page load (scroll at top)
- [ ] GoTop button appears after scrolling past threshold
- [ ] Click scrolls smoothly to top
- [ ] Button disappears after scroll returns to top
- [ ] No layout shift when button appears/disappears
- [ ] Boxicons chevron renders (depends on global-styles-and-scripts icon fonts)

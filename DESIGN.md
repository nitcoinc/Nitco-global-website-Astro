# DESIGN.md

## 1. Design Philosophy

**Visual Identity:** Dark, enterprise SaaS marketing site. Deep navy/black backgrounds with cyan and purple accents. High contrast. Restrained color saturation. Feels premium, technical, B2B-focused.

**UI Personality:** Confident and dense without being cluttered. Every section has a clear visual anchor — glow, gradient, or grid texture — but these never compete. Motion is subtle and purposeful.

**Minimalism vs Density:** Medium density. Marketing pages use generous section padding (72–128px vertical) but pack information efficiently within cards and grid panels.

**Enterprise vs Consumer:** Enterprise. No playful rounded illustrations or consumer pastels. Uses glassmorphism cards, radial glows, and grid overlays — patterns common in enterprise AI/SaaS positioning.

**Motion Philosophy:** Low motion. Hover transitions are `0.2–0.3s ease`. Only `translateY(-1px to -2px)` on buttons. No parallax, no full-page transitions. Chevrons rotate on menu open. One `fadeInUp` keyframe for hero elements. If a user prefers reduced motion, nothing breaks — no motion is load-bearing.

**Interaction Philosophy:** Subtle state changes communicate affordance. Focus states are visible (cyan ring). Hover states lift and brighten rather than change color dramatically. No surprise interactions.

**Accessibility Posture:** Partial. ARIA roles on nav and forms. `aria-hidden` on decorative icons. `font-display: swap` on fonts. Keyboard navigation partially supported. Color contrast is functional but not audited against WCAG AA for all text sizes. Missing: skip-to-content link, comprehensive focus management in modals, full screen-reader testing.

---

## 2. Color System

### Primary Palette

| Name | Hex / Value | Usage |
|------|------------|-------|
| Navy Black | `#080715` | Primary background |
| Deep Navy | `#09091e` | Alternate section backgrounds |
| Panel Navy | `#06071e` | Cards, panels |
| Purple (primary) | `#3D3CA0` | Button gradient start, accent |
| Purple (dark) | `#2E2D78` | Button gradient end, nav CTA |
| Cyan Accent | `#1BE1F2` | Primary accent, hover glow |
| Cyan Light | `#53eafd` | Cyan buttons, focus states, checkbox accent |

### Semantic Colors

| Role | Value |
|------|-------|
| Success | `#28BD5A`, `#86efac` (light variant) |
| Error | `#EF4444`, `#fca5a5` (light variant) |
| Warning | Not defined — not currently used |
| Info | Cyan (`#1BE1F2`) doubles as info |

### Neutrals & Text

| Name | Value | Usage |
|------|-------|-------|
| Primary text | `#ffffff` | Headings, primary body |
| Secondary text | `rgba(255,255,255,0.85)` | Body copy, button labels |
| Tertiary text | `rgba(255,255,255,0.5)–0.6` | Meta, captions, subtext |
| Disabled | `rgba(255,255,255,0.3)` | Placeholder, disabled states |
| Light Gray | `#e2e6f0` | Occasional light-theme leftovers |
| Muted Gray | `#8f9ab0` | Secondary text in lighter contexts |

### Surfaces & Borders

| Name | Value | Usage |
|------|-------|-------|
| Card surface | `rgba(8,9,30,0.6)–0.7` | Glassmorphism cards |
| Panel surface | `rgba(255,255,255,0.025)` | Office cards, subtle panels |
| Border default | `rgba(255,255,255,0.07)–0.15` | All card/panel borders |
| Border cyan | `rgba(83,234,253,0.35)` | Cyan button border, focus |
| Divider | `rgba(255,255,255,0.07)` | Horizontal rules |

### Hover States

| Element | Default | Hover |
|---------|---------|-------|
| Primary button | gradient + shadow | `translateY(-2px)` |
| Outline button | `rgba(255,255,255,0.03)` | `rgba(255,255,255,0.06)`, `color: #fff` |
| Cyan button | `rgba(83,234,253,0.06)` | `rgba(83,234,253,0.12)` |
| Office card border | `rgba(255,255,255,0.08)` | `rgba(83,234,253,0.25)` |
| Nav CTA | `#2e2d78` | `#3d3ca0` |

### Dark Mode Strategy

Site is **dark-mode-only**. No light theme toggle. No `prefers-color-scheme` media query. All colors are hardcoded for dark. Legacy `/styles/css/colors/*.css` files contain color variants (`brink-pink`, `purple`, `pink`) but are not theme-switched at runtime.

### Gradients

| Name | Value |
|------|-------|
| Primary button | `linear-gradient(90deg, #3d3ca0 0%, #2e2d78 100%)` |
| Cyan glow | `radial-gradient(circle, rgba(0,255,255,0.10) 0%, transparent 70%)` |
| Purple glow | `radial-gradient(circle, rgba(46,45,120,0.45) 0%, transparent 70%)` |
| Pink glow | `radial-gradient(circle, rgba(237,22,81,0.12) 0%, transparent 70%)` |
| Grid texture | `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)` |

### Opacity Usage

Opacity is the primary tool for surface variation on dark backgrounds. Instead of different dark grays, nearly everything uses `rgba(255,255,255, X)` over the base navy. Common opacity levels: 0.025, 0.03, 0.05, 0.07, 0.1, 0.12, 0.15, 0.3, 0.5, 0.6, 0.7, 0.85.

---

## 3. Typography System

### Font Families

| Role | Family | Source |
|------|--------|--------|
| Primary / UI | `Switzer-Variable` | Self-hosted `/styles/fonts/*.woff2` |
| Secondary | `Montserrat` | `@fontsource/montserrat` |
| Eyebrow / Label | `Space Mono` | Google Fonts (loaded externally) |
| Fallback | `sans-serif` | System |

### Font Weights (Switzer available weights)

100 (Thin), 200 (Extralight), 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold), 900 (Black)

Commonly used: 400 (body), 500 (nav links), 600 (buttons, subheadings), 700 (headings).

### Heading Scale

| Level | Desktop Size | Behavior |
|-------|-------------|---------|
| H1 (hero) | `clamp(2.4rem, 5vw, 4.2rem)` | Fluid scale |
| H1 (solution pages) | `clamp(36px, 5vw, 60px)` | Fluid scale |
| H1 (generic) | `40px` | Fixed |
| H2 | `36px` | Fixed |
| H4 | `1.75rem` | Fixed |
| Body | `14px` | Fixed |
| Eyebrow | `10px–12px` | Uppercase, monospace |

### Line Heights

| Context | Value |
|---------|-------|
| Hero H1 | `1.05` |
| Hero subtitle | `1.7` |
| Body | `1.6` |
| Utility class `.lineHeight-1-6` | `1.6` |

### Letter Spacing

| Context | Value |
|---------|-------|
| H1 | `-0.02em` to `-0.6px` (tight) |
| Eyebrow (monospace) | `3px` |
| Eyebrow (standard) | `0.2em` |

### Button Text

- Font weight: 600
- Size: `0.95rem` or `15px`
- No uppercase transform (except eyebrow labels)
- Letter spacing: default (0)

### Code / Monospace

`Space Mono` used for eyebrow/label chips only. No code blocks or inline code in the UI.

### Responsive Typography Behavior

H1 uses fluid `clamp()` scaling. Body and button sizes are fixed. No `rem`-based spacing scale — mixed `px` and `rem` usage throughout.

---

## 4. Spacing & Layout System

### Spacing Scale (Inferred from usage)

| Token | Value | Common Usage |
|-------|-------|--------------|
| 4px | `4px` | Micro gaps |
| 8px | `8px` | Icon + text gap |
| 10px | `10px` | Checkbox grid gap |
| 12px | `12px` | Mobile sub-menu gap, eyebrow margin |
| 16px | `16px` | Form row gap, eyebrow margin-bottom |
| 20px | `20px` | Form field gap, title margin-bottom |
| 24px | `24px` | Nav gap, card padding, office card padding |
| 28px | `28px` | **Standard horizontal container padding** |
| 32px | `32px` | Button horizontal padding |
| 40px | `40px` | Subtitle margin-bottom, mega menu padding |
| 48px | `48px` | Hero gap (mobile) |
| 56px | `56px` | Form card padding (desktop) |
| 64px | `64px` | Hero gap (desktop) |
| 72px | `72px` | Standard section padding (top/bottom) |
| 80px | `80px` | Footer grid gap, legacy `.ptb-80` |
| 96px | `96px` | Hero section bottom padding |
| 120px–128px | `120–128px` | Hero section top padding |

### Container Widths

| Name | Value | Used In |
|------|-------|---------|
| Max wide | `1280px` | Navbar, most page containers |
| Max content | `1200px` | Resources, some pages |
| Max page | `1180px` | HomePage, AboutUs |
| Max narrow | `720px` | Contact form, focused content |

All containers use `margin: 0 auto` with `padding: 0 28px` on both sides.

### Grid Patterns

| Pattern | Columns | Gap | Usage |
|---------|---------|-----|-------|
| Hero (desktop) | `1fr 1fr` | `64px` | All hero sections |
| Mega menu (3-col) | `repeat(3, 1fr)` | varies | Nav mega panels |
| Mega menu (2-col) | `repeat(2, 1fr)` | varies | Smaller nav panels |
| Footer | `1.2fr 1.8fr 1fr 1fr` | `80px` | Footer layout |
| Form (desktop) | `1.1fr 0.9fr` | default | Contact form |

### Flex Patterns

- Navbar: `display: flex; align-items: center; justify-content: space-between`
- Button groups: `display: flex; gap: 12px; flex-wrap: wrap`
- Icon + text: `display: flex; align-items: center; gap: 8px`

### Section Spacing

| Section Type | Padding |
|-------------|---------|
| Home hero | `128px 0 96px` |
| Solution hero | `120px 0 96px` |
| Contact hero | `80px 0 64px` |
| Standard section | `72px 0` |
| About section | `72px 0` |

### Responsive Breakpoints

| Breakpoint | Width | Key Behavior |
|-----------|-------|--------------|
| Mobile | `< 400px` | Checkbox grid 1-col |
| Small mobile | `< 560px` | Form rows 1-col |
| Mobile | `< 640px` | Form card compact padding |
| Tablet | `< 767px` | Legacy responsive overrides |
| Tablet landscape | `< 860px` | 2-col → 1-col layouts |
| Tablet portrait | `< 900px` | Hero 2-col → 1-col |
| Desktop threshold | `≥ 960px` | Desktop nav visible, mobile nav hidden |
| Large desktop | `≥ 992px–1024px` | Full multi-column layouts |

Architecture is **desktop-first** with `max-width` breakpoints collapsing to mobile.

---

## 5. Component Design Patterns

### Buttons

**Primary (Purple Gradient)**
```
height: 52px (hero) / 48px (general) / 50px (submit)
padding: 0 32px
background: linear-gradient(90deg, #3d3ca0 0%, #2e2d78 100%)
border-radius: 9999px
font-weight: 600
font-size: 0.95rem / 15px
color: #fff
box-shadow: 0 14px 32px -10px rgba(61,60,160,0.85), inset 0 1px 0 rgba(255,255,255,0.18)
transition: transform 0.2s ease
hover: translateY(-2px)
disabled: opacity 0.55
```

**Outline (Ghost)**
```
height: 52px
padding: 0 32px
background: rgba(255,255,255,0.03)
border: 1px solid rgba(255,255,255,0.15)
border-radius: 9999px
color: rgba(255,255,255,0.85)
hover: background rgba(255,255,255,0.07), color #fff, translateY(-2px)
```

**Cyan (Secondary Accent)**
```
height: 52px
padding: 0 32px
background: rgba(83,234,253,0.06)
border: 1px solid rgba(83,234,253,0.35)
border-radius: 9999px
color: #53eafd
font-weight: 600
hover: background rgba(83,234,253,0.12), translateY(-2px)
```

**Nav CTA (Small)**
```
padding: 10px 22px
background: #2e2d78
border-radius: 30px
box-shadow: 0 0 0 1px rgba(255,255,255,0.12) inset
hover: background #3d3ca0
```

### Inputs

```
background: rgba(255,255,255,0.05)
border: 1px solid rgba(255,255,255,0.12)
border-radius: 10px
padding: 12px 16px
color: #fff
font-size: 14px
placeholder: rgba(255,255,255,0.3)
focus-border: rgba(83,234,253,0.5)
focus-shadow: 0 0 0 3px rgba(83,234,253,0.1)
focus-background: rgba(83,234,253,0.04)
```

Textarea: same as input + `min-height: 112px`, `resize: vertical`.

### Checkboxes

```
accent-color: #53eafd
width/height: 16px
wrapper-padding: 10px 14px
wrapper-border: 1px solid rgba(255,255,255,0.1)
wrapper-border-radius: 10px
wrapper-background: rgba(255,255,255,0.03)
checked-border: rgba(83,234,253,0.45)
checked-background: rgba(83,234,253,0.06)
grid: repeat(2, 1fr) at ≥400px, 1fr below
```

### Cards (Glassmorphism)

**Hero Card / Section Card**
```
background: rgba(8,7,21,0.7) or rgba(8,9,30,0.7)
backdrop-filter: blur(12px–16px)
border: 1px solid rgba(255,255,255,0.1)
border-radius: 18px–20px
padding: 24px
box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)
```

**Form Card**
```
background: rgba(8,9,30,0.6)
backdrop-filter: blur(16px)
border: 1px solid rgba(255,255,255,0.1)
border-radius: 24px
padding: 56px (desktop), 40px 28px (mobile)
box-shadow: 0 32px 64px rgba(0,0,0,0.35)
```

**Office / Info Card**
```
background: rgba(255,255,255,0.025)
border: 1px solid rgba(255,255,255,0.08)
border-radius: 20px
padding: 24px
hover-border: rgba(83,234,253,0.25)
transition: border-color 0.2s ease
```

### Modals / Dialogs

No dedicated modal component found. Mega menu panel is the closest full-overlay pattern:
```
background: rgba(6,7,22,0.95)
backdrop-filter: blur(14px)
border-top: 1px solid rgba(255,255,255,0.07)
border-bottom: 1px solid rgba(255,255,255,0.10)
box-shadow: 0 20px 40px rgba(0,0,0,0.5)
border-radius (narrow variant): 0 0 16px 16px
```

### Navigation (Desktop Navbar)

```
height: ~64–72px
background: rgba(6,7,22,X) with blur on scroll
max-width: 1280px container
padding: 0 28px
position: sticky, top: 0
z-index: high

link-font-weight: 500
link-color: rgba(255,255,255,0.85)
link-hover: #fff
active-indicator: underline or color change

mega-menu: full-width below nav, 3-col grid
chevron: rotates 180deg on open
transition: opacity + transform 0.25s ease
```

### Navigation (Mobile)

```
hamburger visible below 960px
drawer slides in from left or overlays
sub-menus: scaleX(0→1) from origin left
gap between items: 12px
```

### Badges / Eyebrows / Chips

```
font-family: Space Mono
font-size: 10px–12px
font-weight: 400
letter-spacing: 3px or 0.2em
text-transform: uppercase
color: #53eafd or rgba(255,255,255,0.5)
margin-bottom: 12px–16px
display: inline-block
```

No pill/badge component with background found consistently — eyebrows are plain text.

### Alerts / Status Messages

Form success/error states:
```
success-color: #86efac
error-color: #fca5a5
display: flex, align-items: center, gap: 8px
icon + text pattern
```

### Dropdowns

Mega menu is the primary dropdown. Uses CSS Grid internally. No generic select-style dropdown component identified.

### Tabs

Not present as a standalone component.

### Accordions

Not present as a standalone component.

### Tooltips

Not present as a standalone component.

### Tables

Not used in current UI pages.

### Loaders / Skeletons

No skeleton loader component found. Loading states handled by Next.js page transitions only.

### Scroll-to-Top

```
component: GoTop.js
position: fixed, bottom-right
triggered by scroll threshold
button with icon, likely similar border-radius/bg to nav CTA
```

### Dividers

```
height: 1px
background: rgba(255,255,255,0.07)
```

---

## 6. Interaction & Motion

### Animation Durations

| Purpose | Duration | Easing |
|---------|----------|--------|
| Button hover transform | `0.2s` | `ease` |
| Generic link/hover | `0.5s` | default |
| Box-shadow on scroll | `0.3s` | `ease` |
| Mega menu open | `0.25s` | `ease` |
| Mobile sub-menu scale | `0.25s` | `ease` |
| Chevron rotate | matches menu | `ease` |
| Hero fade-in | `0.5–0.55s` | `ease both` |

### Keyframes

`fadeInUp`: translates element from `translateY(20px)` → `translateY(0)` while fading opacity 0 → 1. Used on hero section elements.

### Hover Transitions

- Buttons: `transform: translateY(-1px to -2px)` — lift effect
- Cards: border-color change on office cards
- Nav links: color change to `#fff`

### Page Transitions

None implemented. Next.js default page navigation (hard reload feel).

### Microinteractions

- Chevron rotation on mega menu open/close
- Input border + glow on focus
- Checkbox wrapper background/border change on checked state
- Button lift on hover

### Loading Behavior

No custom loading states or spinners identified. Form submit button uses `opacity: 0.55` for disabled state during submission.

### Scroll Behavior

- Navbar gains `box-shadow` on scroll (0.3s transition)
- GoTop button appears after scroll threshold
- No parallax or scroll-triggered animations

### Where Motion is Intentionally Avoided

- Page transitions: none (fast navigation preferred)
- No entrance animations beyond hero `fadeInUp`
- No scroll-triggered reveals
- No hover animations on non-interactive elements

---

## 7. Responsive Design Rules

**Strategy:** Desktop-first. Styles written for large screens, overridden with `max-width` media queries.

### Breakpoint Behavior Table

| Width | Layout Change |
|-------|--------------|
| `< 1024px` | Some 2-col layouts compress |
| `< 992px` | Multi-column content collapses |
| `< 960px` | Desktop nav hidden → mobile hamburger shown |
| `< 900px` | Hero 2-col → 1-col (stacked) |
| `< 860px` | Card grids 2-col → 1-col |
| `< 767px` | Legacy responsive overrides fire |
| `< 640px` | Form card padding reduces to `40px 28px` |
| `< 560px` | Form 2-col rows → 1-col |
| `< 400px` | Checkbox grid → 1-col |

### Navbar Adaptation

- Desktop (≥960px): Full horizontal nav with mega menus
- Mobile (<960px): Hamburger button, drawer/overlay menu
- Mega menus become accordion-style sub-menus on mobile

### Hero Sections

- Desktop: 2-column grid, `gap: 64px`
- Mobile (<900px): Single column, stacked, `gap: 48px`
- Hero CTA buttons: `flex-wrap: wrap` to stack on narrow

### Container Padding

`padding: 0 28px` consistent at all breakpoints. No extra padding changes on mobile.

### Touch Interactions

No explicit touch-specific styles. No `:hover` removal on touch devices. No swipe gestures.

---

## 8. Accessibility Patterns

### Contrast

- White text on `#080715` background: high contrast (>7:1)
- `rgba(255,255,255,0.5)` on dark: ~3:1 — fails WCAG AA for body text
- Cyan `#1BE1F2` on dark navy: passes large text AA, borderline small text
- No explicit contrast testing found in codebase

### Focus Visibility

Input focus: `box-shadow: 0 0 0 3px rgba(83,234,253,0.1)` + cyan border — visible.
Button focus: inherited browser default — not explicitly styled in CSS modules.

### Keyboard Support

- Navbar: `aria-haspopup`, `aria-expanded`, `aria-controls` present
- Mobile menu: `aria-label`, `aria-expanded`
- Forms: labels associated with inputs
- Mega menu keyboard trap not fully implemented (mouse-focused component)

### ARIA Usage

```
role="menubar", role="menuitem" — nav
aria-haspopup="true" — nav dropdowns
aria-expanded — toggle state
aria-hidden="true" — decorative icons
aria-label — mobile menu button
```

### Reduced Motion

No `@media (prefers-reduced-motion: reduce)` declarations found. The `fadeInUp` animation and button hover transforms will fire regardless of user OS preference. **This is a gap.**

### Form Accessibility

- `<label>` elements present for all inputs
- `htmlFor` / `id` pairing used
- Error states use color + icon (color-only would fail WCAG — icon present mitigates)
- No `aria-describedby` for inline validation messages

### Missing Patterns

- No skip-to-content link
- No `prefers-reduced-motion` handling
- No focus trap in mega menus
- Button focus styles rely on browser defaults only

---

## 9. Reusable UI Rules

Use these as implementation constraints when building new components or pages.

| Rule | Value |
|------|-------|
| Border radius — pill buttons | `9999px` |
| Border radius — cards | `18px–24px` |
| Border radius — inputs | `10px` |
| Border radius — icon boxes | `8px–12px` |
| Border radius — mega menu (attached) | `0 0 16px 16px` |
| Standard card blur | `backdrop-filter: blur(12px–16px)` |
| Card border | `1px solid rgba(255,255,255,0.07–0.15)` |
| Horizontal container padding | `28px` both sides |
| Max container width | `1280px` |
| Button height (primary) | `48px–52px` |
| Button padding | `0 32px` |
| Button font weight | `600` |
| Button font size | `0.95rem / 15px` |
| Section vertical padding | `72px` (standard), `120–128px` (hero top) |
| Icon-to-text gap | `8px` |
| Card inner padding | `24px` (small cards), `56px` (form/large cards) |
| Typography hierarchy gap | eyebrow → `16px` → title → `24px` → subtitle → `40px` → CTA |
| Default shadow depth | `0 24px 64px rgba(0,0,0,0.4–0.5)` |
| Button shadow (primary) | `0 14px 32px -10px rgba(61,60,160,0.85), inset 0 1px 0 rgba(255,255,255,0.18)` |
| Modal/overlay bg | `rgba(6,7,22,0.95)` + `blur(14px)` |
| Grid texture opacity | `0.04–0.05` |
| Glow element size | `640px × 640px`, `border-radius: 50%`, `filter: blur(30px–36px)` |
| Transition standard | `0.2s ease` |

---

## 10. Design Tokens

```yaml
color:
  bg:
    primary: "#080715"
    alternate: "#09091e"
    panel: "#06071e"
  brand:
    purple-start: "#3D3CA0"
    purple-end: "#2E2D78"
    cyan: "#1BE1F2"
    cyan-light: "#53eafd"
    pink: "#ED1651"
    pink-alt: "#F48665"
  text:
    primary: "rgba(255,255,255,1.0)"
    secondary: "rgba(255,255,255,0.85)"
    tertiary: "rgba(255,255,255,0.5)"
    disabled: "rgba(255,255,255,0.3)"
  border:
    default: "rgba(255,255,255,0.1)"
    subtle: "rgba(255,255,255,0.07)"
    cyan: "rgba(83,234,253,0.35)"
  surface:
    card: "rgba(8,9,30,0.6)"
    card-alt: "rgba(8,7,21,0.7)"
    panel: "rgba(255,255,255,0.025)"
  semantic:
    success: "#28BD5A"
    success-light: "#86efac"
    error: "#EF4444"
    error-light: "#fca5a5"

radius:
  pill: "9999px"
  card-sm: "18px"
  card-md: "20px"
  card-lg: "24px"
  input: "10px"
  icon: "8px"
  icon-lg: "12px"
  nav-cta: "30px"

shadow:
  card-sm: "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)"
  card-md: "0 32px 64px rgba(0,0,0,0.35)"
  card-lg: "0 32px 64px rgba(0,0,0,0.4)"
  overlay: "0 20px 40px rgba(0,0,0,0.5)"
  button-primary: "0 14px 32px -10px rgba(61,60,160,0.85), inset 0 1px 0 rgba(255,255,255,0.18)"
  button-submit: "0 12px 28px -10px rgba(61,60,160,0.85), inset 0 1px 0 rgba(255,255,255,0.15)"
  input-focus: "0 0 0 3px rgba(83,234,253,0.1)"

blur:
  card: "blur(12px)"
  card-heavy: "blur(16px)"
  overlay: "blur(14px)"

spacing:
  4: "4px"
  8: "8px"
  10: "10px"
  12: "12px"
  16: "16px"
  20: "20px"
  24: "24px"
  28: "28px"
  32: "32px"
  40: "40px"
  48: "48px"
  56: "56px"
  64: "64px"
  72: "72px"
  80: "80px"
  96: "96px"
  128: "128px"

container:
  padding-x: "28px"
  max-wide: "1280px"
  max-content: "1200px"
  max-page: "1180px"
  max-narrow: "720px"

typography:
  family-primary: "Switzer-Variable, sans-serif"
  family-secondary: "Montserrat, sans-serif"
  family-mono: "Space Mono, monospace"
  size-h1-fluid: "clamp(2.4rem, 5vw, 4.2rem)"
  size-h1-fixed: "40px"
  size-h2: "36px"
  size-h4: "1.75rem"
  size-body: "14px"
  size-eyebrow: "11px"
  weight-body: 400
  weight-nav: 500
  weight-button: 600
  weight-heading: 700
  line-height-hero: 1.05
  line-height-body: 1.6
  line-height-subtitle: 1.7
  tracking-heading: "-0.02em"
  tracking-eyebrow: "3px"

transition:
  fast: "0.2s ease"
  standard: "0.3s ease"
  slow: "0.5s"
  menu: "0.25s ease"

breakpoint:
  mobile-xs: "400px"
  mobile-sm: "560px"
  mobile: "640px"
  tablet: "767px"
  tablet-lg: "860px"
  hero-break: "900px"
  nav-break: "960px"
  desktop: "992px"
  desktop-lg: "1024px"

gradient:
  button-primary: "linear-gradient(90deg, #3d3ca0 0%, #2e2d78 100%)"

glow:
  cyan: "radial-gradient(circle, rgba(0,255,255,0.10) 0%, transparent 70%)"
  purple: "radial-gradient(circle, rgba(46,45,120,0.45) 0%, transparent 70%)"
  pink: "radial-gradient(circle, rgba(237,22,81,0.12) 0%, transparent 70%)"
  size: "640px"
  blur: "blur(36px)"

grid-texture:
  pattern: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)"
  size: "56px 56px"
  opacity: 0.04
```

---

## 11. Page Archetypes

### Marketing Hero Page (Home, Solution pages)

**Structure:**
```
[Navbar sticky]
[Hero section]
  — eyebrow chip (Space Mono, uppercase)
  — H1 (fluid clamp size)
  — subtitle (opacity 0.7–0.85)
  — CTA button group (primary + outline)
  [Left column: text]     [Right column: media/card]
[Feature/benefit sections] (72px vertical padding)
[CTA bottom section]
[Footer]
```

**Visual anchors:** Radial glow (cyan + purple) centered behind hero, grid texture overlay at 4–5% opacity.

**Grid:** 2-col `1fr 1fr` on desktop, stacked on mobile.

### Contact / Form Page

**Structure:**
```
[Navbar]
[Hero — narrow, centered, less padding than home]
[Form section]
  [Left: form card (glassmorphism)]     [Right: contact info cards]
[Footer]
```

**Form card:** `24px` border-radius, `blur(16px)`, dark semi-transparent.
**Fields:** 2-column grid for short fields, full-width for textarea.
**Submit:** Full-width primary button.

### Resources / Blog Listing

**Structure:**
```
[Navbar]
[Hero — page title, eyebrow, filter tabs]
[Card grid — 3 columns desktop, 1-2 on mobile]
[Pagination or load-more]
[Footer]
```

Background: `#09091e` (slightly lighter navy variant). Grid texture more prominent (opacity 0.35–0.5 for Resources).

### Resource Detail / Article

**Structure:**
```
[Navbar]
[Article header — title, meta, hero image]
[Content area — prose]
[Related content or CTA]
[Footer]
```

Uses `AllPost` component. No custom prose typography system found (likely inherited from global body styles).

### About / Company Page

**Structure:**
```
[Navbar]
[Hero section]
[Team/culture grid]
[Mission/values section]
[Office locations — card grid]
[Footer]
```

Office cards use `rgba(255,255,255,0.025)` surface with `20px` border-radius.

### Partners Page

Similar to About archetype. Multi-column partner logo grids. No distinct pattern beyond standard section layout.

### Careers Page

Standard marketing archetype. Job listings likely rendered as card or list items.

### AI Command Center Page

Enhanced solution page archetype with additional feature showcase sections.

---

## 12. Anti-Patterns & Constraints

### CSS Architecture Inconsistency

Project mixes three CSS approaches:
- CSS Modules (primary, per-component)
- Global CSS with utility classes (`styles/css/style.css`)
- Legacy Bootstrap (`bootstrap.min.css` loaded globally)
- styled-components (installed but usage scope unclear)

Bootstrap is loaded but the visual system does not use Bootstrap components. It likely adds dead CSS weight and potential class conflicts.

### Mixed Unit Systems

Spacing uses both `px` and `rem` without a coherent scale. `14px` body font but `1.75rem` for H4. `clamp()` in some headings, fixed `px` in others. Makes systematic type scaling unreliable.

### No Reduced Motion Support

Zero `@media (prefers-reduced-motion: reduce)` declarations. The `fadeInUp` animation and all transitions run regardless of user OS preference. This is a WCAG 2.1 2.3.3 gap.

### Hardcoded Dark Theme

No theme token abstraction. Every color is a hardcoded hex or rgba value inline in CSS modules. Building a light theme or white-label variant would require rewriting all component CSS files.

### Fragmented Breakpoint System

Breakpoints are scattered across individual CSS module files (`max-width: 900px` in one, `max-width: 860px` in another, `max-width: 767px` in legacy files). No single breakpoint token source. Leads to inconsistent collapse behavior across page sections.

### Legacy Color Theme Files

`/styles/css/colors/brink-pink-style.css`, `purple-style.css`, `pink-style.css` exist but are not used for runtime theme switching. Dead code with scaling risk if someone assumes they're functional.

### No Design Token Layer

All values are embedded in CSS modules. No single `tokens.css` or `_variables.css` file. Changes to brand color require updating 20+ files.

### Missing Components

- No skeleton/loading state pattern
- No tooltip component
- No tab component (despite navigation tabs present in resources)
- No accordion component
- No modal/dialog component
- No alert/notification component
- No data table pattern

These will need to be designed from scratch for any expansion. Without system-level components, inconsistency risk is high.

### Inconsistent Border Radius

Cards use `18px`, `20px`, `24px` inconsistently across components. No single `--radius-card` variable governs them. A future refactor should normalize to 2 sizes: `20px` (default card) and `24px` (large/form cards).

### Footer Uses Inline Styles

`Footer.js` applies styles inline rather than via CSS module. Harder to override, harder to audit, breaks pattern consistency with all other components.

### Form Accessibility Gap

No `aria-describedby` linking error messages to form fields. No `aria-live` region for async form submission status. Color + icon dual-encoding present but not complete.

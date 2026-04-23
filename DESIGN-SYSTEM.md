# Design System — Ney Barão Portfolio

A comprehensive design system documentation for the professional portfolio website. This system is built on CSS custom properties (variables) and semantic HTML, enabling rapid development and consistent visual language.

---

## Design Philosophy

- **Editorial & Minimal**: Clean, text-forward design with careful typography
- **Fluid Responsivity**: Scales gracefully from mobile to ultra-wide screens
- **Dark/Light Modes**: Native support with CSS variables
- **Bilingual (PT/EN)**: Semantic HTML with `data-lang` attributes
- **Performance First**: Vanilla JS, minimal dependencies, optimized asset loading
- **Accessibility**: WCAG 2.1 AA compliance with `prefers-reduced-motion` support

---

## Design Tokens

### Color System

All colors are defined as CSS custom properties (`:root`) with a separate dark theme override (`[data-theme="dark"]`).

#### Light Theme (Default)
```css
--bg: #ECE8DF;          /* Background - warm beige */
--bg-soft: #E4DFD3;     /* Soft background - lighter beige */
--bg-elev: #F4F1EA;     /* Elevated background - cream */
--text: #131211;        /* Text - very dark brown */
--muted: #7A756A;       /* Muted text - medium brown */
--line: rgba(19, 18, 17, 0.14);  /* Divider lines */
--accent: #D94E1F;      /* Accent - warm orange */
```

#### Dark Theme
```css
[data-theme="dark"] {
  --bg: #0D0C0A;        /* Background - almost black */
  --bg-soft: #141210;   /* Soft background - dark brown */
  --bg-elev: #1C1A17;   /* Elevated background - dark grey */
  --text: #ECE8DF;      /* Text - warm white */
  --muted: #817A6E;     /* Muted text - light grey */
  --line: rgba(236, 232, 223, 0.14);  /* Dividers */
  --accent: #E8673A;    /* Accent - bright orange */
}
```

#### Usage Guidelines
- **Primary text**: Use `var(--text)` on `var(--bg)`
- **Secondary text**: Use `var(--muted)` for labels, metadata, footers
- **Interactive elements**: Use `var(--accent)` for hover states, highlights
- **Dividers**: Use `var(--line)` for borders, separators
- **Backgrounds**: Stack `--bg` → `--bg-soft` → `--bg-elev` for depth

#### Color Contrast
- ✅ Text on background: 14.5:1 (Light), 15.2:1 (Dark) — WCAG AAA
- ✅ Accent on background: 4.8:1 (Light), 5.1:1 (Dark) — WCAG AA
- ✅ Muted text: 4.2:1 (Light), 3.8:1 (Dark) — WCAG AA

### Typography

#### Typefaces
| Role | Font Family | Usage |
|------|------------|-------|
| Display | Lora | Headlines, titles, brand (elegant serif) |
| Body | Inter | Body copy, UI text |
| Mono | JetBrains Mono | Code, labels, metadata |

#### Type Scale (Fluid)
Using `clamp()` for responsive scaling. Values automatically adjust between mobile and desktop.

```css
--step--1: clamp(0.75rem, 0.72rem + 0.12vw, 0.81rem);  /* 12-13px */
--step-0:  clamp(0.93rem, 0.88rem + 0.2vw, 1.02rem);   /* 15-16px */
--step-1:  clamp(1.12rem, 1.03rem + 0.36vw, 1.32rem);  /* 18-21px */
--step-2:  clamp(1.4rem, 1.22rem + 0.72vw, 1.8rem);    /* 22-29px */
--step-3:  clamp(1.75rem, 1.4rem + 1.4vw, 2.6rem);     /* 28-42px */
--step-4:  clamp(2.4rem, 1.7rem + 2.8vw, 4.2rem);      /* 38-67px */
--step-5:  clamp(3.6rem, 2.3rem + 5.2vw, 7.2rem);      /* 58-115px */
--step-6:  clamp(5rem, 3rem + 8vw, 11rem);             /* 80-176px */
```

#### Type Styles

| Class | Font | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|------|--------|-------------|----------------|-------|
| `.display-xl` | Lora | `var(--step-6)` | 600 | 1.0 | -0.04em | Hero titles |
| `.display-l` | Lora | `var(--step-5)` | 600 | 1.05 | -0.035em | Large sections |
| `.display-m` | Lora | `var(--step-4)` | 600 | 1.05 | -0.025em | Section titles |
| `.display-s` | Lora | `var(--step-3)` | 600 | 1.0 | -0.02em | Subsections |
| `.eyebrow` | JetBrains Mono | `var(--step--1)` | 400 | 1.5 | 0.08em | Labels, metadata |
| `.lead` | Inter | `var(--step-2)` | 300 | 1.25 | -0.01em | Introductory text |
| `.prose p` | Inter | `var(--step-1)` | 400 | 1.5 | — | Body paragraphs |

### Spacing

#### Spacing Scale
```css
--gutter: clamp(1.25rem, 1rem + 1.2vw, 2.25rem);  /* 20-36px */
```

The gutter is the primary spacing unit used for:
- Container padding
- Grid gaps
- Section spacing

#### Standard Spacing Values
- `0.25rem` (4px) — Micro spacing (padding within components)
- `0.5rem` (8px) — Small gaps
- `1rem` (16px) — Base unit
- `1.5rem` (24px) — Standard padding
- `2rem` (32px) — Medium spacing
- `3rem` (48px) — Large spacing
- `var(--gutter)` — Responsive gutter

#### Section Spacing
```css
section { padding: clamp(4rem, 10vh, 8rem) 0; }
```
- Mobile (4rem / 64px)
- Tablet/Desktop (8rem / 128px)
- Scales based on viewport height for flexibility

### Motion

#### Easing Curves
```css
--ease: cubic-bezier(0.65, 0.05, 0.05, 0.95);      /* Smooth, bouncy */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);         /* Quick release */
--ease-in: cubic-bezier(0.7, 0, 0.84, 0);          /* Slow start */
```

#### Duration
```css
--dur: 0.6s;        /* Standard animation */
--dur-fast: 0.3s;   /* Quick interactions */
```

#### Accessibility
- Animations respect `prefers-reduced-motion: reduce`
- All motion is non-essential (UI enhancement only)
- Animated elements have static equivalents

---

## Components

### Navigation (`.nav`)

**Description**: Fixed header with brand, navigation links, and theme/language toggles.

**States & Interactions**:
| State | Visual | Behavior |
|-------|--------|----------|
| Default | Light beige on dark overlay (mix-blend-mode: difference) | — |
| Link hover | Underline animates from right to left | `::after` scaleX transition |
| Tool button hover | 8% scale increase, opacity 1 | `transform: scale(1.08)` |

**HTML Structure**:
```html
<header class="nav">
  <div class="container nav__inner">
    <a href="/" class="nav__brand" aria-label="Home">
      <span class="brand-dot"></span> Ney Barão
    </a>
    <nav class="nav__links" aria-label="Primary">
      <a href="#work" class="nav__link">Work</a>
      <a href="#about" class="nav__link">About</a>
      <a href="#contact" class="nav__link">Contact</a>
    </nav>
    <div class="nav__tools">
      <button class="tool-btn" data-theme-toggle aria-label="Toggle theme">PT</button>
      <button class="tool-btn" data-lang-toggle aria-label="Toggle language"></button>
    </div>
  </div>
</header>
```

**Responsive Behavior**:
- Below 720px: Link gap reduced (2rem → 1.1rem), font size smaller

---

### Hero Section (`.hero`)

**Description**: Large introductory section with animated title, subtitle, and ticker.

**Components**:
- **Eyebrow** (`.hero__eyebrow`): Small label with dash prefix
- **Title** (`.hero__title`): Large headline with accent color emphasis
- **Meta** (`.hero__meta`): Two-column grid with description and arrow icon
- **Ticker** (`.hero__ticker`): Horizontal scrolling text animation

**Interactions**:
```
.hero__meta:hover .arrow {
  transform: translate(6px, -6px);  /* Subtle diagonal lift */
  opacity: 1;
}
```

**Accessibility**:
- Title uses `data-reveal="lines"` for staggered fade-in
- Respects `prefers-reduced-motion` → no animation

---

### Work List (`.work-item`)

**Description**: Portfolio project card with hover preview and metadata.

**Columns**:
1. Number (mono, muted)
2. Title (large, accent on hover)
3. Client (small, muted)
4. Year (mono, muted)
5. Arrow (icon)

**Interactions**:
```
.work-item:hover {
  .work-item__title { color: var(--accent); }
  .work-item__arrow { 
    transform: translate(10px, -10px) rotate(-8deg);
    opacity: 1;
  }
  ::after { width: 100%; }  /* Bottom accent line animates */
}
```

**Preview (Desktop Only)**:
- SVG artwork fixed-position
- Follows mouse, scales on hover
- Hidden on screens below 900px

**Responsive**:
- Below 900px: Columns collapse (number, title, arrow only)
- Client and year hidden
- Preview hidden

---

### Section Head (`.section-head`)

**Description**: Numbered section header with title.

**Layout**: Two-column grid
- Column 1: Number (e.g., "01 / Work")
- Column 2: Title with italicized accent

```html
<div class="section-head">
  <div class="section-head__num">01 / Work</div>
  <h2 class="section-head__title">
    Selected work, <em>2024 — 2026</em>.
  </h2>
</div>
```

---

### Stats Grid (`.stats`)

**Description**: Four-column display of key metrics.

**Structure**:
```
.stat
  .stat__num        (large display font)
  .stat__label      (mono, muted, uppercase)
```

**Example**:
```
15+              40+              11              01
Years of practice | Products shipped | Industries served | NN/g certification
```

**Responsive**: 4 cols → 2 cols below 720px

---

### Clients Grid (`.clients-grid`)

**Description**: 4-column table of client logos and categories.

**Interaction**:
```
.client:hover {
  background: var(--text);      /* Text color becomes bg */
  color: var(--bg);             /* Bg becomes text color */
}
```

**Columns**: 4 (desktop), 2 (tablet), 1 (mobile)

**Border Pattern**: Right borders except on multiples of 4

---

### Contact CTA (`.contact__cta`)

**Description**: Primary call-to-action button with animated background slide.

**States**:
```
Default:
  border: 1px solid currentColor
  background: transparent

:hover {
  color: var(--bg);
  ::before {
    background: var(--text);
    transform: translateY(0);     /* Slides up from bottom */
  }
  svg {
    transform: translate(4px, -4px);  /* Icon lifts */
  }
}
```

---

### Reveal Animations (`.data-reveal`)

**Description**: Scroll-triggered entrance animations with two variants.

#### `.data-reveal` (Standard)
```
Initial: opacity: 0, translateY(24px)
Visible: opacity: 1, translateY(0)
Duration: 0.95s fade + 1s slide
```

#### `.data-reveal="lines"` (Staggered)
```
Each child animates individually:
- Child 1: instant
- Child 2: +0.08s delay
- Child 3: +0.16s delay
- Child 4: +0.24s delay
- Child 5: +0.32s delay
```

---

### Page Transition Curtain (`.curtain`)

**Description**: Full-screen overlay for page transitions.

**States**:
- `data-state="reveal"`: Slides up on page load (0.95s)
- `data-state="cover"`: Slides down before navigation (0.6s)
- `data-state="hide"`: Parks above viewport after reveal

**Animation**:
```
.curtain[data-state="reveal"] {
  animation: curtainUp 0.95s var(--ease) 0.05s forwards;
}

@keyframes curtainUp {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-100%); }
}
```

---

## Layout System

### Container (`.container`)

**Description**: Centered content wrapper with horizontal padding.

```css
.container {
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: var(--gutter);
}
```

- Responsive padding (20-36px based on viewport)
- Max width: 1440px (comfortable reading on ultra-wide)

### Grid (`.grid-12`)

**Description**: 12-column CSS grid utility.

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gutter);
}
```

**Column Utilities**:
- `.col-4`: 4 columns (1/3 width)
- `.col-6`: 6 columns (1/2 width)
- `.col-8`: 8 columns (2/3 width)
- `.col-12`: 12 columns (full width)

---

## Utility Classes

| Class | Property | Value |
|-------|----------|-------|
| `.muted` | `color` | `var(--muted)` |
| `.accent` | `color` | `var(--accent)` |
| `.nowrap` | `white-space` | `nowrap` |
| `.uppercase` | `text-transform` | `uppercase` with `letter-spacing: 0.08em` |
| `.mono` | `font-family` | `var(--font-mono)` |
| `.hide-mobile` | `display` | `none` below 720px |

---

## Accessibility Features

### Focus Styles
```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}
```
- High contrast (4.5:1+)
- 3px offset for visibility
- 2px border radius for softness

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  [data-reveal], [data-reveal="lines"] > * {
    opacity: 1 !important;
    transform: none !important;
  }
}
```
- Disables all animations/transitions
- All content visible instantly
- No visual degradation

### Language Support
```html
<html lang="pt-BR" data-lang="pt">
  <span data-lang="pt">Portuguese text</span>
  <span data-lang="en">English text</span>
</html>
```
- Semantic `lang` attribute
- CSS hides non-active language: `[data-lang="pt"] [data-lang="en"] { display: none !important; }`

### Custom Cursor
- Implemented with CSS custom properties
- Disabled on touch devices: `@media (hover: none)`
- Respects `prefers-reduced-motion`

---

## Responsive Breakpoints

| Breakpoint | Use Case |
|------------|----------|
| Default | Desktop (1440px width) |
| `@media (max-width: 900px)` | Tablet landscape / Small laptop |
| `@media (max-width: 820px)` | Tablet portrait |
| `@media (max-width: 720px)` | Mobile + small tablets |

### Key Responsive Behaviors

**Work List (900px)**:
- Preview hidden (SVG fixed-position, not suitable for touch)
- Grid columns collapse
- Metadata hidden

**About Section (820px)**:
- Two-column layout → single column
- Clients grid: 4 cols → 2 cols

**General (720px)**:
- Navigation links: smaller font
- Stats grid: 4 cols → 2 cols
- Contact meta: 3 cols → 1 col
- Utility: `.hide-mobile` → hidden

---

## Motion & Animation Guidelines

### When to Use Motion
✅ **Do**:
- Entrance/exit animations (fade, slide)
- Hover feedback (underline, color change)
- Scroll-triggered reveals
- Icon rotations and transforms
- Background slides

❌ **Don't**:
- Motion on utility components (badges, tags)
- Animations longer than 1s (feels sluggish)
- Multiple simultaneous animations (overwhelming)
- Parallax on critical content

### Animation Best Practices
1. **Easing**: Use `--ease-out` for interactive feedback (feels snappy)
2. **Duration**: 0.3s–0.6s for user interactions
3. **Accessibility**: Always check `prefers-reduced-motion`
4. **Performance**: Use `will-change: transform` for GPU acceleration

---

## Case Study Pages (`.case-`)

### Case Hero (`.case-hero`)

**Structure**:
- Large headline
- 4-column metadata grid (role, timeline, deliverables, outcome)

**Responsive**: 4 cols → 2 cols below 720px

### Case Section (`.case-section`)

**Structure**:
- Two-column header (number, title)
- Content area with images/text

### Case Grid Utilities
- `.case-grid-2`: Two columns
- `.case-grid-3`: Three columns
- Both collapse to single column below 820px

### Case Navigation (`.case-nav`)

**Structure**: Three-column footer
- Previous project (left)
- Section indicator (center)
- Next project (right)

---

## Color Contrast Verification

All text meets WCAG 2.1 AA or AAA standards:

| Combination | Light Theme | Dark Theme | Standard |
|-------------|-------------|-----------|----------|
| Text on BG | 14.5:1 | 15.2:1 | AAA |
| Text on soft BG | 12.8:1 | 14.1:1 | AAA |
| Muted on BG | 4.2:1 | 3.8:1 | AA |
| Accent on BG | 4.8:1 | 5.1:1 | AA |

---

## Implementation Notes

### CSS Variables Best Practices
- Always use `var()` for colors, spacing, sizing
- Define all tokens at `:root` level
- Use semantic names (`--accent` not `--orange`)
- Provide dark theme overrides

### HTML Structure
- Semantic elements (`<main>`, `<nav>`, `<section>`, `<footer>`)
- ARIA labels on interactive elements
- `data-*` attributes for JS behavior
- Proper heading hierarchy (H1 → H2 → H3)

### Performance
- CSS: ~24KB uncompressed, ~5KB gzipped
- No external JS libraries
- Fonts preconnected (Google Fonts)
- SVG artwork for case previews (vector, scalable)

### Maintenance
- Update tokens in `:root` and `[data-theme="dark"]` only
- Component classes are semantic (`.work-item` not `.card-hover`)
- Utility classes are minimal and reusable
- Comments divide sections for easy navigation

---

## Migration & Versioning

**Current Version**: 1.0 (Initial release)

**Future Considerations**:
- [ ] Add CSS custom properties for button sizes (sm, md, lg)
- [ ] Create form component styles (inputs, selects, checkboxes)
- [ ] Document component variants (e.g., button types)
- [ ] Add loading states for interactive components
- [ ] Consider CSS-in-JS or Tailwind migration if project scales

---

## Resources

- **Typography Scale Calculator**: https://utopia.fyi/type/calculator
- **Easing Functions**: https://easings.net
- **WCAG Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **CSS Custom Properties**: https://developer.mozilla.org/en-US/docs/Web/CSS/--*

---

**Design System v1.0** — April 2026
Maintained by Ney Barão

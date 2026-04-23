# Design System — Access & Usage Guide

Guia rápido para acessar e usar o design system documentado.

---

## 📍 Where to Find Everything

### 📄 Documentation Files

| File | Purpose | Format |
|------|---------|--------|
| **DESIGN-SYSTEM.md** | Complete reference documentation | Markdown (616 lines) |
| **design-system.html** | Interactive visual showcase | HTML (Interactive page) |
| **DESIGN-SYSTEM-GUIDE.md** | This guide | Markdown |

### 🌐 Access URLs

When running locally (`python3 -m http.server 8000`):
- **Portfolio**: http://localhost:8000/
- **Design System Showcase**: http://localhost:8000/design-system.html
- **Documentation**: Open `DESIGN-SYSTEM.md` in your editor

---

## 🎯 Quick Start

### For Designers
1. Open **`design-system.html`** in browser (visual showcase)
2. Toggle dark/light theme and language (PT/EN)
3. Explore interactive components and animations
4. Reference **`DESIGN-SYSTEM.md`** for implementation details

### For Developers
1. Read **`DESIGN-SYSTEM.md`** for token definitions
2. Check `assets/css/style.css` for CSS custom properties
3. View **`design-system.html`** for component patterns
4. Copy token values directly from CSS variables

### For Product Managers / Stakeholders
1. Open **`design-system.html`** for visual overview
2. Share link to stakeholders for feedback
3. See WCAG compliance and accessibility features
4. Understand responsive behavior across devices

---

## 📚 Documentation Structure

### DESIGN-SYSTEM.md Sections

```
1. Design Philosophy
   └─ Editorial & Minimal approach
   └─ Fluid responsivity
   └─ Dark/Light modes

2. Design Tokens (Colors, Typography, Spacing, Motion)
   └─ Color palettes (light & dark)
   └─ Type scale with clamp()
   └─ Spacing units
   └─ Easing curves & durations

3. Components (Nav, Hero, Work Items, CTAs, etc.)
   └─ HTML structure
   └─ States & interactions
   └─ Responsive behavior

4. Layout System
   └─ Container & grid utilities
   └─ Column utilities

5. Accessibility Features
   └─ Focus styles
   └─ Reduced motion support
   └─ Language support

6. Responsive Breakpoints
   └─ 900px, 820px, 720px rules
   └─ Component-specific changes

7. Implementation Guidelines
   └─ CSS variable patterns
   └─ HTML best practices
   └─ Performance notes
```

### design-system.html Sections

```
1. Colors (Light & Dark themes)
   └─ Color swatches with hex values
   └─ WCAG contrast ratios

2. Typography
   └─ Typeface samples
   └─ Type scale visualization

3. Components
   └─ Interactive button examples
   └─ Card variations
   └─ Spacing scale demo

4. Motion
   └─ Easing curve demonstrations
   └─ Duration guidelines
   └─ Accessibility notes

5. Responsive
   └─ Breakpoint reference table
```

---

## 🔧 Using Design Tokens in CSS

All tokens are defined as CSS custom properties in `assets/css/style.css`.

### Color Tokens
```css
/* Light theme (default) */
var(--bg)       /* #ECE8DF */
var(--bg-soft)  /* #E4DFD3 */
var(--bg-elev)  /* #F4F1EA */
var(--text)     /* #131211 */
var(--muted)    /* #7A756A */
var(--accent)   /* #D94E1F */
var(--line)     /* rgba(19, 18, 17, 0.14) */

/* Dark theme override */
[data-theme="dark"] {
  --bg:     #0D0C0A
  --accent: #E8673A
  /* ... */
}
```

### Typography Tokens
```css
var(--font-display)  /* "Instrument Sans" (headlines) */
var(--font-body)     /* "Inter" (body text) */
var(--font-mono)     /* "JetBrains Mono" (labels) */

var(--step--1)  /* 12-13px */
var(--step-0)   /* 15-16px */
var(--step-1)   /* 18-21px */
var(--step-2)   /* 22-29px */
var(--step-3)   /* 28-42px */
var(--step-4)   /* 38-67px */
var(--step-5)   /* 58-115px */
var(--step-6)   /* 80-176px */
```

### Spacing Tokens
```css
var(--gutter)  /* 20-36px (responsive) */
var(--max)     /* 1440px (container max-width) */
```

### Motion Tokens
```css
var(--ease)       /* cubic-bezier(0.65, 0.05, 0.05, 0.95) */
var(--ease-out)   /* cubic-bezier(0.16, 1, 0.3, 1) */
var(--ease-in)    /* cubic-bezier(0.7, 0, 0.84, 0) */
var(--dur)        /* 0.6s */
var(--dur-fast)   /* 0.3s */
```

---

## 🎨 Customizing the Design System

### Changing Colors
Edit `:root` and `[data-theme="dark"]` in `assets/css/style.css`:

```css
:root {
  --accent: #D94E1F;  /* Change this */
}

[data-theme="dark"] {
  --accent: #E8673A;  /* And this */
}
```

### Adjusting Type Scale
Modify `--step-*` variables in `assets/css/style.css`:

```css
--step-3: clamp(1.75rem, 1.4rem + 1.4vw, 2.6rem);
/* min: 1.75rem, preferred: 1.4rem + 1.4vw, max: 2.6rem */
```

### Adding New Components
1. Document in `DESIGN-SYSTEM.md` under "Components"
2. Add styles to `assets/css/style.css`
3. Add example to `design-system.html`
4. Test at all breakpoints (900px, 820px, 720px)

---

## ♿ Accessibility Checklist

Before shipping any new component or change:

- [ ] Color contrast meets WCAG AA minimum (4.5:1)
- [ ] Focus styles visible (outline 2px solid)
- [ ] Respects `prefers-reduced-motion`
- [ ] Keyboard accessible (Tab, Enter, Escape)
- [ ] Semantic HTML (`<button>`, `<nav>`, `<a>`, etc.)
- [ ] ARIA labels on interactive elements
- [ ] Form inputs have associated `<label>`
- [ ] Images have `alt` text
- [ ] Tested in screen reader (VoiceOver, NVDA)

---

## 📱 Responsive Testing Sizes

Test components at these viewport widths:

| Size | Device | Breakpoint |
|------|--------|-----------|
| 375px | iPhone SE | Mobile default |
| 768px | iPad | Below 820px |
| 900px | iPad landscape | Breakpoint |
| 1024px | iPad Pro | Tablet |
| 1440px | Desktop | Full width |
| 1920px | Ultra-wide | Max width container |

### How to Test Locally
```bash
# macOS with Python
python3 -m http.server 8000

# Then visit:
# http://localhost:8000/design-system.html

# In Chrome DevTools, use Device Toolbar (Cmd+Shift+M)
# to test at different screen sizes
```

---

## 🚀 Deployment & Distribution

### Publishing Design System Showcase
The `design-system.html` file can be:
- **Shared internally** via link to `neybarao.com/design-system`
- **Embedded in wikis** or documentation sites
- **Referenced in design reviews** (paste the URL)
- **Used as onboarding** for new team members

### Updating Documentation
1. Make changes to `DESIGN-SYSTEM.md`
2. Update `design-system.html` if showcasing new patterns
3. Commit changes: `git add . && git commit -m "Update design system"`
4. Push to GitHub: `git push`

---

## 📊 Design System Metrics

### Current State
- **CSS**: 414 lines (~24KB uncompressed, ~5KB gzipped)
- **JavaScript**: 303 lines (~12KB uncompressed, ~3.5KB gzipped)
- **Documentation**: 616 lines (Markdown)
- **Visual Showcase**: 478 lines (HTML)
- **Total Size**: ~36KB assets + docs

### Coverage
- ✅ 6 color themes (light/dark variants)
- ✅ 8 typography scale steps
- ✅ 2 spacing scales (responsive)
- ✅ 3 easing curves
- ✅ 6 major components
- ✅ 4 responsive breakpoints
- ✅ 100% WCAG AA compliance

---

## 🔄 Version History

### v1.0 (April 2026)
- Initial release
- Comprehensive documentation
- Interactive showcase page
- Full accessibility support

### Future Versions
- [ ] v1.1: Add form components (input, select, checkbox)
- [ ] v1.2: Add animation library (GSAPor Framer Motion)
- [ ] v2.0: Figma components with Code Connect

---

## ❓ FAQ

**Q: Can I change the accent color?**
A: Yes! Edit `--accent` in `:root` and `[data-theme="dark"]` in `assets/css/style.css`. Update DESIGN-SYSTEM.md to document the change.

**Q: How do I add a new typeface?**
A: Add the font via Google Fonts link, define a new `--font-*` variable, and document in DESIGN-SYSTEM.md. Test all scales.

**Q: Is the design system locked?**
A: No! It's a living system. Make improvements, document them, and share with the team.

**Q: Can I use this in a Figma component?**
A: Yes! You can map tokens to Figma variables and use Code Connect to sync components with the codebase.

---

## 📞 Support & Questions

For questions about the design system:
1. Check **DESIGN-SYSTEM.md** for documentation
2. Review **design-system.html** for visual examples
3. Inspect `assets/css/style.css` for implementation
4. Test locally: `http://localhost:8000/design-system.html`

---

**Design System v1.0** — April 2026  
Maintained by Ney Barão  
Open to contributions and improvements

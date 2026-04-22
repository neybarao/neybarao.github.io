# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static HTML/CSS/JavaScript portfolio website for Ney Barão, a Senior Product Designer. It's hosted on GitHub Pages with no build tools, frameworks, or dependencies. The site is bilingual (Portuguese/English) with theme toggle (light/dark).

## Running the Site Locally

```bash
# No build step required. Start a simple HTTP server in the project root:
python3 -m http.server 8000
# Then visit http://localhost:8000

# Or with Node:
npx http-server
```

The site is fully static—no bundling, transpiling, or server-side rendering.

## Project Structure

```
/
├── index.html                      # Homepage
├── work/                           # Case study pages (4 projects)
│   ├── mtr-app.html
│   ├── al5-bank.html
│   ├── cook-mate.html
│   └── senac.html
├── assets/
│   ├── css/style.css               # Single stylesheet (vanilla CSS)
│   ├── js/app.js                   # All client-side functionality
│   └── img/                        # OG images & icons (in progress)
├── robots.txt                      # SEO: crawler directives
├── sitemap.xml                     # SEO: URL index
└── site.webmanifest                # PWA metadata
```

## Content Patterns

### Bilingual Content (PT/EN)

All text content exists in the HTML inline as two language spans. CSS and JS toggle visibility:

```html
<h1>
  <span data-lang="pt">Interfaces que guiam pessoas</span>
  <span data-lang="en">Interfaces that guide people</span>
</h1>
```

**HTML:** Both languages are present in the DOM simultaneously.  
**CSS:** `[data-lang="pt"] [data-lang="en"] { display: none; }` hides inactive language.  
**JS:** `html.setAttribute('data-lang', 'pt' | 'en')` switches visibility. Saved in `localStorage.nb_lang`.

**Important for SEO:** Google sees both languages concatenated from a single URL. The HTML `lang` attribute is static (`pt-BR`). If you add new bilingual content, ensure both language spans are adjacent in the DOM.

### Theme Toggle (Light/Dark)

Controlled by `[data-theme="light" | "dark"]` on the `<html>` element. Saved in `localStorage.nb_theme`. Defaults to system preference (`prefers-color-scheme`).

CSS variables or explicit selectors in `style.css` switch colors based on `[data-theme]`.

## Key JavaScript Patterns (`assets/js/app.js`)

The single JS file (no modules) handles:

- **Theme toggle:** `toggleTheme()` → sets `data-theme`, saves to localStorage, updates button SVG
- **Language toggle:** `toggleLang()` → sets `data-lang`, updates `lang` attribute, saves to localStorage
- **Custom cursor:** Two-layer cursor (dot + ring) with easing, disabled if `prefers-reduced-motion` or no fine pointer
- **Page transition:** Animated curtain on page load (fade/reveal effect)
- **Scroll reveal:** Elements fade in as they enter viewport (respect motion preference)
- **Parallax:** Background layers shift on scroll
- **Magnetic hover:** Elements on work list follow the cursor on hover (data-magnetic attribute)
- **Live clock:** Shows São Paulo time in footer (updated every second)
- **Work preview:** Hover on work list items to show SVG preview

**Important:** Motion-based features check `window.matchMedia('(prefers-reduced-motion: reduce)')` and disable animations if the user prefers reduced motion.

## SEO Infrastructure (Recently Added)

The site was SEO-optimized in April 2026. All pages now include:

- **Canonical tags:** Each page points to its own canonical URL on neybarao.github.io
- **Meta tags:** `meta description` (with specific lengths), `author`, `robots: index, follow`
- **Open Graph:** `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`, `og:locale: pt_BR`
- **Twitter Card:** `twitter:card: summary_large_image`, title, description, image
- **Hreflang:** `<link rel="alternate" hreflang="pt-BR">` and `hreflang="x-default"` (both point to same URL since no /en/ path exists)
- **JSON-LD structured data:**
  - **index.html:** `Person` schema with jobTitle, description, address, sameAs (LinkedIn, Dribbble), email, knowsAbout
  - **Work pages:** `BreadcrumbList` + `CreativeWork` schema in `@graph`

### OG Images (Still Needed)

The manifest references OG images that must be created and placed in `assets/img/`:

- `og-default.png` (1200×630) — homepage
- `og-mtr-app.png`, `og-al5-bank.png`, `og-cook-mate.png`, `og-senac.png` (1200×630 each) — per-case studies

Also needed: `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png` for PWA.

Until these PNGs exist, OG meta tags point to non-existent URLs. Create a placeholder or skip OG image implementation until design assets are ready.

### Sitemap & Robots

- `robots.txt` → allows all crawlers, points to `sitemap.xml`
- `sitemap.xml` → lists all 5 pages with priorities (index: 1.0, work pages: 0.8)

Update `lastmod` dates in sitemap.xml when content changes. Submit the sitemap to Google Search Console after each deploy.

## Styling

`assets/css/style.css` is a single monolithic stylesheet with vanilla CSS (no preprocessor). Uses CSS custom properties (variables) for theme colors and responsive design via `clamp()` for fluid typography and spacing.

**No Tailwind, no CSS-in-JS, no PostCSS.**

## Meta Information

- **Git repository:** GitHub Pages (master branch is live)
- **No Node modules, no package.json, no dependencies**
- **Hostname:** https://neybarao.github.io
- **Contact:** hello@neybarao.com
- **Location:** Campo Grande, MS, Brazil

## Common Tasks

### Add a new case study page

1. Create `work/{slug}.html` following the structure of existing work pages
2. Include all `<head>` meta tags (canonical, OG, Twitter, JSON-LD with BreadcrumbList)
3. Add bilingual content using `<span data-lang="pt">` and `<span data-lang="en">` pairs
4. Add the case to `sitemap.xml`
5. Update the work list on `index.html` with a new `<li>` entry

### Update meta descriptions or OG content

Edit the corresponding HTML file's `<head>`. All meta tags are manually maintained (no generation step).

### Validate changes before deploy

- **OG tags:** https://developers.facebook.com/tools/debug/ (paste URL)
- **JSON-LD:** https://validator.schema.org/ (paste HTML snippet)
- **Rich results:** https://search.google.com/test/rich-results (paste HTML)
- **Sitemap:** Ensure all page URLs in `sitemap.xml` are valid and match canonical tags

## Important Notes

- **No transpilation:** Use vanilla JavaScript. The site targets modern browsers (ES6+).
- **No external frameworks:** Keep it lightweight. Avoid jQuery, React, Vue, etc.
- **Preserve accessibility:** `aria-label`, `aria-hidden`, proper heading hierarchy (h1 → h2 → h3 → h4).
- **Motion-sensitive features:** Always check `prefers-reduced-motion` before animating.
- **Bilingual consistency:** Keep PT and EN content in adjacent DOM nodes with `data-lang` attributes.
- **Theme awareness:** CSS should support both light and dark modes via `[data-theme]` selector.

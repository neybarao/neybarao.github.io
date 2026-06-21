# Portfolio Visual Direction & Layout

**Date:** 2026-06-21. **Branch:** `portfolio-redesign`. **Phase:** visual direction (pre-build).

## Reference

Adapt the structure of https://viper-template.framer.website/ (screenshots in `portfolio-novo/inspiration/`). Keep: clear structure, large full-bleed images, well-defined easy-to-consume sections, giant display type, animation and transitions. Drop: the colorful palette and the heavy agency "marker/®" styling, plus sections Ney has no content for (pricing, testimonials, blog, photography; FAQ optional later).

## Design system

### Color
Black and white with neutral grays. A single accent via `--accent` (value TBD by Ney), used sparingly: link hover, available-for-work dot, section numbers and small markers. Define light and dark themes with CSS tokens.

### Typography (Google Fonts)
- **Anek Latin** (variable): display and large headings.
- **DM Sans**: body copy.
- **JetBrains Mono**: decorative text, tags, labels, section numbers.

### Spacing & layout
Generous whitespace; fluid scale with `clamp()`. Pill buttons, rounded image corners. Small uppercase mono labels on the left of sections, with numbering (01, 02, 03).

### Motion (GSAP, must stay light; honor `prefers-reduced-motion`)
Loading state on first load; page-transition curtain; scroll-reveal of sections; magnetic hover on work cards; subtle parallax on full-bleed images.

## Layout: Home
Hero (full-bleed portrait photo with "Ney Barão" in giant type overlaid, year marker) → About (large statement) → Approach (cards 01/02/03 from the 3 principles) → Selected Work (grid of 3 case cards: image, title, year, tags) → Experience (timeline) → Clients (logo row) → Contact / Footer (large email, social, available-for-work).

## Layout: Case
Full-bleed hero with title and tags → Overview (large centered intro) → My role → Process (alternating large image + text blocks: Research, Key findings, Design decisions, Testing) → Outcome & impact (large numbers, stats treatment) → Reflection → More work (grid) → Footer.

## Constraints (from project)
Static HTML/CSS/JS, no frameworks. Bilingual, EN primary (data-lang spans, localStorage). Light/dark theme. GA `GT-NC8B4S9P`. SEO + AI-crawler optimization (meta, OG, JSON-LD, sitemap, robots). GitHub Pages deploy via GitHub Actions. Built so new cases are easy to add. Human-only punctuation (no AI-tell characters).

## Open items
Accent color value, project durations/team specifics, hero portrait photo (Ney provides images).

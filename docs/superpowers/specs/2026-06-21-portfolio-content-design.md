# Portfolio Content, Design Spec

**Date:** 2026-06-21. **Branch:** `portfolio-redesign`. **Phase:** content only (no build/code yet).

## Goal

Refine the content of the live site (https://neybarao.com) into premium UX/UI portfolio copy that attracts recruiters and designers. Source content extracted to `portfolio-novo/conteudo.md`; original images in `portfolio-novo/imagens/` (keep untouched). Refined working content goes in `conteudo/`.

## Decisions

1. **Editing boundary:** Refine existing copy AND propose plausible additions, both marked `[sugestão]` for the user to validate. Never silently invent facts/metrics.
2. **Voice:** Confident & refined. Assured, direct, professional; focuses on business impact and design decisions; sophisticated but not cold.
3. **Case format:** Impact narrative (context, tension, decisions with rationale, outcome, reflection), not flat description.
4. **Language:** Bilingual, EN primary. Lock EN copy first (case by case); do a single PT translation pass once EN is approved.
5. **Sections:** Hero + About, Selected Work (case pages), Experience + Clients, and a new short **Approach / Process** section.
6. **Human writing:** Never use AI-tell characters (em-dash, smart quotes, arrows, decorative middot). Plain human punctuation only.

## Folder structure (`conteudo/`)

```
conteudo/
├── README.md            # voice/tone guide + content status
├── 00-home.md           # hero, about, approach, experience, clients, contact + SEO meta
├── _template-case.md    # template for new cases (requirement #6)
├── cases/               # EN: al5-bank, cook-mate, senac
└── pt/                  # PT mirror (00-home.md + cases/)
```

Each file carries frontmatter (title, meta description, slug, year, client, role, tags) to seed SEO and future page generation.

## Premium case template

| Section | Contents |
|---|---|
| Hook | One sentence stating the impact (above the fold) |
| Meta | Role, year, client, services, team, platform, duration |
| Overview | Context + the challenge (the tension) |
| My role [new] | The designer's specific contribution |
| Process | Research, findings, design decisions (with the why), iteration |
| Outcome & impact | Metrics + qualitative result |
| Reflection [new] | Learning / what I'd do differently |
| Visuals | Map of images referencing files in `portfolio-novo/imagens/` |

`[new]` sections and any proposed data are marked as suggestions.

## Confirmed data (from Ney)

- AL5 Bank: role Lead Designer (research + design direction); metrics 48% and 49% are percentages; ~2 years.
- Senac: role Lead Designer (research + design direction + design system); ~2 years.
- Open: team per case, Cook Mate duration, Reflection sections.

## Out of scope (this phase)

Build tooling, HTML/CSS/JS, GSAP, GitHub Actions, image production, all later. Project-wide requirements (GA `GT-NC8B4S9P`, SEO + AI-crawler optimization, minimalist refined aesthetic, loading state, micro-interactions, GitHub Pages via Actions) recorded in memory for the build phase.

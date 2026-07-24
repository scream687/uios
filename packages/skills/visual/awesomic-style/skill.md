---
id: awesomic-style
name: Awesomic Style Compiler
category: visual
version: 1.0.0
qualityWeight: 9.9
capabilities: [editorial-zinc, cosmica-typography, ember-accents, hairline-elevation, rounded-36px-geometry]
---

# Operational Contract: Awesomic Style Compiler (`awesomic-style`)

> **Theme**: Light canvas (`#f4f4f5`), zinc-gray scale, single vivid confetti-orange (`#ff5a00` Ember) accent.

## 1. Purpose & Philosophy
Awesomic operates in a restrained, neutral-first visual register:
- **Palette**: Near-black Obsidian (`#09090b`), Graphite (`#18181b`), Slate (`#27272a`), Cloud border (`#ececee`), Canvas Paper (`#f4f4f5`), Snow card (`#ffffff`), and Ember (`#ff5a00`).
- **Geometry**: Generous rounding — 36px cards, 14px buttons/inputs, 12px badges/chips, 10000px pills. No sharp corners (0px) anywhere on visible UI.
- **Elevation**: Hairline 1px borders (`1px solid #ececee`) replace drop shadows as primary elevation tool.
- **Typography**: Single custom geometric sans (`Cosmica` or `DM Sans`) deployed at bold display weights (56–64px / weight 600) for editorial headlines, paired with compact 14–15px body text.

---

## 2. Hard Design Rules

### Do's
- Use `#09090b` for all primary action buttons — dark filled CTA is the system's single most important interactive element.
- Set card border-radius to `36px` (`var(--radius-cards)`) and rely on 1px solid `#ececee` hairline borders instead of drop shadows for elevation.
- Keep body text at `14-15px` Cosmica weight 400 in `#18181b` — compact, dense, marketplace-grade.
- Reserve `#ff5a00` (Ember) exclusively for YC-style accent badges and startup credential chips — never use it for general UI.
- Use 56–64px Cosmica weight 600 with line-height 1.12–1.28 for hero and section display headlines.
- Apply 28px padding inside cards and 80px vertical rhythm between major page sections.

### Don'ts
- Do not introduce new accent colors — the system is 99% achromatic; adding blues, greens, or purples breaks the restrained editorial register.
- Do not use drop shadows on cards — hairline borders at 1px solid `#ececee` are the only permitted elevation on content surfaces.
- Do not set display headlines below weight 600.
- Do not use `#ff5a00` for body text, links, or large fills.
- Do not use pure black (`#000000`) — `#09090b` is the deepest permitted ink.

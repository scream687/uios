---
id: apple-style
name: Apple Style Compiler
category: visual
version: 1.0.0
qualityWeight: 9.9
capabilities: [apple-blue-action, sf-pro-tracking, full-bleed-heroes, dual-radius-system, shadowless-surface-shifts]
---

# Operational Contract: Apple Style Compiler (`apple-style`)

> **Theme**: Light frost canvas (`#f5f5f7`), white room with a single blue switch (`#0071e3`).

## 1. Purpose & Philosophy
Apple's design language is a study in restraint:
- **Palette**: Carbon near-black (`#1d1d1f`), Frost canvas (`#f5f5f7`), Apple Blue (`#0071e3` fill CTA), Link Blue (`#0066cc` outline border CTA), Signal Blue (`#2997ff` accent), Ice (`#f4f8fb` wash), Pebble (`#e2e2e5` fill).
- **Typography**: `SF Pro Display` (40px+) and `SF Pro Text`. Negative tracking tightens proportionally with size (-0.022em at 12px down to -0.016em at 17px body). Weight 300 for subheads, 400 for body, 600 for headlines (never 700 on product headlines).
- **Geometry**: Dual-radius system: 980px for buttons/pills; 8px for cards, images, and inputs.
- **Elevation**: Shadowless surface shifts (`#f5f5f7` $\rightarrow$ `#f4f8fb` $\rightarrow$ `#e2e2e5`) and hairline borders (`#d2d2d7`). Subtle shadow used exclusively on isolated product renders.

---

## 2. Hard Design Rules

### Do's
- Use `#0071e3` only for filled action buttons and active/selected states — one color, one job.
- Pair every filled blue button with an outlined blue secondary action (`1px solid #0066cc`).
- Set body text at 17px with -0.016em letter-spacing — negative tracking makes Apple type feel precise.
- Let product renders fill the full viewport width.
- Use 980px border-radius for interactive buttons and pills, 8px for cards and images.

### Don'ts
- Never use `#0071e3` for text, borders, or decoration — it is exclusively a button fill color.
- Never add drop shadows to cards, buttons, or nav.
- Never set headlines at 700 weight for product names — 600 is the maximum.
- Never mix the three blues in one interactive element — `#0071e3` is fill, `#0066cc` is outlined action, `#2997ff` is decorative.

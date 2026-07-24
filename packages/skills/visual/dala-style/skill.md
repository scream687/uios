---
id: dala-style
name: Dala Style Compiler
category: visual
version: 1.0.0
qualityWeight: 9.9
capabilities: [dark-void, electric-iris-accent, monolithic-typography, ultra-light-body, floating-layouts]
---

# Operational Contract: Dala Style Compiler (`dala-style`)

> **Theme**: Dark stage environment (`#000000` void canvas), Electric Iris (`#8052ff`) violet pill action, zero panels/cards/borders.

## 1. Purpose & Philosophy
Dala operates as a dark-stage environment where pure black voids meet a single vivid violet accent:
- **Palette**: Void black (`#000000`), Bone White (`#ffffff`), Ash Gray (`#9a9a9a`), Silver Mist (`#bdbdbd`), Electric Iris (`#8052ff`), Saffron Spark (`#ffb829`), Deep Verdant (`#15846e`).
- **Typography**: Single typeface (`PPNeueMontreal` or `Inter`). Display headlines at 78–113px carry weight 400 with -0.04em tracking. Ultra-light weight 200 for 18px body copy.
- **Layout & Surfaces**: Zero panels, zero cards, zero borders, zero drop shadows. Elements float on pure black space with whitespace alone.

---

## 2. Hard Design Rules

### Do's
- Use `#8052ff` (Electric Iris) exclusively for filled action buttons — no other saturated color should appear as a button background.
- Set every headline at weight 400, never bold — achieve hierarchy through scale (78–113px) and tracking (-0.04em).
- Use weight 200 (ultra-light) for 18px body text — this is Dala's signature signature.
- Maintain pure `#000000` black as every section background.

### Don'ts
- Do not introduce card containers with borders, shadows, or background fills — elements float on black with whitespace alone.
- Do not use filled violet for large background blocks.
- Do not set body text at weight 400.

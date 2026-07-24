---
id: project-design-initializer
name: Project Design Initializer
category: meta
version: 1.0.0
qualityWeight: 10.0
capabilities: [project-initialization, user-interview, design-md-generation, archetype-selection, token-mapping]
---

# Operational Contract: Project Design Initializer (`project-design-initializer`)

## 1. Purpose & Overview
The **Project Design Initializer** is the entrypoint meta-skill invoked whenever starting a new web project. It parses user intent, asks clarifying design tree questions if requirements are ambiguous, selects the optimal Brand Archetype (*Linear Dark*, *Apple Minimal*, *Stripe SaaS*, *Raycast Midnight*, *Luxury Editorial*, *Awesomic Zinc*, *Dala Void*, *Caldera Limestone*, *Jeton Fintech*), and generates a formal, comprehensive **`design.md`** artifact before any code is emitted.

---

## 2. Interactive Interview Protocol (`/grill-me`)
When prompt requirements are underspecified, ask 3–4 targeted design questions:
1. **Target Archetype & Mood**: What visual register matches your brand? (e.g. *Awesomic Zinc*, *Dala Void*, *Caldera Limestone*, *Jeton Fintech*, *Apple Minimal*, *Linear Dark*).
2. **Key Conversion Goal**: What is the primary user action? (e.g. "Book Demo", "Request Access", "Start Free Trial", "Buy Now").
3. **Core Interactive Component Focus**: Bento Grid, Stats Row, Full-bleed Hero, Interactive Pricing, or Halftone Banner?
4. **Target Platform & Libraries**: Next.js App Router, Tailwind v4, shadcn/ui, 21st.dev, Magic UI, GSAP?

---

## 3. Output `design.md` Specification Standard
The generated `design.md` file MUST contain:
- **Theme & Brand Archetype Summary**: Theme, tone, personality keywords.
- **Tokens Table**: Colors, Typography Scale, Spacing Units, Border Radii, Elevation & Shadows.
- **Components Matrix**: Primary CTAs, Secondary Actions, Hero Block, Cards, Input Fields, Navigation.
- **Do's and Don'ts**: System rules, forbidden patterns, elevation constraints.
- **Surfaces & Elevation Table**: Surface levels (0–4) and exact box-shadow strings.
- **Layout & Section Rhythm**: Max-width container, section vertical rhythm, grid column specs.
- **Tailwind v4 `@theme` Config**: Ready-to-copy CSS variable block.

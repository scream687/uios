---
name: anti-slop-frontend
description: Anti-slop frontend skill for landing pages, portfolios, and redesigns. Reads the brief, sets the 3 dials, infers design system, and eliminates AI defaults.
---

# Anti-Slop Frontend Skill

> **Core Purpose**: Eliminate generic AI-generated templates ("AI-purple gradients", "3 equal cards", "Inter + slate-900", "generic glassmorphism") and ship bespoke, production-grade landing pages.

---

## 0. BRIEF INFERENCE & ONE-LINE DESIGN READ

Before generating code or selecting components:
1. **Infer Page Kind**: Landing (SaaS / consumer / agency), portfolio (dev / designer), redesign (preserve vs overhaul).
2. **Infer Vibe Words**: "minimalist", "calm", "Linear-style", "Awwwards", "brutalist", "premium consumer", "Apple-y", "editorial".
3. **Infer Audience**: B2B procurement vs design-conscious consumer.
4. **Emit One-Line Design Read**:
   > *"Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system family>."*

---

## 1. THE THREE DIALS

Set global execution dials before layout synthesis:

| Dial | Range | Default | Purpose |
| :--- | :--- | :--- | :--- |
| **`DESIGN_VARIANCE`** | 1 to 10 | **8** | 1 = Perfect Symmetry, 10 = Artsy Chaos |
| **`MOTION_INTENSITY`** | 1 to 10 | **6** | 1 = Static, 10 = Cinematic / Physics |
| **`VISUAL_DENSITY`** | 1 to 10 | **4** | 1 = Art Gallery / Airy, 10 = Cockpit Data |

---

## 2. ANTI-DEFAULT DISCIPLINE (REJECT LLM TELLS)

Unconditionally reject the 5 AI tells:
1. ❌ **AI-Purple Gradients** (`indigo-600` to `purple-600` mesh headers).
   - **Fix**: Use HSL volcanic obsidian (`#0A0A0B`) or vermilion (`#FF4500`).
2. ❌ **Three Equal Feature Cards Grid Tell**.
   - **Fix**: Break symmetry into 1 dominant hero monolith card + 2 asymmetric detail tiles.
3. ❌ **Inter + Slate-900 Default Combination**.
   - **Fix**: Pair high-contrast Serif display headlines (Playfair Display, Bodoni) with -0.03em tracking.
4. ❌ **Generic Glassmorphism everywhere**.
   - **Fix**: Reserve subtle border noise and backdrop filters for floating navigation or dialog overlays only.
5. ❌ **Centered Hero over Dark Mesh with 2 Buttons**.
   - **Fix**: Use asymmetric hero layout with 80vh+ occupancy.

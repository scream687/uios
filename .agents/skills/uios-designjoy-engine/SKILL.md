---
name: uios-designjoy-engine
description: UIOS v2 DesignJoy Compiler Skill for executing Taste Intelligence, Framer Motion animations, BrandDNA synthesis, and high-converting product subscription landing pages.
---

# UIOS v2 DesignJoy Compiler Engine Skill

## Overview
This skill provides the full-stack compiler runtime for creating world-class, React-based, Framer Motion powered landing pages inspired by **DesignJoy.co**'s subscription agency model.

---

## 🎨 Visual DNA & Design Rules
1. **Canvas & Palette**:
   - Primary Canvas: Pitch Black `#080808` / `#000000`
   - Elevation Surfaces: Elevated Dark Slate `#131315` with 1px hairline borders (`border-white/10` or `border-white/15`)
   - Primary Accent CTA: Electric Neon Lime `#e2ff00` with high-contrast pitch black text (`#080808`)
   - Status Badge: Emerald Green `#10b981` with pulse dot indicator
2. **Typography Hierarchy**:
   - Primary Headlines: ExtraBold `-0.045em` letter-spacing, tight `0.98` line-height
   - Subtitles & Emphasized Words: Saans / Figtree / Playfair Serif Italic font mix
   - Micro Badges: Monospaced uppercase uppercase tracking (`font-mono text-xs`)
3. **Motion Physics (`framer-motion`)**:
   - Spring Easing Curve: `cubic-bezier(0.16, 1, 0.3, 1)`
   - Hover Elevation: `y: -6`, 3D Card Tilt (`rotateX: 2, rotateY: -2`)
   - Infinite Marquees: Dual-row horizontal scrolling marquees (`animate={{ x: ['0%', '-50%'] }}`)

---

## 🛠️ Required Compiler Pipeline Steps
1. **Taste Intelligence Audit**: Run anti-slop rules to remove decorative blur blobs, generic icon boxes, and uncurated gradients.
2. **Design AST Construction**: Construct 6-node AST tree (Hero, Marquee, 3-Step Grid, Live Queue Simulator, Pricing, FAQ).
3. **Design IR Optimization**: Resolve layout flex grids, responsive breakpoints (mobile, tablet, desktop), and Framer Motion spring parameters.
4. **Code Emission**: Emit production-grade Next.js App Router TSX with zero broken placeholders.

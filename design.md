# EstateLink Design System & Architecture Specification (`design.md`)

> **Compiler Core**: UIOS v2 (Design Intelligence Operating System)  
> **Skill Runtime**: `uios-designjoy-engine` (`.agents/skills/uios-designjoy-engine/SKILL.md`)  
> **Reference Architecture**: DesignJoy.co Subscription Model  
> **Target Application**: EstateLink Real Estate Presentation OS (`apps/studio/src/app/estatelink/page.tsx`)  

---

## 1. Executive Summary & Design Vision

EstateLink is a modern, high-converting product presentation platform designed for luxury real estate developers, brokers, and sales teams. Inspired by the iconic subscription model of **DesignJoy.co**, EstateLink replaces fragmented PDF attachments, static brochure emails, and multi-url MLS messages with a single dynamic, trackable visual presentation link.

---

## 2. Visual DNA & Token Specification

### Color Tokens
- **Background (Canvas)**: `#080808` (Pitch Black Obsidian)
- **Elevation Surfaces**: `#131315` (Dark Elevated Slate)
- **Primary Accent CTA**: `#e2ff00` (Electric Neon Lime)
- **Accent Text/Foreground**: `#080808` (Pitch Black on Lime CTA)
- **Status Indicator**: `#10b981` (Emerald Green Active Pulse)
- **Hairline Borders**: `rgba(255, 255, 255, 0.12)` (1px Subtle Divider)
- **Card Highlight Glow**: `rgba(226, 255, 0, 0.25)`

### Typography Hierarchy
- **Hero Display Header**: 72px / 88px, ExtraBold (`font-extrabold`), tight tracking (`-0.045em`), leading (`1.02`)
- **Serif Italic Emphasis**: Font serif italic (`font-serif italic font-normal text-[#e2ff00]`)
- **Section Headers**: 48px / 56px, ExtraBold (`font-extrabold text-white`)
- **Body Copy**: 16px / 18px, Medium (`font-normal text-gray-400`), line-height `1.6`
- **Badges & Micro Copy**: 11px / 12px, Monospaced uppercase (`font-mono text-xs uppercase tracking-wider`)

### Motion & Physics Specification (`framer-motion`)
- **Primary Curve**: `cubic-bezier(0.16, 1, 0.3, 1)` (Spring physics curve)
- **Hover Lift**: `y: -6px` elevation with subtle 3D card tilt (`rotateX: 2deg, rotateY: -2deg`)
- **Infinite Marquee**: Dual-row linear infinite scroll (`duration: 25s / 28s`, `ease: 'linear'`)
- **Queue Addition**: `AnimatePresence` with `initial={{ opacity: 0, y: -20 }}` to `animate={{ opacity: 1, y: 0 }}`
- **Accordion Expansion**: `AnimatePresence` height transition (`initial={{ height: 0 }} animate={{ height: 'auto' }}`)

---

## 3. UIOS v2 Compiler Pipeline Integration

```
                         UIOS v2 COMPILER FLOW
                                   │
 ┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
 │ TASTE ENGINE    │ ──> │ DESIGN AST / IR  │ ──> │ 10 LLVM PASSES   │
 └─────────────────┘     └──────────────────┘     └──────────────────┘
                                                           │
 ┌─────────────────┐     ┌──────────────────┐              ▼
 │ NEXT.JS EMITTER │ <── │ 8 CRITIC BOARD   │ <── ┌──────────────────┐
 └─────────────────┘     └──────────────────┘     │ SKILL RUNTIME    │
                                                  └──────────────────┘
```

1. **Taste Intelligence Engine (TIE)**:
   - Audits visual output for anti-slop rules: zero uncurated blur blobs, zero generic icon boxes, strict HSL palette rationing.
2. **Design AST**:
   - Constructs normalized AST nodes for Hero, Marquee, 3-Step Grid, Live Queue Simulator, Pricing Matrix, FAQ Accordion, and Booking Modal.
3. **Design IR**:
   - Resolves responsive breakpoints (375px mobile, 768px tablet, 1440px desktop), flex layouts, and Framer Motion spring values.
4. **10 LLVM Compiler Passes**:
   - Intent Resolution, Brand Injection, AST Construction, Layout Optimization, Typography Optimization, Motion Planning, Accessibility, Performance, Critic Review, Multi-Target Emission.
5. **7 Design Contracts**:
   - Enforces explicit bounds on Layout, Typography, Spacing, Motion, Interaction, Accessibility (WCAG AAA), and Performance (< 1.6ms GPU budget).
6. **8-Persona Critic Board**:
   - Automated review by Visual Critic, UX Architect, A11y Expert, Motion Designer, Performance Engineer, Brand Reviewer, Frontend Architect, and Design Critic.

---

## 4. Component Structure & Page Architecture

### `apps/studio/src/app/estatelink/page.tsx`
- **Header**: Sticky glassmorphic bar with animated logo (`EL`), navigation links, and action buttons.
- **Hero Section**: Framer Motion staggered entrance, live status badge, and hover 3D tilt member card mockup.
- **Infinite Marquee Carousels**: Continuous scrolling service pill rows moving in opposing directions.
- **3-Step How-It-Works Grid**: 1. Subscribe $\rightarrow$ 2. Request $\rightarrow$ 3. Receive.
- **Interactive Trello Request Queue Simulator**: Live state management for submitting, queuing, and tracking real estate render requests.
- **DesignJoy Signature Pricing Section**: Monthly ($4,995/mo) vs Quarterly ($3,995/mo) interactive toggle with "Pause or cancel anytime" guarantee.
- **Motion FAQ Accordion**: Smooth height expansion powered by `AnimatePresence`.
- **Booking Modal**: Framer Motion popup for scheduling intro calls.

---

## 5. Verification & Build Confirmation

- **Build Tool**: Next.js 14 App Router + Tailwind CSS + Framer Motion
- **Compilation Command**: `npm run build`
- **Status**: 0 Errors, static prerendered page at `/estatelink`
- **GitHub Repository**: [https://github.com/scream687/uios](https://github.com/scream687/uios)

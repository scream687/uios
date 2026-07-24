# UIOS v2: Design Intelligence Operating System 🎨⚙️

> **The Modular, Compiler-Centric Design Intelligence Operating System for Modern Web Applications.**

[![UIOS Compiler](https://img.shields.io/badge/UIOS_Compiler-v2.4.0-e2ff00?style=for-the-badge&logo=codefactor&logoColor=black)](https://github.com/scream687/uios)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19_RSC-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.8-purple?style=for-the-badge&logo=framer)](https://framer.com/motion)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🌟 What is UIOS?

**UIOS (UI Operating System)** is an autonomous, compiler-driven frontend architecture system. Instead of treating UI code as disposable hand-written templates or simple AI generation, UIOS parses design intent, reference URLs, and visual benchmarks into formal **Design AST (Abstract Syntax Tree)** and **Design IR (Intermediate Representation)** nodes.

It then passes the representation through **10 LLVM Compiler Passes**, audits it against an **8-Persona Impeccable Critic Board**, enforces **7 Executable Design Contracts**, and emits zero-slop production React / Next.js / Vue / Svelte codebases.

---

## 🏗️ UIOS v2 Architecture

```
                               UIOS OPERATING SYSTEM

┌─────────────────────────────────────────────────────────────────────────┐
│                            EXPERIENCE LAYER                             │
│       UIOS Studio • CLI • SDK • API • Figma Integration • MCP           │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                             RUNTIME KERNEL                              │
│       Skill Scheduler • Agent Runtime • Cache • Task Graph              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                            COMPILER ENGINE                              │
│       Spec Parser ➔ AST ➔ IR ➔ 10 LLVM Passes ➔ Emitter Plugins         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                             KNOWLEDGE LAYER                             │
│       BrandDNA Store • UX Laws • Design Graph • 37 Visual Archetypes    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                             LEARNING LAYER                              │
│       Taste Intelligence Engine (TIE) • Evolution Pipeline              │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Built-In Live Showcase Applications

UIOS includes three production-grade demonstration applications built inside `@uios/studio`:

### 1. ⚡ EstateLink (`/estatelink`)
- **Architecture**: React 19 RSC & Framer Motion powered DesignJoy-inspired single-link presentation platform.
- **Key Features**:
  - Dual-row continuous horizontal infinite pill marquees.
  - Interactive Trello Request Queue Simulator (`AnimatePresence`).
  - Monthly vs Quarterly billing switch ($4,995/mo vs $3,995/mo).
  - Motion-driven FAQ accordions and intro booking modal.

### 2. 🏢 EstateJoy (`/real-estate-designjoy`)
- **Architecture**: Pure **`DesignJoy Subscription`** Design Archetype (`#080808` canvas, `#e2ff00` neon lime accents, `#131315` cards).
- **Key Features**:
  - 3-Step "Subscribe $\rightarrow$ Request $\rightarrow$ Receive" card grid.
  - 6 Membership Benefits Cards with hover micro-animations.
  - 48-Hour delivery guarantees with 75% refund safety net.

### 3. 🏙️ Aetheris AI Real Estate SaaS (`/real-estate-saas`)
- **Architecture**: Luxury property bento grid with live interactive valuation calculator.
- **Key Features**:
  - Property filters (Aspen, Miami, Austin, Dallas).
  - Real-time ROI and rental yield calculator.
  - Integrated 4K architectural property renders.

---

## 🛠️ Repository Topology

```
uios/
├── apps/
│   └── studio/               # Next.js 14 App Router Studio Workbench & Demos
├── packages/
│   ├── compiler/             # UIOS v2 Compiler, TIE Engine, 10 LLVM Passes
│   ├── engine/               # Runtime Kernel & Skill Scheduler
│   ├── skills/               # Skill Runtime Implementations
│   ├── critics/              # 8-Persona Impeccable Critic Board
│   ├── knowledge/            # BrandDNA Memory & Design Primitives
│   └── adapters/             # Emitter Adapters (React, Vue, Webflow, HTML)
├── .agents/
│   └── skills/
│       └── uios-designjoy-engine/ # Workspace SKILL.md Runtime Definition
├── design.md                 # Master Design Architecture Specification
├── master_design_systems_matrix.md # 37 Visual Archetype DNA Matrix
└── README.md                 # Repository Overview & Quick Start
```

---

## ⚡ Quick Start & Local Setup

### Prerequisite
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Launch

```bash
# 1. Clone the repository
git clone https://github.com/scream687/uios.git
cd uios

# 2. Install workspace dependencies
npm install

# 3. Start UIOS Studio Dev Server
cd apps/studio
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser:
- 🎛️ **UIOS Studio Compiler**: [http://localhost:3000](http://localhost:3000)
- ⚡ **EstateLink Motion Demo**: [http://localhost:3000/estatelink](http://localhost:3000/estatelink)
- 🏢 **EstateJoy Subscription Site**: [http://localhost:3000/real-estate-designjoy](http://localhost:3000/real-estate-designjoy)
- 🏙️ **Aetheris Real Estate SaaS**: [http://localhost:3000/real-estate-saas](http://localhost:3000/real-estate-saas)

---

## 🧪 Verification & Testing

UIOS includes automated test suites covering all compiler passes, TIE engines, and 37 visual design archetypes:

```bash
# Run UIOS Compiler Unit Tests (11 Test Suites)
cd packages/compiler
node --test test/compiler.test.ts

# Build Next.js Production App
cd apps/studio
npm run build
```

---

## 📑 37 Visual DNA Archetypes Matrix

UIOS natively synthesizes 37 visual archetypes, including:
- `Philippe Starck Constructivist`
- `Ampera Industrial Freight`
- `Artify AI Obsidian`
- `Botanical Margarita Editorial`
- `Travelish Sanctuary Minimal`
- `DesignJoy Subscription`
- *See full matrix in [master_design_systems_matrix.md](master_design_systems_matrix.md)*

---

## 📄 License

This repository is released under the **MIT License**.

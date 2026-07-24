# 01_PRODUCT_PRD: UIOS Product Requirements Document

> **The Canonical Source of Truth for UIOS (UI Operating System)**

---

## Chapter 1: Vision

UIOS is the world’s first **Design Intelligence Operating System**. It unifies research, visual identity, layout optimization, accessibility auditing, and code emission into a single deterministic compiler runtime.

---

## Chapter 2: Problem

Building modern web applications suffers from three fundamental bottlenecks:
1. **Design-to-Code Decay**: High-fidelity Figma designs lose spacing, typography tracking, and responsive intent during manual implementation.
2. **Visual Slop in AI Tools**: Generic LLM code generators produce uncurated gradients, cramped padding, missing focus indicators, and non-semantic DOM trees.
3. **Absence of Constraints**: Existing tools lack formal quantitative verification gates to ensure code satisfies WCAG AAA contrast, GPU frame budgets, or responsive layout contracts.

---

## Chapter 3: Why Existing AI Tools Fail

| Tool | Core Mechanism | Failure Mode / Limitation |
|---|---|---|
| **Cursor** | LLM Code Editing | Lacks visual awareness; hallucinates unverified CSS classes and inconsistent spacing |
| **Lovable / Bolt** | Full-Stack Prompting | Produces generic AI slop layouts with heavy reliance on boilerplate components |
| **v0 by Vercel** | Prompt-to-JSX Generation | Excellent single-component drafts, but lacks global BrandDNA memory and multi-page contract validation |
| **Impeccable** | Design Skill Rules | Static guideline prompts without an AST parser or automated remediation pipeline |
| **Taste Skill** | Aesthetic Heuristics | Provides visual rules but lacks deterministic compiler passes or post-emission verification |
| **UI UX Pro Max** | Expanded Guidelines | Great reference checklists, but operates as prompt text rather than an executable compiler kernel |

---

## Chapter 4: UIOS Philosophy

1. **Design as Code Compilation**: UI generation is treated as parsing (`AST`), transforming (`IR`), optimizing (`Passes`), and emitting (`Adapters`).
2. **Contract-Driven Development**: No component is emitted unless it passes quantitative Design Contracts.
3. **Automated Critic Remediation**: Human-in-the-loop review is accelerated via an 8-persona automated critic board.
4. **Taste Intelligence Engine**: Aesthetics are versioned, measurable, and back-tested against reference benchmarks.

---

## Chapter 5: One Execution Pipeline

```
  User Request / URL Reference
             │
             ▼
      Research Engine (Extract DNA & Benchmarks)
             │
             ▼
        BrandDNA Injection (Colors, Spacing, Typography)
             │
             ▼
      Design Execution Plan (DEP & Component Graph)
             │
             ▼
       Design AST Construction (AST Nodes)
             │
             ▼
     Design IR Transformation (Layout & Responsive Token Resolution)
             │
             ▼
       10 LLVM Compiler Passes (Optimization & A11y)
             │
             ▼
       8-Persona Critic Board (Auto-Repair Violations)
             │
             ▼
   Post-Emission Validator (Visual, A11y, GPU Budget)
             │
             ▼
       Multi-Target Code Emitter (React 19 / TSX / Tailwind)
             │
             ▼
       Production Application Build
```

---

## Chapter 6: Module Architecture

1. **Planner**: Computes Design Execution Plans (DEP) and component dependency trees.
2. **Compiler**: Owns `DesignAST`, `DesignIR`, 10 LLVM Passes, and code emitter adapters.
3. **Runtime Kernel**: Manages skill scheduling, task graph execution, and caching.
4. **Knowledge Engine**: Manages BrandDNA store, UX laws, and 37 Visual Design Archetypes.
5. **Learning Engine (TIE)**: Extracts features, version-controls taste, and runs evolution pipelines.
6. **Critic Board**: 8 specialist personas (`Visual`, `UX`, `A11y`, `Motion`, `Performance`, `Brand`, `Architect`, `Critic`).
7. **Studio**: Web-based Next.js 14 orchestration dashboard & workbench.
8. **SDK**: Node.js & TypeScript programmatic API (`@uios/sdk`).
9. **CLI**: Terminal interface for command-line compilation (`uios build`, `uios audit`).

---

## Chapter 7: Package Directory

| Package Name | Purpose | Key Inputs | Key Outputs | Core Dependencies |
|---|---|---|---|---|
| `@uios/compiler` | Core AST/IR parsing & passes | Design Spec JSON | Design AST, Design IR, TSX Code | Zod, TypeScript |
| `@uios/engine` | Execution kernel & task scheduling | Task Graph | Executed Kernel State | RxJS / Async Graph |
| `@uios/critics` | 8-Persona review & auto-repair | Design AST Node | Critic Report, Remediated AST | `@uios/compiler` |
| `@uios/knowledge`| BrandDNA memory & archetypes | Archetype Identifier | BrandDNA Token Object | None |
| `@uios/skills` | Skill runtime & marketplace | Skill Manifest | Registered Skill Execution | `@uios/engine` |
| `@uios/adapters` | Multi-target code emitters | Design IR Node | React, Next.js, Vue, Svelte | Prettier, Babel Generator |

---

## Chapter 8: Core Schema & File Specifications

### 1. `brand.dna.json`
```json
{
  "archetype": "DesignJoy Subscription",
  "colors": {
    "background": "#080808",
    "foreground": "#ffffff",
    "card": "#131315",
    "primary": "#e2ff00",
    "accent": "#10b981",
    "border": "rgba(255,255,255,0.12)"
  },
  "typography": {
    "headingFont": "Figtree, sans-serif",
    "heroSize": "88px",
    "tracking": "-0.045em",
    "lineHeight": "0.98"
  }
}
```

### 2. `project.spec.json`
```json
{
  "projectName": "EstateLink",
  "targetFramework": "next14-app-router",
  "styling": "tailwind-v3",
  "motion": "framer-motion-v11",
  "components": ["HeroSection", "BentoGrid", "PricingMatrix", "FAQAccordion"]
}
```

### 3. `design.ast.json`
```json
{
  "id": "root-ast",
  "metadata": {
    "componentType": "PageContainer",
    "variant": "Obsidian",
    "layout": { "display": "flex", "flexDir": "column", "gap": "gap-12" }
  },
  "children": []
}
```

### 4. `design.ir.json`
```json
{
  "id": "root-ir",
  "kind": "container",
  "targetStyle": {
    "background": "#080808",
    "color": "#ffffff",
    "padding": "144px 32px"
  },
  "behaviorAttributes": {
    "role": "main",
    "gpuBudgetMs": 1.6
  }
}
```

---

## Chapter 9: Technology Stack Choices

- **Runtime**: Node 22 LTS (High-performance V8 engine with built-in test runner)
- **Language**: TypeScript 5.3+ (Strict null checks and exact optional property types)
- **Package Manager**: `pnpm` workspace monorepo
- **Build System**: Turborepo for cached multi-package builds
- **UI Framework**: React 19 RSC & Next.js 14 App Router
- **Validation**: Zod schema validation for all AST/IR JSON nodes
- **State & API**: tRPC for type-safe API boundaries
- **Database & Persistence**: Prisma ORM with PostgreSQL / SQLite
- **Future Native Compiler**: Rust (planned for high-throughput WASM IR passes)
- **Testing**: Node Native Test Runner & Playwright visual regression
- **Code Quality**: Biome for 10x faster linting and formatting

---

## Chapter 10: Repository Structure

```
uios/
├── apps/
│   └── studio/                   # Next.js App Router Studio Workbench
├── packages/
│   ├── compiler/                 # AST, IR, Passes, Token Engine
│   ├── engine/                   # Task Graph Kernel & Runtime
│   ├── critics/                  # 8-Persona Critic Board & autoFix()
│   ├── knowledge/                # BrandDNA Store & 37 Archetypes
│   ├── skills/                   # Skill Runtime Engine
│   └── adapters/                 # Emitters (React, Vue, Svelte, HTML)
├── docs/                         # 26 Canonical Specifications
├── design.md                     # Master Design Specification
├── master_design_systems_matrix.md # 37 Visual Archetypes Matrix
└── README.md                     # Proof-driven overview
```

---

## Chapter 11: Compiler Lifecycle

```
[Spec Parser] ➔ [AST Builder] ➔ [IR Transformer] ➔ [10 LLVM Passes] ➔ [Critic Repair] ➔ [Validation] ➔ [Code Emitter]
```

1. **Pass 1: Intent Resolution**: Resolves user goals into functional component requirements.
2. **Pass 2: Brand Injection**: Binds BrandDNA color and typography tokens to CSS variables.
3. **Pass 3: AST Construction**: Builds hierarchical component tree.
4. **Pass 4: Layout Optimization**: Calculates responsive grid constraints and spacing rhythm.
5. **Pass 5: Typography Optimization**: Enforces letter-spacing tracking (`-0.045em`) and line-height.
6. **Pass 6: Motion Planning**: Schedules Framer Motion spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`).
7. **Pass 7: Accessibility Optimization**: Injects ARIA attributes and validates WCAG AAA contrast.
8. **Pass 8: Performance Budgeting**: Guarantees GPU draw budget `< 1.6ms` per frame.
9. **Pass 9: Critic Board Gate**: Audits node against 8 specialist personas and auto-fixes errors.
10. **Pass 10: Multi-Target Emission**: Generates framework-idiomatic React/TSX code.

---

## Chapter 12: Research Engine

The Research Engine analyzes visual references (URLs, screenshots, design systems like DesignJoy, Behance, Dribbble) and extracts structural features:
- **Color Palette Extraction**: Tailored HSL color rationing.
- **Typography Scale**: Header-to-body size ratios.
- **Motion Physics**: Transition duration and spring dampening.

---

## Chapter 13: Knowledge Engine

Stores immutable UX laws, design principles, and 37 Visual Archetypes:
- **UX Laws**: Fitts's Law, Hick's Law, Miller's Law, Jakob's Law.
- **Visual Archetypes**: `DesignJoy Subscription`, `Philippe Starck Constructivist`, `Ampera Industrial Freight`, `Artify AI Obsidian`, `Botanical Margarita Editorial`, `Travelish Sanctuary Minimal`.

---

## Chapter 14: Critic Board Specification

| Critic Persona | Core Responsibility | Pass Threshold | Repair Action |
|---|---|---|---|
| **Visual Critic** | Palette rationing & border styling | 95 / 100 | Re-rations background contrast |
| **UX Architect** | Layout flow & content hierarchy | 95 / 100 | Re-orders DOM nodes logically |
| **Accessibility Expert** | Contrast ratios & ARIA attributes | 98 / 100 | Injects focus rings & `aria-label` |
| **Motion Designer** | Spring physics & transition curves | 92 / 100 | Adjusts spring stiffness & duration |
| **Performance Engineer** | GPU render load & DOM node count | 95 / 100 | Enforces lazy-loading & image bounds |
| **Brand Reviewer** | BrandDNA token adherence | 95 / 100 | Re-injects official brand variables |
| **Frontend Architect** | React RSC & Tailwind utility hygiene | 98 / 100 | Normalizes utility class order |
| **Design Critic** | Anti-slop layout rules | 96 / 100 | Removes decorative blur blobs |

---

## Chapter 15: Validation Layer

- **Visual Validation**: Pixel-matching against design spec.
- **Accessibility Validation**: Automated axe-core WCAG AAA compliance checks.
- **Performance Budget**: Lighthouse CLS score `0.0`, LCP `< 1.2s`, GPU draw `< 1.6ms`.
- **Responsive Validation**: Verified at 375px (Mobile), 768px (Tablet), and 1440px (Desktop).

---

## Chapter 16: Studio Workbench

UIOS Studio (`apps/studio`) provides a visual orchestration workbench:
- Real-time live preview of compiled components.
- Interactive AST & IR inspector.
- Critic Board audit score dashboard.
- One-click export to Next.js or React codebases.

---

## Chapter 17: CLI Tool

The `@uios/cli` package allows command-line compilation:
```bash
# Compile design spec to React
uios compile --spec project.spec.json --target react --out ./components

# Audit existing project for visual slop & accessibility
uios audit --dir ./src --repair
```

---

## Chapter 18: SDK Programmatic API

```typescript
import { UIOSCompiler } from '@uios/compiler';

const compiler = new UIOSCompiler();
const result = await compiler.compile({
  spec: './project.spec.json',
  archetype: 'DesignJoy Subscription',
  target: 'next14-tsx',
});

console.log(result.emittedCode);
```

---

## Chapter 19: Plugin System

Developers can extend UIOS by creating custom Emitter Adapters or Compiler Passes:

```typescript
export interface UIOSPlugin {
  name: string;
  version: string;
  passes?: CompilerPass[];
  emitters?: Record<string, CodeEmitter>;
}
```

---

## Chapter 20: Roadmap

- **v1.0 (Current)**: UIOS v2 Layered Operating System, 37 Visual Archetypes, 10 LLVM Passes, 8-Persona Critic Board, Next.js 14 App Router Emitter.
- **v2.0 (Q3 2026)**: Native Rust IR Pass Optimization Engine (WASM build for sub-10ms compile times), Figma REST API direct importer.
- **v3.0 (Q1 2027)**: Universal Design Agent Network with automated visual regression back-testing against 10,000 top web applications.

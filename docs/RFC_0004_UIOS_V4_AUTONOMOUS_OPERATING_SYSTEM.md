# RFC-0004: UIOS v4 — Autonomous Multi-Agent Design Operating System Specification

> **Status**: APPROVED & ADOPTED  
> **Authors**: UIOS Core Architecture Team  
> **Target Version**: UIOS v4.0.0  
> **Date**: July 25, 2026  

---

## 1. Executive Summary

UIOS v4 transitions the system from a code generator into an **Autonomous Multi-Agent Design Operating System**.

Instead of a single deterministic compilation pass, UIOS v4 executes a **17-Phase Multi-Agent Execution Lifecycle** with multi-candidate generation, Playwright rendering observations, multi-dimensional observer audits, targeted micro-artifact repairs, pairwise tournament elimination, and abstract Taste Memory decay.

---

## 🏗️ 2. The 17-Phase Execution Architecture

```
                                      UIOS v4 EXECUTION LIFECYCLE
                                                   │
 ┌─────────────────────────────────────────────────┴─────────────────────────────────────────────────┐
 ▼                                                                                                   ▼
[STRICT IMMUTABLE DAG: PHASES 0 - 11]                                            [EVENT-DRIVEN STATE MACHINE: PHASES 12 - 15]
 ├── Phase 0: Session Initialization (Execution ID, EventBus, Artifact Graph)     ├── Phase 12: Observer Agents (Structural, Visual, Saliency, Motion)
 ├── Phase 1: Intent Understanding (Goal, Domain, Constraints)                    ├── Phase 13: Critic Council (Observer Score Compilation)
 ├── Phase 2: Project Genesis (Framework, Folder Structure, Stack)                 ├── Phase 14: Repair Engine (Targeted Sub-Artifact Mutation & Micro-Pass)
 ├── Phase 3: MCP Discovery (Component & Pattern Packages)                         └── Phase 15: Tournament Selection (Pairwise Matchups & Blind Tie-Breaker)
 ├── Phase 4: Plugin Resolution (Figma, GSAP, Playwright Hooks)                                      │
 ├── Phase 5: Skills Marketplace (Capability Priority Resolution)                                    ▼
 ├── Phase 6: Creative Council (Creative, Experience, Art, Motion Directors)     [LEARNING & DELIVERY: PHASES 16 - 17]
 ├── Phase 7: Research Layer (Industry Benchmark Extraction)                      ├── Phase 16: Taste Memory (Abstract Pattern Decay & Storage)
 ├── Phase 8: Planning (site.blueprint.json, scene.graph.json)                    └── Phase 17: Delivery (Export Next.js, Assets, Docs, Storybook)
 ├── Phase 9: Candidate Generator (4 Archetype Candidates)
 ├── Phase 10: Candidate Compiler
 └── Phase 11: Render Pipeline (Playwright Chromium Viewport Snapshots)
```

---

## 🛠️ 3. Core Engine Mechanics & Architectural Invariants

### 3.1 Hybrid Execution Kernel
- **Phases 0–11**: Strict immutable DAG execution ensuring byte-for-byte reproducibility of candidate ASTs and rendered screenshots.
- **Phases 12–15**: Event-driven state machine allowing targeted repair loops without invalidating intact upstream layers.

### 3.2 Targeted Sub-Artifact Mutation & Incremental Micro-Compilers (Phase 14)
- When an observer flags a failing dimension (e.g., Motion score 76 or Accessibility score 85), the Repair Engine **freezes all intact sub-artifacts** (`layout.json`, `content.json`, `style.json`).
- It mutates **only the specific failing sub-artifact** (`motion.json` or `accessibility.json`) and executes a light-weight **incremental micro-compilation pass**, avoiding full candidate regeneration.

### 3.3 Dual-Score Tournament Selection Engine (Phase 15)
- Eliminates candidates pairwise ($A \text{ vs } B \rightarrow \text{Winner} \text{ vs } C \rightarrow \text{Winner} \text{ vs } D$).
- Compares composite observer scores. If $\Delta < 5\text{ pts}$, triggers a **blind LLM design judge pairwise evaluation** to break ties based on visual tension and brand alignment.

### 3.4 Manifest-Driven MCP Package Resolution (Phase 3)
- MCP packages declare `mcp-manifest.json` defining supported capabilities, design tokens, components, and motion curves.
- `CapabilityRegistry` dynamically maps MCP components to Creative Directors & Skills.

---

## 🧪 4. Implementation Verification Plan

```bash
cd packages/compiler
npx tsc && node --test test/compiler.test.ts test/vertical_slice.test.ts test/chaos.test.ts test/scene.test.ts test/taste.test.ts test/evidence.test.ts test/visual_analyzer.test.ts test/semantic_saliency.test.ts test/laboratory.test.ts
```

All 34 test suites MUST pass cleanly.

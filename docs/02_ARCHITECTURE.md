# 02_ARCHITECTURE: UIOS Architecture Specification

## 1. Executive Summary

UIOS is an **Artifact-Driven, Graph-Scheduled Design Intelligence Operating System**. It decouples system specifications from implementation code, ensuring that the specification remains invariant whether implemented in TypeScript, Rust, or C++.

Rather than relying on single-shot LLM text generation, UIOS executes an incremental, artifact-graph-scheduled pipeline governed by the **Artifact Dependency Engine** (similar to Bazel / LLVM / Turborepo).

---

## 2. Complete Execution Lifecycle

```
User Prompt
    │
    ▼
[01. Intent Engine] ➔ Classifies domain, product type, business model, & complexity
    │
    ▼
[02. Project Genesis] ➔ Acts as Product Manager; infers ICP, SEO, IA, & emits 16 Docs
    │
    ▼
[03. Workspace Builder] ➔ Constructs document graph & dependency manifest
    │
    ▼
[04. Discovery Research] ➔ Analyzes competitors, reference URLs, & visual patterns
    │
    ▼
[05. Skill Council] ➔ Multi-phase consultant skills review docs & write knowledge JSON
    │
    ▼
[06. Knowledge Graph] ➔ Decoupled, graph-linked memory nodes (Project, Brand, Pages, Features)
    │
    ▼
[07. Iterative Planner] ➔ Generates Blueprint v1 ➔ Audited by Planner Critics ➔ Repaired
    │
    ▼
[08. Validation Research] ➔ Validates Blueprint against competitor patterns before compile
    │
    ▼
[09. Approved Blueprint v2] ➔ Final, contract-locked structural site plan
    │
    ▼
[10. Compiler Core] ➔ Parses Blueprint into Design AST & transforms to Design IR
    │
    ▼
[11. Optimization Passes] ➔ Runs layout, typography (-0.045em), motion, & A11y passes
    │
    ▼
[12. Critic Board Gate] ➔ 8 Specialist Personas audit AST tree
    │
    ▼
[13. Repair Engine] ➔ Mechanical autoFix() mutates failing AST properties to 100% pass
    │
    ▼
[14. Multi-Stage Validation] ➔ Stage 1 (Design), Stage 2 (AST), Stage 3 (Generated Code)
    │
    ▼
[15. Code Generation] ➔ Emits framework-idiomatic React 19 RSC / Next.js 14 TSX
    │
    ▼
[16. Artifact Graph Update] ➔ Incremental Engine updates dependency graph for fast reruns
    │
    ▼
[17. Learning Engine] ➔ Updates taste memory and records accepted/rejected variants
```

---

## 3. Subsystem Specifications

### 1. Intent Engine
- **Responsibility**: Classifies user prompts before any document or workspace creation.
- **Output**: Intent Classification Payload (Domain: `real-estate`, Type: `subscription-platform`, Complexity: `high-editorial`).

### 2. Project Genesis (Product Manager Agent)
- **Responsibility**: Infers ICP, business goals, information architecture, CMS needs, auth, and API requirements.
- **Output**: 16 Genesis Documents (`01_project.md` through `16_execution_plan.md`).

### 3. Skill Council (Consultant Model)
- **Responsibility**: Participates across multiple compilation phases (Document Review, Constraint Writing, Blueprint Review).
- **Output**: Domain-specific JSON knowledge rules (`luxury.design.json`, `editorial.rules.json`).

### 4. Two-Stage Research Engine
- **Discovery Research**: Pre-planning competitor & reference pattern extraction.
- **Validation Research**: Post-planning validation to prevent over-fitting or IA mistakes.

### 5. Knowledge Graph
- **Responsibility**: Replaces monolithic `MASTER_CONTEXT.json` with a graph of linked nodes. Each component engine loads *only* the specific nodes it requires.

### 6. Artifact Dependency Engine (Incremental Scheduler)
- **Responsibility**: Tracks artifact modification timestamps and dependency edges (`depends_on`, `produces`, `consumed_by`).
- **Behavior**: When an artifact like `04_brand.md` changes, the engine recalculates the diff graph and re-executes *only* affected downstream nodes.

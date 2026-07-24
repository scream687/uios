# 02_ARCHITECTURE: UIOS Architecture Specification

## 1. Executive Summary

UIOS is an **Artifact-Driven, Graph-Scheduled Design Intelligence Operating System**. It decouples system specifications from implementation code, ensuring that the specification remains invariant whether implemented in TypeScript, Rust, or C++.

Rather than relying on single-shot LLM text generation or rigid linear pipelines, UIOS operates as an **acyclic DAG operating system graph** managed by the **RuntimeKernel**, an **EventBus**, and an **Incremental Scheduler** (similar to Bazel / LLVM / Turborepo).

---

## 2. Core OS Architecture Pillars

```
                     Intent (Domain Classification)
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
   Project Genesis               Research Engine
   (Product Manager)             (Discovery & Validation)
         │                           │
         └─────────────┬─────────────┘
                       ▼
            Decoupled Knowledge Graph
               ╱       │       ╲
              ▼        ▼        ▼
       Skill Council Planner  Constraint Solver
              ╲        │        ╱
               └───────▼───────┘
            site.blueprint.json
                       │
                       ▼
                 Compiler Core
             (Design AST & IR)
                       │
                       ▼
              10 LLVM Passes
                       │
                       ▼
             Critics & Validation
                       │
                       ▼
            Multi-Target CodeGen
```

1. **SAT-Style Constraint Solver Engine (`ConstraintSolverEngine`)**:
   - Classifies design rules into **HARD** (WCAG AAA contrast 6.4:1, focus rings), **SOFT** (Section padding 144px, tracking `-0.045em`), and **PREFERENCES** (Serif accents).
   - Generates full decision provenance traces (`provenanceTrace`).

2. **Full OS Runtime Kernel (`RuntimeKernel`)**:
   - Owns `ArtifactStore`, `Scheduler`, `DependencyGraph`, `EventBus`, `Cache`, `EngineRegistry`, `ExecutionContext`, `Metrics`, and `Rollback`.

3. **Context-Aware Engine Protocol**:
   - `execute(input: I, context: ExecutionContext): Promise<O>` provides clean access to workspace, logger, eventBus, artifactStore, cache, cancellation tokens, and metrics.

4. **Immutable Artifacts & Decision Provenance**:
   - Artifacts are 100% immutable (`BaseArtifact`). Updates append versioned nodes (`brand.v1.json` $\rightarrow$ `brand.v2.json`) with cryptographic hashes and provenance chains (`provenance`).

5. **Event-Driven Subsystem Communication (`EventBus`)**:
   - Decoupled event bus emits events (`artifact:created`, `engine:stateChange`, `constraint:solved`) for real-time observability in Studio UI.

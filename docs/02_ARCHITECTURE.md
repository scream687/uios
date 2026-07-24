# 02_ARCHITECTURE: UIOS System Architecture Specification

## 1. System Overview

UIOS is structured into a 5-layer operating system stack:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. EXPERIENCE LAYER                                         │
│    Studio • CLI • SDK • API • Figma Importer • MCP Server    │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 2. RUNTIME KERNEL                                           │
│    Skill Scheduler • Agent Runtime • Task Graph • Cache     │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 3. COMPILER CORE                                            │
│    AST Parser • IR Transformer • 10 Passes • Emitters       │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 4. KNOWLEDGE LAYER                                          │
│    BrandDNA Store • UX Laws • 37 Visual Archetypes          │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 5. LEARNING LAYER                                           │
│    Taste Intelligence Engine • Trend Engine • Memory        │
└─────────────────────────────────────────────────────────────┘
```

## 2. Layer Responsibilities

- **Experience Layer**: User interfaces (Studio App, CLI, SDK, API) for interacting with UIOS.
- **Runtime Kernel**: Asynchronous task graph execution, skill resolution, and dependency scheduling.
- **Compiler Core**: Core deterministic transformations (`Spec` $\rightarrow$ `AST` $\rightarrow$ `IR` $\rightarrow$ `Passes` $\rightarrow$ `TSX`).
- **Knowledge Layer**: Static rules, UX laws, and synthesized design tokens.
- **Learning Layer**: Continuous feedback loop, memory store, and taste versioning (`v1.3.0`).

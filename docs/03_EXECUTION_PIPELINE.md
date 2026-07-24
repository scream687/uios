# 03_EXECUTION_PIPELINE: UIOS 17-Step Execution Pipeline

## 1. Pipeline Overview

UIOS executes a deterministic, 17-step pipeline where every phase consumes explicit, version-controlled artifacts from the Artifact Dependency Engine:

```
[01. Intent Engine] ➔ [02. Genesis] ➔ [03. Workspace Builder] ➔ [04. Discovery Research]
                                                                          │
[08. Validation Research] ◄── [07. Iterative Planner] ◄── [06. Knowledge Graph] ◄── [05. Skill Council]
          │
          ▼
[09. Blueprint v2] ➔ [10. Compiler Core] ➔ [11. Optimization Passes] ➔ [12. Critic Board Gate]
                                                                                  │
[17. Learning] ◄── [16. Artifact Update] ◄── [15. CodeGen] ◄── [14. Validation] ◄── [13. Repair Engine]
```

---

## 2. Phase-by-Phase Contracts

| Phase | Input | Output | Subsystem Owner |
|---|---|---|---|
| **01. Intent Engine** | User Prompt | `intent.json` | Intent Classification Agent |
| **02. Project Genesis** | `intent.json` | 16 Markdown Docs (`workspace/docs/`) | Project Manager Agent |
| **03. Workspace Builder** | `workspace/docs/` | `WORKSPACE_GRAPH.json` | Workspace Graph Engine |
| **04. Discovery Research**| `04_brand.md`, Reference URLs | `competitors.md`, `patterns.json` | Discovery Research Agent |
| **05. Skill Council** | Docs + Research | Knowledge JSON Rules | Skill Council Consultants |
| **06. Knowledge Graph** | Docs + Knowledge + Research | `KnowledgeGraph` Nodes | Knowledge Aggregator |
| **07. Iterative Planner** | Knowledge Graph | `Blueprint v1` ➔ `Blueprint v2` | Planner Agent & Planner Critics |
| **08. Validation Research**| `Blueprint v2` | `research_validation.json` | Validation Research Agent |
| **09. Approved Blueprint**| Repaired Blueprint | `SITE_BLUEPRINT.md` | Blueprint Contract Lock |
| **10. Compiler Core** | `SITE_BLUEPRINT.md` | `DesignASTNode` & `DesignIRNode` | UIOS Compiler Frontend |
| **11. Optimization Passes**| AST / IR Nodes | Optimized IR | 10 LLVM Passes |
| **12. Critic Board Gate** | AST Node | Critic Report | 8 Specialist Personas |
| **13. Repair Engine** | AST Node + Critic Report | Remediated AST | Mechanical `autoFix()` Engine |
| **14. Multi-Stage Validation**| AST / Emitted Code | Validation Report | 3-Stage Validator |
| **15. Code Generation** | Validated IR | React 19 / Next.js 14 TSX | Emitter Adapters |
| **16. Artifact Update** | Build Manifest | Updated `WORKSPACE_GRAPH.json` | Incremental Build Engine |
| **17. Learning Engine** | Compilation Session | Updated `DesignMemory` | Taste Intelligence Engine |

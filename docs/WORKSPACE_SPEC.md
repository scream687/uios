# WORKSPACE_SPEC: On-Disk Workspace Layout & Caching Specification

> **Purpose**: Defines on-disk directory layout, cache invalidation, artifact versioning, and workspace lifecycle.

---

## 1. Canonical Workspace Directory Topology

```
workspace/
├── intent.json                       # Intent Engine classification output
├── docs/                             # Project Genesis 16 Markdown Documents
│   ├── 01_project.md
│   ├── 02_vision.md
│   ├── 03_business.md
│   ├── 04_brand.md
│   ├── 05_personas.md
│   ├── 06_user_journeys.md
│   ├── 07_features.md
│   ├── 08_pages.md
│   ├── 09_design_goals.md
│   ├── 10_content_strategy.md
│   ├── 11_seo.md
│   ├── 12_accessibility.md
│   ├── 13_motion.md
│   ├── 14_tech_stack.md
│   ├── 15_constraints.md
│   └── 16_execution_plan.md
├── knowledge/                        # Skill Council Rules JSON Artifacts
│   ├── luxury.design.json
│   ├── editorial.rules.json
│   ├── motion.rules.json
│   └── wcag.rules.json
├── research/                         # Discovery & Validation Research Outputs
│   ├── competitors.md
│   ├── patterns.json
│   └── blueprint_validation.json
├── knowledge_graph.json              # Relationship Index Node Graph
├── site.blueprint.json               # Machine-readable Site Blueprint AST
├── blueprint.ast.json                # Parsed Structural Blueprint AST
├── design.ast.json                   # Compiler Abstract Syntax Tree
├── design.ir.json                    # Compiler Intermediate Representation
├── critic.report.json                # Critic Board Audit Scores
├── contracts.report.json             # Multi-Stage Validation Report
├── WORKSPACE_GRAPH.json              # Artifact Dependency Graph Scheduler Manifest
└── .cache/                           # Local Hash & AST Compilation Caches
    ├── hashes.json
    └── ast_cache/
```

---

## 2. Workspace Lifecycle States

1. **UNINITIALIZED**: Empty directory state.
2. **INTENT_CLASSIFIED**: `intent.json` created by Intent Engine.
3. **GENESIS_COMPLETE**: 16 Genesis Documents written into `workspace/docs/`.
4. **KNOWLEDGE_INDEXED**: Skill JSON rules and Knowledge Graph constructed.
5. **BLUEPRINT_LOCKED**: `site.blueprint.json` (v2) verified and contract-locked.
6. **COMPILED**: `design.ast.json` and `design.ir.json` emitted and validated.
7. **EMITTED**: Production TSX code generated and written to local application targets.

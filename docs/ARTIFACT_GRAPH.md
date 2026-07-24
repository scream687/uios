# ARTIFACT_GRAPH: Incremental Build & Scheduler Specification

> **Purpose**: Defines the Artifact Dependency Graph, incremental scheduler rules, cache invalidation, and rebuild behavior (modeled after Bazel, Nx, and Turborepo).

---

## 1. Incremental Scheduler Architecture

```
User Edit / File Modification (e.g., brand.md)
                      │
                      ▼
        [Incremental Scheduler Engine]
                      │
                      ▼
        Query Artifact Dependency Graph
                      │
  ┌───────────────────┴───────────────────┐
  ▼                                       ▼
Unaffected Subtrees (Cached)      Affected Subtrees (Rerun)
• 01_project.md                   • brand.dna.json
• 05_personas.md                  • Luxury Skill Consultant
• 11_seo.md                       • Typography Skill Consultant
                                  • Planner Engine (site.blueprint.json)
                                  • Compiler Core ➔ CodeGen
```

---

## 2. Artifact Dependency Rules

Every artifact in UIOS registers a node contract in `WORKSPACE_GRAPH.json`:

```json
{
  "id": "brand_doc",
  "path": "workspace/docs/04_brand.md",
  "version": 2,
  "owner": "Brand Discovery Agent",
  "dependsOn": ["intent_spec", "project_doc"],
  "produces": ["brand_dna_json"],
  "consumedBy": ["LuxurySkill", "TypographySkill", "PlannerEngine"],
  "contentHash": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
}
```

---

## 3. Rebuild Decision Algorithm

When a file `$FILE` is updated:
1. `contentHash = sha256($FILE)`
2. Compare `contentHash` against node entry in `WORKSPACE_GRAPH.json`.
3. If unchanged $\rightarrow$ **NO-OP (Skip Execution)**.
4. If changed $\rightarrow$ Mark `$FILE` as `DIRTY`.
5. Perform **Topological Breadth-First Search (BFS)** across `consumedBy` targets.
6. Re-execute only nodes marked `DIRTY` in topological order.

# 21_PROJECT_STRUCTURE: UIOS System Architecture Directory Topology

## 1. Specification Topology

```
uios/
├── workspace/
│   ├── docs/                         # Phase 2: 16 Genesis Documents
│   ├── knowledge/                    # Phase 5: Knowledge Rules written by Skill Council
│   ├── research/                     # Phase 4 & 8: Discovery & Validation Research
│   ├── MASTER_CONTEXT.json           # Knowledge Graph Aggregation Node
│   ├── SITE_BLUEPRINT.md             # Approved Site Blueprint
│   └── WORKSPACE_GRAPH.json          # Artifact Dependency Engine Scheduler Manifest
├── docs/                             # 26 Canonical System Specification Documents
└── apps/                             # Testing Studio & Production Showcase Apps
```

---

## 2. Artifact Dependency Graph Manifest (`WORKSPACE_GRAPH.json`)

```json
{
  "system": "UIOS Artifact Dependency Engine",
  "version": "2.4.0",
  "nodes": [
    {
      "path": "workspace/docs/04_brand.md",
      "owner": "Brand Discovery Agent",
      "depends_on": ["workspace/docs/01_project.md", "workspace/docs/02_vision.md"],
      "produces": ["workspace/knowledge/luxury.design.json", "workspace/knowledge/editorial.rules.json"],
      "consumed_by": ["Luxury Skill", "Editorial Skill", "Swiss Skill", "Typography Skill", "Compiler Planner"]
    },
    {
      "path": "workspace/knowledge/luxury.design.json",
      "owner": "Luxury Skill Consultant",
      "depends_on": ["workspace/docs/04_brand.md"],
      "produces": ["workspace/MASTER_CONTEXT.json"],
      "consumed_by": ["Knowledge Graph Engine"]
    }
  ]
}
```

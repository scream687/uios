# 21_PROJECT_STRUCTURE: UIOS Workspace Directory Structure

```
uios/
├── apps/
│   └── studio/
│       └── src/app/
│           ├── page.tsx                  # Studio Workbench
│           ├── estatelink/page.tsx       # EstateLink Motion Platform
│           ├── real-estate-designjoy/    # DesignJoy Subscription Site
│           └── real-estate-saas/         # Aetheris SaaS Demo
├── packages/
│   ├── compiler/                         # Core AST, IR, Passes
│   ├── engine/                           # Task Graph Kernel
│   ├── critics/                          # 8-Persona Critic Board
│   ├── knowledge/                        # BrandDNA Store
│   ├── skills/                           # Skill Runtime
│   └── adapters/                         # Multi-Target Emitters
├── docs/                                 # 26 Canonical Specifications
├── .agents/skills/                       # Workspace Skill Definitions
├── design.md                             # Master Design Architecture
├── master_design_systems_matrix.md       # 37 Visual Archetypes Matrix
└── README.md                             # Capability-First Proof Overview
```

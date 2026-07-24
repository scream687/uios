# ENGINE_SPEC: Formal Engine Contracts Specification

> **Purpose**: Defines formal input/output contracts, schemas, owners, downstream consumers, and failure modes for all 17 system engines.

---

## 1. Engine Contracts Matrix

### Engine 01: Intent Engine
- **Consumes**: `user.prompt`, `reference.urls`, `attachments`
- **Produces**: `workspace/intent.json`
- **Schema**: `IntentSchema`
- **Owner**: Intent Classification Agent
- **Consumers**: Project Genesis Agent
- **Failure Mode**: Fallback to default `marketing-site` intent payload if prompt is ambiguous.

---

### Engine 02: Project Genesis Agent (Product Manager)
- **Consumes**: `workspace/intent.json` (*Never reads raw prompts*)
- **Produces**: 16 Genesis Documents (`workspace/docs/*.md`)
- **Schema**: `GenesisDocsManifest`
- **Owner**: Product Manager Agent
- **Consumers**: Skill Council, Discovery Research Agent, Workspace Builder

---

### Engine 03: Workspace Builder
- **Consumes**: `workspace/docs/*.md`
- **Produces**: `workspace/WORKSPACE_GRAPH.json`
- **Schema**: `WorkspaceGraphSchema`
- **Owner**: Workspace Graph Engine
- **Consumers**: Incremental Scheduler Engine

---

### Engine 04: Discovery Research Agent
- **Consumes**: `workspace/docs/04_brand.md`, `reference.urls`
- **Produces**: `workspace/research/competitors.md`, `workspace/research/patterns.json`
- **Schema**: `ResearchDiscoverySchema`
- **Owner**: Discovery Research Agent
- **Consumers**: Skill Council, Knowledge Graph Engine

---

### Engine 05: Skill Council
- **Consumes**: `workspace/docs/*.md`, `workspace/research/patterns.json`
- **Produces**: `workspace/knowledge/*.rules.json` (`luxury.design.json`, `editorial.rules.json`)
- **Schema**: `SkillKnowledgeRulesSchema`
- **Owner**: Skill Council Consultants
- **Consumers**: Knowledge Graph Engine

---

### Engine 06: Knowledge Graph Engine
- **Consumes**: `workspace/docs/*.md`, `workspace/knowledge/*.rules.json`, `workspace/research/*.json`
- **Produces**: `workspace/knowledge_graph.json` (Relationship Index)
- **Schema**: `KnowledgeGraphSchema` (Nodes & Edges Index)
- **Owner**: Knowledge Graph Aggregator
- **Consumers**: Planner Engine

---

### Engine 07: Iterative Planner Engine
- **Consumes**: `workspace/knowledge_graph.json`
- **Produces**: `workspace/site.blueprint.json` (v1 & v2)
- **Schema**: `SiteBlueprintSchema`
- **Owner**: Planner Agent
- **Consumers**: Validation Research Agent, Blueprint Parser Engine

---

### Engine 08: Validation Research Agent
- **Consumes**: `workspace/site.blueprint.json` (v1)
- **Produces**: `workspace/research/blueprint_validation.json`
- **Schema**: `BlueprintValidationSchema`
- **Owner**: Validation Research Agent
- **Consumers**: Iterative Planner Engine (Triggers Repair Loop to v2)

---

### Engine 09: Blueprint Parser Engine
- **Consumes**: `workspace/site.blueprint.json` (v2) (*Never reads markdown prose*)
- **Produces**: `workspace/blueprint.ast.json`
- **Schema**: `BlueprintASTSchema`
- **Owner**: Blueprint Parser Engine
- **Consumers**: UIOS Compiler Core

---

### Engine 10: UIOS Compiler Core
- **Consumes**: `workspace/blueprint.ast.json`
- **Produces**: `DesignASTNode` & `DesignIRNode`
- **Schema**: `DesignASTSchema` & `DesignIRSchema`
- **Owner**: Compiler Core
- **Consumers**: 10 LLVM Optimization Passes

---

### Engine 11: 10 LLVM Optimization Passes
- **Consumes**: `DesignASTNode` & `DesignIRNode`
- **Produces**: Optimized `DesignIRNode`
- **Schema**: `DesignIRSchema`
- **Owner**: Compiler Pass Scheduler
- **Consumers**: Critic Board Gate Engine

---

### Engine 12: Critic Board Gate Engine
- **Consumes**: `DesignASTNode` Tree
- **Produces**: `workspace/critic.report.json`
- **Schema**: `CriticReportSchema` (8 Specialist Personas)
- **Owner**: Impeccable Critic Board
- **Consumers**: Mechanical Repair Engine

---

### Engine 13: Mechanical Repair Engine (`autoFix`)
- **Consumes**: `DesignASTNode` & `workspace/critic.report.json`
- **Produces**: Remediated `DesignASTNode`
- **Schema**: `DesignASTSchema`
- **Owner**: Mechanical Repair Engine
- **Consumers**: Multi-Stage Contract Validator

---

### Engine 14: Multi-Stage Contract Validator
- **Consumes**: Remediated `DesignASTNode` & Emitted IR
- **Produces**: `workspace/contracts.report.json`
- **Schema**: `ContractValidationReportSchema`
- **Owner**: Contract Validator Engine
- **Consumers**: Code Generation Emitter

---

### Engine 15: Code Generation Emitter Adapters
- **Consumes**: Validated `DesignIRNode`
- **Produces**: Production React 19 RSC / Next.js 14 TSX Source Code
- **Schema**: `EmittedSourceCodeSchema`
- **Owner**: Emitter Adapters
- **Consumers**: Incremental Scheduler Engine, Local File System

---

### Engine 16: Incremental Scheduler Engine
- **Consumes**: Build Manifest & Dependency Graph
- **Produces**: Updated `WORKSPACE_GRAPH.json`
- **Schema**: `WorkspaceGraphSchema`
- **Owner**: Incremental Scheduler Engine
- **Consumers**: Experience Layer (Studio, CLI, SDK)

---

### Engine 17: Learning & Memory Engine (TIE)
- **Consumes**: Compilation Session Outcomes & Critic Feedback
- **Produces**: Updated `DesignMemory` Store (`packages/compiler/src/v2/v2-core.ts`)
- **Schema**: `TasteMemorySchema`
- **Owner**: Taste Intelligence Engine
- **Consumers**: BrandDNA Engine, Future Compilation Runs

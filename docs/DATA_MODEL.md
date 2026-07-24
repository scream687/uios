# DATA_MODEL: UIOS Canonical Data Model Specification

> **Purpose**: Defines every artifact, schema, ownership, lifecycle, versioning, mutability, and cache strategy across the UIOS operating system.

---

## 1. Core Data Model Principles

1. **Machine-First Schemas**: All pipeline state transitions operate on strictly typed JSON schemas validated by Zod.
2. **Artifact Immutability**: Emitted artifacts are immutable once written; modifications create versioned diff entries.
3. **Graph Registry Indexing**: The Knowledge Graph indexes relationships between artifacts without embedding raw document strings.

---

## 2. Artifact Directory & Lifecycle Matrix

| Artifact Path | Producer Engine | Consumer Engines | Mutability | Cache Strategy | Versioning |
|---|---|---|---|---|---|
| `workspace/intent.json` | Intent Engine | Project Genesis | Immutable | Content-Hash | SemVer |
| `workspace/docs/*.md` | Project Genesis | Skill Council, Planner | Mutable (Triggers Diff) | File-Mtime | Incremental |
| `workspace/knowledge/*.rules.json` | Skill Council | Knowledge Graph, Planner | Immutable | Content-Hash | SemVer |
| `workspace/research/*.json` | Research Engine | Knowledge Graph, Planner | Immutable | TTL 24h / Hash | SemVer |
| `workspace/knowledge_graph.json` | Knowledge Aggregator | Planner Engine | Mutable (Indexed) | Dynamic In-Memory | SemVer |
| `workspace/site.blueprint.json` | Planner Engine | Blueprint Parser, Compiler | Immutable | Content-Hash | SemVer |
| `workspace/blueprint.ast.json` | Blueprint Parser | Compiler Core | Immutable | Content-Hash | SemVer |
| `workspace/design.ast.json` | Compiler Core | 10 LLVM Passes, Critics | Mutable (Via Passes) | In-Memory AST | AST Rev |
| `workspace/design.ir.json` | Compiler Core | Emitter Adapters | Immutable | Content-Hash | IR Rev |
| `workspace/contracts.report.json` | Contract Validator | Repair Engine | Immutable | Content-Hash | Execution ID |
| `workspace/build.manifest.json` | Incremental Scheduler | Runtime Engine | Mutable (Registry) | Local Disk State | SemVer |

---

## 3. Machine Schema Definitions (TypeScript Interfaces)

### 1. `intent.json` Schema
```typescript
export interface IntentSchema {
  domain: 'real-estate' | 'saas' | 'ecommerce' | 'portfolio' | 'dashboard' | 'docs' | 'ai-product' | 'marketing-site';
  productType: string;
  businessModel: 'subscription' | 'lead-generation' | 'transactional' | 'freemium';
  complexity: 'low' | 'medium' | 'high' | 'high-editorial';
  confidence: number; // 0.0 - 1.0
  recommendedArchetypes: string[];
}
```

### 2. `site.blueprint.json` Schema
```typescript
export interface SiteBlueprintSchema {
  version: string;
  projectName: string;
  pages: Array<{
    route: string;
    pageName: string;
    layoutType: string;
    sections: Array<{
      id: string;
      componentType: string;
      contractBounds: {
        maxGpuMs: number;
        minContrastRatio: number;
        typographyTracking: string;
      };
      children: any[];
    }>;
  }>;
}
```

### 3. `artifact.manifest.json` Schema
```typescript
export interface ArtifactManifestNode {
  id: string;
  path: string;
  version: number;
  owner: string;
  dependsOn: string[];
  produces: string[];
  consumedBy: string[];
  contentHash: string;
  lastUpdated: string;
}
```

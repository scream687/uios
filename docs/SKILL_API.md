# SKILL_API: Capability-Driven Skill Registration & Hook Specification

> **Purpose**: Defines how skills register capabilities, hook into pipeline execution phases, consume workspace artifacts, and emit knowledge rules.

---

## 1. Skill Manifest Interface

Skills register via capability manifests rather than hardcoded plugin names:

```typescript
export interface UIOSSkillManifest {
  name: string;
  version: string;
  capabilities: Array<'typography' | 'spacing' | 'color' | 'motion' | 'editorial' | 'accessibility' | 'seo' | 'performance'>;
  requires: string[]; // e.g. ["workspace/docs/04_brand.md", "workspace/docs/01_project.md"]
  produces: string[]; // e.g. ["workspace/knowledge/luxury.design.json"]
  hooks: Array<'before-planning' | 'after-planning' | 'before-compiler' | 'critic-phase'>;
}
```

---

## 2. Capability Resolution Runtime

When an engine requires a specific capability (e.g. `typography` or `spacing`), the **Skill Runtime** queries registered skills by capability:

```typescript
export class SkillRuntime {
  private skills: Map<string, UIOSSkillManifest> = new Map();

  public getSkillsForCapability(capability: string): UIOSSkillManifest[] {
    return Array.from(this.skills.values()).filter(skill =>
      skill.capabilities.includes(capability as any)
    );
  }
}
```

---

## 3. Phase Hook Execution Matrix

| Hook Name | Execution Timing | Skill Responsibilities | Output Artifacts |
|---|---|---|---|
| `before-planning` | After Project Genesis | Review project docs, recommend constraints | `workspace/knowledge/*.rules.json` |
| `after-planning` | After Blueprint v1 | Audit blueprint layout & suggest references | `workspace/research/blueprint_validation.json` |
| `before-compiler` | Pre-AST Compilation | Inject specialized BrandDNA variables | Bound Design Tokens |
| `critic-phase` | Post-AST Compilation | Audit AST nodes against specialist persona standards | Critic Scores & Remediation Rules |

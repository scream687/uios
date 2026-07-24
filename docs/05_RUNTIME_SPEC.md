# 05_RUNTIME_SPEC: UIOS Runtime Kernel Specification

## 1. Runtime Kernel
The UIOS Runtime Kernel (`@uios/engine` and `@uios/skills`) manages task execution, skill dependency resolution, and runtime state caching.

## 2. Skill Runtime Engine
Skills are defined via `SkillManifest` structures and registered into `SkillRuntime`:
```typescript
export interface SkillManifest {
  name: string;
  requires: string[];
  produces: string[];
  supports: string[];
  version: string;
}
```
Skill runtime resolves dependencies deterministically without running redundant agent tasks.

# 03_EXECUTION_PIPELINE: UIOS Execution Pipeline

## 1. Single Execution Pipeline Architecture

UIOS executes an 11-step linear compilation pipeline:

```
[1. User Intent] ➔ [2. Research] ➔ [3. BrandDNA] ➔ [4. Planning] ➔ [5. AST] ➔ [6. IR] ➔ [7. Passes] ➔ [8. Critics] ➔ [9. Repair] ➔ [10. Validation] ➔ [11. Emit]
```

## 2. Phase Execution Contracts

1. **User Intent**: Parsed by `DesignSpecParser`.
2. **Research**: Analyzes URLs or archetype requirements via `ResearchEngine`.
3. **BrandDNA**: Injects visual tokens via `BrandDNAEngine`.
4. **Planning**: Computes Design Execution Plan (`DEP`).
5. **AST**: Constructs `DesignASTNode` hierarchy.
6. **IR**: Transforms AST to `DesignIRNode` layout and token representation.
7. **Passes**: Runs 10 LLVM compiler passes.
8. **Critics**: Audits node across 8 specialist personas.
9. **Repair**: `autoFix()` remediates failing contract violations.
10. **Validation**: Verifies post-emission visual regression and accessibility.
11. **Emit**: Generates framework code (React, Next.js, Vue).

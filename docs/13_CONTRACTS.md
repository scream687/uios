# 13_CONTRACTS: UIOS Design Contracts Specification

## 1. 7 Executable Design Contracts
Defined in `packages/compiler/src/v2/index.ts`:

```typescript
export interface ComponentContracts {
  layout: { sectionSpacingPx: number; maxWidthPx: number; gridColumns: number };
  accessibility: { role: string; focusable: boolean; minContrastRatio: number; ariaLabel?: string };
  motion: { durationMs: number; easing: string; staggerMs: number };
  spacing: { paddingY: string; gap: string };
  typography: { font: string; headingScale: string; tracking: string };
  performance: { maxGpuMs: number; lazyLoad: boolean };
  interaction: { onClick?: string; onHover?: string; onSubmit?: string };
}
```
No component is emitted unless all 7 contracts report `PASSED`.

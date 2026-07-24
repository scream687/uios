# 11_COMPILER_PASSES: UIOS LLVM Compiler Passes Specification

## 1. The 10 Compiler Passes
Implemented in `packages/compiler/src/v2/v2-core.ts`:

1. **Pass 1: Intent Resolution** — Identifies functional component requirements.
2. **Pass 2: Brand Injection** — Binds `BrandDNA` tokens to CSS variables.
3. **Pass 3: AST Construction** — Builds hierarchical node graph.
4. **Pass 4: Layout Optimization** — Calculates responsive grid columns and 144px vertical padding rhythm.
5. **Pass 5: Typography Optimization** — Enforces `-0.045em` display letter-spacing and tight line-heights.
6. **Pass 6: Motion Planning** — Schedules 250ms spring physics transitions.
7. **Pass 7: Accessibility Optimization** — Injects ARIA roles and visible focus indicators.
8. **Pass 8: Performance Budgeting** — Restricts GPU render load to `< 1.6ms`.
9. **Pass 9: Critic Board Gate** — Audits node across 8 specialist personas and auto-remediates flaws.
10. **Pass 10: Multi-Target Emission** — Emits clean React 19 RSC / TSX / Tailwind CSS code.

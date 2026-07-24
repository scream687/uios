---
id: layout-architect
name: Layout Architect
category: layout
version: 2.1.0
qualityWeight: 9.8
capabilities: [layout, grid-system, fluid-spacing, responsive-breakpoints, ast-mutation]
---

# Master Operational Contract: Layout Architect (`layout-architect`)

## 1. Purpose & Role
The **Layout Architect** is the primary structural compiler pass in DesignVM. It translates the information architecture produced by `page-planner` into strict 12-column grid layouts, container max-widths, fluid 8pt spacing scales, and responsive breakpoint mutations.

> [!CRITICAL]
> **AST-ONLY MUTATION RULE**: This skill NEVER generates raw React JSX, HTML strings, or CSS files. It receives a `DesignASTNode` tree and mutates node layout properties only. Emitters own code generation.

---

## 2. When to Invoke
- **Stage**: `layout` (Executes after `page-planner` and `brand-dna`, before `visual-designer` and `motion-director`).
- **Capability Requirements**: `layout`, `grid-system`, `fluid-spacing`, `responsive-breakpoints`.
- **Supported Task Types**: `landing-page`, `dashboard`, `crm`, `e-commerce`, `portfolio`.

---

## 3. Input & Output Contract

### Input Contract (`SkillContext`)
```ts
interface SkillInputContext {
  spec: DesignSpec;             // Formal user intent & brand archetype
  designAST: DesignAST;         // Raw screen AST tree from page-planner
  tokens: CompiledTokens;       // Synthesized brand CSS variables & radii
  constraints: ConstraintRules; // Non-negotiable bounds (maxFonts, maxRadius, spacingBase)
}
```

### Output Contract (`SkillDiagnostics`)
```ts
interface SkillDiagnostics {
  success: boolean;
  updatedNodes: number;
  warnings: string[];
  metrics: {
    gridComplianceScore: number; // 0 - 100
    spacingScaleScore: number;   // 0 - 100
    responsiveCoverageScore: number; // 0 - 100
  };
}
```

---

## 4. Hard Design Constraints (Non-Negotiable)

1. **Strict 8pt Spacing Scale**: All vertical section padding (`paddingY`) and element gaps (`gap`) MUST conform to multiples of 8pt ($8\text{px}$, $16\text{px}$, $24\text{px}$, $32\text{px}$, $48\text{px}$, $64\text{px}$, $96\text{px}$, $128\text{px}$).
2. **12-Column Grid Alignment**: Multi-column bento grids and metric card sections MUST sum to 12 grid units on desktop screens ($12$, $6+6$, $4+4+4$, $8+4$).
3. **Container Boundary Caps**:
   - Landing Page Section Containers: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
   - Hero Centered Text Containers: `max-w-4xl mx-auto`
   - Lead Paragraph Containers: `max-w-2xl mx-auto`
4. **Mobile Breakpoint Fallback**: All grid layouts MUST degrade to single column (`grid-cols-1`) on mobile viewports ($<640\text{px}$).

---

## 5. Synthesis Design Principles

### Borrowed from `impeccable` (Deterministic Layout Rules)
- Enforce explicit layout boundaries; zero implicit margins.
- Section vertical padding MUST follow rhythm: `py-20 md:py-32` for marketing, `py-8 md:py-12` for dashboards.

### Borrowed from `taste-skill` (Layout Elegance & Whitespace)
- High visual whitespace density: Avoid crowding elements; allow headlines $32\text{px}$ bottom margin before lead copy.
- Asymmetrical bento grid weighting ($8$-column main card + $4$-column side card) creates editorial dynamic balance.

### Borrowed from `ui-ux-pro-max` (Multi-Platform Awareness)
- Ensure all interactive grid items have minimum touch target bounding areas ($44\times 44\text{px}$).
- Apply fluid CSS clamp typography scaling for headlines: `clamp(2.5rem, 5vw, 4.5rem)`.

---

## 6. Preferred Library Matrix
| Task / Component | Preferred Library | Secondary Fallback | Composition Rule |
| --- | --- | --- | --- |
| **SaaS Bento Grid** | `21st.dev` | `Magic UI` | Use 21st.dev grid layout + Magic UI proximity border |
| **Dashboard Metrics** | `Origin UI` | `shadcn/ui` | Origin UI metric card container + shadcn badge |
| **Form Layouts** | `shadcn/ui` | `Radix UI` | Radix slot primitive + CVA flex spacing |

---

## 7. Anti-Pattern Detection (14 Smells Checked)
- **Whitespace Collapse**: Section padding $<48\text{px}$ on desktop viewports.
- **Uneven Rhythm**: Mixing arbitrary pixel padding ($13\text{px}$, $27\text{px}$) instead of 8pt grid scale.
- **Component Soup**: Nesting >4 un-styled layout wrapper divs without semantic landmark tags (`header`, `main`, `section`).

---

## 8. Quality & Audit Checklist
- [x] All section layout nodes carry `containerWidth`, `paddingY`, and `gap` metadata.
- [x] Grid column spans total exactly 12 columns on desktop viewports.
- [x] Responsive flex/grid fallback classes exist for mobile (`grid-cols-1 md:grid-cols-3`).
- [x] Zero hardcoded absolute pixel positioning (`top: 142px`).

---

## 9. Failure Conditions
Compilation fails and returns `success: false` if:
1. Grid column span total exceeds 12 units on a single row.
2. Spacing values violate the 8pt scale threshold.
3. Container width exceeds `max-w-7xl`.

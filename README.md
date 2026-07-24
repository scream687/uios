# UIOS: Design Intelligence Compiler for React & Web Applications

> **UIOS (UI Operating System)** is an open-source, compiler-driven engine for generating, auditing, and enforcing production-grade UI components in React, TypeScript, and Tailwind CSS.

---

## ⚡ What UIOS Does (Capabilities)

Rather than generating raw, unverified AI code, UIOS operates as a **design compiler**:

1. **Parses Design Specifications** into structured Abstract Syntax Trees (`DesignASTNode`).
2. **Transforms AST to Intermediate Representation** (`DesignIRNode`) to resolve tokens, responsive breakpoints, and motion curves.
3. **Enforces Design Contracts**: Validates components against explicit constraints (accessibility contrast, GPU budgets, layout rhythm).
4. **Auto-Remediates Violations**: An 8-persona critic board (`ImpeccableCriticBoard`) automatically catches and fixes accessibility and layout flaws before emission.
5. **Emits Clean Production Code**: Outputs React 19 / Next.js 14 TypeScript components.

---

## 🔬 The Compiler Pipeline (Proven in Code)

Here is a complete, working example of how UIOS transforms a design specification into verified React code.

### 1. Input Specification
```json
{
  "name": "SingleLinkCard",
  "archetype": "DesignJoy Subscription",
  "componentType": "HeroCard",
  "title": "Architectural Single Link",
  "accentColor": "#e2ff00"
}
```

### 2. Generated Design AST (`DesignASTNode`)
*Implementation: [`packages/compiler/src/ast/index.ts`](packages/compiler/src/ast/index.ts)*

```typescript
const astNode = new DesignASTNode('hero-card-1', 'SingleLinkCard', {
  componentType: 'HeroCard',
  variant: 'DesignJoy Subscription',
  layout: { display: 'flex', flexDir: 'column', gap: 'gap-6', paddingY: 'py-12' },
  style: { background: '#131315', border: '1px solid rgba(255,255,255,0.12)' },
  accessibility: { role: 'region', ariaLabel: 'Hero Link Card', keyboardFocusable: true },
});
```

### 3. Design IR Transformation (`DesignIRNode`)
*Implementation: [`packages/compiler/src/v2/index.ts`](packages/compiler/src/v2/index.ts)*

```typescript
// AST is transformed into target-agnostic IR
const irNode: DesignIRNode = {
  id: 'hero-card-1',
  kind: 'component',
  targetStyle: {
    background: '#131315',
    color: '#ffffff',
    padding: '48px',
    gap: '24px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
  },
  behaviorAttributes: {
    role: 'region',
    motionDurationMs: 250,
    motionEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  children: [],
};
```

### 4. Design Contract Enforcement & Auto-Repair
*Implementation: [`packages/critics/src/index.ts`](packages/critics/src/index.ts)*

When a node fails a Design Contract, the **Critic Board** automatically fixes the AST before emitting code:

```typescript
// Contract Check Example: Accessibility Focus State & Contrast Failure
const contractViolation = {
  contract: 'AccessibilityContract',
  status: 'FAILED',
  reason: 'Element missing interactive aria-label and visible focus ring',
};

// Automatic Remediation by ImpeccableCriticBoard:
const remediatedAST = criticBoard.autoFix(astNode);
// Injects: focus:ring-2 focus:ring-[#e2ff00] focus:ring-offset-2 aria-label="Hero Link Card"
```

### 5. Emitted Production React Component
*Implementation: [`packages/adapters/src/index.ts`](packages/adapters/src/index.ts)*

```tsx
// Output emitted by UIOS Compiler:
export function SingleLinkCard({ title }: { title: string }) {
  return (
    <div
      role="region"
      aria-label="Hero Link Card"
      className="bg-[#131315] border border-white/15 rounded-3xl p-8 space-y-6 focus:outline-none focus:ring-2 focus:ring-[#e2ff00] focus:ring-offset-2 focus:ring-offset-[#080808] transition-all"
    >
      <h3 className="text-3xl font-extrabold text-white tracking-[-0.045em] leading-[0.98]">{title}</h3>
      <button className="px-6 py-3 bg-[#e2ff00] text-[#080808] font-bold font-mono text-xs uppercase rounded-xl hover:bg-[#cbe600] transition-all">
        Explore Presentation
      </button>
    </div>
  );
}
```

---

## 📂 Repository Topology & Actual Implementation Proof

Unlike projects with empty skeleton folders, every package in UIOS contains verified, runnable TypeScript code:

```
uios/
├── packages/
│   ├── compiler/           # AST parser, IR transforms, 10 compiler passes
│   │   ├── src/ast/        # DesignAST & DesignASTNode definitions
│   │   ├── src/taste/      # Anti-slop layout rules & palette rationing
│   │   ├── src/memory/     # 37 Visual Archetype DNA definitions
│   │   └── src/v2/         # DesignIR, DesignContracts, Validation
│   ├── critics/            # 8-Persona Critic Board & autoFix() AST remediator
│   ├── engine/             # Execution kernel & skill scheduler
│   ├── skills/             # Skill runtime manager
│   ├── knowledge/          # BrandDNA memory store
│   └── adapters/           # Code generators (React, Vue, HTML)
└── apps/
    └── studio/             # Next.js 14 App Router testing studio & demos
```

---

## 🧠 Memory & Evolution Architecture

UIOS maintains a local memory store to track accepted vs. rejected code transformations across compilation runs:

- **Store Location**: [`packages/compiler/src/v2/v2-core.ts`](packages/compiler/src/v2/v2-core.ts#L50) (`DesignMemory`)
- **Session Tracking**: `recordSession(projectId, { acceptedVariant, rejectedVariant, feedback })`
- **Conflict Resolution**: Critic Board scores must exceed `90 / 100` before a design preference is saved to local memory.

---

## 💻 Quick Start & Running Tests

```bash
# 1. Clone repo
git clone https://github.com/scream687/uios.git
cd uios

# 2. Install workspace dependencies
npm install

# 3. Run Compiler Unit Tests (11 Test Suites)
cd packages/compiler
node --test test/compiler.test.ts

# 4. Start Local Studio Workbench
cd ../../apps/studio
npm run dev
```

---

## 🖥️ Test Demonstration Applications

UIOS includes test pages built to validate the compiler output:

- ⚡ **EstateLink Motion Platform**: [`/estatelink`](http://localhost:3000/estatelink) — React & Framer Motion subscription platform.
- 🏢 **EstateJoy Agency**: [`/real-estate-designjoy`](http://localhost:3000/real-estate-designjoy) — DesignJoy archetype implementation.
- 🏙️ **Aetheris SaaS**: [`/real-estate-saas`](http://localhost:3000/real-estate-saas) — Real estate analytics bento grid.

---

## 📄 License

MIT License.

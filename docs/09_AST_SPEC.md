# 09_AST_SPEC: UIOS Abstract Syntax Tree Specification

## 1. Node Schema (`DesignASTNode`)
Defined in `packages/compiler/src/ast/index.ts`:

```typescript
export class DesignASTNode {
  public id: string;
  public name: string;
  public metadata: {
    componentType: string;
    variant?: string;
    layout: { display: string; flexDir?: string; gap?: string; paddingY?: string };
    style?: Record<string, string>;
    accessibility: { role: string; ariaLabel?: string; keyboardFocusable?: boolean };
    motion?: { type: string; delayMs?: number; durationMs?: number };
  };
  public children: DesignASTNode[];
}
```

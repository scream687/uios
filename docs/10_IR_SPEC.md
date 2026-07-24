# 10_IR_SPEC: UIOS Design Intermediate Representation Specification

## 1. Node Schema (`DesignIRNode`)
Defined in `packages/compiler/src/v2/index.ts`:

```typescript
export interface DesignIRNode {
  id: string;
  kind: 'container' | 'element' | 'layout' | 'component';
  targetStyle: Record<string, string>;
  behaviorAttributes: Record<string, any>;
  children: DesignIRNode[];
}
```

## 2. AST-to-IR Transformation
`DesignIR.fromAST(ast)` maps semantic AST nodes into framework-agnostic IR nodes with calculated style properties and target behavior attributes.

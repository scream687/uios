# 16_PLUGIN_SYSTEM: UIOS Plugin System Specification

## 1. Overview
UIOS can be extended via custom compiler passes and code emitter plugins.

## 2. Plugin Interface
```typescript
export interface UIOSPlugin {
  name: string;
  version: string;
  passes?: Array<(ast: DesignAST) => DesignAST>;
  emitters?: Record<string, (ir: DesignIR) => string>;
}
```
Plugins are registered into the compiler pipeline before execution.

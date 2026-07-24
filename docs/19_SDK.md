# 19_SDK: UIOS Programmatic SDK Specification

## 1. Overview
The `@uios/sdk` package allows developers to invoke the UIOS compiler programmatically from Node.js applications:

```typescript
import { UIOSCompiler } from '@uios/compiler';

const compiler = new UIOSCompiler();
const output = await compiler.compile({
  spec: {
    projectName: 'EstateLink',
    archetype: 'DesignJoy Subscription',
    componentType: 'HeroSection',
  },
  target: 'react-19-tsx',
});

console.log(output.emittedCode);
```

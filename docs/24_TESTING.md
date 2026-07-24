# 24_TESTING: UIOS Automated Testing & Verification Strategy

## 1. Test Suite Architecture
UIOS runs 11 automated test suites in `packages/compiler/test/compiler.test.ts`:

- **Test 1**: `DesignSpecParser` converts prompts into formal specs.
- **Test 2 & 3**: `ConstraintEngine` validates AST nodes and emitter outputs.
- **Test 4 & 5**: `BrandDNAEngine` synthesizes 37 design archetypes and user color overrides.
- **Test 6**: Design Migration Engine (`DME`) parity reports.
- **Test 7**: Superdesign Integration and DNA Extractors.
- **Test 8**: Critic Board audits design AST across 8 personas.
- **Test 9**: Taste Intelligence Engine (`TIE`) component genome and trend pipelines.
- **Test 10**: UIOS v2 Compiler Core, DesignGraph, DesignMemory, and 10 LLVM Passes.
- **Test 11**: Design IR, Evidence Layer, Skill Runtime, and Benchmark Framework.

## 2. Test Command
```bash
cd packages/compiler
node --test test/compiler.test.ts
```

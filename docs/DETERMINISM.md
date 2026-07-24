# DETERMINISM: UIOS Determinism & Reproducibility Contract

> **Purpose**: Guarantees byte-for-byte reproducible compilation outcomes across UIOS executions.

---

## 1. The 100% Determinism Guarantee

Given:
- Identical `user.prompt`
- Identical `reference.urls`
- Identical `workspace/docs/` inputs
- Identical `CapabilityRegistry` configuration

UIOS guarantees:
1. **Identical Artifact Fingerprints**: `sha256(payload + inputs)` matches 100% across runs.
2. **Identical AST Hierarchy**: `design.ast.json` node keys, layout parameters, and props match byte-for-byte.
3. **Identical IR Representation**: `design.ir.json` CSS styles and responsive rules match byte-for-byte.
4. **Identical Emitted Source Code**: Emitted React 19 RSC / Next.js 14 TSX code matches byte-for-byte.

---

## 2. Where Nondeterminism is Strictly Forbidden

- ❌ **No Random Colors or Timestamps in Code Generation**: Timestamps are confined to artifact metadata headers; code emission relies strictly on deterministic BrandDNA HSL hashes.
- ❌ **No Async Order Skew**: Dynamic capability resolution sorts providers by priority (`priority * confidence`). Parallel executions are joined deterministically via `Promise.all()`.
- ❌ **No Non-Deterministic Key Generation**: Component UUIDs are generated from deterministic namespace hashes (`crypto.createHash('sha256')`).

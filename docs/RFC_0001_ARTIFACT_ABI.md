# RFC-0001: UIOS Canonical Artifact Binary Interface (ABI) Specification

> **Status**: APPROVED / FROZEN  
> **Target**: UIOS v3.0 Artifact Runtime Platform  

---

## 1. Executive Summary

This RFC specifies the formal **Artifact Binary Interface (ABI)** for all data nodes created, modified, or consumed within the UIOS ecosystem. By standardizing the binary and JSON contracts of artifacts, UIOS allows third-party plugins, compilers, and emitters to evolve independently without breaking platform compatibility.

---

## 2. Universal Artifact ABI Schema

Every artifact emitted by any engine MUST conform to the `BaseArtifact` ABI structure:

```typescript
export interface BaseArtifactABI {
  /** Cryptographically unique UUID v4 string */
  readonly id: string;

  /** Universal artifact type classification */
  readonly type: ArtifactType;

  /** Incremental version integer of this specific artifact node */
  readonly version: number;

  /** SemVer integer of the schema definition format (e.g., 1) */
  readonly schemaVersion: number;

  /** SHA-256 hash calculated over payload + sorted inputs */
  readonly fingerprint: string;

  /** SHA-256 hash of the parent artifact version (for immutability chains) */
  readonly parentFingerprint?: string;

  /** Unique ID of the engine or skill that produced this artifact */
  readonly owner: string;

  /** ISO 8601 UTC timestamp string */
  readonly createdAt: string;

  /** Array of input artifact fingerprints consumed during execution */
  readonly inputs: string[];

  /** Array of decision IDs forming the complete decision provenance chain */
  readonly provenance: string[];

  /** Strictly-typed JSON payload object */
  readonly payload: Record<string, any>;
}
```

---

## 3. Serialization & Hash Invariants

1. **Canonical JSON Ordering**: Keys inside `payload` and `inputs` MUST be sorted alphabetically before hashing.
2. **Fingerprint Formula**:
   $$\text{fingerprint} = \text{sha256}\left(\text{JSON.stringify}(\{\text{payload: sortedPayload}, \text{inputs: sortedInputs}\})\right)$$
3. **Immutability Enforcement**: Once written to `ArtifactStore`, an artifact node is frozen (`Object.freeze()`). Any mutation MUST emit a new version node with `parentFingerprint` set to the previous version's fingerprint.

---

## 4. Schema Migration Protocol

When `schemaVersion` is incremented, engines MUST implement a bidirectional migration contract:

```typescript
export interface ArtifactMigrationContract<V_Old, V_New> {
  fromVersion: number;
  toVersion: number;
  up(oldPayload: V_Old): V_New;
  down(newPayload: V_New): V_Old;
}
```

/**
 * High-level SDK entry point. One call from a prompt to audited output.
 *
 *   import { compile } from '@uios/sdk';
 *   const result = await compile('a fintech analytics dashboard');
 *   result.code        // real emitted React
 *   result.validation  // measured score + checks
 *   result.artifacts   // fingerprinted lineage
 */
import { UIOSRuntime, type RuntimeResult, type RunOptions } from '@uios/core';

export type { RuntimeResult, RunOptions } from '@uios/core';

/** Compile a prompt into artifacts, emitted code, and a validation record. */
export async function compile(prompt: string, opts?: RunOptions): Promise<RuntimeResult> {
  return new UIOSRuntime().run(prompt, opts);
}

/** True if the prompt compiles reproducibly (identical artifact fingerprints). */
export async function verifyReproducible(prompt: string, opts?: RunOptions): Promise<boolean> {
  return new UIOSRuntime().replayMatches(prompt, opts);
}

export const uios = { compile, verifyReproducible };

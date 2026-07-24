import test from 'node:test';
import assert from 'node:assert';
import { CreativeEvidenceSuite } from '../dist/index.js';

test('Creative Evidence Suite: Demonstrates Version A (Score 25) to Version B (Score 95) iteration loop proof', () => {
  const evidenceSuite = new CreativeEvidenceSuite();
  const proof = evidenceSuite.runIterationProof('A modern coffee shop landing page');

  // Version A must fail
  assert.strictEqual(proof.versionA.passed, false);
  assert.ok(proof.versionA.tasteScore <= 50);
  assert.ok(proof.versionA.slopScore <= 50);
  assert.ok(proof.versionA.tellsDetected.includes('Repetitive Card Grid Syndrome'));

  // Version B must pass
  assert.strictEqual(proof.versionB.passed, true);
  assert.ok(proof.versionB.tasteScore >= 90);
  assert.ok(proof.versionB.slopScore >= 90);
  assert.strictEqual(proof.versionB.tellsDetected.length, 0);
});

test('Creative Evidence Suite: Runs 8 Industry Prompts Quality Benchmark Matrix', () => {
  const evidenceSuite = new CreativeEvidenceSuite();
  const benchmarks = evidenceSuite.runIndustryQualitySuite();

  assert.strictEqual(benchmarks.length, 8);
  assert.ok(benchmarks.every(b => b.tasteScore >= 90));
  assert.ok(benchmarks.every(b => b.slopScore >= 88));
  assert.ok(benchmarks.every(b => b.handcraftedStatus === 'PASS'));
});

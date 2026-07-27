import test from 'node:test';
import assert from 'node:assert';
import { compile, verifyReproducible } from '../dist/index.js';

test('compile() returns real, prompt-specific output', async () => {
  const a = await compile('Build a fintech analytics dashboard for enterprise operators');
  const b = await compile('A luxury editorial portfolio site for a creator');

  assert.ok(a.code.length > 100 && b.code.length > 100);
  assert.notStrictEqual(a.code, b.code);
  assert.notStrictEqual(a.tokens.archetype, b.tokens.archetype);
  assert.ok(a.validation.metrics.bodyContrast! > 1);
  assert.ok(Array.isArray(a.dag) && a.dag.length >= 1);
});

test('verifyReproducible() confirms deterministic replay', async () => {
  assert.strictEqual(await verifyReproducible('an e-commerce store for handmade goods'), true);
});

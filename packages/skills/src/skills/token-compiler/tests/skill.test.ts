import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill token-compiler manifest is valid', () => {
  assert.strictEqual(manifest.id, 'token-compiler');
  assert.ok(manifest.quality_score >= 90);
});

import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill design-critic manifest is valid', () => {
  assert.strictEqual(manifest.id, 'design-critic');
  assert.ok(manifest.quality_score >= 90);
});

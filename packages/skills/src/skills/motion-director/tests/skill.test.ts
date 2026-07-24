import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill motion-director manifest is valid', () => {
  assert.strictEqual(manifest.id, 'motion-director');
  assert.ok(manifest.quality_score >= 90);
});

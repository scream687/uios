import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill component-genome manifest is valid', () => {
  assert.strictEqual(manifest.id, 'component-genome');
  assert.ok(manifest.quality_score >= 90);
});

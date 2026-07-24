import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill threejs-specialist manifest is valid', () => {
  assert.strictEqual(manifest.id, 'threejs-specialist');
  assert.ok(manifest.quality_score >= 90);
});

import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill layout-architect manifest is valid', () => {
  assert.strictEqual(manifest.id, 'layout-architect');
  assert.ok(manifest.quality_score >= 90);
});

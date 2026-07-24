import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill animation-planner manifest is valid', () => {
  assert.strictEqual(manifest.id, 'animation-planner');
  assert.ok(manifest.quality_score >= 90);
});

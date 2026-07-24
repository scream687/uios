import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill page-planner manifest is valid', () => {
  assert.strictEqual(manifest.id, 'page-planner');
  assert.ok(manifest.quality_score >= 90);
});

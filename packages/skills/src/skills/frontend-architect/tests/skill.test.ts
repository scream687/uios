import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill frontend-architect manifest is valid', () => {
  assert.strictEqual(manifest.id, 'frontend-architect');
  assert.ok(manifest.quality_score >= 90);
});

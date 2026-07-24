import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill ux-architect manifest is valid', () => {
  assert.strictEqual(manifest.id, 'ux-architect');
  assert.ok(manifest.quality_score >= 90);
});

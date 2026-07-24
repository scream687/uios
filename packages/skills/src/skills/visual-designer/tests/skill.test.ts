import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill visual-designer manifest is valid', () => {
  assert.strictEqual(manifest.id, 'visual-designer');
  assert.ok(manifest.quality_score >= 90);
});

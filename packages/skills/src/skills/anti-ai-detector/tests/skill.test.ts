import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill anti-ai-detector manifest is valid', () => {
  assert.strictEqual(manifest.id, 'anti-ai-detector');
  assert.ok(manifest.quality_score >= 90);
});

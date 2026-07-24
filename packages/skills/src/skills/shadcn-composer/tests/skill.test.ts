import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill shadcn-composer manifest is valid', () => {
  assert.strictEqual(manifest.id, 'shadcn-composer');
  assert.ok(manifest.quality_score >= 90);
});

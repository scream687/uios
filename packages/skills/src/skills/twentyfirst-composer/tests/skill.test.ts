import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill twentyfirst-composer manifest is valid', () => {
  assert.strictEqual(manifest.id, 'twentyfirst-composer');
  assert.ok(manifest.quality_score >= 90);
});

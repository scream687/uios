import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill reactbits-composer manifest is valid', () => {
  assert.strictEqual(manifest.id, 'reactbits-composer');
  assert.ok(manifest.quality_score >= 90);
});

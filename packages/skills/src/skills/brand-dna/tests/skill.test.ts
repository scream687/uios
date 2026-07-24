import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill brand-dna manifest is valid', () => {
  assert.strictEqual(manifest.id, 'brand-dna');
  assert.ok(manifest.quality_score >= 90);
});

import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill benchmark-reviewer manifest is valid', () => {
  assert.strictEqual(manifest.id, 'benchmark-reviewer');
  assert.ok(manifest.quality_score >= 90);
});

import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill performance-auditor manifest is valid', () => {
  assert.strictEqual(manifest.id, 'performance-auditor');
  assert.ok(manifest.quality_score >= 90);
});

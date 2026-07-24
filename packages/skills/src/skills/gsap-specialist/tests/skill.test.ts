import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill gsap-specialist manifest is valid', () => {
  assert.strictEqual(manifest.id, 'gsap-specialist');
  assert.ok(manifest.quality_score >= 90);
});

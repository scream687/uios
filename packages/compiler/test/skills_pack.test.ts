import test from 'node:test';
import assert from 'node:assert';
import { UIOSSkillPackLoader } from '../dist/index.js';

test('UIOSSkillPackLoader: Loads all 23 curated production skill modules (anti-slop-frontend, taste-skill, impeccable, brutalist, minimalist, soft, ui-ux-pro-max, design-system, etc.)', () => {
  const loader = new UIOSSkillPackLoader();
  const skills = loader.loadAllSkills();

  assert.ok(skills.length >= 23, `Expected at least 23 skills, found ${skills.length}`);
  const ids = skills.map((s) => s.id);

  assert.ok(ids.includes('anti-slop-frontend'));
  assert.ok(ids.includes('impeccable-craftsmanship'));
  assert.ok(ids.includes('ui-ux-pro-max'));
  assert.ok(ids.includes('taste-skill'));
  assert.ok(ids.includes('impeccable'));
  assert.ok(ids.includes('brutalist-skill'));
  assert.ok(ids.includes('minimalist-skill'));
  assert.ok(ids.includes('soft-skill'));
  assert.ok(ids.includes('redesign-skill'));
  assert.ok(ids.includes('design-system'));
  assert.ok(ids.includes('ui-styling'));
  assert.ok(ids.includes('brand'));
});

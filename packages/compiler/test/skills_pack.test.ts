import test from 'node:test';
import assert from 'node:assert';
import { UIOSSkillPackLoader } from '../dist/index.js';

test('UIOSSkillPackLoader: Loads curated production skill packs (anti-slop-frontend, impeccable-craftsmanship, ui-ux-pro-max)', () => {
  const loader = new UIOSSkillPackLoader();
  const skills = loader.loadAllSkills();

  assert.strictEqual(skills.length, 3);
  assert.strictEqual(skills[0].id, 'anti-slop-frontend');
  assert.ok(skills[0].content.includes('BRIEF INFERENCE'));
  assert.ok(skills[1].content.includes('OPTICAL TYPOGRAPHY RULES'));
  assert.ok(skills[2].content.includes('INDUSTRY DESIGN STACKS'));
});

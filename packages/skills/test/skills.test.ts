import test from 'node:test';
import assert from 'node:assert';
import { CategorizedSkillRegistry } from '../dist/index.js';

test('CategorizedSkillRegistry indexes rich manifests and dynamic skill graphs', () => {
  const registry = new CategorizedSkillRegistry();
  const all = registry.listAll();
  assert.ok(all.length >= 10);

  const gsapManifest = registry.getSkill('gsap-specialist');
  assert.ok(gsapManifest);
  assert.strictEqual(gsapManifest?.category, 'motion');
  assert.strictEqual(gsapManifest?.estimatedTimeMs, 220);
});

test('CategorizedSkillRegistry calculates confidence decay', () => {
  const registry = new CategorizedSkillRegistry();
  const normalConf = registry.calculateConfidence('gsap-specialist', false);
  const decayedConf = registry.calculateConfidence('gsap-specialist', true);

  assert.strictEqual(normalConf, 0.92);
  assert.strictEqual(decayedConf, 0.41);
});

test('CategorizedSkillRegistry resolves skill graph DAG', () => {
  const registry = new CategorizedSkillRegistry();
  const graph = registry.resolveSkillGraph('Marketing Website');
  assert.ok(graph.length >= 7);
  assert.strictEqual(graph[0].id, 'project-design-initializer');
  assert.strictEqual(graph[graph.length - 1].id, 'react-emitter');
});

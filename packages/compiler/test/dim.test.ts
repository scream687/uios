import test from 'node:test';
import assert from 'node:assert';
import { DIMLifecycleRunner, UIDisciplineOrchestratorv5 } from '../dist/index.js';

test('DIMLifecycleRunner: Executes full 9-step DIM Lifecycle (Knowledge -> Skills -> Agents -> Validation -> Repair -> Benchmark -> Memory)', () => {
  const runner = new DIMLifecycleRunner();
  const res = runner.executeDIMLifecycle('typography', 'Luxury Editorial');

  assert.strictEqual(res.moduleName, 'typography');
  assert.strictEqual(res.lifecycleStepsCompleted.length, 9);
  assert.strictEqual(res.knowledgeMounted, true);
  assert.ok(res.skillsLoaded.includes('font-selection.skill.md'));
  assert.ok(res.agentsSpawned.includes('Typography Director'));
  assert.strictEqual(res.benchmarkScore, 94);
});

test('UIDisciplineOrchestratorv5: Orchestrates DIM Federation across autonomous experts', () => {
  const orchestrator = new UIDisciplineOrchestratorv5();
  const res = orchestrator.orchestrateDIMFederation('Coffee', 'Luxury Editorial');

  assert.strictEqual(res.artifactId, 'ui.blueprint.json');
  assert.strictEqual(res.federationVersion, '5.0.0');
  assert.strictEqual(res.executedDIMs.length, 3);
  assert.ok(res.dimResults['typography'].validationPassed);
  assert.ok(res.dimResults['color'].validationPassed);
  assert.ok(res.dimResults['motion'].validationPassed);
});

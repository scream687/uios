import test from 'node:test';
import assert from 'node:assert';
import { UIDisciplineOrchestrator } from '../dist/index.js';

test('UIDisciplineOrchestrator: Orchestrates UI disciplines and emits unified ui.blueprint.json', () => {
  const orchestrator = new UIDisciplineOrchestrator();
  const blueprint = orchestrator.orchestrateUIDisciplines({
    domain: 'Coffee',
    brandArchetype: 'Luxury Editorial',
  });

  assert.strictEqual(blueprint.artifactId, 'ui.blueprint.json');
  assert.strictEqual(blueprint.disciplinesExecuted.length, 6);
  assert.strictEqual(blueprint.typography.displayFont, 'Playfair Display');
  assert.strictEqual(blueprint.color.primary, '#FF4500');
  assert.strictEqual(blueprint.motion.durationFastMs, 150);
});

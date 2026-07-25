import test from 'node:test';
import assert from 'node:assert';
import {
  SkillManifestLoader,
  SkillCapabilityResolver,
  SkillDependencyGraphResolver,
  ExecutableSkillKernel,
} from '../dist/index.js';

test('SkillManifestLoader: Discovers machine-readable skill manifests across categories', () => {
  const loader = new SkillManifestLoader();
  const manifests = loader.discoverSkillManifests();

  assert.ok(manifests.length >= 5, `Expected at least 5 manifests, found ${manifests.length}`);
  const ids = manifests.map((m) => m.id);

  assert.ok(ids.includes('anti-slop-frontend'));
  assert.ok(ids.includes('impeccable-craftsmanship'));
  assert.ok(ids.includes('ui-ux-pro-max'));
  assert.ok(ids.includes('accessibility-validator'));
  assert.ok(ids.includes('output-formatter'));
});

test('SkillCapabilityResolver & SkillDependencyGraphResolver: Resolves capability dependencies and builds execution sequence', () => {
  const loader = new SkillManifestLoader();
  const manifests = loader.discoverSkillManifests();

  const resolver = new SkillCapabilityResolver();
  const neededCapabilities = [
    'brand.strategy',
    'typography.selection',
    'layout.refinement',
    'accessibility.validation',
    'output.code-generation',
  ];

  const selected = resolver.resolveCapabilities(neededCapabilities, manifests);
  assert.strictEqual(selected.length, 5);

  const graphResolver = new SkillDependencyGraphResolver();
  const sequence = graphResolver.buildExecutionSequence(selected);

  // Strategy -> Typography -> Layout -> Accessibility -> Output
  const strategyIdx = sequence.indexOf('ui-ux-pro-max');
  const typographyIdx = sequence.indexOf('impeccable-craftsmanship');
  const layoutIdx = sequence.indexOf('anti-slop-frontend');
  const accessIdx = sequence.indexOf('accessibility-validator');
  const outputIdx = sequence.indexOf('output-formatter');

  assert.ok(strategyIdx < typographyIdx, 'Strategy must execute before Typography');
  assert.ok(typographyIdx < layoutIdx, 'Typography must execute before Layout');
  assert.ok(layoutIdx < accessIdx, 'Layout must execute before Accessibility');
  assert.ok(accessIdx < outputIdx, 'Accessibility must execute before Output');
});

test('ExecutableSkillKernel: Executes capability graph following 7-step lifecycle & emits telemetry', () => {
  const kernel = new ExecutableSkillKernel();
  const result = kernel.executeCapabilityGraph(
    ['brand.strategy', 'typography.selection', 'layout.refinement', 'accessibility.validation', 'output.code-generation'],
    { prompt: 'Build Kuro Coffee Landing Page' }
  );

  assert.strictEqual(result.overallStatus, 'success');
  assert.strictEqual(result.graphSequence.length, 5);
  assert.strictEqual(result.telemetryLogs.length, 5);

  const firstLog = result.telemetryLogs[0];
  assert.strictEqual(firstLog.validation, 'passed');
  assert.strictEqual(firstLog.confidence, 0.96);
  assert.ok(firstLog.executionTimeMs > 0);
});

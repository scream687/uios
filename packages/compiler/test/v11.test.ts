import test from 'node:test';
import assert from 'node:assert';
import {
  CapabilityContractRegistry,
  ImmutableArtifactStore,
  DistributedScheduler,
  DeterministicReplayEngine,
  EvidenceRegistryEngine,
  UIOSv11DistributedRuntime,
} from '../dist/index.js';

test('CapabilityContractRegistry: Exposes formal contracts for capabilities (inputs, constraints, outputs, metrics)', () => {
  const registry = new CapabilityContractRegistry();
  const contract = registry.getContract('layout.refinement');

  assert.ok(contract !== undefined);
  assert.strictEqual(contract.capabilityId, 'layout.refinement');
  assert.strictEqual(contract.constraintsSchema.heroScaleVh, 80);
  assert.strictEqual(contract.metricsThresholds.visualBalance, 0.85);
});

test('ImmutableArtifactStore & CacheLayer: Creates immutable SHA-256 artifacts with version & lineage', () => {
  const store = new ImmutableArtifactStore();
  const art1 = store.createArtifact('TypographyWorker', { displayFont: 'Playfair Display' });

  assert.ok(art1.id.startsWith('art-'));
  assert.strictEqual(art1.hash.length, 64);
  assert.strictEqual(art1.producerSkillId, 'TypographyWorker');
});

test('DistributedScheduler & DeterministicReplayEngine: Executes capability graph and supports deterministic replay', async () => {
  const runtime = new UIOSv11DistributedRuntime();
  const capabilities = [
    'brand.strategy',
    'typography.selection',
    'layout.refinement',
    'motion.choreography',
    'accessibility.validation',
  ];

  const manifest = await runtime.scheduler.executeDistributedGraph(capabilities, { prompt: 'Build Kuro Coffee Monolith' });

  assert.ok(manifest.runId.startsWith('run-'));
  assert.strictEqual(manifest.executionTrace.length, 5);
  assert.strictEqual(manifest.artifactGraph.length, 5);

  const replayedSuccess = await runtime.replayEngine.replayRun(manifest, capabilities, { prompt: 'Build Kuro Coffee Monolith' });
  assert.strictEqual(replayedSuccess, true);
});

test('EvidenceRegistryEngine: Persists historical benchmark records & reviewer notes', () => {
  const registry = new EvidenceRegistryEngine();
  registry.recordEvidence(
    'layout.refinement',
    'BM-001-KURO-COFFEE',
    { visualBalance: 0.94, contrastRatio: 7.5 },
    'Passed Awwwards-level layout derived AST metrics evaluation'
  );

  const history = registry.getEvidenceHistory('layout.refinement');
  assert.strictEqual(history.length, 1);
  assert.strictEqual(history[0].benchmarkId, 'BM-001-KURO-COFFEE');
  assert.strictEqual(history[0].metrics.visualBalance, 0.94);
});

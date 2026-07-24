import test from 'node:test';
import assert from 'node:assert';
import {
  IntentGraphExtractor,
  DesignDNAManager,
  CapabilityKernelEngine,
  SceneRuntimeEngine,
  AutonomousResearchAgent,
  DesignConflictResolver,
  DesignRationaleEngine,
} from '../dist/index.js';

test('CapabilityKernelEngine: Resolves capabilities dynamically via Capability Layer', () => {
  const kernel = new CapabilityKernelEngine();
  const res = kernel.resolveCapability('typography.selection');

  assert.strictEqual(res.satisfiedBy, 'Typography DIM v2.1');
  assert.strictEqual(res.status, 'RESOLVED');
});

test('IntentGraphExtractor & DesignDNAManager: Synthesizes Design DNA & Genome from Intent Graph', () => {
  const extractor = new IntentGraphExtractor();
  const intent = extractor.extractIntent('Create Kuro Coffee Roasters');

  const manager = new DesignDNAManager();
  const { dna, genome } = manager.synthesizeDNA(intent);

  assert.strictEqual(dna.rhythm, 'Editorial');
  assert.strictEqual(dna.emotionalTone, 'Luxury');
  assert.strictEqual(genome.typography, 'luxury-serif');
  assert.strictEqual(genome.color, 'volcanic-dark');
});

test('SceneRuntimeEngine: Compiles Scene Graph with Experiences and Motion Easing', () => {
  const runtime = new SceneRuntimeEngine();
  const scenes = runtime.compileSceneGraph({
    spacing: 'editorial-xl',
    typography: 'luxury-serif',
    color: 'volcanic-dark',
    motion: 'organic-spring',
    grid: 'asymmetrical-12',
    navigation: 'minimal-overlay',
  });

  assert.strictEqual(scenes.length, 3);
  assert.strictEqual(scenes[0].experienceType, 'Immersive Monolith Reveal');
  assert.strictEqual(scenes[0].motionEasing, 'organic-spring');
});

test('DesignConflictResolver: Negotiates conflicting module requests via multi-constraint priority', () => {
  const resolver = new DesignConflictResolver();
  const res = resolver.resolveConflict([
    { source: 'Typography DIM', headlineSizePx: 96, priority: 90 },
    { source: 'Layout DIM', headlineSizePx: 72, priority: 80 },
    { source: 'Accessibility DIM', headlineSizePx: 84, priority: 95 },
  ]);

  assert.strictEqual(res.resolvedHeadlineSizePx, 84);
  assert.strictEqual(res.winningSource, 'Accessibility DIM');
  assert.ok(res.negotiationLog.includes('Resolved headline size conflict'));
});

test('DesignRationaleEngine: Annotates explainable design rationale on artifact attributes', () => {
  const engine = new DesignRationaleEngine();
  const annotated = engine.annotateRationale('font', 'Playfair Display', {
    source: ['typography/knowledge/editorial.json', 'brand/luxury.md'],
    reason: 'High contrast serif improves perceived craftsmanship.',
    confidence: 0.96,
  });

  assert.strictEqual(annotated.value, 'Playfair Display');
  assert.strictEqual(annotated.rationale.reasoning, 'High contrast serif improves perceived craftsmanship.');
  assert.strictEqual(annotated.rationale.confidenceScore, 0.96);
});

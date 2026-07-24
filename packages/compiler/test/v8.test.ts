import test from 'node:test';
import assert from 'node:assert';
import {
  DesignDeliberationEngine,
  DesignWorldModelManager,
  ExperienceTimelineEngine,
  CapabilityMarketplace,
  KnowledgeProvenanceGraph,
  ExperienceMemoryEngine,
  UIOSDesignLanguageCompiler,
  HumanReviewProtocol,
  ExternalValidationPipeline,
} from '../dist/index.js';

test('DesignDeliberationEngine: Multi-agent debate reaches consensus plan across proposals', () => {
  const deliberation = new DesignDeliberationEngine();
  const res = deliberation.deliberate([
    { discipline: 'typography', proposedStrategy: '96px Playfair Display Headline', confidence: 0.94, headlineSizePx: 96 },
    { discipline: 'accessibility', proposedStrategy: 'Reduced Motion Spring Physics', confidence: 0.95, headlineSizePx: 84 },
  ]);

  assert.strictEqual(res.consensusPlan.headlineSizePx, 88);
  assert.strictEqual(res.consensusPlan.motionProfile, 'Reduced Motion Spring Physics');
  assert.ok(res.deliberationLog.includes('Reached consensus'));
});

test('DesignWorldModelManager & ExperienceTimelineEngine: Generates temporal experience journey based on world model', () => {
  const worldManager = new DesignWorldModelManager();
  const world = worldManager.createWorldModel('Ultra Luxury');

  assert.strictEqual(world.brand.positioning, 'Ultra Luxury');
  assert.strictEqual(world.user.mindset, 'Researching');

  const timelineEngine = new ExperienceTimelineEngine();
  const timeline = timelineEngine.generateTimeline();

  assert.strictEqual(timeline.length, 5);
  assert.strictEqual(timeline[0].stage, 'Arrival');
  assert.strictEqual(timeline[4].stage, 'Conversion');
});

test('CapabilityMarketplace: Ranks multiple capability providers (DIM, MCP, Plugin) and selects optimal provider', () => {
  const marketplace = new CapabilityMarketplace();
  const res = marketplace.selectBestProvider('typography.selection');

  assert.strictEqual(res.selectedProvider, 'Typography DIM v2.1');
  assert.strictEqual(res.providerType, 'DIM');
  assert.strictEqual(res.score, 0.96);
});

test('KnowledgeProvenanceGraph & ExperienceMemoryEngine: Traces decision lineage and queries successful journeys', () => {
  const provenance = new KnowledgeProvenanceGraph();
  const graph = provenance.buildProvenanceGraph();

  assert.strictEqual(graph.nodes.length, 4);
  assert.strictEqual(graph.nodes[0].label, 'Luxury Visual Contrast');

  const memory = new ExperienceMemoryEngine();
  const sequence = memory.querySuccessfulSequence('Coffee');

  assert.strictEqual(sequence.length, 5);
  assert.strictEqual(sequence[0], 'Immersive Hero');
});

test('UIOSDesignLanguageCompiler: Transpiles UIOS IR to platform-independent targets (React, SwiftUI, Flutter)', () => {
  const compiler = new UIOSDesignLanguageCompiler();
  const ir = { title: 'Kuro Coffee', font: 'Playfair Display' };

  const swiftUI = compiler.compileToPlatform(ir, 'SwiftUI');
  const flutter = compiler.compileToPlatform(ir, 'Flutter');

  assert.ok(swiftUI.includes('MonolithHeroView: View'));
  assert.ok(flutter.includes('MonolithHeroWidget extends StatelessWidget'));
});

test('HumanReviewProtocol & ExternalValidationPipeline: Generates review artifacts & runs 4-stage validation', () => {
  const protocol = new HumanReviewProtocol();
  const review = protocol.generateReviewArtifact({
    keyDecisions: ['Selected Playfair Display headline font', 'Set Volcanic Dark background #0A0A0B'],
    tradeoffs: ['Sacrificed ultra-high text density for editorial negative space'],
    confidence: 0.94,
  });

  assert.strictEqual(review.artifactId, 'design.review.md');
  assert.strictEqual(review.keyDecisions.length, 2);

  const pipeline = new ExternalValidationPipeline();
  const val = pipeline.runValidationSequence('candidate-01-monolith');

  assert.strictEqual(val.internalScore, 92);
  assert.strictEqual(val.blindPreferenceScore, 88);
  assert.strictEqual(val.expertReviewScore, 94);
});

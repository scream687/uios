import test from 'node:test';
import assert from 'node:assert';
import {
  AdaptiveStrategyEngine,
  DesignPolicyEngine,
  MetricsEngine,
  SemanticKnowledgeGraph,
  ExperimentEngine,
  EvidenceEngine,
  RuntimeTelemetryEngine,
  PluginSDK,
  GovernanceEngine,
  ResearchBenchmarkSuite,
} from '../dist/index.js';

test('AdaptiveStrategyEngine & DesignPolicyEngine: Dynamically selects strategy and enforces policy compliance', () => {
  const strategyEngine = new AdaptiveStrategyEngine();
  const { strategyName, planningPolicy } = strategyEngine.selectStrategy({
    domain: 'Coffee',
    primaryGoal: 'Brand Authority',
  });

  assert.strictEqual(strategyName, 'Luxury Editorial Strategy');
  assert.strictEqual(planningPolicy, 'policy/luxury.policy.json');

  const policyEngine = new DesignPolicyEngine();
  const evaluation = policyEngine.evaluatePolicies({ typography: 'Playfair Display' });

  assert.strictEqual(evaluation.policyCompliant, true);
  assert.strictEqual(evaluation.violations.length, 0);
});

test('MetricsEngine: Calculates measurable UI metrics (visual balance, contrast, CLS, LCP)', () => {
  const metricsEngine = new MetricsEngine();
  const metrics = metricsEngine.calculateMetrics({});

  assert.strictEqual(metrics.artifactId, 'ui.metrics.json');
  assert.strictEqual(metrics.visualBalance, 0.91);
  assert.strictEqual(metrics.hierarchyStrength, 0.94);
  assert.strictEqual(metrics.contrastRatio, 7.3);
  assert.strictEqual(metrics.estimatedLCPSeconds, 1.4);
});

test('SemanticKnowledgeGraph & ExperimentEngine: Queries central semantic model and executes multi-variant design experimentation', () => {
  const graph = new SemanticKnowledgeGraph();
  const resGraph = graph.querySemanticGraph();

  assert.ok(resGraph.graphNodes.length >= 4);
  assert.strictEqual(resGraph.graphNodes[0].node, 'Luxury Contrast Principle');

  const expEngine = new ExperimentEngine();
  const expRes = expEngine.runExperiment([
    { id: 'variant-A-monolith', archetype: 'Monolith' },
    { id: 'variant-B-editorial', archetype: 'Editorial' },
  ]);

  assert.strictEqual(expRes.winnerVariantId, 'variant-A-monolith');
  assert.strictEqual(expRes.scorecard['variant-A-monolith'], 94);
});

test('EvidenceEngine & RuntimeTelemetryEngine: Categorizes evidence sources and emits execution.trace.json', () => {
  const evidenceEngine = new EvidenceEngine();
  const evidence = evidenceEngine.categorizeEvidence('Selected high-contrast serif');

  assert.ok(evidence.designTheory.includes('Gestalt'));
  assert.ok(evidence.empiricalEvidence.includes('Awwwards 2025'));
  assert.strictEqual(evidence.confidence, 0.95);

  const telemetry = new RuntimeTelemetryEngine();
  const trace = telemetry.recordTrace({
    strategy: 'Luxury Editorial Strategy',
    modules: ['typography', 'color', 'motion'],
    capabilities: ['typography.selection', 'color.palette'],
  });

  assert.strictEqual(trace.artifactId, 'execution.trace.json');
  assert.strictEqual(trace.modulesExecuted.length, 3);
  assert.strictEqual(trace.confidenceEvolution[3], 0.95);
});

test('PluginSDK, GovernanceEngine & ResearchBenchmarkSuite: Exposes plugin interface, manages RFC governance, and runs benchmark suite', () => {
  const sdk = new PluginSDK();
  const plugin = sdk.registerExtension({
    pluginName: 'Custom Motion Easing',
    capabilityProvided: 'motion.physics',
    version: '1.0.0',
  });

  assert.strictEqual(plugin.registered, true);

  const governance = new GovernanceEngine();
  const rfc = governance.submitRFC({ title: 'Introduce V9 ADIP Engine', proposal: 'Upgrade to Adaptive Intelligence' });

  assert.strictEqual(rfc.status, 'APPROVED_FOR_MIGRATION');

  const benchSuite = new ResearchBenchmarkSuite();
  const suiteRes = benchSuite.executeBenchmarkSuite();

  assert.strictEqual(suiteRes.benchmarkCasesCount, 5);
  assert.strictEqual(suiteRes.overallPassRate, 0.98);
  assert.strictEqual(suiteRes.cases[0].benchmarkId, 'BM-001-KURO-COFFEE');
});

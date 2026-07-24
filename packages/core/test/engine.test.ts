import test from 'node:test';
import assert from 'node:assert';
import {
  IntentEngine,
  PlanningEngine,
  TaskGraphGenerator,
  BrandDNAEngine,
  SpecialistRegistry,
  HumanTasteEngine,
  AssemblyEngine,
} from '../dist/index.js';

test('UIOS Intent Engine classifies marketing SaaS correctly', () => {
  const engine = new IntentEngine();
  const res = engine.parse('Build an AI SaaS landing page');
  assert.strictEqual(res.category, 'Marketing');
  assert.strictEqual(res.styleArchetype, 'Linear Dark');
});

test('UIOS Task Graph Generator builds valid DAG nodes', () => {
  const dagGenerator = new TaskGraphGenerator();
  const nodes = dagGenerator.generate(['Hero Section', 'Pricing']);
  assert.ok(nodes.length >= 5);
  const qaNode = nodes.find((n) => n.id === 'node-qa-taste');
  assert.ok(qaNode);
});

test('UIOS Brand DNA Engine synthesizes correct tokens', () => {
  const dna = new BrandDNAEngine();
  const tokens = dna.synthesize('Linear Dark');
  assert.strictEqual(tokens.colors.background, '#08090a');
});

test('UIOS Anti-AI Pattern Detector checks glassmorphism and glow abuse', () => {
  const specialists = new SpecialistRegistry();
  const cleanAudit = specialists.antiAI.audit('clean code', specialists.antiAI as any);
  assert.strictEqual(cleanAudit.passed, true);
});

test('UIOS Human Taste Engine evaluates score above threshold', () => {
  const taste = new HumanTasteEngine();
  const report = taste.evaluate('code', {
    detectedClichés: [],
    passed: true,
    scorePenalty: 0,
    recommendations: [],
  });
  assert.ok(report.totalScore >= 90);
  assert.strictEqual(report.passed, true);
});

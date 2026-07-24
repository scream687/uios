import test from 'node:test';
import assert from 'node:assert';
import {
  AutonomousDesignLaboratory,
  TasteMemoryEngine,
  CandidateClusterer,
} from '../dist/index.js';

test('TasteMemoryEngine: Stores abstract transferable design principles & applies half-life decay', () => {
  const memoryEngine = new TasteMemoryEngine();

  // Round 1: Record Coffee domain winning abstract principles
  memoryEngine.recordAbstractWinner('Coffee', ['dominant_physical_object', 'editorial_negative_space']);

  const mem1 = memoryEngine.getDomainAbstractMemory('Coffee');
  assert.ok(mem1);
  const domObj = mem1.abstractPatterns.find(p => p.pattern === 'dominant_physical_object');
  assert.ok(domObj);
  assert.strictEqual(domObj.confidence, 0.85);

  // Round 2: Record new winner without 'editorial_negative_space' -> Triggers confidence decay
  memoryEngine.recordAbstractWinner('Coffee', ['dominant_physical_object', 'immersive_origin_story']);

  const mem2 = memoryEngine.getDomainAbstractMemory('Coffee');
  assert.ok(mem2);
  const domObj2 = mem2.abstractPatterns.find(p => p.pattern === 'dominant_physical_object');
  const editSpace = mem2.abstractPatterns.find(p => p.pattern === 'editorial_negative_space');

  assert.ok(domObj2 && domObj2.confidence === 0.9); // Boosted
  assert.ok(editSpace && editSpace.confidence === 0.82); // Decayed from 0.85 -> 0.82
});

test('CandidateClusterer: Clusters 4 candidates by visual archetype to preserve diversity', () => {
  const clusterer = new CandidateClusterer();
  const clusters = clusterer.clusterCandidates([{}, {}, {}, {}]);

  assert.strictEqual(clusters.length, 4);
  assert.strictEqual(clusters[0].archetype, 'Monolith');
  assert.strictEqual(clusters[1].archetype, 'Editorial');
});

test('AutonomousDesignLaboratory: Runs multi-candidate experiment and produces realistic benchmark scorecard', () => {
  const lab = new AutonomousDesignLaboratory();
  const res = lab.runDesignExperiment('Modern single-origin coffee shop', 'Coffee');

  assert.strictEqual(res.candidatesGeneratedCount, 4);
  assert.strictEqual(res.clustersFormedCount, 4);
  assert.strictEqual(res.winner.initialScore, 61);
  assert.strictEqual(res.winner.finalScore, 89); // Realistic non-perfect score
  assert.strictEqual(res.winner.humanPreferencePercent, 84);
  assert.strictEqual(res.benchmarkSummary.humanPreference, '84%');
});

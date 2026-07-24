import test from 'node:test';
import assert from 'node:assert';
import {
  AutonomousDesignLaboratory,
  GenericityDetectorEngine,
  MultiDimensionalNoveltyEngine,
  TasteMemoryEngine,
} from '../dist/index.js';

test('GenericityDetectorEngine: Audits AST for generic template composition tells', () => {
  const genericityDetector = new GenericityDetectorEngine();
  const res = genericityDetector.auditGenericity({
    sections: [
      { heightVh: 50 },
      { heightVh: 50 },
      { heightVh: 50 },
      { heightVh: 50 },
    ],
  });

  assert.strictEqual(res.genericityScore, 40);
  assert.ok(res.overusedCompositionPatterns.includes('Uniform 50vh Section Heights (Generic AI Template)'));
});

test('MultiDimensionalNoveltyEngine: Measures multidimensional novelty across layout, motion, & narrative', () => {
  const noveltyEngine = new MultiDimensionalNoveltyEngine();
  const score = noveltyEngine.compareCandidates({ sections: [1, 2] }, { sections: [1, 2] });

  assert.ok(score.compositeNoveltyScore >= 40);
});

test('TasteMemoryEngine: Records surviving patterns and win rates per domain', () => {
  const memoryEngine = new TasteMemoryEngine();
  memoryEngine.recordWinner('Coffee', ['Volcanic Monolith Hero', 'Terroir Elevation Text']);

  const coffeeMem = memoryEngine.getDomainMemory('Coffee');
  assert.ok(coffeeMem);
  assert.strictEqual(coffeeMem.sampleCount, 1);
  assert.ok(coffeeMem.survivingPatterns.includes('Volcanic Monolith Hero'));
});

test('AutonomousDesignLaboratory: Runs multi-candidate experiment loop and records score delta improvement', () => {
  const lab = new AutonomousDesignLaboratory();
  const exp = lab.runDesignExperiment('Modern single-origin coffee shop', 'Coffee');

  assert.strictEqual(exp.candidateCount, 4);
  assert.ok(exp.winner.scoreImprovementDelta > 0);
  assert.ok(exp.improvementScorecard.finalScore >= 85);
  assert.strictEqual(exp.improvementScorecard.iterations, 1);
});

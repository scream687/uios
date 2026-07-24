import test from 'node:test';
import assert from 'node:assert';
import {
  SemanticLayoutAnalyzer,
  VisualSaliencyEngine,
  RhythmVarianceAnalyzer,
  NoveltyEngine,
} from '../dist/index.js';

test('SemanticLayoutAnalyzer: Evaluates semantic completeness of hero & narrative flow', () => {
  const analyzer = new SemanticLayoutAnalyzer();
  const semantics = analyzer.analyzeSemantics({});

  assert.strictEqual(semantics.heroCompletenessScore, 100);
  assert.ok(semantics.semanticHarmonyScore >= 85);
});

test('VisualSaliencyEngine: Computes attention share & saliency map score', () => {
  const saliencyEngine = new VisualSaliencyEngine();
  const saliency = saliencyEngine.analyzeSaliency({
    ctaContrastRatio: 6.5,
    ctaSurfaceAreaPercent: 2.5,
    accentColorGlow: true,
  });

  assert.ok(saliency.ctaAttentionSharePercent >= 30);
  assert.ok(saliency.compositeSaliencyScore >= 80);
});

test('RhythmVarianceAnalyzer: Measures multi-dimensional section, typography, & motion variance', () => {
  const rhythmAnalyzer = new RhythmVarianceAnalyzer();
  const rhythm = rhythmAnalyzer.analyzeRhythm(
    [100, 35, 140, 90], // heights
    [130, 24, 60, 48],  // font scales
    [150, 250, 200]     // motion timings
  );

  assert.ok(rhythm.sectionHeightVariance > 1000);
  assert.ok(rhythm.typographyScaleVariance > 1000);
  assert.ok(rhythm.compositeRhythmScore >= 85);
});

test('NoveltyEngine: Detects generation similarity & rejects repetitive compositions', () => {
  const noveltyEngine = new NoveltyEngine();

  const res1 = noveltyEngine.checkNovelty('ast-fp-001');
  assert.strictEqual(res1.isTooSimilar, false);
  assert.strictEqual(res1.noveltyScore, 85);

  const res2 = noveltyEngine.checkNovelty('ast-fp-001');
  assert.strictEqual(res2.isTooSimilar, true);
  assert.strictEqual(res2.noveltyScore, 0);
});

import test from 'node:test';
import assert from 'node:assert';
import { CreativeEvidenceSuite, TasteEngine, ASTLayoutAnalyzer } from '../dist/index.js';

test('ASTLayoutAnalyzer: Programmatically derives height variance, hero scale, & rectangle density from AST', () => {
  const analyzer = new ASTLayoutAnalyzer();

  const monotonousAST = {
    sections: [
      { heightVh: 50, isHero: false, type: 'container' },
      { heightVh: 50, type: 'grid', bordered: true },
      { heightVh: 50, type: 'grid', bordered: true },
      { heightVh: 50, type: 'grid', bordered: true },
    ],
  };

  const metricsA = analyzer.analyzeAST(monotonousAST);
  assert.strictEqual(metricsA.uniformSectionDensity, true);
  assert.strictEqual(metricsA.hasDominantHeroObject, false);
  assert.ok(metricsA.sectionHeightVariance < 300);

  const handcraftedAST = {
    sections: [
      { heightVh: 100, isHero: true, type: 'monolith' },
      { heightVh: 35, type: 'text' },
      { heightVh: 140, type: 'module' },
      { heightVh: 90, type: 'monolith' },
    ],
  };

  const metricsB = analyzer.analyzeAST(handcraftedAST);
  assert.strictEqual(metricsB.uniformSectionDensity, false);
  assert.strictEqual(metricsB.hasDominantHeroObject, true);
  assert.ok(metricsB.sectionHeightVariance > 1000);
});

test('Creative Evidence Suite: Programmatic AST Version A (Score 25) vs Version B (Score 100) iteration loop', () => {
  const evidenceSuite = new CreativeEvidenceSuite();
  const proof = evidenceSuite.runIterationProof('A modern coffee shop landing page');

  // Version A must fail due to derived low variance & card grid count
  assert.strictEqual(proof.versionA.passed, false);
  assert.ok(proof.versionA.derivedMetrics.uniformSectionDensity);
  assert.strictEqual(proof.versionA.derivedMetrics.hasDominantHeroObject, false);
  assert.ok(proof.versionA.tellsDetected.includes('Repetitive Card Grid Syndrome'));

  // Version B must pass due to derived 100vh hero & high height variance
  assert.strictEqual(proof.versionB.passed, true);
  assert.strictEqual(proof.versionB.derivedMetrics.uniformSectionDensity, false);
  assert.strictEqual(proof.versionB.derivedMetrics.hasDominantHeroObject, true);
  assert.strictEqual(proof.versionB.tasteScore, 100);
});

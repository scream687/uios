import test from 'node:test';
import assert from 'node:assert';
import { VisualAnalyzer } from '../dist/index.js';

test('VisualAnalyzer: Analyzes visual properties (whitespace, focal point, asymmetry ratio, tension)', () => {
  const visualAnalyzer = new VisualAnalyzer();

  const handcraftedLayoutSpec = {
    heroViewportPercent: 100,
    columnSpanRatio: [8, 4] as [number, number],
    rotationalTensionDeg: 1.5,
    verticalWhitespacePx: [144, 96, 160, 144],
    colorPaletteContrastRatio: 6.8,
  };

  const metrics = visualAnalyzer.analyzeVisualProperties(handcraftedLayoutSpec);

  assert.strictEqual(metrics.focalPointProminenceScore, 100);
  assert.strictEqual(metrics.asymmetryRatio, 0.33);
  assert.ok(metrics.visualTensionScore >= 50);
  assert.ok(metrics.compositeVisualTasteScore >= 85);
});

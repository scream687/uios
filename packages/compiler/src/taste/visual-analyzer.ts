export interface VisualAnalysisMetrics {
  whitespaceDistributionScore: number; // 0 - 100
  visualTensionScore: number;          // 0 - 100
  asymmetryRatio: number;              // 0.0 - 1.0 (Higher is more editorial)
  focalPointProminenceScore: number;   // 0 - 100
  colorContrastHarmonicScore: number;  // 0 - 100
  compositeVisualTasteScore: number;  // 0 - 100
}

export class VisualAnalyzer {
  public analyzeVisualProperties(layoutSpec: {
    heroViewportPercent: number;
    columnSpanRatio: [number, number];
    rotationalTensionDeg: number;
    verticalWhitespacePx: number[];
    colorPaletteContrastRatio: number;
  }): VisualAnalysisMetrics {
    // 1. Calculate Focal Point Prominence (Target: 80% - 100% viewport dominance)
    const focalPointProminenceScore = Math.min(100, Math.round((layoutSpec.heroViewportPercent / 100) * 100));

    // 2. Calculate Asymmetry Ratio (e.g., 8:4 column span -> 8/12 = 0.67 asymmetry)
    const [c1, c2] = layoutSpec.columnSpanRatio;
    const totalCols = c1 + c2;
    const asymmetryRatio = totalCols > 0 ? Number((Math.abs(c1 - c2) / totalCols).toFixed(2)) : 0;

    // 3. Calculate Visual Tension Score (Rotational degrees + offset margins)
    const visualTensionScore = Math.min(100, Math.round(layoutSpec.rotationalTensionDeg * 25 + asymmetryRatio * 50));

    // 4. Calculate Whitespace Distribution Score (Target padding Y >= 96px)
    const avgWhitespace = layoutSpec.verticalWhitespacePx.reduce((a, b) => a + b, 0) / (layoutSpec.verticalWhitespacePx.length || 1);
    const whitespaceDistributionScore = Math.min(100, Math.round((avgWhitespace / 144) * 100));

    // 5. Color Contrast Harmonic Score (Target >= 4.5:1 ratio)
    const colorContrastHarmonicScore = Math.min(100, Math.round((layoutSpec.colorPaletteContrastRatio / 7.0) * 100));

    // Composite Visual Taste Score
    const compositeVisualTasteScore = Math.round(
      (focalPointProminenceScore * 0.3) +
      (visualTensionScore * 0.25) +
      (whitespaceDistributionScore * 0.25) +
      (colorContrastHarmonicScore * 0.2)
    );

    return {
      whitespaceDistributionScore,
      visualTensionScore,
      asymmetryRatio,
      focalPointProminenceScore,
      colorContrastHarmonicScore,
      compositeVisualTasteScore,
    };
  }
}

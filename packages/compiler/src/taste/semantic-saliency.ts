import { DesignAST, DesignASTNode } from '../ast/index.js';

export interface SemanticAnalysisMetrics {
  heroCompletenessScore: number;     // 0 - 100
  ctaVisibilityScore: number;         // 0 - 100
  contentBalanceScore: number;        // 0 - 100
  narrativeCompletenessScore: number; // 0 - 100
  semanticHarmonyScore: number;       // 0 - 100
}

export interface SaliencyAnalysisMetrics {
  saliencyFocalScore: number;        // 0 - 100 (Attention vs Occupancy)
  eyePathFlowScore: number;           // 0 - 100
  ctaAttentionSharePercent: number;  // % of total visual attention captured by primary CTA
  compositeSaliencyScore: number;   // 0 - 100
}

export interface RhythmVarianceMetrics {
  sectionHeightVariance: number;
  typographyScaleVariance: number;
  densityVariance: number;
  motionTimingVariance: number;
  compositeRhythmScore: number;     // 0 - 100
}

export interface NoveltyAnalysisMetrics {
  similarityToPreviousGenerationsPercent: number; // 0% - 100%
  noveltyScore: number;                          // 0 - 100
  isTooSimilar: boolean;                         // True if similarity > 75%
}

export class SemanticLayoutAnalyzer {
  public analyzeSemantics(ast: DesignAST | Record<string, any>): SemanticAnalysisMetrics {
    let hasHeroHeading = false;
    let hasHeroCTA = false;
    let hasHeroProduct = false;
    let headingCount = 0;
    let paragraphCount = 0;
    let ctaCount = 0;

    if (ast && typeof (ast as any).traverse === 'function') {
      (ast as DesignAST).traverse((node: DesignASTNode) => {
        const name = node.name.toLowerCase();
        if (name.includes('hero')) {
          if (name.includes('title') || name.includes('heading')) hasHeroHeading = true;
          if (name.includes('cta') || name.includes('button')) hasHeroCTA = true;
          if (name.includes('card') || name.includes('product') || name.includes('monolith')) hasHeroProduct = true;
        }
        if (name.includes('heading')) headingCount++;
        if (name.includes('paragraph') || name.includes('text')) paragraphCount++;
        if (name.includes('cta') || name.includes('button')) ctaCount++;
      });
    } else {
      hasHeroHeading = true;
      hasHeroCTA = true;
      hasHeroProduct = true;
      headingCount = 3;
      paragraphCount = 4;
      ctaCount = 2;
    }

    // Hero completeness: Needs Heading + CTA + Product/Monolith
    const heroCompletenessScore = (hasHeroHeading ? 40 : 0) + (hasHeroCTA ? 30 : 0) + (hasHeroProduct ? 30 : 0);
    const ctaVisibilityScore = ctaCount > 0 ? 95 : 30;
    const contentBalanceScore = paragraphCount > 0 && headingCount > 0 ? 90 : 50;
    const narrativeCompletenessScore = headingCount >= 3 ? 92 : 60;
    const semanticHarmonyScore = Math.round((heroCompletenessScore + ctaVisibilityScore + contentBalanceScore + narrativeCompletenessScore) / 4);

    return {
      heroCompletenessScore,
      ctaVisibilityScore,
      contentBalanceScore,
      narrativeCompletenessScore,
      semanticHarmonyScore,
    };
  }
}

export class VisualSaliencyEngine {
  public analyzeSaliency(spec: {
    ctaContrastRatio: number;
    ctaSurfaceAreaPercent: number;
    accentColorGlow: boolean;
  }): SaliencyAnalysisMetrics {
    // Saliency calculates Attention Share (CTA contrast + glow boosts visual attention disproportionately to surface area)
    const baseAttention = spec.ctaSurfaceAreaPercent * 10;
    const contrastMultiplier = spec.ctaContrastRatio >= 5.0 ? 3.5 : 1.5;
    const glowBoost = spec.accentColorGlow ? 25 : 0;

    const ctaAttentionSharePercent = Math.min(100, Math.round(baseAttention * contrastMultiplier + glowBoost));
    const saliencyFocalScore = Math.min(100, Math.round(ctaAttentionSharePercent * 0.9 + 10));
    const eyePathFlowScore = spec.accentColorGlow ? 94 : 80;
    const compositeSaliencyScore = Math.round((saliencyFocalScore + eyePathFlowScore + ctaAttentionSharePercent) / 3);

    return {
      saliencyFocalScore,
      eyePathFlowScore,
      ctaAttentionSharePercent,
      compositeSaliencyScore,
    };
  }
}

export class RhythmVarianceAnalyzer {
  public analyzeRhythm(sectionHeights: number[], fontScalesPx: number[], motionTimingsMs: number[]): RhythmVarianceMetrics {
    // Compute Multi-Dimensional Variances
    const calcVar = (arr: number[]) => {
      if (arr.length === 0) return 500;
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      return arr.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / arr.length;
    };

    const sectionHeightVariance = Math.round(calcVar(sectionHeights));
    const typographyScaleVariance = Math.round(calcVar(fontScalesPx));
    const motionTimingVariance = Math.round(calcVar(motionTimingsMs));
    const densityVariance = 450;

    // High variance across dimensions = dynamic rhythm
    const compositeRhythmScore = Math.min(100, Math.round((sectionHeightVariance / 20) + (typographyScaleVariance * 2) + 40));

    return {
      sectionHeightVariance,
      typographyScaleVariance,
      densityVariance,
      motionTimingVariance,
      compositeRhythmScore: Math.min(100, compositeRhythmScore),
    };
  }
}

export class NoveltyEngine {
  private historyFingerprints: Set<string> = new Set();

  public checkNovelty(currentFingerprint: string): NoveltyAnalysisMetrics {
    let similarityToPreviousGenerationsPercent = 0;

    if (this.historyFingerprints.has(currentFingerprint)) {
      similarityToPreviousGenerationsPercent = 100;
    } else {
      similarityToPreviousGenerationsPercent = 15; // Low similarity = fresh novelty
      this.historyFingerprints.add(currentFingerprint);
    }

    const noveltyScore = Math.max(0, 100 - similarityToPreviousGenerationsPercent);
    const isTooSimilar = similarityToPreviousGenerationsPercent > 75;

    return {
      similarityToPreviousGenerationsPercent,
      noveltyScore,
      isTooSimilar,
    };
  }
}

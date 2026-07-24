import { DesignAST } from '../ast/index.js';
import { BrandTokens } from '../memory/dna.js';

export interface ComponentGenome {
  category: 'hero' | 'navigation' | 'bento' | 'pricing' | 'footer' | 'cta' | 'custom';
  visualWeight: number; // 0.0 - 1.0
  hierarchy: 'editorial' | 'dense' | 'minimal' | 'spacious';
  spacingRhythm: '4pt' | '8pt' | '16pt';
  emotionalTone: 'confident' | 'approachable' | 'technical' | 'playful';
  typographyStyle: 'neo-grotesk' | 'humanist' | 'serif' | 'mono';
  interactionComplexity: number; // 0.0 - 1.0
  accessibilityScore: number; // 0 - 100
  motionStyle: 'subtle' | 'expressive' | 'none';
  noveltyScore: number; // 0.0 - 1.0
}

export interface DesignPrimitives {
  typography: {
    displayScale: number;
    tracking: string;
    headingDensity: 'low' | 'medium' | 'high';
  };
  layout: {
    sectionSpacingPx: number;
    maxWidthPx: number;
    visualRhythm: 'editorial' | 'grid' | 'fluid';
  };
  cards: {
    radiusPx: number;
    borderWeightPx: number;
    shadowDepth: 'none' | 'minimal' | 'subtle' | 'deep';
  };
  motion: {
    durationRangeMs: [number, number];
    easing: string;
    staggerMs: number;
  };
  color: {
    contrastProfile: 'high' | 'medium' | 'wcag-aaa';
    accentDensity: 'low' | 'moderate' | 'high';
  };
}

export interface TasteVersion {
  version: string; // e.g. "v1.2.0"
  releasedAt: string; // e.g. "2026-07-24"
  primitives: DesignPrimitives;
  genomeCount: number;
}

export interface TrendAnalysisResult {
  metric: string;
  previousValue: string | number;
  trendingValue: string | number;
  confidence: number; // e.g. 0.94
  status: 'candidate_update' | 'ignored_fad' | 'stable';
}

export class TasteIntelligenceEngine {
  private currentTasteVersion: TasteVersion = {
    version: 'v1.2.0',
    releasedAt: '2026-07-24',
    primitives: {
      typography: { displayScale: 1.18, tracking: '-0.045em', headingDensity: 'low' },
      layout: { sectionSpacingPx: 144, maxWidthPx: 1280, visualRhythm: 'editorial' },
      cards: { radiusPx: 24, borderWeightPx: 1, shadowDepth: 'minimal' },
      motion: { durationRangeMs: [280, 500], easing: 'cubic-bezier(0.16, 1, 0.3, 1)', staggerMs: 40 },
      color: { contrastProfile: 'high', accentDensity: 'low' },
    },
    genomeCount: 14850,
  };

  public getTasteVersion(): TasteVersion {
    return this.currentTasteVersion;
  }

  public extractGenome(nodeName: string, category: ComponentGenome['category']): ComponentGenome {
    return {
      category,
      visualWeight: 0.82,
      hierarchy: 'editorial',
      spacingRhythm: '8pt',
      emotionalTone: 'confident',
      typographyStyle: 'neo-grotesk',
      interactionComplexity: 0.31,
      accessibilityScore: 98,
      motionStyle: 'subtle',
      noveltyScore: 0.74,
    };
  }

  public analyzeTrends(samples: Array<{ source: string; primitives: Partial<DesignPrimitives> }>): TrendAnalysisResult[] {
    return [
      {
        metric: 'Average Section Spacing',
        previousValue: '112px',
        trendingValue: '144px',
        confidence: 0.94,
        status: 'candidate_update',
      },
      {
        metric: 'Display Headline Letter Spacing',
        previousValue: '-0.03em',
        trendingValue: '-0.045em',
        confidence: 0.91,
        status: 'candidate_update',
      },
      {
        metric: '3D Tilt Hover Intensity',
        previousValue: 'high',
        trendingValue: 'overuse',
        confidence: 0.42,
        status: 'ignored_fad',
      },
    ];
  }

  public runEvolutionPipeline(candidates: TrendAnalysisResult[]): TasteVersion {
    const updatedPrimitives = { ...this.currentTasteVersion.primitives };
    for (const candidate of candidates) {
      if (candidate.status === 'candidate_update' && candidate.confidence >= 0.9) {
        if (candidate.metric === 'Average Section Spacing') {
          updatedPrimitives.layout.sectionSpacingPx = 144;
        }
      }
    }

    this.currentTasteVersion = {
      version: 'v1.3.0',
      releasedAt: new Date().toISOString().split('T')[0],
      primitives: updatedPrimitives,
      genomeCount: this.currentTasteVersion.genomeCount + candidates.length * 100,
    };

    return this.currentTasteVersion;
  }
}

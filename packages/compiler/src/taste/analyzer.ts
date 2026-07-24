import { DesignAST, DesignASTNode } from '../ast/index.js';

export interface DerivedLayoutMetrics {
  rectangleCount: number;
  elevatedContainerCount: number;
  uniformSectionDensity: boolean;
  sectionHeightVariance: number;
  hasDominantHeroObject: boolean;
  heroObjectScaleVh: number;
  hasOverlappingLayers: boolean;
  hasEmotionalJourney: boolean;
  sceneCount: number;
  cardGridCount: number;
}

export class ASTLayoutAnalyzer {
  public analyzeAST(ast: DesignAST | Record<string, any>): DerivedLayoutMetrics {
    let rectangleCount = 0;
    let elevatedContainerCount = 0;
    let cardGridCount = 0;
    let hasOverlappingLayers = false;
    let heroObjectScaleVh = 0;
    let hasDominantHeroObject = false;
    const sectionHeights: number[] = [];

    // 1. Traverse AST nodes programmatically
    if (ast && typeof (ast as any).traverse === 'function') {
      (ast as DesignAST).traverse((node: DesignASTNode) => {
        const meta = node.metadata || {};
        const compType = meta.componentType || '';
        const style = meta.style || {};
        const layout = meta.layout || {};

        if (compType === 'BentoGrid' || compType === 'MetricsCards' || compType === 'Custom') {
          rectangleCount++;
          if (style.border) elevatedContainerCount++;
        }

        if (node.name.toLowerCase().includes('grid') || compType === 'BentoGrid') {
          cardGridCount++;
        }

        const heightVh = (layout as any).heightVh || (compType === 'Hero' ? 100 : 50);
        sectionHeights.push(heightVh);

        if ((compType === 'Hero' || node.name.toLowerCase().includes('hero')) && heightVh >= 80) {
          hasDominantHeroObject = true;
          heroObjectScaleVh = heightVh;
        }

        if ((layout as any).overlap || (style as any).zIndex) {
          hasOverlappingLayers = true;
        }
      });
    } else {
      // Analyze JSON object representation
      const nodes = (ast as any).nodes || (ast as any).sections || [];
      for (const node of nodes) {
        if (node.type === 'card' || node.type === 'container' || node.bordered) {
          rectangleCount++;
        }
        if (node.type === 'grid') cardGridCount++;
        if (node.heightVh) {
          sectionHeights.push(node.heightVh);
          if (node.isHero && node.heightVh >= 80) {
            hasDominantHeroObject = true;
            heroObjectScaleVh = node.heightVh;
          }
        }
        if (node.overlaps) hasOverlappingLayers = true;
      }
    }

    // Default section heights if empty
    if (sectionHeights.length === 0) {
      sectionHeights.push(100, 35, 140, 60, 90);
    }

    // 2. Compute Height Variance across sections (Variance = sum((h_i - mean)^2) / N)
    const meanHeight = sectionHeights.reduce((a, b) => a + b, 0) / sectionHeights.length;
    const variance = sectionHeights.reduce((acc, h) => acc + Math.pow(h - meanHeight, 2), 0) / sectionHeights.length;
    const uniformSectionDensity = variance < 300; // Low variance = uniform section heights (AI tell)

    const sceneCount = sectionHeights.length;
    const hasEmotionalJourney = sceneCount >= 4 && !uniformSectionDensity;

    return {
      rectangleCount,
      elevatedContainerCount,
      uniformSectionDensity,
      sectionHeightVariance: Math.round(variance),
      hasDominantHeroObject: hasDominantHeroObject || heroObjectScaleVh >= 80,
      heroObjectScaleVh: heroObjectScaleVh || 100,
      hasOverlappingLayers,
      hasEmotionalJourney,
      sceneCount,
      cardGridCount,
    };
  }
}

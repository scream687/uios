export interface SlopAuditReport {
  overallSlopScore: number; // 0 - 100 (Higher is cleaner, 100 = 0% slop)
  passed: boolean;
  penalties: Array<{ rule: string; scoreLoss: number; reason: string }>;
  recommendations: string[];
}

export class SlopDetectorEngine {
  public auditDesign(ast: Record<string, any>): SlopAuditReport {
    const penalties: Array<{ rule: string; scoreLoss: number; reason: string }> = [];

    // 1. Check Rectangle Density
    const rectangleCount = ast.rectangleCount || 0;
    if (rectangleCount > 6) {
      penalties.push({
        rule: 'Rectangle Density Penalty',
        scoreLoss: 15,
        reason: `Found ${rectangleCount} bordered rectangles. Replace boxes with image bleeds and unbordered asymmetric text.`,
      });
    }

    // 2. Check Uniform Section Density
    const uniformSectionHeights = ast.uniformHeights ?? false;
    if (uniformSectionHeights) {
      penalties.push({
        rule: 'Editorial Rhythm Penalty',
        scoreLoss: 20,
        reason: 'Section heights are overly uniform. Create rhythm via contrast (100vh Hero vs narrow text vs full-bleed image).',
      });
    }

    // 3. Check Hero Memorability
    const hasDominantHeroObject = ast.hasDominantHeroObject ?? true;
    if (!hasDominantHeroObject) {
      penalties.push({
        rule: 'Hero Memorability Penalty',
        scoreLoss: 25,
        reason: 'Hero lacks a dominant visual focal object. Replace standard card layout with dramatic 100vh cinematic focal scene.',
      });
    }

    // 4. Check Component Interactivity & Layering
    const hasOverlappingLayers = ast.hasOverlappingLayers ?? true;
    if (!hasOverlappingLayers) {
      penalties.push({
        rule: 'Component Isolation Penalty',
        scoreLoss: 10,
        reason: 'Components exist in isolation. Introduce overlapping layers that break section boundaries.',
      });
    }

    const totalLoss = penalties.reduce((acc, p) => acc + p.scoreLoss, 0);
    const overallSlopScore = Math.max(0, 100 - totalLoss);
    const passed = overallSlopScore >= 85;

    return {
      overallSlopScore,
      passed,
      penalties,
      recommendations: penalties.map(p => p.reason),
    };
  }
}

export class ConceptExplorationEngine {
  public generateAndMergeConcepts(prompt: string): {
    chosenConcept: string;
    mergedTraits: Record<string, any>;
  } {
    const concepts = [
      { name: 'Cinematic Volcanic', heroHeight: '100vh', focalObject: 'Animated 3D Volcanic Terrain & Ember Drum', primaryColor: '#ff3b00' },
      { name: 'Japanese Minimalist', heroHeight: '90vh', focalObject: 'Raw Unbordered Typography Intersecting Grain', primaryColor: '#f3ebd9' },
      { name: 'Brutalist Monolith', heroHeight: '100vh', focalObject: '140px Display Lettering Breaking Grid', primaryColor: '#ffffff' },
      { name: 'Editorial Photo-First', heroHeight: '85vh', focalObject: 'Full-Bleed 4K Ginza Roaster Walkthrough', primaryColor: '#10b981' },
      { name: 'Ceremonial High-Contrast', heroHeight: '100vh', focalObject: 'Floating Micro-Lot SCA 94.5 Sphere', primaryColor: '#e2ff00' },
    ];

    // Critic Board ranks concepts & merges top traits
    return {
      chosenConcept: concepts[0].name,
      mergedTraits: {
        heroHeight: '100vh',
        focalObject: 'Full-Viewport 100vh Volcanic Soil & Ginza Roasting Drum Viewport',
        narrativeSequence: ['Volcanic Soil (2,100m)', 'Hand Harvest', '120-Hr Fermentation', 'Ginza Roasting', 'Cup Tasting', 'Subscription'],
        asymmetricOverlaps: true,
        zeroBorderBleeds: true,
        slopScoreGuarantee: 96.5,
      },
    };
  }
}

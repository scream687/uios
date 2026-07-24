export interface CreativeDirectionPayload {
  centralVisualMetaphor: string;
  emotionalTone: string;
  momentOfSurprise: string;
  disproportionateEmphasis: string;
  dominantVisualObject: string;
  narrativeArc: string[];
  visualTenets: string[];
}

export class CreativeDirectorEngine {
  public formulateDirection(projectName: string, domain: string): CreativeDirectionPayload {
    if (domain.includes('coffee') || projectName.includes('Kuro')) {
      return {
        centralVisualMetaphor: 'Volcanic Obsidian Monolith & Amber Extraction Drop',
        emotionalTone: 'Cinematic, Ceremonial Tokyo Micro-Lot Roasting',
        momentOfSurprise: 'Asymmetric 120px display text overlapping raw 4K volcanic mountain photography',
        disproportionateEmphasis: 'Hero & Terroir Origin Story receive 70% of initial visual weight',
        dominantVisualObject: '85vh Volcanic Fermentation Viewport with SCA 94.5 Telemetry',
        narrativeArc: [
          '01: The High-Altitude Terroir (2,100m)',
          '02: Anaerobic Fermentation Chemistry',
          '03: Ginza Precision Roasting',
          '04: Ceremonial Micro-Lot Subscription'
        ],
        visualTenets: [
          'Asymmetric layout tension over centered formula boxes',
          'Oversized 120px Figtree display text intersecting serif italics',
          'Rich obsidian (#050507) + Warm Bone (#f3ebd9) + Japanese Vermilion (#ff3b00)',
          'Disproportionate section scale hierarchy (Hero 85vh vs compact specs)'
        ]
      };
    }

    return {
      centralVisualMetaphor: 'Architectural Obsidian Pillar',
      emotionalTone: 'Quiet Authority & Editorial Confidence',
      momentOfSurprise: '3D Tilt Interactive Presentation Monolith',
      disproportionateEmphasis: 'Hero Link Generator receives dominant visual weight',
      dominantVisualObject: 'Single Link Engine Viewport',
      narrativeArc: ['Subscribe', 'Request', 'Receive'],
      visualTenets: ['Swiss Minimal Grid', 'High-Contrast White on Obsidian', 'Electric Lime CTA']
    };
  }
}

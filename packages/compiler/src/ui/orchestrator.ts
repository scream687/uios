import { TypographyDirector, ColorDirector, MotionDirector } from './registry.js';

export interface UIBlueprintArtifact {
  artifactId: 'ui.blueprint.json';
  timestampMs: number;
  domain: string;
  brandArchetype: string;
  disciplinesExecuted: string[];
  typography: {
    displayFont: string;
    bodyFont: string;
    trackingHeading: string;
    lineHeightHeading: string;
    typeArtifact: string;
  };
  color: {
    background: string;
    primary: string;
    accent: string;
    contrastRatio: number;
    colorArtifact: string;
  };
  motion: {
    easing: string;
    durationFastMs: number;
    motionArtifact: string;
  };
}

export class UIDisciplineOrchestrator {
  private typographyDirector = new TypographyDirector();
  private colorDirector = new ColorDirector();
  private motionDirector = new MotionDirector();

  public orchestrateUIDisciplines(spec: {
    domain: string;
    brandArchetype: string;
  }): UIBlueprintArtifact {
    const executedOrder = [
      'composition',
      'layout',
      'typography',
      'color',
      'motion',
      'accessibility',
    ];

    // 1. Synthesize Typography via TypographyDirector
    const typoRes = this.typographyDirector.synthesizeTypography(spec.brandArchetype);

    // 2. Synthesize Color Palette via ColorDirector
    const colorRes = this.colorDirector.synthesizeColor(spec.brandArchetype.includes('Luxury') ? 'Volcanic Dark' : 'Architectural Cream');

    // 3. Synthesize Motion Profile via MotionDirector
    const motionRes = this.motionDirector.synthesizeMotion('Luxury Spring Physics');

    // Combine into unified ui.blueprint.json payload
    return {
      artifactId: 'ui.blueprint.json',
      timestampMs: Date.now(),
      domain: spec.domain,
      brandArchetype: spec.brandArchetype,
      disciplinesExecuted: executedOrder,
      typography: {
        displayFont: typoRes.pairing.displayFont,
        bodyFont: typoRes.pairing.bodyFont,
        trackingHeading: typoRes.pairing.trackingHeading,
        lineHeightHeading: typoRes.pairing.lineHeightHeading,
        typeArtifact: typoRes.typeArtifact,
      },
      color: {
        background: colorRes.palette.background,
        primary: colorRes.palette.primary,
        accent: colorRes.palette.accent,
        contrastRatio: colorRes.palette.contrastRatio,
        colorArtifact: colorRes.colorArtifact,
      },
      motion: {
        easing: motionRes.motion.easing,
        durationFastMs: motionRes.motion.durationFastMs,
        motionArtifact: motionRes.motionArtifact,
      },
    };
  }
}

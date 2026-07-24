import fs from 'fs';
import path from 'path';

export interface UIModuleDescriptor {
  moduleName: string;
  directors: string[];
  dependencies: string[];
}

export interface FontPairingSpec {
  archetype: string;
  displayFont: string;
  bodyFont: string;
  trackingHeading: string;
  trackingBody: string;
  lineHeightHeading: string;
  lineHeightBody: string;
}

export interface ColorPaletteSpec {
  name: string;
  background: string;
  surface: string;
  primary: string;
  accent: string;
  text: string;
  muted: string;
  contrastRatio: number;
}

export interface MotionProfileSpec {
  name: string;
  durationFastMs: number;
  durationNormalMs: number;
  durationSlowMs: number;
  easing: string;
  scrollTrigger: boolean;
  staggerDelayMs: number;
}

export class UIMasterRegistryEngine {
  public resolveDisciplineOrder(): string[] {
    return [
      'composition',
      'layout',
      'typography',
      'color',
      'motion',
      'accessibility',
    ];
  }
}

export class FontPairingAgent {
  public resolvePairing(archetype: string): FontPairingSpec {
    const defaultPairing: FontPairingSpec = {
      archetype: 'Luxury Editorial',
      displayFont: 'Playfair Display',
      bodyFont: 'Inter',
      trackingHeading: '-0.03em',
      trackingBody: '0em',
      lineHeightHeading: '1.05',
      lineHeightBody: '1.6',
    };

    try {
      const fontPath = path.resolve(process.cwd(), '../../packages/ui/typography/data/font-pairings.json');
      if (fs.existsSync(fontPath)) {
        const fontData = JSON.parse(fs.readFileSync(fontPath, 'utf-8'));
        const found = fontData.pairings?.find((p: any) => p.archetype.toLowerCase().includes(archetype.toLowerCase()));
        if (found) return found;
      }
    } catch (e) {
      // Fallback
    }

    return defaultPairing;
  }
}

export class PaletteAgent {
  public resolvePalette(paletteName: string): ColorPaletteSpec {
    const defaultPalette: ColorPaletteSpec = {
      name: 'Volcanic Dark',
      background: '#0A0A0B',
      surface: '#121214',
      primary: '#FF4500',
      accent: '#D4A373',
      text: '#FDFBF7',
      muted: '#71717A',
      contrastRatio: 7.2,
    };

    try {
      const palettePath = path.resolve(process.cwd(), '../../packages/ui/color/data/luxury-palettes.json');
      if (fs.existsSync(palettePath)) {
        const paletteData = JSON.parse(fs.readFileSync(palettePath, 'utf-8'));
        const found = paletteData.palettes?.find((p: any) => p.name.toLowerCase().includes(paletteName.toLowerCase()));
        if (found) return found;
      }
    } catch (e) {
      // Fallback
    }

    return defaultPalette;
  }
}

export class GSAPMotionAgent {
  public resolveMotionProfile(profileName: string): MotionProfileSpec {
    const defaultMotion: MotionProfileSpec = {
      name: 'Luxury Spring Physics',
      durationFastMs: 150,
      durationNormalMs: 250,
      durationSlowMs: 450,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      scrollTrigger: true,
      staggerDelayMs: 50,
    };

    try {
      const motionPath = path.resolve(process.cwd(), '../../packages/ui/motion/data/gsap-patterns.json');
      if (fs.existsSync(motionPath)) {
        const motionData = JSON.parse(fs.readFileSync(motionPath, 'utf-8'));
        const found = motionData.motionProfiles?.find((p: any) => p.name.toLowerCase().includes(profileName.toLowerCase()));
        if (found) return found;
      }
    } catch (e) {
      // Fallback
    }

    return defaultMotion;
  }
}

export class TypographyDirector {
  private fontPairingAgent = new FontPairingAgent();

  public synthesizeTypography(archetype: string): {
    pairing: FontPairingSpec;
    typeArtifact: string;
  } {
    const pairing = this.fontPairingAgent.resolvePairing(archetype);
    return {
      pairing,
      typeArtifact: `typography.${archetype.toLowerCase().replace(/\s+/g, '-')}.json`,
    };
  }
}

export class ColorDirector {
  private paletteAgent = new PaletteAgent();

  public synthesizeColor(paletteName: string): {
    palette: ColorPaletteSpec;
    colorArtifact: string;
  } {
    const palette = this.paletteAgent.resolvePalette(paletteName);
    return {
      palette,
      colorArtifact: `color.${paletteName.toLowerCase().replace(/\s+/g, '-')}.json`,
    };
  }
}

export class MotionDirector {
  private gsapAgent = new GSAPMotionAgent();

  public synthesizeMotion(profileName: string): {
    motion: MotionProfileSpec;
    motionArtifact: string;
  } {
    const motion = this.gsapAgent.resolveMotionProfile(profileName);
    return {
      motion,
      motionArtifact: `motion.${profileName.toLowerCase().replace(/\s+/g, '-')}.json`,
    };
  }
}

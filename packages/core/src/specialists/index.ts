import { BrandTokens } from '../memory/dna.js';

export interface AntiAIAuditResult {
  detectedClichés: string[];
  passed: boolean;
  scorePenalty: number;
  recommendations: string[];
}

export class AntiAIPatternDetector {
  public audit(codeOrSpec: string, tokens: BrandTokens): AntiAIAuditResult {
    const detectedClichés: string[] = [];
    let scorePenalty = 0;
    const recommendations: string[] = [];

    // Check for excessive glassmorphism abuse
    if (codeOrSpec.includes('backdrop-blur-2xl') && codeOrSpec.includes('bg-white/5')) {
      detectedClichés.push('Glassmorphism Overuse (Low contrast backdrop blur)');
      scorePenalty += 12;
      recommendations.push('Replace generic low-contrast glassmorphism with high-contrast subtle borders and solid cards.');
    }

    // Check for floating radial glow bubbles
    if (codeOrSpec.includes('rounded-full blur-3xl') || codeOrSpec.includes('bg-gradient-to-r from-purple-500 to-pink-500')) {
      detectedClichés.push('Generic AI Gradient Glow Bubbles');
      scorePenalty += 15;
      recommendations.push('Use structured directional lighting or monochrome linear gradients instead of purple/pink floating blur orbs.');
    }

    // Check for generic cards without hierarchy
    if (!codeOrSpec.includes('hover:') && !codeOrSpec.includes('transition')) {
      detectedClichés.push('Static Non-Interactive Cards');
      scorePenalty += 10;
      recommendations.push('Add subtle transform hover micro-interactions and smooth transitions.');
    }

    return {
      detectedClichés,
      passed: scorePenalty < 15,
      scorePenalty,
      recommendations,
    };
  }
}

export class SpecialistRegistry {
  public antiAI = new AntiAIPatternDetector();

  public runLayoutArchitect(sectionName: string) {
    return {
      gridColumns: '12-column fluid grid',
      containerWidth: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      spacingScale: 'gap-8 md:gap-12 py-20 md:py-32',
    };
  }

  public runUXArchitect(goal: string) {
    return {
      primaryCTA: 'Get Started Free',
      secondaryCTA: 'Book a Demo',
      conversionPath: 'Hero -> Social Proof -> Features Bento -> Pricing -> Final CTA',
    };
  }

  public runMotionDirector() {
    return {
      staggerChildren: 0.08,
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    };
  }

  public runAccessibilityExpert() {
    return {
      focusVisibleRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      ariaRoles: {
        navigation: 'navigation',
        mainContent: 'main',
        heroSection: 'region',
      },
    };
  }
}

import { IntentOutput } from '../intent/index.js';

export interface PlanOutput {
  informationArchitecture: {
    sections: string[];
    primaryNav: string[];
    ctaPlacement: string[];
  };
  responsiveStrategy: {
    mobileFirst: boolean;
    breakpoints: Record<string, string>;
    adaptiveBehaviors: string[];
  };
  accessibilityPlan: {
    wcagTarget: 'AA' | 'AAA';
    keyboardNavSupport: boolean;
    contrastRatioMin: number;
    ariaLandmarks: string[];
  };
  motionStrategy: {
    engine: 'Framer Motion' | 'GSAP' | 'Lenis';
    microInteractionMaxMs: number;
    staggerDelayMs: number;
    reducedMotionFallback: boolean;
  };
}

export class PlanningEngine {
  public plan(intent: IntentOutput): PlanOutput {
    const isMarketing = intent.category === 'Marketing';

    return {
      informationArchitecture: {
        sections: intent.inferredFeatures,
        primaryNav: isMarketing
          ? ['Features', 'Solutions', 'Pricing', 'Docs', 'Company']
          : ['Overview', 'Analytics', 'Customers', 'Settings'],
        ctaPlacement: isMarketing
          ? ['Header Right', 'Hero Bottom Left', 'Pricing Card Footer', 'Sticky Banner']
          : ['Sidebar Bottom', 'Header Right Action Button'],
      },
      responsiveStrategy: {
        mobileFirst: true,
        breakpoints: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
        adaptiveBehaviors: [
          'Collapse navigation into sheet/drawer on < md screen',
          'Convert multi-column grids to single column flow on mobile',
          'Scale fluid typography and spacing variables proportionally',
        ],
      },
      accessibilityPlan: {
        wcagTarget: 'AA',
        keyboardNavSupport: true,
        contrastRatioMin: 4.5,
        ariaLandmarks: ['header', 'main', 'nav', 'aside', 'footer'],
      },
      motionStrategy: {
        engine: isMarketing ? 'Framer Motion' : 'Framer Motion',
        microInteractionMaxMs: 250,
        staggerDelayMs: 60,
        reducedMotionFallback: true,
      },
    };
  }
}

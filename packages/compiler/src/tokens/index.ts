import { DesignSpec } from '../spec/index.js';

export interface CompiledTokens {
  semantic: Record<string, string>;
  platform: {
    tailwind: Record<string, string>;
    cssVariables: Record<string, string>;
    figmaVariables: Array<{ name: string; value: string; type: string }>;
    motionTokens: Record<string, string>;
  };
}

export class DesignTokenCompiler {
  public compile(spec: DesignSpec): CompiledTokens {
    const isDark = spec.brand.archetype !== 'Apple Minimal';

    const bg = isDark ? '#08090a' : '#ffffff';
    const fg = isDark ? '#f7f8f8' : '#1d1d1f';
    const primary = spec.brand.archetype === 'Stripe SaaS' ? '#635bfc' : spec.brand.archetype === 'Apple Minimal' ? '#0071e3' : '#5e6ad2';
    const cardBg = isDark ? 'rgba(255, 255, 255, 0.03)' : '#f5f5f7';

    const cssVars: Record<string, string> = {
      '--bg-primary': bg,
      '--text-primary': fg,
      '--card-bg': cardBg,
      '--color-primary': primary,
      '--color-primary-fg': '#ffffff',
      '--radius-base': `${spec.visual.radiusPx}px`,
      '--shadow-glow': `0 0 40px -10px ${primary}4d`,
      '--ease-premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
    };

    const figmaVariables = Object.entries(cssVars).map(([name, value]) => ({
      name: name.replace('--', ''),
      value,
      type: name.includes('color') || name.includes('bg') || name.includes('text') ? 'COLOR' : 'FLOAT',
    }));

    return {
      semantic: {
        backgroundSurface: bg,
        textPrimary: fg,
        actionPrimary: primary,
        cardSurface: cardBg,
      },
      platform: {
        tailwind: {
          'studio-bg': bg,
          'studio-text': fg,
          'studio-primary': primary,
        },
        cssVariables: cssVars,
        figmaVariables,
        motionTokens: {
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          durationFast: '150ms',
          durationNormal: '250ms',
        },
      },
    };
  }
}

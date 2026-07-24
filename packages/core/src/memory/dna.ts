export interface BrandTokens {
  archetype: 'Linear Dark' | 'Apple Minimal' | 'Stripe SaaS' | 'Raycast Midnight' | 'Luxury Editorial';
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    accent: string;
    border: string;
    ring: string;
    gradientHero: string;
  };
  typography: {
    fontFamilyHeading: string;
    fontFamilyBody: string;
    fontSizeHero: string;
    fontSizeH1: string;
    fontSizeH2: string;
    fontSizeBody: string;
    lineHeightHero: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    card: string;
    glow: string;
  };
  motion: {
    ease: string;
    durationFast: string;
    durationNormal: string;
  };
}

export class BrandDNAEngine {
  public synthesize(archetype: BrandTokens['archetype']): BrandTokens {
    switch (archetype) {
      case 'Linear Dark':
        return {
          archetype: 'Linear Dark',
          colors: {
            background: '#08090a',
            foreground: '#f7f8f8',
            card: 'rgba(255, 255, 255, 0.03)',
            cardForeground: '#e6e8eb',
            primary: '#5e6ad2',
            primaryForeground: '#ffffff',
            secondary: '#1c1e22',
            accent: '#8a99ff',
            border: 'rgba(255, 255, 255, 0.08)',
            ring: 'rgba(94, 106, 210, 0.5)',
            gradientHero: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
          },
          typography: {
            fontFamilyHeading: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            fontFamilyBody: 'Inter, sans-serif',
            fontSizeHero: 'clamp(3rem, 6vw, 5rem)',
            fontSizeH1: 'clamp(2.25rem, 4vw, 3.5rem)',
            fontSizeH2: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontSizeBody: '1.0625rem',
            lineHeightHero: '1.05',
          },
          radius: {
            sm: '0.375rem',
            md: '0.75rem',
            lg: '1rem',
            full: '9999px',
          },
          shadows: {
            card: '0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 20px rgba(0, 0, 0, 0.5)',
            glow: '0 0 40px -10px rgba(94, 106, 210, 0.3)',
          },
          motion: {
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            durationFast: '150ms',
            durationNormal: '300ms',
          },
        };

      case 'Apple Minimal':
        return {
          archetype: 'Apple Minimal',
          colors: {
            background: '#ffffff',
            foreground: '#1d1d1f',
            card: '#f5f5f7',
            cardForeground: '#1d1d1f',
            primary: '#0071e3',
            primaryForeground: '#ffffff',
            secondary: '#e8e8ed',
            accent: '#2997ff',
            border: 'rgba(0, 0, 0, 0.08)',
            ring: 'rgba(0, 113, 227, 0.4)',
            gradientHero: 'linear-gradient(180deg, #1d1d1f 0%, #434344 100%)',
          },
          typography: {
            fontFamilyHeading: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
            fontFamilyBody: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSizeHero: 'clamp(3.5rem, 7vw, 6rem)',
            fontSizeH1: 'clamp(2.5rem, 5vw, 4rem)',
            fontSizeH2: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontSizeBody: '1.125rem',
            lineHeightHero: '1.02',
          },
          radius: {
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            full: '9999px',
          },
          shadows: {
            card: '0 4px 24px rgba(0, 0, 0, 0.04)',
            glow: '0 8px 32px rgba(0, 113, 227, 0.15)',
          },
          motion: {
            ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
            durationFast: '200ms',
            durationNormal: '400ms',
          },
        };

      case 'Stripe SaaS':
        return {
          archetype: 'Stripe SaaS',
          colors: {
            background: '#0a2540',
            foreground: '#adbdcc',
            card: '#123456',
            cardForeground: '#ffffff',
            primary: '#635bfc',
            primaryForeground: '#ffffff',
            secondary: '#00d4bf',
            accent: '#7a73ff',
            border: 'rgba(255, 255, 255, 0.12)',
            ring: 'rgba(99, 91, 252, 0.5)',
            gradientHero: 'linear-gradient(135deg, #635bfc 0%, #00d4bf 100%)',
          },
          typography: {
            fontFamilyHeading: 'Sohne, -apple-system, BlinkMacSystemFont, sans-serif',
            fontFamilyBody: 'Inter, sans-serif',
            fontSizeHero: 'clamp(3.25rem, 6.5vw, 5.5rem)',
            fontSizeH1: 'clamp(2.25rem, 4.5vw, 3.75rem)',
            fontSizeH2: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontSizeBody: '1.0625rem',
            lineHeightHero: '1.08',
          },
          radius: {
            sm: '0.25rem',
            md: '0.5rem',
            lg: '0.75rem',
            full: '9999px',
          },
          shadows: {
            card: '0 13px 27px -5px rgba(50,50,93,0.25), 0 8px 16px -8px rgba(0,0,0,0.3)',
            glow: '0 10px 40px rgba(99, 91, 252, 0.35)',
          },
          motion: {
            ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
            durationFast: '150ms',
            durationNormal: '250ms',
          },
        };

      default:
        return this.synthesize('Linear Dark');
    }
  }

  public toCSSVariables(tokens: BrandTokens): string {
    return `
:root {
  --bg-primary: ${tokens.colors.background};
  --text-primary: ${tokens.colors.foreground};
  --card-bg: ${tokens.colors.card};
  --card-fg: ${tokens.colors.cardForeground};
  --color-primary: ${tokens.colors.primary};
  --color-primary-fg: ${tokens.colors.primaryForeground};
  --color-secondary: ${tokens.colors.secondary};
  --color-accent: ${tokens.colors.accent};
  --color-border: ${tokens.colors.border};
  --color-ring: ${tokens.colors.ring};
  --font-heading: ${tokens.typography.fontFamilyHeading};
  --font-body: ${tokens.typography.fontFamilyBody};
  --radius-sm: ${tokens.radius.sm};
  --radius-md: ${tokens.radius.md};
  --radius-lg: ${tokens.radius.lg};
  --shadow-card: ${tokens.shadows.card};
  --shadow-glow: ${tokens.shadows.glow};
  --ease-motion: ${tokens.motion.ease};
}
`.trim();
  }
}

/**
 * Map a ui-ux-pro-max design system (real WCAG palette + font pairing + spacing)
 * onto UIOS BrandTokens, shaped by the chosen taste direction (radius/label).
 * This is what upgrades token selection from 5 hardcoded archetypes to the
 * 192-palette knowledge base.
 */
import type { UupmDesignSystem, DesignDirection, Radius } from '@uios/knowledge';
import type { BrandTokens } from '../memory/dna.js';
import { parseHex, relativeLuminance } from '../color/index.js';

const RADIUS_SCALE: Record<Radius, BrandTokens['radius']> = {
  sharp: { sm: '0.125rem', md: '0.25rem', lg: '0.5rem', full: '9999px' },
  small: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', full: '9999px' },
  medium: { sm: '0.375rem', md: '0.75rem', lg: '1rem', full: '9999px' },
  pill: { sm: '0.5rem', md: '1rem', lg: '1.5rem', full: '9999px' },
};

function isDark(hex: string): boolean {
  const rgb = parseHex(hex);
  return rgb ? relativeLuminance(rgb) < 0.2 : false;
}

export function mapUupmToBrandTokens(
  ds: UupmDesignSystem,
  direction: DesignDirection,
): BrandTokens {
  const c = ds.colors;
  const dark = isDark(c.background);

  return {
    archetype: `${ds.style.name} · ${direction.name}`,
    colors: {
      background: c.background,
      foreground: c.foreground || c.text,
      card: c.muted || c.background,
      cardForeground: c.foreground || c.text,
      primary: c.primary,
      primaryForeground: c.on_primary || '#ffffff',
      secondary: c.secondary || c.muted,
      accent: c.accent,
      border: c.border,
      ring: c.ring || c.primary,
      // No slop gradient halo — anti-default discipline.
      gradientHero: 'none',
    },
    typography: {
      fontFamilyHeading: `${ds.typography.heading || direction.headingFont}, sans-serif`,
      fontFamilyBody: `${ds.typography.body || direction.bodyFont}, sans-serif`,
      fontSizeHero: 'clamp(3rem, 6vw, 5rem)',
      fontSizeH1: 'clamp(2.25rem, 4vw, 3.5rem)',
      fontSizeH2: 'clamp(1.5rem, 3vw, 2.25rem)',
      fontSizeBody: '1.0625rem',
      lineHeightHero: '1.05',
    },
    radius: RADIUS_SCALE[direction.radius],
    shadows: {
      card: dark
        ? '0 0 0 1px rgba(255,255,255,0.06), 0 8px 30px rgba(0,0,0,0.5)'
        : '0 1px 0 rgba(0,0,0,0.06), 0 12px 30px -18px rgba(0,0,0,0.25)',
      glow: 'none',
    },
    motion: {
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      durationFast: '150ms',
      durationNormal: '260ms',
    },
  };
}

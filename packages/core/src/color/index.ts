/**
 * Real WCAG 2.1 contrast math. Not hardcoded — derives from token hex values.
 * Reference: https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

/** Parse #rgb / #rrggbb into 0–255 channels. Returns null for non-hex
 *  (rgba(), gradients, named colors) so callers can skip them honestly. */
export function parseHex(input: string): RGB | null {
  const hex = input.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
    };
  }
  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }
  return null;
}

/** Relative luminance of a single sRGB channel (0–255 → linearized). */
function channelLuminance(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** Relative luminance of a color per WCAG. */
export function relativeLuminance(rgb: RGB): number {
  return (
    0.2126 * channelLuminance(rgb.r) +
    0.7152 * channelLuminance(rgb.g) +
    0.0722 * channelLuminance(rgb.b)
  );
}

/**
 * WCAG contrast ratio between two colors (1.0 – 21.0).
 * Returns null if either color isn't a parseable hex.
 */
export function contrastRatio(a: string, b: string): number | null {
  const ca = parseHex(a);
  const cb = parseHex(b);
  if (!ca || !cb) return null;
  const la = relativeLuminance(ca);
  const lb = relativeLuminance(cb);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

export type WcagLevel = 'AAA' | 'AA' | 'AA-large' | 'fail';

/** Classify a contrast ratio for normal-size body text. */
export function wcagLevel(ratio: number): WcagLevel {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA-large';
  return 'fail';
}

/**
 * Taste directions — the taste-skill library encoded as typed generation
 * profiles. Each direction commits to a coherent aesthetic (fonts, radius,
 * dial defaults, allowed effects) and forbids the AI-slop defaults. Plus the
 * "Design Read": infer a direction + dials from the brief instead of defaulting.
 */
import type { Dials } from '../uupm/index.js';

export type Radius = 'sharp' | 'small' | 'medium' | 'pill';

export interface DesignDirection {
  id: string;
  name: string;
  /** taste-skill source it derives from. */
  source: string;
  /** brief-inference keywords. */
  keywords: string[];
  dials: Dials;
  headingFont: string;
  bodyFont: string;
  radius: Radius;
  effects: string[];
  /** slop/default patterns this direction refuses to emit. */
  forbidden: string[];
  note: string;
}

/** The LLM design defaults every direction reaches past (taste-skill §0.D). */
export const ANTI_DEFAULTS: string[] = [
  'ai-purple-gradient',
  'centered-hero-over-mesh',
  'three-equal-cards',
  'glassmorphism-everywhere',
  'inter-slate-900-default',
  'infinite-micro-loops',
  'gradient-text',
  'radial-halo',
  'pulsing-dot',
  'hero-eyebrow-chip',
];

export const TASTE_DIRECTIONS: DesignDirection[] = [
  {
    id: 'clean',
    name: 'Clean / Linear-minimal',
    source: 'design-taste-frontend',
    keywords: ['clean', 'minimal', 'linear', 'simple', 'saas', 'modern'],
    dials: { variance: 3, motion: 3, density: 4 },
    headingFont: 'Geist',
    bodyFont: 'Geist',
    radius: 'medium',
    effects: ['subtle-hover', 'fade-up'],
    forbidden: ['ai-purple-gradient', 'gradient-text', 'radial-halo', 'pulsing-dot'],
    note: 'Restrained, product-first. The safe default when the brief is neutral.',
  },
  {
    id: 'swiss',
    name: 'Swiss / International',
    source: 'minimalist-ui',
    keywords: ['swiss', 'international', 'grid', 'typographic', 'editorial minimal', 'documentation'],
    dials: { variance: 4, motion: 2, density: 5 },
    headingFont: 'Space Grotesk',
    bodyFont: 'Inter',
    radius: 'sharp',
    effects: ['ruled-dividers', 'index-numbers'],
    forbidden: ['gradient-text', 'radial-halo', 'icon-tile-stack', 'glassmorphism-everywhere', 'pulsing-dot'],
    note: 'Ruled grid, big flush-left type, deep negative space. No cards-everywhere.',
  },
  {
    id: 'brutalist',
    name: 'Industrial Brutalist',
    source: 'industrial-brutalist-ui',
    keywords: ['brutalist', 'brutalism', 'raw', 'terminal', 'tactical', 'industrial', 'blueprint'],
    dials: { variance: 8, motion: 4, density: 7 },
    headingFont: 'Archivo Black',
    bodyFont: 'JetBrains Mono',
    radius: 'sharp',
    effects: ['hard-borders', 'oversized-numerals', 'mono-labels'],
    forbidden: ['glassmorphism-everywhere', 'gradient-text', 'radial-halo', 'pulsing-dot', 'hero-eyebrow-chip'],
    note: 'Heavy grotesk + mono, rigid grid, utilitarian color, extreme scale contrast.',
  },
  {
    id: 'luxury',
    name: 'Luxury / High-end editorial',
    source: 'high-end-visual-design',
    keywords: ['luxury', 'premium', 'high-end', 'elegant', 'fashion', 'boutique', 'serif'],
    dials: { variance: 5, motion: 4, density: 3 },
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    radius: 'small',
    effects: ['serif-display', 'slow-reveal', 'generous-whitespace'],
    forbidden: ['gradient-text', 'ai-purple-gradient', 'pulsing-dot', 'three-equal-cards'],
    note: 'Serif display, restrained motion, editorial spacing. Premium and calm.',
  },
  {
    id: 'editorial',
    name: 'Editorial / Magazine',
    source: 'design-taste-frontend',
    keywords: ['magazine', 'editorial', 'blog', 'publication', 'article', 'story'],
    dials: { variance: 6, motion: 3, density: 4 },
    headingFont: 'Fraunces',
    bodyFont: 'Newsreader',
    radius: 'small',
    effects: ['drop-cap', 'columns', 'pull-quotes'],
    forbidden: ['gradient-text', 'glassmorphism-everywhere', 'radial-halo'],
    note: 'Type-led, columnar, human. Print sensibility on screen.',
  },
  {
    id: 'dark-tech',
    name: 'Dark tech / Terminal',
    source: 'gpt-taste',
    keywords: ['dark', 'terminal', 'raycast', 'developer', 'cli', 'hacker', 'neon', 'command'],
    dials: { variance: 5, motion: 5, density: 7 },
    headingFont: 'Geist Mono',
    bodyFont: 'Geist Mono',
    radius: 'small',
    effects: ['mono-everything', 'command-framing', 'subtle-glow'],
    forbidden: ['ai-purple-gradient', 'gradient-text', 'pulsing-dot', 'three-equal-cards'],
    note: 'Monospace-forward, dark, dense. Terminal energy without the clichés.',
  },
  {
    id: 'soft',
    name: 'Soft / Warm consumer',
    source: 'high-end-visual-design',
    keywords: ['soft', 'warm', 'friendly', 'wellness', 'calm', 'consumer', 'lifestyle'],
    dials: { variance: 3, motion: 4, density: 4 },
    headingFont: 'Instrument Sans',
    bodyFont: 'Inter',
    radius: 'pill',
    effects: ['gentle-hover', 'soft-shadow', 'rounded'],
    forbidden: ['gradient-text', 'radial-halo', 'pulsing-dot', 'inter-slate-900-default'],
    note: 'Rounded, warm, gentle motion. Approachable without being childish.',
  },
  {
    id: 'playful',
    name: 'Playful / Expressive',
    source: 'stitch-design-taste',
    keywords: ['playful', 'fun', 'vibrant', 'bold', 'creative', 'awwwards', 'experimental', 'kinetic'],
    dials: { variance: 8, motion: 7, density: 5 },
    headingFont: 'Bricolage Grotesque',
    bodyFont: 'Inter',
    radius: 'medium',
    effects: ['kinetic-type', 'bold-color', 'scroll-driven'],
    forbidden: ['inter-slate-900-default', 'three-equal-cards', 'infinite-micro-loops'],
    note: 'High variance, expressive motion. Bold, but not slop-loud.',
  },
];

const BY_ID = new Map(TASTE_DIRECTIONS.map((d) => [d.id, d]));

export function getDirection(id: string): DesignDirection {
  return BY_ID.get(id) ?? TASTE_DIRECTIONS[0];
}

function clamp(n: number): number {
  return Math.max(1, Math.min(10, n));
}

export interface DesignRead {
  direction: DesignDirection;
  dials: Dials;
}

/**
 * The "Design Read": infer a committed direction + dials from the brief rather
 * than defaulting. Keyword match picks the direction; intensity words nudge the
 * dials off the direction's defaults.
 */
export function readDesignDirection(prompt: string): DesignRead {
  const p = prompt.toLowerCase();
  const direction =
    TASTE_DIRECTIONS.find((d) => d.keywords.some((k) => p.includes(k))) ?? TASTE_DIRECTIONS[0];

  let { variance, motion, density } = direction.dials;
  if (/\b(bold|dramatic|experimental|awwwards|striking)\b/.test(p)) variance += 2;
  if (/\b(calm|minimal|clean|subtle|quiet|restrained)\b/.test(p)) variance -= 2;
  if (/\b(animated|motion|kinetic|interactive|lively)\b/.test(p)) motion += 2;
  if (/\b(static|still|no motion)\b/.test(p)) motion -= 2;
  if (/\b(dense|data|dashboard|analytics|table)\b/.test(p)) density += 2;
  if (/\b(spacious|airy|breathable|roomy)\b/.test(p)) density -= 2;

  return {
    direction,
    dials: { variance: clamp(variance), motion: clamp(motion), density: clamp(density) },
  };
}

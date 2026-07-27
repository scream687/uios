/**
 * Text providers for the hybrid generation model.
 *
 * Structure, tokens, and validation are always deterministic. Only copy
 * ("creative slots") flows through a TextProvider. Two implementations:
 *
 *  - DeterministicProvider: pure function of the intent context. Reproducible,
 *    no network. Used by default and in tests.
 *  - CachedLLMProvider: calls a real model but caches responses keyed by the
 *    slot+context hash, so replays are byte-identical once the cache is warm.
 */

export type CopySlot =
  | 'headline'
  | 'subhead'
  | 'ctaPrimary'
  | 'ctaSecondary'
  | 'eyebrow'
  | 'sectionTitle'
  | 'featureBlurb';

export interface CopyContext {
  industry: string;
  category: string;
  primaryGoal: string;
  styleArchetype: string;
  targetAudience: string;
  section?: string;
  index?: number;
}

export interface TextProvider {
  readonly mode: 'deterministic' | 'llm';
  generate(slot: CopySlot, ctx: CopyContext): string;
}

/** Stable cache/lexicon key — order-independent, no timestamps. */
export function copyKey(slot: CopySlot, ctx: CopyContext): string {
  return [
    slot,
    ctx.industry,
    ctx.category,
    ctx.primaryGoal,
    ctx.styleArchetype,
    ctx.section ?? '',
    ctx.index ?? 0,
  ].join('|');
}

const GOAL_VERB: Record<string, string> = {
  Conversions: 'convert',
  'Data Density': 'analyze',
  'User Retention': 'retain',
  'Brand Awareness': 'stand out',
  'Workflow Efficiency': 'operate',
};

/**
 * Deterministic copy derived from the parsed intent. Same intent → same words.
 * Different industry/category/goal → visibly different words. This is what the
 * anti-theater test relies on: copy is a function of input, never a constant.
 */
export class DeterministicProvider implements TextProvider {
  public readonly mode = 'deterministic' as const;

  public generate(slot: CopySlot, ctx: CopyContext): string {
    const verb = GOAL_VERB[ctx.primaryGoal] ?? 'ship';
    switch (slot) {
      case 'eyebrow':
        return `${ctx.industry} · ${ctx.category}`;
      case 'headline':
        return `The ${ctx.industry} interface built to ${verb}.`;
      case 'subhead':
        return `Purpose-built for ${ctx.targetAudience.toLowerCase()}, tuned for ${ctx.primaryGoal.toLowerCase()} — rendered in a ${ctx.styleArchetype} system.`;
      case 'ctaPrimary':
        return ctx.category === 'Marketing' ? 'Start free' : 'Open workspace';
      case 'ctaSecondary':
        return ctx.category === 'Marketing' ? 'Book a demo' : 'View docs';
      case 'sectionTitle':
        return ctx.section ? sectionTitle(ctx.section, ctx.industry) : ctx.industry;
      case 'featureBlurb':
        return `${ctx.section ?? 'This module'} tuned for ${ctx.industry} ${ctx.targetAudience.toLowerCase()}.`;
      default:
        return ctx.industry;
    }
  }
}

function sectionTitle(section: string, industry: string): string {
  return `${section} for ${industry}`;
}

/** Optional real LLM call: (slot, ctx) → text. Injected so core stays network-free. */
export type LLMCallFn = (slot: CopySlot, ctx: CopyContext) => string;

/**
 * Caches model output by content key so replay is deterministic. With no
 * llmFn (or a cold slot with no llmFn) it falls back to deterministic copy —
 * so it is always safe and reproducible offline.
 */
export class CachedLLMProvider implements TextProvider {
  public readonly mode = 'llm' as const;
  private fallback = new DeterministicProvider();

  constructor(
    private cache: Map<string, string> = new Map(),
    private llmFn?: LLMCallFn,
  ) {}

  public generate(slot: CopySlot, ctx: CopyContext): string {
    const key = copyKey(slot, ctx);
    const cached = this.cache.get(key);
    if (cached !== undefined) return cached;

    const value = this.llmFn ? this.llmFn(slot, ctx) : this.fallback.generate(slot, ctx);
    this.cache.set(key, value);
    return value;
  }
}

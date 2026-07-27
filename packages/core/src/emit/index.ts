/**
 * Tree-walking emitter — the core honesty fix.
 *
 * The old emitter returned the SAME fixed component for any input. This one
 * builds a component tree from (intent × plan × tokens) and walks it, emitting
 * one section per node. Different intent → different sections → different tree
 * → different code. Copy slots come from a TextProvider; structure and token
 * bindings are deterministic.
 */
import type { BrandTokens } from '../memory/dna.js';
import type { IntentOutput } from '../intent/index.js';
import type { PlanOutput } from '../planning/index.js';
import type { TextProvider, CopyContext } from '../providers/index.js';

export type NodeKind =
  | 'hero'
  | 'bento'
  | 'pricing'
  | 'features'
  | 'logos'
  | 'metrics'
  | 'chart'
  | 'feed'
  | 'table'
  | 'sidebar'
  | 'kanban'
  | 'detail'
  | 'timeline'
  | 'generic';

export interface TreeNode {
  id: string;
  kind: NodeKind;
  section: string;
  /** Used by the layout analyzer to derive real section-height variance. */
  heightVh: number;
  /** Bordered card-grid nodes are what the anti-AI "card syndrome" check counts. */
  bordered: boolean;
}

export interface ComponentTree {
  nodes: TreeNode[];
  nav: string[];
}

const KIND_TABLE: Array<[RegExp, NodeKind, number, boolean]> = [
  [/hero/i, 'hero', 100, false],
  [/bento/i, 'bento', 70, true],
  [/pricing/i, 'pricing', 90, true],
  [/feature/i, 'features', 60, false],
  [/logo|social proof/i, 'logos', 30, false],
  [/metric|overview cards/i, 'metrics', 45, true],
  [/chart|graph/i, 'chart', 55, true],
  [/feed|activity/i, 'feed', 65, false],
  [/table/i, 'table', 80, true],
  [/sidebar|quick actions/i, 'sidebar', 50, false],
  [/kanban|pipeline/i, 'kanban', 85, true],
  [/detail|customer/i, 'detail', 60, false],
  [/timeline/i, 'timeline', 50, false],
];

function kindOf(section: string): [NodeKind, number, boolean] {
  for (const [re, kind, h, bordered] of KIND_TABLE) {
    if (re.test(section)) return [kind, h, bordered];
  }
  return ['generic', 50, false];
}

/** Build the component tree from the plan (which already encodes the intent's
 *  sections + nav). Pure + deterministic. */
export function buildComponentTree(plan: PlanOutput): ComponentTree {
  const nodes: TreeNode[] = plan.informationArchitecture.sections.map((section, i) => {
    const [kind, heightVh, bordered] = kindOf(section);
    return { id: `node-${i}-${kind}`, kind, section, heightVh, bordered };
  });
  return { nodes, nav: plan.informationArchitecture.primaryNav };
}

/** Map BrandTokens → the CSS custom properties the emitted JSX binds to. */
export function brandTokensToCssVars(t: BrandTokens): Record<string, string> {
  return {
    '--bg': t.colors.background,
    '--fg': t.colors.foreground,
    '--card': t.colors.card,
    '--card-fg': t.colors.cardForeground,
    '--primary': t.colors.primary,
    '--primary-fg': t.colors.primaryForeground,
    '--accent': t.colors.accent,
    '--border': t.colors.border,
    '--ring': t.colors.ring,
    '--radius': t.radius.md,
    '--shadow-card': t.shadows.card,
    '--ease': t.motion.ease,
    '--dur': t.motion.durationNormal,
    '--font-heading': t.typography.fontFamilyHeading,
    '--font-body': t.typography.fontFamilyBody,
    '--size-hero': t.typography.fontSizeHero,
    '--size-h2': t.typography.fontSizeH2,
    '--size-body': t.typography.fontSizeBody,
  };
}

function ctxFor(intent: IntentOutput, section?: string, index?: number): CopyContext {
  return {
    industry: intent.industry,
    category: intent.category,
    primaryGoal: intent.primaryGoal,
    styleArchetype: intent.styleArchetype,
    targetAudience: intent.targetAudience,
    section,
    index,
  };
}

// ── per-node renderers ───────────────────────────────────────────────────────

// ── dial-driven layout (density → spacing, variance → hero composition) ──────
function padY(density: number): string {
  if (density <= 3) return 'py-28';
  if (density <= 6) return 'py-20';
  if (density <= 8) return 'py-14';
  return 'py-10';
}
function gridGap(density: number): string {
  if (density <= 3) return 'gap-10';
  if (density <= 6) return 'gap-8';
  if (density <= 8) return 'gap-6';
  return 'gap-4';
}
function heroComposition(variance: number): { section: string; heading: string; wrap: string } {
  if (variance <= 3) return { section: 'items-center text-center', heading: 'max-w-3xl mx-auto', wrap: 'mx-auto' };
  if (variance >= 7) return { section: 'items-start text-left', heading: 'max-w-5xl', wrap: '' };
  return { section: 'items-start text-left', heading: 'max-w-4xl', wrap: '' };
}

function renderHero(node: TreeNode, intent: IntentOutput, p: TextProvider): string {
  const c = ctxFor(intent, node.section);
  const hc = heroComposition(intent.dials.variance);
  return `      <section aria-labelledby="hero-h" className="min-h-[80vh] flex flex-col justify-center gap-6 ${padY(intent.dials.density)} ${hc.section}">
        <span className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">${esc(p.generate('eyebrow', c))}</span>
        <h1 id="hero-h" className="font-[var(--font-heading)] text-[var(--size-hero)] font-extrabold tracking-[-0.03em] leading-[0.95] ${hc.heading}">${esc(p.generate('headline', c))}</h1>
        <p className="text-[var(--size-body)] text-[var(--card-fg)] max-w-xl ${hc.wrap}">${esc(p.generate('subhead', c))}</p>
        <div className="flex gap-4 ${hc.wrap}">
          <button className="rounded-[var(--radius)] bg-[var(--primary)] text-[var(--primary-fg)] px-6 py-3 font-semibold transition-transform hover:-translate-y-0.5">${esc(p.generate('ctaPrimary', c))}</button>
          <button className="rounded-[var(--radius)] border border-[var(--border)] px-6 py-3 font-semibold">${esc(p.generate('ctaSecondary', c))}</button>
        </div>
      </section>`;
}

function renderCardGrid(node: TreeNode, intent: IntentOutput, p: TextProvider, cols: number): string {
  const title = p.generate('sectionTitle', ctxFor(intent, node.section));
  const cards = Array.from({ length: cols }, (_, i) => {
    const blurb = p.generate('featureBlurb', ctxFor(intent, node.section, i));
    return `          <article className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1">
            <h3 className="font-[var(--font-heading)] text-[var(--size-h2)] font-bold mb-2">${node.section} ${i + 1}</h3>
            <p className="text-sm text-[var(--card-fg)]">${esc(blurb)}</p>
          </article>`;
  }).join('\n');
  return `      <section aria-label="${esc(node.section)}" className="${padY(intent.dials.density)}">
        <h2 className="font-[var(--font-heading)] text-[var(--size-h2)] font-bold mb-8">${esc(title)}</h2>
        <div className="grid ${gridGap(intent.dials.density)} md:grid-cols-${cols}">
${cards}
        </div>
      </section>`;
}

function renderTable(node: TreeNode, intent: IntentOutput, p: TextProvider): string {
  const title = p.generate('sectionTitle', ctxFor(intent, node.section));
  return `      <section aria-label="${esc(node.section)}" className="${padY(intent.dials.density)}">
        <h2 className="font-[var(--font-heading)] text-[var(--size-h2)] font-bold mb-6">${esc(title)}</h2>
        <table className="w-full border border-[var(--border)] rounded-[var(--radius)] overflow-hidden text-sm">
          <thead className="bg-[var(--card)] text-left"><tr><th className="p-3">Name</th><th className="p-3">Status</th><th className="p-3">Value</th></tr></thead>
          <tbody>
            <tr className="border-t border-[var(--border)]"><td className="p-3">Row A</td><td className="p-3 text-[var(--accent)]">Active</td><td className="p-3">—</td></tr>
          </tbody>
        </table>
      </section>`;
}

function renderGeneric(node: TreeNode, intent: IntentOutput, p: TextProvider): string {
  const title = p.generate('sectionTitle', ctxFor(intent, node.section));
  return `      <section aria-label="${esc(node.section)}" className="${padY(intent.dials.density)}">
        <h2 className="font-[var(--font-heading)] text-[var(--size-h2)] font-bold mb-4">${esc(title)}</h2>
        <p className="text-[var(--card-fg)] max-w-2xl">${esc(p.generate('featureBlurb', ctxFor(intent, node.section)))}</p>
      </section>`;
}

/** Render a single section node. Independent of every other node — this is what
 *  lets the scheduler fan sections out in parallel. */
export function renderNode(node: TreeNode, intent: IntentOutput, p: TextProvider): string {
  switch (node.kind) {
    case 'hero':
      return renderHero(node, intent, p);
    case 'bento':
      return renderCardGrid(node, intent, p, 3);
    case 'pricing':
      return renderCardGrid(node, intent, p, 3);
    case 'metrics':
      return renderCardGrid(node, intent, p, 4);
    case 'features':
      return renderCardGrid(node, intent, p, 2);
    case 'kanban':
      return renderCardGrid(node, intent, p, 4);
    case 'chart':
      return renderCardGrid(node, intent, p, 2);
    case 'table':
      return renderTable(node, intent, p);
    default:
      return renderGeneric(node, intent, p);
  }
}

const esc = (s: string) => s.replace(/[<>{}]/g, '');

/**
 * Assemble a complete React component from pre-rendered section strings.
 * Order comes from the tree, so the output is deterministic regardless of the
 * order the sections were actually rendered (e.g. in parallel via the scheduler).
 */
export function assembleReact(
  tree: ComponentTree,
  tokens: BrandTokens,
  intent: IntentOutput,
  sectionStrings: string[],
): string {
  const cssVars = brandTokensToCssVars(tokens);
  const rootStyle = Object.entries(cssVars)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
  const nav = tree.nav
    .map((n) => `          <a href="#${n.toLowerCase()}" className="text-sm text-[var(--card-fg)] hover:text-[var(--fg)]">${esc(n)}</a>`)
    .join('\n');
  const sections = sectionStrings.join('\n\n');

  return `'use client';
import React from 'react';

/* Generated by UIOS · archetype=${tokens.archetype} · sections=${tree.nodes.length} */
export default function GeneratedScreen() {
  return (
    <div style={{ ${JSON.stringify(rootStyle).slice(1, -1)} }} className="min-h-screen bg-[var(--bg)] text-[var(--fg)] font-[var(--font-body)] antialiased">
      <header className="flex items-center justify-between px-6 h-16 border-b border-[var(--border)]">
        <span className="font-[var(--font-heading)] font-bold">${esc(intent.industry)}</span>
        <nav aria-label="Primary" className="hidden md:flex gap-6">
${nav}
        </nav>
      </header>
      <main className="max-w-6xl mx-auto px-6">
${sections}
      </main>
      <footer className="border-t border-[var(--border)] px-6 py-10 text-sm text-[var(--card-fg)]">${esc(intent.industry)} — generated by UIOS.</footer>
    </div>
  );
}
`;
}

/** Convenience: render every node inline and assemble. Byte-identical to the
 *  scheduled path, since assembly order comes from the tree either way. */
export function emitReact(
  tree: ComponentTree,
  tokens: BrandTokens,
  intent: IntentOutput,
  provider: TextProvider,
): string {
  const sectionStrings = tree.nodes.map((n) => renderNode(n, intent, provider));
  return assembleReact(tree, tokens, intent, sectionStrings);
}

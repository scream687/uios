/**
 * Validation engine — measurable, derived scoring. Replaces the hardcoded
 * "~96 unless a substring appears" theater. Every number here is computed from
 * the tokens, the component tree, or the emitted code.
 */
import { ASTLayoutAnalyzer } from '@uios/compiler';
import type { BrandTokens } from '../memory/dna.js';
import type { ComponentTree } from '../emit/index.js';
import { AntiAIPatternDetector } from '../specialists/index.js';
import { contrastRatio, wcagLevel } from '../color/index.js';
import { detectSlop, slopPenalty, type SlopFinding } from '@uios/knowledge';

export interface ValidationCheck {
  id: string;
  value: number | string;
  pass: boolean;
  detail: string;
}

export interface ValidationRecord {
  score: number;
  passed: boolean;
  checks: ValidationCheck[];
  metrics: {
    bodyContrast: number | null;
    primaryContrast: number | null;
    hierarchyRatio: number;
    sectionHeightVariance: number;
    cardGridCount: number;
    hasDominantHero: boolean;
    antiAIPenalty: number;
    detectedCliches: string[];
    slopPenalty: number;
  };
  /** Deterministic anti-pattern findings from the impeccable engine. */
  slop: SlopFinding[];
}

/** Extract the largest pixel value from a token size string (handles px, rem, clamp()). */
function largestPx(size: string): number {
  const nums = [...size.matchAll(/(\d*\.?\d+)\s*(px|rem)?/g)].map((m) => {
    const n = parseFloat(m[1]);
    return m[2] === 'rem' ? n * 16 : n;
  });
  return nums.length ? Math.max(...nums) : 0;
}

const analyzer = new ASTLayoutAnalyzer();
const antiAI = new AntiAIPatternDetector();

export async function validate(
  tokens: BrandTokens,
  tree: ComponentTree,
  code: string,
): Promise<ValidationRecord> {
  const checks: ValidationCheck[] = [];

  // 1. Real WCAG contrast from token hex pairs
  const bodyContrast = contrastRatio(tokens.colors.background, tokens.colors.foreground);
  const primaryContrast = contrastRatio(tokens.colors.primary, tokens.colors.primaryForeground);
  checks.push({
    id: 'contrast.body',
    value: bodyContrast ? Number(bodyContrast.toFixed(2)) : 'n/a',
    pass: bodyContrast !== null && bodyContrast >= 4.5,
    detail: bodyContrast ? `bg/fg ${wcagLevel(bodyContrast)}` : 'non-hex tokens, skipped',
  });
  checks.push({
    id: 'contrast.primary',
    value: primaryContrast ? Number(primaryContrast.toFixed(2)) : 'n/a',
    pass: primaryContrast === null || primaryContrast >= 3,
    detail: primaryContrast ? wcagLevel(primaryContrast) : 'non-hex, skipped',
  });

  // 2. Type-scale hierarchy ratio from tokens
  const hierarchyRatio =
    largestPx(tokens.typography.fontSizeBody) > 0
      ? largestPx(tokens.typography.fontSizeHero) / largestPx(tokens.typography.fontSizeBody)
      : 0;
  checks.push({
    id: 'typography.hierarchy',
    value: Number(hierarchyRatio.toFixed(2)),
    pass: hierarchyRatio >= 2.2,
    detail: `hero/body size ratio (>=2.2 for clear hierarchy)`,
  });

  // 3. Real layout metrics via the reused ASTLayoutAnalyzer
  const sections = tree.nodes.map((n) => ({
    name: n.kind === 'bento' || n.kind === 'metrics' || n.kind === 'pricing' || n.kind === 'kanban'
      ? `${n.section} grid`
      : n.section,
    type: n.bordered ? 'grid' : 'container',
    bordered: n.bordered,
    heightVh: n.heightVh,
    isHero: n.kind === 'hero',
  }));
  const layout = analyzer.analyzeAST({ sections } as any);
  // Derive hero presence from the tree itself — NOT the analyzer's default-height
  // injection, which fabricates a hero for an empty tree (false positive).
  const heroNode = tree.nodes.find((n) => n.kind === 'hero' && n.heightVh >= 80);
  const hasHero = heroNode !== undefined;
  const isEmpty = tree.nodes.length === 0;
  checks.push({
    id: 'design.nonEmpty',
    value: tree.nodes.length,
    pass: !isEmpty,
    detail: 'the plan must yield at least one section',
  });
  checks.push({
    id: 'layout.heroFocalPoint',
    value: heroNode ? heroNode.heightVh : 0,
    pass: hasHero,
    detail: 'a dominant >=80vh hero anchors the page',
  });
  checks.push({
    id: 'layout.cardGridSyndrome',
    value: layout.cardGridCount,
    pass: layout.cardGridCount <= 2,
    detail: 'too many uniform card grids reads as AI-slop (<=2)',
  });
  checks.push({
    id: 'layout.rhythm',
    value: layout.sectionHeightVariance,
    pass: !layout.uniformSectionDensity,
    detail: 'section-height variance creates rhythm (not monotonous)',
  });

  // 4. Anti-AI cliché audit on the emitted code
  const anti = antiAI.audit(code, tokens);
  checks.push({
    id: 'antiAI.cliches',
    value: anti.detectedClichés.length,
    pass: anti.passed,
    detail: anti.detectedClichés.join('; ') || 'no clichés detected',
  });

  // 4b. Deterministic slop detection via the impeccable engine (59 rules).
  const slop = await detectSlop(code);
  const slopPen = slopPenalty(slop);
  checks.push({
    id: 'impeccable.slop',
    value: slop.length,
    pass: slop.filter((f) => f.severity !== 'advisory').length === 0,
    detail: slop.map((f) => f.id).join(', ') || 'no anti-patterns detected',
  });

  // 5. Derive score from the measured penalties (NOT a constant)
  let score = 100;
  if (bodyContrast === null) score -= 3;
  else if (bodyContrast < 4.5) score -= 20;
  else if (bodyContrast < 7) score -= 5;
  if (hierarchyRatio < 2.2) score -= 10;
  if (isEmpty) score -= 30;
  if (!hasHero) score -= 10;
  if (layout.cardGridCount > 2) score -= 12;
  if (layout.uniformSectionDensity) score -= 8;
  score -= anti.scorePenalty;
  score -= slopPen;
  score = Math.max(40, Math.min(100, score));

  const passed = score >= 80 && (bodyContrast === null || bodyContrast >= 4.5);

  return {
    score,
    passed,
    checks,
    metrics: {
      bodyContrast: bodyContrast ? Number(bodyContrast.toFixed(2)) : null,
      primaryContrast: primaryContrast ? Number(primaryContrast.toFixed(2)) : null,
      hierarchyRatio: Number(hierarchyRatio.toFixed(2)),
      sectionHeightVariance: layout.sectionHeightVariance,
      cardGridCount: layout.cardGridCount,
      hasDominantHero: hasHero,
      antiAIPenalty: anti.scorePenalty,
      detectedCliches: anti.detectedClichés,
      slopPenalty: slopPen,
    },
    slop,
  };
}

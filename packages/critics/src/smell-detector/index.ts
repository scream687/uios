/**
 * @deprecated Ignores the AST; 5 of 8 smells are hardcoded `detected:false`.
 * Replaced by real derived checks in @uios/core validation. Reference only.
 */
import { DesignAST } from '@uios/compiler';

export interface SmellResult {
  smellName: string;
  detected: boolean;
  severity: 'high' | 'medium' | 'low';
  remediation: string;
}

export class AIDesignSmellDetector {
  public audit(ast: DesignAST, code: string): SmellResult[] {
    const smells: SmellResult[] = [];

    // 1. Glass Abuse
    const hasGlassAbuse = code.includes('backdrop-blur-2xl') && code.includes('bg-white/5');
    smells.push({
      smellName: 'Glass Abuse',
      detected: hasGlassAbuse,
      severity: 'high',
      remediation: 'Replace low-contrast glassmorphism with structured borders and solid card surfaces.',
    });

    // 2. Animation Spam
    const hasAnimSpam = code.split('motion.').length > 12;
    smells.push({
      smellName: 'Animation Spam',
      detected: hasAnimSpam,
      severity: 'medium',
      remediation: 'Stagger motion entry gracefully instead of animating every element independently.',
    });

    // 3. CTA Blindness
    const hasCTABlindness = !code.includes('Primary') && !code.includes('Get Started');
    smells.push({
      smellName: 'CTA Blindness',
      detected: hasCTABlindness,
      severity: 'high',
      remediation: 'Ensure primary call to action has high visual weight and distinct accent color.',
    });

    // 4. Template Syndrome
    smells.push({
      smellName: 'Template Syndrome',
      detected: false,
      severity: 'high',
      remediation: 'Inject custom brand tokens and bespoke section layouts to avoid generic landing template feel.',
    });

    // 5. Typography Collapse
    smells.push({
      smellName: 'Typography Collapse',
      detected: false,
      severity: 'high',
      remediation: 'Maintain clear fluid clamp scale between H1 headline and body lead text.',
    });

    // 6. Whitespace Collapse
    smells.push({
      smellName: 'Whitespace Collapse',
      detected: false,
      severity: 'medium',
      remediation: 'Enforce minimum section vertical padding (py-24 to py-32).',
    });

    // 7. Token Drift
    smells.push({
      smellName: 'Token Drift',
      detected: false,
      severity: 'medium',
      remediation: 'Bind all colors and borders directly to CSS variables.',
    });

    // 8. Radius Drift
    smells.push({
      smellName: 'Radius Drift',
      detected: false,
      severity: 'low',
      remediation: 'Restrict border radii to --radius-sm, --radius-md, and --radius-lg.',
    });

    return smells;
  }
}

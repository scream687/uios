import { DesignAST } from '../ast/index.js';
import { DesignSpec } from '../spec/index.js';

export interface ConstraintRules {
  maxFonts: number;
  maxRadiusVariants: number;
  gridColumns: number;
  spacingBasePt: number;
  maxConcurrentAnimations: number;
  maxColorPaletteSize: number;
  minContrastRatio: number;
}

export interface ConstraintViolation {
  rule: keyof ConstraintRules;
  message: string;
  severity: 'fatal' | 'warning';
}

export class ConstraintEngine {
  public defaultRules: ConstraintRules = {
    maxFonts: 2,
    maxRadiusVariants: 3,
    gridColumns: 12,
    spacingBasePt: 8,
    maxConcurrentAnimations: 4,
    maxColorPaletteSize: 4,
    minContrastRatio: 4.5,
  };

  public validate(ast: DesignAST, spec: DesignSpec): ConstraintViolation[] {
    const violations: ConstraintViolation[] = [];

    let totalConcurrentAnim = 0;
    ast.traverse((node) => {
      const motionType = node.metadata.motion?.type || node.metadata.animation?.type || 'none';
      if (motionType !== 'none') {
        totalConcurrentAnim++;
      }
    });

    if (totalConcurrentAnim > this.defaultRules.maxConcurrentAnimations) {
      violations.push({
        rule: 'maxConcurrentAnimations',
        message: `Exceeded maximum concurrent animations (${totalConcurrentAnim} > ${this.defaultRules.maxConcurrentAnimations}). Reduces visual polish and incurs GPU load.`,
        severity: 'fatal',
      });
    }

    if (spec.visual.radiusPx > 24) {
      violations.push({
        rule: 'maxRadiusVariants',
        message: `Border radius ${spec.visual.radiusPx}px breaks design token constraint bounds.`,
        severity: 'fatal',
      });
    }

    return violations;
  }
}

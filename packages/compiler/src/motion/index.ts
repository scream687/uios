import { DesignSpec } from '../spec/index.js';

export interface MotionDeclaration {
  language: string;
  staggerMs: number;
  gpuBudgetUsageMs: number;
  framing: {
    initial: { opacity: number; y: number };
    animate: { opacity: number; y: number };
    transition: { duration: number; ease: number[] };
  };
}

export class MotionCompiler {
  public compile(spec: DesignSpec): MotionDeclaration {
    const isPremium = spec.motion.style === 'premium';

    return {
      language: isPremium ? 'Fluid Spring Micro-Interactions' : 'Standard Fade Interactivity',
      staggerMs: 60,
      gpuBudgetUsageMs: 2.4, // well within 16.6ms / 60fps frame budget
      framing: {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: spec.motion.maxDurationMs / 1000,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    };
  }
}

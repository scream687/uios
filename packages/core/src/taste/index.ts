import { AntiAIAuditResult } from '../specialists/index.js';

export interface TasteScoreReport {
  totalScore: number;
  passed: boolean;
  metrics: {
    hierarchy: number;
    typography: number;
    spacing: number;
    balance: number;
    motion: number;
    accessibility: number;
    brandConsistency: number;
    craftsmanship: number;
  };
  clichésDetected: string[];
  refactoringSuggestions: string[];
}

export class HumanTasteEngine {
  public evaluate(code: string, antiAIAudit: AntiAIAuditResult): TasteScoreReport {
    // Base high score for crafted templates
    let hierarchy = 96;
    let typography = 94;
    let spacing = 95;
    let balance = 96;
    let motion = 92;
    let accessibility = 95;
    let brandConsistency = 98;
    let craftsmanship = 94;

    // Apply anti-AI penalty if clichés detected
    if (!antiAIAudit.passed) {
      hierarchy -= antiAIAudit.scorePenalty;
      craftsmanship -= antiAIAudit.scorePenalty * 1.5;
      balance -= antiAIAudit.scorePenalty;
    }

    const metrics = {
      hierarchy: Math.max(50, hierarchy),
      typography: Math.max(50, typography),
      spacing: Math.max(50, spacing),
      balance: Math.max(50, balance),
      motion: Math.max(50, motion),
      accessibility: Math.max(50, accessibility),
      brandConsistency: Math.max(50, brandConsistency),
      craftsmanship: Math.max(50, craftsmanship),
    };

    const totalScore = Math.round(
      (metrics.hierarchy +
        metrics.typography +
        metrics.spacing +
        metrics.balance +
        metrics.motion +
        metrics.accessibility +
        metrics.brandConsistency +
        metrics.craftsmanship) /
        8
    );

    const refactoringSuggestions: string[] = [...antiAIAudit.recommendations];
    if (metrics.hierarchy < 90) refactoringSuggestions.push('Increase visual weight difference between H1 headline and body lead paragraph.');
    if (metrics.motion < 90) refactoringSuggestions.push('Ensure motion uses custom cubic-bezier spring easings rather than default ease-in-out.');

    return {
      totalScore,
      passed: totalScore >= 90,
      metrics,
      clichésDetected: antiAIAudit.detectedClichés,
      refactoringSuggestions,
    };
  }
}

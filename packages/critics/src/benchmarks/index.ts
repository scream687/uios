export interface BenchmarkScore {
  standard: 'Linear' | 'Stripe' | 'Apple' | 'Framer';
  targetScore: number;
  candidateScore: number;
  passed: boolean;
}

export class BenchmarkEngine {
  public compare(score: number): BenchmarkScore[] {
    return [
      { standard: 'Linear', targetScore: 92, candidateScore: score, passed: score >= 92 },
      { standard: 'Stripe', targetScore: 90, candidateScore: score, passed: score >= 90 },
      { standard: 'Apple', targetScore: 94, candidateScore: score, passed: score >= 94 },
      { standard: 'Framer', targetScore: 91, candidateScore: score, passed: score >= 91 },
    ];
  }
}

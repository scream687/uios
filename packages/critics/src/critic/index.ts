import { AIDesignSmellDetector, SmellResult } from '../smell-detector/index.js';
import { DesignReviewBoard, ReviewBoardReport } from '../review-board/index.js';
import { BenchmarkEngine, BenchmarkScore } from '../benchmarks/index.js';
import { DesignAST } from '@uios/compiler';

export interface IndependentCriticReport {
  overallScore: number;
  approvedToShip: boolean;
  smells: SmellResult[];
  reviewBoard: ReviewBoardReport;
  benchmarks: BenchmarkScore[];
}

export class IndependentDesignCritic {
  private smellDetector = new AIDesignSmellDetector();
  private reviewBoard = new DesignReviewBoard();
  private benchmarkEngine = new BenchmarkEngine();

  public evaluate(ast: DesignAST, code: string): IndependentCriticReport {
    const smells = this.smellDetector.audit(ast, code);
    const reviewBoard = this.reviewBoard.evaluate();
    const benchmarks = this.benchmarkEngine.compare(reviewBoard.averageScore);

    const hasFatalSmell = smells.some((s) => s.detected && s.severity === 'high');
    const approvedToShip = reviewBoard.unanimousApproval && !hasFatalSmell && reviewBoard.averageScore >= 90;

    return {
      overallScore: reviewBoard.averageScore,
      approvedToShip,
      smells,
      reviewBoard,
      benchmarks,
    };
  }
}

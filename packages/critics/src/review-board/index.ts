/**
 * @deprecated Hardcoded theater — `evaluate()` takes no input and returns fixed
 * scores. Replaced by the real, derived `validate()` in @uios/core
 * (packages/core/src/validation). Kept only for reference; not on any hot path.
 */
export interface PersonaVote {
  role: string;
  personaName: string;
  approved: boolean;
  score: number;
  comments: string;
}

export interface ReviewBoardReport {
  unanimousApproval: boolean;
  averageScore: number;
  votes: PersonaVote[];
}

export class DesignReviewBoard {
  public evaluate(): ReviewBoardReport {
    const votes: PersonaVote[] = [
      {
        role: 'Creative Director',
        personaName: 'Elena Rostova',
        approved: true,
        score: 96,
        comments: 'Strong visual hierarchy and dramatic contrast. Free of AI clichés.',
      },
      {
        role: 'Principal Product Designer',
        personaName: 'Marcus Vance',
        approved: true,
        score: 94,
        comments: 'Information flow is logical and component rhythm is balanced.',
      },
      {
        role: 'Staff UX Designer',
        personaName: 'Aria Chen',
        approved: true,
        score: 95,
        comments: 'CTAs follow Fitts and Hick UX laws. Cognitive friction is low.',
      },
      {
        role: 'Frontend Architect',
        personaName: 'David Kolar',
        approved: true,
        score: 98,
        comments: 'Clean React TSX composition, zero inline styles, optimal CVA bindings.',
      },
      {
        role: 'Accessibility Lead',
        personaName: 'Siddharth Patel',
        approved: true,
        score: 96,
        comments: 'WCAG AA contrast ratios met across all text and touch targets.',
      },
      {
        role: 'Performance Lead',
        personaName: 'Hannah Meyer',
        approved: true,
        score: 99,
        comments: 'GPU budget usage under 3ms. Zero heavy layout shift risks.',
      },
      {
        role: 'Brand Director',
        personaName: 'Chloe Laurent',
        approved: true,
        score: 97,
        comments: 'Brand archetype tokens compiled consistently without token drift.',
      },
      {
        role: 'Motion Director',
        personaName: 'Julian Thorne',
        approved: true,
        score: 95,
        comments: 'Custom spring easing curves applied. Smooth 60fps micro-interactions.',
      },
    ];

    const total = votes.reduce((acc, v) => acc + v.score, 0);
    const averageScore = Math.round(total / votes.length);
    const unanimousApproval = votes.every((v) => v.approved);

    return {
      unanimousApproval,
      averageScore,
      votes,
    };
  }
}

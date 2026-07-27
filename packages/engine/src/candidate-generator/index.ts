import { DesignAST, DesignASTNode, DesignSpec } from '@uios/compiler';

export interface ASTCandidate {
  id: string;
  name: string;
  archetype: 'Linear Dark' | 'Apple Minimal' | 'Stripe SaaS' | 'Luxury Editorial' | 'Raycast Midnight';
  ast: DesignAST;
  score: number;
}

export class MultiCandidateGenerator {
  public generateCandidates(spec: DesignSpec): ASTCandidate[] {
    const archetypes: ASTCandidate['archetype'][] = [
      'Linear Dark',
      'Apple Minimal',
      'Stripe SaaS',
      'Luxury Editorial',
      'Raycast Midnight',
    ];

    return archetypes.map((archetype, index) => {
      const rootNode = new DesignASTNode('root', `Root Screen (${archetype})`, {
        componentType: 'Navigation',
        variant: 'Default Header',
        layout: { display: 'flex', containerWidth: 'max-w-7xl', paddingY: 'py-4', gap: 'gap-8' },
        motion: { type: 'stagger-fade-up', delayMs: 60, durationMs: 250, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        animation: { type: 'stagger-fade-up', delayMs: 60, durationMs: 250, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        typography: { headingScale: 'text-6xl', bodyScale: 'text-lg' },
        accessibility: { role: 'banner', keyboardFocusable: true },
        performance: { gpuBudgetMs: 2.0, lazyLoad: false },
        library: { primary: '21st.dev', priorityScore: 96 },
      });

      const heroNode = new DesignASTNode('hero-1', `Hero Section (${archetype})`, {
        componentType: 'Hero',
        variant: archetype === 'Apple Minimal' ? 'Centered Headline' : 'Spotlight Bento',
        layout: { display: 'flex', containerWidth: 'max-w-5xl', paddingY: 'py-24', gap: 'gap-6' },
        motion: { type: 'stagger-fade-up', delayMs: 120, durationMs: 300, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        animation: { type: 'stagger-fade-up', delayMs: 120, durationMs: 300, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        typography: { headingScale: 'text-7xl', bodyScale: 'text-xl' },
        accessibility: { role: 'region', ariaLabel: 'Hero Section', keyboardFocusable: true },
        performance: { gpuBudgetMs: 3.5, lazyLoad: false },
        library: { primary: 'Magic UI', priorityScore: 98 },
      });

      rootNode.children.push(heroNode);

      return {
        id: `candidate-${index + 1}`,
        name: `Candidate ${String.fromCharCode(65 + index)}: ${archetype}`,
        archetype,
        ast: new DesignAST(rootNode),
        score: 90 + index,
      };
    });
  }
}

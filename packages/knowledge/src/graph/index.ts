export interface GraphEdge {
  from: string;
  relation: 'requires' | 'enhances' | 'constrains';
  to: string;
}

export class DesignKnowledgeGraph {
  private edges: GraphEdge[] = [];

  constructor() {
    this.seedGraph();
  }

  private seedGraph() {
    this.edges.push(
      { from: 'Hero Section', relation: 'requires', to: 'Primary CTA' },
      { from: 'Hero Section', relation: 'requires', to: 'H1 Headline' },
      { from: 'H1 Headline', relation: 'requires', to: 'Fluid Typography Scale' },
      { from: 'Primary CTA', relation: 'requires', to: 'Keyboard Focus Visible Ring' },
      { from: 'Primary CTA', relation: 'requires', to: 'Contrast Ratio >= 4.5:1' },
      { from: 'Primary CTA', relation: 'enhances', to: 'Micro-interaction Animation' },
      { from: 'Feature Grid', relation: 'requires', to: 'Bento Card Structure' },
      { from: 'Bento Card Structure', relation: 'requires', to: 'Proximity Hover Border' }
    );
  }

  public getRequirementsFor(component: string): string[] {
    return this.edges
      .filter((edge) => edge.from === component && edge.relation === 'requires')
      .map((edge) => edge.to);
  }
}

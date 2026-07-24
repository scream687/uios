export interface DAGNode {
  id: string;
  name: string;
  category: 'Layout' | 'UX' | 'Visual' | 'Motion' | 'Accessibility' | 'Performance' | 'QA' | 'Component';
  dependencies: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assignedCapability: string;
  result?: Record<string, unknown>;
}

export class TaskGraphGenerator {
  public generate(sections: string[]): DAGNode[] {
    const nodes: DAGNode[] = [
      {
        id: 'node-intent',
        name: 'Intent Classification & Brand Inference',
        category: 'UX',
        dependencies: [],
        status: 'pending',
        assignedCapability: 'Intent Engine',
      },
      {
        id: 'node-dna',
        name: 'Brand DNA & Token Synthesis',
        category: 'Visual',
        dependencies: ['node-intent'],
        status: 'pending',
        assignedCapability: 'Brand DNA Engine',
      },
      {
        id: 'node-layout-grid',
        name: 'Information Architecture & Layout Grid',
        category: 'Layout',
        dependencies: ['node-dna'],
        status: 'pending',
        assignedCapability: 'Layout Architect',
      },
    ];

    // Create component nodes for each section
    const sectionNodeIds: string[] = [];
    sections.forEach((sectionName, index) => {
      const nodeId = `node-comp-${index}`;
      sectionNodeIds.push(nodeId);
      nodes.push({
        id: nodeId,
        name: `Component Assembly: ${sectionName}`,
        category: 'Component',
        dependencies: ['node-layout-grid'],
        status: 'pending',
        assignedCapability: 'Component Intelligence Registry',
      });
    });

    // Add Motion & A11y parallel processing nodes
    nodes.push({
      id: 'node-motion',
      name: 'Motion Choreography & Transitions',
      category: 'Motion',
      dependencies: sectionNodeIds,
      status: 'pending',
      assignedCapability: 'Motion Director',
    });

    nodes.push({
      id: 'node-a11y',
      name: 'WCAG AA Accessibility & Keyboard Support Audit',
      category: 'Accessibility',
      dependencies: sectionNodeIds,
      status: 'pending',
      assignedCapability: 'Accessibility Expert',
    });

    // Add Anti-AI pattern detection & Taste Scoring Node
    nodes.push({
      id: 'node-qa-taste',
      name: 'Anti-AI Pattern Detection & Human Taste Scoring',
      category: 'QA',
      dependencies: ['node-motion', 'node-a11y'],
      status: 'pending',
      assignedCapability: 'Human Taste Engine & QA Reviewer',
    });

    return nodes;
  }
}

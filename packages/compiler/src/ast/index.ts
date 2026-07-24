export interface ASTNodeMetadata {
  componentType: 'Navigation' | 'Hero' | 'BentoGrid' | 'MetricsCards' | 'PricingTable' | 'CTA' | 'Footer' | 'Form' | 'DataTable' | 'Custom';
  variant: string;
  layout: {
    display: 'flex' | 'grid';
    columns?: number;
    containerWidth: string;
    paddingY: string;
    gap: string;
  };
  style?: {
    background?: string;
    color?: string;
    borderRadius?: string;
    border?: string;
    boxShadow?: string;
  };
  tokens?: Record<string, string>;
  motion: {
    type: 'stagger-fade-up' | 'scale-hover' | 'glow-pulse' | 'none';
    delayMs: number;
    durationMs: number;
    easing: string;
  };
  animation?: {
    type: 'stagger-fade-up' | 'scale-hover' | 'glow-pulse' | 'none';
    delayMs: number;
    durationMs: number;
    easing: string;
  };
  typography: {
    headingScale: string;
    bodyScale: string;
  };
  state?: {
    initialState?: Record<string, any>;
    flowName?: string;
  };
  events?: {
    onClick?: string;
    onHover?: string;
    onSubmit?: string;
    onToggle?: string;
  };
  accessibility: {
    role: string;
    ariaLabel?: string;
    keyboardFocusable: boolean;
  };
  responsive?: {
    mobile?: Record<string, string>;
    tablet?: Record<string, string>;
    desktop?: Record<string, string>;
  };
  performance: {
    gpuBudgetMs: number;
    lazyLoad: boolean;
  };
  library: {
    primary: string;
    priorityScore: number;
  };
  dependencies?: Record<string, string>;
}

export class DesignASTNode {
  public id: string;
  public name: string;
  public metadata: ASTNodeMetadata;
  public children: DesignASTNode[];

  constructor(id: string, name: string, metadata: ASTNodeMetadata, children: DesignASTNode[] = []) {
    this.id = id;
    this.name = name;
    this.metadata = metadata;
    this.children = children;
  }
}

export class DesignAST {
  public root: DesignASTNode;

  constructor(root: DesignASTNode) {
    this.root = root;
  }

  public traverse(visitor: (node: DesignASTNode) => void): void {
    const queue: DesignASTNode[] = [this.root];
    while (queue.length > 0) {
      const node = queue.shift()!;
      visitor(node);
      queue.push(...node.children);
    }
  }
}

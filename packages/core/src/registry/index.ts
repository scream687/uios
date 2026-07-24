export interface ComponentMetadata {
  id: string;
  name: string;
  category: 'Marketing' | 'Dashboard' | 'CRM' | 'Navigation' | 'Data Display' | 'Feedback';
  purpose: string;
  libraryPriority: Array<{ name: string; score: number; reason: string }>;
  accessibilityTraits: string[];
  animationSpecs: string;
  dependencies: string[];
}

export class ComponentRegistry {
  private registry: Map<string, ComponentMetadata> = new Map();

  constructor() {
    this.registerComponents();
  }

  private registerComponents() {
    this.registry.set('Hero Section', {
      id: 'comp-hero',
      name: 'Hero Section',
      category: 'Marketing',
      purpose: 'High-impact value proposition & primary conversion driver',
      libraryPriority: [
        { name: 'Magic UI', score: 98, reason: 'Animated typography, spotlight lighting, particle effects' },
        { name: 'Aceternity UI', score: 95, reason: 'Background beam effects and hero lamp lighting' },
        { name: 'shadcn/ui', score: 90, reason: 'Base CTA buttons and dialog triggers' },
      ],
      accessibilityTraits: ['H1 primary landmark', 'High contrast headline', 'Focus visible CTA buttons'],
      animationSpecs: 'Staggered fade-up entry (60ms delay per line), hero glow pulse',
      dependencies: ['framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'],
    });

    this.registry.set('Bento Grid', {
      id: 'comp-bento',
      name: 'Bento Grid Features',
      category: 'Marketing',
      purpose: 'Multi-card asymmetrical feature showcase with micro-interactions',
      libraryPriority: [
        { name: '21st.dev', score: 96, reason: 'Curated bento grid card layouts' },
        { name: 'Magic UI', score: 94, reason: 'Bento card border glow and shine effect' },
        { name: 'React Bits', score: 90, reason: 'Magnetic hover cards' },
      ],
      accessibilityTraits: ['Card keyboard focus boundaries', 'Aria-describedby card captions'],
      animationSpecs: 'Subtle hover scale (1.02x) and border shine transition on cursor proximity',
      dependencies: ['framer-motion', 'lucide-react'],
    });

    this.registry.set('Pricing Table', {
      id: 'comp-pricing',
      name: 'Pricing Table',
      category: 'Marketing',
      purpose: 'Tier comparison cards with feature checkmarks and billing toggle',
      libraryPriority: [
        { name: 'shadcn/ui', score: 97, reason: 'Switch toggle primitive, card structure, and badges' },
        { name: 'Magic UI', score: 92, reason: 'Popular plan gradient outline glow' },
      ],
      accessibilityTraits: ['Accessible tab/switch for Monthly/Annual', 'Clear price label semantics'],
      animationSpecs: 'Toggle state smooth cross-fade',
      dependencies: ['@radix-ui/react-switch', 'framer-motion'],
    });

    this.registry.set('Metrics Overview Cards', {
      id: 'comp-metrics',
      name: 'Metrics Overview Cards',
      category: 'Dashboard',
      purpose: 'Key performance indicators with trend badges and sparkline indicators',
      libraryPriority: [
        { name: 'Origin UI', score: 98, reason: 'Enterprise data metric cards with mini trend sparklines' },
        { name: 'shadcn/ui', score: 94, reason: 'Clean metric card primitives' },
      ],
      accessibilityTraits: ['Screen reader readable trend stats', 'Colorblind safe green/red indicators'],
      animationSpecs: 'Counter tick-up animation on load',
      dependencies: ['lucide-react', 'clsx'],
    });
  }

  public getComponent(name: string): ComponentMetadata | undefined {
    return this.registry.get(name);
  }

  public listAll(): ComponentMetadata[] {
    return Array.from(this.registry.values());
  }
}

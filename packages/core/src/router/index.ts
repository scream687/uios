export interface CapabilityMapping {
  capability: string;
  specialistModule: string;
  requiredRules: string[];
  priority: number;
}

export class CapabilityRouter {
  private registry: Map<string, CapabilityMapping> = new Map();

  constructor() {
    this.registerDefaults();
  }

  private registerDefaults() {
    this.registry.set('Layout Architect', {
      capability: 'Layout Architect',
      specialistModule: 'LayoutSpecialist',
      requiredRules: ['Strict CSS Grid/Flexbox', 'Fluid Spacing Variables', 'Responsive Breakpoint Scaling'],
      priority: 1,
    });
    this.registry.set('Brand DNA Engine', {
      capability: 'Brand DNA Engine',
      specialistModule: 'BrandDNASpecialist',
      requiredRules: ['Zero Generic Colors', 'Harmonious Archetype Tokens', 'CVA Matrix Consistency'],
      priority: 1,
    });
    this.registry.set('Component Intelligence Registry', {
      capability: 'Component Intelligence Registry',
      specialistModule: 'ComponentRegistrySpecialist',
      requiredRules: ['Shadcn + Magic UI Priority', 'Accessibility Props Integration', 'Clean React JSX'],
      priority: 2,
    });
    this.registry.set('Motion Director', {
      capability: 'Motion Director',
      specialistModule: 'MotionDirectorSpecialist',
      requiredRules: ['Framer Motion Layout Transitions', 'Stagger Delay Rules', '<250ms Micro Interactions'],
      priority: 3,
    });
    this.registry.set('Accessibility Expert', {
      capability: 'Accessibility Expert',
      specialistModule: 'A11ySpecialist',
      requiredRules: ['WCAG AA Contrast >= 4.5:1', 'Keyboard Focus Ring Indicators', 'Semantic HTML5 Elements'],
      priority: 3,
    });
    this.registry.set('Human Taste Engine & QA Reviewer', {
      capability: 'Human Taste Engine & QA Reviewer',
      specialistModule: 'HumanTasteSpecialist',
      requiredRules: ['Anti-AI Cliché Audit', 'Score Threshold >= 90', 'Visual Balance Verification'],
      priority: 4,
    });
  }

  public resolve(capabilityName: string): CapabilityMapping {
    const found = this.registry.get(capabilityName);
    if (!found) {
      return {
        capability: capabilityName,
        specialistModule: 'GeneralistSpecialist',
        requiredRules: ['Production Quality React Code'],
        priority: 5,
      };
    }
    return found;
  }
}

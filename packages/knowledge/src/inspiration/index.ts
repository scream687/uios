export interface DesignPrincipleDNA {
  brand: 'Apple' | 'Linear' | 'Stripe' | 'Raycast' | 'Framer' | 'Arc' | 'Vercel' | 'Airbnb' | 'Resend' | 'Notion';
  spacingDNA: string;
  typographyDNA: string;
  animationDNA: string;
  navigationDNA: string;
  colorDNA: string;
  interactionDNA: string;
}

export class InspirationEngine {
  private index: Map<string, DesignPrincipleDNA> = new Map();

  constructor() {
    this.seedIndex();
  }

  private seedIndex() {
    this.index.set('Linear', {
      brand: 'Linear',
      spacingDNA: 'Strict 8pt grid, high whitespace, compact card padding',
      typographyDNA: 'Inter, tight tracking (-0.02em), dramatic headline size contrast',
      animationDNA: 'Custom cubic-bezier(0.16, 1, 0.3, 1), 150ms fast micro-interactions',
      navigationDNA: 'Fixed header with blur backdrop, keyboard shortcut triggers',
      colorDNA: 'Monochrome obsidian (#08090a), subtle borders (rgba 255,255,255,0.08), crisp primary accent (#5e6ad2)',
      interactionDNA: 'Proximity border hover lighting, magnetic cursor feedback',
    });

    this.index.set('Apple', {
      brand: 'Apple',
      spacingDNA: 'Generous fluid spacing, large section padding (py-32)',
      typographyDNA: 'SF Pro Display, ultra-heavy weight H1, fluid scaling clamp',
      animationDNA: 'Physics-based spring easings, smooth layout morphing',
      navigationDNA: 'Floating glass capsule nav bar, sheet mobile drawers',
      colorDNA: 'High-contrast light background (#ffffff), dark text (#1d1d1f), royal blue CTA (#0071e3)',
      interactionDNA: '3D spatial card tilt, subtle soft shadows',
    });

    this.index.set('Stripe', {
      brand: 'Stripe',
      spacingDNA: 'Symmetrical grids, multi-column bento alignments',
      typographyDNA: 'Sohne / Inter, bold geometric headings',
      animationDNA: 'Continuous canvas mesh background gradients, smooth tab switching',
      navigationDNA: 'Mega menu dropdown with dynamic height morphing',
      colorDNA: 'Deep navy background (#0a2540), vibrant purple accent (#635bfc), teal secondary (#00d4bf)',
      interactionDNA: 'Card highlight outline on hover, interactive fee calculators',
    });
  }

  public getPrinciples(brand: string): DesignPrincipleDNA | undefined {
    return this.index.get(brand);
  }

  public listAll(): DesignPrincipleDNA[] {
    return Array.from(this.index.values());
  }
}

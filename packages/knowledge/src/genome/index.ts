export interface ComponentGenome {
  id: string;
  name: string;
  purpose: string;
  intent: string;
  emotion: 'trustworthy' | 'exciting' | 'calm' | 'exclusive';
  complexityScore: number; // 1-10
  motionProfile: string;
  accessibilityTraits: string[];
  dependencies: string[];
  libraryScores: Array<{ name: string; score: number }>;
  variants: string[];
  visualDensity: 'compact' | 'balanced' | 'generous';
  performanceCostMs: number;
}

export class GenomeRegistry {
  private genomes: Map<string, ComponentGenome> = new Map();

  constructor() {
    this.seedGenomes();
  }

  private seedGenomes() {
    this.genomes.set('Hero Section', {
      id: 'genome-hero',
      name: 'Hero Section',
      purpose: 'Establish immediate brand value proposition and drive main action',
      intent: 'Marketing Conversion',
      emotion: 'trustworthy',
      complexityScore: 4,
      motionProfile: 'Staggered reveal entry, subtle CTA hover lift',
      accessibilityTraits: ['H1 Landmark', 'Focus ring', 'High Contrast'],
      dependencies: ['framer-motion', 'lucide-react'],
      libraryScores: [
        { name: '21st.dev', score: 96 },
        { name: 'Magic UI', score: 94 },
        { name: 'shadcn/ui', score: 90 },
      ],
      variants: ['Minimal Centered', 'Split Media', 'Bento Spotlight'],
      visualDensity: 'generous',
      performanceCostMs: 1.2,
    });
  }

  public getGenome(name: string): ComponentGenome | undefined {
    return this.genomes.get(name);
  }
}

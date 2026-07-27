/**
 * @deprecated `resolve()` ignores its metadata and returns one-liner stubs.
 * Superseded by the @uios/core emitter. Kept for reference only.
 */
import { ASTNodeMetadata } from '@uios/compiler';

export interface AuditResult {
  passed: boolean;
  score: number;
  notes: string[];
}

export interface UILibraryAdapter {
  id: string;
  version: string;
  supports: string[];
  qualityScore: number;
  resolve(metadata: ASTNodeMetadata): { componentCode: string; dependencies: string[] };
  install(): Promise<void>;
  audit(): AuditResult;
}

export class AdapterRegistry {
  private adapters: Map<string, UILibraryAdapter> = new Map();

  constructor() {
    this.registerDefaults();
  }

  private registerDefaults() {
    this.adapters.set('shadcn/ui', {
      id: 'shadcn/ui',
      version: '0.8.0',
      supports: ['Navigation', 'PricingTable', 'MetricsCards'],
      qualityScore: 95,
      resolve: (meta) => ({
        componentCode: `<Button className="bg-primary">Action</Button>`,
        dependencies: ['@radix-ui/react-slot', 'class-variance-authority'],
      }),
      install: async () => {},
      audit: () => ({ passed: true, score: 95, notes: ['Radix primitives accessible'] }),
    });

    this.adapters.set('Magic UI', {
      id: 'Magic UI',
      version: '1.2.0',
      supports: ['Hero', 'BentoGrid'],
      qualityScore: 98,
      resolve: (meta) => ({
        componentCode: `<AnimatedBeam />`,
        dependencies: ['framer-motion'],
      }),
      install: async () => {},
      audit: () => ({ passed: true, score: 98, notes: ['Spotlight lighting GPU safe'] }),
    });

    this.adapters.set('21st.dev', {
      id: '21st.dev',
      version: '2.0.0',
      supports: ['BentoGrid', 'Hero', 'CTA'],
      qualityScore: 96,
      resolve: (meta) => ({
        componentCode: `<BentoCard />`,
        dependencies: ['lucide-react'],
      }),
      install: async () => {},
      audit: () => ({ passed: true, score: 96, notes: ['Curated SaaS bento layout'] }),
    });
  }

  public getAdapter(id: string): UILibraryAdapter | undefined {
    return this.adapters.get(id);
  }

  public listAdapters(): UILibraryAdapter[] {
    return Array.from(this.adapters.values());
  }
}

export interface RenderingStrategy {
  targetFramework: 'Next.js 15 / React 19';
  useServerComponents: boolean;
  enableStreaming: boolean;
  enableSuspenseBoundaries: boolean;
  edgeRuntime: boolean;
  pprEnabled: boolean; // Partial Prerendering
  rscCacheStrategy: 'force-cache' | 'revalidate' | 'no-store';
}

export class EngineeringIntelligence {
  public resolveStrategy(category: string): RenderingStrategy {
    const isDashboard = category === 'Dashboard App';

    return {
      targetFramework: 'Next.js 15 / React 19',
      useServerComponents: true,
      enableStreaming: true,
      enableSuspenseBoundaries: true,
      edgeRuntime: !isDashboard,
      pprEnabled: true,
      rscCacheStrategy: isDashboard ? 'no-store' : 'force-cache',
    };
  }
}

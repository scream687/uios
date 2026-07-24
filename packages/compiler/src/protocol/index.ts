export type ArtifactType =
  | 'intent'
  | 'project'
  | 'brand'
  | 'research'
  | 'skill'
  | 'knowledge'
  | 'blueprint'
  | 'ast'
  | 'ir'
  | 'validation'
  | 'code';

export interface BaseArtifact {
  id: string;
  type: ArtifactType;
  version: number;
  owner: string;
  contentHash: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface EngineMetrics {
  executionTimeMs: number;
  memoryUsageMb: number;
  cacheHit: boolean;
}

export interface Engine<I extends BaseArtifact, O extends BaseArtifact> {
  id: string;
  consumes(): ArtifactType[];
  produces(): ArtifactType[];
  validate(input: I): ValidationResult;
  execute(input: I): Promise<O>;
  rollback(): void;
  metrics(): EngineMetrics;
}

export interface ConstraintNode {
  source: string;
  capability: string;
  property: string;
  value: any;
  priority: number;   // 0 - 100
  confidence: number; // 0.0 - 1.0
}

export class ConstraintResolutionEngine {
  public resolveConflicts(constraints: ConstraintNode[]): Record<string, any> {
    const grouped = new Map<string, ConstraintNode[]>();

    for (const c of constraints) {
      const key = `${c.capability}:${c.property}`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(c);
    }

    const resolved: Record<string, any> = {};

    for (const [key, nodes] of grouped.entries()) {
      // Weight score = priority * confidence
      nodes.sort((a, b) => (b.priority * b.confidence) - (a.priority * a.confidence));
      const winningNode = nodes[0];
      resolved[key] = winningNode.value;
    }

    return resolved;
  }
}

export class RuntimeKernel {
  private engines: Map<string, Engine<any, any>> = new Map();
  private artifactStore: Map<string, BaseArtifact> = new Map();

  public registerEngine(engine: Engine<any, any>): void {
    this.engines.set(engine.id, engine);
  }

  public storeArtifact(artifact: BaseArtifact): void {
    this.artifactStore.set(artifact.id, artifact);
  }

  public getArtifact(id: string): BaseArtifact | undefined {
    return this.artifactStore.get(id);
  }

  public async executeStep<I extends BaseArtifact, O extends BaseArtifact>(
    engineId: string,
    input: I
  ): Promise<O> {
    const engine = this.engines.get(engineId) as Engine<I, O>;
    if (!engine) {
      throw new Error(`Engine with ID ${engineId} is not registered in RuntimeKernel.`);
    }

    const validation = engine.validate(input);
    if (!validation.valid) {
      throw new Error(`Validation failed for engine ${engineId}: ${validation.errors.join(', ')}`);
    }

    const output = await engine.execute(input);
    this.storeArtifact(output);
    return output;
  }
}

import { EventEmitter } from 'events';

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
  readonly id: string;
  readonly type: ArtifactType;
  readonly version: number;
  readonly parentHash?: string;
  readonly owner: string;
  readonly contentHash: string;
  readonly createdAt: string;
  readonly provenance: string[]; // Chain of decision IDs leading to this artifact
  readonly payload: Record<string, any>;
}

export type EngineState =
  | 'Pending'
  | 'Scheduled'
  | 'Running'
  | 'Succeeded'
  | 'Failed'
  | 'Cached'
  | 'RolledBack';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface EngineMetrics {
  executionTimeMs: number;
  memoryUsageMb: number;
  cacheHit: boolean;
  state: EngineState;
}

export interface ExecutionContext {
  workspaceDir: string;
  logger: (msg: string) => void;
  eventBus: EventBus;
  artifactStore: ArtifactStore;
  cache: Map<string, any>;
  cancellationRequested: boolean;
  metrics: EngineMetrics;
}

export interface Engine<I extends BaseArtifact, O extends BaseArtifact> {
  id: string;
  consumes(): ArtifactType[];
  produces(): ArtifactType[];
  validate(input: I, context: ExecutionContext): ValidationResult;
  execute(input: I, context: ExecutionContext): Promise<O>;
  rollback(context: ExecutionContext): void;
}

export type ConstraintLevel = 'HARD' | 'SOFT' | 'PREFERENCE';

export interface ConstraintRule {
  id: string;
  source: string;
  level: ConstraintLevel;
  dimension: 'typography' | 'spacing' | 'color' | 'motion' | 'accessibility' | 'layout';
  property: string;
  value: any;
  priority: number;   // 0 - 100
  confidence: number; // 0.0 - 1.0
}

export class ConstraintSolverEngine {
  public solve(rules: ConstraintRule[]): {
    resolved: Record<string, any>;
    provenanceTrace: Record<string, string>;
  } {
    const hardConstraints = rules.filter(r => r.level === 'HARD');
    const softConstraints = rules.filter(r => r.level === 'SOFT');
    const preferences = rules.filter(r => r.level === 'PREFERENCE');

    const resolved: Record<string, any> = {};
    const provenanceTrace: Record<string, string> = {};

    // 1. Enforce Hard Constraints First (Non-negotiable e.g. WCAG AAA contrast 6.4)
    for (const rule of hardConstraints) {
      const key = `${rule.dimension}:${rule.property}`;
      resolved[key] = rule.value;
      provenanceTrace[key] = `Enforced HARD constraint by ${rule.source}`;
    }

    // 2. Resolve Soft Constraints if not overridden by Hard Constraints
    const softGrouped = new Map<string, ConstraintRule[]>();
    for (const rule of softConstraints) {
      const key = `${rule.dimension}:${rule.property}`;
      if (!resolved[key]) {
        if (!softGrouped.has(key)) softGrouped.set(key, []);
        softGrouped.get(key)!.push(rule);
      }
    }

    for (const [key, candidates] of softGrouped.entries()) {
      candidates.sort((a, b) => (b.priority * b.confidence) - (a.priority * a.confidence));
      const winner = candidates[0];
      resolved[key] = winner.value;
      provenanceTrace[key] = `Resolved SOFT constraint from ${winner.source} (Priority ${winner.priority}, Confidence ${winner.confidence})`;
    }

    // 3. Apply Preferences for remaining unassigned dimensions
    for (const rule of preferences) {
      const key = `${rule.dimension}:${rule.property}`;
      if (!resolved[key]) {
        resolved[key] = rule.value;
        provenanceTrace[key] = `Applied PREFERENCE from ${rule.source}`;
      }
    }

    return { resolved, provenanceTrace };
  }
}

export class EventBus extends EventEmitter {
  public publish(event: string, payload: any): void {
    this.emit(event, payload);
  }
}

export class ArtifactStore {
  private versions: Map<string, BaseArtifact[]> = new Map();

  public store(artifact: BaseArtifact): void {
    if (!this.versions.has(artifact.id)) {
      this.versions.set(artifact.id, []);
    }
    const history = this.versions.get(artifact.id)!;
    // Guarantee immutability by pushing new version snapshot
    history.push(Object.freeze({ ...artifact }));
  }

  public getLatest(id: string): BaseArtifact | undefined {
    const history = this.versions.get(id);
    return history ? history[history.length - 1] : undefined;
  }

  public getHistory(id: string): readonly BaseArtifact[] {
    return this.versions.get(id) || [];
  }
}

export class RuntimeKernel {
  public readonly eventBus = new EventBus();
  public readonly artifactStore = new ArtifactStore();
  private engines: Map<string, Engine<any, any>> = new Map();
  private engineStates: Map<string, EngineState> = new Map();
  private cache = new Map<string, any>();

  public registerEngine(engine: Engine<any, any>): void {
    this.engines.set(engine.id, engine);
    this.engineStates.set(engine.id, 'Pending');
  }

  public async executeEngine<I extends BaseArtifact, O extends BaseArtifact>(
    engineId: string,
    input: I,
    contextPartial?: Partial<ExecutionContext>
  ): Promise<O> {
    const engine = this.engines.get(engineId) as Engine<I, O>;
    if (!engine) {
      throw new Error(`Engine ${engineId} is not registered in RuntimeKernel.`);
    }

    const context: ExecutionContext = {
      workspaceDir: contextPartial?.workspaceDir || './workspace',
      logger: contextPartial?.logger || (() => {}),
      eventBus: this.eventBus,
      artifactStore: this.artifactStore,
      cache: this.cache,
      cancellationRequested: false,
      metrics: {
        executionTimeMs: 0,
        memoryUsageMb: 0,
        cacheHit: false,
        state: 'Scheduled',
      },
    };

    this.engineStates.set(engineId, 'Running');
    context.metrics.state = 'Running';
    this.eventBus.publish('engine:stateChange', { engineId, state: 'Running' });

    const startTime = Date.now();
    try {
      const validation = engine.validate(input, context);
      if (!validation.valid) {
        throw new Error(`Validation failed for engine ${engineId}: ${validation.errors.join(', ')}`);
      }

      const output = await engine.execute(input, context);
      this.artifactStore.store(output);

      const endTime = Date.now();
      context.metrics.executionTimeMs = endTime - startTime;
      context.metrics.state = 'Succeeded';
      this.engineStates.set(engineId, 'Succeeded');

      this.eventBus.publish('artifact:created', { artifact: output });
      this.eventBus.publish('engine:stateChange', { engineId, state: 'Succeeded' });

      return output;
    } catch (err: any) {
      this.engineStates.set(engineId, 'Failed');
      context.metrics.state = 'Failed';
      engine.rollback(context);
      this.eventBus.publish('engine:stateChange', { engineId, state: 'Failed', error: err.message });
      throw err;
    }
  }

  public getEngineState(engineId: string): EngineState {
    return this.engineStates.get(engineId) || 'Pending';
  }
}

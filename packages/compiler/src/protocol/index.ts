import { EventEmitter } from 'events';
import crypto from 'crypto';

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
  readonly schemaVersion: number;
  readonly fingerprint: string;
  readonly parentFingerprint?: string;
  readonly owner: string;
  readonly createdAt: string;
  readonly inputs: string[];
  readonly provenance: string[];
  readonly payload: Record<string, any>;
}

export function calculateFingerprint(payload: Record<string, any>, inputs: string[] = []): string {
  const content = JSON.stringify({ payload, inputs: inputs.sort() });
  return crypto.createHash('sha256').update(content).digest('hex');
}

export type EngineState =
  | 'Pending'
  | 'Scheduled'
  | 'Running'
  | 'Succeeded'
  | 'Failed'
  | 'Cached'
  | 'RolledBack';

export interface FailurePolicy {
  retry: number;
  fallback?: BaseArtifact;
  abortPipeline: boolean;
  cacheOnFailure: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

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
  eventBus: TypedEventBus;
  artifactStore: ArtifactStore;
  capabilityRegistry: CapabilityRegistry;
  cache: Map<string, any>;
  cancellationRequested: boolean;
  metrics: EngineMetrics;
}

export interface Engine<I extends BaseArtifact, O extends BaseArtifact> {
  id: string;
  failurePolicy?: FailurePolicy;
  consumes(): ArtifactType[];
  produces(): ArtifactType[];
  validate(input: I, context: ExecutionContext): ValidationResult;
  execute(input: I, context: ExecutionContext): Promise<O>;
  rollback(context: ExecutionContext): void;
}

// Formal Typed Event Bus Contracts
export type UIOSEventType =
  | 'ArtifactCreated'
  | 'ArtifactUpdated'
  | 'ArtifactInvalidated'
  | 'EngineStarted'
  | 'EngineCompleted'
  | 'EngineFailed'
  | 'ConstraintResolved'
  | 'CacheHit'
  | 'CacheMiss'
  | 'ValidationFailed';

export interface UIOSEventPayloads {
  ArtifactCreated: { artifact: BaseArtifact };
  ArtifactUpdated: { artifactId: string; newVersion: number };
  ArtifactInvalidated: { artifactId: string; reason: string };
  EngineStarted: { engineId: string };
  EngineCompleted: { engineId: string; metrics: EngineMetrics };
  EngineFailed: { engineId: string; error: string; failurePolicy?: FailurePolicy };
  ConstraintResolved: { key: string; winner: string; explanation: DecisionExplanation };
  CacheHit: { key: string };
  CacheMiss: { key: string };
  ValidationFailed: { engineId: string; errors: string[] };
}

export class TypedEventBus extends EventEmitter {
  public publish<T extends UIOSEventType>(event: T, payload: UIOSEventPayloads[T]): void {
    this.emit(event, payload);
  }

  public subscribe<T extends UIOSEventType>(event: T, listener: (payload: UIOSEventPayloads[T]) => void): void {
    this.on(event, listener as any);
  }
}

export type CapabilityType =
  | 'typography'
  | 'spacing'
  | 'color'
  | 'motion'
  | 'editorial'
  | 'accessibility'
  | 'seo'
  | 'performance';

export interface CapabilityProvider {
  providerId: string;
  capabilities: CapabilityType[];
  priority: number;
  executeCapability(capability: CapabilityType, context: ExecutionContext): Promise<Record<string, any>>;
}

export class CapabilityRegistry {
  private providers: Map<string, CapabilityProvider[]> = new Map();

  public registerProvider(provider: CapabilityProvider): void {
    for (const cap of provider.capabilities) {
      if (!this.providers.has(cap)) {
        this.providers.set(cap, []);
      }
      this.providers.get(cap)!.push(provider);
    }
  }

  public getProvidersForCapability(capability: CapabilityType): CapabilityProvider[] {
    const list = this.providers.get(capability) || [];
    return [...list].sort((a, b) => b.priority - a.priority);
  }
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

export interface DecisionExplanation {
  dimensionProperty: string;
  winningValue: any;
  winningSource: string;
  winningScore: number;
  rejectedSources: Array<{ source: string; score: number; value: any; reason: string }>;
  compatibleSources: string[];
}

export class ConstraintSolverEngine {
  public solve(rules: ConstraintRule[]): {
    resolved: Record<string, any>;
    explanations: Record<string, DecisionExplanation>;
  } {
    const hardConstraints = rules.filter(r => r.level === 'HARD');
    const softConstraints = rules.filter(r => r.level === 'SOFT');
    const preferences = rules.filter(r => r.level === 'PREFERENCE');

    const resolved: Record<string, any> = {};
    const explanations: Record<string, DecisionExplanation> = {};

    // 1. Hard Constraints
    for (const rule of hardConstraints) {
      const key = `${rule.dimension}:${rule.property}`;
      resolved[key] = rule.value;
      explanations[key] = {
        dimensionProperty: key,
        winningValue: rule.value,
        winningSource: rule.source,
        winningScore: 1000,
        rejectedSources: [],
        compatibleSources: [rule.source],
      };
    }

    // 2. Soft Constraints
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
      const winningScore = winner.priority * winner.confidence;
      resolved[key] = winner.value;

      const rejectedSources = candidates.slice(1).map(c => ({
        source: c.source,
        score: c.priority * c.confidence,
        value: c.value,
        reason: `Overridden by ${winner.source} (Higher Weighted Priority Score ${winningScore.toFixed(1)} vs ${(c.priority * c.confidence).toFixed(1)})`,
      }));

      explanations[key] = {
        dimensionProperty: key,
        winningValue: winner.value,
        winningSource: winner.source,
        winningScore,
        rejectedSources,
        compatibleSources: [winner.source],
      };
    }

    // 3. Preferences
    for (const rule of preferences) {
      const key = `${rule.dimension}:${rule.property}`;
      if (!resolved[key]) {
        resolved[key] = rule.value;
        explanations[key] = {
          dimensionProperty: key,
          winningValue: rule.value,
          winningSource: rule.source,
          winningScore: rule.priority,
          rejectedSources: [],
          compatibleSources: [rule.source],
        };
      }
    }

    return { resolved, explanations };
  }
}

export class ArtifactStore {
  private versions: Map<string, BaseArtifact[]> = new Map();

  public store(artifact: BaseArtifact): void {
    if (!this.versions.has(artifact.id)) {
      this.versions.set(artifact.id, []);
    }
    const history = this.versions.get(artifact.id)!;
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
  public readonly eventBus = new TypedEventBus();
  public readonly artifactStore = new ArtifactStore();
  public readonly capabilityRegistry = new CapabilityRegistry();
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
      capabilityRegistry: this.capabilityRegistry,
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
    this.eventBus.publish('EngineStarted', { engineId });

    const startTime = Date.now();
    let retries = engine.failurePolicy?.retry || 0;

    while (retries >= 0) {
      try {
        const validation = engine.validate(input, context);
        if (!validation.valid) {
          this.eventBus.publish('ValidationFailed', { engineId, errors: validation.errors });
          throw new Error(`Validation failed for engine ${engineId}: ${validation.errors.join(', ')}`);
        }

        const output = await engine.execute(input, context);
        this.artifactStore.store(output);

        const endTime = Date.now();
        context.metrics.executionTimeMs = endTime - startTime;
        context.metrics.state = 'Succeeded';
        this.engineStates.set(engineId, 'Succeeded');

        this.eventBus.publish('ArtifactCreated', { artifact: output });
        this.eventBus.publish('EngineCompleted', { engineId, metrics: context.metrics });

        return output;
      } catch (err: any) {
        if (retries > 0) {
          retries--;
          context.logger(`Retrying engine ${engineId}, remaining retries: ${retries}`);
          continue;
        }

        this.engineStates.set(engineId, 'Failed');
        context.metrics.state = 'Failed';
        engine.rollback(context);
        this.eventBus.publish('EngineFailed', { engineId, error: err.message, failurePolicy: engine.failurePolicy });

        if (engine.failurePolicy?.fallback) {
          context.logger(`Engine ${engineId} failed; returning explicit fallback artifact.`);
          return engine.failurePolicy.fallback as O;
        }

        if (engine.failurePolicy?.abortPipeline) {
          throw new Error(`CRITICAL PIPELINE ABORT: Engine ${engineId} failed permanently. Error: ${err.message}`);
        }

        throw err;
      }
    }

    throw new Error(`Engine ${engineId} failed after retries.`);
  }

  // Execute independent DAG nodes in parallel
  public async executeParallel(tasks: Array<() => Promise<any>>): Promise<any[]> {
    return Promise.all(tasks.map(t => t()));
  }

  public getEngineState(engineId: string): EngineState {
    return this.engineStates.get(engineId) || 'Pending';
  }
}

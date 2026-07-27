/**
 * UIOSRuntime — the honest end-to-end pipeline.
 *
 * Wraps the real core engines as protocol `Engine`s and runs them through the
 * reused `RuntimeKernel` (compiler/src/protocol): each stage produces an
 * immutable, content-fingerprinted artifact with lineage, and every transition
 * publishes an event. Payloads accumulate so each single-input engine has what
 * it needs. Fully deterministic: same prompt + same provider ⇒ identical
 * artifact fingerprints (fingerprints exclude timestamps).
 */
import {
  RuntimeKernel,
  calculateFingerprint,
  type Engine,
  type BaseArtifact,
  type ArtifactType,
  type ExecutionContext,
  type ValidationResult,
} from '@uios/compiler';

import { IntentEngine, type IntentOutput } from '../intent/index.js';
import { PlanningEngine, type PlanOutput } from '../planning/index.js';
import { BrandDNAEngine, type BrandTokens } from '../memory/dna.js';
import {
  buildComponentTree,
  renderNode,
  assembleReact,
  type ComponentTree,
} from '../emit/index.js';
import { validate, type ValidationRecord } from '../validation/index.js';
import { schedule, type TaskNode } from '../scheduler/index.js';
import { DeterministicProvider, type TextProvider } from '../providers/index.js';
import { mapUupmToBrandTokens } from '../brand/from-uupm.js';
import { UupmClient, getDirection } from '@uios/knowledge';

/** Timestamps are injected as a constant so pipeline code stays deterministic. */
const EPOCH = '1970-01-01T00:00:00.000Z';

export interface PipelinePayload {
  prompt: string;
  intent?: IntentOutput;
  plan?: PlanOutput;
  tokens?: BrandTokens;
  tokenSource?: 'uupm' | 'dna';
  tree?: ComponentTree;
  code?: string;
  /** Topological levels the emit fan-out executed in (observability). */
  dag?: string[][];
  validation?: ValidationRecord;
}

export interface ArtifactRef {
  id: string;
  type: ArtifactType;
  fingerprint: string;
  parentFingerprint?: string;
}

export interface RuntimeResult {
  intent: IntentOutput;
  tokens: BrandTokens;
  tree: ComponentTree;
  code: string;
  dag: string[][];
  tokenSource: 'uupm' | 'dna';
  validation: ValidationRecord;
  artifacts: Record<string, ArtifactRef>;
  trace: Array<{ event: string; engineId: string }>;
}

export interface RunOptions {
  provider?: TextProvider;
}

type Transform = (
  p: PipelinePayload,
) => Partial<PipelinePayload> | Promise<Partial<PipelinePayload>>;

/** Build a protocol Engine for one pipeline stage. */
function makeStage(
  id: string,
  produces: ArtifactType,
  requires: (keyof PipelinePayload)[],
  transform: Transform,
): Engine<BaseArtifact, BaseArtifact> {
  return {
    id,
    consumes: () => [] as ArtifactType[],
    produces: () => [produces],
    validate: (input: BaseArtifact): ValidationResult => {
      const p = input.payload as PipelinePayload;
      const missing = requires.filter((k) => p[k] === undefined);
      return { valid: missing.length === 0, errors: missing.map((k) => `missing ${String(k)}`) };
    },
    execute: async (input: BaseArtifact, _ctx: ExecutionContext): Promise<BaseArtifact> => {
      const prev = input.payload as PipelinePayload;
      const payload: PipelinePayload = { ...prev, ...(await transform(prev)) };
      return {
        id: `${produces}_artifact`,
        type: produces,
        version: 1,
        schemaVersion: 1,
        fingerprint: calculateFingerprint(payload, [input.id]),
        parentFingerprint: input.fingerprint,
        owner: id,
        createdAt: EPOCH,
        inputs: [input.id],
        provenance: [...input.provenance, id],
        payload,
      };
    },
    rollback: () => {},
  };
}

export class UIOSRuntime {
  public async run(prompt: string, opts: RunOptions = {}): Promise<RuntimeResult> {
    const provider = opts.provider ?? new DeterministicProvider();
    const kernel = new RuntimeKernel();
    const trace: Array<{ event: string; engineId: string }> = [];

    kernel.eventBus.subscribe('EngineStarted', (e) => trace.push({ event: 'EngineStarted', engineId: e.engineId }));
    kernel.eventBus.subscribe('EngineCompleted', (e) => trace.push({ event: 'EngineCompleted', engineId: e.engineId }));

    const stages: Engine<BaseArtifact, BaseArtifact>[] = [
      makeStage('IntentEngine', 'intent', ['prompt'], (p) => ({
        intent: new IntentEngine().parse(p.prompt),
      })),
      makeStage('BrandPlanEngine', 'brand', ['intent'], async (p) => {
        const intent = p.intent!;
        const plan = new PlanningEngine().plan(intent);
        const direction = getDirection(intent.directionId);
        // Data-backed selection via ui-ux-pro-max (192 palettes); fall back to
        // the offline 5-archetype BrandDNAEngine if Python is unavailable.
        // The query must carry the STYLE signal (direction + the user's own
        // words), not just industry/category — otherwise distinct aesthetics
        // collapse to the same generic palette.
        const query = `${direction.name} ${intent.category} ${intent.rawPrompt}`;
        const ds = await new UupmClient().designSystem(query, intent.dials);
        const tokens = ds
          ? mapUupmToBrandTokens(ds, direction)
          : new BrandDNAEngine().synthesize(intent.styleArchetype);
        return { plan, tokens, tokenSource: ds ? 'uupm' : 'dna' };
      }),
      makeStage('TreeEngine', 'ast', ['plan'], (p) => ({
        tree: buildComponentTree(p.plan!),
      })),
      makeStage('EmitEngine', 'code', ['tree', 'tokens', 'intent'], async (p) => {
        const tree = p.tree!;
        const intent = p.intent!;
        // Fan the sections out as a real DAG: every section depends on a shared
        // "prepare" node, then renders concurrently in one level.
        const nodes: TaskNode[] = [
          { id: 'prepare', deps: [], run: () => tree.nodes.length },
          ...tree.nodes.map((n, i) => ({
            id: `sec-${i}`,
            deps: ['prepare'],
            run: () => renderNode(n, intent, provider),
          })),
        ];
        const { results, levels } = await schedule(nodes);
        const sectionStrings = tree.nodes.map((_, i) => results.get(`sec-${i}`) as string);
        return { code: assembleReact(tree, p.tokens!, intent, sectionStrings), dag: levels };
      }),
      makeStage('ValidationEngine', 'validation', ['tokens', 'tree', 'code'], async (p) => ({
        validation: await validate(p.tokens!, p.tree!, p.code!),
      })),
    ];
    stages.forEach((s) => kernel.registerEngine(s));

    const seedPayload: PipelinePayload = { prompt };
    let current: BaseArtifact = {
      id: 'prompt_artifact',
      type: 'intent',
      version: 1,
      schemaVersion: 1,
      fingerprint: calculateFingerprint(seedPayload),
      owner: 'User',
      createdAt: EPOCH,
      inputs: [],
      provenance: [],
      payload: seedPayload,
    };

    const artifacts: Record<string, ArtifactRef> = {};
    for (const stage of stages) {
      current = await kernel.executeEngine(stage.id, current);
      artifacts[stage.id] = {
        id: current.id,
        type: current.type,
        fingerprint: current.fingerprint,
        parentFingerprint: current.parentFingerprint,
      };
    }

    const final = current.payload as PipelinePayload;
    return {
      intent: final.intent!,
      tokens: final.tokens!,
      tree: final.tree!,
      code: final.code!,
      dag: final.dag ?? [],
      tokenSource: final.tokenSource ?? 'dna',
      validation: final.validation!,
      artifacts,
      trace,
    };
  }

  /** Deterministic replay: same prompt ⇒ identical per-stage fingerprints. */
  public async replayMatches(prompt: string, opts: RunOptions = {}): Promise<boolean> {
    const a = await this.run(prompt, opts);
    const b = await this.run(prompt, opts);
    return Object.keys(a.artifacts).every(
      (k) => a.artifacts[k].fingerprint === b.artifacts[k].fingerprint,
    );
  }
}

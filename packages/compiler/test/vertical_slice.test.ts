import test from 'node:test';
import assert from 'node:assert';
import {
  RuntimeKernel,
  ConstraintSolverEngine,
  calculateFingerprint,
  type Engine,
  type BaseArtifact,
  type ValidationResult,
  type ExecutionContext,
  type ConstraintRule,
} from '../dist/index.js';

interface IntentInputArtifact extends BaseArtifact {
  type: 'intent';
  payload: { prompt: string };
}

interface ProjectOutputArtifact extends BaseArtifact {
  type: 'project';
  payload: { domain: string; brandName: string; accentColor: string };
}

class TestIntentEngine implements Engine<IntentInputArtifact, ProjectOutputArtifact> {
  public id = 'IntentEngine';

  public consumes() {
    return ['intent' as const];
  }

  public produces() {
    return ['project' as const];
  }

  public validate(input: IntentInputArtifact, context: ExecutionContext): ValidationResult {
    return {
      valid: !!input.payload.prompt && input.payload.prompt.length > 0,
      errors: [],
    };
  }

  public async execute(input: IntentInputArtifact, context: ExecutionContext): Promise<ProjectOutputArtifact> {
    context.logger(`Executing IntentEngine for prompt: ${input.payload.prompt}`);

    const payload = {
      domain: 'real-estate',
      brandName: 'EstateLink',
      accentColor: '#e2ff00',
    };

    return {
      id: 'project_artifact_v1',
      type: 'project',
      version: 1,
      schemaVersion: 1,
      fingerprint: calculateFingerprint(payload, [input.id]),
      parentFingerprint: input.fingerprint,
      owner: 'IntentEngine',
      createdAt: new Date().toISOString(),
      inputs: [input.id],
      provenance: [input.id],
      payload,
    };
  }

  public rollback(context: ExecutionContext): void {
    context.logger('Rolling back IntentEngine execution.');
  }
}

test('Vertical Slice: OS RuntimeKernel Execution, Immutability & EventBus Pub/Sub', async () => {
  const kernel = new RuntimeKernel();
  const intentEngine = new TestIntentEngine();

  kernel.registerEngine(intentEngine);

  const engineStartedEvents: string[] = [];
  kernel.eventBus.subscribe('EngineStarted', (evt) => {
    engineStartedEvents.push(evt.engineId);
  });

  let artifactCreatedNotification = false;
  kernel.eventBus.subscribe('ArtifactCreated', () => {
    artifactCreatedNotification = true;
  });

  const payload = { prompt: 'Build luxury real estate platform EstateLink' };
  const inputArtifact: IntentInputArtifact = {
    id: 'user_prompt_v1',
    type: 'intent',
    version: 1,
    schemaVersion: 1,
    fingerprint: calculateFingerprint(payload),
    owner: 'User',
    createdAt: new Date().toISOString(),
    inputs: [],
    provenance: [],
    payload,
  };

  const output = await kernel.executeEngine<IntentInputArtifact, ProjectOutputArtifact>(
    'IntentEngine',
    inputArtifact
  );

  assert.strictEqual(output.payload.domain, 'real-estate');
  assert.strictEqual(output.payload.brandName, 'EstateLink');
  assert.strictEqual(kernel.getEngineState('IntentEngine'), 'Succeeded');
  assert.strictEqual(artifactCreatedNotification, true);
  assert.deepStrictEqual(engineStartedEvents, ['IntentEngine']);

  // Immutability Check: Store latest version and verify history tracking
  const history = kernel.artifactStore.getHistory('project_artifact_v1');
  assert.strictEqual(history.length, 1);
  assert.strictEqual(history[0].payload.brandName, 'EstateLink');
});

test('Vertical Slice: ConstraintSolverEngine solves multi-dimensional HARD/SOFT/PREFERENCE rules', () => {
  const solver = new ConstraintSolverEngine();

  const rules: ConstraintRule[] = [
    // Hard Constraint: WCAG AAA Contrast (Accessibility)
    { id: 'wcag-contrast', source: 'AccessibilitySkill', level: 'HARD', dimension: 'accessibility', property: 'minContrastRatio', value: 6.4, priority: 100, confidence: 1.0 },

    // Soft Constraints: Spacing conflict between Luxury (144px) and Performance (48px)
    { id: 'luxury-spacing', source: 'LuxurySkill', level: 'SOFT', dimension: 'spacing', property: 'paddingY', value: '144px', priority: 95, confidence: 0.95 },
    { id: 'perf-spacing', source: 'PerformanceSkill', level: 'SOFT', dimension: 'spacing', property: 'paddingY', value: '48px', priority: 70, confidence: 0.80 },

    // Preference: Custom typography tracking
    { id: 'editorial-tracking', source: 'EditorialSkill', level: 'PREFERENCE', dimension: 'typography', property: 'tracking', value: '-0.045em', priority: 50, confidence: 0.90 },
  ];

  const result = solver.solve(rules);

  assert.strictEqual(result.resolved['accessibility:minContrastRatio'], 6.4);
  assert.strictEqual(result.resolved['spacing:paddingY'], '144px');
  assert.strictEqual(result.resolved['typography:tracking'], '-0.045em');

  // Verify decision provenance tracing
  assert.match(result.explanations['accessibility:minContrastRatio'].winningSource, /AccessibilitySkill/);
  assert.match(result.explanations['spacing:paddingY'].winningSource, /LuxurySkill/);
});

import test from 'node:test';
import assert from 'node:assert';
import {
  RuntimeKernel,
  ConstraintSolverEngine,
  CapabilityRegistry,
  calculateFingerprint,
  type Engine,
  type BaseArtifact,
  type ValidationResult,
  type ExecutionContext,
  type ConstraintRule,
  type CapabilityProvider,
} from '../dist/index.js';

interface TestArtifact extends BaseArtifact {
  type: 'knowledge';
  payload: { value: string };
}

class FlakyEngine implements Engine<TestArtifact, TestArtifact> {
  public id = 'FlakyEngine';
  public attempts = 0;

  public failurePolicy = {
    retry: 2,
    abortPipeline: false,
    cacheOnFailure: false,
    severity: 'medium' as const,
  };

  public consumes() { return ['knowledge' as const]; }
  public produces() { return ['knowledge' as const]; }

  public validate(input: TestArtifact, context: ExecutionContext): ValidationResult {
    return { valid: true, errors: [] };
  }

  public async execute(input: TestArtifact, context: ExecutionContext): Promise<TestArtifact> {
    this.attempts++;
    if (this.attempts < 2) {
      throw new Error('Simulated transient chaos failure on attempt 1');
    }

    const payload = { value: 'recovered_value' };
    return {
      id: 'chaos_recovered_artifact',
      type: 'knowledge',
      version: 1,
      schemaVersion: 1,
      fingerprint: calculateFingerprint(payload, [input.id]),
      parentFingerprint: input.fingerprint,
      owner: 'FlakyEngine',
      createdAt: new Date().toISOString(),
      inputs: [input.id],
      provenance: [input.id],
      payload,
    };
  }

  public rollback(context: ExecutionContext): void {
    context.logger('FlakyEngine rolled back.');
  }
}

test('Chaos Suite: 100 Competing Skills & SAT Constraint Solver Stability', () => {
  const solver = new ConstraintSolverEngine();
  const rules: ConstraintRule[] = [];

  // Generate 100 competing SOFT rules across 100 skills
  for (let i = 0; i < 100; i++) {
    rules.push({
      id: `skill-rule-${i}`,
      source: `Skill_${i}`,
      level: 'SOFT',
      dimension: 'spacing',
      property: 'paddingY',
      value: `${32 + i * 2}px`,
      priority: Math.floor(Math.random() * 100),
      confidence: 0.8 + (i % 20) * 0.01,
    });
  }

  const { resolved, explanations } = solver.solve(rules);

  assert.ok(resolved['spacing:paddingY']);
  assert.ok(explanations['spacing:paddingY']);
  assert.ok(explanations['spacing:paddingY'].winningSource);
  assert.ok(explanations['spacing:paddingY'].rejectedSources.length > 0);
});

test('Chaos Suite: Transient Engine Crash Recovery via Failure Policy Retry', async () => {
  const kernel = new RuntimeKernel();
  const flakyEngine = new FlakyEngine();

  kernel.registerEngine(flakyEngine);

  let failedEventsCount = 0;
  kernel.eventBus.subscribe('EngineFailed', () => {
    failedEventsCount++;
  });

  const payload = { value: 'initial' };
  const inputArtifact: TestArtifact = {
    id: 'input_chaos_1',
    type: 'knowledge',
    version: 1,
    schemaVersion: 1,
    fingerprint: calculateFingerprint(payload),
    owner: 'User',
    createdAt: new Date().toISOString(),
    inputs: [],
    provenance: [],
    payload,
  };

  const result = await kernel.executeEngine<TestArtifact, TestArtifact>('FlakyEngine', inputArtifact);

  assert.strictEqual(result.payload.value, 'recovered_value');
  assert.strictEqual(flakyEngine.attempts, 2);
  assert.strictEqual(kernel.getEngineState('FlakyEngine'), 'Succeeded');
});

test('Chaos Suite: CapabilityRegistry Inversion of Control', () => {
  const registry = new CapabilityRegistry();

  const providerA: CapabilityProvider = {
    providerId: 'LuxuryTypographyProvider',
    capabilities: ['typography'],
    priority: 95,
    executeCapability: async () => ({ tracking: '-0.045em' }),
  };

  const providerB: CapabilityProvider = {
    providerId: 'DefaultTypographyProvider',
    capabilities: ['typography'],
    priority: 50,
    executeCapability: async () => ({ tracking: 'normal' }),
  };

  registry.registerProvider(providerB);
  registry.registerProvider(providerA);

  const providers = registry.getProvidersForCapability('typography');

  assert.strictEqual(providers.length, 2);
  assert.strictEqual(providers[0].providerId, 'LuxuryTypographyProvider');
});

test('Chaos Suite: Artifact Fingerprinting & Immutable Version History', () => {
  const payload1 = { brandName: 'EstateLink', primaryColor: '#e2ff00' };
  const fp1 = calculateFingerprint(payload1);

  const payload2 = { brandName: 'EstateLink', primaryColor: '#e2ff00' };
  const fp2 = calculateFingerprint(payload2);

  assert.strictEqual(fp1, fp2);

  const payload3 = { brandName: 'EstateLink', primaryColor: '#10b981' };
  const fp3 = calculateFingerprint(payload3);

  assert.notStrictEqual(fp1, fp3);
});

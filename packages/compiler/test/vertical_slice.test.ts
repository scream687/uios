import test from 'node:test';
import assert from 'node:assert';
import {
  RuntimeKernel,
  ConstraintResolutionEngine,
  type Engine,
  type BaseArtifact,
  type ValidationResult,
  type EngineMetrics,
  type ConstraintNode,
} from '../dist/index.js';

interface PromptInputArtifact extends BaseArtifact {
  type: 'intent';
  prompt: string;
}

interface ProjectOutputArtifact extends BaseArtifact {
  type: 'project';
  domain: string;
  brandName: string;
  accentColor: string;
}

class TestIntentEngine implements Engine<PromptInputArtifact, ProjectOutputArtifact> {
  public id = 'IntentEngine';

  public consumes() {
    return ['intent' as const];
  }

  public produces() {
    return ['project' as const];
  }

  public validate(input: PromptInputArtifact): ValidationResult {
    return {
      valid: !!input.prompt && input.prompt.length > 0,
      errors: [],
    };
  }

  public async execute(input: PromptInputArtifact): Promise<ProjectOutputArtifact> {
    return {
      id: 'project_output_1',
      type: 'project',
      version: 1,
      owner: 'IntentEngine',
      contentHash: 'sha256:test',
      createdAt: new Date().toISOString(),
      domain: 'real-estate',
      brandName: 'EstateLink',
      accentColor: '#e2ff00',
    };
  }

  public rollback(): void {}

  public metrics(): EngineMetrics {
    return { executionTimeMs: 4, memoryUsageMb: 12, cacheHit: false };
  }
}

test('Vertical Slice: Universal Engine Protocol & RuntimeKernel Execution', async () => {
  const kernel = new RuntimeKernel();
  const intentEngine = new TestIntentEngine();

  kernel.registerEngine(intentEngine);

  const inputArtifact: PromptInputArtifact = {
    id: 'user_prompt_1',
    type: 'intent',
    version: 1,
    owner: 'User',
    contentHash: 'hash_123',
    createdAt: new Date().toISOString(),
    prompt: 'Build luxury real estate platform EstateLink',
  };

  const output = await kernel.executeStep<PromptInputArtifact, ProjectOutputArtifact>(
    'IntentEngine',
    inputArtifact
  );

  assert.strictEqual(output.domain, 'real-estate');
  assert.strictEqual(output.brandName, 'EstateLink');
  assert.strictEqual(kernel.getArtifact('project_output_1')?.id, 'project_output_1');
});

test('Vertical Slice: Constraint Resolution Engine solves multi-agent conflicts', () => {
  const resolver = new ConstraintResolutionEngine();

  const constraints: ConstraintNode[] = [
    { source: 'LuxurySkill', capability: 'spacing', property: 'paddingY', value: '144px', priority: 90, confidence: 0.95 },
    { source: 'PerformanceSkill', capability: 'spacing', property: 'paddingY', value: '48px', priority: 70, confidence: 0.80 },
    { source: 'AccessibilitySkill', capability: 'spacing', property: 'paddingY', value: '64px', priority: 85, confidence: 0.90 },
  ];

  const resolved = resolver.resolveConflicts(constraints);

  // LuxurySkill wins because weight (90 * 0.95 = 85.5) > Accessibility (85 * 0.90 = 76.5) > Performance (70 * 0.80 = 56)
  assert.strictEqual(resolved['spacing:paddingY'], '144px');
});

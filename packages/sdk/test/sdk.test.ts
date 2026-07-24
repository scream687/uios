import test from 'node:test';
import assert from 'node:assert';
import { createSkill, createSkillContext, testSkill } from '../dist/index.js';

test('@uios/sdk createSkill validates manifest and executes skill', async () => {
  const sampleSkill = createSkill({
    manifest: {
      id: 'custom-layout-skill',
      version: '1.0.0',
      category: 'layout',
      name: 'Custom Layout Skill',
      description: 'Custom Layout Skill via SDK',
      priority: 100,
      confidence: 0.98,
      stage: 'layout',
      parallelizable: true,
      dependencies: [],
      supports: ['landing-page'],
      capabilities: ['layout'],
      libraries: ['shadcn'],
      estimatedTimeMs: 120,
      costUnits: 2,
      qualityWeight: 9.8,
    },
    execute: async (ctx) => {
      ctx.telemetry.mutationCount += 2;
      return {
        success: true,
        updatedNodes: 2,
        warnings: [],
        metrics: { spacing: 98 },
      };
    },
  });

  const res = await testSkill(sampleSkill, 'Build landing page');
  assert.strictEqual(res.diagnostics.success, true);
  assert.strictEqual(res.diagnostics.updatedNodes, 2);
  assert.strictEqual(res.diagnostics.metrics.spacing, 98);
});

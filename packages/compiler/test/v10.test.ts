import test from 'node:test';
import assert from 'node:assert';
import {
  BriefInferenceEngine,
  AntiDefaultDisciplineEngine,
  ExternalSkillKnowledgeHydrator,
  UIOSv10ImpeccableTasteEngine,
} from '../dist/index.js';

test('BriefInferenceEngine: Infers design read & sets Three Dials (VARIANCE, MOTION, DENSITY)', () => {
  const engine = new BriefInferenceEngine();
  const { designRead, dials } = engine.inferDesignRead('Build a Kuro Coffee specialty roasters monolith landing page');

  assert.ok(designRead.oneLineRead.includes('Reading this as: Specialty Coffee Monolith'));
  assert.strictEqual(dials.designVariance, 8);
  assert.strictEqual(dials.motionIntensity, 7);
  assert.strictEqual(dials.visualDensity, 3);
});

test('AntiDefaultDisciplineEngine: Detects LLM default tells (AI-purple gradients, 3 equal cards, Inter + slate-900)', () => {
  const engine = new AntiDefaultDisciplineEngine();

  const badAST = {
    gradient: 'purple-to-indigo',
    cardGridCount: 3,
    uniformSectionDensity: true,
    font: 'Inter',
    backgroundColor: '#0f172a',
  };

  const audit = engine.auditForAIDefaults(badAST);

  assert.strictEqual(audit.passedAntiDefaultCheck, false);
  assert.strictEqual(audit.detectedDefaults.length, 3);
  assert.ok(audit.remedies[0].includes('Replace generic purple gradient'));
});

test('ExternalSkillKnowledgeHydrator: Mounts taste-skill, impeccable, and ui-ux-pro-max-skill repositories', () => {
  const hydrator = new ExternalSkillKnowledgeHydrator();
  const status = hydrator.mountExternalSkillRepositories();

  assert.strictEqual(status.tasteSkillMounted, true);
  assert.strictEqual(status.impeccableSkillMounted, true);
  assert.strictEqual(status.uiUxProMaxSkillMounted, true);
  assert.strictEqual(status.totalExternalSkillsLoaded, 3);
});

test('UIOSv10ImpeccableTasteEngine: Executes v10 Impeccable Taste Pro Max pass on draft AST', () => {
  const v10Engine = new UIOSv10ImpeccableTasteEngine();
  const res = v10Engine.executeV10ImpeccablePass(
    'Create Kuro Coffee Roasters',
    { cardGridCount: 1, uniformSectionDensity: false }
  );

  assert.ok(res.designRead.oneLineRead.length > 0);
  assert.strictEqual(res.refinedAST.headlineTracking, '-0.03em');
  assert.strictEqual(res.refinedAST.heroOccupancyVh, 85);
  assert.strictEqual(res.refinedAST.asymmetryRatio, 0.32);
});

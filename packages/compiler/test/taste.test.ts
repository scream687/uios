import test from 'node:test';
import assert from 'node:assert';
import { TasteEngine } from '../dist/index.js';

test('Taste Engine: Audits layout for AI tells & calculates Taste Score', () => {
  const tasteEngine = new TasteEngine();

  // Test layout with AI tells
  const genericAILayout = {
    cardGridCount: 4,
    uniformSectionDensity: true,
    dominantFocalObject: false,
    borderedContainerCount: 8,
    emotionalJourney: false,
  };

  const audit = tasteEngine.auditDesignForAITells(genericAILayout);

  assert.strictEqual(audit.passed, false);
  assert.ok(audit.tasteScore < 50);
  assert.ok(audit.detectedAITells.some(t => t.tell === 'Repetitive Card Grid Syndrome'));
  assert.ok(audit.detectedAITells.some(t => t.tell === 'Monotonous Section Pacing'));
});

test('Taste Engine: Passes handcrafted Awwwards-level layout', () => {
  const tasteEngine = new TasteEngine();

  const handcraftedLayout = {
    cardGridCount: 1,
    uniformSectionDensity: false,
    dominantFocalObject: true,
    borderedContainerCount: 1,
    emotionalJourney: true,
  };

  const audit = tasteEngine.auditDesignForAITells(handcraftedLayout);

  assert.strictEqual(audit.passed, true);
  assert.ok(audit.tasteScore >= 85);
  assert.strictEqual(audit.detectedAITells.length, 0);
});

import test from 'node:test';
import assert from 'node:assert';
import { TasteEngine } from '../dist/index.js';

test('Taste Engine: Audits layout for AI tells & calculates Taste Score from derived AST metrics', () => {
  const tasteEngine = new TasteEngine();

  // Test layout AST with AI tells (uniform heights, 4 grids)
  const genericAILayout = {
    sections: [
      { heightVh: 50, isHero: false, type: 'container' },
      { heightVh: 50, type: 'grid', bordered: true },
      { heightVh: 50, type: 'grid', bordered: true },
      { heightVh: 50, type: 'grid', bordered: true },
    ],
  };

  const audit = tasteEngine.auditDesignForAITells(genericAILayout);

  assert.strictEqual(audit.passed, false);
  assert.ok(audit.tasteScore <= 50);
  assert.ok(audit.detectedAITells.some(t => t.tell === 'Repetitive Card Grid Syndrome'));
  assert.ok(audit.detectedAITells.some(t => t.tell === 'Monotonous Section Pacing'));
});

test('Taste Engine: Passes handcrafted Awwwards-level layout derived AST metrics', () => {
  const tasteEngine = new TasteEngine();

  const handcraftedLayout = {
    sections: [
      { heightVh: 100, isHero: true, type: 'monolith' },
      { heightVh: 35, type: 'text' },
      { heightVh: 140, type: 'module' },
      { heightVh: 90, type: 'monolith' },
    ],
  };

  const audit = tasteEngine.auditDesignForAITells(handcraftedLayout);

  assert.strictEqual(audit.passed, true);
  assert.ok(audit.tasteScore >= 85);
  assert.strictEqual(audit.detectedAITells.length, 0);
});

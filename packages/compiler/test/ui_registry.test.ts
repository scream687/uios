import test from 'node:test';
import assert from 'node:assert';
import {
  UIMasterRegistryEngine,
  TypographyDirector,
  ColorDirector,
  MotionDirector,
} from '../dist/index.js';

test('UIMasterRegistryEngine: Resolves discipline resolution order deterministically', () => {
  const masterEngine = new UIMasterRegistryEngine();
  const order = masterEngine.resolveDisciplineOrder();

  assert.strictEqual(order[0], 'composition');
  assert.strictEqual(order[1], 'layout');
  assert.strictEqual(order[2], 'typography');
  assert.strictEqual(order[3], 'color');
  assert.strictEqual(order[4], 'motion');
  assert.strictEqual(order[5], 'accessibility');
});

test('TypographyDirector & FontPairingAgent: Synthesizes curated fonts from isolated typography dataset', () => {
  const director = new TypographyDirector();
  const res = director.synthesizeTypography('Luxury Editorial');

  assert.strictEqual(res.pairing.displayFont, 'Playfair Display');
  assert.strictEqual(res.pairing.bodyFont, 'Inter');
  assert.strictEqual(res.pairing.trackingHeading, '-0.03em');
});

test('ColorDirector & PaletteAgent: Synthesizes curated palettes from isolated color dataset', () => {
  const director = new ColorDirector();
  const res = director.synthesizeColor('Volcanic Dark');

  assert.strictEqual(res.palette.background, '#0A0A0B');
  assert.strictEqual(res.palette.primary, '#FF4500');
  assert.ok(res.palette.contrastRatio >= 7.0);
});

test('MotionDirector & GSAPMotionAgent: Synthesizes GSAP motion profiles from isolated motion dataset', () => {
  const director = new MotionDirector();
  const res = director.synthesizeMotion('Luxury Spring Physics');

  assert.strictEqual(res.motion.easing, 'cubic-bezier(0.16, 1, 0.3, 1)');
  assert.strictEqual(res.motion.durationFastMs, 150);
});

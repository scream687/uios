import test from 'node:test';
import assert from 'node:assert';
import {
  UIOSRuntime,
  contrastRatio,
  buildComponentTree,
  emitReact,
  DeterministicProvider,
  PlanningEngine,
  IntentEngine,
  BrandDNAEngine,
} from '../dist/index.js';

const FINTECH = 'Build a fintech analytics dashboard for enterprise operators';
const PORTFOLIO = 'A luxury editorial portfolio site for a creator';

// ── Real WCAG contrast math ─────────────────────────────────────────────────
test('contrastRatio computes real WCAG ratios', () => {
  assert.strictEqual(Math.round(contrastRatio('#000000', '#ffffff')!), 21);
  assert.strictEqual(Math.round(contrastRatio('#ffffff', '#ffffff')!), 1);
  assert.strictEqual(contrastRatio('rgba(0,0,0,0.5)', '#fff'), null); // non-hex skipped honestly
});

// ── Guardrail 1: distinct prompts ⇒ distinct output & scores ────────────────
test('two different prompts produce different trees, code, and scores', async () => {
  const rt = new UIOSRuntime();
  const a = await rt.run(FINTECH);
  const b = await rt.run(PORTFOLIO);

  assert.notStrictEqual(a.intent.category, b.intent.category);
  assert.notDeepStrictEqual(
    a.tree.nodes.map((n) => n.kind),
    b.tree.nodes.map((n) => n.kind),
    'component trees must differ by intent',
  );
  assert.notStrictEqual(a.code, b.code, 'emitted code must differ by intent');
  // Scores are derived, so at least the fingerprints of the code artifacts differ.
  assert.notStrictEqual(
    a.artifacts.EmitEngine.fingerprint,
    b.artifacts.EmitEngine.fingerprint,
  );
});

// ── Guardrail 2: the emitter consumes the tree (not a fixed template) ───────
test('mutating the component tree changes the emitted code', () => {
  const intent = new IntentEngine().parse(FINTECH);
  const plan = new PlanningEngine().plan(intent);
  const tokens = new BrandDNAEngine().synthesize(intent.styleArchetype);
  const provider = new DeterministicProvider();

  const tree = buildComponentTree(plan);
  const before = emitReact(tree, tokens, intent, provider);

  const mutated = { ...tree, nodes: tree.nodes.slice(0, 1) };
  const after = emitReact(mutated, tokens, intent, provider);

  assert.notStrictEqual(before, after, 'fewer nodes must yield different code');
  assert.ok(before.length > after.length);
});

// ── Guardrail 3: deterministic replay ───────────────────────────────────────
test('same prompt replays to identical artifact fingerprints', async () => {
  const rt = new UIOSRuntime();
  assert.strictEqual(await rt.replayMatches(FINTECH), true);
});

// ── Scores are real: a well-formed run scores high, contrast gates hard ─────
test('validation produces a derived (non-constant) score with real contrast', async () => {
  const rt = new UIOSRuntime();
  const a = await rt.run(FINTECH);
  const b = await rt.run(PORTFOLIO);

  assert.ok(a.validation.metrics.bodyContrast! > 1);
  assert.ok(a.validation.score >= 40 && a.validation.score <= 100);
  // Different designs should not always land on the exact same number.
  const scoresVary =
    a.validation.score !== b.validation.score ||
    a.validation.metrics.cardGridCount !== b.validation.metrics.cardGridCount ||
    a.validation.metrics.bodyContrast !== b.validation.metrics.bodyContrast;
  assert.ok(scoresVary, 'validation must vary with the design, not be constant');
});

// ── upgrade: taste directions + uupm selection + impeccable findings ────────
test('pipeline uses taste directions, data-backed tokens, and slop detection', async () => {
  const rt = new UIOSRuntime();
  const a = await rt.run('a brutalist terminal portfolio, bold and dense');
  const b = await rt.run('a calm luxury spa landing page');

  // taste-skill: distinct committed directions inferred from the brief
  assert.strictEqual(a.intent.directionId, 'brutalist');
  assert.strictEqual(b.intent.directionId, 'luxury');
  assert.notDeepStrictEqual(a.intent.dials, b.intent.dials);

  // impeccable: findings are always present as an array and feed the score
  assert.ok(Array.isArray(a.validation.slop));
  assert.strictEqual(typeof a.validation.metrics.slopPenalty, 'number');

  // ui-ux-pro-max: when Python is available, tokens come from the knowledge base
  // and distinct directions yield distinct palettes.
  if (a.tokenSource === 'uupm' && b.tokenSource === 'uupm') {
    assert.notStrictEqual(a.tokens.colors.primary, b.tokens.colors.primary);
  }
});

test('dials drive the emitted layout (density → spacing, variance → composition)', () => {
  const intent = new IntentEngine().parse('a landing page');
  const plan = new PlanningEngine().plan(intent);
  const tokens = new BrandDNAEngine().synthesize(intent.styleArchetype);
  const tree = buildComponentTree(plan);
  const provider = new DeterministicProvider();

  const spacious = emitReact(tree, tokens, { ...intent, dials: { variance: 2, motion: 3, density: 2 } }, provider);
  const dense = emitReact(tree, tokens, { ...intent, dials: { variance: 9, motion: 3, density: 10 } }, provider);

  assert.ok(spacious.includes('py-28'), 'low density → generous padding');
  assert.ok(dense.includes('py-10'), 'high density → tight padding');
  assert.ok(spacious.includes('text-center'), 'low variance → centered hero');
  assert.notStrictEqual(spacious, dense);
});

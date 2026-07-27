import test from 'node:test';
import assert from 'node:assert';
import {
  readDesignDirection,
  TASTE_DIRECTIONS,
  ANTI_DEFAULTS,
  detectSlop,
  slopPenalty,
  UupmClient,
} from '../dist/index.js';

// ── taste-skill: Design Read ────────────────────────────────────────────────
test('readDesignDirection infers a committed direction + dials from the brief', () => {
  assert.strictEqual(readDesignDirection('a raw brutalist terminal dashboard').direction.id, 'brutalist');
  assert.strictEqual(readDesignDirection('a calm luxury spa landing').direction.id, 'luxury');
  const bold = readDesignDirection('a bold dense analytics dashboard');
  assert.ok(bold.dials.variance >= 5 && bold.dials.density >= 6);
  // dials always clamped 1..10
  for (const d of Object.values(readDesignDirection('x').dials)) {
    assert.ok(d >= 1 && d <= 10);
  }
});

test('the full taste library is present and each direction forbids slop defaults', () => {
  assert.ok(TASTE_DIRECTIONS.length >= 8);
  assert.ok(ANTI_DEFAULTS.includes('gradient-text'));
  for (const d of TASTE_DIRECTIONS) assert.ok(d.forbidden.length > 0);
});

// ── impeccable: deterministic slop detection ────────────────────────────────
test('detectSlop flags real anti-patterns and passes clean code', async () => {
  const slop = await detectSlop(
    `<h1 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Hi</h1>`,
  );
  const ids = slop.map((f) => f.id);
  assert.ok(ids.includes('gradient-text') || ids.includes('ai-color-palette'), `expected slop, got ${ids}`);
  assert.ok(slopPenalty(slop) > 0);

  const clean = await detectSlop(`<h1 className="text-3xl font-bold text-[#111111]">Hello</h1>`);
  assert.strictEqual(clean.filter((f) => f.severity !== 'advisory').length, 0);
});

// ── ui-ux-pro-max: data-backed selection (skips if Python is unavailable) ────
test('UupmClient returns distinct real palettes for distinct queries', async (t) => {
  const client = new UupmClient();
  if (!(await client.available())) return t.skip('python3 not available');

  const dials = { variance: 4, motion: 4, density: 6 };
  const a = await client.designSystem('fintech analytics dashboard', dials);
  const b = await client.designSystem('luxury fashion editorial portfolio', dials);
  assert.ok(a && b, 'expected design systems');
  assert.notStrictEqual(a!.colors.primary, b!.colors.primary);
  assert.match(a!.colors.background, /^#[0-9a-fA-F]{6}$/);
});

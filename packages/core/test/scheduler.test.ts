import test from 'node:test';
import assert from 'node:assert';
import { schedule, DagCycleError } from '../dist/index.js';

test('diamond DAG executes in dependency order across levels', async () => {
  const order: string[] = [];
  const node = (id: string, deps: string[]) => ({
    id,
    deps,
    run: () => {
      order.push(id);
      return id.toUpperCase();
    },
  });

  const { results, levels } = await schedule([
    node('a', []),
    node('b', ['a']),
    node('c', ['a']),
    node('d', ['b', 'c']),
  ]);

  assert.deepStrictEqual(levels, [['a'], ['b', 'c'], ['d']]);
  assert.strictEqual(order[0], 'a');
  assert.strictEqual(order[3], 'd');
  assert.strictEqual(results.get('d'), 'D');
});

test('a node receives prior results', async () => {
  const { results } = await schedule([
    { id: 'x', deps: [], run: () => 2 },
    { id: 'y', deps: ['x'], run: (r) => (r.get('x') as number) * 5 },
  ]);
  assert.strictEqual(results.get('y'), 10);
});

test('cycles are rejected', async () => {
  await assert.rejects(
    () =>
      schedule([
        { id: 'a', deps: ['b'], run: () => 1 },
        { id: 'b', deps: ['a'], run: () => 1 },
      ]),
    DagCycleError,
  );
});

test('unknown dependency throws', async () => {
  await assert.rejects(() => schedule([{ id: 'a', deps: ['ghost'], run: () => 1 }]));
});

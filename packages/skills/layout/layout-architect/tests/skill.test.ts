import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };
import golden from '../goldens/expected-ast.json' with { type: 'json' };

test('Skill layout-architect manifest and golden expected AST are valid', () => {
  assert.strictEqual(manifest.id, 'layout-architect');
  assert.strictEqual(golden.status, 'pass');
});

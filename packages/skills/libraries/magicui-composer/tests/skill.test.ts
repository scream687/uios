import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };
import golden from '../goldens/expected-ast.json' with { type: 'json' };

test('Skill magicui-composer manifest and golden expected AST are valid', () => {
  assert.strictEqual(manifest.id, 'magicui-composer');
  assert.strictEqual(golden.status, 'pass');
});

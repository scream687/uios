import test from 'node:test';
import assert from 'node:assert';
import { KnowledgeRetrievalAgent } from '../dist/index.js';

test('KnowledgeRetrievalAgent: Ranks design corpus and summarizes into focused design_context.json', () => {
  const retrievalAgent = new KnowledgeRetrievalAgent();
  const context = retrievalAgent.retrieveAndSummarize({
    prompt: 'Create a premium single-origin coffee website',
    domain: 'Coffee',
    brandArchetype: 'Luxury Minimalist',
  });

  assert.strictEqual(context.artifactId, 'design_context.json');
  assert.ok(context.retrievedDocuments.includes('domain/coffee.md'));
  assert.ok(context.retrievedDocuments.includes('brand/luxury.md'));
  assert.ok(context.principles.heroAnchor.includes('Dominant Physical Object'));
  assert.ok(context.recommendedMCPCapabilities.includes('EditorialHeroMCP'));
});

import test from 'node:test';
import assert from 'node:assert';
import {
  UIOSv4SessionInitializer,
  MCPDiscoveryRegistry,
  SubArtifactRepairEngine,
  PairwiseTournamentEngine,
} from '../dist/index.js';

test('UIOSv4SessionInitializer: Phase 0 session bootstrap & artifact graph setup', () => {
  const init = new UIOSv4SessionInitializer();
  const session = init.initializeSession('/workspace/uios');

  assert.ok(session.sessionId.startsWith('uios-v4-'));
  assert.strictEqual(session.status, 'INITIALIZED');
});

test('MCPDiscoveryRegistry: Discovers and maps external MCP package manifests', () => {
  const registry = new MCPDiscoveryRegistry();
  registry.registerMCP({
    packageId: 'mcp-hero-luxury-01',
    version: '1.0.0',
    capabilities: ['hero-generation'],
    components: ['VolcanicHeroMonolith'],
    tokens: { primary: '#FF4500' },
  });

  const discovered = registry.discoverCapabilities('hero-generation');
  assert.strictEqual(discovered.length, 1);
  assert.strictEqual(discovered[0].packageId, 'mcp-hero-luxury-01');
});

test('SubArtifactRepairEngine: Phase 14 targeted sub-artifact mutation & micro-pass', () => {
  const repairEngine = new SubArtifactRepairEngine();
  const res = repairEngine.repairTargetedSubArtifact({
    candidateId: 'cand-01',
    failingDimension: 'motion',
    intactSubArtifacts: { layout: { heightVh: 100 } },
    failingSubArtifact: { motionType: 'none' },
  });

  assert.strictEqual(res.microPassExecuted, true);
  assert.strictEqual(res.repairedSubArtifact.repaired, true);
});

test('PairwiseTournamentEngine: Phase 15 tournament elimination with blind tie-breaker', () => {
  const tournament = new PairwiseTournamentEngine();

  // Test clear victory (Delta >= 5)
  const match1 = tournament.evaluateMatchup({ id: 'cand-01', score: 90 }, { id: 'cand-02', score: 80 });
  assert.strictEqual(match1.tieBreakerInvoked, false);
  assert.strictEqual(match1.winnerId, 'cand-01');

  // Test close matchup (Delta < 5) -> Triggers tie-breaker
  const match2 = tournament.evaluateMatchup({ id: 'cand-Monolith-01', score: 88 }, { id: 'cand-02', score: 86 });
  assert.strictEqual(match2.tieBreakerInvoked, true);
  assert.strictEqual(match2.winnerId, 'cand-Monolith-01');
});

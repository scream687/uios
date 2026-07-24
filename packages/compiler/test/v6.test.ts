import test from 'node:test';
import assert from 'node:assert';
import {
  PlaywrightVisualObserver,
  MultiPageSiteArchitect,
  ProductionExportEngine,
} from '../dist/index.js';

test('PlaywrightVisualObserver: Observes rendered viewport and computes optical saliency score', () => {
  const observer = new PlaywrightVisualObserver();
  const metrics = observer.observeRenderedViewport({ width: 1920, height: 1080, device: 'desktop' });

  assert.strictEqual(metrics.viewportWidthPx, 1920);
  assert.ok(metrics.saliencyHeatmapScore >= 90);
  assert.ok(metrics.eyeTrackingVector.includes('F-Pattern'));
});

test('MultiPageSiteArchitect: Builds multi-page site graph with shared layout persistence', () => {
  const architect = new MultiPageSiteArchitect();
  const graph = architect.buildSiteGraph('Coffee', 'Luxury Editorial');

  assert.strictEqual(graph.routes.length, 4);
  assert.strictEqual(graph.routes[0].path, '/');
  assert.strictEqual(graph.routes[1].path, '/terroir');
  assert.strictEqual(graph.navigationState.persistentHeader, true);
});

test('ProductionExportEngine: Generates deployable production bundle manifest', () => {
  const architect = new MultiPageSiteArchitect();
  const graph = architect.buildSiteGraph('Coffee', 'Luxury Editorial');
  const exporter = new ProductionExportEngine();

  const bundle = exporter.generateExportBundle(graph);

  assert.strictEqual(bundle.framework, 'Next.js 14');
  assert.strictEqual(bundle.dockerfileIncluded, true);
  assert.strictEqual(bundle.storybookIncluded, true);
  assert.ok(bundle.fileManifest.includes('Dockerfile'));
});

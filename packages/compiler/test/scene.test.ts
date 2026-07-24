import test from 'node:test';
import assert from 'node:assert';
import {
  ExperienceDirectorEngine,
  CompositionEngine,
  SceneComposerEngine,
  DomainExperienceLibrary,
} from '../dist/index.js';

test('Scene Engine: ExperienceDirectorEngine formulates experience.json schema', () => {
  const director = new ExperienceDirectorEngine();
  const exp = director.generateExperience('coffee');

  assert.strictEqual(exp.heroMoment.type, 'cinematic');
  assert.strictEqual(exp.heroMoment.dominantObject, 'Volcanic_Obsidian_Coffee_Monolith');
  assert.deepStrictEqual(exp.emotionCurve, ['curiosity', 'craft', 'science', 'desire', 'confidence']);
});

test('Scene Engine: CompositionEngine generates composition.json rhythm & tension', () => {
  const compositionEngine = new CompositionEngine();
  const comp = compositionEngine.generateComposition();

  assert.deepStrictEqual(comp.rhythm, ['100vh', '35vh', '140vh', '60vh', '90vh']);
  assert.deepStrictEqual(comp.tension, ['break-grid', 'center', 'overlap', 'offset', 'break-grid']);
});

test('Scene Engine: SceneComposerEngine composes Scene Graph', () => {
  const director = new ExperienceDirectorEngine();
  const compositionEngine = new CompositionEngine();
  const composer = new SceneComposerEngine();

  const exp = director.generateExperience('coffee');
  const comp = compositionEngine.generateComposition();
  const scenes = composer.composeSceneGraph(exp, comp);

  assert.strictEqual(scenes.length, 3);
  assert.strictEqual(scenes[0].experienceModule, 'TerroirElevationMap');
  assert.strictEqual(scenes[1].experienceModule, 'AnaerobicVatChamber');
});

test('Domain Experience Library: Deletes generic UI cards in favor of domain modules', () => {
  const library = new DomainExperienceLibrary();
  const coffeeModules = library.getModulesForDomain('coffee');
  const realEstateModules = library.getModulesForDomain('real-estate');

  assert.ok(coffeeModules.some(m => m.name === 'FlavorSpectrum'));
  assert.ok(coffeeModules.some(m => m.name === 'AnaerobicVatChamber'));
  assert.ok(realEstateModules.some(m => m.name === 'ParcelExplorer'));
});

import test from 'node:test';
import assert from 'node:assert';
import {
  DesignSpecParser,
  DesignAST,
  DesignASTNode,
  ConstraintEngine,
  DesignTokenCompiler,
  MultiTargetEmitter,
  BrandDNAEngine,
  DesignMigrationEngine,
  ReplicaTemplateManager,
  WebsiteDNAExtractor,
  DesignSystemExtractor,
  UIUXProMaxEngine,
  ImpeccableCriticBoard,
  TasteIntelligenceEngine,
} from '../dist/index.js';

test('Layer 1: DesignSpecParser converts prompt to spec', () => {
  const parser = new DesignSpecParser();
  const spec = parser.parse('Build a Stripe SaaS marketing page');
  assert.strictEqual(spec.brand.archetype, 'Stripe SaaS');
  assert.strictEqual(spec.project.type, 'Marketing Website');
});

test('Layer 2 & 3: ConstraintEngine validates Design AST', () => {
  const root = new DesignASTNode('root', 'Root Screen', {
    componentType: 'Navigation',
    variant: 'Default',
    layout: { display: 'flex', containerWidth: 'max-w-7xl', paddingY: 'py-4', gap: 'gap-4' },
    animation: { type: 'stagger-fade-up', delayMs: 0, durationMs: 250, easing: 'ease' },
    typography: { headingScale: 'text-5xl', bodyScale: 'text-base' },
    accessibility: { role: 'banner', keyboardFocusable: true },
    performance: { gpuBudgetMs: 2.0, lazyLoad: false },
    library: { primary: 'shadcn/ui', priorityScore: 90 },
  });
  const ast = new DesignAST(root);
  const engine = new ConstraintEngine();
  const violations = engine.validate(ast, {
    project: { name: 'Test', type: 'Marketing Website', industry: 'Tech' },
    brand: { archetype: 'Linear Dark', personality: [], voice: '' },
    audience: { target: '', techSavviness: 'high' },
    goals: [],
    visual: { density: 'low', hierarchy: 'dramatic', radiusPx: 8, elevation: 'subtle' },
    motion: { style: 'premium', maxDurationMs: 250 },
  });

  assert.strictEqual(violations.length, 0);
});

test('Layer 4 & 19: Token Compiler & Emitters produce multi-target code', () => {
  const specParser = new DesignSpecParser();
  const spec = specParser.parse('Build Linear Dark interface');
  const tokenCompiler = new DesignTokenCompiler();
  const tokens = tokenCompiler.compile(spec);

  const root = new DesignASTNode('root', 'Root', {
    componentType: 'Navigation',
    variant: 'Default',
    layout: { display: 'flex', containerWidth: 'max-w-7xl', paddingY: 'py-4', gap: 'gap-4' },
    animation: { type: 'stagger-fade-up', delayMs: 0, durationMs: 250, easing: 'ease' },
    typography: { headingScale: 'text-5xl', bodyScale: 'text-base' },
    accessibility: { role: 'banner', keyboardFocusable: true },
    performance: { gpuBudgetMs: 2.0, lazyLoad: false },
    library: { primary: 'shadcn/ui', priorityScore: 90 },
  });

  const emitter = new MultiTargetEmitter();
  const reactOutput = emitter.emit(new DesignAST(root), tokens, 'react-tsx');
  const figmaOutput = emitter.emit(new DesignAST(root), tokens, 'figma-tokens');
  const vueOutput = emitter.emit(new DesignAST(root), tokens, 'vue-sfc');

  assert.ok(reactOutput.code.includes('GeneratedScreen'));
  assert.ok(figmaOutput.code.includes('COLOR'));
  assert.ok(vueOutput.code.includes('ant-design-vue'));
  assert.ok(vueOutput.code.includes('a-config-provider'));
  assert.ok(vueOutput.code.includes('a-layout'));
});

test('Layer 4: BrandDNAEngine synthesizes custom and new visual design archetypes', () => {
  const dnaEngine = new BrandDNAEngine();

  const starck = dnaEngine.synthesize('Philippe Starck Constructivist');
  assert.strictEqual(starck.colors.background, '#e2ded7');
  assert.strictEqual(starck.colors.primary, '#e52424');

  const ampera = dnaEngine.synthesize('Ampera Industrial Freight');
  assert.strictEqual(ampera.colors.background, '#0a0a0a');
  assert.strictEqual(ampera.colors.primary, '#ff3b00');

  const artify = dnaEngine.synthesize('Artify AI Obsidian');
  assert.strictEqual(artify.colors.background, '#0d0d0e');
  assert.strictEqual(artify.colors.primary, '#e2ff00');

  const margarita = dnaEngine.synthesize('Botanical Margarita Editorial');
  assert.strictEqual(margarita.colors.background, '#f4efe4');
  assert.strictEqual(margarita.colors.primary, '#d48806');

  const travelish = dnaEngine.synthesize('Travelish Sanctuary Minimal');
  assert.strictEqual(travelish.colors.background, '#f8f9fa');
  assert.strictEqual(travelish.colors.primary, '#3a8088');

  const customTokens = dnaEngine.synthesize('Linear Dark', { primary: '#ff0055' });
  assert.strictEqual(customTokens.colors.primary, '#ff0055');
});

test('Layer 4: BrandDNAEngine applies custom user color palette overrides', () => {
  const dnaEngine = new BrandDNAEngine();
  const tokens = dnaEngine.synthesize('Stripe SaaS', {
    background: '#0d1f2d',
    primary: '#00e5ff',
  });

  assert.strictEqual(tokens.colors.background, '#0d1f2d');
  assert.strictEqual(tokens.colors.primary, '#00e5ff');
  assert.strictEqual(tokens.archetype, 'Stripe SaaS');
});

test('Design Migration Engine (DME): Analyzes source input, builds Behavioral AST, & emits parity report', () => {
  const dme = new DesignMigrationEngine();
  const migrationResult = dme.analyzeAndMigrate(
    { format: 'HTML/CSS', contentOrUrl: '<div class="hero">Legacy HTML Website</div>' },
    'React'
  );

  assert.strictEqual(migrationResult.report.visualSimilarity, '99.4%');
  assert.strictEqual(migrationResult.report.interactionCoverage, '100%');
  assert.strictEqual(migrationResult.report.accessibility, 'WCAG AA');
  assert.ok(migrationResult.targetCode.includes('Migrated Application'));
  assert.strictEqual(migrationResult.ast.root.metadata.componentType, 'Navigation');
});

test('Superdesign Integration: ReplicaTemplateManager & DNA Extractors work seamlessly', () => {
  const manager = new ReplicaTemplateManager();
  const file = manager.saveReplica('home', '<section>Existing Home Page UI</section>');
  assert.strictEqual(file, '.uios/replica_html_template/home.html');
  assert.strictEqual(manager.getReplica('home'), '<section>Existing Home Page UI</section>');

  const extractor = new WebsiteDNAExtractor();
  const dna = extractor.extract('https://example.com');
  assert.ok(dna.designSystemMd.includes('UIOS Extracted Design System'));
  assert.strictEqual(dna.extractedTokens['--bg-primary'], '#08090a');

  const dsExtractor = new DesignSystemExtractor();
  const markdown = dsExtractor.generateWorkspaceDesignSystem('MyProject');
  assert.ok(markdown.includes('.uios/design-system.md'));
});

test('Taste, UI/UX Pro Max, & Impeccable Critic Board: Audits design AST across 8 specialist critic personas', () => {
  const dnaEngine = new BrandDNAEngine();
  const tokens = dnaEngine.synthesize('Linear Dark');

  const root = new DesignASTNode('root', 'Root Screen', {
    componentType: 'Hero',
    variant: 'ProMax',
    layout: { display: 'flex', containerWidth: 'max-w-7xl', paddingY: 'py-12', gap: 'gap-8' },
    motion: { type: 'stagger-fade-up', delayMs: 0, durationMs: 200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    typography: { headingScale: 'text-6xl', bodyScale: 'text-lg' },
    accessibility: { role: 'main', keyboardFocusable: true },
    performance: { gpuBudgetMs: 1.2, lazyLoad: true },
    library: { primary: 'shadcn/ui', priorityScore: 99 },
  });
  const ast = new DesignAST(root);

  const proMaxEngine = new UIUXProMaxEngine();
  const enhancedTokens = proMaxEngine.applyProMaxRules(tokens);
  assert.strictEqual(enhancedTokens.colors.ring, enhancedTokens.colors.primary);

  const criticBoard = new ImpeccableCriticBoard();
  criticBoard.autoFix(ast);
  const audit = criticBoard.evaluate(enhancedTokens, ast);

  assert.ok(audit.score >= 90);
  assert.strictEqual(audit.antiSlopPassed, true);
  assert.strictEqual(audit.criticEvaluations.length, 8);
  assert.strictEqual(audit.criticEvaluations[0].persona, 'Visual Design Critic');
});

test('Taste Intelligence Engine (TIE): Versioned Taste, Component Genome, & Trend Evolution Pipeline', () => {
  const tie = new TasteIntelligenceEngine();
  const tasteVersion = tie.getTasteVersion();

  assert.strictEqual(tasteVersion.version, 'v1.2.0');
  assert.strictEqual(tasteVersion.primitives.layout.sectionSpacingPx, 144);
  assert.strictEqual(tasteVersion.primitives.typography.tracking, '-0.045em');

  const genome = tie.extractGenome('Hero Header', 'hero');
  assert.strictEqual(genome.category, 'hero');
  assert.strictEqual(genome.accessibilityScore, 98);

  const trends = tie.analyzeTrends([
    { source: 'Awwwards', primitives: { layout: { sectionSpacingPx: 144, maxWidthPx: 1280, visualRhythm: 'editorial' } } },
  ]);
  assert.strictEqual(trends.length, 3);
  assert.strictEqual(trends[0].confidence, 0.94);

  const updatedVersion = tie.runEvolutionPipeline(trends);
  assert.strictEqual(updatedVersion.version, 'v1.3.0');
  assert.ok(updatedVersion.genomeCount > tasteVersion.genomeCount);
});








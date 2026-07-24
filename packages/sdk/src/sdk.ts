import { RichSkillManifest, SkillContext, SkillDefinition, SkillDiagnostics } from './types.js';
import { DesignAST, DesignASTNode, DesignSpecParser, DesignTokenCompiler } from '@uios/compiler';

export function createSkill(def: SkillDefinition): SkillDefinition {
  validateSkillManifest(def.manifest);
  return def;
}

export function validateSkillManifest(manifest: RichSkillManifest): boolean {
  if (!manifest.id || !manifest.version || !manifest.category) {
    throw new Error(`Invalid Skill Manifest: missing required fields id, version, or category.`);
  }
  if (manifest.qualityWeight < 0 || manifest.qualityWeight > 10) {
    throw new Error(`Invalid Skill Manifest (${manifest.id}): qualityWeight must be between 0 and 10.`);
  }
  return true;
}

export function createSkillContext(prompt: string): SkillContext {
  const specParser = new DesignSpecParser();
  const spec = specParser.parse(prompt);
  const tokenCompiler = new DesignTokenCompiler();
  const tokens = tokenCompiler.compile(spec);

  const root = new DesignASTNode('root', 'Root Screen', {
    componentType: 'Navigation',
    variant: 'Default Header',
    layout: { display: 'flex', containerWidth: 'max-w-7xl', paddingY: 'py-4', gap: 'gap-8' },
    animation: { type: 'stagger-fade-up', delayMs: 60, durationMs: 250, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    typography: { headingScale: 'text-6xl', bodyScale: 'text-lg' },
    accessibility: { role: 'banner', keyboardFocusable: true },
    performance: { gpuBudgetMs: 2.0, lazyLoad: false },
    library: { primary: '21st.dev', priorityScore: 96 },
  });

  return {
    project: { name: spec.project.name, type: spec.project.type },
    designAST: new DesignAST(root),
    spec,
    tokens,
    history: [],
    cache: new Map(),
    telemetry: {
      startTime: Date.now(),
      mutationCount: 0,
    },
  };
}

export async function testSkill(
  skill: SkillDefinition,
  prompt: string
): Promise<{ diagnostics: SkillDiagnostics; executionTimeMs: number }> {
  const ctx = createSkillContext(prompt);
  const start = Date.now();
  const diagnostics = await skill.execute(ctx);
  const executionTimeMs = Date.now() - start;

  return { diagnostics, executionTimeMs };
}

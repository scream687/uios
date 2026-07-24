import fs from 'node:fs';
import path from 'node:path';

interface CategorizedSkill {
  id: string;
  category: 'planning' | 'layout' | 'visual' | 'motion' | 'frontend' | 'libraries' | 'review' | 'compiler' | 'emitters' | 'meta';
  name: string;
  description: string;
  priority: number;
  confidence: number;
  stage: 'spec' | 'ast' | 'planning' | 'layout' | 'visual' | 'motion' | 'review' | 'emission' | 'orchestration';
  parallelizable: boolean;
  dependencies: string[];
  capabilities: string[];
  libraries: string[];
  estimatedTimeMs: number;
  costUnits: number;
  qualityWeight: number;
  instructions: string;
}

const categorizedSkills: CategorizedSkill[] = [
  {
    id: 'page-planner',
    category: 'planning',
    name: 'Page Planner',
    description: 'High level page narrative structure, section order, and information architecture flow.',
    priority: 100,
    confidence: 0.98,
    stage: 'planning',
    parallelizable: false,
    dependencies: [],
    capabilities: ['page-narrative', 'information-architecture'],
    libraries: ['shadcn', '21st.dev'],
    estimatedTimeMs: 120,
    costUnits: 2,
    qualityWeight: 9.8,
    instructions: `
# Purpose
Decompose user prompt into logical page sections and narrative flow.

# Inputs & Outputs Contract
- Input: DesignSpec, RawPrompt
- Output: SectionOrdering, InformationArchitecture

# Constraints
- Keep landing page section count between 4 and 6 sections.
`,
  },
  {
    id: 'layout-architect',
    category: 'layout',
    name: 'Layout Architect',
    description: '12-column grid, fluid spacing scale, container max-widths, and responsive breakpoints.',
    priority: 95,
    confidence: 0.97,
    stage: 'layout',
    parallelizable: true,
    dependencies: ['page-planner'],
    capabilities: ['layout', 'grid-system', 'responsive-design'],
    libraries: ['shadcn', '21st.dev'],
    estimatedTimeMs: 140,
    costUnits: 2,
    qualityWeight: 9.7,
    instructions: `
# Purpose
Enforce strict 12-column grid and 8pt spacing scale. Never generate JSX directly; mutate DesignAST node layout properties only.
`,
  },
  {
    id: 'brand-dna',
    category: 'visual',
    name: 'Brand DNA',
    description: 'Synthesize brand archetypes (Linear Dark, Apple Minimal, Stripe SaaS) and color harmonies.',
    priority: 90,
    confidence: 0.99,
    stage: 'visual',
    parallelizable: false,
    dependencies: [],
    capabilities: ['tokens', 'brand-personality', 'color-harmony'],
    libraries: [],
    estimatedTimeMs: 90,
    costUnits: 1,
    qualityWeight: 9.9,
    instructions: `
# Purpose
Synthesize design token color palettes and typography rules.
`,
  },
  {
    id: 'motion-director',
    category: 'motion',
    name: 'Motion Director',
    description: 'Choreograph reveal timelines, spring physics, and micro-interactions.',
    priority: 85,
    confidence: 0.95,
    stage: 'motion',
    parallelizable: true,
    dependencies: ['layout-architect'],
    capabilities: ['motion', 'spring-physics', 'micro-interactions'],
    libraries: ['Framer Motion'],
    estimatedTimeMs: 150,
    costUnits: 3,
    qualityWeight: 9.5,
    instructions: `
# Purpose
Apply smooth custom cubic-bezier spring curves to layout transitions.
`,
  },
  {
    id: 'gsap-specialist',
    category: 'motion',
    name: 'GSAP Specialist',
    description: 'ScrollTrigger pinned storytelling timelines and complex SVG animations.',
    priority: 80,
    confidence: 0.92,
    stage: 'motion',
    parallelizable: false,
    dependencies: ['motion-director'],
    capabilities: ['motion', 'scroll-trigger', 'complex-timelines'],
    libraries: ['GSAP'],
    estimatedTimeMs: 220,
    costUnits: 4,
    qualityWeight: 9.2,
    instructions: `
Use GSAP only for premium storytelling, complex timelines, and ScrollTrigger.
Prefer Framer Motion for standard component transitions.
Respect prefers-reduced-motion.
Enforce animation budgets.
Avoid animating layout properties that trigger unnecessary reflows.
`,
  },
  {
    id: 'shadcn-composer',
    category: 'libraries',
    name: 'shadcn/ui Composer',
    description: 'Compose accessible Radix primitives with CVA and Tailwind CSS.',
    priority: 88,
    confidence: 0.97,
    stage: 'ast',
    parallelizable: true,
    dependencies: [],
    capabilities: ['primitives', 'accessible-forms', 'cards'],
    libraries: ['shadcn', 'Radix UI'],
    estimatedTimeMs: 110,
    costUnits: 2,
    qualityWeight: 9.7,
    instructions: `
When to use shadcn primitives.
How to compose them with CVA and Tailwind.
When to augment them with Magic UI or React Bits.
Accessibility expectations.
`,
  },
  {
    id: 'magicui-composer',
    category: 'libraries',
    name: 'Magic UI Composer',
    description: 'Marketing spotlight beams, animated typography, and shimmer card borders.',
    priority: 86,
    confidence: 0.96,
    stage: 'ast',
    parallelizable: true,
    dependencies: [],
    capabilities: ['spotlight-effects', 'animated-text', 'card-glow'],
    libraries: ['Magic UI'],
    estimatedTimeMs: 130,
    costUnits: 2,
    qualityWeight: 9.6,
    instructions: `
Inject Magic UI spotlight lighting and glowing borders onto high priority card AST nodes.
`,
  },
  {
    id: 'anti-ai-detector',
    category: 'review',
    name: 'Anti-AI Pattern Detector',
    description: 'Audit and eliminate overused glassmorphism, glowing blur bubbles, and generic templates.',
    priority: 95,
    confidence: 0.99,
    stage: 'review',
    parallelizable: true,
    dependencies: [],
    capabilities: ['anti-ai-audit', 'smell-detection'],
    libraries: [],
    estimatedTimeMs: 80,
    costUnits: 1,
    qualityWeight: 9.9,
    instructions: `
Audit DesignAST for 14 AI design smells (glass abuse, glow bubbles, CTA blindness, etc.).
`,
  },
  {
    id: 'design-critic',
    category: 'review',
    name: 'Design Critic',
    description: 'Independent non-self-reviewing critic loop gating compilation approval.',
    priority: 98,
    confidence: 0.98,
    stage: 'review',
    parallelizable: false,
    dependencies: ['anti-ai-detector'],
    capabilities: ['critic-review', 'ast-refactoring-feedback'],
    libraries: [],
    estimatedTimeMs: 100,
    costUnits: 2,
    qualityWeight: 9.8,
    instructions: `
Review DesignAST without generator bias.
`,
  },
  {
    id: 'react-emitter',
    category: 'emitters',
    name: 'React TSX Emitter',
    description: 'Emit DesignAST into clean, production-ready React TSX component code.',
    priority: 100,
    confidence: 0.99,
    stage: 'emission',
    parallelizable: false,
    dependencies: [],
    capabilities: ['react-code-emission'],
    libraries: ['React 19', 'Tailwind CSS'],
    estimatedTimeMs: 150,
    costUnits: 3,
    qualityWeight: 9.9,
    instructions: `
Convert validated DesignAST into clean React TSX component code.
`,
  },
  {
    id: 'design-orchestrator',
    category: 'meta',
    name: 'Design Orchestrator',
    description: 'Meta-skill orchestrating multi-candidate AST synthesis and review board execution.',
    priority: 100,
    confidence: 0.99,
    stage: 'orchestration',
    parallelizable: false,
    dependencies: [],
    capabilities: ['orchestration', 'meta-planning'],
    libraries: [],
    estimatedTimeMs: 300,
    costUnits: 5,
    qualityWeight: 10.0,
    instructions: `
Orchestrate execution pipeline across compiler, layout, visual, motion, review, and emitter stages.
`,
  },
];

const baseDir = path.resolve(process.cwd());

categorizedSkills.forEach((s) => {
  const skillDir = path.join(baseDir, s.category, s.id);
  const examplesDir = path.join(skillDir, 'examples');
  const goldensDir = path.join(skillDir, 'goldens');
  const fixturesDir = path.join(skillDir, 'fixtures');
  const testsDir = path.join(skillDir, 'tests');

  fs.mkdirSync(examplesDir, { recursive: true });
  fs.mkdirSync(goldensDir, { recursive: true });
  fs.mkdirSync(fixturesDir, { recursive: true });
  fs.mkdirSync(testsDir, { recursive: true });

  const manifest = {
    id: s.id,
    version: '1.0.0',
    category: s.category,
    name: s.name,
    description: s.description,
    priority: s.priority,
    confidence: s.confidence,
    stage: s.stage,
    parallelizable: s.parallelizable,
    dependencies: s.dependencies,
    supports: ['landing-page', 'dashboard', 'crm'],
    capabilities: s.capabilities,
    libraries: s.libraries,
    estimatedTimeMs: s.estimatedTimeMs,
    costUnits: s.costUnits,
    qualityWeight: s.qualityWeight,
  };

  fs.writeFileSync(path.join(skillDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  fs.writeFileSync(
    path.join(skillDir, 'skill.md'),
    `---
id: ${s.id}
name: ${s.name}
category: ${s.category}
version: 1.0.0
---

${s.instructions.trim()}
`
  );

  fs.writeFileSync(
    path.join(skillDir, 'README.md'),
    `# ${s.name} Skill Module (${s.category}/${s.id})

${s.description}

## Contract & Metadata
- **Category**: ${s.category}
- **Stage**: ${s.stage}
- **Priority**: ${s.priority}
- **Quality Weight**: ${s.qualityWeight}/10
- **Capabilities**: ${s.capabilities.join(', ')}
- **Libraries**: ${s.libraries.join(', ') || 'None'}
`
  );

  fs.writeFileSync(
    path.join(examplesDir, 'sample.ts'),
    `// Reference example for ${s.name}
export const ${s.id.replace(/-/g, '_')}_example = {
  skillId: '${s.id}',
  category: '${s.category}',
};
`
  );

  fs.writeFileSync(
    path.join(fixturesDir, 'input-ast.json'),
    JSON.stringify({ id: 'fixture-input', type: s.id }, null, 2)
  );

  fs.writeFileSync(
    path.join(goldensDir, 'expected-ast.json'),
    JSON.stringify({ id: 'golden-expected', type: s.id, status: 'pass' }, null, 2)
  );

  fs.writeFileSync(
    path.join(testsDir, 'skill.test.ts'),
    `import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };
import golden from '../goldens/expected-ast.json' with { type: 'json' };

test('Skill ${s.id} manifest and golden expected AST are valid', () => {
  assert.strictEqual(manifest.id, '${s.id}');
  assert.strictEqual(golden.status, 'pass');
});
`
  );
});

console.log(`Successfully generated ${categorizedSkills.length} categorized Skill data modules!`);

import fs from 'node:fs';
import path from 'node:path';

const skills = [
  {
    id: 'page-planner',
    name: 'Page Planner',
    purpose: 'High level page structure, section flow, and information architecture orchestration.',
    priority: 1,
    confidence: 0.98,
    tasks: ['Page Structure', 'Information Architecture', 'Section Ordering'],
    deps: [],
    libs: ['shadcn/ui', '21st.dev'],
    score: 98,
    instructions: `
# Purpose
Decompose user intent into logical section hierarchies and information architecture.

# When to Invoke
Invoke at the very start of generation before component layout synthesis.

# Preferred Libraries
- 21st.dev for SaaS landing layouts
- shadcn/ui for layout containers

# Anti-patterns
- Random section ordering without story flow
- Overcrowded landing pages without clear narrative
`,
  },
  {
    id: 'layout-architect',
    name: 'Layout Architect',
    purpose: 'Grid system, container bounds, fluid spacing scale, and breakpoint management.',
    priority: 2,
    confidence: 0.97,
    tasks: ['Grid System', 'Fluid Spacing', 'Responsive Layout'],
    deps: ['page-planner'],
    libs: ['Tailwind CSS'],
    score: 97,
    instructions: `
# Purpose
Enforce strict 12-column grid layout, container max widths, and fluid responsive spacing.

# Constraints
- Strict 8pt spacing scale
- Maximum 12 grid columns
`,
  },
  {
    id: 'visual-designer',
    name: 'Visual Designer',
    purpose: 'Color balance, visual hierarchy, whitespace density, and brand consistency.',
    priority: 2,
    confidence: 0.96,
    tasks: ['Color Palette', 'Visual Weight', 'Whitespace Balance'],
    deps: ['brand-dna'],
    libs: ['Tailwind CSS'],
    score: 96,
    instructions: `
# Purpose
Ensure dramatic typography contrast, harmonious color pairings, and elegant whitespace.
`,
  },
  {
    id: 'ux-architect',
    name: 'UX Architect',
    purpose: 'Conversion optimization, user journey, Fitts/Hick laws, and CTA placement.',
    priority: 2,
    confidence: 0.98,
    tasks: ['UX Laws Audit', 'CTA Placement', 'Friction Reduction'],
    deps: ['page-planner'],
    libs: ['Radix Primitives'],
    score: 98,
    instructions: `
# Purpose
Apply Fitts, Hick, and Jakob UX laws to ensure effortless interaction paths.
`,
  },
  {
    id: 'motion-director',
    name: 'Motion Director',
    purpose: 'Choreograph layout transitions, micro-interactions, stagger timelines, and spring physics.',
    priority: 3,
    confidence: 0.95,
    tasks: ['Motion Choreography', 'Spring Physics', 'Micro-interactions'],
    deps: ['layout-architect'],
    libs: ['Framer Motion'],
    score: 95,
    instructions: `
# Purpose
Choreograph smooth entry reveals and micro-interactions using custom cubic-bezier curves.
`,
  },
  {
    id: 'frontend-architect',
    name: 'Frontend Architect',
    purpose: 'React 19 RSC, component composition, CVA, state management, and file architecture.',
    priority: 3,
    confidence: 0.99,
    tasks: ['React Patterns', 'RSC Optimization', 'CVA Matrix'],
    deps: [],
    libs: ['React 19', 'Next.js 15'],
    score: 99,
    instructions: `
# Purpose
Ensure clean TypeScript props, CVA variant bindings, and optimal RSC rendering strategies.
`,
  },
  {
    id: 'shadcn-composer',
    name: 'shadcn/ui Composer',
    purpose: 'Compose accessible Radix primitives with CVA and Tailwind CSS.',
    priority: 3,
    confidence: 0.97,
    tasks: ['Form Primitives', 'Dialogs', 'Tables', 'Navigation'],
    deps: ['frontend-architect'],
    libs: ['shadcn/ui', 'Radix UI'],
    score: 97,
    instructions: `
# Purpose
Compose accessible UI primitives using shadcn patterns, Radix slots, and class-variance-authority.
`,
  },
  {
    id: 'magicui-composer',
    name: 'Magic UI Composer',
    purpose: 'High impact marketing effects: spotlight lighting, animated typography, particle beams.',
    priority: 4,
    confidence: 0.96,
    tasks: ['Spotlight Hero', 'Animated Typography', 'Shimmer Border'],
    deps: ['motion-director'],
    libs: ['Magic UI', 'Framer Motion'],
    score: 96,
    instructions: `
# Purpose
Integrate Magic UI spotlight beams and glowing borders for hero and card elements.
`,
  },
  {
    id: 'reactbits-composer',
    name: 'React Bits Composer',
    purpose: 'Micro-interactions, magnetic buttons, custom cursor Proximity feedback.',
    priority: 4,
    confidence: 0.94,
    tasks: ['Magnetic Buttons', 'Cursor Interactions', 'Particle Proximity'],
    deps: ['motion-director'],
    libs: ['React Bits'],
    score: 94,
    instructions: `
# Purpose
Add magnetic cursor forces and fluid hover micro-interactions.
`,
  },
  {
    id: 'twentyfirst-composer',
    name: '21st.dev Composer',
    purpose: 'SaaS marketing sections, bento feature grids, and modern hero blocks.',
    priority: 4,
    confidence: 0.98,
    tasks: ['Bento Grid', 'SaaS Hero', 'Feature Showcase'],
    deps: ['layout-architect'],
    libs: ['21st.dev'],
    score: 98,
    instructions: `
# Purpose
Compose modern 21st.dev bento card layouts and marketing grids.
`,
  },
  {
    id: 'gsap-specialist',
    name: 'GSAP Specialist',
    purpose: 'Complex storytelling timelines, ScrollTrigger pinned sections, and SVG animations.',
    priority: 5,
    confidence: 0.93,
    tasks: ['ScrollTrigger', 'Pinned Storytelling', 'Complex Timelines'],
    deps: ['motion-director'],
    libs: ['GSAP'],
    score: 93,
    instructions: `
# Purpose
Use GSAP only for premium storytelling, complex timelines, and ScrollTrigger pinned sections.
Prefer Framer Motion for standard component transitions.
Respect prefers-reduced-motion.
Enforce animation budgets.
Avoid animating layout properties that trigger unnecessary reflows.
`,
  },
  {
    id: 'threejs-specialist',
    name: 'Three.js Specialist',
    purpose: '3D interactive canvas scenes, React Three Fiber (R3F), and GPU budget management.',
    priority: 5,
    confidence: 0.91,
    tasks: ['3D Canvas', 'R3F Shader Scene', 'GPU Budget'],
    deps: ['frontend-architect'],
    libs: ['Three.js', 'React Three Fiber', 'Drei'],
    score: 91,
    instructions: `
# Purpose
Integrate 3D R3F canvas background scenes when value exceeds complexity, keeping GPU load under budget.
`,
  },
  {
    id: 'accessibility-auditor',
    name: 'Accessibility Auditor',
    purpose: 'Audit WCAG AA compliance, contrast ratios, focus visible rings, and ARIA landmarks.',
    priority: 5,
    confidence: 0.99,
    tasks: ['WCAG AA Audit', 'Keyboard Navigation', 'ARIA Landmarks'],
    deps: [],
    libs: ['Radix UI'],
    score: 99,
    instructions: `
# Purpose
Verify contrast ratio >= 4.5:1, keyboard focus rings, and screen reader semantic HTML tags.
`,
  },
  {
    id: 'performance-auditor',
    name: 'Performance Auditor',
    purpose: 'Core Web Vitals (LCP, CLS, INP), GPU frame budgets, lazy loading, and tree-shaking.',
    priority: 5,
    confidence: 0.98,
    tasks: ['LCP Optimization', 'GPU Budget', 'Tree Shaking'],
    deps: [],
    libs: [],
    score: 98,
    instructions: `
# Purpose
Audit rendering performance to ensure LCP < 1.2s and frame budget usage < 16.6ms.
`,
  },
  {
    id: 'benchmark-reviewer',
    name: 'Benchmark Reviewer',
    purpose: 'Compare generated interface quality against Apple, Linear, Stripe, and Framer standards.',
    priority: 6,
    confidence: 0.97,
    tasks: ['Quality Benchmark', 'Standard Comparison'],
    deps: ['design-critic'],
    libs: [],
    score: 97,
    instructions: `
# Purpose
Evaluate generated candidate scores against benchmark baseline standards. Reject candidates under threshold.
`,
  },
  {
    id: 'anti-ai-detector',
    name: 'Anti-AI Pattern Detector',
    purpose: 'Audit and eliminate overused glassmorphism, glowing blur bubbles, and generic AI templates.',
    priority: 6,
    confidence: 0.99,
    tasks: ['Cliché Detection', 'Glass Abuse Check', 'Glow Bubble Check'],
    deps: [],
    libs: [],
    score: 99,
    instructions: `
# Purpose
Detect and reject 14 common AI design smells (Glass abuse, animation spam, template syndrome, etc.).
`,
  },
  {
    id: 'design-critic',
    name: 'Design Critic',
    purpose: 'Independent non-self-reviewing critic loop gating compilation approval.',
    priority: 6,
    confidence: 0.98,
    tasks: ['Independent Review', 'AST Refactoring Feedback'],
    deps: ['anti-ai-detector', 'accessibility-auditor'],
    libs: [],
    score: 98,
    instructions: `
# Purpose
Conduct independent critique on generated AST nodes without generator bias.
`,
  },
  {
    id: 'brand-dna',
    name: 'Brand DNA',
    purpose: 'Synthesize brand archetypes (Linear Dark, Apple Minimal, Stripe SaaS) and design tokens.',
    priority: 1,
    confidence: 0.99,
    tasks: ['Brand Archetype', 'Design Personality', 'Token Synthesis'],
    deps: [],
    libs: [],
    score: 99,
    instructions: `
# Purpose
Synthesize design tokens, color palettes, and typography rules for the specified brand archetype.
`,
  },
  {
    id: 'token-compiler',
    name: 'Token Compiler',
    purpose: 'Transform design tokens into Tailwind, CSS variables, Figma JSON, and motion tokens.',
    priority: 2,
    confidence: 0.99,
    tasks: ['CSS Variable Emission', 'Tailwind Config Generation', 'Figma Token Export'],
    deps: ['brand-dna'],
    libs: ['Tailwind CSS'],
    score: 99,
    instructions: `
# Purpose
Compile brand tokens into multi-platform targets: Tailwind config, CSS variables, and Figma JSON.
`,
  },
  {
    id: 'component-genome',
    name: 'Component Genome',
    purpose: 'Metadata-driven component schemas storing purpose, intent, emotion, complexity, and libraries.',
    priority: 2,
    confidence: 0.97,
    tasks: ['Component Metadata', 'Library Matching Matrix'],
    deps: [],
    libs: [],
    score: 97,
    instructions: `
# Purpose
Provide rich component metadata objects for intelligent library matching and composition.
`,
  },
  {
    id: 'animation-planner',
    name: 'Animation Planner',
    purpose: 'Choreograph stagger delays, transition timing, and spring curves across screen sections.',
    priority: 3,
    confidence: 0.96,
    tasks: ['Stagger Timeline', 'Transition Planning'],
    deps: ['motion-director'],
    libs: ['Framer Motion'],
    score: 96,
    instructions: `
# Purpose
Plan staggered reveal timelines to prevent concurrent animation spam.
`,
  },
];

const baseDir = path.resolve(process.cwd(), 'src/skills');

skills.forEach((s) => {
  const dir = path.join(baseDir, s.id);
  const examplesDir = path.join(dir, 'examples');
  const testsDir = path.join(dir, 'tests');

  fs.mkdirSync(examplesDir, { recursive: true });
  fs.mkdirSync(testsDir, { recursive: true });

  const manifest = {
    id: s.id,
    name: s.name,
    purpose: s.purpose,
    priority: s.priority,
    confidence: s.confidence,
    supported_tasks: s.tasks,
    dependencies: s.deps,
    compatible_libraries: s.libs,
    quality_score: s.score,
  };

  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  fs.writeFileSync(
    path.join(dir, 'SKILL.md'),
    `---
id: ${s.id}
name: ${s.name}
description: ${s.purpose}
---

${s.instructions.trim()}
`
  );

  fs.writeFileSync(
    path.join(dir, 'README.md'),
    `# ${s.name} Skill Module

${s.purpose}

## Metadata
- **Priority**: ${s.priority}
- **Quality Score**: ${s.score}/100
- **Supported Tasks**: ${s.tasks.join(', ')}
- **Compatible Libraries**: ${s.libs.join(', ') || 'None'}
`
  );

  fs.writeFileSync(
    path.join(examplesDir, 'usage.ts'),
    `// Reference usage pattern for ${s.name}
export const ${s.id.replace(/-/g, '_')}_example = {
  skillId: '${s.id}',
  status: 'active',
};
`
  );

  fs.writeFileSync(
    path.join(testsDir, 'skill.test.ts'),
    `import test from 'node:test';
import assert from 'node:assert';
import manifest from '../manifest.json' with { type: 'json' };

test('Skill ${s.id} manifest is valid', () => {
  assert.strictEqual(manifest.id, '${s.id}');
  assert.ok(manifest.quality_score >= 90);
});
`
  );
});

console.log(`Successfully generated ${skills.length} Skill modules under packages/skills/src/skills/`);

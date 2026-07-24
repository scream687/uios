import { SkillManifest, SkillModule } from './types.js';

// Import all 21 skill manifests directly for ESM bundler compatibility
import pagePlannerManifest from './skills/page-planner/manifest.json' with { type: 'json' };
import layoutArchitectManifest from './skills/layout-architect/manifest.json' with { type: 'json' };
import visualDesignerManifest from './skills/visual-designer/manifest.json' with { type: 'json' };
import uxArchitectManifest from './skills/ux-architect/manifest.json' with { type: 'json' };
import motionDirectorManifest from './skills/motion-director/manifest.json' with { type: 'json' };
import frontendArchitectManifest from './skills/frontend-architect/manifest.json' with { type: 'json' };
import shadcnComposerManifest from './skills/shadcn-composer/manifest.json' with { type: 'json' };
import magicuiComposerManifest from './skills/magicui-composer/manifest.json' with { type: 'json' };
import reactbitsComposerManifest from './skills/reactbits-composer/manifest.json' with { type: 'json' };
import twentyfirstComposerManifest from './skills/twentyfirst-composer/manifest.json' with { type: 'json' };
import gsapSpecialistManifest from './skills/gsap-specialist/manifest.json' with { type: 'json' };
import threejsSpecialistManifest from './skills/threejs-specialist/manifest.json' with { type: 'json' };
import accessibilityAuditorManifest from './skills/accessibility-auditor/manifest.json' with { type: 'json' };
import performanceAuditorManifest from './skills/performance-auditor/manifest.json' with { type: 'json' };
import benchmarkReviewerManifest from './skills/benchmark-reviewer/manifest.json' with { type: 'json' };
import antiAiDetectorManifest from './skills/anti-ai-detector/manifest.json' with { type: 'json' };
import designCriticManifest from './skills/design-critic/manifest.json' with { type: 'json' };
import brandDnaManifest from './skills/brand-dna/manifest.json' with { type: 'json' };
import tokenCompilerManifest from './skills/token-compiler/manifest.json' with { type: 'json' };
import componentGenomeManifest from './skills/component-genome/manifest.json' with { type: 'json' };
import animationPlannerManifest from './skills/animation-planner/manifest.json' with { type: 'json' };

export class SkillRegistry {
  private manifests: Map<string, SkillManifest> = new Map();

  constructor() {
    this.indexManifests();
  }

  private indexManifests() {
    const list: SkillManifest[] = [
      pagePlannerManifest as SkillManifest,
      layoutArchitectManifest as SkillManifest,
      visualDesignerManifest as SkillManifest,
      uxArchitectManifest as SkillManifest,
      motionDirectorManifest as SkillManifest,
      frontendArchitectManifest as SkillManifest,
      shadcnComposerManifest as SkillManifest,
      magicuiComposerManifest as SkillManifest,
      reactbitsComposerManifest as SkillManifest,
      twentyfirstComposerManifest as SkillManifest,
      gsapSpecialistManifest as SkillManifest,
      threejsSpecialistManifest as SkillManifest,
      accessibilityAuditorManifest as SkillManifest,
      performanceAuditorManifest as SkillManifest,
      benchmarkReviewerManifest as SkillManifest,
      antiAiDetectorManifest as SkillManifest,
      designCriticManifest as SkillManifest,
      brandDnaManifest as SkillManifest,
      tokenCompilerManifest as SkillManifest,
      componentGenomeManifest as SkillManifest,
      animationPlannerManifest as SkillManifest,
    ];

    list.forEach((m) => this.manifests.set(m.id, m));
  }

  public getSkill(id: string): SkillManifest | undefined {
    return this.manifests.get(id);
  }

  public listAll(): SkillManifest[] {
    return Array.from(this.manifests.values());
  }

  public resolvePipelineForTask(taskType: 'Marketing' | 'Dashboard' | 'CRM'): SkillManifest[] {
    const pipelineIds =
      taskType === 'Marketing'
        ? [
            'page-planner',
            'brand-dna',
            'layout-architect',
            'twentyfirst-composer',
            'magicui-composer',
            'gsap-specialist',
            'anti-ai-detector',
            'design-critic',
            'benchmark-reviewer',
          ]
        : [
            'page-planner',
            'layout-architect',
            'shadcn-composer',
            'accessibility-auditor',
            'performance-auditor',
            'design-critic',
          ];

    return pipelineIds
      .map((id) => this.manifests.get(id))
      .filter((m): m is SkillManifest => m !== undefined);
  }
}

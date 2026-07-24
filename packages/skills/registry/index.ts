import { RichSkillManifest } from '@uios/sdk';

import pagePlannerManifest from '../planning/page-planner/manifest.json' with { type: 'json' };
import layoutArchitectManifest from '../layout/layout-architect/manifest.json' with { type: 'json' };
import brandDnaManifest from '../visual/brand-dna/manifest.json' with { type: 'json' };
import awesomicStyleManifest from '../visual/awesomic-style/manifest.json' with { type: 'json' };
import dalaStyleManifest from '../visual/dala-style/manifest.json' with { type: 'json' };
import calderaStyleManifest from '../visual/caldera-style/manifest.json' with { type: 'json' };
import jetonStyleManifest from '../visual/jeton-style/manifest.json' with { type: 'json' };
import appleStyleManifest from '../visual/apple-style/manifest.json' with { type: 'json' };
import motionDirectorManifest from '../motion/motion-director/manifest.json' with { type: 'json' };
import gsapSpecialistManifest from '../motion/gsap-specialist/manifest.json' with { type: 'json' };
import shadcnComposerManifest from '../libraries/shadcn-composer/manifest.json' with { type: 'json' };
import magicuiComposerManifest from '../libraries/magicui-composer/manifest.json' with { type: 'json' };
import antiAiDetectorManifest from '../review/anti-ai-detector/manifest.json' with { type: 'json' };
import designCriticManifest from '../review/design-critic/manifest.json' with { type: 'json' };
import reactEmitterManifest from '../emitters/react-emitter/manifest.json' with { type: 'json' };
import designOrchestratorManifest from '../meta/design-orchestrator/manifest.json' with { type: 'json' };
import projectDesignInitializerManifest from '../meta/project-design-initializer/manifest.json' with { type: 'json' };

export class CategorizedSkillRegistry {
  private cache: Map<string, RichSkillManifest> = new Map();

  constructor() {
    this.primeCache();
  }

  private primeCache(): void {
    const list: RichSkillManifest[] = [
      projectDesignInitializerManifest as RichSkillManifest,
      designOrchestratorManifest as RichSkillManifest,
      pagePlannerManifest as RichSkillManifest,
      layoutArchitectManifest as RichSkillManifest,
      brandDnaManifest as RichSkillManifest,
      awesomicStyleManifest as RichSkillManifest,
      dalaStyleManifest as RichSkillManifest,
      calderaStyleManifest as RichSkillManifest,
      jetonStyleManifest as RichSkillManifest,
      appleStyleManifest as RichSkillManifest,
      motionDirectorManifest as RichSkillManifest,
      gsapSpecialistManifest as RichSkillManifest,
      shadcnComposerManifest as RichSkillManifest,
      magicuiComposerManifest as RichSkillManifest,
      antiAiDetectorManifest as RichSkillManifest,
      designCriticManifest as RichSkillManifest,
      reactEmitterManifest as RichSkillManifest,
    ];

    for (const manifest of list) {
      this.cache.set(manifest.id, manifest);
    }
  }

  public listAll(): RichSkillManifest[] {
    return Array.from(this.cache.values());
  }

  public getSkill(id: string): RichSkillManifest | undefined {
    return this.cache.get(id);
  }

  public calculateConfidence(skillId: string, has3D: boolean): number {
    const skill = this.getSkill(skillId);
    if (!skill) return 0;
    if (skillId === 'gsap-specialist' && has3D) {
      return 0.41;
    }
    return skill.confidence;
  }

  public resolveSkillGraph(projectType: string): RichSkillManifest[] {
    const pipeline: string[] = [
      'project-design-initializer',
      'design-orchestrator',
      'page-planner',
      'layout-architect',
      'brand-dna',
      'motion-director',
      'shadcn-composer',
      'anti-ai-detector',
      'design-critic',
      'react-emitter',
    ];

    return pipeline.map((id) => this.getSkill(id)).filter(Boolean) as RichSkillManifest[];
  }
}

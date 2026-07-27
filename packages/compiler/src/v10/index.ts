import fs from 'fs';
import path from 'path';

export interface DesignRead {
  pageKind: string;
  audience: string;
  vibe: string;
  designSystemFamily: string;
  oneLineRead: string;
}

export interface ThreeDialsConfig {
  designVariance: number; // 1 = Perfect Symmetry, 10 = Artsy Chaos
  motionIntensity: number; // 1 = Static, 10 = Cinematic / Physics
  visualDensity: number; // 1 = Art Gallery / Airy, 10 = Cockpit
}

export interface AntiDefaultAuditReport {
  passedAntiDefaultCheck: boolean;
  detectedDefaults: string[];
  remedies: string[];
}

export interface ExternalSkillRegistryStatus {
  tasteSkillMounted: boolean;
  impeccableSkillMounted: boolean;
  uiUxProMaxSkillMounted: boolean;
  totalExternalSkillsLoaded: number;
}

export class BriefInferenceEngine {
  public inferDesignRead(prompt: string): { designRead: DesignRead; dials: ThreeDialsConfig } {
    let pageKind = 'Landing Page';
    let audience = 'Design-Conscious Consumers';
    let vibe = 'Luxury Editorial';
    let designSystemFamily = 'Tailwind + Custom Typography';

    let variance = 8;
    let motion = 6;
    let density = 4;

    if (prompt.toLowerCase().includes('coffee') || prompt.toLowerCase().includes('volcanic')) {
      pageKind = 'Specialty Coffee Monolith';
      audience = 'Artisanal Coffee Connoisseurs';
      vibe = 'Volcanic Dark & High-Contrast Editorial';
      designSystemFamily = 'Custom Monolith System';
      variance = 8;
      motion = 7;
      density = 3;
    } else if (prompt.toLowerCase().includes('saas') || prompt.toLowerCase().includes('dev')) {
      pageKind = 'B2B Technical SaaS';
      audience = 'Engineers & Procurement';
      vibe = 'Linear-style Minimalist Tech';
      designSystemFamily = 'shadcn/ui + Geist + Restrained Motion';
      variance = 6;
      motion = 4;
      density = 4;
    }

    const oneLineRead = `Reading this as: ${pageKind} for ${audience}, with a ${vibe} language, leaning toward ${designSystemFamily}.`;

    return {
      designRead: {
        pageKind,
        audience,
        vibe,
        designSystemFamily,
        oneLineRead,
      },
      dials: {
        designVariance: variance,
        motionIntensity: motion,
        visualDensity: density,
      },
    };
  }
}

export class AntiDefaultDisciplineEngine {
  public auditForAIDefaults(ast: Record<string, any>): AntiDefaultAuditReport {
    const detectedDefaults: string[] = [];
    const remedies: string[] = [];

    // Check for AI-purple gradient default
    if (ast.gradient?.includes('purple') || ast.gradient?.includes('indigo')) {
      detectedDefaults.push('AI-Purple Gradient Default Detected');
      remedies.push('Replace generic purple gradient with HSL volcanic obsidian (#0A0A0B) or vermilion (#FF4500)');
    }

    // Check for 3 equal cards grid tell
    if (ast.cardGridCount === 3 && ast.uniformSectionDensity) {
      detectedDefaults.push('Three Equal Feature Cards Grid Tell Detected');
      remedies.push('Break 3-card symmetry into 1 large hero monolith card + 2 asymmetrical detail tiles');
    }

    // Check for generic Inter + Slate-900 combination
    if (ast.font === 'Inter' && ast.backgroundColor === '#0f172a') {
      detectedDefaults.push('Inter + Slate-900 LLM Default Pair Detected');
      remedies.push('Upgrade display headline font to Playfair Display serif or Bodoni with -0.03em tracking');
    }

    return {
      passedAntiDefaultCheck: detectedDefaults.length === 0,
      detectedDefaults,
      remedies,
    };
  }
}

export class ExternalSkillKnowledgeHydrator {
  public mountExternalSkillRepositories(): ExternalSkillRegistryStatus {
    let tasteSkillMounted = false;
    let impeccableSkillMounted = false;
    let uiUxProMaxSkillMounted = false;

    try {
      const tastePath = path.resolve(process.cwd(), '../../packages/knowledge/external/taste-skill/skills/taste-skill/SKILL.md');
      tasteSkillMounted = fs.existsSync(tastePath);
    } catch (e) {
      tasteSkillMounted = false;
    }

    try {
      // Probe the file actually consumed at runtime (the slop-detection engine),
      // not an arbitrary README sentinel — so "mounted" reflects real usability.
      const impeccablePath = path.resolve(process.cwd(), '../../packages/knowledge/external/impeccable/cli/engine/engines/regex/detect-text.mjs');
      impeccableSkillMounted = fs.existsSync(impeccablePath);
    } catch (e) {
      impeccableSkillMounted = false;
    }

    try {
      // Probe the search script the UupmClient actually shells out to.
      const proMaxPath = path.resolve(process.cwd(), '../../packages/knowledge/external/ui-ux-pro-max-skill/cli/assets/scripts/search.py');
      uiUxProMaxSkillMounted = fs.existsSync(proMaxPath);
    } catch (e) {
      uiUxProMaxSkillMounted = false;
    }

    const count = (tasteSkillMounted ? 1 : 0) + (impeccableSkillMounted ? 1 : 0) + (uiUxProMaxSkillMounted ? 1 : 0);

    return {
      tasteSkillMounted,
      impeccableSkillMounted,
      uiUxProMaxSkillMounted,
      totalExternalSkillsLoaded: count,
    };
  }
}

export class UIOSv10ImpeccableTasteEngine {
  private inferenceEngine = new BriefInferenceEngine();
  private antiDefaultEngine = new AntiDefaultDisciplineEngine();
  private externalHydrator = new ExternalSkillKnowledgeHydrator();

  public executeV10ImpeccablePass(prompt: string, draftAST: Record<string, any>): {
    designRead: DesignRead;
    dials: ThreeDialsConfig;
    antiDefaultAudit: AntiDefaultAuditReport;
    externalSkillsStatus: ExternalSkillRegistryStatus;
    refinedAST: Record<string, any>;
  } {
    const { designRead, dials } = this.inferenceEngine.inferDesignRead(prompt);
    const antiDefaultAudit = this.antiDefaultEngine.auditForAIDefaults(draftAST);
    const externalSkillsStatus = this.externalHydrator.mountExternalSkillRepositories();

    // Refine AST according to Impeccable Taste Pro Max rules
    const refinedAST = {
      ...draftAST,
      designRead: designRead.oneLineRead,
      dials,
      headlineTracking: '-0.03em',
      sectionVariancePx: dials.designVariance * 60, // e.g. 480px section height variance
      heroOccupancyVh: 85,
      asymmetryRatio: 0.32,
    };

    return {
      designRead,
      dials,
      antiDefaultAudit,
      externalSkillsStatus,
      refinedAST,
    };
  }
}

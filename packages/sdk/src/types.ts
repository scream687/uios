import { DesignAST, DesignSpec, CompiledTokens } from '@uios/compiler';

export type SkillCategory =
  | 'planning'
  | 'layout'
  | 'visual'
  | 'motion'
  | 'frontend'
  | 'libraries'
  | 'review'
  | 'optimization'
  | 'compiler'
  | 'emitters'
  | 'meta';

export interface RichSkillManifest {
  id: string;
  version: string;
  category: SkillCategory;
  name: string;
  description: string;
  priority: number;
  confidence: number;
  stage: 'spec' | 'ast' | 'planning' | 'layout' | 'visual' | 'motion' | 'review' | 'emission' | 'orchestration';
  parallelizable: boolean;
  dependencies: string[];
  before?: string[];
  after?: string[];
  supports: string[];
  capabilities: string[];
  libraries: string[];
  estimatedTimeMs: number;
  costUnits: number;
  qualityWeight: number;
}

export interface SkillContext {
  project: {
    name: string;
    type: string;
  };
  designAST: DesignAST;
  spec: DesignSpec;
  tokens?: CompiledTokens;
  history: string[];
  cache: Map<string, unknown>;
  telemetry: {
    startTime: number;
    mutationCount: number;
  };
}

export interface SkillDiagnostics {
  success: boolean;
  updatedNodes: number;
  warnings: string[];
  metrics: Record<string, number>;
}

export interface SkillDefinition {
  manifest: RichSkillManifest;
  execute(ctx: SkillContext): Promise<SkillDiagnostics>;
}

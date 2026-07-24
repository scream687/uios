export interface SkillManifest {
  id: string;
  name: string;
  purpose: string;
  priority: number;
  confidence: number;
  supported_tasks: string[];
  dependencies: string[];
  compatible_libraries: string[];
  quality_score: number;
}

export interface SkillModule {
  manifest: SkillManifest;
  instructions: string;
  examples: string[];
}

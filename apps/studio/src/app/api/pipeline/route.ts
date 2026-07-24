import { NextResponse } from 'next/server';
import {
  DesignSpecParser,
  ConstraintEngine,
  DesignTokenCompiler,
  MotionCompiler,
  MultiTargetEmitter,
  EmissionTarget,
  EmitterOutput,
} from '@uios/compiler';
import { InspirationEngine, DesignKnowledgeGraph, UXLawsEngine } from '@uios/knowledge';
import { IndependentDesignCritic } from '@uios/critics';
import { AdapterRegistry } from '@uios/adapters';
import { MultiCandidateGenerator, EngineeringIntelligence, DesignVersioning } from '@uios/engine';
import { CategorizedSkillRegistry } from '@uios/skills';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = body.prompt || 'Build an AI SaaS landing page';

    // Layer 1: Design Spec Parser
    const specParser = new DesignSpecParser();
    const spec = specParser.parse(prompt);

    // Layer 10: Multi-Candidate AST Generator
    const candidateGenerator = new MultiCandidateGenerator();
    const candidates = candidateGenerator.generateCandidates(spec);
    const selectedCandidate = candidates[0]; // Candidate A

    // Layer 3: Constraint Engine
    const constraintEngine = new ConstraintEngine();
    const constraintViolations = constraintEngine.validate(selectedCandidate.ast, spec);

    // Layer 4: Design Token Compiler
    const tokenCompiler = new DesignTokenCompiler();
    const tokens = tokenCompiler.compile(spec);

    // Layer 6: Motion Compiler
    const motionCompiler = new MotionCompiler();
    const motionDecl = motionCompiler.compile(spec);

    // Layer 7, 11, 15, 16: Independent Critic, Smell Detector, Review Board
    const critic = new IndependentDesignCritic();
    const criticReport = critic.evaluate(selectedCandidate.ast, 'code sample');

    // Layer 8: Inspiration Engine
    const inspirationEngine = new InspirationEngine();
    const linearPrinciples = inspirationEngine.getPrinciples('Linear');

    // Layer 13: UX Laws Engine
    const uxLawsEngine = new UXLawsEngine();
    const uxLawResults = uxLawsEngine.evaluateAll();

    // Layer 14: Engineering Intelligence
    const engineering = new EngineeringIntelligence();
    const renderingStrategy = engineering.resolveStrategy(spec.project.type);

    // Layer 18: Library Adapter Registry
    const adapterRegistry = new AdapterRegistry();
    const availableAdapters = adapterRegistry.listAdapters().map((a) => ({ id: a.id, score: a.qualityScore }));

    // Skill Registry Discovery & Skill Graph DAG Resolution
    const skillRegistry = new CategorizedSkillRegistry();
    const activeSkillPipeline = skillRegistry.resolveSkillGraph(spec.project.type);
    const allSkillsCount = skillRegistry.listAll().length;

    // Layer 19: Multi-Target Emitters
    const emitter = new MultiTargetEmitter();
    const targetKeys: EmissionTarget[] = ['react-tsx', 'nextjs-rsc', 'vue-sfc', 'html-css', 'figma-tokens'];
    const emittedOutputs: Partial<Record<EmissionTarget, EmitterOutput>> = {};
    targetKeys.forEach((key) => {
      emittedOutputs[key] = emitter.emit(selectedCandidate.ast, tokens, key);
    });

    return NextResponse.json({
      spec,
      candidates,
      selectedCandidate,
      constraintViolations,
      tokens,
      motionDecl,
      criticReport,
      linearPrinciples,
      uxLawResults,
      renderingStrategy,
      availableAdapters,
      activeSkillPipeline,
      allSkillsCount,
      emittedOutputs,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'DesignVM Compiler Pipeline execution failed' }, { status: 500 });
  }
}

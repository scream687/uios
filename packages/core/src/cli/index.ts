#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { IntentEngine } from '../intent/index.js';
import { PlanningEngine } from '../planning/index.js';
import { TaskGraphGenerator } from '../task-graph/index.js';
import { CapabilityRouter } from '../router/index.js';
import { BrandDNAEngine } from '../memory/dna.js';
import { SpecialistRegistry } from '../specialists/index.js';
import { HumanTasteEngine } from '../taste/index.js';
import { ComponentRegistry } from '../registry/index.js';
import { AssemblyEngine } from '../assembly/index.js';

const program = new Command();

program
  .name('uios')
  .description('UI Intelligence Operating System CLI')
  .version('1.0.0');

program
  .command('generate')
  .argument('<prompt>', 'UI request prompt (e.g., "Build an AI SaaS landing page")')
  .option('-a, --archetype <type>', 'Brand Archetype', 'Linear Dark')
  .action((prompt: string, options: { archetype: string }) => {
    console.log(chalk.bold.cyan('\n🚀 UIOS Engine Pipeline Initializing...\n'));

    // 1. Intent Engine
    const intentEngine = new IntentEngine();
    const intent = intentEngine.parse(prompt);
    console.log(chalk.green('✔ [Intent Engine]:'), `Category=${intent.category}, Industry=${intent.industry}, Style=${intent.styleArchetype}`);

    // 2. Planning Engine
    const planningEngine = new PlanningEngine();
    const plan = planningEngine.plan(intent);
    console.log(chalk.green('✔ [Planning Engine]:'), `IA Sections=${plan.informationArchitecture.sections.length}, Motion Engine=${plan.motionStrategy.engine}`);

    // 3. Task Graph Generator
    const dagGenerator = new TaskGraphGenerator();
    const dagNodes = dagGenerator.generate(plan.informationArchitecture.sections);
    console.log(chalk.green('✔ [Task Graph Generator]:'), `Created DAG with ${dagNodes.length} nodes (Parallel execution capable)`);

    // 4. Brand DNA Engine
    const dnaEngine = new BrandDNAEngine();
    const tokens = dnaEngine.synthesize(intent.styleArchetype);
    console.log(chalk.green('✔ [Brand DNA Engine]:'), `Compiled tokens for archetype '${tokens.archetype}'`);

    // 5. Specialist Modules & Anti-AI Audit
    const specialists = new SpecialistRegistry();
    const antiAIAudit = specialists.antiAI.audit('sample code', tokens);
    console.log(chalk.green('✔ [Anti-AI Pattern Audit]:'), antiAIAudit.passed ? chalk.bold.green('PASSED (0 clichés detected)') : chalk.yellow('WARNING (Refactoring recommended)'));

    // 6. Human Taste Engine
    const tasteEngine = new HumanTasteEngine();
    const tasteReport = tasteEngine.evaluate('sample code', antiAIAudit);
    console.log(chalk.green('✔ [Human Taste Engine Score]:'), chalk.bold.magenta(`${tasteReport.totalScore} / 100`), tasteReport.passed ? '✨ PASS' : '❌ REJECT');

    // 7. Assembly Engine
    const assemblyEngine = new AssemblyEngine();
    const output = assemblyEngine.assemble(intent, tokens, plan);
    console.log(chalk.bold.yellow('\n📦 UI Component Generated Successfully!'));
    console.log(chalk.dim(`Dependencies: ${output.dependencies.join(', ')}\n`));
  });

program
  .command('brand')
  .argument('[archetype]', 'Archetype to inspect', 'Linear Dark')
  .action((archetype: string) => {
    const dnaEngine = new BrandDNAEngine();
    const tokens = dnaEngine.synthesize(archetype as any);
    console.log(chalk.bold.magenta(`\n🎨 Brand DNA Archetype: ${tokens.archetype}\n`));
    console.log(chalk.gray(dnaEngine.toCSSVariables(tokens)));
    console.log('\n');
  });

program.parse(process.argv);

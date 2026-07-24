'use client';

import React from 'react';
import { Cpu, CheckCircle2, ShieldCheck, Zap, Code } from 'lucide-react';
import { RichSkillManifest } from '@uios/sdk';

interface SkillRegistryPanelProps {
  activePipeline: RichSkillManifest[];
  allSkillsCount: number;
}

export function SkillRegistryPanel({ activePipeline, allSkillsCount }: SkillRegistryPanelProps) {
  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#5e6ad2]" />
          <h3 className="font-semibold text-sm tracking-wide text-white font-mono">
            CATEGORIZED AGENT SKILL REGISTRY & SKILL GRAPH DAG (@uios/sdk)
          </h3>
        </div>

        <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#5e6ad2]/20 text-[#8a99ff] border border-[#5e6ad2]/30">
          {allSkillsCount} Categorized Skill Modules
        </span>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono text-gray-400 block uppercase tracking-wider">
          Resolved Skill Graph Pipeline ({activePipeline.length} Active AST Mutation Skills)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activePipeline.map((skill, index) => (
            <div key={skill.id} className="p-3 bg-white/[0.02] border border-white/10 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                  <span className="text-[10px] w-4 h-4 rounded bg-[#5e6ad2]/30 text-[#8a99ff] flex items-center justify-center font-mono">
                    {index + 1}
                  </span>
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  {skill.category.toUpperCase()}
                </span>
              </div>

              <p className="text-[11px] text-gray-400 font-sans line-clamp-2 leading-relaxed">
                {skill.description}
              </p>

              <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-1 border-t border-white/5">
                <span>Confidence: {(skill.confidence * 100).toFixed(0)}%</span>
                <span className="text-[#8a99ff]">weight: {skill.qualityWeight}/10</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

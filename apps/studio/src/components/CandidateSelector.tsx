'use client';

import React from 'react';
import { Sparkles, Layers, Award } from 'lucide-react';
import { ASTCandidate } from '@uios/engine';

interface CandidateSelectorProps {
  candidates: ASTCandidate[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function CandidateSelector({ candidates, selectedId, onSelect }: CandidateSelectorProps) {
  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-2xl space-y-3">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="font-semibold text-sm tracking-wide text-white font-mono">
            LAYER 10: MULTI-CANDIDATE AST GENERATOR
          </h3>
        </div>
        <span className="text-xs font-mono text-gray-400">
          5 Variants Synthesized
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {candidates.map((c) => {
          const isSelected = c.id === selectedId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? 'bg-[#5e6ad2]/20 border-[#5e6ad2] shadow-[0_0_15px_rgba(94,106,210,0.4)]'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold font-mono text-white">{c.name.split(':')[0]}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Score: {c.score}
                </span>
              </div>
              <span className="text-xs text-gray-300 font-mono block truncate">{c.archetype}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

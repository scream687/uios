'use client';

import React from 'react';
import { ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { AntiAIAuditResult } from '@uios/core';

interface AntiAIAuditPanelProps {
  audit: AntiAIAuditResult | null;
}

export function AntiAIAuditPanel({ audit }: AntiAIAuditPanelProps) {
  if (!audit) return null;

  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-2xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-sm tracking-wide text-white font-mono">ANTI-AI DESIGN PATTERN AUDITOR</h3>
        </div>

        <span
          className={`text-xs px-2.5 py-1 rounded font-mono ${
            audit.passed
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}
        >
          {audit.passed ? '0 Clichés Detected' : `${audit.detectedClichés.length} Clichés Detected`}
        </span>
      </div>

      {audit.detectedClichés.length === 0 ? (
        <div className="flex items-center gap-3 p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-mono">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Clean Craftsmanship Verified: No overused glassmorphism, glowing blur bubbles, or generic AI templates found.</span>
        </div>
      ) : (
        <div className="space-y-2">
          {audit.detectedClichés.map((cliché, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg text-xs font-mono text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">{cliché}</span>
                <span className="text-gray-400 text-[11px] block mt-1">{audit.recommendations[i]}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import React from 'react';
import { Award, CheckCircle, AlertTriangle } from 'lucide-react';
import { TasteScoreReport } from '@uios/core';

interface TasteScoreRadarProps {
  report: TasteScoreReport | null;
}

export function TasteScoreRadar({ report }: TasteScoreRadarProps) {
  if (!report) return null;

  const metrics = [
    { label: 'Hierarchy', score: report.metrics.hierarchy },
    { label: 'Typography', score: report.metrics.typography },
    { label: 'Spacing', score: report.metrics.spacing },
    { label: 'Balance', score: report.metrics.balance },
    { label: 'Motion', score: report.metrics.motion },
    { label: 'Accessibility', score: report.metrics.accessibility },
    { label: 'Brand Match', score: report.metrics.brandConsistency },
    { label: 'Craftsmanship', score: report.metrics.craftsmanship },
  ];

  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-2xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          <h3 className="font-semibold text-sm tracking-wide text-white font-mono">HUMAN TASTE SCORE ENGINE</h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold font-mono text-white">{report.totalScore}</span>
          <span className="text-xs font-mono text-gray-400">/ 100</span>
          {report.passed ? (
            <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">
              <CheckCircle className="w-3.5 h-3.5" /> PASS (&gt;=90)
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-mono">
              <AlertTriangle className="w-3.5 h-3.5" /> REJECT (&lt;90)
            </span>
          )}
        </div>
      </div>

      {/* Metrics breakdown progress bars */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">{m.label}</span>
              <span className="text-white font-bold">{m.score}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  m.score >= 90
                    ? 'bg-gradient-to-r from-[#5e6ad2] to-[#8a99ff]'
                    : m.score >= 80
                    ? 'bg-amber-400'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${m.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

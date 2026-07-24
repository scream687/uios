'use client';

import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SmellResult } from '@uios/critics';

interface SmellDetectorCardProps {
  smells: SmellResult[];
}

export function SmellDetectorCard({ smells }: SmellDetectorCardProps) {
  const detectedCount = smells.filter((s) => s.detected).length;

  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-2xl space-y-3">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-sm tracking-wide text-white font-mono">
            LAYER 15: AI DESIGN SMELL DETECTOR
          </h3>
        </div>

        <span
          className={`text-xs px-2.5 py-1 rounded font-mono ${
            detectedCount === 0
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}
        >
          {detectedCount === 0 ? '0/14 Smells Detected' : `${detectedCount}/14 Smells Detected`}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {smells.map((s) => (
          <div
            key={s.smellName}
            className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
              s.detected
                ? 'bg-rose-950/20 border-rose-500/40 text-rose-300'
                : 'bg-white/[0.02] border-white/5 text-gray-400'
            }`}
          >
            <span className="truncate">{s.smellName}</span>
            {s.detected ? (
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

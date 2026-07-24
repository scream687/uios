'use client';

import React from 'react';
import { Users, CheckCircle, ThumbsUp } from 'lucide-react';
import { ReviewBoardReport } from '@uios/critics';

interface ReviewBoardPanelProps {
  report: ReviewBoardReport | null;
}

export function ReviewBoardPanel({ report }: ReviewBoardPanelProps) {
  if (!report) return null;

  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#8a99ff]" />
          <h3 className="font-semibold text-sm tracking-wide text-white font-mono">
            LAYER 16: 8-PERSONA DESIGN REVIEW BOARD
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold font-mono text-white">{report.averageScore}</span>
          <span className="text-xs font-mono text-gray-400">/ 100</span>
          {report.unanimousApproval && (
            <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              <CheckCircle className="w-3.5 h-3.5" /> UNANIMOUS APPROVAL
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {report.votes.map((vote) => (
          <div key={vote.role} className="p-3 bg-white/[0.02] border border-white/10 rounded-lg space-y-1">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-white font-bold">{vote.role}</span>
              <span className="text-emerald-400">{vote.score}%</span>
            </div>
            <span className="text-[11px] font-mono text-gray-400 block">{vote.personaName}</span>
            <p className="text-[11px] text-gray-300 font-sans leading-relaxed pt-1 line-clamp-2">
              "{vote.comments}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

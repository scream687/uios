'use client';

import React, { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';
import { EmissionTarget, EmitterOutput } from '@uios/compiler';

interface EmitterSelectorProps {
  emitters: Record<EmissionTarget, EmitterOutput> | null;
}

export function EmitterSelector({ emitters }: EmitterSelectorProps) {
  const [target, setTarget] = useState<EmissionTarget>('react-tsx');
  const [copied, setCopied] = useState(false);

  if (!emitters) return null;

  const current = emitters[target];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const targets: EmissionTarget[] = ['react-tsx', 'nextjs-rsc', 'vue-sfc', 'html-css', 'figma-tokens'];

  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-2xl space-y-3">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-[#8a99ff]" />
          <h3 className="font-semibold text-sm tracking-wide text-white font-mono">
            LAYER 19: MULTI-TARGET AST CODE EMITTERS
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
            {targets.map((t) => (
              <button
                key={t}
                onClick={() => setTarget(t)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-all uppercase ${
                  target === t ? 'bg-[#5e6ad2] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {t.split('-')[0]}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-mono transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <pre className="bg-black/60 p-4 rounded-lg border border-white/10 font-mono text-xs text-gray-300 overflow-x-auto max-h-[360px]">
        <code>{current.code}</code>
      </pre>
    </div>
  );
}

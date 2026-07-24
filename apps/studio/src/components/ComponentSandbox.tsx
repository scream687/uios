'use client';

import React, { useState } from 'react';
import { Code, Eye, Copy, Check, Component } from 'lucide-react';
import { GeneratedUIOutput } from '@uios/core';

interface ComponentSandboxProps {
  output: GeneratedUIOutput | null;
}

export function ComponentSandbox({ output }: ComponentSandboxProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'specs'>('preview');
  const [copied, setCopied] = useState(false);

  if (!output) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(output.reactCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-2xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Component className="w-5 h-5 text-[#8a99ff]" />
          <h3 className="font-semibold text-sm tracking-wide text-white font-mono">ASSEMBLY ENGINE OUTPUT CANVAS</h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-all ${
                activeTab === 'preview' ? 'bg-[#5e6ad2] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-all ${
                activeTab === 'code' ? 'bg-[#5e6ad2] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> Code Specs
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-mono transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy JSX'}
          </button>
        </div>
      </div>

      {activeTab === 'preview' ? (
        <div className="border border-white/10 rounded-lg p-6 bg-[#08090a] min-h-[360px] flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-3 left-3 text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300">
            Render Sandbox (Linear Dark Theme)
          </div>
          
          <div className="w-full max-w-xl text-center space-y-6 my-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#8a99ff]">
              ✨ UIOS Generated Component
            </div>

            <h2 className="text-3xl font-bold font-sans tracking-tight text-white">
              AI-Powered Enterprise UI Orchestration
            </h2>

            <p className="text-sm text-gray-400 font-sans max-w-md mx-auto leading-relaxed">
              Decomposed into layout, UX, visual, motion, accessibility, and human-taste engines.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button className="px-5 py-2.5 bg-[#5e6ad2] hover:bg-[#5e6ad2]/90 text-white rounded-lg font-medium text-sm transition-all shadow-[0_0_20px_rgba(94,106,210,0.4)]">
                Primary Action
              </button>
              <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium text-sm transition-all">
                Explore Specs
              </button>
            </div>
          </div>
        </div>
      ) : (
        <pre className="bg-black/60 p-4 rounded-lg border border-white/10 font-mono text-xs text-gray-300 overflow-x-auto max-h-[400px]">
          <code>{output.reactCode}</code>
        </pre>
      )}
    </div>
  );
}

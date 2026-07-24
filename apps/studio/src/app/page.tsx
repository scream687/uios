'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Play, RefreshCw, Cpu, Layers, ShieldCheck, Zap, Code2, Award, Terminal, Building2 } from 'lucide-react';
import { DesignSpecViewer } from '@/components/DesignSpecViewer';
import { CandidateSelector } from '@/components/CandidateSelector';
import { SmellDetectorCard } from '@/components/SmellDetectorCard';
import { ReviewBoardPanel } from '@/components/ReviewBoardPanel';
import { EmitterSelector } from '@/components/EmitterSelector';
import { SkillRegistryPanel } from '@/components/SkillRegistryPanel';

export default function UIOSStudioDashboard() {
  const [prompt, setPrompt] = useState('Build an AI SaaS landing page with dark mode, bento grid features, and pricing table');
  const [loading, setLoading] = useState(false);
  const [pipelineData, setPipelineData] = useState<any>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('candidate-1');

  const runPipeline = async (currentPrompt: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentPrompt }),
      });
      const data = await res.json();
      if (res.ok) {
        setPipelineData(data);
        if (data.candidates && data.candidates.length > 0) {
          setSelectedCandidateId(data.candidates[0].id);
        }
      }
    } catch (e) {
      console.error('Failed to run DesignVM pipeline', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runPipeline(prompt);
  }, []);

  const activeCandidate = pipelineData?.candidates?.find((c: any) => c.id === selectedCandidateId) || pipelineData?.selectedCandidate;

  return (
    <div className="min-h-screen bg-[#08090a] text-[#f7f8f8] font-sans antialiased pb-20">
      {/* Studio Header Bar */}
      <header className="border-b border-white/10 bg-[#0f1115]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5e6ad2] to-[#8a99ff] flex items-center justify-center text-white font-bold font-mono text-lg shadow-[0_0_20px_rgba(94,106,210,0.4)]">
              VM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white font-mono text-base">UIOS DesignVM</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5e6ad2]/20 text-[#8a99ff] border border-[#5e6ad2]/30">
                  20-LAYER DESIGN COMPILER PLATFORM
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono">Design Specification → AST → Constraint Engine → Emitters</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
            <Link
              href="/workbench"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF4500] text-white font-bold hover:bg-[#FF4500]/90 transition-all shadow-md"
            >
              <Terminal className="w-4 h-4" /> UIOS OS Control Workbench →
            </Link>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> React 19 RSC & Edge Compiler
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 8-Persona Unanimous Gate
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1600px] mx-auto px-6 pt-6 space-y-6">
        {/* Prompt Input Controls */}
        <div className="bg-[#0f1115] border border-white/10 rounded-xl p-4 shadow-2xl flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1 relative w-full">
            <Sparkles className="w-4 h-4 text-[#8a99ff] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runPipeline(prompt)}
              placeholder="Describe user interface requirements for DesignVM compiler..."
              className="w-full bg-[#08090a] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#5e6ad2] font-sans"
            />
          </div>

          <button
            onClick={() => runPipeline(prompt)}
            disabled={loading}
            className="w-full md:w-auto px-6 py-2.5 bg-[#5e6ad2] hover:bg-[#5e6ad2]/90 disabled:opacity-50 text-white rounded-lg font-medium text-sm font-mono flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(94,106,210,0.4)] shrink-0"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            <span>{loading ? 'Compiling AST...' : 'Compile Design Specification'}</span>
          </button>
        </div>

        {pipelineData && (
          <>
            {/* Layer 10: Multi-Candidate Generator */}
            <CandidateSelector
              candidates={pipelineData.candidates || []}
              selectedId={selectedCandidateId}
              onSelect={(id) => setSelectedCandidateId(id)}
            />

            {/* v9 ADIP Metrics & Execution Telemetry */}
            {pipelineData.uiMetrics && (
              <div className="bg-[#0f1115] border border-[#FF4500]/30 rounded-xl p-5 shadow-2xl font-mono text-xs">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF4500] animate-pulse" />
                    <span className="font-bold text-white uppercase tracking-wider text-sm">v9 ADIP Execution Metrics & Trace</span>
                  </div>
                  <span className="text-[#8a99ff] bg-[#5e6ad2]/20 px-2.5 py-1 rounded border border-[#5e6ad2]/30">
                    Strategy: {pipelineData.strategy?.strategyName || 'Luxury Editorial'}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                  <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                    <div className="text-gray-400">Visual Balance</div>
                    <div className="text-lg font-bold text-emerald-400">{pipelineData.uiMetrics.visualBalance * 100}%</div>
                  </div>
                  <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                    <div className="text-gray-400">Hierarchy Strength</div>
                    <div className="text-lg font-bold text-emerald-400">{pipelineData.uiMetrics.hierarchyStrength * 100}%</div>
                  </div>
                  <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                    <div className="text-gray-400">Reading Flow</div>
                    <div className="text-lg font-bold text-emerald-400">{pipelineData.uiMetrics.readingFlow * 100}%</div>
                  </div>
                  <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                    <div className="text-gray-400">WCAG Contrast Ratio</div>
                    <div className="text-lg font-bold text-amber-400">{pipelineData.uiMetrics.contrastRatio}:1</div>
                  </div>
                  <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                    <div className="text-gray-400">Est. Layout Shift (CLS)</div>
                    <div className="text-lg font-bold text-blue-400">{pipelineData.uiMetrics.estimatedCLS}</div>
                  </div>
                  <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                    <div className="text-gray-400">Est. Hero Load (LCP)</div>
                    <div className="text-lg font-bold text-[#FF4500]">{pipelineData.uiMetrics.estimatedLCPSeconds}s</div>
                  </div>
                </div>

                {pipelineData.dna && (
                  <div className="flex flex-wrap gap-2 pt-2 text-[11px] text-gray-400 border-t border-white/5">
                    <span>Design DNA:</span>
                    <span className="text-white font-bold">{pipelineData.dna.rhythm} Rhythm</span> •
                    <span className="text-white font-bold">{pipelineData.dna.density} Density</span> •
                    <span className="text-white font-bold">{pipelineData.dna.contrast} Contrast</span> •
                    <span className="text-white font-bold">{pipelineData.dna.composition} Composition</span>
                  </div>
                )}
              </div>
            )}

            {/* Layer 1 & 2: Spec Viewer & AST Explorer */}
            <DesignSpecViewer spec={pipelineData.spec} astRoot={activeCandidate?.ast?.root} />

            {/* Skill Registry Pipeline */}
            <SkillRegistryPanel
              activePipeline={pipelineData.activeSkillPipeline || []}
              allSkillsCount={pipelineData.allSkillsCount || 21}
            />

            {/* Layer 15 & 16: Smell Detector & Review Board */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6">
                <SmellDetectorCard smells={pipelineData.criticReport?.smells || []} />
              </div>
              <div className="lg:col-span-6">
                <ReviewBoardPanel report={pipelineData.criticReport?.reviewBoard || null} />
              </div>
            </div>

            {/* Layer 19: Multi-Target Code Emitters */}
            <EmitterSelector emitters={pipelineData.emittedOutputs || null} />
          </>
        )}
      </main>
    </div>
  );
}

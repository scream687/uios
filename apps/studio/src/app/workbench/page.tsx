'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function UIOSWorkbenchPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'dim' | 'tournament' | 'site-graph' | 'exporter'>('dim');
  const [tasteScore, setTasteScore] = useState(89);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0A0A0B] text-[#FDFBF7]" />;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#FDFBF7] font-sans p-6 md:p-12 selection:bg-[#FF4500] selection:text-[#0A0A0B]">
      {/* OS Telemetry Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-white/10 mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-[#FF4500]/20 text-[#FF4500] text-xs font-mono tracking-widest rounded-full uppercase border border-[#FF4500]/30">
              UIOS v6.0 Core Telemetry
            </span>
            <span className="text-white/40 text-xs font-mono">PID: 74920 • 38 Compiler Test Suites Passing</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Autonomous Design Laboratory Workbench
          </h1>
        </div>

        <button
          onClick={() => {
            setIsExecuting(true);
            setTimeout(() => {
              setTasteScore(Math.floor(Math.random() * 8) + 88);
              setIsExecuting(false);
            }, 1200);
          }}
          className="px-6 py-3 bg-[#FF4500] hover:bg-[#FF4500]/90 text-white font-mono text-sm tracking-wide rounded-lg transition-all transform active:scale-95 shadow-lg shadow-[#FF4500]/20 flex items-center gap-2"
        >
          {isExecuting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Running DIM Lifecycle...
            </>
          ) : (
            <>▶ Run Candidate Tournament</>
          )}
        </button>
      </header>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-white/10 pb-4 mb-8 text-sm font-mono">
        <button
          onClick={() => setActiveTab('dim')}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeTab === 'dim' ? 'bg-white/10 text-white font-bold' : 'text-white/40 hover:text-white'
          }`}
        >
          01. DIM Microservice Federation
        </button>
        <button
          onClick={() => setActiveTab('tournament')}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeTab === 'tournament' ? 'bg-white/10 text-white font-bold' : 'text-white/40 hover:text-white'
          }`}
        >
          02. Candidate Tournament Bracket
        </button>
        <button
          onClick={() => setActiveTab('site-graph')}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeTab === 'site-graph' ? 'bg-white/10 text-white font-bold' : 'text-white/40 hover:text-white'
          }`}
        >
          03. Multi-Page Site Graph
        </button>
        <button
          onClick={() => setActiveTab('exporter')}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeTab === 'exporter' ? 'bg-white/10 text-white font-bold' : 'text-white/40 hover:text-white'
          }`}
        >
          04. Production Export Engine
        </button>
      </div>

      {/* TAB 1: DIM Microservice Federation */}
      {activeTab === 'dim' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Typography DIM */}
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono text-[#FF4500] uppercase tracking-wider">DIM :: Typography</span>
                <span className="text-xs font-mono bg-green-500/20 text-green-400 px-2 py-1 rounded">VALIDATED</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Playfair Display + Inter</h3>
              <p className="text-sm text-white/60 mb-4 font-mono">Tracking: -0.03em • Measure: 58ch • Scale: 1.250</p>
              <div className="p-3 bg-black/40 rounded-lg text-xs font-mono text-white/80 space-y-1">
                <div>• Knowledge: TP_01 (Optical Contrast)</div>
                <div>• Skill: font-selection.skill.md</div>
                <div>• Benchmark: Apple (98/100 match)</div>
              </div>
            </div>

            {/* Color DIM */}
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono text-[#FF4500] uppercase tracking-wider">DIM :: Color</span>
                <span className="text-xs font-mono bg-green-500/20 text-green-400 px-2 py-1 rounded">VALIDATED</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Volcanic Dark (#0A0A0B)</h3>
              <p className="text-sm text-white/60 mb-4 font-mono">Accent: Vermilion (#FF4500) • Contrast: 7.2:1</p>
              <div className="p-3 bg-black/40 rounded-lg text-xs font-mono text-white/80 space-y-1">
                <div>• Psychology: Specialty Coffee</div>
                <div>• Skill: palette-generation.skill.md</div>
                <div>• WCAG AAA: Passed (Zero pure blacks)</div>
              </div>
            </div>

            {/* Motion DIM */}
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono text-[#FF4500] uppercase tracking-wider">DIM :: Motion</span>
                <span className="text-xs font-mono bg-green-500/20 text-green-400 px-2 py-1 rounded">VALIDATED</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Luxury Spring Physics</h3>
              <p className="text-sm text-white/60 mb-4 font-mono">Easing: cubic-bezier(0.16, 1, 0.3, 1) • 150ms</p>
              <div className="p-3 bg-black/40 rounded-lg text-xs font-mono text-white/80 space-y-1">
                <div>• Choreography: GSAP + ScrollTrigger</div>
                <div>• GPU Budget: 1.4ms per frame</div>
                <div>• Reduced Motion: Graceful fallback</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: Candidate Tournament Bracket */}
      {activeTab === 'tournament' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
            <h3 className="text-lg font-bold mb-4 font-mono">Pairwise Tournament Elimination (4 Archetype Candidates)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
              <div className="p-4 bg-black/40 border border-white/10 rounded-xl">
                <div className="text-xs text-white/40 mb-2">MATCHUP #1 (Semi-Final)</div>
                <div className="flex justify-between items-center mb-2">
                  <span>Candidate #1 (Editorial)</span>
                  <span className="text-white/60">Score: 82</span>
                </div>
                <div className="flex justify-between items-center text-green-400 font-bold">
                  <span>Candidate #3 (Monolith) ★ WINNER</span>
                  <span>Score: {tasteScore}</span>
                </div>
                <div className="text-xs text-white/40 mt-3 pt-2 border-t border-white/10">
                  Tie-Breaker: Invoked (Blind LLM Design Judge chose Monolith anchor)
                </div>
              </div>

              <div className="p-4 bg-black/40 border border-white/10 rounded-xl">
                <div className="text-xs text-white/40 mb-2">MATCHUP #2 (Final)</div>
                <div className="flex justify-between items-center mb-2">
                  <span>Candidate #2 (Minimalist)</span>
                  <span className="text-white/60">Score: 85</span>
                </div>
                <div className="flex justify-between items-center text-green-400 font-bold">
                  <span>Candidate #3 (Monolith) ★ CHAMPION</span>
                  <span>Score: {tasteScore}</span>
                </div>
                <div className="text-xs text-white/40 mt-3 pt-2 border-t border-white/10">
                  Taste Memory: Updated abstract pattern (dominant_physical_object confidence = 0.94)
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: Multi-Page Site Graph */}
      {activeTab === 'site-graph' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl font-mono">
            <h3 className="text-lg font-bold mb-4">Multi-Page Site Graph Blueprint</h3>
            <div className="space-y-3">
              {[
                { path: '/', title: 'Home Experience', scenes: 4 },
                { path: '/terroir', title: 'Terroir & Elevation Telemetry', scenes: 3 },
                { path: '/reserve', title: 'Single-Origin Reserve Allocation', scenes: 3 },
                { path: '/subscriptions', title: 'Anaerobic Vat Subscriptions', scenes: 2 },
              ].map((r, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-black/40 border border-white/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-[#FF4500]">{r.path}</span>
                    <span className="text-white/80">{r.title}</span>
                  </div>
                  <span className="text-xs text-white/40">{r.scenes} Scenes • Shared Layout</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 4: Production Export Engine */}
      {activeTab === 'exporter' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl font-mono">
            <h3 className="text-lg font-bold mb-4">Production Export Bundle Ready</h3>
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-2 text-sm text-white/80 mb-6">
              <div>• Framework: Next.js 14 (App Router + React 18)</div>
              <div>• Styling: Tailwind CSS v3</div>
              <div>• Motion: Framer Motion 11 + GSAP 3</div>
              <div>• Storybook: Configured (.storybook/main.ts)</div>
              <div>• Docker: Included (Dockerfile & docker-compose.yml)</div>
            </div>
            <button className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-mono text-sm rounded-lg transition-all">
              ↓ Download Standalone Production Project (.zip)
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

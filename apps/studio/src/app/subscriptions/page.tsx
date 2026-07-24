'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SubscriptionsChamberPage() {
  const [mounted, setMounted] = useState(false);
  const [fermentationHours, setFermentationHours] = useState(96);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0A0A0B] text-[#FDFBF7]" />;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#FDFBF7] font-sans p-6 md:p-16 selection:bg-[#FF4500]">
      <nav className="flex justify-between items-center pb-8 border-b border-white/10 mb-12 font-mono text-sm">
        <a href="/coffee-shop" className="text-[#FF4500] font-bold text-lg hover:underline">← KURO ROASTERS</a>
        <div className="flex gap-6 text-white/60">
          <a href="/terroir" className="hover:text-white">01. TERROIR</a>
          <a href="/reserve" className="hover:text-white">02. RESERVE</a>
          <a href="/subscriptions" className="text-white font-bold border-b border-[#FF4500]">03. SUBSCRIPTIONS</a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto space-y-12">
        <header className="text-center max-w-3xl mx-auto">
          <span className="px-3 py-1 bg-[#FF4500]/20 text-[#FF4500] text-xs font-mono tracking-widest rounded-full uppercase border border-[#FF4500]/30">
            Chrono Fermentation Subscription Chamber
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 mb-6">
            Curated Monthly Anaerobic Deliveries
          </h1>
          <p className="text-white/60">
            Receive micro-lot roasts flushed with argon gas within 24 hours of cooling. Never miss a volcanic harvest cycle.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {/* Plan 1 */}
          <div className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-white/40 uppercase tracking-widest">TIER 01</div>
              <h3 className="text-2xl font-bold mt-1">Single Origin Explorer</h3>
              <div className="text-3xl font-extrabold text-[#FF4500] mt-4 mb-2">$38 <span className="text-xs text-white/40 font-normal">/ month</span></div>
              <p className="text-xs text-white/60 leading-relaxed">
                1x 250g bag of rare micro-lot coffee per month + tasting notes & terroir telemetry card.
              </p>
            </div>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest rounded-xl transition-all">
              Subscribe Tier 01
            </button>
          </div>

          {/* Plan 2 Featured */}
          <div className="p-8 bg-gradient-to-b from-[#1E1214] to-[#121214] border-2 border-[#FF4500] rounded-3xl space-y-6 flex flex-col justify-between relative shadow-2xl shadow-[#FF4500]/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FF4500] text-white text-[10px] font-mono font-bold tracking-widest rounded-full uppercase">
              RECOMMENDED BY ROASTER
            </div>
            <div>
              <div className="text-xs font-mono text-[#FF4500] uppercase tracking-widest mt-2">TIER 02</div>
              <h3 className="text-2xl font-bold mt-1">Anaerobic Chrono Vat</h3>
              <div className="text-3xl font-extrabold text-[#FF4500] mt-4 mb-2">$68 <span className="text-xs text-white/40 font-normal">/ month</span></div>
              <p className="text-xs text-white/60 leading-relaxed">
                2x 250g bags of 120h anaerobic ferment lots + priority access to Guji & Yirgacheffe volcanic releases.
              </p>
            </div>
            <button className="w-full py-3 bg-[#FF4500] hover:bg-[#FF4500]/90 text-white font-mono text-xs uppercase tracking-widest rounded-xl transition-all font-bold shadow-lg shadow-[#FF4500]/20">
              Subscribe Tier 02
            </button>
          </div>

          {/* Plan 3 */}
          <div className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-white/40 uppercase tracking-widest">TIER 03</div>
              <h3 className="text-2xl font-bold mt-1">Volcanic Guild Monolith</h3>
              <div className="text-3xl font-extrabold text-[#FF4500] mt-4 mb-2">$120 <span className="text-xs text-white/40 font-normal">/ month</span></div>
              <p className="text-xs text-white/60 leading-relaxed">
                4x 250g bags of competition-grade reserve lots + custom ceramic cupping bowl & nitrogen canister.
              </p>
            </div>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest rounded-xl transition-all">
              Subscribe Tier 03
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

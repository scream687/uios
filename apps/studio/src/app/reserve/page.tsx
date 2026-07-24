'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ReserveAllocationPage() {
  const [mounted, setMounted] = useState(false);
  const [allocatedBags, setAllocatedBags] = useState(1);

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
          <a href="/reserve" className="text-white font-bold border-b border-[#FF4500]">02. RESERVE</a>
          <a href="/subscriptions" className="hover:text-white">03. SUBSCRIPTIONS</a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="px-3 py-1 bg-[#FF4500]/20 text-[#FF4500] text-xs font-mono tracking-widest rounded-full uppercase border border-[#FF4500]/30">
            Micro-Lot Allocation Monolith
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 mb-6">
            Single-Origin Reserve Lot #049
          </h1>
          <p className="text-white/60 mb-8 leading-relaxed">
            Cultivated at 2,200m altitude in Guji, Ethiopia. Anaerobically fermented in nitrogen-flushed stainless steel vessels for 120 hours.
          </p>

          <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl font-mono space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/60">Lot Quantity</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setAllocatedBags(Math.max(1, allocatedBags - 1))}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold"
                >
                  -
                </button>
                <span className="text-xl font-bold text-[#FF4500]">{allocatedBags} Bags</span>
                <button
                  onClick={() => setAllocatedBags(Math.min(6, allocatedBags + 1))}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm pt-4 border-t border-white/10">
              <span className="text-white/60">Total Investment</span>
              <span className="text-2xl font-extrabold text-white">${allocatedBags * 48} USD</span>
            </div>

            <button className="w-full py-4 bg-[#FF4500] hover:bg-[#FF4500]/90 text-white font-bold tracking-wider rounded-xl transition-all shadow-lg shadow-[#FF4500]/20 uppercase text-sm">
              Reserve Lot Allocation
            </button>
          </div>
        </div>

        <div className="relative h-[450px] bg-gradient-to-tr from-[#121214] to-[#1F1F23] border border-white/10 rounded-3xl flex items-center justify-center p-8 overflow-hidden">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-center font-mono"
          >
            <div className="w-40 h-56 mx-auto bg-gradient-to-b from-[#FF4500] to-[#8B0000] rounded-2xl shadow-2xl flex items-center justify-center text-white font-extrabold text-2xl tracking-tighter border border-white/20 mb-6">
              LOT #049
            </div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Anaerobic Volcanic Reserve</div>
            <div className="text-sm text-[#FF4500] font-bold mt-1">Only 14 Bags Remaining Globally</div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

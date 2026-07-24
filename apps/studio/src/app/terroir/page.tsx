'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TerroirTelemetryPage() {
  const [mounted, setMounted] = useState(false);
  const [elevationMeters, setElevationMeters] = useState(2100);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0A0A0B] text-[#FDFBF7]" />;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#FDFBF7] font-sans p-6 md:p-16 selection:bg-[#FF4500]">
      <nav className="flex justify-between items-center pb-8 border-b border-white/10 mb-12 font-mono text-sm">
        <a href="/coffee-shop" className="text-[#FF4500] font-bold text-lg hover:underline">← KURO ROASTERS</a>
        <div className="flex gap-6 text-white/60">
          <a href="/terroir" className="text-white font-bold border-b border-[#FF4500]">01. TERROIR</a>
          <a href="/reserve" className="hover:text-white">02. RESERVE</a>
          <a href="/subscriptions" className="hover:text-white">03. SUBSCRIPTIONS</a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto space-y-16">
        <header>
          <span className="px-3 py-1 bg-[#FF4500]/20 text-[#FF4500] text-xs font-mono tracking-widest rounded-full uppercase border border-[#FF4500]/30">
            Geological Stratum Telemetry
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mt-4 mb-6">
            Volcanic Terroir & Elevation Simulator
          </h1>
          <p className="text-lg text-white/60 max-w-2xl">
            Simulate altitude pressure, soil mineral density, and bean density across the Yirgacheffe high-altitude rift valley.
          </p>
        </header>

        {/* Interactive Elevation Slider */}
        <section className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl space-y-8 font-mono">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest">Altitude Parameter</div>
              <div className="text-3xl md:text-5xl font-extrabold text-[#FF4500]">{elevationMeters.toLocaleString()}m</div>
            </div>
            <div className="text-right text-xs text-white/60">
              <div>Barometric Pressure: {(1013 - (elevationMeters * 0.12)).toFixed(1)} hPa</div>
              <div>Density Index: {(1.2 + (elevationMeters / 3000)).toFixed(2)} g/cm³</div>
            </div>
          </div>

          <input
            type="range"
            min="1500"
            max="2400"
            step="50"
            value={elevationMeters}
            onChange={(e) => setElevationMeters(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FF4500]"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs">
            <div className="p-4 bg-black/40 rounded-xl">
              <div className="text-[#FF4500] font-bold mb-1">SOIL MINERALS</div>
              <div className="text-white/80">Basaltic Ash & Iron-Rich Clay</div>
            </div>
            <div className="p-4 bg-black/40 rounded-xl">
              <div className="text-[#FF4500] font-bold mb-1">MICROCLIMATE</div>
              <div className="text-white/80">Mist Canopy • Diurnal Shift 18°C</div>
            </div>
            <div className="p-4 bg-black/40 rounded-xl">
              <div className="text-[#FF4500] font-bold mb-1">FLAVOR YIELD</div>
              <div className="text-white/80">Jasmine • Bergamot • Bright Acidity</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

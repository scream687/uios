'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ShoppingBag, ShieldCheck, Flame, Compass, ChevronDown, Check } from 'lucide-react';

export default function KuroCoffeeShopPage() {
  const [activeLot, setActiveLot] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<'all' | 'terroir' | 'roasting' | 'subscription'>('all');

  const microLots = [
    {
      id: 'lot-804',
      name: 'Geisha Village Reserve',
      origin: 'Bench Maji, Ethiopia • 2,100m',
      process: 'Anaerobic Slow Natural (120 hrs)',
      notes: ['White Jasmine', 'Bergamot', 'Wild Peach'],
      score: '94.5 SCA',
      elevation: '2,100 meters',
      roastDate: 'Roasted 14 Hours Ago in Ginza',
      price: '$42',
      bgGrad: 'from-[#ff3b00]/20 via-transparent to-transparent',
    },
    {
      id: 'lot-902',
      name: 'El Paraiso Pink Bourbon',
      origin: 'Cauca, Colombia • 1,950m',
      process: 'Thermal Shock Thermal Anaerobic',
      notes: ['Pink Guava', 'Lychee', 'Rose Water'],
      score: '93.8 SCA',
      elevation: '1,950 meters',
      roastDate: 'Roasted Today in Ginza',
      price: '$48',
      bgGrad: 'from-[#ff0077]/20 via-transparent to-transparent',
    },
  ];

  const currentLot = microLots[activeLot];

  return (
    <div className="min-h-screen bg-[#050507] text-[#f3ebd9] font-sans antialiased selection:bg-[#ff3b00] selection:text-white relative overflow-x-hidden">
      {/* Background Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] z-50" />

      {/* 1. Header Bar - Minimal & Asymmetric */}
      <header className="sticky top-0 z-40 bg-[#050507]/90 backdrop-blur-xl border-b border-white/10 px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-9 h-9 bg-[#ff3b00] flex items-center justify-center font-mono font-black text-black text-lg tracking-tighter">
              黒
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tighter text-[#f3ebd9] block leading-none">KURO</span>
              <span className="text-[9px] font-mono uppercase text-[#ff3b00] tracking-[0.25em]">Tokyo Micro-Lot Single Origin</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-10 text-xs font-mono uppercase tracking-widest text-white/50">
            <button onClick={() => setActiveSection('terroir')} className="hover:text-[#ff3b00] transition-colors">01 / Terroir</button>
            <button onClick={() => setActiveSection('roasting')} className="hover:text-[#ff3b00] transition-colors">02 / Roasting</button>
            <button onClick={() => setActiveSection('subscription')} className="hover:text-[#ff3b00] transition-colors">03 / Subscription</button>
          </nav>

          <button
            onClick={() => setCartCount(c => c + 1)}
            className="px-5 py-2.5 bg-[#f3ebd9]/10 border border-[#f3ebd9]/20 hover:bg-[#ff3b00] hover:text-black hover:border-[#ff3b00] transition-all flex items-center space-x-3 text-xs font-mono rounded-none"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag ({cartCount})</span>
          </button>
        </div>
      </header>

      {/* 2. NARRATIVE CHAPTER 01: HERO MONOLITH & OVERLAPPING TYPOGRAPHY */}
      <section className="relative min-h-[90vh] px-8 pt-16 pb-24 flex flex-col justify-between border-b border-white/10">
        {/* Asymmetric Typography Tension */}
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8 relative z-10">
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-[#ff3b00]/10 border border-[#ff3b00]/40 text-[#ff3b00] text-xs font-mono tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ff3b00] animate-pulse" />
              <span>Volcanic Soil Fermentation • SCA 94.5</span>
            </div>

            <h1 className="text-6xl sm:text-8xl lg:text-[104px] font-extrabold tracking-[-0.055em] leading-[0.92] text-[#f3ebd9]">
              Volcanic <br />
              <span className="italic font-serif font-normal text-white/40 border-b-2 border-[#ff3b00]">Anaerobic</span> <br />
              Precision.
            </h1>

            <p className="text-lg md:text-2xl text-[#f3ebd9]/70 font-light max-w-xl leading-relaxed pt-4">
              Micro-lots sourced at 2,100 meters, fermented in oxygen-deprived tanks, and roasted on custom cast-iron drums in Ginza, Tokyo.
            </p>

            <div className="flex items-center space-x-6 pt-4">
              <button
                onClick={() => setCartCount(c => c + 1)}
                className="px-10 py-5 bg-[#ff3b00] text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_40px_rgba(255,59,0,0.3)] flex items-center space-x-4"
              >
                <span>Acquire Reserve Batch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest hidden sm:inline-block">
                Limited to 150 Bags / Roast Day
              </span>
            </div>
          </div>

          {/* DOMINANT HERO VISUAL OBJECT: The Volcanic Reserve Card */}
          <div className="lg:col-span-4 relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`bg-[#0d0d12] border border-white/20 p-8 space-y-8 relative shadow-2xl overflow-hidden bg-gradient-to-b ${currentLot.bgGrad}`}
            >
              <div className="flex justify-between items-start border-b border-white/10 pb-6">
                <div>
                  <span className="text-[10px] font-mono text-[#ff3b00] uppercase tracking-[0.2em]">SINGLE ORIGIN RESERVE</span>
                  <h3 className="text-3xl font-extrabold text-white tracking-tight mt-1">{currentLot.name}</h3>
                  <p className="text-xs font-mono text-white/50 mt-1">{currentLot.origin}</p>
                </div>
                <span className="text-2xl font-mono font-bold text-[#ff3b00]">{currentLot.price}</span>
              </div>

              {/* Flavor Profile Pills */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase text-white/40 tracking-widest block">Tasting Notes</span>
                <div className="flex flex-wrap gap-2">
                  {currentLot.notes.map((note, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 border border-white/15 text-xs font-mono text-[#f3ebd9]">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* SCA Score Telemetry */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 font-mono text-xs">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">SCA Score</span>
                  <span className="text-lg font-bold text-[#ff3b00]">{currentLot.score}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Elevation</span>
                  <span className="text-lg font-bold text-white">{currentLot.elevation}</span>
                </div>
              </div>

              {/* Switcher Controls */}
              <div className="flex space-x-2 pt-2">
                {microLots.map((lot, idx) => (
                  <button
                    key={lot.id}
                    onClick={() => setActiveLot(idx)}
                    className={`flex-1 py-2 text-[10px] font-mono uppercase transition-all ${
                      activeLot === idx
                        ? 'bg-[#ff3b00] text-black font-bold'
                        : 'bg-white/5 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    {lot.id}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Narrative Scroll Anchor */}
        <div className="max-w-7xl mx-auto w-full pt-16 flex justify-between items-end border-t border-white/10 mt-16 font-mono text-xs text-white/40">
          <span>01 / VOLCANIC TERROIR</span>
          <div className="flex items-center space-x-2 text-[#ff3b00]">
            <span className="uppercase tracking-widest text-[10px]">Scroll Narrative</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
          <span>GINZA ROASTING LAB</span>
        </div>
      </section>

      {/* 3. NARRATIVE CHAPTER 02: THE CHEMISTRY & ASYMMETRIC CRAFT */}
      <section className="px-8 py-32 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono text-[#ff3b00] uppercase tracking-[0.3em]">02 / FERMENTATION CHEMISTRY</span>
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-[0.95] text-[#f3ebd9]">
              120 Hours of Oxygen Deprivation.
            </h2>
            <p className="text-white/60 text-base leading-relaxed">
              Standard coffee processing dries fruit under sunlight. KURO seal whole cherries inside pressurized stainless-steel vats with nitrogen gas, inducing carbonation that breaks down complex fruit sugars into wild floral esters.
            </p>

            <div className="pt-4 space-y-4 font-mono text-xs border-t border-white/10">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40 uppercase">Vat Temperature Control</span>
                <span className="text-[#ff3b00] font-bold">Strict 18°C Thermal Stability</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40 uppercase">Brix Sugar Concentration</span>
                <span className="text-white font-bold">24.5° Brix Peak Harvest</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            <div className="bg-[#0f0f15] border border-white/10 p-8 space-y-4 relative">
              <Flame className="w-8 h-8 text-[#ff3b00]" />
              <h4 className="text-2xl font-bold">Cast-Iron Thermal Inertia</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Custom 1968 Fuji Royal drum roaster modified with solid cast-iron plates to maintain conductive heat transfer without scorching organic oils.
              </p>
            </div>

            <div className="bg-[#0f0f15] border border-white/10 p-8 space-y-4 relative sm:translate-y-8">
              <Compass className="w-8 h-8 text-[#ff3b00]" />
              <h4 className="text-2xl font-bold">Optical Color Sorting</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Every batch passes through infrared camera sorters, discarding any bean deviating by more than 0.5% from our master roast curve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NARRATIVE CHAPTER 03: DISPROPORTIONATE MONOLITH SUBSCRIPTION */}
      <section className="px-8 py-32 bg-[#050507]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
            <div>
              <span className="text-xs font-mono text-[#ff3b00] uppercase tracking-[0.3em]">03 / CEREMONIAL SUBSCRIPTION</span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2">The Collector’s Reserve.</h2>
            </div>
            <p className="text-white/50 text-sm max-w-md mt-4 md:mt-0 font-mono">
              Never drink stale coffee again. Freshly roasted micro-lots shipped within 24 hours of roasting.
            </p>
          </div>

          {/* THE MONOLITH SUBSCRIPTION CARD */}
          <div className="bg-[#0d0d12] border-2 border-[#ff3b00] p-12 lg:p-16 relative overflow-hidden shadow-[0_0_80px_rgba(255,59,0,0.15)]">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-block px-3 py-1 bg-[#ff3b00] text-black font-mono text-[10px] uppercase font-bold tracking-widest">
                  Bi-Weekly Allocation
                </div>

                <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                  Grand Reserve Tier
                </h3>

                <p className="text-white/70 text-lg font-light leading-relaxed">
                  2 Bags (250g each) of our highest-scoring SCA 93+ anaerobic micro-lots. Includes tasting cards, origin maps, and brew guides signed by our Head Roaster.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs text-white/80 pt-4">
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-[#ff3b00]" />
                    <span>Air-Shipped Direct from Ginza</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-[#ff3b00]" />
                    <span>Pause or Cancel in 1-Click</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-[#ff3b00]" />
                    <span>Nitrogen-Flushed Valve Bags</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-[#ff3b00]" />
                    <span>Exclusive Off-Market Lots</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#050507] border border-white/15 p-8 space-y-6 text-center">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest block">Subscription Price</span>
                <div className="text-5xl md:text-6xl font-extrabold text-white">
                  $48 <span className="text-sm font-normal text-white/40 font-mono">/ bi-weekly</span>
                </div>
                <p className="text-xs text-white/50 font-mono">Includes Complimentary Worldwide DHL Express Shipping</p>

                <button
                  onClick={() => setCartCount(c => c + 1)}
                  className="w-full py-5 bg-[#ff3b00] text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg shadow-[#ff3b00]/20"
                >
                  Start Reserve Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-16 border-t border-white/10 text-center font-mono text-xs text-white/40 space-y-4">
        <p>© 2026 KURO Coffee Roasters Tokyo • Ginza 4-Chome, Chuo City, Tokyo</p>
        <p className="text-[10px] text-[#ff3b00]">Art-Directed by UIOS Creative Director Engine & Intelligence Compiler</p>
      </footer>
    </div>
  );
}

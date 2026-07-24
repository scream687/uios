'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Flame, Compass, ChevronDown, Check, ShoppingBag, Sparkles, Wind, Layers, Activity, Thermometer, MapPin, Sliders } from 'lucide-react';

export default function KuroCoffeeShopPage() {
  const [activeTab, setActiveTab] = useState<'terroir' | 'fermentation' | 'roasting' | 'cupping'>('terroir');
  const [selectedElevation, setSelectedElevation] = useState<number>(2100);
  const [fermentationHours, setFermentationHours] = useState<number>(120);
  const [activeLot, setActiveLot] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);

  const microLots = [
    {
      id: 'lot-804',
      name: 'Geisha Village Reserve',
      origin: 'Bench Maji, Ethiopia • 2,100m',
      process: 'Anaerobic Slow Natural (120 hrs)',
      notes: ['White Jasmine', 'Bergamot', 'Wild Peach'],
      score: '94.5 SCA',
      price: '$42',
      terroirData: { soil: 'Volcanic Basalt Ash', brix: '24.5°', moisture: '10.8%' },
    },
    {
      id: 'lot-902',
      name: 'El Paraiso Pink Bourbon',
      origin: 'Cauca, Colombia • 1,950m',
      process: 'Thermal Shock Anaerobic',
      notes: ['Pink Guava', 'Lychee', 'Rose Water'],
      score: '93.8 SCA',
      price: '$48',
      terroirData: { soil: 'Andean Volcanic Loam', brix: '25.1°', moisture: '11.2%' },
    },
  ];

  const currentLot = microLots[activeLot];

  return (
    <div className="min-h-screen bg-[#050507] text-[#f3ebd9] font-sans antialiased selection:bg-[#ff3b00] selection:text-white relative overflow-x-hidden">
      {/* Background Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] z-50" />

      {/* 1. Header Bar - Asymmetric Floating Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#050507]/90 backdrop-blur-2xl border-b border-white/10 px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-10 h-10 bg-[#ff3b00] text-black font-mono font-black text-xl flex items-center justify-center -rotate-1 shadow-[0_0_30px_rgba(255,59,0,0.5)]">
              黒
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tighter text-[#f3ebd9] block leading-none">KURO</span>
              <span className="text-[9px] font-mono uppercase text-[#ff3b00] tracking-[0.3em]">Ginza Tokyo • UIOS Agent Curated</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-10 text-xs font-mono uppercase tracking-[0.2em] text-white/50">
            <a href="#terroir" className="hover:text-[#ff3b00] transition-colors">01 / Terroir Map</a>
            <a href="#fermentation" className="hover:text-[#ff3b00] transition-colors">02 / Fermentation Vat</a>
            <a href="#roasting" className="hover:text-[#ff3b00] transition-colors">03 / Roast Physics</a>
            <a href="#subscription" className="hover:text-[#ff3b00] transition-colors">04 / Allocation</a>
          </nav>

          <button
            onClick={() => setCartCount(c => c + 1)}
            className="px-6 py-3 bg-[#f3ebd9]/10 border border-[#f3ebd9]/20 hover:bg-[#ff3b00] hover:text-black hover:border-[#ff3b00] transition-all flex items-center space-x-3 text-xs font-mono rounded-none"
          >
            <ShoppingBag className="w-4 h-4 text-[#ff3b00]" />
            <span>Bag ({cartCount})</span>
          </button>
        </div>
      </header>

      {/* 2. SCENE 1: CINEMATIC TERROIR HERO (100VH DOMINANT SCENE) */}
      <section className="relative h-screen w-full flex flex-col justify-between pt-32 pb-16 px-8 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff3b00]/20 via-transparent to-transparent opacity-70 animate-pulse pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-20 grid lg:grid-cols-12 gap-8 items-end my-auto">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-[#ff3b00]/10 border border-[#ff3b00]/40 text-[#ff3b00] text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UIOS Scene Composer • Volcanic Monolith Viewport</span>
            </div>

            <h1 className="text-6xl sm:text-8xl lg:text-[130px] font-black tracking-[-0.065em] leading-[0.88] text-[#f3ebd9]">
              Volcanic <br />
              <span className="italic font-serif font-normal text-white/40">Soil & Smoke.</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#f3ebd9]/70 font-light max-w-2xl leading-relaxed pt-2">
              Micro-lots grown in Ethiopian volcanic ash at 2,100 meters. Anaerobic nitrogen fermentation and cast-iron roasting in Ginza.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 pt-4">
              <button
                onClick={() => setCartCount(c => c + 1)}
                className="px-10 py-5 bg-[#ff3b00] text-black font-bold text-xs uppercase tracking-[0.25em] hover:bg-white transition-all shadow-[0_0_50px_rgba(255,59,0,0.4)] flex items-center justify-center space-x-4"
              >
                <span>Acquire Reserve Batch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* OVERLAPPING HERO MONOLITH TELEMETRY CARD */}
          <div className="lg:col-span-4 relative z-30 lg:translate-y-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0c0c10] border border-[#ff3b00]/40 p-8 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative overflow-hidden backdrop-blur-md"
            >
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#ff3b00] uppercase tracking-[0.2em]">FEATURED LOT</span>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight mt-1">{currentLot.name}</h3>
                  <p className="text-xs font-mono text-white/50">{currentLot.origin}</p>
                </div>
                <span className="text-xl font-mono font-bold text-[#ff3b00]">{currentLot.price}</span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-white/40 tracking-widest block">Flavor Profile</span>
                <div className="flex flex-wrap gap-2">
                  {currentLot.notes.map((note, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-[#f3ebd9]">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

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
        <div className="max-w-7xl mx-auto w-full relative z-20 flex justify-between items-center font-mono text-xs text-white/40 pt-8 border-t border-white/10">
          <span>01 / 06 EXPERIENCE NARRATIVE</span>
          <a href="#terroir" className="flex items-center space-x-2 text-[#ff3b00] hover:text-white transition-colors">
            <span className="uppercase tracking-widest text-[10px]">Explore Interactive Modules</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
          <span>GINZA ROASTING LAB</span>
        </div>
      </section>

      {/* 3. DOMAIN EXPERIENCE MODULE 01: INTERACTIVE TERROIR ELEVATION MAP */}
      <section id="terroir" className="px-8 py-32 border-b border-white/10 bg-[#050507]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-[#ff3b00] uppercase tracking-[0.3em]">DOMAIN EXPERIENCE MODULE 01</span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2">Terroir Elevation Simulator.</h2>
            </div>
            <p className="text-white/50 text-sm max-w-md font-mono mt-4 md:mt-0">
              Adjust altitude parameters to simulate bean density and sugar concentration at high elevation.
            </p>
          </div>

          <div className="bg-[#0b0b0f] border border-white/15 p-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs text-white/60">
                  <span>ALTITUDE SIMULATOR</span>
                  <span className="text-[#ff3b00] font-bold">{selectedElevation} METERS</span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="2400"
                  step="50"
                  value={selectedElevation}
                  onChange={(e) => setSelectedElevation(Number(e.target.value))}
                  className="w-full accent-[#ff3b00] bg-white/10 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 font-mono text-xs">
                <div className="bg-white/5 p-4 border border-white/10">
                  <span className="text-white/40 block text-[10px]">Bean Density</span>
                  <span className="text-lg font-bold text-white">{(selectedElevation * 0.00065).toFixed(2)} g/cm³</span>
                </div>
                <div className="bg-white/5 p-4 border border-white/10">
                  <span className="text-white/40 block text-[10px]">Brix Sugar</span>
                  <span className="text-lg font-bold text-[#ff3b00]">{(selectedElevation * 0.0116).toFixed(1)}° Brix</span>
                </div>
                <div className="bg-white/5 p-4 border border-white/10">
                  <span className="text-white/40 block text-[10px]">Acidity Potential</span>
                  <span className="text-lg font-bold text-white">{selectedElevation > 2000 ? 'High Phosphoric' : 'Citric Balanced'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#050507] border border-white/10 p-8 space-y-6">
              <div className="flex items-center space-x-3 text-[#ff3b00] font-mono text-xs">
                <MapPin className="w-4 h-4" />
                <span className="uppercase">Bench Maji Volcanic Belt</span>
              </div>
              <h4 className="text-2xl font-bold">Volcanic Basalt Ash Composition</h4>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                At {selectedElevation}m, cold mountain nights delay cherry ripening by 45 days. This extended maturation forces the plant to channel nutrients into dense seeds, yielding bright jasmine aromatics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DOMAIN EXPERIENCE MODULE 02: ANAEROBIC FERMENTATION CHAMBER TELEMETRY */}
      <section id="fermentation" className="px-8 py-32 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-[#ff3b00] uppercase tracking-[0.3em]">DOMAIN EXPERIENCE MODULE 02</span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2">Anaerobic Fermentation Chrono Vat.</h2>
            </div>
            <p className="text-white/50 text-sm max-w-md font-mono mt-4 md:mt-0">
              Interactive nitrogen vat pressure simulation across 120 hours of sealed fermentation.
            </p>
          </div>

          <div className="bg-[#0b0b0f] border border-white/15 p-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs text-white/60">
                  <span>FERMENTATION DURATION</span>
                  <span className="text-[#ff3b00] font-bold">{fermentationHours} HOURS</span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="160"
                  step="8"
                  value={fermentationHours}
                  onChange={(e) => setFermentationHours(Number(e.target.value))}
                  className="w-full accent-[#ff3b00] bg-white/10 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 font-mono text-xs">
                <div className="bg-white/5 p-4 border border-white/10">
                  <span className="text-white/40 block text-[10px]">Vat Pressure</span>
                  <span className="text-lg font-bold text-white">{(fermentationHours * 0.025).toFixed(1)} PSI</span>
                </div>
                <div className="bg-white/5 p-4 border border-white/10">
                  <span className="text-white/40 block text-[10px]">pH Level</span>
                  <span className="text-lg font-bold text-[#ff3b00]">{(5.8 - fermentationHours * 0.012).toFixed(2)} pH</span>
                </div>
                <div className="bg-white/5 p-4 border border-white/10">
                  <span className="text-white/40 block text-[10px]">Ester Aroma</span>
                  <span className="text-lg font-bold text-white">{fermentationHours >= 120 ? 'Intense Bergamot' : 'Subtle Citrus'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#050507] border border-white/10 p-8 space-y-6">
              <div className="flex items-center space-x-3 text-[#ff3b00] font-mono text-xs">
                <Activity className="w-4 h-4" />
                <span>CHAMBER CHRONO-TELEMETRY</span>
              </div>
              <h4 className="text-2xl font-bold">Pressurized Nitrogen Environment</h4>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                At {fermentationHours} hours, oxygen is entirely purged. Wild yeasts ferment organic acids into complex floral esters without vinegar oxidation, unlocking rare bergamot and wild peach aromatics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DOMAIN EXPERIENCE MODULE 03: GINZA CAST-IRON ROAST CURVE TELEMETRY */}
      <section id="roasting" className="px-8 py-32 border-b border-white/10 bg-[#050507]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-[#ff3b00] uppercase tracking-[0.3em]">DOMAIN EXPERIENCE MODULE 03</span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2">Ginza Cast-Iron Roast Curve.</h2>
            </div>
            <p className="text-white/50 text-sm max-w-md font-mono mt-4 md:mt-0">
              Custom Fuji Royal roaster conductive heat curve and optical sorter tolerances.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 font-mono text-xs">
            <div className="bg-[#0b0b0f] border border-white/15 p-8 space-y-4">
              <Flame className="w-8 h-8 text-[#ff3b00]" />
              <h4 className="text-lg font-bold text-white">Cast-Iron Conductive Plate</h4>
              <p className="text-white/50 leading-relaxed">Solid 1968 Fuji Royal cast-iron drum maintains even conductive heat transfer to preserve aromatic oils.</p>
            </div>
            <div className="bg-[#0b0b0f] border border-white/15 p-8 space-y-4">
              <Wind className="w-8 h-8 text-[#ff3b00]" />
              <h4 className="text-lg font-bold text-white">Variable Exhaust Velocity</h4>
              <p className="text-white/50 leading-relaxed">Variable exhaust airflow removes chaff in milliseconds to prevent smokiness and preserve acidity.</p>
            </div>
            <div className="bg-[#0b0b0f] border border-white/15 p-8 space-y-4">
              <Compass className="w-8 h-8 text-[#ff3b00]" />
              <h4 className="text-lg font-bold text-white">Infrared Color Sorting</h4>
              <p className="text-white/50 leading-relaxed">Infrared camera sorters discard any bean deviating by more than 0.5% from our master roast curve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DOMAIN EXPERIENCE MODULE 04: DISPROPORTIONATE MONOLITH SUBSCRIPTION */}
      <section id="subscription" className="px-8 py-32 bg-[#050507]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
            <div>
              <span className="text-xs font-mono text-[#ff3b00] uppercase tracking-[0.3em]">DOMAIN EXPERIENCE MODULE 04</span>
              <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight mt-2">The Collector’s Reserve.</h2>
            </div>
            <p className="text-white/50 text-sm max-w-md font-mono mt-4 md:mt-0">
              Freshly roasted micro-lots shipped within 24 hours of roasting. Pause or cancel anytime.
            </p>
          </div>

          <div className="bg-[#0c0c10] border-2 border-[#ff3b00] p-12 lg:p-20 relative overflow-hidden shadow-[0_0_100px_rgba(255,59,0,0.2)]">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-block px-3 py-1 bg-[#ff3b00] text-black font-mono text-[10px] uppercase font-bold tracking-widest">
                  Bi-Weekly Allocation
                </div>

                <h3 className="text-4xl md:text-7xl font-black tracking-tight text-white">
                  Grand Reserve Tier
                </h3>

                <p className="text-white/70 text-xl font-light leading-relaxed">
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

              <div className="lg:col-span-5 bg-[#050507] border border-white/20 p-10 space-y-8 text-center shadow-2xl">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest block">Allocation Price</span>
                <div className="text-6xl md:text-7xl font-extrabold text-white">
                  $48 <span className="text-sm font-normal text-white/40 font-mono">/ bi-weekly</span>
                </div>
                <p className="text-xs text-white/50 font-mono">Includes Complimentary Worldwide DHL Express Shipping</p>

                <button
                  onClick={() => setCartCount(c => c + 1)}
                  className="w-full py-5 bg-[#ff3b00] text-black font-bold text-xs uppercase tracking-[0.25em] hover:bg-white transition-all shadow-xl shadow-[#ff3b00]/30"
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
        <p className="text-[10px] text-[#ff3b00]">Curated by UIOS Agents, Skills & Scene Composer Engine</p>
      </footer>
    </div>
  );
}

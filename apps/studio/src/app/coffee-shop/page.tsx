'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Flame, Compass, ChevronDown, Check, ShoppingBag, Sparkles, Wind, Activity, MapPin, RefreshCw, Zap, Eye, Sliders } from 'lucide-react';

export default function KuroCoffeeShopPage() {
  const [mounted, setMounted] = useState(false);
  const [activeLot, setActiveLot] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  const [selectedElevation, setSelectedElevation] = useState<number>(2100);
  const [fermentationHours, setFermentationHours] = useState<number>(120);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });

  // Motion Transforms for Motion-Heavy Scroll Effects
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.88]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.15]);
  const heroRotateX = useTransform(smoothProgress, [0, 0.25], [0, 12]);
  
  const cardRotateY = useTransform(smoothProgress, [0.05, 0.3], [-10, 10]);
  const terroirY = useTransform(smoothProgress, [0.15, 0.4], [80, 0]);
  const terroirOpacity = useTransform(smoothProgress, [0.15, 0.35], [0, 1]);

  const microLots = [
    {
      id: 'lot-804',
      name: 'Geisha Village Reserve',
      origin: 'Bench Maji, Ethiopia • 2,100m',
      process: 'Anaerobic Slow Natural (120 hrs)',
      notes: ['White Jasmine', 'Bergamot', 'Wild Peach'],
      score: '94.5 SCA',
      price: '$42',
    },
    {
      id: 'lot-902',
      name: 'El Paraiso Pink Bourbon',
      origin: 'Cauca, Colombia • 1,950m',
      process: 'Thermal Shock Anaerobic',
      notes: ['Pink Guava', 'Lychee', 'Rose Water'],
      score: '93.8 SCA',
      price: '$48',
    },
  ];

  const currentLot = microLots[activeLot];

  return (
    <div className="min-h-screen bg-[#050507] text-[#f3ebd9] font-sans antialiased selection:bg-[#ff3b00] selection:text-white relative overflow-x-hidden">
      {/* 1. SCROLL PROGRESS BAR HEADER */}
      {mounted && (
        <motion.div
          style={{ scaleX: smoothProgress }}
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff3b00] via-[#ff7700] to-[#ff3b00] origin-left z-50 shadow-[0_0_20px_#ff3b00]"
        />
      )}

      {/* Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] z-40" />

      {/* 2. NAVIGATION HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#050507]/85 backdrop-blur-2xl border-b border-white/10 px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-6"
          >
            <div className="w-10 h-10 bg-[#ff3b00] text-black font-mono font-black text-xl flex items-center justify-center -rotate-1 shadow-[0_0_30px_rgba(255,59,0,0.5)]">
              黒
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tighter text-[#f3ebd9] block leading-none">KURO</span>
              <span className="text-[9px] font-mono uppercase text-[#ff3b00] tracking-[0.3em]">Ginza Tokyo • 60FPS Scroll Motion</span>
            </div>
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-10 text-xs font-mono uppercase tracking-[0.2em] text-white/50">
            <a href="#terroir" className="hover:text-[#ff3b00] transition-colors">01 / Terroir Map</a>
            <a href="#fermentation" className="hover:text-[#ff3b00] transition-colors">02 / Vat Science</a>
            <a href="#roasting" className="hover:text-[#ff3b00] transition-colors">03 / Roast Physics</a>
            <a href="#subscription" className="hover:text-[#ff3b00] transition-colors">04 / Allocation</a>
          </nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCartCount(c => c + 1)}
            className="px-6 py-3 bg-[#f3ebd9]/10 border border-[#f3ebd9]/20 hover:bg-[#ff3b00] hover:text-black hover:border-[#ff3b00] transition-all flex items-center space-x-3 text-xs font-mono rounded-none"
          >
            <ShoppingBag className="w-4 h-4 text-[#ff3b00]" />
            <span>Bag ({cartCount})</span>
          </motion.button>
        </div>
      </header>

      {/* 3. SCENE 1: CINEMATIC SCROLL-DRIVEN MOTION HERO (100VH) */}
      <section className="relative h-screen w-full flex flex-col justify-between pt-32 pb-16 px-8 border-b border-white/10 overflow-hidden">
        {/* Animated Particle & Fog Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff3b00]/25 via-transparent to-transparent opacity-80 animate-pulse pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-20 grid lg:grid-cols-12 gap-8 items-end my-auto">
          {/* Scroll Transform Headline */}
          <motion.div
            style={mounted ? { scale: heroScale, opacity: heroOpacity, rotateX: heroRotateX } : {}}
            className="lg:col-span-8 space-y-6"
          >
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-[#ff3b00]/10 border border-[#ff3b00]/40 text-[#ff3b00] text-xs font-mono tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ff3b00] animate-ping" />
              <span>UIOS Scene Engine • 60FPS Scroll Kinematics</span>
            </div>

            <h1 className="text-6xl sm:text-8xl lg:text-[130px] font-black tracking-[-0.065em] leading-[0.88] text-[#f3ebd9]">
              Volcanic <br />
              <span className="italic font-serif font-normal text-white/40">Soil & Smoke.</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#f3ebd9]/70 font-light max-w-2xl leading-relaxed pt-2">
              High-altitude micro-lots grown in Ethiopian volcanic ash at 2,100 meters. Anaerobic nitrogen fermentation and cast-iron roasting in Ginza.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 pt-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCartCount(c => c + 1)}
                className="px-10 py-5 bg-[#ff3b00] text-black font-bold text-xs uppercase tracking-[0.25em] hover:bg-white transition-all shadow-[0_0_50px_rgba(255,59,0,0.4)] flex items-center justify-center space-x-4"
              >
                <span>Acquire Reserve Batch</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* 3D ROTATIONAL PARALLAX HERO MONOLITH */}
          <div className="lg:col-span-4 relative z-30 lg:translate-y-16">
            <motion.div
              style={mounted ? { rotateY: cardRotateY } : {}}
              className="bg-[#0c0c10] border border-[#ff3b00]/40 p-8 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative overflow-hidden backdrop-blur-md perspective-1000"
            >
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#ff3b00] uppercase tracking-[0.2em]">SINGLE ORIGIN RESERVE</span>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight mt-1">{currentLot.name}</h3>
                  <p className="text-xs font-mono text-white/50">{currentLot.origin}</p>
                </div>
                <span className="text-xl font-mono font-bold text-[#ff3b00]">{currentLot.price}</span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-white/40 tracking-widest block">Flavor Spectrum</span>
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

        {/* Narrative Anchor */}
        <div className="max-w-7xl mx-auto w-full relative z-20 flex justify-between items-center font-mono text-xs text-white/40 pt-8 border-t border-white/10">
          <span>01 / 06 MOTION SCENE</span>
          <a href="#terroir" className="flex items-center space-x-2 text-[#ff3b00] hover:text-white transition-colors">
            <span className="uppercase tracking-widest text-[10px]">Scroll Motion Journey</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
          <span>GINZA ROAST LAB</span>
        </div>
      </section>

      {/* 4. SCROLL SECTION 02: INTERACTIVE ALTITUDE TERROIR SIMULATOR */}
      <section id="terroir" className="px-8 py-32 border-b border-white/10 bg-[#050507]">
        <motion.div
          style={mounted ? { y: terroirY, opacity: terroirOpacity } : {}}
          className="max-w-7xl mx-auto space-y-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-[#ff3b00] uppercase tracking-[0.3em]">DOMAIN EXPERIENCE MODULE 01</span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2">Terroir Altitude Kinematics.</h2>
            </div>
            <p className="text-white/50 text-sm max-w-md font-mono mt-4 md:mt-0">
              Interactive altitude physics engine simulating bean density and sugar concentration.
            </p>
          </div>

          <div className="bg-[#0b0b0f] border border-white/15 p-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs text-white/60">
                  <span>ALTITUDE PARAMETER</span>
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
                  <span className="text-lg font-bold text-white">{selectedElevation > 2000 ? 'Phosphoric High' : 'Citric Balanced'}</span>
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
        </motion.div>
      </section>

      {/* 5. SCROLL SECTION 03: ANAEROBIC FERMENTATION CHRONO VAT TELEMETRY */}
      <section id="fermentation" className="px-8 py-32 border-b border-white/10 bg-[#08080c]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-[#ff3b00] uppercase tracking-[0.3em]">DOMAIN EXPERIENCE MODULE 02</span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2">Anaerobic Vat Chrono Simulation.</h2>
            </div>
            <p className="text-white/50 text-sm max-w-md font-mono mt-4 md:mt-0">
              Pressurized nitrogen vat pressure simulation across 120 hours of sealed fermentation.
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
                At {fermentationHours} hours, oxygen is entirely purged. Wild yeasts ferment organic acids into complex floral esters without vinegar oxidation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SCROLL SECTION 04: CEREMONIAL MONOLITH SUBSCRIPTION ALLOCATION */}
      <section id="subscription" className="px-8 py-32 bg-[#050507]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
            <div>
              <span className="text-xs font-mono text-[#ff3b00] uppercase tracking-[0.3em]">DOMAIN EXPERIENCE MODULE 03</span>
              <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight mt-2">The Collector’s Reserve.</h2>
            </div>
            <p className="text-white/50 text-sm max-w-md font-mono mt-4 md:mt-0">
              Freshly roasted micro-lots shipped within 24 hours of roasting. Pause or cancel anytime.
            </p>
          </div>

          {/* DISPROPORTIONATE MONOLITH CARD */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-[#0c0c10] border-2 border-[#ff3b00] p-12 lg:p-20 relative overflow-hidden shadow-[0_0_100px_rgba(255,59,0,0.2)]"
          >
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

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCartCount(c => c + 1)}
                  className="w-full py-5 bg-[#ff3b00] text-black font-bold text-xs uppercase tracking-[0.25em] hover:bg-white transition-all shadow-xl shadow-[#ff3b00]/30"
                >
                  Start Reserve Subscription
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-16 border-t border-white/10 text-center font-mono text-xs text-white/40 space-y-4">
        <p>© 2026 KURO Coffee Roasters Tokyo • Ginza 4-Chome, Chuo City, Tokyo</p>
        <p className="text-[10px] text-[#ff3b00]">Motion-Driven & Compiled by UIOS Scene Composer & Framer Motion Physics Engine</p>
      </footer>
    </div>
  );
}

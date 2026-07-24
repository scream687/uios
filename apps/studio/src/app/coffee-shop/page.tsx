'use me client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ArrowRight, Check, Sparkles, Shield, Star, RefreshCw, ShoppingBag, Clock } from 'lucide-react';

export default function KuroCoffeeShopPage() {
  const [activeTab, setActiveTab] = useState<'roasts' | 'subscriptions' | 'story'>('roasts');
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro'>('starter');
  const [cartCount, setCartCount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans antialiased selection:bg-[#e2ff00] selection:text-black">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-50 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#e2ff00] flex items-center justify-center text-black font-extrabold text-xl shadow-[0_0_20px_rgba(226,255,0,0.3)]">
              K
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block leading-none">KURO</span>
              <span className="text-[10px] font-mono uppercase text-[#e2ff00] tracking-widest">Tokyo Single Origin</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/70">
            <button
              onClick={() => setActiveTab('roasts')}
              className={`hover:text-white transition-colors ${activeTab === 'roasts' ? 'text-[#e2ff00] font-semibold' : ''}`}
            >
              Single Origin
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`hover:text-white transition-colors ${activeTab === 'subscriptions' ? 'text-[#e2ff00] font-semibold' : ''}`}
            >
              Subscriptions
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`hover:text-white transition-colors ${activeTab === 'story' ? 'text-[#e2ff00] font-semibold' : ''}`}
            >
              Our Process
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCartCount(c => c + 1)}
              className="relative px-4 py-2 bg-white/5 border border-white/15 rounded-xl hover:bg-white/10 transition-all flex items-center space-x-2 text-xs font-mono"
            >
              <ShoppingBag className="w-4 h-4 text-[#e2ff00]" />
              <span>Cart ({cartCount})</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#e2ff00]/10 border border-[#e2ff00]/30 text-[#e2ff00] text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Trade • Roasted in Ginza</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-[-0.045em] leading-[0.98]">
              Architectural <br />
              <span className="italic font-serif font-normal text-white/80">Precision Coffee.</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl font-light max-w-lg leading-relaxed">
              Rare micro-lots sourced directly from high-altitude volcanic soils, precision roasted to bring out citrus blossoms and black currant notes.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={() => setCartCount(c => c + 1)}
                className="px-8 py-4 bg-[#e2ff00] text-black font-bold text-sm tracking-wide uppercase rounded-2xl hover:bg-[#cbe600] transition-all flex items-center justify-center space-x-3 shadow-lg shadow-[#e2ff00]/20"
              >
                <span>Order Micro-Lot Box</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#131316] border border-white/15 rounded-3xl p-8 space-y-6 relative overflow-hidden group hover:border-[#e2ff00]/50 transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono text-[#e2ff00] uppercase tracking-widest">LOT NO. 804</span>
                <h3 className="text-3xl font-extrabold tracking-tight mt-1">Geisha Village Reserve</h3>
                <p className="text-sm text-white/60">Bench Maji, Ethiopia • 2,100m</p>
              </div>
              <span className="px-3 py-1 bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 rounded-full text-xs font-mono font-semibold">
                In Stock
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <span className="text-[11px] font-mono text-white/50 block uppercase">Process</span>
                <span className="text-sm font-semibold text-white">Anaerobic Natural</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-white/50 block uppercase">Notes</span>
                <span className="text-sm font-semibold text-[#e2ff00]">Jasmine & Bergamot</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-white/50 block uppercase">Score</span>
                <span className="text-sm font-bold text-white">94.5 SCA</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Subscription Pricing Tier */}
      <section className="px-6 py-24 bg-[#0d0d10] border-b border-white/10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Roaster's Choice Subscriptions</h2>
            <p className="text-white/60 max-w-xl mx-auto text-base">Freshly roasted beans delivered to your doorstep every two weeks. Pause or cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#131316] border border-white/15 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#e2ff00] uppercase tracking-widest">BI-WEEKLY</span>
                <h3 className="text-3xl font-extrabold">Filter Collector</h3>
                <p className="text-white/60 text-sm">2 bags (250g each) of single-origin filter roasts.</p>
                <div className="text-4xl font-extrabold text-white">
                  $38 <span className="text-sm text-white/40 font-normal">/ delivery</span>
                </div>
              </div>
              <button
                onClick={() => setCartCount(c => c + 1)}
                className="w-full py-4 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Subscribe Filter
              </button>
            </div>

            <div className="bg-[#131316] border-2 border-[#e2ff00] rounded-3xl p-8 space-y-6 flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 px-3 py-1 bg-[#e2ff00] text-black font-mono text-[10px] uppercase font-bold rounded-full">
                Most Popular
              </div>
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#e2ff00] uppercase tracking-widest">BI-WEEKLY</span>
                <h3 className="text-3xl font-extrabold">Omni Roast Master</h3>
                <p className="text-white/60 text-sm">3 bags of rare micro-lots including Geisha and Pink Bourbon varieties.</p>
                <div className="text-4xl font-extrabold text-white">
                  $54 <span className="text-sm text-white/40 font-normal">/ delivery</span>
                </div>
              </div>
              <button
                onClick={() => setCartCount(c => c + 1)}
                className="w-full py-4 bg-[#e2ff00] text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#cbe600] transition-all"
              >
                Subscribe Master
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-xs font-mono text-white/40">
        <p>© 2026 KURO Coffee Roasters Tokyo. Built deterministically by UIOS Design Intelligence Compiler.</p>
      </footer>
    </div>
  );
}

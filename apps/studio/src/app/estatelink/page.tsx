'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Check,
  PhoneCall,
  Plus,
  Box,
  CheckCircle2,
  X,
  Play,
  Zap,
  ShieldCheck,
  RotateCcw,
  Clock,
  Layers,
  Layout,
  Share2,
  Lock,
  Building2,
  SlidersHorizontal,
} from 'lucide-react';

export default function EstateLinkPage() {
  // Simulator State
  const [requestInput, setRequestInput] = useState('');
  const [requests, setRequests] = useState([
    { id: 1, title: '3D Render: Aspen Glass Pavilion Winter View', status: 'In Progress', delivery: '24 Hours' },
    { id: 2, title: 'Single-Link Presentation: Miami Brickell Penthouse', status: 'Queued', delivery: '48 Hours' },
    { id: 3, title: 'Virtual Staging: Austin Lake Waterfront Villa', status: 'Queued', delivery: '72 Hours' },
  ]);

  // Pricing State
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Booking Modal State
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestInput.trim()) return;
    setRequests([
      {
        id: Date.now(),
        title: requestInput,
        status: 'Queued',
        delivery: `${(requests.length + 1) * 24} Hours`,
      },
      ...requests,
    ]);
    setRequestInput('');
  };

  const marqueesRow1 = [
    '3D Floor Plans',
    'Virtual Staging',
    'Single Property Links',
    'Webflow Development',
    '4K Drone Walkthroughs',
    'Pitch Decks',
  ];

  const marqueesRow2 = [
    'CAD Architectural Renders',
    'Passcode Off-Market Gate',
    'Custom Agency Domains',
    'Interactive 3D Walkthroughs',
    'Digital QR Cards',
    'Social Ad Assets',
  ];

  const faqs = [
    {
      q: 'How fast will I receive my property presentation links & 3D renders?',
      a: 'On average, single property links and 3D architectural renders are delivered in just 2 business days or less. More complex multi-building developments are delivered iteratively every 24–48 hours.',
    },
    {
      q: 'How does the pause subscription feature work?',
      a: 'Billing cycles are based on a 31-day period. If you sign up, use EstateLink for 20 days to market a condo launch, and then pause, your billing cycle stops and you retain 11 unused days to reactivate anytime in the future.',
    },
    {
      q: 'Who creates the 3D renders and Webflow presentations?',
      a: 'EstateLink is operated directly by senior architectural visualizers and UI engineers. We never outsource to junior freelancers, ensuring uncompromising studio quality for every luxury property.',
    },
    {
      q: 'What software and platforms do you support?',
      a: '3D models are built in Unreal Engine 5, 3ds Max, and Blender. Web presentations are built directly in React/Next.js and Webflow with full custom domain support.',
    },
    {
      q: 'What if I need revisions on a render or layout?',
      a: 'No problem at all. We continue revising the 3D materials, lighting, angles, or web copy until you are 100% satisfied.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#ffffff] font-sans antialiased selection:bg-[#e2ff00] selection:text-[#080808] overflow-x-hidden">
      {/* HEADER BAR */}
      <header className="border-b border-white/10 bg-[#080808]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-10 h-10 rounded-2xl bg-[#e2ff00] flex items-center justify-center text-[#080808] font-bold text-xl font-mono shadow-[0_0_24px_rgba(226,255,0,0.5)] cursor-pointer"
            >
              EL
            </motion.div>
            <div>
              <span className="font-extrabold tracking-tight text-white text-xl flex items-center gap-2">
                EstateLink <span className="text-[#e2ff00] font-mono text-xs px-2 py-0.5 rounded bg-[#e2ff00]/10 border border-[#e2ff00]/30">REACT MOTION</span>
              </span>
              <p className="text-[10px] font-mono text-gray-400">DesignJoy-Inspired Real Estate Presentation OS</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#services" className="hover:text-[#e2ff00] transition-colors">Services</a>
            <a href="#simulator" className="hover:text-[#e2ff00] transition-colors">Live Queue</a>
            <a href="#pricing" className="hover:text-[#e2ff00] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors font-mono text-xs">
              ← UIOS Studio
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Book Call
            </button>
            <a
              href="#pricing"
              className="px-5 py-2.5 bg-[#e2ff00] hover:bg-[#cbe600] text-[#080808] font-bold text-sm rounded-xl flex items-center gap-2 shadow-[0_0_24px_rgba(226,255,0,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              See Pricing
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH DYNAMIC FRAMER MOTION */}
      <section className="relative pt-20 pb-28 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span>Available for 2 luxury real estate clients this month</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.02]">
              Real estate design subscriptions for <span className="italic font-serif font-normal text-[#e2ff00]">everyone</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl font-normal max-w-2xl leading-relaxed">
              Replace expensive render studios and slow marketing agencies for one fixed monthly fee. Get 3D architectural renders, luxury property presentation links, and Webflow sites delivered in days.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#pricing"
                className="px-8 py-4 bg-[#e2ff00] hover:bg-[#cbe600] text-[#080808] font-extrabold text-base rounded-2xl flex items-center gap-3 shadow-[0_0_30px_rgba(226,255,0,0.4)] transition-all transform hover:-translate-y-1"
              >
                <span>See Pricing</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#e2ff00]" />
                <span>Pause or cancel anytime</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Member Card with Hover 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <motion.div
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="bg-[#131315] border border-white/15 rounded-3xl p-8 shadow-2xl relative overflow-hidden space-y-6"
            >
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#e2ff00]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#e2ff00] text-[#080808] font-bold text-xs uppercase tracking-wider font-mono">
                  START TODAY
                </span>
                <span className="text-xs font-mono text-gray-400">One subscription to rule them all</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-extrabold text-white">Join EstateLink</h3>
                <p className="text-sm text-gray-400">Unlimited 3D renders, CAD walkthroughs, floor plans, and Webflow presentation links.</p>
              </div>

              {/* Sample Render Stage */}
              <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }} className="rounded-2xl border border-white/10 group">
                <img
                  src="/images/aspen.png"
                  alt="Aspen Villa 3D Render"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  className="group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-white flex items-center justify-between">
                  <span>Aspen Glass Pavilion Render</span>
                  <span className="text-[#e2ff00] font-bold">Delivered in 48h</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-[#e2ff00]" />
                  <span>Book a 15-min intro call</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DYNAMIC INFINITE MARQUEE CAROUSELS (DESIGNJOY SIGNATURE) */}
      <section className="py-12 border-b border-white/10 bg-[#0d0d0e] overflow-hidden">
        <div className="space-y-4">
          {/* Row 1: Left Animation */}
          <div className="flex overflow-hidden whitespace-nowrap">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="flex gap-4 shrink-0"
            >
              {[...marqueesRow1, ...marqueesRow1, ...marqueesRow1].map((item, idx) => (
                <span
                  key={idx}
                  className="px-6 py-3 rounded-full bg-[#131315] border border-white/10 text-sm font-mono text-gray-200 shadow-md inline-block"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Right Animation */}
          <div className="flex overflow-hidden whitespace-nowrap">
            <motion.div
              animate={{ x: ['-50%', '0%'] }}
              transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
              className="flex gap-4 shrink-0"
            >
              {[...marqueesRow2, ...marqueesRow2, ...marqueesRow2].map((item, idx) => (
                <span
                  key={idx}
                  className="px-6 py-3 rounded-full bg-[#131315] border border-white/10 text-sm font-mono text-[#e2ff00] shadow-md inline-block"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3-STEP MOTION CARD GRID) */}
      <section id="how-it-works" className="py-24 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 space-y-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              The way real estate design <span className="italic font-serif font-normal text-[#e2ff00]">should’ve</span> been done in the first place
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-[#131315] border border-white/10 hover:border-[#e2ff00]/50 p-8 rounded-3xl space-y-6 transition-all shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#e2ff00]/10 border border-[#e2ff00]/30 flex items-center justify-center text-[#e2ff00] font-bold text-xl font-mono">
                1
              </div>
              <h3 className="text-2xl font-bold text-white">Subscribe</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Subscribe to a plan & request as many 3D property renders, presentation links, or marketing materials as you’d like.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-[#131315] border border-white/10 hover:border-[#e2ff00]/50 p-8 rounded-3xl space-y-6 transition-all shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#e2ff00]/10 border border-[#e2ff00]/30 flex items-center justify-center text-[#e2ff00] font-bold text-xl font-mono">
                2
              </div>
              <h3 className="text-2xl font-bold text-white">Request</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Request whatever you’d like—from 3D exterior renders, virtual staging, pitch decks, single property sites, to Webflow developments.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-[#131315] border border-white/10 hover:border-[#e2ff00]/50 p-8 rounded-3xl space-y-6 transition-all shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#e2ff00]/10 border border-[#e2ff00]/30 flex items-center justify-center text-[#e2ff00] font-bold text-xl font-mono">
                3
              </div>
              <h3 className="text-2xl font-bold text-white">Receive</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Receive your presentation link or 3D render within two business days on average. Delivered iteratively until perfection.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SIMULATOR QUEUE ENGINE WITH ANIMATE PRESENCE */}
      <section id="simulator" className="py-24 border-b border-white/10 bg-[#0a0a0c]">
        <div className="max-w-[1400px] mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#e2ff00] uppercase tracking-wider mb-2">Interactive Trello Request Engine</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Test The EstateLink Request Board</h2>
            </div>
            <div className="text-xs font-mono text-gray-400">
              Avg Turnaround: <span className="text-[#e2ff00] font-bold">48 Hours</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Form */}
            <div className="lg:col-span-5 bg-[#131315] border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
              <label className="text-xs font-mono text-gray-300">Submit Real Estate Request</label>
              <form onSubmit={handleAddRequest} className="space-y-4">
                <textarea
                  rows={4}
                  value={requestInput}
                  onChange={(e) => setRequestInput(e.target.value)}
                  placeholder="e.g. 3D Architectural render of a luxury villa in Aspen..."
                  className="w-full bg-[#080808] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#e2ff00]"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#e2ff00] hover:bg-[#cbe600] text-[#080808] font-bold text-sm rounded-xl font-mono flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(226,255,0,0.3)]"
                >
                  <Plus className="w-4 h-4" /> Add To Trello Request Board
                </button>
              </form>
            </div>

            {/* Live Queue Cards */}
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-mono text-gray-400 mb-2 flex justify-between">
                <span>ACTIVE QUEUE ({requests.length} ITEMS)</span>
                <span>ESTIMATED DELIVERY</span>
              </div>

              <AnimatePresence>
                {requests.map((req) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-[#131315] border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-md hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Box className="w-4 h-4 text-[#e2ff00] shrink-0" />
                      <span className="text-sm font-medium text-white">{req.title}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                        {req.status}
                      </span>
                      <span className="text-[#e2ff00] font-bold">{req.delivery}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGNJOY SIGNATURE PRICING CARD WITH BILLING TOGGLE */}
      <section id="pricing" className="py-24 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="text-xs font-mono text-[#e2ff00] uppercase tracking-wider">PRICING</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              One subscription, <span className="italic font-serif font-normal text-[#e2ff00]">endless possibilities</span>
            </h2>

            {/* Billing Toggle Switch */}
            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full font-mono text-xs transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[#e2ff00] text-[#080808] font-bold shadow-md'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('quarterly')}
                className={`px-5 py-2 rounded-full font-mono text-xs transition-all ${
                  billingCycle === 'quarterly'
                    ? 'bg-[#e2ff00] text-[#080808] font-bold shadow-md'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                Quarterly (Save 20%)
              </button>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="max-w-xl mx-auto bg-[#131315] border-2 border-[#e2ff00] p-8 md:p-10 rounded-3xl space-y-8 relative shadow-[0_0_50px_rgba(226,255,0,0.25)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Monthly Club</h3>
                <p className="text-xs text-gray-400 font-mono mt-1">Pause or cancel anytime</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 text-xs font-mono font-bold uppercase">
                PAUSE OR CANCEL ANYTIME
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl md:text-6xl font-extrabold text-white font-mono">
                  {billingCycle === 'monthly' ? '$4,995' : '$3,995'}
                </span>
                <span className="text-gray-400 text-lg font-mono">/ month</span>
                <span className="line-through text-gray-500 text-xl font-mono">$5,995</span>
              </div>
              <p className="text-xs text-[#e2ff00] font-mono">
                {billingCycle === 'monthly' ? 'Lifetime Discount — Limited Time Offer' : 'Save $12,000/year with Quarterly Billing'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-300 pt-4 border-t border-white/10">
              <div className="space-y-3">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#e2ff00]" /> One request at a time</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#e2ff00]" /> Avg. 48 hour delivery</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#e2ff00]" /> Unlimited developments</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#e2ff00]" /> Webflow & React code</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#e2ff00]" /> 3D Architectural renders</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#e2ff00]" /> Up to 2 team seats</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#e2ff00]" /> Pause or cancel anytime</div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-4 bg-[#e2ff00] hover:bg-[#cbe600] text-[#080808] font-extrabold text-base rounded-2xl shadow-[0_0_30px_rgba(226,255,0,0.4)] transition-all font-sans"
              >
                Join Today
              </button>

              <div className="text-center text-[11px] text-gray-400 font-mono">
                Try it for a week — not loving it? Get 75% back, no questions asked.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ ACCORDION WITH ANIMATE PRESENCE */}
      <section id="faq" className="py-24 border-b border-white/10">
        <div className="max-w-[1000px] mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-extrabold text-white">
              <span className="italic font-serif font-normal text-[#e2ff00]">Frequently</span> asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#131315] border border-white/10 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 text-lg font-bold text-white hover:text-[#e2ff00] transition-colors"
                >
                  <span>{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === idx ? 180 : 0 }}>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING MODAL WITH FRAMER MOTION */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#131315] border border-white/20 rounded-3xl p-8 max-w-lg w-full relative space-y-6 shadow-2xl"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="text-xs font-mono text-[#e2ff00]">BOOK A 15-MIN CALL</div>
                <h3 className="text-2xl font-bold text-white">Schedule Your EstateLink Intro</h3>
                <p className="text-xs text-gray-400">Learn how EstateLink replaces traditional 3D render studios for your luxury property portfolio.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert('Call scheduled successfully!'); setModalOpen(false); }} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-gray-300">Full Name</label>
                  <input required type="text" placeholder="Marcus Sterling" className="w-full mt-1 bg-[#080808] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e2ff00]" />
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-300">Work Email</label>
                  <input required type="email" placeholder="marcus@sterlingdevelopments.com" className="w-full mt-1 bg-[#080808] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e2ff00]" />
                </div>

                <button type="submit" className="w-full py-3 bg-[#e2ff00] hover:bg-[#cbe600] text-[#080808] font-bold text-sm rounded-xl font-mono shadow-lg transition-all">
                  Confirm 15-Min Intro Call
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#080808] py-12 text-xs font-mono text-gray-500">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Building2 className="w-4 h-4 text-[#e2ff00]" />
            <span>© 2026 EstateLink • Inspired by DesignJoy.co • Powered by Framer Motion</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">UIOS Studio</Link>
            <Link href="/real-estate-saas" className="hover:text-white transition-colors">SaaS Demo</Link>
            <Link href="https://github.com/scream687/uios" target="_blank" className="hover:text-white transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

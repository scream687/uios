'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Play,
  CheckCircle2,
  Zap,
  ArrowRight,
  ChevronDown,
  Building2,
  Layers,
  Clock,
  ShieldCheck,
  RotateCcw,
  Check,
  PhoneCall,
  Calendar,
  X,
  Plus,
  Box,
  Palette,
  Layout,
  FileCode,
} from 'lucide-react';

export default function EstateJoyRealEstatePage() {
  // State for request queue simulator
  const [requestText, setRequestText] = useState('3D Architectural render of a 50-story glass luxury penthouse tower in Miami Brickell with infinity sky pool');
  const [requests, setRequests] = useState([
    { id: 1, title: '3D Render: Aspen Glass Villa Winter View', status: 'In Progress (Delivery in 24h)', estHours: 24 },
    { id: 2, title: 'Interactive Webflow Site: Austin Waterfront Estate', status: 'Queued', estHours: 48 },
    { id: 3, title: 'Virtual Staging: Solara Commercial Tower Lobby', status: 'Queued', estHours: 72 },
  ]);

  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const addRequest = () => {
    if (!requestText.trim()) return;
    setRequests([
      ...requests,
      { id: Date.now(), title: requestText, status: 'Queued', estHours: (requests.length + 1) * 24 },
    ]);
    setRequestText('');
  };

  const faqs = [
    {
      q: 'How fast will I receive my real estate designs & 3D renders?',
      a: 'On average, most single 3D renders or landing page sections are completed in just two business days or less. Full-scale architectural walkthroughs or complex Webflow sites are delivered iteratively every 24-48 hours.',
    },
    {
      q: 'How does the pause feature work?',
      a: 'Billing cycles are based on a 31-day period. If you subscribe and use the service for 20 days to launch your condo project, and then pause, you preserve the remaining 11 days of service to use anytime in the future.',
    },
    {
      q: 'Who are the designers & 3D visualizers?',
      a: 'EstateJoy is operated directly by senior architectural visualizers and UI architects. We do not hire junior freelancers or outsource work, ensuring top-tier studio fidelity for every render.',
    },
    {
      q: 'What software do you design and render in?',
      a: '3D renders and architectural models are built in Unreal Engine 5, 3ds Max, and Blender. Web interfaces and landing pages are crafted in Figma and developed directly in Webflow or React/Next.js.',
    },
    {
      q: 'What if I do not like a 3D render or layout?',
      a: 'No worries! We will continue to revise the render, materials, lighting, or layout until you are 100% satisfied.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#ffffff] font-sans antialiased selection:bg-[#e2ff00] selection:text-[#080808]">
      {/* Top Header Bar */}
      <header className="border-b border-white/10 bg-[#080808]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#e2ff00] flex items-center justify-center text-[#080808] font-bold text-xl font-mono shadow-[0_0_24px_rgba(226,255,0,0.5)]">
              EJ
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-white text-xl font-sans flex items-center gap-2">
                EstateJoy <span className="text-[#e2ff00] font-normal text-xs font-mono px-2 py-0.5 rounded bg-[#e2ff00]/10 border border-[#e2ff00]/30">DESIGNJOY ARCHETYPE</span>
              </span>
              <p className="text-[10px] font-mono text-gray-400">#1 Real Estate Design & 3D Render Subscription Service</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#services" className="hover:text-[#e2ff00] transition-colors">Services</a>
            <a href="#pricing" className="hover:text-[#e2ff00] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#e2ff00] transition-colors">FAQ</a>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors font-mono text-xs">
              ← UIOS Studio
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Book Call
            </button>

            <a
              href="#pricing"
              className="px-5 py-2.5 bg-[#e2ff00] hover:bg-[#cbe600] text-[#080808] font-bold text-sm rounded-xl flex items-center gap-2 shadow-[0_0_24px_rgba(226,255,0,0.4)] transition-all"
            >
              <span>See Pricing</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION (DesignJoy Layout) */}
      <section className="relative pt-16 pb-24 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span>Available for 2 new real estate development clients this month</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.02]">
              Real estate design subscriptions for <span className="italic font-serif font-normal text-[#e2ff00]">everyone</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl font-normal max-w-2xl">
              Replace slow 3D render studios and expensive marketing agencies for one fixed monthly fee. Get 3D architectural renders, luxury property landing pages, and Webflow sites delivered in days.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#pricing"
                className="px-8 py-4 bg-[#e2ff00] hover:bg-[#cbe600] text-[#080808] font-extrabold text-base rounded-2xl flex items-center gap-3 shadow-[0_0_30px_rgba(226,255,0,0.4)] transition-all transform hover:-translate-y-0.5"
              >
                <span>See Pricing</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                ⚡ Pause or cancel anytime
              </div>
            </div>
          </div>

          {/* Right Column: Member Card Badge */}
          <div className="lg:col-span-5">
            <div className="bg-[#131315] border border-white/15 rounded-3xl p-8 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#e2ff00]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#e2ff00] text-[#080808] font-bold text-xs uppercase tracking-wider font-mono">
                  START TODAY
                </span>
                <span className="text-xs font-mono text-gray-400">One subscription to rule them all</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-extrabold text-white">Join EstateJoy</h3>
                <p className="text-sm text-gray-400">Unlimited 3D renders, CAD walkthroughs, floor plans, and Webflow code for your developments.</p>
              </div>

              <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }} className="rounded-2xl border border-white/10">
                <img
                  src="/images/aspen.png"
                  alt="Aspen Villa Render"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-white flex items-center justify-between">
                  <span>Aspen Glass Pavilion 3D Render</span>
                  <span className="text-[#e2ff00] font-bold">Delivered in 48h</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-[#e2ff00]" />
                  <span>Book a 15-min intro call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (DesignJoy 3-Step Card Grid) */}
      <section id="how-it-works" className="py-24 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 space-y-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              The way real estate design <span className="italic font-serif font-normal text-[#e2ff00]">should’ve</span> been done in the first place
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#131315] border border-white/10 hover:border-[#e2ff00]/50 p-8 rounded-3xl space-y-6 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#e2ff00]/10 border border-[#e2ff00]/30 flex items-center justify-center text-[#e2ff00] font-bold text-xl font-mono">
                1
              </div>
              <h3 className="text-2xl font-bold text-white">Subscribe</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Subscribe to a monthly plan & request as many 3D architectural renders, site landing pages, or marketing assets as you’d like.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#131315] border border-white/10 hover:border-[#e2ff00]/50 p-8 rounded-3xl space-y-6 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#e2ff00]/10 border border-[#e2ff00]/30 flex items-center justify-center text-[#e2ff00] font-bold text-xl font-mono">
                2
              </div>
              <h3 className="text-2xl font-bold text-white">Request</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Request whatever you’d like—from 3D exterior renders, virtual staging, pitch decks, site landing pages, to Webflow developments.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#131315] border border-white/10 hover:border-[#e2ff00]/50 p-8 rounded-3xl space-y-6 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#e2ff00]/10 border border-[#e2ff00]/30 flex items-center justify-center text-[#e2ff00] font-bold text-xl font-mono">
                3
              </div>
              <h3 className="text-2xl font-bold text-white">Receive</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Receive your high-fidelity 3D render or production-ready Webflow codebase within two business days on average.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO: REAL ESTATE REQUEST QUEUE SIMULATOR */}
      <section className="py-20 border-b border-white/10 bg-[#0d0d0e]">
        <div className="max-w-[1400px] mx-auto px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#e2ff00] uppercase tracking-wider mb-2">Interactive Trello Request Queue</div>
              <h2 className="text-3xl font-bold text-white">Test The EstateJoy Request Engine</h2>
            </div>

            <div className="text-xs font-mono text-gray-400">
              Avg. Turnaround: <span className="text-[#e2ff00] font-bold">48 Hours</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Box */}
            <div className="lg:col-span-5 bg-[#131315] border border-white/10 p-6 rounded-2xl space-y-4">
              <label className="text-xs font-mono text-gray-300">Submit Real Estate Design Request</label>
              <textarea
                rows={4}
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                placeholder="e.g. 3D Architectural render of a luxury villa..."
                className="w-full bg-[#080808] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#e2ff00]"
              />
              <button
                onClick={addRequest}
                className="w-full py-3 bg-[#e2ff00] hover:bg-[#cbe600] text-[#080808] font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all font-mono"
              >
                <Plus className="w-4 h-4" /> Add To Trello Request Board
              </button>
            </div>

            {/* Queue Board */}
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-mono text-gray-400 mb-2 flex justify-between">
                <span>ACTIVE QUEUE ({requests.length} ITEMS)</span>
                <span>STATUS</span>
              </div>

              {requests.map((req) => (
                <div key={req.id} className="bg-[#131315] border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Box className="w-4 h-4 text-[#e2ff00] shrink-0" />
                    <span className="text-sm font-medium text-white">{req.title}</span>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 shrink-0">
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DESIGNJOY SIGNATURE PRICING SECTION */}
      <section id="pricing" className="py-24 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="text-xs font-mono text-[#e2ff00] uppercase tracking-wider">PRICING</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              One subscription, <span className="italic font-serif font-normal text-[#e2ff00]">endless possibilities</span>
            </h2>
          </div>

          <div className="max-w-xl mx-auto bg-[#131315] border-2 border-[#e2ff00] p-8 md:p-10 rounded-3xl space-y-8 relative shadow-[0_0_50px_rgba(226,255,0,0.25)]">
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
                <span className="text-5xl md:text-6xl font-extrabold text-white font-mono">$4,995</span>
                <span className="text-gray-400 text-lg font-mono">/ month</span>
                <span className="line-through text-gray-500 text-xl font-mono">$5,995</span>
              </div>
              <p className="text-xs text-[#e2ff00] font-mono">Lifetime Discount — Limited Time Offer</p>
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
                onClick={() => alert('Welcome to EstateJoy! Subscription initiated.')}
                className="w-full py-4 bg-[#e2ff00] hover:bg-[#cbe600] text-[#080808] font-extrabold text-base rounded-2xl shadow-[0_0_30px_rgba(226,255,0,0.4)] transition-all font-sans"
              >
                Join Today
              </button>

              <div className="text-center text-[11px] text-gray-400 font-mono">
                Try it for a week — not loving it? Get 75% back, no questions asked.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
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
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-[#e2ff00]' : 'text-gray-400'}`} />
                </button>

                {openFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING MODAL */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#131315] border border-white/20 rounded-3xl p-8 max-w-lg w-full relative space-y-6 shadow-2xl">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="text-xs font-mono text-[#e2ff00]">BOOK A 15-MIN CALL</div>
              <h3 className="text-2xl font-bold text-white">Schedule Your EstateJoy Intro</h3>
              <p className="text-xs text-gray-400">Learn how EstateJoy replaces architectural render agencies for your developments.</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Call scheduled successfully!'); setBookingModalOpen(false); }} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gray-300">Full Name</label>
                <input required type="text" placeholder="Marcus Sterling" className="w-full mt-1 bg-[#080808] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e2ff00]" />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-300">Development Company Email</label>
                <input required type="email" placeholder="marcus@sterlingdevelopments.com" className="w-full mt-1 bg-[#080808] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e2ff00]" />
              </div>

              <button type="submit" className="w-full py-3 bg-[#e2ff00] hover:bg-[#cbe600] text-[#080808] font-bold text-sm rounded-xl font-mono shadow-lg transition-all">
                Confirm 15-Min Intro Call
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#080808] py-12 text-xs font-mono text-gray-500">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Building2 className="w-4 h-4 text-[#e2ff00]" />
            <span>© 2026 EstateJoy • Inspired by DesignJoy.co • Powered by UIOS v2</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/real-estate-saas" className="hover:text-white transition-colors">Aetheris Real Estate SaaS</Link>
            <Link href="/" className="hover:text-white transition-colors">UIOS Studio</Link>
            <Link href="https://github.com/scream687/uios" className="hover:text-white transition-colors" target="_blank">GitHub Repo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

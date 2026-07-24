'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Link2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers,
  Copy,
  Check,
  Eye,
  Lock,
  Share2,
  Building2,
  Maximize2,
  BedDouble,
  Bath,
  ChevronRight,
  X,
  SlidersHorizontal,
  CheckCircle2,
  ArrowRight,
  QrCode,
  Smartphone,
} from 'lucide-react';

export default function EstateLinkPage() {
  // Interactive Single-Link Simulator State
  const [propertyTitle, setPropertyTitle] = useState('The Aspen Glass Pavilion');
  const [propertyPrice, setPropertyPrice] = useState('$14,800,000');
  const [propertyCity, setPropertyCity] = useState('Aspen, CO');
  const [customSlug, setCustomSlug] = useState('aspen-pavilion');
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState('/images/aspen.png');

  // Modal State
  const [trialModalOpen, setTrialModalOpen] = useState(false);

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleProperties = [
    { title: 'The Aspen Glass Pavilion', price: '$14,800,000', city: 'Aspen, CO', slug: 'aspen-pavilion', image: '/images/aspen.png' },
    { title: 'Skyline Brickell Penthouse', price: '$8,450,000', city: 'Miami, FL', slug: 'brickell-skyline', image: '/images/miami.png' },
    { title: 'Austin Waterfront Villa', price: '$6,200,000', city: 'Austin, TX', slug: 'austin-waterfront', image: '/images/austin.png' },
    { title: 'Solara Commercial Tower', price: '$24,000,000', city: 'Dallas, TX', slug: 'solara-dallas', image: '/images/dallas.png' },
  ];

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#f7f8f8] font-sans antialiased selection:bg-[#10b981] selection:text-[#090a0c]">
      {/* Header Navigation Bar */}
      <header className="border-b border-white/10 bg-[#090a0c]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#10b981] flex items-center justify-center text-[#090a0c] font-bold text-xl shadow-[0_0_24px_rgba(16,185,129,0.4)]">
              <Link2 className="w-5 h-5 text-[#090a0c]" />
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-white text-xl font-sans flex items-center gap-2">
                EstateLink <span className="text-[#10b981] text-xs font-mono px-2 py-0.5 rounded bg-[#10b981]/10 border border-[#10b981]/30">v2 OS COMPILER</span>
              </span>
              <p className="text-[10px] font-mono text-gray-400">One Intelligent Link for Luxury Real Estate</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#builder" className="hover:text-[#10b981] transition-colors">Link Simulator</a>
            <a href="#analytics" className="hover:text-white transition-colors">Analytics</a>
            <a href="#pricing" className="hover:text-[#10b981] transition-colors">Pricing</a>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors font-mono text-xs">
              ← UIOS Studio
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTrialModalOpen(true)}
              className="px-5 py-2.5 bg-[#10b981] hover:bg-[#0ea5e9] text-[#090a0c] font-extrabold text-sm rounded-xl flex items-center gap-2 shadow-[0_0_24px_rgba(16,185,129,0.4)] transition-all font-sans"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate EstateLink</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-24 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#0e1118] via-[#090a0c] to-[#090a0c]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-[#10b981]/15 via-[#3b82f6]/10 to-transparent blur-[140px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] font-mono text-xs shadow-inner">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Architectural Simplicity • $1.8B Properties Shared via EstateLink</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.05]">
            One Link for Your Entire <span className="italic font-serif font-normal text-[#10b981]">Luxury Portfolio</span>.
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-normal">
            Replace fragmented PDFs, static brochures, and multi-url emails with a single dynamic, trackable visual link. Designed for luxury brokers, developers, and sales teams.
          </p>

          {/* Interactive Link Input Simulator Banner */}
          <div className="bg-[#12151c]/90 border border-white/15 rounded-2xl p-3 shadow-2xl max-w-3xl mx-auto backdrop-blur-xl flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-[#090a0c] border border-white/10 rounded-xl w-full">
              <span className="text-gray-500 font-mono text-sm">estatelink.co/</span>
              <input
                type="text"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="your-property-name"
                className="bg-transparent text-sm text-white font-mono font-medium focus:outline-none w-full"
              />
            </div>

            <button
              onClick={handleCopyLink}
              className="w-full sm:w-auto px-6 py-3 bg-[#10b981] hover:bg-[#0ea5e9] text-[#090a0c] font-bold text-sm rounded-xl font-mono flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Copy EstateLink'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* METRICS TICKER BAR */}
      <section className="border-b border-white/10 bg-[#0c0e12] py-8">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-white font-mono">$1.84B+</div>
            <div className="text-xs font-mono text-gray-400">Property Value Shared</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">99.8%</div>
            <div className="text-xs font-mono text-gray-400">Buyer Open Rate</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-white font-mono">15 Sec</div>
            <div className="text-xs font-mono text-gray-400">Avg Setup Time</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-cyan-400 font-mono">14,200+</div>
            <div className="text-xs font-mono text-gray-400">Active EstateLinks Created</div>
          </div>
        </div>
      </section>

      {/* FEATURE BENTO GRID */}
      <section id="features" className="py-24 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 space-y-16">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#10b981] uppercase tracking-wider mb-2">Architectural Engineering</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Designed for luxury presentation, <span className="italic font-serif font-normal text-[#10b981]">engineered for speed</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Feature 1 */}
            <div className="lg:col-span-8 bg-[#12151c] border border-white/10 hover:border-[#10b981]/40 rounded-3xl p-8 space-y-6 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Dynamic Architectural Storytelling</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
                  Embed 4K video walkthroughs, 3D interactive renders, floor plans, and pricing specs into a single elegant viewport. No heavy downloads or attachment limits.
                </p>
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10">
                <Image src="/images/aspen.png" alt="EstateLink Dynamic Storytelling" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                  <span>The Aspen Pavilion • Single Link View</span>
                  <span className="text-[#10b981] font-bold">Live 3D Model Embedded</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="lg:col-span-4 bg-[#12151c] border border-white/10 hover:border-[#10b981]/40 rounded-3xl p-8 space-y-6 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#3b82f6]/10 border border-[#3b82f6]/30 flex items-center justify-center text-[#3b82f6]">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Real-Time Buyer Analytics</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Know exactly when high-net-worth buyers open your EstateLink, which floor plans they inspect, and how long they spend reviewing specs.
                </p>
              </div>

              <div className="bg-[#090a0c] border border-white/10 p-5 rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>BUYER ENGAGEMENT</span>
                  <span className="text-emerald-400 font-bold">+42% Higher</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#10b981] to-[#3b82f6] w-[84%]" />
                </div>
                <div className="text-[10px] text-gray-500">Buyer inspected Aspen Villa 3D Floor Plan for 4m 12s</div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="lg:col-span-4 bg-[#12151c] border border-white/10 hover:border-[#10b981]/40 rounded-3xl p-8 space-y-6 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Private Off-Market Passcode Protection</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Protect off-market luxury listings with passcode gates and digital buyer NDA sign-offs before unlocking property assets.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="lg:col-span-8 bg-[#12151c] border border-white/10 hover:border-[#10b981]/40 rounded-3xl p-8 space-y-6 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
                  <Share2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Custom Domain & One-Click Sharing</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
                  Host links under your agency domain (`link.youragency.com/property`) and share instantly via SMS, WhatsApp, QR codes, or digital business cards.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 bg-[#090a0c] border border-white/10 rounded-xl flex items-center gap-2 text-gray-300">
                  <QrCode className="w-4 h-4 text-[#10b981]" /> Instant QR Code
                </div>
                <div className="p-3 bg-[#090a0c] border border-white/10 rounded-xl flex items-center gap-2 text-gray-300">
                  <Smartphone className="w-4 h-4 text-[#3b82f6]" /> SMS / WhatsApp
                </div>
                <div className="p-3 bg-[#090a0c] border border-white/10 rounded-xl flex items-center gap-2 text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400" /> Passcode Gate
                </div>
                <div className="p-3 bg-[#090a0c] border border-white/10 rounded-xl flex items-center gap-2 text-gray-300">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Custom Domain
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SINGLE-LINK BUILDER ENGINE */}
      <section id="builder" className="py-24 border-b border-white/10 bg-[#0d0f15]">
        <div className="max-w-[1400px] mx-auto px-6 space-y-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-[#10b981] uppercase tracking-wider mb-2 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Live EstateLink Simulator
            </div>
            <h2 className="text-4xl font-extrabold text-white">Build Your Single Property Link in Seconds</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Form */}
            <div className="lg:col-span-5 bg-[#12151c] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-300">Select Property Preset</label>
                <div className="grid grid-cols-2 gap-2">
                  {sampleProperties.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => {
                        setPropertyTitle(p.title);
                        setPropertyPrice(p.price);
                        setPropertyCity(p.city);
                        setCustomSlug(p.slug);
                        setSelectedImage(p.image);
                      }}
                      className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all ${
                        customSlug === p.slug
                          ? 'border-[#10b981] bg-[#10b981]/15 text-white'
                          : 'border-white/10 bg-[#090a0c] text-gray-400 hover:text-white'
                      }`}
                    >
                      {p.city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-300">Property Title</label>
                <input
                  type="text"
                  value={propertyTitle}
                  onChange={(e) => setPropertyTitle(e.target.value)}
                  className="w-full bg-[#090a0c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-300">Asking Price</label>
                  <input
                    type="text"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(e.target.value)}
                    className="w-full bg-[#090a0c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#10b981]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-300">Location City</label>
                  <input
                    type="text"
                    value={propertyCity}
                    onChange={(e) => setPropertyCity(e.target.value)}
                    className="w-full bg-[#090a0c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>
            </div>

            {/* Live Render Card Output */}
            <div className="lg:col-span-7 bg-[#12151c] border border-white/15 p-8 rounded-3xl space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400 font-bold">ESTATELINK LIVE VIEWPORT</span>
                </div>

                <span className="text-xs font-mono text-gray-400">estatelink.co/{customSlug}</span>
              </div>

              <div className="relative h-80 rounded-2xl overflow-hidden border border-white/10 group">
                <Image src={selectedImage} alt={propertyTitle} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Verified Architectural Presentation
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <div className="text-xs font-mono text-emerald-400">{propertyCity}</div>
                  <h3 className="text-3xl font-extrabold text-white">{propertyTitle}</h3>
                  <div className="text-2xl font-bold font-mono text-white">{propertyPrice}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleCopyLink}
                  className="px-6 py-3 bg-[#10b981] hover:bg-[#0ea5e9] text-[#090a0c] font-extrabold text-sm rounded-xl font-mono flex items-center gap-2 transition-all shadow-md"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Link for Client Email / WhatsApp'}</span>
                </button>

                <span className="text-xs font-mono text-gray-400">1-Click Share Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING MATRIX SECTION */}
      <section id="pricing" className="py-24 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#10b981] uppercase tracking-wider">Transparent Subscriptions</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Elevate Your Real Estate Brand</h2>
            <p className="text-gray-400 text-sm">Choose the tier that matches your luxury portfolio size.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Solo Broker */}
            <div className="bg-[#12151c] border border-white/10 p-8 rounded-3xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-sm font-mono text-gray-400">SOLO BROKER</div>
                <div className="text-4xl font-bold text-white font-mono">$79 <span className="text-xs text-gray-400 font-normal">/ month</span></div>
                <p className="text-xs text-gray-400">For independent agents managing up to 15 active luxury listings.</p>

                <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10b981]" /> Up to 15 Active EstateLinks</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10b981]" /> Real-time Buyer Analytics</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10b981]" /> Instant QR Code Generator</li>
                </ul>
              </div>

              <button onClick={() => setTrialModalOpen(true)} className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium text-xs font-mono transition-all">
                Start Solo Plan
              </button>
            </div>

            {/* Pro Agency (Featured) */}
            <div className="bg-gradient-to-b from-[#16231e] to-[#12151c] border-2 border-[#10b981] p-8 rounded-3xl space-y-6 flex flex-col justify-between relative shadow-[0_0_40px_rgba(16,185,129,0.25)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#10b981] text-[#090a0c] text-[10px] font-mono rounded-full uppercase tracking-wider font-extrabold">
                Recommended for Luxury Teams
              </div>

              <div className="space-y-4">
                <div className="text-sm font-mono text-emerald-300">PRO AGENCY</div>
                <div className="text-4xl font-bold text-white font-mono">$249 <span className="text-xs text-gray-400 font-normal">/ month</span></div>
                <p className="text-xs text-gray-300">For premier brokerages requiring custom agency domains and team collaboration.</p>

                <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-200">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Active EstateLinks</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom Domain (`link.youragency.com`)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Passcode Off-Market Protection</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 10-Seat Team Access</li>
                </ul>
              </div>

              <button onClick={() => setTrialModalOpen(true)} className="w-full py-3 bg-[#10b981] hover:bg-[#0ea5e9] text-[#090a0c] font-extrabold text-xs font-mono rounded-xl shadow-lg transition-all">
                Start Pro Agency Trial
              </button>
            </div>

            {/* Enterprise Developer */}
            <div className="bg-[#12151c] border border-white/10 p-8 rounded-3xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-sm font-mono text-gray-400">ENTERPRISE DEVELOPER</div>
                <div className="text-4xl font-bold text-white font-mono">$699 <span className="text-xs text-gray-400 font-normal">/ month</span></div>
                <p className="text-xs text-gray-400">For condo & commercial developers requiring custom API integration and white-labeling.</p>

                <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3b82f6]" /> Custom API & CRM Integration</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3b82f6]" /> Full White-Label Presentation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3b82f6]" /> Dedicated Account Manager</li>
                </ul>
              </div>

              <button onClick={() => setTrialModalOpen(true)} className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium text-xs font-mono transition-all">
                Contact Developer Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRIAL / GENERATE MODAL */}
      {trialModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12151c] border border-white/20 rounded-3xl p-8 max-w-lg w-full relative space-y-6 shadow-2xl">
            <button
              onClick={() => setTrialModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="text-xs font-mono text-[#10b981]">ESTATELINK ENGINE</div>
              <h3 className="text-2xl font-bold text-white">Generate Your First EstateLink</h3>
              <p className="text-xs text-gray-400">Start your 14-day free trial. No credit card required.</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('EstateLink generated! Check your email.'); setTrialModalOpen(false); }} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gray-300">Broker / Agency Name</label>
                <input required type="text" placeholder="Sterling Luxury Real Estate" className="w-full mt-1 bg-[#090a0c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#10b981]" />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-300">Work Email</label>
                <input required type="email" placeholder="sterling@luxurybrokerage.com" className="w-full mt-1 bg-[#090a0c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#10b981]" />
              </div>

              <button type="submit" className="w-full py-3 bg-[#10b981] hover:bg-[#0ea5e9] text-[#090a0c] font-extrabold text-sm rounded-xl font-mono shadow-lg transition-all">
                Launch Free 14-Day EstateLink Trial
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#090a0c] py-12 text-xs font-mono text-gray-500">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Link2 className="w-4 h-4 text-[#10b981]" />
            <span>© 2026 EstateLink Inc. • Compiled by UIOS v2 Design OS Engine</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/real-estate-saas" className="hover:text-white transition-colors">Aetheris SaaS</Link>
            <Link href="/real-estate-designjoy" className="hover:text-white transition-colors">EstateJoy</Link>
            <Link href="/" className="hover:text-white transition-colors">UIOS Studio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function EstateLinkPage() {
  const [activeSlug, setActiveSlug] = useState('aspen-sanctuary');
  const [propertyTitle, setPropertyTitle] = useState('The Aspen Sanctuary');
  const [location, setLocation] = useState('Aspen, Colorado');
  const [price, setPrice] = useState('$16,500,000');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');

  const properties = [
    {
      slug: 'aspen-sanctuary',
      title: 'The Aspen Sanctuary',
      location: 'Aspen, Colorado',
      price: '$16,500,000',
      specs: '6 Beds • 8 Baths • 9,400 Sq Ft',
      image: '/images/aspen.png',
      architect: 'Olson Kundig Architecture',
    },
    {
      slug: 'miami-penthouse',
      title: 'Solara Penthouse 54',
      location: 'Miami, Florida',
      price: '$12,800,000',
      specs: '4 Beds • 5 Baths • 6,200 Sq Ft',
      image: '/images/miami.png',
      architect: 'SAOTA Architects',
    },
    {
      slug: 'austin-estate',
      title: 'Lake Austin Waterfront',
      location: 'Austin, Texas',
      price: '$8,900,000',
      specs: '5 Beds • 6 Baths • 7,800 Sq Ft',
      image: '/images/austin.png',
      architect: 'Marlon Blackwell Architects',
    },
  ];

  const activeProp = properties.find((p) => p.slug === activeSlug) || properties[0];

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] font-sans antialiased selection:bg-white selection:text-black">
      {/* Minimal Header */}
      <header className="border-b border-neutral-900 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1300px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif italic text-2xl font-normal tracking-tight text-white">EstateLink</span>
            <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase border border-neutral-800 px-2 py-0.5 rounded-full">
              Editorial Edition
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-sm tracking-wide text-neutral-400 font-light">
            <a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a>
            <a href="#simulator" className="hover:text-white transition-colors">Interactive Link</a>
            <a href="#curation" className="hover:text-white transition-colors">Presentation</a>
            <a href="#membership" className="hover:text-white transition-colors">Membership</a>
            <Link href="/" className="text-neutral-500 hover:text-white transition-colors font-mono text-xs">
              ← Studio
            </Link>
          </nav>

          <a
            href="#membership"
            className="px-5 py-2.5 bg-white text-black font-medium text-xs tracking-wider uppercase rounded-full hover:bg-neutral-200 transition-all"
          >
            Request Access
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-24 pb-32 border-b border-neutral-900">
        <div className="max-w-[1300px] mx-auto px-8 space-y-12">
          <div className="max-w-4xl space-y-6">
            <p className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
              The Single Link Presentation Standard
            </p>
            <h1 className="text-6xl md:text-8xl font-normal tracking-tight leading-[0.98]">
              One link. <br />
              <span className="font-serif italic font-normal text-neutral-400">Pure architectural clarity.</span>
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              EstateLink transforms luxury property marketing into a single, high-resolution presentation link. No attachments, no PDF downloads, no fragmented emails.
            </p>
          </div>

          {/* Quick Slug Interactive Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-2xl">
            <div className="flex-1 bg-neutral-950 border border-neutral-800 rounded-full px-6 py-4 flex items-center gap-3">
              <span className="text-neutral-600 font-mono text-sm">estatelink.co/</span>
              <span className="text-white font-mono text-sm font-medium">{activeSlug}</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-8 py-4 bg-white text-black font-medium text-xs font-mono tracking-wider uppercase rounded-full hover:bg-neutral-200 transition-all shrink-0"
            >
              {copied ? 'Link Copied' : 'Copy Link'}
            </button>
          </div>
        </div>
      </section>

      {/* INTERACTIVE LINK SIMULATOR & VIEWPORT */}
      <section id="simulator" className="py-28 border-b border-neutral-900 bg-[#050505]">
        <div className="max-w-[1300px] mx-auto px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-2">Live Presentation Viewport</p>
              <h2 className="text-3xl md:text-4xl font-normal text-white">Experience an EstateLink Presentation</h2>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 border border-neutral-800 p-1 rounded-full bg-black">
              <button
                onClick={() => setViewMode('mobile')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                  viewMode === 'mobile' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Mobile View
              </button>
              <button
                onClick={() => setViewMode('desktop')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                  viewMode === 'desktop' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Desktop View
              </button>
            </div>
          </div>

          {/* Property Switcher */}
          <div className="flex flex-wrap gap-3">
            {properties.map((p) => (
              <button
                key={p.slug}
                onClick={() => setActiveSlug(p.slug)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono transition-all border ${
                  activeSlug === p.slug
                    ? 'border-white bg-white text-black font-medium'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-600'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Device Mockup Stage */}
          <div className="pt-6 flex justify-center">
            {viewMode === 'mobile' ? (
              /* Mobile Phone Frame */
              <div className="w-[380px] bg-neutral-950 border border-neutral-800 rounded-[48px] p-4 shadow-2xl space-y-4">
                {/* Notch */}
                <div className="w-32 h-4 bg-neutral-900 rounded-full mx-auto" />

                {/* Phone Content Screen */}
                <div className="bg-black rounded-[36px] overflow-hidden border border-neutral-900 space-y-4 pb-6">
                  <div className="relative h-72 w-full">
                    <img
                      src={activeProp.image}
                      alt={activeProp.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                    <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-neutral-300 uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      EstateLink Verified
                    </div>
                  </div>

                  <div className="px-6 space-y-3">
                    <div className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
                      {activeProp.location}
                    </div>
                    <h3 className="text-2xl font-serif italic text-white">{activeProp.title}</h3>
                    <div className="text-xl font-mono text-white">{activeProp.price}</div>
                    <p className="text-xs text-neutral-400 font-light">{activeProp.specs}</p>

                    <div className="pt-2 border-t border-neutral-900 text-[11px] font-mono text-neutral-500">
                      Architecture by {activeProp.architect}
                    </div>

                    <button
                      onClick={handleCopy}
                      className="w-full py-3 bg-white text-black font-medium text-xs font-mono uppercase tracking-wider rounded-xl mt-2"
                    >
                      Inquire Directly
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Desktop Browser Viewport Frame */
              <div className="w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
                {/* Window Header */}
                <div className="px-6 py-4 border-b border-neutral-900 flex items-center justify-between bg-neutral-900/50">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-neutral-800" />
                    <span className="w-3 h-3 rounded-full bg-neutral-800" />
                    <span className="w-3 h-3 rounded-full bg-neutral-800" />
                  </div>
                  <span className="text-xs font-mono text-neutral-400">https://estatelink.co/{activeSlug}</span>
                  <div className="w-12" />
                </div>

                {/* Desktop Content */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-black">
                  <div className="md:col-span-7 relative h-80 rounded-2xl overflow-hidden border border-neutral-900">
                    <img src={activeProp.image} alt={activeProp.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="md:col-span-5 space-y-4">
                    <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">{activeProp.location}</span>
                    <h3 className="text-3xl font-serif italic text-white">{activeProp.title}</h3>
                    <div className="text-2xl font-mono text-white">{activeProp.price}</div>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">{activeProp.specs}</p>
                    <div className="text-xs font-mono text-neutral-500 pt-2 border-t border-neutral-900">
                      {activeProp.architect}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EDITORIAL PHILOSOPHY GRID */}
      <section id="philosophy" className="py-32 border-b border-neutral-900">
        <div className="max-w-[1300px] mx-auto px-8 space-y-20">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-mono tracking-widest text-neutral-500 uppercase">Design Philosophy</p>
            <h2 className="text-4xl md:text-5xl font-normal text-white">
              Why luxury estate marketing requires <span className="font-serif italic font-normal text-neutral-400">restraint</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 border-t border-neutral-900 pt-6">
              <span className="text-xs font-mono text-neutral-500">01</span>
              <h3 className="text-xl font-medium text-white">Zero Attachment Noise</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                High-net-worth buyers do not download 40MB PDF email attachments. A single link opens instantly across any device with total visual fidelity.
              </p>
            </div>

            <div className="space-y-4 border-t border-neutral-900 pt-6">
              <span className="text-xs font-mono text-neutral-500">02</span>
              <h3 className="text-xl font-medium text-white">Quiet Analytics</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Know precisely when a client opens your presentation and which architectural details they inspect, without creepy tracking UI.
              </p>
            </div>

            <div className="space-y-4 border-t border-neutral-900 pt-6">
              <span className="text-xs font-mono text-neutral-500">03</span>
              <h3 className="text-xl font-medium text-white">Private Access Control</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Protect off-market assets with subtle passcode gates and client NDA verification before unlocking full imagery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PRICING SECTION */}
      <section id="membership" className="py-32 border-b border-neutral-900 bg-[#050505]">
        <div className="max-w-[1300px] mx-auto px-8 space-y-16">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-mono tracking-widest text-neutral-500 uppercase">Membership</p>
            <h2 className="text-4xl font-normal text-white">Simple, fixed plans for luxury brokerages</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {/* Plan 1 */}
            <div className="bg-neutral-950 border border-neutral-800 p-10 rounded-3xl space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
                  <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">SOLO BROKER</span>
                  <span className="text-xs font-mono text-neutral-500">Up to 10 Listings</span>
                </div>
                <div className="text-5xl font-mono font-light text-white">$149 <span className="text-xs font-mono text-neutral-500">/ month</span></div>
                <p className="text-sm text-neutral-400 font-light">Ideal for independent luxury brokers wanting refined single-link presentations.</p>
              </div>

              <button
                onClick={() => alert('EstateLink Membership Access Request Sent.')}
                className="w-full py-4 border border-white/20 text-white font-mono text-xs uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition-all"
              >
                Apply for Solo Access
              </button>
            </div>

            {/* Plan 2 */}
            <div className="bg-neutral-950 border-2 border-white p-10 rounded-3xl space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
                  <span className="text-xs font-mono tracking-widest text-white uppercase font-medium">DEVELOPER & AGENCY</span>
                  <span className="text-xs font-mono text-white">Unlimited Links</span>
                </div>
                <div className="text-5xl font-mono font-light text-white">$499 <span className="text-xs font-mono text-neutral-500">/ month</span></div>
                <p className="text-sm text-neutral-400 font-light">Custom domain (`link.youragency.com`), passcode gates, and unlimited team seats.</p>
              </div>

              <button
                onClick={() => alert('EstateLink Agency Membership Request Sent.')}
                className="w-full py-4 bg-white text-black font-mono text-xs uppercase tracking-wider font-bold rounded-full hover:bg-neutral-200 transition-all"
              >
                Apply for Agency Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-black text-xs font-mono text-neutral-600 border-t border-neutral-900">
        <div className="max-w-[1300px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-neutral-400">
            <span className="font-serif italic text-lg text-white">EstateLink</span>
            <span>© 2026 EstateLink • Editorial Architecture Edition</span>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/" className="hover:text-white transition-colors">UIOS Studio</Link>
            <Link href="/real-estate-saas" className="hover:text-white transition-colors">SaaS Demo</Link>
            <Link href="https://github.com/scream687/uios" target="_blank" className="hover:text-white transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

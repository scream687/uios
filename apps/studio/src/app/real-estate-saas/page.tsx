'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Search,
  SlidersHorizontal,
  DollarSign,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Layers,
  Calculator,
  ChevronRight,
  Calendar,
  X,
} from 'lucide-react';

export default function RealEstateSaaSPage() {
  // Search & Filter State
  const [selectedCity, setSelectedCity] = useState('All Locations');
  const [selectedType, setSelectedType] = useState('All Types');
  const [activeTab, setActiveTab] = useState<'bento' | 'valuation' | 'pricing'>('bento');

  // Valuation Calculator State
  const [sqft, setSqft] = useState(4500);
  const [bedrooms, setBedrooms] = useState(4);
  const [propertyType, setPropertyType] = useState('Luxury Villa');
  const [zipCode, setZipCode] = useState('78701 (Austin)');

  // Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  // Dynamic Valuation Calculations
  const basePricePerSqft = propertyType === 'Luxury Villa' ? 1450 : propertyType === 'Penthouse' ? 1650 : 980;
  const estimatedValuation = sqft * basePricePerSqft + bedrooms * 120000;
  const projectedRentalYield = Math.round(estimatedValuation * 0.072 / 12);
  const projectedFiveYearGrowth = Math.round(estimatedValuation * 1.42);

  const properties = [
    {
      id: 'prop-1',
      title: 'The Glass Pavilion at Aspen Ridge',
      location: 'Aspen, Colorado',
      price: '$14,800,000',
      specs: { beds: 5, baths: 6, sqft: '7,200 sqft' },
      image: '/images/aspen.png',
      tag: 'AI Valuation Match: 99.4%',
      capRate: '6.8%',
      appreciation: '+18.4%/yr',
      type: 'Luxury Villa',
      featured: true,
    },
    {
      id: 'prop-2',
      title: 'Skyline Penthouse at Brickell Bay',
      location: 'Miami, Florida',
      price: '$8,450,000',
      specs: { beds: 4, baths: 5, sqft: '5,100 sqft' },
      image: '/images/miami.png',
      tag: 'High Cashflow Target',
      capRate: '7.2%',
      appreciation: '+14.2%/yr',
      type: 'Penthouse',
      featured: false,
    },
    {
      id: 'prop-3',
      title: 'Modernist Waterfront Estate',
      location: 'Austin, Texas',
      price: '$6,200,000',
      specs: { beds: 4, baths: 4, sqft: '4,800 sqft' },
      image: '/images/austin.png',
      tag: 'Top Growth Zipcode',
      capRate: '6.4%',
      appreciation: '+21.5%/yr',
      type: 'Luxury Villa',
      featured: false,
    },
    {
      id: 'prop-4',
      title: 'The Solara Commercial Tower',
      location: 'Dallas, Texas',
      price: '$24,000,000',
      specs: { beds: 0, baths: 12, sqft: '120,000 sqft' },
      image: '/images/dallas.png',
      tag: '100% Triple-Net Leased',
      capRate: '9.1%',
      appreciation: '+11.8%/yr',
      type: 'Commercial',
      featured: true,
    },
  ];

  const filteredProperties = properties.filter((prop) => {
    const matchesCity = selectedCity === 'All Locations' || prop.location.includes(selectedCity);
    const matchesType = selectedType === 'All Types' || prop.type === selectedType;
    return matchesCity && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#08090a] text-[#f7f8f8] font-sans antialiased">
      {/* Top Header Navigation Bar */}
      <header className="border-b border-white/10 bg-[#0c0e12]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3a8088] to-[#3b82f6] flex items-center justify-center text-white font-bold text-xl shadow-[0_0_24px_rgba(58,128,136,0.5)]">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-lg font-mono flex items-center gap-2">
                Aetheris <span className="text-[#3a8088] font-normal">Real Estate AI</span>
              </span>
              <span className="text-[10px] font-mono text-gray-400">UIOS v2 Design OS Engine • Travelish Sanctuary Minimal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <button onClick={() => setActiveTab('bento')} className={`hover:text-white transition-colors ${activeTab === 'bento' ? 'text-[#3a8088] font-semibold' : ''}`}>
              Property Bento
            </button>
            <button onClick={() => setActiveTab('valuation')} className={`hover:text-white transition-colors ${activeTab === 'valuation' ? 'text-[#3a8088] font-semibold' : ''}`}>
              AI Valuation Engine
            </button>
            <button onClick={() => setActiveTab('pricing')} className={`hover:text-white transition-colors ${activeTab === 'pricing' ? 'text-[#3a8088] font-semibold' : ''}`}>
              Platform Pricing
            </button>
            <Link href="/" className="hover:text-white transition-colors text-gray-400 flex items-center gap-1 font-mono text-xs">
              ← Return to UIOS Studio
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-[#3a8088] to-[#3b82f6] hover:opacity-90 text-white font-medium text-sm rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(58,128,136,0.4)] transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Schedule AI Portfolio Tour</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-white/10 bg-gradient-to-b from-[#0c0e12] via-[#08090a] to-[#08090a]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#3a8088]/20 via-[#3b82f6]/10 to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3a8088]/15 border border-[#3a8088]/30 text-[#3a8088] font-mono text-xs shadow-inner">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Autonomous Real Estate Intelligence Platform • $4.2B Assets Processed</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
            Predict Yields. Value Luxury Assets Instantly with AI.
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-normal">
            Aetheris leverages the UIOS DesignVM compiler & continuous market intelligence engine to evaluate real estate cashflows, cap rates, and 5-year appreciation metrics in real time.
          </p>

          {/* Interactive Search & Filter Bar */}
          <div className="bg-[#12151c]/90 border border-white/15 rounded-2xl p-4 shadow-2xl max-w-4xl mx-auto backdrop-blur-xl grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 px-4 py-3 bg-[#08090a] border border-white/10 rounded-xl">
              <MapPin className="w-4 h-4 text-[#3a8088]" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-sm text-white font-medium focus:outline-none w-full cursor-pointer"
              >
                <option value="All Locations" className="bg-[#12151c]">All Locations</option>
                <option value="Aspen" className="bg-[#12151c]">Aspen, CO</option>
                <option value="Miami" className="bg-[#12151c]">Miami, FL</option>
                <option value="Austin" className="bg-[#12151c]">Austin, TX</option>
                <option value="Dallas" className="bg-[#12151c]">Dallas, TX</option>
              </select>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-[#08090a] border border-white/10 rounded-xl">
              <Building2 className="w-4 h-4 text-[#3b82f6]" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent text-sm text-white font-medium focus:outline-none w-full cursor-pointer"
              >
                <option value="All Types" className="bg-[#12151c]">All Asset Types</option>
                <option value="Luxury Villa" className="bg-[#12151c]">Luxury Villa</option>
                <option value="Penthouse" className="bg-[#12151c]">Penthouse</option>
                <option value="Commercial" className="bg-[#12151c]">Commercial Tower</option>
              </select>
            </div>

            <button
              onClick={() => setActiveTab('bento')}
              className="px-6 py-3 bg-[#3a8088] hover:bg-[#3a8088]/90 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(58,128,136,0.3)]"
            >
              <Search className="w-4 h-4" />
              <span>Analyze {filteredProperties.length} Properties</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1600px] mx-auto px-6 py-16 space-y-20">
        {/* TAB 1: FEATURED PROPERTY BENTO GRID */}
        {activeTab === 'bento' && (
          <section className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-[#3a8088] uppercase tracking-wider mb-2">Verified Real Estate Intelligence</div>
                <h2 className="text-3xl font-bold text-white">Institutional Grade Asset Showcase</h2>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                  Total Value Analyzed: <span className="text-emerald-400 font-bold">$53.45M</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#3a8088]/10 border border-[#3a8088]/30 text-[#3a8088]">
                  Avg Cap Rate: 7.4%
                </span>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              {filteredProperties.map((prop, idx) => {
                const colSpan = idx === 0 ? 'lg:col-span-8' : idx === 3 ? 'lg:col-span-8' : 'lg:col-span-4';
                return (
                  <div
                    key={prop.id}
                    className={`${colSpan} bg-[#12151c] border border-white/10 hover:border-[#3a8088]/50 rounded-2xl overflow-hidden group transition-all duration-300 shadow-xl flex flex-col justify-between`}
                  >
                    <div className="relative h-72 md:h-96 w-full overflow-hidden">
                      <Image
                        src={prop.image}
                        alt={prop.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12151c] via-transparent to-black/40" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-[#08090a]/80 backdrop-blur-md border border-white/15 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-cyan-300" />
                          {prop.tag}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-[#3a8088]/90 backdrop-blur-md text-xs font-bold text-white shadow-lg">
                          Cap Rate {prop.capRate}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-xs font-mono text-[#3a8088] mb-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {prop.location}
                        </div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                          {prop.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 space-y-4 bg-[#12151c]">
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono text-gray-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1"><BedDouble className="w-4 h-4 text-[#3a8088]" /> {prop.specs.beds} Beds</span>
                          <span className="flex items-center gap-1"><Bath className="w-4 h-4 text-[#3b82f6]" /> {prop.specs.baths} Baths</span>
                          <span className="flex items-center gap-1"><Maximize2 className="w-4 h-4 text-emerald-400" /> {prop.specs.sqft}</span>
                        </div>
                        <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                          <TrendingUp className="w-3.5 h-3.5" /> {prop.appreciation}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <div className="text-[10px] font-mono text-gray-500 uppercase">Estimated Asset Value</div>
                          <div className="text-2xl font-bold text-white font-mono">{prop.price}</div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedProperty(prop);
                            setBookingModalOpen(true);
                          }}
                          className="px-4 py-2 bg-white/10 hover:bg-[#3a8088] text-white rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all"
                        >
                          <span>Inspect Model</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 2: AI VALUATION CALCULATOR ENGINE */}
        {activeTab === 'valuation' && (
          <section className="bg-[#12151c] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
            <div className="max-w-3xl">
              <div className="text-xs font-mono text-[#3a8088] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Calculator className="w-4 h-4" /> Live AI Property Valuation Engine
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Simulate Asset Value & Cashflow Yields</h2>
              <p className="text-gray-400 text-sm mt-2">Adjust square footage, location zipcodes, and property type to calculate instant AI market valuations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Calculator Inputs */}
              <div className="lg:col-span-6 space-y-6 bg-[#08090a] border border-white/10 p-6 md:p-8 rounded-2xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm font-mono">
                    <label className="text-gray-300 font-medium">Square Footage (sqft)</label>
                    <span className="text-[#3a8088] font-bold">{sqft.toLocaleString()} sqft</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="15000"
                    step="250"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3a8088]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400">Property Category</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-[#12151c] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#3a8088]"
                    >
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400">Bedrooms Count</label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full bg-[#12151c] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#3a8088]"
                    >
                      <option value={2}>2 Bedrooms</option>
                      <option value={4}>4 Bedrooms</option>
                      <option value={6}>6 Bedrooms</option>
                      <option value={8}>8+ Bedrooms</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400">Target Zipcode & Submarket</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full bg-[#12151c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3a8088]"
                  />
                </div>
              </div>

              {/* Live Output Cards */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-gradient-to-br from-[#3a8088]/20 via-[#12151c] to-[#3b82f6]/20 border border-[#3a8088]/40 p-8 rounded-2xl space-y-4">
                  <div className="text-xs font-mono text-cyan-300 flex items-center justify-between">
                    <span>ESTIMATED MARKET VALUATION</span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">AI CONFIDENCE 99.4%</span>
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold text-white font-mono">${estimatedValuation.toLocaleString()}</div>
                  <p className="text-xs text-gray-400 font-mono">Calculated using 14,850+ local comp data points and UIOS design primitive metrics.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#08090a] border border-white/10 p-5 rounded-2xl space-y-1">
                    <div className="text-[11px] font-mono text-gray-400">PROJECTED RENT / MONTH</div>
                    <div className="text-2xl font-bold text-emerald-400 font-mono">${projectedRentalYield.toLocaleString()}/mo</div>
                  </div>

                  <div className="bg-[#08090a] border border-white/10 p-5 rounded-2xl space-y-1">
                    <div className="text-[11px] font-mono text-gray-400">PROJECTED 5-YR VALUE</div>
                    <div className="text-2xl font-bold text-cyan-300 font-mono">${projectedFiveYearGrowth.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: TRANSPARENT SAAS PRICING */}
        {activeTab === 'pricing' && (
          <section className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="text-xs font-mono text-[#3a8088] uppercase tracking-wider">Simple & Transparent Pricing</div>
              <h2 className="text-4xl font-bold text-white">Choose Your Asset Intelligence Tier</h2>
              <p className="text-gray-400 text-sm">Scale from single family residential investments to institutional commercial syndication.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tier 1 */}
              <div className="bg-[#12151c] border border-white/10 p-8 rounded-3xl space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-sm font-mono text-gray-400">STARTER INVESTOR</div>
                  <div className="text-4xl font-bold text-white font-mono">$149 <span className="text-xs text-gray-400 font-normal">/ month</span></div>
                  <p className="text-xs text-gray-400">Essential AI property valuations and comp reports for individual investors.</p>

                  <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3a8088]" /> Track up to 10 Assets</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3a8088]" /> Instant AI Valuations</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3a8088]" /> Basic Cap Rate Calculator</li>
                  </ul>
                </div>

                <button onClick={() => setBookingModalOpen(true)} className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium text-xs font-mono transition-all">
                  Start Starter Plan
                </button>
              </div>

              {/* Tier 2 (Featured Pro) */}
              <div className="bg-gradient-to-b from-[#182230] to-[#12151c] border-2 border-[#3a8088] p-8 rounded-3xl space-y-6 flex flex-col justify-between relative shadow-[0_0_40px_rgba(58,128,136,0.25)]">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#3a8088] text-white text-[10px] font-mono rounded-full uppercase tracking-wider font-bold">
                  Most Popular for Funds
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-mono text-cyan-300">PRO PORTFOLIO</div>
                  <div className="text-4xl font-bold text-white font-mono">$499 <span className="text-xs text-gray-400 font-normal">/ month</span></div>
                  <p className="text-xs text-gray-300">Predictive cashflow models, tax optimization, and automated deal scoring.</p>

                  <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-200">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Unlimited Asset Tracking</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Predictive Cashflow Engines</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Custom API Access</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> 10-User Team Seat Access</li>
                  </ul>
                </div>

                <button onClick={() => setBookingModalOpen(true)} className="w-full py-3 bg-[#3a8088] hover:bg-[#3a8088]/90 text-white rounded-xl font-medium text-xs font-mono transition-all shadow-lg">
                  Start Pro Portfolio Trial
                </button>
              </div>

              {/* Tier 3 */}
              <div className="bg-[#12151c] border border-white/10 p-8 rounded-3xl space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-sm font-mono text-gray-400">INSTITUTIONAL ENTERPRISE</div>
                  <div className="text-4xl font-bold text-white font-mono">$1,299 <span className="text-xs text-gray-400 font-normal">/ month</span></div>
                  <p className="text-xs text-gray-400">Dedicated AI agent runtime, custom risk models, and institutional underwriting.</p>

                  <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3b82f6]" /> Dedicated Agent Runtime</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3b82f6]" /> Institutional Risk Underwriting</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#3b82f6]" /> Custom White-Label Portal</li>
                  </ul>
                </div>

                <button onClick={() => setBookingModalOpen(true)} className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium text-xs font-mono transition-all">
                  Contact Enterprise Sales
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12151c] border border-white/20 rounded-3xl p-8 max-w-lg w-full relative space-y-6 shadow-2xl">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="text-xs font-mono text-[#3a8088]">SCHEDULE AI DEMO</div>
              <h3 className="text-2xl font-bold text-white">Book Your Aetheris AI Walkthrough</h3>
              <p className="text-xs text-gray-400">Experience autonomous real estate asset valuation powered by UIOS DesignVM.</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Demo tour scheduled successfully!'); setBookingModalOpen(false); }} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gray-300">Full Name</label>
                <input required type="text" placeholder="Sarah Jenkins" className="w-full mt-1 bg-[#08090a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3a8088]" />
              </div>

              <div>
                <label className="text-xs font-mono text-gray-300">Work Email</label>
                <input required type="email" placeholder="sarah@realestatefund.com" className="w-full mt-1 bg-[#08090a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3a8088]" />
              </div>

              <button type="submit" className="w-full py-3 bg-[#3a8088] hover:bg-[#3a8088]/90 text-white rounded-xl font-medium text-sm font-mono shadow-lg transition-all">
                Confirm Demo Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0c0e12] py-12 text-xs font-mono text-gray-500">
        <div className="max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Building2 className="w-4 h-4 text-[#3a8088]" />
            <span>© 2026 Aetheris Real Estate AI Platform • Powered by UIOS v2 Operating System</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">UIOS Studio</Link>
            <Link href="https://github.com/scream687/uios" className="hover:text-white transition-colors" target="_blank">GitHub Repository</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

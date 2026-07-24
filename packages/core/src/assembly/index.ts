import { IntentOutput } from '../intent/index.js';
import { BrandTokens } from '../memory/dna.js';
import { PlanOutput } from '../planning/index.js';

export interface GeneratedUIOutput {
  reactCode: string;
  cssVariables: string;
  componentSpecs: Array<{ name: string; libraryUsed: string }>;
  dependencies: string[];
}

export class AssemblyEngine {
  public assemble(intent: IntentOutput, tokens: BrandTokens, plan: PlanOutput): GeneratedUIOutput {
    const isDark = tokens.archetype !== 'Apple Minimal';

    const reactCode = `'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Shield, Zap, ChevronRight, BarChart3, Users, Star } from 'lucide-react';

export default function UIOSGeneratedScreen() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.08 } }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-[var(--font-body)] antialiased selection:bg-primary/20">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg-primary)]/80 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-lg shadow-[var(--shadow-glow)]">
              U
            </div>
            <span className="font-semibold text-lg tracking-tight font-[var(--font-heading)]">UIOS Studio</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-primary)]/80">
            ${plan.informationArchitecture.primaryNav.map(nav => `<a href="#${nav.toLowerCase()}" className="hover:text-[var(--text-primary)] transition-colors">${nav}</a>`).join('\n            ')}
          </nav>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium hover:text-[var(--text-primary)] transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[var(--color-primary-fg)] hover:opacity-90 transition-all shadow-[var(--shadow-glow)]">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="py-24 md:py-32 flex flex-col items-center text-center relative"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--card-bg)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-accent)] mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introducing ${intent.industry} UI Engine v1.0</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </motion.div>

          <motion.h1 variants={fadeIn} className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-[var(--font-heading)] max-w-4xl leading-[1.05]">
            Craft Production UIs with <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">Elite Intelligence</span>
          </motion.h1>

          <motion.p variants={fadeIn} className="mt-6 text-lg sm:text-xl text-[var(--text-primary)]/70 max-w-2xl font-normal leading-relaxed">
            UIOS decomposes UI creation into specialized layout, motion, accessibility, and human-taste engines to deliver world-class interfaces.
          </motion.p>

          <motion.div variants={fadeIn} className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[var(--color-primary-fg)] hover:opacity-90 transition-all shadow-[var(--shadow-glow)] flex items-center justify-center gap-2 group">
              <span>Start Building Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-[var(--radius-md)] bg-[var(--card-bg)] border border-[var(--color-border)] hover:bg-[var(--color-border)]/30 transition-all">
              Explore Design DNA
            </button>
          </motion.div>
        </motion.section>

        {/* Feature Bento Grid */}
        <section className="py-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-[var(--font-heading)]">Decomposed Specialist Intelligence</h2>
            <p className="mt-4 text-[var(--text-primary)]/70">Eight specialized engines working in parallel DAG nodes to enforce production craftsmanship.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-8 rounded-[var(--radius-lg)] bg-[var(--card-bg)] border border-[var(--color-border)] shadow-[var(--shadow-card)] relative overflow-hidden group hover:border-[var(--color-primary)]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-[var(--font-heading)] mb-2">Intent Engine & Capability Router</h3>
              <p className="text-[var(--text-primary)]/70 text-sm leading-relaxed">Parses industry requirements, infers brand archetype, and routes tasks to capability specialists.</p>
            </div>

            <div className="p-8 rounded-[var(--radius-lg)] bg-[var(--card-bg)] border border-[var(--color-border)] shadow-[var(--shadow-card)] relative overflow-hidden group hover:border-[var(--color-primary)]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-[var(--font-heading)] mb-2">Anti-AI Pattern Audit</h3>
              <p className="text-[var(--text-primary)]/70 text-sm leading-relaxed">Automatically detects overused glassmorphism, floating blur bubbles, and generic AI templates.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
`;

    return {
      reactCode,
      cssVariables: tokens.colors.background,
      componentSpecs: [
        { name: 'Navigation Header', libraryUsed: 'shadcn/ui' },
        { name: 'Hero Section', libraryUsed: 'Magic UI' },
        { name: 'Feature Bento Grid', libraryUsed: '21st.dev' },
      ],
      dependencies: ['react', 'framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'],
    };
  }
}

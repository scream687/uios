'use client';

import React from 'react';
import { Palette, Layers } from 'lucide-react';
import { BrandTokens } from '@uios/core';

interface BrandDNAExplorerProps {
  tokens: BrandTokens;
  onArchetypeSelect: (archetype: BrandTokens['archetype']) => void;
}

export function BrandDNAExplorer({ tokens, onArchetypeSelect }: BrandDNAExplorerProps) {
  const archetypes: BrandTokens['archetype'][] = [
    'Linear Dark',
    'Apple Minimal',
    'Stripe SaaS',
  ];

  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-2xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#8a99ff]" />
          <h3 className="font-semibold text-sm tracking-wide text-white font-mono">BRAND DNA & TOKEN MEMORY</h3>
        </div>

        <div className="flex gap-1.5">
          {archetypes.map((arch) => (
            <button
              key={arch}
              onClick={() => onArchetypeSelect(arch)}
              className={`text-xs px-2.5 py-1 rounded font-mono transition-all ${
                tokens.archetype === arch
                  ? 'bg-[#5e6ad2] text-white shadow-md'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {arch}
            </button>
          ))}
        </div>
      </div>

      {/* Palette Color Swatches */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
          <span className="text-[10px] font-mono text-gray-400 block mb-1">BACKGROUND</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-white/20" style={{ backgroundColor: tokens.colors.background }} />
            <span className="text-xs font-mono text-white">{tokens.colors.background}</span>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
          <span className="text-[10px] font-mono text-gray-400 block mb-1">PRIMARY ACCENT</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-white/20" style={{ backgroundColor: tokens.colors.primary }} />
            <span className="text-xs font-mono text-white">{tokens.colors.primary}</span>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
          <span className="text-[10px] font-mono text-gray-400 block mb-1">CARD SURFACE</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-white/20" style={{ backgroundColor: tokens.colors.card }} />
            <span className="text-xs font-mono text-white">Glass Surface</span>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
          <span className="text-[10px] font-mono text-gray-400 block mb-1">HEADING FONT</span>
          <span className="text-xs font-mono text-white truncate block">{tokens.typography.fontFamilyHeading.split(',')[0]}</span>
        </div>
      </div>

      {/* CSS Tokens Preview */}
      <div className="bg-black/40 rounded-lg p-3 border border-white/5 font-mono text-xs text-emerald-400 overflow-x-auto">
        <div className="text-gray-500 mb-1">// Compiled CSS Variables Injection</div>
        <div>--bg-primary: {tokens.colors.background};</div>
        <div>--color-primary: {tokens.colors.primary};</div>
        <div>--shadow-glow: {tokens.shadows.glow};</div>
        <div>--ease-motion: {tokens.motion.ease};</div>
      </div>
    </div>
  );
}

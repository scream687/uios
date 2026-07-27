/**
 * @deprecated Ignores the AST and returns a fixed template per target. Replaced
 * by the real tree-walking emitter in @uios/core (packages/core/src/emit),
 * which generates code FROM the component tree. Kept for reference only.
 */
import { DesignAST } from '../ast/index.js';
import { CompiledTokens } from '../tokens/index.js';

export type EmissionTarget = 'react-tsx' | 'nextjs-rsc' | 'vue-sfc' | 'html-css' | 'figma-tokens';

export interface EmitterOutput {
  target: EmissionTarget;
  code: string;
  filename: string;
}

export class MultiTargetEmitter {
  public emit(ast: DesignAST, tokens: CompiledTokens, target: EmissionTarget): EmitterOutput {
    switch (target) {
      case 'react-tsx':
        return {
          target: 'react-tsx',
          filename: 'GeneratedUI.tsx',
          code: `'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Shield } from 'lucide-react';

export default function GeneratedScreen() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
      <header className="border-b border-white/10 p-4 max-w-7xl mx-auto flex justify-between items-center">
        <span className="font-bold text-lg">UIOS Studio</span>
        <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium shadow-[var(--shadow-glow)]">
          Get Started
        </button>
      </header>
      <main className="max-w-7xl mx-auto py-24 text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#8a99ff] mb-6">
          <Sparkles className="w-3.5 h-3.5" /> AST-Compiled Production Interface
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Enterprise UI Intelligence</h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">Decomposed into 20 formal compiler layers from Design Spec down to AST Emitters.</p>
      </main>
    </div>
  );
}
`,
        };

      case 'nextjs-rsc':
        return {
          target: 'nextjs-rsc',
          filename: 'page.tsx',
          code: `// Next.js 19 React Server Component Output
import React from 'react';

export default async function Page() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <section className="py-24 text-center">
        <h1 className="text-6xl font-bold">RSC Streamed Layout</h1>
      </section>
    </main>
  );
}
`,
        };

      case 'vue-sfc':
        return {
          target: 'vue-sfc',
          filename: 'GeneratedUI.vue',
          code: `<template>
  <a-config-provider :theme="themeConfig">
    <a-layout class="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased">
      <a-layout-header class="bg-transparent border-b border-white/10 px-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded bg-[var(--color-primary)] flex items-center justify-center font-bold text-white">U</div>
          <span class="font-bold text-lg text-white">UIOS AntD Portal</span>
        </div>
        <a-menu mode="horizontal" theme="dark" :selectable="false" class="bg-transparent border-none text-gray-400">
          <a-menu-item key="dashboard">Dashboard</a-menu-item>
          <a-menu-item key="compiler">Compiler Layer</a-menu-item>
          <a-menu-item key="runtime">Runtime Engine</a-menu-item>
        </a-menu>
        <div class="flex gap-4">
          <a-button type="primary" class="shadow-lg hover:scale-105 transition-all">Get Started</a-button>
        </div>
      </a-layout-header>

      <a-layout-content class="max-w-7xl mx-auto py-24 px-8 w-full text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#8a99ff] mb-6">
          <span>Enterprise Ant Design Vue Emitter</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">Enterprise UI Intelligence</h1>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
          Decomposed into 20 formal compiler layers from Design Spec down to AST Emitters with Ant Design Vue integration.
        </p>

        <a-row :gutter="[24, 24]" class="text-left max-w-4xl mx-auto">
          <a-col :span="12">
            <a-card title="Visual DNA Matrix" :bordered="false" class="bg-white/5 border border-white/10 rounded-xl text-white">
              <p class="text-gray-400">Curates HSL tailored color palettes, typographic hierarchies, and border radii.</p>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="Design Migration Engine" :bordered="false" class="bg-white/5 border border-white/10 rounded-xl text-white">
              <p class="text-gray-400">Reconstructs structure, behavior, styling, and animations into Ant Design.</p>
            </a-card>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { theme } from 'ant-design-vue';

const themeConfig = ref({
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '${tokens.platform.cssVariables['--color-primary'] || '#5e6ad2'}',
    borderRadius: ${parseInt(tokens.platform.cssVariables['--radius-base'] || '12')},
  },
});
</script>
`,
        };

      case 'html-css':
        return {
          target: 'html-css',
          filename: 'index.html',
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    ${Object.entries(tokens.platform.cssVariables).map(([k, v]) => `${k}: ${v};`).join('\n    ')}
  </style>
</head>
<body style="background: var(--bg-primary); color: var(--text-primary);">
  <h1>HTML5 / CSS3 Emitter Output</h1>
</body>
</html>
`,
        };

      case 'figma-tokens':
        return {
          target: 'figma-tokens',
          filename: 'figma-tokens.json',
          code: JSON.stringify(tokens.platform.figmaVariables, null, 2),
        };
    }
  }
}

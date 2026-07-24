'use client';

import React from 'react';
import { FileCode, Layers, Cpu, Code2 } from 'lucide-react';
import { DesignSpec, DesignASTNode } from '@uios/compiler';

interface DesignSpecViewerProps {
  spec: DesignSpec | null;
  astRoot: DesignASTNode | null;
}

export function DesignSpecViewer({ spec, astRoot }: DesignSpecViewerProps) {
  if (!spec || !astRoot) return null;

  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-[#5e6ad2]" />
          <h3 className="font-semibold text-sm tracking-wide text-white font-mono">
            LAYER 1 & 2: DESIGN SPECIFICATION & AST TREE
          </h3>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#5e6ad2]/20 text-[#8a99ff] border border-[#5e6ad2]/30">
          Strict Schema AST
        </span>
      </div>

      {/* Formal Design Spec YAML Display */}
      <div className="bg-black/50 p-3.5 rounded-lg border border-white/5 font-mono text-xs text-gray-300">
        <div className="text-gray-500 mb-1">// Formal Design Specification YAML</div>
        <div>project.type: {spec.project.type}</div>
        <div>brand.archetype: {spec.brand.archetype}</div>
        <div>brand.personality: [{spec.brand.personality.join(', ')}]</div>
        <div>visual.hierarchy: {spec.visual.hierarchy} (radius: {spec.visual.radiusPx}px)</div>
        <div>motion.style: {spec.motion.style} (maxDuration: {spec.motion.maxDurationMs}ms)</div>
      </div>

      {/* AST Tree Node Metadata Viewer */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-gray-400 block uppercase tracking-wider">
          Compiled Design AST Nodes ({astRoot.children.length + 1} Nodes)
        </span>
        <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#8a99ff]" />
            <span className="text-sm font-medium text-white font-mono">{astRoot.name}</span>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300">
            Library: {astRoot.metadata.library.primary} ({astRoot.metadata.library.priorityScore})
          </span>
        </div>

        {astRoot.children.map((child) => (
          <div key={child.id} className="ml-4 p-3 bg-white/[0.02] border border-white/10 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-sm font-medium text-white font-mono block">{child.name}</span>
                <span className="text-[11px] text-gray-400 font-mono">
                  Variant: {child.metadata.variant} • GPU Budget: {child.metadata.performance.gpuBudgetMs}ms
                </span>
              </div>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              {child.metadata.componentType}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

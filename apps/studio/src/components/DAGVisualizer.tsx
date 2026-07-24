'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, PlayCircle, Cpu, ArrowRight } from 'lucide-react';
import { DAGNode } from '@uios/core';

interface DAGVisualizerProps {
  nodes: DAGNode[];
  activeNodeId: string | null;
}

export function DAGVisualizer({ nodes, activeNodeId }: DAGVisualizerProps) {
  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-2xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#5e6ad2]" />
          <h3 className="font-semibold text-sm tracking-wide text-white font-mono">TASK GRAPH EXECUTION (DAG)</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-[#5e6ad2]/20 text-[#8a99ff] border border-[#5e6ad2]/30 font-mono">
          Parallel Processing Enabled
        </span>
      </div>

      <div className="space-y-3">
        {nodes.map((node, index) => {
          const isActive = activeNodeId === node.id;
          const isCompleted = node.status === 'completed';

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3.5 rounded-lg border transition-all flex items-center justify-between ${
                isActive
                  ? 'bg-[#5e6ad2]/15 border-[#5e6ad2] shadow-[0_0_15px_rgba(94,106,210,0.3)]'
                  : isCompleted
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-white/[0.02] border-white/5 opacity-70'
              }`}
            >
              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isActive ? (
                  <PlayCircle className="w-4 h-4 text-[#8a99ff] animate-pulse shrink-0" />
                ) : (
                  <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80">
                      {node.category}
                    </span>
                    <span className="text-sm font-medium text-white">{node.name}</span>
                  </div>
                  <div className="text-xs text-white/50 mt-1 flex items-center gap-1 font-mono">
                    <span>Capability: {node.assignedCapability}</span>
                    {node.dependencies.length > 0 && (
                      <>
                        <ArrowRight className="w-3 h-3 text-white/30" />
                        <span>Deps: [{node.dependencies.join(', ')}]</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs font-mono uppercase px-2 py-1 rounded ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : isActive
                      ? 'bg-[#5e6ad2]/30 text-[#8a99ff] font-bold'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {node.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

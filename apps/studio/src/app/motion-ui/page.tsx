'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, Layers, Compass, ArrowRight, ShieldCheck, Zap, Command, RefreshCw, Eye, Move } from 'lucide-react';

export default function MotionUIComponentsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Transforms for scroll-driven animations
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.85]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.2]);
  const heroRotateX = useTransform(smoothProgress, [0, 0.25], [0, 15]);
  
  const componentY1 = useTransform(smoothProgress, [0.15, 0.4], [100, 0]);
  const componentOpacity1 = useTransform(smoothProgress, [0.15, 0.35], [0, 1]);

  const cardRotateY = useTransform(smoothProgress, [0.3, 0.6], [-20, 20]);
  const cardScale = useTransform(smoothProgress, [0.35, 0.55], [0.9, 1.05]);

  // Interactive Component States
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success'>('idle');

  const triggerButtonAction = () => {
    setButtonState('loading');
    setTimeout(() => {
      setButtonState('success');
      setTimeout(() => setButtonState('idle'), 2000);
    }, 1200);
  };

  return (
    <div className="min-h-[400vh] bg-[#060709] text-[#f0f2f5] font-sans antialiased selection:bg-[#5e6ad2] selection:text-white relative">
      {/* Scroll Progress Bar Header */}
      {mounted && (
        <motion.div
          style={{ scaleX: smoothProgress }}
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5e6ad2] via-[#8a99ff] to-[#ff3b00] origin-left z-50 shadow-[0_0_15px_#5e6ad2]"
        />
      )}

      {/* Floating Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 bg-[#0f1115]/80 backdrop-blur-2xl border border-white/10 px-8 py-4 rounded-full flex items-center space-x-8 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#5e6ad2] flex items-center justify-center font-bold text-white text-sm shadow-[0_0_20px_rgba(94,106,210,0.6)]">
            M
          </div>
          <span className="font-extrabold text-sm tracking-wider uppercase">UIOS Motion Engine</span>
        </div>

        <div className="hidden sm:flex items-center space-x-6 text-xs font-mono text-white/60">
          <span>Scroll-Driven Transforms</span>
          <span>•</span>
          <span className="text-[#5e6ad2] font-bold">Framer Physics v3</span>
        </div>

        <button
          onClick={() => setIsCommandOpen(true)}
          className="px-4 py-1.5 bg-white/5 border border-white/15 rounded-full hover:bg-white/10 transition-all flex items-center space-x-2 text-xs font-mono"
        >
          <Command className="w-3.5 h-3.5 text-[#5e6ad2]" />
          <span>Cmd + K</span>
        </button>
      </header>

      {/* 1. HERO SCENE: KINETIC SCROLL-TRANSFORMED TITLE */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div
          style={mounted ? { scale: heroScale, opacity: heroOpacity, rotateX: heroRotateX } : {}}
          className="max-w-5xl space-y-8 relative z-10"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#5e6ad2]/15 border border-[#5e6ad2]/40 text-[#8a99ff] text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scroll-Driven Motion Design System</span>
          </div>

          <h1 className="text-6xl sm:text-8xl lg:text-[110px] font-black tracking-[-0.055em] leading-[0.9] text-white">
            Motion-First <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5e6ad2] via-[#8a99ff] to-[#ff3b00]">
              Kinetic Components.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Scroll-linked 60FPS physics transforms, magnetic micro-interactions, and fluid spring dynamics compiled by UIOS.
          </p>

          <div className="pt-4 flex justify-center space-x-4 font-mono text-xs text-white/40">
            <div className="flex items-center space-x-2">
              <Move className="w-4 h-4 text-[#5e6ad2] animate-bounce" />
              <span>Scroll to drive physics engine</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. SCROLL SECTION 01: MAGNETIC BUTTONS & INTERACTIVE CONTROLS */}
      <section className="relative z-20 min-h-screen px-8 py-32 max-w-7xl mx-auto flex flex-col justify-center border-t border-white/10">
        <motion.div style={mounted ? { y: componentY1, opacity: componentOpacity1 } : {}} className="space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-mono text-[#5e6ad2] uppercase tracking-[0.3em]">COMPONENT SUITE 01</span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight">Kinetic Magnetic Buttons</h2>
            <p className="text-white/60 text-lg max-w-xl">Haptic feedback, liquid ripple states, and spring-loaded physics triggers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0f1115] border border-white/15 p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:border-[#5e6ad2]/50 transition-all group">
              <div className="space-y-2">
                <span className="text-xs font-mono text-white/40 uppercase">01 / Magnetic Fluid CTA</span>
                <h3 className="text-xl font-bold">Liquid Ripple Trigger</h3>
              </div>
              <button
                onClick={triggerButtonAction}
                className="w-full py-4 bg-[#5e6ad2] text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-[#707ce6] transition-all flex items-center justify-center space-x-3 shadow-lg shadow-[#5e6ad2]/30 active:scale-[0.97]"
              >
                {buttonState === 'idle' && (
                  <>
                    <span>Execute Physics State</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
                {buttonState === 'loading' && <RefreshCw className="w-4 h-4 animate-spin text-white" />}
                {buttonState === 'success' && (
                  <>
                    <span>State Verified</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </>
                )}
              </button>
            </div>

            <div className="bg-[#0f1115] border border-white/15 p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:border-[#ff3b00]/50 transition-all group">
              <div className="space-y-2">
                <span className="text-xs font-mono text-white/40 uppercase">02 / Neon Pulse Accent</span>
                <h3 className="text-xl font-bold">Vermilion High-Contrast</h3>
              </div>
              <button className="w-full py-4 bg-[#ff3b00] text-black font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-white transition-all flex items-center justify-center space-x-3 shadow-lg shadow-[#ff3b00]/30 active:scale-[0.97]">
                <span>Trigger Kinetic Event</span>
                <Zap className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#0f1115] border border-white/15 p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:border-white/40 transition-all group">
              <div className="space-y-2">
                <span className="text-xs font-mono text-white/40 uppercase">03 / Glassmorphic Sub-Action</span>
                <h3 className="text-xl font-bold">Backdrop Blur Portal</h3>
              </div>
              <button className="w-full py-4 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center space-x-3 active:scale-[0.97]">
                <span>Inspect Surface Matrix</span>
                <Eye className="w-4 h-4 text-[#8a99ff]" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. SCROLL SECTION 02: 3D PARALLAX CARDS & SCROLL-DRIVEN TILT */}
      <section className="relative z-20 min-h-screen px-8 py-32 max-w-7xl mx-auto flex flex-col justify-center border-t border-white/10">
        <div className="space-y-16">
          <div className="space-y-4">
            <span className="text-xs font-mono text-[#5e6ad2] uppercase tracking-[0.3em]">COMPONENT SUITE 02</span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight">3D Scroll-Driven Parallax Cards</h2>
            <p className="text-white/60 text-lg max-w-xl">Rotational velocity and depth displacement reacting to scroll offset.</p>
          </div>

          <motion.div style={mounted ? { rotateY: cardRotateY, scale: cardScale } : {}} className="grid md:grid-cols-2 gap-8 perspective-1000">
            <div className="bg-[#0f1115] border-2 border-[#5e6ad2] p-10 rounded-3xl space-y-6 relative overflow-hidden shadow-[0_0_60px_rgba(94,106,210,0.2)]">
              <div className="flex justify-between items-center text-xs font-mono text-[#8a99ff]">
                <span>PARALLAX DEPTH: 40px</span>
                <span>PHYSICS VELOCITY: 60FPS</span>
              </div>
              <h3 className="text-3xl font-extrabold">Spatial Elevation Monolith</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Cards calculate real-time scroll offset and cursor coordinates to project 3D depth shadows and specular highlight gradients across the viewport.
              </p>
              <div className="pt-4 border-t border-white/10 font-mono text-xs flex justify-between">
                <span>Stiffness: 100</span>
                <span>Damping: 30</span>
              </div>
            </div>

            <div className="bg-[#0f1115] border border-white/20 p-10 rounded-3xl space-y-6 relative overflow-hidden">
              <div className="flex justify-between items-center text-xs font-mono text-[#ff3b00]">
                <span>ROTATIONAL TENSION: 15°</span>
                <span>SPRING BIAS: TRUE</span>
              </div>
              <h3 className="text-3xl font-extrabold">Asymmetric Velocity Surface</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Smooth spring interpolation eliminates layout jank during high-speed vertical scrolling.
              </p>
              <div className="pt-4 border-t border-white/10 font-mono text-xs flex justify-between text-white/50">
                <span>Viewport Intersection: 98%</span>
                <span>GPU Accelerated</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. SCROLL SECTION 03: INTERACTIVE TELEMETRY & COMMAND PALETTE MODAL */}
      <AnimatePresence>
        {isCommandOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setIsCommandOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f1115] border border-[#5e6ad2]/50 w-full max-w-xl rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                  <Command className="w-5 h-5 text-[#5e6ad2]" />
                  <span className="font-extrabold text-lg text-white">UIOS Motion Command Palette</span>
                </div>
                <span className="text-xs font-mono text-white/40">ESC to close</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <button
                  onClick={() => setIsCommandOpen(false)}
                  className="w-full p-4 bg-white/5 hover:bg-[#5e6ad2] hover:text-[#0f1115] rounded-xl text-left transition-all flex justify-between items-center"
                >
                  <span>01. Toggle 60FPS Scroll Telemetry</span>
                  <span className="text-white/40 font-normal">Active</span>
                </button>
                <button
                  onClick={() => setIsCommandOpen(false)}
                  className="w-full p-4 bg-white/5 hover:bg-[#5e6ad2] hover:text-[#0f1115] rounded-xl text-left transition-all flex justify-between items-center"
                >
                  <span>02. Reset Parallax Physics Springs</span>
                  <span className="text-white/40 font-normal">Ready</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-20 px-8 py-16 border-t border-white/10 text-center font-mono text-xs text-white/40">
        <p>© 2026 UIOS Motion Engine • Compiled with Framer Physics v3 & 60FPS Scroll Telemetry</p>
      </footer>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Sparkles, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PreviewProps {
  type: string;
}

export const MotionPreviewRenderer: React.FC<PreviewProps> = ({ type }) => {
  switch (type) {
    case 'anticipation-overshoot':
      return <AnticipationOvershootPreview />;
    case 'kinetic-typography':
      return <KineticTypographyPreview />;
    case 'chromatic-aberration':
      return <ChromaticAberrationPreview />;
    case 'whip-pan':
      return <WhipPanPreview />;
    case 'match-cut':
      return <MatchCutPreview />;
    case 'parallax-2-5d':
      return <ParallaxPreview />;
    case 'scanline-crt-glitch':
      return <ScanlineCrtPreview />;
    case 'squash-and-stretch':
      return <SquashStretchPreview />;
    case 'dolly-zoom':
      return <DollyZoomPreview />;
    case 'magnetic-pull':
      return <MagneticPullPreview />;
    case 'particle-confetti':
      return <ParticleConfettiPreview />;
    case 'rolling-counter':
      return <RollingCounterPreview />;
    case 'skeleton-shimmer':
      return <SkeletonShimmerPreview />;
    case 'ripple-wave':
      return <RippleWavePreview />;
    case 'camera-shake':
      return <CameraShakePreview />;
    default:
      return <DefaultMotionPreview />;
  }
};

/* 1. Anticipation & Overshoot */
export const AnticipationOvershootPreview: React.FC = () => {
  const [trigger, setTrigger] = useState(0);

  return (
    <div className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950/80 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        Physics: Anticipation → Overshoot
      </div>
      <button
        onClick={() => setTrigger((t) => t + 1)}
        className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-neutral-400 bg-neutral-900 hover:bg-neutral-800 hover:text-white rounded-md border border-neutral-800 transition"
      >
        <RotateCcw className="w-3 h-3" /> 重放
      </button>

      <div className="relative w-full max-w-xs h-16 flex items-center">
        {/* Track Line */}
        <div className="absolute inset-x-0 h-0.5 bg-neutral-800" />
        <div className="absolute right-0 w-1.5 h-4 bg-orange-500/40 rounded-full" />

        <motion.div
          key={trigger}
          initial={{ x: 0 }}
          animate={{
            x: [-15, 230, 205, 215, 210],
          }}
          transition={{
            duration: 1.1,
            times: [0.15, 0.55, 0.75, 0.9, 1],
            ease: ['easeInOut', 'easeOut', 'easeInOut', 'easeOut'],
          }}
          className="relative z-10 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-neutral-950 font-bold text-xs shadow-lg shadow-orange-500/20"
        >
          <div className="w-2 h-2 rounded-full bg-neutral-950 animate-ping" />
          <span>BOUNCE CUE</span>
        </motion.div>
      </div>

      <div className="absolute bottom-2.5 text-[11px] text-neutral-400 font-mono">
        向后蓄力 -15px → 极速冲刺 230px → 回弹 210px
      </div>
    </div>
  );
};

/* 2. Kinetic Typography */
export const KineticTypographyPreview: React.FC = () => {
  const [trigger, setTrigger] = useState(0);
  const words = ['MAKE', 'IDEAS', 'MOVE', 'NOW'];

  return (
    <div className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        Typography: Staggered Kinetic Cascade
      </div>
      <button
        onClick={() => setTrigger((t) => t + 1)}
        className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-neutral-400 bg-neutral-900 hover:bg-neutral-800 hover:text-white rounded-md border border-neutral-800 transition"
      >
        <RotateCcw className="w-3 h-3" /> 重放
      </button>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {words.map((word, idx) => (
          <motion.div
            key={`${trigger}-${word}`}
            initial={{ opacity: 0, y: 35, rotateX: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 18,
              delay: idx * 0.1,
            }}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700/60 font-black text-lg md:text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500"
          >
            {word}
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-2.5 text-[11px] text-neutral-400 font-mono">
        交错时差 0.1s · 弹簧刚度 300 · 3D 轴倾角入场
      </div>
    </div>
  );
};

/* 3. Chromatic Aberration (RGB Split) */
export const ChromaticAberrationPreview: React.FC = () => {
  const [glitching, setGlitching] = useState(false);
  const [offset, setOffset] = useState(4);

  const triggerGlitch = () => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 800);
  };

  return (
    <div
      onClick={triggerGlitch}
      className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none cursor-pointer group"
    >
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        VFX: RGB Channel Split
      </div>
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-neutral-400 bg-neutral-900 rounded-md border border-neutral-800">
        点击画面冲击
      </div>

      <div className="relative text-3xl md:text-4xl font-black tracking-widest uppercase">
        {/* Red Split */}
        <motion.span
          animate={{
            x: glitching ? [-8, 6, -4, 2, 0] : [-offset, -offset],
            opacity: glitching ? [1, 0.9, 1] : 0.8,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 text-red-500 mix-blend-screen pointer-events-none select-none"
        >
          GLITCH
        </motion.span>
        {/* Cyan Split */}
        <motion.span
          animate={{
            x: glitching ? [8, -6, 4, -2, 0] : [offset, offset],
            opacity: glitching ? [1, 0.9, 1] : 0.8,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 text-cyan-400 mix-blend-screen pointer-events-none select-none"
        >
          GLITCH
        </motion.span>
        {/* Main Base */}
        <span className="relative text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
          GLITCH
        </span>
      </div>

      <div className="absolute bottom-2.5 flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
        <span>色散偏移:</span>
        <input
          type="range"
          min="1"
          max="12"
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          onClick={(e) => e.stopPropagation()}
          className="w-20 accent-pink-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
        />
        <span>{offset}px</span>
      </div>
    </div>
  );
};

/* 4. Whip Pan Transition */
export const WhipPanPreview: React.FC = () => {
  const [scene, setScene] = useState(0);
  const [animating, setAnimating] = useState(false);

  const doWhipPan = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setScene((s) => (s === 0 ? 1 : 0));
      setAnimating(false);
    }, 450);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        Transition: Directional Whip Blur
      </div>
      <button
        onClick={doWhipPan}
        disabled={animating}
        className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-neutral-400 bg-neutral-900 hover:bg-neutral-800 hover:text-white rounded-md border border-neutral-800 transition"
      >
        <RotateCcw className="w-3 h-3" /> 甩镜切场
      </button>

      <div className="relative w-48 h-28 rounded-lg overflow-hidden border border-neutral-700/60 bg-neutral-900">
        <motion.div
          animate={
            animating
              ? {
                  x: [0, -280, 280, 0],
                  filter: ['blur(0px)', 'blur(16px)', 'blur(16px)', 'blur(0px)'],
                }
              : { x: 0, filter: 'blur(0px)' }
          }
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="w-full h-full flex flex-col items-center justify-center font-bold"
        >
          {scene === 0 ? (
            <div className="flex flex-col items-center text-amber-400">
              <span className="text-2xl">🌅</span>
              <span className="text-xs font-mono tracking-wider mt-1">SCENE A · SUNRISE</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-indigo-400">
              <span className="text-2xl">🌃</span>
              <span className="text-xs font-mono tracking-wider mt-1">SCENE B · CYBER CITY</span>
            </div>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-2.5 text-[11px] text-neutral-400 font-mono">
        急速横甩 · 峰值高斯模糊 16px · 贝塞尔极速曲线
      </div>
    </div>
  );
};

/* 5. Match Cut */
export const MatchCutPreview: React.FC = () => {
  const [phase, setPhase] = useState<'coffee' | 'clock'>('coffee');

  const togglePhase = () => {
    setPhase((p) => (p === 'coffee' ? 'clock' : 'coffee'));
  };

  return (
    <div
      onClick={togglePhase}
      className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none cursor-pointer"
    >
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        Transition: Geometric Match Cut
      </div>
      <div className="absolute top-2.5 right-2.5 text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-800">
        点击切换形状
      </div>

      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Persistent Anchor Circle */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-neutral-700 animate-spin" style={{ animationDuration: '20s' }} />

        <AnimatePresence mode="wait">
          {phase === 'coffee' ? (
            <motion.div
              key="coffee"
              initial={{ scale: 0.6, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 1.3, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'backOut' }}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-700 to-amber-500 flex flex-col items-center justify-center text-white shadow-xl shadow-amber-900/30"
            >
              <span className="text-xl">☕</span>
              <span className="text-[9px] font-mono font-bold mt-0.5">COFFEE</span>
            </motion.div>
          ) : (
            <motion.div
              key="clock"
              initial={{ scale: 0.6, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 1.3, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'backOut' }}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 flex flex-col items-center justify-center text-white shadow-xl shadow-cyan-900/30"
            >
              <span className="text-xl">⏱️</span>
              <span className="text-[9px] font-mono font-bold mt-0.5">CLOCK</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-2.5 text-[11px] text-neutral-400 font-mono">
        正圆几何轮廓锁定 · 旋转中点瞬间形态互换
      </div>
    </div>
  );
};

/* 6. Parallax 2.5D Layering */
export const ParallaxPreview: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none cursor-crosshair"
    >
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        Camera: 2.5D Layered Parallax
      </div>
      <div className="absolute top-2.5 right-2.5 text-xs font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
        悬浮移动光标
      </div>

      {/* Layer 1: Background Grid (Low speed: 10px) */}
      <motion.div
        animate={{ x: -mousePos.x * 12, y: -mousePos.y * 12 }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"
      />

      {/* Layer 2: Midground Card (Standard speed: 30px) */}
      <motion.div
        animate={{
          x: -mousePos.x * 35,
          y: -mousePos.y * 35,
          rotateY: mousePos.x * 20,
          rotateX: -mousePos.y * 20,
        }}
        className="relative z-10 px-5 py-3 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 shadow-2xl flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400 font-bold text-sm">
          3D
        </div>
        <div>
          <div className="text-xs font-bold text-neutral-200">MIDGROUND PLANE</div>
          <div className="text-[10px] font-mono text-neutral-500">depthFactor = 1.0</div>
        </div>
      </motion.div>

      {/* Layer 3: Foreground Sparkles (Fast speed: 65px + blur) */}
      <motion.div
        animate={{ x: -mousePos.x * 70, y: -mousePos.y * 70 }}
        className="absolute z-20 pointer-events-none flex gap-12"
      >
        <div className="w-3 h-3 rounded-full bg-cyan-400/80 blur-[1px] shadow-[0_0_10px_#22d3ee]" />
        <div className="w-2 h-2 rounded-full bg-pink-400/80 blur-[1px] shadow-[0_0_8px_#f472b6]" />
      </motion.div>

      <div className="absolute bottom-2.5 text-[11px] text-neutral-400 font-mono">
        远景 0.3x · 主体 1.0x (带透视角度) · 前景 2.0x (近大远快)
      </div>
    </div>
  );
};

/* 7. Scanline CRT Glitch */
export const ScanlineCrtPreview: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        VFX: Retro CRT Scanlines & Sync Tear
      </div>

      {/* Screen Frame with scanlines */}
      <div className="relative w-64 h-28 rounded-lg bg-black border-2 border-emerald-950 p-3 overflow-hidden flex flex-col justify-center items-center shadow-[inset_0_0_20px_rgba(16,185,129,0.2)]">
        {/* CRT Curved Screen Mask & Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0, 255, 128, 0.15) 0px, transparent 2px, transparent 4px)',
          }}
        />

        <motion.div
          animate={{
            x: [0, -3, 4, 0, -6, 2, 0],
            filter: [
              'drop-shadow(0 0 4px #10b981)',
              'drop-shadow(0 0 10px #10b981)',
              'drop-shadow(0 0 4px #10b981)',
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: 'loop',
            times: [0, 0.4, 0.42, 0.44, 0.8, 0.82, 1],
          }}
          className="font-mono text-emerald-400 text-sm font-bold tracking-widest text-center"
        >
          <div>&gt; REMOTION_SYS_V2</div>
          <div className="text-[10px] text-emerald-600 mt-1">STATUS: BUFFERING SIGNAL...</div>
        </motion.div>
      </div>

      <div className="absolute bottom-2.5 text-[11px] text-neutral-400 font-mono">
        阴极射线扫描线 · 荧光屏绿光发散 · 随机微秒级撕裂跳线
      </div>
    </div>
  );
};

/* 8. Squash and Stretch */
export const SquashStretchPreview: React.FC = () => {
  const [trigger, setTrigger] = useState(0);

  return (
    <div className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        Physics: Squash & Stretch Volume Conserve
      </div>
      <button
        onClick={() => setTrigger((t) => t + 1)}
        className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-neutral-400 bg-neutral-900 hover:bg-neutral-800 hover:text-white rounded-md border border-neutral-800 transition"
      >
        <RotateCcw className="w-3 h-3" /> 弹跳
      </button>

      {/* Bounce floor */}
      <div className="relative w-48 h-28 flex items-end justify-center pb-2">
        <div className="absolute bottom-2 w-32 h-1 bg-neutral-800 rounded-full" />

        <motion.div
          key={trigger}
          animate={{
            y: [-70, 0, -45, 0, -15, 0],
            scaleY: [1.3, 0.6, 1.15, 0.85, 1.05, 1],
            scaleX: [0.75, 1.45, 0.85, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 1.6,
            times: [0, 0.35, 0.65, 0.85, 0.95, 1],
            ease: ['easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut'],
          }}
          style={{ originY: 1 }}
          className="w-12 h-12 rounded-2xl bg-gradient-to-t from-pink-500 to-rose-400 shadow-lg shadow-pink-500/30 flex items-center justify-center text-white font-bold text-xs"
        >
          JELLY
        </motion.div>
      </div>

      <div className="absolute bottom-2.5 text-[11px] text-neutral-400 font-mono">
        下坠沿轴拉长 scaleY: 1.3 · 触地压扁 scaleX: 1.45 维持体积守恒
      </div>
    </div>
  );
};

/* 9. Dolly Zoom (Vertigo Effect) */
export const DollyZoomPreview: React.FC = () => {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        Camera: Dolly Zoom (Vertigo FOV Warp)
      </div>

      <div className="relative w-56 h-28 rounded-lg overflow-hidden border border-neutral-800 flex items-center justify-center">
        {/* Background perspective grid that warps */}
        <motion.div
          animate={{ scale: zoom }}
          transition={{ duration: 0.1 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/60 via-neutral-950 to-black flex items-center justify-center"
        >
          <div className="w-full h-full border border-neutral-800 flex items-center justify-center text-neutral-700 text-xs font-mono">
            [PERSPECTIVE BACKGROUND GRID]
          </div>
        </motion.div>

        {/* Foreground subject whose scale remains fixed */}
        <div className="relative z-10 px-4 py-2 rounded-lg bg-neutral-900/90 border border-neutral-600 text-white font-bold text-xs shadow-2xl">
          🎯 SUBJECT (SCALE = 1.0)
        </div>
      </div>

      <div className="absolute bottom-2 flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
        <span>变焦推拉拉扯:</span>
        <input
          type="range"
          min="0.5"
          max="2.5"
          step="0.05"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="w-24 accent-violet-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
        />
        <span>FOV {zoom.toFixed(2)}x</span>
      </div>
    </div>
  );
};

/* 10. Magnetic Pull */
export const MagneticPullPreview: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.hypot(dx, dy);

    if (distance < 100) {
      setPosition({ x: dx * 0.35, y: dy * 0.35 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none cursor-pointer"
    >
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        Micro-Interaction: Magnetic Gravity Pull
      </div>
      <div className="absolute top-2.5 right-2.5 text-xs font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
        把光标移近按钮
      </div>

      <div ref={buttonRef} className="relative p-8">
        <motion.button
          animate={{ x: position.x, y: position.y }}
          transition={{ type: 'spring', stiffness: 250, damping: 15 }}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center gap-2 border border-white/20 hover:scale-105 transition-transform"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>MAGNETIC BUTTON</span>
        </motion.button>
      </div>

      <div className="absolute bottom-2.5 text-[11px] text-neutral-400 font-mono">
        100px 范围引力吸附 · 移出自动弹簧平滑阻尼回弹
      </div>
    </div>
  );
};

/* 11. Particle Confetti Burst */
export const ParticleConfettiPreview: React.FC = () => {
  const triggerConfetti = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#f43f5e', '#38bdf8', '#fbbf24', '#a855f7', '#10b981'],
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        Particles: Confetti Cannon Physics
      </div>

      <button
        onClick={triggerConfetti}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 text-neutral-950 font-black text-xs tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        <span>发射高能彩屑粒子</span>
      </button>

      <div className="absolute bottom-2.5 text-[11px] text-neutral-400 font-mono">
        多向初速度角散开 · 重力加速度 g + 空气阻力阻尼飘落
      </div>
    </div>
  );
};

/* 12. Rolling Counter (Odometer) */
export const RollingCounterPreview: React.FC = () => {
  const [val, setVal] = useState(12800);

  const rollNew = () => {
    setVal(Math.floor(10000 + Math.random() * 89000));
  };

  const digits = val.toString().split('');

  return (
    <div className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        Typography: Number Odometer Reel
      </div>
      <button
        onClick={rollNew}
        className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-neutral-400 bg-neutral-900 hover:bg-neutral-800 hover:text-white rounded-md border border-neutral-800 transition"
      >
        <RotateCcw className="w-3 h-3" /> 随机数值
      </button>

      <div className="flex items-center gap-1 bg-neutral-900/90 px-5 py-3 rounded-2xl border border-neutral-700 font-mono text-3xl md:text-4xl font-black text-cyan-400">
        <span className="text-neutral-500 text-2xl mr-1">￥</span>
        {digits.map((digit, i) => (
          <div key={i} className="h-10 w-7 overflow-hidden relative flex justify-center">
            <motion.div
              key={`${digit}-${i}`}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 20,
                delay: i * 0.05,
              }}
              className="absolute text-center"
            >
              {digit}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-2.5 text-[11px] text-neutral-400 font-mono">
        独立数位通道 · 错峰级联延时 · 指数级减速卡位
      </div>
    </div>
  );
};

/* 13. Skeleton Shimmer Wave */
export const SkeletonShimmerPreview: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        Micro-Interaction: Skeleton Shimmer Wave
      </div>

      <div className="w-64 p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2.5">
        <div className="relative h-4 w-3/4 rounded bg-neutral-800 overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />
        </div>
        <div className="relative h-3 w-full rounded bg-neutral-800 overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 0.1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />
        </div>
        <div className="relative h-3 w-1/2 rounded bg-neutral-800 overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />
        </div>
      </div>

      <div className="absolute bottom-2.5 text-[11px] text-neutral-400 font-mono">
        -100% 至 +200% 渐变横扫 · 呼吸感平滑等待
      </div>
    </div>
  );
};

/* 14. Ripple Wave Burst */
export const RippleWavePreview: React.FC = () => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleTrigger = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((r) => [...r, { id, x, y }]);
    setTimeout(() => {
      setRipples((r) => r.filter((item) => item.id !== id));
    }, 900);
  };

  return (
    <div
      onClick={handleTrigger}
      className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none cursor-pointer"
    >
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        VFX: Concentric Shockwave Ripple
      </div>
      <div className="absolute top-2.5 right-2.5 text-xs font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
        在画布任意位置点击
      </div>

      <div className="text-center text-xs font-mono text-neutral-500 pointer-events-none">
        [CLICK TO SPAWN SHOCKWAVE]
      </div>

      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.9 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          style={{ left: ripple.x - 30, top: ripple.y - 30 }}
          className="absolute w-16 h-16 rounded-full border-2 border-cyan-400 pointer-events-none shadow-[0_0_15px_#22d3ee]"
        />
      ))}

      <div className="absolute bottom-2.5 text-[11px] text-neutral-400 font-mono">
        同心光环指数级向外爆炸 · 透明度非线性衰减
      </div>
    </div>
  );
};

/* 15. Camera Shake Noise */
export const CameraShakePreview: React.FC = () => {
  const [shaking, setShaking] = useState(false);

  const triggerImpact = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
        Camera: Handheld Float & Impact Shake
      </div>
      <button
        onClick={triggerImpact}
        className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-neutral-400 bg-neutral-900 hover:bg-neutral-800 hover:text-white rounded-md border border-neutral-800 transition"
      >
        <RotateCcw className="w-3 h-3" /> 重击震颤
      </button>

      <motion.div
        animate={
          shaking
            ? {
                x: [-12, 10, -8, 6, -3, 0],
                y: [8, -7, 5, -4, 2, 0],
                rotate: [-2, 2, -1, 1, 0],
              }
            : {
                x: [0, 2, -2, 0],
                y: [0, -3, 2, 0],
              }
        }
        transition={
          shaking
            ? { duration: 0.45, ease: 'easeOut' }
            : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
        }
        className="px-6 py-4 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 shadow-xl flex items-center gap-3"
      >
        <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
        <span className="font-mono text-sm font-bold text-neutral-200">
          {shaking ? '💥 SCREEN JUICE IMPACT!' : '🎥 HANDHELD CAMERA RIG'}
        </span>
      </motion.div>

      <div className="absolute bottom-2.5 text-[11px] text-neutral-400 font-mono">
        平视手持微晃 · 击打时 8 帧高频指数衰减震荡
      </div>
    </div>
  );
};

/* Default fallback preview */
export const DefaultMotionPreview: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-48 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden p-4 select-none">
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95], rotate: [0, 4, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600/30 to-indigo-600/30 border border-violet-500/40 text-violet-300 font-mono text-xs font-bold"
      >
        ✨ DYNAMIC MOTION PREVIEW
      </motion.div>
    </div>
  );
};

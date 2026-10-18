'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Sparkles,
  Sliders,
  ChevronDown,
  Plus,
  Minus,
  Check,
  X,
  Bell,
  Send,
  Home,
  Compass,
  Settings,
  Folder,
  User,
  Heart,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PreviewProps {
  type: string;
}

export const MotionPreviewRenderer: React.FC<PreviewProps> = ({ type }) => {
  switch (type) {
    // 导航 Navigation
    case 'pill-bar':
      return <PillBarPreview />;
    case 'segmented-control':
      return <SegmentedControlPreview />;
    case 'floating-dock':
      return <FloatingDockPreview />;
    case 'rail-navigation':
      return <RailNavigationPreview />;

    // 容器 Containers
    case 'bottom-sheet':
      return <BottomSheetPreview />;
    case 'accordion':
      return <AccordionPreview />;
    case 'marquee':
      return <MarqueePreview />;
    case 'stacked-cards':
      return <StackedCardsPreview />;

    // 控件 Controls
    case 'chips-tags':
      return <ChipsTagsPreview />;
    case 'fab-button':
      return <FabButtonPreview />;
    case 'stepper':
      return <StepperPreview />;
    case 'ghost-button':
      return <GhostButtonPreview />;

    // 提示 Feedback
    case 'toast-preview':
      return <ToastPreview />;
    case 'popover-preview':
      return <PopoverPreview />;
    case 'status-badge':
      return <StatusBadgePreview />;

    // 等待 Loading
    case 'skeleton-shimmer':
      return <SkeletonShimmerPreview />;
    case 'blur-up':
      return <BlurUpPreview />;
    case 'typing-dots':
      return <TypingDotsPreview />;
    case 'optimistic-ghost':
      return <OptimisticGhostPreview />;

    // 动效 Motion
    case 'spring-overshoot':
    case 'anticipation-overshoot':
      return <SpringOvershootPreview />;
    case 'magnetic-pull':
      return <MagneticPullPreview />;
    case 'shared-element':
      return <SharedElementPreview />;

    // 材质 Aesthetics
    case 'glassmorphism':
      return <GlassmorphismPreview />;
    case 'border-beam':
      return <BorderBeamPreview />;
    case 'spotlight-glow':
    case 'neo-brutalism':
      return <SpotlightGlowPreview />;

    // 横幅 Banner
    case 'announcement-bar':
      return <AnnouncementBarPreview />;
    case 'hero-banner':
      return <HeroBannerPreview />;
    case 'carousel-banner':
      return <CarouselBannerPreview />;
    case 'corner-ribbon':
      return <CornerRibbonPreview />;

    // 风格 Style (全页全局设计流派)
    case 'style-linear-dark':
      return <StyleLinearDarkPreview />;
    case 'style-neo-brutalism':
      return <StyleNeoBrutalismPreview />;
    case 'style-bento-grid':
      return <StyleBentoGridPreview />;
    case 'style-clean-minimal':
      return <StyleCleanMinimalPreview />;
    case 'style-editorial-brutalist':
      return <StyleEditorialBrutalistPreview />;
    case 'style-cyberpunk-hud':
    case 'style-cyberpunk':
      return <StyleCyberpunkHudPreview />;
    case 'style-claymorphism':
      return <StyleClaymorphismPreview />;
    case 'style-retro-os':
      return <StyleRetroOsPreview />;

    default:
      return <DefaultMotionPreview />;
  }
};

/* =========================================================
   1. NAVIGATION 导航类
   ========================================================= */

/* 1.1 胶囊栏 Pill Bar */
export const PillBarPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('设计');
  const tabs = ['全部', '设计', '交互', '研发'];

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase">
        Navigation: Pill Bar (Capsule)
      </div>
      <div className="text-xs text-neutral-400 mb-3">点击切换胶囊指示器：</div>

      <div className="flex items-center gap-1 p-1.5 rounded-full bg-neutral-900 border border-neutral-800 shadow-inner">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(tab);
              }}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors z-10 ${
                isActive ? 'text-white font-bold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab}
              {isActive && (
                <motion.div
                  layoutId="preview-active-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full -z-10 shadow-md shadow-cyan-500/25"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* 1.2 分段控制器 Segmented Control */
export const SegmentedControlPreview: React.FC = () => {
  const [selected, setSelected] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase">
        Navigation: Segmented Control
      </div>
      <div className="text-xs text-neutral-400 mb-3">iOS 风格双/三段互斥滑块：</div>

      <div className="flex items-center p-1 rounded-xl bg-neutral-900/90 border border-neutral-800 w-64 shadow-inner">
        {(['daily', 'weekly', 'monthly'] as const).map((mode) => {
          const isSel = selected === mode;
          const label = mode === 'daily' ? '按日' : mode === 'weekly' ? '按周' : '按月';
          return (
            <button
              key={mode}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(mode);
              }}
              className={`relative flex-1 py-1.5 text-xs font-medium text-center transition-colors z-10 ${
                isSel ? 'text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {label}
              {isSel && (
                <motion.div
                  layoutId="preview-segment-bg"
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  className="absolute inset-0 bg-white rounded-lg -z-10 shadow-sm"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* 1.3 停靠栏 / 灵动岛 Floating Dock */
export const FloatingDockPreview: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const icons = [
    { icon: Home, label: '主页' },
    { icon: Compass, label: '探索' },
    { icon: Folder, label: '项目' },
    { icon: Settings, label: '设置' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase">
        Navigation: Floating Dock (Mac OS 风格)
      </div>
      <div className="text-xs text-neutral-400 mb-3">悬停感受图标弹性放大：</div>

      <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-neutral-900/90 border border-neutral-700/60 shadow-xl backdrop-blur-md">
        {icons.map((item, idx) => {
          const isHover = hoveredIdx === idx;
          const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

          const scale = isHover ? 1.35 : isNeighbor ? 1.15 : 1;
          const y = isHover ? -6 : isNeighbor ? -2 : 0;

          return (
            <motion.div
              key={idx}
              animate={{ scale, y }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-cyan-400 cursor-pointer shadow-md"
            >
              <item.icon className="w-4 h-4" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* 1.4 轨道导航 Navigation Rail */
export const RailNavigationPreview: React.FC = () => {
  const [active, setActive] = useState(0);
  const items = [Home, Compass, Folder, User];

  return (
    <div className="relative flex items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase">
        Navigation: Rail (单列极简轨道)
      </div>

      <div className="flex flex-col items-center gap-2 p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800">
        {items.map((Icon, idx) => {
          const isAct = active === idx;
          return (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActive(idx);
              }}
              className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                isAct ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Icon className="w-4 h-4 z-10" />
              {isAct && (
                <motion.div
                  layoutId="preview-rail-active"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="absolute inset-0 bg-cyan-600 rounded-xl"
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="ml-4 text-xs text-neutral-400">
        常用于大屏中继过渡，仅保留纵向图标轨道。
      </div>
    </div>
  );
};

/* =========================================================
   2. CONTAINERS 容器类
   ========================================================= */

/* 2.1 抽屉底板 Bottom Sheet */
export const BottomSheetPreview: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none overflow-hidden">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-orange-400/80 uppercase">
        Container: Bottom Sheet
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="px-3.5 py-1.5 rounded-xl bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/40 text-orange-300 text-xs font-semibold transition"
      >
        {open ? '收起底板' : '从底部滑出面板 (Sheet)'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className="absolute bottom-0 inset-x-6 h-28 bg-neutral-900 border-t border-x border-orange-500/30 rounded-t-2xl p-3 shadow-2xl flex flex-col justify-between"
          >
            {/* Grab Handle */}
            <div className="w-8 h-1 bg-neutral-600 rounded-full mx-auto" />
            <div className="text-center text-xs text-neutral-200">
              <span className="font-bold text-orange-400">Bottom Sheet 面板已展开</span>
              <p className="text-[11px] text-neutral-400 mt-0.5">支持拖动手势与多档位停驻</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="text-[11px] text-neutral-400 hover:text-white underline text-center"
            >
              点击关闭
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* 2.2 手风琴 Accordion */
export const AccordionPreview: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items = [
    { title: '手风琴的核心原则是什么？', content: '折叠非重点内容，保持页面垂直纵深紧凑。' },
    { title: '展开时的高度如何自适应？', content: '通常利用 Grid 0fr->1fr 或 Framer Motion 测量高度。' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-3 select-none">
      <div className="absolute top-2.5 left-3 text-[10px] font-mono tracking-widest text-orange-400/80 uppercase">
        Container: Accordion (手风琴)
      </div>

      <div className="w-full max-w-xs space-y-1.5 mt-4">
        {items.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-neutral-800 rounded-xl bg-neutral-900/90 overflow-hidden"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIdx(isOpen ? null : idx);
                }}
                className="w-full px-3 py-1.5 flex items-center justify-between text-left text-xs text-neutral-200 hover:text-white"
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${
                    isOpen ? 'rotate-180 text-orange-400' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden px-3 pb-2 text-[11px] text-neutral-400 border-t border-neutral-800/60"
                  >
                    {item.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* 2.3 跑马灯 Marquee */
export const MarqueePreview: React.FC = () => {
  const items = ['NEXT.JS', 'TAILWIND', 'FRAMER MOTION', 'PRISMA', 'REACT 19', 'LUCIDE'];

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none overflow-hidden">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-orange-400/80 uppercase">
        Container: Marquee (跑马灯)
      </div>
      <div className="text-xs text-neutral-400 mb-3">无缝横向循环滚动 Logo 墙：</div>

      <div className="relative w-full max-w-xs overflow-hidden flex items-center border-y border-neutral-800 py-2">
        <motion.div
          animate={{ x: [0, -180] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 6 }}
          className="flex items-center gap-4 whitespace-nowrap"
        >
          {[...items, ...items].map((text, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-orange-400/90 font-bold"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/* 2.4 堆叠卡片 Stacked Cards */
export const StackedCardsPreview: React.FC = () => {
  const [cards, setCards] = useState([
    { id: 1, title: '卡片 1 · 视觉层级', color: 'from-orange-600 to-amber-600' },
    { id: 2, title: '卡片 2 · 空间堆叠', color: 'from-amber-600 to-yellow-600' },
    { id: 3, title: '卡片 3 · 交互流转', color: 'from-yellow-600 to-red-600' },
  ]);

  const cycleCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-orange-400/80 uppercase">
        Container: Stacked Cards
      </div>

      <div className="relative w-48 h-24 flex items-center justify-center">
        {cards.map((c, idx) => {
          const isTop = idx === 0;
          return (
            <motion.div
              key={c.id}
              onClick={cycleCard}
              animate={{
                scale: 1 - idx * 0.08,
                y: idx * 8,
                zIndex: cards.length - idx,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`absolute inset-0 rounded-xl p-3 shadow-lg border border-neutral-700 bg-gradient-to-br ${c.color} text-white cursor-pointer flex flex-col justify-between`}
            >
              <div className="text-[11px] font-bold">{c.title}</div>
              {isTop && (
                <div className="text-[10px] opacity-80 text-right">点击抽换下一张 ➔</div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* =========================================================
   3. CONTROLS 控件类
   ========================================================= */

/* 3.1 胶囊标签选择器 Chips */
export const ChipsTagsPreview: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(['Tailwind']);
  const tags = ['Tailwind', 'Next.js', 'Framer', 'AI Prompt'];

  const toggle = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-emerald-400/80 uppercase">
        Controls: Chips (胶囊标签)
      </div>
      <div className="text-xs text-neutral-400 mb-3">点击选中/取消小胶囊标签：</div>

      <div className="flex flex-wrap items-center justify-center gap-2 max-w-xs">
        {tags.map((tag) => {
          const isSel = selected.includes(tag);
          return (
            <button
              key={tag}
              onClick={(e) => toggle(e, tag)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isSel
                  ? 'bg-emerald-500 text-neutral-950 font-bold shadow-md shadow-emerald-500/25 scale-105'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {isSel && <Check className="w-3 h-3 stroke-[3]" />}
              <span>{tag}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* 3.2 悬浮动作按钮 FAB */
export const FabButtonPreview: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-emerald-400/80 uppercase">
        Controls: FAB (悬浮操作钮)
      </div>

      <div className="relative flex flex-col items-end gap-2">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="flex flex-col gap-1.5 items-end"
            >
              <div className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-emerald-400 font-mono shadow-md">
                新建草稿
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-emerald-400 font-mono shadow-md">
                快速分享
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-transform active:scale-90"
        >
          <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </motion.div>
        </button>
      </div>
      <div className="text-[11px] text-neutral-500 mt-2">常驻右下角的主行动触发器</div>
    </div>
  );
};

/* 3.3 步进器 Stepper */
export const StepperPreview: React.FC = () => {
  const [count, setCount] = useState(3);

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-emerald-400/80 uppercase">
        Controls: Stepper (步进器)
      </div>

      <div className="flex items-center gap-2 p-1 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-inner">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCount((c) => Math.max(0, c - 1));
          }}
          className="w-8 h-8 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 active:scale-95 transition"
        >
          <Minus className="w-4 h-4" />
        </button>

        <motion.span
          key={count}
          initial={{ scale: 0.8, y: -2 }}
          animate={{ scale: 1, y: 0 }}
          className="w-10 text-center font-mono font-bold text-emerald-400 text-sm"
        >
          {count}
        </motion.span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setCount((c) => c + 1);
          }}
          className="w-8 h-8 rounded-xl bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 active:scale-95 transition"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="text-xs text-neutral-400 mt-3">加减控制数量，带数字弹性刷新。</div>
    </div>
  );
};

/* 3.4 幽灵按钮 Ghost Button */
export const GhostButtonPreview: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-emerald-400/80 uppercase">
        Controls: Ghost Button (幽灵线框钮)
      </div>

      <button
        onClick={(e) => e.stopPropagation()}
        className="px-5 py-2.5 rounded-xl border border-emerald-500/60 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 text-xs font-mono font-bold tracking-wider transition-all duration-300"
      >
        VIEW DOCUMENTATION ➔
      </button>
      <div className="text-[11px] text-neutral-400 mt-3 text-center max-w-xs">
        纯透明无底色，仅保留轮廓线框，降低视觉噪音。
      </div>
    </div>
  );
};

/* =========================================================
   4. FEEDBACK 提示类
   ========================================================= */

/* 4.1 吐司 Toast */
export const ToastPreview: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showToast = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(true);
    setTimeout(() => setVisible(false), 2400);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none overflow-hidden">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-indigo-400/80 uppercase">
        Feedback: Toast (吐司轻提示)
      </div>

      <button
        onClick={showToast}
        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition active:scale-95"
      >
        触发 Toast 提示
      </button>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="absolute bottom-3 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 border border-indigo-500/50 shadow-2xl text-xs text-white"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
            <span>配置已自动保存至云端</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* 4.2 气泡卡片 Popover */
export const PopoverPreview: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-indigo-400/80 uppercase">
        Feedback: Popover (气泡浮层)
      </div>

      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs text-indigo-300 font-mono flex items-center gap-1.5"
        >
          <span>查看详情气泡</span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 p-2.5 rounded-xl bg-neutral-900 border border-indigo-500/40 shadow-xl z-20 text-[11px] text-neutral-300"
            >
              <div className="font-bold text-white mb-1">Popover 卡片</div>
              带有小三角指向，可内嵌复杂交互按钮与文本。
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* 4.3 状态徽标 Status Badge */
export const StatusBadgePreview: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-indigo-400/80 uppercase">
        Feedback: Status Badge (状态徽标)
      </div>

      <div className="flex items-center gap-6">
        {/* Avatar with pulse green dot */}
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300">
            <User className="w-6 h-6" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-neutral-950" />
          </span>
        </div>

        {/* Count Pill */}
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300">
            <Bell className="w-6 h-6" />
          </div>
          <span className="absolute -top-1.5 -right-2 px-1.5 py-0.5 rounded-full bg-rose-500 text-[10px] font-bold text-white border-2 border-neutral-950">
            9+
          </span>
        </div>
      </div>
      <div className="text-xs text-neutral-400 mt-3">在线绿点呼吸脉冲 / 未读数小红点胶囊</div>
    </div>
  );
};

/* =========================================================
   5. LOADING 等待类
   ========================================================= */

/* 5.1 骨架微光 Skeleton Shimmer */
export const SkeletonShimmerPreview: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-rose-400/80 uppercase">
        Loading: Skeleton Shimmer (骨架屏)
      </div>

      <div className="w-full max-w-xs space-y-2.5">
        <div className="flex items-center gap-3">
          {/* Avatar skeleton */}
          <div className="relative w-10 h-10 rounded-full bg-neutral-800 overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700/60 to-transparent"
            />
          </div>
          {/* Lines skeleton */}
          <div className="flex-1 space-y-1.5">
            <div className="relative h-3 w-3/4 bg-neutral-800 rounded overflow-hidden">
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700/60 to-transparent"
              />
            </div>
            <div className="relative h-2.5 w-1/2 bg-neutral-800 rounded overflow-hidden">
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700/60 to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-[11px] text-neutral-400 mt-3">以低保真色块 + 45°扫光维持版面平衡。</div>
    </div>
  );
};

/* 5.2 渐进模糊占位 Blur-up */
export const BlurUpPreview: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-rose-400/80 uppercase">
        Loading: Blur-up (渐进式模糊占位)
      </div>

      <div className="flex items-center gap-4">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setLoaded(!loaded);
          }}
          className="relative w-28 h-20 rounded-xl overflow-hidden cursor-pointer border border-neutral-700 shadow-md"
        >
          <div
            className={`w-full h-full bg-gradient-to-tr from-purple-600 via-rose-500 to-amber-400 transition-all duration-700 ${
              loaded ? 'blur-0 scale-100' : 'blur-md scale-110'
            }`}
          />
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white/90 bg-black/20">
            {loaded ? '高清加载完毕' : '模糊占位中...'}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setLoaded(!loaded);
          }}
          className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-300 border border-neutral-700"
        >
          切换清晰状态
        </button>
      </div>
    </div>
  );
};

/* 5.3 波浪跳动点 Typing Dots */
export const TypingDotsPreview: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-rose-400/80 uppercase">
        Loading: Typing Wave Dots (波浪跳动点)
      </div>

      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-800">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay: i * 0.18,
              ease: 'easeInOut',
            }}
            className="w-2.5 h-2.5 rounded-full bg-rose-500"
          />
        ))}
      </div>
      <div className="text-xs text-neutral-400 mt-3">常见于 ChatGPT 等 AI 对话等待回复状态。</div>
    </div>
  );
};

/* 5.4 乐观更新幽灵态 Optimistic Ghost */
export const OptimisticGhostPreview: React.FC = () => {
  const [items, setItems] = useState<string[]>(['原有点赞评论 #1']);
  const [pending, setPending] = useState(false);

  const addOptimistic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pending) return;
    setPending(true);
    setTimeout(() => {
      setItems((prev) => [...prev, `真实持久化项 #${prev.length + 1}`]);
      setPending(false);
    }, 1200);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-rose-400/80 uppercase">
        Loading: Optimistic UI (乐观幽灵态)
      </div>

      <div className="w-full max-w-xs space-y-1.5 mb-2">
        {items.map((it, i) => (
          <div key={i} className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
            ✓ {it}
          </div>
        ))}
        {pending && (
          <div className="px-2.5 py-1 rounded bg-rose-950/30 border border-rose-500/40 text-[11px] text-rose-300 animate-pulse">
            ⏳ 幽灵临时插入... (正在上报)
          </div>
        )}
      </div>

      <button
        onClick={addOptimistic}
        disabled={pending}
        className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-200 border border-neutral-700"
      >
        立刻发送 (0ms反馈)
      </button>
    </div>
  );
};

/* =========================================================
   6. MOTION 动效类
   ========================================================= */

/* 6.1 弹性回弹 Spring Overshoot */
export const SpringOvershootPreview: React.FC = () => {
  const [trigger, setTrigger] = useState(0);

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-fuchsia-400/80 uppercase">
        Motion: Spring Overshoot (弹性回弹)
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setTrigger((t) => t + 1);
        }}
        className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 text-xs font-mono text-neutral-400 bg-neutral-900 hover:bg-neutral-800 rounded border border-neutral-800"
      >
        <RotateCcw className="w-3 h-3" /> 重放
      </button>

      <div className="relative w-full max-w-xs h-12 flex items-center">
        <div className="absolute inset-x-0 h-0.5 bg-neutral-800" />
        <motion.div
          key={trigger}
          initial={{ x: 0, scale: 0.8 }}
          animate={{ x: [0, 220, 185, 195, 190], scale: 1 }}
          transition={{
            duration: 1.1,
            times: [0, 0.5, 0.75, 0.9, 1],
            ease: ['easeInOut', 'easeOut', 'easeInOut', 'easeOut'],
          }}
          className="w-8 h-8 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/30"
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      </div>
      <div className="text-[11px] text-neutral-400 mt-2">突破终点约 15% 后受阻尼拉回稳定。</div>
    </div>
  );
};

/* 6.2 磁吸附 Magnetic Pull */
export const MagneticPullPreview: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;
    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none cursor-crosshair"
    >
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-fuchsia-400/80 uppercase">
        Motion: Magnetic Cursor (磁吸附)
      </div>

      <motion.button
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: 'spring', stiffness: 250, damping: 15 }}
        className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-xs shadow-xl shadow-fuchsia-600/30 border border-fuchsia-400/40"
      >
        磁力按钮 (晃动鼠标)
      </motion.button>
      <div className="text-xs text-neutral-400 mt-3">在周围移动鼠标，按钮被引力吸引。</div>
    </div>
  );
};

/* 6.3 共享元素转场 Shared Element */
export const SharedElementPreview: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-fuchsia-400/80 uppercase">
        Motion: Shared Element (Hero 放大)
      </div>

      <motion.div
        layout
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className={`bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-xl p-3 cursor-pointer shadow-lg flex flex-col justify-between ${
          expanded ? 'w-56 h-28' : 'w-24 h-12'
        }`}
      >
        <motion.div layout className="text-[11px] font-bold text-white">
          {expanded ? '详情展开全尺寸' : '缩略小图'}
        </motion.div>
        {expanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-white/80">
            无缝空间变形，保留用户视觉焦点。点击收起。
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

/* =========================================================
   7. AESTHETICS 材质类
   ========================================================= */

/* 7.1 毛玻璃 Glassmorphism */
export const GlassmorphismPreview: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none overflow-hidden">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-amber-400/80 uppercase">
        Aesthetics: Glassmorphism (毛玻璃)
      </div>

      {/* Background orbs */}
      <div className="absolute w-20 h-20 bg-rose-500/40 rounded-full blur-xl -top-2 -left-2" />
      <div className="absolute w-24 h-24 bg-amber-500/40 rounded-full blur-xl -bottom-2 -right-2" />

      {/* Frosted Glass Card */}
      <div className="relative z-10 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-center max-w-xs">
        <div className="text-xs font-bold text-white">Frosted Glass Surface</div>
        <p className="text-[10px] text-neutral-300 mt-1">
          backdrop-filter: blur(12px) + 半透明白边
        </p>
      </div>
    </div>
  );
};

/* 7.2 流光描边 Border Beam */
export const BorderBeamPreview: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-amber-400/80 uppercase">
        Aesthetics: Border Beam (流光描边)
      </div>

      <div className="relative p-0.5 rounded-2xl overflow-hidden max-w-xs">
        {/* Rotating gradient beam */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          className="absolute -inset-full bg-[conic-gradient(from_0deg,transparent_0_340deg,#f59e0b_360deg)]"
        />
        <div className="relative px-5 py-3 rounded-2xl bg-neutral-900 text-xs font-bold text-white text-center">
          ⚡ 极光旋转描边卡片
          <div className="text-[10px] text-neutral-400 font-normal mt-0.5">SaaS 官网高转化卡片高频方案</div>
        </div>
      </div>
    </div>
  );
};

/* 7.3 聚光灯跟随光斑 Spotlight Glow */
export const SpotlightGlowPreview: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 120, y: 60 });
  const [opacity, setOpacity] = useState(0.8);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0.5)}
      className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950 rounded-xl border border-neutral-800/80 p-4 select-none overflow-hidden cursor-crosshair"
    >
      <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-amber-400/80 uppercase">
        Aesthetics: Spotlight Glow (卡片聚光灯)
      </div>

      {/* Spotlight Radial Follower */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(280px circle at ${position.x}px ${position.y}px, rgba(245, 158, 11, 0.2), transparent 80%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-xs p-4 rounded-xl bg-neutral-900/70 border border-neutral-800/90 text-center shadow-lg">
        <div className="text-xs font-bold text-neutral-100 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>动态聚光灯微光漫游</span>
        </div>
        <div className="text-[10px] text-neutral-400 mt-1 font-mono">
          光标坐标: X: {Math.round(position.x)}px · Y: {Math.round(position.y)}px
        </div>
      </div>
      <div className="relative z-10 text-[11px] text-neutral-500 mt-2 font-mono">
        移动光标测试径向聚光灯漫游照明反射
      </div>
    </div>
  );
};

/* =========================================================
   8. BANNER 横幅类
   ========================================================= */

/* 8.1 顶部通告条 Announcement Bar */
export const AnnouncementBarPreview: React.FC = () => {
  const [closed, setClosed] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-3 select-none overflow-hidden">
      <div className="absolute top-2.5 left-3 text-[10px] font-mono tracking-widest text-sky-400/80 uppercase">
        Banner: Announcement Bar (通告条)
      </div>

      <AnimatePresence>
        {!closed ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm flex items-center justify-between gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-950/60 via-blue-900/40 to-sky-950/60 border border-sky-500/30 text-xs shadow-lg"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="px-2 py-0.5 rounded-full bg-sky-500 text-neutral-950 text-[10px] font-bold">
                NEW
              </span>
              <span className="text-[11px] text-sky-200 truncate">
                全景设计词典已发布 · 点击查看
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setClosed(true);
              }}
              className="p-1 rounded-full text-sky-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setClosed(false);
            }}
            className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-white"
          >
            ↺ 重置通告条
          </button>
        )}
      </AnimatePresence>
      <div className="text-[11px] text-neutral-500 mt-3">置顶通告横幅，带胶囊高亮与关闭按钮。</div>
    </div>
  );
};

/* 8.2 首屏大通栏 Hero Banner */
export const HeroBannerPreview: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none overflow-hidden">
      <div className="absolute top-2.5 left-3 text-[10px] font-mono tracking-widest text-sky-400/80 uppercase">
        Banner: Hero Banner (首屏大通栏)
      </div>

      {/* Radial Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 text-center space-y-1.5 max-w-xs">
        <h4 className="text-sm font-black text-white tracking-tight uppercase">
          Build Interfaces Like Magic
        </h4>
        <p className="text-[10px] text-neutral-400 line-clamp-1">
          专为前端打造的设计黑话与动效速查词典
        </p>
        <button
          onClick={(e) => e.stopPropagation()}
          className="px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-neutral-950 text-[11px] font-bold shadow-md shadow-sky-500/25 active:scale-95 transition"
        >
          立即体验 ➔
        </button>
      </div>
    </div>
  );
};

/* 8.3 轮播画廊横幅 Carousel Banner */
export const CarouselBannerPreview: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { title: 'Spring 弹簧物理', color: 'from-sky-600/30 to-blue-600/30 border-sky-500/30 text-sky-300' },
    { title: 'Glass 毛玻璃质感', color: 'from-indigo-600/30 to-purple-600/30 border-indigo-500/30 text-indigo-300' },
    { title: 'Pill 胶囊导航栏', color: 'from-cyan-600/30 to-teal-600/30 border-cyan-500/30 text-cyan-300' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-3 select-none">
      <div className="absolute top-2.5 left-3 text-[10px] font-mono tracking-widest text-sky-400/80 uppercase">
        Banner: Carousel Banner (轮播画廊)
      </div>

      <div className="w-full max-w-xs flex flex-col items-center gap-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className={`w-full h-16 rounded-xl bg-gradient-to-r ${slides[activeSlide].color} border p-3 flex items-center justify-center text-xs font-bold shadow-md`}
          >
            {slides[activeSlide].title}
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                activeSlide === i ? 'w-5 bg-sky-400' : 'w-1.5 bg-neutral-700 hover:bg-neutral-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* 8.4 倾斜角标彩带 Corner Ribbon */
export const CornerRibbonPreview: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/90 rounded-xl border border-neutral-800/80 p-4 select-none">
      <div className="absolute top-2.5 left-3 text-[10px] font-mono tracking-widest text-sky-400/80 uppercase">
        Banner: Corner Ribbon (斜角彩带)
      </div>

      {/* Card with corner ribbon */}
      <div className="relative w-48 h-24 rounded-2xl bg-neutral-900 border border-neutral-700 overflow-hidden flex flex-col justify-center px-4 shadow-xl">
        {/* 45-degree ribbon */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
          <div className="absolute transform rotate-45 bg-sky-500 text-neutral-950 font-black text-[9px] py-0.5 right-[-24px] top-[14px] w-[80px] text-center shadow-md">
            NEW
          </div>
        </div>

        <div className="text-xs font-bold text-white">Pro Feature Card</div>
        <div className="text-[10px] text-neutral-400 mt-0.5">右上角 45° 倾斜徽章横幅</div>
      </div>
    </div>
  );
};

/* =========================================================
   9. STYLE 风格流派类
   ========================================================= */

/* 9.1 Linear 极客暗黑风全景网页 Linear Dark Webpage */
export const StyleLinearDarkPreview: React.FC = () => {
  const [activeCycle, setActiveCycle] = useState('v2.4');
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative flex flex-col justify-between h-56 w-full bg-[#08090a] rounded-xl border border-neutral-800 p-2.5 select-none overflow-hidden text-neutral-200 font-sans shadow-2xl">
      {/* Top Ambient Radial Mesh Glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-52 h-24 bg-gradient-to-b from-indigo-500/25 via-purple-500/10 to-transparent blur-2xl pointer-events-none" />

      {/* Browser Chrome Bar */}
      <div className="relative z-10 flex items-center justify-between pb-1.5 border-b border-neutral-800/80 text-[9px] font-mono text-neutral-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
            linear.app/craft
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[9px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>99.98% OPS</span>
        </div>
      </div>

      {/* Miniature Navbar */}
      <div className="relative z-10 flex items-center justify-between py-1 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-white tracking-wider flex items-center gap-1 font-mono">
            ▲ LINEAR
          </span>
          <div className="hidden sm:flex items-center gap-2 text-[9px] text-neutral-400">
            <span className="text-white">Product</span>
            <span>Method</span>
            <span>Changelog</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-[9px] font-mono text-neutral-300 flex items-center gap-1 transition"
          >
            <span>⌘K</span>
            <span className="text-neutral-500">{copied ? 'OK' : 'Command'}</span>
          </button>
          <span className="px-2 py-0.5 rounded bg-white text-neutral-950 font-bold text-[9px]">
            Sign in
          </span>
        </div>
      </div>

      {/* Miniature Hero Section */}
      <div className="relative z-10 text-center py-1">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[8px] font-mono mb-1">
          <span>{activeCycle} DEPLOYED</span>
          <span className="text-neutral-500">·</span>
          <span className="text-cyan-400">NEXT-GEN ENGINE ➔</span>
        </div>
        <h4 className="text-xs font-black text-white tracking-tight leading-tight">
          Linear is a better way to build products
        </h4>
        <p className="text-[9px] text-neutral-400 mt-0.5">
          Engineered for high-velocity software teams with craft.
        </p>
      </div>

      {/* Miniature Bento Feature Grid (2 Cards) */}
      <div className="relative z-10 grid grid-cols-2 gap-1.5">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setActiveCycle(activeCycle === 'v2.4' ? 'v2.5' : 'v2.4');
          }}
          className="p-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800/90 hover:border-indigo-500/40 transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[8px] font-mono text-neutral-400">
            <span>TRIAGE INBOX</span>
            <span className="text-indigo-400 font-bold">12 NEW</span>
          </div>
          <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden mt-1">
            <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" />
          </div>
        </div>

        <div className="p-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800/90 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[8px] font-mono text-neutral-400">
            <span>VELOCITY</span>
            <span className="text-emerald-400 font-bold">+18%</span>
          </div>
          <div className="text-[9px] font-mono text-neutral-200">142 pts completed</div>
        </div>
      </div>

      {/* Footer Tagline */}
      <div className="relative z-10 text-center text-[8px] font-mono text-neutral-500 pt-0.5 border-t border-neutral-900">
        整页纯黑底色 · 1px 微细暗描边 · 径向极光 Hero · Bento 数据矩阵
      </div>
    </div>
  );
};

/* 9.2 新粗野主义 Neo-Brutalism 全景网页 */
export const StyleNeoBrutalismPreview: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(148);

  return (
    <div className="relative flex flex-col justify-between h-56 w-full bg-[#fdfbf7] rounded-xl border-2 border-black p-2.5 select-none overflow-hidden text-black font-sans shadow-[4px_4px_0px_#000]">
      {/* Browser Chrome Bar */}
      <div className="flex items-center justify-between pb-1 border-b-2 border-black text-[9px] font-black">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-black inline-block" />
          <span className="w-2 h-2 rounded-full bg-black inline-block" />
          <span className="w-2 h-2 rounded-full bg-black inline-block" />
          <span className="ml-2 px-1.5 py-0.2 bg-yellow-300 border border-black text-[8px]">
            gumroad.com/creators
          </span>
        </div>
        <span className="px-1.5 py-0.2 bg-black text-white text-[8px] font-black">
          RETRO-POP // 0 BLUR
        </span>
      </div>

      {/* Miniature Navbar */}
      <div className="flex items-center justify-between py-1">
        <span className="text-[11px] font-black tracking-tight border-b-2 border-black">
          GUMROAD ★
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-bold hidden sm:inline">FEATURES</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCount((c) => c + 1);
            }}
            className="px-2 py-0.5 rounded bg-white text-black font-black text-[9px] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            JOIN ({count})
          </button>
        </div>
      </div>

      {/* Miniature Hero Section */}
      <div className="text-center py-1">
        <div className="inline-block bg-yellow-300 border-2 border-black px-2 py-0.5 text-[8px] font-black tracking-wider uppercase rotate-[-1deg] shadow-[2px_2px_0px_#000] mb-1">
          NO SUBSCRIPTIONS. ZERO BLUR.
        </div>
        <h4 className="text-xs font-black tracking-tight leading-tight uppercase">
          Sell Digital Stuff <span className="bg-cyan-300 px-1 border border-black">Directly</span>
        </h4>
      </div>

      {/* Interactive Main Action & Feature Blocks */}
      <div className="grid grid-cols-3 gap-1.5 my-0.5">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setClicked(!clicked);
          }}
          className={`col-span-2 p-1.5 rounded bg-yellow-400 border-2 border-black cursor-pointer transition-all flex items-center justify-between ${
            clicked
              ? 'translate-x-[2px] translate-y-[2px] shadow-none bg-cyan-300'
              : 'shadow-[3px_3px_0px_#000]'
          }`}
        >
          <div>
            <div className="text-[9px] font-black">START SELLING NOW ➔</div>
            <div className="text-[7px] font-bold text-neutral-800">
              {clicked ? '★ DISK PRESSED (4PX OFFSET)' : 'CLICK TO TEST 3D HARD DEPRESSION'}
            </div>
          </div>
          <span className="text-xs">💥</span>
        </div>

        <div className="col-span-1 p-1 rounded bg-pink-300 border-2 border-black shadow-[2px_2px_0px_#000] flex flex-col justify-center text-center">
          <span className="text-[7px] font-black">PAYOUT</span>
          <span className="text-[10px] font-black">$12,490</span>
        </div>
      </div>

      {/* Footer Rule */}
      <div className="text-center text-[8px] font-black pt-1 border-t-2 border-black bg-yellow-200 -mx-2.5 -mb-2.5 py-0.5">
        复古米白底 · 2~3px 纯黑粗框 · 4px 无羽化实体硬投影 · 机械下压触感
      </div>
    </div>
  );
};

/* 9.3 Bento 便当盒全景落地页 Bento Grid Landing */
export const StyleBentoGridPreview: React.FC = () => {
  const [tab, setTab] = useState<'4K' | '8K'>('4K');
  const [activeChip, setActiveChip] = useState(1);

  return (
    <div className="relative flex flex-col justify-between h-56 w-full bg-[#0a0a0d] rounded-2xl border border-neutral-800 p-2.5 select-none overflow-hidden text-neutral-200 font-sans shadow-2xl">
      {/* Browser Chrome Bar */}
      <div className="flex items-center justify-between pb-1 border-b border-neutral-800/80 text-[9px] font-mono text-neutral-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-neutral-700" />
          <span className="w-2 h-2 rounded-full bg-neutral-700" />
          <span className="w-2 h-2 rounded-full bg-neutral-700" />
          <span className="ml-2 text-neutral-400 font-sans text-[8px]">apple.com/bento-landing</span>
        </div>
        <span className="text-purple-400 font-mono text-[8px]">12-COLUMN ASYMMETRIC GRID</span>
      </div>

      {/* Miniature Nav + Hero */}
      <div className="flex items-center justify-between pt-0.5">
        <span className="text-[10px] font-bold text-white flex items-center gap-1">
           Bento Pro
        </span>
        <span className="text-[8px] font-mono text-neutral-400">Modular Feature System</span>
      </div>

      {/* Asymmetric Bento Showcase Grid */}
      <div className="grid grid-cols-3 gap-1.5 my-1">
        {/* Big Bento Tile: Col Span 2 */}
        <div className="col-span-2 p-2 rounded-xl bg-neutral-900/90 border border-neutral-800/90 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[8px] font-mono">
            <span className="text-white font-bold">M3 Max Neural Core</span>
            <span className="text-purple-400 font-bold">85% FASTER</span>
          </div>
          <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden my-1">
            <div className="h-full w-4/5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
          </div>
          <div className="text-[8px] text-neutral-400">
            自包含交互大图展台 · 严丝合缝对齐
          </div>
        </div>

        {/* Square Tile: Col Span 1 */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setTab(tab === '4K' ? '8K' : '4K');
          }}
          className="col-span-1 p-1.5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 hover:border-purple-500/50 cursor-pointer transition flex flex-col justify-between text-center"
        >
          <span className="text-[7px] text-neutral-400 font-mono">RESOLUTION</span>
          <span className="text-xs font-black font-mono text-purple-400">{tab} HDR</span>
          <span className="text-[7px] text-neutral-500">点击切换</span>
        </div>

        {/* Tile 3: Square */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setActiveChip(activeChip === 1 ? 2 : 1);
          }}
          className="col-span-1 p-1.5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 cursor-pointer flex flex-col justify-between text-center"
        >
          <span className="text-[7px] text-neutral-400 font-mono">REFRESH RATE</span>
          <span className="text-xs font-black font-mono text-emerald-400">
            {activeChip === 1 ? '120 Hz' : '240 Hz'}
          </span>
          <span className="text-[7px] text-neutral-500">ProMotion</span>
        </div>

        {/* Tile 4: Col Span 2 */}
        <div className="col-span-2 p-1.5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 flex items-center justify-between text-[8px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-neutral-200">Titanium Aero Shell</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[7px]">
            187g Light
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[8px] font-mono text-neutral-500 pt-0.5 border-t border-neutral-900">
        自适应 12 列非对称网格 · 统一大圆角 (rounded-2xl) · 单格单功能自包含
      </div>
    </div>
  );
};

/* 9.4 现代极简白昼风 Clean Minimalist Webpage */
export const StyleCleanMinimalPreview: React.FC = () => {
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD');
  const [activePlan, setActivePlan] = useState<'Pro' | 'Enterprise'>('Pro');

  return (
    <div className="relative flex flex-col justify-between h-56 w-full bg-white rounded-xl border border-neutral-200/90 p-2.5 select-none overflow-hidden text-neutral-900 font-sans shadow-lg">
      {/* Soft Ambient Aura */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-gradient-to-bl from-indigo-100/70 via-sky-100/40 to-transparent blur-2xl pointer-events-none" />

      {/* Browser Chrome */}
      <div className="relative z-10 flex items-center justify-between pb-1 border-b border-neutral-200 text-[9px] font-mono text-neutral-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-neutral-300 inline-block" />
          <span className="w-2 h-2 rounded-full bg-neutral-300 inline-block" />
          <span className="w-2 h-2 rounded-full bg-neutral-300 inline-block" />
          <span className="ml-2 px-2 py-0.2 rounded-full bg-neutral-50 border border-neutral-200 text-neutral-600 text-[8px]">
            stripe.com/infrastructure
          </span>
        </div>
        <span className="text-indigo-600 font-medium text-[8px]">STRIPE LIGHT PARADIGM</span>
      </div>

      {/* Miniature Clean Navbar */}
      <div className="relative z-10 flex items-center justify-between py-1">
        <span className="text-xs font-black tracking-tight text-neutral-950 font-sans">
          stripe
        </span>
        <div className="hidden sm:flex items-center gap-2 text-[9px] text-neutral-600">
          <span className="font-semibold text-neutral-900">Products</span>
          <span>Solutions</span>
          <span>Developers</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrency(currency === 'USD' ? 'EUR' : 'USD');
            }}
            className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[8px] font-mono border border-neutral-200"
          >
            {currency} ⇋
          </button>
          <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-semibold text-[8px] shadow-sm">
            Sign In
          </span>
        </div>
      </div>

      {/* Miniature Hero */}
      <div className="relative z-10 text-center py-1">
        <h4 className="text-xs font-bold text-neutral-950 tracking-tight leading-tight">
          Financial infrastructure for the internet
        </h4>
        <p className="text-[9px] text-neutral-500 mt-0.5">
          Millions of businesses rely on Stripe to scale.
        </p>
      </div>

      {/* Clean Light Cards Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-1.5 my-0.5">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setActivePlan(activePlan === 'Pro' ? 'Enterprise' : 'Pro');
          }}
          className="p-1.5 rounded-xl bg-neutral-50/90 border border-neutral-200/90 hover:border-indigo-400/60 shadow-sm transition cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[8px]">
            <span className="font-bold text-neutral-800">{activePlan} Fleet</span>
            <span className="text-indigo-600 font-mono font-bold">99.999%</span>
          </div>
          <div className="text-[8px] text-neutral-500 font-sans mt-0.5">
            250M+ daily transactions
          </div>
        </div>

        <div className="p-1.5 rounded-xl bg-neutral-50/90 border border-neutral-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[8px]">
            <span className="font-bold text-neutral-800">Global Payout</span>
            <span className="text-emerald-600 font-mono font-bold">Active</span>
          </div>
          <div className="text-[8px] text-neutral-500 font-sans mt-0.5">
            135+ currencies supported
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-[8px] font-sans text-neutral-400 pt-0.5 border-t border-neutral-100">
        大面积纯白开阔留白 · 极细浅灰线框 · 多层羽化柔和投影 · 蓝紫淡彩光晕
      </div>
    </div>
  );
};

/* 9.5 极简大字杂志刊物风 Editorial Typographic */
export const StyleEditorialBrutalistPreview: React.FC = () => {
  const [readState, setReadState] = useState(false);

  return (
    <div className="relative flex flex-col justify-between h-56 w-full bg-[#f6f6f4] rounded-none border-2 border-black p-2 select-none overflow-hidden text-neutral-900 font-serif">
      {/* Top Newspaper Rule & Volume */}
      <div className="flex items-center justify-between pb-1 border-b border-black text-[8px] font-mono uppercase tracking-widest text-neutral-600">
        <span>THE ARCHITECTURAL CHRONICLE</span>
        <span>ISSUE 42 // MARCH 2026</span>
        <span>EDITION NO. 01</span>
      </div>

      {/* Miniature Masthead */}
      <div className="text-center py-1 border-b border-black">
        <h2 className="text-xs font-serif font-black tracking-widest uppercase text-black">
          MONOCLE DISPATCH
        </h2>
      </div>

      {/* Editorial Content Grid (2 Columns, Sharp Dividing Rule) */}
      <div className="grid grid-cols-2 gap-2 my-1 flex-1 items-stretch">
        {/* Col 1 */}
        <div className="border-r border-black pr-2 flex flex-col justify-between">
          <div className="text-[7px] font-mono uppercase text-neutral-500 tracking-wider">
            [ESSAY 01] · TYPOGRAPHY
          </div>
          <h4 className="text-[10px] font-serif font-bold text-black leading-tight my-0.5">
            “The Void Between Letters Defines The Building.”
          </h4>
          <p className="text-[7px] font-serif leading-tight text-neutral-600 line-clamp-2">
            Architecture begins where typography meets the grid. Eliminating rounded corners to restore pure mechanical editorial weight.
          </p>
        </div>

        {/* Col 2 */}
        <div className="pl-1 flex flex-col justify-between">
          <div className="text-[7px] font-mono text-neutral-700">
            ARCHIVE INDEX:
            <div className="font-bold text-[8px] mt-0.5">§ 104 · FORM & VOID</div>
            <div className="text-neutral-500">§ 105 · LEAD LETTERS</div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setReadState(!readState);
            }}
            className="w-full py-1 bg-black text-white hover:bg-neutral-800 text-[8px] font-mono font-bold uppercase tracking-wider rounded-none transition active:scale-95 text-center mt-1"
          >
            {readState ? '✓ MARKED AS READ' : '[ READ DISPATCH ]'}
          </button>
        </div>
      </div>

      {/* Bottom Rule */}
      <div className="text-center text-[7px] font-mono uppercase text-neutral-700 pt-1 border-t border-black bg-neutral-200 -mx-2 -mb-2 py-0.5">
        纯排版驱动 · 全局 0 圆角 (rounded-none) · 1px 细黑分割线 · 经典衬线大标题
      </div>
    </div>
  );
};

/* 9.6 赛博朋克科幻终端 Cyberpunk HUD Terminal */
export const StyleCyberpunkHudPreview: React.FC = () => {
  const [alarm, setAlarm] = useState(false);

  return (
    <div className="relative flex flex-col justify-between h-56 w-full bg-[#030712] rounded-xl border border-cyan-500/70 p-2.5 select-none overflow-hidden font-mono text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-60" />

      {/* Top HUD Status Bar */}
      <div className="relative z-10 flex items-center justify-between pb-1 border-b border-cyan-500/40 text-[8px] tracking-wider">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span className="font-bold text-cyan-200">[NEXUS-7 HUD CORE]</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-400/80">
          <span>SEC_LVL: 0x4F</span>
          <span>LATENCY: 2ms</span>
        </div>
      </div>

      {/* Mini HUD Hero */}
      <div className="relative z-10 py-1 flex items-center justify-between">
        <div>
          <h4 className="text-[11px] font-black tracking-widest text-cyan-100 uppercase">
            HOLOGRAPHIC TERMINAL // ACTIVE
          </h4>
          <div className="text-[8px] text-cyan-400/80 mt-0.5">
            RADAR SCANNERS: 4 TARGETS LOCKED IN ORBIT
          </div>
        </div>
        <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/60 text-[8px] text-cyan-300">
          {alarm ? '🚨 WARNING' : 'ONLINE'}
        </span>
      </div>

      {/* Dual Chamfered Telemetry Panels */}
      <div className="relative z-10 grid grid-cols-2 gap-1.5 my-0.5">
        <div className="p-1.5 rounded bg-black/80 border border-cyan-500/50 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[7px] text-cyan-400">
            <span>FREQUENCY METERS</span>
            <span>98.4 GHZ</span>
          </div>
          <div className="flex items-end gap-1 h-4 mt-1">
            <div className="w-2 h-full bg-cyan-400 animate-pulse" />
            <div className="w-2 h-3/4 bg-cyan-500" />
            <div className="w-2 h-4/5 bg-cyan-300 animate-pulse" />
            <div className="w-2 h-1/2 bg-fuchsia-500" />
            <div className="w-2 h-full bg-cyan-400" />
          </div>
        </div>

        <div className="p-1.5 rounded bg-black/80 border border-cyan-500/50 flex flex-col justify-between">
          <div className="text-[7px] text-cyan-400">COMMAND OVERRIDE:</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAlarm(!alarm);
            }}
            className="w-full py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-[8px] tracking-wider rounded uppercase shadow-[0_0_10px_#00f0ff] transition active:scale-95"
          >
            {alarm ? 'DISARM PROTOCOL' : 'ENGAGE PROTOCOL'}
          </button>
        </div>
      </div>

      {/* Bottom CLI rule */}
      <div className="relative z-10 text-center text-[7px] tracking-widest text-cyan-400/80 pt-0.5 border-t border-cyan-500/30">
        深渊纯黑底 · 45° 倒角切角 · CRT 扫描线 · 荧光青/品红电平发光
      </div>
    </div>
  );
};

/* 9.7 3D 黏土萌系潮玩 Claymorphism Webpage */
export const StyleClaymorphismPreview: React.FC = () => {
  const [bounced, setBounced] = useState(false);

  return (
    <div className="relative flex flex-col justify-between h-56 w-full bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100 rounded-3xl border border-white/80 p-2.5 select-none overflow-hidden font-sans text-neutral-800 shadow-xl shadow-purple-200/50">
      {/* Browser Bar */}
      <div className="flex items-center justify-between pb-1 border-b border-purple-200/60 text-[9px] font-bold text-purple-700">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-pink-400 inline-block" />
          <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span className="ml-2 px-2 py-0.2 rounded-full bg-white/70 text-purple-800 text-[8px]">
            squishy.toy/universe
          </span>
        </div>
        <span className="text-[8px] bg-white/80 px-2 py-0.5 rounded-full text-purple-600">
          3D CUSHION
        </span>
      </div>

      {/* Miniature Floating Pill Navbar */}
      <div className="flex items-center justify-between py-0.5">
        <span className="text-[11px] font-black text-purple-900 tracking-tight flex items-center gap-1">
          ☁️ SquishyLab
        </span>
        <div className="flex items-center gap-1">
          <span className="px-2 py-0.5 rounded-full bg-white/80 text-purple-800 font-bold text-[8px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_2px_6px_rgba(168,85,247,0.15)]">
            Explore Toys
          </span>
        </div>
      </div>

      {/* Miniature Hero */}
      <div className="text-center py-1">
        <h4 className="text-xs font-black text-purple-950 tracking-tight leading-tight">
          Marshmallow 3D Cute Universe
        </h4>
        <p className="text-[9px] text-purple-700/80 mt-0.5">
          Soft, squishy and tactile touchable web designs.
        </p>
      </div>

      {/* Claymorphic Cushions (2 Cards) */}
      <div className="grid grid-cols-2 gap-2 my-0.5">
        <div className="p-2 rounded-2xl bg-purple-500 text-white font-bold shadow-[inset_0_3px_6px_rgba(255,255,255,0.5),0_8px_16px_rgba(168,85,247,0.3)] flex flex-col justify-between">
          <div className="text-[8px]">🍬 Bubbly Cloud</div>
          <div className="text-[7px] text-purple-200">Zero sharp corners</div>
        </div>

        <motion.div
          animate={{ scale: bounced ? [1, 0.9, 1.05, 1] : 1 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => {
            e.stopPropagation();
            setBounced(!bounced);
          }}
          className="p-2 rounded-2xl bg-pink-400 text-white font-black cursor-pointer shadow-[inset_0_3px_6px_rgba(255,255,255,0.6),0_8px_16px_rgba(244,114,182,0.35)] flex flex-col items-center justify-center text-center"
        >
          <span className="text-[9px]">SQUISH ME! ✨</span>
          <span className="text-[7px] text-pink-100 font-normal">Click for Jelly Bounce</span>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center text-[8px] font-bold text-purple-600/90 pt-0.5 border-t border-purple-200/50">
        马卡龙温润画布 · 全局超大胶囊角 · 双层内发光膨胀高光 · Q弹果冻触感
      </div>
    </div>
  );
};

/* 9.8 90s 复古系统视窗 Retro OS Webpage */
export const StyleRetroOsPreview: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState('SYSTEM.INI');

  return (
    <div className="relative flex flex-col justify-between h-56 w-full bg-[#008080] rounded-xl border border-neutral-700 p-2 select-none overflow-hidden font-mono text-black shadow-lg">
      {/* Vintage Window */}
      <div className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black p-0.5 flex-1 flex flex-col justify-between">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-1.5 py-0.5 flex items-center justify-between text-[9px] font-bold">
          <div className="flex items-center gap-1">
            <span>💾</span>
            <span>MotionCue 95 - [Desktop Explorer]</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="px-1 bg-[#c0c0c0] text-black border border-white border-b-black border-r-black text-[7px] font-bold">
              _
            </span>
            <span className="px-1 bg-[#c0c0c0] text-black border border-white border-b-black border-r-black text-[7px] font-bold">
              □
            </span>
            <span className="px-1 bg-[#c0c0c0] text-black border border-white border-b-black border-r-black text-[7px] font-bold">
              ✕
            </span>
          </div>
        </div>

        {/* Menu Strip */}
        <div className="flex items-center gap-3 px-1 py-0.5 border-b border-neutral-400 text-[8px]">
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">File</span>
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Edit</span>
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">View</span>
          <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Help</span>
        </div>

        {/* Client Area */}
        <div className="bg-white border-2 border-neutral-600 border-t-black border-l-black p-1.5 flex-1 flex flex-col justify-between my-0.5">
          <div className="grid grid-cols-2 gap-1 text-[8px]">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile('SYSTEM.INI');
              }}
              className={`p-1 border flex items-center gap-1 cursor-pointer ${
                selectedFile === 'SYSTEM.INI'
                  ? 'bg-[#000080] text-white border-dotted border-white'
                  : 'hover:bg-neutral-100 border-transparent'
              }`}
            >
              <span>📁</span>
              <span>C:\SYSTEM32</span>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile('DIALUP.EXE');
              }}
              className={`p-1 border flex items-center gap-1 cursor-pointer ${
                selectedFile === 'DIALUP.EXE'
                  ? 'bg-[#000080] text-white border-dotted border-white'
                  : 'hover:bg-neutral-100 border-transparent'
              }`}
            >
              <span>📞</span>
              <span>DIALUP.EXE</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[7px] text-neutral-600 pt-1 border-t border-neutral-200">
            <span>2 objects selected</span>
            <span className="font-bold">640K RAM FREE</span>
          </div>
        </div>
      </div>

      {/* Windows 95 Taskbar */}
      <div className="bg-[#c0c0c0] border-t-2 border-white px-1 py-0.5 flex items-center justify-between text-[8px] mt-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className={`flex items-center gap-1 px-1.5 py-0.5 border-t border-l border-white border-b-2 border-r-2 border-black font-bold active:border-black active:border-b-white active:border-r-white ${
            menuOpen ? 'bg-neutral-300' : 'bg-[#c0c0c0]'
          }`}
        >
          <span>🪟</span>
          <span>Start</span>
        </button>

        <div className="px-1.5 py-0.2 border border-neutral-500 border-b-white border-r-white bg-neutral-200 text-[7px]">
          11:42 PM
        </div>
      </div>
    </div>
  );
};

/* 通用占位渲染器 */
export const DefaultMotionPreview: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-44 w-full bg-neutral-950/80 rounded-xl border border-neutral-800 p-4 text-center">
      <Sparkles className="w-6 h-6 text-neutral-500 mb-2" />
      <div className="text-xs font-mono text-neutral-400">交互词条实时预览就绪</div>
    </div>
  );
};

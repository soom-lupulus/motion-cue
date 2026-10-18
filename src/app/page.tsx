'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Zap,
} from 'lucide-react';
import { Toaster } from 'sonner';
import { MotionCategory, MotionCue, CATEGORY_LABELS } from '@/types/cue';
import { PRESET_MOTION_CUES } from '@/data/presets';
import { CueCard } from '@/components/CueCard';
import { CueDetailModal } from '@/components/CueDetailModal';

export default function HomePage() {
  const cues = PRESET_MOTION_CUES;
  const [selectedCategory, setSelectedCategory] = useState<MotionCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [activeCue, setActiveCue] = useState<MotionCue | null>(null);

  // Filtered Cues
  const filteredCues = useMemo(() => {
    return cues.filter((cue) => {
      // Category Filter
      if (selectedCategory !== 'ALL' && cue.category !== selectedCategory) {
        return false;
      }
      // Search Query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        cue.nameZh.toLowerCase().includes(q) ||
        cue.name.toLowerCase().includes(q) ||
        cue.summary.toLowerCase().includes(q) ||
        cue.visualTraits.some((t) => t.toLowerCase().includes(q)) ||
        cue.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        (cue.aliases && cue.aliases.some((a) => a.toLowerCase().includes(q)))
      );
    });
  }, [cues, selectedCategory, searchQuery]);

  // Categories count
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: cues.length };
    cues.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, [cues]);

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Toaster position="top-right" theme="dark" richColors />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Navigation & Status Bar */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 font-black text-lg">
                MC
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>Motion Cue</span>
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
                    v2.0 · 纯静态速查字典
                  </span>
                </h1>
                <p className="text-xs text-neutral-400 font-mono">
                  前端交互设计与动效速查词典 · 业内学术名词与 AI 提示词规范库
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons & Storage Status */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Pure Static Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono border bg-neutral-900/80 text-emerald-400 border-neutral-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>纯静态即时速查 · 0ms 离线可用</span>
            </div>
          </div>
        </header>

        {/* Hero Banner / Problem Statement */}
        <div className="relative rounded-3xl p-6 md:p-8 bg-gradient-to-r from-neutral-900/90 via-neutral-900/40 to-neutral-950 border border-neutral-800/90 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
              <Zap className="w-3.5 h-3.5" />
              <span>解决“天天见、想用，但一张口就容易词穷”的核心痛点</span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-white tracking-tight leading-tight">
              把模糊的“设计与动效直觉”，转译为 AI 听得懂的
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                【专业术语与前端代码】
              </span>
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
              聚焦 9 大独立大类：导航、容器、控件、提示、等待、动效、材质、横幅、风格。
              收录整页设计流派（Linear 极客暗黑、新粗野主义整页、Bento 便当盒全景、Stripe 极简白、杂志排版、赛博科幻、3D 黏土、复古系统）与各级高频组件，支持微缩全景网页交互预览与一键复制整页/组件级 AI 提示词规范。
            </p>
          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索设计形态、学名、特征（如：胶囊、分段器、抽屉、手风琴、便当盒、新粗野主义、通告条、轮播横幅、骨架屏、毛玻璃...）"
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition shadow-inner font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-500 hover:text-white"
              >
                清空
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedCategory === 'ALL'
                  ? 'bg-white text-neutral-950 shadow-md shadow-white/10'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <span>全部维度</span>
              <span className="text-[10px] font-mono opacity-60">({categoryCounts['ALL'] || 0})</span>
            </button>

            {Object.entries(CATEGORY_LABELS).map(([catKey, info]) => {
              const count = categoryCounts[catKey] || 0;
              const isSelected = selectedCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey as MotionCategory)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border-neutral-800'
                  }`}
                >
                  <span>{info.zh}</span>
                  <span className="text-[10px] font-mono opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>
              已检索到 <strong className="text-white">{filteredCues.length}</strong> 个设计与动效词条
            </span>
            <span>按卡片查看交互预览、设计解析与代码配方</span>
          </div>

          {filteredCues.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-neutral-800 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-neutral-300">没有找到匹配的设计词条</p>
              <p className="text-xs text-neutral-500 font-mono">
                尝试输入更通俗的口语（如：“胶囊”、“分段”、“抽屉”、“骨架”、“吐司”）
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCues.map((cue) => (
                <CueCard
                  key={cue.id}
                  cue={cue}
                  onClick={() => setActiveCue(cue)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modals */}
        <CueDetailModal
          cue={activeCue}
          onClose={() => setActiveCue(null)}
        />

        {/* Footer */}
        <footer className="pt-8 pb-12 border-t border-neutral-800/80 text-center text-xs text-neutral-500 font-mono space-y-2">
          <div>Motion Cue · 前端交互设计与动效速查词典</div>
          <div className="text-[11px] text-neutral-600">
            Next.js App Router · Tailwind CSS · Framer Motion · 纯静态 0ms 秒开
          </div>
        </footer>
      </div>
    </div>
  );
}

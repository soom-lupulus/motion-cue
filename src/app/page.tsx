'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Wand2,
  Download,
  Upload,
  Database,
  Layers,
  Sparkles,
  Command,
  BookMarked,
  Filter,
  Film,
  Zap,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { MotionCategory, MotionCue, CATEGORY_LABELS } from '@/types/cue';
import { PRESET_MOTION_CUES } from '@/data/presets';
import { CueCard } from '@/components/CueCard';
import { CueDetailModal } from '@/components/CueDetailModal';
import { CueFormModal } from '@/components/CueFormModal';
import { PromptAssistantModal } from '@/components/PromptAssistantModal';

const LOCAL_STORAGE_KEY = 'motion_cue_custom_items_v1';

export default function HomePage() {
  const [cues, setCues] = useState<MotionCue[]>(PRESET_MOTION_CUES);
  const [selectedCategory, setSelectedCategory] = useState<MotionCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [databaseConnected, setDatabaseConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [activeCue, setActiveCue] = useState<MotionCue | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCue, setEditingCue] = useState<MotionCue | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Load cues from API or LocalStorage
  useEffect(() => {
    async function loadCues() {
      try {
        const res = await fetch('/api/cues');
        const data = await res.json();

        let localCustom: MotionCue[] = [];
        try {
          const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (cached) localCustom = JSON.parse(cached);
        } catch (e) {
          console.warn('Failed to parse localStorage:', e);
        }

        const presets = data.presets || PRESET_MOTION_CUES;
        const serverCustom = data.customCues || [];
        setDatabaseConnected(data.databaseConnected ?? false);

        // Merge without duplicates
        const customMap = new Map<string, MotionCue>();
        localCustom.forEach((c) => customMap.set(c.id, c));
        serverCustom.forEach((c: MotionCue) => customMap.set(c.id, c));

        const merged = [...presets, ...Array.from(customMap.values())];
        setCues(merged);
      } catch (err) {
        console.warn('Fetch API failed, using presets and local storage:', err);
        let localCustom: MotionCue[] = [];
        try {
          const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (cached) localCustom = JSON.parse(cached);
        } catch {}
        setCues([...PRESET_MOTION_CUES, ...localCustom]);
      } finally {
        setLoading(false);
      }
    }

    loadCues();
  }, []);

  // Save custom cue
  const handleSaveCue = (savedCue: MotionCue) => {
    setCues((prev) => {
      const exists = prev.some((c) => c.id === savedCue.id);
      const nextList = exists
        ? prev.map((c) => (c.id === savedCue.id ? savedCue : c))
        : [savedCue, ...prev];

      // Update local storage for custom cues
      const customOnly = nextList.filter((c) => !c.isPreset);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customOnly));
      } catch {}

      return nextList;
    });
  };

  // Delete custom cue
  const handleDeleteCue = (id: string) => {
    setCues((prev) => {
      const nextList = prev.filter((c) => c.id !== id);
      const customOnly = nextList.filter((c) => !c.isPreset);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customOnly));
      } catch {}
      return nextList;
    });
    toast.success('已删除动效词条');
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cues, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `motion-cues-export-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('已导出完整词典 JSON 数据包！');
  };

  // Import JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          const map = new Map<string, MotionCue>();
          cues.forEach((c) => map.set(c.id, c));
          imported.forEach((item) => {
            if (item.name && item.nameZh) {
              map.set(item.id || `cue-${Date.now()}-${Math.random()}`, item);
            }
          });
          const merged = Array.from(map.values());
          setCues(merged);
          const customOnly = merged.filter((c) => !c.isPreset);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customOnly));
          toast.success(`成功导入 ${imported.length} 条动效数据！`);
        } else {
          toast.error('JSON 格式必须是动效词条数组');
        }
      } catch {
        toast.error('解析 JSON 文件失败，请确认格式');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

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
                    v1.0 · Remotion Ready
                  </span>
                </h1>
                <p className="text-xs text-neutral-400 font-mono">
                  动效与视觉特效业内学术词典 · AI 提示词规范库
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons & Storage Status */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Storage indicator */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border ${
                databaseConnected
                  ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800/50'
                  : 'bg-neutral-900/80 text-neutral-400 border-neutral-800'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>{databaseConnected ? 'PostgreSQL 云端持久化' : '零配置快速模式 (本地增删改查)'}</span>
            </div>

            {/* AI Assistant Button */}
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition active:scale-95"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>AI 动效指令转译器</span>
            </button>

            {/* Add New Cue */}
            <button
              onClick={() => {
                setEditingCue(null);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold border border-neutral-700/80 transition active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              <span>录入新词条</span>
            </button>

            {/* Export & Import */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleExportJson}
                title="导出为 JSON 备份"
                className="p-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition"
              >
                <Download className="w-4 h-4" />
              </button>
              <label
                title="导入 JSON 数据包"
                className="p-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJson}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </header>

        {/* Hero Banner / Problem Statement */}
        <div className="relative rounded-3xl p-6 md:p-8 bg-gradient-to-r from-neutral-900/90 via-neutral-900/40 to-neutral-950 border border-neutral-800/90 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
              <Zap className="w-3.5 h-3.5" />
              <span>解决“脑子里有画面，但叫不出业内名字”的核心痛点</span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-white tracking-tight leading-tight">
              把模糊的“动效感觉”，转译为 AI 听得懂的
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                【专业术语与编程式代码】
              </span>
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
              专为 Remotion 视频渲染开发、前端交互设计（Framer Motion）与 AI 视频生成（Runway/Sora）量身打造。
              收录业内标准名词、对应物理公式、Remotion 实战代码配方与一键复制的 AI 提示词规范。
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
              placeholder="搜索动效名词、中文学术名、视觉特征（如：果冻、回弹、RGB色散、甩镜、视差、打字机...）"
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
              <span>全部动效</span>
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
              已检索到 <strong className="text-white">{filteredCues.length}</strong> 个动效词条
            </span>
            <span>按卡片查看交互预览与 Remotion 代码</span>
          </div>

          {filteredCues.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-neutral-800 p-12 text-center space-y-3">
              <div className="text-3xl">🔍</div>
              <div className="text-sm font-bold text-neutral-300">没有找到匹配的动效名词</div>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                尝试更换关键词（如“弹性”、“摇晃”、“模糊”），或者直接使用【录入新词条】记录下你的专属画面！
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                }}
                className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 hover:text-white"
              >
                重置检索条件
              </button>
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
          onEdit={(cue) => {
            setActiveCue(null);
            setEditingCue(cue);
            setIsFormOpen(true);
          }}
          onDelete={handleDeleteCue}
        />

        <CueFormModal
          isOpen={isFormOpen}
          initialCue={editingCue}
          onClose={() => {
            setIsFormOpen(false);
            setEditingCue(null);
          }}
          onSave={handleSaveCue}
        />

        <PromptAssistantModal
          isOpen={isAssistantOpen}
          onClose={() => setIsAssistantOpen(false)}
          onSelectCue={(cue) => {
            setIsAssistantOpen(false);
            setActiveCue(cue);
          }}
        />

        {/* Footer */}
        <footer className="pt-8 pb-12 border-t border-neutral-800/80 text-center text-xs text-neutral-500 font-mono space-y-2">
          <div>Motion Cue · 专为 Remotion & Web 动效打造的灵感与提示词词典</div>
          <div className="text-[11px] text-neutral-600">
            Next.js 15 App Router · Tailwind CSS v4 · Framer Motion · Vercel Zero-Config Ready
          </div>
        </footer>
      </div>
    </div>
  );
}

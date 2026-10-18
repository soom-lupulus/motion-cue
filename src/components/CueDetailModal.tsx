'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  Code2,
  Sparkles,
  Terminal,
  Bookmark,
  Layers,
  Cpu,
  Share2,
} from 'lucide-react';
import { toast } from 'sonner';
import { MotionCue, CATEGORY_LABELS } from '@/types/cue';
import { MotionPreviewRenderer } from './previews/MotionPreviews';

interface Props {
  cue: MotionCue | null;
  onClose: () => void;
}

export const CueDetailModal: React.FC<Props> = ({ cue, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!cue) return null;

  const catInfo = CATEGORY_LABELS[cue.category] || {
    zh: cue.category,
    en: cue.category,
    color: 'from-neutral-800 to-neutral-700 text-neutral-300 border-neutral-700',
    desc: '',
  };

  const copyText = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    toast.success(`已复制 ${section} 到剪贴板！`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl max-h-[92vh] bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-100"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/70">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border bg-gradient-to-r ${catInfo.color}`}
            >
              {catInfo.zh} · {catInfo.en}
            </span>
            {cue.isPreset && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
                OFFICIAL PRESET
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title & Core Summary */}
          <div>
            <div className="flex flex-wrap items-baseline gap-3 mb-1">
              <h1 className="text-2xl font-black text-white">{cue.nameZh}</h1>
              <h2 className="text-lg font-mono text-indigo-400 font-semibold">{cue.name}</h2>
            </div>
            {cue.aliases && cue.aliases.length > 0 && (
              <div className="text-xs text-neutral-500 font-mono mb-2">
                行业别名 / 口语：{cue.aliases.join('、')}
              </div>
            )}
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">{cue.summary}</p>
          </div>

          {/* Live Interactive Preview Box */}
          <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950 p-2 shadow-inner">
            <MotionPreviewRenderer type={cue.previewType} />
          </div>

          {/* Visual Traits Badges */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>视觉特征与节奏规律拆解</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cue.visualTraits.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 font-medium"
                >
                  ⚡ {trait}
                </span>
              ))}
            </div>
            {cue.description && cue.description !== cue.summary && (
              <p className="text-xs text-neutral-400 leading-relaxed pt-1 bg-neutral-950/40 p-3 rounded-xl border border-neutral-800/50">
                {cue.description}
              </p>
            )}
          </div>

          {/* AI Prompts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* English AI Prompt */}
            <div className="rounded-2xl bg-neutral-950 border border-neutral-800/90 p-4 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-neutral-200">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    AI 英文提示词 (Cursor / v0 / Claude)
                  </span>
                  <button
                    onClick={() => copyText(cue.aiPromptEn, '英文 AI 提示词')}
                    className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-white transition"
                  >
                    {copiedSection === '英文 AI 提示词' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>复制</span>
                  </button>
                </div>
                <div className="mt-2 text-xs font-mono text-neutral-300 leading-relaxed bg-neutral-900/80 p-3 rounded-xl border border-neutral-800/80 select-all">
                  {cue.aiPromptEn || '暂无英文提示词'}
                </div>
              </div>
              <div className="text-[11px] text-neutral-500 font-mono">
                标准英文术语与参数体系，极其适合 Cursor / v0 / Claude 快速生成
              </div>
            </div>

            {/* Chinese Prompt / Spec */}
            <div className="rounded-2xl bg-neutral-950 border border-neutral-800/90 p-4 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-neutral-200">
                  <span className="flex items-center gap-1.5 text-indigo-400">
                    <Terminal className="w-4 h-4" />
                    中文需求与规范指令 (Design Spec & AI)
                  </span>
                  <button
                    onClick={() => copyText(cue.aiPromptZh, '中文需求指令')}
                    className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-white transition"
                  >
                    {copiedSection === '中文需求指令' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>复制</span>
                  </button>
                </div>
                <div className="mt-2 text-xs font-mono text-neutral-300 leading-relaxed bg-neutral-900/80 p-3 rounded-xl border border-neutral-800/80 select-all">
                  {cue.aiPromptZh || '暂无中文指令'}
                </div>
              </div>
              <div className="text-[11px] text-neutral-500 font-mono">
                精准中文需求描述，用于向设计沟通或直接喂给国产 LLM / 提示词助手
              </div>
            </div>
          </div>

          {/* Code Snippet & Physics Recipe */}
          {cue.remotionSnippet && (
            <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-200">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>前端实战代码配方 (React / Tailwind / Framer Motion / Remotion)</span>
                </div>
                <button
                  onClick={() => copyText(cue.remotionSnippet || '', '实战代码')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 transition"
                >
                  {copiedSection === '实战代码' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制代码</span>
                    </>
                  )}
                </button>
              </div>

              {cue.mathFormula && (
                <div className="text-xs font-mono text-emerald-400 bg-emerald-950/20 px-3 py-1.5 rounded-lg border border-emerald-900/40">
                  📐 参数规范 / 物理配置: {cue.mathFormula}
                </div>
              )}

              <pre className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-300 overflow-x-auto leading-relaxed">
                <code>{cue.remotionSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

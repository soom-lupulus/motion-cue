'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Eye, Sparkles, Terminal, Code2 } from 'lucide-react';
import { toast } from 'sonner';
import { MotionCue, CATEGORY_LABELS } from '@/types/cue';
import { MotionPreviewRenderer } from './previews/MotionPreviews';

interface Props {
  cue: MotionCue;
  onClick: () => void;
}

export const CueCard: React.FC<Props> = ({ cue, onClick }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const catInfo = CATEGORY_LABELS[cue.category] || {
    zh: cue.category,
    en: cue.category,
    color: 'from-neutral-800 to-neutral-700 text-neutral-300 border-neutral-700',
    desc: '',
  };

  const handleCopyPrompt = (e: React.MouseEvent, text: string, label: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`已复制 ${label} 到剪贴板！`);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="group relative flex flex-col justify-between rounded-2xl bg-neutral-900/90 border border-neutral-800/90 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top Banner & Header */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-gradient-to-r ${catInfo.color}`}
          >
            {catInfo.zh}
          </span>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
            {catInfo.en}
          </span>
        </div>

        <div className="mb-2">
          <h3 className="text-base font-bold text-neutral-100 group-hover:text-indigo-400 transition-colors">
            {cue.nameZh}
          </h3>
          <div className="text-xs font-mono text-neutral-400 tracking-tight">{cue.name}</div>
        </div>

        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
          {cue.summary}
        </p>

        {/* Visual Traits Pills */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {cue.visualTraits.slice(0, 3).map((trait) => (
            <span
              key={trait}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-950 text-neutral-400 border border-neutral-800/80"
            >
              #{trait}
            </span>
          ))}
          {cue.visualTraits.length > 3 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 text-neutral-500">
              +{cue.visualTraits.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Mini Interactive Preview Area */}
      <div
        className="px-5 py-2 bg-neutral-950/60 border-y border-neutral-800/60"
        onClick={(e) => {
          // If clicked inside interactive controls in preview, don't trigger parent card click
          // but allow users to click preview to view details
        }}
      >
        <div className="pointer-events-none transform scale-90 -my-2 origin-center">
          <MotionPreviewRenderer type={cue.previewType} />
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 py-3 flex items-center justify-between bg-neutral-950/80 text-xs">
        <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1 group-hover:text-indigo-400 transition-colors">
          <Eye className="w-3.5 h-3.5" /> 点击查阅完整参数
        </span>

        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => handleCopyPrompt(e, cue.aiPromptEn, '英文 AI 提示词')}
            title="复制英文 AI 提示词 (Cursor / v0 / Claude)"
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition"
          >
            {copied === '英文 AI 提示词' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={(e) => handleCopyPrompt(e, cue.aiPromptZh, '中文需求指令')}
            title="复制中文设计规范与 AI 指令"
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition"
          >
            {copied === '中文需求指令' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Terminal className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

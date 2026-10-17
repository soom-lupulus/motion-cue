'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Sparkles, Save, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { MotionCategory, MotionCue, CATEGORY_LABELS } from '@/types/cue';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCue: MotionCue) => void;
  initialCue?: MotionCue | null;
}

const PREVIEW_TYPES = [
  { id: 'anticipation-overshoot', name: '蓄力回弹物理 (Anticipation)' },
  { id: 'kinetic-typography', name: '动态排版交错 (Kinetic Text)' },
  { id: 'chromatic-aberration', name: 'RGB 色彩分离 (Chromatic Aberration)' },
  { id: 'whip-pan', name: '甩镜转场模糊 (Whip Pan)' },
  { id: 'match-cut', name: '几何形状匹配切 (Match Cut)' },
  { id: 'parallax-2-5d', name: '2.5D 空间视差 (Parallax)' },
  { id: 'scanline-crt-glitch', name: 'CRT 复古扫描线 (CRT Glitch)' },
  { id: 'squash-and-stretch', name: '挤压与拉伸弹性 (Squash & Stretch)' },
  { id: 'dolly-zoom', name: '滑动变焦透视 (Dolly Zoom)' },
  { id: 'magnetic-pull', name: '磁吸附光标 (Magnetic Pull)' },
  { id: 'particle-confetti', name: '彩屑粒子爆发 (Confetti)' },
  { id: 'rolling-counter', name: '数字轮盘翻牌 (Rolling Counter)' },
  { id: 'skeleton-shimmer', name: '骨架屏流光扫射 (Shimmer Wave)' },
  { id: 'ripple-wave', name: '水波纹同心圆 (Ripple Shockwave)' },
  { id: 'camera-shake', name: '手持微晃震颤 (Camera Shake)' },
  { id: 'custom', name: '通用动态卡片 (Default)' },
];

export const CueFormModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialCue }) => {
  const [name, setName] = useState(initialCue?.name || '');
  const [nameZh, setNameZh] = useState(initialCue?.nameZh || '');
  const [category, setCategory] = useState<MotionCategory>(initialCue?.category || 'PHYSICS');
  const [summary, setSummary] = useState(initialCue?.summary || '');
  const [description, setDescription] = useState(initialCue?.description || '');
  const [traitInput, setTraitInput] = useState('');
  const [visualTraits, setVisualTraits] = useState<string[]>(
    initialCue?.visualTraits || ['高频振荡', '非线性减速']
  );
  const [aiPromptEn, setAiPromptEn] = useState(initialCue?.aiPromptEn || '');
  const [aiPromptZh, setAiPromptZh] = useState(initialCue?.aiPromptZh || '');
  const [remotionSnippet, setRemotionSnippet] = useState(initialCue?.remotionSnippet || '');
  const [mathFormula, setMathFormula] = useState(initialCue?.mathFormula || '');
  const [previewType, setPreviewType] = useState(initialCue?.previewType || 'anticipation-overshoot');
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleAddTrait = () => {
    if (!traitInput.trim()) return;
    if (!visualTraits.includes(traitInput.trim())) {
      setVisualTraits([...visualTraits, traitInput.trim()]);
    }
    setTraitInput('');
  };

  const handleRemoveTrait = (trait: string) => {
    setVisualTraits(visualTraits.filter((t) => t !== trait));
  };

  // Auto-generate AI prompt suggestions based on inputs
  const autoFillPrompt = () => {
    if (!nameZh && !name) {
      toast.error('请先填写名词中英文名称');
      return;
    }
    const autoEn = `Dynamic ${name || nameZh} animation sequence with professional motion design standards. Featuring ${visualTraits.join(', ')}. Smooth easing curves, high framerate, clean visual aesthetics, 4k cinematic render.`;
    const autoZh = `动态视觉呈现“${nameZh || name}”效果：画面核心展现 [${visualTraits.join('、')}]，带有真实物理缓动曲线与极高动态张力，适合用于短视频转场或现代高级 UI 交互。`;
    setAiPromptEn(autoEn);
    setAiPromptZh(autoZh);
    toast.success('已自动生成 AI 提示词草稿！');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !nameZh.trim() || !summary.trim()) {
      toast.error('请完整填写英文学术名、中文行业名和核心一句话定义');
      return;
    }

    setSaving(true);
    const newCue: MotionCue = {
      id: initialCue?.id || `cue-${Date.now()}`,
      name: name.trim(),
      nameZh: nameZh.trim(),
      category,
      summary: summary.trim(),
      description: description.trim() || summary.trim(),
      visualTraits,
      aiPromptEn: aiPromptEn.trim(),
      aiPromptZh: aiPromptZh.trim(),
      remotionSnippet: remotionSnippet.trim(),
      mathFormula: mathFormula.trim(),
      previewType,
      tags: [nameZh, name, ...visualTraits],
      isPreset: false,
      createdAt: initialCue?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      // POST to backend API
      const res = await fetch('/api/cues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCue),
      });
      const data = await res.json();
      if (data.success && data.cue) {
        onSave(data.cue);
      } else {
        onSave(newCue);
      }
      toast.success(initialCue ? '已更新动效词条！' : '成功录入新动效名词！');
      onClose();
    } catch {
      // Offline fallback
      onSave(newCue);
      toast.success('已保存到本地缓存！');
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-neutral-100">
              {initialCue ? '编辑动效名词' : '录入新动效 / 特效名词'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                中文行业名 <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={nameZh}
                onChange={(e) => setNameZh(e.target.value)}
                placeholder="例如：甩镜转场 / 快速摇镜"
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                英文学术 / 业内标准名 <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：Whip Pan / Swish Pan"
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-indigo-500 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">所属分类</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MotionCategory)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:border-indigo-500 outline-none"
              >
                {Object.entries(CATEGORY_LABELS).map(([catKey, info]) => (
                  <option key={catKey} value={catKey}>
                    {info.zh} ({info.en})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">预览效果类型</label>
              <select
                value={previewType}
                onChange={(e) => setPreviewType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:border-indigo-500 outline-none"
              >
                {PREVIEW_TYPES.map((pt) => (
                  <option key={pt.id} value={pt.id}>
                    {pt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              核心一句话定义 <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="概括该动效在画面中的视觉规律与核心物理特征"
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              视觉原理与节奏拆解
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="详细解释该动效的帧率、加速度、前后摇时间占比等专业细节..."
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-600 focus:border-indigo-500 outline-none resize-none"
            />
          </div>

          {/* Visual Traits */}
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              视觉特征标签拆解
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={traitInput}
                onChange={(e) => setTraitInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTrait();
                  }
                }}
                placeholder="输入特征如：极速模糊、RGB分离、蓄力后退... 按回车添加"
                className="flex-1 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 placeholder:text-neutral-600 focus:border-indigo-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddTrait}
                className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" /> 添加
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {visualTraits.map((trait) => (
                <span
                  key={trait}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300"
                >
                  <span>{trait}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTrait(trait)}
                    className="hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* AI Prompts */}
          <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                AI 提示词定义 (用于指导 AI 生成或渲染)
              </span>
              <button
                type="button"
                onClick={autoFillPrompt}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono transition"
              >
                🪄 自动生成 Prompt
              </button>
            </div>

            <div>
              <label className="block text-[11px] text-neutral-400 mb-1 font-mono">
                AI 英文生成提示词 (Runway / Sora / Midjourney)
              </label>
              <textarea
                rows={2}
                value={aiPromptEn}
                onChange={(e) => setAiPromptEn(e.target.value)}
                placeholder="English prompt for AI video generators..."
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 font-mono focus:border-indigo-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] text-neutral-400 mb-1 font-mono">
                Remotion / 前端代码生成规范指令 (Cursor / Claude)
              </label>
              <textarea
                rows={2}
                value={aiPromptZh}
                onChange={(e) => setAiPromptZh(e.target.value)}
                placeholder="给 Cursor 或 Claude 生成代码的明确指令..."
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 font-mono focus:border-indigo-500 outline-none resize-none"
              />
            </div>
          </div>

          {/* Remotion Snippet & Formula */}
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1 font-mono">
              Remotion 代码片段 / 公式 (可选)
            </label>
            <textarea
              rows={3}
              value={remotionSnippet}
              onChange={(e) => setRemotionSnippet(e.target.value)}
              placeholder="const progress = spring({ frame, fps, config: { damping: 14 } });"
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 font-mono focus:border-indigo-500 outline-none resize-none"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? '保存中...' : '确认保存'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

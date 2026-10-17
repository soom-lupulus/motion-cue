'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Copy, Check, Wand2, Terminal, Code2, Video, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { PRESET_MOTION_CUES } from '@/data/presets';
import { MotionCue } from '@/types/cue';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectCue?: (cue: MotionCue) => void;
}

const PRESET_SCENARIOS = [
  {
    title: '果冻弹性入场与逐字跳出',
    prompt: '我想做一组文字卡片从下方弹上来，有果冻弹力晃动感，文字逐字跳出，带自然物理减震。',
    matchedTags: ['Anticipation & Overshoot', 'Kinetic Typography', 'Spring Oscillation'],
  },
  {
    title: '赛博朋克重击红蓝故障',
    prompt: '背景音乐重音打击瞬间，画面产生剧烈的红蓝两色分离撕裂，带几帧复古扫描线抖动。',
    matchedTags: ['Chromatic Aberration', 'Scanline CRT Glitch'],
  },
  {
    title: '电影级极速横向甩镜转场',
    prompt: '两个场景之间要极快地横向甩过去，中间有强烈的动态模糊拉丝，随后稳稳减速切入下一镜头。',
    matchedTags: ['Whip Pan', 'Directional Motion Blur'],
  },
  {
    title: '鼠标靠近卡片磁吸附与流光',
    prompt: '网页中鼠标滑过卡片时，卡片主动朝鼠标方向微倾斜吸附，边缘有一道细腻的流光渐变划过。',
    matchedTags: ['Magnetic Pull', 'Skeleton Shimmer Wave', '2.5D Parallax'],
  },
];

export const PromptAssistantModal: React.FC<Props> = ({ isOpen, onClose, onSelectCue }) => {
  const [naturalText, setNaturalText] = useState('');
  const [activeTab, setActiveTab] = useState<'remotion' | 'web' | 'video'>('remotion');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  // Keyword matching against cues
  const matchedCues = PRESET_MOTION_CUES.filter((cue) => {
    if (!naturalText.trim()) return false;
    const lower = naturalText.toLowerCase();
    return (
      lower.includes(cue.nameZh.toLowerCase()) ||
      lower.includes(cue.name.toLowerCase()) ||
      cue.visualTraits.some((t) => lower.includes(t.toLowerCase())) ||
      (cue.aliases && cue.aliases.some((a) => lower.includes(a.toLowerCase()))) ||
      cue.tags.some((tag) => lower.includes(tag.toLowerCase())) ||
      (naturalText.includes('果冻') && (cue.id === 'anticipation-overshoot' || cue.id === 'squash-and-stretch')) ||
      (naturalText.includes('弹性') && (cue.id === 'anticipation-overshoot' || cue.id === 'squash-and-stretch')) ||
      (naturalText.includes('弹') && cue.id === 'anticipation-overshoot') ||
      (naturalText.includes('字') && (cue.id === 'kinetic-typography' || cue.id === 'rolling-counter')) ||
      (naturalText.includes('故障') && (cue.id === 'chromatic-aberration' || cue.id === 'scanline-crt-glitch')) ||
      (naturalText.includes('红蓝') && cue.id === 'chromatic-aberration') ||
      (naturalText.includes('色差') && cue.id === 'chromatic-aberration') ||
      (naturalText.includes('甩') && cue.id === 'whip-pan') ||
      (naturalText.includes('吸附') && cue.id === 'magnetic-pull') ||
      (naturalText.includes('流光') && cue.id === 'skeleton-shimmer-wave') ||
      (naturalText.includes('粒子') && cue.id === 'particle-confetti-burst') ||
      (naturalText.includes('变焦') && cue.id === 'dolly-zoom') ||
      (naturalText.includes('视差') && cue.id === 'parallax-2-5d') ||
      (naturalText.includes('水波') && cue.id === 'ripple-wave-burst') ||
      (naturalText.includes('震') && cue.id === 'camera-shake-noise')
    );
  });

  // Effective cues: if none matched, use the first 2 presets for demonstration
  const effectiveCues = matchedCues.length > 0 ? matchedCues : PRESET_MOTION_CUES.slice(0, 2);

  // Generate structured Remotion Prompt
  const generatedRemotionPrompt = `你是一名精通 Remotion 编程式视频渲染的前端动效工程师。
【动效需求自然语言描述】:
"${naturalText || '元素从下方弹性弹出，并伴随文字逐词交错'}"

【业内学术名词及规范】:
${effectiveCues.map((c) => `- ${c.name} (${c.nameZh}): ${c.summary}`).join('\n')}

【要求与实现规范】:
1. 请使用 Remotion 的 useCurrentFrame(), useVideoConfig(), spring() 以及 interpolate() 实现。
2. 物理参数建议:
${effectiveCues
  .map(
    (c) =>
      `   * ${c.nameZh}: 关注视觉特征 [${c.visualTraits.join(', ')}]，对应公式/阻尼参数参考: ${c.mathFormula || 'spring({ damping: 14, stiffness: 200 })'}`
  )
  .join('\n')}
3. 严格禁止硬编码时长，基于 fps 计算帧数。
4. 提供完整可运行的 React / Remotion 组件代码，并写明每一段关键帧计算的物理意义。`;

  // Generate Web / Framer Motion Prompt
  const generatedWebPrompt = `你是一名资深 Web 前端动效专家，精通 React + Tailwind CSS + Framer Motion。
【需求描述】:
"${naturalText || '元素从下方弹性弹出，并伴随文字逐词交错'}"

【应用专业动效规范】:
${effectiveCues.map((c) => `- ${c.name} (${c.nameZh})`).join('\n')}

【要求】:
1. 使用 Framer Motion 编写现代交互组件。
2. 配置 transition 弹性阻尼 (type: "spring", stiffness: 260, damping: 18) 与 staggerChildren 交错延时。
3. 兼顾 prefers-reduced-motion 无障碍适配与流畅 60fps 硬件加速渲染。`;

  // Generate Video AI Prompt
  const generatedVideoPrompt = `${effectiveCues.map((c) => c.aiPromptEn).join(' ')} Seamless cinematic pacing, natural physics easing, 4k 60fps.`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    toast.success(`已复制 ${type} 指令到剪贴板！可以直接喂给 AI`);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-3xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-100 flex items-center gap-2">
                <span>AI 动效指令转译器</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  自然语言 → 业内学名 → AI Prompt
                </span>
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                解决“脑子里有画面但叫不出名字”的痛点，快速生成 Cursor / Claude / Remotion 提示词
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Quick presets */}
          <div>
            <div className="text-xs font-medium text-neutral-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>常见画面灵感快速填入：</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.title}
                  onClick={() => setNaturalText(scenario.prompt)}
                  className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 hover:border-indigo-500/50 hover:bg-neutral-800/50 text-left transition group"
                >
                  <div className="text-xs font-bold text-neutral-200 group-hover:text-indigo-400 flex items-center justify-between">
                    <span>{scenario.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-neutral-400 line-clamp-1 mt-1 font-mono">
                    {scenario.prompt}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Natural Language Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
              <span>描述你脑海中的画面与动效感觉：</span>
              <span className="text-[11px] text-neutral-500 font-normal">支持口语化输入</span>
            </label>
            <textarea
              rows={3}
              value={naturalText}
              onChange={(e) => setNaturalText(e.target.value)}
              placeholder="例如：文字像果冻一样从下往上弹出来晃两下；或者场景在0.2秒内极速横向甩过去带很重的模糊..."
              className="w-full rounded-xl bg-neutral-950 border border-neutral-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-3 text-sm text-neutral-100 placeholder:text-neutral-600 outline-none transition resize-none font-sans"
            />
          </div>

          {/* Matched Industry Terms */}
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2">
            <div className="text-xs font-semibold text-neutral-400 flex items-center justify-between">
              <span>识别匹配到的业内规范术语 ({effectiveCues.length})：</span>
              <span className="text-[10px] text-indigo-400 font-mono">精准对齐学术标准</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {effectiveCues.map((cue) => (
                <div
                  key={cue.id}
                  onClick={() => onSelectCue && onSelectCue(cue)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-indigo-500 hover:bg-neutral-800/80 text-xs text-neutral-200 flex items-center gap-1.5 cursor-pointer transition"
                >
                  <span className="font-bold text-indigo-300">{cue.nameZh}</span>
                  <span className="text-neutral-400 font-mono text-[11px]">({cue.name})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
            <button
              onClick={() => setActiveTab('remotion')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'remotion'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Remotion 视频代码 Prompt</span>
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'web'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Framer Motion / Web UI Prompt</span>
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'video'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>AI 视频生成 Prompt (Sora/Runway)</span>
            </button>
          </div>

          {/* Code Prompt Output */}
          <div className="relative rounded-xl bg-neutral-950 border border-neutral-800 p-4 font-mono text-xs">
            <div className="absolute top-3 right-3">
              <button
                onClick={() => {
                  const text =
                    activeTab === 'remotion'
                      ? generatedRemotionPrompt
                      : activeTab === 'web'
                      ? generatedWebPrompt
                      : generatedVideoPrompt;
                  copyToClipboard(text, activeTab);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold border border-neutral-700 transition"
              >
                {copiedType === activeTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>一键复制 Prompt</span>
                  </>
                )}
              </button>
            </div>

            <pre className="whitespace-pre-wrap text-neutral-300 leading-relaxed max-h-56 overflow-y-auto pr-24 font-mono">
              {activeTab === 'remotion' && generatedRemotionPrompt}
              {activeTab === 'web' && generatedWebPrompt}
              {activeTab === 'video' && generatedVideoPrompt}
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

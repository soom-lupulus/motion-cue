export type MotionCategory =
  | 'TRANSITION'
  | 'TYPOGRAPHY'
  | 'PHYSICS'
  | 'VFX_GLITCH'
  | 'CAMERA'
  | 'MICRO_INTERACTION'
  | 'PARTICLES_LIGHT';

export interface MotionCue {
  id: string;
  name: string;             // 英文业界学名，如 "Anticipation & Overshoot"
  nameZh: string;           // 中文行业通用名，如 "蓄力前摇与冲出回弹"
  aliases?: string[];       // 别名/口语叫法，如 ["果冻弹性", "缓冲 overshoot"]
  category: MotionCategory; // 分类
  summary: string;          // 核心一句话定义
  description: string;      // 视觉原理与节奏拆解
  visualTraits: string[];   // 视觉特征标签，如 ["反向微移", "弹簧减震", "极速爆发"]
  aiPromptEn: string;       // AI 视频/渲染提示词 (Runway, Sora, Midjourney)
  aiPromptZh: string;       // AI 提示词 (中文)
  remotionSnippet?: string | null; // Remotion 核心实现代码
  mathFormula?: string | null;     // 物理公式/缓动曲线定义
  previewType: string;      // 对应的实时预览组件类型标识
  tags: string[];           // 标签
  isPreset?: boolean;       // 是否为官方内置预设
  createdAt?: string;
  updatedAt?: string;
}

export const CATEGORY_LABELS: Record<MotionCategory, { zh: string; en: string; color: string; desc: string }> = {
  TRANSITION: {
    zh: '剪辑与转场',
    en: 'Transitions',
    color: 'from-amber-500/20 to-orange-500/20 text-orange-400 border-orange-500/30',
    desc: '画面间过渡连贯手法：甩镜、匹配切、极速推拉等',
  },
  TYPOGRAPHY: {
    zh: '动态排版与字幕',
    en: 'Kinetic Typography',
    color: 'from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30',
    desc: '字符与文本动效：逐字入场、字距张力、打字机、翻牌等',
  },
  PHYSICS: {
    zh: '物理与缓动曲线',
    en: 'Physics & Easing',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    desc: '现实物理法则仿真：弹簧振荡、质量惯性、重力下坠与挤压拉伸',
  },
  VFX_GLITCH: {
    zh: '特效与故障变形',
    en: 'VFX & Distortion',
    color: 'from-fuchsia-500/20 to-pink-500/20 text-pink-400 border-pink-500/30',
    desc: '视觉破坏与合成风格：RGB色散分离、CRT扫描线、噪声位移',
  },
  CAMERA: {
    zh: '镜头运镜与视差',
    en: 'Camera & Parallax',
    color: 'from-violet-500/20 to-purple-500/20 text-purple-400 border-purple-500/30',
    desc: '摄像机空间运动：2.5D多层视差、眩晕变焦、手持微晃抖动',
  },
  MICRO_INTERACTION: {
    zh: '交互微动效',
    en: 'Micro-Interactions',
    color: 'from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/30',
    desc: 'UI/前端触感反馈：磁吸附、流光渐变边框、波纹扩散、骨架屏',
  },
  PARTICLES_LIGHT: {
    zh: '粒子与环境光效',
    en: 'Particles & Light',
    color: 'from-rose-500/20 to-amber-500/20 text-rose-400 border-rose-500/30',
    desc: '氛围与高光渲染：粒子彩屑爆炸、体积丁达尔光束、呼吸光晕',
  },
};

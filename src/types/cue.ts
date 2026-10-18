export type MotionCategory =
  | 'NAVIGATION'
  | 'CONTAINERS'
  | 'CONTROLS'
  | 'FEEDBACK'
  | 'LOADING'
  | 'MOTION'
  | 'AESTHETICS'
  | 'BANNER'
  | 'STYLE';

export interface MotionCue {
  id: string;
  name: string;             // 英文业界学名，如 "Pill Bar / Capsule Navigation"
  nameZh: string;           // 中文行业通用名，如 "胶囊栏 / 药丸导航"
  aliases?: string[];       // 别名/口语叫法，如 ["药丸导航", "胶囊切换", "Capsule Nav"]
  category: MotionCategory; // 独立大类
  summary: string;          // 核心一句话定义 / 解决什么困惑
  description: string;      // 设计原理、交互心智与视觉拆解
  visualTraits: string[];   // 视觉特征标签，如 ["胶囊高圆角", "滑动高亮", "浮动吸附"]
  aiPromptEn: string;       // AI 提示词 (英文，适合 Cursor / v0 / Claude / Tailwind / React)
  aiPromptZh: string;       // AI 提示词 (中文，方便提需求给设计与AI)
  remotionSnippet?: string | null; // 核心实现代码片段 (React / Tailwind / Framer Motion / Remotion)
  mathFormula?: string | null;     // 物理公式/缓动曲线/CSS参数
  previewType: string;      // 对应的实时预览组件类型标识
  tags: string[];           // 标签
  isPreset?: boolean;       // 是否为官方内置预设
  createdAt?: string;
  updatedAt?: string;
}

export const CATEGORY_LABELS: Record<
  MotionCategory,
  { zh: string; en: string; color: string; desc: string }
> = {
  NAVIGATION: {
    zh: '导航',
    en: 'Navigation',
    color: 'from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30',
    desc: '寻路与空间定位：胶囊栏、分段器、停靠栏、轨道导航、面包屑',
  },
  CONTAINERS: {
    zh: '容器',
    en: 'Containers',
    color: 'from-amber-500/20 to-orange-500/20 text-orange-400 border-orange-500/30',
    desc: '内容排版与折叠包装：抽屉底板、手风琴、跑马灯、堆叠卡、瀑布流',
  },
  CONTROLS: {
    zh: '控件',
    en: 'Controls',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    desc: '触发操作与指令筛选：胶囊标签、悬浮动作钮、步进器、幽灵按钮、双向滑块',
  },
  FEEDBACK: {
    zh: '提示',
    en: 'Feedback',
    color: 'from-purple-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30',
    desc: '轻量浮层与临时响应：吐司、气泡卡、悬浮注、通告横幅、状态徽标',
  },
  LOADING: {
    zh: '等待',
    en: 'Loading',
    color: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30',
    desc: '耗时占位与状态兜底：骨架微光、渐进模糊、波浪点、幽灵占位、空状态',
  },
  MOTION: {
    zh: '动效',
    en: 'Motion',
    color: 'from-fuchsia-500/20 to-pink-500/20 text-fuchsia-400 border-fuchsia-500/30',
    desc: '运动规律与物理质感：弹性回弹、共享元素、磁吸附、级联交错、橡皮筋超滑',
  },
  AESTHETICS: {
    zh: '材质',
    en: 'Aesthetics',
    color: 'from-yellow-500/20 to-amber-500/20 text-amber-400 border-amber-500/30',
    desc: '视觉光影与修饰：流光描边、网格渐变、噪点纹理、光锥公转',
  },
  BANNER: {
    zh: '横幅',
    en: 'Banner',
    color: 'from-sky-500/20 to-blue-500/20 text-sky-400 border-sky-500/30',
    desc: '通告与视觉焦点：通告条、首屏大通栏、轮播画廊、吸底横幅、斜角彩带',
  },
  STYLE: {
    zh: '风格',
    en: 'Style',
    color: 'from-violet-500/20 to-purple-500/20 text-purple-300 border-purple-500/30',
    desc: '整页全局设计风格与规范系统：Linear极客暗黑、新粗野主义整页、Bento便当盒全景、现代极简白昼、大字杂志排版、科幻HUD终端、3D黏土潮玩、复古视窗系统',
  },
};

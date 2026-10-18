# Motion Cue ⚡

> **前端交互设计与动效速查词典 · UI/UX 架构与 AI 提示词规范库**

在做前端开发与 UI/UX 设计沟通时，“天天见、脑子里有画面，但一张口就容易词穷”（比如各种 Loading 怎么描述、药丸一样的按钮栏该叫什么、各种整体 UI 风格该怎么精准让 AI 生成）是最普遍的痛点。

**Motion Cue** 专为解决这一痛点而生：不再局限于单一的视频渲染，而是覆盖**前端设计的全景维度**。将口语化直觉精准转译为业内标准学术名词、可交互实时预览、现代前端实战代码配方（React / Tailwind / Framer Motion）以及一键喂给 AI（Cursor / v0 / Claude）的高质量结构化提示词。

---

## 🌟 核心特性

- 📚 **9 大独立设计维度**：彻底摒弃复合分类，提炼出 9 个纯粹独立的单项大类：
  - **导航 (Navigation)**：胶囊栏 (Pill Bar)、分段器 (Segmented Control)、停靠栏 (Dock)、轨道导航 (Rail)、面包屑等。
  - **容器 (Containers)**：抽屉底板 (Bottom Sheet)、手风琴 (Accordion)、跑马灯 (Marquee)、堆叠卡片 (Stacked Cards) 等。
  - **控件 (Controls)**：胶囊标签 (Chips)、悬浮动作钮 (FAB)、步进器 (Stepper)、幽灵按钮 (Ghost Button) 等。
  - **提示 (Feedback)**：吐司 (Toast)、气泡卡片 (Popover)、悬浮注 (Tooltip)、状态徽标 (Badge) 等。
  - **等待 (Loading)**：骨架微光 (Shimmer)、渐进模糊占位 (Blur-up LQIP)、波浪跳动点 (Typing Dots)、乐观更新幽灵态等。
  - **动效 (Motion)**：弹性回弹 (Spring Overshoot)、磁吸附 (Magnetic Cursor)、共享元素转场 (Hero) 等。
  - **材质 (Aesthetics)**：毛玻璃 (Glassmorphism)、流光描边 (Border Beam)、卡片聚光灯 (Spotlight Glow) 等局部材质光影质感。
  - **横幅 (Banner)**：通告条 (Announcement Bar)、首屏大通栏 (Hero Banner)、轮播画廊 (Carousel Banner)、斜角彩带 (Corner Ribbon) 等。
  - **风格 (Style)**：整页全局设计风格与规范系统，包括 Linear 极客暗黑全页、新粗野主义整页、Bento 便当盒全景落地页、现代极简企业白昼 (Stripe Light)、极简大字杂志排版、赛博朋克科幻终端、3D 黏土萌系潮玩、90s 复古系统视窗等。每个风格均提供微缩全景网页预览与整页 AI 提示词规范。
- 🎮 **实时交互效果预览**：每个设计形态均内嵌基于 React 19 + Framer Motion 的实时可交互控件（微缩全景网页交互、点击滑出通告、抽换堆叠卡、滑动胶囊滑块、波浪跳动、磁吸附、弹簧阻尼回弹等）。
- 📐 **实战代码配方**：内置 Tailwind CSS、Framer Motion、CSS 关键帧及数学参数公式，开箱即用。
- ⚡ **纯静态极速检索**：0ms 响应，零数据库/零后端开销，离线即用，即开即查。
- 🚀 **一键极速部署**：完全兼容 Next.js App Router 静态预渲染，可直接部署至 Vercel / GitHub Pages / Cloudflare Pages。

---

## 🛠️ 技术栈

- **框架**：Next.js (App Router, Turbopack) + React 19 + TypeScript
- **包管理器**：`pnpm`
- **样式与动效**：Tailwind CSS + Framer Motion + canvas-confetti
- **组件与交互**：Lucide Icons + Sonner (Toast)

---

## 🚀 快速上手

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

在浏览器打开 [http://localhost:3000](http://localhost:3000) 即可开始浏览与复制。

---

## ⚡ 纯静态架构与一键部署

本项目为 **100% 纯客户端静态站点（Static Site）**，完全零服务器/零数据库依赖：
- **极速响应**：所有 9 大维度共 34 个经典词条及交互动效组件均打包在客户端，搜索、筛选与代码生成 0ms 响应。
- **开箱即用**：专为开发者查阅与一键生成高质量 AI Prompt（Cursor / Claude / v0）打造。
- **一键托管部署**：支持直接构建静态产物，一键部署到 Vercel、GitHub Pages 或 Cloudflare Pages，永久免费零维护。

```bash
# 构建生产环境静态资源
pnpm build
```

# Motion Cue ⚡

> **动效与视觉特效（Motion Design & VFX）学术词典 · Remotion AI 提示词规范库**

用自然语言描述动效（Motion Design）和视觉特效（VFX）时，“脑子里有画面但叫不出名字”是开发 Remotion 或类似编程式视频渲染时最普遍的痛点。

**Motion Cue** 专为解决这一痛点而生：将模糊的“动效感觉”，精确转译为行业标准学术名词、物理公式、Remotion 实战代码片段与一键喂给 AI（Cursor / Claude / Sora / Runway）的高质量结构化提示词。

---

## 🌟 核心特性

- 📚 **业内标准名词库**：涵盖 7 大专业分类（物理缓动曲线、动态排版、VFX故障风、剪辑与转场、镜头运镜与视差、交互微动效、粒子光效）。
- 🎮 **实时交互效果预览**：不仅是静态文字，每个效果均具备基于 Framer Motion / Canvas / WebGL 的实时可交互控件（重放、阻尼调节、光标重力吸附、冲击波等）。
- 🤖 **AI 动效指令转译器**：口语化输入“文字像果冻晃两下弹出来”，系统自动对齐匹配业内学名，一键生成 Remotion / Framer Motion / 视频生成专用 Prompt。
- 📐 **Remotion 实战代码配方**：内置 `useCurrentFrame()`、`spring()`、`interpolate()`、`Easing` 完整计算公式，开箱即用。
- 💾 **灵活双模持久化**：
  - **零配置模式**：免配数据库，支持本地增删改查与 JSON 完整导入导出，Vercel 一键上线即用。
  - **云端持久化**：内置 Prisma + PostgreSQL 模型，配置 `DATABASE_URL` 即可多端实时云端同步。
- 🚀 **Vercel 一键极速部署**：完全兼容 Next.js App Router 与 Vercel 自动化部署。

---

## 🛠️ 技术栈

- **框架**：Next.js (App Router) + React 19 + TypeScript
- **包管理器**：`pnpm`
- **样式与动效**：Tailwind CSS v4 + Framer Motion + canvas-confetti
- **组件与交互**：Lucide Icons + Sonner (Toast)
- **数据库 ORM**：Prisma Client + PostgreSQL (支持 Docker / Neon / Supabase)

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

在浏览器打开 [http://localhost:3000](http://localhost:3000) 即可开始浏览与记录。

---

## 🗄️ 数据库配置（可选）

### 本地 Docker 数据库（与 yogurt 一致的体验）

项目内置了便捷的一键本地 PostgreSQL 容器启动脚本：

```bash
# 启动本地 PostgreSQL 容器
./start-database.sh

# 运行数据库迁移
pnpm exec prisma db push
```

### 云端数据库（Neon / Supabase / Vercel Postgres）

在 `.env` 或 Vercel 环境变量中配置：

```env
DATABASE_URL="postgresql://user:password@your-postgres-host:5432/motion-cue"
```

> **提示**：未配置 `DATABASE_URL` 时，项目将自动以本地增强模式运行，内置全部动效预设，并支持本地增删改查与 JSON 导出导入，完全不影响 Vercel 部署与日常查阅！

---

## 🚢 Vercel 快速部署

1. 将代码推送到 GitHub 仓库：
   ```bash
   git add .
   git commit -m "feat: init motion-cue"
   git push origin main
   ```
2. 在 Vercel 控制台点击 **Import Project**，选择该仓库。
3. Framework Preset 选择 **Next.js**，包管理器识别为 `pnpm`。
4. （可选）配置 `DATABASE_URL` 环境变量；不配置也可直接点击 **Deploy** 零配置上线！

---

## 📄 许可证

MIT License

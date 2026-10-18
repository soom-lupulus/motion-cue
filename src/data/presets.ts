import { MotionCue } from '../types/cue';

export const PRESET_MOTION_CUES: MotionCue[] = [
  /* =========================================================
     1. NAVIGATION 导航类
     ========================================================= */
  {
    id: 'pill-bar',
    name: 'Pill Bar / Capsule Navigation',
    nameZh: '胶囊栏 / 药丸导航',
    aliases: ['胶囊导航', '药丸按钮栏', 'Capsule Nav', 'Pill Tabs'],
    category: 'NAVIGATION',
    summary: '整体呈全圆角药丸状的导航容器，内部选中项常伴有平滑滑动的胶囊高亮块。',
    description: '摆脱传统矩形标签栏的厚重感，采用 full-rounded（胶囊圆角）作为外轮廓。用户点击不同选项卡时，激活状态的高亮背景利用 Framer Motion 的 layoutId 进行流体弹簧平移，赋予界面现代轻盈的物理跟随感。常用于页面级视图过滤、浮动导航栏或移动端筛选器。',
    visualTraits: ['胶囊高圆角 (rounded-full)', '滑动高亮滑块 (layoutId)', '轻量浮层阴影', '紧凑字距与内边距'],
    aiPromptEn: 'Modern floating pill navigation bar with capsule shape. Multiple rounded tab buttons inside a dark translucent pill container. Smooth spring layout transition where an active pill indicator fluidly glides behind the selected item when clicked. Clean minimalist UI with Tailwind CSS and Framer Motion.',
    aiPromptZh: '设计一个现代悬浮胶囊导航栏（Pill Bar）：全圆角药丸轮廓，背景为半透明磨砂黑；点击不同子项时，高亮胶囊背景以真实弹簧物理平滑滑至目标位置（layoutId），字态高亮无缝切换，具备轻盈灵动的交互触感。',
    remotionSnippet: `// React + Tailwind + Framer Motion: 胶囊栏与跟随滑块
export function PillBar({ tabs, activeTab, onChange }) {
  return (
    <div className="flex items-center gap-1 p-1.5 rounded-full bg-neutral-900 border border-neutral-800">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className="relative px-4 py-1.5 rounded-full text-xs font-medium z-10 transition-colors"
          >
            {tab}
            {isActive && (
              <motion.div
                layoutId="active-pill"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="absolute inset-0 bg-cyan-500 rounded-full -z-10 shadow-md shadow-cyan-500/30"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}`,
    mathFormula: 'spring(stiffness: 400, damping: 30); border-radius: 9999px',
    previewType: 'pill-bar',
    tags: ['导航', '胶囊', 'Pill', 'Framer Motion', '现代UI'],
    isPreset: true,
  },
  {
    id: 'segmented-control',
    name: 'Segmented Control',
    nameZh: '分段器 / 分段控制器',
    aliases: ['分段控制器', 'iOS分段滑块', 'Segmented Tabs'],
    category: 'NAVIGATION',
    summary: 'iOS 经典互斥切换器，内凹底槽上平滑滑动浮起的白/亮色指示块。',
    description: '用于在 2 到 5 个互斥的视图或模式之间快速切换。不同于普通的 Tab，分段控制器的特征是整体嵌在一个紧凑的浅槽中，当前选中项像一块微微凸起的物理按键，滑动带有轻微的阻尼与按压形变，视觉重心高度聚焦。',
    visualTraits: ['内凹浅槽背景', '凸起白色浮块', '弹性滑块切换', '互斥选择'],
    aiPromptEn: 'iOS-inspired segmented control component. A compact recessed track containing 2-3 mutually exclusive options. An elevated white/light active thumb smoothly animates between segments with natural damping spring physics. Crisp border, subtle inner shadow.',
    aiPromptZh: '实现一个高拟真 iOS 风格分段控制器（Segmented Control）：深色内嵌底槽，活动项为微凸白色圆角滑块，切换时带有弹性物理位移与微弱缩放反馈，适合按日/周/月或明/暗模式切换。',
    remotionSnippet: `// React + Framer Motion: iOS 风格分段控制器
<div className="flex p-1 rounded-xl bg-neutral-900 border border-neutral-800 w-64">
  {modes.map((mode) => (
    <button
      key={mode}
      onClick={() => setSelected(mode)}
      className="relative flex-1 py-1.5 text-xs font-semibold text-center z-10"
    >
      {mode}
      {selected === mode && (
        <motion.div
          layoutId="segmented-thumb"
          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
          className="absolute inset-0 bg-white rounded-lg -z-10 shadow-sm"
        />
      )}
    </button>
  ))}
</div>`,
    mathFormula: 'layoutId="segmented-thumb" with spring(stiffness: 450, damping: 32)',
    previewType: 'segmented-control',
    tags: ['导航', '分段器', 'iOS', '互斥切换'],
    isPreset: true,
  },
  {
    id: 'floating-dock',
    name: 'Floating Dock / Dynamic Island',
    nameZh: '停靠栏 / 灵动岛',
    aliases: ['悬浮底栏', 'Mac Dock', '灵动岛', 'Floating Island'],
    category: 'NAVIGATION',
    summary: '脱离页面常规流、悬浮在底部或顶部的药丸/胶囊状导航容器，带光标临近放大或状态变形。',
    description: '借鉴 macOS Dock 栏与 iOS 灵动岛交互心智。通过绝对/固定定位悬浮于内容层之上，随着鼠标靠近，临近的图标依据高斯分布算法逐级放大，创造出波浪般的弹性张力；在有状态通知时，外壳可自适应横向拉伸变形成信息面板。',
    visualTraits: ['脱离文档流悬浮', '临近距离放大 (Magnification)', '药丸式圆角', '磨砂毛玻璃底板'],
    aiPromptEn: 'Mac-style floating dock component with responsive icon magnification. Glassmorphic frosted bottom container that hovers above the page. Icons scale smoothly using distance-based spring physics as cursor moves across. Responsive capsule layout.',
    aiPromptZh: '仿 macOS Dock 悬浮停靠栏：半透明磨砂玻璃卡片悬浮于屏幕底部中央，光标划过时临近图标产生高斯递增放大效果，松开时阻尼回弹，支持集成主页、搜索与快捷工具。',
    remotionSnippet: `// 光标临近放大算法核心
function DockIcon({ mouseX, icon: Icon }) {
  const ref = useRef(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 68, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 14 });
  return <motion.div ref={ref} style={{ width }} className="aspect-square rounded-2xl bg-neutral-800" />;
}`,
    mathFormula: 'scale = f(distance) = base + max_boost * exp(- (x - x0)^2 / (2 * sigma^2))',
    previewType: 'floating-dock',
    tags: ['导航', '悬浮栏', 'Dock', '灵动岛', 'Mac风格'],
    isPreset: true,
  },
  {
    id: 'rail-navigation',
    name: 'Navigation Rail',
    nameZh: '轨道导航',
    aliases: ['紧凑侧边栏', '图标侧轨', 'Mini Sidebar', 'Icon Rail'],
    category: 'NAVIGATION',
    summary: '极简的单列图标导航条，介于完整展开侧边栏与汉堡菜单之间，常用于中大屏响应式过渡。',
    description: 'Material Design 推荐的高级导航规范之一。宽度通常固定在 56px~72px 之间，仅纵向排布核心功能的精简图标与激活指示器。它在提供常驻可访问性的同时最大化释放主内容区域，并且在鼠标悬停或屏幕变宽时可平滑展开为完整侧边栏。',
    visualTraits: ['单列窄条 (56~72px)', '纯图标垂直堆叠', '激活状态胶囊高亮', '大屏响应式利器'],
    aiPromptEn: 'Minimalist Navigation Rail component. A slim vertical bar on the left edge with clean monochrome icons, tooltips on hover, and active state pill indicator. Smooth expand/collapse into full sidebar on toggle.',
    aiPromptZh: '实现一个现代极简轨道导航（Navigation Rail）：左侧固定 64px 窄轨道，垂直排布主页、探索、设置等核心图标，活动项带有胶囊高亮背景，支持悬浮展示 Tooltip 并在宽屏时平滑展开。',
    remotionSnippet: `// 极简垂直轨道导航
<nav className="fixed left-0 top-0 bottom-0 w-16 bg-neutral-950 border-r border-neutral-800 flex flex-col items-center py-6 gap-4">
  {railItems.map((item, i) => (
    <button key={i} className="relative w-10 h-10 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white">
      <item.icon className="w-5 h-5 z-10" />
      {active === i && <motion.div layoutId="rail-pill" className="absolute inset-0 bg-cyan-600/30 rounded-xl border border-cyan-500/40" />}
    </button>
  ))}
</nav>`,
    mathFormula: 'width: 64px; flex-direction: column; align-items: center;',
    previewType: 'rail-navigation',
    tags: ['导航', '侧边栏', '轨道', '响应式'],
    isPreset: true,
  },

  /* =========================================================
     2. CONTAINERS 容器类
     ========================================================= */
  {
    id: 'bottom-sheet',
    name: 'Bottom Sheet / Drawer',
    nameZh: '抽屉底板 / 抽屉面板',
    aliases: ['底部抽屉', '半屏抽屉', 'Modal Sheet', 'Action Sheet'],
    category: 'CONTAINERS',
    summary: '从屏幕底端或边缘平滑滑出的浮层面板，支持手势下拉关闭与多档位停留。',
    description: '移动端与响应式 Web 的黄金容器。从屏幕下边缘滑出，顶部常带有拖拽抓手（Grab Handle）。支持多档位停留（如展开 30% 预览、展开 90% 全览），相比居中模态弹窗更符合移动端单手操作工效学，是承载评论区、分享面板和商品规格选择的标准容器。',
    visualTraits: ['顶部居中抓手药丸条', '顶部圆角 (rounded-t-3xl)', '拖拽弹性手势', '半透明遮罩背景'],
    aiPromptEn: 'Interactive Bottom Sheet component with drag gesture. Slides up smoothly from bottom viewport with a grab handle indicator at the top. Spring damping physics on drag-to-dismiss, backdrop blur scrim overlay.',
    aiPromptZh: '实现交互式抽屉底板（Bottom Sheet）：自屏幕底部平滑滑出，顶部带药丸状拖拽抓手，支持手势下拉回弹关闭，背景带有高斯模糊遮罩，适配移动端单手交互。',
    remotionSnippet: `// Framer Motion: 手势可拖拽底板
<motion.div
  drag="y"
  dragConstraints={{ top: 0, bottom: 0 }}
  dragElastic={0.2}
  onDragEnd={(e, { offset, velocity }) => {
    if (offset.y > 100 || velocity.y > 500) onClose();
  }}
  initial={{ y: '100%' }}
  animate={{ y: 0 }}
  exit={{ y: '100%' }}
  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
  className="fixed bottom-0 inset-x-0 bg-neutral-900 rounded-t-3xl p-6 border-t border-neutral-800"
>
  <div className="w-10 h-1 bg-neutral-600 rounded-full mx-auto mb-4" />
  {children}
</motion.div>`,
    mathFormula: 'dragConstraints={{ top: 0, bottom: 0 }}; threshold: y > 100px',
    previewType: 'bottom-sheet',
    tags: ['容器', '抽屉', '底板', 'Sheet', '手势'],
    isPreset: true,
  },
  {
    id: 'accordion',
    name: 'Accordion',
    nameZh: '手风琴折叠面板',
    aliases: ['折叠菜单', '伸缩列表', 'FAQ折叠条', 'Collapse Panel'],
    category: 'CONTAINERS',
    summary: '垂直堆叠的标题列表，点击标题以平滑高度过渡展开详细内容，其它项可互斥收起。',
    description: '解决页面信息过载的经典容器。通过将次要或详细说明收纳在折叠面板内，仅露出关键提问。展开时借助 CSS Grid `grid-template-rows: 0fr -> 1fr` 或 Framer Motion 测量实际高度实现无缝流畅的展开动效，箭头图标同步 180 度翻转。',
    visualTraits: ['垂直堆叠条目', '180°旋转箭头图标', '高度自动平滑自适应', '互斥/多项展开'],
    aiPromptEn: 'Smooth Animated Accordion component. Vertical list of collapsible FAQ items. Clicking a question triggers a buttery smooth height transition from 0 to auto, with chevron rotating 180 degrees. Modern clean borders.',
    aiPromptZh: '制作现代手风琴折叠卡片（Accordion）：点击标题触发无顿挫的高度展开（0 到 auto），右侧箭头平滑旋转 180 度，内嵌内容淡入浮现，适合常见问题解答（FAQ）与复杂表单折叠。',
    remotionSnippet: `// CSS Grid 技巧实现高度 0 到 auto 的原生平滑过渡
<div className={\`grid transition-all duration-300 ease-out \${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}\`}>
  <div className="overflow-hidden">
    <div className="pt-2 text-sm text-neutral-400">{content}</div>
  </div>
</div>`,
    mathFormula: 'grid-template-rows: 0fr -> 1fr; transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    previewType: 'accordion',
    tags: ['容器', '手风琴', '折叠面板', 'FAQ'],
    isPreset: true,
  },
  {
    id: 'marquee',
    name: 'Marquee Banner',
    nameZh: '跑马灯 / 无缝滚屏',
    aliases: ['无缝轮播', '无限走马灯', 'Ticker Tape', 'Infinite Scroll Banner'],
    category: 'CONTAINERS',
    summary: '连续横向滚动的文字或品牌 Logo 阵列，首尾无缝衔接，鼠标悬停时平滑暂停。',
    description: '现代 SaaS 产品官网不可或缺的品牌信任证明容器（Social Proof）。双份或三份元素横向无限平移，当平移距离恰好等于单一容器宽度时瞬间无缝重置，悬停时设置 `animation-play-state: paused`，两侧带有线性透明蒙版产生渐隐效果。',
    visualTraits: ['横向恒速无限平移', '左右羽化边缘蒙版', '悬停暂停交互 (pause on hover)', '首尾零缝隙衔接'],
    aiPromptEn: 'Seamless infinite scrolling Marquee component for partner logos or testimonials. Continuous smooth horizontal translation loop without jitter. Faded gradient masks on left and right edges, pause on hover.',
    aiPromptZh: '实现无缝无限滚动跑马灯（Marquee）：展示品牌合作 Logo 阵列，纯 CSS 恒速横向平移，首尾无感知无缝循环，两侧有渐隐毛边蒙版，鼠标划入时优雅悬停暂停。',
    remotionSnippet: `// Tailwind + CSS 无缝跑马灯
<div className="relative overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
  <div className="flex gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
    {logos.map((logo, i) => <img key={i} src={logo} className="h-8 opacity-60 hover:opacity-100 transition" />)}
  </div>
</div>`,
    mathFormula: '@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }',
    previewType: 'marquee',
    tags: ['容器', '跑马灯', 'Marquee', 'Logo墙', '无缝轮播'],
    isPreset: true,
  },
  {
    id: 'stacked-cards',
    name: 'Stacked Cards / Swipe Deck',
    nameZh: '堆叠卡片 / 探探卡片',
    aliases: ['卡片堆', '层叠卡片', 'Card Deck', 'Swipe Cards'],
    category: 'CONTAINERS',
    summary: '多张卡片以微小的比例缩放和纵向位移层叠在一起，翻动顶层时底层自动向前递进。',
    description: '利用空间 Z 轴与 Y 轴位移表达内容优先级的容器形态。顶层卡片支持左右滑走或点击切换，滑出后下一张卡片通过缩放（scale 从 0.95 升至 1）与位移（translateY 从 16px 归零）以弹簧动画向前递进，极具手感与探索欲。',
    visualTraits: ['多层缩放与位移层叠', '手势滑出或抽换', '层级弹簧递进 (scale & y)', '3D空间景深感'],
    aiPromptEn: 'Interactive stacked cards deck component. Layered cards rendered with scale and translateY offsets. Swiping or clicking top card throws it away, while the underlying card smoothly springs forward into primary focus.',
    aiPromptZh: '制作层叠堆叠卡片（Stacked Cards）：3 张卡片以 0.95 缩放和 8px 纵向偏移向后层叠，抽换顶层卡片时，后序卡片像弹簧一样自动向前位移并放大补位，富有立体节奏。',
    remotionSnippet: `// 堆叠层级缩放与位移计算
{cards.map((card, index) => (
  <motion.div
    key={card.id}
    animate={{
      scale: 1 - index * 0.05,
      y: index * 12,
      zIndex: cards.length - index,
    }}
    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    className="absolute inset-0 rounded-2xl bg-neutral-900 border border-neutral-700 shadow-xl"
  />
))}`,
    mathFormula: 'scale = 1 - index * 0.05; y = index * 12px; zIndex = N - index;',
    previewType: 'stacked-cards',
    tags: ['容器', '堆叠卡片', 'Deck', '层级', '手势'],
    isPreset: true,
  },

  /* =========================================================
     3. CONTROLS 控件类
     ========================================================= */
  {
    id: 'chips-tags',
    name: 'Chips / Tag Tokenizer',
    nameZh: '胶囊标签 / 碎片选择器',
    aliases: ['药丸标签', '过滤器标签', 'Pill Chips', 'Tag Badges'],
    category: 'CONTROLS',
    summary: '紧凑的胶囊状交互单元，可单独包含图标、文本与关闭叉，常用于多选过滤或搜索词。',
    description: '介于按钮与文本徽标之间的交互控件。高圆角（pill），高度通常在 28px~32px。点击可切换选中态（带勾选图标弹簧弹出），在搜索输入框中可作为 Token（按退格键删除整颗标签），能有效节省屏幕横向空间并保持可触控靶心大小。',
    visualTraits: ['药丸状圆角', '内置前置图标/后置关闭叉', '点击弹出微缩放', '多选状态切换'],
    aiPromptEn: 'Interactive Chips / Tag selector component. Pill-shaped compact tags that can be toggled on/off with spring scale bounce and checkmark icon. Removable tags with trailing dismiss button.',
    aiPromptZh: '设计胶囊标签选择器（Chips）：紧凑的药丸圆角外观，支持点击切换选中状态，选中时弹出小勾图标并附带微缩放动画，支持多条件筛选过滤。',
    remotionSnippet: `// 胶囊标签选择器
<button
  onClick={onToggle}
  className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all \${
    selected ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20 scale-105' : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
  }\`}
>
  {selected && <Check className="w-3 h-3 stroke-[3]" />}
  <span>{label}</span>
</button>`,
    mathFormula: 'rounded-full; height: 32px; active: scale(0.95);',
    previewType: 'chips-tags',
    tags: ['控件', '胶囊标签', 'Chips', '多选', '过滤器'],
    isPreset: true,
  },
  {
    id: 'fab-button',
    name: 'Floating Action Button (FAB)',
    nameZh: '悬浮动作按钮',
    aliases: ['悬浮加号钮', 'Speed Dial', 'Material FAB'],
    category: 'CONTROLS',
    summary: '悬浮在界面固定角落的高层级主行动按钮，点击可弹出扇形或垂直展开的快捷操作子菜单。',
    description: 'Material Design 代表性控件。通常固定在屏幕右下角（如距边缘 24px），直径 56px 的大圆形。常用于“新建笔记”、“发布帖子”等全局唯一核心操作。点击时图标常由“+”旋转 45 度变为“×”，并弹出 Speed Dial 速度拨号子动作菜单。',
    visualTraits: ['屏幕右下角绝对悬浮', '大圆形或胶囊膨胀', '点击图标 45° 旋转', '弹出子操作清单 (Speed Dial)'],
    aiPromptEn: 'Material Design Floating Action Button (FAB) with Speed Dial. Circular high-elevation button anchored at bottom-right corner. Clicking triggers plus icon rotating 45deg into close icon and reveals child action items.',
    aiPromptZh: '实现右下角悬浮动作按钮（FAB）：常驻圆形高层级阴影，点击后“+”号旋转 45 度变成关闭按钮，上方展开快捷创建子菜单，支持高亮气泡。',
    remotionSnippet: `// FAB 悬浮按钮 + 旋转图标
<button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-xl shadow-emerald-500/30">
  <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
    <Plus className="w-7 h-7" />
  </motion.div>
</button>`,
    mathFormula: 'position: fixed; bottom: 24px; right: 24px; border-radius: 50%; z-index: 50;',
    previewType: 'fab-button',
    tags: ['控件', 'FAB', '悬浮按钮', 'Speed Dial'],
    isPreset: true,
  },
  {
    id: 'stepper',
    name: 'Stepper / Step Input',
    nameZh: '步进器 / 数量调节器',
    aliases: ['加减计数器', '数量微调钮', 'Number Stepper'],
    category: 'CONTROLS',
    summary: '带有加减双按钮与中间数值显示的紧凑输入控件，支持长按连击与边界弹性反馈。',
    description: '用于在有限或步长固定的数值范围内微调（如商品购买数量、缩放倍率）。加减按钮在达到最小值（如 0 或 1）时自动变为禁用置灰态，数值变动时中间数字带有垂直滚翻或微跳动弹性动画。',
    visualTraits: ['减号 - 数字 - 加号 三段结构', '边界值置灰禁用', '数字滚动/跳跃刷新', '紧凑胶囊或方圆角'],
    aiPromptEn: 'Compact Stepper component with minus and plus buttons. Animated number flip/bounce when value changes. Disabled styling on lower/upper limits, smooth tactile tap feedback.',
    aiPromptZh: '制作数量调节步进器（Stepper）：加减两端与中间数字构成紧凑一体化药丸外壳，点击增减时数值带有垂直轻微弹跳动效，达到最小限制时按键自动置灰禁用。',
    remotionSnippet: `// 步进器核心结构
<div className="flex items-center p-1 rounded-2xl bg-neutral-900 border border-neutral-800">
  <button onClick={decrement} className="w-8 h-8 rounded-xl bg-neutral-800 flex items-center justify-center">-</button>
  <motion.span key={count} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-10 text-center font-mono font-bold text-emerald-400">
    {count}
  </motion.span>
  <button onClick={increment} className="w-8 h-8 rounded-xl bg-neutral-800 flex items-center justify-center">+</button>
</div>`,
    mathFormula: 'value = clamp(value + step, min, max);',
    previewType: 'stepper',
    tags: ['控件', '步进器', 'Stepper', '计数器'],
    isPreset: true,
  },
  {
    id: 'ghost-button',
    name: 'Ghost Button / Outline Button',
    nameZh: '幽灵按钮 / 线框空心钮',
    aliases: ['线框按钮', '透明按钮', '空心按钮'],
    category: 'CONTROLS',
    summary: '仅保留细描边与纯文本、背景完全透明的次级按钮，悬停时底色淡入填充。',
    description: '网页设计中的经典副操作按钮。它没有实心彩色填充，能完美融入任何复杂摄影背景或极简暗黑界面而不抢主按钮的视觉焦点。悬停时，边框颜色加深、微弱背景色逐渐充盈，传达优雅克制的交互美学。',
    visualTraits: ['1px 高精度描边', '完全透明底色', '悬停底色柔和淡入', '不抢夺主行动点（CTA）'],
    aiPromptEn: 'Minimalist Ghost button with thin crisp border, transparent background, and mono typography. Subtle hover effect that softly fades in a translucent tint and brightens the border contour.',
    aiPromptZh: '设计现代暗黑幽灵按钮（Ghost Button）：纯透明背景搭配精致发光边框，字体轻微加粗，鼠标悬停时边框高亮并渗入微弱半透明底色，优雅克制。',
    remotionSnippet: `// 幽灵按钮
<button className="px-5 py-2.5 rounded-xl border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 text-xs font-mono font-bold tracking-wider transition-all duration-300">
  EXPLORE MORE ➔
</button>`,
    mathFormula: 'background: transparent; border: 1px solid currentColor; transition: 300ms ease;',
    previewType: 'ghost-button',
    tags: ['控件', '幽灵按钮', 'Ghost Button', '极简'],
    isPreset: true,
  },

  /* =========================================================
     4. FEEDBACK 提示类
     ========================================================= */
  {
    id: 'toast-snackbar',
    name: 'Toast / Snackbar',
    nameZh: '吐司提示 / 浮动轻提示',
    aliases: ['轻提示', '气泡通知', '浮动黑条', 'Heads-up Notification'],
    category: 'FEEDBACK',
    summary: '在屏幕边缘或中央浮现的非阻塞式轻量消息条，展示简短操作反馈，数秒后自动淡出消失。',
    description: '前端最常用的异步状态通知容器。像烤面包机里弹出的吐司一样浮现。不会打断用户当前的浏览路径（无需手动点击确认），包含简短状态文案与可选动作按钮（如“撤销”），支持多条依次堆叠与滑动清除。',
    visualTraits: ['非阻塞浮层', '自动延时自毁（2~4秒）', '多条堆叠上浮', '操作撤销按钮'],
    aiPromptEn: 'Floating Toast notification / Snackbar component. Non-intrusive alert pill sliding in from top-right or bottom-center. Includes icon, status message, and auto-dismiss progress bar. Stackable animations.',
    aiPromptZh: '实现极简暗黑吐司提示（Toast）：操作成功后自屏幕下边缘平滑浮出，带对勾图标与简明状态文字，3 秒后平滑下坠淡出，支持多条通知堆叠避让。',
    remotionSnippet: `// Sonner / Framer Motion 风格 Toast 浮层
<motion.div
  initial={{ opacity: 0, y: 16, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 10, scale: 0.9 }}
  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 shadow-2xl text-xs text-white"
>
  <CheckCircle className="w-4 h-4 text-emerald-400" />
  <span>修改已实时同步至云端</span>
</motion.div>`,
    mathFormula: 'duration: 3000ms; auto-dismiss; z-index: 1000;',
    previewType: 'toast-preview',
    tags: ['提示', '吐司', 'Toast', 'Snackbar', '通知'],
    isPreset: true,
  },
  {
    id: 'popover-tooltip',
    name: 'Popover / Floating Card',
    nameZh: '气泡卡片 / 浮层提示',
    aliases: ['气泡弹窗', '富文本浮层', '悬浮提示卡', 'Flyout'],
    category: 'FEEDBACK',
    summary: '由锚点元素触发的带小三角指向的气泡面板，支持内嵌表单、列表或复合快捷操作。',
    description: '比纯文本 Tooltip 更强大，比全屏 Modal 更轻量。附着在特定按钮或图标附近，由 Floating UI 或 Popper 计算最佳防溢出碰撞位置，常用于日期选择器、快捷筛选菜单或用户头像名片卡。',
    visualTraits: ['附着于触发锚点', '小三角防碰撞计算', '支持复杂内嵌表单', '点击外部区域自动关闭'],
    aiPromptEn: 'Interactive Popover component with positioning engine. Floats next to trigger button with anchor arrow. Supports nested rich content like mini-forms and action menus. Dismiss on click outside.',
    aiPromptZh: '制作自适应锚点气泡卡片（Popover）：点击按钮后在正下方浮起圆角卡片，带小尖角指向触发源，点击卡片外部自动收起，内嵌快捷设置选项。',
    remotionSnippet: `// 气泡卡片与绝对定位
<div className="relative">
  <button onClick={() => setOpen(!open)}>选项</button>
  {open && (
    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 p-3 rounded-xl bg-neutral-900 border border-neutral-700 shadow-xl z-50">
      <div className="text-xs font-bold text-white mb-1">Popover Header</div>
      <p className="text-[11px] text-neutral-400">支持内嵌复杂可交互控件。</p>
    </div>
  )}
</div>`,
    mathFormula: 'computePosition(trigger, popover, { placement: "bottom", middleware: [flip(), shift()] })',
    previewType: 'popover-preview',
    tags: ['提示', '气泡卡', 'Popover', '浮层'],
    isPreset: true,
  },
  {
    id: 'status-badge',
    name: 'Status Badge / Pill Dot',
    nameZh: '状态徽标 / 呼吸角标',
    aliases: ['小红点', '数字角标', '呼吸状态点', 'Notification Dot'],
    category: 'FEEDBACK',
    summary: '附着在头像或图标右上角的高饱和微型指示器，常带有脉冲呼吸光晕以提示未读或在线状态。',
    description: '以极小像素占用传达关键状态信息的元件。包括绿色的在线状态指示灯（带 CSS `animate-ping` 呼吸扩散圈）、红色的未读消息计数胶囊（9+ 气泡），有效唤醒用户视觉警觉。',
    visualTraits: ['超微小尺寸 (8px~18px)', '高对比纯色 (绿/红/蓝)', 'CSS Ping 脉冲光圈', '锚定在父元素右上角'],
    aiPromptEn: 'Pulsing Status Badge dot on avatar. Tiny circular indicator pinned to the top-right corner with a continuous ping ripple animation indicating live online presence. Crisp border outline to separate from background.',
    aiPromptZh: '设计头像右上角呼吸状态指示点（Status Badge）：高亮翡翠绿圆点，周围伴随扩散淡出的动态脉冲光圈（animate-ping），清晰传达实时在线或未读状态。',
    remotionSnippet: `// 状态呼吸指示灯
<span className="relative flex h-3 w-3">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-neutral-950" />
</span>`,
    mathFormula: '@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }',
    previewType: 'status-badge',
    tags: ['提示', '徽标', '小红点', 'Badge', '呼吸点'],
    isPreset: true,
  },

  /* =========================================================
     5. LOADING 等待类
     ========================================================= */
  {
    id: 'skeleton-shimmer',
    name: 'Skeleton Shimmer',
    nameZh: '骨架微光 / 骨架屏扫光',
    aliases: ['骨架屏', '灰色占位扫光', 'Shimmer Screen', 'Ghost Wireframe'],
    category: 'LOADING',
    summary: '模拟真实页面卡片布局的低保真色块，上方带有 45 度角线性渐变高光反复匀速扫过。',
    description: '现代首屏加载的标准解法。相比传统转圈圈 Spinner，骨架屏提前绘制出文字行、头像与按钮的几何轮廓，避免用户感知到漫长的“空白阶段”；45 度半透明微光（Shimmer）匀速横扫，传递“系统正在全力装载”的心理慰藉。',
    visualTraits: ['低保真灰色矩形块', '45° 线性渐变扫光', '无限循环恒速平移', '与真实布局 1:1 吻合'],
    aiPromptEn: 'Skeleton screen shimmer loader. Wireframe placeholders for avatar, title, and paragraph lines using dark grey rounded blocks. A continuous semi-transparent diagonal highlight sweeps across the blocks to show active loading.',
    aiPromptZh: '实现骨架屏微光扫光动画（Skeleton Shimmer）：模拟头像与文本段落的深灰底色块，一道倾斜 45 度的半透明微光从左至右无限循环划过，维持排版稳定并消除用户等待焦虑。',
    remotionSnippet: `// Tailwind CSS 实现骨架屏微光扫过
<div className="relative overflow-hidden bg-neutral-800 rounded-lg h-4 w-48">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
</div>`,
    mathFormula: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); translate: -100% -> 100%',
    previewType: 'skeleton-shimmer',
    tags: ['等待', '骨架屏', 'Skeleton', 'Shimmer', '加载中'],
    isPreset: true,
  },
  {
    id: 'blur-up-placeholder',
    name: 'Blur-up / Progressive Placeholder',
    nameZh: '渐进模糊占位 / 毛玻璃过渡',
    aliases: ['毛玻璃加载', '先糊后清', 'LQIP', 'Low-Quality Image Placeholder'],
    category: 'LOADING',
    summary: '图片未加载完成前先渲染微小尺寸的低保真色块并进行高斯模糊，资源就绪后平滑交叉淡入。',
    description: 'Next.js Image 与各大高画质媒体平台的核心标准。在高清大图下载完毕前，先用仅几百字节的 Base64 极小缩略图（LQIP）结合 CSS `blur(20px)` 撑开容器，高保真大图加载完成后通过 CSS 渐变平滑变清晰，杜绝图片撑开瞬间的页面跳动（CLS）。',
    visualTraits: ['先模糊再变清晰', '低尺寸 Base64 占位', '零累积布局偏移 (Zero CLS)', '交叉淡入平滑切换'],
    aiPromptEn: 'Progressive image loading with blur-up effect (LQIP). Initial low-resolution thumbnail rendered with heavy gaussian blur, smoothly transitioning to crisp high-definition image upon load with a fade cross-dissolve.',
    aiPromptZh: '实现渐进式模糊占位（Blur-up / LQIP）：图片初始阶段展示高斯模糊的低像素占位色块，待真实高清大图下载完成后平滑过渡为高清状态，界面不产生任何布局跳动。',
    remotionSnippet: `// Next.js 风格渐进模糊过渡
<div className="relative overflow-hidden rounded-2xl">
  <img
    src={imgSrc}
    onLoad={() => setLoaded(true)}
    className={\`transition-all duration-700 \${loaded ? 'blur-0 scale-100' : 'blur-xl scale-110'}\`}
  />
</div>`,
    mathFormula: 'filter: blur(20px) -> blur(0px); scale: 1.1 -> 1.0; duration: 700ms;',
    previewType: 'blur-up',
    tags: ['等待', '模糊占位', 'LQIP', 'Blur-up', '图片加载'],
    isPreset: true,
  },
  {
    id: 'typing-wave-dots',
    name: 'Typing Wave Dots / Bouncing Loader',
    nameZh: '波浪跳动点 / AI 打字等待点',
    aliases: ['三点跳动', 'AI打字等待', '波浪加载', 'Bouncing Dots'],
    category: 'LOADING',
    summary: '三个并排的实心小圆点按正弦相位差依次做垂直弹跳运动，直观传达“系统正在输入/思考中”。',
    description: '聊天界面与 AI 问答产品最普遍的等待动效。通过为三个 6px~8px 的小实心圆点注入约 0.15s~0.2s 的动画延迟（Animation Delay），小球此起彼伏做波浪式垂直轻微弹跳，节奏轻柔，极具陪伴感与呼吸感。',
    visualTraits: ['三圆点并排', '交错动画延时 (Stagger Delay)', '正弦波浪式起伏', '紧凑不占空间'],
    aiPromptEn: 'Three bouncing wave dots loading indicator for chat interfaces. Three small aligned circles animate vertically in sequence with staggered delay, creating a smooth sinusoidal wave motion to indicate typing or thinking.',
    aiPromptZh: '制作聊天室 AI 思考波浪跳动点（Typing Wave Dots）：三个小圆球按顺序错开 0.2 秒做纵向波浪轻微跳跃，形象传达系统正在打字与处理中，体积紧凑不突兀。',
    remotionSnippet: `// React + Framer Motion 三点波浪跳动
<div className="flex items-center gap-1.5 p-3 rounded-2xl bg-neutral-900 w-fit">
  {[0, 1, 2].map((i) => (
    <motion.div
      key={i}
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.18, ease: 'easeInOut' }}
      className="w-2 h-2 rounded-full bg-rose-500"
    />
  ))}
</div>`,
    mathFormula: 'y_i(t) = amplitude * sin(omega * t + i * phaseDelta)',
    previewType: 'typing-dots',
    tags: ['等待', '打字中', '三点跳动', 'Bouncing Dots', 'AI等待'],
    isPreset: true,
  },
  {
    id: 'optimistic-ghost',
    name: 'Optimistic UI / Ghost Item',
    nameZh: '乐观更新幽灵态',
    aliases: ['先行占位', '幽灵数据', '假更新', 'Optimistic State'],
    category: 'LOADING',
    summary: '在向服务器发出请求的第 0 毫秒，界面直接假定成功并半透明插入一条临时数据，异步失败时再优雅回滚。',
    description: '极速前端交互的最高境界。用户点击点赞、发送评论或修改标题时，不等后端接口响应（跳过等待状态），直接以 0ms 延迟在前端渲染结果（可标记半透明幽灵状态或小加载图标）；后端返回成功后悄悄替换为真实数据，失败时弹出 Toast 恢复原状。',
    visualTraits: ['0ms 即时反馈', '半透明幽灵占位态', '后台异步校对', '优雅自动回滚机制'],
    aiPromptEn: 'Optimistic UI pattern implementation in React. When user submits a comment, it renders instantly with a subtle pending ghost badge before server confirmation. Graceful rollback if mutation fails.',
    aiPromptZh: '设计乐观更新幽灵态（Optimistic UI）：提交数据瞬间前端直接将新条目插入列表，带有半透明幽灵标记，无需等待网络请求返回即给用户即时成就感，网络失败时再优雅撤销。',
    remotionSnippet: `// React 19 useOptimistic 风格模式
const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos, (state, newTodo) => [
  ...state,
  { ...newTodo, pending: true },
]);`,
    mathFormula: 'UI_render = OptimisticState(Action) before ServerAck;',
    previewType: 'optimistic-ghost',
    tags: ['等待', '乐观更新', 'Optimistic', '幽灵态', '零延迟'],
    isPreset: true,
  },

  /* =========================================================
     6. MOTION 动效类
     ========================================================= */
  {
    id: 'spring-overshoot',
    name: 'Spring Overshoot / Elastic Bounce',
    nameZh: '弹性回弹 / 弹簧过冲',
    aliases: ['果冻回弹', '弹簧减震', '冲出回摆', 'Back Easing'],
    category: 'MOTION',
    summary: '运动物体以极高加速度冲向目标，轻微越过终点阈值后在阻尼力作用下优雅回弹稳定。',
    description: '消除机械死板线性动画的法宝。源自真实弹簧阻尼物理（Spring Physics）。运动物体不是突然急刹车在终点，而是利用惯性冲过终点 10%~15%（Overshoot），随后被弹力拉回并小幅震荡衰减归零，赋予界面生命力。',
    visualTraits: ['突破终点过冲 (10%~15%)', '物理阻尼衰减震荡', '高刚度与迅猛爆发', '符合真实世界惯性'],
    aiPromptEn: 'Organic spring motion with elastic overshoot physics. A UI card rapidly glides into place, exceeding its final position slightly before settling back into resting position with authentic spring damping.',
    aiPromptZh: '制作带弹簧过冲的有机动效（Spring Overshoot）：元素高速滑入目标位置，超过终点约 15% 后受弹性阻尼拉回定格，具备弹簧与果冻般的鲜活感，动作干净不拖泥带水。',
    remotionSnippet: `// Framer Motion 真实弹簧参数配方
<motion.div
  initial={{ scale: 0.8, y: 30 }}
  animate={{ scale: 1, y: 0 }}
  transition={{
    type: 'spring',
    stiffness: 380, // 刚度越大弹力越迅猛
    damping: 24,    // 阻尼适中产生轻快回弹
    mass: 0.8,
  }}
/>`,
    mathFormula: 'f(t) = 1 - e^(-zeta * omega_n * t) * cos(omega_d * t)',
    previewType: 'spring-overshoot',
    tags: ['动效', '弹簧', '回弹', 'Spring', '物理'],
    isPreset: true,
  },
  {
    id: 'magnetic-cursor',
    name: 'Magnetic Cursor / Attraction',
    nameZh: '磁吸附光标 / 引力吸附',
    aliases: ['磁性按钮', '引力吸附', 'Magnetic Pull', 'Gravitational Field'],
    category: 'MOTION',
    summary: '当鼠标指针靠近可交互元素半径范围内时，元素主体沿向量方向主动向光标位移倾斜。',
    description: '高定品牌网站常用的交互点睛手法。在按钮周围建立无形的引力场，当光标进入捕获半径（如 80px）时，计算光标与按钮中心的偏移向量并乘以衰减系数（0.3~0.4），让按钮主动“粘”在鼠标上，移出时弹簧归位，大幅提升可点击意图反馈。',
    visualTraits: ['引力捕获半径', '平滑向量位移跟随', '光标离开后弹簧归位', '提升点击欲望'],
    aiPromptEn: 'Magnetic attraction effect on cursor hover. The button smoothly tracks mouse position within an active radius, leaning towards the cursor using spring physics, and snaps back to center on mouse leave.',
    aiPromptZh: '实现磁性吸附光标按钮（Magnetic Button）：当鼠标在按钮周围 80px 范围移动时，按钮主体主动朝光标方向位移贴合，离开后柔和弹回原位，赋予按钮引力触觉。',
    remotionSnippet: `// 磁吸附计算
const handleMouseMove = (e) => {
  const { left, top, width, height } = ref.current.getBoundingClientRect();
  const x = (e.clientX - (left + width / 2)) * 0.35;
  const y = (e.clientY - (top + height / 2)) * 0.35;
  setPosition({ x, y });
};`,
    mathFormula: 'offset_x = (mouse_x - center_x) * factor; spring_restore(0, 0);',
    previewType: 'magnetic-pull',
    tags: ['动效', '磁吸附', 'Magnetic', '光标交互', '高级微动效'],
    isPreset: true,
  },
  {
    id: 'shared-element',
    name: 'Shared Element / Hero Transition',
    nameZh: '共享元素转场 / 魔法移动',
    aliases: ['无缝放大', 'Hero Animation', 'View Transitions', '魔法移动'],
    category: 'MOTION',
    summary: '同一视觉元素（如商品图片）在两个页面或视图切换时，尺寸与位置保持空间连续变形放大。',
    description: '被称为“消除页面跳跃感”的终极转场手段。现代浏览器通过 View Transitions API 或 Framer Motion `layoutId` 原生支持。用户在列表页点击小图，小图不是瞬间消失再在新页面出现，而是无缝连续地在屏幕上飞向并扩大为详情页大图，维持心智锚点。',
    visualTraits: ['同一对象跨视图连续形变', '位置与尺寸连续插值', '保留用户视觉焦点', '无卡顿无白屏'],
    aiPromptEn: 'Shared Element transition (Hero animation) between list view and detail card. The thumbnail smoothly morphs its position and dimensions into the full-size banner using View Transitions API or Framer Motion layoutId.',
    aiPromptZh: '实现共享元素转场（Hero Transition）：列表中的缩略图在被点击后，不刷新页面，而是以丝滑的弹簧插值直接在视图内放大并无缝移动为详情页主视觉，视觉焦点连贯不断裂。',
    remotionSnippet: `// Framer Motion layoutId 实现跨组件共享元素
// 列表项：
<motion.img layoutId={\`image-\${item.id}\`} src={item.src} className="w-20 h-20 rounded-xl" />
// 展开详情页：
<motion.img layoutId={\`image-\${item.id}\`} src={item.src} className="w-full h-80 rounded-3xl" />`,
    mathFormula: 'document.startViewTransition() / FLIP (First, Last, Invert, Play)',
    previewType: 'shared-element',
    tags: ['动效', '共享元素', 'View Transitions', 'Hero', '转场'],
    isPreset: true,
  },

  /* =========================================================
     7. AESTHETICS 材质类
     ========================================================= */
  {
    id: 'glassmorphism',
    name: 'Glassmorphism / Frosted Glass',
    nameZh: '毛玻璃拟态 / 磨砂玻璃',
    aliases: ['磨砂玻璃', '半透明高斯模糊', 'Apple Glass', 'Acrylic Blur'],
    category: 'AESTHETICS',
    summary: '结合 backdrop-filter: blur()、半透明高亮细边框与柔和微光的拟真磨砂玻璃质感。',
    description: '苹果 macOS Big Sur 与 iOS 系统引领的现代高质感材质。核心由三要素组成：1. `backdrop-filter: blur(12px~24px)` 磨砂模糊；2. 低透明度白色背景（如 `rgba(255,255,255,0.08)`）；3. 半透明的高亮 1px 外边框，精准还原玻璃边缘的折射光线。',
    visualTraits: ['背衬背景高斯模糊', '半透明微光边框', '多层景深透光感', '现代轻盈高级感'],
    aiPromptEn: 'Premium Glassmorphism frosted glass card. Translucent milky background with backdrop-filter blur, subtle 1px luminous semi-transparent border, soft ambient drop shadow, and floating glowing color spheres behind.',
    aiPromptZh: '设计苹果级暗黑毛玻璃卡片（Glassmorphism）：半透明黑色背景搭配 backdrop-filter 高斯磨砂模糊，外加 1px 半透明亮白边缘描边，背面衬托柔和彩色光晕，质感通透高级。',
    remotionSnippet: `// Tailwind CSS 毛玻璃卡片配方
<div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
  <h4 className="text-white font-bold">Glassmorphism Surface</h4>
</div>`,
    mathFormula: 'background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.15);',
    previewType: 'glassmorphism',
    tags: ['材质', '毛玻璃', 'Glassmorphism', '苹果风', '磨砂'],
    isPreset: true,
  },
  {
    id: 'border-beam',
    name: 'Border Beam / Border Glow',
    nameZh: '流光描边 / 边框极光',
    aliases: ['跑马灯边框', '极光描边', '发光流动框', 'Animated Border'],
    category: 'AESTHETICS',
    summary: '卡片外边缘有一条高亮光锥沿圆角轮廓无限匀速流动环绕，赋予卡片科技感与未来感。',
    description: 'AI 与 Web3 官网高转化率卡片的标配视觉。通过在卡片外层包裹一层带有角向渐变（Conic Gradient）或旋转射线的高光层，并在最外层使用微小内边距（padding: 1px）配合圆角裁切，使得一道高光如同极光般在边框上持续漫游。',
    visualTraits: ['角向渐变 (Conic Gradient)', '沿外轮廓无限公转', '卡片边缘微弱辉光', '强科技感与吸睛度'],
    aiPromptEn: 'Futuristic Border Beam card component. A sleek rounded dark card where an electric luminous light beam continuously glides around the border contour using conic-gradient rotation. Premium tech aesthetic.',
    aiPromptZh: '制作流光描边科技卡片（Border Beam）：暗黑背景卡片四周，一道高饱和琥珀金色的极光流线沿圆角边框平滑环绕流动，科技感十足，极其适合作为重点功能推荐卡片。',
    remotionSnippet: `// Tailwind + CSS Conic Gradient 极光流动边框
<div className="relative p-[1px] rounded-2xl overflow-hidden">
  <div className="absolute -inset-full bg-[conic-gradient(from_0deg,transparent_0_340deg,#f59e0b_360deg)] animate-spin" style={{ animationDuration: '4s' }} />
  <div className="relative bg-neutral-950 rounded-2xl p-6">
    <span className="text-white font-bold">Border Beam Card</span>
  </div>
</div>`,
    mathFormula: 'background: conic-gradient(from 0deg, transparent 0 340deg, #accent 360deg); animation: spin 4s linear infinite;',
    previewType: 'border-beam',
    tags: ['材质', '流光描边', 'Border Beam', '科技风', '发光卡片'],
    isPreset: true,
  },
  {
    id: 'spotlight-glow',
    name: 'Spotlight Hover Glow / Radial Flashlight',
    nameZh: '聚光灯跟随微光 / 卡片手电筒光斑',
    aliases: ['聚光灯跟随', '卡片光标高光', 'Radial Glow', 'Spotlight Card', '手电筒效果'],
    category: 'AESTHETICS',
    summary: '随着鼠标指针在卡片内滑动，一层柔和的径向彩色渐变光斑在背后实时贴合漫游照亮。',
    description: '现代极客 SaaS（如 Linear、Vercel）产品卡片的标志材质交互。通过监听鼠标在元素内的相对坐标（e.clientX - rect.left, e.clientY - rect.top），动态更新背景 radial-gradient 的圆心坐标。卡片未悬停时幽暗深邃，光标移入时如手电筒聚光灯般照亮卡片内部纹理与微妙暗边框，极富触觉深度。',
    visualTraits: ['光标坐标实时绑定', '径向弥散渐变 (radial-gradient)', '照亮暗部纹理与精细边框', '灵动高质感'],
    aiPromptEn: 'Interactive Spotlight Hover card with cursor-tracking radial flashlight glow. As mouse moves over the card, calculate relative coordinates to dynamically update a radial-gradient(300px circle at mouse_x mouse_y, rgba(amber, 0.15), transparent 80%) overlay. Sleek modern developer tooling aesthetic.',
    aiPromptZh: '实现卡片聚光灯微光漫游（Spotlight Glow）：监听鼠标在暗色卡片内的相对移动，动态计算并在背景渲染一个以光标为中心的径向发光光斑（radial-gradient），宛如手电筒照亮卡片表面与精细边线。',
    remotionSnippet: `// React + Tailwind 动态聚光灯光斑
const [pos, setPos] = useState({ x: 0, y: 0 });
const handleMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
};

<div onMouseMove={handleMove} className="relative rounded-2xl bg-neutral-900 border border-neutral-800 p-6 overflow-hidden">
  <div
    className="pointer-events-none absolute -inset-px transition duration-300"
    style={{
      background: \`radial-gradient(300px circle at \${pos.x}px \${pos.y}px, rgba(245, 158, 11, 0.15), transparent 80%)\`,
    }}
  />
  <h3 className="relative z-10 text-white font-bold">Spotlight Surface</h3>
</div>`,
    mathFormula: 'radial-gradient(300px circle at ${mouse_x}px ${mouse_y}px, rgba(amber, 0.15), transparent 80%)',
    previewType: 'spotlight-glow',
    tags: ['材质', '聚光灯', 'Spotlight', '光标跟随', '高光漫游'],
    isPreset: true,
  },

  /* =========================================================
     8. BANNER 横幅类
     ========================================================= */
  {
    id: 'announcement-bar',
    name: 'Announcement Bar / Top Ribbon',
    nameZh: '通告条 / 顶部公告横幅',
    aliases: ['顶部通告', '通知带', '通告栏', 'Top Ribbon', 'Notice Bar'],
    category: 'BANNER',
    summary: '固定在页面最顶端的高优先级通知横幅，常用于版本更新、活动通告或维护预警。',
    description: '现代 Web 产品最高频的轻量级公告模式。位于整个页面所有内容之上，通常由左侧的胶囊徽标（如“NEW”、“SALE”）、中间简短说明与超链接、以及右侧可关闭的叉号（Dismiss）组成。点击关闭时向上滑动折叠，支持将已关闭状态持久化至 Cookie 或本地。',
    visualTraits: ['页面最顶部通栏置顶', '内置彩色微型胶囊 Badge', '平滑折叠收起动效', '右侧关闭叉号'],
    aiPromptEn: 'Modern sticky top announcement bar component. Slim horizontal ribbon anchored at the very top of the page. Features a bright capsule badge (NEW / SALE), announcement copy with hover link, and an interactive dismiss button that smoothly collapses the bar height to 0.',
    aiPromptZh: '实现现代置顶通告横幅（Announcement Bar）：位于页面最上方，内置高亮胶囊状态标签（如 NEW）和通告文案，右侧提供关闭按钮，点击后带有平滑的高度折叠收起动画。',
    remotionSnippet: `// React + Tailwind: 顶部通告条
export function AnnouncementBar({ text, badge = "NEW", onClose }) {
  return (
    <div className="w-full bg-gradient-to-r from-sky-950 via-blue-900 to-sky-950 border-b border-sky-500/30 px-4 py-2 flex items-center justify-between text-xs text-sky-200">
      <div className="flex items-center gap-2 mx-auto">
        <span className="px-2 py-0.5 rounded-full bg-sky-500 text-neutral-950 font-bold text-[10px]">{badge}</span>
        <span>{text}</span>
      </div>
      <button onClick={onClose} className="text-sky-400 hover:text-white transition">✕</button>
    </div>
  );
}`,
    mathFormula: 'height: auto; transition: max-height 300ms ease, opacity 200ms ease;',
    previewType: 'announcement-bar',
    tags: ['横幅', '通告条', 'Announcement', '顶部横幅', 'Notice Bar'],
    isPreset: true,
  },
  {
    id: 'hero-banner',
    name: 'Hero Banner / Billboard',
    nameZh: '首屏大通栏 / 英雄横幅',
    aliases: ['首屏大图', '主视觉海报', 'Hero Section', 'Billboard Banner'],
    category: 'BANNER',
    summary: '决定网站第一印象的首屏全宽主横幅，汇聚强视觉冲击力的大标题、发光渐变背景与主行动点。',
    description: '数字营销与 SaaS 网站最重要的核心门面。占据首屏主要视口，融合巨幅现代字体排印（Hero Typography）、径向发光辉光（Radial Mesh Glow）、核心利益点以及醒目的 CTA（Call to Action）主行动按钮，是引导转化和确立品牌视觉基调的关键载体。',
    visualTraits: ['全宽超大视口占比', '巨幅加粗标题排版', '径向流动发光底色', '高对比 CTA 主行动按钮'],
    aiPromptEn: 'High-converting SaaS Hero Banner component. Prominent full-width billboard with bold modern sans-serif typography, subtle ambient radial gradient glow in the backdrop, sub-headline, and an elevated primary CTA button with hover bounce.',
    aiPromptZh: '设计现代 SaaS 首屏大通栏横幅（Hero Banner）：全宽居中布局，带有梦幻的深空蓝色径向极光背景，巨幅粗体主标题搭配渐变文字高光，配以引人注目的主行动按钮与微光悬浮反馈。',
    remotionSnippet: `// 首屏 Hero Banner 核心排版
<div className="relative w-full py-20 px-6 text-center overflow-hidden bg-neutral-950">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.2),transparent_70%)] pointer-events-none" />
  <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
    Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Design System</span>
  </h1>
  <p className="text-neutral-400 max-w-xl mx-auto mb-8 text-sm">极致打磨每一个交互细节与动效节奏。</p>
  <button className="px-6 py-3 rounded-full bg-sky-500 text-black font-bold text-sm shadow-lg shadow-sky-500/25 hover:scale-105 transition">
    立即开始 ➔
  </button>
</div>`,
    mathFormula: 'radial-gradient(ellipse at center top, rgba(sky, 0.25) 0%, transparent 70%)',
    previewType: 'hero-banner',
    tags: ['横幅', 'Hero Banner', '首屏通栏', 'Billboard', 'CTA'],
    isPreset: true,
  },
  {
    id: 'carousel-banner',
    name: 'Carousel Banner / Slider',
    nameZh: '轮播横幅 / 焦点画廊',
    aliases: ['轮播图', '跑马切换图', 'Slider Banner', 'Swiper'],
    category: 'BANNER',
    summary: '多张运营海报以定时自动或手势滑动的方式水平轮流展示，底部配有小药丸指示器。',
    description: '电商、媒体和内容平台最经典的运营横幅形态。支持触控手势滑动（Touch Swipe）、左右悬浮翻页箭头和自动轮播巡航。底部配有代表页码的药丸状分页指示条（Pill Pagination Dots），活动指示条支持宽度拉伸弹性变形。',
    visualTraits: ['水平平滑平移滑动', '药丸形活动分页指示器', '支持悬停暂停 (Pause on Hover)', '左右半透明翻页切钮'],
    aiPromptEn: 'Interactive Carousel Banner component with smooth slide transitions. Displays multiple operational slides with swipe gesture support, auto-play interval with pause-on-hover, and animated capsule dot pagination indicators.',
    aiPromptZh: '实现交互式轮播横幅（Carousel Banner）：多张运营横幅按 3 秒间隔自动水平平滑轮换，鼠标悬停时暂停，底部带有动态伸缩的胶囊小圆点指示当前序号，支持手动点击切换。',
    remotionSnippet: `// Framer Motion: 轮播横幅切换
<AnimatePresence mode="wait">
  <motion.div
    key={currentIndex}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.3 }}
    className="w-full h-48 rounded-2xl bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-center"
  >
    {slides[currentIndex].content}
  </motion.div>
</AnimatePresence>`,
    mathFormula: 'slide_index = (current + 1) % total_slides; transition: 300ms ease-out;',
    previewType: 'carousel-banner',
    tags: ['横幅', '轮播', 'Carousel', 'Slider', '焦点图'],
    isPreset: true,
  },
  {
    id: 'corner-ribbon',
    name: 'Corner Ribbon / Angled Banner',
    nameZh: '倾斜角标彩带 / 折角横幅',
    aliases: ['斜角彩带', '右上角标签', 'Ribbon Badge', 'Corner Sash'],
    category: 'BANNER',
    summary: '旋转 45 度覆盖在卡片或首屏右上角的对角色彩带，用于突出限时、HOT 或 PRO 特权。',
    description: '高转化率的经典促销视觉构件。利用父容器的 `overflow-hidden`，在右上角放置一个绝对定位并施加 `rotate(45deg)` 的倾斜色彩条带。无论是标注“PRO 功能”、“限时五折”还是“HOT 爆款”，都能以极小面积产生强烈的视觉诱导力。',
    visualTraits: ['45° 对角倾斜贴角', '父容器溢出裁切 (overflow-hidden)', '高反差对比色', '促销/新品强引导'],
    aiPromptEn: 'Angled Corner Ribbon banner component. Positioned at the top-right corner of a card with a 45-degree rotation and absolute coordinates. Bold typography (SALE / PRO / NEW) with drop shadow and clean overflow clipping.',
    aiPromptZh: '制作卡片右上角 45 度倾斜角标彩带（Corner Ribbon）：使用 CSS 旋转与溢出隐藏，在卡片右上角斜切贴上一道鲜明的天蓝色横幅彩带，清晰标注“PRO”或“NEW”，极富商业转化感。',
    remotionSnippet: `// Tailwind CSS: 45度倾斜角标彩带
<div className="relative w-72 h-40 rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden p-6">
  {/* 斜角彩带 */}
  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
    <div className="absolute transform rotate-45 bg-sky-500 text-black font-black text-[10px] py-0.5 right-[-30px] top-[18px] w-[100px] text-center shadow-md">
      PRO
    </div>
  </div>
  <h3 className="text-white font-bold">高级功能卡片</h3>
</div>`,
    mathFormula: 'transform: rotate(45deg); width: 100px; right: -30px; top: 18px;',
    previewType: 'corner-ribbon',
    tags: ['横幅', '角标彩带', 'Ribbon', 'Badge', '促销标签'],
    isPreset: true,
  },

  /* =========================================================
     9. STYLE 风格流派类 (整页全局设计系统与范式)
     ========================================================= */
  {
    id: 'style-linear-dark',
    name: 'Linear SaaS Dark Mode / Sleek Dark Paradigm',
    nameZh: 'Linear 极客暗黑风 · 整页设计系统',
    aliases: ['极客暗黑整页', 'Linear全站风', 'Raycast暗黑范式', 'Sleek Dark SaaS', '高密度工程师美学'],
    category: 'STYLE',
    summary: '专为高密度 SaaS 与开发者工具打造的整页暗黑设计范式：纯黑画布、1px 细微网格、磨砂悬浮顶栏、极光微光 Hero 与 Bento 模块化功能阵列。',
    description: '由 Linear、Raycast 与 Vercel 树立的现代全页面工程美学标杆。全页采用纯黑（#08090a）沉浸底板，叠加 1px 极微暗灰网格；顶部常驻悬浮微透磨砂胶囊导航（backdrop-blur-md bg-neutral-900/60）；首屏居中渐变银白大标题，配以紫蓝径向极光光晕与双 CTA 按键；功能区采用 Bento 模块化非对称网格，内置等宽数据指标与绿色健康运行指示灯；全站深度集成 ⌘K 命令菜单调色板与 <kbd> 快捷键提示，传达专业、敏捷与极致可靠。',
    visualTraits: ['纯黑底色与 1px 微细暗网格', '顶部悬浮磨砂胶囊导航', '居中微光 Hero 与渐变文字', 'Bento 模块化数据矩阵', '全局 ⌘K 快捷键体系'],
    aiPromptEn: 'Create a complete modern dark-mode landing page in the Linear.app / Raycast engineering aesthetic. Page structure: 1) Top sticky floating capsule navbar with brand logo, links, and system status badge. 2) Hero section featuring an ambient purple/cyan radial gradient mesh glow, high-contrast headline ("Next-Gen Engineering Platform"), sub-headline, and sleek primary/secondary CTA buttons. 3) Feature section built with an Apple/Linear style Bento Grid: 12-column layout with 1px border-neutral-800 cards, monospaced metrics counters, and operational pulse badges. 4) Minimal footer with keyboard shortcut hint (Press ⌘K to open command palette). Use pure black (#08090a) background, Geist/Inter font pairing, and ultra-subtle micro-interactions.',
    aiPromptZh: '为我生成一个符合 Linear / Raycast 顶级极客暗黑风格的完整现代产品官网首页。整页规范：1) 画布采用沉浸式深渊纯黑（#08090a），搭配 1px 极微暗网格；2) 顶部常驻悬浮磨砂毛玻璃导航栏，包含 Logo、功能链接及全站快捷键；3) 首屏 Hero 区域带有居中渐变银白大标题、柔和紫蓝径向极光光晕及双操作按钮；4) 功能特性区采用 Bento Grid 便当盒非对称模块网格，卡片带有 1px 细边框与等宽数据指标；5) 底部带有 ⌘K 命令菜单呼出提示。全局传达高信噪比、极度克制与工程师级高精质感。',
    remotionSnippet: `// Linear 极客暗黑整页架构骨架
export function LinearDarkPage() {
  return (
    <div className="min-h-screen bg-[#08090a] text-neutral-200 font-sans selection:bg-indigo-500/30">
      {/* 顶部悬浮磨砂胶囊导航 */}
      <header className="sticky top-4 z-50 max-w-4xl mx-auto px-4">
        <nav className="flex items-center justify-between px-4 py-2.5 rounded-full bg-neutral-900/70 backdrop-blur-md border border-neutral-800 shadow-2xl">
          <span className="font-mono font-bold text-white text-sm">▲ LINEAR</span>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <a href="#" className="hover:text-white transition">Product</a>
            <a href="#" className="hover:text-white transition">Changelog</a>
            <a href="#" className="hover:text-white transition">Docs</a>
          </div>
          <button className="px-3 py-1 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition">
            Sign In
          </button>
        </nav>
      </header>

      {/* Hero 极光主视觉区 */}
      <section className="relative pt-24 pb-16 px-6 text-center max-w-3xl mx-auto">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-500/15 blur-3xl pointer-events-none" />
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
          Linear is a better way <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-500">
            to build products
          </span>
        </h1>
        <p className="mt-4 text-neutral-400 text-sm md:text-base max-w-xl mx-auto">
          Meet the new standard for modern software engineering teams.
        </p>
      </section>
    </div>
  );
}`,
    mathFormula: 'background: #08090a; border: 1px solid rgba(255,255,255,0.08); radial-glow: rgba(99,102,241,0.15);',
    previewType: 'style-linear-dark',
    tags: ['风格', 'Linear', '暗黑全页', 'SaaS', 'Raycast', '工程师美学'],
    isPreset: true,
  },
  {
    id: 'style-neo-brutalism',
    name: 'Neo-Brutalism Web Design System',
    nameZh: '新粗野主义 · 整页设计系统',
    aliases: ['新粗野主义整页', 'Gumroad全站风', '硬阴影波普页面', 'Brutalist Web', '复古波普官网'],
    category: 'STYLE',
    summary: '彻底打破极简平淡的先锋网页设计语言：复古米白/明黄撞色画布、2~3px 纯黑高对比粗轮廓、0 羽化纯黑硬偏移投影与物理下陷交互。',
    description: 'Gumroad、Figma 社区与当代潮流先锋品牌推崇的整页反叛式设计系统。页面底色为温暖象牙米白（#fdfbf7），融入高饱和明黄（#facc15）、天青与粉色撞色；全局所有容器、导航、卡片与按钮统一具有 2px~3px 纯黑实线粗边框；彻底舍弃高斯模糊渐变，统一采用 4px 4px 0px #000 的无羽化硬阴影；字体采用超重粗黑无衬线排印，配以波普贴纸胶带式徽标；所有交互按钮具备真实的物理下压反馈（active 时位移 2px~4px 消除阴影）；包含粗黑顶栏、Hero 焦点区、双列功能卡片与底部跑马灯。',
    visualTraits: ['复古米白底色与高饱和明黄撞色', '全局 2~3px 纯黑高对比硬边框', '0 羽化实体硬偏移投影 (4px 4px 0 #000)', '粗黑大字体与复古贴纸徽标', '真实机械下压位移交互 (Active 4px)'],
    aiPromptEn: 'Build a full-page modern web design in the Neo-Brutalism (Gumroad / Retro-Pop) aesthetic. Whole page guidelines: 1) Canvas background in warm cream/off-white (#fdfbf7) with high-contrast accent blocks in saturated canary yellow (#facc15) and electric cyan. 2) Every layout container, navbar, card, and button must feature thick 2px-3px solid black borders (#000000). 3) Zero-blur offset drop shadows on all cards and interactive components (box-shadow: 4px 4px 0px #000). 4) Bold geometric grotesque/sans-serif typography with high contrast. 5) Interactive buttons with physical depression effect: translate-x-[2px] translate-y-[2px] on hover, full 4px translate and 0 shadow on active. 6) Layout includes header with brand tag, hero with sticker badges, two-column feature cards, and marquee ticker banner.',
    aiPromptZh: '为我设计并实现一套完整的新粗野主义（Neo-Brutalism）风格整页网站。整页设计要求：1) 页面底色采用温暖复古米白（#fdfbf7），融入明黄（#facc15）和天青色块撞色；2) 全局所有容器、导航栏、卡片和按钮必须具有 2px~3px 纯黑实线粗边框；3) 彻底舍弃高斯模糊渐变，所有卡片和交互组件统一采用 4px 4px 0px #000 的无羽化硬阴影；4) 字体采用超重粗黑无衬线排印，配以波普贴纸胶带式徽标；5) 按钮具备真实的物理下压反馈（点击时位移 4px 消除阴影）；6) 包含粗黑顶栏、Hero 焦点区、双列功能卡片与底部黑框跑马灯。',
    remotionSnippet: `// 新粗野主义整页骨架
export function NeoBrutalismPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-black font-sans">
      {/* 纯黑粗框导航 */}
      <header className="border-b-4 border-black bg-yellow-300 px-6 py-4 flex items-center justify-between">
        <span className="font-black text-xl tracking-tight">GUMROAD // STORE</span>
        <button className="px-4 py-2 bg-white text-black font-black text-sm border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all">
          START SELLING ➔
        </button>
      </header>

      {/* Hero 粗野主义海报区 */}
      <section className="p-8 max-w-4xl mx-auto">
        <div className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-none">
            Sell What You <br />
            <span className="bg-cyan-300 px-2 border-2 border-black inline-block mt-2">Really Know</span>
          </h1>
        </div>
      </section>
    </div>
  );
}`,
    mathFormula: 'box-shadow: 4px 4px 0px 0px #000000; border: 2px solid #000000; active: translate(4px, 4px);',
    previewType: 'style-neo-brutalism',
    tags: ['风格', '新粗野主义', 'Neo-Brutalism', '硬阴影', 'Gumroad', '波普风'],
    isPreset: true,
  },
  {
    id: 'style-bento-grid',
    name: 'Bento Grid Full-Page Landing Architecture',
    nameZh: 'Bento 便当盒 · 全景落地页体系',
    aliases: ['便当盒整页落地页', 'Apple发布会拼贴', 'Bento Landing Page', '模块化整页网格', '全景卡片排版'],
    category: 'STYLE',
    summary: '以自适应非对称网格为主干骨架的现代落地页架构：全站统一大圆角、12 列自适应单元格拼贴，将全站能力自包含在模块化卡片阵列中。',
    description: '苹果硬件发布会、GitHub 与前沿科技官网最核心的现代落地页排版体系。全页以 12 列响应式 CSS Grid 为骨架，背景多采用中性深灰或微光纯黑；通过非对称跨度单元格（如 8+4 列、4+4+4 列、6+6 列）创造极其舒适的视觉节奏；全站卡片统一采用大圆角（rounded-2xl/3xl）、半透明深灰背景与精致内描边；每个单元格内部是一个完全独立、自包含的交互微应用（内置交互图表、动态滑动条、实时指标或动效组件）；视线自由跳读，兼顾极高信息密度与极致整洁。',
    visualTraits: ['12 列自适应非对称网格主干', '统一大圆角 (rounded-2xl / 3xl)', '单盒单功能自包含设计', '图表/指标/动效高密度融合', '视线自由跳读的高扫读率'],
    aiPromptEn: 'Create a complete high-converting landing page using the Bento Grid architectural layout. Overall page specifications: 1) The core feature section is structured around a responsive 12-column CSS Grid with gap-4 and rounded-3xl container tiles. 2) Asymmetric tile hierarchy: Feature 1 takes col-span-8 with full interactive product preview; Feature 2 takes col-span-4 with a live animated metric counter; Feature 3 takes col-span-4 with user avatar social proof; Feature 4 takes col-span-8 with a multi-tab code toggle. 3) Subtle dark backdrop (#0a0a0c) with border-neutral-800/80 and backdrop-blur-xl surfaces. 4) Clean minimal top nav and hero banner that seamlessly flows into the Bento grid showcase.',
    aiPromptZh: '为我生成一个完整的 Bento Grid（便当盒网格架构）现代科技产品落地页。整页架构规范：1) 页面核心功能区采用 12 列自适应网格，容器统一采用 rounded-3xl 大圆角与 1px 微透边框；2) 非对称网格节奏：主功能区占 8 列横幅大盒，右侧占 4 列内嵌动态指标计数器，下层穿插 4 列社交证明头像堆叠与 8 列交互式控制板；3) 单元格内部高度自包含，结合微图表与动态开关；4) 页面顶部配有轻量磨砂导航，Hero 标题行云流水地过渡衔接到 Bento 展示区，信息密度高且极富条理。',
    remotionSnippet: `// Bento 便当盒落地页网格布局
export function BentoLandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-neutral-100 p-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-6xl mx-auto">
        {/* 主核心卡片 (8列) */}
        <div className="md:col-span-8 p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-between min-h-[280px]">
          <h3 className="text-2xl font-bold">M3 Max Neural Core Architecture</h3>
          <p className="text-neutral-400 text-sm">自包含超大展示盒，支持内嵌交互式渲染与数据流。</p>
        </div>
        {/* 指标卡片 (4列) */}
        <div className="md:col-span-4 p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col justify-center text-center">
          <span className="text-5xl font-mono font-black text-purple-400">120 FPS</span>
          <span className="text-neutral-500 text-xs mt-2 uppercase tracking-widest">ProMotion Tech</span>
        </div>
      </div>
    </div>
  );
}`,
    mathFormula: 'display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 1rem;',
    previewType: 'style-bento-grid',
    tags: ['风格', 'Bento Grid', '便当盒', 'Apple风', '落地页', '排版'],
    isPreset: true,
  },
  {
    id: 'style-clean-minimal',
    name: 'Modern Clean Minimalist / Enterprise White',
    nameZh: '现代极简白昼风 · 企业级整页系统',
    aliases: ['Stripe白色风', '现代极简白', '企业级清爽官网', 'Clean Enterprise Light', '苹果浅色风'],
    category: 'STYLE',
    summary: '现代顶尖科技企业（Stripe、Vercel Light、Apple）的标杆浅色界面：开阔大面积纯白留白、微细浅灰线框、超柔和多层羽化投影与柔和弥散光晕。',
    description: 'Stripe、Notion 与 Apple 官网推崇的现代企业级浅色整页设计系统。全页采用纯白底色（#ffffff），配以极开阔的排版外边距与内外留白，呼吸感极强；全站统一使用极浅中性灰边框（border-neutral-200/80），搭配超大半径、极低透明度的多层柔和漫反射投影（shadow-xl shadow-neutral-200/50）；在纯白画布中融入极淡的蓝紫或琥珀色柔和弥散光晕（Radial Ambient Aura），打破浅色界面的单调冷淡；高品质无衬线字体，深炭灰主标题与中灰副标题，展现成熟、稳健与顶级国际化企业格调。',
    visualTraits: ['纯白画布与极开阔留白呼吸感', '极浅中性灰细边线 (border-neutral-200)', '多层超柔和弥散漫反射阴影', '淡彩径向渐变氛围底纹', '精致紧凑的国际化排版字阶'],
    aiPromptEn: 'Design a complete modern enterprise light-mode website in the Stripe / Vercel Light aesthetic. Page system guidelines: 1) Pure white background (#ffffff) with generous breathing room and white space. 2) Subtle ambient backdrop: ultra-soft pastel radial gradients (soft indigo/sky/amber glow) blurred across the canvas. 3) Surface elements use fine border-neutral-200 lines paired with multi-layer soft diffused shadows (shadow-2xl shadow-neutral-200/60). 4) Precise typography hierarchy with crisp dark charcoal text (#111827), muted grey secondary copy (#4b5563), and tracking-tight headings. 5) Includes frosted white top navbar, centered hero banner with glowing product mockup, and 3-column feature cards with pill badges.',
    aiPromptZh: '为我设计并生成一套顶级 Stripe / Vercel 浅色风格的企业级现代产品官网。整页规范：1) 页面底色为纯白（#ffffff），具备开阔充沛的留白空间；2) 背景透出极淡雅柔和的蓝紫渐变弥散光晕，通透轻盈；3) 卡片与容器使用 1px 极浅灰边框（border-neutral-200）搭配超柔和多层漫反射阴影（shadow-xl）；4) 排版采用深炭灰主标题与中灰副标题，字重对比严谨考究；5) 包含磨砂白浮动顶栏、清爽居中 Hero 区域、三列特性卡片以及微光主行动按钮，国际范与高品质感拉满。',
    remotionSnippet: `// 现代极简白昼整页骨架
export function CleanMinimalPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-indigo-100">
      {/* 极简磨砂白导航 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/80 px-8 py-4 flex items-center justify-between">
        <span className="font-bold text-lg text-neutral-950">stripe</span>
        <div className="flex items-center gap-6 text-sm text-neutral-600">
          <a href="#" className="hover:text-black">Products</a>
          <a href="#" className="hover:text-black">Solutions</a>
          <a href="#" className="hover:text-black">Developers</a>
        </div>
        <button className="px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition">
          Sign In ➔
        </button>
      </header>
    </div>
  );
}`,
    mathFormula: 'box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02);',
    previewType: 'style-clean-minimal',
    tags: ['风格', '极简白', 'Stripe风', '企业官网', '浅色模式', '国际化'],
    isPreset: true,
  },
  {
    id: 'style-editorial-brutalist',
    name: 'Editorial Typographic / Magazine Paradigm',
    nameZh: '极简大字杂志风 · 纯排版整页系统',
    aliases: ['杂志排版整页', '大字号纯排版', '独立刊物风格', 'Typographic Brutalist', '报纸分栏风'],
    category: 'STYLE',
    summary: '纯排版驱动的先锋整页设计语言：全页 0 圆角、无阴影、严谨的 1px 黑白分割标尺线、巨幅经典衬线大标题与报刊折页分栏排版。',
    description: 'Monocle、Kinfolk 杂志与先锋设计工作室所推崇的文字主导型（Typography-First）网页范式。全站彻底摈弃圆角（全局 rounded-none）与任何模糊阴影，依托精密严谨的 1px 黑色或深白实线进行横纵网格切分，仿佛经典铅字排版的印刷品；主标题采用超大号经典衬线体（Playfair Display / Serif），配以极小字号的等宽注脚与栏目序号（如 [01]、[FEATURE ARTICLE]、ISSUE NO.42）；采用不对称报刊多栏式排版，标题、引言、正文与留白形成黑白灰交响，极富文化底蕴、艺术先锋感与独立气质。',
    visualTraits: ['纯排版文字驱动 (Typography-first)', '全局 0 圆角 (rounded-none) 锐利边缘', '严密 1px 标尺分割线网格', '巨幅衬线大字与微型等宽标注', '报刊杂志分栏折页布局'],
    aiPromptEn: 'Create a complete modern website using an Editorial Typographic / Magazine aesthetic. Full page rules: 1) Typography-first design: eliminate all rounded corners (rounded-none) and all drop shadows (shadow-none). 2) Editorial grid structure separated by crisp 1px solid contrast dividing lines (border-neutral-200 in light or border-neutral-800 in dark). 3) Distinct typographic hierarchy: colossal serif headings (Playfair Display / Georgia) paired with tiny uppercase monospaced labels and dates (e.g. ISSUE 08 // ARCHIVE). 4) Asymmetric multi-column newspaper layout with headline story, editorial columns, index table, and high-contrast inverted black/white CTA blocks.',
    aiPromptZh: '为我生成一个先锋艺术杂志/独立刊物风格（Editorial Typographic）的完整网页。整页规范：1) 纯排版驱动，全站所有容器、按钮一律采用 0 圆角（rounded-none），彻底禁用任何投影；2) 页面依靠 1px 纯黑/深灰细实线进行报纸式栏目横纵分割；3) 字体层级极富张力：超大号典雅衬线体（Serif）大标题搭配极小字号等宽栏目编号（如 [VOL. 24]、[ESSAY]）；4) 报刊折页式多栏排版，主副栏目穿插，配以极简黑白反色操作按钮，格调高级典雅。',
    remotionSnippet: `// 极简大字杂志排版整页骨架
export function EditorialMagazinePage() {
  return (
    <div className="min-h-screen bg-[#f8f8f6] text-black font-serif p-8">
      {/* 报头与版号 */}
      <header className="border-b-2 border-black pb-4 mb-8 flex justify-between font-mono text-xs uppercase tracking-widest">
        <span>THE ARCHITECTURAL CHRONICLE</span>
        <span>ISSUE NO. 42 // 2026</span>
      </header>
      <main className="max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tight leading-none mb-8">
          TYPOGRAPHY IS ARCHITECTURE.
        </h1>
      </main>
    </div>
  );
}`,
    mathFormula: 'border: 1px solid #000; border-radius: 0px; box-shadow: none; font-family: serif;',
    previewType: 'style-editorial-brutalist',
    tags: ['风格', '杂志风', '纯排版', '大字号', '0圆角', 'Editorial'],
    isPreset: true,
  },
  {
    id: 'style-cyberpunk-hud',
    name: 'Cyberpunk Sci-Fi HUD Terminal Webpage',
    nameZh: '赛博朋克科幻终端 · 全息控制台整页',
    aliases: ['科幻HUD终端整页', '赛博朋克页面', '全息仪表盘', '黑客控制台', 'Sci-Fi Dashboard'],
    category: 'STYLE',
    summary: '沉浸式未来指挥舱整页系统：全屏深渊黑与全息扫描线、45 度切角面板、荧光青与品红发光辉光、动态雷达仪表与命令行状态监视。',
    description: '科幻游戏 UI、尖端安全监控与 Web3 黑客松旗舰界面的全景设计语言。全屏采用深渊纯黑底色（#030712），叠加全屏 CRT 水平微弱扫描线与全息网格投影，带来沉浸式座舱视窗体验；所有容器、面板与按钮摒弃普通圆角，采用工业级 45 度切角几何裁切（clip-path: polygon），轮廓覆以荧光青（#00f0ff）发光描边；页面布局分为顶部全息状态航线栏（带有 PING 延迟、雷达脉冲灯、安全密级）、中央主控态势大屏、以及双侧带有动态电平柱与实时滚动日志的数据监视窗；按钮点击带有电平脉冲与指令回馈，未来黑客张力十足。',
    visualTraits: ['全屏深渊黑与全息 CRT 扫描线', '45 度工业切角裁切面板 (clip-path)', '荧光青 (#00f0ff) 与品红霓虹辉光', '动态雷达扫描与实时数据流监视', '沉浸式未来科技指挥舱架构'],
    aiPromptEn: 'Build a full-page Cyberpunk / Sci-Fi HUD Terminal web interface. Complete page specifications: 1) Deep space black canvas (#030712) with a full-screen subtle CRT scanline effect and holographic grid overlay. 2) Industrial chamfered geometry: containers and buttons use 45-degree angled clipped corners (clip-path: polygon) bordered with electric cyan (#00f0ff) and magenta neon glows. 3) HUD Dashboard structure: top status header with blinking live radar scanner, system uptime, and clearance level; central mission viewport; dual telemetry panels with animated signal strength meters; and bottom interactive command CLI input.',
    aiPromptZh: '为我生成一个沉浸式赛博朋克/科幻 HUD 全息控制台（Cyberpunk Terminal）完整整页网页。整页规范：1) 全屏深渊纯黑底色，覆盖 CRT 水平电视扫描线与全息网格；2) 页面所有卡片、视窗和按钮采用 45 度工业倒角切角（clip-path），带有荧光青色（#00f0ff）发光边框；3) 页面结构包括：顶部全息状态栏（包含雷达绿点、PING 延迟和系统密级）、主控全息态势视窗、左右双侧数据监视模块与底部终端指令控制台；4) 浓厚未来极客与太空指挥舱质感。',
    remotionSnippet: `// 赛博朋克 HUD 全屏控制台骨架
export function CyberpunkTerminalPage() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-cyan-300 font-mono overflow-hidden p-6">
      {/* CRT 电视扫描线 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
      <header className="border-b border-cyan-500/50 pb-2 flex justify-between text-xs tracking-widest">
        <span>NEXUS-7 HUD CORE // ONLINE</span>
        <span>CLEARANCE: LEVEL-4</span>
      </header>
    </div>
  );
}`,
    mathFormula: 'clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));',
    previewType: 'style-cyberpunk-hud',
    tags: ['风格', '赛博朋克', 'HUD', '科幻终端', '切角', '霓虹'],
    isPreset: true,
  },
  {
    id: 'style-claymorphism',
    name: 'Claymorphic 3D Playful Universe Webpage',
    nameZh: '3D 黏土萌系潮玩 · 充气整页系统',
    aliases: ['黏土整页风格', '3D充气玩具页面', '潮玩官网', 'Claymorphism Web', '软萌马卡龙全站'],
    category: 'STYLE',
    summary: '宛如触手可及的 3D 萌系黏土世界：马卡龙温润渐变大画布、全局超大胶囊圆角、双层膨胀内高光与悬浮彩色柔影、亲和力十足的充气微缩页面。',
    description: 'Web3 潮玩、亲子教育、萌系社交与年轻化数字产品最青睐的整页拟物进化形态。全页背景为温润柔和的浅马卡龙渐变色（柔粉、云朵蓝或浅奶黄），宛如漂浮在糖果云端；所有模块与卡片统一采用超大圆角（rounded-3xl），利用顶部白色半透明内阴影（inset 0 4px 8px rgba(255,255,255,0.6)）营造充气体表面高光，底部搭配大范围同色系漫反射投影，使容器呈现鼓鼓囊囊的 3D 气囊软垫质感；页面布局包含浮空药丸导航栏、膨胀大字 Hero 标题、带软萌立体图标的功能卡片群；按钮带有弹簧果冻挤压弹性，视觉亲切温暖，充满童趣与潮流质感。',
    visualTraits: ['马卡龙温润柔和糖果色大底', '全页超大圆润胶囊角 (rounded-3xl)', '顶部内发光高光营造充气膨胀感', '悬浮多层彩色弥散柔和阴影', '果冻弹性回弹交互与零锐角'],
    aiPromptEn: 'Create a complete modern webpage in the Claymorphism 3D Cute Toy aesthetic. Full page guidelines: 1) Soft dreamy pastel backdrop with subtle marshmallow gradient (soft lilac, peach, and sky blue). 2) All containers, navbar, cards, and buttons must feature bulbous rounded-3xl corners and 3D inflated cushion styling. 3) Dual-shadow recipe: top-left inset white highlight (box-shadow: inset 0 4px 8px rgba(255,255,255,0.5)) combined with deep ambient bottom colored shadow. 4) Rounded playful typography. 5) Page structure: floating pill navbar, inflated hero banner with 3D squishy CTA button, and 3-column bubbly feature modules with jelly hover bounce.',
    aiPromptZh: '为我设计并生成一个 3D 萌系黏土潮玩风格（Claymorphism）的完整产品官网。整页规范：1) 页面底色为温润治愈的马卡龙糖果粉彩渐变（浅紫/柔粉/天蓝）；2) 全页面所有版块、导航和卡片一律采用 rounded-3xl 超大圆角，彻底消除锐角；3) 容器表面采用复合内高光（inset 0 4px 8px 白色）与底部大弥散彩色投影，打造如同充气气球或软黏土捏成的饱满 3D 气囊质感；4) 配以圆润可爱的字体排版；5) 按钮带有果冻弹性挤压动画，视觉亲切温暖，充满童趣与潮流质感。',
    remotionSnippet: `// 3D 黏土萌系潮玩整页骨架
export function ClaymorphicWorldPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100 text-neutral-800 font-sans p-8">
      {/* 浮空药丸气囊导航 */}
      <nav className="max-w-2xl mx-auto px-6 py-3 rounded-full bg-white/80 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_8px_16px_rgba(168,85,247,0.15)] flex justify-between items-center">
        <span className="font-black text-purple-900">☁️ SquishyLab</span>
        <button className="px-4 py-1.5 rounded-full bg-purple-500 text-white font-bold text-xs shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),0_6px_12px_rgba(168,85,247,0.3)]">
          Explore Toys
        </button>
      </nav>
    </div>
  );
}`,
    mathFormula: 'box-shadow: inset 0 4px 8px rgba(255,255,255,0.6), 0 16px 32px rgba(168,85,247,0.25);',
    previewType: 'style-claymorphism',
    tags: ['风格', '黏土风', 'Claymorphism', '3D充气', '马卡龙', '潮玩'],
    isPreset: true,
  },
  {
    id: 'style-retro-os',
    name: 'Retro OS / Windows 95 Desktop Webpage',
    nameZh: '90s 复古系统视窗 · 桌面整页系统',
    aliases: ['Windows 95整页', '复古桌面系统', 'Web 1.0怀旧', 'Retro OS Web', '复古像素视窗'],
    category: 'STYLE',
    summary: '拟态 90 年代经典桌面操作系统的沉浸式整页设计：经典灰白与深青桌面、斜切 3D 浮雕边框、蓝白渐变视窗标题栏与开始菜单任务栏。',
    description: '以 Windows 95 / Mac OS System 7 为灵感的情怀极客整页复古范式。全屏背景采用经典复古纯色桌面（Windows 经典深青色 #008080），桌面上散落着经典像素风快捷图标；主页面承载于一个大型系统应用视窗内，四周带有经典的 3D 浮雕边框（左上纯白亮高光、右下深灰暗投影，呈现经典的凸起按键与窗体凹槽）；视窗顶部包含标志性的深蓝渐变标题栏（bg-gradient-to-r from-blue-900 to-sky-600），右侧提供最小化、最大化和红叉关闭按钮；下方配有完整的经典菜单条（文件、编辑、查看、帮助）；页面底部常驻经典灰色任务栏，左侧是凸起的“开始”按钮，右侧是系统托盘时间时钟。',
    visualTraits: ['经典 Windows 深青色 (#008080) 桌面', '斜切 3D 浮雕高光/暗灰边框', '经典蓝白渐变窗口标题栏与控制钮', '文件/编辑经典菜单与像素图标', '底部常驻开始菜单任务栏与时钟'],
    aiPromptEn: 'Build a full-page retro nostalgic website styled as a 1990s Desktop Operating System (Windows 95 / Mac System 7). Full page layout specifications: 1) Fullscreen vintage teal desktop background (#008080) with retro desktop shortcut icons. 2) Main web content is enclosed inside an authentic draggable OS window with classic 3D bevel borders (white top-left, dark grey bottom-right). 3) Navy blue gradient window title bar with retro pixel icon, title text, and minimize/maximize/close buttons. 4) Classic menu strip (File, Edit, View, Help). 5) Content area features tabbed dialogues and beveled push-buttons. 6) Bottom pinned taskbar with elevated "Start" button and digital clock tray.',
    aiPromptZh: '为我生成一个拟态 90 年代经典操作系统（Windows 95 / 复古视窗）的沉浸式整页网页。整页规范：1) 页面全屏底色为经典深青色（#008080），代表复古电脑桌面；2) 主内容呈现在一个经典应用窗口中，四周采用纯白与深灰组合的经典 3D 斜角凸起/凹陷浮雕边线；3) 窗口顶部带有深蓝渐变标题栏，配以复古图标和经典的最小化、最大化、关闭三连钮；4) 包含文件/编辑/帮助经典文本菜单栏；5) 页面底部常驻灰色系统任务栏，包含凸起的“开始”按钮与托盘时钟，复古怀旧感与极客情怀拉满。',
    remotionSnippet: `// 90s 复古视窗桌面整页骨架
export function RetroOSDesktopPage() {
  return (
    <div className="min-h-screen bg-[#008080] font-mono text-black p-4 flex flex-col justify-between">
      {/* 复古窗口 */}
      <div className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black max-w-2xl mx-auto w-full">
        {/* 蓝白渐变标题栏 */}
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1 flex justify-between items-center text-xs font-bold">
          <span>💾 MotionCue 95 - [Internet Explorer]</span>
          <div className="flex gap-1">
            <button className="px-1.5 bg-[#c0c0c0] text-black border border-white border-b-black border-r-black">_</button>
            <button className="px-1.5 bg-[#c0c0c0] text-black border border-white border-b-black border-r-black">✕</button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    mathFormula: 'border-top: 2px solid #ffffff; border-left: 2px solid #ffffff; border-bottom: 2px solid #000; border-right: 2px solid #000;',
    previewType: 'style-retro-os',
    tags: ['风格', '复古系统', 'Windows 95', 'Retro OS', '像素怀旧', '桌面视窗'],
    isPreset: true,
  },
];



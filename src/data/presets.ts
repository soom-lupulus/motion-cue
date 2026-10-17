import { MotionCue } from '../types/cue';

export const PRESET_MOTION_CUES: MotionCue[] = [
  {
    id: 'anticipation-overshoot',
    name: 'Anticipation & Overshoot',
    nameZh: '蓄力前摇与冲出回弹',
    aliases: ['回弹动效', '起跑前摇', 'Elastic Bounce', 'Back Easing'],
    category: 'PHYSICS',
    summary: '物体在极速前冲前轻微向后反向蓄力，并在到达目标后轻微冲过头再反弹稳定。',
    description: '源自迪士尼经典动画12法则。运动物体先以反方向微小位移（10%~15%）积累势能（Anticipation），随后以极高加速度冲向终点，突破终点形成冲过头（Overshoot），最后在阻尼力作用下回摆定位。在 Remotion 中通常通过带回拉负值的立方贝塞尔或高刚度低阻尼弹簧实现。',
    visualTraits: ['反向蓄力倒退', '爆发性高加速度', '终点冲刺突破', '柔和回摆稳定'],
    aiPromptEn: 'Dynamic motion graphic with anticipation and overshoot physics. The UI card quickly pulls back slightly (ease-in anticipation), then rapidly shoots forward across the screen, exceeding its resting point with a subtle elastic overshoot bounce before snapping into place with realistic spring physics. Crisp 4K, 60fps, smooth easing curve.',
    aiPromptZh: '动态视觉呈现“蓄力与回弹”动画：主体元素先向后收缩蓄力（Anticipation），接着极速向目标位置冲刺弹出，超过目标位置约 10% 后轻微回弹（Overshoot），最终像阻尼弹簧般平滑定格，动作干净利落，具备真实物理质感。',
    remotionSnippet: `// Remotion: 使用 spring() 模拟蓄力与冲出回弹
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const progress = spring({
  frame: frame - 5, // 延迟 5 帧起跑
  fps,
  config: {
    damping: 12,    // 阻尼系数：越低振荡越明显
    stiffness: 180, // 刚度：越高回弹越迅猛
    mass: 0.8,      // 质量：适度轻快
  },
});

// 结合 interpolate 实现前摇反向位移
const anticipation = interpolate(frame, [0, 5, 12], [0, 15, 0], {
  extrapolateRight: 'clamp',
  easing: Easing.out(Easing.quad),
});

const scale = interpolate(progress, [0, 1], [0.8, 1]);
const translateY = -anticipation + interpolate(progress, [0, 1], [60, 0]);`,
    mathFormula: 'f(t) = 1 - e^(-damping * t) * cos(omega * t) + overshoot',
    previewType: 'anticipation-overshoot',
    tags: ['物理法则', '经典动画', '弹簧', '入场动画', 'Remotion必用'],
    isPreset: true,
  },
  {
    id: 'kinetic-typography',
    name: 'Kinetic Typography',
    nameZh: '动态排版 / 节奏动态字幕',
    aliases: ['动态文字', '卡点文字', '节奏字体', 'Kinetic Text'],
    category: 'TYPOGRAPHY',
    summary: '文字与音乐节拍或旁白情绪紧密结合，通过旋转、缩放、重排与瞬间位移传递张力。',
    description: '动态排版不仅仅是字幕弹出，而是把文字本身作为视觉动画的主体。文字以紧凑字距（Kerning）、粗黑无衬线字体为主，通常伴随字形瞬变、逐词节奏交错（Stagger Cascade）、强烈的视角倾斜与镜头追焦。在短视频与编程式视频（Remotion）中极为常见。',
    visualTraits: ['极高可读性', '强音乐节奏卡点', '大幅度缩放与翻转', '几何对齐与排版张力'],
    aiPromptEn: 'Bold kinetic typography sequence, synchronized with high-energy beats. Huge modern bold sans-serif text dynamically scales, slams into the frame with motion blur, words cascading rapidly with staggered delay, rotating 90 degrees with fluid camera tracking, high contrast black and vibrant accent background.',
    aiPromptZh: '现代粗黑体动态排版演示：文字根据节奏瞬间重组，巨幅英文字母以 0.1 秒极速冲击画面，伴随微小字距扩张与定向模糊，词句交错级联浮现，黑底搭配高饱和荧光色强调，极具视觉冲击力与现代平面设计质感。',
    remotionSnippet: `// Remotion: 逐词交错 (Staggered Word Reveal)
const frame = useCurrentFrame();
const words = ["MAKE", "IDEAS", "MOVE"];

return (
  <div style={{ display: 'flex', gap: 16 }}>
    {words.map((word, i) => {
      const delay = i * 4; // 错开 4 帧
      const wordProgress = spring({
        frame: frame - delay,
        fps,
        config: { damping: 14, stiffness: 220 },
      });
      const translateY = interpolate(wordProgress, [0, 1], [40, 0]);
      const opacity = interpolate(wordProgress, [0, 0.4, 1], [0, 0.8, 1]);
      return (
        <span key={word} style={{ transform: \`translateY(\${translateY}px)\`, opacity }}>
          {word}
        </span>
      );
    })}
  </div>
);`,
    mathFormula: 'staggerDelay_i = i * stepFrames; opacity = clamp((t - delay) / dur, 0, 1)',
    previewType: 'kinetic-typography',
    tags: ['排版', '字幕', '卡点', '短视频', '编程式文本'],
    isPreset: true,
  },
  {
    id: 'chromatic-aberration',
    name: 'Chromatic Aberration (RGB Split)',
    nameZh: '轴向色散 / RGB 色彩分离',
    aliases: ['色差', 'RGB撕裂', '红蓝分离', 'Glitch Color Fringe'],
    category: 'VFX_GLITCH',
    summary: '模拟镜头光学缺陷或数字信号故障，使红、绿、蓝三个色彩通道产生位移错位。',
    description: '自然界中由于透镜对不同波长光线的折射率不同导致边缘产生彩边；而在影视剪辑和动效中，常作为故障风（Cyberpunk Glitch）、重音打击瞬间的冲击波反馈（Hit Impact）或能量爆发的视觉点缀。在前端常通过 CSS `mix-blend-mode: screen` 多图层平移实现。',
    visualTraits: ['边缘红青/红蓝分离', '瞬时高频冲击', '故障与数字化质感', '高对比边缘加重'],
    aiPromptEn: 'Chromatic aberration glitch effect, RGB channel separation artifact. Intense split of red and cyan color channels on high-contrast geometric contours, momentary digital noise jitter, screen distortion with subtle horizontal scanlines, high-tech cyber aesthetic, vivid futuristic mood.',
    aiPromptZh: '高对比图形瞬间产生强烈的 RGB 轴向色散（Chromatic Aberration）：红、绿、蓝三色通道横向轻微错位分离，边缘浮现荧光红与青色边缘辉光，在冲击瞬间高频抖动 3 帧后复原，呈现极度写实的数字故障与光学镜头冲击感。',
    remotionSnippet: `// Remotion: 使用 CSS 或 SVG 滤镜产生 RGB 分离冲击
const frame = useCurrentFrame();
// 击打瞬间（第 15 帧）产生冲击色散
const hitDistance = Math.abs(frame - 15);
const offset = hitDistance < 6 ? Math.sin(frame * 4) * (6 - hitDistance) : 0;

return (
  <div style={{ position: 'relative' }}>
    {/* 红色通道层 */}
    <div style={{ position: 'absolute', transform: \`translateX(\${-offset}px)\`, color: '#ff0055', mixBlendMode: 'screen' }}>
      IMPACT
    </div>
    {/* 青色通道层 */}
    <div style={{ position: 'absolute', transform: \`translateX(\${offset}px)\`, color: '#00ffee', mixBlendMode: 'screen' }}>
      IMPACT
    </div>
    {/* 主体层 */}
    <div style={{ color: '#ffffff' }}>IMPACT</div>
  </div>
);`,
    mathFormula: 'offset_R = -dx(t); offset_B = +dx(t); BlendMode: screen / additive',
    previewType: 'chromatic-aberration',
    tags: ['VFX', '故障风', '赛博朋克', '打击感', '着色器'],
    isPreset: true,
  },
  {
    id: 'whip-pan',
    name: 'Whip Pan (Swish Pan / Flash Pan)',
    nameZh: '甩镜转场 / 快速摇镜',
    aliases: ['甩镜头', '摇摄转场', '极速转场', 'Swish Pan'],
    category: 'TRANSITION',
    summary: '摄影机以极快速度横向或纵向水平甩转，画面瞬间产生极强定向模糊，无缝切入下一镜头。',
    description: '电影大师（如韦斯·安德森、埃德加·赖特）最常使用的镜头转场手法。在 4~8 帧时间内，画面沿运动方向拉出极端强烈的动态模糊（Directional Motion Blur），此时画面内容变成几乎不可辨认的流光线条，切入下一镜头时再反向减速刹停。',
    visualTraits: ['超强定向运动模糊', '极速跨屏扫过（4-8帧）', '无缝空间转移', '节奏瞬间加速'],
    aiPromptEn: 'Cinematic whip pan transition (swish pan). Camera aggressively snaps and rotates sideways at extreme speed, creating a dynamic directional motion blur streaking across the horizontal plane, transitioning seamlessly from scene A into scene B, fluid kinetic momentum, 4k cinematic.',
    aiPromptZh: '电影级甩镜转场（Whip Pan）：镜头在 0.2 秒内以极高角速度向右侧迅猛甩出，画面被剧烈的水平方向运动模糊拉扯成流线光影，并在刹那间平滑减速定格在下一画面，带出强烈的节奏推移感。',
    remotionSnippet: `// Remotion: 甩镜转场核心计算
const frame = useCurrentFrame();
const DURATION = 15; // 甩镜总时长
const progress = interpolate(frame, [0, DURATION], [0, 1], {
  easing: Easing.bezier(0.7, 0, 0.3, 1), // 极其陡峭的中段极速曲线
});

// 计算横向位移与运动模糊量
const translateX = interpolate(progress, [0, 0.5, 1], [0, -1000, -2000]);
const blurAmount = Math.sin(progress * Math.PI) * 24; // 中段模糊最强

return (
  <div style={{
    transform: \`translateX(\${translateX}px)\`,
    filter: \`blur(\${blurAmount}px)\`,
  }}>
    {/* 场景内容 */}
  </div>
);`,
    mathFormula: 'blur(t) = maxBlur * sin(π * t); x(t) = Bezier(0.7, 0, 0.3, 1)',
    previewType: 'whip-pan',
    tags: ['转场', '剪辑', '镜头运动', '速度感', '电影手法'],
    isPreset: true,
  },
  {
    id: 'match-cut',
    name: 'Match Cut',
    nameZh: '匹配剪辑 / 几何形状呼应转场',
    aliases: ['形状匹配', '匹配转场', '几何契合', 'Shape Match'],
    category: 'TRANSITION',
    summary: '利用两个不同场景中相似的图形轮廓、运动方向或色彩构成，实现视觉意象的无缝连接。',
    description: '如电影《2001太空漫游》中骨头抛向天空匹配切为轨道卫星。在动态设计与 Remotion 视频中，常将前一幕的主角（如圆形 Logo、圆形表盘、圆形咖啡杯）锁定在屏幕同一坐标，进行形态形变或瞬间交叉溶解（Cross-fade），既优雅又充满叙事隐喻。',
    visualTraits: ['几何形状完美重叠', '中心锚点保持一致', '形态连贯蜕变', '叙事高级感'],
    aiPromptEn: 'Graphic match cut transition. A minimalist circular object seamlessly transforms into another circular element in a completely different context, maintaining identical center coordinates and silhouette geometry, flawless visual continuity, fluid morphing transition.',
    aiPromptZh: '高级匹配剪辑（Match Cut）：画面中心保持一个正圆形几何锚点，前一个物体的外轮廓与后一个物体的轮廓在旋转中完美对齐并瞬间互换，视角坐标完全一致，视觉过渡极其丝滑自然。',
    remotionSnippet: `// Remotion: 匹配剪辑 (Match Cut)
const frame = useCurrentFrame();
const transitionFrame = 30;
const isSecondScene = frame >= transitionFrame;

// 共享的旋转与缩放能量
const rotate = interpolate(frame, [20, 40], [0, 180]);
const scale = interpolate(frame, [20, 30, 40], [1, 1.25, 1]);

return (
  <div style={{ transform: \`scale(\${scale}) rotate(\${rotate}deg)\` }}>
    {isSecondScene ? <TargetIcon /> : <SourceIcon />}
  </div>
);`,
    mathFormula: 'Anchor_SceneA(x,y) == Anchor_SceneB(x,y); Scale(t) peaked at switch',
    previewType: 'match-cut',
    tags: ['转场', '蒙太奇', '几何连贯', '品牌视频', '高级感'],
    isPreset: true,
  },
  {
    id: 'parallax-2-5d',
    name: '2.5D Parallax Layering',
    nameZh: '多图层 2.5D 空间视差',
    aliases: ['视差滚动', '前后景深差', '深度视差', 'Multi-plane Camera'],
    category: 'CAMERA',
    summary: '前景、中景与背景以不同速率移动，利用近大远小与运动速度差制造真实三维纵深感。',
    description: '迪士尼多平面摄影机（Multiplane camera）原理在数字时代的延伸。当前景以 1.2 倍速度平移，中景以 1.0 倍速度平移，而遥远的背景仅以 0.2 倍速度移动时，人脑会立即感知到强烈的空间距离。在 Remotion 中常结合鼠标或固定镜头平移给静态平面插画赋予电影级纵深。',
    visualTraits: ['多层速率分离', '前景快/背景慢', '空间层级分明', '景深虚化对比'],
    aiPromptEn: '2.5D multi-plane parallax depth effect. Front layer elements move rapidly across the camera with slight depth of field blur, midground characters move at medium pace, and far background mountains drift slowly with atmospheric haze, giving rich immersive depth, cinematic 3D feel.',
    aiPromptZh: '2.5D 多图层空间视差动效：画面切分为前景漂浮微粒、中景主体卡片与远景渐变网格，镜头缓动时前景快速掠过带轻度虚化，中景跟随镜头旋转，远景以 0.2 倍微速轻移，营造出深邃的三维空间层次感。',
    remotionSnippet: `// Remotion: 2.5D 空间视差计算
const frame = useCurrentFrame();
// 镜头平移坐标
const cameraX = interpolate(frame, [0, 90], [0, 120]);

return (
  <div style={{ position: 'relative', overflow: 'hidden' }}>
    {/* 远景背景：低速率 0.2 */}
    <div style={{ transform: \`translateX(\${-cameraX * 0.2}px)\` }} />
    {/* 中景主体：标准速率 1.0 */}
    <div style={{ transform: \`translateX(\${-cameraX * 1.0}px)\` }} />
    {/* 前景光斑：高速率 1.6 + 景深模糊 */}
    <div style={{ transform: \`translateX(\${-cameraX * 1.6}px)\`, filter: 'blur(4px)' }} />
  </div>
);`,
    mathFormula: 'layerOffset_i = cameraX * depthCoefficient_i; (k_fg > k_mid > k_bg)',
    previewType: 'parallax-2-5d',
    tags: ['镜头', '视差', '空间感', '3D', '插画动效'],
    isPreset: true,
  },
  {
    id: 'scanline-crt-glitch',
    name: 'Scanline CRT Glitch',
    nameZh: '复古显像管扫描线与信号撕裂',
    aliases: ['CRT特效', '老电视扫描线', '信号干扰', 'VHS Glitch'],
    category: 'VFX_GLITCH',
    summary: '模拟老式阴极射线管电视屏幕的逐行扫描纹理、水平信号撕裂以及屏幕弯曲畸变。',
    description: '赛博朋克与复古未来主义（Retro-futurism）的核心视觉元素。通过生成半透明周期性水平线条（Scanlines）、模拟电子枪刷新滚屏（Rolling flicker）、屏幕四角桶形畸变（Barrel Distortion）以及随机横向位移撕裂，传达科技故障或怀旧录像带质感。',
    visualTraits: ['水平密集细微纹理', '周期性纵向滚屏', '边缘微向外微凸畸变', '偶发横切撕裂块'],
    aiPromptEn: 'Retro CRT monitor scanline glitch overlay, authentic cathode ray tube scanlines, phosphor glow bloom, subtle barrel screen curvature distortion, intermittent horizontal signal sync tears, aesthetic cyberpunk terminal feed, 80s synthwave vibe.',
    aiPromptZh: '复古 CRT 显像管与信号撕裂特效：高密度细密水平扫描线缓缓向下滚屏，文字边缘泛着磷光绿与青色辉光，伴随每秒随机发生的横向信号撕裂跳跃与轻微桶形畸变，呈现出硬核复古终端的科技故障美感。',
    remotionSnippet: `// Remotion: CRT 扫描线与随机跳线
const frame = useCurrentFrame();
const scanlineOffset = (frame * 2) % 8; // 扫描线向下匀速流动
const isGlitching = (frame % 45 > 42); // 每隔 45 帧闪烁撕裂 3 帧
const tearOffset = isGlitching ? (Math.random() - 0.5) * 16 : 0;

return (
  <div style={{
    position: 'relative',
    transform: \`translateX(\${tearOffset}px)\`,
    backgroundImage: \`repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, transparent 2px, transparent 4px)\`,
    backgroundPosition: \`0px \${scanlineOffset}px\`,
  }}>
    {/* 画面主体 */}
  </div>
);`,
    mathFormula: 'scanlineY = (t * speed) % pitch; tearOffset = isGlitch ? random(-A, A) : 0',
    previewType: 'scanline-crt-glitch',
    tags: ['VFX', 'CRT', '扫描线', '复古', '赛博朋克'],
    isPreset: true,
  },
  {
    id: 'squash-and-stretch',
    name: 'Squash and Stretch',
    nameZh: '挤压与拉伸弹性形变',
    aliases: ['果冻形变', '皮球弹跳', '体积守恒形变', 'Elastic Deform'],
    category: 'PHYSICS',
    summary: '物体在撞击或急加速时产生压扁或拉长变形，但总体视觉体积保持恒定。',
    description: '动画十二原则之首。当物体下落触地时，高度压缩（Squash），宽度相应膨胀以维持体积守恒；起跳加速或高速冲刺时，沿运动轴线拉长（Stretch）。赋予UI元素或编程式图形如水滴、果冻、软糖般的真实柔韧生命力。',
    visualTraits: ['速度越快拉伸越长', '碰撞瞬间急剧扁平', '体积守恒反向补偿', '生动活泼的有机感'],
    aiPromptEn: 'Fluid squash and stretch animation principles applied to a vibrant geometric shape. Dynamic bounce with pronounced elongation during rapid downward fall, squashing flat on impact surface with width expansion to preserve volume, springing back into original shape with organic elasticity.',
    aiPromptZh: '经典挤压与拉伸（Squash & Stretch）动效：小球或卡片在急速下坠时沿 Y 轴显著拉长拉细，接触底面的瞬间猛烈被压扁并向两侧撑开（保持视觉体积守恒），随后如同超级弹力球般急速反弹回弹，质感极具生命力。',
    remotionSnippet: `// Remotion: 挤压与拉伸体积守恒
const frame = useCurrentFrame();
const cycle = frame % 40; // 40帧为一个弹跳周期

// 碰撞发生在第 20 帧
const isLanding = cycle >= 18 && cycle <= 22;
const squashY = isLanding ? 0.65 : 1.1; // 撞地压扁，下落拉伸
const stretchX = 1 / squashY; // 保持二维体积乘积等于 1

return (
  <div style={{
    transform: \`scale(\${stretchX}, \${squashY})\`,
    transformOrigin: 'bottom center', // 锚点定在底部便于触地形变
  }} />
);`,
    mathFormula: 'scaleX * scaleY = 1.0 (Volume Conservation Law)',
    previewType: 'squash-and-stretch',
    tags: ['物理法则', '动画原则', '弹性', '果冻', 'UI趣味动效'],
    isPreset: true,
  },
  {
    id: 'dolly-zoom',
    name: 'Dolly Zoom (Vertigo Effect / Trombone Shot)',
    nameZh: '滑动变焦 / 眩晕镜头',
    aliases: ['推轨变焦', '变焦推拉', '希区柯克变焦', 'Hitchcock Zoom'],
    category: 'CAMERA',
    summary: '摄影机向主体推进的同时逆向缩小焦距（或反之），使主体大小不变而背景透视急剧变形。',
    description: '希区柯克在电影《迷魂记》（Vertigo）中开创的经典摄影法。由于镜头物理移动与光学变焦同步逆向进行，画面前景主角的尺寸保持稳定，而背景的视场角（FOV）与透视景深产生强烈拉伸或压缩，常用于表现顿悟、震惊、恐慌或空间折叠感。',
    visualTraits: ['主体尺寸保持恒定', '背景空间急速扩张/压缩', '强烈的空间畸变眩晕', '戏剧性张力巅峰'],
    aiPromptEn: 'Classic cinematic vertigo dolly zoom (Hitchcock zoom effect). Camera physically moves forward while lens zooms out synchronously, keeping the foreground subject perfectly static in scale while the background dramatically warps, stretches and expands with surreal perspective depth, psychological thriller tone.',
    aiPromptZh: '希区柯克滑动变焦（Dolly Zoom / Vertigo Effect）：前景主体保持恒定大小不动，而背景在变焦与镜头推拉中急剧向外拉伸膨胀，空间透视产生令人震撼的纵深挤压畸变，带来强烈的情绪冲击力。',
    remotionSnippet: `// Remotion: 2D 模拟滑动变焦透视拉扯
const frame = useCurrentFrame();
const progress = interpolate(frame, [0, 60], [1, 2.5], {
  easing: Easing.bezier(0.4, 0, 0.2, 1),
});

// 主体尺寸通过逆向缩放保持视觉恒定
const subjectScale = 1; 
// 背景产生巨幅透视变化
const backgroundScale = progress;
const backgroundBlur = interpolate(frame, [0, 60], [0, 8]);

return (
  <div style={{ perspective: 1000, overflow: 'hidden' }}>
    <div style={{ transform: \`scale(\${backgroundScale})\`, filter: \`blur(\${backgroundBlur}px)\` }} />
    <div style={{ transform: \`scale(\${subjectScale})\` }} />
  </div>
);`,
    mathFormula: 'FOV_bg(t) ~ 1/dist(t); Subject_Scale(t) = const',
    previewType: 'dolly-zoom',
    tags: ['镜头', '变焦', '心理震撼', '电影级', '透视畸变'],
    isPreset: true,
  },
  {
    id: 'magnetic-pull',
    name: 'Magnetic Pull (Cursor Gravity)',
    nameZh: '磁力吸附与光标重力感应',
    aliases: ['磁吸按钮', '光标引力', '重力跟随', 'Magnetic Button'],
    category: 'MICRO_INTERACTION',
    summary: '光标靠近可交互元素时，元素像被磁铁吸引般主动偏移朝向光标，离开后弹性归位。',
    description: '现代高端前端网页设计（如 Awwwards、Linear、Apple 风格）必备的精致微动效。当鼠标进入元素的触发半径（Trigger Radius）后，元素以非线性衰减的阻尼力跟随光标位移一小段距离，并在鼠标移出时伴随微妙的弹簧振荡恢复原位，极大增加点击欲望。',
    visualTraits: ['感应范围触发', '平滑非线性向心力', '弹簧阻尼归位', '提升交互触感'],
    aiPromptEn: 'Sleek interactive magnetic button pull micro-interaction. Minimalist button element smoothly morphs and gets gravitationally pulled towards the moving cursor within its proximity field, snapping back with subtle spring physics damping when released, Apple-tier refined UI tactile feedback.',
    aiPromptZh: '现代精致磁力吸附按钮微动效：鼠标指针滑过按钮附近时，按钮呈现出强烈的物理引力，平滑向鼠标偏转吸附并伴随微弱高光流动；鼠标离开感应区瞬间，按钮如橡皮筋般富有弹性地回弹归位。',
    remotionSnippet: `// Remotion / Framer Motion: 磁吸物理模拟
// 基于距离的反向位移比例算法
const maxDistance = 80; // 触发半径
const pullStrength = 0.35; // 吸附力度系数

const dx = mouseX - elementCenterX;
const dy = mouseY - elementCenterY;
const dist = Math.hypot(dx, dy);

const pullX = dist < maxDistance ? dx * pullStrength : 0;
const pullY = dist < maxDistance ? dy * pullStrength : 0;`,
    mathFormula: 'offset = distance < R ? delta * strength * (1 - distance/R) : 0',
    previewType: 'magnetic-pull',
    tags: ['微交互', '前端动效', 'FramerMotion', '高端UI', '触感反馈'],
    isPreset: true,
  },
  {
    id: 'particle-confetti-burst',
    name: 'Particle Confetti Burst',
    nameZh: '彩屑喷涌与粒子爆发',
    aliases: ['彩花爆炸', '庆祝粒子', '烟花迸发', 'Confetti Cannon'],
    category: 'PARTICLES_LIGHT',
    summary: '大量细小多色粒子以初速度从中心向四周喷射爆发，并受重力、空气阻力与旋转阻尼飘落。',
    description: '成就达成、通关升级、打卡成功时不可或缺的正向情感激励动效。粒子生成时赋予随机角度、初始线速度与自转角速度，随后在重力加速度 `g` 和空气阻力下呈抛物线散落。在 Remotion 中可使用 Canvas 或轻量 SVG 矩阵批处理渲染。',
    visualTraits: ['多角度向外爆炸', '速度随机分散', '重力加速度下坠', '多轴翻滚飘零'],
    aiPromptEn: 'Celebratory particle confetti burst explosion from central origin. Dozens of colorful metallic geometric flakes launch outward with high initial velocity, fluttering and spinning through 3D space with natural gravity and wind resistance, shimmering lighting highlights, festive euphoria.',
    aiPromptZh: '高燃庆祝彩屑爆炸粒子动效：无数五彩斑斓的微小金属几何薄片从屏幕中心向外呈锥形或圆形瞬间喷发爆发，薄片在空气中一边自转翻滚一边在重力作用下优美下落飘散，光泽闪烁，充满胜利与喜悦感。',
    remotionSnippet: `// Remotion: 物理粒子轨迹模拟 (Particle Motion)
const frame = useCurrentFrame();
const GRAVITY = 0.45;
const DRAG = 0.98;

// 每个粒子根据种子计算：
// x(t) = v0_x * (1 - DRAG^t)
// y(t) = v0_y * t + 0.5 * GRAVITY * t^2
// rot(t) = rot0 + omega * t`,
    mathFormula: 'y(t) = v0_y * t + 0.5 * g * t^2; v_x(t+1) = v_x(t) * drag',
    previewType: 'particle-confetti',
    tags: ['粒子', '光效', '庆祝', 'Canvas', '视觉高潮'],
    isPreset: true,
  },
  {
    id: 'rolling-counter',
    name: 'Rolling Counter (Odometer / Ticker)',
    nameZh: '数字翻牌器 / 轮盘滚动计数',
    aliases: ['数字滚动', '数据跳动', '里程表滚动', 'Number Ticker'],
    category: 'TYPOGRAPHY',
    summary: '数值变化时，每一位数字如机械轮盘或里程表般纵向飞速滚动并在目标数值减速对齐。',
    description: '常见于财务数据展示、倒计时破千、粉丝破万或战力飙升等视频场景。个位、十位、百位等各数位拥有独立的纵向位移通道，高位数字伴随低位的进位产生级联驱动，并在接近终点时使用指数减速（Ease Out Expo）精准卡位。',
    visualTraits: ['纵向数字序列滚动', '多位数独立缓动', '进位级联节奏', '机械质感与精准度'],
    aiPromptEn: 'Digital rolling counter number ticker animation. Digits rapidly spin vertically like an analog mechanical odometer, smoothly decelerating and clicking into position one by one from left to right, neon numbers on dark slate backdrop, high accuracy fintech aesthetic.',
    aiPromptZh: '现代金融科技数字轮盘滚动计数器：数字从 0 像机械里程表般纵向极速飞滚跳动，个十百千万各数位错落减速定格，伴随清脆微小的机械步进卡位感，数字边缘带有轻微运动模糊，视觉极其严谨酷炫。',
    remotionSnippet: `// Remotion: 数字滚动插值
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const targetValue = 98420;
const current = interpolate(frame, [0, 60], [0, targetValue], {
  easing: Easing.out(Easing.exp),
  extrapolateRight: 'clamp',
});

const formatted = Math.floor(current).toLocaleString();
return <div className="font-mono text-5xl">{formatted}</div>;`,
    mathFormula: 'val(t) = start + (target - start) * (1 - 2^(-10 * t))',
    previewType: 'rolling-counter',
    tags: ['排版', '数据可视化', '计数器', 'Fintech', '信息图表'],
    isPreset: true,
  },
  {
    id: 'skeleton-shimmer-wave',
    name: 'Skeleton Shimmer Wave',
    nameZh: '骨架屏高光流光扫射',
    aliases: ['骨架屏波纹', '流光扫描', 'Shimmer Loading', 'Glow Wave'],
    category: 'MICRO_INTERACTION',
    summary: '一道柔和的高光渐变光束在灰色占位骨架元素上匀速斜向划过，制造平滑的呼吸等待感。',
    description: '现代 UI 加载等待状态的标准设计语言（Facebook/YouTube 首创）。通过一个带有 15~30 度夹角的半透明白色到透明的线性渐变（Linear Gradient），沿着元素水平轴从 -100% 匀速位移至 +200%，给原本死板的占位色块注入持续运动感。',
    visualTraits: ['斜角高光流带', '周期性平滑循环', '柔和半透明衰减', '高级优雅的等待感'],
    aiPromptEn: 'Clean UI skeleton loader shimmer animation. Diagonal soft light beam wave continuously sweeps across sleek rounded placeholder rectangles, elegant smooth gradient translation, subtle luminescent sheen on dark mode interface, seamless infinite loop.',
    aiPromptZh: '极简暗黑风格骨架屏流光扫射动效：一道 30 度倾斜的高柔光渐变波浪，匀速、循环地从左至右穿过圆角矩形占位块，光影流转顺滑细腻，给加载等待状态赋予极度高级舒适的科技呼吸感。',
    remotionSnippet: `// Remotion / CSS: 骨架屏流光
const frame = useCurrentFrame();
const offset = (frame % 45) / 45; // 45 帧一个周期
const posX = interpolate(offset, [0, 1], [-100, 200]);

return (
  <div style={{
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#1f2937',
  }}>
    <div style={{
      position: 'absolute',
      inset: 0,
      transform: \`translateX(\${posX}%)\`,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
    }} />
  </div>
);`,
    mathFormula: 'translateX = mod(t, T) / T * (W + 2*bandWidth) - bandWidth',
    previewType: 'skeleton-shimmer',
    tags: ['微交互', '加载态', '骨架屏', '流光', 'UI设计'],
    isPreset: true,
  },
  {
    id: 'ripple-wave-burst',
    name: 'Ripple Wave Distortion',
    nameZh: '中心水波纹涟漪扩散',
    aliases: ['波纹扩散', '冲击波光环', 'Shockwave Ripple', 'Water Droplet'],
    category: 'VFX_GLITCH',
    summary: '以触发点为同心圆心，一道或多道环形波纹伴随透明度衰减与半径急剧扩张向外推散。',
    description: 'Material Design 经典的点击反馈，或是科幻电影中能量盾被击中、重物落水时的物理扩散。波纹起始时边缘清晰饱满，随着半径向外以平方根减速或线性扩张，边框逐渐变细、透明度呈指数衰减直至融入背景。',
    visualTraits: ['同心圆向外扩散', '边缘由厚变薄', '透明度渐进消隐', '水体/能量环物理感'],
    aiPromptEn: 'Expanding shockwave ripple burst effect centered on impact point. Concentric translucent geometric wave rings rapidly propagate outward, thinning out with smooth opacity decay and subtle lens refraction distortion, energetic liquid impact aura.',
    aiPromptZh: '中心冲击波涟漪扩散动效：由点击或碰撞中心发出一道纯净的光环波纹，以极高初速度向外炸开，半径由小至大扩散，光环线条在扩散中逐渐变细并羽化消融在背景中，如水滴激起涟漪般轻灵纯净。',
    remotionSnippet: `// Remotion: 涟漪扩散
const frame = useCurrentFrame();
const progress = interpolate(frame % 30, [0, 30], [0, 1], {
  easing: Easing.out(Easing.quad),
});

const scale = interpolate(progress, [0, 1], [0.1, 2.5]);
const opacity = interpolate(progress, [0, 0.7, 1], [0.9, 0.4, 0]);

return (
  <div style={{
    width: 80,
    height: 80,
    borderRadius: '50%',
    border: '2px solid #38bdf8',
    transform: \`scale(\${scale})\`,
    opacity,
  }} />
);`,
    mathFormula: 'r(t) = R_max * (1 - (1-t/T)^2); alpha(t) = (1 - t/T)^1.5',
    previewType: 'ripple-wave',
    tags: ['微交互', 'VFX', '冲击波', '波纹', '点击反馈'],
    isPreset: true,
  },
  {
    id: 'camera-shake-noise',
    name: 'Camera Shake (Perlin / Fractal Noise)',
    nameZh: '手持摄影微晃与镜头震颤',
    aliases: ['镜头微晃', '打击震颤', '手持感', 'Screen Shake'],
    category: 'CAMERA',
    summary: '模拟真实人类手持摄影机的自然呼吸微动，或在重力击打瞬间施加高频随机衰减震荡。',
    description: '完全静止的数码虚拟镜头往往给人死板、廉价的 CG 感。引入基于柏林噪声（Perlin Noise）或阻尼简谐振动的轻微晃动，能赋予画面自然的人工生命感；而在重击发生时，施加 6~12 帧的高频衰减震颤，是产生震撼打击感（Game Feel / Screen Juice）的灵魂。',
    visualTraits: ['高频向低频衰减', '非机械式随机震荡', '呼吸般的有机手持感', '瞬间加倍冲击感'],
    aiPromptEn: 'Subtle handheld camera shake and organic breathing motion. Gentle continuous float with natural human imperfections, punctuated by an intense momentary screen vibration impact jolt that rapidly damps out, cinematic documentary immersion, raw camera movement.',
    aiPromptZh: '真实手持摄影微晃与冲击震颤：画面平时带有细微自然的有机呼吸起伏（手持感），在打击瞬间产生高频剧烈震颤（振幅在 8 帧内呈指数衰减），瞬间点燃画面的紧张感与重量感。',
    remotionSnippet: `// Remotion: 手持微晃与打击震颤
const frame = useCurrentFrame();
// 1. 常规低频手持呼吸晃动
const idleX = Math.sin(frame * 0.05) * 4 + Math.cos(frame * 0.08) * 3;
const idleY = Math.cos(frame * 0.06) * 4;

// 2. 击打震颤（第 30 帧）
const hitDelta = frame - 30;
const hitShake = (hitDelta >= 0 && hitDelta < 15)
  ? Math.sin(hitDelta * 2.2) * (15 - hitDelta) * 1.5
  : 0;

return (
  <div style={{
    transform: \`translate(\${idleX + hitShake}px, \${idleY + hitShake * 0.7}px)\`,
  }}>
    {/* 画面 */}
  </div>
);`,
    mathFormula: 'offset(t) = noise(t*freq) * A_idle + A_hit * sin(omega*t) * e^(-gamma*t)',
    previewType: 'camera-shake',
    tags: ['镜头', '震颤', '手持感', '打击感', '拟真摄影'],
    isPreset: true,
  },
];

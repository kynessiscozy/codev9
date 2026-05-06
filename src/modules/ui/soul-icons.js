/**
 * 武魂贴图图标系统
 * 使用图片资源替代内联SVG，支持品质特效
 * 图片存放于 public/souls/{quality}/{name}.webp 或 .png
 */

// ═══════════════════════════════════════════════
// 武魂图标数据 - 贴图模式
// key: 武魂名称
// value: { img: 相对路径, theme: 主题 }
// ═══════════════════════════════════════════════

export const SOUL_ICONS = {
  // ── 普通 (common) ──
  "蓝银草":    { img: "/souls/common/蓝银草.webp",    theme: "grass" },
  "镰刀":      { img: "/souls/common/镰刀.webp",      theme: "metal" },
  "香草":      { img: "/souls/common/香草.webp",      theme: "nature" },
  "木棍":      { img: "/souls/common/木棍.webp",      theme: "wood" },
  "含羞草":    { img: "/souls/common/含羞草.webp",    theme: "grass" },
  "铁锤":      { img: "/souls/common/铁锤.webp",      theme: "metal" },
  "渔网":      { img: "/souls/common/渔网.webp",      theme: "water" },
  "蒲公英":    { img: "/souls/common/蒲公英.webp",    theme: "wind" },
  "芦苇杆":    { img: "/souls/common/芦苇杆.webp",    theme: "water" },
  "铁锅":      { img: "/souls/common/铁锅.webp",      theme: "metal" },
  "荆棘藤":    { img: "/souls/common/荆棘藤.webp",    theme: "grass" },
  "石头":      { img: "/souls/common/石头.webp",      theme: "earth" },
  "陶笛":      { img: "/souls/common/陶笛.webp",      theme: "wind" },

  // ── 稀有 (rare) ──
  "白虎":        { img: "/souls/rare/白虎.webp",        theme: "beast" },
  "火凤凰":      { img: "/souls/rare/火凤凰.webp",      theme: "fire" },
  "冰凤凰":      { img: "/souls/rare/冰凤凰.webp",      theme: "ice" },
  "盘龙棍":      { img: "/souls/rare/盘龙棍.webp",      theme: "dragon" },
  "七宝琉璃塔":  { img: "/souls/rare/七宝琉璃塔.webp",  theme: "holy" },
  "幽冥灵猫":    { img: "/souls/rare/幽冥灵猫.webp",    theme: "dark" },
  "碧磷蛇皇":    { img: "/souls/rare/碧磷蛇皇.webp",    theme: "poison" },
  "金龙爪":      { img: "/souls/rare/金龙爪.webp",      theme: "dragon" },
  "朱雀圣火":    { img: "/souls/rare/朱雀圣火.webp",    theme: "fire" },
  "玄武神盾":    { img: "/souls/rare/玄武神盾.webp",    theme: "water" },
  "白鹤翎羽":    { img: "/souls/rare/白鹤翎羽.webp",    theme: "wind" },
  "青龙护卫":    { img: "/souls/rare/青龙护卫.webp",    theme: "dragon" },
  "冰火蛟龙":    { img: "/souls/rare/冰火蛟龙.webp",    theme: "dragon" },
  "雷电狼王":    { img: "/souls/rare/雷电狼王.webp",    theme: "thunder" },
  "幽灵蝶":      { img: "/souls/rare/幽灵蝶.webp",      theme: "dark" },
  "赤炎狮王":    { img: "/souls/rare/赤炎狮王.webp",    theme: "fire" },
  "碧海银鲸":    { img: "/souls/rare/碧海银鲸.webp",    theme: "water" },
  "紫电金鹰":    { img: "/souls/rare/紫电金鹰.webp",    theme: "thunder" },
  "幽影黑豹":    { img: "/souls/rare/幽影黑豹.webp",    theme: "dark" },
  "碎星陨铁":    { img: "/souls/rare/碎星陨铁.webp",    theme: "metal" },

  // ── 史诗 (epic) ──
  "蓝电霸王龙":  { img: "/souls/epic/蓝电霸王龙.webp",  theme: "thunder" },
  "昊天锤":      { img: "/souls/epic/昊天锤.webp",      theme: "metal" },
  "六翼天使":    { img: "/souls/epic/六翼天使.webp",    theme: "holy" },
  "泰坦巨猿":    { img: "/souls/epic/泰坦巨猿.webp",    theme: "beast" },
  "噬魂蛛皇":    { img: "/souls/epic/噬魂蛛皇.webp",    theme: "dark" },
  "死亡蛛皇":    { img: "/souls/epic/死亡蛛皇.webp",    theme: "dark" },
  "冰碧帝皇蝎":  { img: "/souls/epic/冰碧帝皇蝎.webp",  theme: "ice" },
  "烈火剑圣":    { img: "/souls/epic/烈火剑圣.webp",    theme: "fire" },
  "星辰神兽":    { img: "/souls/epic/星辰神兽.webp",    theme: "holy" },
  "雷霆战神":    { img: "/souls/epic/雷霆战神.webp",    theme: "thunder" },
  "极寒冰皇":    { img: "/souls/epic/极寒冰皇.webp",    theme: "ice" },
  "焰灵骑士":    { img: "/souls/epic/焰灵骑士.webp",    theme: "fire" },
  "黄金圣龙":    { img: "/souls/epic/黄金圣龙.webp",    theme: "dragon" },
  "狂风战鹰":    { img: "/souls/epic/狂风战鹰.webp",    theme: "wind" },
  "暗域鬼王":    { img: "/souls/epic/暗域鬼王.webp",    theme: "dark" },
  "极焱炎神":    { img: "/souls/epic/极焱炎神.webp",    theme: "fire" },
  "时沙巨蟒":    { img: "/souls/epic/时沙巨蟒.webp",    theme: "poison" },

  // ── 传说 (legend) ──
  "九宝琉璃塔":  { img: "/souls/legend/九宝琉璃塔.webp",  theme: "holy" },
  "蓝银皇":      { img: "/souls/legend/蓝银皇.webp",      theme: "grass" },
  "堕落天使":    { img: "/souls/legend/堕落天使.webp",    theme: "dark" },
  "极品火凤凰":  { img: "/souls/legend/极品火凤凰.webp",  theme: "fire" },
  "金龙王":      { img: "/souls/legend/金龙王.webp",      theme: "dragon" },
  "七杀剑":      { img: "/souls/legend/七杀剑.webp",      theme: "metal" },
  "雷灵王":      { img: "/souls/legend/雷灵王.webp",      theme: "thunder" },
  "星宿命盘":    { img: "/souls/legend/星宿命盘.webp",    theme: "holy" },
  "幽冥神眼":    { img: "/souls/legend/幽冥神眼.webp",    theme: "dark" },
  "混沌之翼":    { img: "/souls/legend/混沌之翼.webp",    theme: "dark" },
  "天罚神雷":    { img: "/souls/legend/天罚神雷.webp",    theme: "thunder" },
  "永恒冰魂":    { img: "/souls/legend/永恒冰魂.webp",    theme: "ice" },
  "炎狱魔神":    { img: "/souls/legend/炎狱魔神.webp",    theme: "fire" },
  "天命神弓":    { img: "/souls/legend/天命神弓.webp",    theme: "holy" },
  "混沌剑魂":    { img: "/souls/legend/混沌剑魂.webp",    theme: "dark" },

  // ── 神话/巅峰 (apex) ──
  "神圣天使":    { img: "/souls/apex/神圣天使.webp",    theme: "holy" },
  "柔骨兔王":    { img: "/souls/apex/柔骨兔王.webp",    theme: "holy" },
  "混沌属性":    { img: "/souls/apex/混沌属性.webp",    theme: "dark" },
  "宇宙之源":    { img: "/souls/apex/宇宙之源.webp",    theme: "holy" },
  "时空裂缝":    { img: "/souls/apex/时空裂缝.webp",    theme: "dark" },
  "虚无之主":    { img: "/souls/apex/虚无之主.webp",    theme: "dark" },
  "因果律者":    { img: "/souls/apex/因果律者.webp",    theme: "holy" },
  "神格化身":    { img: "/souls/apex/神格化身.webp",    theme: "holy" },

  // ── 混沌/隐藏 (hc) ──
  "如意环":      { img: "/souls/hc/如意环.webp",      theme: "dark" },
  "幽冥之眼":    { img: "/souls/hc/幽冥之眼.webp",    theme: "dark" },
  "九心海棠":    { img: "/souls/hc/九心海棠.webp",    theme: "holy" },
  "奇茸通天菊":  { img: "/souls/hc/奇茸通天菊.webp",  theme: "nature" },
  "无形剑意":    { img: "/souls/hc/无形剑意.webp",    theme: "metal" },
  "千机算盘":    { img: "/souls/hc/千机算盘.webp",    theme: "holy" },
  "月影神狐":    { img: "/souls/hc/月影神狐.webp",    theme: "dark" },
  "幽莲血心":    { img: "/souls/hc/幽莲血心.webp",    theme: "dark" },

  // ── 幻境/绝世 (ha) ──
  "昊天九绝锤":  { img: "/souls/ha/昊天九绝锤.webp",  theme: "metal" },
  "饕餮神牛":    { img: "/souls/ha/饕餮神牛.webp",    theme: "beast" },
  "死神镰刀":    { img: "/souls/ha/死神镰刀.webp",    theme: "dark" },
  "虚空裂爪":    { img: "/souls/ha/虚空裂爪.webp",    theme: "dark" },
  "天魔琴":      { img: "/souls/ha/天魔琴.webp",      theme: "dark" },
  "混沌神炉":    { img: "/souls/ha/混沌神炉.webp",    theme: "fire" },

  // ── 双生 (twin) ──
  "蓝银草+昊天锤":  { img: "/souls/twin/蓝银草+昊天锤.webp",  theme: "grass" },
  "圣天使+堕天使":  { img: "/souls/twin/圣天使+堕天使.webp",  theme: "holy" },
  "金龙+银龙":      { img: "/souls/twin/金龙+银龙.webp",      theme: "dragon" },
  "冰火双凤":      { img: "/souls/twin/冰火双凤.webp",      theme: "fire" },
  "雷剑双生":      { img: "/souls/twin/雷剑双生.webp",      theme: "thunder" },
  "星辰+混沌":      { img: "/souls/twin/星辰+混沌.webp",      theme: "dark" },
  "幽冥+圣光":      { img: "/souls/twin/幽冥+圣光.webp",      theme: "dark" },
  "时间+空间":      { img: "/souls/twin/时间+空间.webp",      theme: "dark" },
  "神火+神冰":      { img: "/souls/twin/神火+神冰.webp",      theme: "fire" },

  // ── 三生 (triple) ──
  "冰火雷三生龙":        { img: "/souls/triple/冰火雷三生龙.webp",        theme: "dragon" },
  "昊天极光混沌三生":    { img: "/souls/triple/昊天极光混沌三生.webp",    theme: "dark" },
  "神圣幽冥混沌三生":    { img: "/souls/triple/神圣幽冥混沌三生.webp",    theme: "holy" },
  "时空因果三生":        { img: "/souls/triple/时空因果三生.webp",        theme: "dark" },

  // ── 神祇 (god) ──
  "海神武魂":    { img: "/souls/god/海神武魂.webp",    theme: "water" },
  "天使神":      { img: "/souls/god/天使神.webp",      theme: "holy" },
  "修罗神":      { img: "/souls/god/修罗神.webp",      theme: "dark" },
};

// ═══════════════════════════════════════════════
// 品质 → glow 颜色映射（用于默认占位图）
// ═══════════════════════════════════════════════

const QUALITY_COLORS = {
  common: "#9ca3af",
  rare:   "#3b82f6",
  epic:   "#a855f7",
  legend: "#f59e0b",
  mythic: "#ef4444",
  peak:   "#ec4899",
  chaos:  "#8b5cf6",
  god:    "#fbbf24",
  triple: "#06b6d4",
};

// ═══════════════════════════════════════════════
// 主题映射（保持与原 CSS data-theme 兼容）
// ═══════════════════════════════════════════════

const THEME_MAP = {
  grass:   "grass",
  metal:   "dragon",
  nature:  "grass",
  wood:    "grass",
  water:   "ice",
  wind:    "thunder",
  earth:   "dragon",
  beast:   "dragon",
  fire:    "fire",
  ice:     "ice",
  dragon:  "dragon",
  holy:    "holy",
  dark:    "dark",
  poison:  "dark",
  thunder: "thunder",
};

/**
 * 根据武魂名称获取图标 HTML
 * 返回 <img> 标签（贴图模式），保持与原 SVG 接口完全兼容
 * @param {string} soulName - 武魂名称
 * @param {string} quality - 品质
 * @param {Object} options - 选项
 * @param {number} options.size - 图标大小
 * @param {boolean} options.animated - 是否启用动画
 * @param {string} options.sizeClass - 尺寸类名
 * @returns {string} HTML字符串（img标签）
 */
export function getSoulIcon(soulName, quality = "common", options = {}) {
  const { animated = true, sizeClass = "", priority = false } = options;
  const iconData = SOUL_ICONS[soulName];

  if (!iconData) {
    return createDefaultIcon(soulName, quality);
  }

  const qualityClass = `quality-${quality}`;
  const animClass = animated ? "soul-icon-animated" : "";
  const szClass = sizeClass || "";
  const cssTheme = THEME_MAP[iconData.theme] || iconData.theme || "";
  const baseUrl = import.meta.env.BASE_URL || '/';
  const imgSrc = baseUrl.replace(/\/+$/, '') + iconData.img;

  const className = `soul-icon ${qualityClass} ${animClass} ${szClass}`.trim();
  const themeAttr = cssTheme ? ` data-theme="${cssTheme}"` : "";
  const fetchPriorityAttr = priority ? ` fetchpriority="high"` : "";
  const fallbackSVG = createFallbackSVG(soulName, quality);
  return `<img class="${className}"`
    + ` src="${imgSrc}"`
    + ` alt="${soulName}"`
    + themeAttr
    + fetchPriorityAttr
    + ` draggable="false"`
    + ` loading="lazy"`
    + ` decoding="async"`
    + ` onerror="this.style.display='none';this.insertAdjacentHTML('afterend','${fallbackSVG}')">`;
}

/**
 * 创建默认占位图标（图片加载失败时使用）
 * @param {string} soulName - 武魂名称
 * @param {string} quality - 品质
 * @returns {string} SVG HTML字符串
 */
function createDefaultIcon(soulName, quality = "common") {
  const color = QUALITY_COLORS[quality] || QUALITY_COLORS.common;
  const firstChar = soulName ? soulName[0] : "?";
  const inner = `<circle cx="32" cy="32" r="28" fill="none" stroke="${color}" stroke-width="2" opacity="0.4"/>`
    + `<text x="32" y="38" text-anchor="middle" font-size="18" fill="${color}" font-family="sans-serif" opacity="0.7">${firstChar}</text>`;
  return `<svg class="soul-icon quality-${quality}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

/**
 * 图片加载失败时的回退 SVG（内联 onerror 使用）
 */
function createFallbackSVG(soulName, quality) {
  const color = QUALITY_COLORS[quality] || QUALITY_COLORS.common;
  const firstChar = soulName ? soulName[0] : "?";
  const escaped = firstChar.replace(/'/g, "\\'");
  return `<svg class=\\'soul-icon quality-${quality}\\' viewBox=\\'0 0 64 64\\' xmlns=\\'http://www.w3.org/2000/svg\\'>`
    + `<circle cx=\\'32\\' cy=\\'32\\' r=\\'28\\' fill=\\'none\\' stroke=\\'${color}\\' stroke-width=\\'2\\' opacity=\\'0.4\\'/>`
    + `<text x=\\'32\\' y=\\'38\\' text-anchor=\\'middle\\' font-size=\\'18\\' fill=\\'${color}\\' font-family=\\'sans-serif\\' opacity=\\'0.7\\'>${escaped}</text></svg>`;
}

/**
 * 获取武魂主题
 * @param {string} soulName - 武魂名称
 * @returns {string} 主题名称
 */
export function getSoulTheme(soulName) {
  const iconData = SOUL_ICONS[soulName];
  if (!iconData) return "";
  return THEME_MAP[iconData.theme] || iconData.theme || "";
}

/**
 * 检查武魂是否有图标
 * @param {string} soulName - 武魂名称
 * @returns {boolean} 是否有图标
 */
export function hasSoulIcon(soulName) {
  return !!SOUL_ICONS[soulName];
}

/**
 * 注册新的武魂图标
 * @param {string} soulName - 武魂名称
 * @param {Object} iconData - 图标数据 { svg: string, theme?: string }
 */
export function registerSoulIcon(soulName, iconData) {
  if (!soulName || !iconData || !iconData.svg) {
    console.warn('[SoulIcons] 注册图标失败：参数无效', soulName, iconData);
    return;
  }
  SOUL_ICONS[soulName] = iconData;
}

/**
 * 预加载所有武魂图标
 * 在应用初始化时调用，将图标缓存到浏览器
 * @param {string[]} soulNames - 要预加载的武魂名称数组，默认加载所有
 */
export function preloadSoulIcons(soulNames = null) {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const iconsToPreload = soulNames
    ? soulNames.filter(name => SOUL_ICONS[name])
    : Object.keys(SOUL_ICONS);

  console.log(`[SoulIcons] 开始预加载 ${iconsToPreload.length} 个图标...`);

  iconsToPreload.forEach(soulName => {
    const iconData = SOUL_ICONS[soulName];
    if (!iconData || !iconData.img) return;

    const img = new Image();
    img.fetchPriority = "low";
    img.src = baseUrl.replace(/\/+$/, '') + iconData.img;

    img.onload = () => {
      console.log(`[SoulIcons] 已加载: ${soulName}`);
    };
    img.onerror = () => {
      console.warn(`[SoulIcons] 加载失败: ${soulName}`);
    };
  });
}

/**
 * 分批次预加载武魂图标（优先级由高到低）
 * 高频武魂先加载，其余在空闲时加载
 */
export function preloadCommonSoulIcons() {
  // ── 第一梯队：核心/高频武魂（觉醒 + 主流品质）立即加载 ──
  const tier1 = [
    '蓝银草', '昊天锤', '白虎', '火凤凰', '七宝琉璃塔',
    '蓝电霸王龙', '六翼天使', '泰坦巨猿', '九宝琉璃塔', '蓝银皇',
    // 神祇品质
    '海神武魂', '天使神', '修罗神',
    // 混沌/隐藏 - 常见
    '幽莲血心', '月影神狐', '如意环',
    // 幻境/绝世
    '昊天九绝锤', '死神镰刀',
  ];

  // ── 第二梯队：中频武魂（请求空闲时加载） ──
  const tier2 = [
    '冰凤凰', '幽冥灵猫', '碧磷蛇皇', '金龙爪', '朱雀圣火',
    '玄武神盾', '白鹤翎羽', '青龙护卫', '冰火蛟龙', '雷电狼王',
    '幽灵蝶', '赤炎狮王', '碧海银鲸', '紫电金鹰', '幽影黑豹',
    '碎星陨铁', '盘龙棍',
    // 史诗
    '噬魂蛛皇', '死亡蛛皇', '冰碧帝皇蝎', '烈火剑圣',
    '星辰神兽', '雷霆战神', '极寒冰皇', '焰灵骑士',
    '黄金圣龙', '狂风战鹰', '暗域鬼王', '极焱炎神',
    // 传说
    '堕落天使', '极品火凤凰', '金龙王', '七杀剑', '雷灵王',
    '星宿命盘', '幽冥神眼', '混沌之翼', '天罚神雷', '永恒冰魂',
    '炎狱魔神', '天命神弓', '混沌剑魂',
    // 神话/巅峰
    '神圣天使', '柔骨兔王', '宇宙之源', '时空裂缝',
    '虚无之主', '因果律者', '神格化身',
    // 双生
    '蓝银草+昊天锤', '圣天使+堕天使', '金龙+银龙',
    '冰火双凤', '雷剑双生', '星辰+混沌',
    // 三生
    '冰火雷三生龙', '时空因果三生',
  ];

  // ── 第三梯队：低频武魂（requestIdleCallback 或 setTimeout 延迟加载） ──
  const tier3 = [
    '镰刀', '香草', '木棍', '含羞草', '铁锤', '渔网',
    '蒲公英', '芦苇杆', '铁锅', '荆棘藤', '石头', '陶笛',
    // 其他隐藏/绝世/双生/三生
    '幽冥之眼', '九心海棠', '奇茸通天菊', '无形剑意', '千机算盘',
    '饕餮神牛', '虚空裂爪', '天魔琴', '混沌神炉',
    '幽冥+圣光', '时间+空间', '神火+神冰',
    '昊天极光混沌三生', '神圣幽冥混沌三生',
    // 已被删除的epic图标
    '时沙巨蟒',
  ];

  // 立即加载第一梯队
  preloadSoulIcons(tier1);

  // setTimeout 延迟加载第二梯队（100ms后，不阻塞首屏）
  setTimeout(() => {
    preloadSoulIcons(tier2);
  }, 100);

  // requestIdleCallback 或 setTimeout 延迟加载第三梯队（1s后）
  const loadTier3 = () => preloadSoulIcons(tier3);
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(loadTier3, { timeout: 2000 });
  } else {
    setTimeout(loadTier3, 1000);
  }
}

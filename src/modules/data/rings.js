// ──── RING TIERS ────
// 魂环年限配置

export const RT = [
  {
    n: "百年",
    y: 100,
    c: "#a78bfa",
    pw: 80,
    sk: ["体质强化", "感知提升", "速度小幅提升", "防御加强"],
  },
  {
    n: "千年",
    y: 1000,
    c: "#60a5fa",
    pw: 200,
    sk: ["元素亲和", "属性共鸣", "魂力恢复", "感知扩展"],
  },
  {
    n: "万年",
    y: 10000,
    c: "#34d399",
    pw: 500,
    sk: ["领域破开", "属性变异", "精神力提升", "真实伤害"],
    attr: { spd: 15, atk: 20, def: 10 },
  },
  {
    n: "十万年",
    y: 100000,
    c: "#fbbf24",
    pw: 1200,
    sk: ["领域降临", "属性极化", "时间感知", "神通萌芽"],
    attr: { spd: 15, atk: 20, def: 10 },
  },
  {
    n: "百万年",
    y: 1000000,
    c: "#f87171",
    pw: 3500,
    sk: ["时空法则触碰", "神通降临", "属性逆转", "混沌感知"],
    attr: { spd: 30, atk: 50, def: 25, special: "魂力恢复+10/秒" },
  },
  {
    n: "不可估量",
    y: 999999999,
    c: "#e879f9",
    pw: 15000,
    sk: ["混沌法则", "空间撕裂", "时间停滞", "因果逆转"],
    attr: { spd: 80, atk: 200, def: 100, special: "攻击忽视防御30%" },
    mutateSkills: ["混沌裂空斩·质变", "因果逆转·质变", "虚空湮灭", "时间回溯·质变"],
  },
  {
    n: "神赐",
    y: 9999999999,
    c: "#fffbeb",
    pw: 50000,
    sk: ["神力灌注", "神赐领域", "超越肉体", "不死之身"],
    attr: { spd: 200, atk: 800, def: 400, special: "受到致死伤害时概率免疫" },
    special: true,
  },
  {
    n: "宇宙之核",
    y: 1e14,
    c: "#00ffff",
    pw: 999999,
    sk: ["宇宙意志", "规则掌控", "虚空创生", "你即宇宙"],
    attr: { spd: 9999, atk: 99999, def: 9999, special: "无视一切防御" },
    unique: true,
  },
];

// 根据年限获取魂环配置
export function getRingTier(years) {
  for (let i = RT.length - 1; i >= 0; i--) {
    if (years >= RT[i].y) return { ...RT[i], index: i };
  }
  return null;
}

// 根据索引获取魂环配置
export function getRingTierByIndex(index) {
  return RT[index] || null;
}

// 获取魂环年限名称
export function getRingYearName(years) {
  const tier = getRingTier(years);
  return tier ? tier.n : "未知";
}

// 获取魂环颜色
export function getRingColor(years) {
  const tier = getRingTier(years);
  return tier ? tier.c : "#9ca3af";
}

// 解析魂环字符串（如 "百万年"）
export function parseRingYear(yearStr) {
  const tier = RT.find((t) => t.n === yearStr);
  return tier ? tier.y : 100;
}

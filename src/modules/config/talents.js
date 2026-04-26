// ──── TALENT SYSTEM ────
// 封号斗罗天赋系统定义

export const TALENTS = [
  {
    id: "power",
    name: "破天",
    icon: "⚔️",
    col: "#ef4444",
    bgc: "rgba(239,68,68,.1)",
    tr: 239,
    tg: 68,
    tb: 68,
    desc: "以力破万法·攻击凌驾一切",
    stats: ["攻击力 ×1.3 (战力)", "魂技伤害 +30%", "暴击率 +20%"],
  },
  {
    id: "defense",
    name: "铁壁",
    icon: "🛡️",
    col: "#60a5fa",
    bgc: "rgba(96,165,250,.1)",
    tr: 96,
    tg: 165,
    tb: 250,
    desc: "以守破攻·坚不可摧",
    stats: ["战力 ×1.2", "受伤害 -30%", "血量 +100%"],
  },
  {
    id: "speed",
    name: "疾风",
    icon: "💨",
    col: "#34d399",
    bgc: "rgba(52,211,153,.1)",
    tr: 52,
    tg: 211,
    tb: 153,
    desc: "以快制慢·先手为王",
    stats: ["战力 ×1.15", "先手攻击率 +40%", "回避率 +15%"],
  },
  {
    id: "support",
    name: "调和",
    icon: "🌊",
    col: "#a78bfa",
    bgc: "rgba(167,139,250,.1)",
    tr: 167,
    tg: 139,
    tb: 250,
    desc: "持续积累·终以量取胜",
    stats: ["战力 ×1.1", "令牌上限 +2", "抽奖幸运 +30"],
  },
];

// 觉醒碎片成本
export const AWK_FRAG_COSTS = [0, 5, 10, 20, 35, 50, 75, 100, 150, 200, 300];

// 觉醒战力奖励
export const AWK_POWER_BONUS = [0, 200, 500, 1000, 2000, 4000, 8000, 15000, 25000, 40000, 60000];

// 觉醒特效描述
export const AWK_FX = [
  "",
  "轨道粒子增加",
  "+2条轨道环",
  "魂技特效增强",
  "暗光效果",
  "专属光晕",
  "发光增强",
  "极光特效",
  "粒子持续散发",
  "神级光轮",
  "∞ 极限形态",
];

// 获取天赋配置
export function getTalent(id) {
  return TALENTS.find((t) => t.id === id) || null;
}

// 获取觉醒特效描述
export function getAwkFx(level) {
  return AWK_FX[level] || "";
}

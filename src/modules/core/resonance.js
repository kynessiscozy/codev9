// ──── SOUL RESONANCE (v9) ────
// 武魂共鸣系统

import { QC, getQualityConfig } from "../config/quality.js";

// 共鸣配置：每种品质的碎片需求和等级奖励
export const RESONANCE_CFG = {
  common: { fragPerLevel: 5, maxLevel: 10, powerPerLevel: 80, bonusDesc: "基础魂力+80" },
  rare: { fragPerLevel: 5, maxLevel: 10, powerPerLevel: 200, bonusDesc: "稀有共鸣+200战力" },
  epic: { fragPerLevel: 4, maxLevel: 8, powerPerLevel: 500, bonusDesc: "史诗共鸣+500战力" },
  legend: { fragPerLevel: 3, maxLevel: 6, powerPerLevel: 1500, bonusDesc: "传说共鸣+1500战力" },
  apex: { fragPerLevel: 2, maxLevel: 4, powerPerLevel: 5000, bonusDesc: "顶级共鸣+5000战力" },
  hc: { fragPerLevel: 3, maxLevel: 5, powerPerLevel: 800, bonusDesc: "隐藏共鸣+800战力" },
  ha: { fragPerLevel: 2, maxLevel: 4, powerPerLevel: 2000, bonusDesc: "顶隐共鸣+2000战力" },
  twin: { fragPerLevel: 2, maxLevel: 3, powerPerLevel: 6000, bonusDesc: "双生共鸣+6000战力" },
  triple: { fragPerLevel: 1, maxLevel: 2, powerPerLevel: 20000, bonusDesc: "三生共鸣+20000战力" },
};

// 碎片来源说明
export const FRAGMENT_SOURCES = [
  { icon: "⚡", label: "觉醒/二次觉醒", desc: "每次觉醒获得当前品质碎片×1" },
  { icon: "🔮", label: "狩猎掉落", desc: "每次狩猎有概率掉落低~高阶碎片" },
  { icon: "💍", label: "装配魂环", desc: "装配百万年以上魂环可获得碎片" },
  { icon: "🌟", label: "星运抽取", desc: "抽到百万年以上魂环时额外获得碎片" },
  { icon: "📋", label: "任务完成", desc: "特定任务完成奖励武魂碎片" },
  { icon: "🌐", label: "异界副本", desc: "通关精英/BOSS关卡随机掉落碎片" },
];

// 计算共鸣总战力
export function calcResonancePower() {
  if (typeof G === "undefined") return 0;
  if (!G.soulFragments || !G.soulResonance) return 0;

  let total = 0;
  Object.entries(G.soulFragments).forEach(([q, count]) => {
    const cfg = RESONANCE_CFG[q];
    if (!cfg) return;
    const lv = Math.min(cfg.maxLevel, Math.floor(count / cfg.fragPerLevel));
    total += lv * cfg.powerPerLevel;
  });
  return total;
}

// 添加武魂碎片
export function addSoulFragment(quality, count = 1) {
  if (typeof G === "undefined") return;

  if (!G.soulFragments) G.soulFragments = {};
  G.soulFragments[quality] = (G.soulFragments[quality] || 0) + count;

  const cfg = RESONANCE_CFG[quality];
  if (cfg) {
    const oldLv = Math.min(cfg.maxLevel, Math.floor((G.soulFragments[quality] - count) / cfg.fragPerLevel));
    const newLv = Math.min(cfg.maxLevel, Math.floor(G.soulFragments[quality] / cfg.fragPerLevel));
    if (newLv > oldLv) {
      if (typeof notify === "function") {
        notify(`✨ 武魂共鸣提升！${getQualityConfig(quality)?.n || quality}共鸣 Lv.${newLv} · 战力+${newLv * cfg.powerPerLevel}`, "legend");
      }
      if (typeof spawnBurst === "function") {
        spawnBurst(getQualityConfig(quality)?.c || "#ffd700", 50);
      }
    }
  }
}

// 获取共鸣等级信息
export function getResonanceInfo(quality) {
  if (typeof G === "undefined") return null;
  const cfg = RESONANCE_CFG[quality];
  if (!cfg) return null;

  const frags = (G.soulFragments || {})[quality] || 0;
  const lv = Math.min(cfg.maxLevel, Math.floor(frags / cfg.fragPerLevel));
  const pct = lv >= cfg.maxLevel ? 100 : ((frags % cfg.fragPerLevel) / cfg.fragPerLevel) * 100;
  const pw = lv * cfg.powerPerLevel;
  const nextFrag = lv < cfg.maxLevel ? cfg.fragPerLevel - (frags % cfg.fragPerLevel) : 0;

  return { quality, cfg, frags, lv, pct, pw, nextFrag };
}

// 获取武魂进化链
export function getSoulEvolution(soulName) {
  const SOUL_EVOLUTIONS = {
    "蓝银草": { to: "蓝银皇", fragCost: 15, reqLv: 30, toQ: "legend" },
    "镰刀": { to: "铁锤", fragCost: 8, reqLv: 10, toQ: "common" },
    "白虎": { to: "白虎", fragCost: 10, reqLv: 20, toQ: "rare" },
    "火凤凰": { to: "极品火凤凰", fragCost: 12, reqLv: 40, toQ: "legend" },
    "冰凤凰": { to: "极品火凤凰", fragCost: 12, reqLv: 40, toQ: "legend" },
    "七宝琉璃塔": { to: "九宝琉璃塔", fragCost: 10, reqLv: 35, toQ: "legend" },
    "蓝电霸王龙": { to: "金龙王", fragCost: 8, reqLv: 45, toQ: "legend" },
    "昊天锤": { to: "昊天九绝锤", fragCost: 6, reqLv: 50, toQ: "ha" },
    "六翼天使": { to: "神圣天使", fragCost: 5, reqLv: 50, toQ: "apex" },
  };
  return SOUL_EVOLUTIONS[soulName] || null;
}

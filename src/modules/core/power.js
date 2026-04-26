// ──── POWER CALCULATION ────
// 战力计算模块

import { QC } from "../config/quality.js";
import { RT } from "../data/rings.js";
import { calcResonancePower } from "./resonance.js";

// 计算总战力
export function calcPower() {
  // 注意：此函数依赖全局 G 对象
  if (typeof G === "undefined") return 0;

  let p = G.level * 80 + (G.extraPower || 0);

  // 武魂战力
  if (G.soul) {
    const q = QC[G.soul.quality];
    p += Math.floor((q ? q.p : 1) * 80 * (q ? q.pwMul : 1));

    // 魂环战力
    (G.soul.rings || []).forEach((r) => {
      const t = RT.find((x) => x.n === r.n);
      p += t ? t.pw : 80;
    });
  }

  // 魂骨战力（已在掉落时按品质缩放）
  Object.values(G.equippedBones || {}).forEach((b) => {
    if (b) p += b.pw || 0;
  });

  // 神器战力（按神器品质倍数计算）
  if (G.equippedArt) {
    const mul = G.equippedArt.mul || 2;
    const basePw = G.equippedArt.pw || 0;
    p += Math.floor(basePw * mul);

    // 神骨共鸣：装备神骨时，神器额外+50%战力/神骨
    const godBones = Object.values(G.equippedBones || {}).filter((b) => b && b.god);
    if (godBones.length > 0) {
      p += Math.floor(basePw * mul * 0.5 * godBones.length);
    }
  }

  // v9: 武魂共鸣被动战力
  p += calcResonancePower();

  // 装备的称号贡献战力（仅当前装备的称号）
  if (G.equippedTitle && G.equippedTitle.pw) p += G.equippedTitle.pw;

  // V8: 天赋倍数
  if (G.talent) {
    const tm = { power: 1.3, defense: 1.2, speed: 1.15, support: 1.1 };
    p = Math.floor(p * (tm[G.talent] || 1));
  }

  // V8: 觉醒等级奖励
  if (G.awakenLevel > 0) {
    const AWK_POWER_BONUS = [0, 200, 500, 1000, 2000, 4000, 8000, 15000, 25000, 40000, 60000];
    p += AWK_POWER_BONUS[Math.min(10, G.awakenLevel)] || 0;
  }

  return Math.floor(p);
}

// 添加魂力
export function addSP(v, label) {
  if (typeof G === "undefined") return;
  G.sp += v;
  G.dailyEarned = (G.dailyEarned || 0) + v;
  if (typeof updateHUD === "function") updateHUD();
  if (label && typeof notify === "function") {
    notify(`+${v} 魂力${label ? ` (${label})` : ""}`, "normal");
  }
}

// 获取战力倍数（用于显示）
export function getPowerMultiplier() {
  if (typeof G === "undefined" || !G.talent) return 1;
  const tm = { power: 1.3, defense: 1.2, speed: 1.15, support: 1.1 };
  return tm[G.talent] || 1;
}

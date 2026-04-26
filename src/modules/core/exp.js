/**
 * 经验与升级系统
 * 管理经验获取、等级提升、境界突破、内容解锁和HUD更新
 */

import { G, saveG } from './state.js';
import { QC, getQualityConfig } from '../config/quality.js';
import { getCurrentRealm, REALMS, REALM_BONUSES, rankStr, showRealmOverlay, closeRealmOverlay } from '../config/realms.js';
import { calcResonancePower } from './resonance.js';
import { notify, notifySuccess, notifyError, notifyEpic } from './notify.js';
import { calcPower } from './power.js';
import { $set, $style, spawnBurst } from './utils.js';

// 战力里程碑
const POWER_MILESTONES = [10000, 50000, 100000, 200000, 300000, 500000, 700000, 1000000];

/**
 * 计算指定等级所需经验
 */
export function expForLv(lv) {
  if (lv <= 10) return 200;
  // lv11 needs 300, lv12 needs 400, etc. (200 + (lv-10)*100)
  return 200 + (lv - 10) * 100;
}

/**
 * 计算当前战力
 */
export function calcPower() {
  let p = G.level * 80 + G.extraPower;
  
  if (G.soul) {
    const q = QC[G.soul.quality];
    p += Math.floor((q ? q.p : 1) * 80 * (q ? q.pwMul : 1));
    (G.soul.rings || []).forEach(r => {
      const t = RT.find(x => x.n === r.n);
      p += t ? t.pw : 80;
    });
  }
  
  // 魂骨战力
  Object.values(G.equippedBones || {}).forEach(b => {
    if (b) p += (b.pw || 0);
  });
  
  // 神器战力
  if (G.equippedArt) {
    const mul = G.equippedArt.mul || 2;
    const basePw = G.equippedArt.pw || 0;
    p += Math.floor(basePw * mul);
    // 神骨共鸣
    const godBones = Object.values(G.equippedBones || {}).filter(b => b && b.god);
    if (godBones.length > 0) {
      p += Math.floor(basePw * mul * 0.5 * godBones.length);
    }
  }
  
  // 武魂共鸣被动战力
  p += calcResonancePower();
  
  // 称号战力
  if (G.equippedTitle && G.equippedTitle.pw) p += G.equippedTitle.pw;
  
  // 天赋倍率
  if (G.talent) {
    const tm = { power: 1.3, defense: 1.2, speed: 1.15, support: 1.1 };
    p = Math.floor(p * (tm[G.talent] || 1));
  }
  
  // 觉醒等级奖励
  if (G.awakenLevel > 0) {
    const awk = [0, 200, 500, 1000, 2000, 4000, 8000, 15000, 25000, 40000, 60000];
    p += awk[Math.min(10, G.awakenLevel)] || 0;
  }
  
  return Math.floor(p);
}

/**
 * 添加魂力
 */
export function addSP(v, label) {
  G.sp += v;
  G.dailyEarned += v;
  updateHUD();
  if (label) notify(`+${v} 魂力${label ? ` (${label})` : ''}`, 'normal');
}

/**
 * 添加经验值
 */
export function addExp(v) {
  G.exp += v;
  let leveled = false;
  
  while (G.exp >= expForLv(G.level)) {
    G.exp -= expForLv(G.level);
    G.level++;
    leveled = true;
    
    // 境界突破或普通升级
    checkRealmBreakthrough(G.level);
    triggerSeasonal('level');
    checkContentUnlocks();
    
    // Lv.30 解锁异界
    if (G.level === 30) {
      notify('⚔️ 异界封印解除！世界页面已开启！', 'divine');
      spawnBurst('#c084fc', 80);
      const niAbyss = document.getElementById('ni-abyss');
      if (niAbyss) { niAbyss.style.opacity = '1'; }
    }
    
    // Lv.91 解锁天赋
    if (G.level === 91 && !G.talent) {
      setTimeout(() => openTalentSelect(), 1500);
    }
  }
  
  if (leveled) renderSoulPage();
  updateHUD();
  updateExpBar();
  checkPowerMilestones();
}

/**
 * 检查境界突破
 */
export function checkRealmBreakthrough(lv) {
  const isBreak = REALMS.some(r => r.lv === lv);
  if (!isBreak) {
    notify('🎉 升级！' + rankStr(lv), 'legend');
    spawnBurst('#ffd700', 45);
    return;
  }
  
  const r = getCurrentRealm(lv);
  spawnBurst(r.col, 100);
  setTimeout(() => showRealmOverlay(r, lv), 250);
}

/**
 * 检查内容解锁
 */
export function checkContentUnlocks() {
  if (!G.unlockedSystems) G.unlockedSystems = { bone: false, fusion: false, specialPathPreview: false };
  if (!G.unlockNotified) G.unlockNotified = { bone: false, fusion: false, specialPathPreview: false };
  
  // Lv.10 → 魂骨系统
  if (G.level >= 10 && !G.unlockedSystems.bone) {
    G.unlockedSystems.bone = true;
    if (!G.unlockNotified.bone) {
      G.unlockNotified.bone = true;
      notify('🦴 Lv.10 解锁！魂骨系统已开放 — 武魂页可装备魂骨！', 'divine');
      spawnBurst('#fbbf24', 60);
    }
  }
  
  // Lv.20 → 魂环融合
  if (G.level >= 20 && !G.unlockedSystems.fusion) {
    G.unlockedSystems.fusion = true;
    if (!G.unlockNotified.fusion) {
      G.unlockNotified.fusion = true;
      notify('⚗️ Lv.20 解锁！魂环融合系统已开放 — 背包中可进行魂环融合！', 'divine');
      spawnBurst('#8b5cf6', 60);
    }
  }
  
  // Lv.25 → 特殊道路预览
  if (G.level >= 25 && !G.unlockedSystems.specialPathPreview) {
    G.unlockedSystems.specialPathPreview = true;
    if (!G.unlockNotified.specialPathPreview) {
      G.unlockNotified.specialPathPreview = true;
      notify('🌟 Lv.25 解锁！特殊道路预览已开放 — 试炼页可查看特殊道路！', 'legend');
      spawnBurst('#f59e0b', 60);
    }
  }
}

/**
 * 更新HUD显示
 */
export function updateHUD() {
  $set('hud-lv', 'textContent', 'Lv.' + G.level);
  $set('hud-sp', 'textContent', G.sp);
  $set('hud-pow', 'textContent', calcPower().toLocaleString());
  $set('hud-honor', 'textContent', G.honorPoints || 0);
  updateRealmBadge();
  updateSidebar();
}

/**
 * 更新经验条
 */
export function updateExpBar() {
  const need = expForLv(G.level);
  const pct = Math.min(100, (G.exp / need) * 100);
  $style('exp-fill', 'width', pct + '%');
}

/**
 * 检查战力里程碑
 */
export function checkPowerMilestones() {
  const pw = calcPower();
  (G.powerMilestones = G.powerMilestones || []);
  
  POWER_MILESTONES.forEach(m => {
    if (pw >= m && !G.powerMilestones.includes(m)) {
      G.powerMilestones.push(m);
      addTicketToBag('apex', 1);
      const disp = m >= 10000 ? `${m / 10000}万` : `${m}`;
      notify(`🎁 战力突破 ${disp}！奖励：顶级券×1`, 'epic');
    }
  });
}

// 导入循环依赖的处理
import { addTicketToBag } from '../systems/lottery.js';
import { openTalentSelect } from '../systems/awakening.js';
import { renderSoulPage } from '../ui/soulPage.js';
import { updateSidebar } from '../ui/sidebar.js';
import { updateRealmBadge } from '../config/realms.js';
import { triggerSeasonal } from '../systems/seasons.js';

// ──── 经验系统模块 ────

/**
 * 计算指定等级升级所需经验
 * @param {number} lv - 当前等级
 * @returns {number} 升级所需经验值
 */
export function expForLv(lv) {
  if (lv <= 10) return 200;
  // lv11 needs 300, lv12 needs 400, etc.
  return 200 + (lv - 10) * 100;
}

/**
 * 添加经验值
 * @param {number} v - 经验值
 */
export function addExp(v) {
  G.exp += v;
  let leveled = false;
  
  while (G.exp >= expForLv(G.level)) {
    G.exp -= expForLv(G.level);
    G.level++;
    leveled = true;
    
    // 检查境界突破或普通升级
    checkRealmBreakthrough(G.level);
    triggerSeasonal('level');
    checkContentUnlocks();
    
    // Lv.30 解锁异界深渊
    if (G.level === 30) {
      notify('⚔️ 异界封印解除！世界页面已开启！', 'divine');
      spawnBurst('#c084fc', 80);
      const niAbyss = $('ni-abyss');
      if (niAbyss) { niAbyss.style.opacity = '1'; }
    }
    
    // Lv.91 解锁天赋系统
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
 * @param {number} lv - 当前等级
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
 * 检查内容解锁 (v9)
 */
export function checkContentUnlocks() {
  if (!G.unlockedSystems) G.unlockedSystems = { bone: false, fusion: false, specialPathPreview: false };
  if (!G.unlockNotified) G.unlockNotified = { bone: false, fusion: false, specialPathPreview: false };
  
  // Lv.10 → 魂骨系统
  if (G.level >= 10 && !G.unlockedSystems.bone) {
    G.unlockedSystems.bone = true;
    notify('🦴 魂骨系统已解锁！', 'epic');
    if ($('ni-bone')) $('ni-bone').style.display = 'flex';
  }
  
  // Lv.20 → 融合系统
  if (G.level >= 20 && !G.unlockedSystems.fusion) {
    G.unlockedSystems.fusion = true;
    notify('✨ 融合系统已解锁！', 'epic');
    if ($('ni-fusion')) $('ni-fusion').style.display = 'flex';
  }
  
  // Lv.50 → 特殊成就路径预览
  if (G.level >= 50 && !G.unlockedSystems.specialPathPreview) {
    G.unlockedSystems.specialPathPreview = true;
    notify('🔮 特殊成就路径已解锁！', 'epic');
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
 * 战力里程碑检查
 */
const POWER_MILESTONES = [10000, 50000, 100000, 200000, 300000, 500000, 700000, 1000000];

export function checkPowerMilestones() {
  const pw = calcPower();
  (G.powerMilestones = G.powerMilestones || []);
  
  POWER_MILESTONES.forEach(m => {
    if (pw >= m && !G.powerMilestones.includes(m)) {
      G.powerMilestones.push(m);
      addTicketToBag('apex', 1);
      const disp = m >= 10000 ? `${m / 10000}万` : `${m}`;
      notify(`🏆 战力突破${disp}！获得顶级星运十连券×1！`, 'divine');
      spawnBurst('#ef4444', 80);
      saveG();
    }
  });
}

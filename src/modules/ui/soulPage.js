// ──── 武魂页面UI模块 ────

/**
 * 渲染武魂页面（简化版，完整版需从game.js提取更多代码）
 */
export function renderSoulPage() {
  const p = document.getElementById('page-soul');
  if (!p) return;
  
  if (!G.awakenDone || !G.soul) {
    p.innerHTML = '<div class="empty-st"><div class="ei">🌀</div><div class="em">尚未觉醒武魂</div></div>';
    hideSoulGeo();
    return;
  }
  
  // 简化版渲染 - 完整版需要从game.js提取更多代码
  const s = G.soul;
  const qc = QC[s.quality] || QC.common;
  p.innerHTML = `
    <div class="soul-v2-hero">
      <div class="sol-icon" style="filter:drop-shadow(0 0 16px ${qc.c})">${s.icon}</div>
      <div class="sol-name" style="color:${qc.c}">${s.name}</div>
      <div class="sol-meta">
        <div class="sol-quality-tag" style="border-color:${qc.c}">${qc.n}</div>
        <div class="sol-rank">${rankStr(G.level)}</div>
      </div>
      <div class="sol-actions">
        <div class="sol-act" onclick="doSecondAwaken()">⚡ 二次觉醒</div>
        <div class="sol-act" onclick="openSoulResonance()">✨ 武魂共鸣</div>
        <div class="sol-act" onclick="openSoulEvolution()">🌟 武魂传承</div>
        <div class="sol-act" onclick="openSoulDetail()">📖 魂技详情</div>
      </div>
    </div>
    <div class="sv2-card">
      <div class="sv2-title">魂环 ${s.rings?.length || 0}/10</div>
      <div class="sv2-action" onclick="openAssignRing()">装配 +</div>
    </div>
  `;
  
  updateHUD();
  spawnBurst(qc.c, 50);
}

/**
 * 显示武魂几何背景
 */
export function showSoulGeo(qt, rgb, rings) {
  const cvs = document.getElementById('soul-geo-canvas');
  if (!cvs) return;
  // 简化版 - 完整版需要从game.js提取
  cvs.classList.add('visible');
}

/**
 * 隐藏武魂几何背景
 */
export function hideSoulGeo() {
  const cvs = document.getElementById('soul-geo-canvas');
  if (cvs) cvs.classList.remove('visible');
}

/**
 * 二次觉醒
 */
export function doSecondAwaken() {
  if (!G.soul) { notify('请先觉醒武魂！', 'normal'); return; }
  if (G.soul.secondAwakened) { notify('已经二次觉醒过了！', 'normal'); return; }
  if (G.sp < 5000) { notify('需要5000魂力', 'normal'); return; }
  G.sp -= 5000;
  G.soul.secondAwakened = true;
  G.awakenLevel = (G.awakenLevel || 0) + 1;
  addExp(2000);
  notify('⚡ 二次觉醒成功！战力大幅提升！', 'divine');
  spawnBurst('#f59e0b', 100);
  updateHUD();
  saveG();
  renderSoulPage();
}

/**
 * 打开武魂共鸣
 */
export function openSoulResonance() {
  notify('✨ 武魂共鸣系统', 'normal');
  // TODO: 从game.js提取完整实现
}

/**
 * 打开武魂进化
 */
export function openSoulEvolution() {
  notify('🌟 武魂传承系统', 'normal');
  // TODO: 从game.js提取完整实现
}

/**
 * 打开武魂详情
 */
export function openSoulDetail() {
  if (!G.soul) return;
  const s = G.soul;
  openModal(`
    <div class="m-title" style="color:${QC[s.quality]?.c || '#fff'}">${s.icon} ${s.name}</div>
    <div class="m-sub">${s.desc}</div>
    <div style="font-size:11px;color:var(--dim);line-height:1.8">
      <div>属性：${(s.attrs || []).join('·')}</div>
      <div>初始战力：${s.initPow}</div>
      <div>魂环数：${s.rings?.length || 0}/10</div>
      <div>魂技数：${s.skills?.length || 0}</div>
    </div>
  `);
}

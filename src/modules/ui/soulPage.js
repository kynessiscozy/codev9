// ──── 武魂页面UI模块 ────

import { G, saveG } from '../core/state.js';
import { QC, getQualityConfig, getQualityColor } from '../config/quality.js';
import { rankStr } from '../config/realms.js';
import { spawnBurst } from '../core/utils.js';
import { addExp, updateHUD } from '../core/exp.js';
import { openModal } from './modals.js';
import { notify } from '../core/notify.js';
import { getSoulEffectProfile, getSoulIcon } from './soul-icons.js';
import { SOUL_EVOLUTIONS, RESONANCE_CFG, FRAGMENT_SOURCES, calcResonancePower } from '../core/resonance.js';

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

  const s = G.soul;
  const qc = QC[s.quality] || QC.common;
  const effectProfile = getSoulEffectProfile(s.name, s.attrs || []);
  const isSecondAwakened = !!(s.secondAwakened || s.divine);
  const svgIcon = getSoulIcon(s.name, s.quality, {
    sizeClass: 'size-large',
    priority: true,
    secondAwakened: isSecondAwakened,
    attrs: s.attrs || [],
  });
  const secondAwakenFx = isSecondAwakened ? renderSecondAwakenFx(effectProfile, s) : '';
  const secondAwakenBadge = isSecondAwakened
    ? `<div class="sol-dot-sep"></div><div class="sol-rank soul-awaken-label" style="--soul-awaken:${effectProfile.accent}" title="${effectProfile.desc}">${effectProfile.icon} ${s.divine ? '神化觉醒' : '二次觉醒'} · ${effectProfile.label}</div>`
    : '';

  p.innerHTML = `
    <div class="soul-v2-hero" style="--soul-awaken:${effectProfile.accent};--soul-awaken-glow:${effectProfile.glow};--qc:${qc.c}">
      <div class="soul-orbit ${isSecondAwakened ? 'second-awaken-orbit' : ''}" data-awaken-theme="${effectProfile.theme}">
        <div class="sol-ring r1" style="border-color:${qc.c}"></div>
        <div class="sol-ring r2" style="border-color:${qc.c}"></div>
        <div class="sol-ring r3" style="border-color:${qc.c}"></div>
        <div class="sol-glow" style="background:radial-gradient(ellipse at 40% 35%,${effectProfile.glow},transparent 70%)"></div>
        ${secondAwakenFx}
        <div class="sol-icon" style="filter:drop-shadow(0 0 16px ${qc.c});display:flex;align-items:center;justify-content:center;">${svgIcon}</div>
      </div>
      <div class="sol-name" style="color:${qc.c}">${s.name}</div>
      <div class="sol-meta">
        <div class="sol-quality-tag" style="border-color:${qc.c}">${qc.n}</div>
        <div class="sol-rank">${rankStr(G.level)}</div>
        ${secondAwakenBadge}
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


function renderSecondAwakenFx(profile, soul) {
  const traits = (soul.attrs || []).slice(0, 3);
  const traitText = traits.length ? traits.join(' · ') : profile.label;
  return `
    <div class="second-awaken-aura" aria-hidden="true">
      <div class="saa-core"></div>
      <div class="saa-ring saa-ring-a"></div>
      <div class="saa-ring saa-ring-b"></div>
      <div class="saa-rune saa-rune-a">${profile.icon}</div>
      <div class="saa-rune saa-rune-b">${profile.icon}</div>
      <div class="saa-trait">${traitText}</div>
    </div>`;
}

/**
 * 显示武魂几何背景（已禁用）
 */
export function showSoulGeo() {
  // 背景特效已移除
  return;
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
  const effectProfile = getSoulEffectProfile(G.soul.name, G.soul.attrs || []);
  G.soul.secondAwakenEffect = effectProfile.theme;
  G.awakenLevel = (G.awakenLevel || 0) + 1;
  addExp(2000);
  notify(`${effectProfile.icon} 二次觉醒成功：${effectProfile.label}！${effectProfile.desc}`, 'divine');
  spawnBurst(effectProfile.accent, 120);
  updateHUD();
  saveG();
  renderSoulPage();
}

/**
 * 打开武魂共鸣
 */
export function openSoulResonance() {
  if (!G.awakenDone || !G.soul) { notify('请先觉醒武魂', 'normal'); return; }
  const totalFrags = Object.values(G.soulFragments || {}).reduce((a, b) => a + b, 0);
  const rows = Object.entries(RESONANCE_CFG).map(([q, cfg]) => {
    const qFrags = (G.soulFragments || {})[q] || 0;
    const lv = Math.min(cfg.maxLevel, Math.floor(qFrags / cfg.fragPerLevel));
    const pct = lv >= cfg.maxLevel ? 100 : ((qFrags % cfg.fragPerLevel) / cfg.fragPerLevel) * 100;
    const pw = lv * cfg.powerPerLevel;
    const qc = getQualityConfig(q) || { c: '#9ca3af', n: q };
    const nextFrag = lv < cfg.maxLevel ? (cfg.fragPerLevel - (qFrags % cfg.fragPerLevel)) : 0;
    return `<div style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        <span style="font-size:11px;font-weight:700;color:${qc.c}">${qc.n}</span>
        <span style="font-size:10px;color:var(--gold)">Lv.${lv}/${cfg.maxLevel} · +${pw.toLocaleString()}</span>
      </div>
      <div style="height:4px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden;margin-bottom:3px">
        <div style="height:100%;width:${pct}%;background:${qc.c};border-radius:2px;transition:width .4s"></div>
      </div>
      <div style="font-size:9px;color:var(--dim)">${qFrags} ${qc.n}碎片${lv < cfg.maxLevel ? ` · 升级还需 ${nextFrag}` : ' · 已满级'} · 通用总计 ${totalFrags}</div>
    </div>`;
  }).join('');

  const sourcesH = FRAGMENT_SOURCES.map(s => `
    <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.03)">
      <span style="font-size:14px;flex-shrink:0">${s.icon}</span>
      <div>
        <div style="font-size:10px;font-weight:600;color:var(--txt)">${s.label}</div>
        <div style="font-size:9px;color:var(--dim)">${s.desc}</div>
      </div>
    </div>`).join('');

  const totalPow = calcResonancePower();
  openModal(`<div class="m-title">✨ 武魂共鸣</div>
    <div class="m-sub">总共鸣战力 +${totalPow.toLocaleString()}</div>
    <div style="margin-bottom:10px">${rows}</div>
    <div class="m-sec-t" style="margin:10px 0 6px">碎片获取途径</div>
    <div>${sourcesH}</div>`);
}

/**
 * 打开武魂进化
 */
export function openSoulEvolution() {
  if (!G.awakenDone || !G.soul) { notify('请先觉醒武魂', 'normal'); return; }
  const ev = SOUL_EVOLUTIONS[G.soul.name];
  const frags = Object.values(G.soulFragments || {}).reduce((a, b) => a + b, 0);
  if (!ev) {
    openModal(`<div class="m-title">🌟 武魂传承</div>
      <div class="m-sub" style="color:var(--dim)">当前武魂暂无传承链</div>
      <div style="font-size:11px;color:var(--dim);text-align:center;padding:20px;line-height:1.8">
        ${G.soul.name} 暂无已知传承形态。<br>
        特殊武魂、双生武魂可通过其他方式进化。<br><br>
        <span style="color:var(--gl)">已有碎片：${frags} 枚</span>
      </div>`);
    return;
  }
  const canEvolve = frags >= ev.fragCost && G.level >= ev.reqLv;
  const fromIcon = getSoulIcon(G.soul.name, G.soul.quality, { sizeClass: 'size-large' });
  const toQColor = getQualityColor(ev.toQ) || '#ffd700';
  openModal(`<div class="m-title" style="color:var(--gl)">🌟 武魂传承</div>
    <div class="m-sub">${G.soul.name} → ${ev.to}</div>
    <div style="display:flex;align-items:center;justify-content:center;gap:16px;padding:16px 0">
      <div style="text-align:center">
        <div style="font-size:44px;display:flex;justify-content:center;align-items:center">${fromIcon}</div>
        <div style="font-size:11px;color:var(--dim);margin-top:4px">${G.soul.name}</div>
      </div>
      <div style="font-size:22px;color:var(--gl)">→</div>
      <div style="text-align:center">
        <div style="font-size:44px">✨</div>
        <div style="font-size:11px;color:${toQColor};margin-top:4px">${ev.to}</div>
      </div>
    </div>
    <div class="m-ag" style="margin-bottom:12px">
      <div class="m-at"><div class="m-an">所需通用碎片</div><div class="m-av" style="color:${frags >= ev.fragCost ? 'var(--hc)' : 'var(--apex)'}">${frags}/${ev.fragCost}</div></div>
      <div class="m-at"><div class="m-an">等级要求</div><div class="m-av" style="color:${G.level >= ev.reqLv ? 'var(--hc)' : 'var(--apex)'}">Lv.${G.level}/${ev.reqLv}</div></div>
    </div>
    <div class="m-acts">
      <div class="m-btn ok" style="${canEvolve ? '' : 'opacity:.4;pointer-events:none'}" onclick="window.execSoulEvo && window.execSoulEvo()">传承进化</div>
    </div>`);
}

/**
 * 打开武魂详情
 */
export function openSoulDetail() {
  if (!G.soul) return;
  const s = G.soul;
  const svgIcon = getSoulIcon(s.name, s.quality, { sizeClass: 'size-medium' });
  openModal(`
    <div class="m-title" style="color:${QC[s.quality]?.c || '#fff'};display:flex;align-items:center;gap:8px;">
      <span style="display:flex;align-items:center;">${svgIcon}</span>
      <span>${s.name}</span>
    </div>
    <div class="m-sub">${s.desc}</div>
    <div style="font-size:11px;color:var(--dim);line-height:1.8">
      <div>属性：${(s.attrs || []).join('·')}</div>
      <div>初始战力：${s.initPow}</div>
      <div>魂环数：${s.rings?.length || 0}/10</div>
      <div>魂技数：${s.skills?.length || 0}</div>
    </div>
  `);
}

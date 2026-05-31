// ──── 武魂页面UI模块 ────

import { G, saveG } from '../core/state.js';
import { QC, getQualityConfig, getQualityColor } from '../config/quality.js';
import { getCurrentRealm, getNextRealm, rankStr } from '../config/realms.js';
import { getRingColor } from '../data/rings.js';
import { calcPower } from '../core/power.js';
import { spawnBurst } from '../core/utils.js';
import { addExp, updateHUD } from '../core/exp.js';
import { openModal } from './modals.js';
import { notify } from '../core/notify.js';
import { getSoulEffectProfile, getSoulIcon } from './soul-icons.js';
import { SOUL_EVOLUTIONS, RESONANCE_CFG, FRAGMENT_SOURCES, calcResonancePower } from '../core/resonance.js';

const THEME_ASSETS = {
  fire: ['legend/极品火凤凰.webp', 'epic/极焱炎神.webp', 'rare/朱雀圣火.webp'],
  ice: ['legend/永恒冰魂.webp', 'epic/极寒冰皇.webp', 'rare/冰凤凰.webp'],
  thunder: ['legend/天罚神雷.webp', 'epic/雷霆战神.webp', 'epic/蓝电霸王龙.webp'],
  dragon: ['legend/金龙王.webp', 'epic/黄金圣龙.webp', 'rare/冰火蛟龙.webp'],
  holy: ['god/天使神.webp', 'epic/六翼天使.webp', 'legend/九宝琉璃塔.webp'],
  dark: ['god/修罗神.webp', 'legend/堕落天使.webp', 'epic/暗域鬼王.webp'],
  grass: ['legend/蓝银皇.webp', 'hc/奇茸通天菊.webp', 'common/蓝银草.webp'],
  water: ['god/海神武魂.webp', 'rare/碧海银鲸.webp', 'rare/玄武神盾.webp'],
  metal: ['legend/七杀剑.webp', 'epic/昊天锤.webp', 'ha/昊天九绝锤.webp'],
  wind: ['epic/狂风战鹰.webp', 'rare/白鹤翎羽.webp', 'hc/月影神狐.webp'],
  earth: ['epic/泰坦巨猿.webp', 'ha/饕餮神牛.webp', 'rare/玄武神盾.webp'],
  beast: ['rare/白虎.webp', 'rare/赤炎狮王.webp', 'epic/泰坦巨猿.webp'],
  poison: ['rare/碧磷蛇皇.webp', 'epic/冰碧帝皇蝎.webp', 'epic/死亡蛛皇.webp'],
};

const FALLBACK_ASSETS = ['apex/宇宙之源.webp', 'apex/时空裂缝.webp', 'triple/时空因果三生.webp'];

function esc(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getAssetBase() {
  return (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
}

function getThemeAssets(theme) {
  return THEME_ASSETS[theme] || FALLBACK_ASSETS;
}

function renderBackdropCards(theme, assetBase) {
  return getThemeAssets(theme).map((src, idx) => `
    <figure class="cin-art-card cin-art-${idx + 1}">
      <img src="${assetBase}/souls/${src}" alt="武魂插画素材 ${idx + 1}" loading="lazy" decoding="async" draggable="false">
    </figure>`).join('');
}

function renderRingOrbit(rings = []) {
  return Array.from({ length: 10 }, (_, idx) => {
    const ring = rings[idx];
    const deg = idx * 36 - 90;
    const color = ring ? (ring.c || getRingColor(ring.y || ring.n || 0)) : 'rgba(255,255,255,.16)';
    const label = ring ? String(ring.n || ring.tier || '魂环').replace('年', '') : idx + 1;
    return `<div class="cin-ring-node ${ring ? 'filled' : ''}" style="--deg:${deg}deg;--ring:${color}" title="${esc(ring ? `${ring.n || '魂环'} · ${ring.sk || '魂技待觉醒'}` : `第${idx + 1}魂环位`)}"><span>${esc(label)}</span></div>`;
  }).join('');
}

function renderRingList(rings = []) {
  if (!rings.length) {
    return `<div class="cin-empty-row">尚未装配魂环。前往试炼狩猎，点亮魂环星轨。</div>`;
  }
  return rings.slice(0, 4).map((ring, idx) => {
    const color = ring.c || getRingColor(ring.y || ring.n || 0);
    return `<div class="cin-ring-row">
      <i style="--ring:${color}"></i>
      <div class="cin-ring-main"><b>${esc(ring.sk || `第${idx + 1}魂技`)}</b><span>${esc(ring.n || ring.tier || '未知年限')}</span></div>
      <em>+${Number(ring.pw || 0).toLocaleString()}</em>
    </div>`;
  }).join('') + (rings.length > 4 ? `<button class="cin-text-btn" type="button" onclick="openSoulDetail()">查看全部 ${rings.length} 个魂技 ›</button>` : '');
}

function renderSkillPreview(skills = []) {
  if (!skills.length) return `<div class="cin-empty-row">魂技尚未记录，装配魂环后将在此展示。</div>`;
  return skills.slice(0, 3).map((sk, idx) => `
    <div class="cin-skill-card">
      <div class="cin-skill-mark">${['Ⅰ', 'Ⅱ', 'Ⅲ'][idx] || '✦'}</div>
      <div><b>${esc(sk.name || '未命名魂技')}</b><span>${esc(sk.desc || '魂力涌动，效果待解析。')}</span></div>
    </div>`).join('');
}

function renderResourceDeck() {
  const artifact = G.equippedArt;
  const bones = Object.values(G.equippedBones || {}).filter(Boolean);
  const title = G.equippedTitle;
  const totalFragments = Object.values(G.soulFragments || {}).reduce((a, b) => a + b, 0);
  return `
    <div class="cin-deck">
      <div class="cin-deck-card"><span>魂骨</span><b>${bones.length}/6</b><small>${bones.length ? `共鸣战力 +${bones.reduce((sum, bone) => sum + (bone.pw || 0), 0).toLocaleString()}` : '暂无装备'}</small></div>
      <div class="cin-deck-card"><span>神器</span><b>${artifact ? esc(artifact.i || '✦') : '—'}</b><small>${artifact ? esc(artifact.n || '已装备') : '试炼中获取'}</small></div>
      <div class="cin-deck-card"><span>称号</span><b>${title ? '★' : '—'}</b><small>${title ? esc(title.n) : '未佩戴称号'}</small></div>
      <div class="cin-deck-card"><span>碎片</span><b>${totalFragments}</b><small>共鸣素材</small></div>
    </div>`;
}

/**
 * 渲染武魂页面（电影化指挥舱版）
 */
export function renderSoulPage() {
  const p = document.getElementById('page-soul');
  if (!p) return;
  p.classList.add('soul-cinematic-page');

  if (!G.awakenDone || !G.soul) {
    p.innerHTML = `
      <div class="cin-awaken-empty">
        <div class="cin-empty-sigil">🌀</div>
        <h2>尚未觉醒武魂</h2>
        <p>触碰祭坛，开启属于你的魂师命运。</p>
        <button type="button" onclick="window.triggerAwaken && window.triggerAwaken()">感应武魂</button>
      </div>`;
    hideSoulGeo();
    return;
  }

  const s = G.soul;
  const qc = QC[s.quality] || QC.common;
  const effectProfile = getSoulEffectProfile(s.name, s.attrs || []);
  const isSecondAwakened = !!(s.secondAwakened || s.divine);
  const realm = getCurrentRealm(G.level);
  const nextRealm = getNextRealm(G.level);
  const realmPct = nextRealm ? Math.min(100, Math.max(0, ((G.level - realm.lv) / (nextRealm.lv - realm.lv)) * 100)) : 100;
  const assetBase = getAssetBase();
  const attrs = (s.attrs || []).slice(0, 4);
  const svgIcon = getSoulIcon(s.name, s.quality, {
    sizeClass: 'size-large',
    priority: true,
    secondAwakened: isSecondAwakened,
    attrs: s.attrs || [],
  });
  const secondAwakenFx = isSecondAwakened ? renderSecondAwakenFx(effectProfile, s) : '';
  const power = calcPower();
  const rings = s.rings || [];

  p.innerHTML = `
    <section class="cin-hero" style="--soul:${qc.c};--soulGlow:${effectProfile.glow};--theme:${effectProfile.accent}" data-theme="${esc(effectProfile.theme)}">
      <div class="cin-hero-bg"></div>
      ${renderBackdropCards(effectProfile.theme, assetBase)}
      <div class="cin-identity">
        <div class="cin-kicker">MARTIAL SOUL · ${esc(effectProfile.label)}</div>
        <h1 style="color:${qc.c}">${esc(s.name)}</h1>
        <div class="cin-tags">
          <span style="border-color:${qc.c};color:${qc.c}">${esc(qc.n)}</span>
          <span>${esc(rankStr(G.level))}</span>
          ${isSecondAwakened ? `<span style="color:${effectProfile.accent}">${s.divine ? '神化觉醒' : '二次觉醒'}</span>` : ''}
        </div>
      </div>
      <div class="cin-stage">
        <div class="cin-ring-orbit">${renderRingOrbit(rings)}</div>
        <div class="soul-orbit ${isSecondAwakened ? 'second-awaken-orbit' : ''}" data-awaken-theme="${effectProfile.theme}">
          <div class="sol-ring r1" style="border-color:${qc.c}"></div>
          <div class="sol-ring r2" style="border-color:${qc.c}"></div>
          <div class="sol-ring r3" style="border-color:${qc.c}"></div>
          <div class="sol-glow" style="background:radial-gradient(ellipse at 40% 35%,${effectProfile.glow},transparent 70%)"></div>
          ${secondAwakenFx}
          <div class="sol-icon" style="filter:drop-shadow(0 0 18px ${qc.c});display:flex;align-items:center;justify-content:center;">${svgIcon}</div>
        </div>
      </div>
      <div class="cin-dashboard">
        <div><span>战力评级</span><b>${power.toLocaleString()}</b></div>
        <div><span>初始魂力</span><b>${Number(s.p || 0).toLocaleString()}</b></div>
        <div><span>魂环进度</span><b>${rings.length}/10</b></div>
      </div>
      <div class="cin-attrs">
        ${(attrs.length ? attrs : [effectProfile.label]).map(attr => `<span>${esc(attr)}</span>`).join('')}
      </div>
      <div class="cin-actions">
        <button type="button" onclick="doSecondAwaken()"><i>⚡</i><span>二次觉醒</span></button>
        <button type="button" onclick="openSoulResonance()"><i>✨</i><span>武魂共鸣</span></button>
        <button type="button" onclick="openSoulEvolution()"><i>🌟</i><span>武魂传承</span></button>
        <button type="button" onclick="openSoulDetail()"><i>📖</i><span>魂技档案</span></button>
      </div>
    </section>

    <section class="cin-panel cin-realm-panel">
      <div class="cin-panel-head"><div><span>REALM PATH</span><h2>境界航线</h2></div><b>${esc(realm.ico)} ${esc(realm.n)}</b></div>
      <div class="cin-realm-track"><i style="width:${realmPct}%"></i></div>
      <div class="cin-realm-copy"><span>${esc(realm.sub)}</span><em>${nextRealm ? `下一境界：Lv.${nextRealm.lv} · ${nextRealm.n}` : '已抵达神级领域'}</em></div>
    </section>

    <section class="cin-panel">
      <div class="cin-panel-head"><div><span>SOUL RINGS</span><h2>魂环星轨</h2></div><button type="button" onclick="switchPage('hunt')">前往试炼 ›</button></div>
      <div class="cin-ring-list">${renderRingList(rings)}</div>
    </section>

    ${renderResourceDeck()}

    <section class="cin-panel">
      <div class="cin-panel-head"><div><span>COMBAT SKILLS</span><h2>魂技演算</h2></div><button type="button" onclick="openSoulDetail()">完整档案 ›</button></div>
      <div class="cin-skill-grid">${renderSkillPreview(s.skills || [])}</div>
    </section>
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

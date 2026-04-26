/**
 * 狩猎系统模块
 * 管理魂兽狩猎、魂环获取、战利品掉落
 */

import { G, saveG } from '../core/state.js';
import { $, ri, pick, bagPush, spawnBurst } from '../core/utils.js';
import { RT, getRingTier, getRingColor } from '../data/rings.js';
import { BONE_TIER_PW, genBonePw, BONE_SLOTS, BONE_POOL, SPECIAL_BONES, getBonePool, getBoneById } from '../data/bones.js';
import { HERBS, RESOURCES, ARTS, TITLES, getHerb, getResource, getArtifact, getTitle } from '../data/items.js';
import { addExp, updateHUD } from '../core/exp.js';
import { addTicketToBag } from './lottery.js';
import { notify, notifyEpic, notifyLegend, notifyDivine, notifyCosmic } from '../core/notify.js';
import { addSoulFragment } from '../core/resonance.js';
import { progressTask, triggerSeasonal } from './tasks.js';
import { renderBag } from '../ui/bag.js';

/**
 * 执行狩猎
 * @param {string} zone - 狩猎区域 (forest, chaos, primordial, random)
 */
export function hunt(zone) {
  const costs = { forest: 100, chaos: 500, primordial: 1000, random: 300 };
  const cost = costs[zone];
  
  if (G.sp < cost) {
    notify(`魂力不足！需要${cost}`, 'normal');
    return;
  }
  
  G.sp -= cost;
  G.huntCount++;
  G.stats.hunts++;
  progressTask('hunt');
  
  let ring = null;
  
  // 根据区域滚动魂环
  if (zone === 'forest') ring = rollRing([38, 28, 18, 10, 4, 1.5, 0.4, 0]);
  else if (zone === 'chaos') ring = rollRing([0, 8, 22, 32, 22, 13, 2.5, 0]);
  else if (zone === 'primordial') ring = rollRing([0, 0, 4, 12, 28, 32, 16, 0.0000000001]);
  else if (zone === 'random') {
    const r = Math.random();
    if (r < 0.3) ring = rollRing([38, 28, 18, 10, 4, 1.5, 0.4, 0]);
    else if (r < 0.6) ring = rollRing([0, 8, 22, 32, 22, 13, 2.5, 0]);
    else if (r < 0.85) ring = rollRing([0, 0, 4, 12, 28, 32, 16, 0.0000000001]);
    else {
      notify('🌪️ 传送失败！迷失虚空，损失200魂力', 'normal');
      G.sp -= Math.min(200, G.sp);
      updateHUD();
      saveG();
      return;
    }
  }
  
  if (!ring) return;
  
  // 创建魂环对象
  const tier = RT.find(t => t.n === ring.n) || RT[0];
  const sk = pick(tier.sk);
  const ringObj = {
    id: Date.now(),
    n: ring.n,
    y: ring.y,
    c: ring.c,
    sk,
    pw: tier.pw,
    tier: ring.n,
    unique: ring.unique || false,
    special: ring.special || false,
  };
  
  // 宇宙之核特殊处理
  if (ring.unique && G.cosmicOwned) {
    notify('宇宙之核已被持有，改为神赐魂环', 'normal');
    ringObj.n = RT[6].n;
    ringObj.y = RT[6].y;
    ringObj.c = RT[6].c;
    ringObj.pw = RT[6].pw;
  }
  if (ring.unique && !G.cosmicOwned) {
    G.cosmicOwned = true;
    notify('🌌 ！！宇宙之核降临！亘古唯一！！', 'cosmic');
    spawnBurst('#00ffff', 200);
  }
  
  // 魂骨掉落
  if (Math.random() < 0.22) {
    const bs = pick(BONE_SLOTS);
    const bp = genBonePw(ring.n);
    const bon = { ...bs, n: `${ring.n}${bs.n}魂骨`, pw: bp, id: Date.now() + 1, ringYear: ring.n };
    G.bag.push({ type: 'bone', data: bon, count: 1, id: Date.now() + 10 });
    G.stats.bones++;
    notify(`🦴 掉落魂骨：${bon.n} (战力+${bp})`, 'epic');
  }
  
  // 特殊魂骨掉落
  const specProb = { forest: 0.01, chaos: 0.05, primordial: 0.1, random: 0.03 }[zone] || 0;
  if (Math.random() < specProb) {
    const sb = pick(SPECIAL_BONES);
    G.bag.push({ type: 'bone', data: { ...sb, id: Date.now() + 2 }, count: 1, id: Date.now() + 20 });
    notify(`✨ 特殊魂骨：${sb.n} 已掉落！${sb.special}`, 'legend');
    spawnBurst('#ef4444', 60);
  }
  
  // 区域特殊掉落
  if (zone === 'forest') {
    addExp(50);
    if (Math.random() < 0.15) { addTicketToBag('common', 1); notify('🎟️ 获得普通星运券×1!', 'epic'); }
    if (Math.random() < 0.20) {
      const h = HERBS[pick([0, 1, 2, 4])];
      addHerbToBag(h);
      notify('🌿 获得药草：' + h.n, 'epic');
      progressTask('herb');
    }
  } else if (zone === 'chaos') {
    const bTierName = pick(['千年', '万年', '十万年']);
    const bSlotKey = pick(['head', 'body', 'arm', 'leg']);
    const bPool = BONE_POOL[bSlotKey] || BONE_POOL.head;
    const matchB = bPool.filter(b => b.tier === bTierName);
    const chB = matchB.length ? pick(matchB) : (bPool[1] || bPool[0]);
    const bpw = genBonePw(bTierName);
    G.bag.push({ type: 'bone', data: { ...chB, pw: bpw, id: Date.now() + 50 }, count: 1, id: Date.now() + 51 });
    G.stats.bones++;
    notify('🦴 混沌魂骨：' + chB.n + ' 战力+' + bpw, 'epic');
    addExp(ri(100, 300));
    if (Math.random() < 0.12) { addTicketToBag('advanced', 1); notify('🎫 获得高级星运券×1!', 'legend'); }
    if (Math.random() < 0.10) {
      const h = HERBS[pick([3, 4, 5, 6, 9, 10])];
      addHerbToBag(h);
      notify('🌿 混沌药草：' + h.n, 'epic');
      progressTask('herb');
    }
  } else if (zone === 'primordial') {
    addExp(ri(500, 1500));
    if (Math.random() < 0.10) { addTicketToBag('apex', 1); notify('🏆 获得顶级星运券×1!', 'divine'); }
    if (Math.random() < 0.001) {
      const extArts = ARTS.filter(a => a.extreme);
      if (extArts.length) {
        const ea = pick(extArts);
        G.bag.push({ type: 'artifact', data: ea, count: 1, id: Date.now() + 52 });
        notify('⚡！极致神器降临！' + ea.n, 'cosmic');
        spawnBurst('#ffd700', 150);
        G.stats.arts++;
      }
    }
    if (Math.random() < 0.20) {
      const h = HERBS[pick([5, 6, 7, 10, 11, 12, 13])];
      addHerbToBag(h);
      notify('🌿 原初药草：' + h.n, 'epic');
      progressTask('herb');
    }
  } else if (zone === 'random') {
    if (Math.random() < 0.15) {
      const pools = ['common', 'advanced', 'apex'];
      addTicketToBag(pick(pools), 1);
      notify('🎲 随机星运券！', 'epic');
    }
    if (Math.random() < 0.25) {
      const res = RESOURCES[ri(0, RESOURCES.length - 1)];
      addResourceToBag(res);
      notify('📦 资源：' + res.n, 'normal');
      progressTask('resource');
    }
    if (Math.random() < 0.12) {
      const h = HERBS[ri(0, HERBS.length - 1)];
      addHerbToBag(h);
      notify('🌿 随机药草：' + h.n, 'epic');
      progressTask('herb');
    }
  }
  
  // 称号掉落 1%
  if (Math.random() < 0.01) {
    const tp = TITLES.hunt;
    const t = pick(tp);
    if (!G.titles.find(x => x.n === t.n)) {
      G.titles.push(t);
      notify(`👑 获得称号：${t.n}！`, t.n.includes('原初') ? 'cosmic' : 'divine');
    }
  }
  
  // 5倍事件
  if (Math.random() < 0.025) {
    const b = cost * 5;
    addSP(b, '5倍魂力奇遇');
    notify(`🌟 5倍魂力奇遇！+${b}`, 'legend');
  }
  
  // v9: 武魂碎片掉落
  const fragChance = { forest: .08, chaos: .12, primordial: .18, random: .06 }[zone] || 0;
  if (G.soul && Math.random() < fragChance) {
    const zoneFragQ = { forest: 'common', chaos: 'rare', primordial: 'epic', random: ['common', 'rare'][ri(0, 1)] }[zone] || 'common';
    addSoulFragment(zoneFragQ, 1);
    notify(`🔮 武魂碎片·${QC[zoneFragQ]?.n || zoneFragQ} ×1`, 'epic');
  }
  
  // 添加到背包
  G.bag.push({ type: 'ring', data: ringObj, count: 1, id: Date.now() + 30 });
  G.recentRings.unshift(ringObj);
  if (G.recentRings.length > 12) G.recentRings.pop();
  G.stats.rings++;
  addExp(35);
  triggerSeasonal('hunt');
  if (ring.y >= 1000000) triggerSeasonal('ring_legend');
  
  // 显示通知
  const tierName = ring.unique ? 'cosmic' : (ring.special ? 'divine' : (ring.y >= 999999999 ? 'legend' : 'normal'));
  notify(`🔮 ${ring.n} 魂环·${sk}·战力+${tier.pw}`, tierName);
  
  // 更新UI
  $('hunt-cnt').textContent = G.huntCount;
  updateHUD();
  saveG();
  renderRecentRings();
  renderBag();
}

/**
 * 滚动魂环
 * @param {Array} w - 权重数组
 */
export function rollRing(w) {
  const t = w.reduce((s, x) => s + x, 0);
  let r = Math.random() * t;
  let c = 0;
  for (let i = 0; i < RT.length; i++) {
    c += w[i];
    if (r <= c) return RT[i];
  }
  return RT[0];
}

/**
 * 渲染最近获得的魂环
 */
export function renderRecentRings() {
  const c = $('recent-rings');
  if (!c) return;
  
  if (!G.recentRings.length) {
    c.innerHTML = '<div class="empty-st"><div class="ei">💫</div><div class="em">尚未狩猎</div></div>';
    return;
  }
  
  c.innerHTML = G.recentRings.slice(0, 8).map(r => `
    <div class="ring-item">
      <div class="ring-orb" style="background:${r.c}">${r.n[0]}</div>
      <div style="flex:1">
        <div class="ring-yr" style="color:${r.c}">${r.n}</div>
        <div class="ring-sk">${r.sk || r.skill || ''}</div>
        <div class="ring-pow">战力 +${r.pw || 0}</div>
      </div>
    </div>
  `).join('');
}

// 导入循环依赖函数
import { addSP } from '../core/power.js';
import { addHerbToBag, addResourceToBag } from '../ui/bag.js';

// 更新成神之路UI
export function updateGodPath() {
  const rings = (G.soul?.rings || []).length;
  const card = $('godpath-card');
  const hint = $('gp-hint');
  
  if (card) {
    if (rings >= 9) {
      card.classList.remove('locked');
      if (hint) {
        hint.textContent = '✅ 条件已满足！点击进入成神之路试炼';
        hint.style.color = 'var(--hc)';
      }
    } else {
      card.classList.add('locked');
      if (hint) {
        hint.textContent = `🔒 当前武魂魂环 ${rings}/9，不足无法开启`;
        hint.style.color = 'var(--apex)';
      }
    }
  }
  
  renderSpecialPaths();
}

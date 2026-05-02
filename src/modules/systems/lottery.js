// ──── 抽奖系统模块 ────

import { G, saveG } from '../core/state.js';
import { notify } from '../core/notify.js';
import { updateHUD } from '../core/exp.js';

// 抽奖全局状态
let _lotCurPool = 0;
let curLotMode = 0;

// ── 保底系统配置 ──
// 普通/高级奖池：每抽累计进度，N抽必出高价值
const PITY_CONFIG = {
  common: {
    tenPullGuarantee: true,      // 十连保底：必出稀有物品
    pityThresholds: [10, 20],     // 保底阈值
    pityItems: [
      { idx: 1, l: "千年魂环+魂骨" },   // 10抽保底
      { idx: 3, l: "低潮+十万年魂骨" }  // 20抽保底
    ]
  },
  advanced: {
    tenPullGuarantee: true,
    pityThresholds: [10, 20],
    pityItems: [
      { idx: 3, l: "低潮" },
      { idx: 4, l: "百万年魂环+魂骨" }
    ]
  },
  apex: {
    tenPullGuarantee: true,
    pityThresholds: [50, 80],     // 顶级奖池更宽松
    pityItems: [
      { idx: 3, l: "十万年魂骨+低潮" },
      { idx: 4, l: "百万年魂环+魂骨" }
    ]
  }
};

// 奖池稀有等级定义（用于保底判定）
const ITEM_TIERS = {
  sp: 0,              // 普通
  herb: 0,
  resource: 0,
  ring: (ti) => ti || 0,
  ringbone: (ti) => ti || 0,
  bone: (ti) => ti || 0,
  artifact: 5,         // 固定稀有
  title: (pool) => pool === 'special' ? 8 : pool === 'legend' ? 7 : pool === 'advanced' ? 5 : 3
};

// 初始化保底计数（从存档恢复或创建）
function initPityCounter(poolType) {
  const key = 'lotPity_' + poolType;
  if (!G.lotPity) G.lotPity = {};
  if (G.lotPity[poolType] === undefined) {
    G.lotPity[poolType] = { count: 0, lastPityIdx: -1 };
  }
  return G.lotPity[poolType];
}

// 奖池配置
export const LOT = [
  { name: "普通奖池", sub: "基础奖励", bg: "linear-gradient(135deg,rgba(156,163,175,.16),rgba(59,130,246,.09))", cost: 100,
    pool: [
      { w: 32, fn: () => ({ t: 'sp', v: 100, l: "100魂力" }) },
      { w: 22, fn: () => ({ t: 'ringbone', ti: 1, l: "千年魂环+千年魂骨", bone: true }) },
      { w: 16, fn: () => ({ t: 'ring', ti: 2, l: "万年魂环" }) },
      { w: 12, fn: () => ({ t: 'ringbone', ti: 3, l: "低潮+十万年魂骨", bone: true }) },
      { w: 8, fn: () => ({ t: 'herb', grade: 'common', l: "随机普通药草" }) },
      { w: 7, fn: () => ({ t: 'resource', grade: 'common', l: "随机普通资源" }) },
      { w: 0.5, fn: () => ({ t: 'artifact', l: "随机神器" }) },
      { w: 1, fn: () => ({ t: 'title', pool: 'rare', l: "稀有称号(紫)" }) },
    ],
    detail: [
      { n: "100魂力", p: "32%" }, { n: "千年魂环+魂骨", p: "22%" }, { n: "万年魂环", p: "16%" },
      { n: "低潮+魂骨", p: "12%" }, { n: "随机普通药草", p: "8%" }, { n: "随机普通资源", p: "7%" },
      { n: "随机神器", p: "0.5%" }, { n: "稀有称号", p: "1%" },
    ]},
  { name: "高级奖池", sub: "精英奖励", bg: "linear-gradient(135deg,rgba(59,130,246,.2),rgba(139,92,246,.12))", cost: 500,
    pool: [
      { w: 28, fn: () => ({ t: 'sp', v: 250, l: "250魂力" }) },
      { w: 20, fn: () => ({ t: 'sp', v: 500, l: "500魂力" }) },
      { w: 16, fn: () => ({ t: 'ringbone', ti: 2, l: "万年魂环+万年魂骨", bone: true }) },
      { w: 12, fn: () => ({ t: 'ring', ti: 3, l: "低潮" }) },
      { w: 8, fn: () => ({ t: 'ringbone', ti: 4, l: "百万年魂环+百万年魂骨", bone: true, bonus: true }) },
      { w: 6, fn: () => ({ t: 'herb', grade: 'rare', l: "随机稀有药草" }) },
      { w: 5, fn: () => ({ t: 'resource', grade: 'rare', l: "随机稀有资源" }) },
      { w: 1, fn: () => ({ t: 'artifact', l: "随机神器" }) },
      { w: 1, fn: () => ({ t: 'title', pool: 'advanced', l: "高级称号(金)" }) },
      { w: 0.001, fn: () => ({ t: 'title', pool: 'special', l: "欧皇称号" }) },
    ],
    detail: [
      { n: "250魂力", p: "28%" }, { n: "500魂力", p: "20%" }, { n: "万年魂环+魂骨", p: "16%" },
      { n: "低潮", p: "12%" }, { n: "涨潮", p: "8%" },
      { n: "随机稀有药草", p: "6%" }, { n: "随机稀有资源", p: "5%" },
      { n: "随机神器", p: "1%" }, { n: "高级称号(金)", p: "1%" }, { n: "欧皇称号", p: "0.001%" },
    ]},
  { name: "顶级奖池", sub: "绝世奖励", bg: "linear-gradient(135deg,rgba(245,158,11,.25),rgba(239,68,68,.16))", cost: 1000,
    pool: [
      { w: 22, fn: () => ({ t: 'sp', v: 500, l: "500魂力" }) },
      { w: 16, fn: () => ({ t: 'sp', v: 1000, l: "1000魂力" }) },
      { w: 14, fn: () => ({ t: 'ringbone', ti: 3, l: "十万年魂骨+低潮", bone: true }) },
      { w: 10, fn: () => ({ t: 'ringbone', ti: 4, l: "百万年魂环+百万年魂骨", bone: true, bonus: true }) },
      { w: 1.5, fn: () => ({ t: 'artifact', l: "随机神器" }) },
      { w: 6, fn: () => ({ t: 'herb', grade: 'advanced', l: "随机高级药草" }) },
      { w: 6, fn: () => ({ t: 'resource', grade: 'advanced', l: "随机高级资源" }) },
      { w: 0.5, fn: () => ({ t: 'title', pool: 'legend', l: "传说称号(红)" }) },
      { w: 4, fn: () => ({ t: 'ring', ti: 5, l: "怒潮", bonus: true }) },
      { w: 0.01, fn: () => ({ t: 'title', pool: 'special', ouhuangSpecial: true, l: "欧皇称号(特殊保底)" }) },
      { w: 0.001, fn: (ten) => ({ t: 'ring', cosmic: true, l: "宇宙之核(唯一)" + (ten ? "[十连]" : "") }) },
    ],
    detail: [
      { n: "500魂力", p: "22%" }, { n: "1000魂力", p: "16%" }, { n: "十万年魂骨+魂环", p: "14%" },
      { n: "涨潮", p: "10%" }, { n: "随机神器", p: "1.5%" },
      { n: "随机高级药草", p: "6%" }, { n: "随机高级资源", p: "6%" },
      { n: "传说称号(红)", p: "0.5%" }, { n: "怒潮", p: "4%" },
      { n: "欧皇称号", p: "0.01%" }, { n: "宇宙之核(唯一)", p: "0.001%" },
    ]},
];

export const LOT_POOL_COL = ['#9ca3af', '#a78bfa', '#f59e0b'];
export const LOT_POOL_WASH = ['rgba(156,163,175,.06)', 'rgba(139,92,246,.08)', 'rgba(245,158,11,.08)'];
export const LOT_GEO_CFG = [
  { rgb: [156, 163, 175], rings: [{ rx: 105, ry: 76, spd: 0.0018, dir: 1, op: 0.13, dash: false }, { rx: 152, ry: 110, spd: 0.0011, dir: -1, op: 0.08, dash: false }, { rx: 202, ry: 146, spd: 0.0007, dir: 1, op: 0.05, dash: true }, { rx: 258, ry: 186, spd: 0.0004, dir: -1, op: 0.03, dash: false }] },
  { rgb: [167, 139, 250], rings: [{ rx: 95, ry: 68, spd: 0.0024, dir: 1, op: 0.18, dash: false }, { rx: 140, ry: 100, spd: 0.0015, dir: -1, op: 0.12, dash: false }, { rx: 190, ry: 136, spd: 0.0009, dir: 1, op: 0.08, dash: true }, { rx: 245, ry: 176, spd: 0.0005, dir: -1, op: 0.05, dash: false }, { rx: 305, ry: 220, spd: 0.0003, dir: 1, op: 0.03, dash: true }] },
  { rgb: [245, 158, 11], rings: [{ rx: 85, ry: 60, spd: 0.0028, dir: 1, op: 0.22, dash: false }, { rx: 130, ry: 92, spd: 0.0018, dir: -1, op: 0.15, dash: false }, { rx: 180, ry: 128, spd: 0.0011, dir: 1, op: 0.1, dash: true }, { rx: 235, ry: 168, spd: 0.0006, dir: -1, op: 0.06, dash: false }, { rx: 295, ry: 212, spd: 0.0004, dir: 1, op: 0.04, dash: true }] },
];

function poolTicketName(p) { return p === 'common' ? '普通星运券' : p === 'advanced' ? '高级星运券' : '顶级星运券'; }
function poolTicketIcon(p) { return p === 'common' ? '🎟️' : p === 'advanced' ? '🎫' : '🏆'; }
function poolTicketColor(p) { return p === 'common' ? '#9ca3af' : p === 'advanced' ? '#3b82f6' : '#ef4444'; }

export function addTicketToBag(pool, count, ten = false) {
  const ticketId = 'ticket_' + pool + (ten ? '_ten' : '');
  const name = poolTicketName(pool) + (ten ? '（十连）' : '');
  if (ten) {
    const ex = G.bag.find(i => i.type === 'ticket' && i.data?.pool === pool && i.data?.ten);
    if (ex) ex.count += count;
    else G.bag.push({ type: 'ticket', data: { id: ticketId, pool, n: name, i: poolTicketIcon(pool), c: poolTicketColor(pool), ten: true }, count, id: Date.now() + Math.random() });
  } else {
    const ex = G.bag.find(i => i.type === 'ticket' && i.data?.pool === pool && !i.data?.ten);
    if (ex) ex.count += count;
    else G.bag.push({ type: 'ticket', data: { id: ticketId, pool, n: poolTicketName(pool), i: poolTicketIcon(pool), c: poolTicketColor(pool) }, count, id: Date.now() + Math.random() });
  }
}

function updateTidalUI(idx) {
  // 占位：由 game.js 覆盖
}

function renderLotDrawGrid(idx) {
  // 占位：由 game.js 覆盖
}

export function renderLotHist() {
  // 占位：由 game.js 覆盖
}

export function stopLotGeo() {
  // 占位：由 game.js 覆盖
}

// ── 导出新增函数 ──
export { rollLottery, applyLotResult, getLotTier, getItemTier };
export { PITY_CONFIG, initPityCounter, updatePityCounterUI };

/**
 * 智能抽奖（优先使用券）
 * @param {number} times - 抽奖次数 (1或10)
 */
export function doLotSmart(times) {
  const pool = ['common', 'advanced', 'apex'][_lotCurPool];
  const cfg = LOT[_lotCurPool];
  
  if (times === 1) {
    const s = G.bag.find(i => i.type === 'ticket' && i.data?.pool === pool && !i.data?.ten);
    if (s && s.count > 0) {
      doLotWithTicketSingle(pool);
      renderLotDrawGrid(_lotCurPool);
      return;
    }
  } else if (times === 10) {
    // 十连：优先十连券，然后10张单抽券，然后魂力
    const tenT = G.bag.find(i => i.type === 'ticket' && i.data?.pool === pool && i.data?.ten);
    if (tenT && tenT.count > 0) {
      doLotWithTicketTenDirect(pool);
      renderLotDrawGrid(_lotCurPool);
      return;
    }
    const singles = G.bag.filter(i => i.type === 'ticket' && i.data?.pool === pool && !i.data?.ten);
    const sc = singles.reduce((s, i) => s + i.count, 0);
    if (sc >= 10) {
      doLotWithTicketTen(pool);
      renderLotDrawGrid(_lotCurPool);
      return;
    }
  }
  // 回退到魂力抽奖
  doLot(times);
  renderLotDrawGrid(_lotCurPool);
}

/**
 * 使用单抽券抽奖
 * @param {string} pool - 奖池类型
 */
export function doLotWithTicketSingle(pool) {
  const ticket = G.bag.find(i => i.type === 'ticket' && i.data?.pool === pool && !i.data?.ten);
  if (!ticket || ticket.count <= 0) {
    notify('没有可用的抽奖券！', 'normal');
    return;
  }
  
  ticket.count--;
  if (ticket.count <= 0) {
    const idx = G.bag.indexOf(ticket);
    if (idx > -1) G.bag.splice(idx, 1);
  }
  
  // 执行抽奖
  const result = rollLottery(pool, 1);
  showLotteryResult(result, pool, 1);
  saveG();
}

/**
 * 使用十连券抽奖
 * @param {string} pool - 奖池类型
 */
export function doLotWithTicketTenDirect(pool) {
  const ticket = G.bag.find(i => i.type === 'ticket' && i.data?.pool === pool && i.data?.ten);
  if (!ticket || ticket.count <= 0) {
    notify('没有可用的十连券！', 'normal');
    return;
  }
  
  ticket.count--;
  if (ticket.count <= 0) {
    const idx = G.bag.indexOf(ticket);
    if (idx > -1) G.bag.splice(idx, 1);
  }
  
  // 执行十连抽奖
  const results = rollLottery(pool, 10);
  showLotteryResult(results, pool, 10);
  saveG();
}

/**
 * 使用10张单抽券十连
 * @param {string} pool - 奖池类型
 */
export function doLotWithTicketTen(pool) {
  const singles = G.bag.filter(i => i.type === 'ticket' && i.data?.pool === pool && !i.data?.ten);
  let used = 0;
  for (const s of singles) {
    const take = Math.min(s.count, 10 - used);
    s.count -= take;
    used += take;
    if (s.count <= 0) {
      const idx = G.bag.indexOf(s);
      if (idx > -1) G.bag.splice(idx, 1);
    }
    if (used >= 10) break;
  }
  
  // 执行十连抽奖
  const results = rollLottery(pool, 10);
  showLotteryResult(results, pool, 10);
  saveG();
}

/**
 * 魂力抽奖
 * @param {number} times - 抽奖次数
 */
export function doLot(times) {
  const pool = ['common', 'advanced', 'apex'][_lotCurPool];
  const cfg = LOT[_lotCurPool];
  const cost = cfg.cost * times;
  
  if (G.sp < cost) {
    notify(`魂力不足！需要${cost}`, 'normal');
    return;
  }
  
  G.sp -= cost;
  
  // 执行抽奖
  const results = rollLottery(pool, times);
  showLotteryResult(results, pool, times);
  
  updateHUD();
  saveG();
}

/**
 * 滚动抽奖结果（完整实现）
 * @param {string} pool - 奖池类型
 * @param {number} times - 抽奖次数
 * @returns {Array} 抽奖结果数组
 */
function rollLottery(pool, times) {
  const poolIdx = ['common', 'advanced', 'apex'].indexOf(pool);
  const cfg = LOT[poolIdx >= 0 ? poolIdx : 0];
  const results = [];
  
  // 初始化保底计数
  const pity = initPityCounter(pool);
  
  // 追踪十连中是否有高价值物品
  let tenPullHasRare = false;
  
  for (let i = 0; i < times; i++) {
    const isTen = times >= 10;
    const rollIdx = i; // 在十连中的位置
    
    // 1. 检查欧皇状态（顶级奖池特有）
    if (G.ouhuang) {
      G.ouhuang = false;
      notify('👑 欧皇激活！', 'divine');
      if (G.ouhuangSpecial) {
        G.ouhuangSpecial = false;
        // 欧皇保底：神器/怒潮/宇宙之核 (1/3 each)
        const r3 = Math.random();
        if (r3 < 0.333) {
          results.push({ t: 'artifact', self: true, l: '自选神器(欧皇保底)' });
        } else if (r3 < 0.666) {
          results.push({ t: 'ring', ti: 5, l: '怒潮(欧皇保底)', bonus: true });
        } else {
          results.push({ t: 'ring', cosmic: true, l: '宇宙之核(欧皇保底)' });
        }
        pity.count = 0; // 重置保底计数
        continue;
      }
      // 普通欧皇：必出高价值物品
      const topItem = cfg.pool[cfg.pool.length - 2] || cfg.pool[cfg.pool.length - 1];
      results.push(topItem.fn(isTen));
      pity.count = 0;
      tenPullHasRare = true;
      continue;
    }
    
    // 2. 十连保底机制（最后一位必出稀有）
    if (isTen && rollIdx === 9) {
      // 前9抽已经确定，检查是否需要保底
      if (!tenPullHasRare) {
        // 十连保底：必出高价值物品
        const rarePool = cfg.pool.filter((p, idx) => {
          // 过滤掉魂力和基础资源，保留稀有物品
          const result = p.fn(false);
          return result.t !== 'sp' && result.t !== 'herb' && result.t !== 'resource';
        });
        
        if (rarePool.length > 0) {
          const selected = rarePool[Math.floor(Math.random() * rarePool.length)];
          results.push(selected.fn(true));
          tenPullHasRare = true;
          pity.count = 0;
          continue;
        }
      }
    }
    
    // 3. 普通抽卡（加权随机）
    const poolItems = cfg.pool.map(p => {
      let w = p.w;
      // 药草双倍权重
      try {
        const r = p.fn(false);
        if (r && r.t === 'herb') w *= 2;
      } catch (e) {}
      // 幸运加成
      if (G.luckBonus > 0) w *= (1 + G.luckBonus * 0.03);
      return { ...p, _w: w };
    });
    
    const total = poolItems.reduce((s, p) => s + (p._w || 0), 0);
    if (total <= 0) {
      results.push(poolItems[0].fn(isTen));
      continue;
    }
    
    let r = Math.random() * total;
    let c = 0;
    for (const p of poolItems) {
      c += (p._w || 0);
      if (r <= c) {
        const result = p.fn(isTen);
        
        // 4. 更新保底计数
        const tier = getItemTier(result, pool);
        if (tier >= 3) {
          // 高价值物品，重置保底
          pity.count = 0;
          tenPullHasRare = true;
        } else {
          pity.count++;
        }
        
        // 5. 检查保底触发
        const pityCfg = PITY_CONFIG[pool];
        if (pityCfg && pity.count >= pityCfg.pityThresholds[0]) {
          const pityItem = pityCfg.pityItems[0];
          if (pityItem && !tenPullHasRare) {
            notify(`🎯 保底触发！`, 'legend');
          }
        }
        
        results.push(result);
        break;
      }
    }
  }
  
  // 保存保底状态
  saveG();
  return results;
}

/**
 * 获取物品稀有等级
 */
function getItemTier(result, poolType) {
  if (!result) return 0;
  const t = result.t;
  
  if (t === 'ring' || t === 'ringbone') {
    return Math.min(result.ti || 0, 7);
  }
  if (t === 'bone') return result.ti || 0;
  if (t === 'artifact') return result.self ? 6 : 5;
  if (t === 'title') {
    const pool = result.pool;
    if (pool === 'special') return 8;
    if (pool === 'legend') return 7;
    if (pool === 'advanced') return 5;
    return 3;
  }
  return 0; // sp, herb, resource
}

/**
 * 应用抽奖结果到背包
 */
function applyLotResult(result, isTen = false) {
  if (!result) return;
  
  const t = result.t;
  const label = result.l || '--';
  
  switch (t) {
    case 'sp':
      // 由调用方处理魂力
      break;
    case 'ring':
    case 'ringbone':
      notify(`🔮 ${label}`, 'normal');
      if (result.bonus) notify(`✨ 附带特殊属性！`, 'epic');
      break;
    case 'bone':
      notify(`🦴 ${label} 战力+???`, 'epic');
      break;
    case 'artifact':
      if (result.self) {
        notify(`⚔️ 自选神器！请选择...`, 'legend');
      } else {
        notify(`⚔️ ${label}！战力×???`, 'legend');
      }
      break;
    case 'herb':
      notify(`🌿 ${label}！`, 'epic');
      break;
    case 'resource':
      notify(`📦 ${label}！`, 'normal');
      break;
    case 'title':
      notify(`👑 ${label}·战力+???`, 'divine');
      break;
    default:
      notify(`🎲 获得 ${label}`, 'normal');
  }
}

/**
 * 获取抽奖结果稀有等级（S/A/B/C）
 */
function getLotTier(result) {
  if (!result) return 'C';
  if (result.t === 'ring' && result.cosmic) return 'S';
  if (result.t === 'ring' && (result.ti || 0) >= 6) return 'S';
  if (result.t === 'title' && result.pool === 'special') return 'S';
  if (result.t === 'ring' && (result.ti || 0) === 5) return 'A';
  if (result.t === 'title' && result.pool === 'legend') return 'A';
  if (result.t === 'artifact' && result.self) return 'A';
  if (result.t === 'ring' && (result.ti || 0) === 4) return 'B';
  if (result.t === 'artifact') return 'B';
  if (result.t === 'title' && result.pool === 'advanced') return 'B';
  if (result.t === 'bone' && result.bonus) return 'B';
  return 'C';
}

/**
 * 显示抽奖结果反馈
 * @param {Array|Object} results - 抽奖结果
 * @param {string} pool - 奖池类型
 * @param {number} times - 抽奖次数
 */
function showLotteryResult(results, pool, times) {
  const isSingle = times === 1;
  
  if (isSingle) {
    const result = results[0];
    const tier = getLotTier(result);
    
    // 根据稀有度显示不同反馈
    if (tier === 'S') {
      notify(`🌟 绝世！${result.l}`, 'divine');
    } else if (tier === 'A') {
      notify(`✨ 顶级！${result.l}`, 'legend');
    } else if (tier === 'B') {
      notify(`⭐ ${result.l}`, 'epic');
    } else {
      applyLotResult(result, false);
    }
  } else {
    // 十连结果
    const tiers = results.map(r => getLotTier(r));
    const hasS = tiers.includes('S');
    const hasA = tiers.includes('A');
    const hasB = tiers.includes('B');
    
    if (hasS) {
      notify(`🌟🌟🌟 十连出绝世！！！`, 'divine');
    } else if (hasA) {
      notify(`✨✨ 十连出顶级！！！`, 'legend');
    } else if (hasB) {
      notify(`⭐ 获得稀有物品！`, 'epic');
    } else {
      notify(`🎲 十连完成！`, 'normal');
    }
  }
}

/**
 * 加权随机选择（基于LOT配置）
 */
function weightedRandomFromPool(poolItems) {
  const total = poolItems.reduce((s, p) => s + (p._w || 0), 0);
  if (total <= 0) return null;
  
  let r = Math.random() * total;
  for (const p of poolItems) {
    r -= (p._w || 0);
    if (r <= 0) return p;
  }
  return poolItems[poolItems.length - 1];
}

/**
 * 获取奖池抽数统计
 */
export function getLotPullCount(poolType) {
  if (!G.lotPity || !G.lotPity[poolType]) return 0;
  return G.lotPity[poolType].count;
}

/**
 * 获取奖池保底进度描述
 */
export function getPityProgress(poolType) {
  const pity = initPityCounter(poolType);
  const cfg = PITY_CONFIG[poolType];
  if (!cfg) return '';
  
  const nextThreshold = cfg.pityThresholds.find(t => t > pity.count);
  if (!nextThreshold) {
    return `已触发保底！`;
  }
  
  const remaining = nextThreshold - pity.count;
  return `保底进度：${pity.count}/${nextThreshold}（还差${remaining}抽）`;
}

/**
 * 渲染抽奖页面
 */
export function renderLotPage() {
  const page = document.getElementById('page-lottery');
  if (!page) return;
  
  page.innerHTML = `
    <div class="lottery-container">
      <div class="lottery-title">✨ 星运抽取</div>
      <div class="lottery-pools">
        <div class="pool-tab ${_lotCurPool === 0 ? 'active' : ''}" onclick="goLotPool(0)">普通池</div>
        <div class="pool-tab ${_lotCurPool === 1 ? 'active' : ''}" onclick="goLotPool(1)">高级池</div>
        <div class="pool-tab ${_lotCurPool === 2 ? 'active' : ''}" onclick="goLotPool(2)">顶级池</div>
      </div>
      <div class="lottery-content" id="lot-panel">
        <!-- 抽奖内容区域 -->
      </div>
      <div class="lottery-actions">
        <button class="lot-btn" onclick="doLotSmart(1)">单次抽取</button>
        <button class="lot-btn ten" onclick="doLotSmart(10)">十连抽取</button>
      </div>
    </div>
  `;
  
  updateLotPoolUI(_lotCurPool);
}

/**
 * 切换奖池
 * @param {number} idx - 奖池索引
 */
export function goLotPool(idx) {
  _lotCurPool = idx;
  curLotMode = idx;
  G.lotMode = idx;
  
  const track = document.getElementById('lot-banner-track');
  if (track) {
    track.style.transition = 'transform .38s cubic-bezier(.4,0,.2,1)';
    track.style.transform = `translateX(-${idx * (100 / 3)}%)`;
  }
  
  const dots = document.querySelectorAll('.ldot');
  const cols = LOT_POOL_COL;
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === idx);
    d.style.setProperty('--lpc', cols[idx]);
  });
  
  updateLotPoolUI(idx);
  updateTidalUI(idx);
}

/**
 * 更新奖池UI
 * @param {number} idx - 奖池索引
 */
export function updateLotPoolUI(idx) {
  const cfg = LOT[idx];
  const col = LOT_POOL_COL[idx];
  const [r, g, b] = LOT_GEO_CFG[idx].rgb;
  const poolType = ['common', 'advanced', 'apex'][idx];
  
  // 更新面板样式
  const panel = document.getElementById('lot-panel');
  if (panel) {
    panel.style.setProperty('--lpc-wash', LOT_POOL_WASH[idx]);
  }
  
  // 更新十连提示
  const sub = document.getElementById('lc10-sub');
  if (sub) sub.textContent = '特别概率提升 · 必有高价值';
  
  // 绘制网格
  renderLotDrawGrid(idx);
  
  // 更新奖池详情
  const pd = document.getElementById('pool-detail');
  if (pd) {
    // 构建奖池详情HTML
    const pityInfo = getPityProgress(poolType);
    const pityHtml = pityInfo ? `<div class="lr-pity-bar" style="border-color:${col}40;background:${col}10">
      <span class="lr-pity-icon">📊</span>
      <span class="lr-pity-text" style="color:${col}">${pityInfo}</span>
    </div>` : '';
    
    const detailHtml = cfg.detail.map(d => `
      <div class="lr-row">
        <div class="lr-item">
          <div class="lr-dot" style="background:${d.col || col}"></div>
          ${d.n}
        </div>
        <div>
          <span class="lr-lim">${d.lim ? '限时' : ''}</span>
          <span class="lr-pct">${d.p}</span>
        </div>
      </div>
    `).join('');
    
    pd.innerHTML = pityHtml + detailHtml;
  }
  
  // 更新保底计数器显示
  updatePityCounterUI(idx);
}

/**
 * 更新保底计数器UI
 */
function updatePityCounterUI(idx) {
  const poolType = ['common', 'advanced', 'apex'][idx];
  const pity = initPityCounter(poolType);
  const cfg = PITY_CONFIG[poolType];
  const col = LOT_POOL_COL[idx];
  
  // 查找或创建保底显示元素
  let pityEl = document.getElementById('lot-pity-counter');
  if (!pityEl) {
    const panel = document.getElementById('lot-panel');
    if (panel) {
      pityEl = document.createElement('div');
      pityEl.id = 'lot-pity-counter';
      pityEl.className = 'lot-pity-counter';
      panel.insertBefore(pityEl, panel.firstChild);
    }
  }
  
  if (pityEl && cfg) {
    const thresholds = cfg.pityThresholds;
    const nextThreshold = thresholds.find(t => t > pity.count) || thresholds[thresholds.length - 1];
    const progress = Math.min(1, pity.count / nextThreshold);
    const percent = Math.round(progress * 100);
    
    pityEl.innerHTML = `
      <div class="lp-title" style="color:${col}">📊 保底进度</div>
      <div class="lp-bar-bg">
        <div class="lp-bar-fill" style="width:${percent}%;background:${col}"></div>
      </div>
      <div class="lp-info">
        <span>${pity.count} / ${nextThreshold}</span>
        <span style="color:${col}">${nextThreshold - pity.count > 0 ? `还差${nextThreshold - pity.count}抽触发保底` : '⚡保底已触发！'}</span>
      </div>
    `;
  }
}

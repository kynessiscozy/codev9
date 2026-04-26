// ──── 抽奖系统模块 ────

import { G, saveG } from '../core/state.js';
import { notify } from '../core/notify.js';
import { updateHUD } from '../core/exp.js';

// 抽奖全局状态
let _lotCurPool = 0;
let curLotMode = 0;

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
 * 滚动抽奖结果
 * @param {string} pool - 奖池类型
 * @param {number} times - 抽奖次数
 * @returns {Array} 抽奖结果数组
 */
function rollLottery(pool, times) {
  const results = [];
  for (let i = 0; i < times; i++) {
    // 根据奖池权重随机获取物品
    const weights = getPoolWeights(pool);
    const item = weightedRandom(weights);
    results.push(item);
  }
  return results;
}

/**
 * 显示抽奖结果
 * @param {Array|Object} results - 抽奖结果
 * @param {string} pool - 奖池类型
 * @param {number} times - 抽奖次数
 */
function showLotteryResult(results, pool, times) {
  if (times === 1) {
    notify(`🎲 抽奖结果：${results.name}`, 'normal');
  } else {
    const summary = results.map(r => r.name).join(', ');
    notify(`🎲 十连结果：${summary}`, 'epic');
  }
}

/**
 * 获取奖池权重
 * @param {string} pool - 奖池类型
 * @returns {Array} 权重数组
 */
function getPoolWeights(pool) {
  // 根据奖池类型返回对应的权重配置
  const weightMap = {
    common: [{ name: '普通物品', weight: 70 }, { name: '稀有物品', weight: 25 }, { name: '史诗物品', weight: 5 }],
    advanced: [{ name: '普通物品', weight: 40 }, { name: '稀有物品', weight: 40 }, { name: '史诗物品', weight: 15 }, { name: '传说物品', weight: 5 }],
    apex: [{ name: '稀有物品', weight: 30 }, { name: '史诗物品', weight: 40 }, { name: '传说物品', weight: 25 }, { name: '顶级物品', weight: 5 }]
  };
  return weightMap[pool] || weightMap.common;
}

/**
 * 加权随机
 * @param {Array} weights - 权重数组
 * @returns {Object} 随机选择的项目
 */
function weightedRandom(weights) {
  const total = weights.reduce((sum, w) => sum + w.weight, 0);
  let rand = Math.random() * total;
  for (const item of weights) {
    rand -= item.weight;
    if (rand <= 0) return item;
  }
  return weights[weights.length - 1];
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
    pd.innerHTML = cfg.detail.map(d => `
      <div class="lr-row">
        <div class="lr-item">
          <div class="lr-dot" style="background:${d.col || 'var(--gold)'}"></div>
          ${d.n}
        </div>
        <div>
          <span class="lr-lim">${d.lim ? '限时' : ''}</span>
          <span class="lr-pct">${d.p}</span>
        </div>
      </div>
    `).join('');
  }
}

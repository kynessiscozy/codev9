// ──── 抽奖系统模块 ────

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

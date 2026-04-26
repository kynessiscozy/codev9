// ─── 世界探索系统模块 ───

/**
 * 探索世界
 */
export function explore() {
  if (G.explCount >= 10) { notify('今日探索已达上限(10次)', 'normal'); return; }
  G.explCount++;
  if (G.explEarned < 5000) {
    const a = Math.min(500, 5000 - G.explEarned);
    G.explEarned += a;
    addSP(a, '探索');
  } else {
    notify('今日探索魂力已满', 'normal');
  }
  addExp(85);
  progressTask('explore');
  progressTask('earn', 500);
  grantActivityDew('explore');
  if (Math.random() < 0.12) {
    const b = ['遗迹+200', '魂兽+300', '灵矿+500', '秘洞+800'];
    const e = pick(b);
    const v = parseInt(e.match(/\d+/)?.[0] || 200);
    addSP(v, null);
    notify(`🌲 ${e}魂力！`, 'epic');
  }
  if (Math.random() < 0.1) {
    const h = pick(HERBS);
    addHerbToBag(h);
    notify(`🌿 探索发现：${h.n}！`, 'epic');
    progressTask('herb');
  }
  if (Math.random() < 0.12) {
    const r = RESOURCES[ri(0, 5)];
    addResourceToBag(r);
    notify(`📦 发现资源：${r.n}！`, 'normal');
    progressTask('resource');
  }
  updateCultUI();
  saveG();
  renderBag();
}

/**
 * 解锁隐藏任务
 */
export function unlockHiddenTask() {
  // TODO: 实现隐藏任务解锁逻辑
  notify('🔓 隐藏任务已解锁！', 'legend');
}

/**
 * 领取隐藏奖励
 */
export function claimHidden() {
  // TODO: 实现隐藏奖励领取逻辑
  notify('🎁 领取隐藏奖励！', 'divine');
}

/**
 * 渲染世界探索页面
 */
export function renderWorldPage() {
  const wc = $('world-cards');
  if (!wc) return;
  // 世界探索页面内容
  wc.innerHTML = `
    <div class="world-container">
      <div class="world-title">🌍 世界探索</div>
      <div class="world-sub">探索未知领域，发现隐藏宝藏</div>
      <div class="explore-btn" onclick="explore()">
        <span class="exp-icon">🔍</span>
        <span class="exp-text">开始探索 (${G.explCount}/10)</span>
      </div>
      <div class="world-grid">
        <!-- 世界区域卡片 -->
      </div>
    </div>
  `;
}

/**
 * 渲染竞技场页面
 */
export function renderArenaPage() {
  const arena = G.arena || { wins: 0, losses: 0, tier: 'bronze' };
  return `
    <div class="arena-container">
      <div class="arena-title">⚔️ 竞技场</div>
      <div class="arena-stats">
        <div class="stat-item">
          <span class="stat-label">胜场</span>
          <span class="stat-value">${arena.wins || 0}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">败场</span>
          <span class="stat-value">${arena.losses || 0}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">段位</span>
          <span class="stat-value">${arena.tier || '青铜'}</span>
        </div>
      </div>
      <div class="arena-actions">
        <button class="arena-btn" onclick="startArenaMatch()">开始匹配</button>
      </div>
    </div>
  `;
}

/**
 * 开始竞技场匹配
 */
export function startArenaMatch() {
  if (G.sp < 100) { notify('魂力不足！需要100', 'normal'); return; }
  G.sp -= 100;
  // TODO: 实现匹配逻辑
  notify('⚔️ 匹配中...', 'normal');
  updateHUD();
  saveG();
}

/**
 * 渲染世界探索卡片
 */
export function renderWorldDots() {
  [0, 1].forEach(i => {
    const t = document.getElementById('wtab-' + i);
    if (!t) return;
    const active = i === worldPage;
    const cols = ['rgba(192,132,252,.6)', 'rgba(201,162,39,.5)'];
    const bgcols = ['rgba(192,132,252,.15)', 'rgba(201,162,39,.1)'];
    const tcols = ['#c084fc', 'var(--gl)'];
    t.style.borderColor = active ? cols[i] : 'var(--bdr)';
    t.style.background = active ? bgcols[i] : 'transparent';
    t.style.color = active ? tcols[i] : 'var(--dim)';
    t.style.fontWeight = active ? '600' : '400';
  });
}

/**
 * 设置世界页面
 * @param {number} pg - 页面索引
 */
export function setWorldPage(pg) {
  worldPage = pg;
  [0, 1].forEach(i => {
    const t = document.getElementById('wtab-' + i);
    if (!t) return;
    const cols = ['rgba(192,132,252,.6)', 'rgba(201,162,39,.5)'];
    const bgcols = ['rgba(192,132,252,.15)', 'rgba(201,162,39,.1)'];
    const tcols = ['#c084fc', 'var(--gl)'];
    if (i === pg) {
      t.style.borderColor = cols[i];
      t.style.background = bgcols[i];
      t.style.color = tcols[i];
      t.style.fontWeight = '600';
    } else {
      t.style.borderColor = 'var(--bdr)';
      t.style.background = 'transparent';
      t.style.color = 'var(--dim)';
      t.style.fontWeight = '400';
    }
  });
  renderWorldPage();
}

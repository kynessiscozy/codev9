// ──── 导航系统模块 ────

/**
 * 导航到指定页面
 * @param {string} page - 页面名称
 * @param {HTMLElement} el - 点击的元素
 */
export function navTo(page, el) {
  // 关闭背包覆盖层
  if (_bagOpen) toggleBagFab();
  
  const pf = $('PF');
  if (pf) { pf.style.display = 'none'; pf.classList.remove('active'); }
  
  // 隐藏所有页面，显示目标页面
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.ni').forEach(n => n.classList.remove('active'));
  
  const pg = document.getElementById('page-' + page);
  if (pg) pg.classList.add('active');
  if (el) el.classList.add('active');
  
  // 根据页面执行特定操作
  if (page === 'soul') {
    stopLotGeo();
    stopCwGeo();
    stopSbGeo();
    renderSoulPage();
  } else if (page === 'hunt') {
    stopLotGeo();
    hideSoulGeo();
    stopCwGeo();
    renderSeasonalTasks();
    renderRecentRings();
    updateGodPath();
    setTimeout(() => {
      if (!_sbGeoRaf) initSeasonalGeo();
    }, 80);
  } else if (page === 'lottery') {
    hideSoulGeo();
    stopCwGeo();
    stopSbGeo();
    renderLotPage();
  } else if (page === 'tasks') {
    stopLotGeo();
    hideSoulGeo();
    renderTasks();
    updateCultUI();
    renderSeasonalTasks();
    renderCalendar();
    setTimeout(() => {
      if (!_cwGeoRaf) initCwGeo();
      if (!_sbGeoRaf) initSeasonalGeo();
    }, 80);
  } else if (page === 'abyss') {
    stopLotGeo();
    hideSoulGeo();
    stopCwGeo();
    stopSbGeo();
    renderAbyssPage();
  } else {
    stopLotGeo();
    hideSoulGeo();
    stopCwGeo();
    stopSbGeo();
  }
}

/**
 * 初始化底部导航
 */
export function initBottomNav() {
  const bnav = document.getElementById('bnav');
  if (!bnav) return;
  
  bnav.innerHTML = `
    <div class="ni active" onclick="navTo('soul', this)">
      <div class="ni-icon">⚡</div>
      <div class="ni-label">武魂</div>
    </div>
    <div class="ni" onclick="navTo('hunt', this)">
      <div class="ni-icon">🏹️</div>
      <div class="ni-label">狩猎</div>
    </div>
    <div class="ni" onclick="navTo('lottery', this)">
      <div class="ni-icon">🎰</div>
      <div class="ni-label">抽奖</div>
    </div>
    <div class="ni" onclick="navTo('tasks', this)">
      <div class="ni-icon">📋</div>
      <div class="ni-label">任务</div>
      <div class="task-dot" style="display:none"></div>
    </div>
    <div class="ni" id="ni-abyss" style="opacity:0.5" onclick="navTo('abyss', this)">
      <div class="ni-icon">😈</div>
      <div class="ni-label">深渊</div>
    </div>
  `;
}

/**
 * 更新导航激活状态
 * @param {string} page - 页面名称
 */
export function updateNavActive(page) {
  document.querySelectorAll('.ni').forEach(n => {
    n.classList.toggle('active', n.getAttribute('onclick')?.includes(page));
  });
}

/**
 * 显示/隐藏返回顶部按钮
 */
export function initBackToTop() {
  window.addEventListener('scroll', () => {
    const btn = $('back-to-top');
    if (btn) {
      btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    }
  }, { passive: true });
}

/**
 * 返回顶部
 */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

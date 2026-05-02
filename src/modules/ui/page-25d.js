/**
 * 2.5D 全部页面交互脚本
 * CSS已在main.js中导入
 */

/** 初始化所有2.5D页面效果 */
export function initPage25D() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

function init() {
  initParticles();
  initHuntPage();
  initLotteryPage();
  initSoulPage();
  initTasksPage();
  initBagPage();
  initAbyssPage();
  console.log('✨ 2.5D 页面效果初始化完成');
}

/** 初始化粒子效果 */
function initParticles() {
  const pages = ['page-hunt', 'page-lottery', 'page-soul', 'page-tasks', 'page-bag', 'page-abyss'];
  
  pages.forEach(pageId => {
    const page = document.getElementById(pageId);
    if (!page) return;
    
    // 检查是否已有粒子容器
    if (page.querySelector('.page-particles')) return;
    
    const container = document.createElement('div');
    container.className = 'page-particles';
    
    // 添加背景元素
    const bg = document.createElement('div');
    bg.className = 'page-25d-bg';
    bg.innerHTML = `
      <div class="page-iso-floor"></div>
      <div class="zone-glow-25d glow-forest" style="top:5%;left:5%;width:150px;height:150px"></div>
      <div class="zone-glow-25d glow-chaos" style="top:25%;right:5%;width:130px;height:130px"></div>
      <div class="zone-glow-25d glow-primordial" style="top:45%;left:15%;width:120px;height:120px"></div>
      <div class="zone-glow-25d glow-random" style="top:65%;right:10%;width:110px;height:110px"></div>
    `;
    
    // 添加粒子
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'page-particle';
      const colors = ['#22c55e', '#a855f7', '#06b6d4', '#eab308', '#ef4444', '#6366f1'];
      const color = colors[i % colors.length];
      const size = 2 + Math.random() * 3;
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 8}s;
        animation-duration: ${8 + Math.random() * 6}s;
        box-shadow: 0 0 ${size * 2}px ${color};
      `;
      container.appendChild(particle);
    }
    
    page.insertBefore(bg, page.firstChild);
    page.insertBefore(container, page.firstChild);
  });
}

/** 初始化试炼页面 */
function initHuntPage() {
  const huntPage = document.getElementById('page-hunt');
  if (!huntPage) return;
  
  // 查找并升级区域卡片
  const zoneCards = huntPage.querySelectorAll('.zone-card:not(.zone-card-25d)');
  zoneCards.forEach(card => upgradeHuntCard(card));
  
  // 升级成神之路卡片
  const godpath = huntPage.querySelector('.zone-card.godpath');
  if (godpath) upgradeGodpathCard(godpath);
  
  // 升级特殊道路
  upgradeSpecialPaths();
}

/** 升级区域卡片为2.5D样式 */
function upgradeHuntCard(card) {
  // 获取卡片信息
  const onclick = card.getAttribute('onclick') || '';
  const isForest = card.classList.contains('forest');
  const isChaos = card.classList.contains('chaos');
  const isPrimordial = card.classList.contains('primordial');
  const isRandom = card.classList.contains('random');
  
  let zoneClass = 'forest';
  if (isChaos) zoneClass = 'chaos';
  else if (isPrimordial) zoneClass = 'primordial';
  else if (isRandom) zoneClass = 'random';
  
  // 获取内容
  const ico = card.querySelector('.z-ico')?.textContent || '🌲';
  const name = card.querySelector('.z-nm')?.textContent || '';
  const tags = card.querySelector('.z-tags')?.innerHTML || '';
  const cost = card.querySelector('.z-cost')?.textContent || '';
  
  // 创建新卡片
  const newCard = document.createElement('div');
  newCard.className = `zone-card-25d ${zoneClass}`;
  newCard.setAttribute('onclick', onclick);
  
  newCard.innerHTML = `
    <div class="zone-card-header-25d">
      <div class="zone-icon-25d" style="--zone-color: var(--zone-color)">
        <span class="icon-text">${ico}</span>
      </div>
      <div class="zone-name-25d">${name}</div>
    </div>
    <div class="zone-tags-25d">${tags}</div>
    <div class="zone-cost-25d">💜 ${cost.replace('魂力', '魂力')}</div>
  `;
  
  // 替换原卡片
  card.parentNode.replaceChild(newCard, card);
}

/** 升级成神之路卡片 */
function upgradeGodpathCard(card) {
  const onclick = card.getAttribute('onclick') || '';
  const desc = card.getElementById('gp-desc')?.textContent || '';
  const hint = card.getElementById('gp-hint')?.textContent || '';
  
  const newCard = document.createElement('div');
  newCard.className = 'godpath-card-25d';
  newCard.setAttribute('onclick', onclick);
  newCard.id = 'godpath-card';
  
  newCard.innerHTML = `
    <div class="godpath-icon-25d">🌟</div>
    <div class="godpath-title-25d">成神之路</div>
    <div class="godpath-desc-25d">${desc}</div>
    <div class="godpath-tags-25d">
      <span class="zone-tag-25d">🔴 需要9个魂环</span>
      <span class="zone-tag-25d">🏆 通关奖励丰厚</span>
      <span class="zone-tag-25d">⚡ 解锁神级属性</span>
    </div>
    <div class="z-lock-hint" id="gp-hint">${hint}</div>
  `;
  
  card.parentNode.replaceChild(newCard, card);
}

/** 升级特殊道路 */
function upgradeSpecialPaths() {
  const grid = document.getElementById('special-paths-grid');
  if (!grid || grid.classList.contains('special-paths-25d')) return;
  
  grid.className = 'special-paths-25d';
  
  // 等待内容加载后处理
  setTimeout(() => {
    const items = grid.querySelectorAll(':scope > div');
    items.forEach(item => {
      if (!item.classList.contains('special-path-25d')) {
        item.classList.add('special-path-25d');
        
        // 提取图标
        const icoEl = item.querySelector('.sp-ico, .spname, span:first-child');
        if (icoEl) {
          const ico = icoEl.textContent?.trim() || '⭐';
          const nameEl = item.querySelector('.spname, .sp-desc');
          const name = nameEl?.textContent?.split('·')[0] || '特殊道路';
          const desc = nameEl?.textContent?.split('·')[1] || '';
          
          item.innerHTML = `
            <div class="special-path-icon-25d">${ico}</div>
            <div class="special-path-name-25d">${name}</div>
            ${desc ? `<div class="special-path-desc-25d">${desc}</div>` : ''}
          `;
        }
      }
    });
  }, 100);
}

/** 初始化星运页面 */
function initLotteryPage() {
  const lotPage = document.getElementById('page-lottery');
  if (!lotPage) return;
  
  // 升级轮播区域
  const bannerOuter = lotPage.querySelector('.lot-banner-outer');
  if (bannerOuter && !bannerOuter.classList.contains('lot-banner-outer-25d')) {
    bannerOuter.classList.add('lot-banner-outer-25d');
  }
  
  const bannerTrack = lotPage.querySelector('.lot-banner-track');
  if (bannerTrack && !bannerTrack.classList.contains('lot-banner-track-25d')) {
    bannerTrack.classList.add('lot-banner-track-25d');
  }
  
  // 升级奖池幻灯片
  const slides = lotPage.querySelectorAll('.lot-slide');
  slides.forEach(slide => {
    if (!slide.classList.contains('lot-slide-25d')) {
      slide.classList.add('lot-slide-25d');
      if (slide.classList.contains('ls-0')) slide.classList.add('pool-standard');
      if (slide.classList.contains('ls-1')) slide.classList.add('pool-elite');
      if (slide.classList.contains('ls-2')) slide.classList.add('pool-apex');
    }
  });
  
  // 添加奖池指示器
  addLotteryIndicators();
  
  // 升级历史记录区域
  upgradeLotteryHistory();
  
  // 升级限时活动卡片
  const sbCards = lotPage.querySelectorAll('.sb-card');
  sbCards.forEach(card => {
    if (!card.classList.contains('sb-card-25d')) {
      card.classList.add('sb-card-25d');
    }
  });
}

/** 添加奖池轮播指示器 */
function addLotteryIndicators() {
  const lotPage = document.getElementById('page-lottery');
  if (!lotPage) return;
  
  // 检查是否已有指示器
  if (lotPage.querySelector('.lot-indicators-25d')) return;
  
  const bannerOuter = lotPage.querySelector('.lot-banner-outer-25d');
  if (!bannerOuter) return;
  
  const indicators = document.createElement('div');
  indicators.className = 'lot-indicators-25d';
  indicators.innerHTML = `
    <div class="lot-indicator-25d active" data-pool="0" style="--pool-color:#9ca3af;--pool-glow:rgba(156,163,175,0.5)"></div>
    <div class="lot-indicator-25d" data-pool="1" style="--pool-color:#a855f7;--pool-glow:rgba(168,85,247,0.5)"></div>
    <div class="lot-indicator-25d" data-pool="2" style="--pool-color:#ef4444;--pool-glow:rgba(239,68,68,0.5)"></div>
  `;
  
  // 点击指示器切换
  indicators.querySelectorAll('.lot-indicator-25d').forEach(ind => {
    ind.addEventListener('click', () => {
      const poolIndex = parseInt(ind.dataset.pool);
      switchLotteryPool(poolIndex);
    });
  });
  
  bannerOuter.parentNode.insertBefore(indicators, bannerOuter.nextSibling);
}

/** 切换奖池 */
function switchLotteryPool(index) {
  const lotPage = document.getElementById('page-lottery');
  if (!lotPage) return;
  
  const track = lotPage.querySelector('.lot-banner-track-25d');
  const bannerOuter = lotPage.querySelector('.lot-banner-outer-25d');
  
  // 奖池RGB配置
  const poolRGB = [
    { r: 156, g: 163, b: 175 },  // 普通 - 银灰
    { r: 168, g: 85, b: 247 },    // 高级 - 紫色
    { r: 239, g: 68, b: 68 }      // 顶级 - 红色
  ];
  
  // 更新背景光效颜色
  if (bannerOuter) {
    bannerOuter.style.setProperty('--pool-r', poolRGB[index].r);
    bannerOuter.style.setProperty('--pool-g', poolRGB[index].g);
    bannerOuter.style.setProperty('--pool-b', poolRGB[index].b);
  }
  
  // 切换轮播
  if (track) {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  
  // 更新指示器
  lotPage.querySelectorAll('.lot-indicator-25d').forEach((ind, i) => {
    ind.classList.toggle('active', i === index);
  });
  
  // 触发切换动画
  if (bannerOuter) {
    bannerOuter.classList.add('pool-switching');
    setTimeout(() => bannerOuter.classList.remove('pool-switching'), 600);
  }
}

/** 升级历史记录区域 */
function upgradeLotteryHistory() {
  const lotPage = document.getElementById('page-lottery');
  if (!lotPage) return;
  
  const historyDiv = lotPage.querySelector('#lot-history');
  if (historyDiv && !historyDiv.classList.contains('lot-history-25d')) {
    historyDiv.classList.add('lot-history-25d');
    
    const title = historyDiv.querySelector('.lht');
    if (title) {
      title.classList.add('lot-history-title');
    }
    
    const list = historyDiv.querySelector('.lot-history');
    if (list) {
      list.classList.add('lot-history-list');
    }
  }
}

/** 销毁2.5D效果 */
export function destroyPage25D() {
  document.querySelectorAll('.page-particles, .page-25d-bg').forEach(el => el.remove());
}



/** 初始化武魂页面2.5D效果 */
function initSoulPage() {
  const soulPage = document.getElementById('page-soul');
  if (!soulPage) return;
  
  // 添加武魂页面专属效果类
  soulPage.classList.add('soul-page-25d');
  
  // 为SV2卡片添加交错入场动画延时
  const cards = soulPage.querySelectorAll('.sv2-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${0.1 + index * 0.08}s`;
  });
  
  // 为魂环列表行添加交错入场
  const ringRows = soulPage.querySelectorAll('.sv2-rl-row');
  ringRows.forEach((row, index) => {
    row.style.animationDelay = `${0.2 + index * 0.05}s`;
  });
  
  // 为技能项添加交错入场
  const skills = soulPage.querySelectorAll('.sv2-sk');
  skills.forEach((sk, index) => {
    sk.style.animationDelay = `${0.3 + index * 0.06}s`;
  });
  
  // 为操作按钮添加交错入场
  const acts = soulPage.querySelectorAll('.sol-act');
  acts.forEach((act, index) => {
    act.style.animationDelay = `${0.4 + index * 0.05}s`;
  });
}

/** 重试初始化（当页面动态重新渲染后调用） */
window.reinitSoulPage = function() {
  initSoulPage();
};

/** 初始化任务页面2.5D效果 */
function initTasksPage() {
  const tasksPage = document.getElementById('page-tasks');
  if (!tasksPage) return;
  
  // 添加任务页面专属效果类
  tasksPage.classList.add('tasks-page-25d');
  
  // 升级日历组件
  upgradeCalendarWidget();
  
  // 升级修炼组件
  upgradeCultivationWidget();
  
  // 升级任务卡片
  upgradeTaskCards();
}

/** 升级日历组件 */
function upgradeCalendarWidget() {
  const calWidget = document.getElementById('cal-widget');
  if (calWidget && !calWidget.classList.contains('cal-widget-25d')) {
    calWidget.classList.add('cal-widget-25d');
  }
}

/** 升级修炼组件 */
function upgradeCultivationWidget() {
  const cultWidget = document.querySelector('.cult-widget');
  if (cultWidget && !cultWidget.classList.contains('cult-widget-25d')) {
    cultWidget.classList.add('cult-widget-25d');
  }
}

/** 升级任务卡片 */
function upgradeTaskCards() {
  const tasksPage = document.getElementById('page-tasks');
  const taskCards = tasksPage.querySelectorAll('.tc');
  
  taskCards.forEach((card, index) => {
    if (!card.classList.contains('task-card-25d')) {
      card.classList.add('task-card-25d');
      card.style.animationDelay = `${index * 0.08}s`;
    }
  });
}

/** 初始化背包页面2.5D效果 */
function initBagPage() {
  const bagPage = document.getElementById('page-bag');
  if (!bagPage) return;
  
  // 添加背包页面专属效果类
  bagPage.classList.add('bag-page-25d');
  
  // 升级背包标签
  upgradeBagTabs();
  
  // 升级背包物品卡片
  upgradeBagItems();
}

/** 升级背包标签 */
function upgradeBagTabs() {
  const bagTabs = document.getElementById('bag-tabs');
  if (bagTabs && !bagTabs.classList.contains('bag-tabs-25d')) {
    bagTabs.classList.add('bag-tabs-25d');
  }
}

/** 升级背包物品卡片 */
function upgradeBagItems() {
  const bagPage = document.getElementById('page-bag');
  const bagItems = bagPage.querySelectorAll('.bag-item');
  
  bagItems.forEach((item, index) => {
    if (!item.classList.contains('bag-item-25d')) {
      item.classList.add('bag-item-25d');
      // 计算网格位置以实现交错动画
      const col = index % 4;
      item.style.animationDelay = `${col * 0.05}s`;
    }
  });
}

/** 初始化世界探索页面2.5D效果 */
function initAbyssPage() {
  const abyssPage = document.getElementById('page-abyss');
  if (!abyssPage) return;
  
  // 添加世界探索页面专属效果类
  abyssPage.classList.add('abyss-page-25d');
  
  // 升级世界卡片
  upgradeWorldCards();
  
  // 升级世界标签
  upgradeWorldTabs();
}

/** 升级世界卡片 */
function upgradeWorldCards() {
  const abyssPage = document.getElementById('page-abyss');
  const worldCards = abyssPage.querySelectorAll('.world-card, .world-card-big');
  
  worldCards.forEach((card, index) => {
    if (!card.classList.contains('world-card-25d')) {
      card.classList.add('world-card-25d');
      card.style.animationDelay = `${index * 0.1}s`;
    }
  });
}

/** 升级世界标签 */
function upgradeWorldTabs() {
  const abyssPage = document.getElementById('page-abyss');
  const worldTabs = abyssPage.querySelectorAll('#world-tab-bar > div');
  
  worldTabs.forEach((tab, index) => {
    if (!tab.classList.contains('world-tab-25d')) {
      tab.classList.add('world-tab-25d');
      tab.style.animationDelay = `${index * 0.05}s`;
    }
  });
}

// 导出到全局
window.initPage25D = initPage25D;
window.destroyPage25D = destroyPage25D;

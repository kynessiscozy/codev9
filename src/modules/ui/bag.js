// ──── 背包系统UI模块（框架版）───

/**
 * 渲染背包页面
 */
export function renderBag() {
  const page = document.getElementById('page-bag');
  if (!page) return;
  
  // 按类型分组显示背包物品
  const items = G.bag || [];
  const rings = items.filter(i => i.type === 'ring');
  const bones = items.filter(i => i.type === 'bone');
  const herbs = items.filter(i => i.type === 'herb');
  const resources = items.filter(i => i.type === 'resource');
  const tickets = items.filter(i => i.type === 'ticket');
  const artifacts = items.filter(i => i.type === 'artifact');
  
  page.innerHTML = `
    <div class="bag-container">
      <div class="bag-title">🎒 背包</div>
      <div class="bag-tabs">
        <div class="btab active" onclick="filterBag('all', this)">全部</div>
        <div class="btab" onclick="filterBag('ring', this)">魂环</div>
        <div class="btab" onclick="filterBag('bone', this)">魂骨</div>
        <div class="btab" onclick="filterBag('herb', this)">药草</div>
        <div class="btab" onclick="filterBag('resource', this)">资源</div>
        <div class="btab" onclick="filterBag('ticket', this)">券</div>
      </div>
      <div class="bag-grid" id="bag-grid">
        ${renderBagItems(items)}
      </div>
    </div>
  `;
}

/**
 * 渲染背包物品
 * @param {Array} items - 物品数组
 */
function renderBagItems(items) {
  if (!items || !items.length) {
    return '<div class="empty-st"><div class="ei">🎒</div><div class="em">背包为空</div></div>';
  }
  
  return items.map(it => {
    let ico, nm, col = 'var(--dim)';
    if (it.type === 'ring') { ico = '⭕'; nm = it.data?.n; col = it.data?.c; }
    else if (it.type === 'bone') { ico = it.data?.i || '🦴'; nm = it.data?.n; col = '#fbbf24'; }
    else if (it.type === 'herb') { ico = it.data?.i; nm = it.data?.n; col = it.data?.c; }
    else if (it.type === 'resource') { ico = it.data?.i; nm = it.data?.n; col = it.data?.c; }
    else if (it.type === 'ticket') { ico = it.data?.i || '🎟️'; nm = it.data?.n; col = it.data?.c; }
    else if (it.type === 'artifact') { ico = it.data?.i; nm = it.data?.n; col = 'var(--legend)'; }
    
    return `
      <div class="bag-item" onclick="openBagItem('${it.id || it.data?.id}','${it.type}')">
        <div class="bi">${ico}</div>
        <div class="bn" style="color:${col}">${nm}</div>
        ${it.count > 1 ? `<div class="bc">${it.count}</div>` : ''}
      </div>
    `;
  }).join('');
}

/**
 * 过滤背包物品
 * @param {string} filter - 过滤类型
 * @param {HTMLElement} el - 点击的元素
 */
export function filterBag(filter, el) {
  curBagFilter = filter;
  document.querySelectorAll('.btab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  renderBag();
}

/**
 * 打开背包物品详情
 * @param {string} id - 物品ID
 * @param {string} type - 物品类型
 */
export function openBagItem(id, type) {
  const it = G.bag.find(i => (i.id == id) || (i.data?.id == id));
  if (!it) return;
  
  let detailHtml = '';
  if (type === 'ring') {
    detailHtml = `
      <div class="m-title" style="color:${it.data.c}">${it.data.i} ${it.data.n}</div>
      <div class="m-sub">${it.data.y}年魂环</div>
      <div style="font-size:11px;color:var(--dim);line-height:1.8">
        <div>技能：${it.data.sk}</div>
        <div>战力：+${it.data.pw}</div>
      </div>
    `;
  } else if (type === 'bone') {
    detailHtml = `
      <div class="m-title">${it.data.i} ${it.data.n}</div>
      <div style="font-size:11px;color:var(--dim);line-height:1.8">
        <div>战力：+${it.data.pw}</div>
        <div>类型：${it.data.slot}</div>
      </div>
    `;
  }
  
  openModal(detailHtml);
}

/**
 * 使用背包物品
 * @param {string} id - 物品ID
 */
export function useBagItem(id) {
  const idx = G.bag.findIndex(i => (i.id == id) || (i.data?.id == id));
  if (idx === -1) return;
  
  const it = G.bag[idx];
  if (it.type === 'herb') {
    // 使用药草
    notify(`使用了${it.data.n}`, 'normal');
  }
  
  it.count--;
  if (it.count <= 0) G.bag.splice(idx, 1);
  
  saveG();
  renderBag();
}

/**
 * 丢弃背包物品
 * @param {string} id - 物品ID
 */
export function discardBagItem(id) {
  if (!confirm('确定要丢弃这个物品吗？')) return;
  
  const idx = G.bag.findIndex(i => (i.id == id) || (i.data?.id == id));
  if (idx !== -1) G.bag.splice(idx, 1);
    
  saveG();
  renderBag();
  closeModal();
}

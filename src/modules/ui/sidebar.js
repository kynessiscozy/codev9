// ─── 侧边栏UI模块（框架版）───

import { G } from '../core/state.js';
import { calcPower } from '../core/power.js';

/**
 * 渲染侧边栏
 */
export function renderSidebar() {
  const sidebar = $('sidebar');
  if (!sidebar) return;
  sidebar.innerHTML = `
    <div class="sidebar-header">
      <div class="sidebar-title">⚙️ 菜单</div>
      <div class="sidebar-close" onclick="closeSidebar()">✕</div>
    </div>
    <div class="sidebar-content">
      <div class="sidebar-item" onclick="navTo('soul',this)">
        <span class="si-icon">⚡</span>
        <span class="si-label">武魂</span>
      </div>
      <div class="sidebar-item" onclick="navTo('hunt',this)">
        <span class="si-icon">🏹️</span>
        <span class="si-label">狩猎</span>
      </div>
      <div class="sidebar-item" onclick="navTo('lottery',this)">
        <span class="si-icon">🎰</span>
        <span class="si-label">抽奖</span>
      </div>
      <div class="sidebar-item" onclick="openGrimoire()">
        <span class="si-icon">📖</span>
        <span class="si-label">图鉴</span>
      </div>
      <div class="sidebar-item" onclick="openSettings()">
        <span class="si-icon">⚙️</span>
        <span class="si-label">设置</span>
      </div>
    </div>
  `;
}

/**
 * 切换侧边栏显示/隐藏
 */
export function toggleSidebar() {
  const sidebar = $('sidebar');
  if (!sidebar) return;
  if (sidebar.classList.contains('open')) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

/**
 * 打开侧边栏
 */
export function openSidebar() {
  const sidebar = $('sidebar');
  if (sidebar) {
    sidebar.classList.add('open');
    sidebar.style.display = 'block';
  }
}

/**
 * 关闭侧边栏
 */
export function closeSidebar() {
  const sidebar = $('sidebar');
  if (sidebar) {
    sidebar.classList.remove('open');
  }
}

/**
 * 更新侧边栏信息
 */
export function updateSidebar() {
  const spEl = $('sidebar-sp');
  const powEl = $('sidebar-pow');
  if (spEl) spEl.textContent = G.sp || 0;
  if (powEl) powEl.textContent = calcPower().toLocaleString();
}

// TODO: 从game.js提取更多侧边栏相关函数

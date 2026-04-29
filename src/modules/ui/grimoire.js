/**
 * 图鉴系统模块
 * 管理武魂图鉴、魂环图鉴、魂骨图鉴的显示
 */

import { G } from '../core/state.js';
import { $, $set } from '../core/utils.js';
import { SD, getAllSouls } from '../data/souls.js';
import { RT } from '../data/rings.js';
import { BONE_POOL } from '../data/bones.js';
import { getSoulIcon, hasSoulIcon } from './soul-icons.js';

// 图鉴状态
let grimoireTab = 'souls';

/**
 * 渲染图鉴页面
 */
export function renderGrimoire() {
  const c = $('#grimoireContent');
  if (!c) return;
  
  c.innerHTML = '';
  
  // 创建标签栏
  const tabs = [
    { id: 'souls', name: '武魂图鉴' },
    { id: 'rings', name: '魂环图鉴' },
    { id: 'bones', name: '魂骨图鉴' }
  ];
  
  const tabBar = document.createElement('div');
  tabBar.className = 'grimoire-tabs';
  tabBar.style.cssText = 'display:flex;gap:8px;margin-bottom:16px;';
  
  tabs.forEach(tab => {
    const btn = document.createElement('button');
    btn.textContent = tab.name;
    btn.className = `tab-btn ${grimoireTab === tab.id ? 'active' : ''}`;
    btn.onclick = () => {
      grimoireTab = tab.id;
      renderGrimoire();
    };
    tabBar.appendChild(btn);
  });
  
  c.appendChild(tabBar);
  
  // 渲染对应内容
  switch (grimoireTab) {
    case 'souls':
      renderSoulsGrimoire(c);
      break;
    case 'rings':
      renderRingsGrimoire(c);
      break;
    case 'bones':
      renderBonesGrimoire(c);
      break;
  }
}

/**
 * 渲染武魂图鉴
 */
function renderSoulsGrimoire(container) {
  const grid = document.createElement('div');
  grid.className = 'grimoire-grid';
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;';

  const souls = getAllSouls();
  souls.forEach(soul => {
    const card = document.createElement('div');
    card.className = 'grimoire-card';
    card.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:8px;padding:12px;cursor:pointer;transition:all .2s;';

    const isDiscovered = G.grimoire?.souls?.includes(soul.id) || false;
    const svgIcon = isDiscovered ? getSoulIcon(soul.n, soul.q, { sizeClass: 'size-medium', animated: false }) : '<span style="font-size:28px;">❓</span>';

    card.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:48px;margin-bottom:8px;">
        ${svgIcon}
      </div>
      <div style="text-align:center;font-weight:700;color:${isDiscovered ? '#fbbf24' : '#64748b'}">
        ${isDiscovered ? soul.n : '未解锁'}
      </div>
      ${isDiscovered ? `
        <div style="font-size:12px;color:#94a3b8;text-align:center;margin-top:4px;">
          ${(soul.a || []).join(' · ')}
        </div>
      ` : ''}
    `;

    if (isDiscovered) {
      card.onmouseenter = () => {
        card.style.borderColor = '#fbbf24';
        card.style.transform = 'translateY(-2px)';
      };
      card.onmouseleave = () => {
        card.style.borderColor = '#334155';
        card.style.transform = 'none';
      };
    }

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

/**
 * 渲染魂环图鉴
 */
function renderRingsGrimoire(container) {
  const grid = document.createElement('div');
  grid.className = 'grimoire-grid';
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;';
  
  RT.forEach(ring => {
    const card = document.createElement('div');
    card.className = 'grimoire-card';
    card.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:8px;padding:12px;';
    
    const isDiscovered = G.grimoire?.rings?.includes(ring.id) || false;
    
    card.innerHTML = `
      <div style="text-align:center;font-weight:700;color:${ring.color};margin-bottom:8px;">
        ${ring.name}
      </div>
      <div style="font-size:12px;color:#94a3b8;text-align:center;">
        年限: ${ring.years.toLocaleString()}<br>
        加成: ${ring.statBonuses[0]?.value || 0}%
      </div>
    `;
    
    grid.appendChild(card);
  });
  
  container.appendChild(grid);
}

/**
 * 渲染魂骨图鉴
 */
function renderBonesGrimoire(container) {
  const grid = document.createElement('div');
  grid.className = 'grimoire-grid';
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;';
  
  const allBones = Object.values(BONE_POOL).flat();
  allBones.forEach(bone => {
    const card = document.createElement('div');
    card.className = 'grimoire-card';
    card.style.cssText = 'background:#1e293b;border:1px solid #334155;border-radius:8px;padding:12px;';
    
    const isDiscovered = G.grimoire?.bones?.includes(bone.id) || false;
    
    card.innerHTML = `
      <div style="text-align:center;font-size:32px;margin-bottom:8px;">
        ${isDiscovered ? bone.icon : '❓'}
      </div>
      <div style="text-align:center;font-weight:700;color:${isDiscovered ? '#a855f7' : '#64748b'}">
        ${isDiscovered ? bone.name : '未解锁'}
      </div>
    `;
    
    grid.appendChild(card);
  });
  
  container.appendChild(grid);
}

/**
 * 发现武魂（添加到图鉴）
 * @param {string} soulName - 武魂名称
 * @param {string} quality - 品质
 */
export function grimoireDiscover(soulName, quality) {
  if (!G.grimoire) G.grimoire = { souls: [], rings: [], bones: [] };
  if (!G.grimoire.souls.includes(soulName)) {
    G.grimoire.souls.push(soulName);
    return true;
  }
  return false;
}

// 别名导出，兼容不同调用方式
export const discoverSoul = grimoireDiscover;

/**
 * 发现魂环（添加到图鉴）
 */
export function discoverRing(ringId) {
  if (!G.grimoire) G.grimoire = { souls: [], rings: [], bones: [] };
  if (!G.grimoire.rings.includes(ringId)) {
    G.grimoire.rings.push(ringId);
    return true;
  }
  return false;
}

/**
 * 发现魂骨（添加到图鉴）
 */
export function discoverBone(boneId) {
  if (!G.grimoire) G.grimoire = { souls: [], rings: [], bones: [] };
  if (!G.grimoire.bones.includes(boneId)) {
    G.grimoire.bones.push(boneId);
    return true;
  }
  return false;
}

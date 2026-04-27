// ─── 季节系统模块 ───

import { $, spawnBurst } from '../core/utils.js';
import { notify } from '../core/notify.js';
import { saveG } from '../core/state.js';
import { addTicketToBag } from './lottery.js';
import { renderBag } from '../ui/bag.js';
import { renderSeasonalTasks } from './tasks.js';

// 季节几何动画
let _sbGeoRaf = null;
const _sbGeoAng = [];

/**
 * 停止季节几何动画
 */
export function stopSbGeo() {
  if (_sbGeoRaf) {
    cancelAnimationFrame(_sbGeoRaf);
    _sbGeoRaf = null;
  }
}

/**
 * 初始化季节几何画布（已禁用）
 */
export function initSeasonalGeo() {
  // 季节几何动画已禁用
  return;
}

/**
 * 渲染季节活动
 */
export function renderSeasonalActivities() {
  const c = $('seasonal-activities');
  if (!c) return;
  
  c.innerHTML = `
    <div class="activity-card">
      <div class="ac-icon">🌸</div>
      <div class="ac-info">
        <div class="ac-name">踏春活动</div>
        <div class="ac-desc">完成日常任务获取奖励</div>
      </div>
      <div class="ac-btn" onclick="renderSeasonalTasks()">查看任务</div>
    </div>
  `;
}

/**
 * 获取当前季节
 * @returns {string} 季节名称
 */
export function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

/**
 * 获取季节加成
 * @returns {Object} 季节加成配置
 */
export function getSeasonBonus() {
  const season = getCurrentSeason();
  const bonuses = {
    spring: { exp: 1.2, sp: 1.1, desc: '春天气息，万物复苏' },
    summer: { exp: 1.1, sp: 1.2, desc: '夏日炎炎，精力充沛' },
    autumn: { exp: 1.15, sp: 1.15, desc: '秋高气爽，收获季节' },
    winter: { exp: 1.0, sp: 1.3, desc: '冬日寒冷，需要更多魂力' }
  };
  return bonuses[season] || bonuses.spring;
}

export function stopCwGeo() {
  // 占位：由 game.js 覆盖
}

export function initCwGeo() {
  // 占位：由 game.js 覆盖
}

/**
 * 检查新手礼包（占位，完整版由 game.js 覆盖）
 */
export function checkNewbieGift() {
  // game.js 注入后会覆盖此函数
}

/**
 * 触发季节活动
 * @param {string} type - 活动类型（如 'level', 'battle', 'explore'）
 */
export function triggerSeasonal(type = 'normal') {
  const season = getCurrentSeason();
  const bonus = getSeasonBonus();
  
  // 根据类型和季节给予奖励
  if (type === 'level') {
    // 升级时触发季节加成提示
    notify(`🌸 当前季节：${season} | 经验加成：${((bonus.exp - 1) * 100).toFixed(0)}%`);
  }
  
  // 可以在这里添加更多季节活动逻辑
  return bonus;
}

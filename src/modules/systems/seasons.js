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
 * 初始化季节几何画布
 */
export function initSeasonalGeo() {
  const cvs = $('sb-geo');
  if (!cvs || _sbGeoRaf) return;
  const banner = $('sb-banner');
  if (!banner) return;
  const rect = banner.getBoundingClientRect();
  cvs.width = rect.width || 390;
  cvs.height = Math.max(rect.height, 80);
  
  const rings = [
    { rx: 80, ry: 58, spd: .0014, dir: 1, op: .13 },
    { rx: 120, ry: 87, spd: .0009, dir: -1, op: .08, dash: true },
  ];
  
  _sbGeoAng.length = 0;
  rings.forEach(() => _sbGeoAng.push(0));
  
  const ctx = cvs.getContext('2d');
  function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    const cx = cvs.width * .5, cy = cvs.height * .4;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(cvs.width, cvs.height) * .6);
    grad.addColorStop(0, 'rgba(192,132,252,.13)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    
    rings.forEach((ring, ri) => {
      _sbGeoAng[ri] += ring.spd * ring.dir;
      const angle = _sbGeoAng[ri];
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.setLineDash(ring.dash ? [5, 9] : []);
      ctx.beginPath();
      ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(192,132,252,${ring.op})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    });
    
    _sbGeoRaf = requestAnimationFrame(draw);
  }
  
  draw();
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

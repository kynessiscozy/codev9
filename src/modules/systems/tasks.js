// ──── 任务系统模块 ────

import { G, saveG } from '../core/state.js';
import { notify } from '../core/notify.js';
import { addSP, addExp } from '../core/exp.js';
import { spawnBurst } from '../core/utils.js';
import { addTicketToBag } from './lottery.js';
import { renderBag } from '../ui/bag.js';


/**
 * 设置任务点
 * @param {boolean} has - 是否有待完成任务
 */
export function setTaskDot(has) {
  G.taskDotPending = has;
  document.querySelectorAll('.ni').forEach(ni => {
    const lbl = ni.querySelector('.lbl');
    if (lbl && lbl.textContent.includes('任务')) {
      let dot = ni.querySelector('.task-dot');
      if (has && !dot) {
        dot = document.createElement('div');
        dot.className = 'task-dot';
        dot.style.cssText = 'position:absolute;top:6px;right:12px;width:7px;height:7px;border-radius:50%;background:#ef4444;box-shadow:0 0 6px #ef4444';
        ni.appendChild(dot);
      } else if (!has && dot) {
        dot.remove();
      }
    }
  });
}

/**
 * 进度任务
 * @param {string} type - 任务类型
 * @param {number} value - 进度值
 */
export function progressTask(type, value = 1) {
  if (!G.tasks) G.tasks = {};
  if (!G.tasks[type]) G.tasks[type] = { count: 0, claimed: false };
  
  G.tasks[type].count += value;
  
  // 检查是否可以领取奖励
  const thresholds = {
    hunt: 10,
    explore: 10,
    earn: 5000,
    herb: 20,
    resource: 30
  };
  
  if (thresholds[type] && G.tasks[type].count >= thresholds[type]) {
    G.tasks[type].claimed = false;
    setTaskDot(true);
  }
}

/**
 * 领取任务奖励
 * @param {string} type - 任务类型
 */
export function claimTaskReward(type) {
  if (!G.tasks || !G.tasks[type]) return;
  if (G.tasks[type].claimed) {
    notify('奖励已领取！', 'normal');
    return;
  }
  
  G.tasks[type].claimed = true;
  
  // 根据任务类型给予奖励
  const rewards = {
    hunt: { sp: 500, exp: 200 },
    explore: { sp: 300, exp: 150 },
    earn: { sp: 1000, exp: 500 },
    herb: { sp: 200, exp: 100 },
    resource: { sp: 300, exp: 150 }
  };
  
  const reward = rewards[type];
  if (reward) {
    addSP(reward.sp, '任务奖励');
    addExp(reward.exp);
    notify(`🎁 领取${type}任务奖励！魂力+${reward.sp} 经验+${reward.exp}`, 'divine');
  }
  
  setTaskDot(false);
  saveG();
  renderTasks();
}

/**
 * 渲染任务页面
 */
export function renderTasks() {
  const page = document.getElementById('page-tasks');
  if (!page) return;
  
  const tasks = G.tasks || {};
  
  page.innerHTML = `
    <div class="tasks-container">
      <div class="tasks-title">📋 任务列表</div>
      <div class="tasks-sub">完成任务获取奖励</div>
      
      <div class="task-list">
        ${Object.entries({
          hunt: { name: '狩猎任务', desc: '狩猎10次魂兽', icon: '🏹' },
          explore: { name: '探索任务', desc: '探索10次世界', icon: '🔍' },
          earn: { name: '魂力任务', desc: '累计获得5000魂力', icon: '💰' },
          herb: { name: '药草任务', desc: '收集20株药草', icon: '🌿' },
          resource: { name: '资源任务', desc: '收集30个资源', icon: '📦' }
        }).map(([key, task]) => {
          const t = tasks[key] || { count: 0, claimed: false };
          const thresholds = { hunt: 10, explore: 10, earn: 5000, herb: 20, resource: 30 };
          const threshold = thresholds[key];
          const pct = Math.min(100, (t.count / threshold) * 100);
          const canClaim = t.count >= threshold && !t.claimed;
          
          return `
            <div class="task-item ${canClaim ? 'claimable' : ''}">
              <div class="task-icon">${task.icon}</div>
              <div class="task-info">
                <div class="task-name">${task.name}</div>
                <div class="task-desc">${task.desc}</div>
                <div class="task-progress">
                  <div class="task-bar" style="width:${pct}%"></div>
                </div>
                <div class="task-count">${t.count}/${threshold}</div>
              </div>
              ${canClaim ? `<button class="task-claim" onclick="claimTaskReward('${key}')">领取</button>` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

/**
 * 初始化季节任务
 */
export function initSeasonalTasks() {
  if (!G.seasonal) {
    G.seasonal = {
      completions: { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 },
      s2count: 0,
      s4count: 0,
      s5allCount: 0
    };
  }
}

/**
 * 触发季节任务
 * @param {string} type - 任务类型
 * @param {number} extra - 额外值
 */
export function triggerSeasonal(type, extra) {
  initSeasonalTasks();
  const S = G.seasonal;
  let rewarded = false;
  
  if (type === 'level') {
    addTicketToBag('apex', 1);
    S.completions.s1++;
    rewarded = true;
    notify('🌸 踏春欧皇·一：升级奖励！顶级星运券×1', 'divine');
  } else if (type === 'hunt') {
    S.s2count = (S.s2count || 0) + 1;
    if (S.s2count >= 5) {
      S.s2count -= 5;
      addTicketToBag('apex', 1);
      S.completions.s2++;
      rewarded = true;
      notify('🌸 踏春欧皇·二：5次狩猎达成！顶级星运券×1', 'divine');
    }
  } else if (type === 'ring_legend') {
    addTicketToBag('apex', 1);
    S.completions.s3++;
    rewarded = true;
    notify('🌸 踏春欧皇·三：百万年魂环！顶级星运券×1', 'divine');
  } else if (type === 'apex_lot') {
    S.s4count = (S.s4count || 0) + 1;
    if (S.s4count >= 10) {
      S.s4count -= 10;
      addTicketToBag('apex', 1);
      S.completions.s4++;
      rewarded = true;
      notify('🌸 踏春欧皇·四：10次顶级星运！顶级星运券×1', 'divine');
    }
  }
  
  // 任务五：累计10次任意任务
  if (rewarded) {
    const total = S.completions.s1 + S.completions.s2 + S.completions.s3 + S.completions.s4;
    const milestone = Math.floor(total / 10);
    if (milestone > (S.s5milestone || 0)) {
      const times = milestone - (S.s5milestone || 0);
      S.s5milestone = milestone;
      S.completions.s5 += times;
      for (let i = 0; i < times; i++) {
        addTicketToBag('apex', 1);
      }
      notify('🌸 踏春欧皇·五：综合达成×10！顶级星运券×' + times, 'cosmic');
      spawnBurst('#f9a8d4', 80);
    }
    saveG();
    renderBag();
    renderSeasonalTasks();
  }
}

/**
 * 渲染季节任务
 */
export function renderSeasonalTasks() {
  initSeasonalTasks();
  const S = G.seasonal;
  const c = $('seasonal-tasks');
  if (!c) return;
  
  const tasks = [
    { id: 's1', n: '任务一：升级奖励', d: '每升一级 → 顶级星运券×1', ico: '⬆️', cnt: S.completions.s1 || 0, prog: null },
    { id: 's2', n: '任务二：猎魂不止', d: '每5次狩猎 → 顶级星运券×1', ico: '🔮', cnt: S.completions.s2 || 0, prog: `${S.s2count || 0}/5次` },
    { id: 's3', n: '任务三：百万传奇', d: '每百万年+魂环 → 顶级星运券×1', ico: '⭕', cnt: S.completions.s3 || 0, prog: null },
    { id: 's4', n: '任务四：顶级常客', d: '每10次顶级星运 → 顶级星运券×1', ico: '🏆', cnt: S.completions.s4 || 0, prog: `${S.s4count || 0}/10次` },
    { id: 's5', n: '任务五：全能强者', d: '累计10次任意任务 → 顶级星运券×1', ico: '👑', cnt: S.completions.s5 || 0, prog: `已完成${(S.completions.s1 || 0) + (S.completions.s2 || 0) + (S.completions.s3 || 0) + (S.completions.s4 || 0)}次` },
  ];
  
  c.innerHTML = tasks.map(t => `
    <div class="sb-task-row">
      <div class="sb-task-ico">${t.ico}</div>
      <div class="sb-task-body">
        <div class="sb-task-name">${t.n}</div>
        <div class="sb-task-desc">${t.d}</div>
        ${t.prog ? `<div class="sb-task-prog">进度: ${t.prog}</div>` : ''}
      </div>
      <div class="sb-task-rew">
        <div class="sb-task-cnt">×${t.cnt || 0}</div>
        <div class="sb-task-lbl">已领取</div>
      </div>
    </div>
  `).join('');
  
  // 更新总数
  const total = (S.completions.s1 || 0) + (S.completions.s2 || 0) + (S.completions.s3 || 0) + (S.completions.s4 || 0) + (S.completions.s5 || 0);
  const cnt = $('sb-total-cnt');
  if (cnt) cnt.textContent = `已领取 ${total} 次`;
  
  // 初始化几何画布
  initSeasonalGeo();
}

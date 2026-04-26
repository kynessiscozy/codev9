// ──── 异界深渊系统模块 ────

import { G, saveG } from '../core/state.js';
import { notify } from '../core/notify.js';
import { calcPower, addSP } from '../core/power.js';
import { addExp } from '../core/exp.js';
import { updateHUD } from '../core/exp.js';
import { spawnBurst } from '../core/utils.js';

// 深渊层配置
const ABYSS_LAYERS = [
  { id: 1, n: "幽冥边境", col: "#c084fc", req: 30, i: "👻",
    stages: [
      { id: "1-1", n: "幽魂初遇", type: "normal", cost: 1, enemy: { n: "幽冥游魂", i: "👻", hp: 7200, atk: 780, spd: 14 }, reward: "经验+100,魂力+200" },
      { id: "1-2", n: "边境守卫", type: "normal", cost: 1, enemy: { n: "边境守卫", i: "💀", hp: 8500, atk: 900, spd: 12 }, reward: "经验+150,魂力+300" },
      { id: "1-BOSS", n: "幽冥领主", type: "boss", cost: 3, enemy: { n: "幽冥领主", i: "👹", hp: 25000, atk: 1500, spd: 10 }, reward: "经验+500,魂力+1000" },
    ]
  },
  { id: 2, n: "熔岩地狱", col: "#ef4444", req: 40, i: "🔥",
    stages: [
      { id: "2-1", n: "火焰小径", type: "normal", cost: 1, enemy: { n: "火焰精灵", i: "🔥", hp: 12000, atk: 1100, spd: 15 }, reward: "经验+200,魂力+400" },
      { id: "2-BOSS", n: "地狱炎魔", type: "boss", cost: 3, enemy: { n: "地狱炎魔", i: "👺", hp: 40000, atk: 2200, spd: 8 }, reward: "经验+800,魂力+1500" },
    ]
  },
];

const GOD_LAYERS = ABYSS_LAYERS.filter(l => l.req >= 80);

/**
 * 显示深渊层
 * @param {number} layerId - 深渊层ID
 */
export function showAbyssLayer(layerId) {
  const l = ABYSS_LAYERS.find(x => x.id === layerId);
  if (!l) return;
  if (G.level < l.req) {
    notify(`需要等级 Lv.${l.req} 才能进入`, 'normal');
    return;
  }
  if ((G.abyss.progress || {})[l.id]?.includes(l.id + '-BOSS')) {
    notify('🎊 已通关！', 'divine');
  }
  const prog = (G.abyss.progress = G.abyss.progress || {})[l.id] || [];
  const total = l.stages.length;
  const pct = Math.round(prog.length / total * 100);
  const bossCleared = prog.includes(l.id + '-BOSS');

  const stagesH = l.stages.map((s, i) => {
    const cleared = prog.includes(l.id + '-' + i);
    const canFight = i === prog.length && !bossCleared;
    const isBoss = s.type === 'boss';
    return `
      <div class="abyss-stage ${cleared ? 'cleared' : canFight ? '' : 'locked'}" onclick="${canFight ? `fightAbyssStage(${layerId},${i})` : ''}">
        <div class="as-icon">${cleared ? '✅' : isBoss ? '😈' : '⚔️'}</div>
        <div class="as-info">
          <div class="as-name">${s.n}</div>
          <div class="as-desc">${s.desc}</div>
          ${s.type === 'boss' ? '<div style="color:var(--apex);font-size:9px">⚠️ BOSS</div>' : ''}
        </div>
      </div>
    `;
  }).join('');

  openModal(`
    <div class="m-title" style="color:${l.col}">${l.i} ${l.n}</div>
    <div class="m-sub">深渊探索 · 进度 ${prog.length}/${total}${bossCleared ? ' · ✅ 已通关' : ''}</div>
    <div style="height:4px;background:rgba(255,255,255,.08);border-radius:2px;margin:8px 0 12px;overflow:hidden">
      <div style="height:100%;width:${pct}%;background:${l.col};border-radius:2px;transition:width .5s ease"></div>
    </div>
    <div class="abyss-stages">${stagesH}</div>
    ${bossCleared ? `<div style="text-align:center;padding:14px;background:${l.col}15;border:1px solid ${l.col}40;border-radius:10px;margin-top:12px">
      <div style="font-size:40px;margin-bottom:8px">${l.i}</div>
      <div style="font-family:'Ma Shan Zheng',serif;font-size:20px;color:${l.col};letter-spacing:3px">已通关${l.n}</div>
    </div>` : ''}
  `);
}

/**
 * 战斗深渊阶段
 * @param {number} layerId - 深渊层ID
 * @param {number} stageIdx - 阶段索引
 */
export function fightAbyssStage(layerId, stageIdx) {
  const l = ABYSS_LAYERS.find(x => x.id === layerId);
  if (!l) return;
  const s = l.stages[stageIdx];
  if (!s) return;

  const cost = s.cost || 200;
  if (G.sp < cost) {
    notify(`需要 ${cost} 魂力`, 'normal');
    return;
  }
  G.sp -= cost;

  const pw = calcPower();
  const winRate = Math.min(0.9, 0.3 + pw / 200000 * 0.6);
  const success = Math.random() < winRate;

  if (success) {
    (G.abyss.progress = G.abyss.progress || {})[layerId] = (G.abyss.progress[layerId] || []);
    if (!G.abyss.progress[layerId].includes(l.id + '-' + stageIdx)) {
      G.abyss.progress[layerId].push(l.id + '-' + stageIdx);
    }
    if (s.reward) {
      const expM = s.reward.match(/经验\+(\d+)/);
      const spM = s.reward.match(/魂力\+(\d+)/);
      if (expM) addExp(parseInt(expM[1]));
      if (spM) addSP(parseInt(spM[1]), null);
    }
    notify(`✨ ${s.n} 通关！`, 'divine');
    spawnBurst(l.col, 60);
  } else {
    notify(`💔 ${s.n} 失败... 继续修炼！`, 'normal');
  }

  updateHUD();
  saveG();
  showAbyssLayer(layerId);
}

/**
 * 渲染深渊页面
 */
export function renderAbyssPage() {
  const page = document.getElementById('page-abyss');
  if (!page) return;

  const btn = GOD_LAYERS.map(l => {
    const unlocked = G.level >= l.req;
    const prog = (G.abyss.progress || {})[l.id] || [];
    const total = l.stages.length;
    const pct = Math.round(prog.length / total * 100);
    const bossCleared = prog.includes(l.id + '-BOSS');

    return `
      <div class="abyss-layer-card ${unlocked ? '' : 'locked'}" onclick="${unlocked ? `showAbyssLayer(${l.id})` : ''}" style="border-color:${unlocked ? l.col + '40' : 'rgba(255,255,255,.08)'}">
        <div class="alc-header">
          <div class="alc-icon" style="color:${l.col}">${l.i}</div>
          <div class="alc-info">
            <div class="alc-name" style="color:${l.col}">${l.n}</div>
            <div class="alc-req">${unlocked ? '已解锁' : 'Lv.' + l.req + ' 解锁'}</div>
          </div>
          ${bossCleared ? '<div style="color:var(--hc);font-size:12px">✅ 已通关</div>' : ''}
        </div>
        <div style="height:4px;background:rgba(255,255,255,.08);border-radius:2px;margin-top:8px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:${l.col};border-radius:2px;transition:width .5s ease"></div>
        </div>
      </div>
    `;
  }).join('');

  page.innerHTML = `
    <div class="abyss-container">
      <div class="abyss-title">😈 异界深渊</div>
      <div class="abyss-sub">挑战深渊，获取稀有奖励</div>
      <div class="abyss-layers">${btn}</div>
    </div>
  `;
}

/**
 * 检查深渊是否全部通关
 * @returns {boolean}
 */
export function allAbyssCleared() {
  return ABYSS_LAYERS.every(l => {
    const prog = (G.abyss.progress || {})[l.id] || [];
    return prog.includes(l.id + '-BOSS');
  });
}

/**
 * 获取深渊奖励
 * @param {number} layerId - 深渊层ID
 */
export function claimAbyssReward(layerId) {
  const l = ABYSS_LAYERS.find(x => x.id === layerId);
  if (!l) return;
  const prog = (G.abyss.progress || {})[l.id] || [];
  if (!prog.includes(l.id + '-BOSS')) {
    notify('请先通关该层！', 'normal');
    return;
  }
  if (G.abyss.claimed && G.abyss.claimed.includes(layerId)) {
    notify('奖励已领取！', 'normal');
    return;
  }
  (G.abyss.claimed = G.abyss.claimed || []).push(layerId);
  // 给予奖励
  addSP(1000, null);
  addExp(5000);
  notify(`🎁 领取${l.n}通关奖励！`, 'divine');
  spawnBurst(l.col, 100);
  saveG();
}

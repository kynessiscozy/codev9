// ──── 融合系统模块 ────

import { G, saveG } from '../core/state.js';
import { $, $set, $style, pick, spawnBurst } from '../core/utils.js';
import { notify } from '../core/notify.js';
import { RT } from '../data/rings.js';
import { renderBag } from '../ui/bag.js';
import { cRSM } from '../ui/modals.js';

// 融合状态
let fusState = { a: null, b: null, herbs: [] };
let fusSelTgt = null;
let fusHerbTgt = null;

/**
 * 打开融合面板
 */
export function openFusion() {
  const pf = $('PF');
  if (!pf) return;
  pf.style.display = 'flex';
  pf.classList.add('active');
  
  // 初始化融合界面
  pf.innerHTML = `
    <div class="fusion-container">
      <div class="fusion-title">✨ 融合系统</div>
      <div class="fusion-sub">选择两个魂环进行融合，可添加药草提升成功率</div>
      
      <div class="fusion-circles">
        <div class="fusion-circle" id="fc-a" onclick="selFR('a')">
          <div class="fusion-icon" id="fc-ai">⭕</div>
          <div class="fusion-name" id="fc-an">选择A</div>
        </div>
        
        <div class="fusion-plus">+</div>
        
        <div class="fusion-circle" id="fc-b" onclick="selFR('b')">
          <div class="fusion-icon" id="fc-bi">⭕</div>
          <div class="fusion-name" id="fc-bn">选择B</div>
        </div>
      </div>
      
      <div class="fusion-herbs">
        <div class="herb-slot" id="fhs-0" onclick="addFH(0)"><span>+</span></div>
        <div class="herb-slot" id="fhs-1" onclick="addFH(1)"><span>+</span></div>
        <div class="herb-slot" id="fhs-2" onclick="addFH(2)"><span>+</span></div>
      </div>
      
      <div class="fusion-result" id="fc-res">
        <div style="font-size:22px">✨</div>
        <div style="font-size:8px;margin-top:2px;text-align:center;color:var(--dim)">结果</div>
      </div>
      
      <div class="fusion-rates" id="fus-rates"></div>
      
      <div class="fusion-actions">
        <button class="fusion-btn" onclick="execFusion()">开始融合</button>
        <button class="fusion-btn cancel" onclick="closeFusion()">取消</button>
      </div>
    </div>
  `;
  
  fusState = { a: null, b: null, herbs: [] };
}

/**
 * 关闭融合面板
 */
export function closeFusion() {
  const pf = $('PF');
  if (pf) {
    pf.style.display = 'none';
    pf.classList.remove('active');
  }
  document.getElementById('page-bag').classList.add('active');
  fusState = { a: null, b: null, herbs: [] };
  
  ['a', 'b'].forEach(s => {
    const i = document.getElementById(`fc-${s}i`);
    const n = document.getElementById(`fc-${s}n`);
    const c = document.getElementById(`fc-${s}`);
    if (i) i.textContent = '⭕';
    if (n) n.textContent = `选择${s.toUpperCase()}`;
    if (c) c.classList.remove('filled');
  });
  
  [0, 1, 2].forEach(i => {
    const sl = document.getElementById(`fhs-${i}`);
    if (sl) { sl.innerHTML = '<span>+</span>'; sl.classList.remove('filled'); }
  });
  
  const res = $('fc-res');
  if (res) res.innerHTML = '<div style="font-size:22px">✨</div><div style="font-size:8px;margin-top:2px;text-align:center;color:var(--dim)">结果</div>';
  
  renderBag();
}

/**
 * 选择融合魂环
 * @param {string} slot - 槽位 (a/b)
 */
export function selFR(slot) {
  fusSelTgt = slot;
  const rings = G.bag.filter(i => i.type === 'ring');
  if (!rings.length) { notify('背包中无魂环', 'normal'); return; }
  
  $set('rsm-list', 'innerHTML', rings.map(r => `
    <div class="ring-item" onclick="pickFR('${r.data?.id || r.id}')">
      <div class="ring-orb" style="background:${r.data.c}">${r.data.n[0]}</div>
      <div style="flex:1">
        <div class="ring-yr" style="color:${r.data.c}">${r.data.n}</div>
        <div class="ring-pow">战力+${r.data.pw || 0}</div>
      </div>
    </div>
  `).join(''));
  
  $set('rsm-title', 'textContent', '选择融合魂环');
  $style('RSM', 'display', 'flex');
}

/**
 * 选择魂环
 * @param {string} id - 魂环ID
 */
export function pickFR(id) {
  const it = G.bag.find(i => (i.data?.id == id) || (i.id == id));
  if (!it) return;
  
  if (fusSelTgt === 'a') fusState.a = it;
  else fusState.b = it;
  
  updFusCircle(fusSelTgt, it);
  cRSM();
  updFusRates();
  prevFusResult();
}

/**
 * 更新融合圆圈显示
 * @param {string} slot - 槽位
 * @param {Object} it - 物品
 */
function updFusCircle(slot, it) {
  const i = document.getElementById(`fc-${slot}i`);
  const n = document.getElementById(`fc-${slot}n`);
  const c = document.getElementById(`fc-${slot}`);
  if (i) { i.style.color = it.data.c; i.textContent = '⭕'; }
  if (n) { n.textContent = it.data.n; n.style.color = it.data.c; }
  if (c) c.classList.add('filled');
}

/**
 * 添加药草
 * @param {number} slot - 槽位
 */
export function addFH(slot) {
  const herbs = G.bag.filter(i => i.type === 'herb');
  if (!herbs.length) { notify('背包中无药草', 'normal'); return; }
  
  fusHerbTgt = slot;
  $('rsm-list').innerHTML = herbs.map(h => `
    <div class="herb-item" style="cursor:pointer" onclick="pickFH('${h.data?.id || h.id}')">
      <div class="herb-icon" style="font-size:22px">${h.data.i}</div>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:600;color:${h.data.c}">${h.data.n}</div>
        <div style="font-size:10px;color:var(--dim)">成功+${h.data.fb?.s || 0}% · 质变+${h.data.fb?.m || 0}%</div>
      </div>
    </div>
  `).join('');
  
  $('rsm-title').textContent = '选择药草';
  $style('RSM', 'display', 'flex');
}

/**
 * 选择药草
 * @param {string} id - 药草ID
 */
export function pickFH(id) {
  const it = G.bag.find(i => (i.data?.id == id) || (i.id == id));
  if (!it) return;
  
  if (!fusState.herbs) fusState.herbs = [];
  fusState.herbs[fusHerbTgt] = it;
  
  const sl = document.getElementById(`fhs-${fusHerbTgt}`);
  if (sl) {
    sl.innerHTML = `<div style="font-size:18px">${it.data.i}</div>`;
    sl.classList.add('filled');
  }
  
  cRSM();
  updFusRates();
}

/**
 * 更新融合概率显示
 */
function updFusRates() {
  const el = $('fus-rates');
  if (!el) return;
  
  let hs = 0, hm = 0;
  (fusState.herbs || []).forEach(h => {
    if (h?.data?.fb) { hs += h.data.fb.s; hm += h.data.fb.m; }
  });
  
  const fr = Math.min(95, 50 + hs);
  const fm = Math.min(50, 1 + hm);
  
  el.innerHTML = `
    <div class="rate-item">
      <span class="rate-label">成功率</span>
      <span class="rate-value" style="color:${fr >= 70 ? '#10b981' : fr >= 50 ? '#f59e0b' : '#ef4444'}">${fr}%</span>
    </div>
    <div class="rate-item">
      <span class="rate-label">质变率</span>
      <span class="rate-value" style="color:${fm >= 30 ? '#8b5cf6' : '#6b7280'}">${fm}%</span>
    </div>
  `;
}

/**
 * 预览融合结果
 */
function prevFusResult() {
  if (!fusState.a || !fusState.b) return;
  
  const ai = RT.findIndex(t => t.n === fusState.a.data.n);
  const bi = RT.findIndex(t => t.n === fusState.b.data.n);
  const mi = Math.max(ai >= 0 ? ai : 0, bi >= 0 ? bi : 0);
  const rt = RT[mi];
  
  const res = $('fc-res');
  if (res) {
    res.innerHTML = `
      <div style="font-size:18px;color:${rt.c}">${rt.n[0]}</div>
      <div style="font-size:10px;color:${rt.c};margin-top:2px">${rt.n}</div>
      <div style="font-size:9px;color:var(--dim)">战力+${rt.pw}</div>
    `;
  }
}

/**
 * 执行融合
 */
export function execFusion() {
  if (!fusState.a || !fusState.b) { notify('请选择两个魂环', 'normal'); return; }
  
  let hs = 0, hm = 0;
  (fusState.herbs || []).forEach(h => {
    if (h?.data?.fb) { hs += h.data.fb.s; hm += h.data.fb.m; }
  });
  
  const fr = Math.min(95, 50 + hs);
  const fm = Math.min(50, 1 + hm);
  
  if (Math.random() * 100 > fr) {
    notify('💔 融合失败！两个魂环消失。', 'normal');
  } else {
    const ai = RT.findIndex(t => t.n === fusState.a.data.n);
    const bi = RT.findIndex(t => t.n === fusState.b.data.n);
    let mi = Math.max(ai >= 0 ? ai : 0, bi >= 0 ? bi : 0);
    const mut = Math.random() * 100 < fm;
    
    if (mut) {
      mi = Math.min(mi + 1, RT.length - 2);
      notify('✨ 融合质变！品质提升！', 'legend');
      spawnBurst('#f0d060', 70);
    }
    
    const rt = RT[mi];
    const sk = pick(rt.sk);
    const ro = { id: Date.now(), n: rt.n, y: rt.y, c: rt.c, sk, pw: rt.pw, tier: rt.n };
    
    G.bag.push({ type: 'ring', data: ro, count: 1, id: Date.now() });
    notify(`⚗️ 融合成功！${rt.n}·${sk}·战力+${rt.pw}${mut ? ' (质变)' : ''}`, rt.y >= 999999999 ? 'legend' : 'epic');
  }
  
  // 消耗物品
  [fusState.a, fusState.b].forEach(it => {
    if (!it) return;
    const bi = G.bag.find(i => (i.id === it.id) || (i.data?.id === it.data?.id));
    if (bi) { bi.count--; if (bi.count <= 0) G.bag = G.bag.filter(i => i !== bi); }
  });
  
  (fusState.herbs || []).forEach(it => {
    if (!it) return;
    const bi = G.bag.find(i => (i.id === it.id) || (i.data?.id === it.data?.id));
    if (bi) { bi.count--; if (bi.count <= 0) G.bag = G.bag.filter(i => i !== bi); }
  });
  
  saveG();
  closeFusion();
}

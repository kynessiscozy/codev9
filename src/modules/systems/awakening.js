/**
 * 觉醒系统模块
 * 管理武魂觉醒、结果显示、技能生成
 */

import { G, saveG } from '../core/state.js';
import { QC, getQualityConfig, getQualityName, getQualityColor } from '../config/quality.js';
import { SD, getSoul, pickRandomSoul } from '../data/souls.js';
import { $, $remCls, $style, ri, pick, wPick, spawnBurst } from '../core/utils.js';
import { addExp, updateHUD } from '../core/exp.js';
import { addSoulFragment } from '../core/resonance.js';
import { notify, notifyDivine } from '../core/notify.js';
import { renderSoulPage } from '../ui/soulPage.js';
import { grimoireDiscover } from '../ui/grimoire.js';
import { emit } from '../core/events.js';
import { getSoulIcon, getSoulTheme } from '../ui/soul-icons.js';

/**
 * 触发武魂觉醒
 */
export function triggerAwaken() {
  try {
    console.log('[觉醒-debug] 1. 开始觉醒流程');
    
    const saEl = $('SA');
    const c = saEl ? saEl.querySelector('.aw-c') : null;
    if (c) { c.style.transform = 'scale(.94)'; setTimeout(() => c.style.transform = '', 220); }
    
    console.log('[觉醒-debug] 2. 获取品质...');
    const qk = getQK();
    console.log('[觉醒-debug] 3. 品质=', qk);
    
    const pool = SD[qk] || SD.common;
    console.log('[觉醒-debug] 4. 武魂池大小=', pool ? pool.length : 'undefined');
    
    const sd = pick(pool);
    console.log('[觉醒-debug] 5. 选中武魂=', sd ? sd.n : 'undefined');
    
    const qc = QC[qk];
    console.log('[觉醒-debug] 6. QC=', qc ? qc.n : 'undefined');
    
    if (!qc) {
      console.error('[觉醒-debug] QC 配置缺失:', qk);
      alert('觉醒出错：品质配置缺失 - ' + qk);
      return;
    }
    if (!sd) {
      console.error('[觉醒-debug] SD 数据缺失');
      alert('觉醒出错：武魂数据缺失');
      return;
    }
    
    let attrs = [...(sd.a || [])];
    if (Math.random() < 0.06) {
      attrs.push(pick(["混沌", "神秘", "极致", "变异", "觉醒", "逆天"]) + '·' + (attrs[0] || '未知'));
      notify('⚡ 属性变异！', 'epic');
    }
    
    console.log('[觉醒-debug] 7. 设置灵魂状态...');
    G.soul = {
      id: Date.now(),
      name: sd.n,
      icon: sd.i,
      quality: qk,
      desc: sd.d,
      attrs,
      initPow: Math.min(10, sd.p || 1),
      rings: [],
      skills: genSkills(sd, qk),
      secondAwakened: false,
      divine: false,
    };
    
    G.awakenDone = true;
    G.level = Math.max(G.level, G.soul.initPow);
    addExp(G.soul.initPow * 60);
    updateHUD();
    
    // v9: 觉醒时获得武魂碎片
    addSoulFragment(qk, 1);
    
    console.log('[觉醒-debug] 8. 显示结果覆盖层...');
    
    // 显示结果
    const orB = document.getElementById('or-b');
    if (orB) orB.style.setProperty('--bc', qc.bc);
    else console.warn('[觉醒-debug] or-b 元素不存在');
    
    const orIco = document.getElementById('or-i');
    if (orIco) {
      try {
        orIco.innerHTML = getSoulIcon(sd.n, qk, { sizeClass: 'size-xlarge' });
      } catch (iconErr) {
        console.error('[觉醒-debug] getSoulIcon 失败:', iconErr);
        orIco.innerHTML = sd.i || '⚡';
      }
      orIco.style.display = 'flex';
      orIco.style.alignItems = 'center';
      orIco.style.justifyContent = 'center';
    } else {
      console.warn('[觉醒-debug] or-i 元素不存在');
    }
    
    const orQ = document.getElementById('or-q');
    if (orQ) { orQ.textContent = qc.n + ' 品质'; orQ.style.color = qc.c; }
    
    const orN = document.getElementById('or-n');
    if (orN) { orN.textContent = sd.n; orN.style.color = qc.c; }
    
    const orD = document.getElementById('or-d');
    if (orD) orD.textContent = sd.d;
    
    const orP = document.getElementById('or-p');
    if (orP) orP.textContent = G.soul.initPow;
    
    const orA = document.getElementById('or-a');
    if (orA) orA.textContent = (attrs.slice(0, 2).join('·'));
    
    const orQ2 = document.getElementById('or-q2');
    if (orQ2) orQ2.textContent = qc.n;
    
    console.log('[觉醒-debug] 9. 添加 show 类...');
    const orEl = $('OR');
    if (orEl) {
      orEl.classList.add('show');
      console.log('[觉醒-debug] 10. OR.show 已添加');
    } else {
      console.error('[觉醒-debug] OR 元素不存在！');
      alert('觉醒出错：OR 元素不存在');
      return;
    }
    
    try { spawnBurst(qc.c, 110); } catch (e) { console.warn('[觉醒-debug] spawnBurst 失败:', e); }
    
    // 发射觉醒事件（供特效系统响应）
    try { emit('soul:awakened', { quality: qk, qualityConfig: qc, soul: G.soul }); } catch (e) { console.warn('[觉醒-debug] emit 失败:', e); }
    
    if (['legend', 'apex', 'hc', 'ha', 'twin', 'triple'].includes(qk)) {
      const m = {
        legend: '🌟 传说武魂！',
        apex: '🔥 顶级武魂！震撼！',
        hc: '🟢 隐藏武魂！',
        ha: '💗 顶级隐藏！',
        twin: '✨ 双生武魂！旷世奇才！',
        triple: '🌈 三生武魂！天命之子！'
      };
      setTimeout(() => notify(m[qk], 'divine'), 250);
    }
    
    saveG();
    console.log('[觉醒-debug] 11. 觉醒完成！');
  } catch (err) {
    console.error('[觉醒-debug] 致命错误:', err);
    alert('觉醒失败：' + (err.message || err));
  }
}

/**
 * 关闭觉醒结果
 */
export function closeResult() {
  $remCls('OR', 'show');
  $style('SA', 'display', 'none');
  
  // 记录到图鉴
  if (G.soul) grimoireDiscover(G.soul.name, G.soul.quality);
  
  // 确保武魂页面激活
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.ni').forEach(n => n.classList.remove('active'));
  const sp = document.getElementById('page-soul');
  if (sp) sp.classList.add('active');
  const firstNi = document.querySelector('#bnav .ni');
  if (firstNi) firstNi.classList.add('active');
  
  renderSoulPage();
  setTimeout(() => checkNewbieGift(), 600);
}

/**
 * 生成技能
 */
export function genSkills(sd, qk) {
  const bm = {
    common: [{ n: "体质强化", d: "提升躯体素质与耐久。", p: ["攻击+2", "防御+2", "体质+3"] }],
    rare: [{ n: "属性共鸣", d: "与武魂属性共鸣，属性伤害大幅提升。", p: ["属性伤害+20%", "共鸣时长5秒"] }],
    epic: [{ n: "领域感知", d: "感知领域边缘，获取初期领域能力。", p: ["领域范围10m", "压制20%", "持续8秒"] }],
    legend: [{ n: "领域半开", d: "领域半开展，产生显著特殊效果。", p: ["领域范围25m", "速度-30%(敌)", "持续15秒"] }],
    apex: [{ n: "领域全开", d: "领域完全展开，范围内强力压制。", p: ["领域范围50m", "全属性-50%(敌)", "持续30秒"] }],
    hc: [{ n: "隐匿天赋", d: "隐藏武魂特殊天赋觉醒。", p: ["隐身效果+40%", "暗属性+60%"] }],
    ha: [{ n: "绝世之力", d: "绝世之力爆发，凌驾一切。", p: ["伤害×5", "无视防御20%", "持续10秒"] }],
    twin: [{ n: "双生共鸣", d: "双生武魂共鸣，两种力量互相增幅。", p: ["双重伤害+100%", "共鸣爆发概率15%"] }],
    triple: [{ n: "三生轮回", d: "三生武魂轮回之力觉醒。", p: ["轮回伤害+200%", "生命恢复+50%/秒"] }],
  };
  
  const base = bm[qk] || bm.common;
  const attrSk = {
    n: `${(sd.a || ['未知'])[0]}精通`,
    d: `天生${(sd.a || [''])[0]}属性精通。`,
    p: [`${(sd.a || [''])[0]}伤害+35%`, `感知+50%`]
  };
  
  return [...base, attrSk].map(sk => {
    const mut = Math.random() < 0.006;
    return {
      name: sk.n + (mut ? '·质变' : ''),
      desc: sk.d + (mut ? ' 【质变：效果+300%！】' : ''),
      params: sk.p,
      ring: 0
    };
  });
}

/**
 * 获取品质key
 */
export function getQK() {
  const r = Math.random() * 100;
  let c = 0;
  const qcs = Object.entries(QC);
  for (const [k, v] of qcs) {
    c += v.p;
    if (r <= c) return k;
  }
  return 'common';
}

/**
 * 打开天赋选择界面（占位，由 game.js 完善）
 */
export function openTalentSelect() {
  notify('天赋系统即将开启...', 'normal');
  // game.js 注入后会完善此函数
}

// 导入循环依赖
import { checkNewbieGift } from '../systems/seasons.js';

// ──── 觉醒系统模块 ────

/**
 * 触发武魂觉醒
 */
export function triggerAwaken() {
  const saEl = $('SA');
  const c = saEl ? saEl.querySelector('.aw-c') : null;
  if (c) { c.style.transform = 'scale(.94)'; setTimeout(() => c.style.transform = '', 220); }

  const qk = getQK();
  const pool = SD[qk] || SD.common;
  const sd = pick(pool);
  const qc = QC[qk];

  let attrs = [...(sd.a || [])];
  if (Math.random() < 0.06) {
    attrs.push(pick(["混沌", "神秘", "极致", "变异", "觉醒", "逆天"]) + '·' + (attrs[0] || '未知'));
    notify('⚡ 属性变异！', 'epic');
  }

  G.soul = {
    id: Date.now(), name: sd.n, icon: sd.i, quality: qk,
    desc: sd.d, attrs, initPow: Math.min(10, sd.p || 1),
    rings: [], skills: genSkills(sd, qk),
    secondAwakened: false, divine: false,
  };
  G.awakenDone = true;
  G.level = Math.max(G.level, G.soul.initPow);
  addExp(G.soul.initPow * 60);
  updateHUD();
  // v9: Grant soul fragment on awaken
  addSoulFragment(qk, 1);

  // 显示结果
  document.getElementById('or-b').style.setProperty('--bc', qc.bc);
  document.getElementById('or-i').textContent = sd.i;
  document.getElementById('or-q').textContent = qc.n + ' 品质';
  document.getElementById('or-q').style.color = qc.c;
  document.getElementById('or-n').textContent = sd.n;
  document.getElementById('or-n').style.color = qc.c;
  document.getElementById('or-d').textContent = sd.d;
  document.getElementById('or-p').textContent = G.soul.initPow;
  document.getElementById('or-a').textContent = (attrs.slice(0, 2).join('·'));
  document.getElementById('or-q2').textContent = qc.n;
  $('OR').classList.add('show');
  spawnBurst(qc.c, 110);

  if (['legend', 'apex', 'hc', 'ha', 'twin', 'triple'].includes(qk)) {
    const m = {
      legend: '🌟 传说武魂！', apex: '🔥 顶级武魂！震撼！', hc: '🟢 隐藏武魂！',
      ha: '💗 顶级隐藏！', twin: '✨ 双生武魂！旷世奇才！', triple: '🌈 三生武魂！天命之子！'
    };
    setTimeout(() => notify(m[qk], 'divine'), 250);
  }
  saveG();
}

/**
 * 关闭觉醒结果面板
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
 * 生成武魂技能
 * @param {Object} sd - 武魂数据
 * @param {string} qk - 品质key
 * @returns {Array} 技能数组
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
 * 获取当前品质key
 * @returns {string} 品质key
 */
export function getQK() {
  if (!G.awakenDone) {
    // 未觉醒时，根据幸运值调整概率
    const Luck = G.luck || 0;
    const luckBonus = Math.min(Luck * 0.005, 0.4);
    if (Math.random() < 0.002 + luckBonus) return Math.random() < 0.5 ? 'twin' : 'triple';
    if (Math.random() < 0.008 + luckBonus * 1.5) return 'ha';
    if (Math.random() < 0.015 + luckBonus) return 'hc';
    if (Math.random() < 0.06 + luckBonus * 2) return 'apex';
    if (Math.random() < 0.14 + luckBonus * 1.5) return 'legend';
    if (Math.random() < 0.28 + luckBonus) return 'epic';
    if (Math.random() < 0.5 + luckBonus) return 'rare';
    return 'common';
  }
  // 已觉醒后，可以觉醒到相同品质或更低
  const qk = G.soul.quality;
  if (['twin', 'triple'].includes(qk)) return qk;
  if (qk === 'ha') return Math.random() < 0.3 ? 'ha' : 'hc';
  if (qk === 'hc') return Math.random() < 0.3 ? 'hc' : 'apex';
  return qk;
}

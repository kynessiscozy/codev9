// ──── 成神系统模块 ────

/**
 * 显示成神之路
 */
export function showGodPath() {
  const rings = (G.soul?.rings || []).length;
  if (rings < 9) { notify('需要9个魂环才能进入成神之路！', 'normal'); return; }
  
  const trials = G.godTrials || GOD_TRIALS;
  const stH = trials.map((t, i) => {
    const prev = i === 0 || trials[i - 1].cleared;
    const cls = t.cleared ? 'cleared' : prev ? '' : 'locked';
    const badge = t.cleared 
      ? `<span class="ts-badge clear">已通关</span>` 
      : prev 
        ? `<span class="ts-badge go">挑战</span>` 
        : `<span class="ts-badge locked">🔒</span>`;
    
    return `
      <div class="trial-stage ${cls}" onclick="${prev && !t.cleared ? `startTrial('${t.id}')` : t.cleared ? '' : ''}">
        <div class="ts-ico">${t.i}</div>
        <div class="ts-info">
          <div class="ts-name">${t.n}</div>
          <div class="ts-desc">${t.d}</div>
          <div class="ts-rew">通关奖励：${t.rew}</div>
        </div>
        ${badge}
      </div>
    `;
  }).join('');

  openModal(`
    <div class="m-title" style="color:#fca5a5">🌟 成神之路</div>
    <div class="m-sub">共6关试炼，逐步突破成神极限</div>
    <div style="font-size:11px;color:var(--dim);text-align:center;margin-bottom:12px;line-height:1.7">
      每一关皆是对灵魂的淬炼，通关后可获得丰厚奖励和特殊称号。
    </div>
    <div class="trial-stages">${stH}</div>
  `);
}

/**
 * 开始试炼
 * @param {string} id - 试炼ID
 */
export function startTrial(id) {
  const t = (G.godTrials || GOD_TRIALS).find(x => x.id === id);
  if (!t) return;
  
  const cost = t.rsp || 500;
  if (G.sp < cost) { notify(`试炼需要${cost}魂力`, 'normal'); return; }
  G.sp -= cost;

  // 意志系统：连续失败累积意志，3次必成功
  if (!G.godTrialWill) G.godTrialWill = {};
  const failCount = G.godTrialWill[id] || 0;
  
  // 基础概率60%-85%，受战力小幅影响
  const baseRate = 0.62;
  const maxRate = 0.85;
  const pw = calcPower();
  const minPow = { t1: 500, t2: 1000, t3: 2000, t4: 4000, t5: 8000, t6: 15000 }[id] || 500;
  const powerBonus = Math.min(0.08, (pw - minPow) / Math.max(minPow * 10, 1) * 0.08);
  const finalRate = Math.min(maxRate, baseRate + powerBonus);
  
  const guaranteed = failCount >= 3;
  const success = guaranteed || Math.random() < finalRate;

  if (success) {
    // 成功：重置意志值
    G.godTrialWill[id] = 0;
    t.cleared = true;
    
    const expM = t.rew.match(/经验\+(\d+)/);
    const pwM = t.rew.match(/战力\+(\d+)/);
    if (expM) addExp(parseInt(expM[1]));
    if (pwM) { G.extraPower += parseInt(pwM[1]); }
    if (t.rew.includes('神之子')) awardTitle('godpath', '神之子');
    if (t.rew.includes('半神')) awardTitle('godpath', '半神');
    if (t.rew.includes('稀有称号')) awardTitle('hunt', pick(TITLES.hunt).n);
    if (t.rew.includes('神器')) {
      const a = pick(ARTS);
      G.bag.push({ type: 'artifact', data: a, count: 1, id: Date.now() });
    }
    
    const bonusMsg = guaranteed ? ' 【意志加持·必胜！】' : '';
    notify(`🏆 ${t.n} 试炼通关！${bonusMsg}`, 'divine');
    spawnBurst('#fca5a5', 80);
  } else {
    // 失败：累积意志，给予安慰奖
    G.godTrialWill[id] = (failCount + 1);
    const willNow = G.godTrialWill[id];
    const consleSP = Math.floor(cost * 0.3);
    const consleExp = Math.floor(cost * 2);
    addSP(consleSP, null);
    addExp(consleExp);
    
    const pityMsg = willNow >= 2 ? ` 【意志值${willNow}/3，再败必胜！】` : ` 【意志值${willNow}/3】`;
    notify(`💔 ${t.n} 试炼失败... 获得安慰：+${consleSP}魂力/+${consleExp}经验${pityMsg}`, 'normal');
  }
  
  G.godTrials = G.godTrials || GOD_TRIALS;
  updateHUD();
  saveG();
  showGodPath();
}

/**
 * 授予称号
 * @param {string} pool - 称号池
 * @param {string} name - 称号名称
 */
export function awardTitle(pool, name) {
  const titlePool = TITLES[pool] || TITLES.hunt;
  const t = titlePool.find(x => x.n === name) || pick(titlePool);
  if (!G.titles.find(x => x.n === t.n)) {
    G.titles.push(t);
    notify(`👑 获得称号：${t.n}！`, 'divine');
  }
}

/**
 * 检查是否所有试炼都已通关
 * @returns {boolean}
 */
export function allGodTrialsCleared() {
  return (G.godTrials || []).every(t => t.cleared);
}

/**
 * 显示神位选择
 */
export function showGodExamSelect() {
  if (!allGodTrialsCleared()) { notify('需要通关所有成神之路试炼！', 'normal'); return; }
  if (G.godChoice) {
    openGodExam(G.godChoice);
    return;
  }
  
  const rows = GOD_EXAMS.map(ex => `
    <div onclick="selectGodExam('${ex.id}')" style="background:linear-gradient(135deg,rgba(0,0,0,.4),rgba(0,0,0,.2));border:1.5px solid ${ex.col}50;border-radius:12px;padding:14px;margin-bottom:10px;cursor:pointer;transition:all .2s" onmouseenter="this.style.borderColor='${ex.col}'" onmouseleave="this.style.borderColor='${ex.col}50'">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <div style="font-size:36px">${ex.i}</div>
        <div>
          <div style="font-family:'Ma Shan Zheng',serif;font-size:18px;color:${ex.col};letter-spacing:2px">${ex.n}</div>
          <div style="font-size:10px;color:var(--dim);margin-top:2px">${ex.desc.slice(0, 30)}...</div>
        </div>
      </div>
      <div style="font-size:10px;color:${ex.col};background:${ex.col}15;border-radius:6px;padding:5px 9px;display:inline-block">
        ✨ 成为${ex.godName} · 战力+150000
      </div>
      <div style="font-size:9px;color:var(--apex);margin-top:6px">⚠️ 选择后不可更改</div>
    </div>
  `).join('');

  openModal(`
    <div class="m-title" style="color:#ffd700">🙏 神位传承</div>
    <div class="m-sub">选择你的神位道路，此选择永久不可逆</div>
    <div style="font-size:11px;color:var(--dim);text-align:center;margin:8px 0 14px;line-height:1.7">
      成神之路已完全打通。<br/>三位神祇正在等待继承者的选择。
    </div>
    ${rows}
  `);
}

/**
 * 选择神位
 * @param {string} examId - 神位ID
 */
export function selectGodExam(examId) {
  const ex = GOD_EXAMS.find(e => e.id === examId);
  if (!ex) return;
  if (!confirm('确认选择「' + ex.n + '」？此选择永久不可更改！')) return;
  
  G.godChoice = examId;
  saveG();
  openModal('');
  notify('✨ 已选择' + ex.n + '！神位传承之路正式开启！', 'divine');
  spawnBurst(ex.col, 100);
  openGodExam(examId);
}

/**
 * 打开神位传承页面
 * @param {string} examId - 神位ID
 */
export function openGodExam(examId) {
  const ex = GOD_EXAMS.find(e => e.id === examId);
  if (!ex) return;
  
  const prog = (G.godExamProgress = G.godExamProgress || {})[examId] || 0;
  const isComplete = prog >= ex.trials.length;
  
  const triH = ex.trials.map((t, i) => {
    const cleared = i < prog;
    const canDo = i === prog && !isComplete;
    return `
      <div class="trial-stage ${cleared ? 'cleared' : canDo ? '' : 'locked'}" onclick="${canDo ? `doGodExam('${examId}',${i})` : ''}">
        <div class="ts-ico">${cleared ? '✅' : canDo ? ex.i : '🔒'}</div>
        <div class="ts-info">
          <div class="ts-name" style="color:${ex.col}">${t.n}</div>
          <div class="ts-desc">${t.d}</div>
          <div class="ts-rew">奖励: ${t.rew}</div>
          <div style="font-size:9px;color:var(--dim);margin-top:2px">消耗: ${t.cost} 魂力</div>
        </div>
        ${cleared 
          ? `<span class="ts-badge clear">已通</span>` 
          : canDo 
            ? `<span class="ts-badge go" style="border-color:${ex.col}60;color:${ex.col}">挑战</span>` 
            : `<span class="ts-badge locked">🔒</span>`}
      </div>
    `;
  }).join('');

  openModal(`
    <div class="m-title" style="color:${ex.col}">${ex.i} ${ex.n}</div>
    <div class="m-sub">神位传承 · 进度 ${prog}/${ex.trials.length}${isComplete ? ' · ✅ 已成神' : ''}</div>
    <div style="font-size:11px;color:var(--dim);text-align:center;margin-bottom:12px;line-height:1.7">${ex.desc}</div>
    ${isComplete 
      ? `<div style="text-align:center;padding:14px;background:${ex.col}15;border:1px solid ${ex.col}40;border-radius:10px;margin-bottom:12px">
          <div style="font-size:40px;margin-bottom:8px">${ex.i}</div>
          <div style="font-family:'Ma Shan Zheng',serif;font-size:20px;color:${ex.col};letter-spacing:3px">你已成为${ex.godName}</div>
        </div>` 
      : ''}
    <div class="trial-stages">${triH}</div>
  `);
}

/**
 * 执行神位试炼
 * @param {string} examId - 神位ID
 * @param {number} idx - 试炼索引
 */
export function doGodExam(examId, idx) {
  const ex = GOD_EXAMS.find(e => e.id === examId);
  if (!ex) return;
  const t = ex.trials[idx];
  if (!t) return;
  
  if (G.sp < t.cost) { notify(`需要 ${t.cost} 魂力`, 'normal'); return; }
  G.sp -= t.cost;
  
  const pw = calcPower();
  const rate = Math.min(0.92, 0.4 + pw / 200000 * 0.5);
  
  if (Math.random() < Math.max(0.2, rate)) {
    (G.godExamProgress = G.godExamProgress || {})[examId] = ((G.godExamProgress || {})[examId] || 0) + 1;
    
    const expM = t.rew.match(/经验\+(\d+)/);
    const pwM = t.rew.match(/战力\+(\d+)/);
    if (expM) addExp(parseInt(expM[1]));
    if (pwM) G.extraPower += parseInt(pwM[1]);
    
    const isLast = idx === ex.trials.length - 1;
    if (isLast) {
      // 成神！
      G.godType = ex.id;
      G.soul.name = ex.godName;
      G.soul.icon = ex.i;
      G.soul.isGod = true;
      G.soul.godType = ex.id;
      G.soul.quality = 'triple';
      G.soul.divine = true;
      G.soul.attrs = [ex.godName + '·神格', '神力觉醒', '超越一切', '∞战力'];
      G.extraPower += 100000;
      if (!G.titles.find(tt => tt.n === ex.godTitle.n)) G.titles.push(ex.godTitle);
      G.equippedTitle = ex.godTitle;
      notify(`🙏 恭喜！你已正式成为${ex.godName}！神位传承完成！`, 'cosmic');
      spawnBurst(ex.col, 300);
      setTimeout(() => spawnBurst('#ffd700', 200), 500);
    } else {
      notify(`✨ ${t.n} 通关！`, 'divine');
      spawnBurst(ex.col, 60);
    }
    updateHUD();
    saveG();
    openGodExam(examId);
    renderSoulPage();
  } else {
    notify(`💔 ${t.n} 失败... 继续修炼！`, 'normal');
    updateHUD();
    saveG();
  }
}

/**
 * 渲染特殊道路
 */
export function renderSpecialPaths() {
  const grid = $('special-paths-grid');
  if (!grid) return;
  if (!G.soul) {
    grid.innerHTML = '<div style="grid-column:span 2;font-size:11px;color:var(--dim);text-align:center;padding:12px">觉醒武魂后解锁特殊道路</div>';
    return;
  }
  // Lv.25 预览门限
  if (G.level < 25 && !G.unlockedSystems?.specialPathPreview) {
    grid.innerHTML = `<div style="grid-column:span 2;text-align:center;padding:16px 8px">
      <div style="font-size:28px;margin-bottom:8px;opacity:.3">🔒</div>
      <div style="font-size:11px;color:var(--dim)">Lv.25 解锁特殊成就道路预览</div>
    </div>`;
    return;
  }
  // 渲染特殊道路卡片
  grid.innerHTML = SPECIAL_PATHS.map(sp => {
    const done = G.specialPathDone?.[sp.id];
    return `
      <div class="sp-card ${done ? 'done' : ''}" onclick="openSpecialPath('${sp.id}')" style="border-color:${sp.col}40">
        <div class="sp-icon" style="color:${sp.col}">${sp.i}</div>
        <div class="sp-name" style="color:${sp.col}">${sp.n}</div>
        <div class="sp-desc">${sp.desc}</div>
        ${done ? '<div style="font-size:9px;color:var(--hc);margin-top:4px">✅ 已完成</div>' : ''}
      </div>
    `;
  }).join('');
}

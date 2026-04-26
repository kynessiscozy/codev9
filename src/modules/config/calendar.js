// ──── CALENDAR LOGIN SYSTEM ────
// 签到系统配置

export const CAL_REWARDS = [
  { ico: "🎟️", lbl: "普通券×3", fn: () => addTicketToBag("common", 3) },
  { ico: "💫", lbl: "魂力+2000", fn: () => { G.sp += 2000; updateHUD(); } },
  { ico: "🎫", lbl: "高级券×2", fn: () => addTicketToBag("advanced", 2) },
  { ico: "🦴", lbl: "随机魂骨", fn: () => {
    const k = pick(["head", "body", "arm", "leg"]);
    const pool = BONE_POOL[k] || BONE_POOL.head;
    const b = pool[ri(0, Math.min(3, pool.length - 1))];
    const pw = genBonePw(b.tier);
    bagPush("bone", { ...b, pw, id: Date.now() });
  }},
  { ico: "🎫", lbl: "高级券×5", fn: () => addTicketToBag("advanced", 5) },
  { ico: "💫", lbl: "魂力+10000", fn: () => { G.sp += 10000; updateHUD(); } },
  { ico: "🏆", lbl: "顶级十连券", fn: () => addTicketToBag("apex", 1, true) },
];

// 获取签到奖励
export function getCalendarReward(day) {
  const idx = (day - 1) % CAL_REWARDS.length;
  return CAL_REWARDS[idx];
}

// 获取签到天数对应的奖励索引
export function getCalendarDayReward(day) {
  return CAL_REWARDS[(day - 1) % CAL_REWARDS.length];
}

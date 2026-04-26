// ──── PVP ARENA SYSTEM ────
// 竞技场系统配置

export const ARENA_ENEMIES = [
  { n: "刃魂少年", ico: "⚔️", pw: 5000, atk: 280, hp: 8000, q: "common", desc: "初出茅庐的剑系魂师" },
  { n: "冰霜使者", ico: "❄️", pw: 15000, atk: 560, hp: 14000, q: "rare", desc: "冰系魂师，防御为主" },
  { n: "雷霆战士", ico: "⚡", pw: 30000, atk: 1100, hp: 24000, q: "epic", desc: "雷系魂师，攻击凶猛" },
  { n: "暗影刺客", ico: "🌑", pw: 60000, atk: 2300, hp: 20000, q: "epic", desc: "暗系魂师，快准狠" },
  { n: "传说魂帝", ico: "🔥", pw: 120000, atk: 4800, hp: 75000, q: "legend", desc: "顶尖魂帝，全面强者" },
  { n: "神赐候选", ico: "✨", pw: 300000, atk: 11000, hp: 180000, q: "apex", desc: "神级战力候选者" },
  { n: "混沌之主", ico: "🌀", pw: 600000, atk: 24000, hp: 450000, q: "ha", desc: "混沌属性，难以捉摸" },
  { n: "宇宙守望者", ico: "🌌", pw: 1500000, atk: 55000, hp: 900000, q: "triple", desc: "触碰宇宙法则的强者" },
];

export const ARENA_MILESTONES = [
  { honor: 100, n: "竞技新人", pool: "common", count: 5, ten: false },
  { honor: 300, n: "初级竞技者", pool: "advanced", count: 3, ten: false },
  { honor: 600, n: "荣耀战士", pool: "advanced", count: 10, ten: false },
  { honor: 1000, n: "竞技精英", pool: "apex", count: 3, ten: false },
  { honor: 2000, n: "竞技大师", pool: "apex", count: 1, ten: true },
  { honor: 5000, n: "竞技王者", pool: "apex", count: 5, ten: true },
];

// 获取竞技场敌人
export function getArenaEnemy(index) {
  return ARENA_ENEMIES[index % ARENA_ENEMIES.length];
}

// 获取竞技场里程碑
export function getArenaMilestone(honor) {
  let milestone = null;
  for (const m of ARENA_MILESTONES) {
    if (honor >= m.honor) milestone = m;
  }
  return milestone;
}

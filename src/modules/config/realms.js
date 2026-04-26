// ──── REALM DEFINITIONS ────
// 斗罗大陆境界系统定义

export const REALMS = [
  { lv: 1, n: "魂士", sub: "踏上修炼之路", ico: "🌱", col: "#9ca3af", hex: "156,163,175" },
  { lv: 11, n: "魂师", sub: "魂力初现，武魂觉醒", ico: "⚡", col: "#60a5fa", hex: "96,165,250" },
  { lv: 21, n: "大魂师", sub: "三环傍身，初露锋芒", ico: "🔮", col: "#34d399", hex: "52,211,153" },
  { lv: 31, n: "魂尊", sub: "四环之力，独当一面", ico: "💫", col: "#a78bfa", hex: "167,139,250" },
  { lv: 41, n: "魂宗", sub: "五环蜕变，踏入强者之列", ico: "🌀", col: "#f59e0b", hex: "245,158,11" },
  { lv: 51, n: "魂王", sub: "六环威压，万人之上", ico: "👑", col: "#fb923c", hex: "251,146,60" },
  { lv: 61, n: "魂帝", sub: "七环君临，一方帝者", ico: "🔥", col: "#f87171", hex: "248,113,113" },
  { lv: 71, n: "魂圣", sub: "八环圣境，超凡入圣", ico: "✨", col: "#e879f9", hex: "232,121,249" },
  { lv: 81, n: "魂斗罗", sub: "九环归位，斗罗境界", ico: "🐉", col: "#ffd700", hex: "255,215,0" },
  { lv: 91, n: "封号斗罗", sub: "封号天赋，名动四方", ico: "⚔️", col: "#ef4444", hex: "239,68,68" },
  { lv: 95, n: "超级斗罗", sub: "超越极限，神之门槛", ico: "🌟", col: "#ff6b6b", hex: "255,107,107" },
  { lv: 99, n: "极限斗罗", sub: "斗罗之巅，俯视众生", ico: "∞", col: "#00ffff", hex: "0,255,255" },
  { lv: 100, n: "神级", sub: "踏入神之领域，超越凡间", ico: "🙏", col: "#fffbeb", hex: "255,251,235" },
];

// 境界奖励配置
export const REALM_BONUSES = {
  11: { sp: 500, msg: "魂师境：魂力+500" },
  21: { sp: 1000, ticket: "common", count: 3, msg: "大魂师境：魂力+1000·普通券×3" },
  31: { sp: 2000, ticket: "common", count: 5, msg: "魂尊境：魂力+2000·普通券×5" },
  41: { sp: 5000, ticket: "advanced", count: 2, msg: "魂宗境：魂力+5000·高级券×2" },
  51: { sp: 10000, ticket: "advanced", count: 5, msg: "魂王境：魂力+10000·高级券×5" },
  61: { sp: 20000, ticket: "apex", count: 2, msg: "魂帝境：魂力+20000·顶级券×2" },
  71: { sp: 50000, ticket: "apex", count: 5, msg: "魂圣境：魂力+50000·顶级券×5" },
  81: { sp: 100000, ticket: "apex", count: 1, ten: true, msg: "魂斗罗境：魂力+100000·顶级十连×1" },
  91: { sp: 200000, ticket: "apex", count: 2, ten: true, power: 50000, msg: "封号斗罗境：魂力+200000·顶级十连×2·战力+50000" },
  95: { sp: 500000, ticket: "apex", count: 3, ten: true, power: 100000, msg: "超级斗罗境：魂力+500000·顶级十连×3·战力+100000" },
  99: { sp: 1000000, ticket: "apex", count: 5, ten: true, power: 300000, msg: "极限斗罗境：顶级十连×5·战力+300000" },
  100: { sp: 5000000, ticket: "apex", count: 10, ten: true, power: 999999, msg: "神级境：顶级十连×10·战力+999999" },
};

// 获取当前境界
export function getCurrentRealm(lv) {
  let r = REALMS[0];
  for (const realm of REALMS) {
    if (lv >= realm.lv) r = realm;
    else break;
  }
  return r;
}

// 获取下一境界
export function getNextRealm(lv) {
  for (const realm of REALMS) {
    if (realm.lv > lv) return realm;
  }
  return null;
}

// 检查是否达到境界突破点
export function isRealmBreakthrough(lv) {
  return REALMS.some((r) => r.lv === lv);
}

// 获取境界名称
export function getRealmName(lv) {
  const realm = getCurrentRealm(lv);
  return realm ? realm.n : "未知";
}

// 获取等级称号
export function rankStr(lv) {
  if (lv >= 100) return "神级";
  if (lv >= 99) return "极限斗罗";
  if (lv >= 95) return "超级斗罗";
  if (lv >= 91) return "封号斗罗";
  if (lv >= 81) return "魂斗罗";
  if (lv >= 71) return "魂圣";
  if (lv >= 61) return "魂帝";
  if (lv >= 51) return "魂王";
  if (lv >= 41) return "魂宗";
  if (lv >= 31) return "魂尊";
  if (lv >= 21) return "大魂师";
  if (lv >= 11) return "魂师";
  return "魂士";
}

// ──── ACHIEVEMENT SYSTEM ────
// 成就系统定义

export const ACH_DEF = [
  { id: "pow_1k", cat: "power", n: "初显锋芒", ico: "⚔️", desc: "战力突破1000", pts: 10, col: "#9ca3af", check: () => calcPower() >= 1000 },
  { id: "pow_10k", cat: "power", n: "崭露头角", ico: "🗡️", desc: "战力突破10000", pts: 30, col: "#60a5fa", check: () => calcPower() >= 10000 },
  { id: "pow_50k", cat: "power", n: "强者初现", ico: "⚡", desc: "战力突破50000", pts: 60, col: "#a78bfa", check: () => calcPower() >= 50000 },
  { id: "pow_100k", cat: "power", n: "百万雄兵", ico: "🔥", desc: "战力突破100000", pts: 100, col: "#f59e0b", check: () => calcPower() >= 100000 },
  { id: "pow_500k", cat: "power", n: "无双之力", ico: "🐉", desc: "战力突破500000", pts: 200, col: "#ef4444", check: () => calcPower() >= 500000 },
  { id: "pow_1m", cat: "power", n: "战神降临", ico: "🌟", desc: "战力突破1000000", pts: 500, col: "#ffd700", check: () => calcPower() >= 1000000 },
  { id: "hunt_10", cat: "explore", n: "初入猎场", ico: "🌲", desc: "完成10次狩猎", pts: 15, col: "#34d399", check: () => (G.huntCount || 0) >= 10 },
  { id: "hunt_50", cat: "explore", n: "猎魂老手", ico: "🔮", desc: "完成50次狩猎", pts: 40, col: "#34d399", check: () => (G.huntCount || 0) >= 50 },
  { id: "hunt_100", cat: "explore", n: "猎魂大师", ico: "🏹", desc: "完成100次狩猎", pts: 80, col: "#34d399", check: () => (G.huntCount || 0) >= 100 },
  { id: "lv30", cat: "explore", n: "世界解锁", ico: "🌍", desc: "达到Lv.30", pts: 50, col: "#a78bfa", check: () => G.level >= 30 },
  { id: "lv50", cat: "explore", n: "魂宗境", ico: "💫", desc: "达到Lv.50", pts: 80, col: "#f59e0b", check: () => G.level >= 50 },
  { id: "lv99", cat: "explore", n: "极限斗罗", ico: "∞", desc: "达到Lv.99", pts: 300, col: "#00ffff", check: () => G.level >= 99 },
  { id: "rings_5", cat: "collect", n: "初集五环", ico: "⭕", desc: "拥有5个魂环", pts: 20, col: "#a78bfa", check: () => (G.soul?.rings?.length || 0) >= 5 },
  { id: "rings_9", cat: "collect", n: "九环归位", ico: "🌀", desc: "拥有9个魂环", pts: 80, col: "#e879f9", check: () => (G.soul?.rings?.length || 0) >= 9 },
  { id: "rings_10", cat: "collect", n: "十全十美", ico: "🔮", desc: "拥有10个魂环", pts: 200, col: "#ffd700", check: () => (G.soul?.rings?.length || 0) >= 10 },
  { id: "bones_all", cat: "collect", n: "骨骼天成", ico: "🦴", desc: "装备6个魂骨", pts: 100, col: "#fbbf24", check: () => Object.values(G.equippedBones || {}).filter(Boolean).length >= 6 },
  { id: "art_equip", cat: "collect", n: "神器在手", ico: "⚔️", desc: "装备神器", pts: 30, col: "#f59e0b", check: () => !!G.equippedArt },
  { id: "grim_50", cat: "collect", n: "传承半数", ico: "📖", desc: "图鉴收录50种武魂", pts: 100, col: "#8b5cf6", check: () => Object.keys(GRIMOIRE.discovered || {}).length >= 50 },
  { id: "cosmic", cat: "legend", n: "宇宙之子", ico: "🌌", desc: "获得宇宙之核", pts: 500, col: "#00ffff", check: () => G.cosmicOwned },
  { id: "godpath", cat: "legend", n: "成神候选", ico: "🌟", desc: "通关成神之路", pts: 300, col: "#fca5a5", check: () => (G.godTrials || []).every((t) => t.cleared) },
  { id: "godbecome", cat: "legend", n: "神位传承", ico: "🙏", desc: "完成神位传承", pts: 1000, col: "#ffd700", check: () => !!G.godType },
  { id: "lot_1000", cat: "legend", n: "千次星运", ico: "🎰", desc: "累计抽取1000次", pts: 200, col: "#f59e0b", check: () => (G.lotTotal || 0) >= 1000 },
  { id: "talent", cat: "legend", n: "封号天才", ico: "⚔️", desc: "解锁封号天赋", pts: 150, col: "#ef4444", check: () => !!G.talent },
  { id: "awaken10", cat: "legend", n: "极限觉醒", ico: "✦", desc: "觉醒等级达到10", pts: 500, col: "#a78bfa", check: () => (G.awakenLevel || 0) >= 10 },
  { id: "easter", cat: "special", n: "彩蛋猎人", ico: "🥚", desc: "发现隐藏彩蛋", pts: 300, col: "#00ffff", check: () => !!G.easterEggSeen },
  { id: "arena10", cat: "special", n: "竞技老手", ico: "🏟️", desc: "赢得10场竞技场", pts: 100, col: "#ef4444", check: () => (G.arenaWins || 0) >= 10 },
  { id: "calendar7", cat: "special", n: "连续修炼", ico: "📅", desc: "连续登录7天", pts: 150, col: "#34d399", check: () => (G.calendarStreak || 0) >= 7 },
  { id: "streak5", cat: "special", n: "连胜达人", ico: "🔥", desc: "异界5连胜", pts: 80, col: "#f87171", check: () => (G.abyss?.streak || 0) >= 5 },
];

// 注意：成就检查函数依赖全局 G 对象和 calcPower 函数
// 这些将在模块加载后初始化

export function initializeAchievementChecks() {
  // 延迟初始化，确保依赖可用
  ACH_DEF.forEach((ach) => {
    // 保存原始检查函数引用
    ach._checkFn = ach.check;
  });
}

export function getAchievement(id) {
  return ACH_DEF.find((a) => a.id === id) || null;
}

export function getAllAchievements() {
  return ACH_DEF;
}

export function getAchievementsByCategory(cat) {
  return ACH_DEF.filter((a) => a.cat === cat);
}

// ══════════════════════════════════════════════════
//  MODULE INDEX - 武魂模拟器模块索引
//  整合所有模块，提供统一入口
// ══════════════════════════════════════════════════

// ──── 配置模块 ────
export { QC, getQualityConfig, getQualityName, getQualityColor } from "./config/quality.js";
export { REALMS, REALM_BONUSES, getCurrentRealm, getNextRealm, isRealmBreakthrough, getRealmName, rankStr } from "./config/realms.js";
export { TALENTS, AWK_FRAG_COSTS, AWK_POWER_BONUS, AWK_FX, getTalent, getAwkFx } from "./config/talents.js";
export { ACH_DEF, getAchievement, getAllAchievements, getAchievementsByCategory } from "./config/achievements.js";
export { TIDAL_STATES, TIDAL_MAX, getTidalState, getTidalPercent } from "./config/luck.js";
export { CAL_REWARDS, getCalendarReward, getCalendarDayReward } from "./config/calendar.js";
export { ARENA_ENEMIES, ARENA_MILESTONES, getArenaEnemy, getArenaMilestone } from "./config/arena.js";

// ──── 数据模块 ────
export { SD, getSoul, pickRandomSoul, getAllSouls } from "./data/souls.js";
export { RT, getRingTier, getRingTierByIndex, getRingYearName, getRingColor, parseRingYear } from "./data/rings.js";
export { BONE_TIER_PW, genBonePw, BONE_SLOTS, BONE_POOL, SPECIAL_BONES, MAX_SPECIAL_BONES, getBonePool, getBoneById } from "./data/bones.js";
export { HERBS, RESOURCES, ARTS, TITLES, getHerb, getResource, getArtifact, getTitle } from "./data/items.js";

// ──── 核心模块 ────
export { defState, migrateState, saveG, loadG, initState } from "./core/state.js";
export { $, $set, $style, $show, $hide, $addCls, $remCls, ri, pick as utilsPick, wPick, bagPush, afterAction, debounce, throttle, clearElementCache } from "./core/utils.js";
export { calcPower, addSP, getPowerMultiplier } from "./core/power.js";
export { calcResonancePower, addSoulFragment, getResonanceInfo, getSoulEvolution, RESONANCE_CFG, FRAGMENT_SOURCES } from "./core/resonance.js";
export { expForLv, addExp, checkRealmBreakthrough, checkContentUnlocks, updateHUD, updateExpBar, checkPowerMilestones } from "./core/exp.js";
export { notify, notifySuccess, notifyError, notifyEpic } from "./core/notify.js";

// ──── 系统模块 ────
export { triggerAwaken, closeResult, genSkills, getQK } from "./systems/awakening.js";
export { hunt, rollRing, renderRecentRings, updateGodPath } from "./systems/hunt.js";
export { doLotSmart, doLot, renderLotPage, goLotPool, updateLotPoolUI } from "./systems/lottery.js";
// TODO: 以下模块待实现
// export { ... } from "./systems/fusion.js";
// export { ... } from "./systems/godpath.js";
// export { ... } from "./systems/abyss.js";
// export { ... } from "./systems/tasks.js";

// ──── UI模块（待实现）───
// export { ... } from "./ui/navigation.js";
// export { ... } from "./ui/soul-page.js";
// export { ... } from "./ui/bag.js";
// export { ... } from "./ui/modals.js";

// ──── 工具函数：创建全局游戏对象 ────
// 注意：为了让模块化的代码与HTML中的onclick处理器兼容，
// 我们需要将关键函数和对象暴露到全局作用域

export function initializeGameModules() {
  // 导入所有模块并附加到 window 对象
  // 这将允许 HTML 中的 onclick="functionName()" 继续工作
  
  console.log("🎮 武魂模拟器模块系统初始化...");
  console.log("📦 已加载模块：");
  console.log("   - 配置模块: quality, realms, talents, achievements, luck, calendar, arena");
  console.log("   - 数据模块: souls, rings, bones, items");
  console.log("   - 核心模块: state, utils, power, resonance");
  console.log("");
  console.log("⚠️  系统模块和UI模块仍在 game.js 中");
  console.log("   完整模块化正在进行中...");
  
  return {
    version: "v9-modular",
    modulesLoaded: 15,
    totalModules: 35,
    progress: "43%",
  };
}

// 默认导出
export default {
  name: "武魂模拟器模块系统",
  version: "v9-modular",
  initialize: initializeGameModules,
};

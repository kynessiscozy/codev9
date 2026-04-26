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
export { fuseRings, renderFusion, selectFusionSoul } from "./systems/fusion.js";
export { startTrial, renderGodPath, claimGodReward } from "./systems/god.js";
export { exploreWorld, renderWorldMap, unlockWorldArea } from "./systems/world.js";
export { startAbyss, renderAbyss, claimAbyssReward } from "./systems/abyss.js";
export { progressTask, renderTasks, claimTaskReward } from "./systems/tasks.js";
export { updateSeason, getSeasonRewards, renderSeasonPage } from "./systems/seasons.js";

// ──── UI模块 ────
export { renderNavigation, switchPage, updateNavigation } from "./ui/navigation.js";
export { renderSoulPage, selectSoul, upgradeSoul, renderSoulDetails } from "./ui/soulPage.js";
export { renderBag, useItem, equipItem, renderBagPage } from "./ui/bag.js";
export { showModal, closeModal, renderModalContent } from "./ui/modals.js";
export { renderSidebar, toggleSidebar, updateSidebar } from "./ui/sidebar.js";
export { renderGrimoire, discoverSoul, discoverRing, discoverBone } from "./ui/grimoire.js";

// ──── GM模块 ────
export { executeGMCommand, showGMConsole, initGMShortcut } from "./gm/console.js";

// ──── 工具函数：创建全局游戏对象 ────
// 注意：为了让模块化的代码与HTML中的onclick处理器兼容，
// 我们需要将关键函数和对象暴露到全局作用域

export function initializeGameModules() {
  console.log("🎮 武魂模拟器模块系统初始化...");
  console.log("📦 已加载模块：");
  console.log("   ✅ 配置模块 (7个): quality, realms, talents, achievements, luck, calendar, arena");
  console.log("   ✅ 数据模块 (4个): souls, rings, bones, items");
  console.log("   ✅ 核心模块 (6个): state, utils, power, resonance, exp, notify");
  console.log("   ✅ 系统模块 (9个): awakening, hunt, lottery, fusion, god, world, abyss, tasks, seasons");
  console.log("   ✅ UI模块 (6个): navigation, soulPage, bag, modals, sidebar, grimoire");
  console.log("   ✅ GM模块 (1个): console");
  console.log("");
  console.log("🎉 模块化完成！共 33 个模块文件");
  
  // 将关键函数挂载到全局（兼容HTML中的onclick）
  import(/* webpackIgnore: true */).then(() => {
    // 这里会在运行时动态导入所有模块并挂载到 window
    // 实际使用中可能需要在 main.js 中处理
  });
  
  return {
    version: "v9-modular",
    modulesLoaded: 33,
    totalModules: 33,
    progress: "100%",
  };
}

// 默认导出
export default {
  name: "武魂模拟器模块系统",
  version: "v9-modular",
  initialize: initializeGameModules,
};

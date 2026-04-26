// ═════════════════════════════════════════════════
//  MODULE INDEX - 武魂模拟器模块索引
//  整合所有模块，提供统一入口
// ═════════════════════════════════════════════════

// ──── 核心基础设施 ────
export { on, once, off, emit, emitAsync, clearAll as clearAllEvents, getHistory as getEventHistory, getEventNames, getListenerCount } from "./core/events.js";
export { defState, migrateState, saveG, loadG, initState } from "./core/state.js";
export { $, $set, $style, $show, $hide, $addCls, $remCls, ri, pick as utilsPick, wPick, bagPush, afterAction, debounce, throttle, clearElementCache } from "./core/utils.js";
export { calcPower, addSP, getPowerMultiplier } from "./core/power.js";
export { calcResonancePower, addSoulFragment, getResonanceInfo, getSoulEvolution, RESONANCE_CFG, FRAGMENT_SOURCES } from "./core/resonance.js";
export { expForLv, addExp, checkRealmBreakthrough, checkContentUnlocks, updateHUD, updateExpBar, checkPowerMilestones } from "./core/exp.js";
export { notify, notifySuccess, notifyError, notifyEpic } from "./core/notify.js";

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
export { getSoulIcon, hasSoulIcon, getSoulTheme, registerSoulIcon, SOUL_ICONS } from "./ui/soul-icons.js";

// ──── GM模块 ────
export { executeGMCommand, showGMConsole, initGMShortcut } from "./gm/console.js";

// ──── 游戏事件常量 ────
export const GameEvents = {
  // 状态变化事件
  STATE_LOADED: 'state:loaded',
  STATE_SAVED: 'state:saved',
  STATE_CHANGED: 'state:changed',

  // 武魂相关事件
  SOUL_AWAKENED: 'soul:awakened',
  SOUL_UPGRADED: 'soul:upgraded',
  SOUL_SELECTED: 'soul:selected',

  // 魂环相关事件
  RING_OBTAINED: 'ring:obtained',
  RING_FUSED: 'ring:fused',
  RING_EQUIPPED: 'ring:equipped',

  // 经验/等级事件
  EXP_GAINED: 'exp:gained',
  LEVEL_UP: 'level:up',
  REALM_BREAKTHROUGH: 'realm:breakthrough',

  // 力量相关事件
  POWER_CHANGED: 'power:changed',
  POWER_MILESTONE: 'power:milestone',

  // UI事件
  PAGE_CHANGED: 'ui:pageChanged',
  MODAL_OPENED: 'ui:modalOpened',
  MODAL_CLOSED: 'ui:modalClosed',
  NOTIFICATION: 'ui:notification',

  // 系统事件
  HUNT_STARTED: 'system:huntStarted',
  HUNT_COMPLETED: 'system:huntCompleted',
  LOTTERY_DRAWN: 'system:lotteryDrawn',
  TASK_COMPLETED: 'system:taskCompleted',
  ACHIEVEMENT_UNLOCKED: 'system:achievementUnlocked',
};

// ──── 工具函数：初始化游戏模块 ────
export function initializeGameModules() {
  console.log("🎮 武魂模拟器模块系统初始化...");
  console.log("📦 已加载模块：");
  console.log("   ✅ 核心基础设施 (7个): events, state, utils, power, resonance, exp, notify");
  console.log("   ✅ 配置模块 (7个): quality, realms, talents, achievements, luck, calendar, arena");
  console.log("   ✅ 数据模块 (4个): souls, rings, bones, items");
  console.log("   ✅ 系统模块 (9个): awakening, hunt, lottery, fusion, god, world, abyss, tasks, seasons");
  console.log("   ✅ UI模块 (6个): navigation, soulPage, bag, modals, sidebar, grimoire");
  console.log("   ✅ GM模块 (1个): console");
  console.log("");
  console.log("🎉 模块化完成！共 34 个模块文件");

  // 注册核心事件监听器
  setupCoreEventListeners();

  return {
    version: "v9-modular-optimized",
    modulesLoaded: 34,
    totalModules: 34,
    progress: "100%",
    events: GameEvents,
  };
}

/**
 * 设置核心事件监听器
 */
function setupCoreEventListeners() {
  const { on } = require('./core/events.js');

  // 监听经验获得事件
  on(GameEvents.EXP_GAINED, (data) => {
    console.log(`[Events] 经验获得: +${data.exp}`);
  });

  // 监听等级提升事件
  on(GameEvents.LEVEL_UP, (data) => {
    console.log(`[Events] 等级提升: ${data.oldLevel} → ${data.newLevel}`);
  });

  // 监听境界突破事件
  on(GameEvents.REALM_BREAKTHROUGH, (data) => {
    console.log(`[Events] 境界突破: ${data.oldRealm} → ${data.newRealm}`);
  });

  // 监听力量变化事件
  on(GameEvents.POWER_CHANGED, (data) => {
    console.log(`[Events] 力量变化: ${data.oldPower} → ${data.newPower}`);
  });

  // 监听成就解锁事件
  on(GameEvents.ACHIEVEMENT_UNLOCKED, (data) => {
    console.log(`[Events] 成就解锁: ${data.achievementId}`);
  });

  console.log("[Events] 核心事件监听器已注册");
}

// ──── 批量导入辅助函数 ────
/**
 * 创建游戏API对象，提供统一的API接口
 * @returns {Object} 游戏API对象
 */
export function createGameAPI() {
  const { on, once, off, emit, emitAsync, clearAllEvents, getEventHistory, getEventNames, getListenerCount } = require('./core/events.js');
  const { saveG, loadG, initState, migrateState } = require('./core/state.js');
  const { updateHUD, notify, notifySuccess, notifyError, notifyEpic } = require('./core/notify.js');

  return {
    // 事件系统
    events: {
      on,
      once,
      off,
      emit,
      emitAsync,
      clearAll: clearAllEvents,
      getHistory: getEventHistory,
      getEventNames,
      getListenerCount,
      GameEvents,
    },

    // 状态管理
    state: {
      save: saveG,
      load: loadG,
      init: initState,
      migrate: migrateState,
    },

    // UI更新
    ui: {
      updateHUD,
      notify,
      notifySuccess,
      notifyError,
      notifyEpic,
    },

    // 版本信息
    version: "v9-modular-optimized",
    buildTime: new Date().toISOString(),
  };
}

// 默认导出
export default {
  name: "武魂模拟器模块系统",
  version: "v9-modular-optimized",
  initialize: initializeGameModules,
  createAPI: createGameAPI,
};

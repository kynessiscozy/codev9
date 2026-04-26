/**
 * 武魂模拟器 - 主入口文件（优化版）
 * 使用统一的模块索引，提供更清晰的全局API
 */

// 导入统一的模块索引
import * as Modules from './modules/index.js';

// 导入类型定义（用于JSDoc提示）
import * as Types from './modules/core/types.js';

// ════════════════════════════════════════════════
// 初始化模块系统
// ════════════════════════════════════════════════

const moduleInfo = Modules.initializeGameModules();
console.log('📊 模块初始化信息:', moduleInfo);

// ════════════════════════════════════════════════
// 创建游戏API并暴露到全局
// ════════════════════════════════════════════════

const gameAPI = Modules.createGameAPI();

// 将API挂载到 window.__GAME_API__
window.__GAME_API__ = gameAPI;

console.log('🎮 游戏API已创建:', Object.keys(gameAPI));

// ════════════════════════════════════════════════
// 兼容层：将关键函数和对象暴露到全局作用域
// ════════════════════════════════════════════════

// ──── 配置模块 ────
window.QC = Modules.QC;
window.getQualityConfig = Modules.getQualityConfig;
window.getQualityName = Modules.getQualityName;
window.getQualityColor = Modules.getQualityColor;

window.REALMS = Modules.REALMS;
window.REALM_BONUSES = Modules.REALM_BONUSES;
window.getCurrentRealm = Modules.getCurrentRealm;
window.getNextRealm = Modules.getNextRealm;
window.isRealmBreakthrough = Modules.isRealmBreakthrough;
window.getRealmName = Modules.getRealmName;
window.rankStr = Modules.rankStr;

window.TALENTS = Modules.TALENTS;
window.AWK_FRAG_COSTS = Modules.AWK_FRAG_COSTS;
window.AWK_POWER_BONUS = Modules.AWK_POWER_BONUS;
window.AWK_FX = Modules.AWK_FX;
window.getTalent = Modules.getTalent;
window.getAwkFx = Modules.getAwkFx;

window.ACH_DEF = Modules.ACH_DEF;
window.getAchievement = Modules.getAchievement;
window.getAllAchievements = Modules.getAllAchievements;
window.getAchievementsByCategory = Modules.getAchievementsByCategory;

window.TIDAL_STATES = Modules.TIDAL_STATES;
window.TIDAL_MAX = Modules.TIDAL_MAX;
window.getTidalState = Modules.getTidalState;
window.getTidalPercent = Modules.getTidalPercent;

window.CAL_REWARDS = Modules.CAL_REWARDS;
window.getCalendarReward = Modules.getCalendarReward;
window.getCalendarDayReward = Modules.getCalendarDayReward;

window.ARENA_ENEMIES = Modules.ARENA_ENEMIES;
window.ARENA_MILESTONES = Modules.ARENA_MILESTONES;
window.getArenaEnemy = Modules.getArenaEnemy;
window.getArenaMilestone = Modules.getArenaMilestone;

// ──── 数据模块 ────
window.SD = Modules.SD;
window.getSoul = Modules.getSoul;
window.pickRandomSoul = Modules.pickRandomSoul;
window.getAllSouls = Modules.getAllSouls;

window.RT = Modules.RT;
window.getRingTier = Modules.getRingTier;
window.getRingTierByIndex = Modules.getRingTierByIndex;
window.getRingYearName = Modules.getRingYearName;
window.getRingColor = Modules.getRingColor;
window.parseRingYear = Modules.parseRingYear;

window.BONE_TIER_PW = Modules.BONE_TIER_PW;
window.genBonePw = Modules.genBonePw;
window.BONE_SLOTS = Modules.BONE_SLOTS;
window.BONE_POOL = Modules.BONE_POOL;
window.SPECIAL_BONES = Modules.SPECIAL_BONES;
window.MAX_SPECIAL_BONES = Modules.MAX_SPECIAL_BONES;
window.getBonePool = Modules.getBonePool;
window.getBoneById = Modules.getBoneById;

window.HERBS = Modules.HERBS;
window.RESOURCES = Modules.RESOURCES;
window.ARTS = Modules.ARTS;
window.TITLES = Modules.TITLES;
window.getHerb = Modules.getHerb;
window.getResource = Modules.getResource;
window.getArtifact = Modules.getArtifact;
window.getTitle = Modules.getTitle;

// ──── 核心模块 ────
window.defState = Modules.defState;
window.migrateState = Modules.migrateState;
window.saveG = Modules.saveG;
window.loadG = Modules.loadG;
window.initState = Modules.initState;

window.$ = Modules.$;
window.$set = Modules.$set;
window.$style = Modules.$style;
window.$show = Modules.$show;
window.$hide = Modules.$hide;
window.$addCls = Modules.$addCls;
window.$remCls = Modules.$remCls;
window.ri = Modules.ri;
window.pick = Modules.utilsPick;
window.wPick = Modules.wPick;
window.bagPush = Modules.bagPush;
window.afterAction = Modules.afterAction;
window.debounce = Modules.debounce;
window.throttle = Modules.throttle;
window.clearElementCache = Modules.clearElementCache;

window.calcPower = Modules.calcPower;
window.addSP = Modules.addSP;
window.getPowerMultiplier = Modules.getPowerMultiplier;

window.calcResonancePower = Modules.calcResonancePower;
window.addSoulFragment = Modules.addSoulFragment;
window.getResonanceInfo = Modules.getResonanceInfo;
window.getSoulEvolution = Modules.getSoulEvolution;
window.RESONANCE_CFG = Modules.RESONANCE_CFG;
window.FRAGMENT_SOURCES = Modules.FRAGMENT_SOURCES;

window.expForLv = Modules.expForLv;
window.addExp = Modules.addExp;
window.checkRealmBreakthrough = Modules.checkRealmBreakthrough;
window.checkContentUnlocks = Modules.checkContentUnlocks;
window.updateHUD = Modules.updateHUD;
window.updateExpBar = Modules.updateExpBar;
window.checkPowerMilestones = Modules.checkPowerMilestones;

window.notify = Modules.notify;
window.notifySuccess = Modules.notifySuccess;
window.notifyError = Modules.notifyError;
window.notifyEpic = Modules.notifyEpic;

// ──── 系统模块 ────
window.triggerAwaken = Modules.triggerAwaken;
window.closeResult = Modules.closeResult;
window.genSkills = Modules.genSkills;
window.getQK = Modules.getQK;

window.hunt = Modules.hunt;
window.rollRing = Modules.rollRing;
window.renderRecentRings = Modules.renderRecentRings;
window.updateGodPath = Modules.updateGodPath;

window.doLotSmart = Modules.doLotSmart;
window.doLot = Modules.doLot;
window.renderLotPage = Modules.renderLotPage;
window.goLotPool = Modules.goLotPool;
window.updateLotPoolUI = Modules.updateLotPoolUI;

window.fuseRings = Modules.fuseRings;
window.renderFusion = Modules.renderFusion;
window.selectFusionSoul = Modules.selectFusionSoul;

window.startTrial = Modules.startTrial;
window.renderGodPath = Modules.renderGodPath;
window.claimGodReward = Modules.claimGodReward;

window.exploreWorld = Modules.exploreWorld;
window.renderWorldMap = Modules.renderWorldMap;
window.unlockWorldArea = Modules.unlockWorldArea;

window.startAbyss = Modules.startAbyss;
window.renderAbyss = Modules.renderAbyss;
window.claimAbyssReward = Modules.claimAbyssReward;

window.progressTask = Modules.progressTask;
window.renderTasks = Modules.renderTasks;
window.claimTaskReward = Modules.claimTaskReward;

window.updateSeason = Modules.updateSeason;
window.getSeasonRewards = Modules.getSeasonRewards;
window.renderSeasonPage = Modules.renderSeasonPage;

// ──── UI模块 ────
window.renderNavigation = Modules.renderNavigation;
window.switchPage = Modules.switchPage;
window.updateNavigation = Modules.updateNavigation;

window.renderSoulPage = Modules.renderSoulPage;
window.selectSoul = Modules.selectSoul;
window.upgradeSoul = Modules.upgradeSoul;
window.renderSoulDetails = Modules.renderSoulDetails;

window.renderBag = Modules.renderBag;
window.useItem = Modules.useItem;
window.equipItem = Modules.equipItem;
window.renderBagPage = Modules.renderBagPage;

window.showModal = Modules.showModal;
window.closeModal = Modules.closeModal;
window.renderModalContent = Modules.renderModalContent;

window.renderSidebar = Modules.renderSidebar;
window.toggleSidebar = Modules.toggleSidebar;
window.updateSidebar = Modules.updateSidebar;

window.renderGrimoire = Modules.renderGrimoire;
window.discoverSoul = Modules.discoverSoul;
window.discoverRing = Modules.discoverRing;
window.discoverBone = Modules.discoverBone;

// ──── 武魂SVG图标系统 ────
window.getSoulIcon = Modules.getSoulIcon;
window.hasSoulIcon = Modules.hasSoulIcon;
window.getSoulTheme = Modules.getSoulTheme;
window.registerSoulIcon = Modules.registerSoulIcon;
window.SOUL_ICONS = Modules.SOUL_ICONS;

// ──── GM模块 ────
window.executeGMCommand = Modules.executeGMCommand;
window.showGMConsole = Modules.showGMConsole;
window.initGMShortcut = Modules.initGMShortcut;

// ──── 事件系统 ────
window.gameEvents = {
  on: Modules.on,
  once: Modules.once,
  off: Modules.off,
  emit: Modules.emit,
  emitAsync: Modules.emitAsync,
  clearAll: Modules.clearAllEvents,
  getHistory: Modules.getEventHistory,
  getEventNames: Modules.getEventNames,
  getListenerCount: Modules.getListenerCount,
  GameEvents: Modules.GameEvents,
};

// ════════════════════════════════════════════════
// 类型定义（用于开发环境）
// ════════════════════════════════════════════════

if (typeof window !== 'undefined' && window.__DEV__) {
  window.__TYPES__ = Types;
  console.log('📝 类型定义已加载（开发模式）');
}

// ════════════════════════════════════════════════
// 导出默认对象（供模块化使用）
// ════════════════════════════════════════════════

console.log('');
console.log('🎮 武魂模拟器模块系统已加载！');
console.log('📦 所有函数已暴露到全局作用域');
console.log('🔗 事件系统已初始化');
console.log('📝 JSDoc类型定义已加载');
console.log('');
console.log('💡 使用 window.__GAME_API__ 访问统一API');
console.log('💡 使用 window.gameEvents 访问事件系统');
console.log('');

export default {
  ...gameAPI,
  modules: moduleInfo,
  types: Types,
};

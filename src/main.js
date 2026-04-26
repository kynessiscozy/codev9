/**
 * 武魂模拟器 - 主入口文件（优化版）
 * 使用统一的模块索引，提供更清晰的全局API
 */

// 导入 CSS（Vite 会处理并打包）
// ⚠️ 必须先导入 style.css，确保全局样式优先加载
import '../style.css';
import './modules/ui/soul-icon-effects.css';
import './modules/fx/effects.css';

// 导入统一的模块索引
import * as Modules from './modules/index.js';

// 导入类型定义（用于JSDoc提示）
import * as Types from './modules/core/types.js';

// ════════════════════════════════════════════════
// 初始化模块系统
// ════════════════════════════════════════════════

const moduleInfo = Modules.initializeGameModules();

// ══════════════════════════════════════════════
// 将 G 暴露到全局（使用 getter 保持同步）
// ══════════════════════════════════════════════
Object.defineProperty(window, 'G', {
  get() { return Modules.G; },
  set(val) { console.warn('[main.js] 请通过模块系统修改 G，不要直接赋值 window.G'); }
});
console.log('🌐 window.G 已绑定到模块状态');
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

// 融合系统
window.openFusion = Modules.openFusion;
window.closeFusion = Modules.closeFusion;
window.selFR = Modules.selFR;
window.pickFR = Modules.pickFR;
window.addFH = Modules.addFH;
window.pickFH = Modules.pickFH;
window.execFusion = Modules.execFusion;

// 成神系统
window.showGodPath = Modules.showGodPath;
window.startTrial = Modules.startTrial;
window.awardTitle = Modules.awardTitle;
window.allGodTrialsCleared = Modules.allGodTrialsCleared;
window.showGodExamSelect = Modules.showGodExamSelect;
window.selectGodExam = Modules.selectGodExam;
window.openGodExam = Modules.openGodExam;
window.doGodExam = Modules.doGodExam;
window.renderSpecialPaths = Modules.renderSpecialPaths;

// 世界探索系统
window.explore = Modules.explore;
window.renderWorldPage = Modules.renderWorldPage;
window.renderArenaPage = Modules.renderArenaPage;
window.startArenaMatch = Modules.startArenaMatch;
window.renderWorldDots = Modules.renderWorldDots;
window.setWorldPage = Modules.setWorldPage;
window.unlockHiddenTask = Modules.unlockHiddenTask;
window.claimHidden = Modules.claimHidden;

// 深渊系统
window.showAbyssLayer = Modules.showAbyssLayer;
window.fightAbyssStage = Modules.fightAbyssStage;
window.renderAbyssPage = Modules.renderAbyssPage;
window.allAbyssCleared = Modules.allAbyssCleared;
window.claimAbyssReward = Modules.claimAbyssReward;

// 任务系统
window.setTaskDot = Modules.setTaskDot;
window.progressTask = Modules.progressTask;
window.renderTasks = Modules.renderTasks;
window.claimTaskReward = Modules.claimTaskReward;
window.initSeasonalTasks = Modules.initSeasonalTasks;
window.triggerSeasonal = Modules.triggerSeasonal;
window.renderSeasonalTasks = Modules.renderSeasonalTasks;

// 季节系统
window.stopSbGeo = Modules.stopSbGeo;
window.initSeasonalGeo = Modules.initSeasonalGeo;
window.renderSeasonalActivities = Modules.renderSeasonalActivities;
window.getCurrentSeason = Modules.getCurrentSeason;
window.getSeasonBonus = Modules.getSeasonBonus;

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
window.grimoireDiscover = Modules.grimoireDiscover;
window.discoverRing = Modules.discoverRing;
window.discoverBone = Modules.discoverBone;

// ──── 武魂SVG图标系统 ────
window.getSoulIcon = Modules.getSoulIcon;
window.hasSoulIcon = Modules.hasSoulIcon;
window.getSoulTheme = Modules.getSoulTheme;
window.registerSoulIcon = Modules.registerSoulIcon;
window.SOUL_ICONS = Modules.SOUL_ICONS;

// ──── 特效模块 ────
window.fxParticles = {
  init: Modules.initParticleSystem,
  destroy: Modules.destroyParticleSystem,
  createEmitter: Modules.createEmitter,
  destroyEmitter: Modules.destroyEmitter,
  awakenBurst: Modules.fxAwakenBurst,
  levelUp: Modules.fxLevelUp,
  realmBreakthrough: Modules.fxRealmBreakthrough,
  combatHit: Modules.fxCombatHit,
  ringObtained: Modules.fxRingObtained,
  lotteryFlash: Modules.fxLotteryFlash,
  ambient: Modules.fxAmbientParticles,
  getStats: Modules.getParticleStats,
};
window.fx3D = {
  flip: Modules.flip3D,
  enableCardFloat: Modules.enableCardFloat3D,
  createShowcase: Modules.createShowcase3D,
  animateResultOverlay: Modules.animateResultOverlay3D,
  animateSoulIcon: Modules.animateSoulIcon3D,
  createRingOrbit: Modules.createRingOrbit3D,
  shake: Modules.shake3D,
  applyLegendaryResult: Modules.applyLegendaryResult3D,
  reset: Modules.reset3D,
  enableSoulCards: Modules.enableSoulCards3D,
};
window.fxAudio = {
  init: Modules.initAudio,
  click: Modules.sfxClick,
  open: Modules.sfxOpen,
  close: Modules.sfxClose,
  awaken: Modules.sfxAwaken,
  levelUp: Modules.sfxLevelUp,
  realmBreak: Modules.sfxRealmBreak,
  combatHit: Modules.sfxCombatHit,
  crit: Modules.sfxCrit,
  ringObtained: Modules.sfxRingObtained,
  lottery: Modules.sfxLottery,
  error: Modules.sfxError,
  success: Modules.sfxSuccess,
  spGain: Modules.sfxSPGain,
  fusion: Modules.sfxFusion,
  playAmbient: Modules.playAmbient,
  stopAmbient: Modules.stopAmbient,
  setMute: Modules.setMute,
  toggleMute: Modules.toggleMute,
  setVolume: Modules.setVolume,
  getVolume: Modules.getVolume,
  getMuteState: Modules.getMuteState,
  autoBind: Modules.autoBindSFX,
  createMuteButton: Modules.createMuteButton,
};

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
// 加载传统游戏脚本（game.js 包含完整UI实现）
// ════════════════════════════════════════════════

// 动态注入 game.js，使其与模块系统共存
// game.js 提供完整的UI渲染，模块系统提供新功能（SVG图标、特效等）
import gameScript from './game.js?raw';

function injectGameScript() {
  try {
    if (!gameScript) {
      console.error('❌ game.js 内容为空，无法注入');
      return;
    }
    const script = document.createElement('script');
    script.textContent = gameScript;
    script.id = 'game-js-injected';
    document.body.appendChild(script);
    console.log('📜 game.js 已注入，完整UI系统就绪');
  } catch (err) {
    console.error('❌ 注入 game.js 失败:', err);
  }
}

// 确保页面加载后正确处理觉醒屏幕的显示状态
function ensureAwakeningScreen() {
  try {
    const G = window.G || { awakenDone: false };
    const saEl = document.getElementById('SA');
    if (!saEl) return;
    
    if (G.awakenDone) {
      saEl.style.display = 'none';
      // 确保主应用显示
      const appEl = document.getElementById('app');
      if (appEl) appEl.style.display = 'flex';
    } else {
      saEl.style.display = 'flex';
    }
  } catch (e) {
    console.error('检查觉醒屏幕状态失败:', e);
  }
}

// 在 DOM 和 game.js 都加载后，再次检查觉醒屏幕状态
setTimeout(ensureAwakeningScreen, 500);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectGameScript);
} else {
  injectGameScript();
}

// ════════════════════════════════════════════════
// 导出默认对象（供模块化使用）
// ════════════════════════════════════════════════

console.log('');
console.log('🎮 武魂模拟器模块系统已加载！');
console.log('📦 所有函数已暴露到全局作用域');
console.log('🔗 事件系统已初始化');
console.log('📝 JSDoc类型定义已加载');
console.log('✨ WebGL粒子 + 3D动画 + 音效系统已就绪');
console.log('');
console.log('💡 使用 window.__GAME_API__ 访问统一API');
console.log('💡 使用 window.gameEvents 访问事件系统');
console.log('💡 使用 window.fxParticles / fx3D / fxAudio 访问特效系统');
console.log('');

export default {
  ...gameAPI,
  modules: moduleInfo,
  types: Types,
};

// ═════════════════════════════════════════════════
//  MODULE INDEX - 武魂模拟器模块索引
//  整合所有模块，提供统一入口
// ═════════════════════════════════════════════════

// 本地导入（供内部函数使用，避免 require）
import { on, once, off, emit, emitAsync, clearAll as clearAllEvents, getHistory as getEventHistory, getEventNames, getListenerCount } from './core/events.js';
import { saveG, loadG, initState, migrateState } from './core/state.js';
import { updateHUD } from './core/exp.js';
import { notify, notifySuccess, notifyError, notifyEpic } from './core/notify.js';

// ──── 核心基础设施 ────
export { on, once, off, emit, emitAsync, clearAllEvents, getEventHistory, getEventNames, getListenerCount };
export { defState, migrateState, saveG, loadG, initState, G } from "./core/state.js";
export { $, $set, $style, $show, $hide, $addCls, $remCls, ri, pick as utilsPick, wPick, bagPush, afterAction, debounce, throttle, clearElementCache } from "./core/utils.js";
export { calcPower, addSP, getPowerMultiplier } from "./core/power.js";
export { calcResonancePower, addSoulFragment, getResonanceInfo, getSoulEvolution, execSoulEvolution, SOUL_EVOLUTIONS, RESONANCE_CFG, FRAGMENT_SOURCES } from "./core/resonance.js";
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
export { openFusion, closeFusion, selFR, pickFR, addFH, pickFH, execFusion } from "./systems/fusion.js";
export { showGodPath, startTrial, awardTitle, allGodTrialsCleared, showGodExamSelect, selectGodExam, openGodExam, doGodExam, renderSpecialPaths } from "./systems/god.js";
export { explore, renderWorldPage, renderArenaPage, startArenaMatch, renderWorldDots, setWorldPage, unlockHiddenTask, claimHidden } from "./systems/world.js";
export { showAbyssLayer, fightAbyssStage, renderAbyssPage, allAbyssCleared, claimAbyssReward } from "./systems/abyss.js";
export { setTaskDot, progressTask, renderTasks, claimTaskReward, initSeasonalTasks, triggerSeasonal, renderSeasonalTasks } from "./systems/tasks.js";
export { stopSbGeo, initSeasonalGeo, renderSeasonalActivities, getCurrentSeason, getSeasonBonus } from "./systems/seasons.js";

// ──── UI模块 ────
export { navTo, initBottomNav, updateNavActive, initBackToTop, scrollToTop } from "./ui/navigation.js";
export { renderSoulPage, showSoulGeo, hideSoulGeo, doSecondAwaken, openSoulResonance, openSoulEvolution, openSoulDetail } from "./ui/soulPage.js";
export { renderBag, filterBag, openBagItem, useBagItem, discardBagItem } from "./ui/bag.js";
export { openModal, closeModal, openSelectModal, openConfirmModal, openInputModal, showNotifyModal } from "./ui/modals.js";
export { renderSidebar, toggleSidebar, updateSidebar } from "./ui/sidebar.js";
export { renderGrimoire, discoverSoul, discoverRing, discoverBone } from "./ui/grimoire.js";
export { getSoulIcon, hasSoulIcon, getSoulTheme, registerSoulIcon, SOUL_ICONS } from "./ui/soul-icons.js";

// ──── 特效模块 ────
export {
  initParticleSystem, destroyParticleSystem,
  createEmitter, destroyEmitter,
  fxAwakenBurst, fxLevelUp, fxRealmBreakthrough,
  fxCombatHit, fxRingObtained, fxLotteryFlash,
  fxAmbientParticles, getParticleStats
} from "./fx/particles.js";
export {
  flip3D, enableCardFloat3D, createShowcase3D,
  animateResultOverlay3D, animateSoulIcon3D,
  createRingOrbit3D, shake3D, applyLegendaryResult3D,
  reset3D, enableSoulCards3D
} from "./fx/3d-effects.js";
export {
  initAudio, sfxClick, sfxOpen, sfxClose,
  sfxAwaken, sfxLevelUp, sfxRealmBreak,
  sfxCombatHit, sfxCrit, sfxRingObtained,
  sfxLottery, sfxError, sfxSuccess, sfxSPGain, sfxFusion,
  playAmbient, stopAmbient,
  setMute, toggleMute, setVolume, getVolume, getMuteState,
  autoBindSFX, createMuteButton
} from "./fx/audio.js";

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
  console.log("   ✅ 特效模块 (3个): particles, 3d-effects, audio");
  console.log("   ✅ GM模块 (1个): console");
  console.log("");
  console.log("🎉 模块化完成！共 37 个模块文件");

  // 注册核心事件监听器
  setupCoreEventListeners();

  // 初始化特效系统
  setupFXSystem();

  return {
    version: "v9-modular-fx",
    modulesLoaded: 37,
    totalModules: 37,
    progress: "100%",
    events: GameEvents,
  };
}

/**
 * 设置核心事件监听器
 */
function setupCoreEventListeners() {
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

/**
 * 初始化特效系统（延迟加载，避免阻塞）
 */
function setupFXSystem() {
  // 使用动态导入避免循环依赖
  Promise.all([
    import('./fx/particles.js'),
    import('./fx/audio.js'),
    import('./fx/3d-effects.js'),
    import('./core/events.js'),
  ]).then(([Particles, Audio, FX3D, Events]) => {
    // 初始化音频（需要用户交互后才能播放）
    const initAudioOnce = () => {
      Audio.initAudio();
      document.removeEventListener('click', initAudioOnce);
      document.removeEventListener('touchstart', initAudioOnce);
    };
    document.addEventListener('click', initAudioOnce);
    document.addEventListener('touchstart', initAudioOnce);

    // 绑定特效到游戏事件
    const { on } = Events;

    on(GameEvents.SOUL_AWAKENED, (data) => {
      const qc = data.qualityConfig || {};
      Particles.fxAwakenBurst(qc.c || '#ffd700');
      Audio.sfxAwaken(data.quality);
      if (['legend', 'apex', 'twin', 'triple'].includes(data.quality)) {
        setTimeout(() => FX3D.applyLegendaryResult3D('OR'), 100);
      }
    });

    on(GameEvents.LEVEL_UP, () => {
      Particles.fxLevelUp();
      Audio.sfxLevelUp();
    });

    on(GameEvents.REALM_BREAKTHROUGH, () => {
      Particles.fxRealmBreakthrough();
      Audio.sfxRealmBreak();
    });

    on(GameEvents.RING_OBTAINED, (data) => {
      Particles.fxRingObtained(window.innerWidth / 2, window.innerHeight * 0.5, data.color || '#ffd700');
      Audio.sfxRingObtained(data.tier);
    });

    on(GameEvents.LOTTERY_DRAWN, (data) => {
      const isRare = ['legend', 'apex', 'divine', 'cosmic'].includes(data.quality);
      if (isRare) {
        Particles.fxLotteryFlash(window.innerWidth / 2, window.innerHeight * 0.4, data.color || '#ffd700');
      }
      Audio.sfxLottery(isRare);
    });

    // 自动绑定点击音效
    setTimeout(() => Audio.autoBindSFX(), 500);

    console.log('✨ 特效系统已初始化（WebGL粒子 + 3D动画 + 音效）');
  }).catch(err => {
    console.warn('特效系统初始化失败:', err);
  });
}

// ──── 批量导入辅助函数 ────
/**
 * 创建游戏API对象，提供统一的API接口
 * @returns {Object} 游戏API对象
 */
export function createGameAPI() {
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
    version: "v9-modular-fx",
    buildTime: new Date().toISOString(),
  };
}

// 默认导出
export default {
  name: "武魂模拟器模块系统",
  version: "v9-modular-fx",
  initialize: initializeGameModules,
  createAPI: createGameAPI,
};

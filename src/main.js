/**
 * 武魂模拟器 - 主入口文件
 * 导入所有模块并将必要函数暴露到全局作用域
 */

// 导入所有模块配置
import * as Config from './config/quality.js';
import * as Realms from './config/realms.js';
import * as Talents from './config/talents.js';
import * as Achievements from './config/achievements.js';
import * as Luck from './config/luck.js';
import * as Calendar from './config/calendar.js';
import * as Arena from './config/arena.js';

// 导入所有数据模块
import * as Souls from './data/souls.js';
import * as Rings from './data/rings.js';
import * as Bones from './data/bones.js';
import * as Items from './data/items.js';

// 导入所有核心模块
import * as State from './core/state.js';
import * as Utils from './core/utils.js';
import * as Power from './core/power.js';
import * as Resonance from './core/resonance.js';
import * as Exp from './core/exp.js';
import * as Notify from './core/notify.js';

// 导入所有系统模块
import * as Awakening from './systems/awakening.js';
import * as Hunt from './systems/hunt.js';
import * as Lottery from './systems/lottery.js';
import * as Fusion from './systems/fusion.js';
import * as God from './systems/god.js';
import * as World from './systems/world.js';
import * as Abyss from './systems/abyss.js';
import * as Tasks from './systems/tasks.js';
import * as Seasons from './systems/seasons.js';

// 导入所有UI模块
import * as Navigation from './ui/navigation.js';
import * as SoulPage from './ui/soulPage.js';
import * as Bag from './ui/bag.js';
import * as Modals from './ui/modals.js';
import * as Sidebar from './ui/sidebar.js';
import * as Grimoire from './ui/grimoire.js';

// 导入GM模块
import * as GM from './gm/console.js';

// 将配置暴露到全局（兼容 game.js 中的代码）
window.QC = Config.QC;
window.getQualityConfig = Config.getQualityConfig;
window.getQualityName = Config.getQualityName;
window.getQualityColor = Config.getQualityColor;

window.REALMS = Realms.REALMS;
window.REALM_BONUSES = Realms.REALM_BONUSES;
window.getCurrentRealm = Realms.getCurrentRealm;
window.getNextRealm = Realms.getNextRealm;
window.isRealmBreakthrough = Realms.isRealmBreakthrough;
window.getRealmName = Realms.getRealmName;
window.rankStr = Realms.rankStr;
window.showRealmOverlay = Realms.showRealmOverlay;
window.closeRealmOverlay = Realms.closeRealmOverlay;
window.updateRealmBadge = Realms.updateRealmBadge;

window.TALENTS = Talents.TALENTS;
window.AWK_FRAG_COSTS = Talents.AWK_FRAG_COSTS;
window.AWK_POWER_BONUS = Talents.AWK_POWER_BONUS;
window.AWK_FX = Talents.AWK_FX;
window.getTalent = Talents.getTalent;
window.getAwkFx = Talents.getAwkFx;

window.ACH_DEF = Achievements.ACH_DEF;
window.getAchievement = Achievements.getAchievement;
window.getAllAchievements = Achievements.getAllAchievements;
window.getAchievementsByCategory = Achievements.getAchievementsByCategory;

window.TIDAL_STATES = Luck.TIDAL_STATES;
window.TIDAL_MAX = Luck.TIDAL_MAX;
window.getTidalState = Luck.getTidalState;
window.getTidalPercent = Luck.getTidalPercent;

window.CAL_REWARDS = Calendar.CAL_REWARDS;
window.getCalendarReward = Calendar.getCalendarReward;
window.getCalendarDayReward = Calendar.getCalendarDayReward;

window.ARENA_ENEMIES = Arena.ARENA_ENEMIES;
window.ARENA_MILESTONES = Arena.ARENA_MILESTONES;
window.getArenaEnemy = Arena.getArenaEnemy;
window.getArenaMilestone = Arena.getArenaMilestone;

// 将数据暴露到全局
window.SD = Souls.SD;
window.getSoul = Souls.getSoul;
window.pickRandomSoul = Souls.pickRandomSoul;
window.getAllSouls = Souls.getAllSouls;

window.RT = Rings.RT;
window.getRingTier = Rings.getRingTier;
window.getRingTierByIndex = Rings.getRingTierByIndex;
window.getRingColor = Rings.getRingColor;
window.parseRingYear = Rings.parseRingYear;

window.BONE_TIER_PW = Bones.BONE_TIER_PW;
window.genBonePw = Bones.genBonePw;
window.BONE_SLOTS = Bones.BONE_SLOTS;
window.BONE_POOL = Bones.BONE_POOL;
window.SPECIAL_BONES = Bones.SPECIAL_BONES;
window.MAX_SPECIAL_BONES = Bones.MAX_SPECIAL_BONES;
window.getBonePool = Bones.getBonePool;
window.getBoneById = Bones.getBoneById;

window.HERBS = Items.HERBS;
window.RESOURCES = Items.RESOURCES;
window.ARTS = Items.ARTS;
window.TITLES = Items.TITLES;
window.getHerb = Items.getHerb;
window.getResource = Items.getResource;
window.getArtifact = Items.getArtifact;
window.getTitle = Items.getTitle;

// 将核心函数暴露到全局
window.G = State.G;
window.defState = State.defState;
window.migrateState = State.migrateState;
window.saveG = State.saveG;
window.loadG = State.loadG;
window.initState = State.initState;

window.$ = Utils.$;
window.$set = Utils.$set;
window.$style = Utils.$style;
window.$show = Utils.$show;
window.$hide = Utils.$hide;
window.$addCls = Utils.$addCls;
window.$remCls = Utils.$remCls;
window.ri = Utils.ri;
window.wPick = Utils.wPick;
window.bagPush = Utils.bagPush;
window.afterAction = Utils.afterAction;
window.debounce = Utils.debounce;
window.throttle = Utils.throttle;
window.clearElementCache = Utils.clearElementCache;
window.spawnBurst = Utils.spawnBurst;

window.calcPower = Power.calcPower;
window.addSP = Power.addSP;
window.getPowerMultiplier = Power.getPowerMultiplier;

window.calcResonancePower = Resonance.calcResonancePower;
window.addSoulFragment = Resonance.addSoulFragment;
window.getResonanceInfo = Resonance.getResonanceInfo;
window.getSoulEvolution = Resonance.getSoulEvolution;
window.RESONANCE_CFG = Resonance.RESONANCE_CFG;
window.FRAGMENT_SOURCES = Resonance.FRAGMENT_SOURCES;

window.expForLv = Exp.expForLv;
window.addExp = Exp.addExp;
window.checkRealmBreakthrough = Exp.checkRealmBreakthrough;
window.checkContentUnlocks = Exp.checkContentUnlocks;
window.updateHUD = Exp.updateHUD;
window.updateExpBar = Exp.updateExpBar;
window.checkPowerMilestones = Exp.checkPowerMilestones;

window.notify = Notify.notify;
window.notifySuccess = Notify.notifySuccess;
window.notifyError = Notify.notifyError;
window.notifyEpic = Notify.notifyEpic;

// 将系统函数暴露到全局
window.triggerAwaken = Awakening.triggerAwaken;
window.closeResult = Awakening.closeResult;
window.genSkills = Awakening.genSkills;
window.getQK = Awakening.getQK;

window.hunt = Hunt.hunt;
window.rollRing = Hunt.rollRing;
window.renderRecentRings = Hunt.renderRecentRings;
window.updateGodPath = Hunt.updateGodPath;

window.doLotSmart = Lottery.doLotSmart;
window.doLot = Lottery.doLot;
window.renderLotPage = Lottery.renderLotPage;
window.goLotPool = Lottery.goLotPool;
window.updateLotPoolUI = Lottery.updateLotPoolUI;
window.addTicketToBag = Lottery.addTicketToBag;
window.poolTicketName = Lottery.poolTicketName;
window.poolTicketIcon = Lottery.poolTicketIcon;
window.poolTicketColor = Lottery.poolTicketColor;
window.poolTicketIdx = Lottery.poolTicketIdx;

// UI函数
window.navTo = Navigation.navTo;
window.renderSoulPage = SoulPage.renderSoulPage;
window.openSoulDetail = SoulPage.openSoulDetail;
window.equipArt = SoulPage.equipArt;
window.unequipArt = SoulPage.unequipArt;
window.openBonePanel = SoulPage.openBonePanel;
window.equipBoneToSlot = SoulPage.equipBoneToSlot;
window.unequipBone = SoulPage.unequipBone;

window.toggleBagFab = Bag.toggleBagFab;
window.setBagFabIcon = Bag.setBagFabIcon;
window.initBagFabDrag = Bag.initBagFabDrag;
window.openBag = Bag.openBag;

window.updateSidebar = Sidebar.updateSidebar;
window.toggleSidebar = Sidebar.toggleSidebar;
window.openSidebar = Sidebar.openSidebar;
window.closeSidebar = Sidebar.closeSidebar;

window.openGrimoire = Grimoire.openGrimoire;
window.closeGrimoire = Grimoire.closeGrimoire;

// GM函数
window.openGM = GM.openGM;
window.closeGM = GM.closeGM;
window.executeGMCommand = GM.executeGMCommand;

console.log('🎮 武魂模拟器模块系统已加载！');
console.log('📦 已加载模块：');
console.log('   ✅ 配置模块 (7个)');
console.log('   ✅ 数据模块 (4个)');
console.log('   ✅ 核心模块 (6个)');
console.log('   ✅ 系统模块 (9个)');
console.log('   ✅ UI模块 (6个)');
console.log('   ✅ GM模块 (1个)');
console.log('');
console.log('🎉 所有函数已暴露到全局作用域， game.js 可以继续使用！');

// ──── GAME STATE MANAGEMENT ────
// 游戏状态管理：默认状态、状态迁移、存档读写

// 成神之路试炼配置
export const GOD_TRIALS = [
  { id: "t1", n: "苦难之关", i: "🔥", d: "承受烈焰淬炼，坚守心中意志不熄灭。", rew: "经验+2000,战力+300,获得灵石×5", rsp: 500, cleared: false },
  { id: "t2", n: "孤独之关", i: "❄️", d: "在极寒孤独中修炼，感受寂静之力。", rew: "经验+3000,战力+500,获得稀有称号", rsp: 800, cleared: false },
  { id: "t3", n: "诱惑之关", i: "💛", d: "抵御一切诱惑，守住本心方可通关。", rew: "经验+4000,战力+800,获得神器", rsp: 1000, cleared: false },
  { id: "t4", n: "死亡之关", i: "💀", d: "面对虚拟死亡恐惧，突破生死界限。", rew: "经验+8000,战力+1500,解锁神级属性", rsp: 1500, cleared: false },
  { id: "t5", n: "超越之关", i: "🌟", d: "超越自我极限，触碰神之领域边缘。", rew: "经验+15000,战力+3000,神之子称号", rsp: 2000, cleared: false },
  { id: "t6", n: "虚无之关", i: "🌌", d: "在虚无中找寻存在意义，完成最终蜕变。", rew: "经验+30000,战力+8000,半神称号+成神道路解锁", rsp: 3000, cleared: false },
];

// 默认游戏状态
export function defState() {
  return {
    sp: 1000,
    exp: 0,
    level: 1,
    awakenDone: false,
    soul: null,
    equippedBones: {},
    equippedArt: null,
    bag: [],
    titles: [],
    tasks: [],
    taskRT: 0,
    refreshCount: 0,
    cultCount: 0,
    explCount: 0,
    dailyEarned: 0,
    idleEarned: 0,
    explEarned: 0,
    huntCount: 0,
    lotTotal: 0,
    lotMode: 0,
    lotTopCount: 0,
    lotHistory: [],
    recentRings: [],
    cosmicOwned: false,
    ouhuang: false,
    luckBonus: 0,
    extraPower: 0,
    stats: { rings: 0, bones: 0, arts: 0, hunts: 0 },
    godTrials: JSON.parse(JSON.stringify(GOD_TRIALS)),
    newbieGiftClaimed: false,
    powerMilestones: [],
    taskDotPending: false,
    easterEggSeen: false,
    equippedTitle: null,
    seasonal: { completions: { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 }, s2count: 0, s4count: 0, s5milestone: 0 },
    abyss: { tokens: 10, maxTokens: 10, lastTokenTime: Date.now(), shards: 0, progress: {}, curLayer: 1, firstClear: {}, wins: 0, streak: 0, totalBattles: 0 },
    // v9: content unlock tracking
    unlockedSystems: { bone: false, fusion: false, specialPathPreview: false },
    unlockNotified: { bone: false, fusion: false, specialPathPreview: false },
    // v9: god trial will tracking
    godTrialWill: {}, // {trialId: failCount}
    // v9: soul resonance / soul fragments
    soulFragments: {}, // {quality: count}
    soulResonance: { level: 0, totalFragments: 0 },
    // v9: soul evolution chains
    soulEvolutions: {}, // {soulName: evolveTo}
    // v9: activity system
    activity: {
      id: "springFestival",
      name: "踏春欧皇",
      active: true,
      startTime: Date.now(),
      duration: 14 * 24 * 3600 * 1000,
      currency: 0, // 春分灵露
      shop: [],
      shopClaimed: {},
      tasks: {},
    },
    lastSave: Date.now(),
    _ver: 10,
    // V8 fields
    talent: null,
    awakenLevel: 0,
    honorPoints: 0,
    realmBonusClaimed: [],
    achievements: {},
    arenaHonor: 0,
    arenaWins: 0,
    arenaLosses: 0,
    calendarStreak: 0,
    calendarLastLogin: 0,
    tidalPulls: [0, 0, 0],
    hiddenTasks: [],
  };
}

// v9/v10 状态迁移
export function migrateState(g) {
  if (!g) return g;

  if (!g._ver || g._ver < 9) {
    g.unlockedSystems = g.unlockedSystems || { bone: false, fusion: false, specialPathPreview: false };
    g.unlockNotified = g.unlockNotified || { bone: false, fusion: false, specialPathPreview: false };
    g.godTrialWill = g.godTrialWill || {};
    g.soulFragments = g.soulFragments || {};
    g.soulResonance = g.soulResonance || { level: 0, totalFragments: 0 };
    g.soulEvolutions = g.soulEvolutions || {};
    g.activity = g.activity || {
      id: "springFestival",
      name: "踏春欧皇",
      active: true,
      startTime: Date.now(),
      duration: 14 * 24 * 3600 * 1000,
      currency: 0,
      shop: [],
      shopClaimed: {},
      tasks: {},
    };
    g._ver = 9;
  }

  if (!g._ver || g._ver < 10) {
    g.talent = g.talent || null;
    g.awakenLevel = g.awakenLevel || 0;
    g.honorPoints = g.honorPoints || 0;
    g.realmBonusClaimed = g.realmBonusClaimed || [];
    g.achievements = g.achievements || {};
    g.arenaHonor = g.arenaHonor || 0;
    g.arenaWins = g.arenaWins || 0;
    g.arenaLosses = g.arenaLosses || 0;
    g.calendarStreak = g.calendarStreak || 0;
    g.calendarLastLogin = g.calendarLastLogin || 0;
    g.tidalPulls = g.tidalPulls || [0, 0, 0];
    g.hiddenTasks = g.hiddenTasks || [];
    g._ver = 10;
  }

  return g;
}

// 保存游戏状态
export function saveG() {
  try {
    localStorage.setItem("dlv3", JSON.stringify(G));
  } catch (e) {
    console.error("保存失败:", e);
  }
}

// 加载游戏状态
export function loadG() {
  try {
    const s = localStorage.getItem("dlv3");
    return s ? JSON.parse(s) : null;
  } catch (e) {
    console.error("加载失败:", e);
    return null;
  }
}

// 初始化游戏状态（在 main.js 中调用）
export function initState() {
  const loaded = migrateState(loadG());
  return loaded || defState();
}

// 全局游戏状态实例
export let G = initState();

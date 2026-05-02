/**
 * 游戏统一配置文件
 * 集中管理所有游戏配置，提供默认值和环境变量覆盖
 */

// ═════════════════════════════════════════════════
// 环境检测
// ═════════════════════════════════════════════════

const isDev = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development';
const isProd = !isDev;

// ═════════════════════════════════════════════════
// 游戏基础配置
// ═════════════════════════════════════════════════

const GAME_CONFIG = {
  // 游戏信息
  game: {
    name: '武魂模拟器',
    version: 'v9-modular-optimized',
    author: 'CodeBuddy AI',
    description: '基于斗罗大陆的武魂模拟游戏',
  },

  // 调试模式
  debug: isDev,

  // 性能配置
  performance: {
    enableCache: true,
    cacheTimeout: 5 * 60 * 1000, // 5分钟
    maxHistoryLength: 100,
    enableAnalytics: isProd,
  },

  // UI配置
  ui: {
    animationDuration: 300,
    notificationDuration: 3000,
    modalAnimation: true,
    enableSoundEffects: false,


  },

  // 保存配置
  storage: {
    key: 'wuhun_simulator_save',
    autoSaveInterval: 30000, // 30秒自动保存
    maxSaveSlots: 3,
    enableCloudSave: false,
  },
};

// ═════════════════════════════════════════════════
// 游戏机制配置
// ═════════════════════════════════════════════════

const MECHANICS_CONFIG = {
  // 经验配置
  exp: {
    baseExp: 100,
    expGrowthRate: 1.5,
    maxLevel: 100,
    expSources: {
      hunt: 10,
      lottery: 5,
      task: 20,
      abyss: 50,
    },
  },

  // 力量配置
  power: {
    basePower: 100,
    powerGrowthRate: 1.2,
    maxPower: 999999,
    soulPowerMultiplier: 1.0,
    ringPowerMultiplier: 0.5,
    bonePowerMultiplier: 0.3,
  },

  // 武魂配置
  soul: {
    maxSouls: 10,
    maxLevel: 10,
    upgradeCostMultiplier: 1.5,
    resonanceSlots: 6,
    evolutionStages: 5,
  },

  // 魂环配置
  ring: {
    maxRings: 10,
    maxYear: 1000000,
    yearGrowthStages: [100, 1000, 10000, 100000, 1000000],
    fusionSuccessRate: {
      base: 0.5,
      bonus: 0.1,
    },
  },

  // 魂骨配置
  bone: {
    maxBones: 6,
    slots: ['head', 'torso', 'arms', 'legs', 'feet', 'tail'],
    specialBoneChance: 0.05,
  },

  // 货币配置
  currency: {
    tickets: {
      initial: 10,
      max: 9999,
      regenerateRate: 1, // 每10分钟恢复1张
      regenerateInterval: 600000, // 10分钟
    },
  },
};

// ═════════════════════════════════════════════════
// 概率配置
// ═════════════════════════════════════════════════

const PROBABILITY_CONFIG = {
  // 品质概率
  qualityWeights: {
    orange: 50,  // 普通 - 50%
    red: 30,      // 优秀 - 30%
    pink: 15,     // 精良 - 15%
    gold: 4,      // 史诗 - 4%
    colorful: 1,  // 传说 - 1%
  },

  // 技能数量概率
  skillCountWeights: {
    1: 70,  // 70%概率获得1个技能
    2: 25,  // 25%概率获得2个技能
    3: 5,   // 5%概率获得3个技能
  },

  // 魂环抽奖概率
  lotteryWeights: {
    common: 60,
    rare: 30,
    epic: 8,
    legendary: 2,
  },

  // 暴击配置
  critical: {
    baseRate: 0.1,
    maxRate: 0.5,
    multiplier: 2.0,
  },
};

// ═════════════════════════════════════════════════
// 内容解锁配置
// ═════════════════════════════════════════════════

const UNLOCK_CONFIG = {
  // 系统解锁等级
  systems: {
    awakening: 5,      // 武魂觉醒 - 5级
    hunt: 1,            // 猎杀魂兽 - 1级
    lottery: 3,         // 武魂抽奖 - 3级
    fusion: 10,         // 魂环融合 - 10级
    godPath: 20,        // 成神之路 - 20级
    world: 15,          // 世界探索 - 15级
    abyss: 25,          // 异界深渊 - 25级
    tasks: 1,           // 任务系统 - 1级
    seasons: 1,         // 季节系统 - 1级
    grimoire: 5,       // 图鉴系统 - 5级
  },

  // 功能解锁力量要求
  features: {
    autoHunt: 1000,
    batchLottery: 5000,
    soulEvolution: 10000,
    resonance: 500,
    gmConsole: Infinity, // 仅GM可用
  },
};

// ═════════════════════════════════════════════════
// 配置管理类
// ═════════════════════════════════════════════════

class GameConfig {
  constructor() {
    this.config = {
      game: GAME_CONFIG,
      mechanics: MECHANICS_CONFIG,
      probability: PROBABILITY_CONFIG,
      unlock: UNLOCK_CONFIG,
    };

    this.cache = new Map();
    this.listeners = new Map();
  }

  /**
   * 获取配置值
   * @param {string} path - 配置路径，如 'game.version'
   * @param {*} defaultValue - 默认值
   * @returns {*}
   */
  get(path, defaultValue = undefined) {
    // 检查缓存
    if (this.cache.has(path)) {
      return this.cache.get(path);
    }

    const keys = path.split('.');
    let current = this.config;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return defaultValue;
      }
    }

    // 缓存结果
    this.cache.set(path, current);
    return current;
  }

  /**
   * 设置配置值
   * @param {string} path - 配置路径
   * @param {*} value - 新值
   */
  set(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let current = this.config;

    for (const key of keys) {
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }

    const oldValue = current[lastKey];
    current[lastKey] = value;

    // 清除缓存
    this.cache.delete(path);

    // 触发监听器
    this.emit('config:changed', { path, oldValue, newValue: value });
    this.emit(`config:changed:${path}`, { oldValue, newValue: value });
  }

  /**
   * 重置配置到默认值
   * @param {string} [path] - 可选的配置路径，不提供则重置所有
   */
  reset(path) {
    if (path) {
      console.warn(`[Config] 部分重置功能尚未实现: ${path}`);
      return;
    }

    this.config = {
      game: { ...GAME_CONFIG },
      mechanics: { ...MECHANICS_CONFIG },
      probability: { ...PROBABILITY_CONFIG },
      unlock: { ...UNLOCK_CONFIG },
    };

    this.cache.clear();
    this.emit('config:reset');
    console.log('[Config] 配置已重置为默认值');
  }

  /**
   * 监听配置变化
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数
   * @returns {Function} 取消监听的函数
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event).push(callback);

    return () => {
      const listeners = this.listeners.get(event);
      const index = listeners.indexOf(callback);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }

  /**
   * 触发事件
   * @param {string} event - 事件名称
   * @param {*} data - 事件数据
   */
  emit(event, data) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      for (const callback of listeners) {
        try {
          callback(data);
        } catch (error) {
          console.error(`[Config] 监听器执行失败: ${event}`, error);
        }
      }
    }
  }

  /**
   * 获取所有配置
   * @returns {Object}
   */
  getAll() {
    return JSON.parse(JSON.stringify(this.config));
  }

  /**
   * 从JSON加载配置
   * @param {string} json - JSON字符串
   */
  loadFromJSON(json) {
    try {
      const loaded = JSON.parse(json);
      this.config = this.deepMerge(this.config, loaded);
      this.cache.clear();
      this.emit('config:loaded');
      console.log('[Config] 配置已从JSON加载');
    } catch (error) {
      console.error('[Config] 加载配置失败:', error);
    }
  }

  /**
   * 导出配置为JSON
   * @returns {string}
   */
  exportToJSON() {
    return JSON.stringify(this.config, null, 2);
  }

  /**
   * 深度合并对象
   * @param {Object} target - 目标对象
   * @param {Object} source - 源对象
   * @returns {Object}
   */
  deepMerge(target, source) {
    const result = { ...target };

    for (const key of Object.keys(source)) {
      if (
        source[key] &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key]) &&
        target[key] &&
        typeof target[key] === 'object'
      ) {
        result[key] = this.deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }

    return result;
  }
}

// 创建全局配置实例
const gameConfig = new GameConfig();

// ═════════════════════════════════════════════════
// 导出
// ═════════════════════════════════════════════════

export {
  GAME_CONFIG,
  MECHANICS_CONFIG,
  PROBABILITY_CONFIG,
  UNLOCK_CONFIG,
  GameConfig,
  gameConfig as default,
};

export default gameConfig;

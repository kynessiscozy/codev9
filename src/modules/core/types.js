/**
 * 类型定义模块
 * 为武魂模拟器提供统一的TypeScript风格类型定义
 */

// ═════════════════════════════════════════════════
// 核心数据类型定义
// ═════════════════════════════════════════════════

/**
 * 游戏状态对象
 * @typedef {Object} GameState
 * @property {number} lv - 等级
 * @property {number} exp - 当前经验
 * @property {number} power - 力量值
 * @property {string} realm - 当前境界
 * @property {Object} soul - 武魂信息
 * @property {string} soul.id - 武魂ID
 * @property {string} soul.name - 武魂名称
 * @property {number} soul.level - 武魂等级
 * @property {Array} rings - 魂环列表
 * @property {Array} bag - 背包物品列表
 * @property {Object} stats - 属性统计
 * @property {number} stats.atk - 攻击力
 * @property {number} stats.def - 防御力
 * @property {number} stats.hp - 生命值
 * @property {number} stats.spd - 速度
 */

/**
 * 武魂对象
 * @typedef {Object} Soul
 * @property {string} id - 武魂ID
 * @property {string} name - 武魂名称
 * @property {string} quality - 品质 (orange, red, pink, gold, colorful)
 * @property {string} type - 类型 (强攻系, 控制系, 辅助系, 食物系, 治疗系)
 * @property {string} desc - 描述
 * @property {Array<string>} skills - 技能列表
 * @property {number} power - 力量加成
 * @property {Object} resonance - 共鸣信息
 */

/**
 * 魂环对象
 * @typedef {Object} Ring
 * @property {string} id - 魂环ID
 * @property {string} name - 魂环名称
 * @property {number} year - 年限
 * @property {string} color - 颜色
 * @property {string} tier - 等级
 * @property {number} power - 力量加成
 * @property {string} [skill] - 关联技能（可选）
 */

/**
 * 魂骨对象
 * @typedef {Object} Bone
 * @property {string} id - 魂骨ID
 * @property {string} name - 魂骨名称
 * @property {string} slot - 部位 (head, torso, arms, legs, feet)
 * @property {string} quality - 品质
 * @property {number} power - 力量加成
 * @property {Object} stats - 属性加成
 */

/**
 * 物品对象
 * @typedef {Object} Item
 * @property {string} id - 物品ID
 * @property {string} name - 物品名称
 * @property {string} type - 类型 (herb, resource, artifact, title)
 * @property {string} quality - 品质
 * @property {string} desc - 描述
 * @property {number} [power] - 力量加成（可选）
 * @property {Object} [effect] - 效果（可选）
 */

/**
 * 成就对象
 * @typedef {Object} Achievement
 * @property {string} id - 成就ID
 * @property {string} name - 成就名称
 * @property {string} desc - 成就描述
 * @property {string} category - 类别
 * @property {number} points - 成就点数
 * @property {boolean} unlocked - 是否已解锁
 * @property {string} [icon] - 图标（可选）
 */

/**
 * 任务对象
 * @typedef {Object} Task
 * @property {string} id - 任务ID
 * @property {string} name - 任务名称
 * @property {string} desc - 任务描述
 * @property {string} type - 任务类型
 * @property {number} progress - 当前进度
 * @property {number} target - 目标进度
 * @property {boolean} completed - 是否完成
 * @property {boolean} claimed - 是否领取奖励
 * @property {Object} reward - 奖励
 */

// ═════════════════════════════════════════════════
// 配置类型定义
// ═════════════════════════════════════════════════

/**
 * 品质配置
 * @typedef {Object} QualityConfig
 * @property {string} name - 品质名称
 * @property {string} color - 颜色
 * @property {number} multiplier - 倍数
 * @property {number} weight - 权重
 */

/**
 * 境界配置
 * @typedef {Object} RealmConfig
 * @property {string} name - 境界名称
 * @property {number} level - 等级要求
 * @property {number} powerBonus - 力量加成
 * @property {number} expRequired - 所需经验
 */

/**
 * 天赋配置
 * @typedef {Object} TalentConfig
 * @property {string} id - 天赋ID
 * @property {string} name - 天赋名称
 * @property {string} desc - 天赋描述
 * @property {number} bonus - 加成
 * @property {number} cost - 消耗
 */

// ═════════════════════════════════════════════════
// 事件类型定义
// ═════════════════════════════════════════════════

/**
 * 事件回调函数
 * @typedef {Function} EventCallback
 * @param {*} data - 事件数据
 * @returns {*} 返回值（可选）
 */

/**
 * 事件监听器对象
 * @typedef {Object} EventListener
 * @property {EventCallback} callback - 回调函数
 * @property {boolean} once - 是否只执行一次
 * @property {number} priority - 优先级
 * @property {string} id - 监听器ID
 */

/**
 * 事件历史记录
 * @typedef {Object} EventHistoryEntry
 * @property {string} event - 事件名称
 * @property {*} data - 事件数据
 * @property {number} timestamp - 时间戳
 * @property {boolean} [async] - 是否异步（可选）
 */

// ═════════════════════════════════════════════════
// API类型定义
// ═════════════════════════════════════════════════

/**
 * 游戏API对象
 * @typedef {Object} GameAPI
 * @property {Object} events - 事件系统API
 * @property {Function} events.on - 注册事件监听器
 * @property {Function} events.once - 注册一次性事件监听器
 * @property {Function} events.off - 移除事件监听器
 * @property {Function} events.emit - 触发事件
 * @property {Function} events.emitAsync - 异步触发事件
 * @property {Object} state - 状态管理API
 * @property {Function} state.save - 保存状态
 * @property {Function} state.load - 加载状态
 * @property {Function} state.init - 初始化状态
 * @property {Object} ui - UI更新API
 * @property {Function} ui.updateHUD - 更新HUD
 * @property {Function} ui.notify - 显示通知
 * @property {string} version - 版本号
 * @property {string} buildTime - 构建时间
 */

// ═════════════════════════════════════════════════
// 工具函数：类型检查
// ═════════════════════════════════════════════════

/**
 * 检查是否为有效的游戏状态对象
 * @param {*} obj - 要检查的对象
 * @returns {boolean}
 */
export function isGameState(obj) {
  return obj && typeof obj === 'object' && 'lv' in obj && 'exp' in obj && 'power' in obj;
}

/**
 * 检查是否为有效的武魂对象
 * @param {*} obj - 要检查的对象
 * @returns {boolean}
 */
export function isSoul(obj) {
  return obj && typeof obj === 'object' && 'id' in obj && 'name' in obj && 'quality' in obj;
}

/**
 * 检查是否为有效的魂环对象
 * @param {*} obj - 要检查的对象
 * @returns {boolean}
 */
export function isRing(obj) {
  return obj && typeof obj === 'object' && 'id' in obj && 'year' in obj && 'power' in obj;
}

/**
 * 检查是否为有效的物品对象
 * @param {*} obj - 要检查的对象
 * @returns {boolean}
 */
export function isItem(obj) {
  return obj && typeof obj === 'object' && 'id' in obj && 'name' in obj && 'type' in obj;
}

// 导出类型定义（供其他模块使用）
export default {
  isGameState,
  isSoul,
  isRing,
  isItem,
};

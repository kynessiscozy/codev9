/**
 * 游戏状态管理器 - 统一状态管理模式
 * 提供状态订阅、变更通知、持久化等功能
 */

import { emit } from './events.js';

export class GameStateManager {
  constructor() {
    this.state = {};
    this.listeners = new Map();
    this.version = 1;
    this.storageKey = 'wuhun_simulator_state';
  }

  /**
   * 初始化状态
   * @param {Object} defaultState - 默认状态对象
   */
  init(defaultState) {
    this.state = { ...defaultState };
    emit('state:initialized', { version: this.version });
  }

  /**
   * 获取状态值
   * @param {string} path - 状态路径，如 'soul.name'
   * @param {*} defaultValue - 默认值
   * @returns {*}
   */
  get(path, defaultValue = undefined) {
    const keys = path.split('.');
    let current = this.state;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return defaultValue;
      }
    }
    
    return current;
  }

  /**
   * 设置状态值
   * @param {string} path - 状态路径
   * @param {*} value - 新值
   */
  set(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let current = this.state;

    for (const key of keys) {
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }

    const oldValue = current[lastKey];
    current[lastKey] = value;

    // 触发变更事件
    this.emitChange(path, oldValue, value);
  }

  /**
   * 更新状态对象（深度合并）
   * @param {Object} updates - 更新对象
   */
  update(updates) {
    this.deepMerge(this.state, updates);
    this.emitChange('state', null, this.state);
  }

  /**
   * 深度合并对象
   * @param {Object} target - 目标对象
   * @param {Object} source - 源对象
   */
  deepMerge(target, source) {
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        this.deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  /**
   * 监听状态变化
   * @param {string} path - 监听路径
   * @param {Function} callback - 回调函数
   * @returns {Function} 取消监听函数
   */
  on(path, callback) {
    if (!this.listeners.has(path)) {
      this.listeners.set(path, []);
    }
    
    this.listeners.get(path).push(callback);
    
    return () => {
      const listeners = this.listeners.get(path);
      const index = listeners.indexOf(callback);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }

  /**
   * 触发变更事件
   * @param {string} path - 变更路径
   * @param {*} oldValue - 旧值
   * @param {*} newValue - 新值
   */
  emitChange(path, oldValue, newValue) {
    // 触发精确路径监听
    if (this.listeners.has(path)) {
      for (const callback of this.listeners.get(path)) {
        try {
          callback({ path, oldValue, newValue });
        } catch (error) {
          console.error(`[State] 监听器执行失败: ${path}`, error);
        }
      }
    }

    // 触发通配符监听
    const wildcardListeners = this.listeners.get('*') || [];
    for (const callback of wildcardListeners) {
      try {
        callback({ path, oldValue, newValue });
      } catch (error) {
        console.error('[State] 通配符监听器执行失败', error);
      }
    }

    // 触发全局事件
    emit('state:changed', { path, oldValue, newValue });
  }

  /**
   * 保存状态到本地存储
   */
  save() {
    try {
      const data = {
        version: this.version,
        state: this.state,
        savedAt: Date.now()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      emit('state:saved', { savedAt: data.savedAt });
    } catch (error) {
      console.error('[State] 保存失败:', error);
    }
  }

  /**
   * 从本地存储加载状态
   * @returns {Object|null} 加载的状态
   */
  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return null;
      
      const parsed = JSON.parse(data);
      
      // 版本兼容性检查
      if (parsed.version !== this.version) {
        console.warn(`[State] 版本不匹配: ${parsed.version} -> ${this.version}`);
      }
      
      return parsed.state;
    } catch (error) {
      console.error('[State] 加载失败:', error);
      return null;
    }
  }

  /**
   * 获取完整状态
   * @returns {Object}
   */
  getAll() {
    return { ...this.state };
  }

  /**
   * 重置状态
   * @param {Object} defaultState - 新的默认状态
   */
  reset(defaultState) {
    this.state = { ...defaultState };
    this.emitChange('state', null, this.state);
    emit('state:reset');
  }

  /**
   * 获取状态快照
   * @returns {string} JSON字符串
   */
  snapshot() {
    return JSON.stringify(this.state, null, 2);
  }
}

// 创建全局状态管理器实例
export const gameState = new GameStateManager();

// 绑定到全局变量
if (typeof window !== 'undefined') {
  window.gameState = gameState;
}
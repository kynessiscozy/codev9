/**
 * 事件系统模块
 * 提供发布-订阅模式，减少模块间的直接依赖
 */

// 事件监听器存储
const eventListeners = new Map();

// 事件历史（用于调试）
const eventHistory = [];
const MAX_HISTORY = 100;

/**
 * 注册事件监听器
 * @param {string} eventName - 事件名称
 * @param {Function} callback - 回调函数
 * @param {Object} options - 选项
 * @param {boolean} options.once - 是否只执行一次
 * @param {number} options.priority - 优先级（数字越大越先执行）
 * @returns {Function} 取消监听的函数
 */
export function on(eventName, callback, options = {}) {
  if (!eventListeners.has(eventName)) {
    eventListeners.set(eventName, []);
  }

  const listener = {
    callback,
    once: options.once || false,
    priority: options.priority || 0,
    id: Date.now() + Math.random(),
  };

  const listeners = eventListeners.get(eventName);
  listeners.push(listener);

  // 按优先级排序（优先级高的先执行）
  listeners.sort((a, b) => b.priority - a.priority);

  // 返回取消监听的函数
  return () => off(eventName, listener.id);
}

/**
 * 注册一次性事件监听器
 * @param {string} eventName - 事件名称
 * @param {Function} callback - 回调函数
 * @returns {Function} 取消监听的函数
 */
export function once(eventName, callback) {
  return on(eventName, callback, { once: true });
}

/**
 * 移除事件监听器
 * @param {string} eventName - 事件名称
 * @param {string|Function} idOrCallback - 监听器ID或回调函数
 */
export function off(eventName, idOrCallback) {
  const listeners = eventListeners.get(eventName);
  if (!listeners) return;

  if (typeof idOrCallback === 'string') {
    // 按ID移除
    const index = listeners.findIndex(l => l.id === idOrCallback);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  } else if (typeof idOrCallback === 'function') {
    // 按回调函数移除
    const index = listeners.findIndex(l => l.callback === idOrCallback);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  } else {
    // 移除所有该事件的监听器
    eventListeners.delete(eventName);
  }
}

/**
 * 触发事件
 * @param {string} eventName - 事件名称
 * @param {*} data - 事件数据
 * @returns {Array} 所有监听器的返回值
 */
export function emit(eventName, data) {
  const listeners = eventListeners.get(eventName);
  if (!listeners || listeners.length === 0) {
    return [];
  }

  // 记录事件历史
  eventHistory.push({
    event: eventName,
    data,
    timestamp: Date.now(),
  });

  // 限制历史记录长度
  if (eventHistory.length > MAX_HISTORY) {
    eventHistory.shift();
  }

  const results = [];
  const toRemove = [];

  // 执行所有监听器
  for (const listener of listeners) {
    try {
      const result = listener.callback(data);
      results.push(result);

      // 标记一次性监听器
      if (listener.once) {
        toRemove.push(listener.id);
      }
    } catch (error) {
      console.error(`[Events] 事件监听器执行失败: ${eventName}`, error);
    }
  }

  // 移除一次性监听器
  for (const id of toRemove) {
    off(eventName, id);
  }

  return results;
}

/**
 * 异步触发事件（支持Promise）
 * @param {string} eventName - 事件名称
 * @param {*} data - 事件数据
 * @returns {Promise<Array>} 所有监听器的返回值
 */
export async function emitAsync(eventName, data) {
  const listeners = eventListeners.get(eventName);
  if (!listeners || listeners.length === 0) {
    return [];
  }

  // 记录事件历史
  eventHistory.push({
    event: eventName,
    data,
    timestamp: Date.now(),
    async: true,
  });

  const results = [];
  const toRemove = [];

  // 执行所有监听器
  for (const listener of listeners) {
    try {
      const result = await listener.callback(data);
      results.push(result);

      // 标记一次性监听器
      if (listener.once) {
        toRemove.push(listener.id);
      }
    } catch (error) {
      console.error(`[Events] 异步事件监听器执行失败: ${eventName}`, error);
    }
  }

  // 移除一次性监听器
  for (const id of toRemove) {
    off(eventName, id);
  }

  return results;
}

/**
 * 清除所有事件监听器
 */
export function clearAll() {
  eventListeners.clear();
  console.log('[Events] 已清除所有事件监听器');
}

/**
 * 获取事件历史
 * @param {string} eventName - 可选的事件名称过滤
 * @returns {Array} 事件历史记录
 */
export function getHistory(eventName) {
  if (eventName) {
    return eventHistory.filter(h => h.event === eventName);
  }
  return [...eventHistory];
}

/**
 * 获取所有已注册的事件名称
 * @returns {Array<string>}
 */
export function getEventNames() {
  return Array.from(eventListeners.keys());
}

/**
 * 获取指定事件的监听器数量
 * @param {string} eventName - 事件名称
 * @returns {number}
 */
export function getListenerCount(eventName) {
  const listeners = eventListeners.get(eventName);
  return listeners ? listeners.length : 0;
}

// 导出默认对象
export default {
  on,
  once,
  off,
  emit,
  emitAsync,
  clearAll,
  getHistory,
  getEventNames,
  getListenerCount,
};

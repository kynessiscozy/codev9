/**
 * 性能优化模块
 * 提供：
 * - 事件委托
 * - 防抖/节流优化
 * - 懒加载
 * - 内存泄漏检测
 */

// ═══════════════════════════════════════════════
// 事件委托系统
// ═══════════════════════════════════════════════

/**
 * 在父元素上监听子元素的事件
 * @param {Element} parent - 父元素
 * @param {string} eventType - 事件类型
 * @param {string} selector - CSS 选择器
 * @param {Function} handler - 处理函数
 */
export function delegate(parent, eventType, selector, handler) {
  parent.addEventListener(eventType, (e) => {
    const target = e.target.closest(selector);
    if (parent.contains(target)) {
      handler.call(target, e, target);
    }
  });
}

// ═══════════════════════════════════════════════
// 高级防抖/节流
// ═══════════════════════════════════════════════

/**
 * 带取消功能的防抖
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间
 * @returns {Function & { cancel: () => void }}
 */
export function debounced(fn, delay) {
  let timerId = null;
  
  const wrapped = function(...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
  
  wrapped.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };
  
  return wrapped;
}

/**
 * 带立即执行选项的节流
 * @param {Function} fn - 要执行的函数
 * @param {number} interval - 间隔时间
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function}
 */
export function throttled(fn, interval, immediate = false) {
  let lastTime = 0;
  let timerId = null;
  
  return function(...args) {
    const now = Date.now();
    
    if (immediate && !lastTime) {
      lastTime = now;
      return fn.apply(this, args);
    }
    
    const remaining = interval - (now - lastTime);
    
    if (remaining <= 0) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else if (!timerId) {
      timerId = setTimeout(() => {
        lastTime = Date.now();
        timerId = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}

// ═══════════════════════════════════════════════
// 懒加载系统
// ═══════════════════════════════════════════════

const lazyComponents = new Map();
const loadedComponents = new Set();

/**
 * 注册懒加载组件
 * @param {string} name - 组件名
 * @param {() => Promise} loader - 加载函数
 */
export function registerLazyComponent(name, loader) {
  lazyComponents.set(name, loader);
}

/**
 * 加载懒加载组件
 * @param {string} name - 组件名
 * @returns {Promise<any>}
 */
export async function loadLazyComponent(name) {
  if (loadedComponents.has(name)) {
    return true;
  }
  
  const loader = lazyComponents.get(name);
  if (!loader) {
    console.warn(`Lazy component "${name}" not registered`);
    return null;
  }
  
  try {
    await loader();
    loadedComponents.add(name);
    return true;
  } catch (error) {
    console.error(`Failed to load lazy component "${name}":`, error);
    return false;
  }
}

/**
 * 预加载多个组件
 * @param {string[]} names - 组件名列表
 */
export async function preloadLazyComponents(names) {
  await Promise.all(names.map(loadLazyComponent));
}

// ═══════════════════════════════════════════════
// 内存泄漏检测
// ═══════════════════════════════════════════════

const trackedObjects = new WeakMap();
const cleanupCallbacks = new Map();

/**
 * 追踪对象以便清理
 * @param {Object} obj - 要追踪的对象
 * @param {string} id - 唯一标识
 * @param {Function} cleanup - 清理函数
 */
export function trackObject(obj, id, cleanup) {
  trackedObjects.set(obj, id);
  cleanupCallbacks.set(id, cleanup);
}

/**
 * 清理追踪的对象
 * @param {Object} obj - 要清理的对象
 */
export function cleanupObject(obj) {
  const id = trackedObjects.get(obj);
  if (id && cleanupCallbacks.has(id)) {
    cleanupCallbacks.get(id)();
    cleanupCallbacks.delete(id);
    trackedObjects.delete(obj);
  }
}

/**
 * 清理所有追踪的对象
 */
export function cleanupAll() {
  for (const cleanup of cleanupCallbacks.values()) {
    try {
      cleanup();
    } catch (e) {
      console.error('Cleanup error:', e);
    }
  }
  cleanupCallbacks.clear();
}

// ═══════════════════════════════════════════════
// 渲染优化
// ═══════════════════════════════════════════════

let rafId = null;
const pendingRenders = new Map();

/**
 * 批量渲染，避免多次重绘
 * @param {string} key - 渲染任务键
 * @param {Function} renderFn - 渲染函数
 */
export function batchRender(key, renderFn) {
  pendingRenders.set(key, renderFn);
  
  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      for (const fn of pendingRenders.values()) {
        try {
          fn();
        } catch (e) {
          console.error('Batch render error:', e);
        }
      }
      pendingRenders.clear();
      rafId = null;
    });
  }
}

/**
 * 取消待处理的渲染
 * @param {string} key - 渲染任务键
 */
export function cancelRender(key) {
  pendingRenders.delete(key);
}

/**
 * 清除所有待处理渲染
 */
export function clearPendingRenders() {
  pendingRenders.clear();
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

// ═══════════════════════════════════════════════
// 图片懒加载
// ═══════════════════════════════════════════════

const imageObserver = typeof IntersectionObserver !== 'undefined' 
  ? new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    }, { rootMargin: '100px' })
  : null;

/**
 * 使图片支持懒加载
 * @param {HTMLImageElement} img - 图片元素
 * @param {string} src - 图片源
 */
export function lazyImage(img, src) {
  if (imageObserver) {
    img.dataset.src = src;
    imageObserver.observe(img);
  } else {
    img.src = src;
  }
}

/**
 * 批量初始化图片懒加载
 * @param {NodeList|Array} images - 图片元素集合
 */
export function initLazyImages(images) {
  images.forEach(img => {
    const src = img.src || img.dataset.src;
    if (src) {
      lazyImage(img, src);
    }
  });
}

// ═══════════════════════════════════════════════
// 性能监控
// ═══════════════════════════════════════════════

const perfMetrics = {
  frameCount: 0,
  lastFpsCheck: 0,
  fps: 60,
  slowFrames: 0
};

/**
 * 启动 FPS 监控
 */
export function startPerfMonitor() {
  let lastTime = performance.now();
  
  function measure(currentTime) {
    perfMetrics.frameCount++;
    
    const delta = currentTime - lastTime;
    
    // 检测慢帧 (> 33ms = < 30fps)
    if (delta > 33) {
      perfMetrics.slowFrames++;
    }
    
    // 每秒计算一次 FPS
    if (delta >= 1000) {
      perfMetrics.fps = Math.round(perfMetrics.frameCount * 1000 / delta);
      perfMetrics.frameCount = 0;
      lastTime = currentTime;
      
      if (perfMetrics.fps < 30) {
        console.warn(`Low FPS detected: ${perfMetrics.fps}`);
      }
    }
    
    requestAnimationFrame(measure);
  }
  
  requestAnimationFrame(measure);
}

/**
 * 获取性能指标
 * @returns {Object}
 */
export function getPerfMetrics() {
  return { ...perfMetrics };
}

// 导出所有功能
export default {
  delegate,
  debounced,
  throttled,
  registerLazyComponent,
  loadLazyComponent,
  preloadLazyComponents,
  trackObject,
  cleanupObject,
  cleanupAll,
  batchRender,
  cancelRender,
  clearPendingRenders,
  lazyImage,
  initLazyImages,
  startPerfMonitor,
  getPerfMetrics
};

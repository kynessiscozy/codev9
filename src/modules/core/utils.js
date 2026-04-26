// ──── UTILS ────
// 工具函数模块

// 获取 DOM 元素（缓存版本）
const elementCache = {};
export function $(id) {
  if (!elementCache[id]) {
    elementCache[id] = document.getElementById(id);
  }
  return elementCache[id];
}

// 设置元素属性
export function $set(id, prop, val) {
  const e = $(id);
  if (e) e[prop] = val;
}

// 设置元素样式
export function $style(id, prop, val) {
  const e = $(id);
  if (e) e.style[prop] = val;
}

// 显示元素
export function $show(id) {
  const e = $(id);
  if (e) e.style.display = "";
}

// 隐藏元素
export function $hide(id) {
  const e = $(id);
  if (e) e.style.display = "none";
}

// 添加 CSS 类
export function $addCls(id, cls) {
  const e = $(id);
  if (e) e.classList.add(cls);
}

// 移除 CSS 类
export function $remCls(id, cls) {
  const e = $(id);
  if (e) e.classList.remove(cls);
}

// 随机数生成
export function ri(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

// 从数组中随机选取
export function pick(arr) {
  return arr[ri(0, arr.length - 1)];
}

// 加权随机选取
export function wPick(arr, k) {
  const t = arr.reduce((s, i) => s + (i[k] || 0), 0);
  let r = Math.random() * t;
  let c = 0;
  for (const i of arr) {
    c += i[k] || 0;
    if (r <= c) return i;
  }
  return arr[arr.length - 1];
}

// 向背包添加物品
export function bagPush(type, data, count = 1) {
  // 注意：此函数需要访问全局 G 对象
  if (typeof G !== "undefined" && G.bag) {
    G.bag.push({ type, data, count, id: Date.now() + ri(0, 9999) });
  }
}

// 执行操作后更新（更新HUD + 保存 + 渲染）
export function afterAction(pages = []) {
  // 注意：此函数需要调用 updateHUD, saveG, renderBag 等
  if (typeof updateHUD === "function") updateHUD();
  if (typeof saveG === "function") saveG();
  pages.forEach((p) => {
    if (p === "bag" && typeof renderBag === "function") renderBag();
    else if (p === "soul" && typeof renderSoulPage === "function") renderSoulPage();
    else if (p === "lot" && typeof renderLotHist === "function") renderLotHist();
  });
}

// 防抖函数
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流函数
export function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 清除元素缓存（用于动态创建的元素）
export function clearElementCache(id) {
  if (id) {
    delete elementCache[id];
  } else {
    for (const key in elementCache) {
      delete elementCache[key];
    }
  }
}

/**
 * 粒子爆发效果（占位，完整版由 game.js 覆盖）
 */
export function spawnBurst(col, n) {
  // game.js 注入后会覆盖此函数
}

/**
 * 3D 特效系统
 * 为武魂图标、卡片、结果面板提供 CSS 3D 变换动画
 */

/**
 * 为元素添加 3D 翻转动画
 * @param {HTMLElement} element - 目标元素
 * @param {Object} options - 配置
 */
export function flip3D(element, options = {}) {
  if (!element) return;

  const duration = options.duration || 600;
  const delay = options.delay || 0;
  const axis = options.axis || 'Y'; // 'X', 'Y', 'Z'
  const scale = options.scale || 1.05;

  element.style.transformStyle = 'preserve-3d';
  element.style.backfaceVisibility = 'hidden';
  element.style.transition = `transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;

  setTimeout(() => {
    element.style.transform = `rotate${axis}(180deg) scale(${scale})`;
    setTimeout(() => {
      element.style.transform = `rotate${axis}(360deg) scale(1)`;
      setTimeout(() => {
        element.style.transform = '';
        element.style.transformStyle = '';
        element.style.backfaceVisibility = '';
        if (options.onComplete) options.onComplete();
      }, duration);
    }, duration);
  }, delay);
}

/**
 * 3D 卡片悬浮效果
 * @param {HTMLElement} element - 目标元素
 */
export function enableCardFloat3D(element) {
  if (!element) return;

  element.style.transformStyle = 'preserve-3d';
  element.style.perspective = '1000px';
  element.style.transition = 'transform 0.15s ease-out';

  const handler = (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const leaveHandler = () => {
    element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  element.addEventListener('mousemove', handler);
  element.addEventListener('mouseleave', leaveHandler);

  // 返回清理函数
  return () => {
    element.removeEventListener('mousemove', handler);
    element.removeEventListener('mouseleave', leaveHandler);
  };
}

/**
 * 3D 旋转展示台效果
 * @param {HTMLElement} container - 容器元素
 * @param {HTMLElement} target - 旋转目标
 * @param {Object} options - 配置
 */
export function createShowcase3D(container, target, options = {}) {
  if (!container || !target) return null;

  container.style.perspective = '1200px';
  container.style.transformStyle = 'preserve-3d';

  target.style.transformStyle = 'preserve-3d';
  target.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';

  let autoRotate = options.autoRotate !== false;
  let rotationY = 0;
  let animationId = null;

  function rotate() {
    if (!autoRotate) return;
    rotationY += 0.3;
    target.style.transform = `rotateY(${rotationY}deg)`;
    animationId = requestAnimationFrame(rotate);
  }

  if (autoRotate) {
    animationId = requestAnimationFrame(rotate);
  }

  return {
    stop() {
      autoRotate = false;
      if (animationId) cancelAnimationFrame(animationId);
    },
    start() {
      autoRotate = true;
      rotationY = 0;
      rotate();
    },
    setRotation(y) {
      rotationY = y;
      target.style.transform = `rotateY(${rotationY}deg)`;
    },
    snapTo(angle) {
      autoRotate = false;
      if (animationId) cancelAnimationFrame(animationId);
      target.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      target.style.transform = `rotateY(${angle}deg)`;
    },
  };
}

/**
 * 为觉醒结果面板添加 3D 入场动画
 * @param {string} overlayId - 遮罩层ID
 */
export function animateResultOverlay3D(overlayId = 'OR') {
  const overlay = document.getElementById(overlayId);
  if (!overlay) return;

  const icon = overlay.querySelector('.or-ico');
  const name = overlay.querySelector('.or-nm');
  const quality = overlay.querySelector('.or-q');
  const stats = overlay.querySelector('.or-stats');

  overlay.style.perspective = '1000px';

  // 初始状态
  [icon, name, quality, stats].forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateZ(-200px) rotateX(45deg)';
    el.style.transition = `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.15}s`;
  });

  // 触发动画
  requestAnimationFrame(() => {
    [icon, name, quality, stats].forEach((el) => {
      if (!el) return;
      el.style.opacity = '1';
      el.style.transform = 'translateZ(0) rotateX(0)';
    });
  });
}

/**
 * 武魂图标 3D 弹出动画
 * @param {HTMLElement} element - 图标元素
 * @param {string} quality - 品质key
 */
export function animateSoulIcon3D(element, quality) {
  if (!element) return;

  const scales = {
    common: 1,
    rare: 1.1,
    epic: 1.2,
    legend: 1.35,
    apex: 1.5,
    hc: 1.4,
    ha: 1.45,
    twin: 1.6,
    triple: 1.75,
  };

  const scale = scales[quality] || 1.2;

  element.style.transformStyle = 'preserve-3d';
  element.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';

  // 初始压缩
  element.style.transform = 'scale3d(0.1, 0.1, 0.1) rotateY(180deg)';

  requestAnimationFrame(() => {
    element.style.transform = `scale3d(${scale}, ${scale}, ${scale}) rotateY(0deg)`;

    // 添加后续浮动效果
    setTimeout(() => {
      element.style.transition = 'transform 3s ease-in-out infinite';
      element.style.animation = 'float3D 3s ease-in-out infinite';
    }, 800);
  });
}

/**
 * 魂环 3D 环绕效果
 * @param {HTMLElement} container - 容器
 * @param {number} ringCount - 魂环数量
 * @param {string} color - 颜色
 */
export function createRingOrbit3D(container, ringCount, color) {
  if (!container) return;

  container.style.position = 'relative';
  container.style.perspective = '800px';
  container.style.transformStyle = 'preserve-3d';

  // 清除旧的魂环
  container.querySelectorAll('.ring-orbit-3d').forEach(r => r.remove());

  const rings = [];
  for (let i = 0; i < ringCount; i++) {
    const ring = document.createElement('div');
    ring.className = 'ring-orbit-3d';
    ring.style.cssText = `
      position: absolute;
      width: ${80 + i * 25}px;
      height: ${80 + i * 25}px;
      border: 2px solid ${color};
      border-radius: 50%;
      top: 50%;
      left: 50%;
      margin-left: ${-(80 + i * 25) / 2}px;
      margin-top: ${-(80 + i * 25) / 2}px;
      opacity: ${0.3 + (ringCount - i) * 0.07};
      transform-style: preserve-3d;
      animation: ringOrbit${i % 2 === 0 ? 'A' : 'B'} ${4 + i * 0.5}s linear infinite;
      pointer-events: none;
    `;
    container.appendChild(ring);
    rings.push(ring);
  }

  return rings;
}

/**
 * 震动 + 3D 效果组合
 * @param {HTMLElement} element
 * @param {number} intensity
 */
export function shake3D(element, intensity = 1) {
  if (!element) return;

  element.style.transition = 'transform 0.05s';
  const start = Date.now();
  const duration = 400 * intensity;

  function shake() {
    const elapsed = Date.now() - start;
    if (elapsed >= duration) {
      element.style.transform = '';
      element.style.transition = '';
      return;
    }

    const dx = (Math.random() - 0.5) * 10 * intensity;
    const dy = (Math.random() - 0.5) * 10 * intensity;
    const dz = (Math.random() - 0.5) * 20 * intensity;
    const rx = (Math.random() - 0.5) * 5 * intensity;
    const ry = (Math.random() - 0.5) * 5 * intensity;

    element.style.transform = `translate3d(${dx}px, ${dy}px, ${dz}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    requestAnimationFrame(shake);
  }

  shake();
}

/**
 * 应用于结果面板的震撼 3D 特效
 * 在显示传说及以上品质时调用
 */
export function applyLegendaryResult3D(overlayId = 'OR') {
  const overlay = document.getElementById(overlayId);
  if (!overlay) return;

  overlay.style.perspective = '1200px';
  overlay.style.transformStyle = 'preserve-3d';

  const icon = overlay.querySelector('.or-ico');
  if (icon) {
    icon.style.transformStyle = 'preserve-3d';
    icon.style.animation = 'legendaryIcon3D 2s ease-in-out infinite';
  }

  // 添加背景光晕 3D 旋转
  const bg = overlay.querySelector('.or-b');
  if (bg) {
    bg.style.transformStyle = 'preserve-3d';
    bg.style.animation = 'bgRotate3D 8s linear infinite';
  }
}

/**
 * 移除所有 3D 效果
 * @param {HTMLElement} element
 */
export function reset3D(element) {
  if (!element) return;
  element.style.transform = '';
  element.style.transformStyle = '';
  element.style.perspective = '';
  element.style.backfaceVisibility = '';
  element.style.transition = '';
  element.style.animation = '';
}

/**
 * 批量为页面内的武魂卡片启用 3D 效果
 */
export function enableSoulCards3D() {
  document.querySelectorAll('.soul-card, .sol-icon, .or-ico').forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.transform = 'scale3d(1.1, 1.1, 1.1) rotateY(5deg)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale3d(1, 1, 1) rotateY(0)';
    });
  });
}

// 默认导出
export default {
  flip3D,
  enableCardFloat3D,
  createShowcase3D,
  animateResultOverlay3D,
  animateSoulIcon3D,
  createRingOrbit3D,
  shake3D,
  applyLegendaryResult3D,
  reset3D,
  enableSoulCards3D,
};

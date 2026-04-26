/**
 * 通知系统模块
 * 提供游戏中的通知显示功能
 */

import { $ } from './utils.js';

/**
 * 显示通知
 * @param {string} msg - 通知消息
 * @param {string} type - 通知类型 (normal, epic, divine, legend, cosmic)
 */
export function notify(msg, type = 'normal') {
  const a = $('notif');
  if (!a) return;
  
  // 限制堆叠数量为5 - 移除最旧的通知
  while (a.children.length >= 5) a.firstChild.remove();
  
  const el = document.createElement('div');
  const isLong = msg.length > 22;
  el.className = 'ntf ' + (type || '') + (isLong ? ' long' : '');
  el.textContent = msg;
  a.appendChild(el);
  
  // 淡出后移除
  setTimeout(() => {
    el.style.animation = 'ntfOut .35s ease forwards';
    setTimeout(() => el.remove(), 350);
  }, 3000);
}

/**
 * 显示成功通知
 */
export function notifySuccess(msg) {
  notify(msg, 'normal');
}

/**
 * 显示错误通知
 */
export function notifyError(msg) {
  notify(msg, 'normal');
}

/**
 * 显示史诗通知
 */
export function notifyEpic(msg) {
  notify(msg, 'epic');
}

/**
 * 显示传说通知
 */
export function notifyLegend(msg) {
  notify(msg, 'legend');
}

/**
 * 显示神级通知
 */
export function notifyDivine(msg) {
  notify(msg, 'divine');
}

/**
 * 显示宇宙级通知
 */
export function notifyCosmic(msg) {
  notify(msg, 'cosmic');
}

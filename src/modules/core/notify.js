// ──── 通知系统模块 ────

/**
 * 显示通知消息
 * @param {string} msg - 通知消息
 * @param {string} type - 通知类型 (normal, epic, success, error)
 */
export function notify(msg, type = 'normal') {
  const a = $('notif');
  if (!a) return;
  
  // 限制同时显示的通知数量为5个
  while (a.children.length >= 5) a.firstChild.remove();
  
  const el = document.createElement('div');
  const isLong = msg.length > 22;
  el.className = 'ntf ' + (type || '') + (isLong ? ' long' : '');
  el.textContent = msg;
  a.appendChild(el);
  
  // 3秒后淡出并移除
  setTimeout(() => {
    el.style.animation = 'ntfOut .35s ease forwards';
    setTimeout(() => el.remove(), 350);
  }, 3000);
}

/**
 * 显示成功通知
 * @param {string} msg - 成功消息
 */
export function notifySuccess(msg) {
  notify(msg, 'success');
}

/**
 * 显示错误通知
 * @param {string} msg - 错误消息
 */
export function notifyError(msg) {
  notify(msg, 'error');
}

/**
 * 显示史诗级通知（特殊事件）
 * @param {string} msg - 史诗消息
 */
export function notifyEpic(msg) {
  notify(msg, 'epic');
}

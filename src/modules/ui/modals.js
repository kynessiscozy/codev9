// ──── 模态框UI模块（框架版）───

import { $, $style } from '../core/utils.js';

/**
 * 关闭魂环选择模态框
 */
export function cRSM() {
  $style('RSM', 'display', 'none');
}

/**
 * 打开模态框
 * @param {string} html - 模态框内容HTML
 */
export function openModal(html) {
  const modal = $('modal');
  const body = $('modal-body');
  if (!modal || !body) return;
  body.innerHTML = html || '';
  modal.classList.add('show');
}

/**
 * 关闭模态框
 */
export function closeModal() {
  const modal = $('modal');
  if (modal) modal.classList.remove('show');
}

/**
 * 打开选择模态框
 * @param {string} title - 标题
 * @param {Array} options - 选项数组
 * @param {Function} callback - 回调函数
 */
export function openSelectModal(title, options, callback) {
  const optionsHtml = options.map((opt, i) => `
    <div class="modal-option" onclick="selectOption(${i})">
      <div class="mo-icon">${opt.icon || '📦'}</div>
      <div class="mo-name">${opt.name}</div>
      <div class="mo-desc">${opt.desc || ''}</div>
    </div>
  `).join('');
  
  openModal(`
    <div class="m-title">${title}</div>
    <div class="m-options">${optionsHtml}</div>
  `);
}

/**
 * 打开确认模态框
 * @param {string} message - 确认消息
 * @param {Function} onConfirm - 确认回调
 */
export function openConfirmModal(message, onConfirm) {
  openModal(`
    <div class="m-title">确认</div>
    <div class="m-body">${message}</div>
    <div class="m-actions">
      <button class="m-btn" onclick="closeModal()">取消</button>
      <button class="m-btn confirm" onclick="closeModal(); if(typeof onConfirm === 'function') onConfirm()">确认</button>
    </div>
  `);
}

/**
 * 打开输入模态框
 * @param {string} title - 标题
 * @param {string} placeholder - 占位符
 * @param {Function} onConfirm - 确认回调
 */
export function openInputModal(title, placeholder, onConfirm) {
  openModal(`
    <div class="m-title">${title}</div>
    <div class="m-body">
      <input type="text" id="modal-input" placeholder="${placeholder}" style="width:100%;padding:8px;border:1px solid var(--bdr);border-radius:6px;background:rgba(255,255,255,.05);color:#fff">
    </div>
    <div class="m-actions">
      <button class="m-btn" onclick="closeModal()">取消</button>
      <button class="m-btn confirm" onclick="closeModal(); const val=document.getElementById('modal-input')?.value; if(val && typeof onConfirm === 'function') onConfirm(val)">确认</button>
    </div>
  `);
}

/**
 * 显示通知模态框
 * @param {string} message - 通知消息
 * @param {string} type - 通知类型
 */
export function showNotifyModal(message, type = 'info') {
  const colors = {
    info: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };
  const color = colors[type] || colors.info;
  
  openModal(`
    <div class="m-title" style="color:${color}">通知</div>
    <div class="m-body">${message}</div>
    <div class="m-actions">
      <button class="m-btn confirm" onclick="closeModal()">确定</button>
    </div>
  `);
}

// TODO: 从game.js提取更多模态框相关函数
// - renderConfirmDialog()
// - renderAlertDialog()
// - renderCustomModal()

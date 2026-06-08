/**
 * UI管理器 - 统一UI渲染逻辑
 */

import { $ } from '../core/utils.js';
import { emit, on, GameEvents } from '../core/events.js';

class UIManager {
  constructor() {
    this.pages = new Map();
    this.pageCache = new Map();
    this.currentPage = null;
    this.isInitialized = false;
    
    // 页面渲染器
    this.renderers = {};
    
    // 自动更新函数
    this.autoUpdate = {};
  }

  /**
   * 初始化UI管理器
   */
  init() {
    this.isInitialized = true;
    console.log('🎨 UI管理器已初始化');
    
    // 注册事件监听
    this.setupEventListeners();
  }

  /**
   * 注册页面渲染器
   * @param {string} pageName - 页面名称
   * @param {Function} renderer - 渲染函数
   */
  registerPage(pageName, renderer) {
    this.renderers[pageName] = renderer;
  }

  /**
   * 导航到指定页面
   * @param {string} pageName - 页面名称
   * @param {HTMLElement} element - 导航元素
   */
  navigateTo(pageName, element) {
    if (!this.isInitialized) return;
    
    // 关闭任何打开的模态框
    this.closeAllModals();
    
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.ni').forEach(item => item.classList.remove('active'));
    
    // 显示目标页面
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) targetPage.classList.add('active');
    
    // 激活导航元素
    if (element) element.classList.add('active');
    
    // 渲染页面内容
    this.renderPage(pageName);
    
    // 触发导航事件
    emit(GameEvents.PAGE_CHANGED, { page: pageName });
    
    this.currentPage = pageName;
  }

  /**
   * 渲染指定页面
   * @param {string} pageName - 页面名称
   */
  renderPage(pageName) {
    if (this.renderers[pageName]) {
      this.renderers[pageName]();
    } else {
      console.warn(`⚠️ 页面渲染器未找到: ${pageName}`);
    }
  }

  /**
   * 更新HUD显示
   */
  updateHUD() {
    if (window.updateHUD && typeof window.updateHUD === 'function') {
      window.updateHUD();
    }
  }

  /**
   * 显示通知
   * @param {string} message - 消息内容
   * @param {string} type - 类型 ('normal', 'epic', 'legend', 'divine'
   */
  notify(message, type = 'normal') {
    if (window.notify && typeof window.notify === 'function') {
      window.notify(message, type);
    }
  }

  /**
   * 关闭所有模态框
   */
  closeAllModals() {
    if (window.closeModal && typeof window.closeModal === 'function') {
      window.closeModal();
    }
    const pf = $('PF');
    if (pf) {
      pf.style.display = 'none';
      pf.classList.remove('active');
    }
  }

  /**
   * 设置元素文本内容
   * @param {string} id - 元素ID
   * @param {string} content - 内容
   */
  setText(id, content) {
    const el = $(id);
    if (el) el.textContent = content;
  }

  /**
   * 设置元素HTML
   * @param {string} id - 元素ID
   * @param {string} html - HTML内容
   */
  setHTML(id, html) {
    const el = $(id);
    if (el) el.innerHTML = html;
  }

  /**
   * 显示/隐藏元素
   * @param {string} id - 元素ID
   * @param {boolean} show - 是否显示
   */
  showElement(id, show = true) {
    const el = $(id);
    if (el) el.style.display = show ? '' : 'none';
  }

  /**
   * 批量更新UI元素
   * @param {Object} updates - 更新对象 { id: content }
   */
  batchUpdate(updates) {
    Object.entries(updates).forEach(([id, content]) => {
      if (typeof content === 'string') {
        this.setText(id, content);
      }
    });
  }

  /**
   * 设置事件监听
   */
  setupEventListeners() {
    on(GameEvents.STATE_CHANGED, (data) => {
      this.updateHUD();
    });
    
    on(GameEvents.POWER_CHANGED, (data) => {
      this.updateHUD();
    });
  }

  /**
   * 创建DOM工具函数 - 格式化数字
   * @param {number} num - 数字
   * @param {boolean} useAbbreviation - 是否使用缩写
   */
  formatNumber(num, useAbbreviation = false) {
    if (!useAbbreviation || num < 1000) return num.toString();
    
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }
}

export const uiManager = new UIManager();

export default uiManager;

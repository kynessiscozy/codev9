/**
 * 资源管理器 - 统一物品管理
 */

import { HERBS, RESOURCES, ARTS, TITLES } from '../data/items.js';

export class ResourceManager {
  constructor(state) {
    this.state = state;
    this.itemTypes = {
      herb: { data: HERBS, category: '药草' },
      resource: { data: RESOURCES, category: '资源' },
      artifact: { data: ARTS, category: '神器' },
      title: { data: TITLES, category: '称号' },
      ticket: { data: null, category: '抽奖券' },
      ring: { data: null, category: '魂环' },
      bone: { data: null, category: '魂骨' },
    };
  }

  /**
   * 获取背包中的物品
   * @param {string} [type] - 物品类型过滤
   * @returns {Array} 物品列表
   */
  getItems(type = null) {
    const bag = this.state.bag || [];
    if (!type) return bag;
    return bag.filter(item => item.type === type);
  }

  /**
   * 添加物品到背包
   * @param {Object} item - 物品对象
   * @param {number} [count=1] - 数量
   */
  addItem(item, count = 1) {
    if (!this.state.bag) this.state.bag = [];
    
    const existing = this.state.bag.find(
      i => i.type === item.type && 
           JSON.stringify(i.data) === JSON.stringify(item.data)
    );
    
    if (existing) {
      existing.count += count;
    } else {
      this.state.bag.push({
        ...item,
        count,
        id: Date.now() + Math.random()
      });
    }
  }

  /**
   * 移除物品
   * @param {string} itemId - 物品ID
   * @param {number} [count=1] - 数量
   * @returns {boolean} 是否成功
   */
  removeItem(itemId, count = 1) {
    const item = this.state.bag?.find(i => i.id === itemId);
    if (!item) return false;
    
    item.count -= count;
    if (item.count <= 0) {
      const index = this.state.bag.indexOf(item);
      if (index > -1) this.state.bag.splice(index, 1);
    }
    
    return true;
  }

  /**
   * 查找物品
   * @param {string} itemId - 物品ID
   * @returns {Object|null}
   */
  findItem(itemId) {
    return this.state.bag?.find(i => i.id === itemId || i.data?.id === itemId) || null;
  }

  /**
   * 使用物品
   * @param {string} itemId - 物品ID
   * @returns {boolean} 是否成功
   */
  useItem(itemId) {
    const item = this.findItem(itemId);
    if (!item) return false;
    
    switch (item.type) {
      case 'herb':
        this.useHerb(item);
        break;
      case 'resource':
        this.useResource(item);
        break;
      case 'artifact':
        this.equipArtifact(item);
        break;
      case 'title':
        this.equipTitle(item);
        break;
      default:
        return false;
    }
    
    this.removeItem(itemId, 1);
    return true;
  }

  /**
   * 使用药草
   * @param {Object} herb - 药草物品
   */
  useHerb(herb) {
    const data = herb.data;
    if (!data) return;
    
    switch (data.e) {
      case 'sp':
        if (typeof addSP === 'function') {
          addSP(data.v || 0, data.n);
        }
        break;
      case 'exp':
        if (typeof addExp === 'function') {
          addExp(data.v || 0);
        }
        break;
      case 'luck':
        this.state.luckBonus = (this.state.luckBonus || 0) + (data.v || 0);
        break;
      case 'power':
        this.state.extraPower = (this.state.extraPower || 0) + (data.v || 0);
        break;
      case 'all':
        if (typeof addSP === 'function') addSP(1000);
        if (typeof addExp === 'function') addExp(500);
        this.state.extraPower = (this.state.extraPower || 0) + 500;
        break;
    }
  }

  /**
   * 使用资源
   * @param {Object} resource - 资源物品
   */
  useResource(resource) {
    const data = resource.data;
    if (!data) return;
    
    switch (data.e) {
      case 'sp':
        if (typeof addSP === 'function') {
          addSP(data.v || 0, data.n);
        }
        break;
      case 'power':
        this.state.extraPower = (this.state.extraPower || 0) + (data.v || 0);
        break;
      case 'luck':
        this.state.luckBonus = (this.state.luckBonus || 0) + (data.v || 0);
        break;
      case 'all':
        if (typeof addSP === 'function') addSP(500);
        this.state.extraPower = (this.state.extraPower || 0) + 500;
        break;
    }
  }

  /**
   * 装备神器
   * @param {Object} artifact - 神器物品
   */
  equipArtifact(artifact) {
    this.state.equippedArt = artifact.data;
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof notify === 'function') {
      notify(`⚔️ 装备神器：${artifact.data.n}`, 'legend');
    }
  }

  /**
   * 装备称号
   * @param {Object} title - 称号物品
   */
  equipTitle(title) {
    this.state.equippedTitle = title.data;
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof notify === 'function') {
      notify(`👑 装备称号：${title.data.n}`, 'epic');
    }
  }

  /**
   * 添加抽奖券
   * @param {string} pool - 奖池类型
   * @param {number} count - 数量
   * @param {boolean} [isTen=false] - 是否十连券
   */
  addTicket(pool, count, isTen = false) {
    const ticketNames = {
      common: '普通星运券',
      advanced: '高级星运券',
      apex: '顶级星运券'
    };
    
    const ticketIcons = {
      common: '🎟️',
      advanced: '🎫',
      apex: '🏆'
    };
    
    const ticketColors = {
      common: '#9ca3af',
      advanced: '#3b82f6',
      apex: '#ef4444'
    };
    
    const ticket = {
      type: 'ticket',
      data: {
        id: 'ticket_' + pool + (isTen ? '_ten' : ''),
        pool,
        n: ticketNames[pool] + (isTen ? '（十连）' : ''),
        i: ticketIcons[pool],
        c: ticketColors[pool],
        ten: isTen
      }
    };
    
    this.addItem(ticket, count);
  }

  /**
   * 获取指定类型物品数量
   * @param {string} type - 物品类型
   * @param {string} [pool] - 奖池（仅用于ticket）
   * @returns {number}
   */
  getItemCount(type, pool = null) {
    const items = this.getItems(type);
    if (pool && type === 'ticket') {
      return items.reduce((sum, item) => {
        if (item.data?.pool === pool) return sum + (item.count || 0);
        return sum;
      }, 0);
    }
    return items.reduce((sum, item) => sum + (item.count || 0), 0);
  }

  /**
   * 清空背包
   */
  clearBag() {
    this.state.bag = [];
  }

  /**
   * 获取背包统计
   * @returns {Object}
   */
  getStats() {
    const stats = {};
    Object.keys(this.itemTypes).forEach(type => {
      stats[type] = this.getItemCount(type);
    });
    return stats;
  }
}

// 创建全局资源管理器实例
export let resourceManager = null;

export function initResourceManager(state) {
  resourceManager = new ResourceManager(state);
  return resourceManager;
}
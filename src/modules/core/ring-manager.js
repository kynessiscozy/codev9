/**
 * 魂环管理器 - 统一魂环管理逻辑
 */

import { RT, getRingTier, getRingTierByIndex } from '../data/rings.js';
import { emit } from './events.js';
import { notify } from './notify.js';

export class RingManager {
  constructor(state) {
    this.state = state;
    this.maxRings = 10;
  }

  /**
   * 生成随机魂环
   * @param {number} [tierIndex] - 魂环等级索引（可选）
   * @returns {Object} 魂环对象
   */
  generateRing(tierIndex = null) {
    let index;
    
    if (tierIndex !== null) {
      index = Math.max(0, Math.min(RT.length - 1, tierIndex));
    } else {
      // 根据概率随机选择等级
      const weights = [35, 25, 20, 12, 5, 2, 0.8, 0.2];
      const total = weights.reduce((a, b) => a + b, 0);
      let r = Math.random() * total;
      
      for (let i = 0; i < weights.length; i++) {
        r -= weights[i];
        if (r <= 0) {
          index = i;
          break;
        }
      }
    }
    
    const tier = RT[index];
    const skill = this.pickSkill(tier.sk);
    
    return {
      id: Date.now() + Math.random(),
      n: tier.n,
      y: tier.y,
      c: tier.c,
      sk: skill,
      pw: tier.pw,
      tier: tier.n,
      tierIndex: index,
      attr: tier.attr || null,
      special: tier.special || false,
      unique: tier.unique || false,
      mutateSkills: tier.mutateSkills || null,
      createdAt: Date.now()
    };
  }

  /**
   * 从技能列表中随机选择一个技能
   * @param {Array} skills - 技能列表
   * @returns {string}
   */
  pickSkill(skills) {
    if (!skills || skills.length === 0) return '无技能';
    return skills[Math.floor(Math.random() * skills.length)];
  }

  /**
   * 装备魂环到武魂
   * @param {Object} ring - 魂环对象
   * @returns {boolean} 是否成功
   */
  equipRing(ring) {
    if (!this.state.soul) {
      notify('请先觉醒武魂！', 'normal');
      return false;
    }
    
    if (!this.state.soul.rings) this.state.soul.rings = [];
    
    if (this.state.soul.rings.length >= this.maxRings) {
      notify('已达到最大魂环数量！', 'normal');
      return false;
    }
    
    this.state.soul.rings.push(ring);
    
    // 更新技能等级
    this.updateSkillLevels();
    
    emit('ring:equipped', { ring, slot: this.state.soul.rings.length });
    notify(`🔮 装备魂环：${ring.n}`, 'epic');
    
    return true;
  }

  /**
   * 卸下魂环
   * @param {number} slot - 槽位索引
   * @returns {Object|null} 卸下的魂环
   */
  unequipRing(slot) {
    if (!this.state.soul?.rings) return null;
    if (slot < 0 || slot >= this.state.soul.rings.length) return null;
    
    const ring = this.state.soul.rings.splice(slot, 1)[0];
    
    this.updateSkillLevels();
    
    emit('ring:unequipped', { ring, slot });
    
    return ring;
  }

  /**
   * 更新技能等级（根据魂环数量）
   */
  updateSkillLevels() {
    if (!this.state.soul?.skills) return;
    
    const ringCount = this.state.soul.rings.length;
    
    this.state.soul.skills.forEach((skill, index) => {
      skill.ring = Math.min(index + 1, ringCount);
    });
  }

  /**
   * 融合两个魂环
   * @param {Object} ringA - 魂环A
   * @param {Object} ringB - 魂环B
   * @param {Array} [herbs=[]] - 药草列表
   * @returns {Object|null} 融合结果
   */
  fuseRings(ringA, ringB, herbs = []) {
    // 计算成功率和质变率
    let successBonus = 0;
    let mutateBonus = 0;
    
    herbs.forEach(herb => {
      if (herb?.data?.fb) {
        successBonus += herb.data.fb.s || 0;
        mutateBonus += herb.data.fb.m || 0;
      }
    });
    
    const successRate = Math.min(95, 50 + successBonus);
    const mutateRate = Math.min(50, 1 + mutateBonus);
    
    // 检查融合是否成功
    if (Math.random() * 100 > successRate) {
      return null;
    }
    
    // 计算融合后的等级
    const idxA = ringA.tierIndex ?? RT.findIndex(t => t.n === ringA.n);
    const idxB = ringB.tierIndex ?? RT.findIndex(t => t.n === ringB.n);
    let resultIdx = Math.max(idxA >= 0 ? idxA : 0, idxB >= 0 ? idxB : 0);
    
    // 检查是否质变
    const mutated = Math.random() * 100 < mutateRate;
    if (mutated) {
      resultIdx = Math.min(resultIdx + 1, RT.length - 2);
    }
    
    const tier = RT[resultIdx];
    const skill = this.pickSkill(tier.sk);
    
    const result = {
      id: Date.now() + Math.random(),
      n: tier.n,
      y: tier.y,
      c: tier.c,
      sk: skill,
      pw: tier.pw,
      tier: tier.n,
      tierIndex: resultIdx,
      attr: tier.attr || null,
      special: tier.special || false,
      unique: tier.unique || false,
      mutateSkills: tier.mutateSkills || null,
      mutated,
      createdAt: Date.now()
    };
    
    emit('ring:fused', { result, ringA, ringB, mutated });
    
    return result;
  }

  /**
   * 获取当前装备的魂环列表
   * @returns {Array}
   */
  getEquippedRings() {
    return this.state.soul?.rings || [];
  }

  /**
   * 获取魂环槽位数量
   * @returns {number}
   */
  getSlotCount() {
    return this.state.soul?.rings?.length || 0;
  }

  /**
   * 获取最大槽位数量
   * @returns {number}
   */
  getMaxSlots() {
    return this.maxRings;
  }

  /**
   * 根据年份获取魂环信息
   * @param {number} year - 年份
   * @returns {Object|null}
   */
  getRingByYear(year) {
    return RT.find(t => t.y === year) || null;
  }

  /**
   * 获取魂环等级列表
   * @returns {Array}
   */
  getRingTiers() {
    return RT;
  }

  /**
   * 获取魂环战力总和
   * @returns {number}
   */
  getTotalPower() {
    return this.state.soul?.rings?.reduce((sum, ring) => sum + (ring.pw || 0), 0) || 0;
  }
}

// 创建全局魂环管理器实例
export let ringManager = null;

export function initRingManager(state) {
  ringManager = new RingManager(state);
  return ringManager;
}
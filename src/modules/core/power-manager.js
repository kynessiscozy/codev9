/**
 * 战力计算管理器 - 统一战力计算逻辑
 */

import { QC } from '../config/quality.js';
import { RT } from '../data/rings.js';
import { calcResonancePower } from './resonance.js';

export class PowerManager {
  constructor(state) {
    this.state = state;
    this.multipliers = {
      power: 1.3,
      defense: 1.2,
      speed: 1.15,
      support: 1.1
    };
    this.awakeningBonuses = [0, 200, 500, 1000, 2000, 4000, 8000, 15000, 25000, 40000, 60000];
  }

  /**
   * 计算总战力
   * @returns {number} 总战力值
   */
  calculate() {
    let power = this.calculateBasePower();
    
    power += this.calculateSoulPower();
    power += this.calculateRingPower();
    power += this.calculateBonePower();
    power += this.calculateArtifactPower();
    power += this.calculateResonancePower();
    power += this.calculateTitlePower();
    
    power = this.applyTalentMultiplier(power);
    power += this.calculateAwakeningBonus();
    
    return Math.floor(power);
  }

  /**
   * 计算基础战力（等级 + 额外战力）
   * @returns {number}
   */
  calculateBasePower() {
    const level = this.state.level || 1;
    const extraPower = this.state.extraPower || 0;
    return level * 80 + extraPower;
  }

  /**
   * 计算武魂基础战力
   * @returns {number}
   */
  calculateSoulPower() {
    const soul = this.state.soul;
    if (!soul) return 0;
    
    const quality = QC[soul.quality];
    if (!quality) return 0;
    
    return Math.floor((quality.p || 1) * 80 * (quality.pwMul || 1));
  }

  /**
   * 计算魂环战力
   * @returns {number}
   */
  calculateRingPower() {
    const rings = this.state.soul?.rings || [];
    let power = 0;
    
    for (const ring of rings) {
      const tier = RT.find(t => t.n === ring.n);
      power += tier ? tier.pw : 80;
    }
    
    return power;
  }

  /**
   * 计算魂骨战力
   * @returns {number}
   */
  calculateBonePower() {
    const bones = Object.values(this.state.equippedBones || {});
    return bones.reduce((sum, bone) => sum + (bone?.pw || 0), 0);
  }

  /**
   * 计算神器战力
   * @returns {number}
   */
  calculateArtifactPower() {
    const artifact = this.state.equippedArt;
    if (!artifact) return 0;
    
    const multiplier = artifact.mul || 2;
    const basePower = artifact.pw || 0;
    let power = Math.floor(basePower * multiplier);
    
    // 神骨共鸣加成
    const godBones = Object.values(this.state.equippedBones || {}).filter(b => b?.god);
    if (godBones.length > 0) {
      power += Math.floor(basePower * multiplier * 0.5 * godBones.length);
    }
    
    return power;
  }

  /**
   * 计算武魂共鸣战力
   * @returns {number}
   */
  calculateResonancePower() {
    return calcResonancePower();
  }

  /**
   * 计算称号战力
   * @returns {number}
   */
  calculateTitlePower() {
    const title = this.state.equippedTitle;
    return title?.pw || 0;
  }

  /**
   * 应用天赋战力倍数
   * @param {number} power - 当前战力
   * @returns {number}
   */
  applyTalentMultiplier(power) {
    const talent = this.state.talent;
    if (!talent) return power;
    
    const multiplier = this.multipliers[talent] || 1;
    return Math.floor(power * multiplier);
  }

  /**
   * 计算觉醒等级奖励
   * @returns {number}
   */
  calculateAwakeningBonus() {
    const level = this.state.awakenLevel || 0;
    return this.awakeningBonuses[Math.min(10, level)] || 0;
  }

  /**
   * 添加魂力
   * @param {number} value - 魂力值
   * @param {string} [label] - 标签
   */
  addSP(value, label) {
    if (!this.state.sp) this.state.sp = 0;
    this.state.sp += value;
    
    if (!this.state.dailyEarned) this.state.dailyEarned = 0;
    this.state.dailyEarned += value;
    
    if (typeof updateHUD === 'function') updateHUD();
    if (label && typeof notify === 'function') {
      notify(`+${value} 魂力${label ? ` (${label})` : ''}`, 'normal');
    }
  }

  /**
   * 获取战力倍数（用于显示）
   * @returns {number}
   */
  getMultiplier() {
    const talent = this.state.talent;
    if (!talent) return 1;
    return this.multipliers[talent] || 1;
  }

  /**
   * 获取战力组件详情
   * @returns {Object} 各组件战力详情
   */
  getBreakdown() {
    return {
      base: this.calculateBasePower(),
      soul: this.calculateSoulPower(),
      rings: this.calculateRingPower(),
      bones: this.calculateBonePower(),
      artifact: this.calculateArtifactPower(),
      resonance: this.calculateResonancePower(),
      title: this.calculateTitlePower(),
      talentMultiplier: this.getMultiplier(),
      awakeningBonus: this.calculateAwakeningBonus(),
      total: this.calculate()
    };
  }
}

// 创建全局战力管理器实例
export let powerManager = null;

export function initPowerManager(state) {
  powerManager = new PowerManager(state);
  return powerManager;
}
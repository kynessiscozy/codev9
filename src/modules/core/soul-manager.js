/**
 * 武魂管理器 - 统一武魂管理逻辑
 */

import { QC, getQualityConfig } from '../config/quality.js';
import { SD, getSoul, pickRandomSoul } from '../data/souls.js';
import { addExp } from './exp.js';
import { addSoulFragment } from './resonance.js';
import { notify } from './notify.js';
import { emit } from './events.js';

export class SoulManager {
  constructor(state) {
    this.state = state;
    this.skillTemplates = {
      common: [{ n: "体质强化", d: "提升躯体素质与耐久。", p: ["攻击+2", "防御+2", "体质+3"] }],
      rare: [{ n: "属性共鸣", d: "与武魂属性共鸣，属性伤害大幅提升。", p: ["属性伤害+20%", "共鸣时长5秒"] }],
      epic: [{ n: "领域感知", d: "感知领域边缘，获取初期领域能力。", p: ["领域范围10m", "压制20%", "持续8秒"] }],
      legend: [{ n: "领域半开", d: "领域半开展，产生显著特殊效果。", p: ["领域范围25m", "速度-30%(敌)", "持续15秒"] }],
      apex: [{ n: "领域全开", d: "领域完全展开，范围内强力压制。", p: ["领域范围50m", "全属性-50%(敌)", "持续30秒"] }],
      hc: [{ n: "隐匿天赋", d: "隐藏武魂特殊天赋觉醒。", p: ["隐身效果+40%", "暗属性+60%"] }],
      ha: [{ n: "绝世之力", d: "绝世之力爆发，凌驾一切。", p: ["伤害×5", "无视防御20%", "持续10秒"] }],
      twin: [{ n: "双生共鸣", d: "双生武魂共鸣，两种力量互相增幅。", p: ["双重伤害+100%", "共鸣爆发概率15%"] }],
      triple: [{ n: "三生轮回", d: "三生武魂轮回之力觉醒。", p: ["轮回伤害+200%", "生命恢复+50%/秒"] }],
    };
  }

  /**
   * 觉醒武魂
   * @returns {Object|null} 觉醒的武魂
   */
  awaken() {
    const qualityKey = this.getRandomQuality();
    const pool = SD[qualityKey] || SD.common;
    const soulData = pickRandomSoul(qualityKey);
    
    if (!soulData) {
      console.error('[Soul] 武魂数据缺失');
      return null;
    }
    
    const quality = QC[qualityKey];
    if (!quality) {
      console.error('[Soul] 品质配置缺失:', qualityKey);
      return null;
    }
    
    let attributes = [...(soulData.a || [])];
    
    // 属性变异
    if (Math.random() < 0.06) {
      attributes.push(this.getRandomMutation() + '·' + (attributes[0] || '未知'));
      notify('⚡ 属性变异！', 'epic');
    }
    
    const soul = {
      id: Date.now(),
      name: soulData.n,
      icon: soulData.i,
      quality: qualityKey,
      qualityName: quality.n,
      color: quality.c,
      desc: soulData.d,
      attrs: attributes,
      initPow: Math.min(10, soulData.p || 1),
      rings: [],
      skills: this.generateSkills(soulData, qualityKey),
      secondAwakened: false,
      divine: false,
      createdAt: Date.now()
    };
    
    this.state.soul = soul;
    this.state.awakenDone = true;
    this.state.level = Math.max(this.state.level, soul.initPow);
    
    // 添加经验和碎片
    addExp(soul.initPow * 60);
    addSoulFragment(qualityKey, 1);
    
    // 触发事件
    emit('soul:awakened', { 
      quality: qualityKey, 
      qualityConfig: quality, 
      soul 
    });
    
    // 发送通知
    this.sendAwakenNotification(qualityKey);
    
    return soul;
  }

  /**
   * 获取随机品质
   * @returns {string} 品质key
   */
  getRandomQuality() {
    const r = Math.random() * 100;
    let cumulative = 0;
    
    for (const [key, value] of Object.entries(QC)) {
      cumulative += value.p;
      if (r <= cumulative) return key;
    }
    
    return 'common';
  }

  /**
   * 获取随机变异属性
   * @returns {string}
   */
  getRandomMutation() {
    return ["混沌", "神秘", "极致", "变异", "觉醒", "逆天"][Math.floor(Math.random() * 6)];
  }

  /**
   * 生成技能
   * @param {Object} soulData - 武魂数据
   * @param {string} qualityKey - 品质key
   * @returns {Array} 技能列表
   */
  generateSkills(soulData, qualityKey) {
    const base = this.skillTemplates[qualityKey] || this.skillTemplates.common;
    
    const attributeSkill = {
      n: `${(soulData.a || ['未知'])[0]}精通`,
      d: `天生${(soulData.a || [''])[0]}属性精通。`,
      p: [`${(soulData.a || [''])[0]}伤害+35%`, `感知+50%`]
    };
    
    return [...base, attributeSkill].map(skill => {
      const mutated = Math.random() < 0.006;
      return {
        name: skill.n + (mutated ? '·质变' : ''),
        desc: skill.d + (mutated ? ' 【质变：效果+300%！】' : ''),
        params: skill.p,
        ring: 0,
        mutated
      };
    });
  }

  /**
   * 发送觉醒通知
   * @param {string} qualityKey - 品质key
   */
  sendAwakenNotification(qualityKey) {
    const messages = {
      legend: '🌟 传说武魂！',
      apex: '🔥 顶级武魂！震撼！',
      hc: '🟢 隐藏武魂！',
      ha: '💗 顶级隐藏！',
      twin: '✨ 双生武魂！旷世奇才！',
      triple: '🌈 三生武魂！天命之子！'
    };
    
    if (messages[qualityKey]) {
      setTimeout(() => notify(messages[qualityKey], 'divine'), 250);
    }
  }

  /**
   * 获取当前武魂
   * @returns {Object|null}
   */
  getCurrentSoul() {
    return this.state.soul || null;
  }

  /**
   * 添加魂环到武魂
   * @param {Object} ring - 魂环对象
   */
  addRing(ring) {
    if (!this.state.soul) return;
    if (!this.state.soul.rings) this.state.soul.rings = [];
    
    // 最多10个魂环
    if (this.state.soul.rings.length >= 10) {
      notify('已达到最大魂环数量！', 'normal');
      return;
    }
    
    this.state.soul.rings.push(ring);
  }

  /**
   * 移除魂环
   * @param {number} index - 魂环索引
   */
  removeRing(index) {
    if (!this.state.soul?.rings) return;
    if (index < 0 || index >= this.state.soul.rings.length) return;
    
    this.state.soul.rings.splice(index, 1);
  }

  /**
   * 获取武魂技能
   * @returns {Array}
   */
  getSkills() {
    return this.state.soul?.skills || [];
  }

  /**
   * 二次觉醒
   */
  secondAwaken() {
    if (!this.state.soul) return;
    if (this.state.soul.secondAwakened) {
      notify('已完成二次觉醒！', 'normal');
      return;
    }
    
    // 检查觉醒等级要求
    if ((this.state.awakenLevel || 0) < 5) {
      notify('觉醒等级不足！需要Lv.5', 'normal');
      return;
    }
    
    this.state.soul.secondAwakened = true;
    this.state.soul.divine = true;
    
    // 增强技能
    this.state.soul.skills = this.state.soul.skills.map(skill => ({
      ...skill,
      params: skill.params.map(p => p.replace('+', '++'))
    }));
    
    notify('✨ 二次觉醒成功！武魂进化为神级！', 'divine');
    emit('soul:secondAwakened', { soul: this.state.soul });
  }

  /**
   * 获取武魂进化路径
   * @returns {Object|null}
   */
  getEvolutionPath() {
    const soulName = this.state.soul?.name;
    if (!soulName) return null;
    
    const evolutions = {
      '蓝银草': { to: '蓝银皇', fragCost: 15, reqLv: 30, toQ: 'legend' },
      '镰刀': { to: '铁锤', fragCost: 8, reqLv: 10, toQ: 'common' },
      '白虎': { to: '白虎', fragCost: 10, reqLv: 20, toQ: 'rare' },
      '火凤凰': { to: '极品火凤凰', fragCost: 12, reqLv: 40, toQ: 'legend' },
      '冰凤凰': { to: '极品火凤凰', fragCost: 12, reqLv: 40, toQ: 'legend' },
      '七宝琉璃塔': { to: '九宝琉璃塔', fragCost: 10, reqLv: 35, toQ: 'legend' },
      '蓝电霸王龙': { to: '金龙王', fragCost: 8, reqLv: 45, toQ: 'legend' },
      '昊天锤': { to: '昊天九绝锤', fragCost: 6, reqLv: 50, toQ: 'ha' },
      '六翼天使': { to: '神圣天使', fragCost: 5, reqLv: 50, toQ: 'apex' },
    };
    
    return evolutions[soulName] || null;
  }

  /**
   * 执行武魂进化
   * @returns {boolean} 是否成功
   */
  evolve() {
    const path = this.getEvolutionPath();
    if (!path) {
      notify('该武魂无法进化！', 'normal');
      return false;
    }
    
    if (this.state.level < path.reqLv) {
      notify(`等级不足！需要Lv.${path.reqLv}`, 'normal');
      return false;
    }
    
    const fragments = this.state.soulFragments?.[this.state.soul.quality] || 0;
    if (fragments < path.fragCost) {
      notify(`碎片不足！需要${path.fragCost}个${this.state.soul.qualityName}碎片`, 'normal');
      return false;
    }
    
    // 消耗碎片
    this.state.soulFragments[this.state.soul.quality] -= path.fragCost;
    
    // 更新武魂
    const newSoulData = getSoul(path.to);
    if (newSoulData) {
      this.state.soul.name = newSoulData.n;
      this.state.soul.icon = newSoulData.i;
      this.state.soul.desc = newSoulData.d;
      this.state.soul.attrs = [...(newSoulData.a || [])];
      this.state.soul.quality = path.toQ;
      this.state.soul.qualityName = QC[path.toQ]?.n || path.toQ;
      this.state.soul.color = QC[path.toQ]?.c || '#ffffff';
      this.state.soul.initPow = newSoulData.p || this.state.soul.initPow;
    }
    
    notify(`🌟 武魂进化成功！${this.state.soul.name}！`, 'divine');
    emit('soul:evolved', { soul: this.state.soul });
    
    return true;
  }
}

// 创建全局武魂管理器实例
export let soulManager = null;

export function initSoulManager(state) {
  soulManager = new SoulManager(state);
  return soulManager;
}
// ──── BONE DATABASE ────
// 魂骨数据库

// 魂骨年限战力范围
export const BONE_TIER_PW = {
  百年: [150, 180],
  千年: [900, 1100],
  万年: [5200, 5800],
  十万年: [12500, 13500],
  百万年: [26000, 27500],
  不可估量: [47000, 49500],
  神赐: [1000000, 1000000],
};

// 生成魂骨战力
export function genBonePw(ringYear) {
  const r = BONE_TIER_PW[ringYear] || [100, 200];
  return ri(r[0], r[1]);
}

// 魂骨槽位定义
export const BONE_SLOTS = [
  { s: "head", n: "头部", i: "💀", bonus: "精神力+15%", types: ["head"] },
  { s: "body", n: "躯干", i: "🦴", bonus: "生命值+20%", types: ["body"] },
  { s: "la", n: "左臂", i: "💪", bonus: "攻击力+12%", types: ["arm"] },
  { s: "ra", n: "右臂", i: "💪", bonus: "攻击力+12%", types: ["arm"] },
  { s: "ll", n: "左腿", i: "🦵", bonus: "速度+10%", types: ["leg"] },
  { s: "rl", n: "右腿", i: "🦵", bonus: "速度+10%", types: ["leg"] },
];

// 魂骨池（按槽位类型）
export const BONE_POOL = {
  head: [
    { id: "bh1", n: "百年头颅骨", i: "💀", s: "head", tier: "百年", bonus: "精神力+15%", attr: "精神" },
    { id: "bh2", n: "千年神识骨", i: "💀", s: "head", tier: "千年", bonus: "精神力+25%,感知+10%", attr: "感知" },
    { id: "bh3", n: "万年灵脑骨", i: "💀", s: "head", tier: "万年", bonus: "精神力+40%,魂技CD-10%", attr: "智慧" },
    { id: "bh4", n: "十万年神念骨", i: "💀", s: "head", tier: "十万年", bonus: "精神力+60%,领域扩展20%", attr: "领域" },
    { id: "bh5", n: "百万年慧眼骨", i: "💀", s: "head", tier: "百万年", bonus: "精神力+100%,洞察所有隐匿", attr: "洞察" },
    { id: "bh6", n: "不可估量意识骨", i: "💀", s: "head", tier: "不可估量", bonus: "精神力+300%,无视精神防御", attr: "混沌意识" },
    { id: "bhg", n: "神赐灵识骨", i: "👑", s: "head", tier: "神赐", bonus: "精神力+∞,神识覆盖千里", attr: "神赐", god: true },
  ],
  body: [
    { id: "bb1", n: "百年躯骨", i: "🦴", s: "body", tier: "百年", bonus: "生命值+15%", attr: "体质" },
    { id: "bb2", n: "千年钢骨", i: "🦴", s: "body", tier: "千年", bonus: "生命值+25%,防御+8%", attr: "坚韧" },
    { id: "bb3", n: "万年玄铁骨", i: "🦴", s: "body", tier: "万年", bonus: "生命值+40%,防御+15%", attr: "钢铁" },
    { id: "bb4", n: "十万年龙脊骨", i: "🦴", s: "body", tier: "十万年", bonus: "生命值+70%,反弹伤害5%", attr: "龙骨" },
    { id: "bb5", n: "百万年不灭骨", i: "🦴", s: "body", tier: "百万年", bonus: "生命值+120%,不死复活1次/天", attr: "不灭" },
    { id: "bb6", n: "不可估量混沌躯骨", i: "🦴", s: "body", tier: "不可估量", bonus: "生命值+500%,免疫控制", attr: "混沌体" },
    { id: "bbg", n: "神赐永恒骨", i: "👑", s: "body", tier: "神赐", bonus: "生命值+∞,永恒不灭之体", attr: "神赐", god: true },
  ],
  arm: [
    { id: "ba1", n: "百年臂骨", i: "💪", s: "arm", tier: "百年", bonus: "攻击力+12%", attr: "力量" },
    { id: "ba2", n: "千年破金臂骨", i: "💪", s: "arm", tier: "千年", bonus: "攻击力+20%,穿透+5%", attr: "穿透" },
    { id: "ba3", n: "万年雷霆臂骨", i: "💪", s: "arm", tier: "万年", bonus: "攻击力+35%,附带雷击", attr: "雷击" },
    { id: "ba4", n: "十万年爆炎臂骨", i: "💪", s: "arm", tier: "十万年", bonus: "攻击力+55%,攻击可燃烧", attr: "火焰" },
    { id: "ba5", n: "百万年龙爪骨", i: "💪", s: "arm", tier: "百万年", bonus: "攻击力+90%,龙威震慑", attr: "龙爪" },
    { id: "ba6", n: "不可估量混沌拳骨", i: "💪", s: "arm", tier: "不可估量", bonus: "攻击力+250%,击穿所有防御", attr: "混沌拳" },
    { id: "bag", n: "神赐神力臂骨", i: "👑", s: "arm", tier: "神赐", bonus: "攻击力+∞,一击之力毁天灭地", attr: "神赐", god: true },
  ],
  leg: [
    { id: "bl1", n: "百年腿骨", i: "🦵", s: "leg", tier: "百年", bonus: "速度+10%", attr: "敏捷" },
    { id: "bl2", n: "千年疾风腿骨", i: "🦵", s: "leg", tier: "千年", bonus: "速度+18%,闪避+5%", attr: "疾风" },
    { id: "bl3", n: "万年迅影腿骨", i: "🦵", s: "leg", tier: "万年", bonus: "速度+30%,瞬移初现", attr: "影速" },
    { id: "bl4", n: "十万年电光腿骨", i: "🦵", s: "leg", tier: "十万年", bonus: "速度+50%,可短暂突进", attr: "电光" },
    { id: "bl5", n: "百万年风神腿骨", i: "🦵", s: "leg", tier: "百万年", bonus: "速度+80%,疾风领域", attr: "风神" },
    { id: "bl6", n: "不可估量空间腿骨", i: "🦵", s: "leg", tier: "不可估量", bonus: "速度+200%,空间步伐", attr: "空间" },
    { id: "blg", n: "神赐天行腿骨", i: "👑", s: "leg", tier: "神赐", bonus: "速度+∞,瞬息万里", attr: "神赐", god: true },
  ],
};

// 特殊魂骨
export const SPECIAL_BONES = [
  { id: "dragon_scale", n: "神龙鳞甲", i: "🐉", s: "extra", tier: "不可估量", pw: 47200, bonus: "防御力+40%", special: "受到伤害时10%反弹" },
  { id: "angel_wing", n: "天使羽翼", i: "🪽", s: "extra", tier: "不可估量", pw: 47500, bonus: "速度+50%", special: "可短暂飞行" },
  { id: "chaos_core", n: "混沌魂核", i: "🌀", s: "extra", tier: "不可估量", pw: 49500, bonus: "全属性+20%", special: "攻击有概率触发混沌爆发" },
  { id: "god_eye", n: "神之眼", i: "👁️", s: "extra", tier: "不可估量", pw: 47800, bonus: "感知+100%", special: "可预判敌方下一动作" },
  { id: "death_spine", n: "死神脊骨", i: "💀", s: "extra", tier: "不可估量", pw: 48300, bonus: "暴击率+25%", special: "致命一击秒杀概率5%" },
  { id: "star_rib", n: "星辰肋骨", i: "✨", s: "extra", tier: "不可估量", pw: 48800, bonus: "魂技伤害+35%", special: "每次使用魂技积攒星力" },
  { id: "void_marrow", n: "虚空髓液", i: "🌑", s: "extra", tier: "不可估量", pw: 49200, bonus: "无视防御15%", special: "攻击有概率穿透空间" },
];

export const MAX_SPECIAL_BONES = 6;

// 获取魂骨池（按槽位）
export function getBonePool(slotType) {
  return BONE_POOL[slotType] || [];
}

// 根据ID获取魂骨
export function getBoneById(id) {
  for (const pool of Object.values(BONE_POOL)) {
    const bone = pool.find((b) => b.id === id);
    if (bone) return bone;
  }
  return SPECIAL_BONES.find((b) => b.id === id) || null;
}

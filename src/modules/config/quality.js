// ──── QUALITY CONFIG ────
// 品质配置：名称、颜色、概率、战力倍数
export const QC = {
  common: { n: "普通", c: "#9ca3af", p: 18, bc: "rgba(156,163,175,.38)", pwMul: 1 },
  rare: { n: "稀有", c: "#3b82f6", p: 24, bc: "rgba(59,130,246,.5)", pwMul: 1.5 },
  epic: { n: "史诗", c: "#8b5cf6", p: 21, bc: "rgba(139,92,246,.58)", pwMul: 2 },
  legend: { n: "传说", c: "#f59e0b", p: 17, bc: "rgba(245,158,11,.58)", pwMul: 3 },
  apex: { n: "顶级", c: "#ef4444", p: 8, bc: "rgba(239,68,68,.68)", pwMul: 5 },
  hc: { n: "普通隐藏", c: "#10b981", p: 4, bc: "rgba(16,185,129,.58)", pwMul: 2.5 },
  ha: { n: "顶级隐藏", c: "#ec4899", p: 2, bc: "rgba(236,72,153,.65)", pwMul: 4 },
  twin: { n: "双生武魂", c: "#f0abfc", p: 4, bc: "rgba(240,171,252,.65)", pwMul: 6 },
  triple: { n: "三生武魂", c: "#e2e8f0", p: 0.5, bc: "rgba(226,232,240,.5)", pwMul: 10 },
};

// 根据品质获取配置
export function getQualityConfig(quality) {
  return QC[quality] || QC.common;
}

// 获取品质名称
export function getQualityName(quality) {
  return (QC[quality] && QC[quality].n) || "未知";
}

// 获取品质颜色
export function getQualityColor(quality) {
  return (QC[quality] && QC[quality].c) || "#9ca3af";
}

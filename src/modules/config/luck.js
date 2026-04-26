// ──── LUCK VALUE SYSTEM ────
// 幸运值（潮汐系统）配置

export const TIDAL_STATES = [
  { n: "低迷", col: "#9ca3af", fill: "linear-gradient(90deg,#374151,#9ca3af)", threshold: 0 },
  { n: "平稳", col: "#60a5fa", fill: "linear-gradient(90deg,#1d4ed8,#60a5fa)", threshold: 30 },
  { n: "高涨", col: "#f59e0b", fill: "linear-gradient(90deg,#b45309,#fbbf24)", threshold: 60 },
  { n: "巅峰", col: "#ef4444", fill: "linear-gradient(90deg,#991b1b,#ef4444)", threshold: 90 },
];

export const TIDAL_MAX = 90;

// 获取当前幸运状态
export function getTidalState(tidalValue) {
  let state = TIDAL_STATES[0];
  for (const s of TIDAL_STATES) {
    if (tidalValue >= s.threshold) state = s;
  }
  return state;
}

// 获取幸运值百分比
export function getTidalPercent(tidalValue) {
  return Math.min(100, (tidalValue / TIDAL_MAX) * 100);
}

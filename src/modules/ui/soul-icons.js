/**
 * 武魂SVG图标系统
 * 为101种武魂提供精美的矢量图标和品质特效
 */

// ════════════════════════════════════════════════
// SVG图标基础模板
// ════════════════════════════════════════════════

/**
 * 创建SVG图标HTML字符串
 * @param {string} innerSVG - SVG内部内容
 * @param {string} viewBox - 视图框
 * @param {string} [className] - CSS类名
 * @returns {string}
 */
function createSVG(innerSVG, viewBox = "0 0 64 64", className = "soul-icon") {
  return `<svg class="${className}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">${innerSVG}</svg>`;
}

// ════════════════════════════════════════════════
// 武魂图标数据 - 按品质和名称索引
// ════════════════════════════════════════════════

export const SOUL_ICONS = {
  // ──── 普通品质 Common ────
  "蓝银草": {
    svg: `<defs>
      <linearGradient id="grassGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" style="stop-color:#1a5c1a"/>
        <stop offset="50%" style="stop-color:#2d8a2d"/>
        <stop offset="100%" style="stop-color:#5cb85c"/>
      </linearGradient>
    </defs>
    <path d="M32 56 Q32 30 20 16" stroke="url(#grassGrad)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M32 56 Q32 28 32 14" stroke="url(#grassGrad)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M32 56 Q32 30 44 16" stroke="url(#grassGrad)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M20 16 Q12 10 8 14" stroke="#4CAF50" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M32 14 Q32 6 28 4" stroke="#4CAF50" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M44 16 Q52 10 56 14" stroke="#4CAF50" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="32" cy="56" rx="6" ry="3" fill="#8B4513" opacity="0.6"/>`,
    theme: "nature"
  },
  "镰刀": {
    svg: `<defs>
      <linearGradient id="sickleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#bdc3c7"/>
        <stop offset="50%" style="stop-color:#95a5a6"/>
        <stop offset="100%" style="stop-color:#7f8c8d"/>
      </linearGradient>
    </defs>
    <path d="M28 8 Q52 8 52 28 Q52 48 28 48 L28 40 Q44 40 44 28 Q44 16 28 16 Z" fill="url(#sickleGrad)" stroke="#555" stroke-width="1"/>
    <rect x="24" y="44" width="8" height="16" rx="2" fill="#8B4513" stroke="#5D3A1A" stroke-width="1"/>
    <line x1="32" y1="8" x2="32" y2="4" stroke="#7f8c8d" stroke-width="2" stroke-linecap="round"/>`,
    theme: "metal"
  },
  "香草": {
    svg: `<defs>
      <radialGradient id="vanillaGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffeaa7"/>
        <stop offset="100%" style="stop-color:#fdcb6e"/>
      </radialGradient>
    </defs>
    <path d="M32 52 L32 20" stroke="#27ae60" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 20 Q20 12 16 18" stroke="#27ae60" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M32 20 Q44 12 48 18" stroke="#27ae60" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M32 28 Q22 22 18 28" stroke="#27ae60" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M32 28 Q42 22 46 28" stroke="#27ae60" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="32" cy="14" r="6" fill="url(#vanillaGrad)" stroke="#f39c12" stroke-width="1"/>
    <circle cx="32" cy="14" r="3" fill="#fff" opacity="0.6"/>`,
    theme: "nature"
  },
  "木棍": {
    svg: `<defs>
      <linearGradient id="stickGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#8B6914"/>
        <stop offset="50%" style="stop-color:#A0522D"/>
        <stop offset="100%" style="stop-color:#8B6914"/>
      </linearGradient>
    </defs>
    <path d="M20 52 L44 12" stroke="url(#stickGrad)" stroke-width="5" stroke-linecap="round"/>
    <path d="M22 48 L26 44" stroke="#654321" stroke-width="2" stroke-linecap="round"/>
    <path d="M28 40 L32 36" stroke="#654321" stroke-width="2" stroke-linecap="round"/>
    <circle cx="44" cy="12" r="3" fill="#D2691E" opacity="0.8"/>`,
    theme: "wood"
  },
  "含羞草": {
    svg: `<defs>
      <radialGradient id="mimosaGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffb6c1"/>
        <stop offset="100%" style="stop-color:#ff69b4"/>
      </radialGradient>
    </defs>
    <path d="M32 52 L32 24" stroke="#228B22" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 32 Q18 24 14 32" stroke="#228B22" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M32 32 Q46 24 50 32" stroke="#228B22" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M32 24 Q20 16 16 24" stroke="#228B22" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M32 24 Q44 16 48 24" stroke="#228B22" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="32" cy="24" r="5" fill="url(#mimosaGrad)" stroke="#ff1493" stroke-width="1"/>
    <ellipse cx="14" cy="32" rx="3" ry="2" fill="#90EE90" stroke="#228B22" stroke-width="0.5"/>
    <ellipse cx="50" cy="32" rx="3" ry="2" fill="#90EE90" stroke="#228B22" stroke-width="0.5"/>
    <ellipse cx="16" cy="24" rx="3" ry="2" fill="#90EE90" stroke="#228B22" stroke-width="0.5"/>
    <ellipse cx="48" cy="24" rx="3" ry="2" fill="#90EE90" stroke="#228B22" stroke-width="0.5"/>`,
    theme: "nature"
  },
  "铁锤": {
    svg: `<defs>
      <linearGradient id="hammerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#708090"/>
        <stop offset="50%" style="stop-color:#4a5568"/>
        <stop offset="100%" style="stop-color:#2d3748"/>
      </linearGradient>
    </defs>
    <rect x="20" y="16" width="24" height="18" rx="3" fill="url(#hammerGrad)" stroke="#2d3748" stroke-width="1.5"/>
    <rect x="28" y="34" width="8" height="20" rx="2" fill="#8B4513" stroke="#5D3A1A" stroke-width="1"/>
    <rect x="20" y="20" width="24" height="4" fill="#2d3748" opacity="0.3"/>
    <rect x="24" y="16" width="16" height="3" fill="#A0AEC0" opacity="0.5"/>`,
    theme: "metal"
  },
  "渔网": {
    svg: `<defs>
      <pattern id="netPattern" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M0 0 L8 8 M8 0 L0 8" stroke="#4682B4" stroke-width="0.8" fill="none"/>
      </pattern>
    </defs>
    <path d="M16 16 Q32 8 48 16 L44 48 Q32 52 20 48 Z" fill="url(#netPattern)" stroke="#2F4F4F" stroke-width="1.5"/>
    <path d="M16 16 Q32 8 48 16" stroke="#2F4F4F" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="32" cy="12" r="4" fill="none" stroke="#4682B4" stroke-width="1.5"/>`,
    theme: "water"
  },
  "蒲公英": {
    svg: `<defs>
      <radialGradient id="dandelionGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff"/>
        <stop offset="60%" style="stop-color:#f0f0f0"/>
        <stop offset="100%" style="stop-color:#e0e0e0"/>
      </radialGradient>
    </defs>
    <path d="M32 52 L32 24" stroke="#228B22" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="32" cy="18" r="10" fill="url(#dandelionGrad)" stroke="#ddd" stroke-width="0.5"/>
    <circle cx="32" cy="18" r="3" fill="#FFD700" opacity="0.8"/>
    <!-- 种子 -->
    <line x1="32" y1="8" x2="32" y2="4" stroke="#ddd" stroke-width="1" stroke-linecap="round"/>
    <line x1="24" y1="10" x2="22" y2="6" stroke="#ddd" stroke-width="1" stroke-linecap="round"/>
    <line x1="40" y1="10" x2="42" y2="6" stroke="#ddd" stroke-width="1" stroke-linecap="round"/>
    <line x1="18" y1="16" x2="14" y2="14" stroke="#ddd" stroke-width="1" stroke-linecap="round"/>
    <line x1="46" y1="16" x2="50" y2="14" stroke="#ddd" stroke-width="1" stroke-linecap="round"/>
    <circle cx="32" cy="4" r="1.5" fill="white" opacity="0.8"/>
    <circle cx="22" cy="6" r="1.5" fill="white" opacity="0.8"/>
    <circle cx="42" cy="6" r="1.5" fill="white" opacity="0.8"/>`,
    theme: "wind"
  },
  "芦苇杆": {
    svg: `<path d="M28 52 Q28 30 26 16" stroke="#8FBC8F" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M32 52 Q32 28 34 12" stroke="#6B8E23" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M36 52 Q36 30 38 16" stroke="#8FBC8F" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="26" cy="14" rx="3" ry="8" fill="#F5DEB3" stroke="#DAA520" stroke-width="0.5" transform="rotate(-15 26 14)"/>
    <ellipse cx="34" cy="10" rx="3" ry="8" fill="#F5DEB3" stroke="#DAA520" stroke-width="0.5" transform="rotate(10 34 10)"/>
    <ellipse cx="38" cy="14" rx="3" ry="8" fill="#F5DEB3" stroke="#DAA520" stroke-width="0.5" transform="rotate(15 38 14)"/>
    <path d="M20 52 Q32 50 44 52" stroke="#4682B4" stroke-width="2" fill="none" opacity="0.5" stroke-linecap="round"/>`,
    theme: "water"
  },
  "铁锅": {
    svg: `<defs>
      <radialGradient id="potGrad" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#708090"/>
        <stop offset="60%" style="stop-color:#4a5568"/>
        <stop offset="100%" style="stop-color:#2d3748"/>
      </radialGradient>
    </defs>
    <path d="M16 24 Q32 56 48 24 L48 20 Q32 24 16 20 Z" fill="url(#potGrad)" stroke="#2d3748" stroke-width="1.5"/>
    <path d="M16 20 Q32 24 48 20" stroke="#A0AEC0" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="32" cy="20" rx="16" ry="4" fill="#2d3748" opacity="0.3"/>
    <rect x="12" y="22" width="6" height="3" rx="1" fill="#4a5568" stroke="#2d3748" stroke-width="1"/>
    <rect x="46" y="22" width="6" height="3" rx="1" fill="#4a5568" stroke="#2d3748" stroke-width="1"/>`,
    theme: "metal"
  },
  "荆棘藤": {
    svg: `<defs>
      <linearGradient id="thornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#2d5016"/>
        <stop offset="50%" style="stop-color:#3a6b1f"/>
        <stop offset="100%" style="stop-color:#228B22"/>
      </linearGradient>
    </defs>
    <path d="M20 52 Q24 36 32 28 Q40 20 44 12" stroke="url(#thornGrad)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M32 52 Q36 40 32 28 Q28 20 24 14" stroke="url(#thornGrad)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M44 52 Q40 40 32 28 Q24 20 20 16" stroke="url(#thornGrad)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M26 32 L22 28" stroke="#8B0000" stroke-width="2" stroke-linecap="round"/>
    <path d="M36 24 L40 20" stroke="#8B0000" stroke-width="2" stroke-linecap="round"/>
    <path d="M30 20 L28 16" stroke="#8B0000" stroke-width="2" stroke-linecap="round"/>
    <path d="M38 36 L42 32" stroke="#8B0000" stroke-width="2" stroke-linecap="round"/>`,
    theme: "nature"
  },
  "石头": {
    svg: `<defs>
      <radialGradient id="stoneGrad" cx="40%" cy="40%">
        <stop offset="0%" style="stop-color:#A9A9A9"/>
        <stop offset="70%" style="stop-color:#808080"/>
        <stop offset="100%" style="stop-color:#696969"/>
      </radialGradient>
    </defs>
    <path d="M24 48 L18 36 L22 22 L34 16 L46 24 L48 38 L42 48 Z" fill="url(#stoneGrad)" stroke="#555" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M22 22 L30 28 L34 16" stroke="#555" stroke-width="1" fill="none" opacity="0.5"/>
    <path d="M30 28 L42 32 L46 24" stroke="#555" stroke-width="1" fill="none" opacity="0.5"/>
    <path d="M30 28 L28 40 L42 32" stroke="#555" stroke-width="1" fill="none" opacity="0.5"/>`,
    theme: "earth"
  },
  "陶笛": {
    svg: `<defs>
      <linearGradient id="fluteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#D2691E"/>
        <stop offset="100%" style="stop-color:#8B4513"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="36" rx="14" ry="16" fill="url(#fluteGrad)" stroke="#5D3A1A" stroke-width="1.5"/>
    <ellipse cx="32" cy="36" rx="10" ry="12" fill="#A0522D" opacity="0.5"/>
    <circle cx="32" cy="28" r="4" fill="#5D3A1A"/>
    <circle cx="28" cy="36" r="2" fill="#3E2723"/>
    <circle cx="36" cy="36" r="2" fill="#3E2723"/>
    <circle cx="32" cy="44" r="2" fill="#3E2723"/>
    <path d="M32 20 L32 12" stroke="#8B4513" stroke-width="3" stroke-linecap="round"/>
    <!-- 音符 -->
    <circle cx="42" cy="14" r="2" fill="#333"/>
    <path d="M42 14 L42 8" stroke="#333" stroke-width="1"/>
    <circle cx="48" cy="12" r="2" fill="#333"/>
    <path d="M48 12 L48 6" stroke="#333" stroke-width="1"/>`,
    theme: "sound"
  },
  // ──── 稀有品质 Rare ────
  "白虎": {
    svg: `<defs>
      <linearGradient id="tigerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fff"/>
        <stop offset="50%" style="stop-color:#f0f0f0"/>
        <stop offset="100%" style="stop-color:#e0e0e0"/>
      </linearGradient>
      <linearGradient id="tigerStripe" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#333"/>
        <stop offset="100%" style="stop-color:#000"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="28" r="16" fill="url(#tigerGrad)" stroke="#333" stroke-width="1.5"/>
    <path d="M20 20 L24 24 L20 28" fill="none" stroke="url(#tigerStripe)" stroke-width="2" stroke-linecap="round"/>
    <path d="M44 20 L40 24 L44 28" fill="none" stroke="url(#tigerStripe)" stroke-width="2" stroke-linecap="round"/>
    <path d="M16 28 Q32 24 48 28" fill="none" stroke="url(#tigerStripe)" stroke-width="2" stroke-linecap="round"/>
    <circle cx="26" cy="26" r="2.5" fill="#ff6600"/>
    <circle cx="38" cy="26" r="2.5" fill="#ff6600"/>
    <ellipse cx="32" cy="34" rx="3" ry="2" fill="#ff9966"/>
    <path d="M20 12 L24 18 L18 16 Z" fill="url(#tigerGrad)" stroke="#333" stroke-width="1"/>
    <path d="M44 12 L40 18 L46 16 Z" fill="url(#tigerGrad)" stroke="#333" stroke-width="1"/>`,
    theme: "beast"
  },
  "火凤凰": {
    svg: `<defs>
      <radialGradient id="firePhoenixGrad" cx="50%" cy="60%">
        <stop offset="0%" style="stop-color:#ff6600"/>
        <stop offset="40%" style="stop-color:#ff3300"/>
        <stop offset="100%" style="stop-color:#cc0000"/>
      </radialGradient>
      <linearGradient id="phoenixWing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff9900"/>
        <stop offset="50%" style="stop-color:#ff6600"/>
        <stop offset="100%" style="stop-color:#cc3300"/>
      </linearGradient>
    </defs>
    <path d="M32 48 Q20 36 16 24 Q20 20 24 24 Q28 28 32 32" fill="url(#phoenixWing)" stroke="#cc0000" stroke-width="1"/>
    <path d="M32 48 Q44 36 48 24 Q44 20 40 24 Q36 28 32 32" fill="url(#phoenixWing)" stroke="#cc0000" stroke-width="1"/>
    <ellipse cx="32" cy="28" rx="6" ry="10" fill="url(#firePhoenixGrad)" stroke="#cc0000" stroke-width="1"/>
    <circle cx="30" cy="24" r="1.5" fill="#ffff00"/>
    <circle cx="34" cy="24" r="1.5" fill="#ffff00"/>
    <path d="M32 18 L32 12" stroke="#ff6600" stroke-width="3" stroke-linecap="round"/>
    <path d="M28 14 Q32 8 36 14" fill="none" stroke="#ff9900" stroke-width="2" stroke-linecap="round"/>
    <!-- 火焰粒子 -->
    <circle cx="20" cy="18" r="2" fill="#ff6600" opacity="0.7"/>
    <circle cx="44" cy="18" r="2" fill="#ff6600" opacity="0.7"/>
    <circle cx="32" cy="8" r="2.5" fill="#ff9900" opacity="0.8"/>`,
    theme: "fire"
  },
  "冰凤凰": {
    svg: `<defs>
      <radialGradient id="icePhoenixGrad" cx="50%" cy="60%">
        <stop offset="0%" style="stop-color:#e0f7fa"/>
        <stop offset="40%" style="stop-color:#80deea"/>
        <stop offset="100%" style="stop-color:#26c6da"/>
      </radialGradient>
      <linearGradient id="iceWing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e1f5fe"/>
        <stop offset="50%" style="stop-color:#81d4fa"/>
        <stop offset="100%" style="stop-color:#4fc3f7"/>
      </linearGradient>
    </defs>
    <path d="M32 48 Q18 36 14 24 Q18 20 22 24 Q26 28 32 32" fill="url(#iceWing)" stroke="#0288d1" stroke-width="1"/>
    <path d="M32 48 Q46 36 50 24 Q46 20 42 24 Q38 28 32 32" fill="url(#iceWing)" stroke="#0288d1" stroke-width="1"/>
    <ellipse cx="32" cy="28" rx="6" ry="10" fill="url(#icePhoenixGrad)" stroke="#0288d1" stroke-width="1"/>
    <circle cx="30" cy="24" r="1.5" fill="#01579b"/>
    <circle cx="34" cy="24" r="1.5" fill="#01579b"/>
    <path d="M32 18 L32 10" stroke="#81d4fa" stroke-width="3" stroke-linecap="round"/>
    <path d="M26 14 Q32 6 38 14" fill="none" stroke="#e1f5fe" stroke-width="2" stroke-linecap="round"/>
    <!-- 冰晶 -->
    <path d="M20 16 L20 12 L24 14 Z" fill="#e1f5fe" opacity="0.8"/>
    <path d="M44 16 L44 12 L40 14 Z" fill="#e1f5fe" opacity="0.8"/>
    <path d="M32 6 L34 8 L32 10 L30 8 Z" fill="#fff" opacity="0.9"/>`,
    theme: "ice"
  },
  "盘龙棍": {
    svg: `<defs>
      <linearGradient id="dragonStickGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#8B4513"/>
        <stop offset="50%" style="stop-color:#A0522D"/>
        <stop offset="100%" style="stop-color:#8B4513"/>
      </linearGradient>
      <linearGradient id="dragonGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FFD700"/>
        <stop offset="100%" style="stop-color:#FFA500"/>
      </linearGradient>
    </defs>
    <rect x="28" y="12" width="6" height="40" rx="2" fill="url(#dragonStickGrad)" stroke="#5D3A1A" stroke-width="1"/>
    <!-- 龙纹 -->
    <path d="M28 18 Q32 14 36 18" fill="none" stroke="url(#dragonGold)" stroke-width="1.5"/>
    <path d="M28 24 Q32 20 36 24" fill="none" stroke="url(#dragonGold)" stroke-width="1.5"/>
    <path d="M28 30 Q32 26 36 30" fill="none" stroke="url(#dragonGold)" stroke-width="1.5"/>
    <path d="M28 36 Q32 32 36 36" fill="none" stroke="url(#dragonGold)" stroke-width="1.5"/>
    <!-- 龙头装饰 -->
    <path d="M26 12 Q32 4 38 12" fill="url(#dragonGold)" stroke="#FF8C00" stroke-width="1"/>
    <circle cx="30" cy="10" r="1" fill="#ff0000"/>
    <circle cx="34" cy="10" r="1" fill="#ff0000"/>
    <path d="M32 14 L32 12" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>`,
    theme: "dragon"
  },
  "七宝琉璃塔": {
    svg: `<defs>
      <linearGradient id="towerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#e1f5fe"/>
        <stop offset="50%" style="stop-color:#81d4fa"/>
        <stop offset="100%" style="stop-color:#4fc3f7"/>
      </linearGradient>
      <radialGradient id="towerGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff59d;stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#fff59d;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 塔身 -->
    <polygon points="32,8 38,16 36,24 32,24 28,24 26,16" fill="url(#towerGrad)" stroke="#0288d1" stroke-width="1"/>
    <polygon points="32,24 40,32 38,40 32,40 26,40 24,32" fill="url(#towerGrad)" stroke="#0288d1" stroke-width="1"/>
    <polygon points="32,40 42,50 40,56 32,56 24,56 22,50" fill="url(#towerGrad)" stroke="#0288d1" stroke-width="1"/>
    <!-- 宝珠 -->
    <circle cx="32" cy="16" r="2.5" fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
    <circle cx="28" cy="32" r="2.5" fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
    <circle cx="36" cy="32" r="2.5" fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
    <circle cx="24" cy="48" r="2.5" fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
    <circle cx="32" cy="48" r="2.5" fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
    <circle cx="40" cy="48" r="2.5" fill="#FFD700" stroke="#FFA500" stroke-width="0.5"/>
    <circle cx="32" cy="32" r="20" fill="url(#towerGlow)" opacity="0.4"/>`,
    theme: "light"
  },
  "幽冥灵猫": {
    svg: `<defs>
      <radialGradient id="catGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#4a148c"/>
        <stop offset="60%" style="stop-color:#311b92"/>
        <stop offset="100%" style="stop-color:#1a237e"/>
      </radialGradient>
      <linearGradient id="catEye" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e040fb"/>
        <stop offset="100%" style="stop-color:#aa00ff"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="34" rx="14" ry="12" fill="url(#catGrad)" stroke="#311b92" stroke-width="1.5"/>
    <!-- 耳朵 -->
    <path d="M20 26 L18 14 L26 22" fill="url(#catGrad)" stroke="#311b92" stroke-width="1" stroke-linejoin="round"/>
    <path d="M44 26 L46 14 L38 22" fill="url(#catGrad)" stroke="#311b92" stroke-width="1" stroke-linejoin="round"/>
    <!-- 眼睛 -->
    <ellipse cx="26" cy="32" rx="3" ry="4" fill="url(#catEye)" stroke="#7b1fa2" stroke-width="0.5"/>
    <ellipse cx="38" cy="32" rx="3" ry="4" fill="url(#catEye)" stroke="#7b1fa2" stroke-width="0.5"/>
    <ellipse cx="26" cy="32" rx="1" ry="2.5" fill="#000"/>
    <ellipse cx="38" cy="32" rx="1" ry="2.5" fill="#000"/>
    <!-- 暗影 -->
    <ellipse cx="32" cy="50" rx="16" ry="4" fill="#1a237e" opacity="0.3"/>`,
    theme: "dark"
  },
  "碧磷蛇皇": {
    svg: `<defs>
      <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#2e7d32"/>
        <stop offset="50%" style="stop-color:#1b5e20"/>
        <stop offset="100%" style="stop-color:#004d40"/>
      </linearGradient>
      <radialGradient id="snakeEye" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ff1744"/>
        <stop offset="100%" style="stop-color:#b71c1c"/>
      </radialGradient>
    </defs>
    <path d="M40 52 Q48 44 44 36 Q40 28 36 24 Q32 20 34 14" fill="none" stroke="url(#snakeGrad)" stroke-width="5" stroke-linecap="round"/>
    <path d="M36 24 Q32 28 28 24" fill="none" stroke="url(#snakeGrad)" stroke-width="5" stroke-linecap="round"/>
    <!-- 蛇头 -->
    <ellipse cx="34" cy="12" rx="6" ry="7" fill="url(#snakeGrad)" stroke="#1b5e20" stroke-width="1"/>
    <ellipse cx="32" cy="10" rx="2" ry="2.5" fill="url(#snakeEye)"/>
    <ellipse cx="38" cy="10" rx="2" ry="2.5" fill="url(#snakeEye)"/>
    <path d="M34 16 L32 20" stroke="#004d40" stroke-width="1.5" stroke-linecap="round"/>
    <!-- 毒液 -->
    <circle cx="32" cy="22" r="1.5" fill="#76ff03" opacity="0.7"/>
    <circle cx="30" cy="24" r="1" fill="#76ff03" opacity="0.5"/>`,
    theme: "poison"
  },
  "金龙爪": {
    svg: `<defs>
      <linearGradient id="dragonClawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FFD700"/>
        <stop offset="50%" style="stop-color:#FFA500"/>
        <stop offset="100%" style="stop-color:#FF8C00"/>
      </linearGradient>
      <linearGradient id="clawSharp" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#fff"/>
        <stop offset="100%" style="stop-color:#FFD700"/>
      </linearGradient>
    </defs>
    <!-- 爪掌 -->
    <ellipse cx="32" cy="36" rx="12" ry="10" fill="url(#dragonClawGrad)" stroke="#FF8C00" stroke-width="1.5"/>
    <!-- 爪指 -->
    <path d="M22 32 L16 14 L20 16 L24 30" fill="url(#clawSharp)" stroke="#FF8C00" stroke-width="1" stroke-linejoin="round"/>
    <path d="M28 30 L26 10 L30 12 L32 28" fill="url(#clawSharp)" stroke="#FF8C00" stroke-width="1" stroke-linejoin="round"/>
    <path d="M36 30 L38 10 L42 12 L40 28" fill="url(#clawSharp)" stroke="#FF8C00" stroke-width="1" stroke-linejoin="round"/>
    <path d="M42 32 L48 14 L44 16 L40 30" fill="url(#clawSharp)" stroke="#FF8C00" stroke-width="1" stroke-linejoin="round"/>
    <!-- 龙纹 -->
    <path d="M28 36 Q32 32 36 36" fill="none" stroke="#FF8C00" stroke-width="1.5"/>`,
    theme: "dragon"
  },
  "朱雀圣火": {
    svg: `<defs>
      <radialGradient id="suzakuGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ff6f00"/>
        <stop offset="40%" style="stop-color:#ff3d00"/>
        <stop offset="100%" style="stop-color:#dd2c00"/>
      </radialGradient>
      <linearGradient id="suzakuWing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff9800"/>
        <stop offset="100%" style="stop-color:#ff5722"/>
      </linearGradient>
    </defs>
    <!-- 身体 -->
    <ellipse cx="32" cy="32" rx="10" ry="14" fill="url(#suzakuGrad)" stroke="#bf360c" stroke-width="1"/>
    <!-- 翅膀 -->
    <path d="M22 28 Q12 20 8 28 Q14 36 22 32" fill="url(#suzakuWing)" stroke="#bf360c" stroke-width="1"/>
    <path d="M42 28 Q52 20 56 28 Q50 36 42 32" fill="url(#suzakuWing)" stroke="#bf360c" stroke-width="1"/>
    <!-- 头部 -->
    <circle cx="32" cy="18" r="6" fill="#ff9800" stroke="#bf360c" stroke-width="1"/>
    <circle cx="30" cy="16" r="1.5" fill="#000"/>
    <circle cx="34" cy="16" r="1.5" fill="#000"/>
    <!-- 尾羽 -->
    <path d="M28 46 Q24 54 28 58" fill="none" stroke="#ff5722" stroke-width="2" stroke-linecap="round"/>
    <path d="M32 46 Q32 56 32 60" fill="none" stroke="#ff5722" stroke-width="2" stroke-linecap="round"/>
    <path d="M36 46 Q40 54 36 58" fill="none" stroke="#ff5722" stroke-width="2" stroke-linecap="round"/>
    <!-- 火焰 -->
    <circle cx="20" cy="14" r="2" fill="#ff9800" opacity="0.7"/>
    <circle cx="44" cy="14" r="2" fill="#ff9800" opacity="0.7"/>`,
    theme: "fire"
  },
  "玄武神盾": {
    svg: `<defs>
      <radialGradient id="turtleShieldGrad" cx="40%" cy="40%">
        <stop offset="0%" style="stop-color:#4fc3f7"/>
        <stop offset="60%" style="stop-color:#0288d1"/>
        <stop offset="100%" style="stop-color:#01579b"/>
      </radialGradient>
      <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#81d4fa"/>
        <stop offset="100%" style="stop-color:#4fc3f7"/>
      </linearGradient>
    </defs>
    <!-- 盾牌 -->
    <path d="M32 8 Q48 8 52 20 Q52 40 32 52 Q12 40 12 20 Q16 8 32 8 Z" fill="url(#turtleShieldGrad)" stroke="url(#shieldBorder)" stroke-width="2"/>
    <!-- 龟纹 -->
    <path d="M32 14 Q42 14 44 22 Q44 34 32 44 Q20 34 20 22 Q22 14 32 14 Z" fill="none" stroke="#81d4fa" stroke-width="1.5"/>
    <line x1="32" y1="14" x2="32" y2="44" stroke="#81d4fa" stroke-width="1"/>
    <line x1="20" y1="22" x2="44" y2="22" stroke="#81d4fa" stroke-width="1"/>
    <line x1="22" y1="34" x2="42" y2="34" stroke="#81d4fa" stroke-width="1"/>
    <!-- 中心宝石 -->
    <circle cx="32" cy="28" r="5" fill="#e1f5fe" stroke="#81d4fa" stroke-width="1"/>
    <circle cx="32" cy="28" r="2" fill="#0288d1"/>`,
    theme: "water"
  },
  "白鹤翎羽": {
    svg: `<defs>
      <linearGradient id="craneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fff"/>
        <stop offset="50%" style="stop-color:#f5f5f5"/>
        <stop offset="100%" style="stop-color:#e0e0e0"/>
      </linearGradient>
      <linearGradient id="craneWing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e1f5fe"/>
        <stop offset="100%" style="stop-color:#b3e5fc"/>
      </linearGradient>
    </defs>
    <!-- 身体 -->
    <ellipse cx="32" cy="30" rx="8" ry="14" fill="url(#craneGrad)" stroke="#bdbdbd" stroke-width="1"/>
    <!-- 翅膀 -->
    <path d="M24 24 Q14 16 10 24 Q16 32 24 28" fill="url(#craneWing)" stroke="#90caf9" stroke-width="1"/>
    <path d="M40 24 Q50 16 54 24 Q48 32 40 28" fill="url(#craneWing)" stroke="#90caf9" stroke-width="1"/>
    <!-- 头部 -->
    <circle cx="32" cy="14" r="5" fill="#fff" stroke="#bdbdbd" stroke-width="1"/>
    <circle cx="30" cy="12" r="1.5" fill="#000"/>
    <path d="M32 14 L38 12 L36 16 Z" fill="#ff7043" stroke="#e64a19" stroke-width="0.5"/>
    <!-- 腿 -->
    <path d="M28 44 L28 52" stroke="#ff7043" stroke-width="2" stroke-linecap="round"/>
    <path d="M36 44 L36 52" stroke="#ff7043" stroke-width="2" stroke-linecap="round"/>
    <!-- 翎羽 -->
    <path d="M32 44 Q28 50 24 48" fill="none" stroke="#b3e5fc" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M32 44 Q36 50 40 48" fill="none" stroke="#b3e5fc" stroke-width="1.5" stroke-linecap="round"/>`,
    theme: "wind"
  },
  "青龙护卫": {
    svg: `<defs>
      <linearGradient id="qinglongGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4caf50"/>
        <stop offset="50%" style="stop-color:#388e3c"/>
        <stop offset="100%" style="stop-color:#2e7d32"/>
      </linearGradient>
      <linearGradient id="qinglongScale" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#81c784"/>
        <stop offset="100%" style="stop-color:#4caf50"/>
      </linearGradient>
    </defs>
    <!-- 龙身 -->
    <path d="M16 36 Q24 28 32 32 Q40 36 48 28" fill="none" stroke="url(#qinglongGrad)" stroke-width="6" stroke-linecap="round"/>
    <!-- 龙头 -->
    <ellipse cx="16" cy="36" rx="7" ry="6" fill="url(#qinglongGrad)" stroke="#2e7d32" stroke-width="1"/>
    <circle cx="13" cy="34" r="1.5" fill="#ffeb3b"/>
    <circle cx="19" cy="34" r="1.5" fill="#ffeb3b"/>
    <path d="M10 38 Q6 42 10 44" fill="none" stroke="#2e7d32" stroke-width="2" stroke-linecap="round"/>
    <!-- 龙角 -->
    <path d="M12 30 L10 22" stroke="#388e3c" stroke-width="2" stroke-linecap="round"/>
    <path d="M18 30 L20 22" stroke="#388e3c" stroke-width="2" stroke-linecap="round"/>
    <!-- 龙鳞 -->
    <circle cx="24" cy="30" r="2" fill="url(#qinglongScale)"/>
    <circle cx="32" cy="33" r="2" fill="url(#qinglongScale)"/>
    <circle cx="40" cy="31" r="2" fill="url(#qinglongScale)"/>`,
    theme: "dragon"
  },
  "冰火蛟龙": {
    svg: `<defs>
      <linearGradient id="iceFireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#4fc3f7"/>
        <stop offset="45%" style="stop-color:#81d4fa"/>
        <stop offset="55%" style="stop-color:#ff9800"/>
        <stop offset="100%" style="stop-color:#ff5722"/>
      </linearGradient>
      <linearGradient id="iceFireBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4fc3f7"/>
        <stop offset="50%" style="stop-color:#e1f5fe"/>
        <stop offset="50%" style="stop-color:#fff3e0"/>
        <stop offset="100%" style="stop-color:#ff9800"/>
      </linearGradient>
    </defs>
    <!-- 龙身 -->
    <path d="M14 40 Q24 28 32 32 Q40 36 50 24" fill="none" stroke="url(#iceFireGrad)" stroke-width="5" stroke-linecap="round"/>
    <!-- 龙头（火侧） -->
    <ellipse cx="50" cy="24" rx="6" ry="5" fill="#ff5722" stroke="#e64a19" stroke-width="1"/>
    <circle cx="52" cy="22" r="1.5" fill="#ffeb3b"/>
    <path d="M54 24 L58 22 L56 26 Z" fill="#ff9800"/>
    <!-- 龙尾（冰侧） -->
    <ellipse cx="14" cy="40" rx="5" ry="4" fill="#4fc3f7" stroke="#0288d1" stroke-width="1"/>
    <path d="M10 42 L6 44 L8 40 Z" fill="#81d4fa"/>
    <!-- 冰火交界 -->
    <circle cx="32" cy="32" r="4" fill="url(#iceFireBody)" stroke="#fff" stroke-width="1"/>`,
    theme: "elemental"
  },
  "雷电狼王": {
    svg: `<defs>
      <linearGradient id="wolfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#5c6bc0"/>
        <stop offset="50%" style="stop-color:#3949ab"/>
        <stop offset="100%" style="stop-color:#283593"/>
      </linearGradient>
      <linearGradient id="thunderEye" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ffeb3b"/>
        <stop offset="100%" style="stop-color:#ffc107"/>
      </linearGradient>
    </defs>
    <!-- 狼身 -->
    <ellipse cx="32" cy="34" rx="14" ry="10" fill="url(#wolfGrad)" stroke="#283593" stroke-width="1.5"/>
    <!-- 头部 -->
    <ellipse cx="20" cy="28" rx="8" ry="7" fill="url(#wolfGrad)" stroke="#283593" stroke-width="1"/>
    <!-- 耳朵 -->
    <path d="M14 22 L12 14 L18 20" fill="#3949ab" stroke="#283593" stroke-width="1" stroke-linejoin="round"/>
    <path d="M24 22 L26 14 L20 20" fill="#3949ab" stroke="#283593" stroke-width="1" stroke-linejoin="round"/>
    <!-- 眼睛 -->
    <ellipse cx="17" cy="27" rx="2" ry="2.5" fill="url(#thunderEye)"/>
    <ellipse cx="23" cy="27" rx="2" ry="2.5" fill="url(#thunderEye)"/>
    <!-- 雷电 -->
    <path d="M44 16 L40 24 L46 26 L42 34" fill="none" stroke="#ffeb3b" stroke-width="2" stroke-linejoin="round"/>
    <path d="M48 20 L46 26 L50 28" fill="none" stroke="#ffeb3b" stroke-width="1.5" stroke-linejoin="round"/>
    <!-- 尾巴 -->
    <path d="M46 34 Q54 30 52 22" fill="none" stroke="#3949ab" stroke-width="3" stroke-linecap="round"/>`,
    theme: "thunder"
  },
  "幽灵蝶": {
    svg: `<defs>
      <radialGradient id="ghostButterflyGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#e1bee7;stop-opacity:0.8"/>
        <stop offset="60%" style="stop-color:#ce93d8;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#ba68c8;stop-opacity:0.3"/>
      </radialGradient>
      <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f3e5f5;stop-opacity:0.9"/>
        <stop offset="100%" style="stop-color:#ce93d8;stop-opacity:0.5"/>
      </linearGradient>
    </defs>
    <!-- 翅膀 -->
    <path d="M32 28 Q18 18 14 28 Q18 40 32 32" fill="url(#wingGrad)" stroke="#9c27b0" stroke-width="1" opacity="0.8"/>
    <path d="M32 28 Q46 18 50 28 Q46 40 32 32" fill="url(#wingGrad)" stroke="#9c27b0" stroke-width="1" opacity="0.8"/>
    <path d="M32 32 Q20 38 18 46 Q24 48 32 36" fill="url(#wingGrad)" stroke="#9c27b0" stroke-width="1" opacity="0.6"/>
    <path d="M32 32 Q44 38 46 46 Q40 48 32 36" fill="url(#wingGrad)" stroke="#9c27b0" stroke-width="1" opacity="0.6"/>
    <!-- 身体 -->
    <ellipse cx="32" cy="32" rx="2" ry="8" fill="#9c27b0" opacity="0.8"/>
    <!-- 光晕 -->
    <circle cx="32" cy="32" r="18" fill="url(#ghostButterflyGrad)" opacity="0.3"/>`,
    theme: "spirit"
  },
  "赤炎狮王": {
    svg: `<defs>
      <radialGradient id="fireLionGrad" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#ff9800"/>
        <stop offset="60%" style="stop-color:#f57c00"/>
        <stop offset="100%" style="stop-color:#e65100"/>
      </radialGradient>
      <linearGradient id="maneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff5722"/>
        <stop offset="100%" style="stop-color:#bf360c"/>
      </linearGradient>
    </defs>
    <!-- 鬃毛 -->
    <circle cx="32" cy="26" r="14" fill="url(#maneGrad)" opacity="0.8"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="28" rx="10" ry="9" fill="url(#fireLionGrad)" stroke="#e65100" stroke-width="1"/>
    <!-- 面部 -->
    <circle cx="28" cy="26" r="2" fill="#3e2723"/>
    <circle cx="36" cy="26" r="2" fill="#3e2723"/>
    <ellipse cx="32" cy="32" rx="4" ry="3" fill="#ffcc80" opacity="0.6"/>
    <!-- 火焰 -->
    <path d="M18 20 Q16 12 20 10" fill="none" stroke="#ff5722" stroke-width="2" stroke-linecap="round"/>
    <path d="M46 20 Q48 12 44 10" fill="none" stroke="#ff5722" stroke-width="2" stroke-linecap="round"/>
    <path d="M32 12 Q32 6 34 8" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round"/>`,
    theme: "fire"
  },
  "碧海银鲸": {
    svg: `<defs>
      <linearGradient id="whaleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e3f2fd"/>
        <stop offset="50%" style="stop-color:#90caf9"/>
        <stop offset="100%" style="stop-color:#42a5f5"/>
      </linearGradient>
      <linearGradient id="whaleBelly" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#fff"/>
        <stop offset="100%" style="stop-color:#e3f2fd"/>
      </linearGradient>
    </defs>
    <!-- 身体 -->
    <path d="M48 36 Q52 30 48 26 Q36 22 24 26 Q16 30 14 36 Q16 42 24 44 Q36 46 48 44 Q52 42 48 36 Z" fill="url(#whaleGrad)" stroke="#1976d2" stroke-width="1.5"/>
    <!-- 腹部 -->
    <path d="M24 44 Q36 46 48 44" fill="none" stroke="#e3f2fd" stroke-width="2"/>
    <!-- 尾巴 -->
    <path d="M48 36 Q56 32 54 28" fill="none" stroke="#42a5f5" stroke-width="3" stroke-linecap="round"/>
    <path d="M48 36 Q56 40 54 44" fill="none" stroke="#42a5f5" stroke-width="3" stroke-linecap="round"/>
    <!-- 眼睛 -->
    <circle cx="22" cy="30" r="2" fill="#1976d2"/>
    <circle cx="22" cy="30" r="0.8" fill="#fff"/>
    <!-- 喷水 -->
    <path d="M16 26 Q14 18 18 14" fill="none" stroke="#90caf9" stroke-width="2" stroke-linecap="round"/>
    <path d="M16 26 Q12 20 10 16" fill="none" stroke="#90caf9" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="18" cy="14" r="2" fill="#e3f2fd" opacity="0.8"/>`,
    theme: "water"
  },
  "紫电金鹰": {
    svg: `<defs>
      <linearGradient id="thunderEagleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#7e57c2"/>
        <stop offset="50%" style="stop-color:#5e35b1"/>
        <stop offset="100%" style="stop-color:#4527a0"/>
      </linearGradient>
      <linearGradient id="eagleWing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#b39ddb"/>
        <stop offset="100%" style="stop-color:#7e57c2"/>
      </linearGradient>
    </defs>
    <!-- 翅膀 -->
    <path d="M30 30 Q18 22 12 28 Q18 38 30 34" fill="url(#eagleWing)" stroke="#5e35b1" stroke-width="1"/>
    <path d="M34 30 Q46 22 52 28 Q46 38 34 34" fill="url(#eagleWing)" stroke="#5e35b1" stroke-width="1"/>
    <!-- 身体 -->
    <ellipse cx="32" cy="32" rx="6" ry="10" fill="url(#thunderEagleGrad)" stroke="#4527a0" stroke-width="1"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="20" rx="5" ry="6" fill="#5e35b1" stroke="#4527a0" stroke-width="1"/>
    <circle cx="30" cy="18" r="1.5" fill="#ffeb3b"/>
    <path d="M32 20 L36 18 L34 22 Z" fill="#ff7043"/>
    <!-- 雷电 -->
    <path d="M14 16 L10 24 L16 26 L12 34" fill="none" stroke="#ffeb3b" stroke-width="2" stroke-linejoin="round"/>
    <path d="M50 16 L54 24 L48 26 L52 34" fill="none" stroke="#ffeb3b" stroke-width="2" stroke-linejoin="round"/>`,
    theme: "thunder"
  },
  "幽影黑豹": {
    svg: `<defs>
      <radialGradient id="shadowPantherGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#424242"/>
        <stop offset="60%" style="stop-color:#212121"/>
        <stop offset="100%" style="stop-color:#000"/>
      </radialGradient>
      <radialGradient id="pantherEye" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ff1744"/>
        <stop offset="100%" style="stop-color:#b71c1c"/>
      </radialGradient>
    </defs>
    <!-- 身体 -->
    <ellipse cx="32" cy="34" rx="14" ry="10" fill="url(#shadowPantherGrad)" stroke="#000" stroke-width="1.5"/>
    <!-- 头部 -->
    <ellipse cx="20" cy="28" rx="8" ry="7" fill="#212121" stroke="#000" stroke-width="1"/>
    <!-- 耳朵 -->
    <path d="M14 22 L12 14 L18 20" fill="#212121" stroke="#000" stroke-width="1" stroke-linejoin="round"/>
    <path d="M24 22 L26 14 L20 20" fill="#212121" stroke="#000" stroke-width="1" stroke-linejoin="round"/>
    <!-- 眼睛 -->
    <ellipse cx="17" cy="27" rx="2" ry="2.5" fill="url(#pantherEye)"/>
    <ellipse cx="23" cy="27" rx="2" ry="2.5" fill="url(#pantherEye)"/>
    <!-- 暗影 -->
    <ellipse cx="32" cy="48" rx="18" ry="4" fill="#000" opacity="0.4"/>
    <!-- 速度线 -->
    <path d="M46 30 L54 28" stroke="#9e9e9e" stroke-width="1" opacity="0.5"/>
    <path d="M48 34 L56 32" stroke="#9e9e9e" stroke-width="1" opacity="0.5"/>`,
    theme: "dark"
  },
  "碎星陨铁": {
    svg: `<defs>
      <radialGradient id="meteorGrad" cx="40%" cy="40%">
        <stop offset="0%" style="stop-color:#78909c"/>
        <stop offset="50%" style="stop-color:#546e7a"/>
        <stop offset="100%" style="stop-color:#37474f"/>
      </radialGradient>
      <radialGradient id="starGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff176;stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#fff176;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 陨石主体 -->
    <path d="M24 48 L18 36 L22 22 L34 16 L46 24 L48 38 L42 48 Z" fill="url(#meteorGrad)" stroke="#263238" stroke-width="1.5" stroke-linejoin="round"/>
    <!-- 裂缝 -->
    <path d="M22 22 L30 28 L34 16" fill="none" stroke="#fff176" stroke-width="1.5" opacity="0.8"/>
    <path d="M30 28 L42 32 L46 24" fill="none" stroke="#fff176" stroke-width="1" opacity="0.6"/>
    <path d="M30 28 L28 40 L42 32" fill="none" stroke="#fff176" stroke-width="1" opacity="0.6"/>
    <!-- 星光 -->
    <circle cx="16" cy="14" r="2" fill="#fff176" opacity="0.8"/>
    <circle cx="48" cy="12" r="1.5" fill="#fff176" opacity="0.6"/>
    <circle cx="52" cy="28" r="1" fill="#fff176" opacity="0.5"/>
    <!-- 尾迹 -->
    <path d="M18 18 Q10 10 8 14" fill="none" stroke="#fff176" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
    <circle cx="32" cy="32" r="22" fill="url(#starGlow)" opacity="0.2"/>`,
    theme: "star"
  },
  // ──── 史诗品质 Epic ────
  "蓝电霸王龙": {
    svg: `<defs>
      <radialGradient id="blueThunderDragonGrad" cx="40%" cy="40%">
        <stop offset="0%" style="stop-color:#42a5f5"/>
        <stop offset="60%" style="stop-color:#1976d2"/>
        <stop offset="100%" style="stop-color:#0d47a1"/>
      </radialGradient>
      <linearGradient id="thunderScale" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#90caf9"/>
        <stop offset="100%" style="stop-color:#42a5f5"/>
      </linearGradient>
    </defs>
    <!-- 龙身 -->
    <path d="M14 38 Q24 26 32 30 Q40 34 50 22" fill="none" stroke="url(#blueThunderDragonGrad)" stroke-width="6" stroke-linecap="round"/>
    <!-- 龙头 -->
    <ellipse cx="14" cy="38" rx="8" ry="7" fill="url(#blueThunderDragonGrad)" stroke="#0d47a1" stroke-width="1.5"/>
    <circle cx="11" cy="36" r="2" fill="#ffeb3b"/>
    <circle cx="17" cy="36" r="2" fill="#ffeb3b"/>
    <path d="M8 40 Q4 44 8 46" fill="none" stroke="#0d47a1" stroke-width="2" stroke-linecap="round"/>
    <!-- 龙角 -->
    <path d="M10 32 L8 22" stroke="#1976d2" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M16 32 L18 22" stroke="#1976d2" stroke-width="2.5" stroke-linecap="round"/>
    <!-- 雷电 -->
    <path d="M52 14 L48 22 L54 24 L50 32" fill="none" stroke="#ffeb3b" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M56 18 L54 24 L58 26" fill="none" stroke="#ffeb3b" stroke-width="2" stroke-linejoin="round"/>
    <!-- 龙鳞 -->
    <circle cx="24" cy="28" r="2.5" fill="url(#thunderScale)"/>
    <circle cx="32" cy="31" r="2.5" fill="url(#thunderScale)"/>
    <circle cx="40" cy="27" r="2.5" fill="url(#thunderScale)"/>`,
    theme: "dragon"
  },
  "昊天锤": {
    svg: `<defs>
      <linearGradient id="haotianGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#424242"/>
        <stop offset="50%" style="stop-color:#212121"/>
        <stop offset="100%" style="stop-color:#000"/>
      </linearGradient>
      <radialGradient id="hammerGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffeb3b;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#ffeb3b;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 锤头 -->
    <rect x="16" y="12" width="32" height="24" rx="3" fill="url(#haotianGrad)" stroke="#000" stroke-width="2"/>
    <rect x="20" y="16" width="24" height="16" rx="2" fill="#424242" stroke="#616161" stroke-width="1"/>
    <!-- 锤柄 -->
    <rect x="28" y="36" width="8" height="20" rx="2" fill="#5d4037" stroke="#3e2723" stroke-width="1.5"/>
    <!-- 符文 -->
    <path d="M24 20 L28 24 L24 28" fill="none" stroke="#ffeb3b" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M40 20 L36 24 L40 28" fill="none" stroke="#ffeb3b" stroke-width="1.5" stroke-linejoin="round"/>
    <circle cx="32" cy="24" r="3" fill="none" stroke="#ffeb3b" stroke-width="1"/>
    <!-- 光晕 -->
    <circle cx="32" cy="24" r="24" fill="url(#hammerGlow)" opacity="0.4"/>`,
    theme: "chaos"
  },
  "六翼天使": {
    svg: `<defs>
      <radialGradient id="seraphGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff9c4"/>
        <stop offset="40%" style="stop-color:#fff176"/>
        <stop offset="100%" style="stop-color:#ffd54f"/>
      </radialGradient>
      <linearGradient id="wingLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fff"/>
        <stop offset="50%" style="stop-color:#fff9c4"/>
        <stop offset="100%" style="stop-color:#fff176"/>
      </linearGradient>
    </defs>
    <!-- 翅膀（上） -->
    <path d="M32 24 Q16 12 10 20 Q16 28 32 24" fill="url(#wingLight)" stroke="#ffd54f" stroke-width="1"/>
    <path d="M32 24 Q48 12 54 20 Q48 28 32 24" fill="url(#wingLight)" stroke="#ffd54f" stroke-width="1"/>
    <!-- 翅膀（中） -->
    <path d="M32 30 Q14 22 8 30 Q14 38 32 30" fill="url(#wingLight)" stroke="#ffd54f" stroke-width="1" opacity="0.9"/>
    <path d="M32 30 Q50 22 56 30 Q50 38 32 30" fill="url(#wingLight)" stroke="#ffd54f" stroke-width="1" opacity="0.9"/>
    <!-- 翅膀（下） -->
    <path d="M32 36 Q16 32 12 40 Q18 46 32 36" fill="url(#wingLight)" stroke="#ffd54f" stroke-width="1" opacity="0.8"/>
    <path d="M32 36 Q48 32 52 40 Q46 46 32 36" fill="url(#wingLight)" stroke="#ffd54f" stroke-width="1" opacity="0.8"/>
    <!-- 身体 -->
    <ellipse cx="32" cy="30" rx="5" ry="12" fill="url(#seraphGrad)" stroke="#ffd54f" stroke-width="1"/>
    <!-- 光环 -->
    <ellipse cx="32" cy="14" rx="8" ry="3" fill="none" stroke="#ffd54f" stroke-width="1.5" opacity="0.8"/>
    <circle cx="32" cy="30" r="22" fill="url(#seraphGrad)" opacity="0.2"/>`,
    theme: "holy"
  },
  "泰坦巨猿": {
    svg: `<defs>
      <radialGradient id="titanApeGrad" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#8d6e63"/>
        <stop offset="60%" style="stop-color:#6d4c41"/>
        <stop offset="100%" style="stop-color:#4e342e"/>
      </radialGradient>
      <radialGradient id="apeEye" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ff7043"/>
        <stop offset="100%" style="stop-color:#d84315"/>
      </radialGradient>
    </defs>
    <!-- 身体 -->
    <ellipse cx="32" cy="36" rx="16" ry="14" fill="url(#titanApeGrad)" stroke="#4e342e" stroke-width="2"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="20" rx="12" ry="11" fill="#6d4c41" stroke="#4e342e" stroke-width="1.5"/>
    <!-- 面部 -->
    <ellipse cx="32" cy="24" rx="8" ry="6" fill="#a1887f" opacity="0.5"/>
    <circle cx="27" cy="18" r="3" fill="url(#apeEye)"/>
    <circle cx="37" cy="18" r="3" fill="url(#apeEye)"/>
    <ellipse cx="27" cy="18" rx="1" ry="2" fill="#000"/>
    <ellipse cx="37" cy="18" rx="1" ry="2" fill="#000"/>
    <!-- 肌肉线条 -->
    <path d="M20 36 Q16 44 20 48" fill="none" stroke="#4e342e" stroke-width="2" stroke-linecap="round"/>
    <path d="M44 36 Q48 44 44 48" fill="none" stroke="#4e342e" stroke-width="2" stroke-linecap="round"/>
    <!-- 力量波纹 -->
    <path d="M12 30 Q8 36 12 42" fill="none" stroke="#ff7043" stroke-width="1.5" opacity="0.6"/>
    <path d="M52 30 Q56 36 52 42" fill="none" stroke="#ff7043" stroke-width="1.5" opacity="0.6"/>`,
    theme: "beast"
  },
  "噬魂蛛皇": {
    svg: `<defs>
      <radialGradient id="soulSpiderGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#7b1fa2"/>
        <stop offset="60%" style="stop-color:#4a148c"/>
        <stop offset="100%" style="stop-color:#311b92"/>
      </radialGradient>
      <radialGradient id="spiderEye" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#e040fb"/>
        <stop offset="100%" style="stop-color:#aa00ff"/>
      </radialGradient>
    </defs>
    <!-- 身体 -->
    <ellipse cx="32" cy="36" rx="10" ry="8" fill="url(#soulSpiderGrad)" stroke="#311b92" stroke-width="1.5"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="22" rx="7" ry="6" fill="#4a148c" stroke="#311b92" stroke-width="1"/>
    <!-- 眼睛（8只） -->
    <circle cx="28" cy="20" r="1.5" fill="url(#spiderEye)"/>
    <circle cx="32" cy="18" r="1.5" fill="url(#spiderEye)"/>
    <circle cx="36" cy="20" r="1.5" fill="url(#spiderEye)"/>
    <circle cx="26" cy="22" r="1" fill="url(#spiderEye)"/>
    <circle cx="38" cy="22" r="1" fill="url(#spiderEye)"/>
    <!-- 腿 -->
    <path d="M24 32 L14 24 L10 28" fill="none" stroke="#4a148c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 36 L10 36 L8 32" fill="none" stroke="#4a148c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M24 40 L14 48 L10 44" fill="none" stroke="#4a148c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M40 32 L50 24 L54 28" fill="none" stroke="#4a148c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M42 36 L54 36 L56 32" fill="none" stroke="#4a148c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M40 40 L50 48 L54 44" fill="none" stroke="#4a148c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- 蛛网 -->
    <path d="M14 14 Q32 8 50 14" fill="none" stroke="#e1bee7" stroke-width="0.8" opacity="0.5"/>
    <path d="M14 14 Q10 32 14 50" fill="none" stroke="#e1bee7" stroke-width="0.8" opacity="0.5"/>`,
    theme: "spirit"
  },
  "死亡蛛皇": {
    svg: `<defs>
      <radialGradient id="deathSpiderGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#37474f"/>
        <stop offset="60%" style="stop-color:#263238"/>
        <stop offset="100%" style="stop-color:#000"/>
      </radialGradient>
      <radialGradient id="deathEye" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ff1744"/>
        <stop offset="100%" style="stop-color:#b71c1c"/>
      </radialGradient>
    </defs>
    <!-- 身体 -->
    <ellipse cx="32" cy="36" rx="11" ry="9" fill="url(#deathSpiderGrad)" stroke="#000" stroke-width="1.5"/>
    <!-- 骷髅标记 -->
    <circle cx="32" cy="36" r="5" fill="#263238" stroke="#455a64" stroke-width="1"/>
    <circle cx="30" cy="34" r="1.2" fill="#ff1744"/>
    <circle cx="34" cy="34" r="1.2" fill="#ff1744"/>
    <path d="M30 38 Q32 40 34 38" fill="none" stroke="#ff1744" stroke-width="1"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="20" rx="8" ry="7" fill="#263238" stroke="#000" stroke-width="1"/>
    <circle cx="28" cy="18" r="2.5" fill="url(#deathEye)"/>
    <circle cx="36" cy="18" r="2.5" fill="url(#deathEye)"/>
    <!-- 镰刀状前腿 -->
    <path d="M22 28 L10 16 L8 22" fill="none" stroke="#37474f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M42 28 L54 16 L56 22" fill="none" stroke="#37474f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- 死亡气息 -->
    <circle cx="16" cy="12" r="2" fill="#455a64" opacity="0.5"/>
    <circle cx="48" cy="12" r="2" fill="#455a64" opacity="0.5"/>
    <circle cx="32" cy="8" r="2.5" fill="#455a64" opacity="0.4"/>`,
    theme: "death"
  },
  "冰碧帝皇蝎": {
    svg: `<defs>
      <linearGradient id="iceEmperorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4fc3f7"/>
        <stop offset="50%" style="stop-color:#0288d1"/>
        <stop offset="100%" style="stop-color:#01579b"/>
      </linearGradient>
      <linearGradient id="scorpionTail" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e1f5fe"/>
        <stop offset="100%" style="stop-color:#4fc3f7"/>
      </linearGradient>
    </defs>
    <!-- 身体 -->
    <ellipse cx="32" cy="36" rx="10" ry="8" fill="url(#iceEmperorGrad)" stroke="#01579b" stroke-width="1.5"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="22" rx="7" ry="6" fill="#0288d1" stroke="#01579b" stroke-width="1"/>
    <!-- 眼睛 -->
    <ellipse cx="29" cy="20" rx="2" ry="2.5" fill="#ff1744"/>
    <ellipse cx="35" cy="20" rx="2" ry="2.5" fill="#ff1744"/>
    <!-- 钳子 -->
    <path d="M24 26 L16 18 L18 24" fill="none" stroke="url(#iceEmperorGrad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M40 26 L48 18 L46 24" fill="none" stroke="url(#iceEmperorGrad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- 尾巴 -->
    <path d="M32 44 Q36 52 44 48 Q48 44 44 40" fill="none" stroke="url(#scorpionTail)" stroke-width="3" stroke-linecap="round"/>
    <path d="M44 40 L46 36" stroke="#ff1744" stroke-width="2" stroke-linecap="round"/>
    <!-- 冰晶 -->
    <path d="M16 14 L18 10 L20 14 Z" fill="#e1f5fe" opacity="0.8"/>
    <path d="M44 14 L46 10 L48 14 Z" fill="#e1f5fe" opacity="0.8"/>`,
    theme: "ice"
  },
  "烈火剑圣": {
    svg: `<defs>
      <linearGradient id="fireSwordGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff5722"/>
        <stop offset="50%" style="stop-color:#ff9800"/>
        <stop offset="100%" style="stop-color:#ffc107"/>
      </linearGradient>
      <linearGradient id="swordBlade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#fff"/>
        <stop offset="50%" style="stop-color:#ffeb3b"/>
        <stop offset="100%" style="stop-color:#ff9800"/>
      </linearGradient>
    </defs>
    <!-- 剑身 -->
    <path d="M30 8 L34 8 L34 44 L32 48 L30 44 Z" fill="url(#swordBlade)" stroke="#e65100" stroke-width="1"/>
    <path d="M32 8 L32 48" stroke="#fff" stroke-width="1" opacity="0.6"/>
    <!-- 剑柄 -->
    <rect x="29" y="48" width="6" height="8" rx="1" fill="#5d4037" stroke="#3e2723" stroke-width="1"/>
    <rect x="26" y="50" width="12" height="3" rx="1" fill="#ff9800" stroke="#e65100" stroke-width="0.5"/>
    <!-- 护手 -->
    <path d="M24 44 Q32 40 40 44" fill="none" stroke="#ff5722" stroke-width="2" stroke-linecap="round"/>
    <!-- 火焰 -->
    <path d="M26 14 Q22 10 24 6" fill="none" stroke="#ff5722" stroke-width="2" stroke-linecap="round"/>
    <path d="M38 14 Q42 10 40 6" fill="none" stroke="#ff5722" stroke-width="2" stroke-linecap="round"/>
    <circle cx="24" cy="6" r="2" fill="#ff9800" opacity="0.8"/>
    <circle cx="40" cy="6" r="2" fill="#ff9800" opacity="0.8"/>
    <!-- 火焰光环 -->
    <ellipse cx="32" cy="28" rx="16" ry="18" fill="url(#fireSwordGrad)" opacity="0.15"/>`,
    theme: "fire"
  },
  "星辰神兽": {
    svg: `<defs>
      <radialGradient id="starBeastGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff59d"/>
        <stop offset="40%" style="stop-color:#fff176"/>
        <stop offset="100%" style="stop-color:#ffd54f"/>
      </radialGradient>
      <radialGradient id="starGlow2" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#fff176;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 身体 -->
    <ellipse cx="32" cy="34" rx="12" ry="10" fill="url(#starBeastGrad)" stroke="#f9a825" stroke-width="1.5"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="20" rx="9" ry="8" fill="#fff176" stroke="#f9a825" stroke-width="1"/>
    <!-- 角 -->
    <path d="M26 14 L22 6 L28 12" fill="#ffd54f" stroke="#f9a825" stroke-width="1" stroke-linejoin="round"/>
    <path d="M38 14 L42 6 L36 12" fill="#ffd54f" stroke="#f9a825" stroke-width="1" stroke-linejoin="round"/>
    <!-- 眼睛 -->
    <circle cx="28" cy="18" r="2" fill="#3e2723"/>
    <circle cx="36" cy="18" r="2" fill="#3e2723"/>
    <!-- 星星 -->
    <path d="M16 12 L17 15 L20 15 L18 17 L19 20 L16 18 L13 20 L14 17 L12 15 L15 15 Z" fill="#fff"/>
    <path d="M48 10 L49 13 L52 13 L50 15 L51 18 L48 16 L45 18 L46 15 L44 13 L47 13 Z" fill="#fff"/>
    <path d="M52 28 L53 31 L56 31 L54 33 L55 36 L52 34 L49 36 L50 33 L48 31 L51 31 Z" fill="#fff" opacity="0.7"/>
    <!-- 光环 -->
    <circle cx="32" cy="32" r="22" fill="url(#starGlow2)" opacity="0.3"/>`,
    theme: "star"
  },
  "雷霆战神": {
    svg: `<defs>
      <linearGradient id="thunderGodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#7c4dff"/>
        <stop offset="50%" style="stop-color:#651fff"/>
        <stop offset="100%" style="stop-color:#6200ea"/>
      </linearGradient>
      <linearGradient id="armorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#b39ddb"/>
        <stop offset="100%" style="stop-color:#7e57c2"/>
      </linearGradient>
    </defs>
    <!-- 身体/盔甲 -->
    <path d="M24 48 L22 32 L26 20 L32 16 L38 20 L42 32 L40 48 Z" fill="url(#thunderGodGrad)" stroke="#311b92" stroke-width="1.5" stroke-linejoin="round"/>
    <!-- 胸甲 -->
    <path d="M26 32 L32 28 L38 32 L36 40 L32 42 L28 40 Z" fill="url(#armorGrad)" stroke="#311b92" stroke-width="1"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="14" rx="7" ry="6" fill="#7c4dff" stroke="#311b92" stroke-width="1"/>
    <circle cx="30" cy="12" r="1.5" fill="#ffeb3b"/>
    <circle cx="34" cy="12" r="1.5" fill="#ffeb3b"/>
    <!-- 雷电 -->
    <path d="M14 12 L18 20 L14 24 L18 32" fill="none" stroke="#ffeb3b" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M50 12 L46 20 L50 24 L46 32" fill="none" stroke="#ffeb3b" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- 武器（雷霆之枪） -->
    <path d="M44 20 L52 12" stroke="#ffeb3b" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 14 L54 18" stroke="#ffeb3b" stroke-width="2" stroke-linecap="round"/>
    <!-- 能量 -->
    <circle cx="32" cy="30" r="20" fill="#7c4dff" opacity="0.1"/>`,
    theme: "thunder"
  },
  "极寒冰皇": {
    svg: `<defs>
      <radialGradient id="iceEmperorGrad2" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#e0f7fa"/>
        <stop offset="50%" style="stop-color:#80deea"/>
        <stop offset="100%" style="stop-color:#26c6da"/>
      </radialGradient>
      <linearGradient id="crownIce" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e1f5fe"/>
        <stop offset="100%" style="stop-color:#4fc3f7"/>
      </linearGradient>
    </defs>
    <!-- 身体 -->
    <ellipse cx="32" cy="36" rx="11" ry="12" fill="url(#iceEmperorGrad2)" stroke="#0097a7" stroke-width="1.5"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="18" rx="8" ry="7" fill="#80deea" stroke="#0097a7" stroke-width="1"/>
    <!-- 皇冠 -->
    <path d="M24 14 L28 6 L32 10 L36 6 L40 14 Z" fill="url(#crownIce)" stroke="#0288d1" stroke-width="1" stroke-linejoin="round"/>
    <circle cx="28" cy="6" r="1.5" fill="#fff"/>
    <circle cx="36" cy="6" r="1.5" fill="#fff"/>
    <circle cx="32" cy="10" r="2" fill="#fff"/>
    <!-- 眼睛 -->
    <ellipse cx="28" cy="17" rx="2" ry="2.5" fill="#01579b"/>
    <ellipse cx="36" cy="17" rx="2" ry="2.5" fill="#01579b"/>
    <!-- 冰晶 -->
    <path d="M14 14 L16 10 L18 14 Z" fill="#e1f5fe"/>
    <path d="M46 14 L48 10 L50 14 Z" fill="#e1f5fe"/>
    <path d="M32 50 L34 54 L32 56 L30 54 Z" fill="#e1f5fe"/>
    <path d="M18 44 L20 48 L18 50 L16 48 Z" fill="#e1f5fe"/>
    <path d="M46 44 L48 48 L46 50 L44 48 Z" fill="#e1f5fe"/>
    <!-- 冰霜光环 -->
    <ellipse cx="32" cy="32" rx="20" ry="20" fill="#e0f7fa" opacity="0.15"/>`,
    theme: "ice"
  },
  "焰灵骑士": {
    svg: `<defs>
      <linearGradient id="flameKnightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff7043"/>
        <stop offset="50%" style="stop-color:#f4511e"/>
        <stop offset="100%" style="stop-color:#e64a19"/>
      </linearGradient>
      <linearGradient id="knightArmor" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#ffcc80"/>
        <stop offset="100%" style="stop-color:#ff9800"/>
      </linearGradient>
    </defs>
    <!-- 盔甲身体 -->
    <path d="M24 48 L24 32 L28 22 L32 18 L36 22 L40 32 L40 48 Z" fill="url(#flameKnightGrad)" stroke="#bf360c" stroke-width="1.5" stroke-linejoin="round"/>
    <!-- 盔甲装饰 -->
    <path d="M28 32 L32 28 L36 32 L34 40 L32 42 L30 40 Z" fill="url(#knightArmor)" stroke="#e65100" stroke-width="1"/>
    <!-- 头部/头盔 -->
    <ellipse cx="32" cy="14" rx="7" ry="6" fill="#ff7043" stroke="#bf360c" stroke-width="1"/>
    <path d="M26 10 L32 6 L38 10" fill="none" stroke="#ffcc80" stroke-width="1.5" stroke-linecap="round"/>
    <!-- 眼睛 -->
    <circle cx="29" cy="14" r="1.5" fill="#ffeb3b"/>
    <circle cx="35" cy="14" r="1.5" fill="#ffeb3b"/>
    <!-- 火焰披风 -->
    <path d="M24 32 Q16 36 18 44 Q20 48 24 46" fill="#ff5722" opacity="0.6" stroke="#e64a19" stroke-width="1"/>
    <path d="M40 32 Q48 36 46 44 Q44 48 40 46" fill="#ff5722" opacity="0.6" stroke="#e64a19" stroke-width="1"/>
    <!-- 火焰剑 -->
    <path d="M44 24 L52 12" stroke="#ffeb3b" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 14 L54 18" stroke="#ffeb3b" stroke-width="2" stroke-linecap="round"/>
    <!-- 火焰粒子 -->
    <circle cx="20" cy="16" r="2" fill="#ff9800" opacity="0.7"/>
    <circle cx="44" cy="16" r="2" fill="#ff9800" opacity="0.7"/>`,
    theme: "fire"
  },
  "黄金圣龙": {
    svg: `<defs>
      <radialGradient id="goldDragonGrad" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#fff176"/>
        <stop offset="50%" style="stop-color:#ffd54f"/>
        <stop offset="100%" style="stop-color:#ffb300"/>
      </radialGradient>
      <linearGradient id="holyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fff9c4;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#fff176;stop-opacity:0"/>
      </linearGradient>
    </defs>
    <!-- 龙身 -->
    <path d="M14 36 Q24 26 32 30 Q40 34 50 24" fill="none" stroke="url(#goldDragonGrad)" stroke-width="6" stroke-linecap="round"/>
    <!-- 龙头 -->
    <ellipse cx="14" cy="36" rx="8" ry="7" fill="url(#goldDragonGrad)" stroke="#f9a825" stroke-width="1.5"/>
    <circle cx="11" cy="34" r="2" fill="#3e2723"/>
    <circle cx="17" cy="34" r="2" fill="#3e2723"/>
    <path d="M8 38 Q4 42 8 44" fill="none" stroke="#f9a825" stroke-width="2" stroke-linecap="round"/>
    <!-- 龙角 -->
    <path d="M10 30 L8 20" stroke="#ffd54f" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M16 30 L18 20" stroke="#ffd54f" stroke-width="2.5" stroke-linecap="round"/>
    <!-- 龙鳞 -->
    <circle cx="24" cy="28" r="2.5" fill="#fff176" stroke="#f9a825" stroke-width="0.5"/>
    <circle cx="32" cy="31" r="2.5" fill="#fff176" stroke="#f9a825" stroke-width="0.5"/>
    <circle cx="40" cy="27" r="2.5" fill="#fff176" stroke="#f9a825" stroke-width="0.5"/>
    <!-- 圣光 -->
    <circle cx="32" cy="32" r="24" fill="url(#holyGlow)" opacity="0.4"/>
    <!-- 星星 -->
    <path d="M12 14 L13 17 L16 17 L14 19 L15 22 L12 20 L9 22 L10 19 L8 17 L11 17 Z" fill="#fff"/>
    <path d="M52 12 L53 15 L56 15 L54 17 L55 20 L52 18 L49 20 L50 17 L48 15 L51 15 Z" fill="#fff"/>`,
    theme: "dragon"
  },
  "狂风战鹰": {
    svg: `<defs>
      <linearGradient id="windEagleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#80cbc4"/>
        <stop offset="50%" style="stop-color:#4db6ac"/>
        <stop offset="100%" style="stop-color:#009688"/>
      </linearGradient>
      <linearGradient id="windWing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#b2dfdb"/>
        <stop offset="100%" style="stop-color:#80cbc4"/>
      </linearGradient>
    </defs>
    <!-- 翅膀 -->
    <path d="M30 28 Q14 16 8 26 Q14 38 30 32" fill="url(#windWing)" stroke="#009688" stroke-width="1"/>
    <path d="M34 28 Q50 16 56 26 Q50 38 34 32" fill="url(#windWing)" stroke="#009688" stroke-width="1"/>
    <!-- 身体 -->
    <ellipse cx="32" cy="32" rx="6" ry="11" fill="url(#windEagleGrad)" stroke="#00796b" stroke-width="1"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="18" rx="5" ry="6" fill="#4db6ac" stroke="#00796b" stroke-width="1"/>
    <circle cx="30" cy="16" r="1.5" fill="#ffeb3b"/>
    <path d="M32 18 L36 16 L34 20 Z" fill="#ff7043"/>
    <!-- 风刃 -->
    <path d="M10 18 Q6 24 10 30" fill="none" stroke="#b2dfdb" stroke-width="2" stroke-linecap="round"/>
    <path d="M54 18 Q58 24 54 30" fill="none" stroke="#b2dfdb" stroke-width="2" stroke-linecap="round"/>
    <path d="M14 12 Q18 8 22 12" fill="none" stroke="#80cbc4" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M50 12 Q46 8 42 12" fill="none" stroke="#80cbc4" stroke-width="1.5" stroke-linecap="round"/>
    <!-- 风旋 -->
    <ellipse cx="32" cy="32" rx="20" ry="18" fill="#e0f2f1" opacity="0.1"/>`,
    theme: "wind"
  },
  "暗域鬼王": {
    svg: `<defs>
      <radialGradient id="ghostKingGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#546e7a"/>
        <stop offset="60%" style="stop-color:#37474f"/>
        <stop offset="100%" style="stop-color:#000"/>
      </radialGradient>
      <radialGradient id="ghostEye2" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ff1744"/>
        <stop offset="100%" style="stop-color:#b71c1c"/>
      </radialGradient>
    </defs>
    <!-- 身体 -->
    <ellipse cx="32" cy="36" rx="14" ry="12" fill="url(#ghostKingGrad)" stroke="#263238" stroke-width="1.5"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="18" rx="10" ry="9" fill="#37474f" stroke="#263238" stroke-width="1"/>
    <!-- 王冠 -->
    <path d="M22 12 L26 4 L32 8 L38 4 L42 12 Z" fill="#455a64" stroke="#263238" stroke-width="1" stroke-linejoin="round"/>
    <circle cx="26" cy="4" r="1.5" fill="#ff1744"/>
    <circle cx="38" cy="4" r="1.5" fill="#ff1744"/>
    <!-- 眼睛 -->
    <ellipse cx="27" cy="17" rx="3" ry="3.5" fill="url(#ghostEye2)"/>
    <ellipse cx="37" cy="17" rx="3" ry="3.5" fill="url(#ghostEye2)"/>
    <ellipse cx="27" cy="17" rx="1" ry="2.5" fill="#000"/>
    <ellipse cx="37" cy="17" rx="1" ry="2.5" fill="#000"/>
    <!-- 鬼火 -->
    <ellipse cx="16" cy="30" rx="3" ry="5" fill="#ff1744" opacity="0.6"/>
    <ellipse cx="48" cy="30" rx="3" ry="5" fill="#ff1744" opacity="0.6"/>
    <!-- 暗影 -->
    <ellipse cx="32" cy="52" rx="18" ry="5" fill="#000" opacity="0.5"/>`,
    theme: "death"
  },
  "极焱炎神": {
    svg: `<defs>
      <radialGradient id="volcanoGodGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ff5722"/>
        <stop offset="40%" style="stop-color:#f4511e"/>
        <stop offset="100%" style="stop-color:#bf360c"/>
      </radialGradient>
      <radialGradient id="magmaGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffeb3b;stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#ff5722;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 火山身体 -->
    <path d="M20 48 L24 32 L28 24 L32 20 L36 24 L40 32 L44 48 Z" fill="url(#volcanoGodGrad)" stroke="#bf360c" stroke-width="2" stroke-linejoin="round"/>
    <!-- 岩浆 -->
    <path d="M28 24 L32 20 L36 24 L34 30 L32 32 L30 30 Z" fill="#ffeb3b" stroke="#ff9800" stroke-width="1"/>
    <circle cx="32" cy="26" r="3" fill="#ff9800"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="14" rx="8" ry="7" fill="#ff7043" stroke="#bf360c" stroke-width="1.5"/>
    <circle cx="29" cy="12" r="2" fill="#ffeb3b"/>
    <circle cx="35" cy="12" r="2" fill="#ffeb3b"/>
    <!-- 火焰 -->
    <path d="M22 8 Q20 4 24 2" fill="none" stroke="#ff5722" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 6 Q32 0 34 2" fill="none" stroke="#ff9800" stroke-width="3" stroke-linecap="round"/>
    <path d="M42 8 Q44 4 40 2" fill="none" stroke="#ff5722" stroke-width="2.5" stroke-linecap="round"/>
    <!-- 熔岩光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#magmaGlow)" opacity="0.3"/>
    <!-- 火星 -->
    <circle cx="18" cy="16" r="1.5" fill="#ff9800" opacity="0.8"/>
    <circle cx="46" cy="18" r="1.5" fill="#ff9800" opacity="0.8"/>
    <circle cx="32" cy="4" r="2" fill="#ffeb3b" opacity="0.9"/>`,
    theme: "fire"
  },
  "时沙巨蟒": {
    svg: `<defs>
      <linearGradient id="timeSnakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#d7ccc8"/>
        <stop offset="50%" style="stop-color:#a1887f"/>
        <stop offset="100%" style="stop-color:#8d6e63"/>
      </linearGradient>
      <radialGradient id="timeEye" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffd54f"/>
        <stop offset="100%" style="stop-color:#ff8f00"/>
      </radialGradient>
    </defs>
    <!-- 身体 -->
    <path d="M46 48 Q50 40 46 32 Q42 24 38 20 Q34 16 36 10" fill="none" stroke="url(#timeSnakeGrad)" stroke-width="5" stroke-linecap="round"/>
    <path d="M38 20 Q34 24 30 20" fill="none" stroke="url(#timeSnakeGrad)" stroke-width="5" stroke-linecap="round"/>
    <!-- 头部 -->
    <ellipse cx="36" cy="10" rx="6" ry="7" fill="url(#timeSnakeGrad)" stroke="#6d4c41" stroke-width="1"/>
    <ellipse cx="34" cy="8" rx="2" ry="2.5" fill="url(#timeEye)"/>
    <ellipse cx="38" cy="8" rx="2" ry="2.5" fill="url(#timeEye)"/>
    <!-- 沙漏标记 -->
    <path d="M28 36 L32 32 L36 36 L32 40 Z" fill="#d7ccc8" stroke="#8d6e63" stroke-width="0.5"/>
    <path d="M28 36 L36 36" stroke="#8d6e63" stroke-width="0.5"/>
    <!-- 时之沙 -->
    <circle cx="24" cy="28" r="1.5" fill="#d7ccc8" opacity="0.8"/>
    <circle cx="22" cy="32" r="1" fill="#d7ccc8" opacity="0.6"/>
    <circle cx="26" cy="34" r="1.2" fill="#d7ccc8" opacity="0.7"/>
    <!-- 时钟 -->
    <circle cx="14" cy="16" r="6" fill="none" stroke="#8d6e63" stroke-width="1.5"/>
    <line x1="14" y1="16" x2="14" y2="12" stroke="#8d6e63" stroke-width="1.5"/>
    <line x1="14" y1="16" x2="17" y2="16" stroke="#8d6e63" stroke-width="1"/>`,
    theme: "time"
  },
  // ──── 传说品质 Legend ────
  "九宝琉璃塔": {
    svg: `<defs>
      <linearGradient id="nineTowerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#fff9c4"/>
        <stop offset="50%" style="stop-color:#fff176"/>
        <stop offset="100%" style="stop-color:#ffd54f"/>
      </linearGradient>
      <radialGradient id="divineGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#fff176;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 塔身 -->
    <polygon points="32,4 40,14 38,24 32,24 26,24 24,14" fill="url(#nineTowerGrad)" stroke="#f9a825" stroke-width="1"/>
    <polygon points="32,24 42,34 40,44 32,44 24,44 22,34" fill="url(#nineTowerGrad)" stroke="#f9a825" stroke-width="1"/>
    <polygon points="32,44 44,54 42,60 32,60 22,60 20,54" fill="url(#nineTowerGrad)" stroke="#f9a825" stroke-width="1"/>
    <!-- 九宝 -->
    <circle cx="32" cy="12" r="2.5" fill="#fff" stroke="#ffd54f" stroke-width="0.5"/>
    <circle cx="26" cy="32" r="2.5" fill="#fff" stroke="#ffd54f" stroke-width="0.5"/>
    <circle cx="38" cy="32" r="2.5" fill="#fff" stroke="#ffd54f" stroke-width="0.5"/>
    <circle cx="24" cy="52" r="2.5" fill="#fff" stroke="#ffd54f" stroke-width="0.5"/>
    <circle cx="32" cy="52" r="2.5" fill="#fff" stroke="#ffd54f" stroke-width="0.5"/>
    <circle cx="40" cy="52" r="2.5" fill="#fff" stroke="#ffd54f" stroke-width="0.5"/>
    <circle cx="28" cy="42" r="2" fill="#ffd54f"/>
    <circle cx="36" cy="42" r="2" fill="#ffd54f"/>
    <circle cx="32" cy="22" r="2" fill="#ffd54f"/>
    <!-- 神圣光环 -->
    <ellipse cx="32" cy="32" rx="26" ry="26" fill="url(#divineGlow)" opacity="0.4"/>
    <circle cx="32" cy="32" r="28" fill="none" stroke="#fff176" stroke-width="1" opacity="0.3" stroke-dasharray="4,4"/>`,
    theme: "holy"
  },
  "蓝银皇": {
    svg: `<defs>
      <linearGradient id="blueSilverKingGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" style="stop-color:#1a237e"/>
        <stop offset="40%" style="stop-color:#3949ab"/>
        <stop offset="100%" style="stop-color:#5c6bc0"/>
      </linearGradient>
      <radialGradient id="royalGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#9fa8da;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#3949ab;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 主茎 -->
    <path d="M32 56 Q32 32 28 16" stroke="url(#blueSilverKingGrad)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M32 56 Q32 28 32 12" stroke="url(#blueSilverKingGrad)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M32 56 Q32 32 36 16" stroke="url(#blueSilverKingGrad)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- 皇者之叶 -->
    <path d="M28 16 Q20 8 16 14 Q20 20 28 16" fill="#5c6bc0" stroke="#3949ab" stroke-width="1"/>
    <path d="M32 12 Q32 4 28 2 Q32 6 32 12" fill="#5c6bc0" stroke="#3949ab" stroke-width="1"/>
    <path d="M36 16 Q44 8 48 14 Q44 20 36 16" fill="#5c6bc0" stroke="#3949ab" stroke-width="1"/>
    <!-- 皇冠 -->
    <path d="M26 10 L32 4 L38 10" fill="none" stroke="#ffd54f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="32" cy="4" r="2" fill="#ffd54f"/>
    <!-- 蓝银光点 -->
    <circle cx="22" cy="24" r="1.5" fill="#9fa8da" opacity="0.8"/>
    <circle cx="42" cy="24" r="1.5" fill="#9fa8da" opacity="0.8"/>
    <circle cx="32" cy="8" r="2" fill="#9fa8da" opacity="0.9"/>
    <!-- 皇者光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#royalGlow)" opacity="0.3"/>
    <ellipse cx="32" cy="56" rx="8" ry="3" fill="#1a237e" opacity="0.5"/>`,
    theme: "nature"
  },
  "堕落天使": {
    svg: `<defs>
      <radialGradient id="fallenAngelGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#7b1fa2"/>
        <stop offset="50%" style="stop-color:#4a148c"/>
        <stop offset="100%" style="stop-color:#311b92"/>
      </radialGradient>
      <linearGradient id="darkWing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4a148c"/>
        <stop offset="100%" style="stop-color:#000"/>
      </linearGradient>
    </defs>
    <!-- 暗翼 -->
    <path d="M32 26 Q14 14 8 24 Q14 34 32 26" fill="url(#darkWing)" stroke="#311b92" stroke-width="1"/>
    <path d="M32 26 Q50 14 56 24 Q50 34 32 26" fill="url(#darkWing)" stroke="#311b92" stroke-width="1"/>
    <path d="M32 32 Q16 28 12 36 Q18 42 32 32" fill="url(#darkWing)" stroke="#311b92" stroke-width="1" opacity="0.8"/>
    <path d="M32 32 Q48 28 52 36 Q46 42 32 32" fill="url(#darkWing)" stroke="#311b92" stroke-width="1" opacity="0.8"/>
    <!-- 身体 -->
    <ellipse cx="32" cy="32" rx="5" ry="12" fill="url(#fallenAngelGrad)" stroke="#311b92" stroke-width="1"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="16" rx="6" ry="5" fill="#4a148c" stroke="#311b92" stroke-width="1"/>
    <!-- 暗红眼 -->
    <ellipse cx="30" cy="15" rx="1.5" ry="2" fill="#ff1744"/>
    <ellipse cx="34" cy="15" rx="1.5" ry="2" fill="#ff1744"/>
    <!-- 暗晕 -->
    <ellipse cx="32" cy="10" rx="7" ry="2" fill="none" stroke="#7b1fa2" stroke-width="1.5" opacity="0.6"/>
    <circle cx="32" cy="32" r="22" fill="#4a148c" opacity="0.1"/>`,
    theme: "dark"
  },
  "极品火凤凰": {
    svg: `<defs>
      <radialGradient id="ultimatePhoenixGrad" cx="50%" cy="60%">
        <stop offset="0%" style="stop-color:#ff5722"/>
        <stop offset="40%" style="stop-color:#ff3d00"/>
        <stop offset="100%" style="stop-color:#dd2c00"/>
      </radialGradient>
      <linearGradient id="ultimateWing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff9800"/>
        <stop offset="50%" style="stop-color:#ff5722"/>
        <stop offset="100%" style="stop-color:#d50000"/>
      </linearGradient>
      <radialGradient id="flameCore" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.9"/>
        <stop offset="100%" style="stop-color:#ffeb3b;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 烈焰翅膀 -->
    <path d="M32 48 Q14 36 10 22 Q14 16 20 22 Q26 28 32 32" fill="url(#ultimateWing)" stroke="#d50000" stroke-width="1.5"/>
    <path d="M32 48 Q50 36 54 22 Q50 16 44 22 Q38 28 32 32" fill="url(#ultimateWing)" stroke="#d50000" stroke-width="1.5"/>
    <!-- 身体 -->
    <ellipse cx="32" cy="28" rx="7" ry="11" fill="url(#ultimatePhoenixGrad)" stroke="#bf360c" stroke-width="1.5"/>
    <!-- 头部 -->
    <circle cx="32" cy="14" r="6" fill="#ff9800" stroke="#e65100" stroke-width="1"/>
    <circle cx="30" cy="12" r="1.5" fill="#fff"/>
    <circle cx="34" cy="12" r="1.5" fill="#fff"/>
    <!-- 尾羽 -->
    <path d="M26 42 Q22 52 26 56" fill="none" stroke="#ff5722" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 42 Q32 54 32 58" fill="none" stroke="#ff5722" stroke-width="3" stroke-linecap="round"/>
    <path d="M38 42 Q42 52 38 56" fill="none" stroke="#ff5722" stroke-width="2.5" stroke-linecap="round"/>
    <!-- 极致火焰 -->
    <circle cx="20" cy="14" r="3" fill="#ff9800" opacity="0.8"/>
    <circle cx="44" cy="14" r="3" fill="#ff9800" opacity="0.8"/>
    <circle cx="32" cy="6" r="4" fill="#ffeb3b" opacity="0.9"/>
    <!-- 核心 -->
    <circle cx="32" cy="32" r="26" fill="url(#flameCore)" opacity="0.2"/>`,
    theme: "fire"
  },
  "金龙王": {
    svg: `<defs>
      <radialGradient id="goldDragonKingGrad" cx="40%" cy="40%">
        <stop offset="0%" style="stop-color:#fff176"/>
        <stop offset="50%" style="stop-color:#ffd54f"/>
        <stop offset="100%" style="stop-color:#ffb300"/>
      </radialGradient>
      <linearGradient id="kingScale" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fff59d"/>
        <stop offset="100%" style="stop-color:#ffd54f"/>
      </linearGradient>
      <radialGradient id="dragonMajesty" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff176;stop-opacity:0.5"/>
        <stop offset="100%" style="stop-color:#ffd54f;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 龙身 -->
    <path d="M12 38 Q22 26 32 30 Q42 34 52 22" fill="none" stroke="url(#goldDragonKingGrad)" stroke-width="7" stroke-linecap="round"/>
    <!-- 龙头 -->
    <ellipse cx="12" cy="38" rx="9" ry="8" fill="url(#goldDragonKingGrad)" stroke="#f9a825" stroke-width="2"/>
    <circle cx="9" cy="36" r="2.5" fill="#3e2723"/>
    <circle cx="15" cy="36" r="2.5" fill="#3e2723"/>
    <path d="M6 40 Q2 44 6 46" fill="none" stroke="#f9a825" stroke-width="2.5" stroke-linecap="round"/>
    <!-- 龙角 -->
    <path d="M8 32 L6 20" stroke="#ffd54f" stroke-width="3" stroke-linecap="round"/>
    <path d="M14 32 L16 20" stroke="#ffd54f" stroke-width="3" stroke-linecap="round"/>
    <!-- 龙鳞 -->
    <circle cx="22" cy="28" r="3" fill="url(#kingScale)" stroke="#f9a825" stroke-width="0.5"/>
    <circle cx="32" cy="31" r="3" fill="url(#kingScale)" stroke="#f9a825" stroke-width="0.5"/>
    <circle cx="42" cy="26" r="3" fill="url(#kingScale)" stroke="#f9a825" stroke-width="0.5"/>
    <!-- 王之光环 -->
    <circle cx="32" cy="32" r="26" fill="url(#dragonMajesty)" opacity="0.4"/>
    <ellipse cx="32" cy="8" rx="10" ry="3" fill="none" stroke="#ffd54f" stroke-width="1.5" opacity="0.7"/>
    <!-- 星辰 -->
    <path d="M10 12 L11 15 L14 15 L12 17 L13 20 L10 18 L7 20 L8 17 L6 15 L9 15 Z" fill="#fff"/>
    <path d="M54 10 L55 13 L58 13 L56 15 L57 18 L54 16 L51 18 L52 15 L50 13 L53 13 Z" fill="#fff"/>`,
    theme: "dragon"
  },
  "海神武魂": {
    svg: `<defs>
      <linearGradient id="seaGodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4fc3f7"/>
        <stop offset="50%" style="stop-color:#29b6f6"/>
        <stop offset="100%" style="stop-color:#0288d1"/>
      </linearGradient>
      <radialGradient id="oceanGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#e1f5fe;stop-opacity:0.7"/>
        <stop offset="100%" style="stop-color:#4fc3f7;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 三叉戟 -->
    <rect x="30" y="12" width="4" height="44" rx="1" fill="url(#seaGodGrad)" stroke="#01579b" stroke-width="1"/>
    <path d="M20 16 L32 12 L44 16" fill="none" stroke="url(#seaGodGrad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 16 L18 8 L22 12" fill="none" stroke="url(#seaGodGrad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M32 12 L32 4" fill="none" stroke="url(#seaGodGrad)" stroke-width="3" stroke-linecap="round"/>
    <path d="M44 16 L46 8 L42 12" fill="none" stroke="url(#seaGodGrad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- 海浪 -->
    <path d="M12 48 Q20 42 32 46 Q44 50 52 44" fill="none" stroke="#4fc3f7" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
    <path d="M14 52 Q22 46 32 50 Q42 54 50 48" fill="none" stroke="#81d4fa" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    <!-- 水珠 -->
    <circle cx="18" cy="16" r="2" fill="#e1f5fe" opacity="0.9"/>
    <circle cx="46" cy="16" r="2" fill="#e1f5fe" opacity="0.9"/>
    <circle cx="32" cy="6" r="2.5" fill="#e1f5fe" opacity="0.9"/>
    <!-- 海神光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#oceanGlow)" opacity="0.3"/>
    <ellipse cx="32" cy="32" rx="28" ry="28" fill="none" stroke="#4fc3f7" stroke-width="1" opacity="0.3" stroke-dasharray="3,3"/>`,
    theme: "water"
  },
  "七杀剑": {
    svg: `<defs>
      <linearGradient id="sevenKillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e0e0e0"/>
        <stop offset="50%" style="stop-color:#bdbdbd"/>
        <stop offset="100%" style="stop-color:#9e9e9e"/>
      </linearGradient>
      <linearGradient id="killBlade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#fff"/>
        <stop offset="50%" style="stop-color:#e0e0e0"/>
        <stop offset="100%" style="stop-color:#757575"/>
      </linearGradient>
      <radialGradient id="killAura" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#f44336;stop-opacity:0.4"/>
        <stop offset="100%" style="stop-color:#f44336;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 剑身 -->
    <path d="M30 6 L34 6 L34 44 L32 50 L30 44 Z" fill="url(#killBlade)" stroke="#616161" stroke-width="1"/>
    <line x1="32" y1="6" x2="32" y2="48" stroke="#fff" stroke-width="1" opacity="0.6"/>
    <!-- 剑柄 -->
    <rect x="29" y="48" width="6" height="8" rx="1" fill="#5d4037" stroke="#3e2723" stroke-width="1"/>
    <rect x="26" y="50" width="12" height="3" rx="1" fill="#ff5722" stroke="#bf360c" stroke-width="0.5"/>
    <!-- 七杀符文 -->
    <path d="M28 14 L32 10 L36 14" fill="none" stroke="#f44336" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28 22 L32 18 L36 22" fill="none" stroke="#f44336" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28 30 L32 26 L36 30" fill="none" stroke="#f44336" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28 38 L32 34 L36 38" fill="none" stroke="#f44336" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- 杀意 -->
    <path d="M14 18 L18 14" stroke="#f44336" stroke-width="1.5" opacity="0.7"/>
    <path d="M14 24 L18 24" stroke="#f44336" stroke-width="1.5" opacity="0.7"/>
    <path d="M14 30 L18 34" stroke="#f44336" stroke-width="1.5" opacity="0.7"/>
    <path d="M50 18 L46 14" stroke="#f44336" stroke-width="1.5" opacity="0.7"/>
    <path d="M50 24 L46 24" stroke="#f44336" stroke-width="1.5" opacity="0.7"/>
    <path d="M50 30 L46 34" stroke="#f44336" stroke-width="1.5" opacity="0.7"/>
    <!-- 杀气光环 -->
    <circle cx="32" cy="28" r="24" fill="url(#killAura)" opacity="0.3"/>`,
    theme: "metal"
  },
  "雷灵王": {
    svg: `<defs>
      <radialGradient id="thunderKingGrad" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#7c4dff"/>
        <stop offset="60%" style="stop-color:#651fff"/>
        <stop offset="100%" style="stop-color:#6200ea"/>
      </radialGradient>
      <radialGradient id="thunderCrown" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffeb3b;stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#ffeb3b;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 身体 -->
    <ellipse cx="32" cy="36" rx="12" ry="10" fill="url(#thunderKingGrad)" stroke="#311b92" stroke-width="1.5"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="18" rx="9" ry="8" fill="#7c4dff" stroke="#311b92" stroke-width="1"/>
    <!-- 雷电王冠 -->
    <path d="M22 12 L26 4 L32 8 L38 4 L42 12 Z" fill="#ffeb3b" stroke="#f9a825" stroke-width="1" stroke-linejoin="round"/>
    <circle cx="26" cy="4" r="2" fill="#fff"/>
    <circle cx="38" cy="4" r="2" fill="#fff"/>
    <circle cx="32" cy="8" r="2.5" fill="#fff"/>
    <!-- 眼睛 -->
    <ellipse cx="28" cy="17" rx="2.5" ry="3" fill="#ffeb3b"/>
    <ellipse cx="36" cy="17" rx="2.5" ry="3" fill="#ffeb3b"/>
    <ellipse cx="28" cy="17" rx="1" ry="2" fill="#000"/>
    <ellipse cx="36" cy="17" rx="1" ry="2" fill="#000"/>
    <!-- 雷电 -->
    <path d="M12 14 L16 22 L12 26 L16 34" fill="none" stroke="#ffeb3b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M52 14 L48 22 L52 26 L48 34" fill="none" stroke="#ffeb3b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M16 8 L20 14" stroke="#ffeb3b" stroke-width="2" stroke-linecap="round"/>
    <path d="M48 8 L44 14" stroke="#ffeb3b" stroke-width="2" stroke-linecap="round"/>
    <!-- 雷电光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#thunderCrown)" opacity="0.3"/>`,
    theme: "thunder"
  },
  "星宿命盘": {
    svg: `<defs>
      <radialGradient id="starDestinyGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#5c6bc0"/>
        <stop offset="60%" style="stop-color:#3949ab"/>
        <stop offset="100%" style="stop-color:#1a237e"/>
      </radialGradient>
      <radialGradient id="destinyGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#9fa8da;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#3949ab;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 外环 -->
    <circle cx="32" cy="32" r="22" fill="none" stroke="#5c6bc0" stroke-width="2"/>
    <circle cx="32" cy="32" r="18" fill="none" stroke="#3949ab" stroke-width="1"/>
    <!-- 内盘 -->
    <circle cx="32" cy="32" r="14" fill="url(#starDestinyGrad)" stroke="#5c6bc0" stroke-width="1"/>
    <!-- 星宿标记 -->
    <circle cx="32" cy="18" r="2" fill="#ffeb3b"/>
    <circle cx="46" cy="32" r="2" fill="#ffeb3b"/>
    <circle cx="32" cy="46" r="2" fill="#ffeb3b"/>
    <circle cx="18" cy="32" r="2" fill="#ffeb3b"/>
    <circle cx="42" cy="22" r="1.5" fill="#fff"/>
    <circle cx="42" cy="42" r="1.5" fill="#fff"/>
    <circle cx="22" cy="42" r="1.5" fill="#fff"/>
    <circle cx="22" cy="22" r="1.5" fill="#fff"/>
    <!-- 连线 -->
    <line x1="32" y1="18" x2="46" y2="32" stroke="#9fa8da" stroke-width="0.8" opacity="0.7"/>
    <line x1="46" y1="32" x2="32" y2="46" stroke="#9fa8da" stroke-width="0.8" opacity="0.7"/>
    <line x1="32" y1="46" x2="18" y2="32" stroke="#9fa8da" stroke-width="0.8" opacity="0.7"/>
    <line x1="18" y1="32" x2="32" y2="18" stroke="#9fa8da" stroke-width="0.8" opacity="0.7"/>
    <!-- 中心 -->
    <circle cx="32" cy="32" r="4" fill="#ffeb3b" stroke="#f9a825" stroke-width="1"/>
    <circle cx="32" cy="32" r="2" fill="#fff"/>
    <!-- 命运光环 -->
    <circle cx="32" cy="32" r="26" fill="url(#destinyGlow)" opacity="0.3"/>`,
    theme: "star"
  },
  "幽冥神眼": {
    svg: `<defs>
      <radialGradient id="netherEyeGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#7b1fa2"/>
        <stop offset="60%" style="stop-color:#4a148c"/>
        <stop offset="100%" style="stop-color:#311b92"/>
      </radialGradient>
      <radialGradient id="eyePupil" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#e040fb"/>
        <stop offset="100%" style="stop-color:#aa00ff"/>
      </radialGradient>
      <radialGradient id="eyeGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#e040fb;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#aa00ff;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 眼睛外框 -->
    <path d="M12 32 Q32 12 52 32 Q32 52 12 32 Z" fill="url(#netherEyeGrad)" stroke="#4a148c" stroke-width="2"/>
    <!-- 虹膜 -->
    <circle cx="32" cy="32" r="12" fill="#311b92" stroke="#4a148c" stroke-width="1"/>
    <!-- 瞳孔 -->
    <circle cx="32" cy="32" r="6" fill="url(#eyePupil)"/>
    <circle cx="32" cy="32" r="3" fill="#000"/>
    <circle cx="30" cy="30" r="1.5" fill="#fff" opacity="0.8"/>
    <!-- 符文 -->
    <circle cx="32" cy="32" r="16" fill="none" stroke="#7b1fa2" stroke-width="0.8" stroke-dasharray="2,2"/>
    <path d="M32 12 L32 8" stroke="#e040fb" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M32 52 L32 56" stroke="#e040fb" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M12 32 L8 32" stroke="#e040fb" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M52 32 L56 32" stroke="#e040fb" stroke-width="1.5" stroke-linecap="round"/>
    <!-- 幽冥光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#eyeGlow)" opacity="0.3"/>`,
    theme: "spirit"
  },
  "混沌之翼": {
    svg: `<defs>
      <linearGradient id="chaosWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#7c4dff"/>
        <stop offset="33%" style="stop-color:#f44336"/>
        <stop offset="66%" style="stop-color:#ffeb3b"/>
        <stop offset="100%" style="stop-color:#00e676"/>
      </linearGradient>
      <radialGradient id="chaosCore" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#7c4dff;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 左翅 -->
    <path d="M32 32 Q14 20 8 30 Q14 42 32 34" fill="url(#chaosWingGrad)" stroke="#7c4dff" stroke-width="1" opacity="0.9"/>
    <path d="M32 34 Q16 34 12 44 Q18 48 32 38" fill="url(#chaosWingGrad)" stroke="#f44336" stroke-width="1" opacity="0.8"/>
    <!-- 右翅 -->
    <path d="M32 32 Q50 20 56 30 Q50 42 32 34" fill="url(#chaosWingGrad)" stroke="#ffeb3b" stroke-width="1" opacity="0.9"/>
    <path d="M32 34 Q48 34 52 44 Q46 48 32 38" fill="url(#chaosWingGrad)" stroke="#00e676" stroke-width="1" opacity="0.8"/>
    <!-- 中心 -->
    <ellipse cx="32" cy="34" rx="4" ry="8" fill="#7c4dff" stroke="#4a148c" stroke-width="1"/>
    <circle cx="32" cy="32" r="3" fill="#fff" opacity="0.8"/>
    <!-- 混沌粒子 -->
    <circle cx="16" cy="18" r="2" fill="#f44336" opacity="0.7"/>
    <circle cx="48" cy="18" r="2" fill="#ffeb3b" opacity="0.7"/>
    <circle cx="16" cy="48" r="2" fill="#00e676" opacity="0.7"/>
    <circle cx="48" cy="48" r="2" fill="#7c4dff" opacity="0.7"/>
    <!-- 混沌光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#chaosCore)" opacity="0.2"/>`,
    theme: "chaos"
  },
  "天罚神雷": {
    svg: `<defs>
      <radialGradient id="divineThunderGrad" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#fff176"/>
        <stop offset="50%" style="stop-color:#ffd54f"/>
        <stop offset="100%" style="stop-color:#ff8f00"/>
      </radialGradient>
      <radialGradient id="divinePunish" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#fff176;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 雷云 -->
    <ellipse cx="32" cy="16" rx="18" ry="8" fill="#616161" stroke="#424242" stroke-width="1"/>
    <ellipse cx="24" cy="14" rx="8" ry="5" fill="#757575" stroke="#616161" stroke-width="0.5"/>
    <ellipse cx="40" cy="14" rx="8" ry="5" fill="#757575" stroke="#616161" stroke-width="0.5"/>
    <!-- 神雷 -->
    <path d="M30 22 L26 32 L32 30 L28 42 L34 38 L30 52" fill="none" stroke="#ffeb3b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M34 22 L38 30 L32 28 L36 38 L30 36 L32 48" fill="none" stroke="#fff176" stroke-width="2" stroke-linejoin="round"/>
    <!-- 天罚之眼 -->
    <ellipse cx="32" cy="16" rx="4" ry="3" fill="#ff1744" stroke="#b71c1c" stroke-width="0.5"/>
    <circle cx="32" cy="16" r="1.5" fill="#000"/>
    <!-- 电光 -->
    <path d="M12 20 L16 24" stroke="#ffeb3b" stroke-width="2" stroke-linecap="round"/>
    <path d="M52 20 L48 24" stroke="#ffeb3b" stroke-width="2" stroke-linecap="round"/>
    <path d="M14 12 L18 14" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M50 12 L46 14" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
    <!-- 天罚光环 -->
    <circle cx="32" cy="32" r="26" fill="url(#divinePunish)" opacity="0.2"/>`,
    theme: "thunder"
  },
  "永恒冰魂": {
    svg: `<defs>
      <radialGradient id="eternalIceGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#e0f7fa"/>
        <stop offset="40%" style="stop-color:#80deea"/>
        <stop offset="100%" style="stop-color:#26c6da"/>
      </radialGradient>
      <radialGradient id="eternalGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#e0f7fa;stop-opacity:0.7"/>
        <stop offset="100%" style="stop-color:#80deea;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 冰晶主体 -->
    <path d="M32 8 L38 20 L32 32 L26 20 Z" fill="url(#eternalIceGrad)" stroke="#0097a7" stroke-width="1" stroke-linejoin="round"/>
    <path d="M32 32 L40 40 L32 54 L24 40 Z" fill="url(#eternalIceGrad)" stroke="#0097a7" stroke-width="1" stroke-linejoin="round"/>
    <path d="M32 8 L26 20 L16 16 L20 26 L8 32 L20 38 L16 48 L26 44 L32 54 L38 44 L48 48 L44 38 L56 32 L44 26 L48 16 L38 20 Z" fill="url(#eternalIceGrad)" stroke="#0097a7" stroke-width="0.8" stroke-linejoin="round" opacity="0.6"/>
    <!-- 核心 -->
    <circle cx="32" cy="32" r="5" fill="#e0f7fa" stroke="#80deea" stroke-width="1"/>
    <circle cx="32" cy="32" r="2" fill="#fff"/>
    <!-- 冰晶碎片 -->
    <path d="M14 14 L16 10 L18 14 Z" fill="#e0f7fe"/>
    <path d="M46 14 L48 10 L50 14 Z" fill="#e0f7fe"/>
    <path d="M10 32 L12 28 L14 32 Z" fill="#e0f7fe"/>
    <path d="M50 32 L52 28 L54 32 Z" fill="#e0f7fe"/>
    <path d="M14 50 L16 46 L18 50 Z" fill="#e0f7fe"/>
    <path d="M46 50 L48 46 L50 50 Z" fill="#e0f7fe"/>
    <!-- 永恒光环 -->
    <circle cx="32" cy="32" r="26" fill="url(#eternalGlow)" opacity="0.3"/>
    <circle cx="32" cy="32" r="28" fill="none" stroke="#80deea" stroke-width="1" opacity="0.3" stroke-dasharray="3,3"/>`,
    theme: "ice"
  },
  "炎狱魔神": {
    svg: `<defs>
      <radialGradient id="hellDemonGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ff5722"/>
        <stop offset="50%" style="stop-color:#d50000"/>
        <stop offset="100%" style="stop-color:#8e0000"/>
      </radialGradient>
      <radialGradient id="hellFire" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffeb3b;stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#ff5722;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 恶魔角 -->
    <path d="M22 14 L18 4 L26 12" fill="#d50000" stroke="#8e0000" stroke-width="1" stroke-linejoin="round"/>
    <path d="M42 14 L46 4 L38 12" fill="#d50000" stroke="#8e0000" stroke-width="1" stroke-linejoin="round"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="18" rx="10" ry="9" fill="url(#hellDemonGrad)" stroke="#8e0000" stroke-width="1.5"/>
    <!-- 恶魔眼 -->
    <ellipse cx="27" cy="16" rx="3" ry="3.5" fill="#ffeb3b"/>
    <ellipse cx="37" cy="16" rx="3" ry="3.5" fill="#ffeb3b"/>
    <ellipse cx="27" cy="16" rx="1" ry="2.5" fill="#000"/>
    <ellipse cx="37" cy="16" rx="1" ry="2.5" fill="#000"/>
    <!-- 身体 -->
    <path d="M24 48 L24 32 L28 24 L32 20 L36 24 L40 32 L40 48 Z" fill="url(#hellDemonGrad)" stroke="#8e0000" stroke-width="1.5" stroke-linejoin="round"/>
    <!-- 熔岩纹 -->
    <path d="M28 32 L32 28 L36 32 L34 40 L32 42 L30 40 Z" fill="#ff9800" stroke="#e65100" stroke-width="1"/>
    <!-- 地狱火 -->
    <ellipse cx="16" cy="30" rx="3" ry="5" fill="#ff5722" opacity="0.7"/>
    <ellipse cx="48" cy="30" rx="3" ry="5" fill="#ff5722" opacity="0.7"/>
    <ellipse cx="32" cy="52" rx="14" ry="4" fill="#ff5722" opacity="0.4"/>
    <!-- 恶魔光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#hellFire)" opacity="0.2"/>`,
    theme: "fire"
  },
  "天命神弓": {
    svg: `<defs>
      <linearGradient id="destinyBowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ffd54f"/>
        <stop offset="50%" style="stop-color:#ffca28"/>
        <stop offset="100%" style="stop-color:#ffb300"/>
      </linearGradient>
      <radialGradient id="arrowGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.9"/>
        <stop offset="100%" style="stop-color:#ffd54f;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 弓身 -->
    <path d="M16 48 Q12 32 16 16 Q32 8 48 16 Q52 32 48 48" fill="none" stroke="url(#destinyBowGrad)" stroke-width="3" stroke-linecap="round"/>
    <path d="M16 16 Q32 12 48 16" fill="none" stroke="#ffeb3b" stroke-width="1.5" opacity="0.8"/>
    <!-- 弓弦 -->
    <line x1="16" y1="16" x2="16" y2="48" stroke="#e0e0e0" stroke-width="1"/>
    <!-- 箭 -->
    <line x1="16" y1="32" x2="48" y2="32" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M48 32 L44 28 L44 36 Z" fill="#fff"/>
    <path d="M16 32 L20 28 L20 36 Z" fill="#e0e0e0"/>
    <!-- 命运之线 -->
    <path d="M32 8 Q36 4 40 8" fill="none" stroke="#ffd54f" stroke-width="1" stroke-linecap="round"/>
    <path d="M32 52 Q36 56 40 52" fill="none" stroke="#ffd54f" stroke-width="1" stroke-linecap="round"/>
    <!-- 星辰 -->
    <path d="M12 12 L13 15 L16 15 L14 17 L15 20 L12 18 L9 20 L10 17 L8 15 L11 15 Z" fill="#fff"/>
    <path d="M52 10 L53 13 L56 13 L54 15 L55 18 L52 16 L49 18 L50 15 L48 13 L51 13 Z" fill="#fff"/>
    <!-- 命运光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#arrowGlow)" opacity="0.2"/>`,
    theme: "star"
  },
  "混沌剑魂": {
    svg: `<defs>
      <linearGradient id="chaosSwordGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#7c4dff"/>
        <stop offset="33%" style="stop-color:#f44336"/>
        <stop offset="66%" style="stop-color:#ffeb3b"/>
        <stop offset="100%" style="stop-color:#00e676"/>
      </linearGradient>
      <radialGradient id="chaosBlade" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.9"/>
        <stop offset="100%" style="stop-color:#7c4dff;stop-opacity:0.5"/>
      </radialGradient>
    </defs>
    <!-- 剑身 -->
    <path d="M30 6 L34 6 L34 44 L32 50 L30 44 Z" fill="url(#chaosBlade)" stroke="url(#chaosSwordGrad)" stroke-width="1.5"/>
    <line x1="32" y1="6" x2="32" y2="48" stroke="#fff" stroke-width="1" opacity="0.6"/>
    <!-- 剑柄 -->
    <rect x="29" y="48" width="6" height="8" rx="1" fill="#424242" stroke="#212121" stroke-width="1"/>
    <rect x="26" y="50" width="12" height="3" rx="1" fill="url(#chaosSwordGrad)" stroke="#7c4dff" stroke-width="0.5"/>
    <!-- 护手 -->
    <path d="M22 44 Q32 40 42 44" fill="none" stroke="url(#chaosSwordGrad)" stroke-width="2.5" stroke-linecap="round"/>
    <!-- 混沌碎片 -->
    <circle cx="20" cy="14" r="2" fill="#f44336" opacity="0.8"/>
    <circle cx="44" cy="14" r="2" fill="#ffeb3b" opacity="0.8"/>
    <circle cx="20" cy="34" r="2" fill="#00e676" opacity="0.8"/>
    <circle cx="44" cy="34" r="2" fill="#7c4dff" opacity="0.8"/>
    <circle cx="32" cy="4" r="2.5" fill="#fff" opacity="0.9"/>
    <!-- 混沌光环 -->
    <circle cx="32" cy="28" r="24" fill="url(#chaosBlade)" opacity="0.15"/>
    <ellipse cx="32" cy="28" rx="26" ry="26" fill="none" stroke="url(#chaosSwordGrad)" stroke-width="1" opacity="0.2" stroke-dasharray="3,3"/>`,
    theme: "chaos"
  },
  // ──── 顶级品质 Apex ────
  "神圣天使": {
    svg: `<defs>
      <radialGradient id="divineAngelGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff9c4"/>
        <stop offset="40%" style="stop-color:#fff176"/>
        <stop offset="100%" style="stop-color:#ffd54f"/>
      </radialGradient>
      <linearGradient id="divineWing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fff"/>
        <stop offset="50%" style="stop-color:#fff9c4"/>
        <stop offset="100%" style="stop-color:#fff176"/>
      </linearGradient>
      <radialGradient id="holyMajesty" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.7"/>
        <stop offset="100%" style="stop-color:#fff176;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 六翼 -->
    <path d="M32 22 Q12 10 6 18 Q12 28 32 22" fill="url(#divineWing)" stroke="#ffd54f" stroke-width="1"/>
    <path d="M32 22 Q52 10 58 18 Q52 28 32 22" fill="url(#divineWing)" stroke="#ffd54f" stroke-width="1"/>
    <path d="M32 28 Q14 20 8 28 Q14 36 32 28" fill="url(#divineWing)" stroke="#ffd54f" stroke-width="1" opacity="0.9"/>
    <path d="M32 28 Q50 20 56 28 Q50 36 32 28" fill="url(#divineWing)" stroke="#ffd54f" stroke-width="1" opacity="0.9"/>
    <path d="M32 34 Q16 30 12 38 Q18 44 32 34" fill="url(#divineWing)" stroke="#ffd54f" stroke-width="1" opacity="0.8"/>
    <path d="M32 34 Q48 30 52 38 Q46 44 32 34" fill="url(#divineWing)" stroke="#ffd54f" stroke-width="1" opacity="0.8"/>
    <!-- 身体 -->
    <ellipse cx="32" cy="32" rx="5" ry="12" fill="url(#divineAngelGrad)" stroke="#f9a825" stroke-width="1"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="14" rx="6" ry="5" fill="#fff176" stroke="#f9a825" stroke-width="1"/>
    <circle cx="30" cy="13" r="1.5" fill="#3e2723"/>
    <circle cx="34" cy="13" r="1.5" fill="#3e2723"/>
    <!-- 神圣光环 -->
    <ellipse cx="32" cy="8" rx="8" ry="2.5" fill="none" stroke="#ffd54f" stroke-width="2"/>
    <circle cx="32" cy="32" r="26" fill="url(#holyMajesty)" opacity="0.4"/>
    <!-- 星光 -->
    <path d="M10 10 L11 13 L14 13 L12 15 L13 18 L10 16 L7 18 L8 15 L6 13 L9 13 Z" fill="#fff"/>
    <path d="M54 8 L55 11 L58 11 L56 13 L57 16 L54 14 L51 16 L52 13 L50 11 L53 11 Z" fill="#fff"/>`,
    theme: "holy"
  },
  "柔骨兔王": {
    svg: `<defs>
      <radialGradient id="moonRabbitGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#f8bbd0"/>
        <stop offset="60%" style="stop-color:#f48fb1"/>
        <stop offset="100%" style="stop-color:#ec407a"/>
      </radialGradient>
      <radialGradient id="moonGlow2" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.7"/>
        <stop offset="100%" style="stop-color:#f8bbd0;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 月亮 -->
    <path d="M48 14 Q52 20 48 26 Q44 20 48 14 Z" fill="#fff9c4" stroke="#ffd54f" stroke-width="1"/>
    <!-- 身体 -->
    <ellipse cx="32" cy="36" rx="12" ry="10" fill="url(#moonRabbitGrad)" stroke="#ec407a" stroke-width="1.5"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="20" rx="9" ry="8" fill="#f8bbd0" stroke="#ec407a" stroke-width="1"/>
    <!-- 长耳 -->
    <path d="M26 14 L22 4 L28 12" fill="#f8bbd0" stroke="#ec407a" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M38 14 L42 4 L36 12" fill="#f8bbd0" stroke="#ec407a" stroke-width="1.5" stroke-linejoin="round"/>
    <!-- 眼睛 -->
    <ellipse cx="28" cy="19" rx="2.5" ry="3" fill="#c2185b"/>
    <ellipse cx="36" cy="19" rx="2.5" ry="3" fill="#c2185b"/>
    <ellipse cx="28" cy="19" rx="1" ry="2" fill="#000"/>
    <ellipse cx="36" cy="19" rx="1" ry="2" fill="#000"/>
    <!-- 月光 -->
    <circle cx="16" cy="14" r="2" fill="#fff9c4" opacity="0.8"/>
    <circle cx="52" cy="20" r="1.5" fill="#fff9c4" opacity="0.6"/>
    <!-- 月华光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#moonGlow2)" opacity="0.3"/>`,
    theme: "moon"
  },
  "混沌属性": {
    svg: `<defs>
      <radialGradient id="chaosAttributeGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#7c4dff"/>
        <stop offset="25%" style="stop-color:#f44336"/>
        <stop offset="50%" style="stop-color:#ffeb3b"/>
        <stop offset="75%" style="stop-color:#00e676"/>
        <stop offset="100%" style="stop-color:#2979ff"/>
      </radialGradient>
      <radialGradient id="chaosSwirl" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#7c4dff;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 混沌漩涡 -->
    <circle cx="32" cy="32" r="18" fill="none" stroke="url(#chaosAttributeGrad)" stroke-width="3" stroke-dasharray="8,4"/>
    <circle cx="32" cy="32" r="14" fill="none" stroke="#f44336" stroke-width="2" stroke-dasharray="6,3" transform="rotate(45 32 32)"/>
    <circle cx="32" cy="32" r="10" fill="none" stroke="#ffeb3b" stroke-width="2" stroke-dasharray="4,2" transform="rotate(90 32 32)"/>
    <circle cx="32" cy="32" r="6" fill="none" stroke="#00e676" stroke-width="1.5" stroke-dasharray="3,1" transform="rotate(135 32 32)"/>
    <!-- 中心 -->
    <circle cx="32" cy="32" r="4" fill="url(#chaosAttributeGrad)"/>
    <circle cx="32" cy="32" r="2" fill="#fff"/>
    <!-- 混沌粒子 -->
    <circle cx="14" cy="18" r="2.5" fill="#7c4dff" opacity="0.8"/>
    <circle cx="50" cy="18" r="2.5" fill="#f44336" opacity="0.8"/>
    <circle cx="14" cy="46" r="2.5" fill="#00e676" opacity="0.8"/>
    <circle cx="50" cy="46" r="2.5" fill="#ffeb3b" opacity="0.8"/>
    <circle cx="32" cy="8" r="3" fill="#2979ff" opacity="0.8"/>
    <circle cx="32" cy="56" r="3" fill="#7c4dff" opacity="0.8"/>
    <!-- 混沌光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#chaosSwirl)" opacity="0.2"/>`,
    theme: "chaos"
  },
  "宇宙之源": {
    svg: `<defs>
      <radialGradient id="universeSourceGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#311b92"/>
        <stop offset="40%" style="stop-color:#1a237e"/>
        <stop offset="100%" style="stop-color:#000"/>
      </radialGradient>
      <radialGradient id="galaxyGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.9"/>
        <stop offset="30%" style="stop-color:#e1bee7;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#311b92;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 宇宙背景 -->
    <circle cx="32" cy="32" r="20" fill="url(#universeSourceGrad)" stroke="#311b92" stroke-width="1.5"/>
    <!-- 星云 -->
    <ellipse cx="24" cy="26" rx="8" ry="5" fill="#e1bee7" opacity="0.3" transform="rotate(-20 24 26)"/>
    <ellipse cx="40" cy="38" rx="8" ry="5" fill="#b3e5fc" opacity="0.3" transform="rotate(30 40 38)"/>
    <!-- 星辰 -->
    <circle cx="22" cy="22" r="1.5" fill="#fff"/>
    <circle cx="42" cy="20" r="1" fill="#fff"/>
    <circle cx="20" cy="40" r="1.2" fill="#fff"/>
    <circle cx="44" cy="42" r="1.5" fill="#fff"/>
    <circle cx="32" cy="18" r="1" fill="#fff"/>
    <circle cx="32" cy="46" r="1.2" fill="#fff"/>
    <circle cx="18" cy="32" r="1" fill="#fff"/>
    <circle cx="46" cy="32" r="1" fill="#fff"/>
    <!-- 中心奇点 -->
    <circle cx="32" cy="32" r="5" fill="url(#galaxyGlow)"/>
    <circle cx="32" cy="32" r="2" fill="#fff"/>
    <!-- 轨道 -->
    <ellipse cx="32" cy="32" rx="16" ry="8" fill="none" stroke="#7c4dff" stroke-width="0.5" opacity="0.5" transform="rotate(30 32 32)"/>
    <ellipse cx="32" cy="32" rx="16" ry="8" fill="none" stroke="#00e676" stroke-width="0.5" opacity="0.5" transform="rotate(-30 32 32)"/>`,
    theme: "star"
  },
  "时空裂缝": {
    svg: `<defs>
      <linearGradient id="timeSpaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#7c4dff"/>
        <stop offset="50%" style="stop-color:#311b92"/>
        <stop offset="100%" style="stop-color:#000"/>
      </linearGradient>
      <radialGradient id="riftGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#e040fb;stop-opacity:0.7"/>
        <stop offset="100%" style="stop-color:#7c4dff;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 裂缝 -->
    <path d="M28 8 Q24 16 30 24 Q22 32 28 40 Q24 48 28 56" fill="none" stroke="url(#timeSpaceGrad)" stroke-width="4" stroke-linecap="round"/>
    <path d="M28 8 Q32 14 28 20 Q34 28 28 36 Q32 44 28 52" fill="none" stroke="#e040fb" stroke-width="2" stroke-linecap="round"/>
    <!-- 内部虚空 -->
    <path d="M26 12 L30 12 L28 20 L32 28 L28 36 L30 44 L26 52 L24 44 L28 36 L24 28 L28 20 Z" fill="#000" stroke="#7c4dff" stroke-width="1"/>
    <!-- 时空碎片 -->
    <path d="M14 18 L18 16 L16 22 Z" fill="#e040fb" opacity="0.7"/>
    <path d="M46 16 L50 18 L48 22 Z" fill="#e040fb" opacity="0.7"/>
    <path d="M12 32 L16 30 L14 36 Z" fill="#7c4dff" opacity="0.7"/>
    <path d="M48 32 L52 30 L50 36 Z" fill="#7c4dff" opacity="0.7"/>
    <path d="M18 46 L22 44 L20 50 Z" fill="#e040fb" opacity="0.7"/>
    <path d="M42 46 L46 44 L44 50 Z" fill="#e040fb" opacity="0.7"/>
    <!-- 时钟标记 -->
    <circle cx="32" cy="32" r="8" fill="none" stroke="#e040fb" stroke-width="0.5" stroke-dasharray="2,2"/>
    <!-- 裂缝光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#riftGlow)" opacity="0.2"/>`,
    theme: "time"
  },
  "虚无之主": {
    svg: `<defs>
      <radialGradient id="voidLordGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#424242"/>
        <stop offset="60%" style="stop-color:#000"/>
        <stop offset="100%" style="stop-color:#000"/>
      </radialGradient>
      <radialGradient id="voidEye3" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#000;stop-opacity:0.9"/>
        <stop offset="100%" style="stop-color:#000;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 虚无漩涡 -->
    <circle cx="32" cy="32" r="18" fill="url(#voidLordGrad)" stroke="#000" stroke-width="2"/>
    <circle cx="32" cy="32" r="14" fill="#000" stroke="#212121" stroke-width="1"/>
    <circle cx="32" cy="32" r="10" fill="#000" stroke="#424242" stroke-width="0.5"/>
    <circle cx="32" cy="32" r="6" fill="#000"/>
    <!-- 虚无之眼 -->
    <circle cx="32" cy="32" r="3" fill="#000" stroke="#616161" stroke-width="0.5"/>
    <!-- 吞噬效果 -->
    <path d="M20 20 L24 24" stroke="#616161" stroke-width="1" opacity="0.5"/>
    <path d="M44 20 L40 24" stroke="#616161" stroke-width="1" opacity="0.5"/>
    <path d="M20 44 L24 40" stroke="#616161" stroke-width="1" opacity="0.5"/>
    <path d="M44 44 L40 40" stroke="#616161" stroke-width="1" opacity="0.5"/>
    <path d="M32 10 L32 14" stroke="#616161" stroke-width="1" opacity="0.5"/>
    <path d="M32 50 L32 54" stroke="#616161" stroke-width="1" opacity="0.5"/>
    <path d="M10 32 L14 32" stroke="#616161" stroke-width="1" opacity="0.5"/>
    <path d="M50 32 L54 32" stroke="#616161" stroke-width="1" opacity="0.5"/>
    <!-- 虚无光环 -->
    <circle cx="32" cy="32" r="22" fill="url(#voidEye3)" opacity="0.4"/>`,
    theme: "void"
  },
  "因果律者": {
    svg: `<defs>
      <linearGradient id="causalityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#5c6bc0"/>
        <stop offset="50%" style="stop-color:#3949ab"/>
        <stop offset="100%" style="stop-color:#1a237e"/>
      </linearGradient>
      <radialGradient id="causalityGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#9fa8da;stop-opacity:0.7"/>
        <stop offset="100%" style="stop-color:#3949ab;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 天平 -->
    <line x1="32" y1="12" x2="32" y2="44" stroke="url(#causalityGrad)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="16" y1="20" x2="48" y2="20" stroke="url(#causalityGrad)" stroke-width="2" stroke-linecap="round"/>
    <!-- 左盘 -->
    <path d="M12 20 Q16 28 20 20" fill="none" stroke="#5c6bc0" stroke-width="1.5"/>
    <line x1="16" y1="20" x2="14" y2="28" stroke="#5c6bc0" stroke-width="1"/>
    <line x1="16" y1="20" x2="18" y2="28" stroke="#5c6bc0" stroke-width="1"/>
    <ellipse cx="16" cy="28" rx="5" ry="2" fill="#3949ab" stroke="#5c6bc0" stroke-width="1"/>
    <!-- 右盘 -->
    <path d="M44 20 Q48 28 52 20" fill="none" stroke="#5c6bc0" stroke-width="1.5"/>
    <line x1="48" y1="20" x2="46" y2="28" stroke="#5c6bc0" stroke-width="1"/>
    <line x1="48" y1="20" x2="50" y2="28" stroke="#5c6bc0" stroke-width="1"/>
    <ellipse cx="48" cy="28" rx="5" ry="2" fill="#3949ab" stroke="#5c6bc0" stroke-width="1"/>
    <!-- 因果之链 -->
    <path d="M16 28 Q16 36 24 36 Q32 36 32 44" fill="none" stroke="#9fa8da" stroke-width="1" stroke-dasharray="2,2"/>
    <path d="M48 28 Q48 36 40 36 Q32 36 32 44" fill="none" stroke="#9fa8da" stroke-width="1" stroke-dasharray="2,2"/>
    <!-- 底座 -->
    <path d="M26 44 L38 44 L36 52 L28 52 Z" fill="#3949ab" stroke="#5c6bc0" stroke-width="1"/>
    <!-- 因果光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#causalityGlow)" opacity="0.3"/>`,
    theme: "star"
  },
  "神格化身": {
    svg: `<defs>
      <radialGradient id="godIncarnateGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff9c4"/>
        <stop offset="40%" style="stop-color:#fff176"/>
        <stop offset="100%" style="stop-color:#ffd54f"/>
      </radialGradient>
      <radialGradient id="godAura" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#fff176;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 人形轮廓 -->
    <ellipse cx="32" cy="18" rx="7" ry="7" fill="url(#godIncarnateGrad)" stroke="#f9a825" stroke-width="1.5"/>
    <path d="M24 48 L24 32 L28 24 L32 20 L36 24 L40 32 L40 48 Z" fill="url(#godIncarnateGrad)" stroke="#f9a825" stroke-width="1.5" stroke-linejoin="round"/>
    <!-- 面部 -->
    <circle cx="30" cy="16" r="1.5" fill="#3e2723"/>
    <circle cx="34" cy="16" r="1.5" fill="#3e2723"/>
    <path d="M30 20 Q32 22 34 20" fill="none" stroke="#f9a825" stroke-width="1"/>
    <!-- 神光 -->
    <path d="M32 8 L32 4" stroke="#ffeb3b" stroke-width="2" stroke-linecap="round"/>
    <path d="M22 10 L20 6" stroke="#ffeb3b" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M42 10 L44 6" stroke="#ffeb3b" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M16 16 L12 14" stroke="#ffeb3b" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M48 16 L52 14" stroke="#ffeb3b" stroke-width="1.5" stroke-linecap="round"/>
    <!-- 神环 -->
    <ellipse cx="32" cy="10" rx="10" ry="3" fill="none" stroke="#ffd54f" stroke-width="2"/>
    <ellipse cx="32" cy="10" rx="14" ry="4" fill="none" stroke="#ffd54f" stroke-width="1" opacity="0.5"/>
    <!-- 神圣光环 -->
    <circle cx="32" cy="32" r="26" fill="url(#godAura)" opacity="0.4"/>`,
    theme: "holy"
  },
  // ──── 隐藏品质 HC ────
  "如意环": {
    svg: `<defs>
      <radialGradient id="ruyiRingGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffcc80"/>
        <stop offset="60%" style="stop-color:#ffa726"/>
        <stop offset="100%" style="stop-color:#f57c00"/>
      </radialGradient>
      <radialGradient id="ringGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff3e0;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#ffcc80;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 外环 -->
    <circle cx="32" cy="32" r="20" fill="none" stroke="url(#ruyiRingGrad)" stroke-width="4"/>
    <!-- 内环 -->
    <circle cx="32" cy="32" r="14" fill="none" stroke="#ffa726" stroke-width="2"/>
    <!-- 如意纹 -->
    <path d="M32 12 Q36 16 32 20 Q28 16 32 12" fill="#ffcc80" stroke="#f57c00" stroke-width="0.5"/>
    <path d="M32 44 Q36 48 32 52 Q28 48 32 44" fill="#ffcc80" stroke="#f57c00" stroke-width="0.5"/>
    <path d="M12 32 Q16 36 20 32 Q16 28 12 32" fill="#ffcc80" stroke="#f57c00" stroke-width="0.5"/>
    <path d="M44 32 Q48 36 52 32 Q48 28 44 32" fill="#ffcc80" stroke="#f57c00" stroke-width="0.5"/>
    <!-- 中心 -->
    <circle cx="32" cy="32" r="6" fill="#fff3e0" stroke="#ffa726" stroke-width="1"/>
    <circle cx="32" cy="32" r="3" fill="url(#ruyiRingGrad)"/>
    <!-- 光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#ringGlow)" opacity="0.3"/>`,
    theme: "chaos"
  },
  "幽冥之眼": {
    svg: `<defs>
      <radialGradient id="netherEye2Grad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#4a148c"/>
        <stop offset="60%" style="stop-color:#311b92"/>
        <stop offset="100%" style="stop-color:#1a237e"/>
      </radialGradient>
      <radialGradient id="netherPupil" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#e040fb"/>
        <stop offset="100%" style="stop-color:#aa00ff"/>
      </radialGradient>
    </defs>
    <!-- 眼睛 -->
    <path d="M10 32 Q32 14 54 32 Q32 50 10 32 Z" fill="url(#netherEye2Grad)" stroke="#311b92" stroke-width="2"/>
    <!-- 虹膜 -->
    <circle cx="32" cy="32" r="12" fill="#311b92" stroke="#4a148c" stroke-width="1"/>
    <!-- 瞳孔 -->
    <circle cx="32" cy="32" r="6" fill="url(#netherPupil)"/>
    <circle cx="32" cy="32" r="3" fill="#000"/>
    <circle cx="30" cy="30" r="1.5" fill="#fff" opacity="0.8"/>
    <!-- 幽冥符文 -->
    <circle cx="32" cy="32" r="16" fill="none" stroke="#7c4dff" stroke-width="0.8" stroke-dasharray="2,2"/>
    <!-- 幽冥之气 -->
    <ellipse cx="16" cy="20" rx="3" ry="5" fill="#e040fb" opacity="0.4"/>
    <ellipse cx="48" cy="20" rx="3" ry="5" fill="#e040fb" opacity="0.4"/>
    <ellipse cx="32" cy="52" rx="14" ry="4" fill="#311b92" opacity="0.3"/>`,
    theme: "spirit"
  },
  "九心海棠": {
    svg: `<defs>
      <radialGradient id="nineHeartFlowerGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#f8bbd0"/>
        <stop offset="60%" style="stop-color:#f48fb1"/>
        <stop offset="100%" style="stop-color:#ec407a"/>
      </radialGradient>
      <radialGradient id="healingGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fce4ec;stop-opacity:0.7"/>
        <stop offset="100%" style="stop-color:#f8bbd0;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 花茎 -->
    <path d="M32 52 L32 28" stroke="#2e7d32" stroke-width="2.5" stroke-linecap="round"/>
    <!-- 九心花瓣 -->
    <ellipse cx="32" cy="20" rx="4" ry="8" fill="url(#nineHeartFlowerGrad)" stroke="#ec407a" stroke-width="0.5" transform="rotate(0 32 20)"/>
    <ellipse cx="32" cy="20" rx="4" ry="8" fill="url(#nineHeartFlowerGrad)" stroke="#ec407a" stroke-width="0.5" transform="rotate(40 32 20)"/>
    <ellipse cx="32" cy="20" rx="4" ry="8" fill="url(#nineHeartFlowerGrad)" stroke="#ec407a" stroke-width="0.5" transform="rotate(80 32 20)"/>
    <ellipse cx="32" cy="20" rx="4" ry="8" fill="url(#nineHeartFlowerGrad)" stroke="#ec407a" stroke-width="0.5" transform="rotate(120 32 20)"/>
    <ellipse cx="32" cy="20" rx="4" ry="8" fill="url(#nineHeartFlowerGrad)" stroke="#ec407a" stroke-width="0.5" transform="rotate(160 32 20)"/>
    <ellipse cx="32" cy="20" rx="4" ry="8" fill="url(#nineHeartFlowerGrad)" stroke="#ec407a" stroke-width="0.5" transform="rotate(200 32 20)"/>
    <ellipse cx="32" cy="20" rx="4" ry="8" fill="url(#nineHeartFlowerGrad)" stroke="#ec407a" stroke-width="0.5" transform="rotate(240 32 20)"/>
    <ellipse cx="32" cy="20" rx="4" ry="8" fill="url(#nineHeartFlowerGrad)" stroke="#ec407a" stroke-width="0.5" transform="rotate(280 32 20)"/>
    <ellipse cx="32" cy="20" rx="4" ry="8" fill="url(#nineHeartFlowerGrad)" stroke="#ec407a" stroke-width="0.5" transform="rotate(320 32 20)"/>
    <!-- 花心 -->
    <circle cx="32" cy="20" r="4" fill="#fff" stroke="#f48fb1" stroke-width="0.5"/>
    <circle cx="32" cy="20" r="2" fill="#ec407a"/>
    <!-- 治愈光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#healingGlow)" opacity="0.3"/>
    <!-- 光点 -->
    <circle cx="18" cy="16" r="1.5" fill="#fce4ec" opacity="0.8"/>
    <circle cx="46" cy="16" r="1.5" fill="#fce4ec" opacity="0.8"/>
    <circle cx="32" cy="8" r="2" fill="#fce4ec" opacity="0.9"/>`,
    theme: "nature"
  },
  "奇茸通天菊": {
    svg: `<defs>
      <radialGradient id="strangeDaisyGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff9c4"/>
        <stop offset="60%" style="stop-color:#fff176"/>
        <stop offset="100%" style="stop-color:#ffd54f"/>
      </radialGradient>
      <radialGradient id="divineDaisyGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.7"/>
        <stop offset="100%" style="stop-color:#fff176;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 花茎 -->
    <path d="M32 52 L32 24" stroke="#558b2f" stroke-width="2.5" stroke-linecap="round"/>
    <!-- 通天花瓣 -->
    <path d="M32 16 Q24 8 20 16 Q24 24 32 16" fill="url(#strangeDaisyGrad)" stroke="#f9a825" stroke-width="0.5"/>
    <path d="M32 16 Q40 8 44 16 Q40 24 32 16" fill="url(#strangeDaisyGrad)" stroke="#f9a825" stroke-width="0.5"/>
    <path d="M32 16 Q32 6 28 10 Q32 14 32 16" fill="url(#strangeDaisyGrad)" stroke="#f9a825" stroke-width="0.5"/>
    <path d="M32 16 Q32 6 36 10 Q32 14 32 16" fill="url(#strangeDaisyGrad)" stroke="#f9a825" stroke-width="0.5"/>
    <path d="M32 16 Q18 12 22 20 Q28 20 32 16" fill="url(#strangeDaisyGrad)" stroke="#f9a825" stroke-width="0.5"/>
    <path d="M32 16 Q46 12 42 20 Q36 20 32 16" fill="url(#strangeDaisyGrad)" stroke="#f9a825" stroke-width="0.5"/>
    <path d="M32 16 Q20 22 26 26 Q30 20 32 16" fill="url(#strangeDaisyGrad)" stroke="#f9a825" stroke-width="0.5"/>
    <path d="M32 16 Q44 22 38 26 Q34 20 32 16" fill="url(#strangeDaisyGrad)" stroke="#f9a825" stroke-width="0.5"/>
    <!-- 花心 -->
    <circle cx="32" cy="16" r="5" fill="#ffeb3b" stroke="#f9a825" stroke-width="1"/>
    <circle cx="32" cy="16" r="2" fill="#ff6f00"/>
    <!-- 通天之光 -->
    <path d="M32 8 L32 4" stroke="#fff176" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 10 L22 6" stroke="#fff176" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M40 10 L42 6" stroke="#fff176" stroke-width="1.5" stroke-linecap="round"/>
    <!-- 神圣光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#divineDaisyGlow)" opacity="0.3"/>`,
    theme: "nature"
  },
  "无形剑意": {
    svg: `<defs>
      <linearGradient id="invisibleSwordGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e0e0e0;stop-opacity:0.8"/>
        <stop offset="50%" style="stop-color:#bdbdbd;stop-opacity:0.5"/>
        <stop offset="100%" style="stop-color:#9e9e9e;stop-opacity:0.2"/>
      </linearGradient>
      <radialGradient id="swordIntentGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#fff;stop-opacity:0.5"/>
        <stop offset="100%" style="stop-color:#e0e0e0;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 无形剑 -->
    <path d="M30 8 L34 8 L34 44 L32 50 L30 44 Z" fill="url(#invisibleSwordGrad)" stroke="#bdbdbd" stroke-width="0.8" opacity="0.6"/>
    <line x1="32" y1="6" x2="32" y2="48" stroke="#fff" stroke-width="1" opacity="0.4"/>
    <!-- 剑柄 -->
    <rect x="29" y="48" width="6" height="8" rx="1" fill="none" stroke="#9e9e9e" stroke-width="0.8" opacity="0.5"/>
    <!-- 剑意 -->
    <path d="M20 16 L26 22" stroke="#e0e0e0" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
    <path d="M44 16 L38 22" stroke="#e0e0e0" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
    <path d="M18 32 L24 34" stroke="#e0e0e0" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/>
    <path d="M46 32 L40 34" stroke="#e0e0e0" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/>
    <path d="M22 44 L28 42" stroke="#e0e0e0" stroke-width="1" opacity="0.3" stroke-linecap="round"/>
    <path d="M42 44 L36 42" stroke="#e0e0e0" stroke-width="1" opacity="0.3" stroke-linecap="round"/>
    <!-- 气场 -->
    <circle cx="32" cy="28" r="20" fill="url(#swordIntentGlow)" opacity="0.2"/>
    <ellipse cx="32" cy="28" rx="24" ry="24" fill="none" stroke="#e0e0e0" stroke-width="0.5" opacity="0.2" stroke-dasharray="4,4"/>`,
    theme: "metal"
  },
  "千机算盘": {
    svg: `<defs>
      <linearGradient id="abacusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#8d6e63"/>
        <stop offset="50%" style="stop-color:#6d4c41"/>
        <stop offset="100%" style="stop-color:#5d4037"/>
      </linearGradient>
      <radialGradient id="abacusGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#d7ccc8;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#8d6e63;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 外框 -->
    <rect x="14" y="16" width="36" height="32" rx="3" fill="url(#abacusGrad)" stroke="#5d4037" stroke-width="2"/>
    <!-- 算珠杆 -->
    <line x1="20" y1="20" x2="20" y2="44" stroke="#a1887f" stroke-width="1.5"/>
    <line x1="26" y1="20" x2="26" y2="44" stroke="#a1887f" stroke-width="1.5"/>
    <line x1="32" y1="20" x2="32" y2="44" stroke="#a1887f" stroke-width="1.5"/>
    <line x1="38" y1="20" x2="38" y2="44" stroke="#a1887f" stroke-width="1.5"/>
    <line x1="44" y1="20" x2="44" y2="44" stroke="#a1887f" stroke-width="1.5"/>
    <!-- 算珠 -->
    <circle cx="20" cy="24" r="2" fill="#d7ccc8" stroke="#8d6e63" stroke-width="0.5"/>
    <circle cx="20" cy="30" r="2" fill="#d7ccc8" stroke="#8d6e63" stroke-width="0.5"/>
    <circle cx="20" cy="36" r="2" fill="#d7ccc8" stroke="#8d6e63" stroke-width="0.5"/>
    <circle cx="26" cy="24" r="2" fill="#d7ccc8" stroke="#8d6e63" stroke-width="0.5"/>
    <circle cx="26" cy="36" r="2" fill="#d7ccc8" stroke="#8d6e63" stroke-width="0.5"/>
    <circle cx="32" cy="28" r="2" fill="#d7ccc8" stroke="#8d6e63" stroke-width="0.5"/>
    <circle cx="32" cy="34" r="2" fill="#d7ccc8" stroke="#8d6e63" stroke-width="0.5"/>
    <circle cx="38" cy="24" r="2" fill="#d7ccc8" stroke="#8d6e63" stroke-width="0.5"/>
    <circle cx="38" cy="30" r="2" fill="#d7ccc8" stroke="#8d6e63" stroke-width="0.5"/>
    <circle cx="38" cy="36" r="2" fill="#d7ccc8" stroke="#8d6e63" stroke-width="0.5"/>
    <circle cx="44" cy="28" r="2" fill="#d7ccc8" stroke="#8d6e63" stroke-width="0.5"/>
    <circle cx="44" cy="34" r="2" fill="#d7ccc8" stroke="#8d6e63" stroke-width="0.5"/>
    <!-- 智慧光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#abacusGlow)" opacity="0.3"/>
    <!-- 计算之光 -->
    <circle cx="14" cy="12" r="1.5" fill="#d7ccc8" opacity="0.7"/>
    <circle cx="50" cy="12" r="1.5" fill="#d7ccc8" opacity="0.7"/>`,
    theme: "metal"
  },
  "月影神狐": {
    svg: `<defs>
      <radialGradient id="moonFoxGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ce93d8"/>
        <stop offset="60%" style="stop-color:#ab47bc"/>
        <stop offset="100%" style="stop-color:#8e24aa"/>
      </radialGradient>
      <radialGradient id="foxEye" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffeb3b"/>
        <stop offset="100%" style="stop-color:#ffc107"/>
      </radialGradient>
      <radialGradient id="moonShadowGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#e1bee7;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#ce93d8;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 身体 -->
    <ellipse cx="32" cy="36" rx="12" ry="10" fill="url(#moonFoxGrad)" stroke="#8e24aa" stroke-width="1.5"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="20" rx="9" ry="8" fill="#ce93d8" stroke="#8e24aa" stroke-width="1"/>
    <!-- 尖耳 -->
    <path d="M24 14 L20 4 L28 12" fill="#ce93d8" stroke="#8e24aa" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M40 14 L44 4 L36 12" fill="#ce93d8" stroke="#8e24aa" stroke-width="1.5" stroke-linejoin="round"/>
    <!-- 眼睛 -->
    <ellipse cx="28" cy="19" rx="2.5" ry="3" fill="url(#foxEye)"/>
    <ellipse cx="36" cy="19" rx="2.5" ry="3" fill="url(#foxEye)"/>
    <ellipse cx="28" cy="19" rx="1" ry="2" fill="#000"/>
    <ellipse cx="36" cy="19" rx="1" ry="2" fill="#000"/>
    <!-- 月亮 -->
    <path d="M48 12 Q52 18 48 24 Q44 18 48 12 Z" fill="#fff9c4" stroke="#ffd54f" stroke-width="0.5"/>
    <!-- 尾巴 -->
    <path d="M44 36 Q54 32 52 24 Q50 20 46 24" fill="none" stroke="#ab47bc" stroke-width="3" stroke-linecap="round"/>
    <!-- 幻影 -->
    <ellipse cx="16" cy="30" rx="3" ry="5" fill="#e1bee7" opacity="0.4"/>
    <ellipse cx="48" cy="30" rx="3" ry="5" fill="#e1bee7" opacity="0.4"/>
    <!-- 月影光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#moonShadowGlow)" opacity="0.3"/>`,
    theme: "moon"
  },
  "幽莲血心": {
    svg: `<defs>
      <radialGradient id="bloodLotusGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ef5350"/>
        <stop offset="60%" style="stop-color:#c62828"/>
        <stop offset="100%" style="stop-color:#b71c1c"/>
      </radialGradient>
      <radialGradient id="bloodGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffcdd2;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#ef5350;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 花茎 -->
    <path d="M32 52 L32 24" stroke="#2e7d32" stroke-width="2.5" stroke-linecap="round"/>
    <!-- 血莲花瓣 -->
    <ellipse cx="32" cy="18" rx="4" ry="10" fill="url(#bloodLotusGrad)" stroke="#b71c1c" stroke-width="0.5" transform="rotate(0 32 18)"/>
    <ellipse cx="32" cy="18" rx="4" ry="10" fill="url(#bloodLotusGrad)" stroke="#b71c1c" stroke-width="0.5" transform="rotate(45 32 18)"/>
    <ellipse cx="32" cy="18" rx="4" ry="10" fill="url(#bloodLotusGrad)" stroke="#b71c1c" stroke-width="0.5" transform="rotate(90 32 18)"/>
    <ellipse cx="32" cy="18" rx="4" ry="10" fill="url(#bloodLotusGrad)" stroke="#b71c1c" stroke-width="0.5" transform="rotate(135 32 18)"/>
    <!-- 花心 -->
    <circle cx="32" cy="18" r="5" fill="#ffcdd2" stroke="#ef5350" stroke-width="0.5"/>
    <circle cx="32" cy="18" r="2.5" fill="#b71c1c"/>
    <!-- 血滴 -->
    <path d="M18 16 Q18 12 20 14 Q22 12 22 16 Q20 20 18 16" fill="#ef5350" opacity="0.7"/>
    <path d="M42 16 Q42 12 44 14 Q46 12 46 16 Q44 20 42 16" fill="#ef5350" opacity="0.7"/>
    <path d="M32 8 Q32 4 34 6 Q36 4 36 8 Q34 12 32 8" fill="#ef5350" opacity="0.7"/>
    <!-- 血莲光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#bloodGlow)" opacity="0.3"/>
    <!-- 幽冥之气 -->
    <ellipse cx="32" cy="52" rx="12" ry="3" fill="#b71c1c" opacity="0.2"/>`,
    theme: "nature"
  },
  // ──── 顶级隐藏 HA ────
  "昊天九绝锤": {
    svg: `<defs>
      <linearGradient id="nineExtremeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#424242"/>
        <stop offset="50%" style="stop-color:#212121"/>
        <stop offset="100%" style="stop-color:#000"/>
      </linearGradient>
      <radialGradient id="nineGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ff1744;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#ff1744;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 锤头 -->
    <rect x="14" y="14" width="36" height="24" rx="4" fill="url(#nineExtremeGrad)" stroke="#000" stroke-width="2"/>
    <rect x="18" y="18" width="28" height="16" rx="2" fill="#424242" stroke="#616161" stroke-width="1"/>
    <!-- 九绝纹 -->
    <line x1="22" y1="22" x2="22" y2="30" stroke="#ff1744" stroke-width="1.5"/>
    <line x1="26" y1="22" x2="26" y2="30" stroke="#ff1744" stroke-width="1.5"/>
    <line x1="30" y1="22" x2="30" y2="30" stroke="#ff1744" stroke-width="1.5"/>
    <line x1="34" y1="22" x2="34" y2="30" stroke="#ff1744" stroke-width="1.5"/>
    <line x1="38" y1="22" x2="38" y2="30" stroke="#ff1744" stroke-width="1.5"/>
    <line x1="20" y1="24" x2="40" y2="24" stroke="#ff1744" stroke-width="0.8" opacity="0.5"/>
    <line x1="20" y1="28" x2="40" y2="28" stroke="#ff1744" stroke-width="0.8" opacity="0.5"/>
    <!-- 锤柄 -->
    <rect x="28" y="38" width="8" height="16" rx="2" fill="#5d4037" stroke="#3e2723" stroke-width="1.5"/>
    <rect x="25" y="40" width="14" height="3" rx="1" fill="#ff1744" stroke="#b71c1c" stroke-width="0.5"/>
    <!-- 毁灭光环 -->
    <circle cx="32" cy="26" r="26" fill="url(#nineGlow)" opacity="0.3"/>
    <ellipse cx="32" cy="26" rx="28" ry="28" fill="none" stroke="#ff1744" stroke-width="1" opacity="0.2" stroke-dasharray="3,3"/>`,
    theme: "chaos"
  },
  "饕餮神牛": {
    svg: `<defs>
      <radialGradient id="taotieGrad" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#5c6bc0"/>
        <stop offset="60%" style="stop-color:#3949ab"/>
        <stop offset="100%" style="stop-color:#1a237e"/>
      </radialGradient>
      <radialGradient id="devourGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#7986cb;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#3949ab;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 身体 -->
    <ellipse cx="32" cy="38" rx="14" ry="11" fill="url(#taotieGrad)" stroke="#1a237e" stroke-width="2"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="20" rx="11" ry="10" fill="#3949ab" stroke="#1a237e" stroke-width="1.5"/>
    <!-- 巨口 -->
    <ellipse cx="32" cy="24" rx="8" ry="6" fill="#1a237e" stroke="#3949ab" stroke-width="1"/>
    <path d="M26 22 L28 26 L30 22 L32 26 L34 22 L36 26 L38 22" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round"/>
    <!-- 牛角 -->
    <path d="M22 14 L18 6 L24 12" fill="#3949ab" stroke="#1a237e" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M42 14 L46 6 L40 12" fill="#3949ab" stroke="#1a237e" stroke-width="1.5" stroke-linejoin="round"/>
    <!-- 眼睛 -->
    <circle cx="26" cy="18" r="2.5" fill="#ff1744"/>
    <circle cx="38" cy="18" r="2.5" fill="#ff1744"/>
    <!-- 吞噬光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#devourGlow)" opacity="0.3"/>
    <!-- 吞噬效果 -->
    <path d="M14 32 Q10 36 14 40" fill="none" stroke="#7986cb" stroke-width="1.5" opacity="0.5"/>
    <path d="M50 32 Q54 36 50 40" fill="none" stroke="#7986cb" stroke-width="1.5" opacity="0.5"/>`,
    theme: "beast"
  },
  "死神镰刀": {
    svg: `<defs>
      <linearGradient id="deathScytheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#424242"/>
        <stop offset="50%" style="stop-color:#212121"/>
        <stop offset="100%" style="stop-color:#000"/>
      </linearGradient>
      <radialGradient id="deathGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#f44336;stop-opacity:0.5"/>
        <stop offset="100%" style="stop-color:#f44336;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 镰刀刃 -->
    <path d="M24 12 Q52 12 52 32 Q52 52 24 52 L24 44 Q44 44 44 32 Q44 20 24 20 Z" fill="url(#deathScytheGrad)" stroke="#000" stroke-width="1.5"/>
    <path d="M24 20 Q44 20 44 32 Q44 44 24 44" fill="none" stroke="#f44336" stroke-width="1" opacity="0.6"/>
    <!-- 刀柄 -->
    <rect x="20" y="44" width="8" height="16" rx="2" fill="#5d4037" stroke="#3e2723" stroke-width="1.5"/>
    <!-- 骷髅装饰 -->
    <circle cx="24" cy="16" r="4" fill="#424242" stroke="#000" stroke-width="1"/>
    <circle cx="22" cy="15" r="1" fill="#f44336"/>
    <circle cx="26" cy="15" r="1" fill="#f44336"/>
    <path d="M22 18 Q24 19 26 18" fill="none" stroke="#000" stroke-width="0.8"/>
    <!-- 死亡气息 -->
    <ellipse cx="16" cy="28" rx="3" ry="6" fill="#f44336" opacity="0.4"/>
    <ellipse cx="40" cy="52" rx="10" ry="3" fill="#f44336" opacity="0.2"/>
    <!-- 死亡光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#deathGlow)" opacity="0.2"/>`,
    theme: "death"
  },
  "虚空裂爪": {
    svg: `<defs>
      <radialGradient id="voidClawGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#311b92"/>
        <stop offset="60%" style="stop-color:#1a237e"/>
        <stop offset="100%" style="stop-color:#000"/>
      </radialGradient>
      <radialGradient id="voidClawGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#7c4dff;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#311b92;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 虚空之爪 -->
    <ellipse cx="32" cy="36" rx="12" ry="10" fill="url(#voidClawGrad)" stroke="#1a237e" stroke-width="1.5"/>
    <!-- 爪指 -->
    <path d="M22 32 L14 18 L18 20 L24 30" fill="none" stroke="#311b92" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28 30 L26 12 L30 14 L30 28" fill="none" stroke="#311b92" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M36 30 L38 12 L34 14 L34 28" fill="none" stroke="#311b92" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M42 32 L50 18 L46 20 L40 30" fill="none" stroke="#311b92" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- 虚空裂隙 -->
    <path d="M20 14 Q24 10 28 14" fill="none" stroke="#7c4dff" stroke-width="1.5" opacity="0.7"/>
    <path d="M36 14 Q40 10 44 14" fill="none" stroke="#7c4dff" stroke-width="1.5" opacity="0.7"/>
    <path d="M28 10 Q32 6 36 10" fill="none" stroke="#7c4dff" stroke-width="1.5" opacity="0.7"/>
    <!-- 虚空光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#voidClawGlow)" opacity="0.3"/>
    <!-- 虚空碎片 -->
    <path d="M14 44 L16 40 L18 44 Z" fill="#7c4dff" opacity="0.5"/>
    <path d="M46 44 L48 40 L50 44 Z" fill="#7c4dff" opacity="0.5"/>`,
    theme: "void"
  },
  "天魔琴": {
    svg: `<defs>
      <linearGradient id="demonZitherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#7b1fa2"/>
        <stop offset="50%" style="stop-color:#4a148c"/>
        <stop offset="100%" style="stop-color:#311b92"/>
      </linearGradient>
      <radialGradient id="demonNoteGlow" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#e040fb;stop-opacity:0.6"/>
        <stop offset="100%" style="stop-color:#7b1fa2;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 琴身 -->
    <ellipse cx="32" cy="34" rx="16" ry="14" fill="url(#demonZitherGrad)" stroke="#311b92" stroke-width="1.5"/>
    <!-- 琴弦 -->
    <line x1="20" y1="24" x2="20" y2="44" stroke="#e1bee7" stroke-width="0.8"/>
    <line x1="24" y1="22" x2="24" y2="46" stroke="#e1bee7" stroke-width="0.8"/>
    <line x1="28" y1="21" x2="28" y2="47" stroke="#e1bee7" stroke-width="0.8"/>
    <line x1="32" y1="20" x2="32" y2="48" stroke="#e1bee7" stroke-width="0.8"/>
    <line x1="36" y1="21" x2="36" y2="47" stroke="#e1bee7" stroke-width="0.8"/>
    <line x1="40" y1="22" x2="40" y2="46" stroke="#e1bee7" stroke-width="0.8"/>
    <line x1="44" y1="24" x2="44" y2="44" stroke="#e1bee7" stroke-width="0.8"/>
    <!-- 琴头 -->
    <path d="M26 20 Q32 14 38 20" fill="none" stroke="#7b1fa2" stroke-width="2" stroke-linecap="round"/>
    <!-- 魔音 -->
    <circle cx="14" cy="18" r="2" fill="#e040fb" opacity="0.7"/>
    <circle cx="10" cy="26" r="1.5" fill="#e040fb" opacity="0.6"/>
    <circle cx="12" cy="34" r="2" fill="#e040fb" opacity="0.7"/>
    <circle cx="50" cy="18" r="2" fill="#e040fb" opacity="0.7"/>
    <circle cx="54" cy="26" r="1.5" fill="#e040fb" opacity="0.6"/>
    <circle cx="52" cy="34" r="2" fill="#e040fb" opacity="0.7"/>
    <!-- 魔音光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#demonNoteGlow)" opacity="0.3"/>
    <!-- 声波 -->
    <path d="M8 20 Q6 32 8 44" fill="none" stroke="#e040fb" stroke-width="1" opacity="0.4"/>
    <path d="M56 20 Q58 32 56 44" fill="none" stroke="#e040fb" stroke-width="1" opacity="0.4"/>`,
    theme: "sound"
  },
  "混沌神炉": {
    svg: `<defs>
      <radialGradient id="chaosFurnaceGrad" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#ff5722"/>
        <stop offset="60%" style="stop-color:#d50000"/>
        <stop offset="100%" style="stop-color:#8e0000"/>
      </radialGradient>
      <radialGradient id="furnaceFire" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffeb3b;stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#ff5722;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <!-- 炉身 -->
    <path d="M20 48 L22 32 L26 24 L32 20 L38 24 L42 32 L44 48 Z" fill="url(#chaosFurnaceGrad)" stroke="#8e0000" stroke-width="2" stroke-linejoin="round"/>
    <!-- 炉口 -->
    <ellipse cx="32" cy="20" rx="12" ry="4" fill="#ff5722" stroke="#bf360c" stroke-width="1"/>
    <ellipse cx="32" cy="20" rx="8" ry="2.5" fill="#ff9800"/>
    <!-- 火焰 -->
    <path d="M28 16 Q26 10 30 8" fill="none" stroke="#ffeb3b" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 16 Q32 8 34 6" fill="none" stroke="#ff9800" stroke-width="3" stroke-linecap="round"/>
    <path d="M36 16 Q38 10 34 8" fill="none" stroke="#ffeb3b" stroke-width="2.5" stroke-linecap="round"/>
    <!-- 混沌纹 -->
    <path d="M26 32 Q32 28 38 32" fill="none" stroke="#ffeb3b" stroke-width="1.5" opacity="0.6"/>
    <path d="M24 38 Q32 34 40 38" fill="none" stroke="#ffeb3b" stroke-width="1.5" opacity="0.6"/>
    <path d="M26 44 Q32 40 38 44" fill="none" stroke="#ffeb3b" stroke-width="1.5" opacity="0.6"/>
    <!-- 混沌之火 -->
    <circle cx="18" cy="16" r="2.5" fill="#ff9800" opacity="0.8"/>
    <circle cx="46" cy="16" r="2.5" fill="#ff9800" opacity="0.8"/>
    <circle cx="32" cy="6" r="3" fill="#ffeb3b" opacity="0.9"/>
    <!-- 神炉光环 -->
    <circle cx="32" cy="32" r="24" fill="url(#furnaceFire)" opacity="0.3"/>`,
    theme: "fire"
  },
  // ──── 双生武魂 Twin ────
  "蓝银草+昊天锤": {
    svg: `<defs>
      <linearGradient id="twinGrassHammer" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4caf50"/>
        <stop offset="50%" style="stop-color:#388e3c"/>
        <stop offset="100%" style="stop-color:#212121"/>
      </linearGradient>
    </defs>
    <!-- 蓝银草 -->
    <path d="M20 52 Q20 32 16 20" stroke="#4caf50" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M16 20 Q10 14 8 18" stroke="#4caf50" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="20" cy="52" rx="4" ry="2" fill="#8B4513" opacity="0.5"/>
    <!-- 昊天锤 -->
    <rect x="34" y="18" width="18" height="14" rx="2" fill="#424242" stroke="#212121" stroke-width="1.5"/>
    <rect x="38" y="22" width="10" height="6" fill="#616161" stroke="#424242" stroke-width="0.5"/>
    <rect x="40" y="32" width="6" height="16" rx="1" fill="#5d4037" stroke="#3e2723" stroke-width="1"/>
    <!-- 双生连接 -->
    <path d="M24 32 Q32 28 36 32" fill="none" stroke="url(#twinGrassHammer)" stroke-width="2" stroke-linecap="round"/>
    <circle cx="32" cy="30" r="3" fill="none" stroke="#ffd54f" stroke-width="1.5"/>`,
    theme: "dual"
  },
  "圣天使+堕天使": {
    svg: `<defs>
      <linearGradient id="lightDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fff176"/>
        <stop offset="50%" style="stop-color:#ffd54f"/>
        <stop offset="50%" style="stop-color:#7c4dff"/>
        <stop offset="100%" style="stop-color:#4a148c"/>
      </linearGradient>
    </defs>
    <!-- 圣天使左翼 -->
    <path d="M32 28 Q18 18 12 26 Q18 34 32 28" fill="#fff9c4" stroke="#ffd54f" stroke-width="1"/>
    <!-- 堕天使右翼 -->
    <path d="M32 28 Q46 18 52 26 Q46 34 32 28" fill="#4a148c" stroke="#7c4dff" stroke-width="1"/>
    <!-- 身体 -->
    <ellipse cx="32" cy="32" rx="5" ry="10" fill="url(#lightDarkGrad)" stroke="#ffd54f" stroke-width="1"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="18" rx="6" ry="5" fill="#fff176" stroke="#4a148c" stroke-width="1"/>
    <circle cx="30" cy="17" r="1.5" fill="#3e2723"/>
    <circle cx="34" cy="17" r="1.5" fill="#3e2723"/>
    <!-- 阴阳 -->
    <circle cx="32" cy="44" r="8" fill="none" stroke="url(#lightDarkGrad)" stroke-width="1.5"/>
    <path d="M32 36 L32 52" stroke="url(#lightDarkGrad)" stroke-width="1"/>
    <circle cx="32" cy="40" r="2" fill="#fff176"/>
    <circle cx="32" cy="48" r="2" fill="#4a148c"/>`,
    theme: "dual"
  },
  "金龙+银龙": {
    svg: `<defs>
      <linearGradient id="goldSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ffd54f"/>
        <stop offset="50%" style="stop-color:#fff"/>
        <stop offset="100%" style="stop-color:#c0c0c0"/>
      </linearGradient>
    </defs>
    <!-- 金龙 -->
    <path d="M14 36 Q20 28 26 32" fill="none" stroke="#ffd54f" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="14" cy="36" rx="5" ry="4" fill="#ffd54f" stroke="#f9a825" stroke-width="1"/>
    <circle cx="12" cy="35" r="1.5" fill="#3e2723"/>
    <!-- 银龙 -->
    <path d="M50 36 Q44 28 38 32" fill="none" stroke="#c0c0c0" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="50" cy="36" rx="5" ry="4" fill="#c0c0c0" stroke="#9e9e9e" stroke-width="1"/>
    <circle cx="48" cy="35" r="1.5" fill="#3e2723"/>
    <!-- 龙身交织 -->
    <path d="M26 32 Q32 26 38 32" fill="none" stroke="url(#goldSilverGrad)" stroke-width="3" stroke-linecap="round"/>
    <!-- 龙珠 -->
    <circle cx="32" cy="28" r="4" fill="url(#goldSilverGrad)" stroke="#ffd54f" stroke-width="1"/>
    <circle cx="32" cy="28" r="2" fill="#fff"/>`,
    theme: "dual"
  },
  "冰火双凤": {
    svg: `<defs>
      <linearGradient id="iceFirePhoenixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4fc3f7"/>
        <stop offset="50%" style="stop-color:#fff"/>
        <stop offset="100%" style="stop-color:#ff5722"/>
      </linearGradient>
    </defs>
    <!-- 冰凤左翼 -->
    <path d="M32 30 Q18 22 14 30 Q18 38 32 32" fill="#e1f5fe" stroke="#0288d1" stroke-width="1"/>
    <!-- 火凤右翼 -->
    <path d="M32 30 Q46 22 50 30 Q46 38 32 32" fill="#ffccbc" stroke="#e64a19" stroke-width="1"/>
    <!-- 身体 -->
    <ellipse cx="32" cy="32" rx="5" ry="10" fill="url(#iceFirePhoenixGrad)" stroke="#fff" stroke-width="1"/>
    <!-- 头部 -->
    <ellipse cx="32" cy="18" rx="6" ry="5" fill="#fff" stroke="#0288d1" stroke-width="1"/>
    <circle cx="30" cy="17" r="1.5" fill="#0288d1"/>
    <circle cx="34" cy="17" r="1.5" fill="#e64a19"/>
    <!-- 冰火尾 -->
    <path d="M28 44 Q24 50 28 54" fill="none" stroke="#4fc3f7" stroke-width="2" stroke-linecap="round"/>
    <path d="M32 44 Q32 52 32 56" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M36 44 Q40 50 36 54" fill="none" stroke="#ff5722" stroke-width="2" stroke-linecap="round"/>
    <!-- 双生核心 -->
    <circle cx="32" cy="32" r="3" fill="#fff" stroke="#0288d1" stroke-width="0.5"/>
    <circle cx="32" cy="32" r="1.5" fill="#ff5722"/>`,
    theme: "dual"
  },
  "雷剑双生": {
    svg: `<defs>
      <linearGradient id="thunderSwordGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ffeb3b"/>
        <stop offset="50%" style="stop-color:#fff"/>
        <stop offset="100%" style="stop-color:#7c4dff"/>
      </linearGradient>
    </defs>
    <!-- 雷霆之剑 -->
    <path d="M28 8 L32 8 L32 42 L30 48 L28 42 Z" fill="#fff176" stroke="#f9a825" stroke-width="1"/>
    <rect x="27" y="42" width="6" height="8" rx="1" fill="#5d4037" stroke="#3e2723" stroke-width="0.5"/>
    <!-- 雷电 -->
    <path d="M14 14 L18 22 L14 26 L18 34" fill="none" stroke="#ffeb3b" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M50 14 L46 22 L50 26 L46 34" fill="none" stroke="#ffeb3b" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- 剑意 -->
    <path d="M36 10 L40 10 L40 40 L38 46 L36 40 Z" fill="#b39ddb" stroke="#7c4dff" stroke-width="1" opacity="0.7"/>
    <!-- 双生连接 -->
    <path d="M30 48 Q32 52 34 48" fill="none" stroke="#ffeb3b" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="32" cy="50" r="2" fill="url(#thunderSwordGrad)"/>`,
    theme: "dual"
  },
  "星辰+混沌": {
    svg: `<defs>
      <linearGradient id="starChaosGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ffd54f"/>
        <stop offset="50%" style="stop-color:#fff"/>
        <stop offset="100%" style="stop-color:#7c4dff"/>
      </linearGradient>
    </defs>
    <!-- 星辰 -->
    <path d="M20 14 L21 17 L24 17 L22 19 L23 22 L20 20 L17 22 L18 19 L16 17 L19 17 Z" fill="#ffd54f"/>
    <path d="M14 24 L15 27 L18 27 L16 29 L17 32 L14 30 L11 32 L12 29 L10 27 L13 27 Z" fill="#fff"/>
    <!-- 混沌漩涡 -->
    <circle cx="44" cy="30" r="10" fill="none" stroke="#7c4dff" stroke-width="2" stroke-dasharray="4,2"/>
    <circle cx="44" cy="30" r="6" fill="none" stroke="#f44336" stroke-width="1.5" stroke-dasharray="3,1" transform="rotate(45 44 30)"/>
    <circle cx="44" cy="30" r="3" fill="#7c4dff"/>
    <!-- 连接 -->
    <path d="M24 24 Q32 20 38 26" fill="none" stroke="url(#starChaosGrad)" stroke-width="2" stroke-linecap="round"/>
    <circle cx="32" cy="24" r="3" fill="url(#starChaosGrad)"/>
    <circle cx="32" cy="24" r="1.5" fill="#fff"/>`,
    theme: "dual"
  },
  "幽冥+圣光": {
    svg: `<defs>
      <linearGradient id="netherHolyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4a148c"/>
        <stop offset="50%" style="stop-color:#fff"/>
        <stop offset="100%" style="stop-color:#ffd54f"/>
      </linearGradient>
    </defs>
    <!-- 幽冥 -->
    <ellipse cx="22" cy="32" rx="10" ry="12" fill="#4a148c" stroke="#311b92" stroke-width="1.5" opacity="0.8"/>
    <ellipse cx="22" cy="24" rx="6" ry="5" fill="#311b92" stroke="#4a148c" stroke-width="1"/>
    <ellipse cx="20" cy="23" rx="2" ry="2.5" fill="#e040fb"/>
    <ellipse cx="24" cy="23" rx="2" ry="2.5" fill="#e040fb"/>
    <!-- 圣光 -->
    <ellipse cx="42" cy="32" rx="10" ry="12" fill="#fff9c4" stroke="#ffd54f" stroke-width="1.5" opacity="0.8"/>
    <ellipse cx="42" cy="24" rx="6" ry="5" fill="#fff176" stroke="#ffd54f" stroke-width="1"/>
    <circle cx="40" cy="23" r="1.5" fill="#3e2723"/>
    <circle cx="44" cy="23" r="1.5" fill="#3e2723"/>
    <!-- 生死循环 -->
    <path d="M26 32 Q32 28 38 32" fill="none" stroke="url(#netherHolyGrad)" stroke-width="2" stroke-linecap="round"/>
    <circle cx="32" cy="30" r="3" fill="#fff" stroke="#ffd54f" stroke-width="1"/>
    <path d="M30 30 Q32 28 34 30" fill="none" stroke="#4a148c" stroke-width="1"/>`,
    theme: "dual"
  },
  "时间+空间": {
    svg: `<defs>
      <linearGradient id="timeSpaceDualGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#5c6bc0"/>
        <stop offset="50%" style="stop-color:#fff"/>
        <stop offset="100%" style="stop-color:#7c4dff"/>
      </linearGradient>
    </defs>
    <!-- 时间 -->
    <circle cx="24" cy="28" r="10" fill="none" stroke="#5c6bc0" stroke-width="2"/>
    <line x1="24" y1="28" x2="24" y2="20" stroke="#5c6bc0" stroke-width="1.5"/>
    <line x1="24" y1="28" x2="30" y2="28" stroke="#5c6bc0" stroke-width="1"/>
    <circle cx="24" cy="28" r="2" fill="#5c6bc0"/>
    <!-- 空间 -->
    <path d="M44 20 L52 24 L52 36 L44 40 L36 36 L36 24 Z" fill="none" stroke="#7c4dff" stroke-width="2"/>
    <path d="M44 20 L44 28 L52 24" fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.6"/>
    <path d="M44 28 L36 24" fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.6"/>
    <path d="M44 28 L44 40" fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.6"/>
    <!-- 连接 -->
    <path d="M30 28 Q36 24 38 28" fill="none" stroke="url(#timeSpaceDualGrad)" stroke-width="2" stroke-linecap="round"/>
    <circle cx="34" cy="26" r="2.5" fill="url(#timeSpaceDualGrad)"/>
    <!-- 时空裂缝 -->
    <path d="M32 14 Q34 10 36 14" fill="none" stroke="#7c4dff" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M32 44 Q34 48 36 44" fill="none" stroke="#5c6bc0" stroke-width="1.5" stroke-linecap="round"/>`,
    theme: "dual"
  },
  "神火+神冰": {
    svg: `<defs>
      <linearGradient id="godFireIceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff5722"/>
        <stop offset="50%" style="stop-color:#fff"/>
        <stop offset="100%" style="stop-color:#4fc3f7"/>
      </linearGradient>
    </defs>
    <!-- 神火 -->
    <path d="M22 48 Q18 36 22 24 Q26 18 26 28 Q26 36 22 48" fill="#ff5722" stroke="#e64a19" stroke-width="1"/>
    <path d="M26 48 Q22 38 26 28 Q30 22 30 32 Q30 40 26 48" fill="#ff9800" stroke="#f57c00" stroke-width="1"/>
    <!-- 神冰 -->
    <path d="M38 48 Q42 36 38 24 Q34 18 34 28 Q34 36 38 48" fill="#4fc3f7" stroke="#0288d1" stroke-width="1"/>
    <path d="M34 48 Q38 38 34 28 Q30 22 30 32 Q30 40 34 48" fill="#81d4fa" stroke="#4fc3f7" stroke-width="1"/>
    <!-- 核心 -->
    <circle cx="32" cy="32" r="5" fill="url(#godFireIceGrad)" stroke="#fff" stroke-width="1"/>
    <circle cx="32" cy="32" r="2" fill="#fff"/>
    <!-- 极端共鸣 -->
    <path d="M16 16 L20 20" stroke="#ff5722" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M48 16 L44 20" stroke="#4fc3f7" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M16 48 L20 44" stroke="#ff5722" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M48 48 L44 44" stroke="#4fc3f7" stroke-width="1.5" stroke-linecap="round"/>`,
    theme: "dual"
  },
  // ──── 三生武魂 Triple ────
  "冰火雷三生龙": {
    svg: `<defs>
      <linearGradient id="tripleDragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4fc3f7"/>
        <stop offset="33%" style="stop-color:#ff5722"/>
        <stop offset="66%" style="stop-color:#ffeb3b"/>
        <stop offset="100%" style="stop-color:#4fc3f7"/>
      </linearGradient>
    </defs>
    <!-- 三头龙 -->
    <path d="M20 36 Q24 28 28 32" fill="none" stroke="#4fc3f7" stroke-width="4" stroke-linecap="round"/>
    <path d="M32 36 Q32 26 32 30" fill="none" stroke="#ff5722" stroke-width="4" stroke-linecap="round"/>
    <path d="M44 36 Q40 28 36 32" fill="none" stroke="#ffeb3b" stroke-width="4" stroke-linecap="round"/>
    <!-- 龙头 -->
    <ellipse cx="20" cy="36" rx="5" ry="4" fill="#4fc3f7" stroke="#0288d1" stroke-width="1"/>
    <ellipse cx="32" cy="36" rx="5" ry="4" fill="#ff5722" stroke="#e64a19" stroke-width="1"/>
    <ellipse cx="44" cy="36" rx="5" ry="4" fill="#ffeb3b" stroke="#f9a825" stroke-width="1"/>
    <!-- 三属性核心 -->
    <circle cx="32" cy="26" r="5" fill="url(#tripleDragonGrad)" stroke="#fff" stroke-width="1"/>
    <circle cx="32" cy="26" r="2" fill="#fff"/>
    <!-- 三元素 -->
    <path d="M14 20 L18 24" stroke="#4fc3f7" stroke-width="2" stroke-linecap="round"/>
    <path d="M32 14 L32 18" stroke="#ff5722" stroke-width="2" stroke-linecap="round"/>
    <path d="M50 20 L46 24" stroke="#ffeb3b" stroke-width="2" stroke-linecap="round"/>`,
    theme: "triple"
  },
  "昊天极光混沌三生": {
    svg: `<defs>
      <linearGradient id="tripleChaosGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#424242"/>
        <stop offset="33%" style="stop-color:#fff176"/>
        <stop offset="66%" style="stop-color:#7c4dff"/>
        <stop offset="100%" style="stop-color:#212121"/>
      </linearGradient>
    </defs>
    <!-- 昊天锤 -->
    <rect x="16" y="16" width="10" height="8" rx="1" fill="#424242" stroke="#212121" stroke-width="1"/>
    <rect x="19" y="24" width="4" height="8" fill="#5d4037" stroke="#3e2723" stroke-width="0.5"/>
    <!-- 极光 -->
    <path d="M34 16 Q38 12 42 16 Q46 20 42 24 Q38 28 34 24 Q30 20 34 16" fill="#fff176" stroke="#ffd54f" stroke-width="1"/>
    <!-- 混沌 -->
    <circle cx="46" cy="36" r="6" fill="none" stroke="#7c4dff" stroke-width="2" stroke-dasharray="3,2"/>
    <circle cx="46" cy="36" r="3" fill="#7c4dff"/>
    <!-- 三生连接 -->
    <path d="M26 20 Q32 16 36 20" fill="none" stroke="#fff176" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M40 24 Q42 30 44 32" fill="none" stroke="#7c4dff" stroke-width="1.5" stroke-linecap="round"/>
    <!-- 核心 -->
    <circle cx="32" cy="36" r="5" fill="url(#tripleChaosGrad)" stroke="#fff" stroke-width="1"/>
    <circle cx="32" cy="36" r="2" fill="#fff"/>`,
    theme: "triple"
  },
  "神圣幽冥混沌三生": {
    svg: `<defs>
      <linearGradient id="holyNetherChaos" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fff176"/>
        <stop offset="33%" style="stop-color:#4a148c"/>
        <stop offset="66%" style="stop-color:#7c4dff"/>
        <stop offset="100%" style="stop-color:#fff"/>
      </linearGradient>
    </defs>
    <!-- 神圣 -->
    <path d="M20 18 Q24 14 28 18" fill="none" stroke="#fff176" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="24" cy="22" r="4" fill="#fff9c4" stroke="#ffd54f" stroke-width="1"/>
    <!-- 幽冥 -->
    <path d="M36 18 Q40 14 44 18" fill="none" stroke="#4a148c" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="40" cy="22" r="4" fill="#311b92" stroke="#4a148c" stroke-width="1"/>
    <!-- 混沌 -->
    <circle cx="32" cy="40" r="6" fill="none" stroke="#7c4dff" stroke-width="2" stroke-dasharray="2,2"/>
    <circle cx="32" cy="40" r="3" fill="#7c4dff"/>
    <!-- 三生连接 -->
    <path d="M28 26 Q30 32 28 36" fill="none" stroke="#fff176" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M36 26 Q34 32 36 36" fill="none" stroke="#4a148c" stroke-width="1.5" stroke-linecap="round"/>
    <!-- 核心 -->
    <circle cx="32" cy="32" r="4" fill="url(#holyNetherChaos)" stroke="#fff" stroke-width="1"/>
    <circle cx="32" cy="32" r="2" fill="#fff"/>`,
    theme: "triple"
  },
  "时空因果三生": {
    svg: `<defs>
      <linearGradient id="timeSpaceCause" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#5c6bc0"/>
        <stop offset="33%" style="stop-color:#7c4dff"/>
        <stop offset="66%" style="stop-color:#ffd54f"/>
        <stop offset="100%" style="stop-color:#fff"/>
      </linearGradient>
    </defs>
    <!-- 时间 -->
    <circle cx="24" cy="24" r="8" fill="none" stroke="#5c6bc0" stroke-width="2"/>
    <line x1="24" y1="24" x2="24" y2="18" stroke="#5c6bc0" stroke-width="1.5"/>
    <line x1="24" y1="24" x2="28" y2="24" stroke="#5c6bc0" stroke-width="1"/>
    <!-- 空间 -->
    <path d="M40 18 L48 22 L48 30 L40 34 L32 30 L32 22 Z" fill="none" stroke="#7c4dff" stroke-width="2"/>
    <path d="M40 18 L40 26 L48 22" fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.6"/>
    <!-- 因果 -->
    <path d="M28 40 L36 40 L32 48 Z" fill="#ffd54f" stroke="#f9a825" stroke-width="1"/>
    <circle cx="32" cy="36" r="2" fill="#fff"/>
    <!-- 三生连接 -->
    <path d="M28 28 Q32 32 36 28" fill="none" stroke="url(#timeSpaceCause)" stroke-width="2" stroke-linecap="round"/>
    <path d="M32 34 Q32 36 32 38" fill="none" stroke="#ffd54f" stroke-width="1.5" stroke-linecap="round"/>
    <!-- 核心 -->
    <circle cx="32" cy="32" r="3" fill="url(#timeSpaceCause)" stroke="#fff" stroke-width="1"/>
    <circle cx="32" cy="32" r="1.5" fill="#fff"/>`,
    theme: "triple"
  },
};

// ════════════════════════════════════════════════
// 获取武魂SVG图标
// ════════════════════════════════════════════════

/**
 * 根据武魂名称获取SVG图标
 * @param {string} soulName - 武魂名称
 * @param {string} quality - 品质
 * @param {Object} options - 选项
 * @param {number} options.size - 图标大小
 * @param {boolean} options.animated - 是否启用动画
 * @returns {string} SVG HTML字符串
 */
export function getSoulIcon(soulName, quality = "common", options = {}) {
  const { size = 64, animated = true } = options;
  const iconData = SOUL_ICONS[soulName];

  if (!iconData) {
    return createDefaultIcon(soulName, quality, size);
  }

  const qualityClass = `quality-${quality}`;
  const animClass = animated ? "soul-icon-animated" : "";

  return createSVG(iconData.svg, "0 0 64 64", `soul-icon ${qualityClass} ${animClass}`);
}

/**
 * 创建默认图标（当找不到武魂图标时使用）
 * @param {string} soulName - 武魂名称
 * @param {string} quality - 品质
 * @param {number} size - 大小
 * @returns {string}
 */
function createDefaultIcon(soulName, quality, size) {
  const initial = soulName.charAt(0);
  const colors = {
    common: "#9ca3af",
    rare: "#3b82f6",
    epic: "#8b5cf6",
    legend: "#f59e0b",
    apex: "#ef4444",
    hc: "#10b981",
    ha: "#ec4899",
    twin: "#f0abfc",
    triple: "#e2e8f0",
  };
  const color = colors[quality] || colors.common;

  return `<svg class="soul-icon quality-${quality} soul-icon-animated" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="defaultGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:0.2"/>
        <stop offset="100%" style="stop-color:${color};stop-opacity:0.05"/>
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#defaultGrad)" stroke="${color}" stroke-width="1.5" opacity="0.6"/>
    <text x="32" y="38" text-anchor="middle" fill="${color}" font-size="20" font-weight="bold" font-family="serif">${initial}</text>
  </svg>`;
}

/**
 * 检查武魂图标是否存在
 * @param {string} soulName - 武魂名称
 * @returns {boolean}
 */
export function hasSoulIcon(soulName) {
  return soulName in SOUL_ICONS;
}

/**
 * 获取武魂图标主题
 * @param {string} soulName - 武魂名称
 * @returns {string|null}
 */
export function getSoulTheme(soulName) {
  return SOUL_ICONS[soulName]?.theme || null;
}

/**
 * 注册自定义武魂图标
 * @param {string} soulName - 武魂名称
 * @param {string} svg - SVG内容
 * @param {string} theme - 主题
 */
export function registerSoulIcon(soulName, svg, theme = "custom") {
  SOUL_ICONS[soulName] = { svg, theme };
}

// 导出默认对象
export default {
  SOUL_ICONS,
  getSoulIcon,
  hasSoulIcon,
  getSoulTheme,
  registerSoulIcon,
};

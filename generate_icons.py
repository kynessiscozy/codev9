#!/usr/bin/env python3
"""
生成拟物化武魂图标 - soul-icons.js
运行: python3 generate_icons.py > src/modules/ui/soul-icons.js
"""

def filters():
    """全局SVG滤镜定义"""
    return """
    <!-- 金属 Chrome/不锈钢效果 -->
    <filter id="metalChrome" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
      <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1.2" specularExponent="40" lighting-color="#ffffff" result="spec">
        <fePointLight x="30" y="20" z="200"/>
      </feSpecularLighting>
      <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut"/>
      <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="lit"/>
      <feMerge><feMergeNode in="lit"/></feMerge>
    </filter>
    <!-- 黄铜金属效果 -->
    <filter id="metalBrass" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blur"/>
      <feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.8" specularExponent="25" lighting-color="#ffe4a0" result="spec">
        <fePointLight x="25" y="18" z="150"/>
      </feSpecularLighting>
      <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut"/>
      <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0" result="lit"/>
      <feMerge><feMergeNode in="lit"/></feMerge>
    </filter>
    <!-- 铁/钢效果 -->
    <filter id="metalIron" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
      <feSpecularLighting in="blur" surfaceScale="4" specularConstant="0.9" specularExponent="35" lighting-color="#d0e8ff" result="spec">
        <fePointLight x="28" y="22" z="180"/>
      </feSpecularLighting>
      <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut"/>
      <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="0.9" k4="0" result="lit"/>
      <feMerge><feMergeNode in="lit"/></feMerge>
    </filter>
    <!-- 金色效果 -->
    <filter id="metalGold" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
      <feSpecularLighting in="blur" surfaceScale="4" specularConstant="1.5" specularExponent="50" lighting-color="#fffbe6" result="spec">
        <fePointLight x="20" y="15" z="200"/>
      </feSpecularLighting>
      <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut"/>
      <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
      <feMerge><feMergeNode/></feMerge>
    </filter>
    <!-- 石材效果 -->
    <filter id="stoneTexture" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise"/>
      <feDiffuseLighting in="noise" surfaceScale="2" result="diff"><feDistantLight azimuth="45" elevation="55"/></feDiffuseLighting>
      <feComposite in="diff" in2="SourceAlpha" operator="in" result="diffOut"/>
      <feComposite in="SourceGraphic" in2="diffOut" operator="arithmetic" k1="0" k2="0.7" k3="0.5" k4="0"/>
    </filter>
    <!-- 木材效果 -->
    <filter id="woodTexture" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="turbulence" baseFrequency="0.03 0.15" numOctaves="3" seed="2" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <!-- 皮革效果 -->
    <filter id="leatherTex" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="noise"/>
      <feDiffuseLighting in="noise" surfaceScale="1.5" result="diff"><feDistantLight azimuth="60" elevation="45"/></feDiffuseLighting>
      <feComposite in="diff" in2="SourceGraphic" operator="arithmetic" k1="0" k2="0.6" k3="0.4" k4="0"/>
    </filter>
    <!-- 火焰发光 -->
    <filter id="fireGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="glow"/>
      <feColorMatrix in="glow" type="matrix" values="1 0 0 0 0  0 0.4 0 0 0  0 0 0.1 0 0  0 0 0 1 0" result="redGlow"/>
      <feMerge><feMergeNode in="redGlow"/><feMergeNode in="redGlow"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- 寒冰效果 -->
    <filter id="iceEffect" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blur"/>
      <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1.8" specularExponent="60" lighting-color="#e8f8ff" result="spec">
        <fePointLight x="25" y="15" z="250"/>
      </feSpecularLighting>
      <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut"/>
      <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="0.8" k3="1.2" k4="0"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="iceBlur"/>
      <feMerge><feMergeNode in="iceBlur"/><feMergeNode/></feMerge>
    </filter>
    <!-- 暗影效果 -->
    <filter id="shadowEffect" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="glow"/>
      <feColorMatrix in="glow" type="matrix" values="0.2 0 0.3 0 0  0 0.1 0.2 0 0  0.3 0 0.5 0 0  0 0 0 0.8 0" result="purpleGlow"/>
      <feMerge><feMergeNode in="purpleGlow"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- 雷电效果 -->
    <filter id="lightningEffect" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="glow"/>
      <feColorMatrix in="glow" type="matrix" values="0.5 0.5 0 0 0  0.4 0.4 0 0 0  0 0 0.8 0 0  0 0 0 1 0" result="blueGlow"/>
      <feMerge><feMergeNode in="blueGlow"/><feMergeNode in="blueGlow"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- 外发光 -->
    <filter id="outerGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="glow"/>
      <feFlood flood-color="#ffffff" flood-opacity="0.6" result="color"/>
      <feComposite in="color" in2="glow" operator="in" result="coloredGlow"/>
      <feMerge><feMergeNode in="coloredGlow"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- 内阴影 -->
    <filter id="innerShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feOffset dx="0" dy="1"/><feGaussianBlur stdDeviation="1" result="offsetBlur"/>
      <feComposite operator="out" in="SourceGraphic" in2="offsetBlur" result="inverse"/>
      <feFlood flood-color="#000" flood-opacity="0.3" result="dark"/>
      <feComposite operator="in" in="dark" in2="inverse" result="shadow"/>
      <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
    </filter>
    <!-- 皮毛纹理 -->
    <filter id="furTexture" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="turbulence" baseFrequency="0.04 0.08" numOctaves="3" result="fur"/>
      <feDisplacementMap in="SourceGraphic" in2="fur" scale="1.5"/>
    </filter>
    <!-- 龙鳞效果 -->
    <filter id="scaleTexture" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="2" result="scale"/>
      <feDisplacementMap in="SourceGraphic" in2="scale" scale="1"/>
    </filter>
    <!-- 神圣光效 -->
    <filter id="holyGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="glow"/>
      <feColorMatrix in="glow" type="matrix" values="1 1 0.8 0 0  0.8 1 0.8 0 0  0.8 0.8 1 0 0  0 0 0 1 0" result="holyGlow"/>
      <feMerge><feMergeNode in="holyGlow"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- 混沌扭曲 -->
    <filter id="chaosEffect" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="turbulence" baseFrequency="0.02 0.03" numOctaves="3" seed="42" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3"/>
      <feGaussianBlur stdDeviation="0.5"/>
    </filter>
    <!-- 时间扭曲 -->
    <filter id="timeWarp" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="turbulence" baseFrequency="0.01 0.02" numOctaves="2" seed="99" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
    </filter>
"""

def defs(extra_filters=""):
    return f'<defs>\n    {filters()}\n    {extra_filters}\n  </defs>'

# ──── 普通品质 Common ────

def 蓝银草():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" style="stop-color:#0d4f0d"/>
        <stop offset="35%" style="stop-color:#1a7a1a"/>
        <stop offset="70%" style="stop-color:#3a9e3a"/>
        <stop offset="100%" style="stop-color:#6dd66d"/>
      </linearGradient>
      <radialGradient id="g2" cx="45%" cy="45%">
        <stop offset="0%" style="stop-color:#5ee05e"/><stop offset="100%" style="stop-color:#1a6a1a"/>
      </radialGradient>
      <radialGradient id="g3" cx="55%" cy="55%">
        <stop offset="0%" style="stop-color:#7df07d"/><stop offset="100%" style="stop-color:#287a28"/>
      </radialGradient>
      <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#1a5c1a"/><stop offset="50%" style="stop-color:#3a8a3a"/><stop offset="100%" style="stop-color:#1a5c1a"/>
      </linearGradient>
    </defs>
    <!-- 主茎 -->
    <path d="M32 56 Q32 40 32 18" stroke="url(#g4)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <!-- 叶片左 -->
    <path d="M32 44 Q20 34 12 22 Q10 26 15 30 Q20 34 32 44" fill="url(#g2)" stroke="#1a5c1a" stroke-width="0.8" opacity="0.95"/>
    <path d="M32 34 Q20 26 10 18 Q8 20 13 24 Q18 28 32 34" fill="url(#g2)" stroke="#1a5c1a" stroke-width="0.8" opacity="0.9"/>
    <!-- 叶片右 -->
    <path d="M32 44 Q44 34 52 22 Q54 26 49 30 Q44 34 32 44" fill="url(#g3)" stroke="#1a5c1a" stroke-width="0.8" opacity="0.95"/>
    <path d="M32 34 Q44 26 54 18 Q56 20 51 24 Q46 28 32 34" fill="url(#g3)" stroke="#1a5c1a" stroke-width="0.8" opacity="0.9"/>
    <!-- 叶脉 -->
    <path d="M32 44 L12 22" stroke="#2e7d32" stroke-width="0.4" fill="none" opacity="0.3"/>
    <path d="M32 44 L52 22" stroke="#2e7d32" stroke-width="0.4" fill="none" opacity="0.3"/>
    <!-- 嫩芽 -->
    <ellipse cx="32" cy="13" rx="5" ry="9" fill="#8aff8a" stroke="#3a9e3a" stroke-width="0.8" opacity="0.9"/>
    <path d="M32 6 L32 22" stroke="#3a9e3a" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
    <!-- 土壤 -->
    <ellipse cx="32" cy="56" rx="13" ry="4" fill="#5a3a1a" opacity="0.6"/>
    <ellipse cx="32" cy="55" rx="11" ry="3" fill="#7a5a2a" opacity="0.4"/>''',
        "theme": "nature"
    }

def 镰刀():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e8e8e8"/><stop offset="30%" style="stop-color:#c0c0c0"/>
        <stop offset="60%" style="stop-color:#a0a0a0"/><stop offset="100%" style="stop-color:#707070"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" style="stop-color:#ffffff"/><stop offset="50%" style="stop-color:#f0f0f0"/><stop offset="100%" style="stop-color:#c0c0c0"/>
      </linearGradient>
      <linearGradient id="g3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#8B6914"/><stop offset="30%" style="stop-color:#A0522D"/>
        <stop offset="70%" style="stop-color:#8B6914"/><stop offset="100%" style="stop-color:#6B4F12"/>
      </linearGradient>
      <radialGradient id="g4" cx="40%" cy="35%">
        <stop offset="0%" style="stop-color:#e0e0e0"/><stop offset="100%" style="stop-color:#808080"/>
      </radialGradient>
    </defs>
    <!-- 刀柄 -->
    <rect x="26" y="40" width="12" height="18" rx="3" fill="url(#g3)" stroke="#5a3a0a" stroke-width="1.2"/>
    <rect x="27" y="41" width="10" height="16" rx="2" fill="none" stroke="#c0a060" stroke-width="0.5" opacity="0.4"/>
    <!-- 柄绳 -->
    <path d="M28 42 Q32 44 36 42" stroke="#c0392b" stroke-width="1.5" fill="none" opacity="0.8"/>
    <path d="M28 45 Q32 47 36 45" stroke="#c0392b" stroke-width="1.5" fill="none" opacity="0.8"/>
    <path d="M28 48 Q32 50 36 48" stroke="#c0392b" stroke-width="1.5" fill="none" opacity="0.8"/>
    <!-- 刀身 -->
    <path d="M28 40 Q24 30 20 18 Q18 10 24 6 Q28 3 32 6 Q36 10 34 18 Q32 28 30 40 Z"
          fill="url(#g1)" stroke="#555" stroke-width="1.2" filter="url(#metalIron)"/>
    <!-- 刀刃高光 -->
    <path d="M26 38 Q24 28 22 16 Q20 10 24 7" stroke="url(#g2)" stroke-width="1.5" fill="none" opacity="0.7"/>
    <!-- 刀背暗面 -->
    <path d="M30 38 Q34 28 36 16 Q36 10 34 8" stroke="#555" stroke-width="0.8" fill="none" opacity="0.5"/>
    <!-- 铆钉 -->
    <circle cx="30" cy="41" r="1.5" fill="url(#g4)" stroke="#666" stroke-width="0.5"/>
    <circle cx="34" cy="41" r="1.5" fill="url(#g4)" stroke="#666" stroke-width="0.5"/>''',
        "theme": "metal"
    }

def 香草():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#4CAF50"/><stop offset="100%" style="stop-color:#2E7D32"/>
      </linearGradient>
      <radialGradient id="g2" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#fff8e1"/><stop offset="40%" style="stop-color:#ffe082"/>
        <stop offset="100%" style="stop-color:#ffca28"/>
      </radialGradient>
      <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#81C784"/><stop offset="100%" style="stop-color:#388E3C"/>
      </linearGradient>
    </defs>
    <path d="M32 54 L32 22" stroke="url(#g1)" stroke-width="3" stroke-linecap="round"/>
    <path d="M32 30 Q18 22 14 28 Q16 32 32 30" fill="url(#g3)" stroke="#2E7D32" stroke-width="0.8" opacity="0.9"/>
    <path d="M32 30 Q46 22 50 28 Q48 32 32 30" fill="url(#g3)" stroke="#2E7D32" stroke-width="0.8" opacity="0.9"/>
    <path d="M32 36 Q20 30 16 36 Q18 40 32 36" fill="url(#g3)" stroke="#2E7D32" stroke-width="0.8" opacity="0.85"/>
    <path d="M32 36 Q44 30 48 36 Q46 40 32 36" fill="url(#g3)" stroke="#2E7D32" stroke-width="0.8" opacity="0.85"/>
    <ellipse cx="32" cy="16" rx="9" ry="7" fill="url(#g2)" stroke="#f9a825" stroke-width="1" filter="url(#outerGlow)"/>
    <ellipse cx="32" cy="16" rx="6" ry="5" fill="#fffde7" stroke="none" opacity="0.7"/>
    <path d="M23 16 Q32 10 41 16" stroke="#f9a825" stroke-width="1.2" fill="none"/>
    <path d="M23 16 Q32 22 41 16" stroke="#f9a825" stroke-width="1.2" fill="none"/>
    <circle cx="32" cy="16" r="3" fill="#ff6f00" stroke="#e65100" stroke-width="0.5"/>''',
        "theme": "nature"
    }

def 木棍():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#5a3518"/><stop offset="20%" style="stop-color:#8B6914"/>
        <stop offset="50%" style="stop-color:#A0522D"/><stop offset="80%" style="stop-color:#8B6914"/>
        <stop offset="100%" style="stop-color:#5a3518"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgba(90,53,24,0.3)"/><stop offset="50%" style="stop-color:rgba(160,82,45,0.1)"/>
        <stop offset="100%" style="stop-color:rgba(90,53,24,0.3)"/>
      </linearGradient>
    </defs>
    <path d="M22 54 L44 10" stroke="url(#g1)" stroke-width="7" stroke-linecap="round" filter="url(#woodTexture)"/>
    <path d="M24 50 L42 14" stroke="url(#g2)" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
    <circle cx="22" cy="54" r="4" fill="#5a3518" stroke="#3a2010" stroke-width="1" opacity="0.8"/>
    <circle cx="44" cy="10" r="4" fill="#A0522D" stroke="#8B4513" stroke-width="1" opacity="0.9"/>
    <path d="M28 46 L30 44" stroke="#3a2010" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
    <path d="M34 34 L36 32" stroke="#3a2010" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
    <path d="M38 24 L40 22" stroke="#3a2010" stroke-width="1" stroke-linecap="round" opacity="0.5"/>''',
        "theme": "wood"
    }

def 含羞草():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#66BB6A"/><stop offset="100%" style="stop-color:#388E3C"/>
      </linearGradient>
      <radialGradient id="g2" cx="50%" cy="45%">
        <stop offset="0%" style="stop-color:#ffcdd2"/><stop offset="50%" style="stop-color:#ef9a9a"/>
        <stop offset="100%" style="stop-color:#e57373"/>
      </radialGradient>
      <radialGradient id="g3" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffeb3b"/><stop offset="100%" style="stop-color:#f9a825"/>
      </radialGradient>
    </defs>
    <path d="M32 54 L32 26" stroke="url(#g1)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 36 Q20 30 14 34" stroke="url(#g1)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M32 36 Q44 30 50 34" stroke="url(#g1)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M32 30 Q20 24 14 28" stroke="url(#g1)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M32 30 Q44 24 50 28" stroke="url(#g1)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="14" cy="34" rx="4" ry="2.5" fill="#81C784" stroke="#388E3C" stroke-width="0.5" transform="rotate(-15 14 34)"/>
    <ellipse cx="50" cy="34" rx="4" ry="2.5" fill="#81C784" stroke="#388E3C" stroke-width="0.5" transform="rotate(15 50 34)"/>
    <ellipse cx="14" cy="28" rx="4" ry="2.5" fill="#A5D6A7" stroke="#388E3C" stroke-width="0.5" transform="rotate(-15 14 28)"/>
    <ellipse cx="50" cy="28" rx="4" ry="2.5" fill="#A5D6A7" stroke="#388E3C" stroke-width="0.5" transform="rotate(15 50 28)"/>
    <circle cx="32" cy="22" r="8" fill="url(#g2)" stroke="#e53935" stroke-width="1" filter="url(#outerGlow)"/>
    <circle cx="28" cy="18" r="2" fill="url(#g3)" opacity="0.8"/>
    <circle cx="36" cy="18" r="2" fill="url(#g3)" opacity="0.8"/>
    <circle cx="26" cy="24" r="2" fill="url(#g3)" opacity="0.8"/>
    <circle cx="38" cy="24" r="2" fill="url(#g3)" opacity="0.8"/>
    <circle cx="32" cy="16" r="2" fill="url(#g3)" opacity="0.9"/>
    <circle cx="32" cy="28" r="2" fill="url(#g3)" opacity="0.8"/>
    <circle cx="32" cy="22" r="3" fill="#ff5722" stroke="#d84315" stroke-width="0.5"/>''',
        "theme": "nature"
    }

def 铁锤():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e0e0e0"/><stop offset="25%" style="stop-color:#b0b0b0"/>
        <stop offset="50%" style="stop-color:#808080"/><stop offset="75%" style="stop-color:#b0b0b0"/>
        <stop offset="100%" style="stop-color:#909090"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#f0f0f0"/><stop offset="100%" style="stop-color:#c0c0c0"/>
      </linearGradient>
      <linearGradient id="g3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#8B6914"/><stop offset="50%" style="stop-color:#A0522D"/>
        <stop offset="100%" style="stop-color:#6B4F12"/>
      </linearGradient>
      <radialGradient id="g4" cx="35%" cy="30%">
        <stop offset="0%" style="stop-color:#ffffff" stop-opacity="0.8"/><stop offset="100%" style="stop-color:#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect x="16" y="14" width="32" height="18" rx="3" fill="url(#g1)" stroke="#555" stroke-width="1.5" filter="url(#metalIron)"/>
    <rect x="16" y="14" width="32" height="5" rx="3" fill="url(#g2)" opacity="0.6"/>
    <ellipse cx="28" cy="20" rx="8" ry="4" fill="url(#g4)"/>
    <rect x="16" y="29" width="32" height="3" rx="1" fill="#555" opacity="0.4"/>
    <rect x="29" y="32" width="6" height="22" rx="2" fill="url(#g3)" stroke="#5a3a0a" stroke-width="1.2"/>
    <rect x="28" y="50" width="8" height="3" rx="1" fill="url(#g1)" stroke="#666" stroke-width="0.8"/>
    <circle cx="20" cy="23" r="1.5" fill="#d0d0d0" stroke="#888" stroke-width="0.5"/>
    <circle cx="44" cy="23" r="1.5" fill="#d0d0d0" stroke="#888" stroke-width="0.5"/>''',
        "theme": "metal"
    }

def 渔网():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#8D6E63"/><stop offset="50%" style="stop-color:#A1887F"/>
        <stop offset="100%" style="stop-color:#8D6E63"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#FFF9C4"/><stop offset="100%" style="stop-color:#FFF176"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="28" rx="24" ry="16" fill="none" stroke="url(#g1)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M20 22 L32 16 L44 22 L32 28 Z" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>
    <path d="M20 22 L32 28 L20 34" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>
    <path d="M44 22 L32 28 L44 34" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>
    <path d="M32 28 L32 40" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>
    <path d="M20 34 L32 40 L44 34" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>
    <circle cx="14" cy="20" r="3" fill="url(#g2)" stroke="#F9A825" stroke-width="0.8" opacity="0.9"/>
    <circle cx="50" cy="20" r="3" fill="url(#g2)" stroke="#F9A825" stroke-width="0.8" opacity="0.9"/>
    <ellipse cx="32" cy="44" rx="4" ry="2" fill="#78909C" stroke="#546E7A" stroke-width="0.8"/>
    <path d="M32 44 L32 56" stroke="url(#g1)" stroke-width="4" stroke-linecap="round"/>
    <path d="M30 54 L34 54" stroke="#5a3a0a" stroke-width="1.5" stroke-linecap="round"/>''',
        "theme": "water"
    }

def 蒲公英():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#81C784"/><stop offset="100%" style="stop-color:#4CAF50"/>
      </linearGradient>
      <radialGradient id="g2" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffffff"/><stop offset="30%" style="stop-color:#f5f5f5"/>
        <stop offset="70%" style="stop-color:#eeeeee"/><stop offset="100%" style="stop-color:#e0e0e0"/>
      </radialGradient>
    </defs>
    <path d="M32 54 L32 20" stroke="url(#g1)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 48 Q22 54 18 48 Q20 44 28 44" fill="#66BB6A" stroke="#388E3C" stroke-width="0.8" opacity="0.8"/>
    <path d="M32 48 Q42 54 46 48 Q44 44 36 44" fill="#66BB6A" stroke="#388E3C" stroke-width="0.8" opacity="0.8"/>
    <circle cx="32" cy="14" r="10" fill="url(#g2)" stroke="#e0e0e0" stroke-width="0.5" filter="url(#outerGlow)" opacity="0.95"/>
    <g opacity="0.7">
      <line x1="32" y1="4" x2="32" y2="8" stroke="#f5f5f5" stroke-width="0.6" stroke-linecap="round"/>
      <line x1="25" y1="5" x2="28" y2="10" stroke="#f5f5f5" stroke-width="0.6" stroke-linecap="round"/>
      <line x1="39" y1="5" x2="36" y2="10" stroke="#f5f5f5" stroke-width="0.6" stroke-linecap="round"/>
      <line x1="20" y1="9" x2="26" y2="12" stroke="#f5f5f5" stroke-width="0.6" stroke-linecap="round"/>
      <line x1="44" y1="9" x2="38" y2="12" stroke="#f5f5f5" stroke-width="0.6" stroke-linecap="round"/>
      <line x1="40" y1="20" x2="36" y2="16" stroke="#f5f5f5" stroke-width="0.6" stroke-linecap="round"/>
      <line x1="24" y1="20" x2="28" y2="16" stroke="#f5f5f5" stroke-width="0.6" stroke-linecap="round"/>
    </g>
    <circle cx="32" cy="14" r="3" fill="#8BC34A" stroke="#689F38" stroke-width="0.8"/>
    <circle cx="18" cy="8" r="2" fill="#fff" opacity="0.5">
      <animate attributeName="cx" values="18;14;18" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="8;4;8" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite"/>
    </circle>''',
        "theme": "wind"
    }

def 芦苇杆():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#8BC34A"/><stop offset="50%" style="stop-color:#689F38"/>
        <stop offset="100%" style="stop-color:#8BC34A"/>
      </linearGradient>
    </defs>
    <path d="M26 56 L24 14" stroke="url(#g1)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M32 56 L33 10" stroke="url(#g1)" stroke-width="4" stroke-linecap="round"/>
    <path d="M38 56 L39 14" stroke="url(#g1)" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="24" cy="30" rx="2" ry="1" fill="#558B2F" stroke="none"/>
    <ellipse cx="33" cy="28" rx="2.5" ry="1" fill="#558B2F" stroke="none"/>
    <ellipse cx="39" cy="30" rx="2" ry="1" fill="#558B2F" stroke="none"/>
    <ellipse cx="24" cy="42" rx="2" ry="1" fill="#558B2F" stroke="none"/>
    <ellipse cx="33" cy="40" rx="2.5" ry="1" fill="#558B2F" stroke="none"/>
    <ellipse cx="39" cy="42" rx="2" ry="1" fill="#558B2F" stroke="none"/>
    <ellipse cx="24" cy="12" rx="4" ry="8" fill="#FFF9C4" stroke="#F9A825" stroke-width="0.5" transform="rotate(-20 24 12)" opacity="0.9"/>
    <ellipse cx="33" cy="8" rx="4" ry="10" fill="#FFF176" stroke="#F9A825" stroke-width="0.5" opacity="0.95"/>
    <ellipse cx="39" cy="12" rx="4" ry="8" fill="#FFF9C4" stroke="#F9A825" stroke-width="0.5" transform="rotate(20 39 12)" opacity="0.9"/>
    <path d="M18 52 Q32 56 46 52" stroke="#42A5F5" stroke-width="2" fill="none" opacity="0.3"/>''',
        "theme": "water"
    }

def 铁锅():
    return {
        "svg": f'''{defs()}
      <radialGradient id="g1" cx="50%" cy="45%">
        <stop offset="0%" style="stop-color:#455A64"/><stop offset="60%" style="stop-color:#37474F"/>
        <stop offset="100%" style="stop-color:#263238"/>
      </radialGradient>
      <radialGradient id="g2" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#78909C"/><stop offset="50%" style="stop-color:#607D8B"/>
        <stop offset="100%" style="stop-color:#455A64"/>
      </radialGradient>
      <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#90A4AE"/><stop offset="50%" style="stop-color:#B0BEC5"/>
        <stop offset="100%" style="stop-color:#90A4AE"/>
      </linearGradient>
    </defs>
    <path d="M14 28 Q14 48 32 50 Q50 48 50 28 Q50 18 32 16 Q14 18 14 28 Z"
          fill="url(#g2)" stroke="#455A64" stroke-width="1.5" filter="url(#metalIron)"/>
    <ellipse cx="32" cy="32" rx="16" ry="10" fill="url(#g1)" stroke="#1a1a2e" stroke-width="1"/>
    <ellipse cx="32" cy="22" rx="19" ry="6" fill="url(#g3)" stroke="#78909C" stroke-width="1.2"/>
    <ellipse cx="26" cy="24" rx="6" ry="3" fill="#fff" opacity="0.15"/>
    <rect x="12" y="24" width="5" height="8" rx="2" fill="url(#g3)" stroke="#607D8B" stroke-width="1" filter="url(#metalIron)"/>
    <rect x="47" y="24" width="5" height="8" rx="2" fill="url(#g3)" stroke="#607D8B" stroke-width="1" filter="url(#metalIron)"/>
    <circle cx="14" cy="26" r="1.2" fill="#90A4AE" stroke="#607D8B" stroke-width="0.5"/>
    <circle cx="49" cy="26" r="1.2" fill="#90A4AE" stroke="#607D8B" stroke-width="0.5"/>''',
        "theme": "metal"
    }

def 荆棘藤():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4CAF50"/><stop offset="50%" style="stop-color:#2E7D32"/>
        <stop offset="100%" style="stop-color:#1B5E20"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f5f5f5"/><stop offset="100%" style="stop-color:#bdbdbd"/>
      </linearGradient>
    </defs>
    <path d="M18 54 Q24 40 30 30 Q36 20 42 12 Q46 8 48 14" stroke="url(#g1)" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M18 54 Q24 40 30 30 Q36 20 42 12 Q46 8 48 14" stroke="#1B5E20" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
    <path d="M30 30 Q22 24 18 30" stroke="url(#g1)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M36 20 Q44 14 48 20" stroke="url(#g1)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M24 42 L20 38" stroke="url(#g2)" stroke-width="2" fill="none" stroke-linecap="round" filter="url(#metalChrome)"/>
    <path d="M28 36 L24 32" stroke="url(#g2)" stroke-width="2" fill="none" stroke-linecap="round" filter="url(#metalChrome)"/>
    <path d="M36 28 L40 24" stroke="url(#g2)" stroke-width="2" fill="none" stroke-linecap="round" filter="url(#metalChrome)"/>
    <path d="M40 20 L44 16" stroke="url(#g2)" stroke-width="2" fill="none" stroke-linecap="round" filter="url(#metalChrome)"/>
    <path d="M32 24 L30 20" stroke="url(#g2)" stroke-width="1.8" fill="none" stroke-linecap="round" filter="url(#metalChrome)"/>
    <path d="M24 42 L21 40" stroke="#333" stroke-width="0.8" stroke-linecap="round" opacity="0.4"/>
    <path d="M30 30 L28 26 L32 28 Z" fill="#4CAF50" stroke="#2E7D32" stroke-width="0.5"/>
    <path d="M36 20 L38 16 L34 18 Z" fill="#4CAF50" stroke="#2E7D32" stroke-width="0.5"/>''',
        "theme": "nature"
    }

def 石头():
    return {
        "svg": f'''{defs()}
      <radialGradient id="g1" cx="40%" cy="35%">
        <stop offset="0%" style="stop-color:#bdbdbd"/><stop offset="40%" style="stop-color:#9e9e9e"/>
        <stop offset="100%" style="stop-color:#616161"/>
      </radialGradient>
      <radialGradient id="g2" cx="30%" cy="25%">
        <stop offset="0%" style="stop-color:#ffffff" stop-opacity="0.6"/><stop offset="100%" style="stop-color:#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <path d="M22 20 Q18 24 16 32 Q14 40 20 46 Q28 52 36 50 Q44 48 48 40 Q50 32 46 24 Q42 18 36 16 Q30 14 22 20 Z"
          fill="url(#g1)" stroke="#424242" stroke-width="1.5" filter="url(#stoneTexture)"/>
    <path d="M24 22 Q28 30 26 40 Q25 46 30 48" stroke="#757575" stroke-width="1" fill="none" opacity="0.5"/>
    <path d="M40 22 Q38 32 42 42 Q44 48 40 50" stroke="#757575" stroke-width="1" fill="none" opacity="0.4"/>
    <ellipse cx="26" cy="26" rx="8" ry="5" fill="url(#g2)" opacity="0.7"/>
    <path d="M38 38 Q36 42 40 46 Q44 48 46 44 Q48 40 44 38 Q42 36 38 38 Z"
          fill="#9e9e9e" stroke="#616161" stroke-width="1" filter="url(#stoneTexture)" opacity="0.8"/>
    <ellipse cx="42" cy="40" rx="3" ry="2" fill="#fff" opacity="0.15"/>''',
        "theme": "earth"
    }

def 陶笛():
    return {
        "svg": f'''{defs()}
      <radialGradient id="g1" cx="50%" cy="45%">
        <stop offset="0%" style="stop-color:#FFCC80"/><stop offset="50%" style="stop-color:#E6A23C"/>
        <stop offset="100%" style="stop-color:#B8750E"/>
      </radialGradient>
      <radialGradient id="g2" cx="40%" cy="35%">
        <stop offset="0%" style="stop-color:#ffffff" stop-opacity="0.5"/><stop offset="100%" style="stop-color:#ffffff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="g3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#8B4513"/><stop offset="100%" style="stop-color:#5D3A1A"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="34" rx="16" ry="18" fill="url(#g1)" stroke="#8B6914" stroke-width="1.5" filter="url(#leatherTex)"/>
    <ellipse cx="28" cy="28" rx="8" ry="10" fill="url(#g2)" opacity="0.6"/>
    <ellipse cx="32" cy="22" rx="5" ry="3" fill="url(#g3)" stroke="#5D3A1A" stroke-width="1"/>
    <circle cx="28" cy="30" r="2.5" fill="#3E2723" stroke="#1a1a1a" stroke-width="0.5"/>
    <circle cx="36" cy="30" r="2.5" fill="#3E2723" stroke="#1a1a1a" stroke-width="0.5"/>
    <circle cx="32" cy="36" r="2" fill="#3E2723" stroke="#1a1a1a" stroke-width="0.5"/>
    <circle cx="24" cy="40" r="2" fill="#3E2723" stroke="#1a1a1a" stroke-width="0.5"/>
    <circle cx="40" cy="40" r="2" fill="#3E2723" stroke="#1a1a1a" stroke-width="0.5"/>
    <circle cx="32" cy="18" r="1.5" fill="#3E2723" stroke="#1a1a1a" stroke-width="0.5"/>
    <path d="M20 34 Q32 32 44 34" stroke="#8B6914" stroke-width="0.8" fill="none" opacity="0.4"/>
    <g opacity="0.6">
      <path d="M46 14 Q48 12 50 14" stroke="#E6A23C" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <circle cx="50" cy="14" r="1.5" fill="#E6A23C"/>
    </g>''',
        "theme": "sound"
    }

# ──── 稀有品质 Rare ────

def 白虎():
    return {
        "svg": f'''{defs()}
      <radialGradient id="g1" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ffffff"/><stop offset="40%" style="stop-color:#f5f5f5"/>
        <stop offset="100%" style="stop-color:#e0e0e0"/>
      </radialGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a1a1a"/><stop offset="100%" style="stop-color:#333"/>
      </linearGradient>
      <radialGradient id="g3" cx="45%" cy="40%">
        <stop offset="0%" style="stop-color:#ff6600"/><stop offset="60%" style="stop-color:#cc3300"/>
        <stop offset="100%" style="stop-color:#661a00"/>
      </radialGradient>
      <radialGradient id="g4" cx="35%" cy="35%">
        <stop offset="0%" style="stop-color:#ffff00" stop-opacity="0.9"/><stop offset="100%" style="stop-color:#ff6600" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="32" cy="30" r="18" fill="url(#g1)" stroke="#333" stroke-width="1.5" filter="url(#furTexture)"/>
    <path d="M18 22 Q24 26 20 32" stroke="url(#g2)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M46 22 Q40 26 44 32" stroke="url(#g2)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M16 30 Q24 28 32 30" stroke="url(#g2)" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M48 30 Q40 28 32 30" stroke="url(#g2)" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M20 38 Q26 36 32 38" stroke="url(#g2)" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7"/>
    <path d="M44 38 Q38 36 32 38" stroke="url(#g2)" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7"/>
    <path d="M18 16 L16 8 L24 14 Z" fill="url(#g1)" stroke="#333" stroke-width="1.2"/>
    <path d="M46 16 L48 8 L40 14 Z" fill="url(#g1)" stroke="#333" stroke-width="1.2"/>
    <path d="M20 14 L19 10 L22 13 Z" fill="#ff5722" stroke="#e64a19" stroke-width="0.5"/>
    <path d="M44 14 L45 10 L42 13 Z" fill="#ff5722" stroke="#e64a19" stroke-width="0.5"/>
    <ellipse cx="25" cy="28" rx="5" ry="4.5" fill="#1a1a1a"/>
    <ellipse cx="25" cy="28" rx="4" ry="3.5" fill="url(#g3)"/>
    <ellipse cx="23" cy="26" rx="2" ry="1.8" fill="url(#g4)"/>
    <ellipse cx="39" cy="28" rx="5" ry="4.5" fill="#1a1a1a"/>
    <ellipse cx="39" cy="28" rx="4" ry="3.5" fill="url(#g3)"/>
    <ellipse cx="37" cy="26" rx="2" ry="1.8" fill="url(#g4)"/>
    <ellipse cx="32" cy="36" rx="3.5" ry="2.5" fill="#f48fb1" stroke="#c2185b" stroke-width="0.8"/>
    <path d="M32 38 Q28 42 24 40" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M32 38 Q36 42 40 40" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <line x1="14" y1="32" x2="22" y2="34" stroke="#555" stroke-width="0.8" stroke-linecap="round"/>
    <line x1="14" y1="36" x2="22" y2="36" stroke="#555" stroke-width="0.8" stroke-linecap="round"/>
    <line x1="50" y1="32" x2="42" y2="34" stroke="#555" stroke-width="0.8" stroke-linecap="round"/>
    <line x1="50" y1="36" x2="42" y2="36" stroke="#555" stroke-width="0.8" stroke-linecap="round"/>''',
        "theme": "beast"
    }

def 火凤凰():
    return {
        "svg": f'''{defs()}
      <radialGradient id="g1" cx="50%" cy="60%">
        <stop offset="0%" style="stop-color:#ffab40"/><stop offset="50%" style="stop-color:#ff6600"/>
        <stop offset="100%" style="stop-color:#cc3300"/>
      </radialGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff9900"/><stop offset="30%" style="stop-color:#ff6600"/>
        <stop offset="70%" style="stop-color:#cc3300"/><stop offset="100%" style="stop-color:#990000"/>
      </linearGradient>
      <radialGradient id="g3" cx="40%" cy="35%">
        <stop offset="0%" style="stop-color:#ffff00"/><stop offset="100%" style="stop-color:#ff6600"/>
      </radialGradient>
    </defs>
    <ellipse cx="32" cy="34" rx="8" ry="12" fill="url(#g1)" stroke="#cc3300" stroke-width="1.2" filter="url(#fireGlow)"/>
    <path d="M32 44 Q20 52 14 48 Q18 56 32 54 Q46 56 50 48 Q44 52 32 44 Z" fill="url(#g2)" stroke="#cc3300" stroke-width="1" filter="url(#fireGlow)" opacity="0.9"/>
    <path d="M32 46 Q22 54 16 50 Q20 58 32 56 Q44 58 48 50 Q42 54 32 46 Z" fill="#ff6600" stroke="#cc3300" stroke-width="0.8" opacity="0.7"/>
    <path d="M24 28 Q10 18 8 28 Q12 38 24 36" fill="url(#g2)" stroke="#cc3300" stroke-width="1.2" filter="url(#fireGlow)"/>
    <path d="M40 28 Q54 18 56 28 Q52 38 40 36" fill="url(#g2)" stroke="#cc3300" stroke-width="1.2" filter="url(#fireGlow)"/>
    <path d="M14 24 Q18 30 24 32" stroke="#ff9900" stroke-width="1" fill="none" opacity="0.6"/>
    <path d="M50 24 Q46 30 40 32" stroke="#ff9900" stroke-width="1" fill="none" opacity="0.6"/>
    <circle cx="32" cy="20" r="7" fill="url(#g1)" stroke="#cc3300" stroke-width="1" filter="url(#fireGlow)"/>
    <path d="M28 14 Q30 8 32 10 Q34 8 36 14" fill="#ff9900" stroke="#ff6600" stroke-width="1" filter="url(#fireGlow)"/>
    <circle cx="29" cy="19" r="2.5" fill="url(#g3)" stroke="#cc3300" stroke-width="0.8"/>
    <circle cx="28" cy="18" r="1" fill="#fff" opacity="0.9"/>
    <circle cx="35" cy="19" r="2.5" fill="url(#g3)" stroke="#cc3300" stroke-width="0.8"/>
    <circle cx="34" cy="18" r="1" fill="#fff" opacity="0.9"/>
    <path d="M32 20 L36 22 L32 23 Z" fill="#ff6600" stroke="#cc3300" stroke-width="0.8"/>
    <circle cx="16" cy="20" r="2.5" fill="#ff6600" opacity="0.7" filter="url(#fireGlow)">
      <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="48" cy="20" r="2.5" fill="#ff6600" opacity="0.7" filter="url(#fireGlow)">
      <animate attributeName="r" values="2;3;2" dur="1.8s" repeatCount="indefinite"/>
    </circle>
    <circle cx="32" cy="8" r="3" fill="#ff9900" opacity="0.8" filter="url(#fireGlow)">
      <animate attributeName="r" values="2.5;4;2.5" dur="1s" repeatCount="indefinite"/>
    </circle>''',
        "theme": "fire"
    }

def 冰凤凰():
    return {
        "svg": f'''{defs()}
      <radialGradient id="g1" cx="50%" cy="60%">
        <stop offset="0%" style="stop-color:#e8f8ff"/><stop offset="50%" style="stop-color:#b3e5fc"/>
        <stop offset="100%" style="stop-color:#4fc3f7"/>
      </radialGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e1f5fe"/><stop offset="50%" style="stop-color:#81d4fa"/>
        <stop offset="100%" style="stop-color:#0288d1"/>
      </linearGradient>
      <radialGradient id="g3" cx="40%" cy="35%">
        <stop offset="0%" style="stop-color:#e0f7fa"/><stop offset="100%" style="stop-color:#00838f"/>
      </radialGradient>
    </defs>
    <ellipse cx="32" cy="34" rx="8" ry="12" fill="url(#g1)" stroke="#0288d1" stroke-width="1.2" filter="url(#iceEffect)"/>
    <path d="M32 44 Q18 54 12 48 Q16 58 32 56 Q48 58 52 48 Q46 54 32 44 Z" fill="url(#g2)" stroke="#0288d1" stroke-width="1" filter="url(#iceEffect)" opacity="0.9"/>
    <path d="M32 46 L32 56" stroke="#b3e5fc" stroke-width="1" opacity="0.6"/>
    <path d="M24 50 L32 52 L40 50" stroke="#b3e5fc" stroke-width="0.8" fill="none" opacity="0.5"/>
    <path d="M24 28 Q8 16 6 28 Q12 38 24 36" fill="url(#g2)" stroke="#0288d1" stroke-width="1.2" filter="url(#iceEffect)"/>
    <path d="M40 28 Q56 16 58 28 Q52 38 40 36" fill="url(#g2)" stroke="#0288d1" stroke-width="1.2" filter="url(#iceEffect)"/>
    <path d="M16 24 Q20 30 24 32" stroke="#e1f5fe" stroke-width="0.8" fill="none" opacity="0.5"/>
    <path d="M48 24 Q44 30 40 32" stroke="#e1f5fe" stroke-width="0.8" fill="none" opacity="0.5"/>
    <circle cx="32" cy="20" r="7" fill="url(#g1)" stroke="#0288d1" stroke-width="1" filter="url(#iceEffect)"/>
    <path d="M28 14 L30 9 L32 12 L34 9 L36 14" fill="none" stroke="#81d4fa" stroke-width="1.5" stroke-linecap="round" filter="url(#iceEffect)"/>
    <circle cx="29" cy="19" r="2.5" fill="url(#g3)" stroke="#01579b" stroke-width="0.8"/>
    <circle cx="28" cy="18" r="1" fill="#fff" opacity="0.9"/>
    <circle cx="35" cy="19" r="2.5" fill="url(#g3)" stroke="#01579b" stroke-width="0.8"/>
    <circle cx="34" cy="18" r="1" fill="#fff" opacity="0.9"/>
    <path d="M32 20 L36 22 L32 23 Z" fill="#b3e5fc" stroke="#0288d1" stroke-width="0.8"/>
    <circle cx="14" cy="18" r="2" fill="#e1f5fe" opacity="0.7" filter="url(#iceEffect)">
      <animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite"/>
    </circle>''',
        "theme": "ice"
    }

def 盘龙棍():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#8B6914"/><stop offset="30%" style="stop-color:#A0522D"/>
        <stop offset="70%" style="stop-color:#8B6914"/><stop offset="100%" style="stop-color:#6B4F12"/>
      </linearGradient>
      <radialGradient id="g2" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#4CAF50"/><stop offset="50%" style="stop-color:#2E7D32"/>
        <stop offset="100%" style="stop-color:#1B5E20"/>
      </radialGradient>
      <radialGradient id="g3" cx="40%" cy="35%">
        <stop offset="0%" style="stop-color:#ffff00"/><stop offset="100%" style="stop-color:#ff6600"/>
      </radialGradient>
    </defs>
    <rect x="20" y="12" width="24" height="6" rx="3" fill="url(#g1)" stroke="#5a3a0a" stroke-width="1.5" filter="url(#woodTexture)"/>
    <rect x="20" y="46" width="24" height="6" rx="3" fill="url(#g1)" stroke="#5a3a0a" stroke-width="1.5" filter="url(#woodTexture)"/>
    <rect x="28" y="15" width="8" height="34" rx="4" fill="url(#g1)" stroke="#5a3a0a" stroke-width="1.5"/>
    <path d="M32 12 Q26 6 24 10 Q22 16 28 18 L32 16 Z" fill="url(#g2)" stroke="#1B5E20" stroke-width="1.2"/>
    <path d="M32 12 Q38 6 40 10 Q42 16 36 18 L32 16 Z" fill="url(#g2)" stroke="#1B5E20" stroke-width="1.2"/>
    <path d="M28 10 L26 4" stroke="#4CAF50" stroke-width="2" stroke-linecap="round"/>
    <path d="M36 10 L38 4" stroke="#4CAF50" stroke-width="2" stroke-linecap="round"/>
    <circle cx="28" cy="14" r="2" fill="url(#g3)" stroke="#ff6600" stroke-width="0.8"/>
    <circle cx="36" cy="14" r="2" fill="url(#g3)" stroke="#ff6600" stroke-width="0.8"/>
    <g opacity="0.4">
      <path d="M30 20 Q32 22 34 20" stroke="#2E7D32" stroke-width="1" fill="none"/>
      <path d="M29 24 Q32 26 35 24" stroke="#2E7D32" stroke-width="1" fill="none"/>
      <path d="M30 28 Q32 30 34 28" stroke="#2E7D32" stroke-width="1" fill="none"/>
      <path d="M29 32 Q32 34 35 32" stroke="#2E7D32" stroke-width="1" fill="none"/>
      <path d="M30 36 Q32 38 34 36" stroke="#2E7D32" stroke-width="1" fill="none"/>
      <path d="M29 40 Q32 42 35 40" stroke="#2E7D32" stroke-width="1" fill="none"/>
    </g>
    <path d="M28 18 Q32 30 36 18 Q32 42 28 48" stroke="#4CAF50" stroke-width="1.5" fill="none" opacity="0.3" stroke-dasharray="2 3"/>''',
        "theme": "beast"
    }

def 七宝琉璃塔():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#fff8e1"/><stop offset="50%" style="stop-color:#ffecb3"/>
        <stop offset="100%" style="stop-color:#ffd54f"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#ffd54f"/><stop offset="50%" style="stop-color:#ffecb3"/>
        <stop offset="100%" style="stop-color:#ffd54f"/>
      </linearGradient>
      <radialGradient id="g3" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#ff5252"/><stop offset="100%" style="stop-color:#d32f2f"/>
      </radialGradient>
      <radialGradient id="g4" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#448aff"/><stop offset="100%" style="stop-color:#1565c0"/>
      </radialGradient>
      <radialGradient id="g5" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#69f0ae"/><stop offset="100%" style="stop-color:#00c853"/>
      </radialGradient>
    </defs>
    <rect x="22" y="48" width="20" height="8" rx="2" fill="url(#g1)" stroke="#ffa000" stroke-width="1.5"/>
    <rect x="26" y="40" width="12" height="8" rx="1" fill="url(#g2)" stroke="#ffa000" stroke-width="1"/>
    <rect x="24" y="32" width="16" height="8" rx="1" fill="url(#g1)" stroke="#ffa000" stroke-width="1"/>
    <rect x="26" y="24" width="12" height="8" rx="1" fill="url(#g2)" stroke="#ffa000" stroke-width="1"/>
    <rect x="24" y="16" width="16" height="8" rx="1" fill="url(#g1)" stroke="#ffa000" stroke-width="1"/>
    <rect x="26" y="8" width="12" height="8" rx="1" fill="url(#g2)" stroke="#ffa000" stroke-width="1"/>
    <path d="M28 8 L32 2 L36 8" fill="url(#g1)" stroke="#ffa000" stroke-width="1.2"/>
    <circle cx="32" cy="2" r="2" fill="url(#g3)" stroke="#d32f2f" stroke-width="0.8" filter="url(#outerGlow)"/>
    <circle cx="29" cy="44" r="1.5" fill="url(#g3)" opacity="0.8"/>
    <circle cx="35" cy="44" r="1.5" fill="url(#g4)" opacity="0.8"/>
    <circle cx="29" cy="36" r="1.5" fill="url(#g5)" opacity="0.8"/>
    <circle cx="35" cy="36" r="1.5" fill="url(#g3)" opacity="0.8"/>
    <circle cx="29" cy="28" r="1.5" fill="url(#g4)" opacity="0.8"/>
    <circle cx="35" cy="28" r="1.5" fill="url(#g5)" opacity="0.8"/>
    <circle cx="29" cy="20" r="1.5" fill="url(#g3)" opacity="0.8"/>
    <circle cx="35" cy="20" r="1.5" fill="url(#g4)" opacity="0.8"/>
    <circle cx="29" cy="12" r="1.5" fill="url(#g5)" opacity="0.8"/>
    <circle cx="35" cy="12" r="1.5" fill="url(#g3)" opacity="0.8"/>
    <ellipse cx="32" cy="32" rx="4" ry="8" fill="#fff" opacity="0.1"/>''',
        "theme": "magic"
    }

def 幽冥灵猫():
    return {
        "svg": f'''{defs()}
      <radialGradient id="g1" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:#f5f5f5"/><stop offset="50%" style="stop-color:#e0e0e0"/>
        <stop offset="100%" style="stop-color:#9e9e9e"/>
      </radialGradient>
      <radialGradient id="g2" cx="40%" cy="35%">
        <stop offset="0%" style="stop-color:#e040fb"/><stop offset="100%" style="stop-color:#9c27b0"/>
      </radialGradient>
    </defs>
    <ellipse cx="32" cy="24" rx="16" ry="14" fill="url(#g1)" stroke="#616161" stroke-width="1.2" filter="url(#shadowEffect)"/>
    <path d="M20 16 L18 6 L26 14 Z" fill="url(#g1)" stroke="#616161" stroke-width="1"/>
    <path d="M20 16 L19 10 L22 13 Z" fill="#9e9e9e"/>
    <path d="M44 16 L46 6 L38 14 Z" fill="url(#g1)" stroke="#616161" stroke-width="1"/>
    <path d="M44 16 L45 10 L42 13 Z" fill="#9e9e9e"/>
    <ellipse cx="26" cy="22" rx="5" ry="4" fill="#1a1a1a"/>
    <ellipse cx="26" cy="22" rx="4" ry="3.5" fill="url(#g2)" filter="url(#shadowEffect)"/>
    <ellipse cx="38" cy="22" rx="5" ry="4" fill="#1a1a1a"/>
    <ellipse cx="38" cy="22" rx="4" ry="3.5" fill="url(#g2)" filter="url(#shadowEffect)"/>
    <ellipse cx="26" cy="22" rx="1.5" ry="3" fill="#1a1a1a"/>
    <ellipse cx="38" cy="22" rx="1.5" ry="3" fill="#1a1a1a"/>
    <ellipse cx="32" cy="28" rx="2" ry="1.5" fill="#f48fb1"/>
    <path d="M32 29 Q30 32 28 30" stroke="#616161" stroke-width="1" fill="none" stroke-linecap="round"/>
    <path d="M32 29 Q34 32 36 30" stroke="#616161" stroke-width="1" fill="none" stroke-linecap="round"/>
    <line x1="16" y1="24" x2="24" y2="26" stroke="#757575" stroke-width="0.8" stroke-linecap="round"/>
    <line x1="16" y1="28" x2="24" y2="28" stroke="#757575" stroke-width="0.8" stroke-linecap="round"/>
    <line x1="48" y1="24" x2="40" y2="26" stroke="#757575" stroke-width="0.8" stroke-linecap="round"/>
    <line x1="48" y1="28" x2="40" y2="28" stroke="#757575" stroke-width="0.8" stroke-linecap="round"/>
    <ellipse cx="32" cy="44" rx="14" ry="10" fill="url(#g1)" stroke="#616161" stroke-width="1.2" filter="url(#shadowEffect)" opacity="0.9"/>
    <circle cx="32" cy="34" r="20" fill="none" stroke="#e040fb" stroke-width="0.5" opacity="0.2">
      <animate attributeName="r" values="18;22;18" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.2;0.1;0.2" dur="3s" repeatCount="indefinite"/>
    </circle>''',
        "theme": "ghost"
    }

def 碧磷蛇皇():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#69f0ae"/><stop offset="50%" style="stop-color:#00c853"/>
        <stop offset="100%" style="stop-color:#1B5E20"/>
      </linearGradient>
      <radialGradient id="g2" cx="40%" cy="35%">
        <stop offset="0%" style="stop-color:#ff5252"/><stop offset="100%" style="stop-color:#b71c1c"/>
      </radialGradient>
    </defs>
    <path d="M16 48 Q20 40 28 36 Q36 32 40 24 Q44 16 38 12 Q34 10 36 14 Q40 20 36 28 Q32 36 24 40 Q16 44 16 48 Z"
          fill="url(#g1)" stroke="#1B5E20" stroke-width="1.5" filter="url(#scaleTexture)"/>
    <g opacity="0.3">
      <path d="M24 36 Q28 34 32 36" stroke="#69f0ae" stroke-width="0.8" fill="none"/>
      <path d="M28 32 Q32 30 36 32" stroke="#69f0ae" stroke-width="0.8" fill="none"/>
      <path d="M32 28 Q36 26 40 28" stroke="#69f0ae" stroke-width="0.8" fill="none"/>
      <path d="M36 22 Q38 20 36 18" stroke="#69f0ae" stroke-width="0.8" fill="none"/>
    </g>
    <ellipse cx="38" cy="14" rx="6" ry="5" fill="url(#g1)" stroke="#1B5E20" stroke-width="1.2"/>
    <path d="M42 14 L46 12" stroke="#ff5252" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M42 14 L46 16" stroke="#ff5252" stroke-width="1.2" stroke-linecap="round"/>
    <circle cx="36" cy="13" r="2.5" fill="url(#g2)" stroke="#b71c1c" stroke-width="0.8"/>
    <circle cx="35.5" cy="12.5" r="1" fill="#fff" opacity="0.7"/>
    <circle cx="28" cy="36" r="3" fill="#69f0ae" opacity="0.3" filter="url(#outerGlow)">
      <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/>
    </circle>''',
        "theme": "poison"
    }

def 金龙爪():
    return {
        "svg": f'''{defs()}
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ffd54f"/><stop offset="50%" style="stop-color:#ffab00"/>
        <stop offset="100%" style="stop-color:#ff6f00"/>
      </linearGradient>
      <radialGradient id="g2" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#ffff00"/><stop offset="100%" style="stop-color:#ffd54f"/>
      </radialGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="12" ry="14" fill="url(#g1)" stroke="#ff6f00" stroke-width="1.5" filter="url(#metalGold)"/>
    <path d="M20 28 Q14 20 16 14" stroke="url(#g1)" stroke-width="5" fill="none" stroke-linecap="round" filter="url(#metalGold)"/>
    <path d="M24 24 Q18 14 20 8" stroke="url(#g1)" stroke-width="4.5" fill="none" stroke-linecap="round" filter="url(#metalGold)"/>
    <path d="M32 22 Q30 12 32 6" stroke="url(#g1)" stroke-width="5" fill="none" stroke-linecap="round" filter="url(#metalGold)"/>
    <path d="M40 24 Q46 14 44 8" stroke="url(#g1)" stroke-width="4.5" fill="none" stroke-linecap="round" filter="url(#metalGold)"/>
    <path d="M44 28 Q50 20 48 14" stroke="url(#g1)" stroke-width="5" fill="none" stroke-linecap="round" filter="url(#metalGold)"/>
    <path d="M16 14 L14 10 L18 14" fill="url(#g2)" stroke="#ff6f00" stroke-width="0.8"/>
    <path d="M20 8 L18 4 L22 8" fill="url(#g2)" stroke="#ff6f00" stroke-width="0.8"/>
    <path d="M32 6 L31 2 L33 6" fill="url(#g2)" stroke="#ff6f00" stroke-width="0.8"/>
    <path d="M44 8 L46 4 L42 8" fill="url(#g2)" stroke="#ff6f00" stroke-width="0.8"/>
    <path d="M48 14 L50 10 L46 14" fill="url(#g2)" stroke="#ff6f00" stroke-width="0.8"/>
    <path d="M28 30 Q32 28 36 30 Q32 34 28 30 Z" fill="#ff6f00" opacity="0.3"/>
    <circle cx="32" cy="32" r="8" fill="#ffd54f" opacity="0.15" filter="url(#outerGlow)"/>''',
        "theme": "dragon"
    }

def 朱雀圣火():
    return {
        "svg": f'''{defs()}
      <radialGradient id="g1" cx="50%" cy="60%">
        <stop offset="0%" style="stop-color:#ff6d00"/><stop offset="50%" style="stop-color:#dd2c00"/>
        <stop offset="100%" style="stop-color:#b71c1c"/>
      </radialGradient>
      <radialGradient id="g2" cx="50%" cy="40%">
        <stop offset="0%" style="stop-color:#ffff00"/><stop offset="40%" style="stop-color:#ffab00"/>
        <stop offset="100%" style="stop-color:#ff6d00"/>
      </radialGradient>
    </defs>
    <ellipse cx="32" cy="36" rx="10" ry="12" fill="url(#g1)" stroke="#b71c1c" stroke-width="1.5" filter="url(#fireGlow)"/>
    <path d="M32 46 Q18 56 10 48 Q16 58 32 56 Q48 58 54 48 Q46 56 32 46 Z" fill="url(#g2)" stroke="#ff6d00" stroke-width="1.2" filter="url(#fireGlow)"/>
    <path d="M32 48 Q22 58 14 50 Q20 60 32 58 Q44 60 50 50 Q40 58 32 48 Z" fill="#ffab00" stroke="#ff6d00" stroke-width="0.8" opacity="0.6"/>
    <path d="M22 30 Q6 16 4 30 Q10 40 22 38" fill="url(#g2)" stroke="#ff6d00" stroke-width="1.5" filter="url(#fireGlow)"/>
    <path d="M42 30 Q58 16 60 30 Q54 40 42 38" fill="url(#g2)" stroke="#ff6d00" stroke-width="1.5" filter="url(#fireGlow)"/>
    <circle cx="32" cy="20" r="10" fill="url(#g2)" stroke="#ffab00" stroke-width="1" filter="url(#fireGlow)" opacity="0.9"/>
    <circle cx="32" cy="20" r="8" fill="url(#g1)" stroke="#b71c1c" stroke-width="1.2" filter="url(#fireGlow)"/>
    <circle cx="29" cy="19" r="2" fill="#ffff00" opacity="0.8"/>
    <circle cx="35" cy="19" r="2" fill="#ffff00" opacity="0.8"/>
    <path d="M30 22 Q32 24 34 22" stroke="#ffff00" stroke-width="1" fill="none" opacity="0.6"/>
    <path d="M32 20 L36 22 L32 23 Z" fill="#ff6600" stroke="#b71c1c" stroke-width="0.8"/>
    <circle cx="12" cy="22" r="2" fill="#ffab00" opacity="0.8" filter="url(#fireGlow)">
      <animate attributeName="cy" values="22;18;22" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="52" cy="22" r="2" fill="#ffab00" opacity="0.8" filter="url(#fireGlow)">
      <animate attributeName="cy" values="22;18;22" dur="1.8s" repeatCount="indefinite"/>
    </circle>
    <circle cx="32" cy="4" r="3" fill="#ffff00" opacity="0.9" filter="url(#fireGlow)">
      <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite"/>
    </circle>''',
        "theme": "fire"
    }

def 玄武神盾():
    """史诗品质 - 玄武神盾 - 拟物化石盾"""
    return {
        "svg": f'''{defs()}
      <!-- 石盾纹理滤镜 -->
      <filter id="stoneShield" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise"/>
        <feDiffuseLighting in="noise" lighting-color="#c0c0c0" surfaceScale="3" result="diff">
          <feDistantLight azimuth="45" elevation="55"/>
        </feDiffuseLighting>
        <feComposite in="diff" in2="SourceAlpha" operator="in" result="lit"/>
        <feMerge><feMergeNode in="lit"/></feMerge>
      </filter>
    </defs>
    <!-- 盾牌主体 - 玄武龟甲造型 -->
    <path d="M32 8 L48 16 L52 32 L48 48 L32 56 L16 48 L12 32 L16 16 Z" fill="url(#stoneGrad)" stroke="#4a4a4a" stroke-width="2.5" filter="url(#stoneShield)"/>
    <!-- 龟甲纹路 -->
    <path d="M32 8 L32 56 M16 48 L48 16 M48 48 L16 16 M24 12 L40 52 M24 52 L40 12" stroke="#3a3a3a" stroke-width="1" opacity="0.4"/>
    <ellipse cx="32" cy="32" rx="12" ry="16" fill="none" stroke="#5a5a5a" stroke-width="1.5" opacity="0.5"/>
    <!-- 中央玄武图腾 -->
    <path d="M32 24 Q28 28 28 32 Q28 36 32 38 Q36 36 36 32 Q36 28 32 24 Z" fill="url(#metalIronGrad)" stroke="#2a2a2a" stroke-width="1.5" filter="url(#metalIron)"/>
    <circle cx="32" cy="28" r="2" fill="#808080" opacity="0.7"/>
    <circle cx="32" cy="36" r="2" fill="#808080" opacity="0.7"/>
    <!-- 盾牌边缘高光 -->
    <path d="M32 8 L48 16 L52 32" fill="none" stroke="#e0e0e0" stroke-width="1.5" opacity="0.6"/>
    <path d="M32 8 L16 16 L12 32" fill="none" stroke="#606060" stroke-width="1.5" opacity="0.6"/>
    <!-- 底部装饰 -->
    <path d="M20 52 Q32 56 44 52" fill="none" stroke="#6a6a6a" stroke-width="2"/>
    <circle cx="32" cy="54" r="3" fill="url(#metalBrassGrad)" stroke="#4a4a4a" stroke-width="1" filter="url(#metalBrass)"/>''' ,
        "theme": "earth"
    }

def 白鹤翎羽():
    """史诗品质 - 白鹤翎羽 - 拟物化羽毛"""
    return {
        "svg": f'''{defs()}
      <!-- 羽毛纹理滤镜 -->
      <filter id="featherTex" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.06 0.02" numOctaves="3" result="noise"/>
        <feDiffuseLighting in="noise" lighting-color="#ffffff" surfaceScale="1.5" result="diff"/>
        <feComposite in="diff" in2="SourceAlpha" operator="in" result="lit"/>
        <feMerge><feMergeNode in="lit"/></feMerge>
      </filter>
    </defs>
    <!-- 主羽毛 -->
    <path d="M32 6 L32 58" stroke="url(#boneGrad)" stroke-width="2.5" stroke-linecap="round"/>
    <!-- 左侧羽片 -->
    <path d="M32 12 Q22 14 18 20 Q16 24 20 26" fill="url(#featherLG)" stroke="#d0d0d0" stroke-width="0.8" filter="url(#featherTex)"/>
    <path d="M32 18 Q20 20 14 28 Q12 32 18 34" fill="url(#featherLG)" stroke="#d0d0d0" stroke-width="0.8" filter="url(#featherTex)"/>
    <path d="M32 24 Q20 26 14 36 Q12 40 20 42" fill="url(#featherLG)" stroke="#d0d0d0" stroke-width="0.8" filter="url(#featherTex)"/>
    <path d="M32 30 Q22 32 18 44 Q16 48 24 50" fill="url(#featherLG)" stroke="#d0d0d0" stroke-width="0.8" filter="url(#featherTex)"/>
    <path d="M32 36 Q24 38 22 50 Q20 54 28 56" fill="url(#featherLG)" stroke="#d0d0d0" stroke-width="0.8" filter="url(#featherTex)"/>
    <!-- 右侧羽片 -->
    <path d="M32 12 Q42 14 46 20 Q48 24 44 26" fill="url(#featherRG)" stroke="#d0d0d0" stroke-width="0.8" filter="url(#featherTex)"/>
    <path d="M32 18 Q44 20 50 28 Q52 32 46 34" fill="url(#featherRG)" stroke="#d0d0d0" stroke-width="0.8" filter="url(#featherTex)"/>
    <path d="M32 24 Q44 26 50 36 Q52 40 44 42" fill="url(#featherRG)" stroke="#d0d0d0" stroke-width="0.8" filter="url(#featherTex)"/>
    <path d="M32 30 Q42 32 46 44 Q48 48 40 50" fill="url(#featherRG)" stroke="#d0d0d0" stroke-width="0.8" filter="url(#featherTex)"/>
    <path d="M32 36 Q40 38 42 50 Q44 54 36 56" fill="url(#featherRG)" stroke="#d0d0d0" stroke-width="0.8" filter="url(#featherTex)"/>
    <!-- 羽毛尖端高光 -->
    <circle cx="32" cy="8" r="3" fill="#ffffff" opacity="0.8"/>
    <circle cx="32" cy="8" r="1.5" fill="#f0f0f0" opacity="0.9" filter="url(#specular)"/>''' ,
        "theme": "wind"
    }

def 青龙护卫():
    """史诗品质 - 青龙护卫 - 拟物化龙形"""
    return {
        "svg": f'''{defs()}
    </defs>
    <!-- 龙身蜿蜒 -->
    <path d="M12 48 Q16 40 24 36 Q32 32 36 24 Q40 16 48 12 Q52 10 56 14" stroke="url(#dragonGrad)" stroke-width="6" fill="none" stroke-linecap="round" filter="url(#metalChrome)"/>
    <!-- 龙鳞纹理 -->
    <path d="M18 44 Q20 42 22 44 M26 38 Q28 36 30 38 M34 30 Q36 28 38 30 M42 20 Q44 18 46 20" stroke="#c0e0ff" stroke-width="1" fill="none" opacity="0.6"/>
    <!-- 龙爪 -->
    <path d="M48 12 L50 16 L48 20" stroke="url(#metalIronGrad)" stroke-width="2.5" fill="none" stroke-linecap="round" filter="url(#metalIron)"/>
    <path d="M50 12 L52 18" stroke="url(#metalIronGrad)" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- 龙首 -->
    <ellipse cx="56" cy="14" rx="6" ry="4" fill="url(#dragonGrad)" stroke="#2a4a6a" stroke-width="1.5" filter="url(#metalChrome)"/>
    <circle cx="58" cy="13" r="1.5" fill="#ff4444" filter="url(#glow)"/>
    <circle cx="58" cy="13" r="0.8" fill="#ffffff"/>
    <!-- 龙须 -->
    <path d="M56 14 Q60 12 64 14" stroke="#80c0ff" stroke-width="1" fill="none"/>
    <path d="M56 16 Q60 18 64 16" stroke="#80c0ff" stroke-width="1" fill="none"/>
    <!-- 祥云装饰 -->
    <path d="M10 52 Q8 48 12 46 Q16 44 14 48" fill="#e0e0e0" opacity="0.5" filter="url(#cloudBlur)"/>
    <path d="M6 56 Q4 52 8 50 Q12 48 10 52" fill="#e0e0e0" opacity="0.4" filter="url(#cloudBlur)"/>''' ,
        "theme": "dragon"
    }

def 冰火蛟龙():
    """史诗品质 - 冰火蛟龙 - 拟物化双头龙"""
    return {
        "svg": f'''{defs()}
      <!-- 冰火双重滤镜 -->
      <filter id="iceFire" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur"/>
        <feSpecularLighting in="blur" surfaceScale="4" specularConstant="1" specularExponent="30" lighting-color="#ffffff" result="spec"/>
        <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut"/>
        <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0"/>
        <feMerge><feMergeNode/></feMerge>
      </filter>
    </defs>
    <!-- 火龙头（右侧） -->
    <ellipse cx="50" cy="18" rx="8" ry="6" fill="url(#fireGrad)" stroke="#b71c1c" stroke-width="1.5" filter="url(#iceFire)"/>
    <circle cx="54" cy="16" r="2" fill="#ffee00" filter="url(#glow)"/>
    <circle cx="54" cy="16" r="1" fill="#ffffff"/>
    <path d="M50 12 L52 8 L54 12" fill="url(#fireGrad)" stroke="#ff6d00" stroke-width="0.8"/>
    <!-- 冰龙头（左侧） -->
    <ellipse cx="14" cy="18" rx="8" ry="6" fill="url(#iceGrad)" stroke="#1565c0" stroke-width="1.5" filter="url(#iceFire)"/>
    <circle cx="10" cy="16" r="2" fill="#80d8ff" filter="url(#glow)"/>
    <circle cx="10" cy="16" r="1" fill="#ffffff"/>
    <path d="M14 12 L12 8 L10 12" fill="url(#iceGrad)" stroke="#42a5f5" stroke-width="0.8"/>
    <!-- 龙身（蜿蜒） -->
    <path d="M22 18 Q32 24 32 32 Q32 40 22 46 Q32 52 42 46 Q52 40 50 18" stroke="url(#iceFireGrad)" stroke-width="8" fill="none" stroke-linecap="round" filter="url(#iceFire)"/>
    <!-- 龙鳞 -->
    <path d="M25 22 Q28 24 25 26 M35 28 Q38 30 35 32 M25 36 Q28 38 25 40 M45 36 Q48 38 45 40" stroke="#e0e0e0" stroke-width="1" fill="none" opacity="0.5"/>
    <!-- 龙爪 -->
    <path d="M32 32 L30 38 L28 36" stroke="url(#metalIronGrad)" stroke-width="2" fill="none" stroke-linecap="round" filter="url(#metalIron)"/>
    <path d="M32 32 L36 38 L38 36" stroke="url(#metalIronGrad)" stroke-width="2" fill="none" stroke-linecap="round" filter="url(#metalIron)"/>''' ,
        "theme": "icefire"
    }

def 雷电狼王():
    """史诗品质 - 雷电狼王 - 拟物化狼首"""
    return {
        "svg": f'''{defs()}
      <!-- 雷电光效滤镜 -->
      <filter id="lightning">
        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.06" numOctaves="2" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
    <!-- 狼首轮廓 -->
    <ellipse cx="32" cy="28" rx="16" ry="14" fill="url(#metalIronGrad)" stroke="#2a2a2a" stroke-width="2" filter="url(#metalIron)"/>
    <!-- 狼耳 -->
    <path d="M20 18 L16 6 L24 16 Z" fill="url(#metalIronGrad)" stroke="#2a2a2a" stroke-width="1.5" filter="url(#metalIron)"/>
    <path d="M44 18 L48 6 L40 16 Z" fill="url(#metalIronGrad)" stroke="#2a2a2a" stroke-width="1.5" filter="url(#metalIron)"/>
    <!-- 狼眼（雷电发光） -->
    <ellipse cx="26" cy="26" rx="4" ry="3" fill="#ffff00" filter="url(#glow)"/>
    <ellipse cx="38" cy="26" rx="4" ry="3" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="26" cy="26" r="2" fill="#ffffff"/>
    <circle cx="38" cy="26" r="2" fill="#ffffff"/>
    <!-- 狼吻 -->
    <path d="M28 34 Q32 40 36 34" fill="none" stroke="#4a4a4a" stroke-width="2"/>
    <path d="M30 36 L28 38 L32 37 L36 38 L34 36" fill="#6a6a6a" stroke="#4a4a4a" stroke-width="1"/>
    <!-- 雷电纹路 -->
    <path d="M20 24 L24 28 L22 32 L28 28" stroke="#ffff00" stroke-width="1.5" fill="none" filter="url(#lightning)" opacity="0.8"/>
    <path d="M44 24 L40 28 L42 32 L36 28" stroke="#ffff00" stroke-width="1.5" fill="none" filter="url(#lightning)" opacity="0.8"/>
    <!-- 鬃毛 -->
    <path d="M32 14 Q28 10 24 14 Q20 8 16 12 Q20 6 28 10 Q32 6 36 10 Q44 6 48 12 Q44 8 40 14 Q36 10 32 14" fill="url(#lightningGrad)" stroke="#2a2a2a" stroke-width="1" filter="url(#lightning)" opacity="0.7"/>''' ,
        "theme": "lightning"
    }

def 幽灵蝶():
    """史诗品质 - 幽灵蝶 - 拟物化蝴蝶"""
    return {
        "svg": f'''{defs()}
      <!-- 幽灵效果滤镜 -->
      <filter id="ghostBlur">
        <feGaussianBlur stdDeviation="1.5" result="blur"/>
        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0"/>
      </filter>
    </defs>
    <!-- 左翅 -->
    <ellipse cx="20" cy="28" rx="14" ry="18" fill="url(#ghostGrad)" stroke="#9c27b0" stroke-width="1.5" filter="url(#ghostBlur)" opacity="0.8"/>
    <path d="M12 20 Q20 28 12 36 M16 16 Q20 28 16 40 M20 14 Q20 28 20 42" stroke="#e1bee7" stroke-width="1" fill="none" opacity="0.6"/>
    <!-- 右翅 -->
    <ellipse cx="44" cy="28" rx="14" ry="18" fill="url(#ghostGrad)" stroke="#9c27b0" stroke-width="1.5" filter="url(#ghostBlur)" opacity="0.8"/>
    <path d="M52 20 Q44 28 52 36 M48 16 Q44 28 48 40 M44 14 Q44 28 44 42" stroke="#e1bee7" stroke-width="1" fill="none" opacity="0.6"/>
    <!-- 蝶身 -->
    <ellipse cx="32" cy="28" rx="4" ry="16" fill="url(#purpleGrad)" stroke="#6a1b9a" stroke-width="1.5" filter="url(#metalChrome)"/>
    <circle cx="32" cy="18" r="3" fill="url(#purpleGrad)" stroke="#6a1b9a" stroke-width="1"/>
    <!-- 触须 -->
    <path d="M32 14 Q28 8 24 10" stroke="#ce93d8" stroke-width="1.5" fill="none"/>
    <path d="M32 14 Q36 8 40 10" stroke="#ce93d8" stroke-width="1.5" fill="none"/>
    <!-- 幽灵光点 -->
    <circle cx="20" cy="28" r="2" fill="#e1bee7" opacity="0.8" filter="url(#glow)">
      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="44" cy="28" r="2" fill="#e1bee7" opacity="0.8" filter="url(#glow)">
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
    </circle>''' ,
        "theme": "ghost"
    }

def 赤炎狮王():
    """史诗品质 - 赤炎狮王 - 拟物化狮首"""
    return {
        "svg": f'''{defs()}
      <!-- 鬃毛滤镜 -->
      <filter id="mane">
        <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="3" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
      </filter>
    </defs>
    <!-- 狮首轮廓 -->
    <ellipse cx="32" cy="30" rx="18" ry="16" fill="url(#fireGrad)" stroke="#b71c1c" stroke-width="2" filter="url(#metalChrome)"/>
    <!-- 鬃毛 -->
    <path d="M18 20 Q14 8 20 6 Q28 4 32 8 Q36 4 44 6 Q50 8 46 20" fill="url(#fireGrad2)" stroke="#ff6d00" stroke-width="1.5" filter="url(#mane)"/>
    <path d="M14 24 Q8 14 12 8 Q16 4 22 10" fill="url(#fireGrad2)" stroke="#ff6d00" stroke-width="1.2" filter="url(#mane)" opacity="0.8"/>
    <path d="M50 24 Q56 14 52 8 Q48 4 42 10" fill="url(#fireGrad2)" stroke="#ff6d00" stroke-width="1.2" filter="url(#mane)" opacity="0.8"/>
    <!-- 狮眼 -->
    <ellipse cx="26" cy="28" rx="4" ry="3.5" fill="#ffff00" filter="url(#glow)"/>
    <ellipse cx="38" cy="28" rx="4" ry="3.5" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="26" cy="28" r="2" fill="#ffffff"/>
    <circle cx="38" cy="28" r="2" fill="#ffffff"/>
    <!-- 狮鼻和嘴 -->
    <ellipse cx="32" cy="34" rx="3" ry="2" fill="#ff8a65" stroke="#bf360c" stroke-width="1"/>
    <path d="M29 38 Q32 42 35 38" fill="none" stroke="#4a4a4a" stroke-width="2"/>
    <!-- 狮牙 -->
    <path d="M30 38 L30 42 L32 40 L34 42 L34 38" fill="#f5f5f5" stroke="#bdbdbd" stroke-width="0.8"/>''' ,
        "theme": "fire"
    }

def 碧海银鲸():
    """史诗品质 - 碧海银鲸 - 拟物化鲸鱼"""
    return {
        "svg": f'''{defs()}
    </defs>
    <!-- 鲸身 -->
    <ellipse cx="32" cy="32" rx="22" ry="14" fill="url(#waterGrad)" stroke="#1565c0" stroke-width="2" filter="url(#metalChrome)"/>
    <!-- 鲸头 -->
    <path d="M54 32 Q60 28 58 36 Q56 40 54 36" fill="url(#waterGrad)" stroke="#1565c0" stroke-width="1.5"/>
    <!-- 鲸眼 -->
    <circle cx="50" cy="30" r="2.5" fill="#ffffff"/>
    <circle cx="50" cy="30" r="1.2" fill="#1a1a1a"/>
    <!-- 鲸鳍 -->
    <path d="M28 32 L20 24 L24 32" fill="url(#waterGrad)" stroke="#1565c0" stroke-width="1.5" filter="url(#metalIron)"/>
    <path d="M36 32 L44 24 L40 32" fill="url(#waterGrad)" stroke="#1565c0" stroke-width="1.5" filter="url(#metalIron)"/>
    <!-- 鲸尾 -->
    <path d="M10 32 Q4 28 6 24 Q8 28 10 30" fill="url(#waterGrad)" stroke="#1565c0" stroke-width="1.5"/>
    <path d="M10 32 Q4 36 6 40 Q8 36 10 34" fill="url(#waterGrad)" stroke="#1565c0" stroke-width="1.5"/>
    <!-- 水花 -->
    <path d="M54 28 Q58 24 62 26" stroke="#80d8ff" stroke-width="1.5" fill="none" opacity="0.8"/>
    <path d="M54 36 Q58 40 62 38" stroke="#80d8ff" stroke-width="1.5" fill="none" opacity="0.8"/>
    <circle cx="60" cy="26" r="1.5" fill="#80d8ff" opacity="0.6"/>
    <circle cx="60" cy="38" r="1.5" fill="#80d8ff" opacity="0.6"/>''' ,
        "theme": "water"
    }

def 紫电金鹰():
    """史诗品质 - 紫电金鹰 - 拟物化鹰首"""
    return {
        "svg": f'''{defs()}
      <!-- 雷电羽毛滤镜 -->
      <filter id="thunderFeather">
        <feTurbulence type="fractalNoise" baseFrequency="0.05 0.02" numOctaves="2" result="noise"/>
        <feSpecularLighting in="noise" surfaceScale="2" specularConstant="0.8" specularExponent="20" lighting-color="#b388ff" result="spec"/>
        <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut"/>
        <feMerge><feMergeNode in="specOut"/></feMerge>
      </filter>
    </defs>
    <!-- 鹰首 -->
    <ellipse cx="32" cy="24" rx="14" ry="12" fill="url(#purpleGrad)" stroke="#4a148c" stroke-width="2" filter="url(#metalChrome)"/>
    <!-- 鹰嘴 -->
    <path d="M46 24 L50 20 L44 24 L46 28 Z" fill="url(#metalGoldGrad)" stroke="#ff8f00" stroke-width="1.5" filter="url(#metalGold)"/>
    <!-- 鹰眼 -->
    <circle cx="26" cy="22" r="4" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="38" cy="22" r="4" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="26" cy="22" r="2" fill="#ffffff"/>
    <circle cx="38" cy="22" r="2" fill="#ffffff"/>
    <!-- 鹰羽 -->
    <path d="M20 24 L14 20 L18 26" fill="url(#purpleGrad)" stroke="#6a1b9a" stroke-width="1.2" filter="url(#thunderFeather)"/>
    <path d="M44 24 L50 20 L46 26" fill="url(#purpleGrad)" stroke="#6a1b9a" stroke-width="1.2" filter="url(#thunderFeather)"/>
    <!-- 雷电纹路 -->
    <path d="M28 30 L32 34 L30 34 L34 40" stroke="#b388ff" stroke-width="1.5" fill="none" filter="url(#glow)" opacity="0.8"/>
    <path d="M36 30 L32 34 L34 34 L30 40" stroke="#b388ff" stroke-width="1.5" fill="none" filter="url(#glow)" opacity="0.8"/>''' ,
        "theme": "lightning"
    }

def 幽影黑豹():
    """史诗品质 - 幽影黑豹 - 拟物化豹首"""
    return {
        "svg": f'''{defs()}
      <!-- 暗影滤镜 -->
      <filter id="shadowBlur">
        <feGaussianBlur stdDeviation="1" result="blur"/>
        <feColorMatrix in="blur" type="matrix" values="0.3 0 0 0 0  0 0.3 0 0 0  0 0 0.3 0 0  0 0 0 0.8 0"/>
      </filter>
    </defs>
    <!-- 豹首轮廓 -->
    <ellipse cx="32" cy="28" rx="16" ry="14" fill="url(#shadowGrad)" stroke="#212121" stroke-width="2" filter="url(#shadowBlur)"/>
    <!-- 豹耳 -->
    <path d="M20 18 L16 8 L24 14 Z" fill="url(#shadowGrad)" stroke="#212121" stroke-width="1.5" filter="url(#metalIron)"/>
    <path d="M44 18 L48 8 L40 14 Z" fill="url(#shadowGrad)" stroke="#212121" stroke-width="1.5" filter="url(#metalIron)"/>
    <!-- 豹眼（发光） -->
    <ellipse cx="26" cy="26" rx="3.5" ry="2.5" fill="#ff6d00" filter="url(#glow)"/>
    <ellipse cx="38" cy="26" rx="3.5" ry="2.5" fill="#ff6d00" filter="url(#glow)"/>
    <circle cx="26" cy="26" r="1.5" fill="#ffffff"/>
    <circle cx="38" cy="26" r="1.5" fill="#ffffff"/>
    <!-- 豹鼻 -->
    <ellipse cx="32" cy="32" rx="3" ry="2" fill="#757575" stroke="#424242" stroke-width="1"/>
    <!-- 豹牙 -->
    <path d="M30 36 L30 40 L31 38" fill="#f5f5f5" stroke="#bdbdbd" stroke-width="0.8"/>
    <path d="M34 36 L34 40 L33 38" fill="#f5f5f5" stroke="#bdbdbd" stroke-width="0.8"/>
    <!-- 黑豹纹路 -->
    <path d="M24 20 Q26 22 24 24" stroke="#424242" stroke-width="1.5" fill="none"/>
    <path d="M40 20 Q38 22 40 24" stroke="#424242" stroke-width="1.5" fill="none"/>
    <path d="M28 20 Q30 22 28 24" stroke="#424242" stroke-width="1.5" fill="none"/>
    <path d="M36 20 Q34 22 36 24" stroke="#424242" stroke-width="1.5" fill="none"/>''' ,
        "theme": "shadow"
    }

def 碎星陨铁():
    return {
        "svg": f'''{defs()}
    </defs>
    <path d="M20 20 Q16 28 18 36 Q22 44 32 46 Q42 44 46 36 Q48 28 44 20 Q40 12 32 10 Q24 12 20 20 Z" fill="url(#metalIronGrad)" stroke="#2a2a2a" stroke-width="2" filter="url(#metalIron)"/>
    <path d="M28 16 L32 24 L30 32 L34 40" stroke="#4a4a4a" stroke-width="1.5" fill="none" opacity="0.7"/>
    <circle cx="26" cy="22" r="1.5" fill="#ffffff" opacity="0.9" filter="url(#specular)"/>
    <circle cx="38" cy="28" r="1.5" fill="#ffffff" opacity="0.9" filter="url(#specular)"/>''' ,
        "theme": "metal"
    }

def 蓝电霸王龙():
    return {
        "svg": f'''{defs()}
    </defs>
    <path d="M32 8 L20 20 L16 40 Q18 52 32 56 Q46 52 48 40 L44 20 Z" fill="url(#dragonGrad)" stroke="#0d47a1" stroke-width="2" filter="url(#metalChrome)"/>
    <circle cx="26" cy="24" r="3" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="38" cy="24" r="3" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="26" cy="24" r="1.5" fill="#ffffff"/>
    <circle cx="38" cy="24" r="1.5" fill="#ffffff"/>
    <path d="M20 16 L16 8 L24 14" fill="url(#dragonGrad)" stroke="#0d47a1" stroke-width="1.5"/>
    <path d="M44 16 L48 8 L40 14" fill="url(#dragonGrad)" stroke="#0d47a1" stroke-width="1.5"/>
    <path d="M28 40 L24 48 L28 46 L32 52 L36 46 L40 48 L36 40" fill="#ff8f00" stroke="#e65100" stroke-width="1"/>''' ,
        "theme": "dragon"
    }

def 昊天锤():
    return {
        "svg": f'''{defs()}
    </defs>
    <!-- 锤头 -->
    <rect x="22" y="12" width="20" height="24" rx="4" fill="url(#metalIronGrad)" stroke="#2a2a2a" stroke-width="2" filter="url(#metalIron)"/>
    <!-- 锤头纹理 -->
    <path d="M26 16 L38 16 M26 20 L38 20 M26 24 L38 24 M26 28 L38 28" stroke="#4a4a4a" stroke-width="1" opacity="0.5"/>
    <!-- 锤柄 -->
    <rect x="30" y="36" width="4" height="24" fill="url(#woodGrad)" stroke="#5D3A1A" stroke-width="1.5" filter="url(#woodTexture)"/>
    <!-- 锤柄缠绕 -->
    <path d="M30 40 L34 40 M30 44 L34 44 M30 48 L34 48" stroke="#8B4513" stroke-width="1.5" opacity="0.8"/>
    <!-- 金属高光 -->
    <rect x="23" y="13" width="18" height="2" fill="#ffffff" opacity="0.3"/>
    <rect x="23" y="13" width="2" height="22" fill="#ffffff" opacity="0.2"/>''' ,
        "theme": "metal"
    }

def 六翼天使():
    return {
        "svg": f'''{defs()}
    </defs>
    <!-- 天使身体 -->
    <ellipse cx="32" cy="36" rx="8" ry="14" fill="url(#goldGrad)" stroke="#ff8f00" stroke-width="1.5" filter="url(#metalGold)"/>
    <!-- 左翼 -->
    <path d="M24 28 Q12 20 8 32 Q10 40 24 38" fill="url(#featherLG)" stroke="#ffd54f" stroke-width="1.5" filter="url(#metalChrome)" opacity="0.9"/>
    <path d="M24 32 Q14 26 12 36 Q14 42 24 40" fill="url(#featherLG)" stroke="#ffd54f" stroke-width="1.5" filter="url(#metalChrome)" opacity="0.7"/>
    <!-- 右翼 -->
    <path d="M40 28 Q52 20 56 32 Q54 40 40 38" fill="url(#featherRG)" stroke="#ffd54f" stroke-width="1.5" filter="url(#metalChrome)" opacity="0.9"/>
    <path d="M40 32 Q50 26 52 36 Q50 42 40 40" fill="url(#featherRG)" stroke="#ffd54f" stroke-width="1.5" filter="url(#metalChrome)" opacity="0.7"/>
    <!-- 天使头 -->
    <circle cx="32" cy="20" r="6" fill="url(#goldGrad)" stroke="#ff8f00" stroke-width="1.5" filter="url(#metalGold)"/>
    <!-- 光环 -->
    <ellipse cx="32" cy="14" rx="10" ry="3" fill="none" stroke="#ffff00" stroke-width="2" opacity="0.8" filter="url(#glow)"/>''' ,
        "theme": "holy"
    }

def 泰坦巨猿():
    return {"svg": f'''{defs()}</defs><ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#stoneGrad)" stroke="#4a4a4a" stroke-width="2" filter="url(#stoneTexture)"/><circle cx="26" cy="28" r="4" fill="#ffff00" filter="url(#glow)"/><circle cx="38" cy="28" r="4" fill="#ffff00" filter="url(#glow)"/><circle cx="26" cy="28" r="2" fill="#ffffff"/><circle cx="38" cy="28" r="2" fill="#ffffff"/><path d="M28 38 L28 42 L30 40" fill="#f5f5f5" stroke="#bdbdbd" stroke-width="0.8"/><path d="M36 38 L36 42 L34 40" fill="#f5f5f5" stroke="#bdbdbd" stroke-width="0.8"/>''', "theme": "earth"}

def 噬魂蛛皇():
    return {"svg": f'''{defs()}</defs><ellipse cx="32" cy="32" rx="16" ry="14" fill="url(#shadowGrad)" stroke="#212121" stroke-width="2" filter="url(#shadowEffect)"/><circle cx="28" cy="28" r="3" fill="#ff00ff" filter="url(#glow)"/><circle cx="36" cy="28" r="3" fill="#ff00ff" filter="url(#glow)"/><path d="M32 18 L32 10" stroke="url(#shadowGrad)" stroke-width="3" stroke-linecap="round"/><path d="M32 46 L32 56" stroke="url(#shadowGrad)" stroke-width="3" stroke-linecap="round"/><path d="M18 32 L10 32" stroke="url(#shadowGrad)" stroke-width="3" stroke-linecap="round"/><path d="M46 32 L56 32" stroke="url(#shadowGrad)" stroke-width="3" stroke-linecap="round"/>''',         "theme": "shadow"}

def 死亡蛛皇():
    return {"svg": f'''{defs()}</defs><ellipse cx="32" cy="32" rx="16" ry="14" fill="url(#shadowGrad)" stroke="#212121" stroke-width="2" filter="url(#shadowEffect)"/><circle cx="28" cy="28" r="3" fill="#ff0000" filter="url(#glow)"/><circle cx="36" cy="28" r="3" fill="#ff0000" filter="url(#glow)"/><path d="M20 20 L28 28" stroke="#ff0000" stroke-width="1.5" fill="none"/><path d="M44 20 L36 28" stroke="#ff0000" stroke-width="1.5" fill="none"/><path d="M20 44 L26 36" stroke="#ff0000" stroke-width="1.5" fill="none"/><path d="M44 44 L38 36" stroke="#ff0000" stroke-width="1.5" fill="none"/>''', "theme": "shadow"}

def 冰碧帝皇蝎():
    return {"svg": f'''{defs()}</defs><ellipse cx="32" cy="32" rx="18" ry="12" fill="url(#iceGrad)" stroke="#1565c0" stroke-width="2" filter="url(#iceEffect)"/><path d="M14 32 L10 28 L14 24" fill="url(#iceGrad)" stroke="#1565c0" stroke-width="1.5"/><path d="M50 32 L54 28 L50 24" fill="url(#iceGrad)" stroke="#1565c0" stroke-width="1.5"/><circle cx="26" cy="30" r="3" fill="#80d8ff" filter="url(#glow)"/><circle cx="38" cy="30" r="3" fill="#80d8ff" filter="url(#glow)"/><path d="M32 44 L32 56" stroke="url(#iceGrad)" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="56" r="4" fill="url(#iceGrad)" stroke="#1565c0" stroke-width="1.5"/>''', "theme": "ice"}

def gen_legend():
    """传说品质图标"""
    icons = {}
    icons["碎星陨铁"] = 碎星陨铁()
    icons["蓝电霸王龙"] = 蓝电霸王龙()
    icons["昊天锤"] = 昊天锤()
    icons["六翼天使"] = 六翼天使()
    icons["泰坦巨猿"] = 泰坦巨猿()
    icons["噬魂蛛皇"] = 噬魂蛛皇()
    icons["死亡蛛皇"] = 死亡蛛皇()
    icons["冰碧帝皇蝎"] = 冰碧帝皇蝎()
    icons["烈火剑圣"] = 烈火剑圣()
    icons["星辰神兽"] = 星辰神兽()
    icons["雷霆战神"] = 雷霆战神()
    icons["极寒冰皇"] = 极寒冰皇()
    icons["焰灵骑士"] = 焰灵骑士()
    icons["黄金圣龙"] = 黄金圣龙()
    icons["狂风战鹰"] = 狂风战鹰()
    icons["暗域鬼王"] = 暗域鬼王()
    icons["极焱炎神"] = 极焱炎神()
    icons["时沙巨蟒"] = 时沙巨蟒()
    return icons

def 烈火剑圣():
    return {"svg": f'''{defs()}</defs><path d="M32 8 L32 56" stroke="url(#fireGrad)" stroke-width="6" stroke-linecap="round" filter="url(#fireGlow)"/><path d="M32 8 L44 16 L36 20 L48 28 L32 36" stroke="url(#fireGrad)" stroke-width="8" stroke-linecap="round" fill="none" filter="url(#fireGlow)"/><path d="M24 12 L28 20" stroke="url(#metalIronGrad)" stroke-width="3" stroke-linecap="round" filter="url(#metalIron)"/><circle cx="32" cy="8" r="3" fill="url(#fireGrad)" stroke="#b71c1c" stroke-width="1.5" filter="url(#fireGlow)"/>''', "theme": "fire"}

def 星辰神兽():
    return {"svg": f'''{defs()}</defs><ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#goldGrad)" stroke="#ff8f00" stroke-width="2" filter="url(#metalGold)"/><circle cx="26" cy="28" r="3" fill="#00bfff" filter="url(#glow)"/><circle cx="38" cy="28" r="3" fill="#00bfff" filter="url(#glow)"/><path d="M20 32 L12 28 L16 36" fill="url(#goldGrad)" stroke="#ff8f00" stroke-width="1.5"/><path d="M44 32 L52 28 L48 36" fill="url(#goldGrad)" stroke="#ff8f00" stroke-width="1.5"/><circle cx="32" cy="44" r="6" fill="url(#goldGrad)" stroke="#ff8f00" stroke-width="1.5" filter="url(#metalGold)"/>''', "theme": "star"}

def 雷霆战神():
    return {"svg": f'''{defs()}</defs><ellipse cx="32" cy="30" rx="16" ry="14" fill="url(#purpleGrad)" stroke="#4a148c" stroke-width="2" filter="url(#metalChrome)"/><circle cx="26" cy="28" r="3" fill="#b388ff" filter="url(#glow)"/><circle cx="38" cy="28" r="3" fill="#b388ff" filter="url(#glow)"/><path d="M24 40 L20 48 L28 44 L32 52 L36 44 L44 48 L40 40" fill="url(#metalGoldGrad)" stroke="#ff8f00" stroke-width="1.5" filter="url(#metalGold)"/><path d="M32 16 L32 8" stroke="url(#purpleGrad)" stroke-width="4" stroke-linecap="round" filter="url(#glow)"/>''', "theme": "lightning"}

def 极寒冰皇():
    return {"svg": f'''{defs()}</defs><ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#iceGrad)" stroke="#1565c0" stroke-width="2" filter="url(#iceEffect)"/><circle cx="26" cy="28" r="3" fill="#80d8ff" filter="url(#glow)"/><circle cx="38" cy="28" r="3" fill="#80d8ff" filter="url(#glow)"/><path d="M20 32 L12 32" stroke="url(#iceGrad)" stroke-width="3" stroke-linecap="round"/><path d="M44 32 L52 32" stroke="url(#iceGrad)" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="18" r="4" fill="url(#iceGrad)" stroke="#1565c0" stroke-width="1.5" filter="url(#iceEffect)"/>''', "theme": "ice"}

def 焰灵骑士():
    return {"svg": f'''{defs()}</defs><path d="M32 8 L32 40" stroke="url(#fireGrad)" stroke-width="6" stroke-linecap="round" filter="url(#fireGlow)"/><circle cx="32" cy="8" r="4" fill="url(#fireGrad)" stroke="#b71c1c" stroke-width="1.5" filter="url(#fireGlow)"/><circle cx="26" cy="20" r="2" fill="#ffff00" filter="url(#glow)"/><circle cx="38" cy="20" r="2" fill="#ffff00" filter="url(#glow)"/><path d="M24 30 L20 38 L28 34 L32 42 L36 34 L44 38 L40 30" fill="url(#fireGrad2)" stroke="#ff6d00" stroke-width="1" filter="url(#fireGlow)"/>''', "theme": "fire"}

def 黄金圣龙():
    return {"svg": f'''{defs()}</defs><path d="M20 20 Q16 28 18 36 Q22 44 32 46 Q42 44 46 36 Q48 28 44 20 Q40 12 32 10 Q24 12 20 20 Z" fill="url(#goldGrad)" stroke="#ff8f00" stroke-width="2" filter="url(#metalGold)"/><circle cx="26" cy="24" r="3" fill="#ffff00" filter="url(#glow)"/><circle cx="38" cy="24" r="3" fill="#ffff00" filter="url(#glow)"/><path d="M20 16 L16 8 L24 14" fill="url(#goldGrad)" stroke="#ff8f00" stroke-width="1.5"/><path d="M44 16 L48 8 L40 14" fill="url(#goldGrad)" stroke="#ff8f00" stroke-width="1.5"/><path d="M28 38 L26 44 L30 40 L34 46 L38 40 L42 44 L40 38" fill="#ff8f00" stroke="#e65100" stroke-width="0.8"/>''', "theme": "dragon"}

def 狂风战鹰():
    return {"svg": f'''{defs()}</defs><ellipse cx="32" cy="28" rx="16" ry="12" fill="url(#windGrad)" stroke="#0277bd" stroke-width="2" filter="url(#metalChrome)"/><circle cx="26" cy="26" r="3" fill="#ffffff" filter="url(#glow)"/><circle cx="38" cy="26" r="3" fill="#ffffff" filter="url(#glow)"/><path d="M16 24 L8 20 L12 28" fill="url(#windGrad)" stroke="#0277bd" stroke-width="1.5"/><path d="M48 24 L56 20 L52 28" fill="url(#windGrad)" stroke="#0277bd" stroke-width="1.5"/><path d="M32 40 L32 48 L30 46 L32 52 L34 46 L36 48 L34 40" fill="url(#metalIronGrad)" stroke="#2a2a2a" stroke-width="1"/>''', "theme": "wind"}

def 暗域鬼王():
    return {"svg": f'''{defs()}</defs><ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#shadowGrad)" stroke="#212121" stroke-width="2" filter="url(#shadowEffect)"/><circle cx="26" cy="28" r="3" fill="#ff00ff" filter="url(#glow)"/><circle cx="38" cy="28" r="3" fill="#ff00ff" filter="url(#glow)"/><path d="M20 20 L16 12 L24 18" fill="url(#shadowGrad)" stroke="#212121" stroke-width="1.5"/><path d="M44 20 L48 12 L40 18" fill="url(#shadowGrad)" stroke="#212121" stroke-width="1.5"/><path d="M28 40 L26 44 L28 42 L32 48 L36 42 L38 44 L36 40" fill="#9c27b0" stroke="#6a1b9a" stroke-width="0.8"/>''', "theme": "shadow"}

def 极焱炎神():
    return {"svg": f'''{defs()}</defs><circle cx="32" cy="32" r="16" fill="url(#fireGrad)" stroke="#b71c1c" stroke-width="2" filter="url(#fireGlow)"/><circle cx="26" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/><circle cx="38" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/><path d="M32 48 L32 56" stroke="url(#fireGrad)" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="56" r="4" fill="url(#fireGrad)" stroke="#b71c1c" stroke-width="1.5" filter="url(#fireGlow)"/><circle cx="24" cy="40" r="3" fill="#ff6d00" opacity="0.8" filter="url(#glow)"/><circle cx="40" cy="42" r="3" fill="#ff6d00" opacity="0.8" filter="url(#glow)"/>''', "theme": "fire"}

def 时沙巨蟒():
    return {"svg": f'''{defs()}</defs><path d="M20 20 Q24 16 28 20 Q32 24 28 28 Q24 32 20 28 Q16 24 20 20 Z" fill="url(#stoneGrad)" stroke="#4a4a4a" stroke-width="2" filter="url(#stoneTexture)"/><circle cx="26" cy="24" r="2" fill="#ffff00" filter="url(#glow)"/><path d="M28 24 Q32 20 36 24 Q40 28 44 24 Q48 20 52 24 Q56 28 60 24" stroke="url(#stoneGrad)" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M28 24 Q32 28 36 24 Q40 20 44 24 Q48 28 52 24 Q56 20 60 24" stroke="url(#stoneGrad)" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>''', "theme": "earth"}

def gen_mythic():
    """神话品质图标"""
    icons = {}
    icons["九宝琉璃塔"] = 九宝琉璃塔()
    icons["蓝银皇"] = 蓝银皇()
    icons["堕落天使"] = 堕落天使()
    icons["极品火凤凰"] = 极品火凤凰()
    icons["金龙王"] = 金龙王()
    icons["海神武魂"] = 海神武魂()
    icons["七杀剑"] = 七杀剑()
    icons["雷灵王"] = 雷灵王()
    icons["星宿命盘"] = 星宿命盘()
    icons["幽冥神眼"] = 幽冥神眼()
    icons["混沌之翼"] = 混沌之翼()
    icons["天罚神雷"] = 天罚神雷()
    icons["永恒冰魂"] = 永恒冰魂()
    icons["炎狱魔神"] = 炎狱魔神()
    icons["天命神弓"] = 天命神弓()
    icons["混沌剑魂"] = 混沌剑魂()
    icons["神圣天使"] = 神圣天使()
    icons["柔骨兔王"] = 柔骨兔王()
    icons["混沌属性"] = 混沌属性()
    icons["宇宙之源"] = 宇宙之源()
    return icons

def 蓝银皇():
    return {"svg": f'''{defs()}</defs><path d="M32 56 Q32 30 20 16" stroke="url(#grassGrad)" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#metalChrome)"/><path d="M32 56 Q32 28 32 14" stroke="url(#grassGrad)" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#metalChrome)"/><path d="M32 56 Q32 30 44 16" stroke="url(#grassGrad)" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#metalChrome)"/><circle cx="32" cy="14" r="5" fill="url(#metalGoldGrad)" stroke="#ff8f00" stroke-width="1.5" filter="url(#metalGold)"/><circle cx="32" cy="14" r="2.5" fill="#ffff00" filter="url(#glow)"/>''', "theme": "nature"}

def 九宝琉璃塔():
    return {"svg": f'''{defs()}</defs><path d="M32 8 L32 56" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" filter="url(#metalGold)"/><path d="M20 16 L44 16" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round"/><path d="M20 28 L44 28" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round"/><path d="M20 40 L44 40" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="16" r="3" fill="#ffff00" filter="url(#glow)"/><circle cx="32" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/><circle cx="32" cy="40" r="3" fill="#ffff00" filter="url(#glow)"/><circle cx="32" cy="52" r="3" fill="#ffff00" filter="url(#glow)"/>''', "theme": "holy"}

# ──── 神话品质 Mythic ────

def 堕落天使():
    return {"svg": f'''{defs()}
      <linearGradient id="fallenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4a148c"/>
        <stop offset="50%" style="stop-color:#7b1fa2"/>
        <stop offset="100%" style="stop-color:#9c27b0"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#fallenGrad)" stroke="#4a148c" stroke-width="2" filter="url(#shadowEffect)"/>
    <path d="M20 20 L16 8 L24 16" fill="url(#shadowGrad)" stroke="#4a148c" stroke-width="1.5"/>
    <path d="M44 20 L48 8 L40 16" fill="url(#shadowGrad)" stroke="#4a148c" stroke-width="1.5"/>
    <circle cx="26" cy="28" r="3" fill="#ff00ff" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ff00ff" filter="url(#glow)"/>
    <path d="M28 40 L26 48 L30 44 L34 50 L38 44 L42 48 L40 40" fill="url(#shadowGrad)" stroke="#9c27b0" stroke-width="0.8"/>
    <circle cx="32" cy="18" r="4" fill="#ff00ff" opacity="0.6" filter="url(#glow)"/>''', "theme": "shadow"}

def 极品火凤凰():
    return {"svg": f'''{defs()}
      <linearGradient id="phoenixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff6f00"/>
        <stop offset="50%" style="stop-color:#ff1744"/>
        <stop offset="100%" style="stop-color:#d50000"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="16" fill="url(#phoenixGrad)" stroke="#d50000" stroke-width="2" filter="url(#fireGlow)"/>
    <path d="M20 20 Q28 8 36 20 Q44 8 52 20" stroke="url(#fireGrad)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M16 28 Q24 16 32 28 Q40 16 48 28" stroke="url(#fireGrad)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="26" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <path d="M32 44 L32 52 L30 48 L32 56 L34 48 L36 52 L34 44" fill="url(#fireGrad)" stroke="#d50000" stroke-width="1"/>''', "theme": "fire"}

def 金龙王():
    return {"svg": f'''{defs()}
      <linearGradient id="goldDragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ffd700"/>
        <stop offset="50%" style="stop-color:#ffab00"/>
        <stop offset="100%" style="stop-color:#ff6f00"/>
      </linearGradient>
    </defs>
    <path d="M20 20 Q16 28 18 36 Q22 44 32 46 Q42 44 46 36 Q48 28 44 20 Q40 12 32 10 Q24 12 20 20 Z" fill="url(#goldDragonGrad)" stroke="#ff6f00" stroke-width="2" filter="url(#metalGold)"/>
    <circle cx="26" cy="24" r="3" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="38" cy="24" r="3" fill="#ffff00" filter="url(#glow)"/>
    <path d="M20 16 L14 8 L22 14" fill="url(#goldDragonGrad)" stroke="#ff6f00" stroke-width="1.5"/>
    <path d="M44 16 L50 8 L42 14" fill="url(#goldDragonGrad)" stroke="#ff6f00" stroke-width="1.5"/>
    <path d="M28 38 L26 44 L30 40 L34 46 L38 40 L42 44 L40 38" fill="#ffab00" stroke="#ff6f00" stroke-width="0.8"/>
    <circle cx="32" cy="18" r="5" fill="url(#metalGoldGrad)" stroke="#ff6f00" stroke-width="1.5" filter="url(#metalGold)"/>''', "theme": "dragon"}

def 海神武魂():
    return {"svg": f'''{defs()}
      <linearGradient id="seaGodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#01579b"/>
        <stop offset="50%" style="stop-color:#0288d1"/>
        <stop offset="100%" style="stop-color:#4fc3f7"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="16" fill="url(#seaGodGrad)" stroke="#01579b" stroke-width="2" filter="url(#metalChrome)"/>
    <path d="M24 24 Q32 16 40 24 Q32 32 24 24 Z" fill="#80d8ff" opacity="0.6"/>
    <path d="M24 32 Q32 24 40 32 Q32 40 24 32 Z" fill="#80d8ff" opacity="0.6"/>
    <path d="M24 40 Q32 32 40 40 Q32 48 24 40 Z" fill="#80d8ff" opacity="0.6"/>
    <circle cx="32" cy="32" r="4" fill="#80d8ff" filter="url(#glow)"/>
    <path d="M32 16 L32 8" stroke="url(#seaGodGrad)" stroke-width="3" stroke-linecap="round"/>
    <circle cx="32" cy="8" r="3" fill="#80d8ff" filter="url(#glow)"/>''', "theme": "water"}

def 七杀剑():
    return {"svg": f'''{defs()}
      <linearGradient id="killSwordGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#b71c1c"/>
        <stop offset="50%" style="stop-color:#d32f2f"/>
        <stop offset="100%" style="stop-color:#f44336"/>
      </linearGradient>
    </defs>
    <path d="M32 8 L32 52" stroke="url(#killSwordGrad)" stroke-width="6" stroke-linecap="round" filter="url(#metalChrome)"/>
    <path d="M24 20 L40 20" stroke="url(#killSwordGrad)" stroke-width="4" stroke-linecap="round"/>
    <path d="M26 36 L38 36" stroke="url(#killSwordGrad)" stroke-width="4" stroke-linecap="round"/>
    <path d="M20 52 L44 52 L40 56 L28 56 Z" fill="url(#killSwordGrad)" stroke="#b71c1c" stroke-width="1.5" filter="url(#metalChrome)"/>
    <circle cx="32" cy="8" r="3" fill="#ff5252" filter="url(#glow)"/>''', "theme": "metal"}

def 雷灵王():
    return {"svg": f'''{defs()}
      <linearGradient id="thunderKingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a237e"/>
        <stop offset="50%" style="stop-color:#283593"/>
        <stop offset="100%" style="stop-color:#3949ab"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#thunderKingGrad)" stroke="#1a237e" stroke-width="2" filter="url(#metalChrome)"/>
    <path d="M24 20 L28 28 L24 36" stroke="#ffd600" stroke-width="2" fill="none" stroke-linecap="round" filter="url(#lightningEffect)"/>
    <path d="M40 20 L36 28 L40 36" stroke="#ffd600" stroke-width="2" fill="none" stroke-linecap="round" filter="url(#lightningEffect)"/>
    <circle cx="32" cy="28" r="4" fill="#ffd600" filter="url(#glow)"/>
    <path d="M28 40 L26 48 L30 44 L34 50 L38 44 L42 48 L40 40" fill="url(#metalGoldGrad)" stroke="#ff8f00" stroke-width="1" filter="url(#metalGold)"/>''', "theme": "lightning"}

def 星宿命盘():
    return {"svg": f'''{defs()}
      <linearGradient id="starDiskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#311b92"/>
        <stop offset="50%" style="stop-color:#4527a0"/>
        <stop offset="100%" style="stop-color:#5e35b1"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="20" fill="url(#starDiskGrad)" stroke="#311b92" stroke-width="2" filter="url(#metalChrome)"/>
    <circle cx="32" cy="32" r="16" fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.6"/>
    <circle cx="32" cy="32" r="12" fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.6"/>
    <circle cx="32" cy="32" r="8" fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.6"/>
    <circle cx="32" cy="20" r="2" fill="#b388ff" filter="url(#glow)"/>
    <circle cx="44" cy="32" r="2" fill="#b388ff" filter="url(#glow)"/>
    <circle cx="32" cy="44" r="2" fill="#b388ff" filter="url(#glow)"/>
    <circle cx="20" cy="32" r="2" fill="#b388ff" filter="url(#glow)"/>
    <circle cx="32" cy="32" r="4" fill="#b388ff" filter="url(#glow)"/>''', "theme": "star"}

def 幽冥神眼():
    return {"svg": f'''{defs()}
      <linearGradient id="ghostEyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a1a2e"/>
        <stop offset="50%" style="stop-color:#16213e"/>
        <stop offset="100%" style="stop-color:#0f3460"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="20" ry="14" fill="url(#ghostEyeGrad)" stroke="#1a1a2e" stroke-width="2" filter="url(#shadowEffect)"/>
    <ellipse cx="32" cy="32" rx="12" ry="8" fill="#4a00e0" opacity="0.5"/>
    <ellipse cx="32" cy="32" rx="6" ry="4" fill="#e0c3fc"/>
    <ellipse cx="32" cy="32" rx="3" ry="2" fill="#1a1a2e"/>
    <path d="M20 20 Q32 8 44 20" stroke="#4a00e0" stroke-width="1.5" fill="none" opacity="0.6"/>
    <path d="M20 44 Q32 56 44 44" stroke="#4a00e0" stroke-width="1.5" fill="none" opacity="0.6"/>''', "theme": "ghost"}

def 混沌之翼():
    return {"svg": f'''{defs()}
      <linearGradient id="chaosWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4a148c"/>
        <stop offset="50%" style="stop-color:#6a1b9a"/>
        <stop offset="100%" style="stop-color:#8e24aa"/>
      </linearGradient>
    </defs>
    <path d="M32 20 Q20 12 12 20 Q16 28 32 32 Q48 28 52 20 Q44 12 32 20 Z" fill="url(#chaosWingGrad)" stroke="#4a148c" stroke-width="2" filter="url(#chaosEffect)"/>
    <path d="M32 32 Q20 24 12 32 Q16 40 32 44 Q48 40 52 32 Q44 24 32 32 Z" fill="url(#chaosWingGrad)" stroke="#4a148c" stroke-width="2" filter="url(#chaosEffect)" opacity="0.8"/>
    <circle cx="32" cy="28" r="4" fill="#e1bee7" filter="url(#glow)"/>
    <path d="M28 28 L24 24 M36 28 L40 24" stroke="#e1bee7" stroke-width="1" opacity="0.6"/>''', "theme": "shadow"}

def 天罚神雷():
    return {"svg": f'''{defs()}
      <linearGradient id="divineThunderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#01579b"/>
        <stop offset="50%" style="stop-color:#0277bd"/>
        <stop offset="100%" style="stop-color:#0288d1"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="18" fill="url(#divineThunderGrad)" stroke="#01579b" stroke-width="2" filter="url(#metalChrome)"/>
    <path d="M32 14 L28 26 L34 24 L30 36 L38 32 L33 44" stroke="#ffd600" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#lightningEffect)"/>
    <circle cx="32" cy="14" r="3" fill="#ffd600" filter="url(#glow)"/>
    <circle cx="32" cy="44" r="3" fill="#ffd600" filter="url(#glow)"/>''', "theme": "lightning"}

def 永恒冰魂():
    return {"svg": f'''{defs()}
      <linearGradient id="eternalIceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e0f7fa"/>
        <stop offset="50%" style="stop-color:#80deea"/>
        <stop offset="100%" style="stop-color:#26c6da"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="18" fill="url(#eternalIceGrad)" stroke="#00838f" stroke-width="2" filter="url(#iceEffect)"/>
    <path d="M24 24 L40 40 M40 24 L24 40" stroke="#e0f7fa" stroke-width="2" opacity="0.8"/>
    <circle cx="32" cy="32" r="8" fill="none" stroke="#e0f7fa" stroke-width="1.5" opacity="0.6"/>
    <circle cx="26" cy="28" r="2" fill="#80deea" filter="url(#glow)"/>
    <circle cx="38" cy="36" r="2" fill="#80deea" filter="url(#glow)"/>''', "theme": "ice"}

def 炎狱魔神():
    return {"svg": f'''{defs()}
      <linearGradient id="hellFireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#b71c1c"/>
        <stop offset="50%" style="stop-color:#d84315"/>
        <stop offset="100%" style="stop-color:#ff6f00"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#hellFireGrad)" stroke="#b71c1c" stroke-width="2" filter="url(#fireGlow)"/>
    <path d="M24 24 L40 40 M40 24 L24 40" stroke="#ffd600" stroke-width="2" opacity="0.7"/>
    <circle cx="32" cy="32" r="6" fill="#ffd600" filter="url(#glow)" opacity="0.8"/>
    <path d="M20 20 L16 12 L22 18" fill="#ff6f00" stroke="#b71c1c" stroke-width="1"/>
    <path d="M44 20 L48 12 L42 18" fill="#ff6f00" stroke="#b71c1c" stroke-width="1"/>''', "theme": "fire"}

def 天命神弓():
    return {"svg": f'''{defs()}
      <linearGradient id="destinyBowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ffd600"/>
        <stop offset="50%" style="stop-color:#ffab00"/>
        <stop offset="100%" style="stop-color:#ff6f00"/>
      </linearGradient>
    </defs>
    <path d="M20 16 Q32 8 44 16 Q32 24 20 16 Z" fill="none" stroke="url(#destinyBowGrad)" stroke-width="4" filter="url(#metalGold)"/>
    <path d="M20 48 Q32 56 44 48 Q32 40 20 48 Z" fill="none" stroke="url(#destinyBowGrad)" stroke-width="4" filter="url(#metalGold)"/>
    <line x1="20" y1="16" x2="20" y2="48" stroke="url(#destinyBowGrad)" stroke-width="3" filter="url(#metalGold)"/>
    <line x1="44" y1="16" x2="44" y2="48" stroke="url(#destinyBowGrad)" stroke-width="3" filter="url(#metalGold)"/>
    <path d="M32 20 L36 32 L32 44 L28 32 Z" fill="#ffd600" filter="url(#glow)"/>''', "theme": "holy"}

def 混沌剑魂():
    return {"svg": f'''{defs()}
      <linearGradient id="chaosSwordGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4a148c"/>
        <stop offset="50%" style="stop-color:#6a1b9a"/>
        <stop offset="100%" style="stop-color:#8e24aa"/>
      </linearGradient>
    </defs>
    <path d="M32 8 L32 48" stroke="url(#chaosSwordGrad)" stroke-width="6" stroke-linecap="round" filter="url(#metalChrome)"/>
    <path d="M24 20 L40 20" stroke="url(#chaosSwordGrad)" stroke-width="4" stroke-linecap="round"/>
    <path d="M26 36 L38 36" stroke="url(#chaosSwordGrad)" stroke-width="4" stroke-linecap="round"/>
    <path d="M20 48 L44 48 L40 56 L28 56 Z" fill="url(#chaosSwordGrad)" stroke="#4a148c" stroke-width="1.5" filter="url(#metalChrome)"/>
    <path d="M32 8 L28 4 L36 4 Z" fill="url(#chaosSwordGrad)" stroke="#4a148c" stroke-width="1.5" filter="url(#chaosEffect)"/>
    <circle cx="32" cy="28" r="3" fill="#e1bee7" filter="url(#glow)"/>''', "theme": "shadow"}

def 神圣天使():
    return {"svg": f'''{defs()}
      <linearGradient id="holyAngelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fff9c4"/>
        <stop offset="50%" style="stop-color:#fff176"/>
        <stop offset="100%" style="stop-color:#ffd600"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#holyAngelGrad)" stroke="#ffd600" stroke-width="2" filter="url(#holyGlow)"/>
    <path d="M20 20 L16 8 L24 16" fill="url(#holyAngelGrad)" stroke="#ffd600" stroke-width="1.5"/>
    <path d="M44 20 L48 8 L40 16" fill="url(#holyAngelGrad)" stroke="#ffd600" stroke-width="1.5"/>
    <circle cx="26" cy="28" r="3" fill="#fff9c4" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#fff9c4" filter="url(#glow)"/>
    <path d="M28 40 L26 48 L30 44 L34 52 L38 44 L42 48 L40 40" fill="url(#metalGoldGrad)" stroke="#ffd600" stroke-width="1" filter="url(#metalGold)"/>''', "theme": "holy"}

def 柔骨兔王():
    return {"svg": f'''{defs()}
      <linearGradient id="rabbitKingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fce4ec"/>
        <stop offset="50%" style="stop-color:#f8bbd0"/>
        <stop offset="100%" style="stop-color:#f48fb1"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="34" rx="16" ry="14" fill="url(#rabbitKingGrad)" stroke="#f48fb1" stroke-width="2" filter="url(#furTexture)"/>
    <ellipse cx="24" cy="24" rx="8" ry="10" fill="url(#rabbitKingGrad)" stroke="#f48fb1" stroke-width="1.5"/>
    <ellipse cx="40" cy="24" rx="8" ry="10" fill="url(#rabbitKingGrad)" stroke="#f48fb1" stroke-width="1.5"/>
    <circle cx="22" cy="22" r="2" fill="#f48fb1"/>
    <circle cx="38" cy="22" r="2" fill="#f48fb1"/>
    <path d="M28 40 L32 48 L36 40" fill="url(#rabbitKingGrad)" stroke="#f48fb1" stroke-width="1.5"/>
    <path d="M20 18 L12 12 L16 20" fill="#f48fb1" stroke="#f48fb1" stroke-width="1"/>
    <path d="M44 18 L52 12 L48 20" fill="#f48fb1" stroke="#f48fb1" stroke-width="1"/>''', "theme": "beast"}

def 混沌属性():
    return {"svg": f'''{defs()}
      <linearGradient id="chaosAttrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4a148c"/>
        <stop offset="50%" style="stop-color:#6a1b9a"/>
        <stop offset="100%" style="stop-color:#8e24aa"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="20" fill="url(#chaosAttrGrad)" stroke="#4a148c" stroke-width="2" filter="url(#chaosEffect)"/>
    <path d="M20 20 Q32 28 44 20" stroke="#e1bee7" stroke-width="2" fill="none" opacity="0.7"/>
    <path d="M20 44 Q32 36 44 44" stroke="#e1bee7" stroke-width="2" fill="none" opacity="0.7"/>
    <path d="M20 20 Q28 32 20 44" stroke="#e1bee7" stroke-width="2" fill="none" opacity="0.7"/>
    <path d="M44 20 Q36 32 44 44" stroke="#e1bee7" stroke-width="2" fill="none" opacity="0.7"/>
    <circle cx="32" cy="32" r="6" fill="#e1bee7" filter="url(#glow)" opacity="0.8"/>''', "theme": "shadow"}

def 宇宙之源():
    return {"svg": f'''{defs()}
      <linearGradient id="universeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0d0d2b"/>
        <stop offset="50%" style="stop-color:#1a1a3e"/>
        <stop offset="100%" style="stop-color:#2d2d5e"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="20" fill="url(#universeGrad)" stroke="#0d0d2b" stroke-width="2"/>
    <circle cx="32" cy="32" r="16" fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.5"/>
    <circle cx="32" cy="32" r="12" fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.5"/>
    <circle cx="32" cy="32" r="8" fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.5"/>
    <circle cx="20" cy="20" r="2" fill="#b388ff" filter="url(#glow)"/>
    <circle cx="44" cy="20" r="2" fill="#b388ff" filter="url(#glow)"/>
    <circle cx="44" cy="44" r="2" fill="#b388ff" filter="url(#glow)"/>
    <circle cx="20" cy="44" r="2" fill="#b388ff" filter="url(#glow)"/>
    <circle cx="32" cy="32" r="4" fill="#b388ff" filter="url(#glow)"/>''', "theme": "star"}

# ──── 巅峰品质 Peak ────

def 巅峰青龙():
    return {"svg": f'''{defs()}
      <linearGradient id="peakGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#00c853"/>
        <stop offset="50%" style="stop-color:#00e676"/>
        <stop offset="100%" style="stop-color:#69f0ae"/>
      </linearGradient>
    </defs>
    <path d="M16 20 Q20 12 32 10 Q44 12 48 20 Q44 28 32 30 Q20 28 16 20 Z" fill="url(#peakGreenGrad)" stroke="#00c853" stroke-width="2" filter="url(#metalChrome)"/>
    <circle cx="26" cy="20" r="3" fill="#69f0ae" filter="url(#glow)"/>
    <circle cx="38" cy="20" r="3" fill="#69f0ae" filter="url(#glow)"/>
    <path d="M24 30 L20 40 L28 36 L32 44 L36 36 L44 40 L40 30" fill="url(#peakGreenGrad)" stroke="#00c853" stroke-width="1"/>
    <circle cx="32" cy="48" r="4" fill="url(#peakGreenGrad)" stroke="#00c853" stroke-width="1.5" filter="url(#metalGold)"/>''', "theme": "nature"}

def 巅峰白虎():
    return {"svg": f'''{defs()}
      <linearGradient id="peakWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f5f5f5"/>
        <stop offset="50%" style="stop-color:#e0e0e0"/>
        <stop offset="100%" style="stop-color:#ffffff"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#peakWhiteGrad)" stroke="#bdbdbd" stroke-width="2" filter="url(#furTexture)"/>
    <circle cx="26" cy="28" r="3" fill="#212121" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#212121" filter="url(#glow)"/>
    <path d="M20 20 L16 12 L22 18" fill="url(#peakWhiteGrad)" stroke="#bdbdbd" stroke-width="1.5"/>
    <path d="M44 20 L48 12 L42 18" fill="url(#peakWhiteGrad)" stroke="#bdbdbd" stroke-width="1.5"/>
    <path d="M28 40 L26 48 L30 44 L34 52 L38 44 L42 48 L40 40" fill="#e0e0e0" stroke="#bdbdbd" stroke-width="0.8"/>''', "theme": "beast"}

def 巅峰朱雀():
    return {"svg": f'''{defs()}
      <linearGradient id="peakFireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff6f00"/>
        <stop offset="50%" style="stop-color:#ff1744"/>
        <stop offset="100%" style="stop-color:#d50000"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="16" fill="url(#peakFireGrad)" stroke="#d50000" stroke-width="2" filter="url(#fireGlow)"/>
    <circle cx="26" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <path d="M20 20 Q28 8 36 20 Q44 8 52 20" stroke="url(#peakFireGrad)" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M32 44 L32 52 L30 48 L32 56 L34 48 L36 52 L34 44" fill="url(#peakFireGrad)" stroke="#d50000" stroke-width="1"/>''', "theme": "fire"}

def 巅峰玄武():
    return {"svg": f'''{defs()}
      <linearGradient id="peakStoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4a4a4a"/>
        <stop offset="50%" style="stop-color:#616161"/>
        <stop offset="100%" style="stop-color:#9e9e9e"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="36" rx="18" ry="14" fill="url(#peakStoneGrad)" stroke="#4a4a4a" stroke-width="2" filter="url(#stoneTexture)"/>
    <ellipse cx="32" cy="24" rx="14" ry="10" fill="url(#peakStoneGrad)" stroke="#4a4a4a" stroke-width="2" filter="url(#stoneTexture)"/>
    <circle cx="28" cy="22" r="2" fill="#80cbc4" filter="url(#glow)"/>
    <circle cx="36" cy="22" r="2" fill="#80cbc4" filter="url(#glow)"/>
    <path d="M24 36 L20 44 L28 40 L32 48 L36 40 L44 44 L40 36" fill="url(#peakStoneGrad)" stroke="#4a4a4a" stroke-width="1"/>''', "theme": "earth"}

def 巅峰麒麟():
    return {"svg": f'''{defs()}
      <linearGradient id="peakQilinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff6f00"/>
        <stop offset="50%" style="stop-color:#ffab00"/>
        <stop offset="100%" style="stop-color:#ffd600"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#peakQilinGrad)" stroke="#ff6f00" stroke-width="2" filter="url(#metalGold)"/>
    <circle cx="26" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <path d="M20 20 L14 12 L18 18" fill="url(#peakQilinGrad)" stroke="#ff6f00" stroke-width="1.5"/>
    <path d="M44 20 L50 12 L46 18" fill="url(#peakQilinGrad)" stroke="#ff6f00" stroke-width="1.5"/>
    <path d="M28 40 L26 48 L30 44 L34 52 L38 44 L42 48 L40 40" fill="url(#metalGoldGrad)" stroke="#ff6f00" stroke-width="1" filter="url(#metalGold)"/>''', "theme": "fire"}

def 巅峰鲲鹏():
    return {"svg": f'''{defs()}
      <linearGradient id="peakKunpengGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#01579b"/>
        <stop offset="50%" style="stop-color:#0288d1"/>
        <stop offset="100%" style="stop-color:#4fc3f7"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="20" ry="14" fill="url(#peakKunpengGrad)" stroke="#01579b" stroke-width="2" filter="url(#metalChrome)"/>
    <circle cx="26" cy="28" r="3" fill="#80d8ff" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#80d8ff" filter="url(#glow)"/>
    <path d="M16 24 L8 20 L12 28" fill="url(#peakKunpengGrad)" stroke="#01579b" stroke-width="1.5"/>
    <path d="M48 24 L56 20 L52 28" fill="url(#peakKunpengGrad)" stroke="#01579b" stroke-width="1.5"/>
    <path d="M28 40 L26 48 L30 44 L34 52 L38 44 L42 48 L40 40" fill="url(#metalGoldGrad)" stroke="#ff8f00" stroke-width="1" filter="url(#metalGold)"/>''', "theme": "water"}

def 巅峰祖龙():
    return {"svg": f'''{defs()}
      <linearGradient id="peakAncestorDragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ffd700"/>
        <stop offset="50%" style="stop-color:#ffab00"/>
        <stop offset="100%" style="stop-color:#ff6f00"/>
      </linearGradient>
    </defs>
    <path d="M20 20 Q16 28 18 36 Q22 44 32 46 Q42 44 46 36 Q48 28 44 20 Q40 12 32 10 Q24 12 20 20 Z" fill="url(#peakAncestorDragonGrad)" stroke="#ff6f00" stroke-width="2" filter="url(#metalGold)"/>
    <circle cx="26" cy="24" r="3" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="38" cy="24" r="3" fill="#ffff00" filter="url(#glow)"/>
    <path d="M20 16 L14 8 L22 14" fill="url(#peakAncestorDragonGrad)" stroke="#ff6f00" stroke-width="1.5"/>
    <path d="M44 16 L50 8 L42 14" fill="url(#peakAncestorDragonGrad)" stroke="#ff6f00" stroke-width="1.5"/>
    <path d="M28 38 L26 44 L30 40 L34 46 L38 40 L42 44 L40 38" fill="#ffab00" stroke="#ff6f00" stroke-width="0.8"/>''', "theme": "dragon"}

def 巅峰凤凰():
    return {"svg": f'''{defs()}
      <linearGradient id="peakPhoenixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff6f00"/>
        <stop offset="50%" style="stop-color:#ff1744"/>
        <stop offset="100%" style="stop-color:#d50000"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="16" fill="url(#peakPhoenixGrad)" stroke="#d50000" stroke-width="2" filter="url(#fireGlow)"/>
    <circle cx="26" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <path d="M20 20 Q28 8 36 20 Q44 8 52 20" stroke="url(#peakPhoenixGrad)" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M32 44 L32 52 L30 48 L32 56 L34 48 L36 52 L34 44" fill="url(#peakPhoenixGrad)" stroke="#d50000" stroke-width="1"/>''', "theme": "fire"}

def 巅峰雷神():
    return {"svg": f'''{defs()}
      <linearGradient id="peakThunderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a237e"/>
        <stop offset="50%" style="stop-color:#283593"/>
        <stop offset="100%" style="stop-color:#3949ab"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#peakThunderGrad)" stroke="#1a237e" stroke-width="2" filter="url(#metalChrome)"/>
    <path d="M24 20 L28 28 L24 36" stroke="#ffd600" stroke-width="2" fill="none" stroke-linecap="round" filter="url(#lightningEffect)"/>
    <path d="M40 20 L36 28 L40 36" stroke="#ffd600" stroke-width="2" fill="none" stroke-linecap="round" filter="url(#lightningEffect)"/>
    <circle cx="32" cy="28" r="4" fill="#ffd600" filter="url(#glow)"/>
    <path d="M28 40 L26 48 L30 44 L34 50 L38 44 L42 48 L40 40" fill="url(#metalGoldGrad)" stroke="#ff8f00" stroke-width="1" filter="url(#metalGold)"/>''', "theme": "lightning"}

def 巅峰冰神():
    return {"svg": f'''{defs()}
      <linearGradient id="peakIceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e0f7fa"/>
        <stop offset="50%" style="stop-color:#80deea"/>
        <stop offset="100%" style="stop-color:#26c6da"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="16" fill="url(#peakIceGrad)" stroke="#00838f" stroke-width="2" filter="url(#iceEffect)"/>
    <circle cx="26" cy="28" r="3" fill="#80deea" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#80deea" filter="url(#glow)"/>
    <path d="M24 24 L40 40 M40 24 L24 40" stroke="#e0f7fa" stroke-width="2" opacity="0.8"/>
    <path d="M32 44 L32 52 L30 48 L32 56 L34 48 L36 52 L34 44" fill="url(#peakIceGrad)" stroke="#00838f" stroke-width="1"/>''', "theme": "ice"}

def 巅峰火神():
    return {"svg": f'''{defs()}
      <linearGradient id="peakFireGodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff6f00"/>
        <stop offset="50%" style="stop-color:#ff1744"/>
        <stop offset="100%" style="stop-color:#d50000"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="16" fill="url(#peakFireGodGrad)" stroke="#d50000" stroke-width="2" filter="url(#fireGlow)"/>
    <circle cx="26" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <path d="M32 48 L32 56" stroke="url(#peakFireGodGrad)" stroke-width="4" stroke-linecap="round"/>
    <circle cx="32" cy="56" r="4" fill="url(#peakFireGodGrad)" stroke="#d50000" stroke-width="1.5" filter="url(#fireGlow)"/>''', "theme": "fire"}

def 巅峰剑神():
    return {"svg": f'''{defs()}
      <linearGradient id="peakSwordGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#b71c1c"/>
        <stop offset="50%" style="stop-color:#d32f2f"/>
        <stop offset="100%" style="stop-color:#f44336"/>
      </linearGradient>
    </defs>
    <path d="M32 8 L32 52" stroke="url(#peakSwordGrad)" stroke-width="6" stroke-linecap="round" filter="url(#metalChrome)"/>
    <path d="M24 20 L40 20" stroke="url(#peakSwordGrad)" stroke-width="4" stroke-linecap="round"/>
    <path d="M26 36 L38 36" stroke="url(#peakSwordGrad)" stroke-width="4" stroke-linecap="round"/>
    <path d="M20 52 L44 52 L40 56 L28 56 Z" fill="url(#peakSwordGrad)" stroke="#b71c1c" stroke-width="1.5" filter="url(#metalChrome)"/>
    <circle cx="32" cy="8" r="3" fill="#ff5252" filter="url(#glow)"/>''', "theme": "metal"}

def 巅峰邪神():
    return {"svg": f'''{defs()}
      <linearGradient id="peakEvilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4a148c"/>
        <stop offset="50%" style="stop-color:#7b1fa2"/>
        <stop offset="100%" style="stop-color:#9c27b0"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#peakEvilGrad)" stroke="#4a148c" stroke-width="2" filter="url(#shadowEffect)"/>
    <circle cx="26" cy="28" r="3" fill="#ff00ff" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ff00ff" filter="url(#glow)"/>
    <path d="M20 20 L16 12 L24 18" fill="url(#peakEvilGrad)" stroke="#4a148c" stroke-width="1.5"/>
    <path d="M44 20 L48 12 L40 18" fill="url(#peakEvilGrad)" stroke="#4a148c" stroke-width="1.5"/>
    <path d="M28 40 L26 44 L28 42 L32 48 L36 42 L38 44 L36 40" fill="#9c27b0" stroke="#6a1b9a" stroke-width="0.8"/>''', "theme": "shadow"}

def 巅峰光明神():
    return {"svg": f'''{defs()}
      <linearGradient id="peakLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fff9c4"/>
        <stop offset="50%" style="stop-color:#fff176"/>
        <stop offset="100%" style="stop-color:#ffd600"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#peakLightGrad)" stroke="#ffd600" stroke-width="2" filter="url(#holyGlow)"/>
    <circle cx="26" cy="28" r="3" fill="#fff9c4" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#fff9c4" filter="url(#glow)"/>
    <path d="M20 20 L16 12 L24 18" fill="url(#peakLightGrad)" stroke="#ffd600" stroke-width="1.5"/>
    <path d="M44 20 L48 12 L40 18" fill="url(#peakLightGrad)" stroke="#ffd600" stroke-width="1.5"/>
    <path d="M28 40 L26 48 L30 44 L34 52 L38 44 L42 48 L40 40" fill="url(#metalGoldGrad)" stroke="#ffd600" stroke-width="1" filter="url(#metalGold)"/>''', "theme": "holy"}

def 巅峰时间神():
    return {"svg": f'''{defs()}
      <linearGradient id="peakTimeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#311b92"/>
        <stop offset="50%" style="stop-color:#4527a0"/>
        <stop offset="100%" style="stop-color:#5e35b1"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="18" fill="url(#peakTimeGrad)" stroke="#311b92" stroke-width="2" filter="url(#timeWarp)"/>
    <circle cx="32" cy="32" r="12" fill="none" stroke="#b388ff" stroke-width="1.5" opacity="0.7"/>
    <circle cx="32" cy="32" r="6" fill="url(#peakTimeGrad)" stroke="#b388ff" stroke-width="1.5"/>
    <circle cx="32" cy="32" r="2" fill="#b388ff" filter="url(#glow)"/>
    <path d="M32 14 L32 8 M44 32 L50 32 M32 50 L32 56 M20 32 L14 32" stroke="#b388ff" stroke-width="1.5" opacity="0.8"/>''', "theme": "star"}

# ──── 混沌品质 Chaos ────

def 混沌龙神():
    return {"svg": f'''{defs()}
      <linearGradient id="chaosDragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4a148c"/>
        <stop offset="50%" style="stop-color:#6a1b9a"/>
        <stop offset="100%" style="stop-color:#8e24aa"/>
      </linearGradient>
    </defs>
    <path d="M20 20 Q16 28 18 36 Q22 44 32 46 Q42 44 46 36 Q48 28 44 20 Q40 12 32 10 Q24 12 20 20 Z" fill="url(#chaosDragonGrad)" stroke="#4a148c" stroke-width="2" filter="url(#chaosEffect)"/>
    <circle cx="26" cy="24" r="3" fill="#e1bee7" filter="url(#glow)"/>
    <circle cx="38" cy="24" r="3" fill="#e1bee7" filter="url(#glow)"/>
    <path d="M20 16 L14 8 L22 14" fill="url(#chaosDragonGrad)" stroke="#4a148c" stroke-width="1.5"/>
    <path d="M44 16 L50 8 L42 14" fill="url(#chaosDragonGrad)" stroke="#4a148c" stroke-width="1.5"/>
    <path d="M28 38 L26 44 L30 40 L34 46 L38 40 L42 44 L40 38" fill="#8e24aa" stroke="#6a1b9a" stroke-width="0.8"/>''', "theme": "shadow"}

def 混沌魔神():
    return {"svg": f'''{defs()}
      <linearGradient id="chaosDemonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a1a2e"/>
        <stop offset="50%" style="stop-color:#16213e"/>
        <stop offset="100%" style="stop-color:#0f3460"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#chaosDemonGrad)" stroke="#1a1a2e" stroke-width="2" filter="url(#shadowEffect)"/>
    <circle cx="26" cy="28" r="3" fill="#ff00ff" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ff00ff" filter="url(#glow)"/>
    <path d="M20 20 L16 12 L24 18" fill="url(#chaosDemonGrad)" stroke="#1a1a2e" stroke-width="1.5"/>
    <path d="M44 20 L48 12 L40 18" fill="url(#chaosDemonGrad)" stroke="#1a1a2e" stroke-width="1.5"/>
    <path d="M28 40 L26 48 L30 44 L34 52 L38 44 L42 48 L40 40" fill="#9c27b0" stroke="#6a1b9a" stroke-width="0.8"/>''', "theme": "shadow"}

def 混沌剑尊():
    return {"svg": f'''{defs()}
      <linearGradient id="chaosSword尊Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#b71c1c"/>
        <stop offset="50%" style="stop-color:#d32f2f"/>
        <stop offset="100%" style="stop-color:#f44336"/>
      </linearGradient>
    </defs>
    <path d="M32 8 L32 52" stroke="url(#chaosSword尊Grad)" stroke-width="6" stroke-linecap="round" filter="url(#metalChrome)"/>
    <path d="M24 20 L40 20" stroke="url(#chaosSword尊Grad)" stroke-width="4" stroke-linecap="round"/>
    <path d="M26 36 L38 36" stroke="url(#chaosSword尊Grad)" stroke-width="4" stroke-linecap="round"/>
    <path d="M20 52 L44 52 L40 56 L28 56 Z" fill="url(#chaosSword尊Grad)" stroke="#b71c1c" stroke-width="1.5" filter="url(#metalChrome)"/>
    <circle cx="32" cy="8" r="3" fill="#ff5252" filter="url(#glow)"/>''', "theme": "metal"}

def 混沌凤凰():
    return {"svg": f'''{defs()}
      <linearGradient id="chaosPhoenixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff6f00"/>
        <stop offset="50%" style="stop-color:#d50000"/>
        <stop offset="100%" style="stop-color:#b71c1c"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="16" fill="url(#chaosPhoenixGrad)" stroke="#d50000" stroke-width="2" filter="url(#chaosEffect)"/>
    <circle cx="26" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <path d="M32 44 L32 52 L30 48 L32 56 L34 48 L36 52 L34 44" fill="url(#chaosPhoenixGrad)" stroke="#d50000" stroke-width="1"/>''', "theme": "fire"}

def 混沌雷神():
    return {"svg": f'''{defs()}
      <linearGradient id="chaosThunderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a237e"/>
        <stop offset="50%" style="stop-color:#3949ab"/>
        <stop offset="100%" style="stop-color:#5c6bc0"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#chaosThunderGrad)" stroke="#1a237e" stroke-width="2" filter="url(#chaosEffect)"/>
    <circle cx="26" cy="28" r="3" fill="#ffd600" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ffd600" filter="url(#glow)"/>
    <path d="M28 40 L26 48 L30 44 L34 50 L38 44 L42 48 L40 40" fill="url(#metalGoldGrad)" stroke="#ff8f00" stroke-width="1" filter="url(#metalGold)"/>''', "theme": "lightning"}

def 混沌冰神():
    return {"svg": f'''{defs()}
      <linearGradient id="chaosIceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e0f7fa"/>
        <stop offset="50%" style="stop-color:#80deea"/>
        <stop offset="100%" style="stop-color:#4dd0e1"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="16" fill="url(#chaosIceGrad)" stroke="#00838f" stroke-width="2" filter="url(#chaosEffect)"/>
    <circle cx="26" cy="28" r="3" fill="#80deea" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#80deea" filter="url(#glow)"/>
    <path d="M24 24 L40 40 M40 24 L24 40" stroke="#e0f7fa" stroke-width="2" opacity="0.8"/>''', "theme": "ice"}

def 混沌之神():
    return {"svg": f'''{defs()}
      <linearGradient id="chaosGodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4a148c"/>
        <stop offset="50%" style="stop-color:#7b1fa2"/>
        <stop offset="100%" style="stop-color:#ab47bc"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="18" fill="url(#chaosGodGrad)" stroke="#4a148c" stroke-width="2" filter="url(#chaosEffect)"/>
    <circle cx="26" cy="28" r="3" fill="#e1bee7" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#e1bee7" filter="url(#glow)"/>
    <path d="M32 14 L32 50" stroke="url(#chaosGodGrad)" stroke-width="2" stroke-linecap="round"/>
    <circle cx="32" cy="14" r="3" fill="#e1bee7" filter="url(#glow)"/>
    <circle cx="32" cy="50" r="3" fill="#e1bee7" filter="url(#glow)"/>''', "theme": "shadow"}

def 混沌天地():
    return {"svg": f'''{defs()}
      <linearGradient id="chaosWorldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0d0d2b"/>
        <stop offset="50%" style="stop-color:#1a1a3e"/>
        <stop offset="100%" style="stop-color:#2d2d5e"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="20" fill="url(#chaosWorldGrad)" stroke="#0d0d2b" stroke-width="2" filter="url(#chaosEffect)"/>
    <circle cx="32" cy="32" r="16" fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.5"/>
    <circle cx="32" cy="32" r="12" fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.5"/>
    <circle cx="32" cy="32" r="8" fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.5"/>
    <circle cx="32" cy="32" r="4" fill="#7c4dff" filter="url(#glow)"/>''', "theme": "shadow"}

# ──── 神品质 God ────

def 海神():
    return {"svg": f'''{defs()}
      <linearGradient id="seaGod2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#01579b"/>
        <stop offset="50%" style="stop-color:#0288d1"/>
        <stop offset="100%" style="stop-color:#4fc3f7"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="18" fill="url(#seaGod2Grad)" stroke="#01579b" stroke-width="2" filter="url(#metalChrome)"/>
    <path d="M24 24 Q32 16 40 24 Q32 32 24 24 Z" fill="#80d8ff" opacity="0.6"/>
    <path d="M24 32 Q32 24 40 32 Q32 40 24 32 Z" fill="#80d8ff" opacity="0.6"/>
    <circle cx="32" cy="32" r="4" fill="#80d8ff" filter="url(#glow)"/>
    <path d="M32 50 L32 56" stroke="url(#seaGod2Grad)" stroke-width="3" stroke-linecap="round"/>
    <circle cx="32" cy="56" r="3" fill="#80d8ff" filter="url(#glow)"/>''', "theme": "water"}

def 修罗神():
    return {"svg": f'''{defs()}
      <linearGradient id="shuraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#b71c1c"/>
        <stop offset="50%" style="stop-color:#d32f2f"/>
        <stop offset="100%" style="stop-color:#f44336"/>
      </linearGradient>
    </defs>
    <path d="M32 8 L32 52" stroke="url(#shuraGrad)" stroke-width="6" stroke-linecap="round" filter="url(#metalChrome)"/>
    <path d="M24 20 L40 20" stroke="url(#shuraGrad)" stroke-width="4" stroke-linecap="round"/>
    <path d="M26 36 L38 36" stroke="url(#shuraGrad)" stroke-width="4" stroke-linecap="round"/>
    <path d="M20 52 L44 52 L40 56 L28 56 Z" fill="url(#shuraGrad)" stroke="#b71c1c" stroke-width="1.5" filter="url(#metalChrome)"/>
    <circle cx="32" cy="8" r="3" fill="#ff5252" filter="url(#glow)"/>''', "theme": "metal"}

def 天使神():
    return {"svg": f'''{defs()}
      <linearGradient id="angelGodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fff9c4"/>
        <stop offset="50%" style="stop-color:#fff176"/>
        <stop offset="100%" style="stop-color:#ffd600"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#angelGodGrad)" stroke="#ffd600" stroke-width="2" filter="url(#holyGlow)"/>
    <path d="M20 20 L16 8 L24 16" fill="url(#angelGodGrad)" stroke="#ffd600" stroke-width="1.5"/>
    <path d="M44 20 L48 8 L40 16" fill="url(#angelGodGrad)" stroke="#ffd600" stroke-width="1.5"/>
    <circle cx="26" cy="28" r="3" fill="#fff9c4" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#fff9c4" filter="url(#glow)"/>
    <path d="M28 40 L26 48 L30 44 L34 52 L38 44 L42 48 L40 40" fill="url(#metalGoldGrad)" stroke="#ffd600" stroke-width="1" filter="url(#metalGold)"/>''', "theme": "holy"}

def 罗刹神():
    return {"svg": f'''{defs()}
      <linearGradient id="rakshasaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4a148c"/>
        <stop offset="50%" style="stop-color:#7b1fa2"/>
        <stop offset="100%" style="stop-color:#9c27b0"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#rakshasaGrad)" stroke="#4a148c" stroke-width="2" filter="url(#shadowEffect)"/>
    <circle cx="26" cy="28" r="3" fill="#ff00ff" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ff00ff" filter="url(#glow)"/>
    <path d="M20 20 L16 12 L24 18" fill="url(#rakshasaGrad)" stroke="#4a148c" stroke-width="1.5"/>
    <path d="M44 20 L48 12 L40 18" fill="url(#rakshasaGrad)" stroke="#4a148c" stroke-width="1.5"/>
    <path d="M28 40 L26 44 L28 42 L32 48 L36 42 L38 44 L36 40" fill="#9c27b0" stroke="#6a1b9a" stroke-width="0.8"/>''', "theme": "shadow"}

def 食神():
    return {"svg": f'''{defs()}
      <linearGradient id="foodGodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ff6f00"/>
        <stop offset="50%" style="stop-color:#ffab00"/>
        <stop offset="100%" style="stop-color:#ffd600"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#foodGodGrad)" stroke="#ff6f00" stroke-width="2" filter="url(#metalGold)"/>
    <circle cx="26" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <ellipse cx="32" cy="40" rx="10" ry="6" fill="url(#foodGodGrad)" stroke="#ff6f00" stroke-width="1.5"/>
    <circle cx="32" cy="40" r="3" fill="#ffff00" filter="url(#glow)"/>''', "theme": "fire"}

# ──── 三生品质 Triple ────

def 三生武魂_冰火():
    return {"svg": f'''{defs()}
      <linearGradient id="triple1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#01579b"/>
        <stop offset="50%" style="stop-color:#ff6f00"/>
        <stop offset="100%" style="stop-color:#d50000"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="16" fill="url(#triple1Grad)" stroke="#ff6f00" stroke-width="2" filter="url(#metalChrome)"/>
    <circle cx="26" cy="28" r="3" fill="#80d8ff" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ffff00" filter="url(#glow)"/>
    <path d="M32 44 L32 52" stroke="url(#triple1Grad)" stroke-width="3" stroke-linecap="round"/>
    <circle cx="32" cy="52" r="3" fill="#ff5252" filter="url(#glow)"/>''', "theme": "icefire"}

def 三生武魂_光暗():
    return {"svg": f'''{defs()}
      <linearGradient id="triple2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fff9c4"/>
        <stop offset="50%" style="stop-color:#4a148c"/>
        <stop offset="100%" style="stop-color:#9c27b0"/>
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="18" ry="16" fill="url(#triple2Grad)" stroke="#4a148c" stroke-width="2" filter="url(#shadowEffect)"/>
    <circle cx="26" cy="28" r="3" fill="#fff9c4" filter="url(#glow)"/>
    <circle cx="38" cy="28" r="3" fill="#ff00ff" filter="url(#glow)"/>
    <path d="M28 40 L26 48 L30 44 L34 52 L38 44 L42 48 L40 40" fill="url(#metalGoldGrad)" stroke="#ffd600" stroke-width="1" filter="url(#metalGold)"/>''', "theme": "shadow"}

def 三生武魂_时空():
    return {"svg": f'''{defs()}
      <linearGradient id="triple3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#311b92"/>
        <stop offset="50%" style="stop-color:#0d0d2b"/>
        <stop offset="100%" style="stop-color:#b388ff"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="18" fill="url(#triple3Grad)" stroke="#311b92" stroke-width="2" filter="url(#timeWarp)"/>
    <circle cx="32" cy="32" r="12" fill="none" stroke="#b388ff" stroke-width="1.5" opacity="0.7"/>
    <circle cx="32" cy="32" r="6" fill="url(#triple3Grad)" stroke="#b388ff" stroke-width="1.5"/>
    <circle cx="32" cy="32" r="2" fill="#b388ff" filter="url(#glow)"/>''', "theme": "star"}

# ──── 生成主函数 ────

def gen_common():
    icons = {}
    icons["蓝银草"] = 蓝银草()
    icons["镰刀"] = 镰刀()
    icons["香草"] = 香草()
    icons["木棍"] = 木棍()
    icons["含羞草"] = 含羞草()
    icons["铁锤"] = 铁锤()
    icons["渔网"] = 渔网()
    icons["蒲公英"] = 蒲公英()
    icons["芦苇杆"] = 芦苇杆()
    icons["铁锅"] = 铁锅()
    icons["荆棘藤"] = 荆棘藤()
    icons["石头"] = 石头()
    icons["陶笛"] = 陶笛()
    return icons

def gen_rare():
    icons = {}
    icons["白虎"] = 白虎()
    icons["火凤凰"] = 火凤凰()
    icons["冰凤凰"] = 冰凤凰()
    icons["盘龙棍"] = 盘龙棍()
    icons["七宝琉璃塔"] = 七宝琉璃塔()
    icons["幽冥灵猫"] = 幽冥灵猫()
    icons["碧磷蛇皇"] = 碧磷蛇皇()
    icons["金龙爪"] = 金龙爪()
    icons["朱雀圣火"] = 朱雀圣火()
    return icons

def gen_epic():
    """史诗品质图标"""
    icons = {}
    icons["玄武神盾"] = 玄武神盾()
    icons["白鹤翎羽"] = 白鹤翎羽()
    icons["青龙护卫"] = 青龙护卫()
    icons["冰火蛟龙"] = 冰火蛟龙()
    icons["雷电狼王"] = 雷电狼王()
    icons["幽灵蝶"] = 幽灵蝶()
    icons["赤炎狮王"] = 赤炎狮王()
    icons["碧海银鲸"] = 碧海银鲸()
    icons["紫电金鹰"] = 紫电金鹰()
    icons["幽影黑豹"] = 幽影黑豹()
    return icons

def gen_legend():
    """传说品质图标"""
    icons = {}
    icons["碎星陨铁"] = 碎星陨铁()
    icons["蓝电霸王龙"] = 蓝电霸王龙()
    icons["昊天锤"] = 昊天锤()
    icons["六翼天使"] = 六翼天使()
    icons["泰坦巨猿"] = 泰坦巨猿()
    icons["噬魂蛛皇"] = 噬魂蛛皇()
    icons["死亡蛛皇"] = 死亡蛛皇()
    icons["冰碧帝皇蝎"] = 冰碧帝皇蝎()
    icons["烈火剑圣"] = 烈火剑圣()
    icons["星辰神兽"] = 星辰神兽()
    icons["雷霆战神"] = 雷霆战神()
    icons["极寒冰皇"] = 极寒冰皇()
    icons["焰灵骑士"] = 焰灵骑士()
    icons["黄金圣龙"] = 黄金圣龙()
    icons["狂风战鹰"] = 狂风战鹰()
    icons["暗域鬼王"] = 暗域鬼王()
    icons["极焱炎神"] = 极焱炎神()
    icons["时沙巨蟒"] = 时沙巨蟒()
    return icons

def gen_mythic():
    """神话品质图标"""
    icons = {}
    icons["九宝琉璃塔"] = 九宝琉璃塔()
    icons["蓝银皇"] = 蓝银皇()
    icons["堕落天使"] = 堕落天使()
    icons["极品火凤凰"] = 极品火凤凰()
    icons["金龙王"] = 金龙王()
    icons["海神武魂"] = 海神武魂()
    icons["七杀剑"] = 七杀剑()
    icons["雷灵王"] = 雷灵王()
    icons["星宿命盘"] = 星宿命盘()
    icons["幽冥神眼"] = 幽冥神眼()
    icons["混沌之翼"] = 混沌之翼()
    icons["天罚神雷"] = 天罚神雷()
    icons["永恒冰魂"] = 永恒冰魂()
    icons["炎狱魔神"] = 炎狱魔神()
    icons["天命神弓"] = 天命神弓()
    icons["混沌剑魂"] = 混沌剑魂()
    icons["神圣天使"] = 神圣天使()
    icons["柔骨兔王"] = 柔骨兔王()
    icons["混沌属性"] = 混沌属性()
    icons["宇宙之源"] = 宇宙之源()
    return icons

def gen_peak():
    """巅峰品质图标"""
    icons = {}
    icons["巅峰青龙"] = 巅峰青龙()
    icons["巅峰白虎"] = 巅峰白虎()
    icons["巅峰朱雀"] = 巅峰朱雀()
    icons["巅峰玄武"] = 巅峰玄武()
    icons["巅峰麒麟"] = 巅峰麒麟()
    icons["巅峰鲲鹏"] = 巅峰鲲鹏()
    icons["巅峰祖龙"] = 巅峰祖龙()
    icons["巅峰凤凰"] = 巅峰凤凰()
    icons["巅峰雷神"] = 巅峰雷神()
    icons["巅峰冰神"] = 巅峰冰神()
    icons["巅峰火神"] = 巅峰火神()
    icons["巅峰剑神"] = 巅峰剑神()
    icons["巅峰邪神"] = 巅峰邪神()
    icons["巅峰光明神"] = 巅峰光明神()
    icons["巅峰时间神"] = 巅峰时间神()
    return icons

def gen_chaos():
    """混沌品质图标"""
    icons = {}
    icons["混沌龙神"] = 混沌龙神()
    icons["混沌魔神"] = 混沌魔神()
    icons["混沌剑尊"] = 混沌剑尊()
    icons["混沌凤凰"] = 混沌凤凰()
    icons["混沌雷神"] = 混沌雷神()
    icons["混沌冰神"] = 混沌冰神()
    icons["混沌之神"] = 混沌之神()
    icons["混沌天地"] = 混沌天地()
    return icons

def gen_god():
    """神品质图标"""
    icons = {}
    icons["海神"] = 海神()
    icons["修罗神"] = 修罗神()
    icons["天使神"] = 天使神()
    icons["罗刹神"] = 罗刹神()
    icons["食神"] = 食神()
    return icons

def gen_triple():
    """三生品质图标"""
    icons = {}
    icons["三生武魂_冰火"] = 三生武魂_冰火()
    icons["三生武魂_光暗"] = 三生武魂_光暗()
    icons["三生武魂_时空"] = 三生武魂_时空()
    return icons

def main():
    print('''/**
 * 武魂SVG图标系统 - 拟物化金属风格
 * 为101种武魂提供真实质感的矢量图标，支持品质特效
 * 使用SVG滤镜实现金属、石材、木材、火焰等真实材质效果
 */

// ═══════════════════════════════════════════════
// SVG图标基础模板
// ═══════════════════════════════════════════════

function createSVG(innerSVG, viewBox = "0 0 64 64", className = "soul-icon", dataTheme = "") {
  const themeAttr = dataTheme ? ` data-theme="${dataTheme}"` : "";
  return `<svg class="${className}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg"${themeAttr}>${innerSVG}</svg>`;
}

// ═══════════════════════════════════════════════
// 武魂图标数据 - 拟物化金属风格
// ═══════════════════════════════════════════════

export const SOUL_ICONS = {''')

    # 普通品质
    common = gen_common()
    for name, data in common.items():
        svg_escaped = data["svg"].replace("\\", "\\\\").replace("`", "\\`")
        print(f'  "{name}": {{')
        print(f'    svg: `{svg_escaped}`,')
        print(f'    theme: "{data["theme"]}"')
        print(f'  }},')

    # 稀有品质
    rare = gen_rare()
    for name, data in rare.items():
        svg_escaped = data["svg"].replace("\\", "\\\\").replace("`", "\\`")
        print(f'  "{name}": {{')
        print(f'    svg: `{svg_escaped}`,')
        print(f'    theme: "{data["theme"]}"')
        print(f'  }},')

    # 史诗品质
    epic = gen_epic()
    for name, data in epic.items():
        svg_escaped = data["svg"].replace("\\", "\\\\").replace("`", "\\`")
        print(f'  "{name}": {{')
        print(f'    svg: `{svg_escaped}`,')
        print(f'    theme: "{data["theme"]}"')
        print(f'  }},')

    # 传说品质
    legend = gen_legend()
    for name, data in legend.items():
        svg_escaped = data["svg"].replace("\\", "\\\\").replace("`", "\\`")
        print(f'  "{name}": {{')
        print(f'    svg: `{svg_escaped}`,')
        print(f'    theme: "{data["theme"]}"')
        print(f'  }},')

    # 神话品质
    mythic = gen_mythic()
    for name, data in mythic.items():
        svg_escaped = data["svg"].replace("\\", "\\\\").replace("`", "\\`")
        print(f'  "{name}": {{')
        print(f'    svg: `{svg_escaped}`,')
        print(f'    theme: "{data["theme"]}"')
        print(f'  }},')

    # 巅峰品质
    peak = gen_peak()
    for name, data in peak.items():
        svg_escaped = data["svg"].replace("\\", "\\\\").replace("`", "\\`")
        print(f'  "{name}": {{')
        print(f'    svg: `{svg_escaped}`,')
        print(f'    theme: "{data["theme"]}"')
        print(f'  }},')

    # 混沌品质
    chaos = gen_chaos()
    for name, data in chaos.items():
        svg_escaped = data["svg"].replace("\\", "\\\\").replace("`", "\\`")
        print(f'  "{name}": {{')
        print(f'    svg: `{svg_escaped}`,')
        print(f'    theme: "{data["theme"]}"')
        print(f'  }},')

    # 神品质
    god = gen_god()
    for name, data in god.items():
        svg_escaped = data["svg"].replace("\\", "\\\\").replace("`", "\\`")
        print(f'  "{name}": {{')
        print(f'    svg: `{svg_escaped}`,')
        print(f'    theme: "{data["theme"]}"')
        print(f'  }},')

    # 三生品质
    triple = gen_triple()
    for name, data in triple.items():
        svg_escaped = data["svg"].replace("\\", "\\\\").replace("`", "\\`")
        print(f'  "{name}": {{')
        print(f'    svg: `{svg_escaped}`,')
        print(f'    theme: "{data["theme"]}"')
        print(f'  }},')

    print('''
};
''')
    print('''
// ═══════════════════════════════════════════════
// 获取武魂SVG图标
// ═══════════════════════════════════════════════

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
  const { size = 64, animated = true, sizeClass = "" } = options;
  const iconData = SOUL_ICONS[soulName];

  if (!iconData) {
    return createDefaultIcon(soulName, quality, size, "");
  }

  const qualityClass = `quality-${quality}`;
  const animClass = animated ? "soul-icon-animated" : "";
  const szClass = sizeClass || "";
  const theme = iconData.theme || "";

  return createSVG(iconData.svg, "0 0 64 64", `soul-icon ${qualityClass} ${animClass} ${szClass}`.trim(), theme);
}

/**
 * 创建默认图标（当找不到对应图标时使用）
 * @param {string} soulName - 武魂名称
 * @param {string} quality - 品质
 * @param {number} size - 尺寸
 * @param {string} theme - 主题
 * @returns {string} SVG HTML字符串
 */
function createDefaultIcon(soulName, quality = "common", size = 64, theme = "") {
  const colors = {
    common: "#9ca3af",
    rare: "#3b82f6",
    epic: "#a855f7",
    legend: "#f59e0b",
    mythic: "#ef4444",
    peak: "#ec4899",
    chaos: "#8b5cf6",
    god: "#fbbf24",
    triple: "#06b6d4"
  };

  const color = colors[quality] || colors.common;
  const innerSVG = `<circle cx="${size/2}" cy="${size/2}" r="${size/2 - 4}" fill="none" stroke="${color}" stroke-width="3" opacity="0.5"/>`;
  return createSVG(innerSVG, `0 0 ${size} ${size}`, "soul-icon", theme);
}

/**
 * 获取武魂主题
 * @param {string} soulName - 武魂名称
 * @returns {string} 主题名称
 */
export function getSoulTheme(soulName) {
  const iconData = SOUL_ICONS[soulName];
  return iconData ? (iconData.theme || "") : "";
}
''')

if __name__ == "__main__":
    main()

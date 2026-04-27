#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为缺失的武魂图标生成 SVG 占位符
之后可以用 AI API 替换为真实图标
"""

from pathlib import Path

# 输出目录
BASE_DIR = Path("/Users/shunzhiyuanweizhu/Desktop/1/public/souls")

# 需要生成的图标（按品质分类）
MISSING_SOULS = {
    "legend": [  # 传说 (15个)
        "九宝琉璃塔", "蓝银皇", "堕落天使", "极品火凤凰",
        "金龙王", "海神武魂", "七杀剑", "雷灵王",
        "星宿命盘", "幽冥神眼", "混沌之翼", "天罚神雷",
        "永恒冰魂", "炎狱魔神", "天命神弓", "混沌剑魂",
    ],
    "apex": [  # 巅峰/神话 (8个)
        "神圣天使", "柔骨兔王", "混沌属性", "宇宙之源",
        "时空裂缝", "虚无之主", "因果律者", "神格化身",
    ],
    "hc": [  # 混沌/隐藏 (8个)
        "如意环", "幽冥之眼", "九心海棠", "奇茸通天菊",
        "无形剑意", "千机算盘", "月影神狐", "幽莲血心",
    ],
    "ha": [  # 幻境/绝世 (6个)
        "昊天九绝锤", "饕餮神牛", "死神镰刀", "虚空裂爪",
        "天魔琴", "混沌神炉",
    ],
    "twin": [  # 双生 (9个)
        "蓝银草+昊天锤", "圣天使+堕天使", "金龙+银龙",
        "冰火双凤", "雷剑双生", "星辰+混沌",
        "幽冥+圣光", "时间+空间", "神火+神冰",
    ],
    "triple": [  # 三生 (4个)
        "冰火雷三生龙", "昊天极光混沌三生",
        "神圣幽冥混沌三生", "时空因果三生",
    ],
}

# 品质对应的颜色和样式
QUALITY_COLORS = {
    "legend": {"bg": "#2d1b4e", "fg": "#f59e0b", "glow": "#fbbf24"},
    "apex": {"bg": "#1a1a2e", "fg": "#ec4899", "glow": "#f472b6"},
    "hc": {"bg": "#1a1a1a", "fg": "#8b5cf6", "glow": "#a78bfa"},
    "ha": {"bg": "#2d1b1b", "fg": "#ef4444", "glow": "#f87171"},
    "twin": {"bg": "#1a2d1b", "fg": "#06b6d4", "glow": "#22d3ee"},
    "triple": {"bg": "#2d2d1b", "fg": "#fbbf24", "glow": "#fde68a"},
}

def create_svg_placeholder(name, quality, colors):
    """创建 SVG 占位图标"""
    # 取名称的第一个字符作为图标内容
    char = name[0]

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="bg-{quality}-{char}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:{colors['bg'];stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
    </radialGradient>
    <filter id="glow-{quality}-{char}">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- 背景 -->
  <rect width="64" height="64" rx="8" fill="url(#bg-{quality}-{char})" />

  <!-- 边框 -->
  <rect x="2" y="2" width="60" height="60" rx="6" fill="none"
        stroke="{colors['glow']}" stroke-width="2" opacity="0.6" />

  <!-- 主文字 -->
  <text x="32" y="38" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, sans-serif" font-size="24" font-weight="bold"
        fill="{colors['fg']}" filter="url(#glow-{quality}-{char})">
    {char}
  </text>

  <!-- 品质标记 -->
  <circle cx="56" cy="8" r="4" fill="{colors['glow']}" opacity="0.8" />
</svg>'''

    return svg


def main():
    print("=" * 60)
    print("生成缺失的武魂图标占位符 (SVG)")
    print("=" * 60)
    print()

    total = sum(len(v) for v in MISSING_SOULS.values())
    done = 0

    for quality, souls in MISSING_SOULS.items():
        # 创建目录
        out_dir = BASE_DIR / quality
        out_dir.mkdir(parents=True, exist_ok=True)

        colors = QUALITY_COLORS.get(quality, QUALITY_COLORS["legend"])

        print(f"\n处理 {quality} 品质 ({len(souls)} 个图标)...")

        for soul_name in souls:
            done += 1

            # 生成 SVG
            svg_content = create_svg_placeholder(soul_name, quality, colors)

            # 保存为 SVG
            svg_path = out_dir / f"{soul_name}.svg"
            svg_path.write_text(svg_content, encoding='utf-8')

            # 同时保存一个标记文件，表示需要 AI 生成
            placeholder_path = out_dir / f"{soul_name}.placeholder"
            placeholder_path.write_text(
                f" Needs AI generation for: {soul_name}\n"
                f"Quality: {quality}\n"
                f"Colors: {colors}\n",
                encoding='utf-8'
            )

            print(f"  [{done}/{total}] ✓ {soul_name}")

    print()
    print("=" * 60)
    print(f"✅ 完成！共生成 {done} 个占位图标")
    print(f"   位置: {BASE_DIR}")
    print()
    print("⚠️  注意：这些是 SVG 占位符")
    print("   需要 AI 生成真实图标后替换")
    print("=" * 60)


if __name__ == "__main__":
    main()

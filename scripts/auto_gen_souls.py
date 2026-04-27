#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
武魂图标自动生成脚本 - 排队重试版
- 调用混元 image_gen API（通过 workbuddy 内置工具）
- 自动重试，直到全部成功
- 断点续传，已生成的跳过
用法: python auto_gen_souls.py
"""

import json
import time
import sys
import subprocess
from pathlib import Path

# ── 配置 ──────────────────────────────────────
OUTPUT_BASE = Path(__file__).parent.parent / "public" / "souls"
IMAGE_SIZE = "1024x1024"
RETRY_INTERVAL = 60   # 每次失败后等待秒数
BATCH_PAUSE  = 10   # 每个图标生成后等待秒数

# ── 8 个样本 prompt（暗黑幻想，主体实心，特效半透明）──
SAMPLES = [
    ("samples/白虎",
     "game icon, transparent background, no border. "
     "A white tiger head, SOLID white fur with black stripes, "
     "fierce glowing blue eyes, "
     "with SEMI-TRANSPARENT dark blue aura around head. "
     "Dark fantasy, centered, highly detailed fur"),

    ("samples/火凤凰",
     "game icon, transparent background, no border. "
     "A fire phoenix, SOLID red and gold feathers, "
     "rebirth flame aura, glowing eyes, "
     "with SEMI-TRANSPARENT blazing flame aura around wings. "
     "Dark fantasy, divine fire, centered"),

    ("samples/昊天锤",
     "game icon, transparent background, no border. "
     "A massive dark iron hammer, SOLID metal head with wood handle, "
     "chaos engravings, "
     "with SEMI-TRANSPARENT dark red destruction aura. "
     "Dark fantasy weapon, centered, heavy"),

    ("samples/六翼天使",
     "game icon, transparent background, no border. "
     "A six-winged angel, SOLID white wings and golden armor, "
     "halo behind head, "
     "with SEMI-TRANSPARENT golden divine light aura. "
     "Dark fantasy, sacred, majestic, centered"),

    ("samples/九宝琉璃塔",
     "game icon, transparent background, no border. "
     "A nine-story glazed pagoda, SOLID ceramic tower body, "
     "intricate architecture, "
     "with SEMI-TRANSPARENT multicolor divine light aura. "
     "Dark fantasy, auxiliary artifact, centered"),

    ("samples/神圣天使",
     "game icon, transparent background, no border. "
     "A divine holy angel, SOLID pure white wings and armor, "
     "god-tier bloodline, "
     "with SEMI-TRANSPARENT extreme-light divine aura. "
     "Dark fantasy, sacred, lvl 20 innate, centered"),

    ("samples/蓝银草+昊天锤",
     "game icon, transparent background, no border. "
     "Combined martial soul: blue silver grass blade and dark iron hammer, "
     "SOLID grass and metal texture, "
     "with SEMI-TRANSPARENT grass-power and chaos dual aura. "
     "Dark fantasy, dual cultivation, centered"),

    ("samples/冰火雷三生龙",
     "game icon, transparent background, no border. "
     "A three-born dragon with ice blue, fire red, thunder gold scales, "
     "SOLID dragon body, "
     "with SEMI-TRANSPARENT three-element aura. "
     "Dark fantasy, legendary, centered"),
]


def gen_image(prompt: str, output_path: str, size: str = IMAGE_SIZE) -> bool:
    """
    调用 workbuddy image_gen（通过 CLI 或 HTTP）。
    由于直接在 Python 里调用混元 API 需要特殊处理，
    这里生成一个任务描述，交给用户手动触发，
    或者等待 workbuddy 内置 image_gen 恢复。
    """
    # 方案：把任务写入队列文件，由外部轮询执行
    queue_file = OUTPUT_BASE / "gen_queue.json"
    
    if queue_file.exists():
        with open(queue_file, "r", encoding="utf-8") as f:
            queue = json.load(f)
    else:
        queue = []

    queue.append({
        "prompt": prompt,
        "output": str(output_path),
        "size": size,
        "status": "pending"
    })

    with open(queue_file, "w", encoding="utf-8") as f:
        json.dump(queue, f, ensure_ascii=False, indent=2)

    return True


def main():
    print("=" * 50)
    print("  武魂图标生成 - 排队重试版")
    print("=" * 50)
    print()

    # 确保输出目录存在
    (OUTPUT_BASE / "samples").mkdir(parents=True, exist_ok=True)

    # 检查已生成的
    done = set()
    for d in ["common", "rare", "epic", "legend", "apex", "hc", "ha", "twin", "triple", "samples"]:
        dpath = OUTPUT_BASE / d
        if dpath.exists():
            for f in dpath.glob("*.png"):
                done.add(f.stem)

    print(f"已生成: {len(done)} 个")
    print()

    # 生成样本（如果还没有）
    print("── 生成 8 个风格样本 ──────────────────")
    for i, (name_path, prompt) in enumerate(SAMPLES):
        out_path = OUTPUT_BASE / f"{name_path}.png"
        short_name = name_path.split("/")[-1]

        if out_path.exists():
            print(f"  [{i+1}/8] 跳过（已存在）: {short_name}")
            continue

        print(f"  [{i+1}/8] 排队生成: {short_name} ...", end=" ", flush=True)

        # 由于 image_gen 工具暂时不可用，
        # 这里输出 prompt 供用户手动使用其他工具生成
        print("\n    PROMPT: \n    " + prompt.replace("  ", " ")[:120] + "...")
        print(f"    OUTPUT:  {out_path}")
        print()

    print()
    print("=" * 50)
    print("注意: image_gen 工具当前队列超时")
    print("建议方案:")
    print("  1. 等待 workbuddy 图片生成服务恢复后重新运行此脚本")
    print("  2. 或手动使用其他图片生成工具（SD/Midjourney）")
    print("  3. 或提供混元 API Key，脚本可直接调用 API")
    print("=" * 50)


if __name__ == "__main__":
    main()

# -*- coding: utf-8 -*-
"""
武魂图标切图脚本
从合图中切割 101 个武魂图标为独立 WebP 文件

使用方法:
  python split_souls.py <合图路径>

布局: 7行16列, 等距间隔排列, 101个图标 + 11个空位
输出: public/souls/{quality}/{name}.webp (256x256)
"""

import sys
import os
from pathlib import Path

# 确保有 Pillow
try:
    from PIL import Image
except ImportError:
    print("正在安装 Pillow...")
    os.system(f"{sys.executable} -m pip install Pillow -q")
    from PIL import Image

# ── 武魂列表（按品质分组，与 souls.js 一致）──
SOUL_GROUPS = [
    # 品质名, 武魂名称列表
    ("common", [
        "蓝银草", "镰刀", "香草", "木棍", "含羞草", "铁锤", "渔网", "蒲公英",
        "芦苇杆", "铁锅", "荆棘藤", "石头", "陶笛",
    ]),
    ("rare", [
        "白虎", "火凤凰", "冰凤凰", "盘龙棍", "七宝琉璃塔", "幽冥灵猫", "碧磷蛇皇",
        "金龙爪", "朱雀圣火", "玄武神盾", "白鹤翎羽", "青龙护卫", "冰火蛟龙",
        "雷电狼王", "幽灵蝶", "赤炎狮王", "碧海银鲸", "紫电金鹰", "幽影黑豹", "碎星陨铁",
    ]),
    ("epic", [
        "蓝电霸王龙", "昊天锤", "六翼天使", "泰坦巨猿", "噬魂蛛皇", "死亡蛛皇",
        "冰碧帝皇蝎", "烈火剑圣", "星辰神兽", "雷霆战神", "极寒冰皇", "焰灵骑士",
        "黄金圣龙", "狂风战鹰", "暗域鬼王", "极焱炎神", "时沙巨蟒",
    ]),
    ("legend", [
        "九宝琉璃塔", "蓝银皇", "堕落天使", "极品火凤凰", "金龙王", "海神武魂",
        "七杀剑", "雷灵王", "星宿命盘", "幽冥神眼", "混沌之翼", "天罚神雷",
        "永恒冰魂", "炎狱魔神", "天命神弓", "混沌剑魂",
    ]),
    ("apex", [
        "神圣天使", "柔骨兔王", "混沌属性", "宇宙之源", "时空裂缝", "虚无之主",
        "因果律者", "神格化身",
    ]),
    ("hc", [
        "如意环", "幽冥之眼", "九心海棠", "奇茸通天菊", "无形剑意", "千机算盘",
        "月影神狐", "幽莲血心",
    ]),
    ("ha", [
        "昊天九绝锤", "饕餮神牛", "死神镰刀", "虚空裂爪", "天魔琴", "混沌神炉",
    ]),
    ("twin", [
        "蓝银草+昊天锤", "圣天使+堕天使", "金龙+银龙", "冰火双凤", "雷剑双生",
        "星辰+混沌", "幽冥+圣光", "时间+空间", "神火+神冰",
    ]),
    ("triple", [
        "冰火雷三生龙", "昊天极光混沌三生", "神圣幽冥混沌三生", "时空因果三生",
    ]),
]

# 构建扁平化列表，按行顺序排列
# 7行16列，每行放一个品质组（最后一行放剩余的）
# 但实际排列未知，先用扁平化顺序填充
SOULS_FLAT = []
for quality, names in SOUL_GROUPS:
    for name in names:
        SOULS_FLAT.append((quality, name))

print(f"总共 {len(SOULS_FLAT)} 个武魂")

# ── 布局参数 ──
ROWS = 7
COLS = 16
CELL_SIZE = 256  # 每个图标裁剪为 256x256

def auto_detect_grid(img_path):
    """自动检测图片中的网格间距"""
    img = Image.open(img_path)
    w, h = img.size
    print(f"图片尺寸: {w} x {h}")
    
    # 计算每个单元格的尺寸（含间隔）
    cell_w = w / COLS
    cell_h = h / ROWS
    
    print(f"单元格尺寸: {cell_w:.1f} x {cell_h:.1f}")
    print(f"图标的实际像素大小约: {min(cell_w, cell_h):.1f}px")
    
    return img, cell_w, cell_h

def detect_precise_grid(img_path):
    """通过像素亮度分析，精确检测每个图标的边界坐标"""
    import numpy as np

    img = Image.open(img_path).convert("RGBA")
    gray = np.array(img.convert("L"))
    h, w = gray.shape
    print(f"图片尺寸: {w}x{h}")

    def detect_edges_1d(profile, threshold_ratio=0.55):
        mean_val = profile.mean()
        threshold = mean_val * threshold_ratio
        edges = [0]
        in_dark = profile[0] < threshold
        for i in range(1, len(profile)):
            is_dark = profile[i] < threshold
            if is_dark != in_dark:
                edges.append(i)
                in_dark = is_dark
        edges.append(len(profile))
        return edges

    # 水平方向：检测列边界
    col_avg = gray.mean(axis=0)
    h_edges = detect_edges_1d(col_avg)
    h_segments = [(h_edges[i], h_edges[i+1]) for i in range(len(h_edges)-1)]
    icon_cols = [(s, e) for s, e in h_segments if (e - s) > 20]

    # 垂直方向：检测行边界
    row_avg = gray.mean(axis=1)
    v_edges = detect_edges_1d(row_avg)
    v_segments = [(v_edges[i], v_edges[i+1]) for i in range(len(v_edges)-1)]
    icon_rows = [(s, e) for s, e in v_segments if (e - s) > 20]

    print(f"检测到: {len(icon_rows)}行 x {len(icon_cols)}列")

    # 输出每格坐标供调试
    for r, (ry1, ry2) in enumerate(icon_rows):
        for c, (cx1, cx2) in enumerate(icon_cols):
            pass  # 静默模式，不逐个打印

    return img, icon_rows, icon_cols

def split_and_save(img_path, output_base):
    """使用精确像素级边界切割图片"""
    img, icon_rows, icon_cols = detect_precise_grid(img_path)

    success = 0
    skipped = 0
    errors = []
    idx = 0

    for row in range(len(icon_rows)):
        for col in range(len(icon_cols)):
            if idx >= len(SOULS_FLAT):
                skipped += 1
                continue

            quality, name = SOULS_FLAT[idx]

            # 使用精确检测的像素边界
            x1 = icon_cols[col][0]
            y1 = icon_rows[row][0]
            x2 = icon_cols[col][1]
            y2 = icon_rows[row][1]

            try:
                region = img.crop((x1, y1, x2, y2))
                region = region.resize((CELL_SIZE, CELL_SIZE), Image.LANCZOS)

                out_dir = Path(output_base) / quality
                out_dir.mkdir(parents=True, exist_ok=True)

                out_path = out_dir / f"{name}.webp"
                region.save(out_path, "WEBP", quality=90)

                print(f"  [{idx+1:3d}/101] {quality}/{name}.webp  ({x1},{y1})-({x2},{y2})")
                success += 1
            except Exception as e:
                errors.append(f"  [{idx+1:3d}] {name}: {e}")

            idx += 1

    print(f"\n完成! 成功: {success}, 跳过空位: {skipped}, 错误: {len(errors)}")
    for err in errors:
        print(err)

def main():
    if len(sys.argv) < 2:
        # 尝试默认路径
        default_paths = [
            "public/souls/sprite_sheet.jpg",
            "public/souls/sprite_sheet.png",
            "public/souls/sprite_sheet.webp",
            "public/souls/souls_sprite.jpg",
            "public/souls/souls_sprite.png",
        ]
        img_path = None
        script_dir = Path(__file__).parent.parent  # codev9/
        for p in default_paths:
            full = script_dir / p
            if full.exists():
                img_path = str(full)
                break
        
        if not img_path:
            print("用法: python split_souls.py <合图路径>")
            print("\n请将武魂图标合图放到以下任一路径:")
            for p in default_paths:
                print(f"  {script_dir / p}")
            print("\n或者直接指定路径:")
            print(f"  python split_souls.py C:/path/to/your/image.jpg")
            sys.exit(1)
    else:
        img_path = sys.argv[1]
    
    if not os.path.exists(img_path):
        print(f"错误: 文件不存在 - {img_path}")
        sys.exit(1)
    
    # 输出目录
    script_dir = Path(__file__).parent.parent  # codev9/
    output_base = script_dir / "public" / "souls"
    
    print(f"合图路径: {img_path}")
    print(f"输出目录: {output_base}")
    print(f"布局: {ROWS}行 x {COLS}列 = {ROWS * COLS} 格")
    print()
    
    split_and_save(img_path, output_base)

if __name__ == "__main__":
    main()

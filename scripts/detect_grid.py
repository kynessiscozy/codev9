# -*- coding: utf-8 -*-
"""精确检测合图中每个图标的边界位置"""

from PIL import Image
import numpy as np
import json

IMG_PATH = r"C:\Users\hukeze\WorkBuddy\20260427084137\codev9\public\souls\sprite_sheet.jpg.png"

img = Image.open(IMG_PATH).convert("RGBA")
arr = np.array(img)
h, w = arr.shape[:2]
print(f"图片尺寸: {w}x{h}")

gray = np.array(img.convert("L"))

ROWS = 7
COLS = 16
cell_w = w / COLS
cell_h = h / ROWS
print(f"理论网格: {cell_w:.1f}x{cell_h:.1f} px/格")

def detect_edges_1d(profile, threshold_ratio=0.5):
    """在1D亮度剖面中检测跳变边界"""
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

# 分析水平方向（列）
print("\n=== 水平间隔检测 ===")
col_avg = gray.mean(axis=0)  # 每列的全图平均亮度
h_edges = detect_edges_1d(col_avg, threshold_ratio=0.55)
print(f"检测到 {len(h_edges)-1} 段: {h_edges}")

# 找到图标区域的起止列
# 间隔通常较窄（几个像素），图标区域较宽
segments = []
for i in range(len(h_edges) - 1):
    start = h_edges[i]
    end = h_edges[i + 1]
    width = end - start
    segments.append((start, end, width))

print("\n所有水平分段:")
for i, (s, e, w) in enumerate(segments):
    label = "图标" if w > 20 else "间隔"
    print(f"  段{i:2d}: x={s:4d}-{e:4d} 宽={w:4d}px  [{label}]")

# 提取图标列的起始位置
icon_cols = [(s, e) for s, e, w in segments if w > 20]
print(f"\n图标列数: {len(icon_cols)}")
for i, (s, e) in enumerate(icon_cols):
    print(f"  列{i}: x={s} ~ x={e}, 宽={e-s}px")

# 分析垂直方向（行）
print("\n=== 垂直间隔检测 ===")
row_avg = gray.mean(axis=1)  # 每行的全图平均亮度
v_edges = detect_edges_1d(row_avg, threshold_ratio=0.55)
print(f"检测到 {len(v_edges)-1} 段")

v_segments = []
for i in range(len(v_edges) - 1):
    start = v_edges[i]
    end = v_edges[i + 1]
    height = end - start
    v_segments.append((start, end, height))

print("\n所有垂直分段:")
for i, (s, e, h) in enumerate(v_segments):
    label = "图标" if h > 20 else "间隔"
    print(f"  段{i:2d}: y={s:4d}-{e:4d} 高={h:4d}px  [{label}]")

icon_rows = [(s, e) for s, e, h in v_segments if h > 20]
print(f"\n图标行数: {len(icon_rows)}")
for i, (s, e) in enumerate(icon_rows):
    print(f"  行{i}: y={s} ~ y={e}, 高={e-s}px")

# 输出精确裁剪坐标
print("\n=== 精确裁剪坐标 ===")
print(f"总图标数: {len(icon_rows)} 行 x {len(icon_cols)} 列 = {len(icon_rows)*len(icon_cols)}")
print("\n坐标表 (左上角 x, y, 右下角 x, y):")
for r, (ry1, ry2) in enumerate(icon_rows):
    for c, (cx1, cx2) in enumerate(icon_cols):
        print(f"  [{r},{c}] ({cx1},{ry1})-({cx2},{ry2})  宽={cx2-cx1} 高={ry2-ry1}")

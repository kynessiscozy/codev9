#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
武魂图标处理管线：将 AI 生成的图片转换为适合游戏的图标。

功能：
  1. 去底：智能检测背景色（白/绿/纯色），转为透明
  2. 边缘羽化：对主体边缘做平滑透明过渡，消除白边/绿边
  3. 自动裁剪 + 留白：检测主体边界，居中并保留 15% 留白
  4. 水印检测与裁剪：自动移除右下角 AI 水印区域
  5. 输出 WebP（透明背景）

使用方式：
  # 处理单个文件
  python3 scripts/process_soul_icon.py input.png -o output.webp

  # 批量处理目录
  python3 scripts/process_soul_icon.py public/souls/god/ --batch

  # 全量处理所有武魂图标
  python3 scripts/process_soul_icon.py public/souls/ --batch --recursive
"""

import argparse
import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("❌ 需要 Pillow 库。请运行: pip3 install Pillow")
    sys.exit(1)

# ─── 配置 ─────────────────────────────────────────────────
PADDING_RATIO = 0.15          # 主体四周留白比例
ALPHA_FEATHER = 3             # 边缘羽化像素数
WATERMARK_MARGIN = 20         # 水印检测边距（像素）
WATERMARK_HEIGHT_RATIO = 0.08 # 水印区域占图高比例
BG_TOLERANCE = 40             # 背景色容差 (0-255)
WEBP_QUALITY = 90             # WebP 质量 (0-100)
SUPPORTED_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.webp', '.bmp'}


def detect_background_color(img, sample_corners=True):
    """
    通过采样四角 + 边缘像素，智能检测背景主色。
    返回 (r, g, b) 或 None（无法确定时）。
    """
    w, h = img.size
    pixels = []
    margin = 3  # 从边沿取像素

    if sample_corners:
        # 四个角区域
        corners = [
            (0, 0, margin, margin),           # 左上
            (w - margin, 0, w, margin),       # 右上
            (0, h - margin, margin, h),       # 左下
            (w - margin, h - margin, w, h),   # 右下
        ]
    else:
        # 仅取上边和左边（用于已裁剪的图片）
        corners = [
            (0, 0, w, margin),                # 上边
            (0, 0, margin, h),                # 左边
        ]

    # 同时采样四边中间点
    edges = [
        (w // 3, 0, w // 3 + 1, margin),
        (w * 2 // 3, 0, w * 2 // 3 + 1, margin),
        (0, h // 3, margin, h // 3 + 1),
        (0, h * 2 // 3, margin, h * 2 // 3 + 1),
    ]

    for x1, y1, x2, y2 in corners + edges:
        for px in range(x1, min(x2, w)):
            for py in range(y1, min(y2, h)):
                try:
                    p = img.getpixel((px, py))
                    if len(p) >= 3:
                        pixels.append(p[:3])
                except (IndexError, ValueError):
                    pass

    if not pixels:
        return None

    # 统计 RGB 均值
    r = int(sum(p[0] for p in pixels) / len(pixels))
    g = int(sum(p[1] for p in pixels) / len(pixels))
    b = int(sum(p[2] for p in pixels) / len(pixels))

    return (r, g, b)


def is_background(pixel, bg_color, tolerance=BG_TOLERANCE):
    """判断像素是否属于背景色范围"""
    if bg_color is None:
        return False
    return (
        abs(pixel[0] - bg_color[0]) <= tolerance and
        abs(pixel[1] - bg_color[1]) <= tolerance and
        abs(pixel[2] - bg_color[2]) <= tolerance
    )


def remove_background(img, bg_color=None, feather=ALPHA_FEATHER):
    """
    智能去底。
    - 自动检测背景色（若未指定）
    - 基于色差 + 边缘羽化，实现平滑透明
    - 保留主体边缘的半透明过渡
    """
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # 自动检测背景色
    if bg_color is None:
        bg_color = detect_background_color(img)
        if bg_color is not None:
            print(f"  📐 检测到背景色: RGB({bg_color[0]},{bg_color[1]},{bg_color[2]})")

    if bg_color is None:
        print("  ⚠️  无法检测背景色，跳过去底")
        return img

    w, h = img.size
    pixels = img.load()
    result = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    result_pixels = result.load()

    for py in range(h):
        for px in range(w):
            r, g, b, a = pixels[px, py]
            if a == 0:
                continue  # 已是透明

            color_dist = (
                abs(r - bg_color[0]) +
                abs(g - bg_color[1]) +
                abs(b - bg_color[2])
            )

            if color_dist <= BG_TOLERANCE:
                # 背景像素：设置透明
                result_pixels[px, py] = (r, g, b, 0)
            elif color_dist <= BG_TOLERANCE + feather * 8:
                # 边缘区域：渐变透明
                alpha_factor = (color_dist - BG_TOLERANCE) / (feather * 8)
                alpha_factor = max(0, min(1, alpha_factor))
                new_alpha = int(a * alpha_factor)
                result_pixels[px, py] = (r, g, b, new_alpha)
            else:
                # 主体像素：保留
                result_pixels[px, py] = (r, g, b, a)

    return result


def auto_crop_with_padding(img, padding_ratio=PADDING_RATIO):
    """
    自动裁剪到主体区域，并保留四周留白。
    返回裁剪+缩放后的图片（正方形）。
    """
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    w, h = img.size
    pixels = img.load()

    # 找到非透明像素的边界
    min_x, min_y = w, h
    max_x, max_y = 0, 0
    has_content = False

    for py in range(h):
        for px in range(w):
            _, _, _, a = pixels[px, py]
            if a > 30:  # 非完全透明视为有内容
                min_x = min(min_x, px)
                min_y = min(min_y, py)
                max_x = max(max_x, px)
                max_y = max(max_y, py)
                has_content = True

    if not has_content:
        print("  ⚠️  图片无可见内容，跳过裁剪")
        return img

    content_w = max_x - min_x + 1
    content_h = max_y - min_y + 1

    # 计算留白
    pad = int(max(content_w, content_h) * padding_ratio)
    pad = max(pad, 8)  # 至少 8px 留白

    # 新画布（正方形）
    new_size = max(content_w, content_h) + pad * 2

    cropped = img.crop((min_x, min_y, max_x + 1, max_y + 1))

    result = Image.new('RGBA', (new_size, new_size), (0, 0, 0, 0))

    # 居中放置
    offset_x = (new_size - content_w) // 2
    offset_y = (new_size - content_h) // 2
    result.paste(cropped, (offset_x, offset_y), cropped)

    return result


def detect_and_crop_watermark(img):
    """
    检测并裁剪 AI 水印。
    策略：检查图片底部区域是否有水印文字/Logo。
    返回裁剪后的图片（如果检测到水印则裁剪掉底部水印区）。
    """
    w, h = img.size
    if h < 100 or w < 100:
        return img  # 图片太小，跳过

    watermark_h = int(h * WATERMARK_HEIGHT_RATIO)
    watermark_h = max(watermark_h, WATERMARK_MARGIN)

    # 检查底部区域是否有非透明像素且与主体分离
    bottom_region = img.crop((0, h - watermark_h, w, h))
    if img.mode != 'RGBA':
        bottom_region = bottom_region.convert('RGBA')

    bottom_pixels = bottom_region.load()
    bw, bh = bottom_region.size
    non_transparent = 0
    total = bw * bh

    for py in range(bh):
        for px in range(bw):
            _, _, _, a = bottom_pixels[px, py]
            if a > 50:
                non_transparent += 1

    # 如果底部有大量不透明像素但面积不大（水印特征）
    watermark_ratio = non_transparent / total if total > 0 else 0
    if 0.01 < watermark_ratio < 0.30:
        # 检查是否在底部连续有内容（从下到上扫描）
        content_rows = 0
        for py in range(bh - 1, -1, -1):
            row_has = any(
                bottom_pixels[px, py][3] > 50
                for px in range(bw)
            )
            if row_has:
                content_rows += 1
            else:
                break

        if 3 < content_rows < watermark_h * 0.7:
            print(f"  💧 检测到可能的水印区域 ({watermark_h}px)，已裁剪")
            return img.crop((0, 0, w, h - watermark_h - 2))

    return img


def process_image(input_path, output_path=None, auto_output=True):
    """
    处理单张图片：去底 → 自动裁剪留白 → 去水印 → 输出 WebP。
    """
    input_path = Path(input_path)

    if not input_path.exists():
        print(f"❌ 文件不存在: {input_path}")
        return False

    # 确定输出路径
    if output_path is None:
        if auto_output:
            output_path = input_path.with_suffix('.webp')
        else:
            output_path = input_path.parent / (input_path.stem + '_processed.webp')
    output_path = Path(output_path)

    print(f"\n{'='*50}")
    print(f"📄 处理: {input_path.name}")
    print(f"{'='*50}")

    try:
        img = Image.open(input_path)
        print(f"  原始尺寸: {img.size}, 模式: {img.mode}")

        # Step 1: 水印检测与裁剪
        img = detect_and_crop_watermark(img)

        # Step 2: 去底
        img = remove_background(img)

        # Step 3: 自动裁剪 + 留白
        img = auto_crop_with_padding(img)

        # Step 4: 保存为 WebP
        img.save(str(output_path), 'WEBP', quality=WEBP_QUALITY, method=6, lossless=False)

        file_size = output_path.stat().st_size
        print(f"  ✅ 已保存: {output_path.name} ({file_size / 1024:.1f} KB)")
        return True

    except Exception as e:
        print(f"  ❌ 处理失败: {e}")
        import traceback
        traceback.print_exc()
        return False


def batch_process(directory, recursive=False):
    """批量处理目录中的所有图片"""
    directory = Path(directory)
    if not directory.exists():
        print(f"❌ 目录不存在: {directory}")
        return

    extensions = SUPPORTED_EXTENSIONS
    pattern = '**/*' if recursive else '*'
    files = []
    for ext in extensions:
        files.extend(directory.glob(f'{pattern}{ext}'))

    # 只处理非 .webp 的源文件（避免重复处理）
    source_files = [f for f in files if f.suffix.lower() not in {'.webp'}]

    if not source_files:
        print(f"⚠️  在 {directory} 中未找到需要处理的图片文件")
        return

    print(f"\n{'='*60}")
    print(f"📦 批量处理: {directory}")
    print(f"   找到 {len(source_files)} 个源文件")
    print(f"{'='*60}")

    success = 0
    failed = 0

    for file_path in source_files:
        ok = process_image(file_path)
        if ok:
            success += 1
        else:
            failed += 1

    print(f"\n{'='*60}")
    print(f"📊 批量处理完成!")
    print(f"   成功: {success}")
    print(f"   失败: {failed}")
    print(f"{'='*60}")


def full_repair():
    """全量修复所有武魂图标目录的图片"""
    souls_dir = Path(__file__).parent.parent / 'public' / 'souls'
    if not souls_dir.exists():
        print(f"❌ 目录不存在: {souls_dir}")
        return

    print(f"\n{'='*60}")
    print(f"🔄 全量修复武魂图标")
    print(f"   扫描目录: {souls_dir}")
    print(f"{'='*60}")

    # 收集所有 webp 文件和 png 文件
    all_webp = list(souls_dir.rglob("*.webp"))
    all_png = list(souls_dir.rglob("*.png"))

    if all_png:
        print(f"\n📦 发现 {len(all_png)} 个 PNG 文件需要处理")
        batch_process(souls_dir, recursive=True)

    if all_webp:
        print(f"\n📦 发现 {len(all_webp)} 个 WebP 文件，检查是否需要重新处理")
        # 对每个 webp 检查 alpha 通道
        needs_repair = []
        for wp in all_webp:
            try:
                img = Image.open(wp)
                if img.mode != 'RGBA':
                    needs_repair.append(wp)
                img.close()
            except Exception:
                needs_repair.append(wp)

        if needs_repair:
            print(f"   → {len(needs_repair)} 个文件需要修复背景")
            for wp in needs_repair:
                # 转 PNG 再处理
                png_path = wp.with_suffix('.png')
                try:
                    img = Image.open(wp)
                    img.save(png_path, 'PNG')
                    img.close()
                    wp.unlink()
                    process_image(png_path)
                except Exception as e:
                    print(f"  ❌ {wp.name}: {e}")
        else:
            print(f"   → 所有 WebP 文件已包含透明通道 ✓")

    print(f"\n✅ 全量修复完成!")


DEFAULT_QUALITY = WEBP_QUALITY


def main():
    parser = argparse.ArgumentParser(
        description='武魂图标处理管线：去底 → 自动裁剪留白 → 去水印 → WebP',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument('input', nargs='?', help='输入文件或目录路径')
    parser.add_argument('-o', '--output', help='输出文件路径（仅单文件模式）')
    parser.add_argument('--batch', action='store_true', help='批量处理模式')
    parser.add_argument('-r', '--recursive', action='store_true', help='递归搜索子目录')
    parser.add_argument('--repair', action='store_true', help='全量修复所有武魂图标')
    parser.add_argument('--quality', type=int, default=DEFAULT_QUALITY,
                        help=f'WebP 质量 (0-100，默认 {DEFAULT_QUALITY})')

    args = parser.parse_args()

    quality = max(0, min(100, args.quality))

    if args.repair:
        full_repair()
        return

    if not args.input:
        parser.print_help()
        print("\n💡 提示: 使用 --repair 全量修复，或指定文件/目录")
        return

    path = Path(args.input)

    if args.batch or path.is_dir():
        batch_process(path, recursive=args.recursive)
    else:
        process_image(path, output_path=args.output)


if __name__ == '__main__':
    main()

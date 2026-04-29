#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
优化武魂图标：将 PNG 转换为 WebP 格式，保留透明背景
"""

import os
import shutil
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Error: Need Pillow library. Run: pip3 install Pillow")
    exit(1)

# Config
SOULS_DIR = Path("/Users/shunzhiyuanweizhu/Desktop/1/public/souls")
BACKUP_DIR = Path("/Users/shunzhiyuanweizhu/Desktop/1/public/souls_backup")
QUALITY = 75  # WebP quality (0-100), lowered for smaller file size


def remove_white_background(img, threshold=230):
    """
    将白色/近白色背景转为透明
    threshold: 判定为白色的阈值 (0-255)
    """
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    datas = img.getdata()
    newData = []
    for item in datas:
        # 如果 RGB 都接近白色，则设为透明
        if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    img.putdata(newData)
    return img


def convert_png_to_webp(png_path, webp_path):
    """Convert PNG to WebP, remove white background and preserve transparency"""
    img = Image.open(png_path)

    # 去除白色背景（原始 PNG 通常有白色背景）
    img = remove_white_background(img, threshold=230)

    # Save as WebP with alpha channel
    img.save(webp_path, 'WEBP', quality=QUALITY, method=6, lossless=False)
    img.close()


def main():
    print("=" * 60)
    print("Optimizing soul icons (preserve transparency)")
    print("=" * 60)

    # Restore original PNG from backup
    if not BACKUP_DIR.exists():
        print("Error: Backup directory not found!")
        print("Please restore from git or re-pull the repository")
        return

    print("\nStep 1: Restoring PNG files from backup...")
    restored = 0
    for webp_file in SOULS_DIR.rglob("*.webp"):
        # Find corresponding backup PNG
        rel_path = webp_file.relative_to(SOULS_DIR)
        backup_png = BACKUP_DIR / rel_path.with_suffix('.png')

        if backup_png.exists():
            # Delete WebP
            webp_file.unlink()
            # Restore PNG
            dest_png = webp_file.with_suffix('.png')
            shutil.copy2(backup_png, dest_png)
            restored += 1

    print(f"Restored {restored} PNG files")

    # Re-convert with proper transparency handling
    png_files = list(SOULS_DIR.rglob("*.png"))
    total = len(png_files)
    print(f"\nStep 2: Converting to WebP (preserve alpha)...")
    print(f"Found {total} PNG files\n")

    success = 0
    failed = 0
    total_saved = 0
    has_alpha_count = 0

    for i, png_path in enumerate(png_files, 1):
        try:
            original_size = png_path.stat().st_size
            webp_path = png_path.with_suffix('.webp')

            # Convert
            convert_png_to_webp(png_path, webp_path)

            if webp_path.exists():
                optimized_size = webp_path.stat().st_size
                saved = original_size - optimized_size
                total_saved += saved

                # Check if has alpha channel
                img = Image.open(webp_path)
                has_alpha = img.mode == 'RGBA'
                img.close()

                if has_alpha:
                    has_alpha_count += 1

                # Delete original PNG
                png_path.unlink()

                success += 1

                if i % 10 == 0 or i == total:
                    alpha_mark = "✓" if has_alpha else " "
                    print(f"  [{i:2d}/{total}] {alpha_mark} {png_path.stem}.webp ({saved/1024:.0f}KB saved)")
            else:
                failed += 1

        except Exception as e:
            failed += 1
            print(f"  [ERROR] Failed: {png_path.name} - {e}")

    print()
    print("=" * 60)
    print("Complete!")
    print(f"  Success: {success}/{total}")
    print(f"  Failed: {failed}/{total}")
    print(f"  With alpha channel: {has_alpha_count}/{success}")
    print(f"  Space saved: {total_saved / 1024 / 1024:.2f} MB")
    print("=" * 60)


if __name__ == "__main__":
    main()

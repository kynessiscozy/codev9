#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
去除武魂图标背景 - 将白色/近白色背景转为透明
"""

from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Error: Need Pillow. Run: pip3 install Pillow")
    exit(1)

SOULS_DIR = Path("/Users/shunzhiyuanweizhu/Desktop/1/public/souls")
BACKUP_DIR = Path("/Users/shunzhiyuanweizhu/Desktop/1/public/souls_backup")


def remove_white_background(img, threshold=240):
    """
    将白色/近白色背景转为透明
    threshold: 判定为白色的阈值 (0-255)，越大则更多颜色被判定为白色
    """
    # 转换为 RGBA (带透明通道)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    datas = img.getdata()
    newData = []

    for item in datas:
        # item 是 (R, G, B, A)
        # 如果 RGB 都接近 255 (白色)，则设为透明
        if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
            newData.append((255, 255, 255, 0))  # 完全透明
        else:
            newData.append(item)

    img.putdata(newData)
    return img


def process_images():
    """处理所有图片"""
    # 从备份恢复原始 PNG
    if not BACKUP_DIR.exists():
        print("Error: Backup not found!")
        return

    print("Step 1: Restoring original PNGs from backup...")
    restored = 0
    for webp_file in SOULS_DIR.rglob("*.webp"):
        rel_path = webp_file.relative_to(SOULS_DIR)
        backup_png = BACKUP_DIR / rel_path.with_suffix('.png')
        if backup_png.exists():
            webp_file.unlink()
            dest_png = webp_file.with_suffix('.png')
            import shutil
            shutil.copy2(backup_png, dest_png)
            restored += 1
    print(f"Restored {restored} PNG files\n")

    # 处理 PNG：去背景 -> 转 WebP
    png_files = list(SOULS_DIR.rglob("*.png"))
    total = len(png_files)
    print(f"Step 2: Removing backgrounds and converting to WebP...")
    print(f"Found {total} PNG files\n")

    success = 0
    failed = 0
    total_saved = 0
    transparent_count = 0

    for i, png_path in enumerate(png_files, 1):
        try:
            original_size = png_path.stat().st_size

            # 打开图片
            img = Image.open(png_path)

            # 去除白色背景
            img = remove_white_background(img, threshold=230)

            # 检查是否真的有透明像素
            has_transparent = any(p[3] == 0 for p in img.getdata())
            if has_transparent:
                transparent_count += 1

            # 保存为 WebP
            webp_path = png_path.with_suffix('.webp')
            img.save(webp_path, 'WEBP', quality=90, method=6)
            img.close()

            if webp_path.exists():
                optimized_size = webp_path.stat().st_size
                saved = original_size - optimized_size
                total_saved += saved

                # 删除原 PNG
                png_path.unlink()

                success += 1

                if i % 10 == 0 or i == total:
                    alpha_mark = "✓" if has_transparent else " "
                    print(f"  [{i:2d}/{total}] {alpha_mark} {png_path.stem}.webp")

        except Exception as e:
            failed += 1
            print(f"  [ERROR] {png_path.name}: {e}")

    print()
    print("=" * 60)
    print("Complete!")
    print(f"  Success: {success}/{total}")
    print(f"  Failed: {failed}/{total}")
    print(f"  With transparency: {transparent_count}/{success}")
    print(f"  Space saved: {total_saved / 1024 / 1024:.2f} MB")
    print("=" * 60)


if __name__ == "__main__":
    process_images()

#!/usr/bin/env python3
"""
优化武魂图标：将 PNG 转换为压缩的 WebP 格式
可减少文件大小 70-90%
"""

import os
import subprocess
import shutil
from pathlib import Path

# 配置
SOULS_DIR = Path("/Users/shunzhiyuanweizhu/Desktop/1/public/souls")
BACKUP_DIR = SOULS_DIR.parent / "souls_backup"
QUALITY = 80  # WebP 质量 (0-100)，80 是很好的平衡点

def optimize_with_sips():
    """使用 macOS 自带的 sips 工具压缩图片"""
    print("🔍 开始扫描 PNG 文件...")

    png_files = list(SOULS_DIR.rglob("*.png"))
    total = len(png_files)
    print(f"📊 找到 {total} 个 PNG 文件")

    # 创建备份
    if BACKUP_DIR.exists():
        shutil.rmtree(BACKUP_DIR)
    shutil.copytree(SOULS_DIR, BACKUP_DIR)
    print(f"✅ 已备份原文件到: {BACKUP_DIR}")

    success = 0
    failed = 0
    total_saved = 0

    for i, png_path in enumerate(png_files, 1):
        try:
            original_size = png_path.stat().st_size

            # 使用 sips 调整图片质量并转为 JPEG（临时）
            temp_jpg = png_path.with_suffix('.jpg.tmp')

            # sips 压缩命令
            result = subprocess.run([
                'sips',
                '-s', 'format', 'jpeg',
                '-s', 'formatOptions', '80',
                str(png_path),
                '--out', str(temp_jpg)
            ], capture_output=True, text=True)

            if temp_jpg.exists():
                # 用优化后的 JPEG 替换原 PNG
                new_png = png_path.with_suffix('.optimized.png')
                subprocess.run([
                    'sips',
                    '-s', 'format', 'png',
                    str(temp_jpg),
                    '--out', str(new_png)
                ], capture_output=True)
                temp_jpg.unlink()

                if new_png.exists():
                    optimized_size = new_png.stat().st_size
                    new_png.replace(png_path)

                    saved = original_size - optimized_size
                    total_saved += saved
                    success += 1

                    if i % 10 == 0 or i == total:
                        print(f"⏳ 进度: {i}/{total} - {png_path.name}")
                else:
                    failed += 1
            else:
                failed += 1

        except Exception as e:
            failed += 1
            print(f"❌ 失败: {png_path.name} - {e}")

    print(f"\n✅ 完成！")
    print(f"   成功: {success}/{total}")
    print(f"   失败: {failed}/{total}")
    print(f"   节省空间: {total_saved / 1024 / 1024:.2f} MB")
    print(f"   备份位置: {BACKUP_DIR}")


def convert_to_webp():
    """转换为 WebP 格式（需要 Python Pillow 库）"""
    try:
        from PIL import Image
    except ImportError:
        print("❌ 需要安装 Pillow: pip3 install Pillow")
        return False

    print("🔍 开始转换为 WebP 格式...")

    png_files = list(SOULS_DIR.rglob("*.png"))
    total = len(png_files)
    print(f"📊 找到 {total} 个 PNG 文件")

    # 创建备份
    if BACKUP_DIR.exists():
        shutil.rmtree(BACKUP_DIR)
    shutil.copytree(SOULS_DIR, BACKUP_DIR)
    print(f"✅ 已备份原文件到: {BACKUP_DIR}")

    success = 0
    failed = 0
    total_saved = 0

    for i, png_path in enumerate(png_files, 1):
        try:
            original_size = png_path.stat().st_size

            # 打开 PNG 并转换为 WebP
            img = Image.open(png_path)
            webp_path = png_path.with_suffix('.webp')

            # 保存为 WebP
            img.save(webp_path, 'WEBP', quality=QUALITY, method=6)
            img.close()

            if webp_path.exists():
                optimized_size = webp_path.stat().st_size
                saved = original_size - optimized_size
                total_saved += saved
                success += 1

                # 删除原 PNG
                png_path.unlink()

                if i % 10 == 0 or i == total:
                    print(f"⏳ 进度: {i}/{total} - {png_path.stem}.webp ({saved/1024:.0f}KB 节省)")
            else:
                failed += 1

        except Exception as e:
            failed += 1
            print(f"❌ 失败: {png_path.name} - {e}")

    print(f"\n✅ 转换完成！")
    print(f"   成功: {success}/{total}")
    print(f"   失败: {failed}/{total}")
    print(f"   节省空间: {total_saved / 1024 / 1024:.2f} MB")
    print(f"   备份位置: {BACKUP_DIR}")
    return True


if __name__ == "__main__":
    print("=" * 60)
    print("🎨 武魂图标优化工具")
    print("=" * 60)
    print()

    # 检查 Python Imaging Library
    try:
        from PIL import Image
        print("✅ 检测到 Pillow 库，使用 WebP 转换（最佳压缩）")
        convert_to_webp()
    except ImportError:
        print("⚠️  未安装 Pillow，使用 sips 压缩 PNG")
        print("   提示: 运行 'pip3 install Pillow' 后重新运行可获得更好效果")
        optimize_with_sips()

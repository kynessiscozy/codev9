#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量处理所有武魂图标，将绿色背景（#00FF00）转为透明
支持 RGB 和 RGBA 模式，确保输出为带透明通道的 WebP
"""
import os
import shutil
from pathlib import Path
from PIL import Image

# 配置
SOULS_DIR = Path("/Users/shunzhiyuanweizhu/Desktop/1/public/souls")
GREEN_BG = (0, 255, 0)  # #00FF00

def is_greenish(r, g, b, tolerance=80):
    """判断像素是否接近绿色（改进版，支持暗绿色背景）"""
    # 方法1：G 通道明显高于 R 和 B（适用于各种绿色背景）
    if g > r + 30 and g > b + 30:
        return True
    
    # 方法2：接近纯绿色 #00FF00（容差模式）
    if abs(r - 0) + abs(g - 255) + abs(b - 0) < tolerance * 3:
        return True
    
    # 方法3：暗绿色背景（AI 常生成这种）
    if g > 100 and g > r * 1.2 and g > b * 1.2:
        return True
    
    return False

def remove_green_bg(input_path, output_path):
    """去除绿色背景，转为透明"""
    try:
        img = Image.open(input_path)
        
        # 转换为 RGBA
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # 获取像素数据
        pixels = img.load()
        width, height = img.size
        
        transparent_count = 0
        total_pixels = width * height
        
        # 遍历所有像素
        for py in range(height):
            for px in range(width):
                r, g, b, a = pixels[px, py]
                
                # 检测绿色背景
                if is_greenish(r, g, b):
                    # 设为透明
                    pixels[px, py] = (r, g, b, 0)
                    transparent_count += 1
                # 检测接近白色的背景
                elif r > 240 and g > 240 and b > 240:
                    pixels[px, py] = (r, g, b, 0)
                    transparent_count += 1
        
        # 保存为 WebP
        img.save(output_path, 'WEBP', quality=95, method=6)
        
        return True, transparent_count, total_pixels
    except Exception as e:
        return False, str(e), 0

def main():
    if not SOULS_DIR.exists():
        print(f"错误: 目录不存在 {SOULS_DIR}")
        return
    
    # 查找所有 WebP 文件
    webp_files = list(SOULS_DIR.rglob("*.webp"))
    
    if not webp_files:
        print(f"未在 {SOULS_DIR} 中找到任何 .webp 文件")
        return
    
    print(f"{'='*60}")
    print(f"批量透明背景处理")
    print(f"处理目录: {SOULS_DIR}")
    print(f"找到文件: {len(webp_files)} 个")
    print(f"{'='*60}\n")
    
    success = 0
    fail = 0
    skip = 0
    
    for i, file_path in enumerate(webp_files, 1):
        rel_path = file_path.relative_to(SOULS_DIR.parent.parent)
        print(f"[{i}/{len(webp_files)}] {file_path.name:30s}... ", end="", flush=True)
        
        # 临时文件
        temp_path = file_path.parent / f".temp_{file_path.name}"
        
        try:
            ok, result, total = remove_green_bg(file_path, temp_path)
            
            if ok:
                # 替换原文件
                if temp_path.exists():
                    # 检查透明像素比例
                    ratio = result * 100 // total if total > 0 else 0
                    
                    # 如果透明像素太少，可能是图片本身没有绿色背景
                    if ratio < 5:
                        print(f"⚠️  透明像素过少 ({ratio}%), 可能无需处理")
                        temp_path.unlink(missing_ok=True)
                        skip += 1
                    else:
                        # 替换原文件
                        shutil.move(str(temp_path), str(file_path))
                        print(f"✓ 完成 (透明像素: {ratio}%)")
                        success += 1
                else:
                    print(f"✗ 临时文件不存在")
                    fail += 1
            else:
                print(f"✗ 失败: {result}")
                fail += 1
                temp_path.unlink(missing_ok=True)
        except Exception as e:
            print(f"✗ 错误: {e}")
            fail += 1
            temp_path.unlink(missing_ok=True)
    
    print(f"\n{'='*60}")
    print(f"处理完成!")
    print(f"成功: {success}")
    print(f"跳过: {skip} (无需处理)")
    print(f"失败: {fail}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()

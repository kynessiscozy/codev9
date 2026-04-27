# -*- coding: utf-8 -*-
"""
批量去底 + 部署：
1. 读取 public/souls/ 下所有生成的 PNG 文件
2. 用 rembg 去除背景（绿幕/蓝幕 → 透明）
3. 输出透明 PNG 到对应品质子目录
4. 替换原有的 .webp 文件
"""
import os, sys, time
from pathlib import Path

# ── 配置 ──
SOURCE_DIR = Path(r"c:\Users\hukeze\WorkBuddy\20260427084137\public\souls")
OUTPUT_DIR = SOURCE_DIR  # 直接输出到同目录的子目录

# 品质目录映射（文件名前缀 → 子目录名）
QUALITY_MAP = {
    "common": "common",
    "rare": "rare",
    "epic": "epic",
    "legend": "legend",
    "apex": "apex",
    "hc": "hc",
    "ha": "ha",
    "twin": "twin",
    "triple": "triple",
}

def get_quality_from_filename(fname):
    """从文件名提取品质"""
    for q in QUALITY_MAP:
        if fname.startswith(q + "_") or fname.startswith(q + "-"):
            return q
    return None


def process_with_rembg(input_path, output_path):
    """用rembg去底"""
    try:
        from rembg import remove
        from PIL import Image
        import io

        with open(input_path, "rb") as f:
            input_data = f.read()

        output_data = remove(input_data)

        # 保存为PNG
        img = Image.open(io.BytesIO(output_data))
        if img.mode == "RGBA":
            img.save(output_path, "PNG")
        else:
            img = img.convert("RGBA")
            img.save(output_path, "PNG")

        return True, os.path.getsize(output_path)
    except Exception as e:
        return False, str(e)


def main():
    print("=" * 50)
    print("武魂图标批量去底 + 部署工具")
    print(f"源目录: {SOURCE_DIR}")
    print("=" * 50)

    # 收集所有待处理的 PNG（排除已处理的和 Game_icon_ 开头的临时文件）
    png_files = []
    for f in SOURCE_DIR.iterdir():
        if f.suffix.lower() == ".png" and not f.name.startswith("Game_icon_"):
            quality = get_quality_from_filename(f.stem)
            if quality:
                png_files.append((f, quality))

    total = len(png_files)
    print(f"找到 {total} 个武魂图标需要处理")
    print("-" * 50)

    ok = fail = skip = 0
    results = []

    for i, (src_path, quality) in enumerate(sorted(png_files, key=lambda x: x[0].name)):
        i += 1
        fname = src_path.name
        target_dir = OUTPUT_DIR / QUALITY_MAP.get(quality, quality)
        target_dir.mkdir(parents=True, exist_ok=True)
        out_path = target_dir / fname

        # 检查是否已处理过且有效
        if out_path.exists() and out_path.stat().st_size > 5000:
            # 检查是否是RGBA（有透明通道）
            from PIL import Image
            try:
                img = Image.open(out_path)
                if img.mode == "RGBA":
                    skip += 1
                    print(f"[{i}/{total}] SKIP (exists+alpha): {fname}")
                    results.append({"f": fname, "q": quality, "s": "skip"})
                    continue
            except:
                pass

        print(f"[{i}/{total}] Processing: {fname} -> {quality}/", end="", flush=True)

        success, result = process_with_rembg(src_path, out_path)
        if success:
            ok += 1
            print(f" OK ({result} bytes)")
            results.append({"f": fname, "q": quality, "s": "ok", "size": result})
        else:
            fail += 1
            print(f" FAIL: {result[:80]}")
            results.append({"f": fname, "q": quality, "s": "fail", "e": str(result)[:100]})

    # 统计
    print("\n" + "=" * 50)
    print(f"DONE! Total={total}, OK={ok}, FAIL={fail}, SKIP={skip}")

    # 各品质统计
    print("\n各品质目录:")
    for q in sorted(QUALITY_MAP.keys()):
        d = OUTPUT_DIR / QUALITY_MAP[q]
        if d.exists():
            count = len([f for f in d.iterdir() if f.suffix == ".png"])
            print(f"  {q}: {count} icons")

    return ok, fail


if __name__ == "__main__":
    main()

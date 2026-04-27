# -*- coding: utf-8 -*-
"""
部署步骤2：重命名PNG文件匹配原有命名 + 删除旧webp + 清理根目录源文件
"""
import os, shutil
from pathlib import Path

SOURCE_DIR = Path(r"c:\Users\hukeze\WorkBuddy\20260427084137\public\souls")

# 品质目录
QUALITY_DIRS = ["common", "rare", "epic", "legend", "apex", "hc", "ha", "twin", "triple"]

# 新→旧文件名映射（从batch_seedream.py的SOULS数据提取）
NAME_MAP = {
    # common (13)
    "common_01_蓝银草.png": "蓝银草.png",
    "common_02_镰刀.png": "镰刀.png",
    "common_03_香草.png": "香草.png",
    "common_04_木棍.png": "木棍.png",
    "common_05_含羞草.png": "含羞草.png",
    "common_06_铁锤.png": "铁锤.png",
    "common_07_渔网.png": "渔网.png",
    "common_08_蒲公英.png": "蒲公英.png",
    "common_09_芦苇杆.png": "芦苇杆.png",
    "common_10_铁锅.png": "铁锅.png",
    "common_11_荆棘藤.png": "荆棘藤.png",
    "common_12_石头.png": "石头.png",
    "common_13_陶笛.png": "陶笛.png",
    # rare (20)
    "rare_01_白虎.png": "白虎.png",
    "rare_02_火凤凰.png": "火凤凰.png",
    "rare_03_冰凤凰.png": "冰凤凰.png",
    "rare_04_盘龙棍.png": "盘龙棍.png",
    "rare_05_七宝琉璃塔.png": "七宝琉璃塔.png",
    "rare_06_幽冥灵猫.png": "幽冥灵猫.png",
    "rare_07_碧磷蛇皇.png": "碧磷蛇皇.png",
    "rare_08_金龙爪.png": "金龙爪.png",
    "rare_09_朱雀圣火.png": "朱雀圣火.png",
    "rare_10_玄武神盾.png": "玄武神盾.png",
    "rare_11_白鹤翎羽.png": "白鹤翎羽.png",
    "rare_12_青龙护卫.png": "青龙护卫.png",
    "rare_13_冰火蛟龙.png": "冰火蛟龙.png",
    "rare_14_雷电狼王.png": "雷电狼王.png",
    "rare_15_幽灵蝶.png": "幽灵蝶.png",
    "rare_16_赤炎狮王.png": "赤炎狮王.png",
    "rare_17_碧海银鲸.png": "碧海银鲸.png",
    "rare_18_紫电金鹰.png": "紫电金鹰.png",
    "rare_19_幽影黑豹.png": "幽影黑豹.png",
    "rare_20_碎星陨铁.png": "碎星陨铁.png",
    # epic (17)
    "epic_01_蓝电霸王龙.png": "蓝电霸王龙.png",
    "epic_02_昊天锤.png": "昊天锤.png",
    "epic_03_六翼天使.png": "六翼天使.png",
    "epic_04_泰坦巨猿.png": "泰坦巨猿.png",
    "epic_05_噬魂蛛皇.png": "噬魂蛛皇.png",
    "epic_06_死亡蛛皇.png": "死亡蛛皇.png",
    "epic_07_冰碧帝皇蝎.png": "冰碧帝皇蝎.png",
    "epic_08_烈火剑圣.png": "烈火剑圣.png",
    "epic_09_星辰神兽.png": "星辰神兽.png",
    "epic_10_雷霆战神.png": "雷霆战神.png",
    "epic_11_极寒冰皇.png": "极寒冰皇.png",
    "epic_12_焰灵骑士.png": "焰灵骑士.png",
    "epic_13_黄金圣龙.png": "黄金圣龙.png",
    "epic_14_狂风战鹰.png": "狂风战鹰.png",
    "epic_15_暗域鬼王.png": "暗域鬼王.png",
    "epic_16_极焱炎神.png": "极焱炎神.png",
}

def main():
    print("=" * 50)
    print("武魂图标部署：重命名 + 替换旧webp")
    print("=" * 50)

    renamed = 0
    deleted_webp = 0
    cleaned_source = 0
    errors = []

    for qdir_name in QUALITY_DIRS:
        qdir = SOURCE_DIR / qdir_name
        if not qdir.exists():
            continue

        for old_name, new_name in NAME_MAP.items():
            if not old_name.startswith(qdir_name + "_"):
                continue

            src_path = qdir / old_name
            dst_path = qdir / new_name
            webp_path = qdir / new_name.replace(".png", ".webp")

            # 1. 重命名 PNG
            if src_path.exists() and not dst_path.exists():
                try:
                    shutil.move(str(src_path), str(dst_path))
                    renamed += 1
                    print(f"  RENAME: {old_name} -> {new_name}")
                except Exception as e:
                    errors.append(f"RENAME FAIL: {old_name} -> {e}")

            # 2. 删除旧 webp（同名的）
            if webp_path.exists() and dst_path.exists():
                try:
                    webp_path.unlink()
                    deleted_webp += 1
                    print(f"  DELETE OLD: {webp_path.name}")
                except Exception as e:
                    errors.append(f"DELETE FAIL: {webp_path.name} -> {e}")

    # 3. 清理根目录下的源PNG文件
    for f in SOURCE_DIR.iterdir():
        if f.suffix == ".png":
            # 检查是否是已处理的源文件（common_/rare_/epic_ 开头）
            for prefix in ["common_", "rare_", "epic_", "legend_", "apex_", "hc_", "ha_", "twin_", "triple_"]:
                if f.name.startswith(prefix):
                    try:
                        f.unlink()
                        cleaned_source += 1
                        print(f"  CLEAN SOURCE: {f.name}")
                    except Exception as e:
                        errors.append(f"CLEAN FAIL: {f.name} -> {e}")
                    break

    # 4. 也清理 Game_icon_ 开头的临时文件
    for f in SOURCE_DIR.iterdir():
        if f.name.startswith("Game_icon_") and f.suffix == ".png":
            try:
                f.unlink()
                cleaned_source += 1
                print(f"  CLEAN TEMP: {f.name}")
            except Exception as e:
                errors.append(f"CLEAN TEMP FAIL: {f.name} -> {e}")

    print("\n" + "=" * 50)
    print(f"DONE! Renamed={renamed}, DeletedWebP={deleted_webp}, CleanedSource={cleaned_source}")

    if errors:
        print(f"\nErrors ({len(errors)}):")
        for e in errors[:10]:
            print(f"  {e}")

    # 最终统计
    print("\n各目录最终状态:")
    for q in sorted(QUALITY_DIRS):
        d = SOURCE_DIR / q
        if d.exists():
            pngs = [f for f in d.iterdir() if f.suffix == ".png"]
            webps = [f for f in d.iterdir() if f.suffix == ".webp"]
            print(f"  {q}: {len(pngs)} PNG (new) + {len(webps)} WEBP (old)")


if __name__ == "__main__":
    main()

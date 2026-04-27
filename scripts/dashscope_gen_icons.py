#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
使用阿里云 DashScope API 批量生成武魂图标
API 端点: https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation
模型: z-image-turbo
"""
import os
import sys
import time
import json
import requests
from pathlib import Path

# ── 配置 ──
API_KEY = os.environ.get("DASHSCOPE_API_KEY", "")
BASE_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
MODEL = "z-image-turbo"
OUTPUT_DIR = Path("/Users/shunzhiyuanweizhu/Desktop/1/public/souls")
GEN_DIR = Path("/Users/shunzhiyuanweizhu/Desktop/1/generated")
LOG_FILE = GEN_DIR / "dashscope_log.txt"

# 品质 → 风格映射
QUALITY_STYLES = {
    "common": {
        "style_desc": "simple flat game icon design, clean lines, minimalist UI style, mobile game quality",
        "color_theme": "bronze and earth brown colors",
        "detail_level": "simple",
    },
    "rare": {
        "style_desc": "detailed game icon, metallic texture, vibrant colors, glowing blue edges, RPG game equipment icon",
        "color_theme": "silver and blue colors",
        "detail_level": "detailed",
    },
    "epic": {
        "style_desc": "high-detail game icon, rich metallic textures, dynamic purple lighting, particle effects, fantasy game art, premium quality",
        "color_theme": "purple and gold colors",
        "detail_level": "high-detail",
    },
    "legend": {
        "style_desc": "ultra-detailed legendary game icon, ornate gold and silver metallic textures, divine glow, intricate engravings, mythic fantasy art style, AAA game quality, masterpiece",
        "color_theme": "gold and rainbow colors, divine light",
        "detail_level": "ultra-detailed",
    },
    "apex": {
        "style_desc": "masterpiece game icon, cosmic energy aura, divine metallic craftsmanship, holographic rainbow effects, ethereal glow, hyper-realistic fantasy art, god-tier design, ultimate legendary quality",
        "color_theme": "cosmic rainbow colors, holographic",
        "detail_level": "masterpiece",
    },
    "hc": {
        "style_desc": "mystical game icon, ethereal purple aura, semi-transparent dark effects, mysterious runes glowing, dark fantasy art, enchanted artifact",
        "color_theme": "purple and black, mystical violet",
        "detail_level": "mystical",
    },
    "ha": {
        "style_desc": "extreme game icon, chaotic dark red energy, cracks of hellfire light, overwhelming power aura, dark god art style, menacing infernal artifact, terrifying power",
        "color_theme": "dark red and black, hellfire orange",
        "detail_level": "extreme",
    },
    "twin": {
        "style_desc": "masterpiece dual-element game icon, yin-yang balance composition, two contrasting forces merging, double aura effects, divine fusion art, symmetrical composition, legendary game artifact, perfect balance",
        "color_theme": "dual-tone contrasting, yin-yang colors",
        "detail_level": "masterpiece",
    },
    "triple": {
        "style_desc": "ultimate masterpiece game icon, three divine forces intertwined, trinity symbol, triple aura explosion, cosmic convergence, god-tier sacred art, overwhelming divine presence, ultimate legendary artifact, beyond god-tier",
        "color_theme": "tri-color divine spectrum, cosmic gold",
        "detail_level": "ultimate",
    },
}

# 武魂 → 英文视觉描述
SOUL_VISUAL = {
    # ── 传说 legend ──
    "九宝琉璃塔": "A magnificent nine-tiered pagoda tower floating in the air, each tier glowing with different rainbow jewels, ornate architecture, ancient Chinese fantasy style, golden filigree details",
    "蓝银皇": "A regal silver-blue emperor grass with golden crown of leaves, glowing blue-silver vines wrapped around, thorny stems with glistening dewdrops, majestic plant aura, royal grass emperor",
    "堕落天使": "A dark fallen angel with broken black wings, shadow halo above head, dark purple energy aura, gothic fallen wings, melancholic divine being, dark feathered wings",
    "极品火凤凰": "The ultimate fire phoenix, pure white-hot flames enveloping entire body, divine rebirth aura, triple halo ring behind, majestic bird with flowing flame feathers, ultimate fire bird",
    "金龙王": "The golden dragon king head with imperial crown, scales of pure gold shining, mighty dragon roaring, divine dragon breath of golden light, king of all dragons, majestic golden dragon",
    "海神武魂": "A golden trident of the sea god, ocean waves parting around the weapon, coral and pearls floating, deep blue divinity, Poseidon's weapon glowing with sea power",
    "七杀剑": "A legendary mystical sword with seven glowing kill marks on the blade, dark red energy surrounding, absolute sharpness aura, ancient runes engraved, most powerful sword",
    "雷灵王": "The thunder spirit king, humanoid figure made of pure blue lightning, crown of storms on head, electric aura crackling, king of thunder and lightning",
    "星宿命盘": "A mystical astrolabe with rotating zodiac rings, constellation map glowing with starlight, ancient astronomical instrument, cosmic destiny tool, floating star map",
    "幽冥神眼": "A giant spectral eye from the underworld, glowing ghostly blue, seeing through all illusions, floating ethereal eye, mysterious all-seeing eye, ghost eye",
    "混沌之翼": "Magnificent translucent wings of pure chaos energy, impossible rainbow colors, reality bending around the wings, ethereal translucent energy wings, cosmic wings",
    "天罚神雷": "Divine punishment lightning bolt from heaven, judgment thunder with angelic runes, holy lightning descending from sky, divine retribution thunder, heavenly lightning",
    "永恒冰魂": "A frozen ethereal spirit made of eternal ice, ice crystals forming beautiful patterns, timeless beauty, ice phantom with crystal body, eternal frozen spirit",
    "炎狱魔神": "A demon god rising from hellfire, massive horns, chains of flame wrapping around, infernal majesty, burning demon figure with dark flames, lord of hellfire",
    "天命神弓": "A divine bow made of fate threads, celestial bow glowing with cosmic energy, arrow nocked with stardust, mystical bow of destiny, heavenly bow",
    "混沌剑魂": "A sentient sword of pure chaos, reality fractures and bends around its blade, dimensional rift blade, cosmic sword with swirling void energy, sword of chaos",
    # ── 巅峰 apex ──
    "神圣天使": "The supreme holy angel, infinite wings of pure white light radiating from back, divine halo above, god's messenger descending, radiant wings of ultimate holiness, supreme angel",
    "柔骨兔王": "The moon rabbit king, translucent jade-white body glowing with lunar energy, ethereal grace, mystical rabbit with crown, lunar rabbit deity, moon rabbit",
    "混沌属性": "Pure primordial chaos manifestation, swirling void energy in impossible colors, creation and destruction duality, cosmic chaos orb, primordial chaos entity",
    "宇宙之源": "The cosmic source, a brilliant white singularity of creation, miniature galaxies forming around it, universe origin point, cosmic birth, stellar nexus",
    "时空裂缝": "A rift in spacetime, showing parallel dimensions, time flowing backwards visualization, dimensional fracture with clockwork, time-space break, temporal rift",
    "虚无之主": "The lord of nothingness, a void silhouette figure, existence dissolving around it, shadow of the void, entity of pure emptiness, master of void",
    "因果律者": "The arbiter of karma, glowing scales of cause and effect, threads of fate in hands, destiny weaver figure, cosmic judge with balanced scales, karma master",
    "神格化身": "A mortal vessel becoming god, divine golden light transformation, ascending figure with glowing divinity, golden ascension light, god incarnation, divine transformation",
    # ── 混沌 hc ──
    "如意环": "A mystical jade ring of hidden power, purple energy field radiating, glowing circular ring with ancient runes, domain expanding aura, mystical ring artifact",
    "幽冥之眼": "An eye peering into the underworld, spectral blue flames in pupil, death sight vision, ghostly floating eye, underworld eye, spirit eye",
    "九心海棠": "A magical nine-petaled crabapple flower glowing with healing pink light, sacred petals floating, mystical flower of life, nine-petal flower, healing flower",
    "奇茸通天菊": "A miraculous golden chrysanthemum reaching upward to heaven, golden petals glowing with spiritual energy, celestial flower reaching sky, divine chrysanthemum",
    "无形剑意": "Invisible sword intent materializing as air ripples and pressure waves, sword aura cutting through space, invisible blade force, sword qi visualization",
    "千机算盘": "An ancient wooden abacus of thousand mechanisms, counting beads glowing with golden light, predicting future destiny, mystical calculator artifact, divine abacus",
    "月影神狐": "A mystical nine-tailed fox spirit under moonlight, shadow illusions around, silver fur glowing, lunar fox with multiple tails, moon fox spirit",
    "幽莲血心": "A blood-red lotus from the netherworld, crimson petals with dark energy, life force siphoning aura, dark red lotus flower, nether lotus",
    # ── 昊天 ha ──
    "昊天九绝锤": "The ultimate Haotian war hammer, nine destruction seals glowing on surface, chaos energy storm around, legendary massive warhammer, ultimate hammer of destruction",
    "饕餮神牛": "The Taotie divine bull, massive ox with devouring dark energy, ancient beast of gluttony, mystical ox with glowing eyes, divine bull of gluttony",
    "死神镰刀": "The grim reaper's massive scythe, blade of dark death energy, soul chains attached, dark mysterious scythe, death's scythe, grim reaper weapon",
    "虚空裂爪": "Massive dark claws tearing through void space, dimensional rifts appearing, dark energy claw marks, void-tearing claws, dimensional claws",
    "天魔琴": "A demonic ancient guqin zither with strings of dark purple energy, sound waves visible as ripples, evil musical instrument, demonic zither, dark qin",
    "混沌神炉": "A primordial chaos furnace, swallowing and refining all creation, dark cauldron with void energy, mystical alchemy furnace, chaos cauldron",
    # ── 双生 twin ──
    "蓝银草+昊天锤": "Silver-blue grass vines and divine war hammer fused together in harmony, nature green vines wrapping around golden hammer, dual aura of plant and power, combined weapon and plant artifact",
    "圣天使+堕天使": "Holy pure angel and fallen dark angel back to back, white light wings and black dark wings, yin yang light dark balance, dual angelic beings, contrasting angels",
    "金龙+银龙": "Golden dragon and silver dragon intertwined in yin-yang dance, two serpentine dragons spiraling, dual dragon guardians, golden and silver dragons, twin dragons",
    "冰火双凤": "Ice blue phoenix and fire red phoenix spiraling together, elemental harmony of cold and heat, dual phoenixes with contrasting auras, ice and fire birds",
    "雷剑双生": "A sword crackling with blue thunder and lightning, storm and steel combined, lightning blade weapon, thunder sword, lightning blade",
    "星辰+混沌": "Orderly starlight golden particles merging with chaotic dark void, cosmos and entropy in balance, stellar chaos fusion, star and void combined",
    "幽冥+圣光": "Dark nether purple energy meeting sacred golden holy light, death and rebirth cycle, dual contrasting energy aura, dark and light fusion",
    "时间+空间": "Clockwork golden gears and dimensional blue portals combined, time-space fabric weaving, temporal and spatial fusion, time clock and space portal",
    "神火+神冰": "Sacred golden fire and divine ice crystals in perfect balance, extreme hot and cold duality, fire and ice elements balanced, divine fire and ice",
    # ── 三生 triple ──
    "冰火雷三生龙": "A magnificent dragon with three elemental heads - ice blue, fire red, and lightning purple, trinity dragon with three heads, three-headed elemental dragon, tri-element dragon",
    "昊天极光混沌三生": "Haotian war hammer with aurora borealis rainbow light and chaos void energy trinity, three ultimate forces as one legendary hammer with cosmic rainbow effects, ultimate hammer",
    "神圣幽冥混沌三生": "Holy white light, nether dark purple, and chaos multicolor trinity, three divine domains united, ultimate convergence of three powers, tri-divine convergence",
    "时空因果三生": "Time golden clock, space blue portal, and karma glowing scales trinity, three cosmic laws as one supreme entity, ultimate cosmic law entity, tri-cosmic laws",
}

# 需要生成的武魂列表（按品质分类）
SOULS_TO_GENERATE = {
    "legend": [
        ("九宝琉璃塔", ["辅助", "光明", "神圣"]),
        ("蓝银皇", ["控制", "草", "皇者"]),
        ("堕落天使", ["暗", "堕落", "天使"]),
        ("极品火凤凰", ["极致之火", "凤凰", "毁灭"]),
        ("金龙王", ["极致之力", "龙王", "血脉"]),
        ("海神武魂", ["神力", "水", "海"]),
        ("七杀剑", ["极致之刃", "杀意", "剑"]),
        ("雷灵王", ["雷", "王者", "天空"]),
        ("星宿命盘", ["星宿", "命运", "神秘"]),
        ("幽冥神眼", ["冥界", "洞察", "神秘"]),
        ("混沌之翼", ["混沌", "飞行", "自由"]),
        ("天罚神雷", ["雷", "天道", "神罚"]),
        ("永恒冰魂", ["冰", "时间", "永恒"]),
        ("炎狱魔神", ["火", "魔", "地狱"]),
        ("天命神弓", ["命运", "远程", "穿透"]),
        ("混沌剑魂", ["混沌", "剑", "规则"]),
    ],
    "apex": [
        ("神圣天使", ["极致之光", "神圣", "天使", "神力"]),
        ("柔骨兔王", ["神秘", "月", "灵魂"]),
        ("混沌属性", ["混沌", "无序", "万有"]),
        ("宇宙之源", ["宇宙", "规则", "万物"]),
        ("时空裂缝", ["时间", "空间", "裂缝"]),
        ("虚无之主", ["虚无", "毁灭", "超越"]),
        ("因果律者", ["因果", "法则", "预知"]),
        ("神格化身", ["神力", "化身", "超越"]),
    ],
    "hc": [
        ("如意环", ["隐匿", "领域", "混沌"]),
        ("幽冥之眼", ["死亡", "洞察", "冥界"]),
        ("九心海棠", ["治愈", "生命", "神圣"]),
        ("奇茸通天菊", ["自然", "治愈", "通灵"]),
        ("无形剑意", ["剑", "无形", "意志"]),
        ("千机算盘", ["智慧", "预知", "算计"]),
        ("月影神狐", ["月", "幻象", "隐藏"]),
        ("幽莲血心", ["生命", "幽冥", "反制"]),
    ],
    "ha": [
        ("昊天九绝锤", ["混沌", "极致之力", "毁灭", "昊天"]),
        ("饕餮神牛", ["吞噬", "大地", "龙神"]),
        ("死神镰刀", ["死亡", "斩断", "混沌"]),
        ("虚空裂爪", ["虚空", "暗", "裂爪"]),
        ("天魔琴", ["音波", "魔", "精神破碎"]),
        ("混沌神炉", ["混沌", "火", "吞噬"]),
    ],
    "twin": [
        ("蓝银草+昊天锤", ["草", "力量", "控制", "双生"]),
        ("圣天使+堕天使", ["光明", "黑暗", "天使", "双生"]),
        ("金龙+银龙", ["龙神", "金银", "极致", "双生"]),
        ("冰火双凤", ["冰", "火", "凤凰", "双生"]),
        ("雷剑双生", ["雷", "剑", "双生"]),
        ("星辰+混沌", ["星辰", "混沌", "双生"]),
        ("幽冥+圣光", ["幽冥", "圣光", "双生"]),
        ("时间+空间", ["时间", "空间", "双生", "法则"]),
        ("神火+神冰", ["神火", "神冰", "双生", "极致"]),
    ],
    "triple": [
        ("冰火雷三生龙", ["冰", "火", "雷", "龙", "三生"]),
        ("昊天极光混沌三生", ["混沌", "极光", "昊天", "三生"]),
        ("神圣幽冥混沌三生", ["神圣", "幽冥", "混沌", "三生"]),
        ("时空因果三生", ["时间", "空间", "因果", "三生", "法则"]),
    ],
}


def build_prompt(soul_name, quality, attrs):
    """构建文生图 prompt"""
    visual = SOUL_VISUAL.get(soul_name, f"a mystical {soul_name} artifact, legendary weapon")
    qs = QUALITY_STYLES.get(quality, QUALITY_STYLES["common"])
    
    prompt = (
        f"Game icon design of {visual}. "
        f"{qs['style_desc']}. "
        f"Color theme: {qs['color_theme']}. "
        f"Centered composition on pure solid green screen background (#00FF00). "
        f"Isolated object, no text, no watermark, no border, no frame. "
        f"Professional mobile game UI icon, high quality, detailed artwork, "
        f"clean green screen background for easy background removal."
    )
    
    return prompt


def generate_image(prompt, size="1024*1024"):
    """调用 DashScope API 生成图片"""
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    payload = {
        "model": MODEL,
        "input": {
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"text": prompt}
                    ]
                }
            ]
        },
        "parameters": {
            "prompt_extend": False,
            "size": size
        }
    }
    
    try:
        # 发送请求
        response = requests.post(BASE_URL, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
        result = response.json()
        
        # 解析响应 - DashScope 格式
        if "output" in result:
            output = result["output"]
            
            # 格式: output.choices[0].message.content[0].image
            if "choices" in output and len(output["choices"]) > 0:
                choice = output["choices"][0]
                if "message" in choice and "content" in choice["message"]:
                    content = choice["message"]["content"]
                    # 查找 image 字段
                    for item in content:
                        if isinstance(item, dict) and "image" in item:
                            return item["image"], None
                    # 如果没有 image，可能有 text
                    for item in content:
                        if isinstance(item, dict) and "text" in item:
                            return None, f"API 返回文本而非图片: {item['text'][:100]}"
            
            # 检查是否有错误
            if "message" in output:
                return None, output["message"]
        
        # 错误格式
        if "code" in result:
            return None, f"{result.get('code')}: {result.get('message')}"
        
        return None, f"Unknown response format: {result}"
    except requests.exceptions.RequestException as e:
        return None, f"Request error: {str(e)}"
    except Exception as e:
        return None, f"Error: {str(e)}"


def download_image(url, path):
    """下载图片到本地"""
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(url, headers=headers, timeout=60)
        response.raise_for_status()
        
        with open(path, 'wb') as f:
            f.write(response.content)
        return True
    except Exception as e:
        print(f"下载失败: {e}")
        return False


def convert_to_webp_with_transparency(input_path, output_path, bg_color=(0, 255, 0)):
    """将图片转换为 WebP 格式，并去除指定背景色（透明化）"""
    try:
        from PIL import Image
        
        img = Image.open(input_path)
        
        # 转换为 RGBA
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # 使用 load() 直接操作像素（更高效）
        pixels = img.load()
        width, height = img.size
        
        # 将绿色背景（#00FF00）变为透明
        for py in range(height):
            for px in range(width):
                r, g, b, a = pixels[px, py]
                # 检测绿色背景（允许一定容差）
                if g > 200 and r < 100 and b < 100:
                    pixels[px, py] = (r, g, b, 0)  # 设为透明
        
        img.save(output_path, 'WEBP', quality=90, method=6)
        print(f"[{img.size[0]}x{img.size[1]}] ", end="")
        return True
    except Exception as e:
        print(f"转换失败: {e}")
        return False


def main():
    if not API_KEY:
        print("错误: 未设置 DASHSCOPE_API_KEY 环境变量")
        print("请设置: export DASHSCOPE_API_KEY='your_api_key'")
        return
    
    # 创建输出目录
    GEN_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # 统计
    total = sum(len(v) for v in SOULS_TO_GENERATE.values())
    done = 0
    success = 0
    fail = 0
    results = []
    log_lines = [f"DashScope 批量生成开始: {time.strftime('%Y-%m-%d %H:%M:%S')}", f"总计: {total} 个武魂", ""]
    
    print(f"{'='*60}")
    print(f"DashScope API 批量生成武魂图标")
    print(f"模型: {MODEL}")
    print(f"总计: {total} 个")
    print(f"{'='*60}\n")
    
    for quality, souls in SOULS_TO_GENERATE.items():
        quality_dir = OUTPUT_DIR / quality
        quality_dir.mkdir(parents=True, exist_ok=True)
        
        for i, (name, attrs) in enumerate(souls):
            done += 1
            
            # 文件名
            safe_name = name.replace("+", "_").replace(" ", "_")
            filename = f"{safe_name}.webp"
            filepath = quality_dir / filename
            
            # 跳过已存在的
            if filepath.exists():
                log_lines.append(f"[{done}/{total}] 跳过 (已存在): {name}")
                success += 1
                continue
            
            # 构建 prompt
            prompt = build_prompt(name, quality, attrs)
            
            log_lines.append(f"[{done}/{total}] 生成中: {name} ({quality})...")
            print(f"[{done}/{total}] {name:20s} ({quality:8s})... ", end="", flush=True)
            
            # 调用 API
            image_url, err = generate_image(prompt, size="1024*1024")
            
            if image_url:
                # 下载图片
                temp_path = GEN_DIR / f"{safe_name}_temp.png"
                temp_path.parent.mkdir(parents=True, exist_ok=True)
                
                if download_image(image_url, temp_path):
                    # 转换为 WebP 并处理透明背景
                    if convert_to_webp_with_transparency(temp_path, filepath):
                        print("✓ 完成")
                        success += 1
                        results.append({"name": name, "quality": quality, "status": "ok", "file": str(filepath)})
                    else:
                        # 如果转换失败，至少保存原图
                        from PIL import Image
                        img = Image.open(temp_path)
                        img.save(filepath, 'WEBP', quality=90)
                        print("✓ 完成 (无透明处理)")
                        success += 1
                        results.append({"name": name, "quality": quality, "status": "ok_no_transparency", "file": str(filepath)})
                    
                    temp_path.unlink(missing_ok=True)  # 删除临时文件
                else:
                    print("✗ 下载失败")
                    fail += 1
                    results.append({"name": name, "quality": quality, "status": "download_fail"})
            else:
                print(f"✗ API 失败: {err}")
                fail += 1
                results.append({"name": name, "quality": quality, "status": "api_fail", "error": err})
            
            # 实时写入日志
            with open(LOG_FILE, "w", encoding="utf-8") as f:
                f.write("\n".join(log_lines))
            
            # 避免频率限制
            if done < total:
                time.sleep(3)
    
    # 完成统计
    log_lines.append("")
    log_lines.append(f"完成! 成功: {success}, 失败: {fail}, 总计: {total}")
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(log_lines))
    
    # 保存结果 JSON
    with open(GEN_DIR / "dashscope_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'='*60}")
    print(f"生成完成! 成功: {success}, 失败: {fail}")
    print(f"日志: {LOG_FILE}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()

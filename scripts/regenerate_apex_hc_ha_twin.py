#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
重新生成 apex/hc/ha/twin 四个品质的武魂图标
使用更精准的 prompt 和开启 prompt 扩写
"""
import os
import time
import requests
from pathlib import Path
from PIL import Image

# ── 配置 ──
API_KEY = os.environ.get("DASHSCOPE_API_KEY", "sk-47a94718bb8d4e7d8a747185f6a6e574")
BASE_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
MODEL = "z-image-turbo"
GEN_DIR = Path("/Users/shunzhiyuanweizhu/Desktop/1/generated")

# apex 品质 - 巅峰级别，宇宙级力量
APEX_PROMPTS = {
    "神圣天使": {
        "visual": "The SUPREME HOLY ANGEL, infinite pure white light wings spread wide, divine golden halo above head, god's messenger descending from heaven, radiant wings of ultimate holiness, multiple layers of feathered wings glowing with divine light",
        "style": "masterpiece, ultimate holy angel, infinite light wings, divine halo, god-tier design, hyper-realistic fantasy art, celestial being, supreme holiness"
    },
    "柔骨兔王": {
        "visual": "The MOON RABBIT KING, translucent jade-white body glowing with ethereal lunar energy, crescent moon crown on head, mystical rabbit with crown sitting on moon palace, ethereal grace and divine rabbit aura",
        "style": "masterpiece, moon rabbit deity, translucent jade body, lunar energy, ethereal grace, mystical creature, divine rabbit, celestial beast"
    },
    "混沌属性": {
        "visual": "Pure PRIMORDIAL CHAOS MANIFESTATION, swirling void energy in impossible rainbow colors, creation and destruction duality, cosmic chaos orb with lightning and stars, reality bending around the entity",
        "style": "masterpiece, primordial chaos, swirling void energy, creation and destruction, cosmic chaos entity, impossible colors, universe origin power"
    },
    "宇宙之源": {
        "visual": "The COSMIC SOURCE, a brilliant white singularity of creation, miniature galaxies and nebulae forming around it, universe origin point, stellar nexus with swirling cosmic dust and stars",
        "style": "masterpiece, cosmic birth, universe origin, brilliant singularity, galaxies forming, cosmic energy, stellar nexus, universe creation artwork"
    },
    "时空裂缝": {
        "visual": "A massive RIFT IN SPACETIME, showing parallel dimensions, clockwork gears mixed with dimensional portals, time flowing backwards visualization, temporal fracture with blue and golden energy",
        "style": "masterpiece, spacetime rift, dimensional fracture, time-space break, clockwork and portals, temporal anomaly, cosmic rift artwork"
    },
    "虚无之主": {
        "visual": "The LORD OF NOTHINGNESS, a void silhouette figure made of pure emptiness, existence dissolving around it, shadow of the void with dark aura, entity of pure emptiness",
        "style": "masterpiece, lord of void, nothingness entity, void silhouette, existence dissolving, dark aura, master of emptiness, cosmic void artwork"
    },
    "因果律者": {
        "visual": "The ARBITER OF KARMA, glowing golden scales of cause and effect, threads of fate in hands, destiny weaver figure with cosmic judge robes, balanced scales with glowing runes",
        "style": "masterpiece, karma arbiter, scales of cause and effect, threads of fate, destiny weaver, cosmic judge, fate controller artwork"
    },
    "神格化身": {
        "visual": "A mortal vessel BECOMING GOD, divine golden light transformation, ascending figure with glowing divinity, golden ascension light surrounding, god incarnation with radiant aura",
        "style": "masterpiece, mortal becoming god, divine transformation, golden ascension, god incarnation, divine light, god-tier transformation artwork"
    },
}

# hc 品质 - 混沌特殊武魂
HC_PROMPTS = {
    "如意环": {
        "visual": "A mystical JADE RING of hidden power, circular jade ring glowing with purple energy field, ancient runes floating around, domain expanding aura, mystical ring artifact with ethereal glow",
        "style": "masterpiece, mystical jade ring, purple energy field, glowing runes, domain expanding, enchanted artifact, mysterious ring artwork"
    },
    "幽冥之眼": {
        "visual": "A GIANT SPECTRAL EYE from the underworld, glowing ghostly blue pupil, seeing through all illusions, floating ethereal eye with dark aura, mysterious all-seeing eye with spectral flames",
        "style": "masterpiece, giant spectral eye, ghostly blue gaze, underworld eye, all-seeing eye, spirit eye, mystical vision artwork"
    },
    "九心海棠": {
        "visual": "A magical NINE-PETALED CRABAPPLE FLOWER, each petal glowing with healing pink light, sacred petals floating in air, mystical flower of life with divine aura, healing energy radiating",
        "style": "masterpiece, nine-petaled flower, healing pink light, sacred petals, mystical flower of life, divine healing aura, enchanted flower artwork"
    },
    "奇茸通天菊": {
        "visual": "A miraculous GOLDEN CHRYSANTHEMUM reaching upward to heaven, each golden petal glowing with spiritual energy, celestial flower reaching sky, divine chrysanthemum with radiant light",
        "style": "masterpiece, golden chrysanthemum, reaching to heaven, spiritual energy, celestial flower, divine botanical, mystical flower artwork"
    },
    "无形剑意": {
        "visual": "INVISIBLE SWORD INTENT materializing as air ripples and pressure waves, sword aura cutting through space, invisible blade force visible as spatial distortions, sword qi visualization with slashing effects",
        "style": "masterpiece, invisible sword intent, air ripples, sword aura, spatial cuts, sword qi, intangible blade force, mystical sword energy artwork"
    },
    "千机算盘": {
        "visual": "An ancient WOODEN ABACUS of thousand mechanisms, each counting bead glowing with golden light, predicting future destiny, mystical calculator artifact with floating calculation symbols, divine abacus with cosmic numbers",
        "style": "masterpiece, ancient abacus, glowing beads, mystical calculator, predicting future, divine calculation, enchanted abacus artwork"
    },
    "月影神狐": {
        "visual": "A mystical NINE-TAILED FOX SPIRIT under moonlight, silver fur glowing with lunar energy, shadow illusions around, nine tails forming behind, lunar fox with mystical aura and moon crown",
        "style": "masterpiece, nine-tailed fox, moonlight, silver fur, lunar energy, shadow illusions, mystical fox spirit, celestial fox artwork"
    },
    "幽莲血心": {
        "visual": "A blood-red LOTUS from the netherworld, crimson petals with dark purple energy, life force siphoning aura, dark red lotus flower floating on dark water, netherworld lotus with ghostly glow",
        "style": "masterpiece, blood-red lotus, netherworld flower, crimson petals, dark energy, life force siphon, mystical dark lotus artwork"
    },
}

# ha 品质 - 昊天巅峰武魂
HA_PROMPTS = {
    "昊天九绝锤": {
        "visual": "The ULTIMATE HAOTIAN WAR HAMMER, massive divine hammer with nine destruction seals glowing on surface, chaos energy storm swirling around, legendary warhammer with overwhelming power aura, ultimate hammer of legends",
        "style": "masterpiece, ultimate Haotian hammer, nine destruction seals, chaos energy, legendary warhammer, overwhelming power, divine weapon artwork"
    },
    "饕餮神牛": {
        "visual": "The TAOTIE DIVINE BULL, massive ox with devouring dark energy swirling around mouth, ancient beast of gluttony with glowing eyes, mystical ox with chaos aura, divine bull of gluttony with dark swirls",
        "style": "masterpiece, Taotie divine bull, devouring energy, ancient beast, gluttony demon, mystical ox, chaotic creature artwork"
    },
    "死神镰刀": {
        "visual": "The GRIM REAPER'S SCYTHE, massive dark scythe with blade of death energy, soul chains attached to handle, dark mysterious scythe floating in air, death's scythe with ghostly aura",
        "style": "masterpiece, grim reaper scythe, blade of death, soul chains, dark mysterious weapon, death artifact, infernal scythe artwork"
    },
    "虚空裂爪": {
        "visual": "MASSIVE DARK CLAWS tearing through void space, dimensional rifts appearing from claw marks, dark energy claw slashes with spatial fractures, void-tearing claws with black and purple energy",
        "style": "masterpiece, massive dark claws, tearing void space, dimensional rifts, spatial fractures, void claws, dark energy slashes artwork"
    },
    "天魔琴": {
        "visual": "A DEMONIC ANCIENT GUQIN ZITHER, strings of dark purple energy, sound waves visible as ripples in air, evil musical instrument with dark aura, demonic qin with glowing dark strings",
        "style": "masterpiece, demonic guqin, dark energy strings, sound waves, evil musical instrument, mystical zither, infernal instrument artwork"
    },
    "混沌神炉": {
        "visual": "A PRIMORDIAL CHAOS FURNACE, dark cauldron with void energy swirling inside, swallowing and refining all creation, mystical alchemy furnace with cosmic fire, chaos cauldron with swirling void",
        "style": "masterpiece, primordial chaos furnace, swallowing energy, alchemy cauldron, cosmic fire, mystical furnace, divine refinery artwork"
    },
}

# twin 品质 - 双生武魂
TWIN_PROMPTS = {
    "蓝银草+昊天锤": {
        "visual": "Silver-blue grass vines and divine war hammer FUSED TOGETHER in harmony, nature green vines wrapping around golden hammer head and handle, dual aura of plant and power, combined weapon and plant artifact with glowing fusion energy",
        "style": "masterpiece, silver grass and war hammer fusion, dual aura, plant and power united, combined weapon, yin-yang fusion, legendary twin martial soul artwork"
    },
    "圣天使+堕天使": {
        "visual": "Holy pure angel and fallen dark angel STANDING BACK TO BACK, white light wings on left, black dark wings on right, yin yang light dark balance, dual angelic beings with contrasting auras, light and darkness in perfect equilibrium",
        "style": "masterpiece, holy and fallen angel, back to back, white and black wings, yin yang balance, dual angels, light and dark duality, twin martial soul artwork"
    },
    "金龙+银龙": {
        "visual": "Golden dragon and silver dragon INTERTWINED in yin-yang dance, two serpentine dragons spiraling around each other, dual dragon guardians with glowing scales, golden and silver dragons with cosmic energy, twin dragons in harmony",
        "style": "masterpiece, golden and silver dragons, intertwined, yin-yang dance, dual dragons, twin dragon guardians, legendary twin martial soul artwork"
    },
    "冰火双凤": {
        "visual": "Ice blue phoenix and fire red phoenix SPIRALING TOGETHER, elemental harmony of cold and heat, dual phoenixes with contrasting auras, ice and fire birds with fusion energy, yin-yang phoenix duality",
        "style": "masterpiece, ice and fire phoenixes, spiraling together, elemental harmony, dual phoenixes, yin-yang birds, twin martial soul artwork"
    },
    "雷剑双生": {
        "visual": "A sword CRACKLING WITH BLUE THUNDER AND LIGHTNING, storm and steel combined, lightning blade weapon with electric aura, thunder sword with glowing electric runes, storm blade with lightning effects",
        "style": "masterpiece, thunder sword, lightning blade, storm and steel, electric aura, lightning weapon, thunder blade artwork"
    },
    "星辰+混沌": {
        "visual": "Orderly golden starlight particles MERGING WITH CHAOTIC DARK VOID, cosmos and entropy in balance, stellar chaos fusion, starlight and void combining, order and chaos duality with glowing energy",
        "style": "masterpiece, starlight and chaos, cosmic fusion, order and entropy, stellar chaos, universe duality, twin cosmic forces artwork"
    },
    "幽冥+圣光": {
        "visual": "Dark nether purple energy MEETING SACRED GOLDEN HOLY LIGHT, death and rebirth cycle, dual contrasting energy aura, dark and light fusion, yin-yang energy duality with glowing halo",
        "style": "masterpiece, dark nether and holy light, death and rebirth, dual energy, yin-yang fusion, light and dark duality, twin energy artwork"
    },
    "时间+空间": {
        "visual": "Clockwork golden gears and dimensional blue portals COMBINED, time-space fabric weaving, temporal and spatial fusion, time clock and space portal merging, temporal spatial duality with cosmic energy",
        "style": "masterpiece, clockwork gears and space portals, time and space fusion, temporal spatial, cosmic duality, universe laws, twin cosmic powers artwork"
    },
    "神火+神冰": {
        "visual": "Sacred golden fire and divine ice crystals IN PERFECT BALANCE, extreme hot and cold duality, fire and ice elements balanced, divine fire and ice with fusion energy, yin-yang fire and ice duality",
        "style": "masterpiece, sacred fire and divine ice, perfect balance, extreme duality, fire and ice elements, yin-yang elements, twin elemental powers artwork"
    },
}

# 所有需要生成的图标
ALL_PROMPTS = {
    "apex": ("/Users/shunzhiyuanweizhu/Desktop/1/public/souls/apex", APEX_PROMPTS),
    "hc": ("/Users/shunzhiyuanweizhu/Desktop/1/public/souls/hc", HC_PROMPTS),
    "ha": ("/Users/shunzhiyuanweizhu/Desktop/1/public/souls/ha", HA_PROMPTS),
    "twin": ("/Users/shunzhiyuanweizhu/Desktop/1/public/souls/twin", TWIN_PROMPTS),
}


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
            "prompt_extend": True,  # 开启 prompt 扩写
            "size": size
        }
    }
    
    try:
        response = requests.post(BASE_URL, headers=headers, json=payload, timeout=120)
        response.raise_for_status()
        result = response.json()
        
        if "output" in result:
            output = result["output"]
            
            if "choices" in output and len(output["choices"]) > 0:
                choice = output["choices"][0]
                if "message" in choice and "content" in choice["message"]:
                    content = choice["message"]["content"]
                    for item in content:
                        if isinstance(item, dict) and "image" in item:
                            return item["image"], None
            
            if "message" in output:
                return None, output["message"]
        
        if "code" in result:
            return None, f"{result.get('code')}: {result.get('message')}"
        
        return None, f"Unknown response: {str(result)[:200]}"
    except Exception as e:
        return None, f"Error: {str(e)}"


def download_and_convert(image_url, output_path):
    """下载图片并转换为 WebP 格式"""
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(image_url, headers=headers, timeout=60)
        response.raise_for_status()
        
        temp_path = GEN_DIR / "temp.webp"
        temp_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(temp_path, 'wb') as f:
            f.write(response.content)
        
        img = Image.open(temp_path)
        
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        pixels = img.load()
        width, height = img.size
        
        for py in range(height):
            for px in range(width):
                r, g, b, a = pixels[px, py]
                if g > 200 and r < 100 and b < 100:
                    pixels[px, py] = (r, g, b, 0)
        
        img.save(output_path, 'WEBP', quality=95, method=6)
        temp_path.unlink(missing_ok=True)
        
        return img.size, None
    except Exception as e:
        return None, str(e)


def main():
    total = sum(len(prompts) for _, (_, prompts) in enumerate(ALL_PROMPTS.items()))
    done = 0
    success = 0
    fail = 0
    
    print(f"{'='*60}")
    print(f"重新生成 Apex/HC/HA/Twin 品质图标")
    print(f"总计: 31 个")
    print(f"{'='*60}\n")
    
    for quality, (output_dir, prompts) in ALL_PROMPTS.items():
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        print(f"\n▶ 正在生成 {quality.upper()} 品质 ({len(prompts)} 个)...")
        
        for name, data in prompts.items():
            done += 1
            
            filename = f"{name}.webp"
            filepath = output_path / filename
            
            prompt = (
                f"Game icon design: {data['visual']}. "
                f"Art style: {data['style']}. "
                f"Centered composition on pure solid green screen background (#00FF00). "
                f"Isolated object, no text, no watermark, no border, no frame. "
                f"Professional mobile game UI icon, high quality, detailed artwork."
            )
            
            print(f"[{done}/31] {name:20s}... ", end="", flush=True)
            
            image_url, err = generate_image(prompt, size="1024*1024")
            
            if image_url:
                size, conv_err = download_and_convert(image_url, filepath)
                
                if size:
                    print(f"✓ 完成 [{size[0]}x{size[1]}]")
                    success += 1
                else:
                    print(f"✗ 转换失败: {conv_err}")
                    fail += 1
            else:
                print(f"✗ API 失败: {err}")
                fail += 1
            
            if done < 31:
                time.sleep(5)
    
    print(f"\n{'='*60}")
    print(f"生成完成! 成功: {success}, 失败: {fail}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()

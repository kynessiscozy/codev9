#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
重新生成 triple（三生）品质的武魂图标
使用更精准的 prompt 和更高的图片质量
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
OUTPUT_DIR = Path("/Users/shunzhiyuanweizhu/Desktop/1/public/souls/triple")
GEN_DIR = Path("/Users/shunzhiyuanweizhu/Desktop/1/generated")

# triple 品质的详细英文描述（改进版）
TRIPLE_PROMPTS = {
    "冰火雷三生龙": {
        "visual": "A magnificent divine dragon with THREE heads: left head breathing ice blue frost, middle head breathing golden fire, right head crackling with purple lightning. Triple elemental dragon body with scales that transition between ice blue, fire red, and lightning purple. Massive dragon wings spread wide, dragon claws gripping elemental orbs. The most powerful dragon in existence, three elemental powers combined.",
        "style": "ultra-detailed masterpiece, three-headed dragon, ice fire lightning elements, divine dragon scales, cinematic lighting, AAA game quality legendary creature artwork"
    },
    "昊天极光混沌三生": {
        "visual": "The ULTIMATE Haotian war hammer floating in cosmic aurora borealis. The hammer head glows with three powers: chaotic void energy (swirling purple-black), aurora rainbow light (flowing green-pink-blue), and divine golden radiance. Nine ancient seals on hammer glow simultaneously. Background shows cosmic chaos and aurora merging. The most powerful weapon in the universe.",
        "style": "hyper-realistic legendary weapon, glowing mystical hammer, aurora borealis effects, chaos energy swirling, divine radiance, god-tier artifact, ultra-detailed fantasy weapon artwork, masterpiece quality"
    },
    "神圣幽冥混沌三生": {
        "visual": "A divine trinity convergence: LEFT SIDE - pure white holy angel wings and golden light; RIGHT SIDE - dark purple nether ghost flames and black wings; CENTER - swirling rainbow chaos void energy connecting both. Three divine domains united as one supreme entity. Yin-yang-trinity composition, overwhelming divine presence.",
        "style": "masterpiece triple-composition artwork, holy light and dark nether energy and chaos void merging, divine convergence, god-tier fantasy art, ultra-detailed,三部分融合, 三位一体, legendary artwork"
    },
    "时空因果三生": {
        "visual": "A cosmic trinity manifestation: TOP - golden clock with floating clockwork gears representing TIME; MIDDLE - blue dimensional portal with space folds representing SPACE; BOTTOM - glowing golden scales of judgment representing CAUSE-EFFECT KARMA. Three cosmic laws orbiting each other, forming a supreme triangular formation. Universe laws personified.",
        "style": "masterpiece cosmic artwork, three cosmic laws trinity, time clock and space portal and karma scales, universe laws, divine cosmic entity, ultra-detailed fantasy cosmic art, legendary masterpiece"
    },
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
            "prompt_extend": True,  # 开启 prompt 扩写，获得更好效果
            "size": size
        }
    }
    
    try:
        response = requests.post(BASE_URL, headers=headers, json=payload, timeout=120)
        response.raise_for_status()
        result = response.json()
        
        # 解析响应 - DashScope 格式
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
    except requests.exceptions.RequestException as e:
        return None, f"Request error: {str(e)}"
    except Exception as e:
        return None, f"Error: {str(e)}"


def download_and_convert(image_url, output_path):
    """下载图片并转换为 WebP 格式"""
    try:
        # 下载
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(image_url, headers=headers, timeout=60)
        response.raise_for_status()
        
        # 保存临时 PNG
        temp_path = GEN_DIR / "temp_triple.png"
        temp_path.parent.mkdir(parents=True, exist_ok=True)
        with open(temp_path, 'wb') as f:
            f.write(response.content)
        
        # 转换为 WebP
        img = Image.open(temp_path)
        
        # 确保 RGBA 模式
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # 去除绿色背景（#00FF00）
        pixels = img.load()
        width, height = img.size
        
        for py in range(height):
            for px in range(width):
                r, g, b, a = pixels[px, py]
                # 检测绿色背景
                if g > 200 and r < 100 and b < 100:
                    pixels[px, py] = (r, g, b, 0)
        
        img.save(output_path, 'WEBP', quality=95, method=6)
        temp_path.unlink(missing_ok=True)
        
        return img.size, None
    except Exception as e:
        return None, str(e)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    GEN_DIR.mkdir(parents=True, exist_ok=True)
    
    total = len(TRIPLE_PROMPTS)
    success = 0
    fail = 0
    
    print(f"{'='*60}")
    print(f"重新生成 Triple（三生）品质图标")
    print(f"数量: {total} 个")
    print(f"{'='*60}\n")
    
    for i, (name, data) in enumerate(TRIPLE_PROMPTS.items(), 1):
        filename = f"{name}.webp"
        filepath = OUTPUT_DIR / filename
        
        # 构建完整 prompt
        prompt = (
            f"Game icon design: {data['visual']}. "
            f"Art style: {data['style']}. "
            f"Centered composition on pure solid green screen background (#00FF00). "
            f"Isolated object, no text, no watermark, no border, no frame. "
            f"Professional mobile game UI icon, high quality, detailed artwork."
        )
        
        print(f"[{i}/{total}] {name:20s}... ", end="", flush=True)
        
        # 生成图片
        image_url, err = generate_image(prompt, size="1024*1024")
        
        if image_url:
            # 下载并转换
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
        
        # 避免频率限制
        if i < total:
            time.sleep(5)
    
    print(f"\n{'='*60}")
    print(f"生成完成! 成功: {success}, 失败: {fail}")
    print(f"输出目录: {OUTPUT_DIR}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()

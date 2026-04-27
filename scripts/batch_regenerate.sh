#!/bin/bash
# 分批生成 apex/hc/ha/twin 图标
# 每个品质单独运行，避免单次运行时间过长

set -e

API_KEY="${DASHSCOPE_API_KEY:-sk-47a94718bb8d4e7d8a747185f6a6e574}"
export DASHSCOPE_API_KEY="$API_KEY"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "============================================================"
echo "分批生成 Apex/HC/HA/Twin 品质图标"
echo "============================================================"
echo ""

# 生成 apex (8个)
echo "▶ 第 1 步: 生成 APEX 品质 (8个)..."
cd "$PROJECT_DIR"
python3 -c "
import os, sys, time, requests
from pathlib import Path
from PIL import Image

API_KEY = os.environ.get('DASHSCOPE_API_KEY', '$API_KEY')
BASE_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation'

APEX = {
    '神圣天使': ('The SUPREME HOLY ANGEL, infinite pure white light wings, divine halo, masterpiece', 'ultra-detailed, infinite light wings, divine halo, god-tier design'),
    '柔骨兔王': ('The MOON RABBIT KING, translucent jade body, lunar energy', 'moon rabbit deity, translucent jade, lunar energy, ethereal grace'),
    '混沌属性': ('Pure PRIMORDIAL CHAOS, swirling void energy, rainbow colors', 'primordial chaos manifestation, swirling void, creation and destruction'),
    '宇宙之源': ('The COSMIC SOURCE, white singularity, galaxies forming', 'cosmic birth, universe origin, brilliant singularity, stellar nexus'),
    '时空裂缝': ('A massive RIFT IN SPACETIME, clockwork and portals', 'spacetime rift, dimensional fracture, time-space break'),
    '虚无之主': ('The LORD OF NOTHINGNESS, void silhouette, dark aura', 'lord of void, nothingness entity, void silhouette'),
    '因果律者': ('The ARBITER OF KARMA, golden scales, threads of fate', 'karma arbiter, scales of cause and effect, threads of fate'),
    '神格化身': ('A mortal BECOMING GOD, divine golden light transformation', 'mortal becoming god, divine transformation, golden ascension'),
}

def generate(prompt):
    headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {API_KEY}'}
    payload = {'model': 'z-image-turbo', 'input': {'messages': [{'role': 'user', 'content': [{'text': prompt}]}]}, 'parameters': {'prompt_extend': True, 'size': '1024*1024'}}
    resp = requests.post(BASE_URL, headers=headers, json=payload, timeout=120)
    result = resp.json()
    if 'output' in result and 'choices' in result['output']:
        content = result['output']['choices'][0]['message']['content']
        for item in content:
            if 'image' in item:
                return item['image']
    return None

def download_and_convert(url, path):
    headers = {'User-Agent': 'Mozilla/5.0'}
    resp = requests.get(url, headers=headers, timeout=60)
    temp = Path('generated/temp.png')
    temp.parent.mkdir(exist_ok=True)
    with open(temp, 'wb') as f:
        f.write(resp.content)
    img = Image.open(temp)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    pixels = img.load()
    w, h = img.size
    for py in range(h):
        for px in range(w):
            r, g, b, a = pixels[px, py]
            if g > 200 and r < 100 and b < 100:
                pixels[px, py] = (r, g, b, 0)
    img.save(path, 'WEBP', quality=95, method=6)
    temp.unlink(missing_ok=True)
    return img.size

output_dir = Path('public/souls/apex')
output_dir.mkdir(parents=True, exist_ok=True)

for i, (name, (visual, style)) in enumerate(APEX.items(), 1):
    print(f'[{i}/8] {name}...', end=' ', flush=True)
    prompt = f'Game icon: {visual}. Style: {style}. Green screen #00FF00. No text.'
    url = generate(prompt)
    if url:
        size = download_and_convert(url, output_dir / f'{name}.webp')
        print(f'OK [{size[0]}x{size[1]}]')
    else:
        print('FAIL')
    if i < 8:
        time.sleep(5)

print('APEX 完成!')
" 2>&1 | grep -v "NotOpenSSLWarning\|warnings.warn"
echo ""

# 生成 hc (8个)
echo "▶ 第 2 步: 生成 HC 品质 (8个)..."
cd "$PROJECT_DIR"
python3 -c "
import os, sys, time, requests
from pathlib import Path
from PIL import Image

API_KEY = os.environ.get('DASHSCOPE_API_KEY', '$API_KEY')
BASE_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation'

HC = {
    '如意环': ('A mystical JADE RING, purple energy field, masterpiece', 'mystical jade ring, purple energy, glowing runes'),
    '幽冥之眼': ('A GIANT SPECTRAL EYE, glowing ghostly blue, masterpiece', 'giant spectral eye, ghostly blue gaze, all-seeing eye'),
    '九心海棠': ('A magical NINE-PETaled CRABAPPLE FLOWER, pink light', 'nine-petaled flower, healing pink light, sacred petals'),
    '奇茸通天菊': ('A miraculous GOLDEN CHRYSANTHEMUM, spiritual energy', 'golden chrysanthemum, reaching to heaven, spiritual energy'),
    '无形剑意': ('INVISIBLE SWORD INTENT, air ripples, sword aura', 'invisible sword intent, air ripples, sword qi'),
    '千机算盘': ('An ancient WOODEN ABACUS, glowing beads, masterpiece', 'ancient abacus, glowing beads, mystical calculator'),
    '月影神狐': ('A mystical NINE-TAILED FOX, silver fur, lunar energy', 'nine-tailed fox, moonlight, silver fur, lunar energy'),
    '幽莲血心': ('A blood-red LOTUS, crimson petals, dark energy', 'blood-red lotus, netherworld flower, crimson petals'),
}

def generate(prompt):
    headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {API_KEY}'}
    payload = {'model': 'z-image-turbo', 'input': {'messages': [{'role': 'user', 'content': [{'text': prompt}]}]}, 'parameters': {'prompt_extend': True, 'size': '1024*1024'}}
    resp = requests.post(BASE_URL, headers=headers, json=payload, timeout=120)
    result = resp.json()
    if 'output' in result and 'choices' in result['output']:
        content = result['output']['choices'][0]['message']['content']
        for item in content:
            if 'image' in item:
                return item['image']
    return None

def download_and_convert(url, path):
    headers = {'User-Agent': 'Mozilla/5.0'}
    resp = requests.get(url, headers=headers, timeout=60)
    temp = Path('generated/temp.png')
    temp.parent.mkdir(exist_ok=True)
    with open(temp, 'wb') as f:
        f.write(resp.content)
    img = Image.open(temp)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    pixels = img.load()
    w, h = img.size
    for py in range(h):
        for px in range(w):
            r, g, b, a = pixels[px, py]
            if g > 200 and r < 100 and b < 100:
                pixels[px, py] = (r, g, b, 0)
    img.save(path, 'WEBP', quality=95, method=6)
    temp.unlink(missing_ok=True)
    return img.size

output_dir = Path('public/souls/hc')
output_dir.mkdir(parents=True, exist_ok=True)

for i, (name, (visual, style)) in enumerate(HC.items(), 1):
    print(f'[{i}/8] {name}...', end=' ', flush=True)
    prompt = f'Game icon: {visual}. Style: {style}. Green screen #00FF00. No text.'
    url = generate(prompt)
    if url:
        size = download_and_convert(url, output_dir / f'{name}.webp')
        print(f'OK [{size[0]}x{size[1]}]')
    else:
        print('FAIL')
    if i < 8:
        time.sleep(5)

print('HC 完成!')
" 2>&1 | grep -v "NotOpenSSLWarning\|warnings.warn"
echo ""

# 生成 ha (6个)
echo "▶ 第 3 步: 生成 HA 品质 (6个)..."
cd "$PROJECT_DIR"
python3 -c "
import os, sys, time, requests
from pathlib import Path
from PIL import Image

API_KEY = os.environ.get('DASHSCOPE_API_KEY', '$API_KEY')
BASE_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation'

HA = {
    '昊天九绝锤': ('The ULTIMATE HAOTIAN HAMMER, nine seals, masterpiece', 'ultimate Haotian hammer, nine destruction seals, chaos energy'),
    '饕餮神牛': ('The TAOTIE DIVINE BULL, devouring energy, masterpiece', 'Taotie divine bull, devouring dark energy, ancient beast'),
    '死神镰刀': ('The GRIM REAPER SCYTHE, death energy, masterpiece', 'grim reaper scythe, blade of death, soul chains'),
    '虚空裂爪': ('MASSIVE DARK CLAWS, tearing void space, masterpiece', 'massive dark claws, tearing void, dimensional rifts'),
    '天魔琴': ('A DEMONIC GUQIN ZITHER, dark purple strings', 'demonic guqin, dark energy strings, sound waves'),
    '混沌神炉': ('A PRIMORDIAL CHAOS FURNACE, void energy', 'primordial chaos furnace, alchemy cauldron, cosmic fire'),
}

def generate(prompt):
    headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {API_KEY}'}
    payload = {'model': 'z-image-turbo', 'input': {'messages': [{'role': 'user', 'content': [{'text': prompt}]}]}, 'parameters': {'prompt_extend': True, 'size': '1024*1024'}}
    resp = requests.post(BASE_URL, headers=headers, json=payload, timeout=120)
    result = resp.json()
    if 'output' in result and 'choices' in result['output']:
        content = result['output']['choices'][0]['message']['content']
        for item in content:
            if 'image' in item:
                return item['image']
    return None

def download_and_convert(url, path):
    headers = {'User-Agent': 'Mozilla/5.0'}
    resp = requests.get(url, headers=headers, timeout=60)
    temp = Path('generated/temp.png')
    temp.parent.mkdir(exist_ok=True)
    with open(temp, 'wb') as f:
        f.write(resp.content)
    img = Image.open(temp)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    pixels = img.load()
    w, h = img.size
    for py in range(h):
        for px in range(w):
            r, g, b, a = pixels[px, py]
            if g > 200 and r < 100 and b < 100:
                pixels[px, py] = (r, g, b, 0)
    img.save(path, 'WEBP', quality=95, method=6)
    temp.unlink(missing_ok=True)
    return img.size

output_dir = Path('public/souls/ha')
output_dir.mkdir(parents=True, exist_ok=True)

for i, (name, (visual, style)) in enumerate(HA.items(), 1):
    print(f'[{i}/6] {name}...', end=' ', flush=True)
    prompt = f'Game icon: {visual}. Style: {style}. Green screen #00FF00. No text.'
    url = generate(prompt)
    if url:
        size = download_and_convert(url, output_dir / f'{name}.webp')
        print(f'OK [{size[0]}x{size[1]}]')
    else:
        print('FAIL')
    if i < 6:
        time.sleep(5)

print('HA 完成!')
" 2>&1 | grep -v "NotOpenSSLWarning\|warnings.warn"
echo ""

# 生成 twin (9个)
echo "▶ 第 4 步: 生成 TWIN 品质 (9个)..."
cd "$PROJECT_DIR"
python3 -c "
import os, sys, time, requests
from pathlib import Path
from PIL import Image

API_KEY = os.environ.get('DASHSCOPE_API_KEY', '$API_KEY')
BASE_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation'

TWIN = {
    '蓝银草+昊天锤': ('Silver grass and divine hammer FUSED, masterpiece', 'silver grass and hammer fusion, dual aura, yin-yang'),
    '圣天使+堕天使': ('Holy and fallen angel BACK TO BACK, masterpiece', 'holy and fallen angel, light and dark, yin-yang balance'),
    '金龙+银龙': ('Golden and silver dragons INTERTWINED, masterpiece', 'golden and silver dragons, twin dragons, yin-yang dance'),
    '冰火双凤': ('Ice and fire phoenixes SPIRALING, masterpiece', 'ice and fire phoenixes, dual phoenixes, elemental harmony'),
    '雷剑双生': ('A sword with THUNDER AND LIGHTNING, masterpiece', 'thunder sword, lightning blade, storm and steel'),
    '星辰+混沌': ('Starlight and chaos VOID MERGING, masterpiece', 'starlight and chaos, cosmic fusion, order and entropy'),
    '幽冥+圣光': ('Dark nether and holy LIGHT, masterpiece', 'dark nether and holy light, death and rebirth, yin-yang'),
    '时间+空间': ('Clockwork and space PORTALS, masterpiece', 'clockwork gears and space portals, time and space'),
    '神火+神冰': ('Sacred fire and divine ICE, masterpiece', 'sacred fire and divine ice, extreme duality, yin-yang'),
}

def generate(prompt):
    headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {API_KEY}'}
    payload = {'model': 'z-image-turbo', 'input': {'messages': [{'role': 'user', 'content': [{'text': prompt}]}]}, 'parameters': {'prompt_extend': True, 'size': '1024*1024'}}
    resp = requests.post(BASE_URL, headers=headers, json=payload, timeout=120)
    result = resp.json()
    if 'output' in result and 'choices' in result['output']:
        content = result['output']['choices'][0]['message']['content']
        for item in content:
            if 'image' in item:
                return item['image']
    return None

def download_and_convert(url, path):
    headers = {'User-Agent': 'Mozilla/5.0'}
    resp = requests.get(url, headers=headers, timeout=60)
    temp = Path('generated/temp.png')
    temp.parent.mkdir(exist_ok=True)
    with open(temp, 'wb') as f:
        f.write(resp.content)
    img = Image.open(temp)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    pixels = img.load()
    w, h = img.size
    for py in range(h):
        for px in range(w):
            r, g, b, a = pixels[px, py]
            if g > 200 and r < 100 and b < 100:
                pixels[px, py] = (r, g, b, 0)
    img.save(path, 'WEBP', quality=95, method=6)
    temp.unlink(missing_ok=True)
    return img.size

output_dir = Path('public/souls/twin')
output_dir.mkdir(parents=True, exist_ok=True)

for i, (name, (visual, style)) in enumerate(TWIN.items(), 1):
    print(f'[{i}/9] {name}...', end=' ', flush=True)
    prompt = f'Game icon: {visual}. Style: {style}. Green screen #00FF00. No text.'
    url = generate(prompt)
    if url:
        size = download_and_convert(url, output_dir / f'{name}.webp')
        print(f'OK [{size[0]}x{size[1]}]')
    else:
        print('FAIL')
    if i < 9:
        time.sleep(5)

print('TWIN 完成!')
" 2>&1 | grep -v "NotOpenSSLWarning\|warnings.warn"

echo ""
echo "============================================================"
echo "所有图标生成完成!"
echo "============================================================"

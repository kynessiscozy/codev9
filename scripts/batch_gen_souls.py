#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
武魂图标批量生成脚本
- 暗黑幻想风格，透明背景，无边距
- 主体实心，特效（光晕/粒子）半透明
- 支持断点续传（已生成的跳过）
- 支持多种后端：openai / hunyuan / sd

用法:
  python batch_gen_souls.py --backend openai --api-key YOUR_KEY
  python batch_gen_souls.py --backend hunyuan --api-key YOUR_KEY
  python batch_gen_souls.py --backend sd --sd-url http://127.0.0.1:7860
  python batch_gen_souls.py --dry-run   # 只打印 prompt，不生成
"""

import os
import sys
import time
import argparse
import requests
import base64
from pathlib import Path

# ── 配置 ─────────────────────────────────────
OUTPUT_BASE = Path(__file__).parent.parent / "public" / "souls"
IMAGE_SIZE = "1024x1024"
REQUEST_INTERVAL = 3   # 秒，避免限流

# ── 风格模板 ──────────────────────────────────
# 主体实心不透明，特效部位半透明
STYLE = (
    "Dark fantasy game icon, square composition, transparent background, "
    "no border, no frame, isolated on transparent. "
    "Main subject is SOLID and OPAQUE, "
    "only aura/glow/particle effects are SEMI-TRANSPARENT. "
    "Highly detailed, game equipment icon style, centered composition, "
    "dark atmosphere, mystical, intricate details, "
    "PNG with alpha channel, clean edges, no text"
)

# ── 101 个武魂的英文 prompt ──────────────────
# 格式: (输出路径(无扩展名), prompt 描述)
SOUL_LIST = [
    # common (13)
    ("common/蓝银草",   "a silvery-blue grass blade, solid plant body, "
                           "with semi-transparent blue ethereal particles floating around, "
                           "magical grassland aura, intricate blade details"),
    ("common/镰刀",      "a rustic iron sickle, solid metal blade with wooden handle, "
                           "with semi-transparent dark earth aura around the blade edge, "
                           "peasant tool, muddy dark texture"),
    ("common/香草",      "a vanilla orchid flower, solid petals, "
                           "with semi-transparent pale green fragrance aura, "
                           "gentle nature spirit, soft glowing center"),
    ("common/木棍",      "a rough wooden stick, solid wood grain texture, "
                           "plain and humble, no special effects, earth brown tone"),
    ("common/含羞草",    "a mimosa plant with delicate leaves, solid green foliage, "
                           "with semi-transparent green defensive aura when touched, "
                           "sensitive plant, nature defense"),
    ("common/铁锤",      "a heavy iron hammer, solid dark metal head with wooden handle, "
                           "with semi-transparent golden power aura around the head, "
                           "raw physical force, sturdy"),
    ("common/渔网",      "a coarse fishing net, solid rope and knot texture, "
                           "with semi-transparent water-flow aura around the mesh, "
                           "control-type tool, woven dark fibers"),
    ("common/蒲公英",     "a dandelion flower head, solid white downy ball, "
                           "with semi-transparent white wind aura and floating seeds, "
                           "nature wind spirit, soft and gentle"),
    ("common/芦苇杆",     "a vertical reed stalk, solid green stalk with node texture, "
                           "with semi-transparent water-ripple aura around it, "
                           "flexible and resilient, riverside plant"),
    ("common/铁锅",      "a cast iron cooking pot, solid dark iron texture, "
                           "with semi-transparent golden reflection aura on the surface, "
                           "sturdy and plain, earthy kitchen tool"),
    ("common/荆棘藤",     "a thorny vine whip, solid green vine with sharp thorns, "
                           "with semi-transparent dark green poison aura along the stem, "
                           "entangling and toxic, dangerous plant"),
    ("common/石头",      "a rough natural granite stone, solid rock texture, "
                           "with semi-transparent earth-yellow aura around it, "
                           "primitive and unbreakable, heavy"),
    ("common/陶笛",       "a small ceramic ocarina flute, solid terracotta clay texture, "
                           "with semi-transparent sound-wave aura rippling outward, "
                           "warm orange-brown pottery, musical"),

    # rare (20)
    ("rare/白虎",        "a white tiger beast head, solid white fur with black stripes, "
                           "fierce glowing blue eyes, with semi-transparent dark blue aura, "
                           "majestic and powerful, sharp fangs, detailed fur"),
    ("rare/火凤凰",       "a fire phoenix, solid red and gold feathers, "
                           "with semi-transparent blazing flame aura around wings, "
                           "rebirth fire spirit, divine flame, glowing eyes"),
    ("rare/冰凤凰",       "an ice phoenix, solid white and ice-blue feathers, "
                           "with semi-transparent freezing frost aura around wings, "
                           "ice crystals floating, cold blue glow, elegant"),
    ("rare/盘龙棍",       "a dragon-wrapped staff, solid dark wood with carved dragon, "
                           "with semi-transparent dark red destructive aura along the shaft, "
                           "ancient weapon, dragon scales detailed"),
    ("rare/七宝琉璃塔",   "a seven-story glazed pagoda, solid ceramic tower body, "
                           "with semi-transparent multicolor divine light aura, "
                           "auxiliary divine artifact, intricate architecture"),
    ("rare/幽冥灵猫",      "a dark spectral cat, solid black fur with purple ghost marks, "
                           "glowing purple eyes, with semi-transparent dark shadow aura, "
                           "swift and silent, phantom feline"),
    ("rare/碧磷蛇皇",     "an emerald venomous snake queen, solid green snake scales, "
                           "with semi-transparent glowing green poison mist, "
                           "dangerous and elegant, snake eyes gleaming"),
    ("rare/金龙爪",       "a golden dragon claw, solid metallic gold dragon scales, "
                           "with semi-transparent golden sharp aura on claws, "
                           "piercing and destructive, dragon fear"),
    ("rare/朱雀圣火",     "a vermilion bird of the south, solid red-gold sacred feathers, "
                           "with semi-transparent sacred fire aura around the body, "
                           "divine flame spirit, southern god bird"),
    ("rare/玄武神盾",     "a black tortoise shell shield, solid dark shell with water patterns, "
                           "with semi-transparent deep water aura around the shield, "
                           "impenetrable defense, ancient guardian"),
    ("rare/白鹤翎羽",     "a white crane feather, solid white plume texture, "
                           "with semi-transparent wind-speed aura around the feather, "
                           "elegant and fast, celestial bird"),
    ("rare/青龙护卫",     "an eastern blue dragon head, solid blue dragon scales, "
                           "with semi-transparent azure guardian aura, "
                           "majestic dragon, eastern divine beast, glowing eyes"),
    ("rare/冰火蛟龙",     "an ice-fire flood dragon, solid blue-red dual-tone scales, "
                           "with semi-transparent ice and fire dual aura around the body, "
                           "conflicting elements merged, powerful"),
    ("rare/雷电狼王",     "a thunder wolf king, solid grey wolf fur with lightning marks, "
                           "with semi-transparent blue lightning aura around the body, "
                           "speed and burst, thunder wolf eyes glowing"),
    ("rare/幽灵蝶",       "a ghost butterfly, solid dark purple translucent wings, "
                           "with semi-transparent phantom illusion aura, "
                           "spirit insect, mysterious and mesmerizing"),
    ("rare/赤炎狮王",     "a flame lion king, solid red-gold lion mane and fur, "
                           "with semi-transparent blazing fire aura around the mane, "
                           "beast king, commanding presence, fierce eyes"),
    ("rare/碧海银鲸",     "a silver whale of the deep sea, solid silver-blue whale skin, "
                           "with semi-transparent ocean water aura around the body, "
                           "ocean overlord, massive and powerful"),
    ("rare/紫电金鹰",     "a golden eagle with lightning, solid brown-gold eagle feathers, "
                           "with semi-transparent purple lightning aura around wings, "
                           "aerial predator, diving strike, sharp eyes"),
    ("rare/幽影黑豹",     "a shadow black panther, solid black fur with dark spots, "
                           "with semi-transparent dark shadow aura around the body, "
                           "stealth predator, silent kill, glowing yellow eyes"),
    ("rare/碎星陨铁",     "a meteorite iron chunk, solid dark iron with starry specks, "
                           "with semi-transparent starlight aura around the metal, "
                           "heavenly metal, cosmic power, heavy"),

    # epic (17)
    ("epic/蓝电霸王龙",   "a blue lightning tyrant dragon, solid blue dragon scales with electric marks, "
                           "with semi-transparent blue lightning thunder aura, "
                           "dragon king of thunder, majestic and terrifying"),
    ("epic/昊天锤",       "a heaven-shattering giant hammer, solid dark chaos iron head, "
                           "with semi-transparent dark red chaos destruction aura, "
                           "ultimate weapon, unbreakable, heavy"),
    ("epic/六翼天使",     "a six-winged angel, solid white feather wings and armor, "
                           "with semi-transparent golden divine light aura, "
                           "god-tier bloodline, sacred and majestic, halo behind head"),
    ("epic/泰坦巨猿",     "a titan giant ape, solid dark brown ape fur and muscles, "
                           "with semi-transparent earth-shattering aura around fists, "
                           "raw physical power, massive and terrifying"),
    ("epic/噬魂蛛皇",     "a soul-devouring spider queen, solid dark purple spider carapace, "
                           "with semi-transparent purple spirit-web aura, "
                           "spider trap master, eerie and dangerous"),
    ("epic/死亡蛛皇",     "a death spider queen, solid black death spider shell, "
                           "with semi-transparent dark grey death aura, "
                           "death attribute, dark power, terrifying"),
    ("epic/冰碧帝皇蝎",   "an ice-emperor scorpion, solid ice-blue scorpion exoskeleton, "
                           "with semi-transparent ice poison dual aura, "
                           "emperor of ice and venom, dangerous stinger"),
    ("epic/烈火剑圣",     "a flame sword saint, solid burning iron sword with fire marks, "
                           "with semi-transparent blazing flame aura around the blade, "
                           "sword and fire united, holy warrior"),
    ("epic/星辰神兽",     "a star-beast spirit, solid dark cosmic fur with starry specks, "
                           "with semi-transparent starlight aura around the body, "
                           "draws power from stars, mysterious and powerful"),
    ("epic/雷霆战神",     "a thunder war god, solid dark armor with lightning engravings, "
                           "with semi-transparent blue thunder aura around the armor, "
                           "wields heaven's thunder, divine warrior"),
    ("epic/极寒冰皇",     "an ultimate ice emperor, solid ice-blue crystal armor, "
                           "with semi-transparent absolute-zero frost aura, "
                           "master of ice, freezing aura, cold dome"),
    ("epic/焰灵骑士",     "a flame spirit knight, solid burning armor with fire patterns, "
                           "with semi-transparent blazing honor aura, "
                           "fire knight, burning shield and sword"),
    ("epic/黄金圣龙",     "a golden holy dragon, solid gold dragon scales with holy light, "
                           "with semi-transparent golden divine aura, "
                           "elite dragon clan, guardian and attacker"),
    ("epic/狂风战鹰",     "a storm war eagle, solid grey-brown eagle feathers, "
                           "with semi-transparent wind-blade aura around wings, "
                           "cuts airflow, storm wind blades, sharp beak"),
    ("epic/暗域鬼王",     "a dark domain ghost king, solid dark ghost armor and aura, "
                           "with semi-transparent dark purple spirit-crush aura, "
                           "lord of dead domain, terrifying"),
    ("epic/极焱炎神",     "an ultimate flame god, solid lava-red armor and body, "
                           "with semi-transparent lava-magma aura around the body, "
                           "volcano god, destructive fire, molten rock"),
    ("epic/时沙巨蟒",     "a time-sand giant python, solid ancient python scales with time marks, "
                           "with semi-transparent time-poison aura, "
                           "ancient serpent, time corrosion, mystical"),

    # legend (16)
    ("legend/九宝琉璃塔",  "a nine-story glazed pagoda, solid multicolor glazed tile body, "
                           "with semi-transparent divine amplification aura, "
                           "ultimate support artifact, legendary grade, glowing spire"),
    ("legend/蓝银皇",      "a blue silver emperor grass, solid blue-silver grass blade and flower, "
                           "with semi-transparent emperor control aura, "
                           "ultimate control system, grass emperor bloodline"),
    ("legend/堕落天使",    "a fallen angel, solid dark wings and dark armor, "
                           "with semi-transparent dark corruption aura, "
                           "opposite of holy angel, dark subversion power"),
    ("legend/极品火凤凰",   "an ultimate fire phoenix, solid gold-red divine phoenix feathers, "
                           "with semi-transparent extreme-fire burning aura, "
                           "world's strongest fire, rebirth flame, divine bird"),
    ("legend/金龙王",      "a golden dragon king, solid pure gold dragon scales and claws, "
                           "with semi-transparent dragon-king bloodline aura, "
                           "dragon king blood, unmatched dragon power"),
    ("legend/海神武魂",    "a sea god trident and ocean aura, solid dark gold trident, "
                           "with semi-transparent ocean water aura, "
                           "god-bestowed martial soul, sea guardian"),
    ("legend/七杀剑",      "a seven-kill sword, solid dark iron sword blade with kill intent, "
                           "with semi-transparent seven-layer killing aura, "
                           "world's strongest attack sword, unstoppable"),
    ("legend/雷灵王",      "a thunder spirit king, solid dark lightning armor, "
                           "with semi-transparent heaven-thunder aura, "
                           "summons nine-day thunder, thunder king"),
    ("legend/星宿命盘",    "a star constellation destiny plate, solid dark cosmic disk, "
                           "with semi-transparent star-destiny aura, "
                           "controls star fate, rewrites destiny, mystical"),
    ("legend/幽冥神眼",    "a ghost god eye, solid dark purple mystic eye, "
                           "with semi-transparent see-through-illusion aura, "
                           "underworld god eye, sees truth and false"),
    ("legend/混沌之翼",    "chaos wings, solid dark feather wings with chaos marks, "
                           "with semi-transparent chaos-breaking aura, "
                           "chaos attribute wings, breaks all bonds"),
    ("legend/天罚神雷",    "a heavenly punishment thunder, solid dark thunder bolt shape, "
                           "with semi-transparent heavenly-doom aura, "
                           "heaven's judgment thunder, executes judgment"),
    ("legend/永恒冰魂",    "an eternal ice soul, solid ice-blue spirit form, "
                           "with semi-transparent time-freezing aura, "
                           "ancient ice seal power, freezes time itself"),
    ("legend/炎狱魔神",    "a flame hell demon god, solid dark red demon armor, "
                           "with semi-transparent hell-flame aura, "
                           "hell flame and demon power fusion, ultimate"),
    ("legend/天命神弓",    "a destiny god bow, solid dark gold bow with destiny marks, "
                           "with semi-transparent fate-guiding aura, "
                           "every arrow hits target, destiny's bow"),
    ("legend/混沌剑魂",    "a chaos sword soul, solid dark chaos iron sword, "
                           "with semi-transparent rule-breaking aura, "
                           "chaos power condenses into sword, cuts all rules"),

    # apex (8)
    ("apex/神圣天使",    "a divine holy angel, solid pure white wings and armor, "
                           "with semi-transparent extreme-light divine aura, "
                           "god's true executor, lvl 20 innate soul power, sacred"),
    ("apex/柔骨兔王",    "a soft-bone rabbit king, solid white rabbit fur with moon marks, "
                           "with semi-transparent moon-mystery aura, "
                           "moon rabbit god bloodline, cute but unmatched"),
    ("apex/混沌属性",    "pure chaos attribute manifestation, solid dark chaos vortex core, "
                           "with semi-transparent all-attribute chaos aura, "
                           "above all attributes, rare chaos, omnipotent"),
    ("apex/宇宙之源",    "the source of the universe, solid cosmic orb with galaxy inside, "
                           "with semi-transparent universe-rule aura, "
                           "controls universe rules, should not exist theoretically"),
    ("apex/时空裂缝",    "a time-space rift, solid dark spatial fracture, "
                           "with semi-transparent time-space distortion aura, "
                           "time and space intersection, controls spacetime warp"),
    ("apex/虚无之主",    "the lord of nothingness, solid dark void humanoid form, "
                           "with semi-transparent void-destruction aura, "
                           "nothingness itself, existence means destruction"),
    ("apex/因果律者",    "a causality law wielder, solid dark law-robed figure, "
                           "with semi-transparent cause-effect aura, "
                           "controls causality, can rewrite battle outcome"),
    ("apex/神格化身",    "a divinity incarnation, solid glowing god-form body, "
                           "with semi-transparent divine-power aura, "
                           "god's power incarnates in human, transcendent saint"),

    # hc (8)
    ("hc/如意环",       "a wish-fulfilling ring, solid dark golden ring with chaos marks, "
                           "with semi-transparent domain-power aura, "
                           "mutated from Haotian Hammer, comes with domain"),
    ("hc/幽冥之眼",      "a ghost eye, solid dark purple mystic eyeball, "
                           "with semi-transparent underworld-peek aura, "
                           "mysterious eye martial soul, sees the underworld"),
    ("hc/九心海棠",      "a nine-heart begonia flower, solid pink begonia petals, "
                           "with semi-transparent life-heal aura, "
                           "ultimate healing, only two can exist simultaneously"),
    ("hc/奇茸通天菊",    "a divine sky-reaching chrysanthemum, solid gold chrysanthemum petals, "
                           "with semi-transparent heaven-earth-power aura, "
                           "extremely rare plant, sky-reaching power"),
    ("hc/无形剑意",      "formless sword intent, solid dark invisible sword shape, "
                           "with semi-transparent formless-killing aura, "
                           "most deadly invisible sword intent, lethal"),
    ("hc/千机算盘",      "a thousand-mechanism abacus, solid dark wood abacus with beads, "
                           "with semi-transparent calculation-prediction aura, "
                           "calculates all possibilities, predicts every variable"),
    ("hc/月影神狐",      "a moon-shadow fox, solid white-gold fox fur with moon marks, "
                           "with semi-transparent moon-phantom aura, "
                           "hidden martial soul under moonlight, phantom arts"),
    ("hc/幽莲血心",      "a ghost blood lotus, solid dark red lotus petals, "
                           "with semi-transparent life-reversal aura, "
                           "grows in ghost realm, uses life power to counter"),

    # ha (6)
    ("ha/昊天九绝锤",    "Haotian nine-absolute hammer, solid dark chaos iron hammer, "
                           "with semi-transparent destruction ultimate aura, "
                           "Haotian Hammer ultimate form, world-destroying power"),
    ("ha/饕餮神牛",      "a gluttonous divine ox, solid dark bronze ox body, "
                           "with semi-transparent devour-heaven aura, "
                           "one of dragon-god's nine sons, devours earth power"),
    ("ha/死神镰刀",      "death god scythe, solid dark death iron blade, "
                           "with semi-transparent life-death-cutting aura, "
                           "death god's weapon, cuts life and death cycle"),
    ("ha/虚空裂爪",      "void tearing claw, solid dark void claw shape, "
                           "with semi-transparent void-tear aura, "
                           "claw from the void, tears all defense"),
    ("ha/天魔琴",        "heaven demon zither, solid dark ancient zither, "
                           "with semi-transparent demon-sound-crush aura, "
                           "uses demon sound to shatter enemy will and body"),
    ("ha/混沌神炉",      "chaos divine furnace, solid dark chaos fire furnace, "
                           "with semi-transparent chaos-devour aura, "
                           "uses chaos fire to refine all existence, devours enemy source"),

    # twin (9)
    ("twin/蓝银草+昊天锤",  "blue silver grass and Haotian Hammer combined, "
                                 "solid grass blade and iron hammer, "
                                 "with semi-transparent grass-power and chaos dual aura, "
                                 "dual cultivation, grass control and hammer destruction"),
    ("twin/圣天使+堕天使",  "holy angel and fallen angel combined, "
                                 "solid white wings and dark wings, "
                                 "with semi-transparent light-dark dual aura, "
                                 "dual angels, light and dark coexist"),
    ("twin/金龙+银龙",      "golden dragon and silver dragon combined, "
                                 "solid gold and silver dragon scales, "
                                 "with semi-transparent gold-silver extreme aura, "
                                 "dragon god dual cultivation, gold and silver ultimate"),
    ("twin/冰火双凤",        "ice and fire phoenix combined, "
                                 "solid ice-blue and fire-red phoenix feathers, "
                                 "with semi-transparent ice-fire dual aura, "
                                 "dual phoenix, ice and fire coexist, rebirth dual"),
    ("twin/雷剑双生",        "thunder and sword dual cultivation, "
                                 "solid lightning sword blade, "
                                 "with semi-transparent thunder-sword dual aura, "
                                 "thunder sword saint, lightning and blade united"),
    ("twin/星辰+混沌",       "star and chaos combined, "
                                 "solid cosmic star armor and chaos marks, "
                                 "with semi-transparent star-chaos dual aura, "
                                 "star and chaos dual cultivation, mystical"),
    ("twin/幽冥+圣光",       "ghost and holy light combined, "
                                 "solid dark ghost form and bright light, "
                                 "with semi-transparent ghost-light dual aura, "
                                 "ghost and light coexist, contradictory power"),
    ("twin/时间+空间",       "time and space combined, "
                                 "solid time clock and space rift shapes, "
                                 "with semi-transparent time-space dual aura, "
                                 "controls time and space laws, rule level"),
    ("twin/神火+神冰",       "god fire and god ice combined, "
                                 "solid divine flame and divine ice crystals, "
                                 "with semi-transparent fire-ice extreme aura, "
                                 "god-level dual elements, extreme opposite coexist"),

    # triple (4)
    ("triple/冰火雷三生龙",     "ice fire thunder three-born dragon, "
                                 "solid ice-blue fire-red thunder-gold dragon scales, "
                                 "with semi-transparent three-element aura, "
                                 "three attributes in one dragon body, legendary"),
    ("triple/昊天极光混沌三生", "Haotian hammer aurora chaos three-born, "
                                 "solid dark hammer with aurora and chaos marks, "
                                 "with semi-transparent triple-power aura, "
                                 "three ultimate powers combined, invincible"),
    ("triple/神圣幽冥混沌三生", "holy ghost chaos three-born, "
                                 "solid holy light dark ghost and chaos vortex, "
                                 "with semi-transparent three-realm aura, "
                                 "three realm powers combined, god-tier"),
    ("triple/时空因果三生",     "time space causality three-born, "
                                 "solid time clock space rift and causality law shapes, "
                                 "with semi-transparent rule-law aura, "
                                 "three fundamental laws combined, omnipotent"),
]


# ── 后端：OpenAI DALL-E ─────────────────────────────────────
def gen_openai(api_key, prompt, output_path):
    """调用 OpenAI DALL-E 生图接口"""
    from openai import OpenAI

    client = OpenAI(api_key=api_key)

    full_prompt = f"{STYLE}. {prompt}"
    # 注意：DALL-E 不支持透明背景，background 参数仅 DALL-E 3 支持
    # opaque=不透明，无法生成透明背景 PNG
    response = client.images.generate(
        model="dall-e-3",
        prompt=full_prompt,
        size="1024x1024",
        quality="hd",
        n=1,
        response_format="b64_json",
        timeout=120,
    )

    image_data = base64.b64decode(response.data[0].b64_json)
    with open(output_path, "wb") as f:
        f.write(image_data)
    return output_path


# ── 后端：混元 API（OpenAI 兼容格式）───────────────────────────────
def gen_hunyuan(api_key, prompt, output_path):
    """调用混元生图 API（hy-image-v3.0）"""
    from openai import OpenAI

    client = OpenAI(
        api_key=api_key,
        base_url="https://api.hunyuan.cloud.tencent.com/v1",
    )

    full_prompt = f"{STYLE}. {prompt}"

    response = client.images.generate(
        model="hy-image-v3.0",
        prompt=full_prompt,
        size="1024x1024",
        n=1,
        response_format="b64_json",
        timeout=120,
    )

    image_data = base64.b64decode(response.data[0].b64_json)
    with open(output_path, "wb") as f:
        f.write(image_data)
    return output_path


# ── 后端：Stable Diffusion (本地) ──────────────────────────────
def gen_sd(sd_url, prompt, output_path):
    """调用本地 Stable Diffusion API"""
    api_url = f"{sd_url.rstrip('/')}/sdapi/v1/txt2img"
    payload = {
        "prompt": f"{STYLE}. {prompt}",
        "negative_prompt": "text, words, border, frame, watermark, low quality, blurry",
        "width": 1024,
        "height": 1024,
        "steps": 30,
        "cfg_scale": 7,
    }

    resp = requests.post(api_url, json=payload, timeout=120)
    resp.raise_for_status()
    data = resp.json()

    # SD 返回 base64 图片
    img_data = base64.b64decode(data["images"][0])
    with open(output_path, "wb") as f:
        f.write(img_data)
    return output_path


# ── 主流程 ─────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="武魂图标批量生成")
    parser.add_argument("--backend", choices=["openai", "hunyuan", "sd"], default="openai",
                        help="生成后端: openai(DALL-E) / hunyuan(混元生图) / sd(Stable Diffusion本地)")
    parser.add_argument("--api-key", default="", help="OpenAI 或混元 API Key")
    parser.add_argument("--sd-url", default="http://127.0.0.1:7860", help="SD 地址")
    parser.add_argument("--dry-run", action="store_true", help="只打印 prompt，不实际生成")
    parser.add_argument("--start", type=int, default=0, help="从第几个开始（断点续传）")
    parser.add_argument("--end", type=int, default=999, help="到第几个结束")
    args = parser.parse_args()

    if args.dry_run:
        print(f"=== DRY RUN: 共 {len(SOUL_LIST)} 个武魂 ===\n")
        for i, (name, prompt) in enumerate(SOUL_LIST):
            print(f"[{i+1:3d}] {name}")
            print(f"       prompt: {STYLE}. {prompt[:100]}...\n")
        return

    # 选择生成函数
    if args.backend == "openai":
        api_key = args.api_key or os.environ.get("OPENAI_API_KEY", "")
        if not api_key:
            print("错误: 需要 --api-key 或设置 OPENAI_API_KEY 环境变量")
            sys.exit(1)
        gen_func = lambda p, o: gen_openai(api_key, p, o)
    elif args.backend == "hunyuan":
        api_key = args.api_key or os.environ.get("HUNYUAN_API_KEY", "")
        if not api_key:
            print("错误: 需要 --api-key 或设置 HUNYUAN_API_KEY 环境变量")
            sys.exit(1)
        gen_func = lambda p, o: gen_hunyuan(api_key, p, o)
    elif args.backend == "sd":
        sd_url = args.sd_url
        gen_func = lambda p, o: gen_sd(sd_url, p, o)
    else:
        print(f"后端 {args.backend} 暂未实现")
        sys.exit(1)

    # 创建输出目录
    for soul_path, _ in SOUL_LIST:
        dir_part = str(soul_path).rsplit("/", 1)[0] if "/" in soul_path else ""
        if dir_part:
            (OUTPUT_BASE / dir_part).mkdir(parents=True, exist_ok=True)

    # 生成
    total = len(SOUL_LIST)
    start = max(0, args.start)
    end = min(total, args.end)

    print(f"=== 生成武魂图标: {start+1}~{end} / {total} (后端: {args.backend}) ===\n")
    success = 0
    failed = []

    for i in range(start, end):
        soul_path, prompt = SOUL_LIST[i]
        out_path = OUTPUT_BASE / f"{soul_path}.png"

        # 断点续传
        if out_path.exists():
            print(f"  [{i+1:3d}/{total}] 跳过（已存在）: {soul_path}")
            success += 1
            continue

        print(f"  [{i+1:3d}/{total}] 生成中: {soul_path}...", end=" ", flush=True)
        try:
            gen_func(prompt, out_path)
            print("✓")
            success += 1
        except Exception as e:
            print(f"✗ {e}")
            failed.append((i+1, soul_path, str(e)))

        time.sleep(REQUEST_INTERVAL)

    print(f"\n=== 完成! 成功: {success}/{total}, 失败: {len(failed)} ===")
    if failed:
        print("\n失败列表:")
        for idx, name, err in failed:
            print(f"  [{idx}] {name}: {err}")


if __name__ == "__main__":
    main()

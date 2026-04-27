# -*- coding: utf-8 -*-
"""
批量生成101个武魂图标 - Seedream API (火山引擎方舟)
"""
import os, sys, json, time, urllib.request, urllib.error
from pathlib import Path

API_URL = "https://ark.cn-beijing.volces.com/api/v3/images/generations"
API_KEY = "ark-79f7ee35-bbd5-41c3-8a12-dc9e7d471805-b9296"
MODEL = "doubao-seedream-5-0-260128"

OUTPUT_DIR = Path(r"c:\Users\hukeze\WorkBuddy\20260427084137\public\souls")
RAW_DIR = OUTPUT_DIR  # 直接输出到 public/souls
LOG_FILE = RAW_DIR / "seedream_log.json"

# ── 武魂数据 ──
SOULS = {
    "common": [
        ("蓝银草", "a single silver-blue grass blade with delicate veins and soft glowing tips, simple flat icon style, muted green-blue colors"),
        ("镰刀", "a rustic iron farming sickle with weathered wooden handle, simple flat icon style, muted metallic gray colors"),
        ("香草", "a sprig of fragrant vanilla herb with small white flowers, simple flat icon style, soft pastel colors"),
        ("木棍", "a plain wooden stick with natural bark texture, simple flat icon style, earthy brown tones"),
        ("含羞草", "a mimosa plant with folded fern-like leaves shy defensive posture, simple flat icon style, soft green colors"),
        ("铁锤", "a heavy blacksmith hammer with iron head and worn handle, simple flat icon style, dark metallic gray"),
        ("渔网", "a knotted fishing net spread out rope texture, simple flat icon style, muted brown tones"),
        ("蒲公英", "a dandelion puffball with seeds floating away, simple flat icon style, soft yellow-green tones"),
        ("芦苇杆", "a tall reed stalk by water flexible slender, simple flat icon style, muted green-brown tones"),
        ("铁锅", "a cast iron cooking pot with lid rustic metal texture, simple flat icon style, dark gray tones"),
        ("荆棘藤", "thorny vine wrapped around itself sharp barbs, simple flat icon style, dark green tones"),
        ("石头", "a rough gray stone with natural cracks mineral texture, simple flat icon style, muted gray tones"),
        ("陶笛", "an ancient ceramic ocarina flute earthy brown glaze, simple flat icon style, warm brown tones"),
    ],
    "rare": [
        ("白虎", "a fierce white tiger head roaring blue stripes glowing, detailed game icon metallic sheen vibrant white-blue colors"),
        ("火凤凰", "a phoenix engulfed in golden-red flames wings spread, detailed game icon metallic sheen vibrant red-orange colors"),
        ("冰凤凰", "a phoenix made of crystalline ice frost particles around, detailed game icon metallic sheen vibrant blue-white colors"),
        ("盘龙棍", "a long staff with dragon coiled around it scales detailed, detailed game icon metallic sheen vibrant gold-green colors"),
        ("七宝琉璃塔", "a seven-tiered pagoda tower glowing rainbow jewels, detailed game icon metallic sheen vibrant rainbow colors"),
        ("幽冥灵猫", "a spectral cat glowing purple eyes ghostly trail, detailed game icon metallic sheen vibrant purple colors"),
        ("碧磷蛇皇", "a massive green phosphorescent snake king venom dripping, detailed game icon metallic sheen vibrant toxic green colors"),
        ("金龙爪", "a golden dragon claw gauntlet razor sharp energy crackling, detailed game icon metallic sheen vibrant gold colors"),
        ("朱雀圣火", "a vermilion bird ablaze sacred red fire wings of flame, detailed game icon metallic sheen vibrant crimson colors"),
        ("玄武神盾", "hexagonal shield turtle shell pattern water flowing, detailed game icon metallic sheen vibrant blue-green colors"),
        ("白鹤翎羽", "white crane feather iridescent sheen wind currents, detailed game icon metallic sheen elegant white-silver colors"),
        ("青龙护卫", "eastern green dragon guardian coiled protectively, detailed game icon metallic sheen vibrant emerald-gold colors"),
        ("冰火蛟龙", "dragon split between ice and fire two contrasting halves, detailed game icon metallic sheen dual blue-red colors"),
        ("雷电狼王", "wolf king crackling lightning bolts fierce eyes, detailed game icon metallic sheen vibrant electric blue colors"),
        ("幽灵蝶", "translucent ghost butterfly spectral wing patterns, detailed game icon ethereal glow pale purple colors"),
        ("赤炎狮王", "lion king burning crimson mane royal aura, detailed game icon metallic sheen vibrant fiery red-gold colors"),
        ("碧海银鲸", "massive silver whale breaching ocean waves, detailed game icon metallic sheen oceanic silver-blue colors"),
        ("紫电金鹰", "golden eagle purple lightning talons diving, detailed game icon metallic sheen vibrant violet-gold colors"),
        ("幽影黑豹", "black panther melting shadows red eyes gleaming, detailed game icon dark aura shadowy black-red colors"),
        ("碎星陨铁", "chunk meteorite iron embedded star crystals, detailed game icon cosmic glow starry silver colors"),
    ],
    "epic": [
        ("蓝电霸王龙", "tyrannosaurus rex roaring blue lightning erupting thunderous, high-detail epic fantasy art rich textures dynamic lighting"),
        ("昊天锤", "massive divine war hammer runic engravings chaos energy, high-detail epic fantasy art rich metallic textures"),
        ("六翼天使", "six-winged angel figure three pairs glowing wings holy light, high-detail epic fantasy art divine radiance"),
        ("泰坦巨猿", "colossal titan ape rippling muscles ground cracking beneath, high-detail epic fantasy art raw power"),
        ("噬魂蛛皇", "giant spider queen soul-draining fangs web of souls, high-detail epic fantasy art dark mystical"),
        ("死亡蛛皇", "death spider skull markings dark necrotic aura, high-detail epic fantasy art deathly ominous"),
        ("冰碧帝皇蝎", "emperor scorpion ice-blue shell poison stinger, high-detail epic fantasy art freezing deadly"),
        ("烈火剑圣", "holy sword wreathed flames crossguard blazing, high-detail epic fantasy art blazing sacred"),
        ("星辰神兽", "mystical beast made of starlight constellations body, high-detail epic fantasy art cosmic celestial"),
        ("雷霆战神", "war god figure holding thunder lightning armor imposing, high-detail epic fantasy art storming divine"),
        ("极寒冰皇", "ice emperor figure absolute zero crystals surrounding, high-detail epic fantasy art frozen majestic"),
        ("焰灵骑士", "flame knight fire steed burning lance raised, high-detail epic fantasy art blazing heroic"),
        ("黄金圣龙", "golden dragon sacred markings imperial crown horns, high-detail epic fantasy art regal divine"),
        ("狂风战鹰", "war eagle tornado vortex wings wind blades, high-detail epic fantasy art storming swift"),
        ("暗域鬼王", "ghost king spectral crown souls swirling around, high-detail epic fantasy art deathly spectral"),
        ("极焱炎神", "volcano god erupting lava inferno incarnate, high-detail epic fantasy art volcanic apocalyptic"),
        ("时沙巨蟒", "giant python hourglass patterns time particles falling, high-detail epic fantasy art temporal ancient"),
    ],
    "legend": [
        ("九宝琉璃塔", "magnificent nine-tiered pagoda sacred jewels divine radiance golden filigree, ultra-detailed legendary ornate gold silver mythic"),
        ("蓝银皇", "regal silver-blue grass emperor golden crown leaves thorns glistening, ultra-detailed legendary control supreme"),
        ("堕落天使", "dark angel broken black wings shadow halo tears darkness, ultra-detailed legendary fallen divine tragic"),
        ("极品火凤凰", "ultimate fire phoenix pure white-hot flames divine rebirth triple halo, ultra-detailed legendary apocalyptic divine"),
        ("金龙王", "golden dragon king imperial crown scales pure gold dragon breath light, ultra-detailed legendary draconic supreme"),
        ("海神武魂", "trident sea god ocean waves parting coral pearls deep blue divinity, ultra-detailed legendary oceanic divine"),
        ("七杀剑", "legendary sword seven glowing kill marks dark red energy absolute sharpness, ultra-detailed legendary blade lethal"),
        ("雷灵王", "thunder spirit king humanoid pure lightning crown storms, ultra-detailed legendary storming electric"),
        ("星宿命盘", "mystical astrolabe rotating zodiac rings constellation map glowing, ultra-detailed legendary cosmic fate"),
        ("幽冥神眼", "giant spectral eye underworld seeing through illusions, ultra-detailed legendary otherworldly seeing"),
        ("混沌之翼", "wings pure chaos energy impossible colors reality bending, ultra-documented legendary chaotic transcendent"),
        ("天罚神雷", "divine punishment lightning heaven judgment bolt angelic runes, ultra-detailed legendary heavenly wrathful"),
        ("永恒冰魂", "frozen ethereal spirit ice crystals eternal patterns timeless beauty, ultra-detailed legendary frozen eternal"),
        ("炎狱魔神", "demon god rising hellfire chains flame infernal majesty, ultra-detailed legendary demonic hellish"),
        ("天命神弓", "divine bow made fate threads arrow nocked cosmic energy, ultra-detailed legendary fated archery"),
        ("混沌剑魂", "sentient sword chaos reality fractures around blade, ultra-detailed legendary chaotic blade"),
    ],
    "apex": [
        ("神圣天使", "supreme holy angel infinite wings light divine halo gods messenger, masterpiece cosmic energy divine craftsmanship ethereal"),
        ("柔骨兔王", "moon rabbit king translucent body lunar energy ethereal grace, masterpiece cosmic mystery ethereal translucent"),
        ("混沌属性", "pure primordial chaos manifestation swirling void creation destruction, masterpiece cosmic impossible transcendent"),
        ("宇宙之源", "cosmic source singularity creation galaxies forming, masterpiece cosmic galactic primordial"),
        ("时空裂缝", "rift spacetime parallel dimensions time flowing backwards, masterpiece cosmic dimensional temporal"),
        ("虚无之主", "lord nothingness void silhouette existence dissolving, masterpiece cosmic void annihilating"),
        ("因果律者", "arbiter karma scales cause effect threads fate, masterpiece cosmic karmic balancing"),
        ("神格化身", "mortal vessel becoming god divine transformation golden ascension, masterpiece divine transcendent ascending"),
    ],
    "hc": [
        ("如意环", "ring hidden power purple energy field domain expanding, detailed mystical aura semi-transparent ethereal"),
        ("幽冥之眼", "eye peering underworld spectral flames death sight, detailed mystical dark seeing"),
        ("九心海棠", "nine-petaled crabapple flower healing light sacred pink petals, detailed mystical healing sacred"),
        ("奇茸通天菊", "miraculous chrysanthemum reaching heavens golden petals spiritual, detailed mystical natural spiritual"),
        ("无形剑意", "invisible sword intent materializing cuts air pressure waves, detailed mystical intangible powerful"),
        ("千机算盘", "abacus thousand mechanisms counting beads light predicting future, detailed mystical calculating wise"),
        ("月影神狐", "fox spirit under moonlight shadow illusions nine tails forming, detailed mystical illusionary fox"),
        ("幽莲血心", "blood lotus from netherworld crimson petals life force siphoning, detailed mystical nether blood"),
    ],
    "ha": [
        ("昊天九绝锤", "ultimate Haotian hammer nine destruction seals chaos legends, high-detail chaotic overwhelming dark metallic"),
        ("饕餮神牛", "Taotie divine bull devouring energy ancient beast gluttony, high-detail chaotic devouring ancient"),
        ("死神镰刀", "grim reaper scythe blade death soul chains attached, high-detail chaotic deathly grim"),
        ("虚空裂爪", "claws tearing void space dimensional rifts dark energy, high-detail chaotic void tearing"),
        ("天魔琴", "demonic zither strings dark energy sound waves visible, high-detail chaotic sonic demonic"),
        ("混沌神炉", "primordial chaos furnace swallowing refining creation, high-detail chaotic consuming refining"),
    ],
    "twin": [
        ("蓝银草+昊天锤", "silver grass and divine hammer fused nature power united dual aura, masterpiece dual-element merging yin-yang"),
        ("圣天使+堕天使", "holy angel fallen angel back light dark balance yin yang, masterpiece dual-element opposing divine"),
        ("金龙+银龙", "golden dragon silver dragon intertwined yin-yang serpentine dance, masterpiece dual-element draconic harmony"),
        ("冰火双凤", "ice phoenix fire phoenix spiraling elemental harmony, masterpiece dual-element contrasting fusion"),
        ("雷剑双生", "sword crackling thunder lightning blade storm steel, masterpiece dual-element storming bladed"),
        ("星辰+混沌", "orderly stars merging chaotic void cosmos entropy balance, masterpiece dual-element cosmic chaos"),
        ("幽冥+圣光", "dark nether energy meeting sacred light death rebirth cycle, masterpiece dual-element life death"),
        ("时间+空间", "clockwork dimensional portals combined spacetime weaving, masterpiece dual-element temporal spatial"),
        ("神火+神冰", "sacred fire divine ice perfect balance extreme duality, masterpiece dual-element extreme unity"),
    ],
    "triple": [
        ("冰火雷三生龙", "trinity dragon ice fire lightning three elemental heads merging, ultimate masterpiece three forces trinity"),
        ("昊天极光混沌三生", "Haotian hammer aurora chaos trinity three ultimate forces one, ultimate masterpiece triple convergence"),
        ("神圣幽冥混沌三生", "holy nether chaos trinity three divine domains united, ultimate masterpiece triple divine convergence"),
        ("时空因果三生", "time space karma trinity three cosmic laws one supreme entity, ultimate masterpiece cosmic trinity"),
    ],
}

QUALITY_STYLE_SUFFIX = {
    "common": ", simple flat icon style centered on pure solid green background isolated object no text no watermark no border",
    "rare": ", detailed game icon with metallic sheen vibrant colors slight glow centered on pure solid green background isolated object no text no watermark no border",
    "epic": ", high-detail game icon rich metallic textures dynamic lighting particle effects epic fantasy art centered on pure solid green background isolated object no text no watermark no border",
    "legend": ", ultra-detailed legendary game icon ornate gold silver metallic divine glow intricate engravings mythic fantasy centered on pure solid blue background isolated object no text no watermark no border",
    "apex": ", masterpiece game icon cosmic energy aura divine craftsmanship holographic effects ethereal glow hyper-realistic fantasy centered on pure solid blue background isolated object no text no watermark no border",
    "hc": ", detailed game icon mystical aura semi-transparent ethereal effects dark fantasy subtle glow centered on pure solid green background isolated object no text no watermark no border",
    "ha": ", high-detail game icon chaotic energy dark metallic textures cracks light overwhelming power dark god style centered on pure solid blue background isolated object no text no watermark no border",
    "twin": ", masterpiece dual-element game icon two contrasting forces merging yin-yang balance double aura divine fusion centered on pure solid blue background isolated object no text no watermark no border",
    "triple": ", ultimate masterpiece game icon three divine forces intertwined trinity symbol triple aura explosion cosmic convergence god-tier centered on pure solid blue background isolated object no text no watermark no border",
}


def generate_image(prompt):
    """调用Seedream API生成图片，返回图片URL或None"""
    payload = json.dumps({
        "model": MODEL,
        "prompt": prompt,
        "sequential_image_generation": "disabled",
        "response_format": "url",
        "size": "2K",
        "stream": False,
        "watermark": False,
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {API_KEY}",
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            result = json.loads(resp.read().decode())
        return result
    except urllib.error.HTTPError as e:
        err_body = e.read().decode(errors="replace")
        return {"error": True, "status": e.code, "body": err_body}
    except Exception as e:
        return {"error": True, "msg": str(e)}


def download_image(url, path):
    """下载图片"""
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = resp.read()
    with open(path, "wb") as f:
        f.write(data)
    return len(data)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    total = sum(len(v) for v in SOULS.values())
    done = success = fail = skip = 0
    results = []

    print(f"Total souls to generate: {total}")
    print(f"Output dir: {OUTPUT_DIR}")
    print("=" * 50)

    for quality, souls in SOULS.items():
        suffix = QUALITY_STYLE_SUFFIX.get(quality, QUALITY_STYLE_SUFFIX["common"])
        for i, (name, visual) in enumerate(souls):
            done += 1
            fname = f"{quality}_{i+1:02d}_{name}.png"
            out_path = OUTPUT_DIR / fname

            # 跳过已存在且大于10KB的文件
            if out_path.exists() and out_path.stat().st_size > 10000:
                skip += 1
                print(f"[{done}/{total}] SKIP {fname}")
                continue

            prompt = f"Game icon of {visual}{suffix}"
            print(f"[{done}/{total}] Generating: {name} ({quality})...", end=" ", flush=True)

            # 调用API
            max_retries = 3
            img_url = None
            for retry in range(max_retries + 1):
                result = generate_image(prompt)
                
                if result.get("error"):
                    err_info = result.get("body", result.get("msg", str(result)))
                    if retry < max_retries:
                        print(f"RETRY({retry+1})...", end=" ", flush=True)
                        time.sleep(5)
                    else:
                        print(f"FAIL: {err_info[:100]}")
                        fail += 1
                        results.append({"n": name, "q": quality, "s": "fail"})
                    continue
                
                # 解析结果 - Seedream 返回格式
                data_list = result.get("data", [])
                if data_list and len(data_list) > 0:
                    img_url = data_list[0].get("url", "")
                    if not img_url:
                        # 可能是 b64_json
                        b64 = data_list[0].get("b64_json", "")
                        if b64:
                            import base64
                            out_path.parent.mkdir(parents=True, exist_ok=True)
                            with open(out_path, "wb") as f:
                                f.write(base64.b64decode(b64))
                            size = out_path.stat().st_size
                            success += 1
                            print(f"OK ({size} bytes)")
                            results.append({"n": name, "q": quality, "s": "ok", "f": fname})
                            img_url = None  # 标记已处理
                    break
                else:
                    if retry < max_retries:
                        print(f"RETRY({retry+1})...", end=" ", flush=True)
                        time.sleep(5)
                    else:
                        print(f"FAIL: no data in response")
                        fail += 1
                        results.append({"n": name, "q": quality, "s": "fail"})

            # 如果有URL，下载
            if img_url:
                try:
                    size = download_image(img_url, out_path)
                    success += 1
                    print(f"OK ({size} bytes)")
                    results.append({"n": name, "q": quality, "s": "ok", "f": fname})
                except Exception as e:
                    fail += 1
                    print(f"DL_FAIL: {e}")
                    results.append({"n": name, "q": quality, "s": "dl_fail"})

            # 间隔避免频率限制
            time.sleep(2)

    # 保存日志
    log_data = {
        "total": total, "ok": success, "fail": fail, "skip": skip,
        "results": results
    }
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        json.dump(log_data, f, ensure_ascii=False, indent=2)

    print("\n" + "=" * 50)
    print(f"DONE! Total={total}, OK={success}, FAIL={fail}, SKIP={skip}")


if __name__ == "__main__":
    main()

# -*- coding: utf-8 -*-
"""
用image_gen工具的API批量生成101个武魂图标
通过Python直接调用混元API（内置image_gen走的是同一个后端）
带自动重试：队列满时等待后重试
"""
import os, sys, json, time, hashlib, urllib.request
from pathlib import Path

# ── 武魂数据（与souls.js一致）──
SOULS = {
    "common": [
        ("蓝银草", "a single silver-blue grass blade with delicate veins, soft glowing tips", 1),
        ("镰刀", "a rustic iron farming sickle with weathered wooden handle", 1),
        ("香草", "a sprig of fragrant vanilla herb with small white flowers", 2),
        ("木棍", "a plain wooden stick with natural bark texture", 1),
        ("含羞草", "a mimosa plant with folded fern-like leaves shy posture", 2),
        ("铁锤", "a heavy blacksmith hammer with iron head and worn handle", 2),
        ("渔网", "a knotted fishing net spread out rope texture", 1),
        ("蒲公英", "a dandelion puffball with seeds floating away", 2),
        ("芦苇杆", "a tall reed stalk by water flexible and slender", 1),
        ("铁锅", "a cast iron cooking pot with lid rustic metal texture", 2),
        ("荆棘藤", "thorny vine wrapped around itself sharp barbs", 2),
        ("石头", "a rough gray stone with natural cracks mineral texture", 1),
        ("陶笛", "an ancient ceramic ocarina flute earthy brown glaze", 2),
    ],
    "rare": [
        ("白虎", "a fierce white tiger head roaring blue stripes glowing", 5),
        ("火凤凰", "a phoenix engulfed in golden-red flames wings spread", 6),
        ("冰凤凰", "a phoenix made of crystalline ice frost particles around", 6),
        ("盘龙棍", "a long staff with a dragon coiled around it scales detailed", 5),
        ("七宝琉璃塔", "a seven-tiered pagoda tower glowing with rainbow jewels", 7),
        ("幽冥灵猫", "a spectral cat with glowing purple eyes ghostly trail", 5),
        ("碧磷蛇皇", "a massive green phosphorescent snake king venom dripping", 6),
        ("金龙爪", "a golden dragon claw gauntlet razor sharp energy crackling", 6),
        ("朱雀圣火", "a vermilion bird ablaze with sacred red fire wings of flame", 6),
        ("玄武神盾", "a hexagonal shield with turtle shell pattern water flowing", 5),
        ("白鹤翎羽", "a white crane feather with iridescent sheen wind currents", 6),
        ("青龙护卫", "an eastern green dragon guardian coiled protectively", 6),
        ("冰火蛟龙", "a dragon split between ice and fire two contrasting halves", 7),
        ("雷电狼王", "a wolf king crackling with lightning bolts fierce eyes", 6),
        ("幽灵蝶", "a translucent ghost butterfly spectral wing patterns", 5),
        ("赤炎狮王", "a lion king with burning crimson mane royal aura", 6),
        ("碧海银鲸", "a massive silver whale breaching ocean waves", 6),
        ("紫电金鹰", "a golden eagle with purple lightning talons diving", 6),
        ("幽影黑豹", "a black panther melting into shadows red eyes gleaming", 5),
        ("碎星陨铁", "a chunk of meteorite iron with embedded star crystals", 7),
    ],
    "epic": [
        ("蓝电霸王龙", "a tyrannosaurus rex roaring with blue lightning erupting thunderous", 8),
        ("昊天锤", "a massive divine war hammer with runic engravings chaos energy", 9),
        ("六翼天使", "a six-winged angel figure three pairs of glowing wings holy light", 9),
        ("泰坦巨猿", "a colossal titan ape with rippling muscles ground cracking beneath", 8),
        ("噬魂蛛皇", "a giant spider queen with soul-draining fangs web of souls", 8),
        ("死亡蛛皇", "a death spider with skull markings dark necrotic aura", 9),
        ("冰碧帝皇蝎", "an emperor scorpion with ice-blue shell and poison stinger", 8),
        ("烈火剑圣", "a holy sword wreathed in flames crossguard blazing", 8),
        ("星辰神兽", "a mystical beast made of starlight constellations on its body", 9),
        ("雷霆战神", "a war god figure holding thunder lightning armor imposing", 8),
        ("极寒冰皇", "an ice emperor figure surrounded by absolute zero crystals", 9),
        ("焰灵骑士", "a flame knight on fire steed burning lance raised", 8),
        ("黄金圣龙", "a golden dragon with sacred markings imperial crown of horns", 9),
        ("狂风战鹰", "a war eagle creating tornado vortex with wings wind blades", 8),
        ("暗域鬼王", "a ghost king with spectral crown souls swirling around", 8),
        ("极焱炎神", "a volcano god erupting lava inferno incarnate", 9),
        ("时沙巨蟒", "a giant python with hourglass patterns time particles falling", 8),
    ],
    "legend": [
        ("九宝琉璃塔", "a magnificent nine-tiered pagoda with sacred jewels divine radiance golden filigree", 12),
        ("蓝银皇", "a regal silver-blue grass emperor with golden crown of leaves thorns glistening", 13),
        ("堕落天使", "a dark angel with broken black wings shadow halo tears of darkness", 12),
        ("极品火凤凰", "the ultimate fire phoenix pure white-hot flames divine rebirth triple halo", 14),
        ("金龙王", "the golden dragon king with imperial crown scales of pure gold dragon breath of light", 14),
        ("海神武魂", "a trident of the sea god ocean waves parting coral and pearls deep blue divinity", 13),
        ("七杀剑", "a legendary sword with seven glowing kill marks dark red energy absolute sharpness", 14),
        ("雷灵王", "the thunder spirit king humanoid of pure lightning crown of storms", 13),
        ("星宿命盘", "a mystical astrolabe with rotating zodiac rings constellation map glowing", 13),
        ("幽冥神眼", "a giant spectral eye from the underworld seeing through all illusions", 12),
        ("混沌之翼", "wings of pure chaos energy impossible colors reality bending around them", 13),
        ("天罚神雷", "divine punishment lightning from heaven judgment bolt with angelic runes", 14),
        ("永恒冰魂", "a frozen ethereal spirit ice crystals forming eternal patterns timeless beauty", 13),
        ("炎狱魔神", "a demon god rising from hellfire chains of flame infernal majesty", 14),
        ("天命神弓", "a divine bow made of fate threads arrow nocked with cosmic energy", 12),
        ("混沌剑魂", "a sentient sword of chaos reality fractures around its blade", 13),
    ],
    "apex": [
        ("神圣天使", "the supreme holy angel infinite wings of light divine halo gods messenger", 17),
        ("柔骨兔王", "the moon rabbit king translucent body lunar energy ethereal grace", 16),
        ("混沌属性", "pure primordial chaos manifestation swirling void creation and destruction", 19),
        ("宇宙之源", "the cosmic source a singularity of creation galaxies forming around it", 20),
        ("时空裂缝", "a rift in spacetime showing parallel dimensions time flowing backwards", 18),
        ("虚无之主", "the lord of nothingness a void silhouette existence dissolving around it", 19),
        ("因果律者", "the arbiter of karma scales of cause and effect threads of fate", 17),
        ("神格化身", "a mortal vessel becoming god divine transformation golden ascension", 18),
    ],
    "hc": [
        ("如意环", "a ring of hidden power purple energy field domain expanding", 11),
        ("幽冥之眼", "an eye peering into the underworld spectral flames death sight", 10),
        ("九心海棠", "a nine-petaled crabapple flower healing light sacred pink petals", 11),
        ("奇茸通天菊", "a miraculous chrysanthemum reaching the heavens golden petals spiritual energy", 10),
        ("无形剑意", "invisible sword intent materializing cuts through air pressure waves", 11),
        ("千机算盘", "an abacus of thousand mechanisms counting beads of light predicting future", 10),
        ("月影神狐", "a fox spirit under moonlight shadow illusions nine tails forming", 11),
        ("幽莲血心", "a blood lotus from the netherworld crimson petals life force siphoning", 10),
    ],
    "ha": [
        ("昊天九绝锤", "the ultimate Haotian hammer nine destruction seals chaos hammer of legends", 18),
        ("饕餮神牛", "the Taotie divine bull devouring energy ancient beast of gluttony", 17),
        ("死神镰刀", "the grim reapers scythe blade of death soul chains attached", 18),
        ("虚空裂爪", "claws tearing through void space dimensional rifts dark energy", 17),
        ("天魔琴", "a demonic zither with strings of dark energy sound waves visible", 18),
        ("混沌神炉", "a primordial chaos furnace swallowing and refining all creation", 17),
    ],
    "twin": [
        ("蓝银草+昊天锤", "silver grass and divine hammer fused together nature and power united dual aura", 21),
        ("圣天使+堕天使", "holy angel and fallen angel back to back light and dark balance yin yang", 23),
        ("金龙+银龙", "golden dragon and silver dragon intertwined yin-yang serpentine dance", 26),
        ("冰火双凤", "ice phoenix and fire phoenix spiraling together elemental harmony", 23),
        ("雷剑双生", "a sword crackling with thunder lightning blade storm and steel", 22),
        ("星辰+混沌", "orderly stars merging with chaotic void cosmos and entropy in balance", 24),
        ("幽冥+圣光", "dark nether energy meeting sacred light death and rebirth cycle", 24),
        ("时间+空间", "clockwork and dimensional portals combined spacetime fabric weaving", 27),
        ("神火+神冰", "sacred fire and divine ice in perfect balance extreme duality", 25),
    ],
    "triple": [
        ("冰火雷三生龙", "a trinity dragon with ice fire and lightning three elemental heads merging", 31),
        ("昊天极光混沌三生", "Haotian hammer aurora and chaos trinity three ultimate forces as one", 36),
        ("神圣幽冥混沌三生", "holy nether chaos trinity three divine domains united ultimate convergence", 40),
        ("时空因果三生", "time space and karma trinity three cosmic laws as one supreme entity", 45),
    ],
}

# 品质 → 风格描述
QUALITY_STYLES = {
    "common":  "simple flat icon style muted colors basic game asset",
    "rare":     "detailed game icon metallic sheen vibrant colors slight glow effect fantasy art",
    "epic":     "high-detail game icon rich metallic textures dynamic lighting particle effects epic fantasy",
    "legend":   "ultra-detailed legendary icon ornate gold silver metallic divine glow intricate engravings mythic",
    "apex":     "masterpiece icon cosmic energy aura divine craftsmanship holographic effects ethereal glow hyper-realistic",
    "hc":       "detailed game icon mystical aura semi-transparent ethereal effects dark fantasy subtle glow",
    "ha":       "high-detail icon chaotic energy dark metallic textures with cracks of light overwhelming power dark god",
    "twin":     "masterpiece dual-element icon two contrasting forces merging yin-yang balance double aura divine fusion",
    "triple":   "ultimate masterpiece icon three divine forces intertwined trinity symbol triple aura explosion cosmic convergence god-tier",
}

# 品质 → 背景色（绿幕/蓝幕）
BG_COLOR = {
    "common": "#00FF00",
    "rare": "#00FF00",
    "epic": "#00FF00",
    "legend": "#0000FF",
    "apex": "#0000FF",
    "hc": "#00FF00",
    "ha": "#0000FF",
    "twin": "#0000FF",
    "triple": "#0000FF",
}

# 输出目录
OUTPUT_DIR = Path(r"c:\Users\hukeze\WorkBuddy\20260427084137\public\souls")
RAW_DIR = Path(r"c:\Users\hukeze\WorkBuddy\20260427084137\codev9\generated\raw")
LOG_FILE = RAW_DIR / "batch_log.json"

# 腾讯云凭证（从环境变量读取）
SECRET_ID = os.environ.get("TENCENTCLOUD_SECRET_ID") or os.environ.get("TENCENT_SECRET_ID")
SECRET_KEY = os.environ.get("TENCENTCLOUD_SECRET_KEY") or os.environ.get("TENCENT_SECRET_KEY")


def get_client():
    """创建混元客户端"""
    from tencentcloud.common import credential
    from tencentcloud.common.profile.client_profile import ClientProfile
    from tencentcloud.common.profile.http_profile import HttpProfile
    from tencentcloud.hunyuan.v20230901 import hunyuan_client

    cred = credential.Credential(SECRET_ID, SECRET_KEY)
    http_profile = HttpProfile(endpoint="hunyuan.tencentcloudapi.com")
    client_profile = ClientProfile(httpProfile=http_profile)
    return hunyuan_client.HunyuanClient(cred, "ap-guangzhou", client_profile)


def submit_and_poll(client, prompt):
    """提交生图并轮询结果，返回图片URL列表或None"""
    from tencentcloud.hunyuan.v20230901 import models
    import json as j

    # 提交任务
    req = models.SubmitHunyuanImageJobRequest()
    req.Prompt = prompt
    req.Resolution = "1024:1024"
    req.Num = 1
    req.Revise = 1
    req.LogoAdd = 0

    try:
        resp = client.SubmitHunyuanImageJob(req)
        result = j.loads(resp.to_json_string())
    except Exception as e:
        return None, str(e)

    job_id = result.get("JobId")
    if not job_id:
        return None, f"No JobId: {result}"

    # 轮询结果（最多150次=5分钟）
    for attempt in range(150):
        time.sleep(2)
        qreq = models.QueryHunyuanImageJobRequest()
        qreq.JobId = job_id
        try:
            qresp = client.QueryHunyuanImageJob(qreq)
            qr = j.loads(qresp.to_json_string())
        except Exception:
            continue

        status = qr.get("JobStatusCode", "")
        if status == "4":
            urls = qr.get("ResultImage", [])
            if isinstance(urls, str): urls = [urls]
            return urls, None
        elif status == "5":
            details = qr.get("ResultDetails", [])
            if isinstance(details, list) and "Success" in str(details):
                urls = qr.get("ResultImage", [])
                if isinstance(urls, str): urls = [urls]
                return urls, None
            return None, f"Failed: {qr.get('JobStatusMsg', '')}"

    return None, "Timeout after 5min"


def download_image(url, path):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
        with open(path, 'wb') as f:
            f.write(data)
        return True
    except Exception as e:
        print(f"  Download failed: {e}")
        return False


def build_prompt(name, visual, quality):
    """构建prompt"""
    style = QUALITY_STYLES.get(quality, QUALITY_STYLES["common"])
    bg = BG_COLOR.get(quality, "#00FF00")
    return (
        f"Game icon of {visual}, "
        f"{style}, "
        f"centered composition, "
        f"pure solid chroma key {bg} background, "
        f"isolated object, no text, no watermark, no border"
    )


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    total = sum(len(v) for v in SOULS.values())
    done = success = fail = skip = 0
    results = []
    log_data = {"start_time": time.strftime("%Y-%m-%d %H:%M:%S"), "total": total, "items": []}

    if not SECRET_ID or not SECRET_KEY:
        # 尝试从其他方式获取密钥 - 检查是否有可用的方式
        print("ERROR: No API credentials found!")
        print("Please set TENCENTCLOUD_SECRET_ID/TENCENTCLOUD_SECRET_KEY environment variables.")
        # 尝试使用 connect_cloud_service 获取
        print("\nTrying alternative approach...")
        return False

    client = get_client()

    for quality, souls in SOULS.items():
        for i, (name, visual, _) in enumerate(souls):
            done += 1
            fname = f"{quality}_{i+1:02d}_{name}.png"
            raw_path = RAW_DIR / fname
            final_path = OUTPUT_DIR / fname

            # 跳过已存在
            if final_path.exists() and final_path.stat().st_size > 10000:
                skip += 1
                item = {"n": name, "q": quality, "s": "skip"}
                log_data["items"].append(item)
                print(f"[{done}/{total}] SKIP {name}")
                continue

            prompt = build_prompt(name, visual, quality)
            print(f"[{done}/{total}] Generating {name} ({quality})...", end="", flush=True)

            max_retries = 3
            url_list = None
            err_msg = ""

            for retry in range(max_retries + 1):
                url_list, err_msg = submit_and_poll(client, prompt)

                if url_list is not None:
                    break
                elif "queue" in (err_msg or "").lower() or "full" in (err_msg or "").lower():
                    wait_sec = (retry + 1) * 15
                    print(f" Queue full, waiting {wait_sec}s...", end="", flush=True)
                    time.sleep(wait_sec)
                elif "SecretId" in (err_msg or ""):
                    print(f" AUTH ERROR: {err_msg}")
                    break
                else:
                    time.sleep(5)

            if url_list and len(url_list) > 0:
                raw_path.parent.mkdir(parents=True, exist_ok=True)
                if download_image(url_list[0], raw_path):
                    # 复制到最终目录
                    import shutil
                    shutil.copy2(raw_path, final_path)
                    success += 1
                    item = {"n": name, "q": quality, "s": "ok", "f": fname}
                    log_data["items"].append(item)
                    print(f" OK ({final_path.stat().st_size} bytes)")
                else:
                    fail += 1
                    item = {"n": name, "q": quality, "s": "dl_fail", "e": err_msg}
                    log_data["items"].append(item)
                    print(f" DL_FAIL")
            else:
                fail += 1
                item = {"n": name, "q": quality, "s": "fail", "e": err_msg}
                log_data["items"].append(item)
                print(f" FAIL: {err_msg}")

            # 保存实时日志
            log_data["progress"] = f"{done}/{total}"
            log_data["success"] = success
            log_data["fail"] = fail
            log_data["skip"] = skip
            with open(LOG_FILE, "w", encoding="utf-8") as f:
                json.dump(log_data, f, ensure_ascii=False, indent=2)

            # 间隔避免频率限制
            time.sleep(2)

    log_data["end_time"] = time.strftime("%Y-%m-%d %H:%M:%S")
    log_data["final"] = {"total": total, "ok": success, "fail": fail, "skip": skip}
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        json.dump(log_data, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*50}")
    print(f"DONE! Total={total}, OK={success}, FAIL={fail}, SKIP={skip}")
    return True


if __name__ == "__main__":
    main()

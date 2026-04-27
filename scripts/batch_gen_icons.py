# -*- coding: utf-8 -*-
"""
批量生成101个武魂图标 - 混元API
按品质分级设计不同prompt风格，纯色背景方便后续rembg去底
"""
import os, sys, json, time, hashlib
from pathlib import Path

# SDK
from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.hunyuan.v20230901 import hunyuan_client, models

# ── 配置 ──
SECRET_ID = os.environ.get("TENCENT_SECRET_ID", "")
SECRET_KEY = os.environ.get("TENCENT_SECRET_KEY", "")
OUTPUT_DIR = Path(r"c:\Users\hukeze\WorkBuddy\20260427084137\public\souls")
GEN_DIR = Path(r"c:\Users\hukeze\WorkBuddy\20260427084137\codev9\generated")
LOG_FILE = GEN_DIR / "batch_log.txt"

# 品质 → 风格映射
QUALITY_STYLES = {
    "common": {
        "style_desc": "simple flat icon, minimal shading, muted colors, game asset style",
        "bg": "#00FF00",
        "detail": "basic",
    },
    "rare": {
        "style_desc": "detailed game icon, metallic sheen, vibrant colors, slight glow effect",
        "bg": "#00FF00",
        "detail": "moderate",
    },
    "epic": {
        "style_desc": "high-detail game icon, rich metallic textures, dynamic lighting, particle effects, epic fantasy art",
        "bg": "#00FF00",
        "detail": "high",
    },
    "legend": {
        "style_desc": "ultra-detailed legendary game icon, ornate gold and silver metallic textures, divine glow, intricate engravings, mythic fantasy art style, cinematic lighting",
        "bg": "#0000FF",
        "detail": "legendary",
    },
    "apex": {
        "style_desc": "masterpiece game icon, cosmic energy aura, divine metallic craftsmanship, holographic effects, ethereal glow, hyper-realistic fantasy art, god-tier design",
        "bg": "#0000FF",
        "detail": "mythic",
    },
    "hc": {
        "style_desc": "detailed game icon, mystical aura, semi-transparent ethereal effects, dark fantasy art, subtle glow",
        "bg": "#00FF00",
        "detail": "special",
    },
    "ha": {
        "style_desc": "high-detail game icon, chaotic energy, dark metallic textures with cracks of light, overwhelming power aura, dark god art style",
        "bg": "#0000FF",
        "detail": "extreme",
    },
    "twin": {
        "style_desc": "masterpiece dual-element game icon, two contrasting forces merging, yin-yang balance, double aura effects, divine fusion art, symmetrical composition",
        "bg": "#0000FF",
        "detail": "legendary",
    },
    "triple": {
        "style_desc": "ultimate masterpiece game icon, three divine forces intertwined, trinity symbol, triple aura explosion, cosmic convergence, god-tier sacred art, overwhelming divine presence",
        "bg": "#0000FF",
        "detail": "ultimate",
    },
}

# 武魂 → 英文视觉描述（核心提示词）
SOUL_VISUAL = {
    # ── 普通 common ──
    "蓝银草": "a single silver-blue grass blade with delicate veins, soft glowing tips",
    "镰刀": "a rustic iron farming sickle with weathered wooden handle",
    "香草": "a sprig of fragrant vanilla herb with small white flowers",
    "木棍": "a plain wooden stick with natural bark texture",
    "含羞草": "a mimosa plant with folded fern-like leaves, shy posture",
    "铁锤": "a heavy blacksmith hammer with iron head and worn handle",
    "渔网": "a knotted fishing net spread out, rope texture",
    "蒲公英": "a dandelion puffball with seeds floating away",
    "芦苇杆": "a tall reed stalk by water, flexible and slender",
    "铁锅": "a cast iron cooking pot with lid, rustic metal texture",
    "荆棘藤": "thorny vine wrapped around itself, sharp barbs",
    "石头": "a rough gray stone with natural cracks and mineral texture",
    "陶笛": "an ancient ceramic ocarina flute, earthy brown glaze",
    # ── 稀有 rare ──
    "白虎": "a fierce white tiger head roaring, blue stripes glowing",
    "火凤凰": "a phoenix engulfed in golden-red flames, wings spread",
    "冰凤凰": "a phoenix made of crystalline ice, frost particles around",
    "盘龙棍": "a long staff with a dragon coiled around it, scales detailed",
    "七宝琉璃塔": "a seven-tiered pagoda tower glowing with rainbow jewels",
    "幽冥灵猫": "a spectral cat with glowing purple eyes, ghostly trail",
    "碧磷蛇皇": "a massive green phosphorescent snake king, venom dripping",
    "金龙爪": "a golden dragon claw gauntlet, razor sharp, energy crackling",
    "朱雀圣火": "a vermilion bird ablaze with sacred red fire, wings of flame",
    "玄武神盾": "a hexagonal shield with turtle shell pattern, water flowing",
    "白鹤翎羽": "a white crane feather with iridescent sheen, wind currents",
    "青龙护卫": "an eastern green dragon guardian, coiled protectively",
    "冰火蛟龙": "a dragon split between ice and fire, two contrasting halves",
    "雷电狼王": "a wolf king crackling with lightning bolts, fierce eyes",
    "幽灵蝶": "a translucent ghost butterfly, spectral wing patterns",
    "赤炎狮王": "a lion king with burning crimson mane, royal aura",
    "碧海银鲸": "a massive silver whale breaching ocean waves",
    "紫电金鹰": "a golden eagle with purple lightning talons, diving",
    "幽影黑豹": "a black panther melting into shadows, red eyes gleaming",
    "碎星陨铁": "a chunk of meteorite iron with embedded star crystals",
    # ── 史诗 epic ──
    "蓝电霸王龙": "a tyrannosaurus rex roaring with blue lightning erupting, thunderous",
    "昊天锤": "a massive divine war hammer with runic engravings, chaos energy",
    "六翼天使": "a six-winged angel figure, three pairs of glowing wings, holy light",
    "泰坦巨猿": "a colossal titan ape with rippling muscles, ground cracking beneath",
    "噬魂蛛皇": "a giant spider queen with soul-draining fangs, web of souls",
    "死亡蛛皇": "a death spider with skull markings, dark necrotic aura",
    "冰碧帝皇蝎": "an emperor scorpion with ice-blue shell and poison stinger",
    "烈火剑圣": "a holy sword wreathed in flames, crossguard blazing",
    "星辰神兽": "a mystical beast made of starlight, constellations on its body",
    "雷霆战神": "a war god figure holding thunder, lightning armor, imposing",
    "极寒冰皇": "an ice emperor figure surrounded by absolute zero crystals",
    "焰灵骑士": "a flame knight on fire steed, burning lance raised",
    "黄金圣龙": "a golden dragon with sacred markings, imperial crown of horns",
    "狂风战鹰": "a war eagle creating tornado vortex with wings, wind blades",
    "暗域鬼王": "a ghost king with spectral crown, souls swirling around",
    "极焱炎神": "a volcano god erupting lava, inferno incarnate",
    "时沙巨蟒": "a giant python with hourglass patterns, time particles falling",
    # ── 传说 legend ──
    "九宝琉璃塔": "a magnificent nine-tiered pagoda with sacred jewels, divine radiance, golden filigree",
    "蓝银皇": "a regal silver-blue grass emperor with golden crown of leaves, thorns glistening",
    "堕落天使": "a dark angel with broken black wings, shadow halo, tears of darkness",
    "极品火凤凰": "the ultimate fire phoenix, pure white-hot flames, divine rebirth, triple halo",
    "金龙王": "the golden dragon king with imperial crown, scales of pure gold, dragon breath of light",
    "海神武魂": "a trident of the sea god, ocean waves parting, coral and pearls, deep blue divinity",
    "七杀剑": "a legendary sword with seven glowing kill marks, dark red energy, absolute sharpness",
    "雷灵王": "the thunder spirit king, humanoid of pure lightning, crown of storms",
    "星宿命盘": "a mystical astrolabe with rotating zodiac rings, constellation map glowing",
    "幽冥神眼": "a giant spectral eye from the underworld, seeing through all illusions",
    "混沌之翼": "wings of pure chaos energy, impossible colors, reality bending around them",
    "天罚神雷": "divine punishment lightning from heaven, judgment bolt with angelic runes",
    "永恒冰魂": "a frozen ethereal spirit, ice crystals forming eternal patterns, timeless beauty",
    "炎狱魔神": "a demon god rising from hellfire, chains of flame, infernal majesty",
    "天命神弓": "a divine bow made of fate threads, arrow nocked with cosmic energy",
    "混沌剑魂": "a sentient sword of chaos, reality fractures around its blade",
    # ── 巅峰 apex ──
    "神圣天使": "the supreme holy angel, infinite wings of light, divine halo, god's messenger",
    "柔骨兔王": "the moon rabbit king, translucent body, lunar energy, ethereal grace",
    "混沌属性": "pure primordial chaos manifestation, swirling void, creation and destruction",
    "宇宙之源": "the cosmic source, a singularity of creation, galaxies forming around it",
    "时空裂缝": "a rift in spacetime, showing parallel dimensions, time flowing backwards",
    "虚无之主": "the lord of nothingness, a void silhouette, existence dissolving around it",
    "因果律者": "the arbiter of karma, scales of cause and effect, threads of fate",
    "神格化身": "a mortal vessel becoming god, divine transformation, golden ascension",
    # ── 混沌 hc ──
    "如意环": "a ring of hidden power, purple energy field, domain expanding",
    "幽冥之眼": "an eye peering into the underworld, spectral flames, death sight",
    "九心海棠": "a nine-petaled crabapple flower, healing light, sacred pink petals",
    "奇茸通天菊": "a miraculous chrysanthemum reaching the heavens, golden petals, spiritual energy",
    "无形剑意": "invisible sword intent materializing, cuts through air, pressure waves",
    "千机算盘": "an abacus of thousand mechanisms, counting beads of light, predicting future",
    "月影神狐": "a fox spirit under moonlight, shadow illusions, nine tails forming",
    "幽莲血心": "a blood lotus from the netherworld, crimson petals, life force siphoning",
    # ── 昊天 ha ──
    "昊天九绝锤": "the ultimate Haotian hammer, nine destruction seals, chaos hammer of legends",
    "饕餮神牛": "the Taotie divine bull, devouring energy, ancient beast of gluttony",
    "死神镰刀": "the grim reaper's scythe, blade of death, soul chains attached",
    "虚空裂爪": "claws tearing through void space, dimensional rifts, dark energy",
    "天魔琴": "a demonic zither with strings of dark energy, sound waves visible",
    "混沌神炉": "a primordial chaos furnace, swallowing and refining all creation",
    # ── 双生 twin ──
    "蓝银草+昊天锤": "silver grass and divine hammer fused together, nature and power united, dual aura",
    "圣天使+堕天使": "holy angel and fallen angel back to back, light and dark balance, yin yang",
    "金龙+银龙": "golden dragon and silver dragon intertwined, yin-yang serpentine dance",
    "冰火双凤": "ice phoenix and fire phoenix spiraling together, elemental harmony",
    "雷剑双生": "a sword crackling with thunder, lightning blade, storm and steel",
    "星辰+混沌": "orderly stars merging with chaotic void, cosmos and entropy in balance",
    "幽冥+圣光": "dark nether energy meeting sacred light, death and rebirth cycle",
    "时间+空间": "clockwork and dimensional portals combined,时空 fabric weaving",
    "神火+神冰": "sacred fire and divine ice in perfect balance, extreme duality",
    # ── 三生 triple ──
    "冰火雷三生龙": "a trinity dragon with ice fire and lightning, three elemental heads merging",
    "昊天极光混沌三生": "Haotian hammer aurora and chaos trinity, three ultimate forces as one",
    "神圣幽冥混沌三生": "holy nether chaos trinity, three divine domains united, ultimate convergence",
    "时空因果三生": "time space and karma trinity, three cosmic laws as one supreme entity",
}


# ── API 调用 ──
cred = credential.Credential(SECRET_ID, SECRET_KEY)
http_profile = HttpProfile(endpoint="hunyuan.tencentcloudapi.com")
client_profile = ClientProfile(httpProfile=http_profile)
client = hunyuan_client.HunyuanClient(cred, "ap-guangzhou", client_profile)


def submit_and_wait(prompt, negative_prompt="", style="", seed=None):
    """提交生图任务并等待完成，返回图片URL列表"""
    req = models.SubmitHunyuanImageJobRequest()
    req.Prompt = prompt
    req.NegativePrompt = negative_prompt
    req.Resolution = "1024:1024"
    req.Num = 1
    req.Revise = 1  # 开启扩写
    req.LogoAdd = 0
    req.Clarity = "x2"  # 2倍超分
    if style:
        req.Style = style
    if seed:
        req.Seed = seed

    try:
        resp = client.SubmitHunyuanImageJob(req)
        result = json.loads(resp.to_json_string())
    except Exception as e:
        return None, str(e)

    job_id = result.get("JobId")
    if not job_id:
        return None, "No JobId"

    # 等待完成
    for _ in range(150):  # 最多5分钟
        time.sleep(2)
        qreq = models.QueryHunyuanImageJobRequest()
        qreq.JobId = job_id
        try:
            qresp = client.QueryHunyuanImageJob(qreq)
            qr = json.loads(qresp.to_json_string())
        except:
            continue

        status = qr.get("JobStatusCode", "")
        if status == "4":
            urls = qr.get("ResultImage", [])
            if isinstance(urls, str):
                urls = [urls]
            return urls, None
        elif status == "5":
            details = qr.get("ResultDetails", [])
            if isinstance(details, list) and "Success" in str(details):
                urls = qr.get("ResultImage", [])
                if isinstance(urls, str):
                    urls = [urls]
                return urls, None
            return None, f"Failed: {qr.get('JobStatusMsg', '')}"

    return None, "Timeout"


def download_image(url, path):
    import urllib.request
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.0'
        })
        with urllib.request.urlopen(req, timeout=60) as resp:
            with open(path, 'wb') as f:
                f.write(resp.read())
        return True
    except Exception as e:
        return False


def build_prompt(soul_name, quality, attrs, desc):
    """根据武魂信息构建prompt"""
    visual = SOUL_VISUAL.get(soul_name, f"a mystical {soul_name} artifact")
    qs = QUALITY_STYLES.get(quality, QUALITY_STYLES["common"])
    bg = qs["bg"]

    prompt = (
        f"Game icon of {visual}, "
        f"{qs['style_desc']}, "
        f"centered composition, "
        f"pure solid chroma key {bg} background, "
        f"isolated object, no text, no watermark, no border"
    )

    negative = (
        "text, watermark, border, frame, multiple objects, "
        "background scenery, people, face, realism photo, "
        "blurry, low quality, deformed"
    )
    return prompt, negative


def main():
    # 读取 souls.js 里的武魂列表
    souls_data = {
        "common": [
            ("蓝银草", ["草"], "最平凡的草系武魂，蕴含无限可能。"),
            ("镰刀", ["金属"], "普通农器武魂，修炼潜力有限。"),
            ("香草", ["自然"], "散发淡淡清香的植物武魂。"),
            ("木棍", ["木"], "最朴实无华的器武魂。"),
            ("含羞草", ["草", "防御"], "植物系武魂，遇敌防御增强。"),
            ("铁锤", ["金属", "力量"], "器武魂，拥有沉重的打击力。"),
            ("渔网", ["控制", "器"], "控制系器武魂，网罗天下。"),
            ("蒲公英", ["自然", "风"], "随风飘散的植物武魂，拥有散布之力。"),
            ("芦苇杆", ["水", "柔韧", "植物"], "水边生长的柔韧植物武魂，以柔克刚。"),
            ("铁锅", ["金属", "防御"], "最朴实的器武魂，防御与反弹并存。"),
            ("荆棘藤", ["草", "控制", "毒"], "满布荆棘的藤蔓武魂，缠绕束缚敌人。"),
            ("石头", ["大地", "坚韧"], "最原始的器武魂，坚硬无比毫无弱点。"),
            ("陶笛", ["音波", "精神"], "音律系武魂，以声波影响周围环境。"),
        ],
        "rare": [
            ("白虎", ["兽", "力量"], "百兽之王，力量与速度的完美结合。"),
            ("火凤凰", ["火", "凤凰"], "凤凰一族，圣洁火焰之力，不死重生。"),
            ("冰凤凰", ["冰", "凤凰"], "冰系凤凰，冻结万物，令一切静止。"),
            ("盘龙棍", ["龙", "器"], "器武魂佼佼者，龙形缠绕蕴含破坏力。"),
            ("七宝琉璃塔", ["辅助", "光"], "天下第一辅助武魂，增幅队友全属性。"),
            ("幽冥灵猫", ["暗", "速度"], "暗系极速兽武魂，来去无影。"),
            ("碧磷蛇皇", ["毒", "蛇"], "毒系蛇类武魂，致命毒素与缠绕。"),
            ("金龙爪", ["龙", "锋利"], "爪系器武魂，锋利穿透破坏力。"),
            ("朱雀圣火", ["火", "神鸟"], "南方火之神鸟，纯粹炎属性。"),
            ("玄武神盾", ["防御", "水", "龟"], "防御系武魂极品，坚不可摧。"),
            ("白鹤翎羽", ["风", "飞行", "速度"], "速度与优雅的化身，风属性武魂。"),
            ("青龙护卫", ["龙", "护卫", "东方"], "东方青龙护卫，拥有强大的守护之力。"),
            ("冰火蛟龙", ["冰", "火", "蛟龙"], "冰与火属性并存的蛟龙武魂。"),
            ("雷电狼王", ["雷", "兽", "速度"], "雷属性狼族武魂，速度与爆发并重。"),
            ("幽灵蝶", ["精神", "幻象", "飞行"], "精神系蝴蝶武魂，幻象迷惑敌人。"),
            ("赤炎狮王", ["火", "兽", "王者"], "火焰狮族武魂，王者之气令敌人颤抖。"),
            ("碧海银鲸", ["水", "海洋", "力量"], "大洋武魂，以水力横扫千军。"),
            ("紫电金鹰", ["雷", "风", "飞行"], "雷与风双属性的猛禽武魂，俯冲斩杀。"),
            ("幽影黑豹", ["暗", "速度", "暗杀"], "极速暗系武魂，暗影偷袭无处遁形。"),
            ("碎星陨铁", ["金属", "星辰", "破甲"], "天外陨石凝聚的器武魂，蕴含星辰之力。"),
        ],
        "epic": [
            ("蓝电霸王龙", ["雷", "龙", "霸王"], "龙类武魂顶端，雷与龙力的完美融合。"),
            ("昊天锤", ["力量", "混沌"], "昊天宗镇宗至宝，天下无物不可破。"),
            ("六翼天使", ["神圣", "光明", "飞行"], "神级血脉，先天魂力20级，神灵降临。"),
            ("泰坦巨猿", ["力量", "大地"], "力量极品，毁天灭地蛮力。"),
            ("噬魂蛛皇", ["精神", "毒", "蜘蛛"], "蛛类之皇，精神力与陷阱双重恐怖。"),
            ("死亡蛛皇", ["死亡", "暗", "精神"], "死亡属性蛛皇，黑暗力量无可抵挡。"),
            ("冰碧帝皇蝎", ["冰", "毒", "帝皇"], "冰与毒完美融合，封印一切。"),
            ("烈火剑圣", ["火", "剑", "圣"], "剑与火焰合一，斩杀与焚烧并存。"),
            ("星辰神兽", ["星辰", "神兽", "光"], "汲取星辰之力的神秘兽武魂。"),
            ("雷霆战神", ["雷", "战神", "破坏"], "雷系战神级武魂，九天雷霆为我所用。"),
            ("极寒冰皇", ["冰", "皇者", "极限"], "冰系极限武魂，绝对零度的掌控者。"),
            ("焰灵骑士", ["火", "骑士", "荣耀"], "火焰骑士武魂，灼热与荣耀并存。"),
            ("黄金圣龙", ["龙", "神圣", "黄金"], "黄金龙族精英，守护与攻击兼备。"),
            ("狂风战鹰", ["风", "速度", "斩切"], "风系顶级猛禽，切断气流形成狂暴风刃。"),
            ("暗域鬼王", ["死亡", "精神", "暗"], "死域之主，阴魂摄魄令敌精神崩溃。"),
            ("极焱炎神", ["火", "熔岩", "破坏"], "火山之神怒火具现，熔岩与烈焰的化身。"),
            ("时沙巨蟒", ["时间", "毒", "古老"], "以时间毒素腐蚀一切的古老蟒蛇武魂。"),
        ],
        "legend": [
            ("九宝琉璃塔", ["辅助", "光明", "神圣"], "七宝琉璃塔进化，天下第一辅助，传说级。"),
            ("蓝银皇", ["控制", "草", "皇者"], "蓝银草皇者血脉，最强控制系武魂。"),
            ("堕落天使", ["暗", "堕落", "天使"], "神圣天使对立面，黑暗颠覆之力。"),
            ("极品火凤凰", ["极致之火", "凤凰", "毁灭"], "世界最强火系，极致火焰焚尽一切。"),
            ("金龙王", ["极致之力", "龙王", "血脉"], "龙中之王，无上龙族血脉。"),
            ("海神武魂", ["神力", "水", "海"], "神赐武魂，历代海神守护者。"),
            ("七杀剑", ["极致之刃", "杀意", "剑"], "天下第一攻击，七重杀意无物不斩。"),
            ("雷灵王", ["雷", "王者", "天空"], "雷霆极致，召唤九天雷霆降临。"),
            ("星宿命盘", ["星宿", "命运", "神秘"], "掌控星宿命运的神秘武魂，改写天命。"),
            ("幽冥神眼", ["冥界", "洞察", "神秘"], "冥界神眼，看穿一切虚幻与真实。"),
            ("混沌之翼", ["混沌", "飞行", "自由"], "混沌属性翅翼，破开一切束缚。"),
            ("天罚神雷", ["雷", "天道", "神罚"], "天道降罚的神雷武魂，代天行道。"),
            ("永恒冰魂", ["冰", "时间", "永恒"], "亘古冰封之力，将时间凝固于永恒瞬间。"),
            ("炎狱魔神", ["火", "魔", "地狱"], "地狱烈焰与恶魔力量的终极融合体。"),
            ("天命神弓", ["命运", "远程", "穿透"], "以命运之力引导每一支箭矢，百发百中。"),
            ("混沌剑魂", ["混沌", "剑", "规则"], "混沌之力凝聚成剑，斩断一切规则束缚。"),
        ],
        "apex": [
            ("神圣天使", ["极致之光", "神圣", "天使", "神力"], "先天魂力20级，神灵真正的代行者。"),
            ("柔骨兔王", ["神秘", "月", "灵魂"], "月兔之神血脉传承，无可比拟。"),
            ("混沌属性", ["混沌", "无序", "万有"], "极罕见混沌属性，凌驾一切属性之上。"),
            ("宇宙之源", ["宇宙", "规则", "万物"], "掌管宇宙规则，理论上不应存在。"),
            ("时空裂缝", ["时间", "空间", "裂缝"], "时间与空间的交汇点，掌控时空扭曲。"),
            ("虚无之主", ["虚无", "毁灭", "超越"], "虚无本身具现为武魂，存在即是毁灭。"),
            ("因果律者", ["因果", "法则", "预知"], "掌握因果法则，可改写战局的必然走向。"),
            ("神格化身", ["神力", "化身", "超越"], "神之力量在人体内直接化身，超凡入圣。"),
        ],
        "hc": [
            ("如意环", ["隐匿", "领域", "混沌"], "昊天锤变异而来，自带领域之力。"),
            ("幽冥之眼", ["死亡", "洞察", "冥界"], "窥视冥界的神秘眼睛武魂。"),
            ("九心海棠", ["治愈", "生命", "神圣"], "天下第一治愈，同时只能两人持有。"),
            ("奇茸通天菊", ["自然", "治愈", "通灵"], "极罕见植物武魂，通天彻地之力。"),
            ("无形剑意", ["剑", "无形", "意志"], "无形却最致命的剑意武魂。"),
            ("千机算盘", ["智慧", "预知", "算计"], "计算一切可能的神秘器武魂，预判每个变数。"),
            ("月影神狐", ["月", "幻象", "隐藏"], "月光下现身的隐藏武魂，以幻术迷惑众生。"),
            ("幽莲血心", ["生命", "幽冥", "反制"], "生长于幽冥的血莲，以生命力量反制敌人。"),
        ],
        "ha": [
            ("昊天九绝锤", ["混沌", "极致之力", "毁灭", "昊天"], "昊天锤终极形态，毁灭一切的绝世力量。"),
            ("饕餮神牛", ["吞噬", "大地", "龙神"], "龙神九子之一，吞噬天地之力。"),
            ("死神镰刀", ["死亡", "斩断", "混沌"], "死神降临之器，斩断生死轮回。"),
            ("虚空裂爪", ["虚空", "暗", "裂爪"], "来自虚空的暗裂之爪，撕碎一切防御。"),
            ("天魔琴", ["音波", "魔", "精神破碎"], "以魔音震碎敌人意志与肉体的绝世神器。"),
            ("混沌神炉", ["混沌", "火", "吞噬"], "以混沌之火熔炼一切存在，吞噬敌人本源。"),
        ],
        "twin": [
            ("蓝银草+昊天锤", ["草", "力量", "控制", "双生"], "史上最强双生武魂，控制与力量融合。"),
            ("圣天使+堕天使", ["光明", "黑暗", "天使", "双生"], "光明与黑暗双生，阴阳并存超越极限。"),
            ("金龙+银龙", ["龙神", "金银", "极致", "双生"], "龙神血脉双重传承，无上神威。"),
            ("冰火双凤", ["冰", "火", "凤凰", "双生"], "冰与火并存双生凤凰，对立统一。"),
            ("雷剑双生", ["雷", "剑", "双生"], "雷霆与剑意的双生结合，速斩万物。"),
            ("星辰+混沌", ["星辰", "混沌", "双生"], "星辰与混沌的双生，秩序与混沌并立。"),
            ("幽冥+圣光", ["幽冥", "圣光", "双生"], "死亡与圣光双生，生死循环之力。"),
            ("时间+空间", ["时间", "空间", "双生", "法则"], "时空双生，同时掌控时间流速与空间折叠。"),
            ("神火+神冰", ["神火", "神冰", "双生", "极致"], "神级冰火双生，两种极端在同一灵魂中共鸣。"),
        ],
        "triple": [
            ("冰火雷三生龙", ["冰", "火", "雷", "龙", "三生"], "三生武魂极致，三属性龙族并存。"),
            ("昊天极光混沌三生", ["混沌", "极光", "昊天", "三生"], "传说三生武魂，三种最强属性融合。"),
            ("神圣幽冥混沌三生", ["神圣", "幽冥", "混沌", "三生"], "三生武魂之最，神圣幽冥混沌三力合一。"),
            ("时空因果三生", ["时间", "空间", "因果", "三生", "法则"], "掌握时间、空间、因果三大法则的绝世三生武魂。"),
        ],
    }

    # 统计
    total = sum(len(v) for v in souls_data.values())
    done = 0
    success = 0
    fail = 0
    results = []

    # 创建输出目录
    GEN_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    log_lines = [f"Batch generate started: {time.strftime('%Y-%m-%d %H:%M:%S')}", f"Total: {total} souls", ""]

    for quality, souls in souls_data.items():
        qs = QUALITY_STYLES.get(quality, QUALITY_STYLES["common"])
        for i, (name, attrs, desc) in enumerate(souls):
            done += 1

            # 文件名：品质_序号_名称
            filename = f"{quality}_{i+1:02d}_{name}.png"
            gen_path = GEN_DIR / "raw" / filename
            final_path = OUTPUT_DIR / filename

            # 跳过已生成的
            if final_path.exists():
                log_lines.append(f"[{done}/{total}] SKIP (exists): {name}")
                success += 1
                continue

            prompt, negative = build_prompt(name, quality, attrs, desc)

            log_lines.append(f"[{done}/{total}] Generating: {name} ({quality})...")
            print(f"[{done}/{total}] {name} ({quality})...", end="", flush=True)

            urls, err = submit_and_wait(prompt, negative)

            if urls and len(urls) > 0:
                gen_path.parent.mkdir(parents=True, exist_ok=True)
                if download_image(urls[0], gen_path):
                    print(f" OK")
                    success += 1
                    results.append({"name": name, "quality": quality, "status": "ok", "file": str(gen_path)})
                else:
                    print(f" DOWNLOAD FAIL")
                    fail += 1
                    results.append({"name": name, "quality": quality, "status": "download_fail", "error": err})
            else:
                print(f" FAIL: {err}")
                fail += 1
                results.append({"name": name, "quality": quality, "status": "fail", "error": err})

            # 写实时日志
            with open(LOG_FILE, "w", encoding="utf-8") as f:
                f.write("\n".join(log_lines))

            # 间隔1秒避免频率限制
            time.sleep(1)

    log_lines.append("")
    log_lines.append(f"Done! Success: {success}, Fail: {fail}, Total: {total}")
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(log_lines))

    # 保存结果JSON
    with open(GEN_DIR / "batch_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*50}")
    print(f"Complete! Success: {success}, Fail: {fail}")


if __name__ == "__main__":
    main()

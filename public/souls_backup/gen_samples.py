"""
腾讯混元生图 3.0 - 批量生成武魂贴图样例
用法: python gen_samples.py
"""

import os
import sys
import time
import json
import urllib.request
from pathlib import Path

from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.aiart.v20221229 import aiart_client, models

# ═══════════════════════════════════════════════
# 配置
# ═══════════════════════════════════════════════
SECRET_ID = os.environ.get("TENCENT_SECRET_ID", "")
SECRET_KEY = os.environ.get("TENCENT_SECRET_KEY", "")
OUTPUT_DIR = Path(__file__).parent / "samples"
RESOLUTION = "1024:1024"
POLL_INTERVAL = 5  # 秒

# 4 种风格样例 - 用同一个"蓝银草"武魂做对比
SAMPLES = [
    {
        "style": "A_Q版游戏",
        "filename": "sample_A_qversion.png",
        "prompt": (
            "Q版游戏立绘风格的武魂图标：蓝银草。"
            "可爱的Q版卡通风格，圆润造型，色彩鲜艳明亮，"
            "白色背景，正方形构图，游戏道具图标，"
            "奇幻RPG风格，精致的矢量感渲染，高清细节"
        ),
    },
    {
        "style": "B_拟物写实",
        "filename": "sample_B_realistic.png",
        "prompt": (
            "拟物写实风格的武魂图标：蓝银草。"
            "写实逼真的蓝色银色藤蔓植物，叶片细节清晰可见，"
            "金属质感的银色光泽，柔和的自然光效，"
            "深色背景，游戏道具图标，高清摄影质感，精细纹理"
        ),
    },
    {
        "style": "C_水墨国风",
        "filename": "sample_C_inkwash.png",
        "prompt": (
            "中国水墨画风格的武魂图标：蓝银草。"
            "传统水墨渲染的蓝色银色草叶，水墨晕染效果，"
            "留白构图，古风水韵，宣纸纹理质感，"
            "淡雅配色，中国风游戏道具图标，写意笔触"
        ),
    },
    {
        "style": "D_暗黑幻想",
        "filename": "sample_D_darkfantasy.png",
        "prompt": (
            "暗黑幻想风格的武魂图标：蓝银草。"
            "哥特暗黑风格的蓝色银色荆棘藤蔓，发光的魔法能量，"
            "暗色背景，神秘的幽光效果，奇幻暗黑风格，"
            "游戏道具图标，电影级光影，史诗氛围感"
        ),
    },
]


def get_env_credentials():
    """从环境变量或腾讯云配置文件获取凭证"""
    global SECRET_ID, SECRET_KEY

    # 尝试读取腾讯云 CLI 配置
    cli_config_paths = [
        Path.home() / ".tencentcloud" / "cli_default_profile",
        Path.home() / ".tencentcloud" / "credentials",
    ]
    for p in cli_config_paths:
        if p.exists():
            try:
                data = json.loads(p.read_text("utf-8"))
                SECRET_ID = SECRET_ID or data.get("secretId") or data.get("secret_id", "")
                SECRET_KEY = SECRET_KEY or data.get("secretKey") or data.get("secret_key", "")
            except Exception:
                pass

    if not SECRET_ID or not SECRET_KEY:
        print("[ERROR] 未找到腾讯云凭证。请设置环境变量 TENCENT_SECRET_ID 和 TENCENT_SECRET_KEY")
        sys.exit(1)


def create_client():
    cred = credential.Credential(SECRET_ID, SECRET_KEY)
    httpProfile = HttpProfile()
    httpProfile.endpoint = "aiart.tencentcloudapi.com"
    clientProfile = ClientProfile()
    clientProfile.httpProfile = httpProfile
    return aiart_client.AiartClient(cred, "ap-guangzhou", clientProfile)


def submit_job(client, prompt, resolution=RESOLUTION):
    req = models.SubmitTextToImageProJobRequest()
    req.Prompt = prompt
    req.Resolution = resolution
    req.Revise = 1
    req.LogoAdd = 0  # 不加水印
    return client.SubmitTextToImageProJob(req)


def query_job(client, job_id):
    req = models.QueryTextToImageProJobRequest()
    req.JobId = job_id
    return client.QueryTextToImageProJob(req)


def download_image(url, filepath):
    urllib.request.urlretrieve(url, str(filepath))


def main():
    get_env_credentials()
    client = create_client()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print("=" * 60)
    print("武魂贴图样例生成 - 混元生图 3.0")
    print("=" * 60)

    # 提交所有任务
    jobs = []
    for s in SAMPLES:
        print(f"\n[提交] 风格 {s['style']}: {s['prompt'][:30]}...")
        try:
            resp = submit_job(client, s["prompt"])
            job_id = resp.JobId
            jobs.append({**s, "job_id": job_id})
            print(f"  JobId: {job_id}")
        except Exception as e:
            print(f"  [失败] {e}")
            jobs.append({**s, "job_id": None, "error": str(e)})

    # 轮询等待结果
    print(f"\n{'='*60}")
    print("等待生成完成...")

    max_wait = 300  # 最多等5分钟
    start = time.time()
    results = []

    while time.time() - start < max_wait:
        pending = [j for j in jobs if j.get("job_id") and "result" not in j]
        if not pending:
            break

        time.sleep(POLL_INTERVAL)
        for j in pending:
            try:
                resp = query_job(client, j["job_id"])
                status = resp.JobStatus

                if status == "DONE":
                    # 获取结果图片
                    result_data = resp.ResultData
                    if result_data:
                        result_items = json.loads(result_data)
                        if result_items and len(result_items) > 0:
                            img_url = result_items[0].get("Url", "")
                            if img_url:
                                filepath = OUTPUT_DIR / j["filename"]
                                download_image(img_url, filepath)
                                j["result"] = filepath
                                print(f"  [完成] {j['style']} -> {filepath}")
                                continue
                    j["result"] = "no_url"
                    print(f"  [异常] {j['style']}: 无图片URL")

                elif status == "FAILED":
                    j["result"] = "failed"
                    j["error_code"] = resp.ErrorCode
                    print(f"  [失败] {j['style']}: {resp.ErrorCode}")

                else:
                    j["status"] = status

            except Exception as e:
                print(f"  [查询失败] {j['style']}: {e}")

    # 汇总
    print(f"\n{'='*60}")
    print("生成结果汇总:")
    for j in jobs:
        r = j.get("result", j.get("error", "未完成"))
        status = "[OK]" if r not in ("failed", "no_url", None) else "[FAIL]"
        print(f"  {status} {j['style']}: {r}")

    print("\n完成！")


if __name__ == "__main__":
    main()

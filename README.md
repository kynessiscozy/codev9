# 武魂模拟器

<div align="center">

![Vite](https://img.shields.io/badge/Vite-5.4+-646cff?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022+-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-228f3c?style=for-the-badge&logo=github&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**基于斗罗大陆世界观的放置类魂师养成游戏**

[在线体验](#) · [功能特性](#-功能特性) · [快速开始](#-快速开始) · [游戏系统](#-游戏系统)

</div>

---

## 📖 简介

**武魂模拟器** 是一款以热门 IP《斗罗大陆》为背景的放置类网页游戏。玩家将体验从武魂觉醒到封号斗罗的完整成长历程，收集 101 种武魂、猎取魂环、融合魂骨、挑战成神之路。

游戏采用纯前端技术栈，支持 GitHub Pages 自动部署，无需后端服务器即可运行。

### ✨ 核心特色

- **🎭 101 种武魂收集** - 从普通蓝银草到神级六翼天使，每种武魂拥有独特属性与技能
- **⚡ 武魂觉醒系统** - 随机觉醒品质（普通/稀有/史诗/传说/顶级/特殊），触发炫酷动画
- **🔮 魂环猎取** - 星斗大森林、混沌之地、原初之地等多区域探索，获取百年至神赐魂环
- **⚗️ 魂环融合** - 双魂环融合系统，添加药草提升成功率与质变概率
- **🏆 成神之路** - 九环齐聚后开启神位试炼，挑战九重关卡成就神王
- **🎰 星运抽取** - 三阶奖池系统，幸运值机制保底高品奖励
- **📅 每日签到** - 连续登录奖励，第七天赠送顶级十连券
- **🎒 丰富背包系统** - 魂骨、神器、药草、资源、称号分类管理
- **🌍 世界探索** - 异界副本、异域战场，解锁隐藏内容与彩蛋
- **📊 武魂图鉴** - 收录全部武魂信息，追踪收集进度

---

## 🚀 快速开始

### 环境要求

- Node.js 18+ (推荐 v20)
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

启动后访问 `http://localhost:3000` 预览游戏。

### 生产构建

```bash
npm run build
```

构建产物输出至 `dist/` 目录。

### 本地预览构建结果

```bash
npm run preview
```

### 部署到 GitHub Pages

#### 方式一：自动部署（推荐）

推送到 `main` 分支自动触发 GitHub Actions 部署：

```bash
git add .
git commit -m "feat: 更新内容"
git push origin main
```

#### 方式二：手动部署

```bash
npm run deploy
```

> 注意：需先安装 `gh-pages` 依赖（已包含在 devDependencies 中）

---

## 📁 项目结构

```
wuhun-simulator/
├── index.html              # 主页面入口
├── package.json            # 项目配置与依赖
├── vite.config.js          # Vite 构建配置
├── README.md               # 项目文档
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 部署脚本
├── src/
│   ├── main.js             # 应用入口
│   └── modules/
│       ├── index.js        # 模块统一导出
│       ├── core/           # 核心基础设施
│       │   ├── state.js    # 状态管理与存档
│       │   ├── events.js   # 事件系统
│       │   ├── exp.js      # 经验等级计算
│       │   ├── power.js    # 战力计算
│       │   ├── utils.js    # 工具函数
│       │   ├── notify.js   # 通知系统
│       │   └── resonance.js# 武魂共鸣系统
│       ├── config/         # 游戏配置数据
│       │   ├── quality.js  # 品质定义
│       │   ├── realms.js   # 境界体系
│       │   ├── talents.js  # 天赋系统
│       │   ├── achievements.js # 成就系统
│       │   ├── luck.js     # 幸运值机制
│       │   ├── calendar.js # 签到奖励
│       │   └── arena.js    # 竞技场配置
│       ├── data/           # 游戏数据库
│       │   ├── souls.js    # 101 种武魂数据
│       │   ├── rings.js    # 魂环年份与属性
│       │   ├── bones.js    # 魂骨数据
│       │   └── items.js    # 道具/神器/称号
│       ├── systems/        # 游戏系统逻辑
│       │   ├── awakening.js# 武魂觉醒
│       │   ├── hunt.js     # 狩猎试炼
│       │   ├── lottery.js  # 星运抽取
│       │   ├── fusion.js   # 魂环融合
│       │   ├── god.js      # 成神之路
│       │   ├── world.js    # 世界探索
│       │   ├── abyss.js    # 深渊副本
│       │   ├── tasks.js    # 任务系统
│       │   └── seasons.js  # 季节活动
│       ├── ui/             # 界面渲染
│       │   ├── navigation.js# 导航系统
│       │   ├── soulPage.js # 武魂页面
│       │   ├── bag.js      # 背包界面
│       │   ├── sidebar.js  # 侧边栏
│       │   ├── modals.js   # 弹窗组件
│       │   ├── grimoire.js # 武魂图鉴
│       │   ├── soul-icons.js# 武魂图标
│       │   └── page-25d.js # 2.5D 页面效果
│       ├── fx/             # 特效模块
│       │   ├── particles.js# 粒子系统
│       │   ├── 3d-effects.js# 3D 动画效果
│       │   └── audio.js    # 音效管理
│       └── gm/             # GM 调试工具
│           └── console.js  # GM 控制台
└── dist/                   # 构建输出目录（自动生成）
```

---

## 🎮 游戏系统详解

### 1. 武魂觉醒

点击「感应武魂」按钮随机觉醒武魂，品质分为：
- **普通** (白色) - 基础武魂如蓝银草、镰刀
- **稀有** (绿色) - 白虎、火凤凰等
- **史诗** (紫色) - 蓝电霸王龙、昊天锤
- **传说** (橙色) - 顶级兽武魂与器武魂
- **顶级** (红色) - 神级武魂雏形
- **特殊** (彩色) - 隐藏彩蛋武魂

觉醒后生成初始魂力、属性与技能。

### 2. 魂环系统

| 年份 | 颜色 | 获取区域 | 备注 |
|------|------|----------|------|
| 百年 | 黄色 | 星斗大森林外围 | 基础魂环 |
| 千年 | 紫色 | 星斗大森林深处 | 中等魂环 |
| 万年 | 黑色 | 混沌之地 | 高级魂环 |
| 十万年 | 红色 | 混沌之地核心区 | 顶级魂环 |
| 百万年 | 金红 | 原初之地 | 极限魂环 |
| 不可估量 | 彩色 | 混沌之地/随机 | 变异魂环 |
| 神赐 | 金色 | 成神之路奖励 | 神级魂环 |

### 3. 魂环融合

选择两个魂环进行融合，有概率产生：
- **年份提升** - 低年份魂环融合为高年份
- **品质跃迁** - 普通→稀有→史诗→传说
- **属性变异** - 产生特殊属性组合

添加药草可提升：
- 基础成功率（最高 +30%）
- 质变概率（最高 +15%）

### 4. 成神之路

集齐 9 个魂环后解锁，共 9 重试炼：
1. 初心之试
2. 毅力之试
3. 智慧之试
4. 勇气之试
5. 慈悲之试
6. 诚实之试
7. 荣誉之试
8. 公正之试
9. 神王之试

通关后获得神赐魂环与神级称号。

### 5. 星运抽取

三种奖池：
- **普通池** - 基础资源、低品魂骨
- **高级池** - 稀有魂骨、神器碎片（10 连保底）
- **顶级池** - 极致神器、宇宙之核（含限定奖励）

幸运值机制：
- 每次未获得高品奖励时累积幸运值
- 幸运值满时必定获得当前奖池最高品质物品

### 6. 境界体系

```
魂士 → 魂师 → 大魂师 → 魂尊 → 魂宗 → 
魂王 → 魂帝 → 魂圣 → 封号斗罗 → 神级
```

每 10 级突破一次境界，获得属性加成与新技能解锁。

### 7. 每日任务与活动

- **日常任务** - 修炼、探索、抽卡等任务获取魂力与资源
- **每日签到** - 连续登录奖励，第 7 天送顶级十连券
- **限时活动** - 季节性活动（如踏春欧皇）完成条件领取奖励

---

## ⚙️ 配置说明

### Vite 配置

`vite.config.js` 支持以下环境变量：

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VITE_BASE` | 部署基础路径 | 自动推断仓库名 |
| `GITHUB_REPOSITORY` | GitHub 仓库标识 | - |

示例：自定义部署路径
```bash
VITE_BASE=/my-game/ npm run build
```

### 游戏配置

主要配置文件位于 `src/modules/config/`：
- `quality.js` - 品质定义与概率
- `realms.js` - 境界名称与升级要求
- `talents.js` - 封号天赋效果
- `achievements.js` - 成就列表与奖励
- `luck.js` - 幸运值状态阈值
- `calendar.js` - 签到奖励表
- `arena.js` - 竞技场敌人配置

---

## 🛠️ 开发指南

### 添加新武魂

编辑 `src/modules/data/souls.js`：

```javascript
{
  n: "武魂名称",
  i: "🎯",           // 图标 emoji
  d: "武魂描述",
  a: ["属性 1", "属性 2"],  // 属性标签
  p: 5               // 初始魂力
}
```

### 添加新魂骨

编辑 `src/modules/data/bones.js`：

```javascript
{
  id: "bone_001",
  name: "魂骨名称",
  slot: "head",     // head/body/arm/leg
  tier: "万年",
  power: 1000,      // 战力加成
  effect: "描述"
}
```

### 自定义奖池

编辑 `src/modules/systems/lottery.js` 中的奖池配置。

### 调试工具

长按顶部标题栏 3 秒进入 **GM 控制台**，可进行：
- 修改魂力/经验/等级
- 获取指定武魂/魂环/魂骨
- 解锁全部内容
- 重置存档

---

## 📦 依赖说明

### 生产依赖

无运行时外部依赖，纯原生 JavaScript 实现。

### 开发依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| vite | ^5.4.0 | 构建工具 |
| terser | ^5.31.0 | 代码压缩 |
| gh-pages | ^6.3.0 | GitHub Pages 部署 |

---

## 🌐 浏览器兼容性

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

支持移动端响应式布局。

---

## 📄 许可证

MIT License

---

## 🙏 致谢

- 灵感来源：《斗罗大陆》小说与动画
- 图标资源：Google Fonts (Ma Shan Zheng, Noto Sans SC)
- 构建工具：Vite

---

<div align="center">

**武魂觉醒，踏上你的魂师之路！** 🌀

Made with ❤️ by 武魂模拟器团队

</div>

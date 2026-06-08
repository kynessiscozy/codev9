# 武魂模拟器

基于 Vite + GitHub Actions 自动部署的斗罗大陆风格武魂模拟器游戏。

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 格式化代码
npm run format
```

## 项目架构

### 管理器架构

重构后的项目采用统一的管理器架构，包含以下核心模块：

| 管理器 | 文件 | 主要功能 |
|---------|------|---------|
| **状态管理器** | [state-manager.js](file:///workspace/src/modules/core/state-manager.js) | 统一状态管理、订阅、变更通知、持久化 |
| **战力管理器** | [power-manager.js](file:///workspace/src/modules/core/power-manager.js) | 统一战力计算、组件详情查询 |
| **资源管理器** | [resource-manager.js](file:///workspace/src/modules/core/resource-manager.js) | 物品管理、使用、装备 |
| **武魂管理器** | [soul-manager.js](file:///workspace/src/modules/core/soul-manager.js) | 武魂觉醒、技能生成、二次觉醒、进化 |
| **魂环管理器** | [ring-manager.js](file:///workspace/src/modules/core/ring-manager.js) | 魂环生成、装备、卸下、融合 |
| **UI管理器** | [ui-manager.js](file:///workspace/src/modules/core/ui-manager.js) | 统一UI渲染、导航、通知 |

### 访问管理器 API

```javascript
// 通过统一API访问
window.__GAME_API__.managers.state
window.__GAME_API__.managers.power
window.__GAME_API__.managers.resource
window.__GAME_API__.managers.soul
window.__GAME_API__.managers.ring
window.__GAME_API__.managers.ui

// 或直接访问全局变量
window.gameState
window.powerManager
window.resourceManager
window.soulManager
window.ringManager
window.uiManager
```

## CI/CD 工作流程

### 工作流程文件

| 文件 | 描述 |
|------|------|
| [deploy.yml](file:///workspace/.github/workflows/deploy.yml) | GitHub Pages 部署工作流程 |
| [ci.yml](file:///workspace/.github/workflows/ci.yml) | 代码质量检查和构建验证 |

### 触发条件

- **推送代码到 main 分支**：自动部署到 GitHub Pages
- **推送代码到 develop 分支**：运行 CI 检查，不部署
- **Pull Request**：运行 CI 检查，确保代码质量

### CI 检查内容

1. **代码质量检查**：使用 Prettier 格式化验证
2. **多版本 Node 构建验证**：在 Node.js 18 和 20 上构建
3. **构建产物上传**：保存构建产物作为 Artifact

### 自动部署

推送代码到 `main` 分支将自动触发 GitHub Pages 部署。

### 手动部署步骤

1. Fork 本仓库
2. 进入 Settings → Pages
3. Source 选择 "GitHub Actions"
4. 推送代码到 main 分支即可自动部署

## 项目结构

```
├── index.html
├── src/
│   ├── main.js                 # 入口脚本
│   ├── game.js                # 传统游戏逻辑
│   ├── style.css
│   └── modules/
│       ├── core/              # 核心模块
│       │   ├── state-manager.js    # 状态管理
│       │   ├── power-manager.js    # 战力管理
│       │   ├── resource-manager.js # 资源管理
│       │   ├── soul-manager.js     # 武魂管理
│       │   ├── ring-manager.js     # 魂环管理
│       │   └── ui-manager.js       # UI管理
│       ├── config/             # 配置模块
│       ├── data/               # 数据模块
│       ├── systems/            # 系统模块
│       ├── ui/                 # UI模块
│       └── fx/                 # 特效模块
├── package.json
├── vite.config.js
├── .prettierrc                # Prettier 配置
└── .github/
    └── workflows/
        ├── deploy.yml          # GitHub Pages 部署
        └── ci.yml              # CI/CD 检查
```

## 开发指南

### 代码格式化

```bash
# 检查格式
npm run format:check

# 自动格式化
npm run format
```

## 许可证

MIT

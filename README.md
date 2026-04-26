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
```

## 自动部署

推送代码到 `main` 分支将自动触发 GitHub Pages 部署。

### 手动部署步骤

1. Fork 本仓库
2. 进入 Settings → Pages
3. Source 选择 "GitHub Actions"
4. 推送代码到 main 分支即可自动部署

## 项目结构

```
├── index.html          # Vite 入口
├── src/
│   ├── main.js        # 入口脚本
│   ├── style.css      # 样式
│   └── game.js        # 游戏逻辑
├── package.json
├── vite.config.js
└── .github/
    └── workflows/
        └── deploy.yml # GitHub Actions 部署配置
```

## 许可证

MIT

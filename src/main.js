// 武魂模拟器 - Vite 入口文件
import './style.css'

// 加载游戏脚本
import game from './game.js?raw'

// 将游戏脚本注入到页面
const script = document.createElement('script')
script.textContent = game
document.body.appendChild(script)

// 初始化背景星空
initBg()

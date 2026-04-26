// 武魂模拟器 - Vite 入口文件
import './style.css'

// 加载游戏脚本
import game from './game.js?raw'

// 确保 DOM 加载完成后再注入脚本
function init() {
  const script = document.createElement('script')
  script.textContent = game
  document.body.appendChild(script)
}

// 如果 DOM 已经加载完成，立即执行；否则等待 DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

/**
 * GM控制台模块
 * 提供开发者命令和调试功能
 */

import { G, saveG, loadG } from '../core/state.js';
import { notify, notifySuccess, notifyError } from '../core/notify.js';

// GM命令列表
const GM_COMMANDS = {
  // 角色相关
  'addExp': {
    desc: '添加经验值',
    usage: 'addExp <数量>',
    handler: (args) => {
      const amount = parseInt(args[0]) || 1000;
      G.exp += amount;
      return `添加了 ${amount} 经验值`;
    }
  },
  'setLevel': {
    desc: '设置等级',
    usage: 'setLevel <等级>',
    handler: (args) => {
      const level = parseInt(args[0]) || 1;
      G.lv = Math.max(1, Math.min(100, level));
      return `等级已设置为 ${G.lv}`;
    }
  },
  'addGold': {
    desc: '添加金币',
    usage: 'addGold <数量>',
    handler: (args) => {
      const amount = parseInt(args[0]) || 10000;
      G.gold += amount;
      return `添加了 ${amount} 金币`;
    }
  },
  'addDiamond': {
    desc: '添加 Diamond',
    usage: 'addDiamond <数量>',
    handler: (args) => {
      const amount = parseInt(args[0]) || 1000;
      G.diamond += amount;
      return `添加了 ${amount} Diamond`;
    }
  },
  
  // 系统相关
  'unlockAll': {
    desc: '解锁所有内容',
    usage: 'unlockAll',
    handler: () => {
      G.unlocked = ['awaken', 'hunt', 'lot', 'bag', 'arena', 'abyss', 'world', 'god'];
      return '已解锁所有内容';
    }
  },
  'resetSave': {
    desc: '重置存档',
    usage: 'resetSave',
    handler: () => {
      if (confirm('确定要重置存档吗？此操作不可撤销！')) {
        localStorage.removeItem('soulGameSave');
        location.reload();
        return '存档已重置';
      }
      return '已取消重置';
    }
  },
  'exportSave': {
    desc: '导出存档',
    usage: 'exportSave',
    handler: () => {
      const save = btoa(JSON.stringify(G));
      navigator.clipboard.writeText(save);
      return '存档已复制到剪贴板';
    }
  },
  'importSave': {
    desc: '导入存档',
    usage: 'importSave <存档数据>',
    handler: (args) => {
      try {
        const save = JSON.parse(atob(args.join(' ')));
        Object.assign(G, save);
        return '存档导入成功';
      } catch (e) {
        return '存档导入失败：' + e.message;
      }
    }
  },
  
  // 调试相关
  'showState': {
    desc: '显示当前状态',
    usage: 'showState',
    handler: () => {
      console.log('Current State:', G);
      return '状态已输出到控制台';
    }
  },
  'testNotify': {
    desc: '测试通知',
    usage: 'testNotify <消息>',
    handler: (args) => {
      const msg = args.join(' ') || '测试通知';
      notify(msg, 'info');
      return '已发送测试通知';
    }
  },
  
  // 帮助
  'help': {
    desc: '显示帮助信息',
    usage: 'help [命令]',
    handler: (args) => {
      if (args.length > 0) {
        const cmd = GM_COMMANDS[args[0]];
        if (cmd) {
          return `${args[0]}: ${cmd.desc}\n用法: ${cmd.usage}`;
        }
        return `未知命令: ${args[0]}`;
      }
      
      let helpText = '可用命令:\n';
      Object.entries(GM_COMMANDS).forEach(([name, cmd]) => {
        helpText += `  ${name}: ${cmd.desc}\n`;
      });
      return helpText;
    }
  }
};

/**
 * 执行GM命令
 */
export function executeGMCommand(input) {
  const parts = input.trim().split(/\s+/);
  const cmdName = parts[0];
  const args = parts.slice(1);
  
  const cmd = GM_COMMANDS[cmdName];
  if (!cmd) {
    return `未知命令: ${cmdName}。输入 "help" 查看可用命令。`;
  }
  
  try {
    return cmd.handler(args);
  } catch (e) {
    return `命令执行失败: ${e.message}`;
  }
}

/**
 * 显示GM控制台
 */
export function showGMConsole() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999;';
  
  const content = document.createElement('div');
  content.style.cssText = 'background:#1e293b;border:2px solid #fbbf24;border-radius:12px;padding:24px;max-width:600px;width:90%;max-height:80vh;overflow-y:auto;';
  
  content.innerHTML = `
    <h2 style="color:#fbbf24;margin-bottom:16px;">🔧 GM控制台</h2>
    <div style="margin-bottom:12px;">
      <input type="text" id="gmInput" style="width:100%;padding:8px;border:1px solid #334155;border-radius:6px;background:#0f172a;color:#e2e8f0;" placeholder="输入命令 (输入 help 查看帮助)">
    </div>
    <div id="gmOutput" style="background:#0f172a;border:1px solid #334155;border-radius:6px;padding:12px;min-height:200px;max-height:400px;overflow-y:auto;font-family:monospace;font-size:12px;color:#94a3b8;white-space:pre-wrap;"></div>
    <div style="margin-top:12px;text-align:right;">
      <button id="gmClose" style="padding:8px 16px;background:#334155;color:#e2e8f0;border:none;border-radius:6px;cursor:pointer;">关闭</button>
    </div>
  `;
  
  modal.appendChild(content);
  document.body.appendChild(modal);
  
  const input = $('#gmInput');
  const output = $('#gmOutput');
  
  input.focus();
  
  input.onkeydown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      if (cmd) {
        output.innerHTML += `\n> ${cmd}\n`;
        const result = executeGMCommand(cmd);
        output.innerHTML += `${result}\n`;
        output.scrollTop = output.scrollHeight;
        input.value = '';
        
        // 保存状态
        saveG();
      }
    }
  };
  
  $('#gmClose').onclick = () => {
    document.body.removeChild(modal);
  };
  
  modal.onclick = (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  };
}

/**
 * 初始化GM快捷键
 */
export function initGMShortcut() {
  document.addEventListener('keydown', (e) => {
    // Ctrl + Shift + G 打开GM控制台
    if (e.ctrlKey && e.shiftKey && e.key === 'G') {
      e.preventDefault();
      showGMConsole();
    }
  });
}

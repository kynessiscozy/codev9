/**
 * 音效反馈系统
 * 基于 Web Audio API 的程序化音效生成
 * 无需外部音频文件，实时合成游戏音效
 */

// ═════════════════════════════════════════════════
//  音频上下文管理
// ═════════════════════════════════════════════════

let audioCtx = null;
let masterGain = null;
let isMuted = false;
let isInitialized = false;

// 全局音量 (0-1)
let globalVolume = 0.5;

/**
 * 初始化音频系统
 */
export function initAudio() {
  if (isInitialized) return true;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      console.warn('Web Audio API 不支持');
      return false;
    }

    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = globalVolume;
    masterGain.connect(audioCtx.destination);

    isInitialized = true;
    console.log('🔊 音效系统已初始化');
    return true;
  } catch (e) {
    console.warn('音频初始化失败:', e);
    return false;
  }
}

/**
 * 确保音频上下文处于运行状态（处理浏览器的自动播放策略）
 */
function ensureContext() {
  if (!audioCtx) {
    initAudio();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// ═════════════════════════════════════════════════
//  基础合成器
// ═════════════════════════════════════════════════

function createOscillator(type, frequency, duration, options = {}) {
  if (!audioCtx || isMuted) return null;
  ensureContext();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

  if (options.frequencyEnvelope) {
    options.frequencyEnvelope(osc.frequency, audioCtx.currentTime);
  }

  gain.gain.setValueAtTime(options.volume || 0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  osc.connect(gain);
  gain.connect(masterGain);

  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + duration);

  return { osc, gain };
}

function createNoise(duration, options = {}) {
  if (!audioCtx || isMuted) return null;
  ensureContext();

  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (options.volume || 0.3);
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(options.volume || 0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  // 可选滤波器
  if (options.filterType) {
    const filter = audioCtx.createBiquadFilter();
    filter.type = options.filterType;
    filter.frequency.value = options.filterFreq || 1000;
    source.connect(filter);
    filter.connect(gain);
  } else {
    source.connect(gain);
  }

  gain.connect(masterGain);
  source.start(audioCtx.currentTime);
  source.stop(audioCtx.currentTime + duration);

  return { source, gain };
}

// ═════════════════════════════════════════════════
//  预设音效
// ═════════════════════════════════════════════════

/**
 * UI 点击音效
 */
export function sfxClick() {
  createOscillator('sine', 800, 0.08, { volume: 0.15 });
  setTimeout(() => createOscillator('sine', 1200, 0.06, { volume: 0.1 }), 30);
}

/**
 * 切换/打开面板音效
 */
export function sfxOpen() {
  createOscillator('sine', 400, 0.15, {
    volume: 0.2,
    frequencyEnvelope: (freq, t) => {
      freq.exponentialRampToValueAtTime(600, t + 0.15);
    }
  });
}

/**
 * 关闭面板音效
 */
export function sfxClose() {
  createOscillator('sine', 600, 0.12, {
    volume: 0.15,
    frequencyEnvelope: (freq, t) => {
      freq.exponentialRampToValueAtTime(300, t + 0.12);
    }
  });
}

/**
 * 武魂觉醒音效 - 根据品质变化
 * @param {string} quality - 品质key
 */
export function sfxAwaken(quality) {
  ensureContext();

  const qualityTiers = {
    common: { freq: 440, notes: 1, duration: 0.3 },
    rare: { freq: 554, notes: 2, duration: 0.4 },
    epic: { freq: 659, notes: 3, duration: 0.6 },
    legend: { freq: 880, notes: 4, duration: 0.8 },
    apex: { freq: 1100, notes: 5, duration: 1.0 },
    hc: { freq: 1320, notes: 4, duration: 0.9 },
    ha: { freq: 1760, notes: 5, duration: 1.2 },
    twin: { freq: 880, notes: 6, duration: 1.4 },
    triple: { freq: 880, notes: 7, duration: 1.8 },
  };

  const cfg = qualityTiers[quality] || qualityTiers.common;
  const scale = [1, 1.125, 1.25, 1.5, 1.667, 1.875, 2];

  for (let i = 0; i < cfg.notes; i++) {
    setTimeout(() => {
      const f = cfg.freq * scale[i % scale.length];
      const vol = 0.25 - i * 0.02;
      createOscillator('triangle', f, cfg.duration / cfg.notes + 0.2, { volume: vol });

      // 高级品质添加和声
      if (['legend', 'apex', 'twin', 'triple'].includes(quality)) {
        createOscillator('sine', f * 1.5, cfg.duration / cfg.notes + 0.3, { volume: vol * 0.4 });
      }
    }, i * (cfg.duration / cfg.notes) * 1000 * 0.6);
  }

  // 顶级品质添加冲击声
  if (['apex', 'twin', 'triple'].includes(quality)) {
    setTimeout(() => {
      createNoise(0.3, { volume: 0.15, filterType: 'lowpass', filterFreq: 800 });
    }, cfg.duration * 1000 * 0.3);
  }
}

/**
 * 升级音效
 */
export function sfxLevelUp() {
  ensureContext();
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    setTimeout(() => {
      createOscillator('sine', freq, 0.3, { volume: 0.25 });
      createOscillator('triangle', freq * 2, 0.2, { volume: 0.1 });
    }, i * 100);
  });
}

/**
 * 境界突破音效
 */
export function sfxRealmBreak() {
  ensureContext();

  // 低音轰鸣
  createOscillator('sawtooth', 80, 1.0, {
    volume: 0.2,
    frequencyEnvelope: (freq, t) => {
      freq.exponentialRampToValueAtTime(40, t + 1.0);
    }
  });

  // 上升音阶
  const notes = [440, 554, 659, 880, 1100, 1320];
  notes.forEach((freq, i) => {
    setTimeout(() => {
      createOscillator('sine', freq, 0.5, { volume: 0.2 });
    }, i * 120);
  });

  // 闪光声
  setTimeout(() => {
    createNoise(0.4, { volume: 0.1, filterType: 'highpass', filterFreq: 2000 });
  }, 500);
}

/**
 * 战斗命中音效
 */
export function sfxCombatHit() {
  createNoise(0.15, { volume: 0.2, filterType: 'lowpass', filterFreq: 1200 });
  createOscillator('square', 150, 0.1, { volume: 0.15 });
}

/**
 * 暴击音效
 */
export function sfxCrit() {
  ensureContext();
  createNoise(0.2, { volume: 0.25, filterType: 'bandpass', filterFreq: 2000 });
  createOscillator('sawtooth', 200, 0.3, {
    volume: 0.2,
    frequencyEnvelope: (freq, t) => {
      freq.exponentialRampToValueAtTime(50, t + 0.3);
    }
  });
}

/**
 * 获得魂环音效
 * @param {string} tier - 魂环年份等级
 */
export function sfxRingObtained(tier) {
  ensureContext();
  const isHighTier = ['百万年', '不可估量', '神赐'].includes(tier);

  const baseFreq = isHighTier ? 880 : 523;
  createOscillator('sine', baseFreq, 0.5, {
    volume: 0.25,
    frequencyEnvelope: (freq, t) => {
      freq.exponentialRampToValueAtTime(baseFreq * 1.5, t + 0.3);
      freq.exponentialRampToValueAtTime(baseFreq, t + 0.5);
    }
  });

  if (isHighTier) {
    createOscillator('triangle', baseFreq * 1.25, 0.6, { volume: 0.15 });
    setTimeout(() => createOscillator('sine', baseFreq * 2, 0.4, { volume: 0.15 }), 200);
  }
}

/**
 * 抽奖音效
 * @param {boolean} isRare - 是否稀有
 */
export function sfxLottery(isRare = false) {
  ensureContext();

  if (isRare) {
    const notes = [523, 659, 784, 1047, 1319];
    notes.forEach((freq, i) => {
      setTimeout(() => createOscillator('sine', freq, 0.3, { volume: 0.25 }), i * 80);
    });
  } else {
    createOscillator('sine', 440, 0.15, { volume: 0.15 });
    setTimeout(() => createOscillator('sine', 330, 0.12, { volume: 0.1 }), 80);
  }
}

/**
 * 错误/警告音效
 */
export function sfxError() {
  createOscillator('sawtooth', 200, 0.2, {
    volume: 0.15,
    frequencyEnvelope: (freq, t) => {
      freq.exponentialRampToValueAtTime(100, t + 0.2);
    }
  });
}

/**
 * 成功音效
 */
export function sfxSuccess() {
  createOscillator('sine', 523, 0.15, { volume: 0.2 });
  setTimeout(() => createOscillator('sine', 784, 0.25, { volume: 0.2 }), 100);
}

/**
 * 魂力增加音效
 */
export function sfxSPGain() {
  createOscillator('sine', 600, 0.1, { volume: 0.12 });
  setTimeout(() => createOscillator('sine', 900, 0.08, { volume: 0.08 }), 50);
}

/**
 * 融合成功音效
 */
export function sfxFusion() {
  ensureContext();
  createOscillator('sine', 440, 0.3, { volume: 0.2 });
  setTimeout(() => createOscillator('sine', 554, 0.3, { volume: 0.2 }), 150);
  setTimeout(() => createOscillator('sine', 659, 0.4, { volume: 0.25 }), 300);
  setTimeout(() => {
    createOscillator('sine', 880, 0.5, { volume: 0.2 });
    createOscillator('triangle', 440, 0.6, { volume: 0.1 });
  }, 450);
}

// ═════════════════════════════════════════════════
//  环境音 / BGM 片段
// ═════════════════════════════════════════════════

let ambientOscillators = [];
let isAmbientPlaying = false;

/**
 * 播放环境氛围音
 */
export function playAmbient() {
  if (!audioCtx || isMuted || isAmbientPlaying) return;
  ensureContext();
  isAmbientPlaying = true;

  // 低频 drone
  const drone = audioCtx.createOscillator();
  drone.type = 'sine';
  drone.frequency.value = 60;
  const droneGain = audioCtx.createGain();
  droneGain.gain.value = 0.03;
  drone.connect(droneGain);
  droneGain.connect(masterGain);
  drone.start();
  ambientOscillators.push({ osc: drone, gain: droneGain });

  // 次谐波
  const sub = audioCtx.createOscillator();
  sub.type = 'triangle';
  sub.frequency.value = 120;
  const subGain = audioCtx.createGain();
  subGain.gain.value = 0.015;
  sub.connect(subGain);
  subGain.connect(masterGain);
  sub.start();
  ambientOscillators.push({ osc: sub, gain: subGain });
}

/**
 * 停止环境音
 */
export function stopAmbient() {
  ambientOscillators.forEach(({ osc, gain }) => {
    try {
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
      osc.stop(audioCtx.currentTime + 1.5);
    } catch (e) {}
  });
  ambientOscillators = [];
  isAmbientPlaying = false;
}

// ═════════════════════════════════════════════════
//  控制接口
// ═════════════════════════════════════════════════

/**
 * 设置静音
 */
export function setMute(muted) {
  isMuted = muted;
  if (masterGain) {
    masterGain.gain.setTargetAtTime(muted ? 0 : globalVolume, audioCtx.currentTime, 0.1);
  }
}

/**
 * 切换静音
 */
export function toggleMute() {
  setMute(!isMuted);
  return isMuted;
}

/**
 * 设置音量
 * @param {number} vol - 0-1
 */
export function setVolume(vol) {
  globalVolume = Math.max(0, Math.min(1, vol));
  if (masterGain && !isMuted) {
    masterGain.gain.setTargetAtTime(globalVolume, audioCtx.currentTime, 0.1);
  }
}

/**
 * 获取音量
 */
export function getVolume() {
  return globalVolume;
}

/**
 * 是否静音
 */
export function getMuteState() {
  return isMuted;
}

// ═════════════════════════════════════════════════
//  事件绑定辅助
// ═════════════════════════════════════════════════

/**
 * 自动绑定音效到交互元素
 * 为所有按钮和可点击元素添加点击音效
 */
export function autoBindSFX() {
  // 使用事件委托
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .ni, [onclick], .card, .zone-card, .sol-act, .btab');
    if (target) {
      sfxClick();
    }
  }, true);

  console.log('🔊 自动音效绑定完成');
}

/**
 * 创建音效开关按钮
 */
export function createMuteButton() {
  const btn = document.createElement('div');
  btn.id = 'sfx-mute-btn';
  btn.innerHTML = '🔊';
  btn.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 14px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(5,8,16,.85);
    border: 1px solid var(--bdr);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 200;
    font-size: 16px;
    transition: all .2s;
    backdrop-filter: blur(8px);
  `;

  btn.addEventListener('click', () => {
    const muted = toggleMute();
    btn.innerHTML = muted ? '🔇' : '🔊';
    btn.style.opacity = muted ? '0.6' : '1';
  });

  document.body.appendChild(btn);
  return btn;
}

// 默认导出
export default {
  init: initAudio,
  sfxClick,
  sfxOpen,
  sfxClose,
  sfxAwaken,
  sfxLevelUp,
  sfxRealmBreak,
  sfxCombatHit,
  sfxCrit,
  sfxRingObtained,
  sfxLottery,
  sfxError,
  sfxSuccess,
  sfxSPGain,
  sfxFusion,
  playAmbient,
  stopAmbient,
  setMute,
  toggleMute,
  setVolume,
  getVolume,
  getMuteState,
  autoBindSFX,
  createMuteButton,
};

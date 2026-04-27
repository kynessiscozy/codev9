/**
 * WebGL 粒子特效系统
 * 提供高性能的粒子渲染，用于觉醒、升级、战斗等场景
 */

// ═════════════════════════════════════════════════
//  WebGL 着色器
// ═════════════════════════════════════════════════

const VERTEX_SHADER = `
attribute vec2 a_position;
attribute vec2 a_velocity;
attribute float a_life;
attribute float a_maxLife;
attribute float a_size;
attribute vec4 a_color;
attribute float a_type;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_gravity;

varying float v_life;
varying float v_maxLife;
varying vec4 v_color;
varying float v_type;
varying float v_age;

void main() {
  float age = a_maxLife - a_life;
  v_age = age;
  v_life = a_life;
  v_maxLife = a_maxLife;
  v_color = a_color;
  v_type = a_type;

  vec2 pos = a_position;
  pos += a_velocity * age;
  pos += u_gravity * age * age * 0.5;

  // 螺旋效果 (type 1)
  if (a_type > 0.5 && a_type < 1.5) {
    float angle = age * 3.0 + a_position.x;
    float radius = age * 50.0;
    pos.x += cos(angle) * radius * 0.01;
    pos.y += sin(angle) * radius * 0.01;
  }

  // 爆炸扩散效果 (type 2)
  if (a_type > 1.5 && a_type < 2.5) {
    float expansion = 1.0 + age * 2.0;
    vec2 dir = normalize(a_velocity + vec2(0.001));
    pos = a_position + dir * expansion * 80.0 * (a_size / 3.0);
  }

  vec2 clipSpace = ((pos / u_resolution) * 2.0) - 1.0;
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

  float lifeRatio = clamp(a_life / a_maxLife, 0.0, 1.0);
  gl_PointSize = a_size * (0.5 + lifeRatio * 0.5) * (1.0 + sin(age * 5.0) * 0.1);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

varying float v_life;
varying float v_maxLife;
varying vec4 v_color;
varying float v_type;
varying float v_age;

uniform float u_time;

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);

  if (dist > 0.5) discard;

  float lifeRatio = clamp(v_life / v_maxLife, 0.0, 1.0);

  // 基础圆形粒子
  float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

  // 发光核心
  float core = 1.0 - smoothstep(0.0, 0.2, dist);
  alpha += core * 0.5;

  // 星形粒子 (type 3)
  if (v_type > 2.5 && v_type < 3.5) {
    float angle = atan(coord.y, coord.x);
    float star = 0.5 + 0.5 * cos(angle * 5.0);
    alpha *= 0.7 + star * 0.3;
  }

  // 菱形粒子 (type 4)
  if (v_type > 3.5) {
    float diamond = 1.0 - abs(coord.x) - abs(coord.y);
    if (diamond < 0.0) discard;
    alpha = diamond * 2.0;
  }

  // 生命衰减
  float fadeIn = smoothstep(0.0, 0.15, 1.0 - lifeRatio);
  float fadeOut = smoothstep(0.0, 0.3, lifeRatio);
  alpha *= fadeIn * fadeOut;

  // 颜色随时间变化
  vec3 color = v_color.rgb;
  color += vec3(sin(v_age * 3.0) * 0.1, cos(v_age * 2.0) * 0.1, sin(v_age * 4.0) * 0.1);

  gl_FragColor = vec4(color, alpha * v_color.a);
}
`;

// ═════════════════════════════════════════════════
//  WebGL 上下文管理
// ═════════════════════════════════════════════════

let gl = null;
let program = null;
let canvas = null;
let animationId = null;
let isInitialized = false;

const MAX_PARTICLES = 3000;
let particles = [];
let nextParticleIdx = 0;

// 缓冲区
let positionBuffer, velocityBuffer, lifeBuffer, maxLifeBuffer;
let sizeBuffer, colorBuffer, typeBuffer;

// 属性位置缓存
let attribLocations = {};
let uniformLocations = {};

/**
 * 初始化 WebGL 粒子系统
 */
export function initParticleSystem() {
  // 粒子效果已禁用
  console.log('✨ 粒子系统已禁用');
  return false;
}
  if (isInitialized) return true;

  canvas = document.createElement('canvas');
  canvas.id = 'webgl-particles';
  canvas.style.cssText = 'position:fixed;inset:0;z-index:150;pointer-events:none;width:100%;height:100%;';
  document.body.appendChild(canvas);

  gl = canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true });
  if (!gl) {
    console.warn('WebGL 不支持，粒子系统将回退到 Canvas2D');
    return false;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
  if (!program) return false;

  gl.useProgram(program);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

  // 获取属性和 uniform 位置
  attribLocations = {
    position: gl.getAttribLocation(program, 'a_position'),
    velocity: gl.getAttribLocation(program, 'a_velocity'),
    life: gl.getAttribLocation(program, 'a_life'),
    maxLife: gl.getAttribLocation(program, 'a_maxLife'),
    size: gl.getAttribLocation(program, 'a_size'),
    color: gl.getAttribLocation(program, 'a_color'),
    type: gl.getAttribLocation(program, 'a_type'),
  };

  uniformLocations = {
    resolution: gl.getUniformLocation(program, 'u_resolution'),
    time: gl.getUniformLocation(program, 'u_time'),
    gravity: gl.getUniformLocation(program, 'u_gravity'),
  };

  initBuffers();
  isInitialized = true;

  startRenderLoop();
  console.log('✨ WebGL 粒子系统已初始化');
  return true;
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vsSource, fsSource) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

function initBuffers() {
  const arrays = {
    position: new Float32Array(MAX_PARTICLES * 2),
    velocity: new Float32Array(MAX_PARTICLES * 2),
    life: new Float32Array(MAX_PARTICLES),
    maxLife: new Float32Array(MAX_PARTICLES),
    size: new Float32Array(MAX_PARTICLES),
    color: new Float32Array(MAX_PARTICLES * 4),
    type: new Float32Array(MAX_PARTICLES),
  };

  positionBuffer = createBuffer(attribLocations.position, 2, arrays.position);
  velocityBuffer = createBuffer(attribLocations.velocity, 2, arrays.velocity);
  lifeBuffer = createBuffer(attribLocations.life, 1, arrays.life);
  maxLifeBuffer = createBuffer(attribLocations.maxLife, 1, arrays.maxLife);
  sizeBuffer = createBuffer(attribLocations.size, 1, arrays.size);
  colorBuffer = createBuffer(attribLocations.color, 4, arrays.color);
  typeBuffer = createBuffer(attribLocations.type, 1, arrays.type);
}

function createBuffer(location, size, data) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
  return { buffer, data };
}

function resizeCanvas() {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
}

// ═════════════════════════════════════════════════
//  粒子发射器
// ═════════════════════════════════════════════════

const EMITTERS = [];

/**
 * 创建粒子发射器
 * @param {Object} config - 配置对象
 */
export function createEmitter(config) {
  const emitter = {
    x: config.x || canvas?.width / 2 || window.innerWidth / 2,
    y: config.y || canvas?.height / 2 || window.innerHeight / 2,
    rate: config.rate || 10,
    burst: config.burst || 0,
    color: config.color || [1, 1, 1, 1],
    colorVar: config.colorVar || 0.2,
    size: config.size || 3,
    sizeVar: config.sizeVar || 1,
    speed: config.speed || 2,
    speedVar: config.speedVar || 1,
    life: config.life || 60,
    lifeVar: config.lifeVar || 20,
    gravity: config.gravity || [0, 0.05],
    type: config.type || 0,
    spread: config.spread || Math.PI * 2,
    angle: config.angle || 0,
    active: true,
    elapsed: 0,
    duration: config.duration || Infinity,
    onComplete: config.onComplete || null,
  };

  EMITTERS.push(emitter);

  // 立即爆发
  if (emitter.burst > 0) {
    emitBurst(emitter);
  }

  return emitter;
}

function emitBurst(emitter) {
  for (let i = 0; i < emitter.burst; i++) {
    spawnParticle(emitter);
  }
}

function spawnParticle(emitter) {
  if (particles.length >= MAX_PARTICLES) return;

  const angle = emitter.angle + (Math.random() - 0.5) * emitter.spread;
  const speed = emitter.speed + (Math.random() - 0.5) * emitter.speedVar;

  const p = {
    x: emitter.x + (Math.random() - 0.5) * 10,
    y: emitter.y + (Math.random() - 0.5) * 10,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: emitter.life + (Math.random() - 0.5) * emitter.lifeVar,
    maxLife: emitter.life + (Math.random() - 0.5) * emitter.lifeVar,
    size: Math.max(0.5, emitter.size + (Math.random() - 0.5) * emitter.sizeVar),
    color: [
      Math.max(0, Math.min(1, emitter.color[0] + (Math.random() - 0.5) * emitter.colorVar)),
      Math.max(0, Math.min(1, emitter.color[1] + (Math.random() - 0.5) * emitter.colorVar)),
      Math.max(0, Math.min(1, emitter.color[2] + (Math.random() - 0.5) * emitter.colorVar)),
      emitter.color[3] || 1,
    ],
    type: emitter.type,
    active: true,
  };

  particles.push(p);
}

/**
 * 销毁发射器
 */
export function destroyEmitter(emitter) {
  const idx = EMITTERS.indexOf(emitter);
  if (idx >= 0) EMITTERS.splice(idx, 1);
}

// ═════════════════════════════════════════════════
//  渲染循环
// ═════════════════════════════════════════════════

let lastTime = 0;

function startRenderLoop() {
  function render(timestamp) {
    const dt = Math.min((timestamp - lastTime) / 16.67, 3);
    lastTime = timestamp;

    updateEmitters(dt);
    updateParticles(dt);
    drawParticles(timestamp);

    animationId = requestAnimationFrame(render);
  }
  animationId = requestAnimationFrame(render);
}

function updateEmitters(dt) {
  for (let i = EMITTERS.length - 1; i >= 0; i--) {
    const e = EMITTERS[i];
    if (!e.active) {
      EMITTERS.splice(i, 1);
      continue;
    }

    e.elapsed += dt;
    if (e.elapsed >= e.duration) {
      e.active = false;
      if (e.onComplete) e.onComplete();
      continue;
    }

    // 持续发射
    if (e.rate > 0) {
      const count = Math.floor(e.rate * dt);
      for (let j = 0; j < count; j++) {
        spawnParticle(e);
      }
    }
  }
}

function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles(time) {
  if (!gl || !canvas) return;

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (particles.length === 0) return;

  const count = Math.min(particles.length, MAX_PARTICLES);

  // 更新缓冲区数据
  for (let i = 0; i < count; i++) {
    const p = particles[i];
    positionBuffer.data[i * 2] = p.x;
    positionBuffer.data[i * 2 + 1] = p.y;
    velocityBuffer.data[i * 2] = p.vx;
    velocityBuffer.data[i * 2 + 1] = p.vy;
    lifeBuffer.data[i] = p.life;
    maxLifeBuffer.data[i] = p.maxLife;
    sizeBuffer.data[i] = p.size;
    colorBuffer.data[i * 4] = p.color[0];
    colorBuffer.data[i * 4 + 1] = p.color[1];
    colorBuffer.data[i * 4 + 2] = p.color[2];
    colorBuffer.data[i * 4 + 3] = p.color[3];
    typeBuffer.data[i] = p.type;
  }

  // 上传数据
  uploadBuffer(positionBuffer, count * 2);
  uploadBuffer(velocityBuffer, count * 2);
  uploadBuffer(lifeBuffer, count);
  uploadBuffer(maxLifeBuffer, count);
  uploadBuffer(sizeBuffer, count);
  uploadBuffer(colorBuffer, count * 4);
  uploadBuffer(typeBuffer, count);

  // 设置 uniform
  gl.uniform2f(uniformLocations.resolution, canvas.width, canvas.height);
  gl.uniform1f(uniformLocations.time, time / 1000);
  gl.uniform2f(uniformLocations.gravity, 0, 0.02);

  gl.drawArrays(gl.POINTS, 0, count);
}

function uploadBuffer(bufObj, count) {
  gl.bindBuffer(gl.ARRAY_BUFFER, bufObj.buffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, bufObj.data.subarray(0, count));
}

// ═════════════════════════════════════════════════
//  预设特效
// ═════════════════════════════════════════════════

/**
 * 觉醒爆发特效
 * @param {string} color - 主色调 (hex)
 * @param {number} x - 屏幕X坐标 (可选，默认居中)
 * @param {number} y - 屏幕Y坐标 (可选)
 */
export function fxAwakenBurst(color = '#ffd700', x, y) {
  if (!isInitialized && !initParticleSystem()) return;

  const rgb = hexToRgb(color);
  const cx = x || (canvas?.width / 2 / (canvas?.width / window.innerWidth || 1)) || window.innerWidth / 2;
  const cy = y || window.innerHeight * 0.42;

  // 中心爆炸
  createEmitter({
    x: cx, y: cy,
    burst: 120,
    color: [rgb.r / 255, rgb.g / 255, rgb.b / 255, 1],
    colorVar: 0.3,
    size: 4, sizeVar: 3,
    speed: 4, speedVar: 3,
    life: 50, lifeVar: 20,
    type: 2,
    spread: Math.PI * 2,
  });

  // 螺旋上升粒子
  createEmitter({
    x: cx, y: cy,
    burst: 60,
    color: [1, 1, 0.8, 0.9],
    colorVar: 0.2,
    size: 3, sizeVar: 2,
    speed: 2, speedVar: 1,
    life: 70, lifeVar: 20,
    type: 1,
    spread: Math.PI,
    angle: -Math.PI / 2,
  });

  // 星光粒子
  createEmitter({
    x: cx, y: cy,
    burst: 30,
    color: [1, 1, 1, 0.8],
    colorVar: 0.1,
    size: 5, sizeVar: 2,
    speed: 1.5, speedVar: 1,
    life: 80, lifeVar: 20,
    type: 3,
    spread: Math.PI * 2,
  });
}

/**
 * 升级光环特效
 */
export function fxLevelUp(x, y) {
  if (!isInitialized && !initParticleSystem()) return;

  const cx = x || window.innerWidth / 2;
  const cy = y || window.innerHeight * 0.35;

  createEmitter({
    x: cx, y: cy,
    burst: 80,
    color: [0.2, 0.8, 1, 1],
    colorVar: 0.2,
    size: 3, sizeVar: 2,
    speed: 3, speedVar: 2,
    life: 60, lifeVar: 15,
    type: 1,
    spread: Math.PI * 2,
  });

  createEmitter({
    x: cx, y: cy,
    burst: 40,
    color: [1, 0.9, 0.3, 0.9],
    colorVar: 0.1,
    size: 4, sizeVar: 2,
    speed: 2, speedVar: 1,
    life: 50, lifeVar: 10,
    type: 3,
    spread: Math.PI * 2,
  });
}

/**
 * 境界突破特效
 */
export function fxRealmBreakthrough(x, y) {
  if (!isInitialized && !initParticleSystem()) return;

  const cx = x || window.innerWidth / 2;
  const cy = y || window.innerHeight * 0.4;

  // 金色光环扩散
  createEmitter({
    x: cx, y: cy,
    burst: 150,
    color: [1, 0.84, 0, 1],
    colorVar: 0.15,
    size: 3, sizeVar: 2,
    speed: 5, speedVar: 2,
    life: 70, lifeVar: 20,
    type: 2,
    spread: Math.PI * 2,
  });

  // 上升光柱
  for (let i = 0; i < 5; i++) {
    createEmitter({
      x: cx + (Math.random() - 0.5) * 60,
      y: cy + (Math.random() - 0.5) * 20,
      burst: 20,
      color: [0.9, 0.7, 0.2, 0.8],
      colorVar: 0.2,
      size: 2, sizeVar: 1,
      speed: 3, speedVar: 1,
      life: 60, lifeVar: 15,
      type: 0,
      spread: 0.3,
      angle: -Math.PI / 2,
    });
  }
}

/**
 * 战斗命中特效
 */
export function fxCombatHit(x, y, color = '#ef4444') {
  if (!isInitialized && !initParticleSystem()) return;

  const rgb = hexToRgb(color);

  createEmitter({
    x, y,
    burst: 25,
    color: [rgb.r / 255, rgb.g / 255, rgb.b / 255, 1],
    colorVar: 0.2,
    size: 3, sizeVar: 2,
    speed: 4, speedVar: 2,
    life: 25, lifeVar: 8,
    type: 2,
    spread: Math.PI * 2,
  });
}

/**
 * 魂环获得特效
 */
export function fxRingObtained(x, y, tierColor) {
  if (!isInitialized && !initParticleSystem()) return;

  const rgb = hexToRgb(tierColor);

  createEmitter({
    x, y,
    burst: 50,
    color: [rgb.r / 255, rgb.g / 255, rgb.b / 255, 1],
    colorVar: 0.2,
    size: 3, sizeVar: 2,
    speed: 3, speedVar: 1.5,
    life: 45, lifeVar: 12,
    type: 3,
    spread: Math.PI * 2,
  });

  createEmitter({
    x, y,
    burst: 30,
    color: [1, 1, 1, 0.7],
    colorVar: 0.1,
    size: 2, sizeVar: 1,
    speed: 2, speedVar: 1,
    life: 40, lifeVar: 10,
    type: 0,
    spread: Math.PI * 2,
  });
}

/**
 * 抽奖闪光特效
 */
export function fxLotteryFlash(x, y, qualityColor) {
  if (!isInitialized && !initParticleSystem()) return;

  const rgb = hexToRgb(qualityColor);

  createEmitter({
    x, y,
    burst: 80,
    color: [rgb.r / 255, rgb.g / 255, rgb.b / 255, 1],
    colorVar: 0.3,
    size: 4, sizeVar: 3,
    speed: 5, speedVar: 3,
    life: 55, lifeVar: 15,
    type: 3,
    spread: Math.PI * 2,
  });
}

/**
 * 环境漂浮粒子（持续）
 */
export function fxAmbientParticles() {
  if (!isInitialized && !initParticleSystem()) return;

  return createEmitter({
    x: window.innerWidth / 2,
    y: window.innerHeight + 10,
    rate: 0.5,
    color: [0.8, 0.75, 0.5, 0.4],
    colorVar: 0.2,
    size: 2, sizeVar: 1,
    speed: 0.8, speedVar: 0.4,
    life: 200, lifeVar: 50,
    type: 0,
    spread: Math.PI,
    angle: -Math.PI / 2,
    gravity: [0, -0.01],
    duration: Infinity,
  });
}

// ═════════════════════════════════════════════════
//  工具函数
// ═════════════════════════════════════════════════

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
}

/**
 * 销毁粒子系统
 */
export function destroyParticleSystem() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  EMITTERS.length = 0;
  particles.length = 0;
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
  canvas = null;
  gl = null;
  isInitialized = false;
}

/**
 * 获取粒子统计
 */
export function getParticleStats() {
  return {
    activeParticles: particles.length,
    activeEmitters: EMITTERS.length,
    maxParticles: MAX_PARTICLES,
    initialized: isInitialized,
  };
}

// 默认导出
export default {
  init: initParticleSystem,
  destroy: destroyParticleSystem,
  createEmitter,
  destroyEmitter,
  fxAwakenBurst,
  fxLevelUp,
  fxRealmBreakthrough,
  fxCombatHit,
  fxRingObtained,
  fxLotteryFlash,
  fxAmbientParticles,
  getStats: getParticleStats,
};

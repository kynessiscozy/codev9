#!/usr/bin/env node
/**
 * 武魂图标图片优化脚本
 * 功能：
 * 1. 压缩现有 webp 图片
 * 2. 调整图片尺寸到统一大小 (建议 256x256)
 * 3. 生成响应式图片集
 */

import { execSync } from 'child_process';
import { readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOULS_DIR = join(__dirname, '../public/souls');
const OUTPUT_DIR = join(__dirname, '../public/souls-optimized');
const TARGET_SIZE = 256; // 目标尺寸

// 检查是否安装了 sharp
function checkSharp() {
  try {
    import('sharp');
    return true;
  } catch {
    return false;
  }
}

// 使用 ImageMagick 压缩图片
function compressWithImageMagick(input, output, quality = 75) {
  try {
    execSync(`convert "${input}" -resize ${TARGET_SIZE}x${TARGET_SIZE} -quality ${quality} "${output}"`, {
      stdio: 'pipe'
    });
    return true;
  } catch (error) {
    console.error(`Failed to process ${input}: ${error.message}`);
    return false;
  }
}

// 获取目录中所有文件
function getAllFiles(dir) {
  const files = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else if (entry.isFile() && /\.(webp|png|jpg|jpeg)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// 主函数
async function optimize() {
  console.log('🎨 开始优化武魂图标...\n');
  
  const files = getAllFiles(SOULS_DIR);
  console.log(`找到 ${files.length} 个图片文件\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  // 创建输出目录结构
  const qualityDirs = ['common', 'rare', 'epic', 'legend', 'apex', 'hc', 'ha', 'twin', 'triple', 'god'];
  for (const qDir of qualityDirs) {
    const outDir = join(OUTPUT_DIR, qDir);
    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true });
    }
  }
  
  for (const file of files) {
    const relativePath = file.replace(SOULS_DIR + '/', '');
    const outputfile = join(OUTPUT_DIR, relativePath);
    
    // 确保输出目录存在
    const outputDir = dirname(outputfile);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
    
    const originalSize = statSync(file).size;
    
    if (compressWithImageMagick(file, outputfile, 75)) {
      const newSize = statSync(outputfile).size;
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      
      console.log(`✓ ${relativePath}`);
      console.log(`  原始：${(originalSize / 1024).toFixed(1)} KB → 优化：${(newSize / 1024).toFixed(1)} KB (节省 ${savings}%)`);
      
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log(`\n✅ 优化完成！`);
  console.log(`成功：${successCount} | 失败：${failCount}`);
  
  // 计算总节省空间
  const originalTotal = files.reduce((sum, f) => sum + statSync(f).size, 0);
  const optimizedFiles = getAllFiles(OUTPUT_DIR);
  const optimizedTotal = optimizedFiles.reduce((sum, f) => sum + statSync(f).size, 0);
  const totalSavings = ((1 - optimizedTotal / originalTotal) * 100).toFixed(1);
  
  console.log(`\n📊 总体统计:`);
  console.log(`原始总大小：${(originalTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`优化后总大小：${(optimizedTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`总节省：${totalSavings}% (${((originalTotal - optimizedTotal) / 1024 / 1024).toFixed(2)} MB)`);
}

// 运行优化
optimize().catch(console.error);

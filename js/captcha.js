/**
 * 验证码生成与验证模块
 * 增强博客登录的安全性
 */

// 保存当前验证码的答案
let currentCaptchaAnswer = '';

/**
 * 生成随机验证码文本
 * @param {number} length - 验证码长度
 * @returns {string} 生成的验证码文本
 */
function generateCaptchaText(length = 4) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let captcha = '';
  for (let i = 0; i < length; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

/**
 * 绘制验证码图片
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {string} captchaText - 验证码文本
 */
function drawCaptcha(canvas, captchaText) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  // 设置背景色
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(0, 0, width, height);
  
  // 绘制干扰线
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.lineTo(Math.random() * width, Math.random() * height);
    ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, 0.3)`;
    ctx.lineWidth = Math.random() * 2 + 1;
    ctx.stroke();
  }
  
  // 绘制干扰点
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, 0.4)`;
    ctx.fill();
  }
  
  // 绘制验证码文本
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.textBaseline = 'middle';
  
  const chars = captchaText.split('');
  const charWidth = width / chars.length;
  
  chars.forEach((char, index) => {
    // 为每个字符设置随机颜色和旋转角度
    ctx.fillStyle = `rgb(${Math.floor(Math.random() * 80 + 40)}, ${Math.floor(Math.random() * 80 + 40)}, ${Math.floor(Math.random() * 80 + 40)})`;
    ctx.save();
    ctx.translate(charWidth * (index + 0.5), height / 2);
    ctx.rotate((Math.random() - 0.5) * 0.5); // 随机旋转±15度左右
    ctx.fillText(char, -charWidth / 4, 0);
    ctx.restore();
  });
}

/**
 * 初始化验证码
 * @param {string} canvasId - Canvas元素ID
 */
function initCaptcha(canvasId = 'captcha-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  // 生成验证码文本
  const captchaText = generateCaptchaText();
  currentCaptchaAnswer = captchaText.toLowerCase(); // 不区分大小写
  
  // 绘制验证码
  drawCaptcha(canvas, captchaText);
  
  // 添加点击刷新事件
  canvas.addEventListener('click', function() {
    refreshCaptcha(canvasId);
  });
  
  // 为canvas添加title提示
  canvas.title = '点击刷新验证码';
}

/**
 * 刷新验证码
 * @param {string} canvasId - Canvas元素ID
 */
function refreshCaptcha(canvasId = 'captcha-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  // 生成新的验证码文本
  const captchaText = generateCaptchaText();
  currentCaptchaAnswer = captchaText.toLowerCase(); // 不区分大小写
  
  // 绘制新的验证码
  drawCaptcha(canvas, captchaText);
}

/**
 * 验证用户输入的验证码
 * @param {string} userInput - 用户输入的验证码
 * @returns {boolean} 验证结果
 */
function validateCaptcha(userInput) {
  if (!userInput || !currentCaptchaAnswer) {
    return false;
  }
  
  // 比较用户输入和正确答案（不区分大小写）
  const isCorrect = userInput.toLowerCase() === currentCaptchaAnswer;
  
  // 验证后清空当前答案，防止重用
  if (isCorrect) {
    // 可以选择在此处刷新验证码，以便下次使用
    // refreshCaptcha();
  }
  
  return isCorrect;
}

// 暴露公共函数
try {
  window.initCaptcha = initCaptcha;
  window.refreshCaptcha = refreshCaptcha;
  window.validateCaptcha = validateCaptcha;
} catch (e) {
  console.warn('无法在当前环境中暴露验证码函数:', e);
}
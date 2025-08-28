// Time-based theme color switching
// Applies CSS variables to drive navbar and sidebar colors across the site.
(function () {
  function applyTimeTheme(timeClass) {
    const root = document.documentElement;
    
    // 移除所有时间段类
    const timeClasses = [
      'theme-time-0-2', 'theme-time-2-4', 'theme-time-4-6', 'theme-time-6-8',
      'theme-time-8-10', 'theme-time-10-12', 'theme-time-12-14', 'theme-time-14-16',
      'theme-time-16-18', 'theme-time-18-20', 'theme-time-20-22', 'theme-time-22-24'
    ];
    
    timeClasses.forEach(cls => {
      document.body.classList.remove(cls);
    });
    
    // 添加当前时间段的类
    if (timeClass) {
      document.body.classList.add(timeClass);
    }
    
    // 标记模式用于CSS定位
    root.setAttribute('data-time-theme', timeClass || 'default');
  }

  function setTimeBasedTheme() {
    const now = new Date();
    const hours = now.getHours();
    
    let timeClass = '';
    
    // 根据小时确定时间段类
    if (hours >= 0 && hours < 2) {
      timeClass = 'theme-time-0-2';      // 墨黑
    } else if (hours >= 2 && hours < 4) {
      timeClass = 'theme-time-2-4';      // 靛蓝
    } else if (hours >= 4 && hours < 6) {
      timeClass = 'theme-time-4-6';      // 鱼肚白
    } else if (hours >= 6 && hours < 8) {
      timeClass = 'theme-time-6-8';      // 橘粉
    } else if (hours >= 8 && hours < 10) {
      timeClass = 'theme-time-8-10';     // 鹅黄
    } else if (hours >= 10 && hours < 12) {
      timeClass = 'theme-time-10-12';    // 浅金
    } else if (hours >= 12 && hours < 14) {
      timeClass = 'theme-time-12-14';    // 绯红
    } else if (hours >= 14 && hours < 16) {
      timeClass = 'theme-time-14-16';    // 天蓝
    } else if (hours >= 16 && hours < 18) {
      timeClass = 'theme-time-16-18';    // 琥珀橙
    } else if (hours >= 18 && hours < 20) {
      timeClass = 'theme-time-18-20';    // 玫紫
    } else if (hours >= 20 && hours < 22) {
      timeClass = 'theme-time-20-22';    // 藏青
    } else {
      timeClass = 'theme-time-22-24';    // 黛灰
    }

    applyTimeTheme(timeClass);
    
    // 输出当前时间段信息（调试用）
    console.log(`当前时间: ${hours}:00, 应用主题: ${timeClass}`);
  }

  // 初始化和定时更新
  setTimeBasedTheme();
  setInterval(setTimeBasedTheme, 60000); // 每分钟检查一次
})();



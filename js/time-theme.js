// Time-based theme color switching
// Applies CSS variables to drive navbar and sidebar colors across the site.
(function () {
  function applyPalette(palette, mode) {
    const root = document.documentElement;
    // Primary palette
    root.style.setProperty('--theme-primary', palette.primary);
    root.style.setProperty('--theme-primary-dark', palette.primaryDark);
    root.style.setProperty('--theme-primary-light', palette.primaryLight);
    // Text + sidebar
    root.style.setProperty('--theme-text', palette.text);
    root.style.setProperty('--sidebar-bg', palette.sidebarBg);
    root.style.setProperty('--sidebar-text', palette.sidebarText);
    // 不再覆盖导航栏背景色，保持CSS中设置的浅灰色
    // root.style.setProperty('--navbar-bg', palette.navbarBg);

    // Map to NexT variables used by navbar/menu
    root.style.setProperty('--brand-color', palette.primaryDark);
    root.style.setProperty('--brand-hover-color', palette.primary);
    root.style.setProperty('--link-color', palette.primaryDark);
    root.style.setProperty('--link-hover-color', palette.primary);
    root.style.setProperty('--menu-item-bg-color', palette.primaryLight);
    root.style.setProperty('--text-color', palette.text);
    // Mark mode for CSS targeting
    root.setAttribute('data-time-theme', mode);
  }

  function setTimeBasedTheme() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours + minutes / 60;

    // Default: light sky blue
    let palette = {
      primary: '#66B2FF',
      primaryDark: '#4D94FF',
      primaryLight: '#99CCFF',
      text: '#333',
      sidebarBg: '#66B2FF',
      sidebarText: '#fff',
      navbarBg: '#66B2FF'
    };
    let mode = 'light';

    if (time >= 0 && time < 6) {
      // 00:00 - 06:00 浅天蓝
      palette = {
        primary: '#87CEEB',
        primaryDark: '#66B2FF',
        primaryLight: '#B8E2F2',
        text: '#333',
        sidebarBg: '#87CEEB',
        sidebarText: '#fff',
        navbarBg: '#87CEEB'
      };
    } else if (time >= 6 && time < 12) {
      // 06:00 - 12:00 天蓝
      palette = {
        primary: '#66B2FF',
        primaryDark: '#4D94FF',
        primaryLight: '#99CCFF',
        text: '#333',
        sidebarBg: '#66B2FF',
        sidebarText: '#fff',
        navbarBg: '#66B2FF'
      };
    } else if (time >= 12 && time < 14) {
      // 12:00 - 14:00 更通透的天蓝
      palette = {
        primary: '#4D94FF',
        primaryDark: '#3385FF',
        primaryLight: '#80B3FF',
        text: '#333',
        sidebarBg: '#4D94FF',
        sidebarText: '#fff',
        navbarBg: '#4D94FF'
      };
    } else if (time >= 14 && time < 18) {
      // 14:00 - 18:00 天蓝
      palette = {
        primary: '#66B2FF',
        primaryDark: '#4D94FF',
        primaryLight: '#99CCFF',
        text: '#333',
        sidebarBg: '#66B2FF',
        sidebarText: '#fff',
        navbarBg: '#66B2FF'
      };
    } else if (time >= 18 && time < 19.5) {
      // 18:00 - 19:30 日落红
      palette = {
        primary: '#FF6B6B',
        primaryDark: '#FF5252',
        primaryLight: '#FF8E8E',
        text: '#333',
        sidebarBg: '#FF6B6B',
        sidebarText: '#fff',
        navbarBg: '#FF6B6B'
      };
    } else {
      // 19:30 - 24:00 黑夜
      palette = {
        primary: '#333',
        primaryDark: '#222',
        primaryLight: '#444',
        text: '#fff',
        sidebarBg: '#222',
        sidebarText: '#fff',
        navbarBg: '#222'
      };
      mode = 'dark';
    }

    applyPalette(palette, mode);
  }

  // Initial and interval update
  setTimeBasedTheme();
  setInterval(setTimeBasedTheme, 60000);
})();



// 只移除关于页面中post-header元素，保留标签页和分类页的文章内容
(function() {
  // 检查页面类型
  const isAboutPage = document.body.classList.contains('page-about') || window.location.pathname.includes('/about/');
  
  // 只在关于页面执行移除操作
  if (isAboutPage) {
    // 查找所有需要移除的元素
    const headerElements = document.querySelectorAll('header.post-header, .post-header.animated, .post-header.animated.fadeInDown');
    
    // 直接移除这些元素
    headerElements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
  }
})();
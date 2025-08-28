// 直接移除关于、标签、分类页面中post-header元素
(function() {
  // 检查页面类型
  const isAboutPage = document.body.classList.contains('page-about') || window.location.pathname.includes('/about/');
  const isCategoryPage = document.body.classList.contains('category') || window.location.pathname.includes('/categories/');
  const isTagPage = document.body.classList.contains('tag') || window.location.pathname.includes('/tags/');
  
  // 只有在指定页面才执行移除操作
  if (isAboutPage || isCategoryPage || isTagPage) {
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
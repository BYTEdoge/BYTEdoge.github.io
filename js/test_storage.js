// 测试浏览器本地存储中是否存在敏感信息
console.log('=== 开始检测本地存储中的敏感信息 ===');

// 检查localStorage
console.log('\n[localStorage 内容检查]:');
const localStorageKeys = Object.keys(localStorage);
console.log(`localStorage 中共有 ${localStorageKeys.length} 项数据`);

// 搜索特定关键字
const sensitiveKeys = ['dk', 'hmk', 'iv', 'key', 'crypto', 'secret'];
sensitiveKeys.forEach(keyword => {
    const foundKeys = localStorageKeys.filter(k => 
        k.toLowerCase().includes(keyword.toLowerCase())
    );
    if (foundKeys.length > 0) {
        console.log(`  包含 '${keyword}' 的键:`, foundKeys);
        foundKeys.forEach(k => {
            try {
                const value = localStorage.getItem(k);
                console.log(`    ${k}:`, value);
            } catch (e) {
                console.log(`    ${k}: 无法读取值`);
            }
        });
    }
});

// 检查sessionStorage
console.log('\n[sessionStorage 内容检查]:');
const sessionStorageKeys = Object.keys(sessionStorage);
console.log(`sessionStorage 中共有 ${sessionStorageKeys.length} 项数据`);

sensitiveKeys.forEach(keyword => {
    const foundKeys = sessionStorageKeys.filter(k => 
        k.toLowerCase().includes(keyword.toLowerCase())
    );
    if (foundKeys.length > 0) {
        console.log(`  包含 '${keyword}' 的键:`, foundKeys);
        foundKeys.forEach(k => {
            try {
                const value = sessionStorage.getItem(k);
                console.log(`    ${k}:`, value);
            } catch (e) {
                console.log(`    ${k}: 无法读取值`);
            }
        });
    }
});

// 检查cookies
console.log('\n[Cookies 内容检查]:');
const cookies = document.cookie.split(';');
console.log(`Cookies 中共有 ${cookies.length} 项数据`);

cookies.forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    sensitiveKeys.forEach(keyword => {
        if (name.toLowerCase().includes(keyword.toLowerCase())) {
            console.log(`  包含 '${keyword}' 的Cookie: ${name}=${value}`);
        }
    });
});

// 检查全局window对象是否有相关属性
console.log('\n[全局window对象检查]:');
sensitiveKeys.forEach(keyword => {
    const foundProps = Object.keys(window).filter(prop => 
        prop.toLowerCase().includes(keyword.toLowerCase())
    );
    if (foundProps.length > 0) {
        console.log(`  全局对象中包含 '${keyword}' 的属性:`, foundProps);
    }
});

console.log('\n=== 敏感信息检测完成 ===');
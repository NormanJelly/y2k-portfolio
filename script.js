/* ============================================
   Y2K风格个人网页 - JavaScript交互模块
   模块：动效交互和功能实现模块
   功能：实现页面动态效果、用户交互、数据更新
   特点：复古动画、实时更新、交互反馈
   ============================================ */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Y2K个人空间 - 系统启动中...');
    
    // 初始化所有模块
    initLoadingScreen();
    initNavigation();
    initVisitorCounter();
    initRealTimeClock();
    initProgressBars();
    initProjectCards();
    initContactForm();
    initRetroModal();
    initFloatingShapes();
    
    console.log('✅ Y2K个人空间 - 系统启动完成！');
});

/* ============================================
   模块1：加载屏幕控制
   功能：控制页面加载动画的显示和隐藏
   ============================================ */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // 模拟加载过程
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            showRetroModal(); // 显示欢迎弹窗
        }, 500);
    }, 2000);
}

/* ============================================
   模块2：导航系统
   功能：实现平滑滚动和活动状态管理
   ============================================ */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // 平滑滚动到对应区域
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 移除所有活动状态
                navLinks.forEach(l => l.classList.remove('active'));
                // 添加当前活动状态
                this.classList.add('active');
                
                // 平滑滚动
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 添加点击音效（模拟复古点击声）
                playClickSound();
            }
        });
    });
    
    // 滚动时更新活动状态
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ============================================
   模块3：访客计数器
   功能：模拟动态访客计数，增加复古感
   ============================================ */
function initVisitorCounter() {
    const visitorCount = document.getElementById('visitor-count');
    let count = 1001; // 初始值
    
    // 模拟访客增加
    setInterval(() => {
        count += Math.floor(Math.random() * 3) + 1;
        visitorCount.textContent = count.toString().padStart(4, '0');
        
        // 随机闪烁效果
        if (Math.random() > 0.7) {
            visitorCount.style.color = getRandomY2KColor();
            setTimeout(() => {
                visitorCount.style.color = '#ffff00';
            }, 200);
        }
    }, 5000);
    
    // 初始随机值
    visitorCount.textContent = count.toString().padStart(4, '0');
}

/* ============================================
   模块4：实时时钟
   功能：显示当前时间，带复古数字风格
   ============================================ */
function initRealTimeClock() {
    const timeElement = document.getElementById('current-time');
    
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        
        // 整点闪烁效果
        if (seconds === '00') {
            timeElement.style.animation = 'none';
            setTimeout(() => {
                timeElement.style.animation = 'blink 1s infinite';
            }, 100);
        }
    }
    
    // 初始更新
    updateTime();
    // 每秒更新
    setInterval(updateTime, 1000);
}

/* ============================================
   模块5：技能进度条动画
   功能：实现进度条加载动画
   ============================================ */
function initProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    // 使用Intersection Observer实现滚动时触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                
                // 延迟启动动画，增加复古感
                setTimeout(() => {
                    fill.style.width = `${width}%`;
                }, 300);
                
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });
    
    // 观察所有进度条
    progressFills.forEach(fill => {
        observer.observe(fill);
    });
}

/* ============================================
   模块6：项目卡片交互
   功能：实现项目卡片的悬停和点击效果
   ============================================ */
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    const viewButtons = document.querySelectorAll('.btn-view');
    const codeButtons = document.querySelectorAll('.btn-code');
    
    // 卡片悬停效果
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.4)';
            
            // 添加边框动画
            const borderImage = 'linear-gradient(45deg, #ff00ff, #00ffff, #00ff00) 1';
            this.style.borderImage = borderImage;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0, 255, 255, 0.2)';
            this.style.borderImage = 'linear-gradient(45deg, #00ffff, #00ff00) 1';
        });
    });
    
    // 预览按钮点击效果
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            showNotification('🔍 项目预览功能开发中...', 'info');
            playClickSound();
        });
    });
    
    // 代码按钮点击效果
    codeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            showNotification('💻 正在打开GitHub仓库...', 'success');
            playClickSound();
            
            // 模拟打开新标签页
            setTimeout(() => {
                window.open('https://github.com', '_blank');
            }, 1000);
        });
    });
}

/* ============================================
   模块7：联系表单处理
   功能：表单验证和提交处理
   ============================================ */
function initContactForm() {
    const contactForm = document.getElementById('message-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(this);
        const name = formData.get('name') || this.querySelector('input[type="text"]').value;
        const email = formData.get('email') || this.querySelector('input[type="email"]').value;
        const message = formData.get('message') || this.querySelector('textarea').value;
        
        // 简单验证
        if (!name || !email || !message) {
            showNotification('⚠️ 请填写所有必填字段！', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('📧 请输入有效的邮箱地址！', 'error');
            return;
        }
        
        // 模拟发送过程
        showNotification('📤 正在发送消息...', 'info');
        
        // 模拟网络延迟
        setTimeout(() => {
            // 清空表单
            this.reset();
            
            // 显示成功消息
            showNotification('✅ 消息发送成功！我会尽快回复你。', 'success');
            
            // 播放成功音效
            playSuccessSound();
            
            // 更新访客计数器
            updateVisitorAfterContact();
        }, 2000);
    });
    
    // 输入框焦点效果
    const inputs = contactForm.querySelectorAll('.y2k-input, .y2k-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

/* ============================================
   模块8：复古弹窗系统
   功能：显示欢迎弹窗和系统消息
   ============================================ */
function initRetroModal() {
    const modal = document.getElementById('retro-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const okBtn = modal.querySelector('.btn-ok');
    const cancelBtn = modal.querySelector('.btn-cancel');
    
    // 关闭按钮事件
    closeBtn.addEventListener('click', closeRetroModal);
    cancelBtn.addEventListener('click', closeRetroModal);
    
    // 确定按钮事件
    okBtn.addEventListener('click', function() {
        showNotification('👍 欢迎来到Y2K数字空间！', 'success');
        closeRetroModal();
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeRetroModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeRetroModal();
        }
    });
}

function showRetroModal() {
    const modal = document.getElementById('retro-modal');
    modal.style.display = 'flex';
    
    // 添加显示动画
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeRetroModal() {
    const modal = document.getElementById('retro-modal');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

/* ============================================
   模块9：浮动形状动画
   功能：控制背景浮动元素的动画
   ============================================ */
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // 随机初始位置和速度
        const speed = 2 + Math.random() * 3;
        const direction = Math.random() > 0.5 ? 1 : -1;
        
        // 设置动画
        shape.style.animation = `float ${speed}s infinite alternate`;
        shape.style.animationDelay = `${index * 0.5}s`;
        
        // 鼠标交互效果
        shape.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });
    });
}

/* ============================================
   工具函数模块
   功能：提供通用的辅助函数
   ============================================ */

// 邮箱验证函数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 获取随机Y2K颜色
function getRandomY2KColor() {
    const colors = ['#ff00ff', '#00ffff', '#00ff00', '#ffff00', '#ff9900', '#9d00ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 显示通知消息
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `y2k-notification ${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: rgba(20, 20, 40, 0.9);
        border: 2px solid;
        border-image: linear-gradient(45deg, #ff00ff, #00ffff) 1;
        color: white;
        border-radius: 5px;
        z-index: 1000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        font-family: 'VT323', monospace;
        font-size: 1.1rem;
        backdrop-filter: blur(10px);
    `;
    
    // 根据类型设置边框颜色
    if (type === 'success') {
        notification.style.borderImage = 'linear-gradient(45deg, #00ff00, #00ffff) 1';
    } else if (type === 'error') {
        notification.style.borderImage = 'linear-gradient(45deg, #ff0000, #ff9900) 1';
    }
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 模拟点击音效
function playClickSound() {
    // 创建音频上下文（现代浏览器）
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('🔊 音频上下文不支持，跳过音效');
    }
}

// 模拟成功音效
function playSuccessSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log('🔊 音频上下文不支持，跳过音效');
    }
}

// 联系后更新访客计数器
function updateVisitorAfterContact() {
    const visitorCount = document.getElementById('visitor-count');
    let currentCount = parseInt(visitorCount.textContent);
    
    // 增加计数
    currentCount += 1;
    visitorCount.textContent = currentCount.toString().padStart(4, '0');
    
    // 特殊效果
    visitorCount.style.color = '#00ff00';
    visitorCount.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
        visitorCount.style.color = '#ffff00';
        visitorCount.style.transform = 'scale(1)';
    }, 500);
}

/* ============================================
   页面特效增强
   功能：添加额外的视觉效果
   ============================================ */

// 鼠标轨迹效果
document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: ${getRandomY2KColor()};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX - 3}px;
        top: ${e.clientY - 3}px;
        opacity: 0.7;
    `;
    
    document.body.appendChild(trail);
    
    // 淡出并移除
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 300);
    }, 100);
});

// 键盘特效
document.addEventListener('keydown', function(e) {
    // 只在特定区域显示特效
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    // 创建按键特效
    const keyEffect = document.createElement('div');
    keyEffect.className = 'key-effect';
    keyEffect.textContent = e.key.toUpperCase();
    keyEffect.style.cssText = `
        position: fixed;
        font-family: 'Press Start 2P', monospace;
        font-size: 1.5rem;
        color: ${getRandomY2KColor()};
        text-shadow: 0 0 10px currentColor;
        pointer-events: none;
        z-index: 9998;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        opacity: 1;
        transform: translateY(0) rotate(${Math.random() * 30 - 15}deg);
        animation: floatUp 1s ease-out forwards;
    `;
    
    document.body.appendChild(keyEffect);
    
    // 定义浮动动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                opacity: 1;
                transform: translateY(0) rotate(${Math.random() * 30 - 15}deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) rotate(${Math.random() * 30 - 15}deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    // 移除特效
    setTimeout(() => {
        if (keyEffect.parentNode) {
            keyEffect.parentNode.removeChild(keyEffect);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, 1000);
});

// 页面滚动特效
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    
    // 添加滚动指示器
    if (Math.abs(scrollTop - lastScrollTop) > 50) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.style.cssText = `
            position: fixed;
            right: 20px;
            ${scrollDirection === 'down' ? 'bottom: 20px' : 'top: 20px'};
            width: 40px;
            height: 40px;
            background: rgba(255, 0, 255, 0.2);
            border: 2px solid #ff00ff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ff00ff;
            font-size: 1.5rem;
            z-index: 9997;
            opacity: 0.7;
            animation: pulse 0.5s ease;
        `;
        
        scrollIndicator.innerHTML = scrollDirection === 'down' ? '↓' : '↑';
        
        document.body.appendChild(scrollIndicator);
        
        // 移除指示器
        setTimeout(() => {
            scrollIndicator.style.opacity = '0';
            setTimeout(() => {
                if (scrollIndicator.parentNode) {
                    scrollIndicator.parentNode.removeChild(scrollIndicator);
                }
            }, 300);
        }, 500);
    }
    
    lastScrollTop = scrollTop;
});

// 系统状态监控
function monitorSystemStatus() {
    const statusDot = document.querySelector('.status-dot');
    const onlineStatus = document.querySelector('.online-status');
    
    // 模拟网络状态变化
    setInterval(() => {
        const isOnline = Math.random() > 0.1; // 90%在线
        
        if (isOnline) {
            statusDot.style.background = '#00ff00';
            statusDot.style.animation = 'blink 1s infinite';
            if (onlineStatus) {
                onlineStatus.textContent = '活跃';
                onlineStatus.style.color = '#00ff00';
            }
        } else {
            statusDot.style.background = '#ff0000';
            statusDot.style.animation = 'none';
            if (onlineStatus) {
                onlineStatus.textContent = '离线';
                onlineStatus.style.color = '#ff0000';
            }
            
            // 显示离线通知
            showNotification('⚠️ 网络连接不稳定...', 'error');
        }
    }, 10000);
}

// 初始化系统监控
setTimeout(monitorSystemStatus, 5000);

// 页面性能优化
window.addEventListener('load', function() {
    // 延迟加载非关键资源
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    lazyElements.forEach(element => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // 控制台欢迎消息
    console.log('%c✨ Y2K个人空间 ✨', 'color: #ff00ff; font-size: 24px; font-weight: bold;');
    console.log('%c欢迎来到千禧年复古数字空间！', 'color: #00ffff; font-size: 16px;');
    console.log('%c系统状态: 正常运行', 'color: #00ff00; font-size: 14px;');
    console.log('%c技术支持: 纯原生HTML+CSS+JS', 'color: #ffff00; font-size: 12px;');
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('🚨 系统错误:', e.error);
    
    // 显示友好的错误消息
    showNotification('⚠️ 系统遇到小问题，正在修复...', 'error');
    
    // 尝试恢复
    setTimeout(() => {
        showNotification('✅ 系统已恢复！', 'success');
    }, 2000);
});

// 页面卸载前的清理
window.addEventListener('beforeunload', function() {
    // 清理所有动画和特效
    const effects = document.querySelectorAll('.mouse-trail, .key-effect, .scroll-indicator');
    effects.forEach(effect => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    });
    
    // 显示离开消息
    console.log('👋 感谢访问Y2K个人空间！');
});

// 导出全局函数（如果需要）
window.Y2KPortfolio = {
    showNotification,
    playClickSound,
    playSuccessSound,
    getRandomY2KColor,
    closeRetroModal,
    showRetroModal
};

console.log('🎮 Y2K个人空间 - JavaScript模块加载完成！');

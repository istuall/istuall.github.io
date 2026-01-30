// backButtons.js - 提供返回主页和返回展馆的二级按钮功能

class BackButtons {
    constructor() {
        this.container = null;
        this.secondaryButtons = null;
        this.mainButton = null;
    }

    // 初始化返回按钮
    init() {
        // 创建按钮容器
        this.createContainer();
        // 添加事件监听器
        this.addEventListeners();
        // 添加到页面
        document.body.appendChild(this.container);
    }

    // 创建按钮容器和按钮
    createContainer() {
        // 创建主容器
        this.container = document.createElement('div');
        this.container.className = 'home-button-container';

        // 创建二级按钮容器
        this.secondaryButtons = document.createElement('div');
        this.secondaryButtons.className = 'secondary-buttons';
        this.secondaryButtons.id = 'secondaryButtons';

        // 创建返回主页按钮
        const homeButton = document.createElement('div');
        homeButton.className = 'secondary-button';
        const homeLink = document.createElement('a');
        homeLink.href = '../../#/';
        homeLink.textContent = '返回主页';
        homeButton.appendChild(homeLink);

        // 创建返回展馆按钮
        const papersButton = document.createElement('div');
        papersButton.className = 'secondary-button';
        const papersLink = document.createElement('a');
        papersLink.href = '../../#/papers';
        papersLink.textContent = '返回展馆';
        papersButton.appendChild(papersLink);

        // 添加二级按钮到容器
        this.secondaryButtons.appendChild(homeButton);
        this.secondaryButtons.appendChild(papersButton);

        // 创建主按钮
        this.mainButton = document.createElement('div');
        this.mainButton.className = 'main-home-button';
        this.mainButton.innerHTML = '🏠';

        // 添加到主容器
        this.container.appendChild(this.secondaryButtons);
        this.container.appendChild(this.mainButton);

        // 添加样式
        this.addStyles();
    }

    // 添加样式
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* 确保样式完全独立，不受外部影响 */
            .home-button-container {
                position: fixed !important;
                bottom: 30px !important;
                right: 30px !important;
                z-index: 9999 !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: flex-end !important;
                gap: 10px !important;
                margin: 0 !important;
                padding: 0 !important;
                border: none !important;
                background: transparent !important;
            }
            
            .home-button-container * {
                box-sizing: border-box !important;
                margin: 0 !important;
                padding: 0 !important;
                border: none !important;
                outline: none !important;
                text-decoration: none !important;
                font-family: Arial, sans-serif !important;
            }
            
            .main-home-button {
                background: rgba(255, 255, 255, 0.2) !important;
                backdrop-filter: blur(10px) !important;
                border: 1px solid rgba(255, 255, 255, 0.3) !important;
                border-radius: 50% !important;
                width: 60px !important;
                height: 60px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37) !important;
                font-size: 24px !important;
                line-height: 1 !important;
                text-align: center !important;
                color: inherit !important;
            }
            
            .main-home-button:hover {
                background: rgba(255, 255, 255, 0.3) !important;
                transform: scale(1.1) !important;
            }
            
            .secondary-buttons {
                display: flex !important;
                flex-direction: column !important;
                gap: 10px !important;
                opacity: 0 !important;
                visibility: hidden !important;
                transition: all 0.3s ease !important;
                margin: 0 !important;
                padding: 0 !important;
                border: none !important;
                background: transparent !important;
            }
            
            .secondary-buttons.show {
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            .secondary-button {
                background: rgba(255, 255, 255, 0.2) !important;
                backdrop-filter: blur(10px) !important;
                border: 1px solid rgba(255, 255, 255, 0.3) !important;
                border-radius: 50px !important;
                padding: 12px 18px !important;
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37) !important;
                transition: all 0.3s ease !important;
                margin: 0 !important;
                display: block !important;
            }
            
            .secondary-button:hover {
                background: rgba(255, 255, 255, 0.3) !important;
                transform: scale(1.05) !important;
            }
            
            .secondary-button a {
                color: #333 !important;
                text-decoration: none !important;
                font-size: 14px !important;
                font-weight: bold !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                line-height: 1 !important;
                text-align: center !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            
            .secondary-button a:hover {
                color: #000 !important;
                text-decoration: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // 添加事件监听器
    addEventListeners() {
        // 主按钮点击事件
        this.mainButton.addEventListener('click', () => {
            this.secondaryButtons.classList.toggle('show');
        });

        // 点击页面其他地方关闭二级按钮
        document.addEventListener('click', (event) => {
            if (!this.container.contains(event.target)) {
                this.secondaryButtons.classList.remove('show');
            }
        });
    }
}

// 导出BackButtons类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackButtons;
} else if (typeof window !== 'undefined') {
    window.BackButtons = BackButtons;
    // 自动初始化
    window.addEventListener('DOMContentLoaded', () => {
        const backButtons = new BackButtons();
        backButtons.init();
    });
}

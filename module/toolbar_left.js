class ToolBarLeft extends HTMLElement {
    constructor() {
        super();
        // 初始化组件状态
        this.initProperties();
        // 创建模板
        this.createTemplate();
        // 附加影子 DOM
        this.attachShadow({ mode: 'open' }).appendChild(this.template.content.cloneNode(true));
    }

    initProperties() {
        // 这里可以添加更多组件状态的初始化
    }

    createTemplate() {
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <style>
                /* 工具栏整体样式 */
               .toolbar-left {
                    position: fixed;
                    top: 50%;
                    left: 10px;
                    transform: translateY(-50%);
                    padding: 0.6rem;
                    background: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                }

                /* 按钮通用样式 */
               .home-btn, .about-btn {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.84);
                    color: white;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.1rem;
                    position: relative;
                }

                /* 按钮悬停效果 */
               .home-btn:hover, .about-btn:hover {
                    background: #007bff;
                    transform: scale(1.1);
                }

                /* 提示框样式 */
               .tooltip {
                    position: absolute;
                    left: 40px;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: rgba(255, 255, 255, 0.63);
                    color: #333;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 0.9rem;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s, visibility 0.3s;
                }

                /* 按钮悬停时显示提示框 */
               .home-btn:hover .tooltip,
               .about-btn:hover .tooltip {
                    opacity: 1;
                    visibility: visible;
                }
            </style>
            <div class="toolbar-left">
                <button class="home-btn" id="home-button">
                    🏠
                    <span class="tooltip">主页</span>
                </button>
                <button class="about-btn" id="about-button">
                    🧐
                    <span class="tooltip">关于</span>
                </button>
            </div>
        `;
    }

    connectedCallback() {
        // 绑定按钮点击事件
        this.bindButtonEvents();
    }

    bindButtonEvents() {
        const homeButton = this.shadowRoot.getElementById('home-button');
        const aboutButton = this.shadowRoot.getElementById('about-button');

        homeButton.addEventListener('click', () => {
            window.location.href = '/'; // 跳转到主页
        });

        aboutButton.addEventListener('click', () => {
            window.location.href = '/pages/about/about.html'; // 跳转到关于页面
        });
    }
}

// 定义自定义元素
customElements.define('tool-bar-left', ToolBarLeft);
class ContentPanel extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* 定义自定义字体 */
                @font-face {
                    font-family: 'HYNanGongTiJ-2';
                    src: url('/font/HYNanGongTiJ-2.ttf') format('truetype');
                    font-weight: normal;
                    font-style: italic;
                }

                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    /* 防止出现滚动条 */
                    overflow: hidden;
                }

                .content-panel {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 20px;
                    width: 80%;
                    max-width: 1000px;
                    /* 去除原有的 margin 设置，使用绝对定位和负边距来居中 */
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }

                .small-panel {
                    background: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    width: calc(50% - 10px);
                    box-sizing: border-box;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                /* 添加媒体查询 */
                @media (max-width: 768px) {
                    .content-panel {
                        width: 85%;
                        margin-top: 200px; /* 增加上边距，确保不被导航栏覆盖 */
                        margin-bottom: 30px; /* 增加下边距，确保不被底部内容覆盖 */
                    }

                    .small-panel {
                        width: 100%;
                        margin-bottom: 10px;
                    }
                }
                .small-panel:hover {
                    background: rgba(255, 255, 255, 0.5); /* 悬停时背景颜色变亮 */
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* 悬停时阴影加深 */
                    transform: scale(1.05); /* 悬停时稍微放大 */
                }

                .small-panel h2 {
                    margin: 0;
                    /* 修改为自定义字体 */
                    font-family: 'HYNanGongTiJ-2', cursive;
                    font-size: 1.5rem;
                    color: #333;
                    /* 新增：文本水平居中 */
                    text-align: center; 
                }

                .small-panel p {
                    margin: 5px 0 0;
                    /* 修改为自定义字体 */
                    font-family: 'HYNanGongTiJ-2', cursive;
                    font-size: 1rem;
                    color: #666;
                    /* 新增：文本水平居中 */
                    text-align: center; 
                }

                .small-panel a {
                    text-decoration: none;
                    display: block;
                }
            </style>
            <div class="content-panel">
                <!-- 这里会动态添加小亚克力板 -->
            </div>
        `;
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        const contentPanel = this.shadowRoot.querySelector('.content-panel');
        try {
            // 读取配置文件
            const response = await fetch('../../config/panel-config.json');
            const examples = await response.json();

            examples.forEach(example => {
                const smallPanel = document.createElement('a');
                smallPanel.classList.add('small-panel');
                if (example.link === '#') {
                    // 当链接为 # 时，不设置 href 属性
                    // 这样点击时不会跳转
                } else {
                    smallPanel.href = example.link; // 使用配置文件中的链接
                    // smallPanel.target = "_blank"; // 在新标签页中打开链接
                }
                smallPanel.innerHTML = `
                    <h2>${example.title}</h2>
                    <p>${example.subtitle}</p>
                `;
                contentPanel.appendChild(smallPanel);
            });
        } catch (error) {
            console.error('Failed to load panel configuration:', error);
        }
    }
}

customElements.define('content-panel', ContentPanel);
class ToolBarLeft extends HTMLElement {
    constructor() {
        super();
        this.initTemplate();
        this.attachShadow({ mode: 'open' }).appendChild(this.template.content.cloneNode(true));
    }

    initTemplate() {
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <style>
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
                
                .home-btn:hover, .about-btn:hover {
                    background: #007bff;
                    transform: scale(1.1);
                }

                /* 提示窗口样式 */
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

customElements.define('tool-bar-left', ToolBarLeft);
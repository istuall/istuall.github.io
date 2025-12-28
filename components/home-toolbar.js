class HomeToolBar extends HTMLElement {
    constructor() {
        super();
        this.initProperties();
        this.createTemplate();
        this.attachShadow({ mode: 'open' }).appendChild(this.template.content.cloneNode(true));
    }

    initProperties() {
        // 初始化属性
    }

    createTemplate() {
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <style>
                .home-toolbar {
                    position: fixed;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    padding: 0.6rem;
                    background: rgba(255, 255, 255, 0.63);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.55);
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                @media (max-width: 768px) {
                    .home-toolbar {
                        top: 10px;
                        transform: none;
                        flex-direction: row; /* 改为横向排列 */
                    }
                }

                .home-btn, .about-btn {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background: #fff;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .home-btn:hover, .about-btn:hover {
                    transform: scale(1.1);
                    background:rgb(0, 140, 255);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                }

                .about-btn svg {
                    width: 20px;
                    height: 20px;
                }

                .home-btn:hover::after, .about-btn:hover::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    left: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    margin-left: 10px;
                    padding: 5px 10px;
                    background: rgba(255, 255, 255, 0.6);
                    color: black;
                    border-radius: 6px;
                    font-size: 12px;
                    white-space: nowrap;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                }

                .home-btn:hover::after, .about-btn:hover::after {
                    opacity: 1;
                }
            </style>
            <div class="home-toolbar">
                <button class="home-btn" id="home-button" data-tooltip="主页">🧭</button>
                <button class="about-btn" id="about-button" data-tooltip="作者">🤔</button>
            </div>
        `;
    }

    connectedCallback() {
        this.bindButtonEvents();
    }

    bindButtonEvents() {
        const homeButton = this.shadowRoot.getElementById('home-button');
        homeButton.addEventListener('click', () => {
            window.location.href = '/';
        });

        const aboutButton = this.shadowRoot.getElementById('about-button');
        aboutButton.addEventListener('click', () => {
            window.location.href = '/pages/about/about.html';
        });
    }
}

customElements.define('home-toolbar', HomeToolBar);
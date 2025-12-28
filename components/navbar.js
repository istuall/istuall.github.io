class NavBar extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* 定义自定义字体 */
                @font-face {
                    font-family: 'HYNanGongTiJ-2';
                    src: url('/assets/fonts/HYNanGongTiJ-2.ttf') format('truetype');
                    font-weight: normal;
                    font-style: italic;
                }
                @font-face {
                    font-family: 'BrushScriptMTItalic';
                    src: url('/assets/fonts/Brush Script MT Italic.ttf') format('truetype');
                    font-weight: normal;
                    font-style: italic;
                }
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    padding: 0.5rem 2rem;
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                }
                
                /* 修改手机端样式 */
                @media (max-width: 768px) {
                    .navbar {
                        padding: 0.5rem;
                        flex-direction: column; /* 改为垂直布局 */
                        align-items: center; /* 内容居中 */
                    }
                
                    .logo-container {
                        display: flex; /* 显示LOGO */
                        margin: 0 0 0.5rem 0; /* 添加下边距 */
                    }
                
                    .nav-links {
                        width: 100%;
                        justify-content: center; /* 居中显示链接 */
                        gap: 0.5rem;
                        flex-wrap: wrap; /* 允许换行 */
                    }
                
                    .nav-link {
                        font-size: 0.9rem;
                        padding: 0.3rem;
                        white-space: nowrap;
                    }
                }
                .logo-container {
                    display: flex;
                    align-items: center;
                    margin-right: 2rem;
                }
                
                .logo {
                    height: 25px;
                }
                
                .logo-title {
                    margin-left: 1rem;
                    font-size: 2rem;
                    font-weight: bold;
                    /* 使用自定义字体 */
                    font-family: 'BrushScriptMTItalic', cursive;
                    color: #007bff;
                }
                
                .nav-links {
                    display: flex;
                    gap: 1.5rem;
                }
                
                .nav-link {
                    color: #333;
                    text-decoration: none;
                    font-size: 1.1rem;
                    transition: all 0.3s ease; 
                    /* 使用自定义字体 */
                    font-family: 'HYNanGongTiJ-2', cursive;
                    font-weight: bold;
                    padding: 0.5rem 1rem; 
                    border-radius: 8px; 
                }
                
                .nav-link:hover {
                    color: #fff; 
                    background-color:rgba(0, 123, 255, 0.66); 
                    transform: scale(1.1); 
                }
            </style>
            <nav class="navbar">
                <div class="logo-container">
                    <img class="logo" src="/assets/images/logo.jpg" alt="LOGO">
                    <span class="logo-title">Istuall.fun</span>
                </div>
                <div class="nav-links">
                    <a href="/" class="nav-link">首页</a>
                    <a href="/pages/papers/papers.html" class="nav-link">展馆</a>
                    <a href="/pages/about/about.html" class="nav-link">关于</a>
                </div>
            </nav>
        `;
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }
}

customElements.define('nav-bar', NavBar);
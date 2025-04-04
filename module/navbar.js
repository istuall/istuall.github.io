class NavBar extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
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
                    font-family: 'Brush Script MT', cursive;
                    font-weight: bold;
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
                    transition: all 0.3s ease; /* 添加过渡效果 */
                    font-family: 'Brush Script MT', cursive;
                    font-weight: bold;
                    padding: 0.5rem 1rem; /* 添加内边距 */
                    border-radius: 8px; /* 添加圆角 */
                }
                
                .nav-link:hover {
                    color: #fff; /* 鼠标悬停时文字颜色变为白色 */
                    background-color:rgba(0, 123, 255, 0.66); /* 鼠标悬停时添加背景色 */
                    transform: scale(1.1); /* 鼠标悬停时稍微放大 */
                }
            </style>
            <nav class="navbar">
                <div class="logo-container">
                    <img class="logo" src="/sources/logo.jpg" alt="LOGO">
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
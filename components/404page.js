class NotFoundWindow extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .not-found {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    padding: 2rem;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                    text-align: center;
                    border-radius: 10px;
                }
                
                .not-found-title {
                    font-size: 3rem;
                    font-weight: bold;
                    font-family: 'Brush Script MT', cursive;
                    color: #007bff;
                    margin-bottom: 1rem;
                }
                
                .not-found-message {
                    font-size: 1.5rem;
                    font-family: 'Brush Script MT', cursive;
                    color: #333;
                }
                
                .back-home {
                    display: inline-block;
                    margin-top: 2rem;
                    color: #007bff;
                    text-decoration: none;
                    font-size: 1.2rem;
                    transition: color 0.3s ease;
                    font-family: 'Brush Script MT', cursive;
                    font-weight: bold;
                }
                
                .back-home:hover {
                    color: #0056b3;
                }
            </style>
            <div class="not-found">
                <div class="not-found-title">404</div>
                <div class="not-found-message">哎呀，你要找的页面好像迷路了。</div>
                <a href="/" class="back-home">返回首页</a>
            </div>
        `;
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }
}

customElements.define('not-found-window', NotFoundWindow);


// 监听页面加载完成事件
window.addEventListener('load', function() {
    // 模拟检查页面状态码（实际中可能需要更复杂的逻辑）
    if (document.querySelector('not-found-window')) {
        // 这里假设页面中存在 not-found-window 元素时显示 404 页面
        // 可以根据实际情况修改判断条件
        const notFoundWindow = document.createElement('not-found-window');
        document.body.appendChild(notFoundWindow);
    }
});
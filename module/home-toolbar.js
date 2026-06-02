class HomeToolbar extends HTMLElement {
    connectedCallback() {
        document.body.style.paddingTop = '48px';
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 48px;
                    z-index: 9999;
                }
                .toolbar {
                    height: 48px;
                    background: rgba(255, 255, 255, 0.92);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-bottom: 0.5px solid #e5e7ef;
                    display: flex;
                    align-items: center;
                    padding: 0 14px;
                    gap: 10px;
                }
                .back-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    border: none;
                    background: transparent;
                    color: #1a1a2e;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    flex-shrink: 0;
                    text-decoration: none;
                }
                .back-btn:active {
                    background: rgba(79, 70, 229, 0.06);
                }
                .back-btn svg {
                    width: 20px;
                    height: 20px;
                }
                .toolbar-title {
                    font-size: 15px;
                    font-weight: 600;
                    color: #1a1a2e;
                    flex: 1;
                    min-width: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .home-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    border: none;
                    background: transparent;
                    color: #1a1a2e;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    text-decoration: none;
                    flex-shrink: 0;
                }
                .home-btn:active {
                    background: rgba(79, 70, 229, 0.06);
                }
                .home-btn svg {
                    width: 20px;
                    height: 20px;
                }
            </style>
            <div class="toolbar">
                <a class="back-btn" href="../../#/papers" title="返回展馆">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </a>
                <span class="toolbar-title">${document.title || '作品'}</span>
                <a class="home-btn" href="../../#/" title="返回主页">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </a>
            </div>
        `;
    }
}

customElements.define('home-toolbar', HomeToolbar);

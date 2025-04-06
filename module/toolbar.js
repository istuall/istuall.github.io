// 定义 ToolBar 自定义元素类
class ToolBar extends HTMLElement {
    constructor() {
        super();
        // 创建并设置模板
        this.template = this.createTemplate();
        // 附加影子 DOM 并插入模板内容
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(this.template.content.cloneNode(true));
        // 初始化组件
        this.init();
    }

    // 创建模板元素及设置其 HTML 内容
    createTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* 工具栏整体样式 */
                .toolbar {
                    position: fixed;
                    top: 50%;
                    right: 10px;
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
                .music-btn, .random-btn, .toggle-panel-btn, .email-btn, .hide-title-btn {
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

                /* 按钮悬停样式 */
                .music-btn:hover, .random-btn:hover, .toggle-panel-btn:hover, .email-btn:hover, .hide-title-btn:hover {
                    background: rgba(0, 162, 255, 0.85);
                    transform: scale(1.1);
                }

                /* 提示窗口样式 */
                .tooltip {
                    position: absolute;
                    left: -120px;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: rgba(255, 255, 255, 0.7);
                    color: black;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 0.9rem;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s, visibility 0.3s;
                }

                /* 按钮悬停时提示窗口显示 */
                .music-btn:hover .tooltip,
                .random-btn:hover .tooltip,
                .toggle-panel-btn:hover .tooltip,
                .email-btn:hover .tooltip,
                .hide-title-btn:hover .tooltip {
                    opacity: 1;
                    visibility: visible;
                }
            </style>
            <div class="toolbar">
                <!-- 音乐控制按钮 -->
                <button class="music-btn" id="music-control">
                    🎵
                    <span class="tooltip">控制音乐开关</span>
                </button>
                <!-- 随机切换视频按钮 -->
                <button class="random-btn" id="random-video">
                    🎨
                    <span class="tooltip">顺序切换背景</span>
                </button>
                <!-- 切换面板按钮 -->
                <button class="toggle-panel-btn" id="toggle-panel">
                    📄
                    <span class="tooltip">亚克力板显示</span>
                </button>
                <!-- 隐藏标题按钮 -->
                <button class="hide-title-btn" id="hide-title">
                    👋
                    <span class="tooltip">隐藏欢迎标题</span>
                </button>
                <!-- 发送邮件按钮 -->
                <button class="email-btn" id="send-email">
                    ✉️
                    <span class="tooltip">发送反馈邮件</span>
                </button>
            </div>
        `;
        return template;
    }

    // 初始化组件，绑定事件
    init() {
        // 音乐播放状态标志
        this.isPlaying = false;
        // 当前视频索引
        this.currentVideoIndex = 0;

        // 获取各按钮元素
        this.musicBtn = this.shadow.getElementById('music-control');
        this.randomBtn = this.shadow.getElementById('random-video');
        this.togglePanelBtn = this.shadow.getElementById('toggle-panel');
        this.emailBtn = this.shadow.getElementById('send-email');
        this.hideTitleBtn = this.shadow.getElementById('hide-title');

        // 绑定事件
        this.bindEvents();
        // 默认设置视频静音
        this.setVideoMuted(true);
    }

    // 绑定按钮点击事件
    bindEvents() {
        this.musicBtn.addEventListener('click', this.handleMusicControl.bind(this));
        this.randomBtn.addEventListener('click', this.handleRandomVideo.bind(this));
        this.togglePanelBtn.addEventListener('click', this.handleTogglePanel.bind(this));
        this.emailBtn.addEventListener('click', this.handleSendEmail.bind(this));
        this.hideTitleBtn.addEventListener('click', this.handleHideTitle.bind(this));
    }

    // 处理音乐控制点击事件
    handleMusicControl() {
        const videoBg = document.querySelector('video-background');
        if (videoBg) {
            const video = videoBg.shadowRoot.querySelector('video');
            if (video) {
                video.muted = !this.isPlaying;
                this.isPlaying = !this.isPlaying;
            }
        }
    }

    // 处理随机/顺序切换视频点击事件
    async handleRandomVideo() {
        try {
            const response = await fetch('../../config/background_video.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const videos = data.videos;
            const videoBg = document.querySelector('video-background');
            if (videoBg) {
                const video = videoBg.shadowRoot.querySelector('video');
                if (video) {
                    const videoSrc = videos[this.currentVideoIndex];
                    video.src = videoSrc;
                    video.load();
                    video.play();
                    this.currentVideoIndex = (this.currentVideoIndex + 1) % videos.length;
                }
            }
        } catch (error) {
            console.error('Failed to load video links:', error);
        }
    }

    // 处理切换面板点击事件
    handleTogglePanel() {
        const acrylicPanel = document.querySelector('.acrylic-panel');
        if (acrylicPanel) {
            acrylicPanel.style.display = acrylicPanel.style.display === 'none' ? 'flex' : 'none';
        }
    }

    // 处理发送邮件点击事件
    handleSendEmail() {
        const recipient = 'zero180t@qq.com';
        const subject = encodeURIComponent('来自Istuall的邮件');
        const body = encodeURIComponent('这是一封来自Istuall的邮件。');
        const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    }

    // 处理隐藏标题点击事件
    handleHideTitle() {
        const mainTitle = document.querySelector('.main-title');
        if (mainTitle) {
            mainTitle.style.display = mainTitle.style.display === 'none' ? 'block' : 'none';
        }
    }

    // 设置视频静音状态
    setVideoMuted(isMuted) {
        const videoBg = document.querySelector('video-background');
        if (videoBg) {
            const video = videoBg.shadowRoot.querySelector('video');
            if (video) {
                video.muted = isMuted;
            }
        }
    }
}

// 定义自定义元素
customElements.define('tool-bar', ToolBar);
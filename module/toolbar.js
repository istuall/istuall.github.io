class ToolBar extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
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
                
                .music-btn, .random-btn, .toggle-panel-btn, .email-btn {
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
                
                .music-btn:hover, .random-btn:hover, .toggle-panel-btn:hover, .email-btn:hover {
                    background:rgba(0, 162, 255, 0.85);
                    transform: scale(1.1);
                }

                /* 新增提示窗口样式 */
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

                .music-btn:hover .tooltip,
                .random-btn:hover .tooltip,
                .toggle-panel-btn:hover .tooltip,
                .email-btn:hover .tooltip {
                    opacity: 1;
                    visibility: visible;
                }
            </style>
            <div class="toolbar">
                <button class="music-btn" id="music-control">
                    🎵
                    <span class="tooltip">控制音乐开关</span>
                </button>
                <button class="random-btn" id="random-video">
                    🎬
                    <span class="tooltip">顺序切换视频</span>
                </button>
                <button class="toggle-panel-btn" id="toggle-panel">
                    📜
                    <span class="tooltip">亚克力板显示</span>
                </button>
                <button class="email-btn" id="send-email">
                    📧
                    <span class="tooltip">发送反馈邮件</span>
                </button>
            </div>
        `;
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));

        // 添加音乐控制逻辑
        const musicBtn = this.shadowRoot.getElementById('music-control');
        let isPlaying = false; // 默认设置为false表示静音

        // 默认静音
        const videoBg = document.querySelector('video-background');
        if (videoBg) {
            const video = videoBg.shadowRoot.querySelector('video');
            if (video) {
                video.muted = true; // 默认静音
                musicBtn.textContent = '🔇'; // 默认显示静音图标
            }
        }

        musicBtn.addEventListener('click', () => {
            const videoBg = document.querySelector('video-background');
            if (videoBg) {
                const video = videoBg.shadowRoot.querySelector('video');
                if (video) {
                    if (isPlaying) {
                        video.muted = true;
                        musicBtn.textContent = '🔇';
                    } else {
                        video.muted = false;
                        musicBtn.textContent = '🔊';
                    }
                    isPlaying = !isPlaying;
                }
            }
        });

        // 添加随机切换视频逻辑
        const randomBtn = this.shadowRoot.getElementById('random-video');
        randomBtn.addEventListener('click', async() => {
            try {
                const response = await fetch('../../config/background_video.json');
                const data = await response.json();
                const videos = data.videos;
                const videoBg = document.querySelector('video-background');
                if (videoBg) {
                    const video = videoBg.shadowRoot.querySelector('video');
                    if (video) {
                        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
                        video.src = randomVideo;
                        video.load();
                        video.play();
                    }
                }
            } catch (error) {
                console.error('Failed to load video links:', error);
            }
        });

        // 添加控制亚克力板可见性的逻辑
        const togglePanelBtn = this.shadowRoot.getElementById('toggle-panel');
        togglePanelBtn.addEventListener('click', () => {
            const acrylicPanel = document.querySelector('.acrylic-panel');
            if (acrylicPanel) {
                if (acrylicPanel.style.display === 'none') {
                    acrylicPanel.style.display = 'flex';
                } else {
                    acrylicPanel.style.display = 'none';
                }
            }
        });

        // 添加发送邮件逻辑
        const emailBtn = this.shadowRoot.getElementById('send-email');
        emailBtn.addEventListener('click', () => {
            const recipient = 'zero180t@qq.com';
            const subject = encodeURIComponent('来自Istuall的邮件');
            const body = encodeURIComponent('这是一封来自Istuall的邮件。');
            const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
        });

        // 新增：当前视频索引
        let currentVideoIndex = 0;

        // 修改为顺序切换视频逻辑
        const sequentialBtn = this.shadowRoot.getElementById('random-video');
        sequentialBtn.addEventListener('click', async() => {
            try {
                const response = await fetch('../../config/background_video.json');
                const data = await response.json();
                const videos = data.videos;
                const videoBg = document.querySelector('video-background');
                if (videoBg) {
                    const video = videoBg.shadowRoot.querySelector('video');
                    if (video) {
                        // 播放当前索引对应的视频
                        video.src = videos[currentVideoIndex];
                        video.load();
                        video.play();
                        // 索引加 1
                        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
                    }
                }
            } catch (error) {
                console.error('Failed to load video links:', error);
            }
        });
    }
}

customElements.define('tool-bar', ToolBar);
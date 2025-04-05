class ToolBar extends HTMLElement {
    constructor() {
        super();
        this.initTemplate();
        this.attachShadow({ mode: 'open' }).appendChild(this.template.content.cloneNode(true));
        this.isPlaying = false; // 默认设置为false表示静音
        this.initMusicControl();
        this.initRandomVideo();
    }

    initTemplate() {
        this.template = document.createElement('template');
        this.template.innerHTML = `
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
                
                .music-btn, .random-btn {
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
                
                .music-btn:hover, .random-btn:hover {
                    background: #007bff;
                    transform: scale(1.1);
                }

                /* 新增提示窗口样式 */
                .tooltip {
                    position: absolute;
                    left: -86px;
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

                .music-btn:hover .tooltip,
                .random-btn:hover .tooltip {
                    opacity: 1;
                    visibility: visible;
                }
            </style>
            <div class="toolbar">
                <button class="music-btn" id="music-control">
                    🔇 <!-- 默认显示静音图标 -->
                    <!-- 新增提示窗口 -->
                    <span class="tooltip">音乐开关</span>
                </button>
                <button class="random-btn" id="random-video">
                    🎬
                    <!-- 新增提示窗口 -->
                    <span class="tooltip">随机背景</span>
                </button>
            </div>
        `;
    }

    getVideoElement() {
        const videoBg = document.querySelector('video-background');
        if (!videoBg) {
            console.error('未找到视频背景元素');
            return null;
        }
        const video = videoBg.shadowRoot.querySelector('video');
        if (!video) {
            console.error('未找到视频元素');
            return null;
        }
        return video;
    }

    initMusicControl() {
        const musicBtn = this.shadowRoot.getElementById('music-control');
        const video = this.getVideoElement();
        if (video) {
            video.muted = true; // 默认静音
        }

        musicBtn.addEventListener('click', () => {
            const video = this.getVideoElement();
            if (video) {
                if (this.isPlaying) {
                    video.muted = true;
                    musicBtn.textContent = '🔇';
                } else {
                    video.muted = false;
                    musicBtn.textContent = '🔊';
                }
                this.isPlaying = !this.isPlaying;
            }
        });
    }

    initRandomVideo() {
        const randomBtn = this.shadowRoot.getElementById('random-video');
        randomBtn.addEventListener('click', async() => {
            try {
                const response = await fetch('../../config/background_video.json');
                const data = await response.json();
                const videos = data.videos;
                const video = this.getVideoElement();
                if (video) {
                    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
                    video.src = randomVideo;
                    video.load();
                    video.play();
                }
            } catch (error) {
                console.error('Failed to load video links:', error);
            }
        });
    }
}

customElements.define('tool-bar', ToolBar);
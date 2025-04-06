class ToolBar extends HTMLElement {
    constructor() {
        super();
        // 初始化音乐播放状态
        this.isPlaying = false;
        // 初始化当前视频索引
        this.currentVideoIndex = 0;
        // 初始化模板
        this.initTemplate();
        // 附加影子 DOM 并插入模板内容
        this.attachShadow({ mode: 'open' }).appendChild(this.template.content.cloneNode(true));
        // 初始化音乐控制和顺序视频切换功能
        this.initMusicControl();
        this.initSequentialVideo();
    }

    initTemplate() {
        this.template = document.createElement('template');
        this.template.innerHTML = `
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

                /* 按钮悬停效果 */
                .music-btn:hover, .random-btn:hover {
                    background: #007bff;
                    transform: scale(1.1);
                }

                /* 提示框样式 */
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

                /* 按钮悬停时显示提示框 */
                .music-btn:hover .tooltip,
                .random-btn:hover .tooltip {
                    opacity: 1;
                    visibility: visible;
                }
            </style>
            <div class="toolbar">
                <button class="music-btn" id="music-control">
                    🎵
                    <span class="tooltip">音乐开关</span>
                </button>
                <button class="random-btn" id="random-video">
                    🎨
                    <span class="tooltip">切换背景</span>
                </button>
            </div>
        `;
    }

    // 检查视频元素是否存在
    function getVideoElement() {
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
                this.isPlaying = !this.isPlaying;
                video.muted = !this.isPlaying;
            }
        });
    }

    async initSequentialVideo() {
        const sequentialBtn = this.shadowRoot.getElementById('random-video');
        sequentialBtn.addEventListener('click', async() => {
            try {
                const response = await fetch('../../config/background_video.json');
                const data = await response.json();
                const videos = data.videos;
                const video = this.getVideoElement();
                if (video) {
                    // 播放当前索引对应的视频
                    video.src = videos[this.currentVideoIndex];
                    video.load();
                    video.play();
                    // 索引加 1
                    this.currentVideoIndex = (this.currentVideoIndex + 1) % videos.length;
                }
            } catch (error) {
                console.error('Failed to load video links:', error);
            }
        });
    }
}

customElements.define('tool-bar', ToolBar);
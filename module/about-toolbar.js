class AboutToolBar extends HTMLElement {
    constructor() {
        super();
        this.isPlaying = false;
        this.currentVideoIndex = 0;
        this.initTemplate();
        this.attachShadow({ mode: 'open' }).appendChild(this.template.content.cloneNode(true));
        this.setupEventListeners();
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
                    background: rgba(0, 162, 255, 0.85);
                    transform: scale(1.1);
                }

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
               .random-btn:hover .tooltip {
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
                    🎨
                    <span class="tooltip">顺序切换背景</span>
                </button>
            </div>
        `;
    }

    setupEventListeners() {
        const musicBtn = this.shadowRoot.getElementById('music-control');
        const randomBtn = this.shadowRoot.getElementById('random-video');

        musicBtn.addEventListener('click', this.handleMusicControl.bind(this));
        randomBtn.addEventListener('click', this.handleRandomVideo.bind(this));

        const video = this.getVideoElement();
        if (video) {
            video.muted = true;
        }
    }

    handleMusicControl() {
        const video = this.getVideoElement();
        if (video) {
            this.isPlaying = !this.isPlaying;
            video.muted = !this.isPlaying;
        }
    }

    async handleRandomVideo() {
        try {
            const response = await fetch('../../config/background_video.json');
            const data = await response.json();
            const videos = data.videos;
            const video = this.getVideoElement();
            if (video) {
                video.src = videos[this.currentVideoIndex];
                video.load();
                video.play();
                this.currentVideoIndex = (this.currentVideoIndex + 1) % videos.length;
            }
        } catch (error) {
            console.error('Failed to load video links:', error);
        }
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
}

customElements.define('about-tool-bar', AboutToolBar);
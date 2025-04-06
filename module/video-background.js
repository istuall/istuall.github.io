class VideoBackground extends HTMLElement {
    constructor() {
        super();
        // 初始化模板
        this.setupTemplate();
        // 附加影子 DOM
        this.attachShadow({ mode: 'open' }).appendChild(this.template.content.cloneNode(true));
    }

    setupTemplate() {
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <style>
                /* 视频背景样式 */
                .video-background {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    object-fit: cover;
                }
            </style>
            <video class="video-background" autoplay loop muted playsinline>
                <source id="video-source" src="" type="video/mp4">
                您的浏览器不支持视频标签。
            </video>
        `;
    }

    async connectedCallback() {
        try {
            // 获取视频配置
            const videoConfig = await this.getVideoConfig();
            // 根据当前页面选择视频源
            const videoSourceUrl = this.selectVideoSource(videoConfig);
            // 设置视频源
            this.setVideoSource(videoSourceUrl);
        } catch (error) {
            console.error('Failed to load video:', error);
        }
    }

    async getVideoConfig() {
        const response = await fetch('../../config/background_video.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch video config: ${response.status}`);
        }
        return await response.json();
    }

    selectVideoSource(config) {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'index.html' || currentPage === '') {
            // index 页面使用默认视频
            return config.default_video;
        } else {
            // 其他页面随机选择视频
            const videos = config.videos;
            const randomIndex = Math.floor(Math.random() * videos.length);
            return videos[randomIndex];
        }
    }

    setVideoSource(url) {
        const videoSource = this.shadowRoot.getElementById('video-source');
        videoSource.src = url;
        const video = this.shadowRoot.querySelector('.video-background');
        video.load();
        video.play();
        video.muted = true;
    }
}

// 定义自定义元素
customElements.define('video-background', VideoBackground);
class VideoBackground extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
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
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        try {
            const response = await fetch('../../config/background_video.json');
            const data = await response.json();
            const defaultVideo = data.default_video;
            const videoSource = this.shadowRoot.getElementById('video-source');
            videoSource.src = defaultVideo;
            const video = this.shadowRoot.querySelector('.video-background');
            video.load();
            video.play();
            video.muted = true;
        } catch (error) {
            console.error('Failed to load default video:', error);
            try {
                const response = await fetch('../../config/background_video.json');
                const data = await response.json();
                const videos = data.videos;
                const randomVideo = videos[Math.floor(Math.random() * videos.length)];
                const videoSource = this.shadowRoot.getElementById('video-source');
                videoSource.src = randomVideo;
                const video = this.shadowRoot.querySelector('.video-background');
                video.load();
                video.play();
                video.muted = true;
            } catch (error) {
                console.error('Failed to load video links:', error);
            }
        }
    }
}

customElements.define('video-background', VideoBackground);
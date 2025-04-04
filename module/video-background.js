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

    connectedCallback() {
        const videos = [
            // "/sources/background_video/Gura Yuri Camp.mp4",
            "/sources/background_video/上杉绘梨衣.mp4",
            "/sources/background_video/夏弥.mp4"
        ];
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
        const videoSource = this.shadowRoot.getElementById('video-source');
        videoSource.src = randomVideo;
        const video = this.shadowRoot.querySelector('.video-background');
        video.load();
        video.play();
        video.muted = true;
    }
}

customElements.define('video-background', VideoBackground);
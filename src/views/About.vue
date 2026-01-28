<template>
  <div class="about-page page">
    <!-- 背景效果 -->
    <div class="background-effects">
      <div class="gradient-overlay"></div>
    </div>
    
    <!-- 主容器 -->
    <div class="container">
      <div class="blog-panel">        
        <div class="about-container">
          <!-- 右侧卡片 -->
          <div class="right-card" :style="{ animationDelay: '0.1s' }">
            <div class="avatar-container">
              <img 
                :src="avatarUrl" 
                :alt="'Zero180t的个人照片'"
                class="avatar"
                @error="handleImageError"
              >
              <div class="avatar-border"></div>
            </div>
            <h2 class="card-title">zero180t</h2>
            <p class="card-motto">登高必自</p>
            <div class="social-links">
              <a href="mailto:zero180t@qq.com" class="social-link" title="发送邮件">
                📧
              </a>
              <a href="https://github.com" class="social-link" title="GitHub" target="_blank">
                🐱
              </a>
              <a href="https://www.sdau.edu.cn/" class="social-link" title="学校官网" target="_blank">
                🏫
              </a>
            </div>
          </div>
          
          <!-- 左侧内容 -->
          <div class="left-content">
            <div class="section" :style="{ animationDelay: '0.2s' }">
              <h2 class="section-title">
                <span class="title-icon">👤</span>
                个人信息
              </h2>
              <div class="info-item">
                <span class="info-label">姓名：</span>
                <span class="info-value">Zero180t</span>
              </div>
              <div class="info-item">
                <span class="info-label">电子邮箱：</span>
                <span class="info-value">
                  <a href="mailto:zero180t@qq.com" class="email-link">zero180t@qq.com</a>
                </span>
              </div>
            </div>

            <div class="section" :style="{ animationDelay: '0.3s' }">
              <h2 class="section-title">
                <span class="title-icon">🎓</span>
                教育背景
              </h2>
              <a href="https://www.sdau.edu.cn/" class="university-link">
                <strong>Shandong Agricultural University</strong>
              </a>
              <p class="major-info"> · 计算机科学与技术</p>
              <p class="major-info"> · 数字经济</p>
            </div>

            <div class="section" :style="{ animationDelay: '0.4s' }">
              <h2 class="section-title">
                <span class="title-icon">📚</span>
                经历
              </h2>
              <p class="experience-role"><strong>学生</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const avatarUrl = ref('/sources/logo.jpg')

const handleImageError = () => {
  avatarUrl.value = 'https://via.placeholder.com/150'
}

onMounted(() => {
  // 添加页面加载动画
  document.querySelector('.about-page').classList.add('loaded')
})
</script>

<style scoped>
/* 页面特定样式 */
.about-page {
    opacity: 0;
    transition: opacity 1s ease;
}

.about-page.loaded {
    opacity: 1;
}

/* 标题区域 */
.blog-panel {
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 80%;
    max-width: 1000px;
    margin: 0 auto;
    min-height: calc(100vh - 160px);
    padding: 20px;
}

.blog-header {
    text-align: center;
    margin-bottom: 30px;
    animation: fadeInUp 1s ease-out;
}

.page-subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    animation: slideInUp 0.8s ease 0.2s forwards;
    opacity: 0;
}

/* 关于容器 */
.about-container {
    display: flex;
    gap: 50px;
    animation: fadeInUp 1s ease-out;
}

/* 左侧内容 */
.left-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.section {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    padding: 30px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: fadeInUp 1s ease-out;
}

.section:hover {
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    transform: translateY(-8px);
    border-color: rgba(52, 152, 219, 0.4);
}

.section-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 0 20px;
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;
}

.title-icon {
    font-size: 1.3rem;
}

.info-item {
    display: flex;
    margin-bottom: 15px;
    align-items: center;
}

.info-label {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    width: 100px;
    flex-shrink: 0;
}

.info-value {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    flex: 1;
}

.email-link {
    color: #66b3ff;
    text-decoration: none;
    transition: all 0.3s ease;
}

.email-link:hover {
    color: white;
    text-decoration: underline;
    transform: translateX(5px);
}

.university-link {
    font-size: 1.2rem;
    font-weight: bold;
    color: #66b3ff;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
    margin-bottom: 10px;
}

.university-link:hover {
    color: white;
    transform: translateX(8px);
}

.major-info {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
}

.experience-role {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 15px;
}

.experience-list {
    margin: 0;
    padding-left: 20px;
}

.experience-item {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 10px;
    position: relative;
    padding-left: 15px;
}

.experience-item::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #66b3ff;
    font-weight: bold;
}

/* 右侧卡片 */
.right-card {
    width: 280px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    padding: 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: fadeInUp 1s ease-out;
}

.right-card:hover {
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    transform: translateY(-10px);
    border-color: rgba(52, 152, 219, 0.4);
}

.avatar-container {
    position: relative;
    margin-bottom: 25px;
}

.avatar {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}

.avatar:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.avatar-border {
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border: 2px dashed rgba(102, 179, 255, 0.5);
    border-radius: 50%;
    animation: rotate 10s linear infinite;
}

.card-title {
    font-size: 1.8rem;
    color: white;
    margin: 0 0 15px;
    font-weight: bold;
}

.card-motto {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 8px 0;
    font-style: italic;
}

.social-links {
    display: flex;
    gap: 20px;
    margin-top: 25px;
}

.social-link {
    font-size: 1.8rem;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
}

.social-link:hover {
    color: white;
    transform: translateY(-5px) scale(1.1);
}



/* 响应式设计 */
@media (max-width: 768px) {
    .blog-panel {
        width: 95%;
        padding: 20px;
    }

    .page-title {
        font-size: 2rem;
    }

    .page-subtitle {
        font-size: 1rem;
    }

    .about-container {
        flex-direction: column;
        gap: 30px;
    }

    .right-card {
        width: 100%;
        order: -1;
    }

    .left-content {
        gap: 20px;
    }

    .section {
        padding: 25px;
    }

    .section-title {
        font-size: 1.3rem;
    }

    .info-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }

    .info-label {
        width: 100%;
    }

    .card-title {
        font-size: 1.6rem;
    }

    .avatar {
        width: 140px;
        height: 140px;
    }
}

@media (max-width: 480px) {
    .blog-panel {
        padding: 15px;
    }

    .page-title {
        font-size: 1.8rem;
    }

    .section {
        padding: 20px;
    }

    .section-title {
        font-size: 1.2rem;
    }

    .info-value, .major-info, .experience-item {
        font-size: 1rem;
    }

    .right-card {
        padding: 25px;
    }

    .card-motto {
        font-size: 1rem;
    }
}
</style>
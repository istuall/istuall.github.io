<template>
  <div class="home">
    <!-- 背景效果 -->
    <div class="background-effects">
      <div class="gradient-overlay"></div>
    </div>
    
    <!-- 主容器 -->
    <div class="container">
      <!-- 标题区域 -->
      <header class="hero">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="hero-title-main">Istuall</span>
            <span class="hero-title-sub">.fun</span>
          </h1>
          <p class="hero-description">从入门到入土</p>
          <div class="hero-actions">
            <router-link to="/blog" class="btn btn-primary">
              探索文章
            </router-link>
            <router-link to="/papers" class="btn btn-secondary">
              浏览展馆
            </router-link>
          </div>
        </div>
      </header>
      
      <section class="features">
        <h2 class="section-title">···</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </section>
      
      <!-- 页脚 -->
      <footer class="footer">
        <div class="footer-content">
          <p class="footer-text">© 2026 Istuall.fun | 用心创造，分享快乐</p>
          <div class="footer-social">
            <a href="mailto:zero180t@qq.com" class="social-link" title="发送邮件">📧</a>
            <a href="https://github.com/istuall" class="social-link" title="GitHub" target="_blank">🐱</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const features = [
  {
    icon: '💻',
    title: '学习分享',
    description: '记录学习中的技术心得和解决方案'
  },
  {
    icon: '🎨',
    title: '学习作品',
    description: '展示个人创意项目和实践成果'
  },
  {
    icon: '📚',
    title: '学习资源',
    description: '整理优质学习资料和工具推荐'
  }
]

onMounted(() => {
  // 添加页面加载动画
  document.querySelector('.home').classList.add('loaded')
})
</script>

<style scoped>
/* 全局样式 */
.home {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    font-family: 'HYNanGongTiJ-2', cursive;
    opacity: 0;
    transition: opacity 1s ease;
    padding-top: 120px;
}

.home.loaded {
    opacity: 1;
}

/* 背景效果 */
.background-effects {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 100%);
}

/* 容器 */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 1;
}

/* 标题区域 */
.hero {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 100px 0;
}

.hero-content {
    max-width: 800px;
    animation: fadeInUp 1s ease forwards;
}

.hero-title {
    font-size: 5rem;
    font-weight: bold;
    margin-bottom: 20px;
    background: linear-gradient(45deg, #ffffff, #66b3ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: slideInDown 0.8s ease forwards;
}

.hero-title-main {
    display: block;
    font-family: 'BrushScriptMTItalic', cursive;
}

.hero-title-sub {
    font-size: 2rem;
    opacity: 0.8;
}

.hero-description {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 40px;
    line-height: 1.6;
    animation: fadeIn 1s ease 0.3s forwards;
    opacity: 0;
}

.hero-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
    animation: fadeInUp 1s ease 0.6s forwards;
    opacity: 0;
}

/* 按钮样式 */
.btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 32px;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    font-family: inherit;
}

.btn-primary {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.btn-primary:hover {
    background: linear-gradient(135deg, #2980b9, #1f618d);
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
}

.btn-icon {
    font-size: 1.2rem;
}

/* 特色区域 */
.features {
    padding: 100px 0;
    animation: fadeIn 1s ease 0.9s forwards;
    opacity: 0;
}

.section-title {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 60px;
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.feature-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    padding: 40px;
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.feature-card:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.3);
}

.feature-icon {
    font-size: 3.5rem;
    margin-bottom: 20px;
    animation: popIn 0.6s ease forwards;
}

.feature-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: white;
}

.feature-description {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
}

/* 页脚 */
.footer {
    padding: 60px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    animation: fadeIn 1s ease 1.8s forwards;
    opacity: 0;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.footer-text {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
}

.footer-social {
    display: flex;
    gap: 20px;
}

.social-link {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease;
    text-decoration: none;
}

.social-link:hover {
    color: white;
    transform: translateY(-3px);
}

/* 动画 */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes popIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* 响应式设计 */
@media (max-width: 768px) {
    .hero {
        min-height: 70vh;
        padding: 80px 0;
    }
    
    .hero-title {
        font-size: 3.5rem;
    }
    
    .hero-title-sub {
        font-size: 1.5rem;
    }
    
    .hero-description {
        font-size: 1.1rem;
    }
    
    .hero-actions {
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }
    
    .btn {
        padding: 14px 28px;
        font-size: 1rem;
        width: 200px;
        justify-content: center;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .features {
        padding: 60px 0;
    }
    
    .feature-card {
        padding: 30px;
    }
    
    .footer-content {
        flex-direction: column;
        text-align: center;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 2.8rem;
    }
    
    .hero-description {
        font-size: 1rem;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
    }
    
    .feature-card {
        padding: 25px;
    }
    
    .feature-icon {
        font-size: 3rem;
    }
}
</style>
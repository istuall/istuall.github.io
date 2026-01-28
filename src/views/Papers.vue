<template>
  <div class="papers-page page">
    <!-- 背景效果 -->
    <div class="background-effects">
      <div class="gradient-overlay"></div>
    </div>
    
    <!-- 主容器 -->
    <main class="container">
      <header class="page-header">
        <h1 class="page-title">
          <span class="title-main">展馆 · 收藏</span>
        </h1>
        <p class="page-subtitle">我的创意实验与网络收藏</p>
      </header>
      
      <!-- 加载状态 -->
      <div class="state-container loading-state" v-if="loading">
        <div class="loading-spinner"></div>
        <p>正在筹备展品...</p>
      </div>
      
      <!-- 错误状态 -->
      <div class="state-container error-state" v-else-if="error">
        <div class="error-icon">❌</div>
        <h3>出错了</h3>
        <p>{{ error }}</p>
        <button class="btn btn-primary" @click="loadItems">重新加载</button>
      </div>
      
      <!-- 内容网格 -->
      <div class="gallery-grid" v-else-if="items.length > 0">
        <!-- 所有链接都使用普通 a 标签 -->
        <a 
          v-for="(item, index) in items" 
          :key="index" 
          :href="item.link"
          class="gallery-card"
          :target="item.link.startsWith('http') ? '_blank' : ''"
          :rel="item.link.startsWith('http') ? 'noopener noreferrer' : ''"
          :style="{ animationDelay: index * 0.1 + 's' }"
        >
          <div class="card-inner">
            <div class="card-icon">
              {{ item.icon || '🎨' }}
            </div>
            <div class="card-content">
              <h2 class="card-title">{{ item.title }}</h2>
              <p class="card-desc">{{ item.subtitle }}</p>
              <span class="card-arrow">→</span>
            </div>
          </div>
        </a>
      </div>
      
      <!-- 空状态 -->
      <div class="state-container empty-state" v-else>
        <div class="empty-icon">📦</div>
        <h3>暂无藏品</h3>
        <p>敬请期待更多作品上架</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])
const loading = ref(true)
const error = ref('')



const loadItems = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch('/config/panel-config.json')
    if (!response.ok) {
      throw new Error('Failed to load panel configuration')
    }
    items.value = await response.json()
  } catch (err) {
    console.error('Failed to load panel configuration:', err)
    error.value = '无法加载展品列表'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadItems()
})
</script>

<style scoped>
.papers-page {
  min-height: 100vh;
  padding-top: 120px;
  font-family: 'HYNanGongTiJ-2', cursive;
  color: #fff;
}

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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeIn 1s ease forwards;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 15px;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.page-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.gallery-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(10px);
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
  position: relative;
}

.card-inner {
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  text-align: center;
}

.card-icon {
  font-size: 3.5rem;
  margin-bottom: 20px;
  transition: transform 0.4s ease;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.card-title {
  font-size: 1.4rem;
  color: #fff;
  margin-bottom: 10px;
  font-weight: bold;
}

.card-desc {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  margin-bottom: 20px;
  flex: 1;
}

.card-arrow {
  font-size: 1.5rem;
  color: #3498db;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

/* Hover Effects */
.gallery-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.gallery-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.gallery-card:hover .card-title {
  color: #3498db;
}

.gallery-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* 状态样式 */
.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  animation: fadeIn 0.5s ease forwards;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(52, 152, 219, 0.3);
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.error-icon, .empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.btn-primary {
  margin-top: 20px;
  padding: 10px 24px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.btn-primary:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.2rem;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .card-inner {
    flex-direction: row;
    text-align: left;
    padding: 20px;
    align-items: center;
    gap: 20px;
  }
  
  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 0;
  }
  
  .card-content {
    align-items: flex-start;
  }
  
  .card-desc {
    margin-bottom: 0;
  }
  
  .card-arrow {
    display: none;
  }
}
</style>
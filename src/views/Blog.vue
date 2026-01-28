<template>
  <div class="blog-page page" :class="{ 'is-reading': selectedPost }">
    <!-- 背景效果 (保持与首页一致) -->
    <div class="background-effects">
      <div class="gradient-overlay"></div>
    </div>
    
    <!-- 阅读进度条 -->
    <div class="reading-progress" :style="{ width: progress + '%' }"></div>
    
    <!-- 主容器 -->
    <main class="container">
      
      <!-- 加载/错误状态 -->
      <div class="state-container loading-state" v-if="loading">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>
      
      <div class="state-container error-state" v-else-if="error">
        <div class="error-icon">❌</div>
        <h3>出错了</h3>
        <p>{{ error }}</p>
        <button class="btn btn-primary" @click="retryLoad">重试</button>
      </div>

      <!-- 文章列表视图 -->
      <template v-else-if="!selectedPost">
        <header class="blog-header">
          <h1 class="page-title">
            <span class="title-main">思考 & 记录</span>
          </h1>
          <p class="page-subtitle">分享技术见解与生活感悟</p>

          <!-- 搜索和分类控制栏 (从导航栏移至此处) -->
        <div class="blog-controls">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="搜索文章..."
              class="search-input"
            />
          </div>
          <div class="category-filter">
            <button 
              v-for="category in categories" 
              :key="category"
              :class="['category-btn', { active: selectedCategory === category }]"
              @click="selectedCategory = category"
            >
              {{ category }}
            </button>
          </div>
        </div>
        </header>

        <div class="post-grid" v-if="filteredPosts.length > 0">
          <article 
            v-for="(post, index) in filteredPosts" 
            :key="post.file" 
            class="post-card"
            @click="selectPost(post)"
            :style="{ animationDelay: index * 0.05 + 's' }"
          >
            <div class="post-card-content">
              <div class="post-meta-top">
                <span class="post-category">{{ post.subtitle }}</span>
                <span class="post-date">{{ post.date }}</span>
              </div>
              <h2 class="post-title">{{ post.title }}</h2>
              <p class="post-excerpt">{{ getExcerpt(post) }}</p>
              <div class="post-footer">
                <span class="read-more">阅读全文 →</span>
              </div>
            </div>
          </article>
        </div>
        
        <div class="state-container empty-state" v-else>
          <div class="empty-icon">📭</div>
          <h3>没有找到文章</h3>
          <p>换个关键词试试？</p>
        </div>
      </template>

      <!-- 文章详情视图 -->
      <div class="post-viewer" :class="{ 'reading-mode': isReadingMode }" v-else>
        <!-- 左侧/中间：文章内容 -->
        <article class="post-content-wrapper">
          <!-- 返回按钮 -->
          <div class="post-nav-actions">
            <button class="btn btn-secondary back-btn" @click="returnToList">
              ← 返回列表
            </button>
            <div class="right-actions">
               <button class="action-btn" @click="toggleReadingMode" :title="isReadingMode ? '退出阅读模式' : '进入阅读模式'">
                {{ isReadingMode ? '👁️‍🗨️' : '📖' }}
              </button>
               <button class="action-btn" @click="sharePost" title="分享">
                📤
              </button>
            </div>
          </div>

          <header class="post-header">
            <h1 class="post-title-large">{{ selectedPost.title }}</h1>
            <div class="post-meta-detailed">
              <div class="meta-item">
                <span class="meta-icon">📅</span>
                {{ selectedPost.date }}
              </div>
              <div class="meta-item">
                <span class="meta-icon">🏷️</span>
                {{ selectedPost.subtitle }}
              </div>
              <div class="meta-item">
                <span class="meta-icon">⏱️</span>
                {{ readingTime }} 分钟阅读
              </div>
            </div>
          </header>
          
          <div class="markdown-body" v-html="parsedContent" ref="articleContent"></div>
          
          <div class="post-footer-actions">
            <div class="tags-list">
               <span class="tag" v-for="tag in postTags" :key="tag">#{{ tag }}</span>
            </div>
            <div class="action-buttons">
               <button class="btn btn-outline" @click="scrollToTop">↑ 返回顶部</button>
            </div>
          </div>

          <!-- 上一篇/下一篇导航 -->
          <div class="post-navigation" v-if="prevPost || nextPost">
            <div class="nav-item prev" v-if="prevPost" @click="selectPost(prevPost)">
              <span class="nav-label">← 上一篇</span>
              <span class="nav-title">{{ prevPost.title }}</span>
            </div>
            <div class="nav-item next" v-if="nextPost" @click="selectPost(nextPost)">
              <span class="nav-label">下一篇 →</span>
              <span class="nav-title">{{ nextPost.title }}</span>
            </div>
          </div>
        </article>
        
        <!-- 右侧：目录 -->
        <aside class="post-sidebar" v-if="toc.length > 0">
          <div class="toc-container">
            <h3 class="toc-title">目录</h3>
            <ul class="toc-list">
              <li 
                v-for="item in toc" 
                :key="item.id" 
                :class="['toc-item', `toc-level-${item.level}`, { active: activeHeading === item.id }]"
              >
                <a 
                  :href="'#' + item.id" 
                  @click.prevent="scrollToHeading(item.id)"
                >
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted, nextTick } from 'vue'
import { parseMarkdown, generateTOC, calculateReadingTime, generateExcerpt, parseFrontMatter } from '../utils/markdownUtils'
import { addCopyButtonsToCodeBlocks } from '../utils/codeUtils'
import { loadPosts as fetchPosts, loadPostContent } from '../utils/fileUtils'
import 'highlight.js/styles/atom-one-dark.css' // 引入代码高亮样式

// 响应式数据
const posts = ref([])
const selectedPost = ref(null)
const markdownContent = ref('')
const loading = ref(false)
const error = ref('')
const progress = ref(0)
const searchQuery = ref('')
const selectedCategory = ref('全部')
const isDarkMode = ref(false)
const isReadingMode = ref(false)
const activeHeading = ref('')
const articleContent = ref(null)

// 计算属性
const categories = computed(() => {
  const cats = ['全部', ...new Set(posts.value.map(post => post.subtitle))]
  return cats
})

const filteredPosts = computed(() => {
  let result = posts.value
  if (selectedCategory.value !== '全部') {
    result = result.filter(post => post.subtitle === selectedCategory.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.subtitle.toLowerCase().includes(query)
    )
  }
  return result
})

const prevPost = computed(() => {
  if (!selectedPost.value) return null
  const index = filteredPosts.value.findIndex(p => p.file === selectedPost.value.file)
  return index > 0 ? filteredPosts.value[index - 1] : null
})

const nextPost = computed(() => {
  if (!selectedPost.value) return null
  const index = filteredPosts.value.findIndex(p => p.file === selectedPost.value.file)
  return index < filteredPosts.value.length - 1 ? filteredPosts.value[index + 1] : null
})

const toc = computed(() => generateTOC(markdownContent.value))
const parsedContent = computed(() => parseMarkdown(markdownContent.value))
const readingTime = computed(() => calculateReadingTime(markdownContent.value))
const postTags = computed(() => {
  // 模拟标签生成，实际应从文章元数据获取
  if (!selectedPost.value) return []
  return [selectedPost.value.subtitle, '学习记录']
})

// 方法
const loadPosts = async () => {
  loading.value = true
  error.value = ''
  try {
    posts.value = await fetchPosts()
  } catch (err) {
    console.error('加载失败:', err)
    error.value = '无法加载文章列表'
  } finally {
    loading.value = false
  }
}

const selectPost = async (post) => {
  loading.value = true
  try {
    const rawContent = await loadPostContent(post.file)
    const { content } = parseFrontMatter(rawContent)
    markdownContent.value = content
    selectedPost.value = post
    window.scrollTo({ top: 0, behavior: 'instant' })
    // 等待 DOM 更新后处理代码块和目录联动
    nextTick(() => {
      addCopyButtonsToCodeBlocks()
      setupIntersectionObserver()
    })
  } catch (err) {
    console.error('加载文章内容失败:', err)
    error.value = '无法加载文章内容'
  } finally {
    loading.value = false
  }
}

const returnToList = () => {
  selectedPost.value = null
  markdownContent.value = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const retryLoad = () => {
  if (selectedPost.value) {
    selectPost(selectedPost.value)
  } else {
    loadPosts()
  }
}

const getExcerpt = (post) => post.excerpt || generateExcerpt(post)

const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80 // 头部导航的高度偏移
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    })
    activeHeading.value = id
  }
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  progress.value = Math.min(100, Math.max(0, scrollPercent))
}

const sharePost = () => {
  if (navigator.share) {
    navigator.share({
      title: selectedPost.value?.title,
      url: window.location.href
    }).catch(() => copyLink())
  } else {
    copyLink()
  }
}

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
    .then(() => alert('链接已复制'))
    .catch(() => alert('复制失败'))
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark-mode', isDarkMode.value)
}

const toggleReadingMode = () => {
  isReadingMode.value = !isReadingMode.value
}

// 目录联动逻辑
let observer = null
const setupIntersectionObserver = () => {
  if (observer) observer.disconnect()
  
  const headings = articleContent.value?.querySelectorAll('h2, h3, h4')
  if (!headings || headings.length === 0) return

  const options = {
    root: null,
    rootMargin: '-100px 0px -60% 0px', // 视口中间部分触发
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeHeading.value = entry.target.id
      }
    })
  }, options)

  headings.forEach(h => observer.observe(h))
}

// 生命周期
onMounted(() => {
  loadPosts()
  window.addEventListener('scroll', updateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* 基础布局 */
.blog-page {
  min-height: 100vh;
  padding-top: 80px;
  color: #e0e0e0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 博客页面全局样式 */
.blog-page {
  padding-top: 120px;
  min-height: 100vh;
  font-family: 'HYNanGongTiJ-2', cursive;
}

/* 头部控制栏 */
.blog-controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 8px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  width: 100%;
  max-width: 400px;
}

.search-input {
  background: transparent;
  border: none;
  color: #fff;
  padding: 5px 10px;
  outline: none;
  width: 100%;
  font-family: inherit;
  font-size: 1rem;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.category-filter {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.category-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  padding: 8px 20px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  backdrop-filter: blur(5px);
}

.category-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.category-btn.active {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
}

/* 文章列表 */
.blog-header {
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

.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  padding-bottom: 60px;
}

.post-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  opacity: 0; /* for animation */
  animation: fadeInUp 0.8s ease forwards;
}

.post-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
}

.post-card-content {
  padding: 30px;
}

.post-meta-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 15px;
}

.post-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #fff;
  line-height: 1.4;
  font-weight: bold;
}

.post-excerpt {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  color: #66b3ff;
  font-weight: bold;
  font-size: 1rem;
  transition: transform 0.2s;
  display: inline-block;
}

.post-card:hover .read-more {
  transform: translateX(5px);
}

/* 文章详情视图 */
.post-viewer {
  display: flex;
  gap: 40px;
  padding-bottom: 60px;
  animation: fadeIn 0.5s ease forwards;
}

.post-nav-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.back-btn {
  padding: 8px 24px;
  border-radius: 50px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: inherit;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.right-actions {
  display: flex;
  gap: 10px;
}

.post-content-wrapper {
  flex: 1;
  min-width: 0;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 50px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.post-sidebar {
  width: 300px;
  position: sticky;
  top: 140px;
  height: calc(100vh - 160px);
  overflow-y: auto;
}

.post-header {
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 30px;
}

.post-title-large {
  font-size: 2.8rem;
  color: #fff;
  margin-bottom: 25px;
  line-height: 1.3;
  font-weight: bold;
}

.post-meta-detailed {
  display: flex;
  gap: 25px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}


.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 目录样式 */
.toc-container {
  padding: 20px;
  background: rgba(30, 30, 30, 0.4);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.toc-title {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #fff;
  font-weight: bold;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item a {
  display: block;
  padding: 5px 0;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all 0.2s;
  font-size: 0.9rem;
  border-left: 2px solid transparent;
  padding-left: 10px;
}

.toc-item.active a, .toc-item a:hover {
  color: #3498db;
  border-left-color: #3498db;
}

.toc-level-3 a { padding-left: 20px; }
.toc-level-4 a { padding-left: 30px; }

/* Markdown 内容样式 (简化版) */
:deep(.markdown-body) {
  color: #e0e0e0;
  line-height: 1.8;
  font-size: 1.05rem;
}

:deep(.markdown-body h1), :deep(.markdown-body h2), :deep(.markdown-body h3) {
  color: #fff;
  margin-top: 1.5em;
  margin-bottom: 0.8em;
  font-weight: bold;
}

:deep(.markdown-body h2) { font-size: 1.8rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }
:deep(.markdown-body h3) { font-size: 1.4rem; }

:deep(.markdown-body p) { margin-bottom: 1.2em; }

:deep(.markdown-body a) { color: #3498db; text-decoration: none; }
:deep(.markdown-body a:hover) { text-decoration: underline; }

:deep(.markdown-body blockquote) {
  border-left: 4px solid #3498db;
  padding-left: 15px;
  color: rgba(255, 255, 255, 0.7);
  margin: 1.5em 0;
  background: rgba(52, 152, 219, 0.1);
  padding: 10px 15px;
  border-radius: 4px;
}

:deep(.markdown-body code) {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  color: #ff9f43;
}

:deep(.markdown-body pre) {
  background: #282c34;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5em 0;
  position: relative;
}

:deep(.markdown-body pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: 0.95em;
}

:deep(.markdown-body img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1em 0;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

:deep(.image-container) {
  text-align: center;
}

:deep(.image-caption) {
  display: block;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 5px;
}

/* 按钮样式 */
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-outline {
  margin: 10px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.action-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.action-btn.primary {
  width: auto;
  border-radius: 20px;
  padding: 0 15px;
  background: #3498db;
  border-color: #3498db;
}

/* 进度条 */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: #3498db;
  z-index: 1001;
  transition: width 0.1s;
}

/* 背景特效 (与首页一致) */
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

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 响应式 */
@media (max-width: 900px) {
  .post-viewer {
    flex-direction: column;
  }
  .post-sidebar {
    display: none; /* 移动端暂隐藏目录 */
  }
  .post-content-wrapper {
    padding: 20px;
  }
}

/* ·块复制按钮样式 */
:deep(.code-wrapper) {
  position: relative;
}

:deep(.copy-btn) {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  color: #aaa;
  cursor: pointer;
  padding: 5px;
  font-size: 1rem;
  transition: all 0.2s;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  opacity: 0;
}

:deep(.code-wrapper:hover .copy-btn) {
  opacity: 1;
}

:deep(.copy-btn:hover) {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

/* 阅读模式 */
.post-viewer.reading-mode .post-content-wrapper {
  background: #fff;
  color: #333;
  box-shadow: none;
  max-width: 800px;
  margin: 0 auto;
}

.post-viewer.reading-mode :deep(.markdown-body) {
  color: #333;
}

.post-viewer.reading-mode :deep(.markdown-body h1),
.post-viewer.reading-mode :deep(.markdown-body h2),
.post-viewer.reading-mode :deep(.markdown-body h3) {
  color: #111;
  border-bottom-color: #eee;
}

.post-viewer.reading-mode :deep(.markdown-body blockquote) {
  background: #f5f5f5;
  color: #555;
  border-left-color: #3498db;
}

.post-viewer.reading-mode :deep(.markdown-body pre) {
  background: #f6f8fa;
  border: 1px solid #ddd;
}

.post-viewer.reading-mode :deep(.markdown-body code) {
  background: rgba(27, 31, 35, 0.05);
  color: #24292e;
}

.post-viewer.reading-mode .post-sidebar {
  display: none;
}

.post-viewer.reading-mode .post-title-large {
  color: #000;
}

.post-viewer.reading-mode .post-meta-detailed {
  color: #666;
}

/* 底部导航 */
.post-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  gap: 20px;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-item.next {
  align-items: flex-end;
  text-align: right;
}

.nav-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 5px;
}

.nav-title {
  font-size: 1rem;
  color: #fff;
  font-weight: bold;
}

.post-viewer.reading-mode .nav-item {
  background: #f5f5f5;
  border-color: #eee;
}

.post-viewer.reading-mode .nav-label {
  color: #888;
}

.post-viewer.reading-mode .nav-title {
  color: #333;
}
</style>
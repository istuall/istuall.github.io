<template>
  <nav class="navbar">
    <div class="logo-container">
      <img class="logo" src="/sources/logo.jpg" alt="LOGO">
      <span class="logo-title">Istuall.fun</span>
    </div>
    <div class="nav-links">
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/blog" class="nav-link">文章</router-link>
      <router-link to="/papers" class="nav-link">展馆</router-link>
      <router-link to="/about" class="nav-link">关于</router-link>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.logo-container {
    display: flex;
    align-items: center;
    margin-right: 2rem;
}

.logo {
    height: 25px;
}

.logo-title {
    margin-left: 1rem;
    font-size: 2rem;
    font-weight: bold;
    font-family: 'BrushScriptMTItalic', cursive;
    color: #007bff;
}

.nav-links {
    display: flex;
    gap: 1.5rem;
}

.nav-link {
    color: #333;
    text-decoration: none;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    font-family: 'HYNanGongTiJ-2', cursive;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 8px;
}

.nav-link:hover,
.nav-link.router-link-active {
    color: #fff;
    background-color: rgba(0, 123, 255, 0.66);
    transform: scale(1.1);
}

/* 修改手机端样式 */
@media (max-width: 768px) {
    .navbar {
        padding: 0.5rem;
        flex-direction: column;
        align-items: center;
    }

    .logo-container {
        display: flex;
        margin: 0 0 0.5rem 0;
    }

    .nav-links {
        width: 100%;
        justify-content: center;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .nav-link {
        font-size: 0.9rem;
        padding: 0.3rem;
        white-space: nowrap;
    }
}
</style>
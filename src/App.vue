<template>
  <div id="app">
    <ImageBackground />
    <NavBar />
    <router-view />
  </div>
</template>

<script setup>
import ImageBackground from './components/ImageBackground.vue'
import NavBar from './components/NavBar.vue'
</script>

<style>
#app {
  min-height: 100vh;
  position: relative;
}
</style>
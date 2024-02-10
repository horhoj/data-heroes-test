<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <main class="main">
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped>
.main {
  display: flex;
  flex-grow: 1;
}
</style>

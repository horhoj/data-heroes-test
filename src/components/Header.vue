<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <nav class="nav">
      <RouterLink class="router-link" active-class="router-link-active" :to="{ name: 'home' }"
        >Home</RouterLink
      >
      <RouterLink class="router-link" active-class="router-link-active" :to="{ name: 'about' }"
        >About</RouterLink
      >
    </nav>
  </header>
</template>

<style scoped>
.nav {
  padding: 10px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.router-link {
  text-decoration: none;
}

.router-link-active {
  color: red;
}
</style>

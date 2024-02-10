<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="global-container">
      <div class="logo">RICK & MORTY</div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #242525;
  padding: 15px;
}
.logo {
  color: #fff;
  font-size: 80px;
  font-weight: 500;

  @media screen and (max-width: 700px) {
    font-size: 40px;
  }
}
</style>

<script lang="ts" setup>
const props = defineProps<{ isShow: boolean }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div className="spinner" v-if="props.isShow" />
    </Transition>
  </Teleport>
</template>

<style scoped>
.spinner {
  z-index: 4000;
  position: fixed;
  top: 0;
  left: 0;
  animation: progressBar 0.8s linear 0s infinite;
  background: darkslateblue
    linear-gradient(
      315deg,
      transparent,
      transparent 33%,
      rgba(0, 0, 0, 0.3) 33%,
      rgba(0, 0, 0, 0.3) 66%,
      transparent 66%,
      transparent
    )
    repeat-x scroll;
  background-size: 16px 8px;
  bottom: 0;
  height: 8px;
  margin-bottom: -5px;
  width: 100%;
  transition: all 300ms;
}

@keyframes progressBar {
  0% {
    background-position: 0 0;
  }
  to {
    background-position: 64px 0;
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from,
.modal-leave-to {
  /* opacity: 1; */
}
</style>

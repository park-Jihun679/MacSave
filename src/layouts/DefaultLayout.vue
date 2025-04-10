<script setup>
import HeaderContainer from '@/components/HeaderContainer.vue'
</script>
<!-- DefaultLayout.vue -->
<template>
  <div class="app-container">
    <HeaderContainer />
    <div class="main-layout">
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 본문 영역 */
.content {
  position: relative;
  flex: 1;
  padding: 24px;
  background-color: #3a4046;

  z-index: 0;
  overflow: hidden;
}

.content::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url('/logo.png');
  background-repeat: no-repeat;
  background-size: 550px auto;
  opacity: 0.35;
  width: 550px;
  height: 600px;
  z-index: -1;
  pointer-events: none;
}
</style>

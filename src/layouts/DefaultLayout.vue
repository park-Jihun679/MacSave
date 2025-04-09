<script setup>
import HeaderContainer from '@/components/HeaderContainer.vue'
import MenuBar from '@/components/MenuBar.vue'
</script>
<!-- DefaultLayout.vue -->
<template>
  <div class="app-container">
    <HeaderContainer />
    <div class="main-layout">
      <MenuBar />
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
}

/* 헤더 아래 본문 레이아웃 */
.main-layout {
  display: flex;
  align-items: stretch;
  min-height: calc(100vh - 80px); /* 헤더 높이 제외한 공간 (조정 가능) */
}

/* 본문 영역 */
.content {
  flex: 1;
  padding: 24px;
}
</style>

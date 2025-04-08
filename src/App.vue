<script setup>
import HeaderContainer from './components/HeaderContainer.vue' // 경로는 상황에 따라 조정
</script>

<template>
  <div>
    <Header />
    <router-view />
    <!-- 여기에 각 페이지 컴포넌트가 표시됨 -->
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: 'Pretendard', sans-serif;
}
</style>

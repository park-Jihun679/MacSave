<template>
  <header class="app-header">
    <div class="logo">
      <img src="/logo.png" alt="MacSave 로고" />
      <span class="logo-text">MacSave</span>
    </div>
    <div class="date">{{ today }}</div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const today = ref(new Date().toISOString().split('T')[0])
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff9e6;
  padding: 12px 24px;
  height: 56px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  vertical-align: middle;
}

.logo-text {
  font-size: 24px;
  font-weight: 900;
  color: #222;
  text-shadow: 2px 3px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  font-family: 'Nunito', sans-serif;
}

.date {
  font-size: 16px;
  color: #222;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);
  font-family: 'Noto Sans KR', sans-serif;
}
</style>

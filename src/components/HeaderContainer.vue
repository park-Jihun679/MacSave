<script setup>
import { ref } from 'vue'

const today = ref(
  new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
)
</script>

<template>
  <header class="app-header">
    <!-- 왼쪽: 로고 -->
    <div class="left">
      <img class="logo" src="/logo.png" alt="MacSave 로고" />
    </div>

    <!-- 오른쪽: 메뉴 + 날짜 묶음 -->
    <div class="right-group">
      <nav class="menu-list">
        <RouterLink to="/history" class="menu-item" exact>Expense</RouterLink>
        <RouterLink to="/calendar" class="menu-item" exact>Calendar</RouterLink>
        <RouterLink to="/stats" class="menu-item" exact>Analysis</RouterLink>
        <RouterLink to="/settings" class="menu-item" exact>Setting</RouterLink>
      </nav>
      <div class="date">{{ today }}</div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  background-color: #1d2329;
  padding: 0 24px;
}

.logo {
  width: 70px;
  height: auto;
}

/* 오른쪽 영역 전체 (메뉴 + 날짜) */
.right-group {
  display: flex;
  align-items: center;
  gap: 32px;
}

/* 메뉴 */
.menu-list {
  display: flex;
  gap: 30px;
}

.menu-item {
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
  color: #ffb400;
  padding: 6px 10px;
  border-radius: 8px;
}

.router-link-exact-active {
  background-color: rgba(255, 223, 145, 0.5);
  box-shadow: inset 0 2px 0px rgba(0, 0, 0, 0.7);
}

/* 날짜는 맨 오른쪽 */
.date {
  font-size: 15px;
  color: #8a8a8a;
  white-space: nowrap;
  position: relative;
  top: -13px;
  font-weight: 900;
}
</style>

<template>
  <aside class="menu-bar">
    <div class="menu-list">
      <router-link to="/history" class="menu-item">📝 내역</router-link>
      <router-link to="/calendar" class="menu-item">📅 달력</router-link>
      <router-link to="/stats" class="menu-item">📊 통계</router-link>
      <router-link to="/settings" class="menu-item">⚙️ 설정</router-link>
    </div>

    <div class="bottom-logo">
      <img src="/logo.png" alt="MacSave 로고" />
    </div>
  </aside>
</template>

<script setup>
// 컴포넌트 로직 없음
</script>

<style scoped>
.menu-bar {
  width: 140px;
  background-color: #f7f0e5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.25);
  padding: 24px 0;
  height: 100vh;
}

/* 메뉴 리스트 */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 기본 메뉴 스타일 */
.menu-item {
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  color: #222;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  padding: 6px 10px 6px 14px;
  display: block;
}

/* 선택된 메뉴 항목 스타일 (빨간색 강조) */
.router-link-exact-active {
  background-color: #ffe0e0;
  border-left: 4px solid #ff5c5c;
  color: #e74c3c;
  font-weight: 700;
  padding: 6px 0 6px 14px;
  width: 100%;
  box-sizing: border-box;
}

/* 로고 */
.bottom-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 0px;
}

.bottom-logo img {
  width: 130px;
  height: auto;
}
</style>

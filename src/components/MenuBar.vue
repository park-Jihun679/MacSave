<template>
  <aside class="menu-bar">
    <div class="menu-list">
      <router-link to="/history" class="menu-item">📝 내역</router-link>
      <router-link to="/calendar" class="menu-item">📅 달력</router-link>
      <router-link to="/stats" class="menu-item">📊 통계</router-link>
      <router-link to="/settings" class="menu-item">⚙️ 설정</router-link>
    </div>

    <div class="bottom-logo">
      <img src="/MacSave.png" alt="MacSave 로고" />
    </div>
  </aside>
</template>

<script setup>
// 없음
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
}

/* 메뉴 리스트 */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 24px;
}

.menu-item {
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  color: #222;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
}

.menu-item:hover {
  font-weight: 700;
}

/* 하단 로고 */
.bottom-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1px;
}

.bottom-logo img {
  width: 130px;
  height: auto;
}
</style>

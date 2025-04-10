<script setup>
import { ref } from 'vue'

const props = defineProps({
  filter: String, // 현재 선택된 filter 값
})
const emit = defineEmits(['update:filter'])

const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const setFilter = filterValue => {
  emit('update:filter', filterValue)
  showDropdown.value = false
}
</script>

<template>
  <div class="dropdown">
    <button class="dropdown-toggle" @click="toggleDropdown">
      분류 <span class="arrow">▾</span>
    </button>
    <ul v-if="showDropdown" class="dropdown-menu">
      <li
        @click="setFilter('category')"
        :class="{ active: filter === 'category' }"
      >
        카테고리별
      </li>
      <li @click="setFilter('week')" :class="{ active: filter === 'week' }">
        주별
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  background-color: #fff8e1;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 4px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fffef9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
  padding: 6px 0;
  list-style: none;
  width: 140px;
  z-index: 10;
}

.dropdown-menu li {
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  transition:
    background-color 0.2s,
    color 0.2s;
}

/* 기본 hover 스타일 */
.dropdown-menu li:hover {
  background-color: #f5f5f5;
}

/* 선택된 filter에 대한 스타일 */
.dropdown-menu li.active {
  background-color: #ffe082;
  color: #000;
  font-weight: bold;
}
</style>

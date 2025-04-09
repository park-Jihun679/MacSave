<script setup>
import { computed } from 'vue'
const props = defineProps(['category', 'items'])
const emits = defineEmits(['back'])

const totalAmount = computed(() =>
  props.items.reduce((sum, item) => sum + item.amount, 0),
)
</script>

<template>
  <div class="receipt-detail">
    <button @click="$emit('back')" class="back-button">← 돌아가기</button>
    <h3>4월 {{ category }} 영수증</h3>

    <ul class="receipt-list">
      <li v-for="item in items" :key="item.id" class="receipt-item">
        <span class="date">{{ item.date }}</span>
        <span class="memo">{{ item.title }}</span>
        <span class="amount">{{ item.amount.toLocaleString() }} 원</span>
      </li>
    </ul>

    <p class="total">총 합계: {{ totalAmount.toLocaleString() }} 원</p>
  </div>
</template>

<style scoped>
.receipt-detail {
  padding: 16px;
}

.back-button {
  margin-bottom: 12px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.receipt-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.receipt-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.total {
  margin-top: 12px;
  font-weight: bold;
  text-align: right;
}
</style>

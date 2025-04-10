<script setup>
import { computed } from 'vue'

const props = defineProps(['category', 'items'])
const emits = defineEmits(['back'])

const totalAmount = computed(() =>
  props.items.reduce((sum, item) => sum + item.amount, 0),
)

const formattedTotal = computed(() => {
  return totalAmount.value.toLocaleString()
})
</script>

<template>
  <div class="receipt-detail">
    <button @click="$emit('back')" class="back-button">← 돌아가기</button>
    <h3>4월 {{ category }} 영수증</h3>

    <ul class="receipt-list">
      <li v-for="item in items" :key="item.id" class="receipt-item">
        <span class="date">{{ item.date }}</span>
        <span class="memo">{{ item.title }}</span>
        <span class="amount">- {{ item.amount.toLocaleString() }} 원</span>
      </li>
    </ul>

    <p class="total">합계: {{ formattedTotal }}</p>
  </div>
</template>

<style scoped>
.receipt-detail {
  padding: 1rem;
  background: #f9f9f9;
}

.back-button {
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 0.5rem;
}
h3 {
  margin-bottom: 1rem;
}
.receipt-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.receipt-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
.receipt-item span {
  flex: 1;
}
.date {
  color: #999;
  font-size: 14px;
}
.memo {
  text-align: center;
}
.amount {
  text-align: right;
}
.total {
  margin-top: 1rem;
  font-weight: bold;
  font-size: 16px;
  text-align: right;
}
</style>

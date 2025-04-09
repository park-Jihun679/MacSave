<script setup>
defineProps({
  incomeItems: Object,
  expenseItems: Object,
  totalIncome: Number,
  totalExpense: Number,
  netTotal: Number,
})
</script>

<template>
  <div>
    <h3>4월 카테고리별 영수증</h3>
    <div>
      <h4>지출</h4>
      <div v-for="(item, category) in expenseItems" :key="category">
        {{ category }}: - {{ item.amount.toLocaleString() }}원 ({{
          item.percentage
        }}%)
      </div>
      <p class="summary">합계: - {{ totalExpense.toLocaleString() }} 원</p>
    </div>

    <div>
      <h4>수입</h4>
      <div v-for="(item, category) in incomeItems" :key="category">
        {{ category }}: + {{ item.amount.toLocaleString() }}원 ({{
          item.percentage
        }}%)
        <p class="summary">합계: + {{ totalIncome.toLocaleString() }} 원</p>
      </div>
      <p class="summary">
        총 합계: {{ netTotal >= 0 ? '+' : '-' }}
        {{ Math.abs(netTotal).toLocaleString() }} 원
      </p>
    </div>
  </div>
</template>

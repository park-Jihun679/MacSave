<template>
  <div>
    <h3>4월 카테고리별 영수증</h3>
    <div>
      <h4>💸 지출</h4>
      <div v-for="item in expenseItems" :key="item.id">
        • {{ item.category }} - {{ item.amount.toLocaleString() }}원
      </div>
    </div>
    <div>
      <h4>💰 수입</h4>
      <div v-for="item in incomeItems" :key="item.id">
        • {{ item.category }} - {{ item.amount.toLocaleString() }}원
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['incomeItems', 'expenseItems'])
</script>

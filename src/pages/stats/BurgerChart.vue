<script setup>
const props = defineProps({
  totalIncome: Number,
  totalAmount: Number,
  expenseItems: Object,
})
defineEmits(['select-category'])
</script>

<template>
  <div class="burger-chart">
    <div class="bun top">
      수입: <strong>{{ totalIncome.toLocaleString() }}</strong> 원
    </div>

    <div
      class="patty"
      v-for="(expense, category) in expenseItems"
      :key="category"
      @click="$emit('select-category', category)"
    >
      {{ category }}: <strong>{{ expense.amount.toLocaleString() }}</strong> 원
      ({{ expense.percentage }}%)
    </div>

    <div class="bun bottom">
      총 합계: <strong>{{ totalAmount.toLocaleString() }}</strong> 원
    </div>
  </div>
</template>

<style scoped>
.burger-chart {
  width: 300px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;
}

.bun {
  background-color: #f4c06b;
  color: #fff;
  padding: 12px 16px;
  border-radius: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.bun.top {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.bun.bottom {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.patty {
  background-color: #a0522d; /* 갈색 */
  color: #fff;
  padding: 10px 16px;
  margin-bottom: 8px;
  border-radius: 12px;
  font-weight: 500;
  text-align: left;
}

strong {
  font-weight: 700;
}
</style>

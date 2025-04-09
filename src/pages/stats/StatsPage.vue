<script setup>
import { useTransactionsStore } from '@/stores/transactionsStores'
import { useExpenseStore } from '@/stores/expenseStores'
import { useIncomeStore } from '@/stores/incomeStores'
import { ref, onMounted, computed } from 'vue'
import StatsFilter from './StatsFilter.vue'
import BurgerChart from './BurgerChart.vue'
import ReceiptStats from './ReceiptStats.vue'

const filter = ref('category')

const transactionsStore = useTransactionsStore()
const expenseStore = useExpenseStore()
const incomeStore = useIncomeStore()

const filteredList = computed(() => {
  const data = transactionsStore.filteredByCurrentMonth

  if (filter.value === 'category') {
    return transactionsStore.groupByCategory(data)
  } else if (filter.value === 'week') {
    return transactionsStore.groupByWeek(data)
  }

  return []
})

onMounted(() => {
  transactionsStore.fetchTransactions()
  expenseStore.fetchExpenses()
  incomeStore.fetchIncomes()
})
</script>

<template>
  <div class="header-container">
    <h2>📊 4월 햄버거 분석</h2>
    <StatsFilter v-model:filter="filter" />
  </div>

  <p>{{ transactionsStore.filteredByCurrentMonth }}</p>
  <p>{{ incomeStore.filteredIncomesByMonth }}</p>
  <p>{{ expenseStore.filteredExpensesByMonth }}</p>
  <hr />
  <p>{{ filteredList }}</p>
  <BurgerChart />
  <ReceiptStats />
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>

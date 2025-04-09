<script setup>
import { useExpenseStore } from '@/stores/expenseStores'
import { useIncomeStore } from '@/stores/incomeStores'
import { ref, onMounted, computed } from 'vue'
import StatsFilter from './StatsFilter.vue'
import BurgerChart from './BurgerChart.vue'
import ReceiptStats from './ReceiptStats.vue'

const filter = ref('category')

const incomeStore = useIncomeStore()
const expenseStore = useExpenseStore()

const totalAmount = computed(() => {
  return incomeStore.totalIncomeAmount - expenseStore.totalExpenseAmount
})

onMounted(() => {
  expenseStore.fetchExpenses()
  incomeStore.fetchIncomes()
})
</script>

<template>
  <div class="header-container">
    <h2>📊 4월 햄버거 분석</h2>
    <StatsFilter v-model:filter="filter" />
  </div>
  <BurgerChart
    :totalIncome="incomeStore.totalIncomeAmount"
    :detailedExpensesByCategory="expenseStore.detailedExpensesByCategory"
    :totalAmount="totalAmount"
  />
  <hr />
  <p>{{ filteredList }}</p>
  <ReceiptStats
    :incomeItems="incomeStore.filteredIncomesByMonth"
    :expenseItems="expenseStore.filteredExpensesByMonth"
  />
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>

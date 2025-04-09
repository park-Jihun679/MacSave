<script setup>
import { useExpenseStore } from '@/stores/expenseStores'
import { useIncomeStore } from '@/stores/incomeStores'
import { ref, onMounted, computed } from 'vue'
import StatsFilter from './StatsFilter.vue'
import BurgerChart from './BurgerChart.vue'
import ReceiptSummary from './ReceiptSummary.vue'
import ReceiptDetail from './ReceiptDetail.vue'

const filter = ref('category')
const selectedCategory = ref(null)

const incomeStore = useIncomeStore()
const expenseStore = useExpenseStore()

const totalAmount = computed(() => {
  return incomeStore.totalIncomeAmount - expenseStore.totalExpenseAmount
})

onMounted(() => {
  expenseStore.fetchExpenses()
  incomeStore.fetchIncomes()
})

function handleCategoryClick(category) {
  selectedCategory.value = category
}

function clearCategory() {
  selectedCategory.value = null
}
</script>

<template>
  <div class="stats-layout">
    <div class="left-panel">
      <div class="header-row">
        <h2>📊 4월 햄버거 분석</h2>
        <StatsFilter v-model:filter="filter" />
      </div>
      <BurgerChart
        :totalIncome="incomeStore.totalIncomeAmount"
        :expenseItems="expenseStore.detailedExpensesByCategory"
        :totalAmount="totalAmount"
        @select-category="handleCategoryClick"
      />
    </div>

    <div class="right-panel">
      <div v-if="selectedCategory">
        <ReceiptDetail
          :category="selectedCategory"
          :items="
            expenseStore.filteredExpensesByMonth.filter(
              item => item.category === selectedCategory,
            )
          "
          @back="clearCategory"
        />
      </div>
      <div v-else>
        <ReceiptSummary
          :incomeItems="incomeStore.detailedIncomesByCategory"
          :expenseItems="expenseStore.detailedExpensesByCategory"
          :totalIncome="incomeStore.totalIncomeAmount"
          :totalExpense="expenseStore.totalExpenseAmount"
          :netTotal="totalAmount"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-layout {
  display: flex;
  gap: 32px;
}

.left-panel {
  flex: 1.2;
  display: flex;
  flex-direction: column;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.right-panel {
  flex: 1;
  background: #fff;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>

<script setup>
import { useTransactionsStore } from '@/stores/transactionsStores'
import { ref, onMounted } from 'vue'
import StatsFilter from './StatsFilter.vue'
import BurgerChart from './BurgerChart.vue'
import ReceiptStats from './ReceiptStats.vue'

const filter = ref('category')

const transactionsStore = useTransactionsStore()

onMounted(() => {
  transactionsStore.fetchStudents()
})
</script>

<template>
  <div class="header-container">
    <h2>📊 4월 햄버거 분석</h2>
    <StatsFilter v-model:filter="filter" />
  </div>

  <!-- <p>{{ transactionsStore.filteredByCurrentMonth }}</p> -->
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

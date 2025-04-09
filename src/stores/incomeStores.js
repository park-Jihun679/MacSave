// stores/incomeStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/utils/axios'

export const useIncomeStore = defineStore('incomeStore', () => {
  // state
  const incomes = ref([])

  // 현재 년-월이 default (예: "2025-04")
  const currentMonth = ref(new Date().toISOString().slice(0, 7))

  // action
  const fetchIncomes = async () => {
    try {
      const response = await apiClient.get('./incomes') 
      incomes.value = response.data
    } catch (err) {
      console.log('수입 내역 로딩 에러: ', err)
    }
  }

  // getter
  const filteredIncomesByMonth = computed(() => {
    return incomes.value.filter(i => i.date.startsWith(currentMonth.value))
  })

  return { incomes, currentMonth, fetchIncomes, filteredIncomesByMonth }
})

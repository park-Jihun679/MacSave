// stores/expenseStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/utils/axios'

export const useExpenseStore = defineStore('expenseStore', () => {
  // state
  const expenses = ref([])

  // 현재 년-월이 default (예: "2025-04")
  const currentMonth = ref(new Date().toISOString().slice(0, 7))

  // action
  const fetchExpenses = async () => {
    try {
      const response = await apiClient.get('./expenses') 
      expenses.value = response.data
    } catch (err) {
      console.log('지출 내역 로딩 에러: ', err)
    }
  }

  // getter
  const filteredExpensesByMonth = computed(() => {
    return expenses.value.filter(e => e.date.startsWith(currentMonth.value))
  })

  return { expenses, currentMonth, fetchExpenses, filteredExpensesByMonth }
})

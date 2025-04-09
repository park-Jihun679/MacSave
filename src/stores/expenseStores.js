// stores/expenseStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/utils/axios'
import { calculatePercentage } from '@/utils/calculate'

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
  // 현재 월 지출 필터링
  const filteredExpensesByMonth = computed(() => {
    return expenses.value.filter(e => e.date.startsWith(currentMonth.value))
  })

  // 카테고리별 지출 합산
  const expensesByCategory = computed(() => {
    const result = {}

    filteredExpensesByMonth.value.forEach(expense => {
      const category = expense.category
      if (!result[category]) {
        result[category] = 0
      }
      result[category] += expense.amount
    })

    return result
  })

  // 현재 월의 전체 지출 총합
  const totalExpenseAmount = computed(() => {
    return filteredExpensesByMonth.value.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    )
  })

  // 카테고리별 지출 + 퍼센트
  const detailedExpensesByCategory = computed(() => {
    const total = totalExpenseAmount.value
    const result = {}

    for (const category in expensesByCategory.value) {
      const amount = expensesByCategory.value[category]
      const percentage = calculatePercentage(amount, total)
      result[category] = { amount, percentage }
    }

    return result
  })

  return {
    expenses,
    currentMonth,
    fetchExpenses,
    filteredExpensesByMonth,
    expensesByCategory,
    totalExpenseAmount,
    detailedExpensesByCategory,
  }
})

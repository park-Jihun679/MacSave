// stores/incomeStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/utils/axios'
import { calculatePercentage } from '@/utils/calculate'

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
  // 현재 월 수입 필터링
  const filteredIncomesByMonth = computed(() => {
    return incomes.value.filter(i => i.date.startsWith(currentMonth.value))
  })

  // 카테고리별 수입 합산
  const incomesByCategory = computed(() => {
    const result = {}

    filteredIncomesByMonth.value.forEach(income => {
      const category = income.category
      if (!result[category]) {
        result[category] = 0
      }
      result[category] += income.amount
    })

    return result
  })

  // 현재 월의 전체 수입 총합
  const totalIncomeAmount = computed(() => {
    return filteredIncomesByMonth.value.reduce(
      (sum, income) => sum + income.amount,
      0,
    )
  })

  // 카테고리별 수입 + 퍼센트
  const detailedIncomesByCategory = computed(() => {
    const total = totalIncomeAmount.value
    const result = {}

    for (const category in incomesByCategory.value) {
      const amount = incomesByCategory.value[category]
      const percentage = calculatePercentage(amount, total)
      result[category] = { amount, percentage }
    }

    return result
  })

  return {
    incomes,
    currentMonth,
    fetchIncomes,
    filteredIncomesByMonth,
    incomesByCategory,
    totalIncomeAmount,
    detailedIncomesByCategory,
  }
})

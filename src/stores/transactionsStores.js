import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/utils/axios'

export const useTransactionsStore = defineStore('transactionStore', () => {
  // state
  const transactions = ref([])

  // 현재 년-월이 default (ex. "2025-04")
  const currentMonth = ref(new Date().toISOString().slice(0, 7))

  // action
  const fetchTransactions = async () => {
    try {
      const response = await apiClient.get('./transactions')
      transactions.value = response.data
    } catch (err) {
      console.log('수입/지출 내역 로딩에러 : ', err)
    }
  }

  // getter
  const filteredByCurrentMonth = computed(() => {
    return transactions.value.filter(t => t.date.startsWith(currentMonth.value))
  })

  // groupBy helpers
  const groupByCategory = data => {
    return data.reduce((acc, item) => {
      const category = item.category || '기타'
      acc[category] = (acc[category] || 0) + item.amount
      return acc
    }, {})
  }

  const groupByWeek = data => {
    return data.reduce((acc, item) => {
      const week = getWeekOfMonth(item.date)
      acc[week] = (acc[week] || 0) + item.amount
      return acc
    }, {})
  }

  const getWeekOfMonth = dateStr => {
    const date = new Date(dateStr)
    const day = date.getDate()
    return Math.ceil(day / 7)
  }

  return {
    transactions,
    currentMonth,
    fetchTransactions,
    filteredByCurrentMonth,
    groupByCategory,
    groupByWeek,
    getWeekOfMonth,
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/utils/axios'

export const useTransactionsStore = defineStore('transactionStore', () => {
  // state
  const transactions = ref([])

  // 현재 년-월이 default (ex. "2025-04")
  const currentMonth = ref(new Date().toISOString().slice(0, 7))

  // action
  const fetchStudents = async () => {
    try {
      const response = await apiClient.get('./transactions')
      transactions.value = response.data
    } catch (err) {
      console.log('수입/지출 내역 로딩에러 : ', err)
    }
  }

  // getter
  const filteredByCurrentMonth = computed(() => {
    console.log(transactions.value)
    return transactions.value.filter(t => t.date.startsWith(currentMonth.value))
  })

  return { transactions, currentMonth, fetchStudents, filteredByCurrentMonth }
})

<template>
  <div class="history-page">
    <h2>📋 내역</h2>
    <!-- 날짜 필터 -->
    <div class="history-filter">
      <div class="date-display">
        <button @click="prevPeriod"><</button>
        <span class="month-display">{{ formattedDate }}</span>
        <button @click="nextPeriod">></button>
      </div>
      <select v-model="filterMode" class="filter-select">
        <option value="month">월별</option>
        <option value="week">주별</option>
        <option value="year">연도별</option>
        <!-- 기간별, 연별은 추후 추가 -->
      </select>
    </div>

    <!-- 요약 -->
    <div class="summary-bar">
      <span
        >전체<br />
        {{ total }}원</span
      >
      <span class="income"
        >수입<br />
        {{ income }}원</span
      >
      <span class="expense"
        >지출<br />
        {{ expense }}원</span
      >
    </div>

    <!-- 내역 테이블 -->
    <table class="history-table">
      <thead>
        <tr>
          <th>날짜</th>
          <th>분류</th>
          <th>금액</th>
          <th>내용</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredTransactions.length === 0">
          <td colspan="4" class="empty">🍔 데이터가 없습니다.</td>
        </tr>
        <tr v-for="item in filteredTransactions" :key="item.id">
          <td style="position: relative">
            <span
              style="
                position: absolute;
                left: 8px;
                top: 50%;
                transform: translateY(-50%);
              "
            >
              ✅
            </span>
            <span style="display: block; text-align: center">
              {{ item.date }}
            </span>
          </td>
          <td>{{ item.category }}</td>
          <td>{{ item.amount.toLocaleString() }}원</td>
          <td>{{ item.title }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTransactionsStore } from '@/stores/transactionsStores.js'
import dayjs from 'dayjs'

const transactionStore = useTransactionsStore()

const currentDate = ref(dayjs())
const filterMode = ref('month')

const formattedDate = computed(() => {
  if (filterMode.value === 'month') {
    return currentDate.value.format('YYYY년 MM월')
  } else if (filterMode.value === 'week') {
    const [start, end] = getWeekRange(currentDate.value)
    return `${start.format('MM.DD')} ~ ${end.format('MM.DD')}`
  } else if (filterMode.value === 'year') {
    return currentDate.value.format('YYYY년')
  }
  return ''
})

const getWeekRange = date => {
  const startOfWeek = dayjs(date).startOf('week') // 일요일 시작
  const endOfWeek = dayjs(date).endOf('week') // 토요일 끝
  return [startOfWeek, endOfWeek]
}
const filteredTransactions = computed(() => {
  if (filterMode.value === 'month') {
    const selectedMonth = currentDate.value.format('YYYY-MM')
    return transactionStore.transactions.filter(
      t => dayjs(t.date).format('YYYY-MM') === selectedMonth,
    )
  } else if (filterMode.value === 'week') {
    const [start, end] = getWeekRange(currentDate.value)
    return transactionStore.transactions.filter(t => {
      const txDate = dayjs(t.date)
      return (
        txDate.isAfter(start.subtract(1, 'day')) &&
        txDate.isBefore(end.add(1, 'day'))
      )
    })
  } else if (filterMode.value === 'year') {
    const selectedYear = currentDate.value.format('YYYY')
    return transactionStore.transactions.filter(
      t => dayjs(t.date).format('YYYY') === selectedYear,
    )
  }
  return []
})

const prevPeriod = () => {
  if (filterMode.value === 'month') {
    currentDate.value = currentDate.value.subtract(1, 'month')
  } else if (filterMode.value === 'week') {
    currentDate.value = currentDate.value.subtract(1, 'week')
  } else if (filterMode.value === 'year') {
    currentDate.value = currentDate.value.subtract(1, 'year')
  }
}

const nextPeriod = () => {
  if (filterMode.value === 'month') {
    currentDate.value = currentDate.value.add(1, 'month')
  } else if (filterMode.value === 'week') {
    currentDate.value = currentDate.value.add(1, 'week')
  } else if (filterMode.value === 'year') {
    currentDate.value = currentDate.value.add(1, 'year')
  }
}
// 요약 계산
const income = computed(() =>
  filteredTransactions.value
    .filter(t => t.type === '수입')
    .reduce((acc, cur) => acc + cur.amount, 0),
)

const expense = computed(() =>
  filteredTransactions.value
    .filter(t => t.type === '지출')
    .reduce((acc, cur) => acc + cur.amount, 0),
)

const total = computed(() => income.value - expense.value)

// 첫 로딩 시 데이터 fetch
onMounted(async () => {
  await transactionStore.fetchStudents()
})
</script>

<style scoped>
.history-page {
  padding: 24px;
}

.history-filter {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.date-display {
  font-size: 20px;
  background-color: #fff9e6;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 6px 12px;
  gap: 80px;
  width: fit-content;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

.date-display button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
}

.date-display button:hover {
  color: #555;
}
.summary-bar {
  font-size: 24px;
  font-weight: 330;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f0e5;
  padding: 12px 100px;
  height: 56px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  z-index: 10;
  margin-bottom: 10px;
}

.income {
  color: #0977a3;
}
.expense {
  color: #ff4545;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
}

.history-table thead {
  font-size: 16px;
  font-weight: lighter;
  align-items: center;
  background-color: #fff9e6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

.history-table tbody {
  font-size: 16px;
  text-align: center;
  background-color: #fbf9f1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

.history-table th,
.history-table td {
  padding: 6px 12px;
  border-collapse: separate;
  border-spacing: 10px;
  border-bottom: 1px solid #ddd;
}

.empty {
  text-align: center;
  color: #888;
  padding: 32px 0;
}

.filter-select {
  font-size: 20px;
  padding: 3px 12px;
  margin-left: auto;
  border-radius: 5px;
  background-color: #fff9e6;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}
</style>

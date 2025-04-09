<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko'
import { useIncomeStore } from '@/stores/incomeStores'
import { useExpenseStore } from '@/stores/expenseStores'
import dayjs from 'dayjs'

const incomeStore = useIncomeStore()
const expenseStore = useExpenseStore()

const currentRange = ref({
  start: '',
  end: '',
})

const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: true,
  locale: koLocale,
  height: 'auto',
  headerToolbar: {
    left: '',
    center: '',
    right: 'today prev title next',
  },
  buttonText: {
    today: '오늘',
  },
  titleFormat: {
    year: '2-digit',
    month: '2-digit',
  },
  dayCellContent(arg) {
    return arg.date.getDate().toString()
  },
  events: [],
  eventContent(arg) {
    const { income = 0, expense = 0 } = arg.event.extendedProps
    const total = income - expense

    const container = document.createElement('div')
    container.innerHTML = `
      <div class="fc-custom-event">
        <div class="expense">-${expense.toLocaleString()}원</div>
        <div class="income">+${income.toLocaleString()}원</div>
        <div class="total">${total.toLocaleString()}원</div>
      </div>
    `
    return { domNodes: [container] }
  },
  datesSet(arg) {
    const currentMonthStart = dayjs(arg.start)
      .add(1, 'month')
      .startOf('month')
      .format('YYYY-MM-DD')
    const currentMonthEnd = dayjs(arg.start)
      .add(1, 'month')
      .endOf('month')
      .format('YYYY-MM-DD')
    currentRange.value = {
      start: currentMonthStart,
      end: currentMonthEnd,
    }
  },
})

onMounted(async () => {
  await incomeStore.fetchIncomes()
  await expenseStore.fetchExpenses()

  const calendarApi = calendarOptions.value.getApi?.()
  if (calendarApi) {
    const view = calendarApi.view
    const currentMonthStart = dayjs(view.currentStart)
      .add(1, 'month')
      .startOf('month')
      .format('YYYY-MM-DD')
    const currentMonthEnd = dayjs(view.currentStart)
      .add(1, 'month')
      .endOf('month')
      .format('YYYY-MM-DD')
    currentRange.value = {
      start: currentMonthStart,
      end: currentMonthEnd,
    }
  }
})

const filteredIncomes = computed(() => {
  return incomeStore.incomes.filter(i => {
    return (
      i.date >= currentRange.value.start && i.date <= currentRange.value.end
    )
  })
})

const filteredExpenses = computed(() => {
  return expenseStore.expenses.filter(e => {
    return (
      e.date >= currentRange.value.start && e.date <= currentRange.value.end
    )
  })
})

const totalIncome = computed(() =>
  filteredIncomes.value.reduce((sum, i) => sum + i.amount, 0),
)

const totalExpense = computed(() =>
  filteredExpenses.value.reduce((sum, e) => sum + e.amount, 0),
)

const totalSum = computed(() => totalIncome.value - totalExpense.value)

const dailyEvents = computed(() => {
  const incomeMap = {}
  const expenseMap = {}

  incomeStore.incomes.forEach(i => {
    const date = i.date.slice(0, 10)
    incomeMap[date] = (incomeMap[date] || 0) + i.amount
  })

  expenseStore.expenses.forEach(e => {
    const date = e.date.slice(0, 10)
    expenseMap[date] = (expenseMap[date] || 0) + e.amount
  })

  const allDates = new Set([
    ...Object.keys(incomeMap),
    ...Object.keys(expenseMap),
  ])
  const result = []

  allDates.forEach(date => {
    result.push({
      start: date,
      allDay: true,
      display: 'block',
      extendedProps: {
        income: incomeMap[date] || 0,
        expense: expenseMap[date] || 0,
      },
    })
  })

  return result
})

watch(
  dailyEvents,
  () => {
    calendarOptions.value.events = dailyEvents.value
  },
  { immediate: true },
)
</script>

<template>
  <div class="calendar-wrapper">
    <h2>📅 달력</h2>

    <div class="summary-box">
      <div class="summary-item">
        전체<br />
        <span class="amount">{{ totalSum.toLocaleString() }} 원</span>
      </div>
      <div class="summary-item income">
        수입<br />
        <span class="amount">{{ totalIncome.toLocaleString() }} 원</span>
      </div>
      <div class="summary-item expense">
        지출<br />
        <span class="amount">{{ totalExpense.toLocaleString() }} 원</span>
      </div>
    </div>

    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<style>
html,
body,
#app,
.calendar-wrapper {
  height: 100%;
  padding: 0;
}

.fc {
  height: 100% !important;
}

.fc-toolbar {
  margin-bottom: 0.3rem !important;
}

.fc-header-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.fc-toolbar-chunk:last-child {
  display: flex;
  align-items: center;
  gap: 10px;
}

.fc .fc-col-header-cell-cushion {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.fc .fc-toolbar-title {
  font-size: 20px;
  font-weight: 500;
  color: #333;
}

.fc-button {
  padding: 5px 10px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.fc-button:hover {
  filter: brightness(0.8);
}

.fc-button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

.fc .fc-event-title {
  font-size: 16px !important;
  color: #1976d2;
  font-weight: bold;
  white-space: pre-wrap;
  word-break: keep-all;
  padding: 2px 4px;
  border-radius: 4px;
}

.fc .fc-daygrid-day-number {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.fc-day-other {
  background-color: #ebebeb;
  color: #a8a8a8;
}

.fc-event-time,
.fc-daygrid-event-dot {
  display: none;
}

.summary-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fef5e7;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 10px 0;
  font-weight: bold;
  font-size: 14px;
}

.summary-item {
  flex: 1;
  text-align: center;
  color: #333;
}

.summary-item.income {
  color: #0077b6;
}

.summary-item.expense {
  color: #d90429;
}

.summary-item .amount {
  font-size: 16px;
  display: block;
  margin-top: 4px;
}

.fc .fc-custom-event {
  text-align: right;
  padding-right: 4px;
}

.fc .fc-custom-event .expense {
  color: #d90429;
  font-size: 15px;
  line-height: 1.1;
}

.fc .fc-custom-event .income {
  color: #0077b6;
  font-size: 15px;
  line-height: 1.1;
}

.fc .fc-custom-event .total {
  color: #333;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.1;
  margin-top: 2px;
}

.fc .fc-event {
  background-color: transparent !important;
  border: none !important;
  padding: 0 !important;
}
/* 달력 하단의 흰 여백 제거 */
.fc-view-harness,
.fc-scroller-harness {
  min-height: auto !important;
  height: auto !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

/* 필요시 추가: 달력 전체 wrapper 높이 제한 */
.calendar-wrapper {
  max-height: calc(100vh - 0px); /* 헤더나 다른 요소 높이 감안하여 조정 */
  overflow-y: auto;
}
</style>

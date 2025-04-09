<script setup>
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko'

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
    today: 'today',
  },
  titleFormat: {
    year: '2-digit',
    month: '2-digit',
  },

  // 🟡 날짜 칸에 '일' 제거
  dayCellContent: function (arg) {
    return arg.date.getDate().toString()
  },

  events: [],
})
</script>

<template>
  <div class="calendar-wrapper">
    <h2>📅 달력</h2>

    <!-- ✅ 요약 박스 -->
    <div class="summary-box">
      <div class="summary-item">
        전체<br />
        <span class="amount">0 원</span>
      </div>
      <div class="summary-item income">
        수입<br />
        <span class="amount">0 원</span>
      </div>
      <div class="summary-item expense">
        지출<br />
        <span class="amount">0 원</span>
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

/* 👉 헤더를 좌-중-우로 배치 */
.fc-header-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

/* 👉 오른쪽 상단에 title 포함 순서대로 배치됨 */
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

/* 👉 가운데 날짜 스타일 (예: 25.04) */
.fc .fc-toolbar-title {
  font-size: 20px;
  font-weight: 00;
  color: #333;
}

/* 버튼 공통 스타일 */
.fc-button {
  padding: 5px 10px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* 버튼 hover 효과 */
.fc-button:hover {
  filter: brightness(0.8);
}

/* 비활성화된 버튼 스타일 */
.fc-button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

/* 이벤트 텍스트 스타일 */
.fc .fc-event-title {
  font-size: 18px !important;
  color: #1976d2;
  font-weight: bold;
  white-space: normal;
  word-break: break-word;
  padding: 2px 4px;
  border-radius: 4px;
}

/* 날짜 숫자 스타일 */
.fc .fc-daygrid-day-number {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

/* 이전/다음 달 날짜 음영 처리 */
.fc-day-other {
  background-color: #ebebeb;
  color: #a8a8a8;
}

/* 시계 및 이벤트 점 제거 */
.fc-event-time,
.fc-daygrid-event-dot {
  display: none;
}
/* 요약 박스 스타일 */
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
</style>

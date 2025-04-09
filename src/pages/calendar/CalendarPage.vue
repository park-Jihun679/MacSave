<script setup>
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
// 캘린더 옵션을 ref로 선언
const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: true, //주말까지 나오도록 설정
  events: [{ title: '+200,000', start: new Date() }],
})
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>
<style>
/* 이벤트 텍스트 스타일 */
.fc .fc-event-title {
  font-size: 18px !important;
  color: #1976d2;
  font-weight: bold;
  white-space: normal; /* 줄바꿈 허용 */
  word-break: break-word; /* 단어 기준 줄바꿈 */
  padding: 2px 4px;
  border-radius: 4px;
}
/* 날짜 숫자 스타일 */
.fc .fc-daygrid-day-number {
  font-size: 18px;
  color: #333;
  font-weight: 500;
}
/* 이전/다음 달 날짜 음영 처리 */
.fc-day-other {
  background-color: #ebebeb;
  color: #a8a8a8;
}
/* 기존에 나와있던 시계 삭제 */
.fc-event-time {
  display: none;
}
.fc-daygrid-event-dot {
  display: none;
}
</style>

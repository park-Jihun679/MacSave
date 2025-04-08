import { createRouter, createWebHistory } from 'vue-router'
import HistoryPage from '@/pages/history/HistoryPage.vue'
import CalendarPage from '@/pages/calendar/CalendarPage.vue'
import StatsPage from '@/pages/stats/StatsPage.vue'
import SettingsPage from '@/pages/settings/SettingsPage.vue'
import LockPage from '@/pages/lock/LockPage.vue'

const routes = [
  { path: '/', redirect: '/history' }, // 기본 루트는 내역으로
  { path: '/history', component: HistoryPage },
  { path: '/calendar', component: CalendarPage },
  { path: '/stats', component: StatsPage },
  { path: '/settings', component: SettingsPage },
  { path: '/lock', component: LockPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

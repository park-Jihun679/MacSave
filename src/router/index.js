import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStores'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import NoLayout from '@/layouts/NoLayout.vue'

import HistoryPage from '@/pages/history/HistoryPage.vue'
import CalendarPage from '@/pages/calendar/CalendarPage.vue'
import StatsPage from '@/pages/stats/StatsPage.vue'
import SettingsPage from '@/pages/settings/SettingsPage.vue'
import LockPage from '@/pages/lock/LockPage.vue'

const routes = [
  {
    // 처음에는 무조건 lock으로
    path: '/',
    redirect: '/lock',
  },
  {
    // 기본 주소 - 헤더와 네비바가 있는 페이지들
    path: '/',
    component: DefaultLayout,
    children: [
      { path: 'history', component: HistoryPage },
      { path: 'calendar', component: CalendarPage },
      { path: 'stats', component: StatsPage },
      { path: 'settings', component: SettingsPage },
    ],
  },
  {
    // 헤더와 네비바가 없는 lock 페이지
    path: '/lock',
    component: NoLayout,
    children: [{ path: '', component: LockPage }],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  // await authStore.initAuth() //새로고침 시 local 로그인 상태
  authStore.initAuth()
  const isLogin = authStore.isLogin

  if (to.path !== '/lock' && !isLogin) {
    next('/lock')
  } else if (to.path === '/lock' && isLogin) {
    next('/history')
  } else {
    next() // ✅ 꼭 필요함!
  }
})
export default router

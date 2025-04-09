import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
  }),
  actions: {
    login() {
      this.isLogin = true
      sessionStorage.setItem('authToken', 'true')
    },

    initAuth() {
      const token = sessionStorage.getItem('authToken')
      this.isLogin = token === 'true'
    },
  },
})

import { defineStore } from 'pinia'

export const useBurgerModeStore = defineStore('burgerMode', {
  state: () => ({
    isBurgerMode: false,
    burgerPrice: 5500,
  }),
  getters: {
    burgerFormat: state => amount => {
      const count = Math.floor(amount / state.burgerPrice)
      if (count === 0) return '0'
      if (count <= 5) return '🍔'.repeat(count)
      return `${count.toLocaleString()} x 🍔`
    },
  },
  actions: {
    toggleMode() {
      this.isBurgerMode = !this.isBurgerMode
    },
  },
})

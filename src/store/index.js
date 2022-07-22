import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: ()=> {
    return {
      count: 0,
      theme: ''
    }
  },
  getters: {
    getCount: (state) => {
      return state.count + 1
    },
    getTheme: (state) => {
      
    }
  },
  actions: {
    setCount(count){
      this.count = count
    }
  }
})
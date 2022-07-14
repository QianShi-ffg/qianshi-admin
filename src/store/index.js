import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: ()=> {
    return {
      count: 0
    }
  },
  getters: {
    getCount: (state)=> {
      return state.count + 1
    }
  },
  actions: {
    setCount(count){
      this.count = count
    }
  }
})
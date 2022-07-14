import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../components/HelloWorld.vue')
  }
]


// const router = 
export default createRouter({
  history: createWebHashHistory(),
  routes
})

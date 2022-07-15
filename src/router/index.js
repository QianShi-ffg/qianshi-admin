import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/admin/index.vue')
  },
  {
    name: 'admin',
    path: '/admin',
    redirect: '/'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]


// const router = 
export default createRouter({
  history: createWebHashHistory(),
  routes
})

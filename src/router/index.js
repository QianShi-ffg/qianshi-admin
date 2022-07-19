import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/admin/index.vue'),
    children: [
      {
        name: 'admin',
        path: '/admin',
        redirect: '/'
      },
      {
        name: 'creative',
        path: '/creative',
        component: () => import('@/views/admin/creative/index.vue')
      },
      {
        name: 'settings',
        path: '/settings',
        component: () => import('@/views/admin/settings/index.vue')
      }
    ]
  },
  {
    name: 'article',
    path: '/article',
    component: () => import('@/views/admin/creative/modules/articleOption.vue')
  },
  // {
  //   name: 'editArticle',
  //   path: '/editArticle/:id',
  //   component: () => import('@/views/admin/creative/modules/articleOption.vue')
  // },
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

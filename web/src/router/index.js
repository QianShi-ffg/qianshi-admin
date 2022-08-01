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
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue')
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



const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  // 跳转路由中断请求
  window._axiosPromiseArr.forEach((el, index) => {
    el.cancel() // 路由跳转之前，中止请求
    //  重置 window._axiosPromiseArr
    delete window._axiosPromiseArr[index]
  })
  if(to.name === 'login') {
    sessionStorage.clear()
    next()
  } else {
    if(!sessionStorage.getItem('user') && to.name !== 'login') {
      next({ name: 'login' })
    } else {
      next()
    }
  }
})

export default router


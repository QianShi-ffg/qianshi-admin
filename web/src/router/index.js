import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/admin',
    component: () => import('@/views/index.vue'),
    redirect: '/',
    children: [
      {
        name: '/',
        path: '/',
        component: () => import('@/views/overview/index.vue')
      },
      {
        name: 'creative',
        path: '/creative',
        component: () => import('@/views/creative/index.vue')
      },
      {
        name: 'classifySetting',
        path: '/classifySetting',
        component: () => import('@/components/classifySetting.vue')
      },
      {
        name: 'tagsSetting',
        path: '/tagsSetting',
        component: () => import('@/components/tagsSetting.vue')
      },
      {
        name: 'friendsLinkSetting',
        path: '/friendsLinkSetting',
        component: () => import('@/components/friendsLinks.vue')
      },
      {
        name: 'userInfo',
        path: '/userInfo',
        component: () => import('@/components/userInfo.vue')
      },
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
    component: () => import('@/views/creative/components/articleOption.vue')
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
    if(sessionStorage.getItem('access_token')) {
      next({ name: '/' })
    } else {
      sessionStorage.clear()
      next()
    }
  } else {
    if(!sessionStorage.getItem('access_token') && to.name !== 'login') {
      next({ name: 'login' })
    } else {
      next()
    }
  }
})

export default router


import Vue from 'vue'
import VueRouter from 'vue-router'
import login1 from '../views/login/index.vue'
import home1 from '../views/home/index.vue'
import reg1 from '../views/reg/index.vue'
import shouye1 from '../views/home/shouye'
import fb1 from '../views/home/contentset/fb'
import nr1 from '../views/home/contentset/nr'
import sc1 from '../views/home/contentset/sc'
import user1 from '../views/home/usersetting'
import xg1 from '../views/home/contentset/xg'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)
// 用elementUI点击同一路由会报错，使用下面代码块------------------------------------------------------------
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// ---------------------------------------------------------------------------------------------

const routes = [
  {
    path: '/',
    name: 'login',
    component: login1
  },
  {
    path: '/home',
    name: 'home',
    component: home1,
    redirect: '/shouye',
    children: [
      {
        path: '/shouye',
        name: 'shouye',
        component: shouye1
      },
      {
        path: '/fb',
        name: 'fb',
        component: fb1
      },
      {
        path: '/xg/:cid',
        name: 'xg',
        component: xg1
      },
      {
        path: '/nr',
        name: 'nr',
        component: nr1
      },
      {
        path: '/sc',
        name: 'sc',
        component: sc1
      },
      {
        path: '/user',
        name: 'user',
        component: user1
      }
    ]
  },
  {
    path: '/reg',
    name: 'reg',
    component: reg1
  }
]

const router = new VueRouter({
// mode:'history',
// base:process.env.ROUTER_BASE,
  routes
})
router.beforeEach((to, from, next) => {
  nprogress.start()
  let taken = window.sessionStorage.getItem('userinfo')
  if (taken === null && to.path !== '/') {
    next('/')
  }
  next()
})
router.afterEach((to, from) => {
  nprogress.done()
})
export default router

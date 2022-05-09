import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/base.css'
import '../src/utils/ax'
import './utils/element'
// import ElementUI from 'element-ui'

// 引入axios

import VueParticles from 'vue-particles'
// Vue.use(ElementUI)
Vue.use(VueParticles)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

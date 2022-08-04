import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import './assets/style/index.scss'
import '@/utils/theme'

// 请求列表
window._axiosPromiseArr = []
// 声明vue实例
const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus, { size: 'default', zIndex: 3000 })
app.mount('#app')

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/style/index.scss'
import '@/utils/theme'
// 声明vue实例
const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus, { size: 'default', zIndex: 3000 })
app.mount('#app')

import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import JSONbig from 'json-bigint'
// 公共根地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

axios.interceptors.request.use(
  config => {
    // console.log(config)
    let a = window.sessionStorage.getItem('userinfo')
    if (a) {
    // 将token转为对象
      let token = JSON.parse(a).token
      // 给axios请求头配置token
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  config => {
    // console.log(config)
    return config
  },
  error => {
    console.log(error)
    if (error.response.status === 401) {
      // 当返回401时，强制用户登录
      // this.$router.push('/') 这种方式只能在组件中应用，在js文件中会无法使用
      router.push('/')
    }

    return Promise.reject(error)
  }
)
// 原生数据转换器
axios.defaults.transformResponse = function (data) {
  if (data) {
    // console.log(data)
    // console.log(JSONbig.parse(data).data.results[0].id)
    return JSONbig.parse(data)
  } else {
    return data
  }
}

Vue.prototype.$http = axios

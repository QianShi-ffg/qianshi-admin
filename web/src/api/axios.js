import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus'
// import 'element-ui/lib/theme-chalk/index.css';
import { useRouter } from 'vue-router'
const router = useRouter()
// 当前请求列表

axios.defaults.baseURL = import.meta.env.VITE_BASEURL;
// console.log(import.meta.env.VITE_BASEURL, import.meta.env.development, 66666666666666666)
// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = 'api';
// } else if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = 'https://xxxxxxxxxx/index/';
// }


//请求拦截器 区分了一下正常请求时与发送formdata时的请求头
axios.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['token'] = 'token66666666666666'
  // 每个请求都会 加入 
  config.cancelToken = new axios.CancelToken(cancel => {
    window._axiosPromiseArr.push({ cancel })
  })
  // if (config.method === 'post') {
  //   //FormData时的请求头
  //   if (Object.prototype.toString.call(config.data) === '[object FormData]') {
  //     // 请求拦截器处理
  //     config.headers['Content-Type'] = 'multipart/form-data';
  //   } else if (Object.prototype.toString.call(config.data) === '[object String]') {
  //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  //   }
  // } else {
  //   config.headers['Content-Type'] = 'application/json';
  // }
  return config;
});

//响应拦截器
axios.interceptors.response.use(
  (config) => {
    console.log(config)
    let value = config.data;
    if (config.status && config.status === 200) {
      if (typeof value === 'string') {
        if (value === 'timeout') {
          ElMessageBox.confirm('太长时间没有操作或操作没有权限，请进入登录页面重新登录?', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            router.push({ name: 'login' });
          });
        }else {
          ElMessage({
            type: 'info',
            message: value,
          })
        }
      }
    }
    return config;
  },
  (err) => {
    let value = err.response.statusText;
    switch (err.response.status) {
      case 400:
        ElementUI.Message.error('语法格式有误，服务器无法理解此请求')
        break;
      case 401:
      case 403:
      case 404:
      case 405:
        ElMessage({ message: value, type: 'warning' })
        break;
      default:
        ElMessage({ message: '操作过程出错，此次操作无效！'+ value, type: 'error' })
        break;
    }
    return err.response
  }
)

export async function axiosGet(url, params = {}) {
  let res = await axios.get(url, { params: params });
  if(res.status === 200){
    return res.data
  }else {
    throw res.statusText
  }
}

export async function axiosPost(url, params = {}) {
  let res = await axios.post(url, params);
  if(res.status === 200 || res.status === 201){
    return res.data
  }else {
    throw res.statusText
  }
}

export async function axiosDelete(url, params = {}) {
  let res = await axios.delete(url, { data: params });
  if(res.status === 200){
    return res.data
  }else {
    throw res.statusText
  }
}

export async function axiosPut(url, params = {}) {
  let res = await axios.put(url, params);
  if(res.status === 200){
    return res.data
  }else {
    throw res.statusText
  }
}
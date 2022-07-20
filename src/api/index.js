import { axiosGet,axiosPost } from './axios'

export default {
  getLogin:(params = {}) => {
    return axiosPost('/login', params)
  },
  getArticleList:(params = {}) => {
    return axiosGet('/articleList', params)
  }
}
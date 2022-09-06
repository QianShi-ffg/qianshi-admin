import { axiosGet, axiosPost, axiosDelete, axiosPut } from './axios'

export default {
  getLogin:(params = {}) => {
    return axiosPost('/login', params)
  },
  getArticleList:(params = {}) => {
    return axiosGet('/articleList', params)
  },
  uploadImg:(params = {}) => {
    return axiosPost('/uploadImg', params)
  },
  saveDraft:(params = {}) => {
    return axiosPost('/saveDraft', params)
  },
  deleteArticle:(params = {}) => {
    return axiosDelete('/deleteArticle/', params)
  },
  publish:(params = {}) => {
    return axiosPut('/publish', params)
  },
  signUp:(params = {}) => {
    return axiosPost('/signUp', params)
  },
  login:(params = {}) => {
    return axiosPost('/login', params)
  },
  getClassifyList:(params = {}) => {
    return axiosGet('/classifyList', params)
  },
  saveClassify:(params = {}) => {
    return axiosPost('/saveClassify', params)
  },
  overview:(params = {}) => {
    return axiosGet('/overview', params)
  },
  refreshToken:(params = {}) => {
    return axiosGet('/refreshToken', params)
  }
}
import { axiosGet, axiosPost, axiosDelete, axiosPut, axiosPatch } from './axios'

export default {
  // 登录
  getLogin:(params = {}) => {
    return axiosPost('/user/login', params)
  },
  // 获取文章列表
  getArticleList:(params = {}) => {
    return axiosGet('/article', params)
  },
  // 获取文章详情
  getArticleDetail:(params = {}) => {
    return axiosGet(`/article/${params.id}`)
  },
  // 文章保存
  saveDraft:(params = {}) => {
    return axiosPost('/article/saveDraft', params)
  },
  // 文章更新
  articleUpdate:(params = {}) => {
    return axiosPatch('/article/update', params)
  },
  // 文章删除
  deleteArticle:(params = {}) => {
    return axiosDelete('/article/delete', params)
  },
  // 文章状态更新
  publish:(params = {}) => {
    return axiosPatch('/article/publish', params)
  },
  // 编辑器上传图片
  uploadImg:(params = {}) => {
    return axiosPost('/uploadImg', params)
  },
  signUp:(params = {}) => {
    return axiosPost('/user/signUp', params)
  },
  login:(params = {}) => {
    return axiosPost('/user/login', params)
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
  },
  getClassifyList:(params = {}) => {
    return axiosGet('/classify/classifyList', params)
  }
}
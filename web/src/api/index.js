import { axiosGet, axiosPost, axiosDelete, axiosPut, axiosPatch } from './axios'

export default {
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
  // 编辑器上传图片------------------
  uploadImg:(params = {}) => {
    return axiosPost('/uploadImg', params)
  },
  // 注册
  signUp:(params = {}) => {
    return axiosPost('/user/signUp', params)
  },
  // 登录
  login:(params = {}) => {
    return axiosPost('/user/login', params)
  },
  getClassifyList:(params = {}) => {
    return axiosGet('/classify/classifyList', params)
  },
  saveClassify:(params = {}) => {
    return axiosPost('/saveClassify', params)
  },
  // 百度统计
  overview:(params = {}) => {
    return axiosGet('/overview', params)
  },
  // 刷新token
  refreshToken:(params = {}) => {
    return axiosGet('/refreshToken', params)
  },
  // 饼图数据
  articleClassifyCount:(params = {}) => {
    return axiosGet('/article/articleClassifyCount', params)
  },
}
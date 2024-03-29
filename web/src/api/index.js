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
    console.log(params, 666666666)
    return axiosPost('/upload', params)
  },
  // 注册
  signUp:(params = {}) => {
    return axiosPost('/user/signUp', params)
  },
  // 登录
  login:(params = {}) => {
    return axiosPost('/auth/login', params)
  },
  // 获取分类
  getClassifyList:(params = {}) => {
    return axiosGet('/classify', params)
  },
  // 添加分类
  saveClassify:(params = {}) => {
    return axiosPost('/classify/saveClassify', params)
  },
  // 删除分类
  deleteClassify:(params = {}) => {
    return axiosDelete('/classify/delete', params)
  },
  // 更新分类
  updateClassify:(params = {}) => {
    return axiosPatch(`/classify/${params.id}`, params)
  },
  // 获取友链
  getFriendShipList:(params = {}) => {
    return axiosGet('/friendShip', params)
  },
  // 添加友链
  saveFriendShip:(params = {}) => {
    return axiosPost('/friendShip/saveFriendShip', params)
  },
  // 删除友链
  deleteFriendShip:(params = {}) => {
    return axiosDelete('/friendShip/delete', params)
  },
  // 更新友链
  upDateFriendShip:(params = {}) => {
    return axiosPatch(`/friendShip/${params.id}`, params)
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
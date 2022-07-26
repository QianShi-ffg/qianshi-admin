<template>
  <header id="articleHeader">
    <el-button :icon="ArrowLeft" link @click="()=>{router.push({path:'/creative'})}">返回</el-button>
    <el-input placeholder="请输入文章标题" class="articleTitle" v-model="titleValue"></el-input>
    <div>
      <el-button @click="save">保存草稿</el-button>
      <el-button type="success">发布</el-button>
    </div>
  </header>
  <md-editor v-model="text" @onHtmlChanged="saveHtml"  @onSave="codeSave" :onUploadImg="uploadImg" :theme="theme"/>
</template>

<script setup>
import { ref, reactive, onMounted  } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import api from '@/api/index.js'


const router = useRouter()
const route = useRoute()
const text = ref('')
const titleValue = ref('')
const theme = ref('light')
const articleData = reactive({
  title: '',
  articleContent: '',
  articleStatus: 0
})

let saveIcon = null

// 判断当前是编辑还是新建
if(route.query.id){
  try {
    const res = await api.getArticleList({id: route.query.id})
    if (res.code === 200) {
      console.log(res)
      titleValue.value = res.data[0].title
      text.value = res.data[0].articleContent
    } else {
      throw res.msg
    }
  } catch (error) {
    console.log(error)
  } finally {
    // 预留loading处理
  }
  // text.value = sessionStorage.getItem('md')
}

const saveHtml = (e) => {
  console.log(e)
}

const save = () => {
  saveIcon[0].click()
}
onMounted(() => {
  const icon = document.getElementsByClassName('md-toolbar-item')
  saveIcon = Array.from(icon).filter(item => {
    return item.title === '保存'
  })
})


const codeSave = async(e) => {
  const res = await api.saveDraft({
    id: route.query.id || null,
    title: titleValue.value,
    articleContent: e,
    articleStatus: 0
  })
  if (res.code === 200) {
    ElMessage({ message: '已保存草稿箱',type: 'success' })
  } else {
    ElMessage({ message: '系统错误请稍后再试',type: 'error' })
  }
}

const uploadImg = async(files, callback) => {
  const fromData = new FormData();
  for(let i = 0; i < files.length; i++){
    fromData.append('file', files[i]);
    // fromData.append(files[i].name, files[i]);
  }
  const res = await api.uploadImg(fromData)


  console.log(import.meta.env.VITE_SERVER)
  callback(res.data.map((item) => `${import.meta.env.VITE_SERVER}${item.path}`))
}
</script>

<style lang='scss' scoped>
#md-editor-v3 {
  height: calc(100vh - 60px);
}
#articleHeader {
  position: relative;
  padding: 0 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .articleTitle {
    width: 60%;
  }
}
</style>

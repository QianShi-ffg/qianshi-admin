<template>
  <header id="articleHeader">
    <el-button :icon="ArrowLeft" link @click="()=>{router.push({path:'/creative'})}">返回</el-button>
    <div>
      <el-button>保存</el-button>
      <el-button type="success">发布</el-button>
    </div>
  </header>
  <md-editor v-model="text" @onHtmlChanged="saveHtml"  @onSave="codeSave"/>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const router = useRouter()
const text = ref('')
if(sessionStorage.getItem('md')){
  text.value = sessionStorage.getItem('md')
}
const saveHtml = (e)=> {
  console.log(e)
}

const codeSave = (e)=> {
  console.log(e)
  sessionStorage.setItem('md', e )
  ElMessage({ message: '已保存草稿箱',type: 'success' })
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
}
</style>

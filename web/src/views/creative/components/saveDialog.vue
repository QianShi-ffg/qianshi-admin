<template>
  <div id="saveDialog">
    <el-dialog v-model="dialogVisible" title="文章信息" width="400px" :destroy-on-close="true">
      <el-form :model="form" label-width="120px" :label-position="'top'" ref="formRef" :rules="rules" hide-required-asterisk>
        <el-form-item label="文章分类" prop="classifyId">
          <el-select v-model="form.classifyId" placeholder="请选择文章分类" :teleported="false">
            <el-option v-for="item in classifyList" :label="item.name" :value="item.id" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="文章封面">
          <el-input v-model="form.coverUrl" placeholder="请输入文章封面链接"/>
        </el-form-item>
        <el-form-item label="文章详情" prop="describe">
          <el-input v-model="form.describe" type="textarea" :rows="5"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogSave(formRef)">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted  } from 'vue'
import { ElMessage } from 'element-plus'
import api from '@/api/index.js'

const props = defineProps({
  artDesc: {
    type: Object,
    default: {}
  }
})
const emits = defineEmits(['success'])
const dialogVisible = ref(false)
const classifyList = ref([])
const formRef = ref()
// const form = ref({})
const form = reactive({
  classifyId: '',
  describe: '',
  coverUrl: ''
})
const rules = reactive({
  classifyId: [
    { required: true, message: '请选择文章分类', trigger: 'change' }
  ],
  describe: [
    { required: false, message: '请选择文章分类', trigger: 'change' }
  ]
})

onMounted(() => {
  console.log(props.artDesc)
  form.classifyId = props.artDesc.classifyId
  form.describe = props.artDesc.describe
  form.coverUrl = props.artDesc.coverUrl
})

const show = () => {
  dialogVisible.value = true
}

const init = async() => {
  const res = await api.getClassifyList({})
  if (res.code === 200) {
    classifyList.value = res.data
  } else {
    ElMessage({ message: res.message,type: 'error' })
  }
}
init()

const dialogSave = async(formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(form, 12222)
      emits('success', form)
      dialogVisible.value = false
    }
  })
}

defineExpose({
  show
})
</script>

<style lang="scss" scoped>
#saveDialog {
  .el-form {
    // padding: 0 20px;
    .el-form-item {
      .el-select {
        width: 100%;
      }
    }
  }
}

</style>
<template>
  <div id="classifyDialog">
    <el-dialog v-model="dialogVisible" title="新增分类" width="400px" :destroy-on-close="true">
      <el-form :model="form" label-width="120px" :label-position="'top'" ref="formRef" :rules="rules" hide-required-asterisk>
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入分类名称"/>
        </el-form-item>
        <el-form-item label="分类介绍" prop="describe">
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
  classDesc: {
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
  name: '',
  describe: ''
})
const rules = reactive({
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' }
  ],
  describe: [
    { required: false, message: '请输入分类介绍', trigger: 'blur' }
  ]
})

onMounted(() => {
  form.name = props.classDesc.name
  form.describe = props.classDesc.describe
})

const show = () => {
  dialogVisible.value = true
}

const dialogSave = async(formEl) => {
  if (!formEl) return
  await formEl.validate(async(valid, fields) => {
    if (valid) {
      console.log(form, 89999)
      const res = await api.saveClassify(form)
      if (res.code === 200) {
        emits('success')
        dialogVisible.value = false
      } else {
        ElMessage({ message: res.msg,type: 'error' })
      }
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
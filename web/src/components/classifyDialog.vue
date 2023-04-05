<template>
  <div id="classifyDialog" v-if="dialogVisible">
    <el-dialog v-model="dialogVisible" title="新增分类" width="400px" :destroy-on-close="true" :append-to-body="true" :close-on-click-modal="false">
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
    default: {
      id: null,
      name: '',
      describe: ''
    }
  }
})
const emits = defineEmits(['success'])
const dialogVisible = ref(false)
const classifyList = ref([])
const formRef = ref()
const currentType = ref('')
const form = reactive({
  id: null,
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

const show = (value) => {
  currentType.value = value
  form.id = props.classDesc.id
  form.name = props.classDesc.name
  form.describe = props.classDesc.describe
  dialogVisible.value = true
}

const dialogSave = async(formEl) => {
  if (!formEl) return
  await formEl.validate(async(valid, fields) => {
    if (valid) {
      console.log(form, 89999)
      let res = null
      if (currentType.value === 'edit') {
        res = await api.updateClassify(form)
      } else {
        res = await api.saveClassify(form)
      }
      if (res.code === 200) {
        emits('success')
        ElMessage({ message: currentType.value === 'edit' ? '更新成功' : '添加成功', type: 'success' })
      } else {
        console.log(663212123)
        ElMessage({ message: '系统出错,请稍后再试', type: 'error' })
      }
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
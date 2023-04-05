<template>
  <div id="classifyDialog" v-if="dialogVisible">
    <el-dialog v-model="dialogVisible" title="新增友链" width="400px" :destroy-on-close="true" :append-to-body="true" :close-on-click-modal="false">
      <el-form :model="form" label-width="120px" :label-position="'top'" ref="formRef" :rules="rules" hide-required-asterisk>
        <el-form-item label="作者名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入作者名称"/>
        </el-form-item>
        <el-form-item label="头像链接" prop="icon">
          <el-input v-model="form.icon" placeholder="请输入头像链接"/>
        </el-form-item>
        <el-form-item label="博客地址" prop="blogUrl">
          <el-input v-model="form.blogUrl" placeholder="请输入博客地址"/>
        </el-form-item>
        <el-form-item label="介绍" prop="desc">
          <el-input v-model="form.desc" type="textarea" :rows="5"/>
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
  friendShipDesc: {
    type: Object,
    default: {
      id: null,
      name: '',
      icon: '',
      blogUrl: '',
      desc: '',
    }
  }
})
const emits = defineEmits(['success'])
const dialogVisible = ref(false)
const classifyList = ref([])
const currentType = ref('')
const formRef = ref()
// const form = ref({})
const form = reactive({
  id: null,
  name: '',
  icon: '',
  blogUrl: '',
  desc: '',
})
const rules = reactive({
  name: [
    { required: true, message: '请输入作者名称', trigger: 'blur' }
  ],
  icon: [
    { required: true, message: '请输入头像链接', trigger: 'blur' }
  ],
  blogUrl: [
    { required: true, message: '请输入博客地址', trigger: 'blur' }
  ]
})

const show = (value) => {
  currentType.value = value
  form.id = props.friendShipDesc.id
  form.name = props.friendShipDesc.name
  form.icon = props.friendShipDesc.icon
  form.blogUrl = props.friendShipDesc.blogUrl
  form.desc = props.friendShipDesc.desc
  dialogVisible.value = true
}

const dialogSave = async(formEl) => {
  if (!formEl) return
  await formEl.validate(async(valid, fields) => {
    if (valid) {
      console.log(form, 89999)
      let res = null
      if (currentType.value === 'edit') {
        res = await api.upDateFriendShip(form)
      } else {
        res = await api.saveFriendShip(form)
      }
      if (res.code === 200) {
        emits('success')
        ElMessage({ message: currentType.value === 'edit' ? '更新成功' : '添加成果', type: 'success' })
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
<template>
  <div id="logout" @click="open">
    <img src="@/assets/admin/log-out.svg" alt="">
    <div class="logoutContent">
      退出登录
    </div>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const open = () => {
  ElMessageBox.confirm(
    '确定要退出登录吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      sessionStorage.removeItem('access_token')
      router.push('/login')
      ElMessage({
        type: 'success',
        message: '成功退出登录',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '退出登录已取消',
      })
    })
}
</script>

<style lang="scss" scoped>
#logout {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 60px;
  background: var(--div-bgColor);
  padding: 0 43px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  opacity: 0.6;
  .logoutContent {
    padding-left: 30px;
    color: #000;
    line-height: 1px;
  }
  img {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 20px;
  }
  &:hover {
    opacity: 0.9;
    .el-icon {
      color: #4968db;
    }
    .logoutContent {
      color: #4968db;
    }
  }
}
</style>
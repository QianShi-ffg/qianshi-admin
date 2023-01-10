<template>
  <div id="settings">
    <el-tabs :tab-position="'left'" style="height: 100%" class="demo-tabs">
      <el-tab-pane label="分类设置">
        <classifySetting/>
      </el-tab-pane>
      <el-tab-pane label="标签设置">标签设置</el-tab-pane>
      <el-tab-pane label="友链设置">标签设置</el-tab-pane>
      <el-tab-pane label="个人信息">个人信息</el-tab-pane>
    </el-tabs>
  </div>

</template>

<script setup>
import classifySetting from '@/components/classifySetting.vue'
</script>

<style lang="scss" scoped>
#settings {
  height: 100%;
  :deep(.el-tabs) {
    .el-tabs__content {
      width: auto;
      height: 100%;
      .el-tab-pane {
        padding-left: 20px;
        height: 100%;
      }
    }
  }
}
</style>

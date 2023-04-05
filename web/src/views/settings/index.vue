<template>
  <div id="settings">
    <router-view></router-view>
  </div>

</template>

<script setup>
import classifySetting from '@/components/classifySetting.vue'
import friendsLinks from '@/components/friendsLinks.vue';
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

<template>
  <div id="admin">
    <div class="common-layout">
      <el-container>
        <el-aside width="auto">
          <el-menu
            active-text-color="#ffd04b"
            class="el-menu-vertical-demo"
            :default-active="'admin'"
            text-color="#000"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
            :collapse-transition="true"
            :router="true"
          >
            <el-menu-item :index="'admin'">
              <el-icon><icon-menu /></el-icon>
              <template #title>首页</template>
            </el-menu-item>
            <!-- <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
              </template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
              <el-menu-item index="1-3">item three</el-menu-item>
              <el-sub-menu index="1-4">
                <template #title><span>item four</span></template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu> -->
            <el-menu-item :index="'creative'">
              <el-icon><icon-menu /></el-icon>
              <template #title>创作中心</template>
            </el-menu-item>
            <!-- <el-menu-item index="3" disabled>
              <el-icon><document /></el-icon>
              <template #title>Navigator Three</template>
            </el-menu-item> -->
            <el-menu-item :index="'settings'">
              <el-icon><setting /></el-icon>
              <template #title>设置</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            <el-button
              class="expandIcon"
              @click="putMenu"
              :icon="data.icon"
              link
            >
            </el-button>
          </el-header>
          <el-main>
            <el-card class="box-card">
              <router-view></router-view>
            </el-card>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, markRaw } from "vue";
import {
  Document,
  Menu as IconMenu,
  Expand,
  Fold,
  Location,
  Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(false);
const data = reactive({
  icon: markRaw(Fold),
});
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
const putMenu = () => {
  isCollapse.value = !isCollapse.value;
  if (isCollapse.value) {
    data.icon = markRaw(Expand);
  } else {
    data.icon = markRaw(Fold);
  }
};
</script>

<style lang="scss" scoped>
#admin {
  width: 100%;
  height: 100%;
  .common-layout,
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: var(--el-aside-bgColor);
    .el-menu {
      border: none;
      .el-menu-item {
        user-select: none;
      }
    }
  }
  .el-header {
    position: relative;
    .expandIcon {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    :deep(.expandIcon .el-icon) {
      width: 2em;
      height: 2em;
      & svg {
        width: 2em;
        height: 2em;
      }
    }
  }
  .el-main {
    background-color: var(--el-main-bgColor);
    .el-card {
      height: calc(100% - 5px);
      padding: 30px;
      box-sizing: border-box;
    }
  }
  .el-footer {
    background-color: var(--el-footer-bgColor);
  }
}
</style>

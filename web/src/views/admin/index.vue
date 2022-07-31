<template>
  <div id="admin">
    <div class="common-layout">
      <el-container>
        <el-container>
          <el-aside width="auto">
            <el-card class="menu">
              <el-menu active-text-color="#4968db" class="el-menu-vertical-demo" :default-active="currentMenu"
                text-color="#000" :collapse="isCollapse" @open="handleOpen" @close="handleClose"
                :collapse-transition="true" :router="true">
                <el-menu-item :index="'admin'">
                  <el-icon>
                    <icon-menu />
                  </el-icon>
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
                  <el-icon>
                    <icon-menu />
                  </el-icon>
                  <template #title>创作中心</template>
                </el-menu-item>
                <!-- <el-menu-item index="3" disabled>
              <el-icon><document /></el-icon>
              <template #title>Navigator Three</template>
            </el-menu-item> -->
                <el-menu-item :index="'settings'">
                  <el-icon>
                    <setting />
                  </el-icon>
                  <template #title>设置</template>
                </el-menu-item>
              </el-menu>
            </el-card>
          </el-aside>
          <el-container>
            <el-header>
              <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                <el-breadcrumb-item>promotion management</el-breadcrumb-item>
                <el-breadcrumb-item>promotion list</el-breadcrumb-item>
                <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
              </el-breadcrumb>
              <el-button class="expandIcon" @click="putMenu" :icon="data.icon" link>
              </el-button>
            </el-header>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
        <el-footer>Footer</el-footer>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, markRaw } from "vue";
import { useRoute } from "vue-router";
import {
  Document,
  Menu as IconMenu,
  Expand,
  Fold,
  Location,
  Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(false);
const route = useRoute()
console.log(route.name)
const currentMenu = ref()
if (route.name) {
  currentMenu.value = route.name
} else {
  currentMenu.value = 'admin'
}
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
  height: 100vh;

  .common-layout,
  .el-container {
    height: 100%;
    overflow: hidden;
  }

  .el-aside {
    background-color: var(--el-aside-bgColor);
    padding: 20px 0 20px 20px;

    .menu {
      height: 100%;
      background-color: var(--el-card-bgColor);
    }

    .el-menu {
      border: none;
      // min-height: unset;
      .el-menu-item {
        user-select: none;
      }
    }
  }

  .el-header {
    position: relative;
    height: 40px;
    .el-breadcrumb {
      position: absolute;
      left: 50px;
      bottom: 3px;
    }
    .expandIcon {
      position: absolute;
      bottom: 0;
    }

    :deep(.expandIcon .el-icon) {
      width: 1em;
      height: 1em;

      & svg {
        width: 1em;
        height: 1em;
      }
    }
  }

  .el-main {
    overflow: hidden;
  }

  .el-footer {
    text-align: center;
    background-color: var(--el-footer-bgColor);
  }
}
</style>

<template>
  <div id="admin">
    <div class="common-layout">
      <el-container>
        <el-container>
          <el-aside width="auto">
            <el-card class="aside">
              <img :src="userIcon" alt="" :class="isCollapse ? 'collapseImg' : ''">
              <div class="menu">
                <el-menu active-text-color="#4968db" class="el-menu-vertical-demo" :default-active="currentMenu"
                  text-color="#000" :collapse="isCollapse"
                  :collapse-transition="true" :router="true">
                  <el-menu-item index="/">
                    <el-icon>
                      <House />
                    </el-icon>
                    <template #title>网站概况</template>
                  </el-menu-item>
                  <el-menu-item index="creative">
                    <el-icon>
                      <EditPen />
                    </el-icon>
                    <template #title>创作中心</template>
                  </el-menu-item>
                  <el-sub-menu index="1">
                    <template #title>
                      <el-icon>
                        <setting />
                      </el-icon>
                      <span>设置</span>
                    </template>
                    <el-menu-item index="classifySetting">分类设置</el-menu-item>
                    <el-menu-item index="tagsSetting">标签设置</el-menu-item>
                    <el-menu-item index="friendsLinkSetting">友链设置</el-menu-item>
                    <el-menu-item index="userInfo">个人信息</el-menu-item>
                  </el-sub-menu>
                </el-menu>
              </div>
              <logOut/>
            </el-card>
          </el-aside>
          <el-container>
            <el-header>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.name" :to="{ path: item.path }">{{
                    item.name
                }}</el-breadcrumb-item>
              </el-breadcrumb>
              <el-button class="expandIcon" @click="putMenu" :icon="data.icon" link>
              </el-button>
            </el-header>
            <el-main>
              <el-card id="box-card">
                <router-view />
              </el-card>
            </el-main>
          </el-container>
        </el-container>
        <el-footer>
          Copyright © 千拾 晋ICP备18013488号-1
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, markRaw, watch } from "vue";
import { useRoute } from "vue-router";
import userIcon from '@/assets/userIcon.jpg'
import logOut from "./login/logOut.vue";
import {
  Fold,
  Expand
} from "@element-plus/icons-vue";

const isCollapse = ref(false);
const route = useRoute()
const currentMenu = ref()
let breadcrumbList = ref([])
const data = reactive({
  icon: markRaw(Fold),
});

watch(route, (value, oldVal) => {
  breadcrumb()
})

if (route.name) {
  currentMenu.value = route.name
} else {
  currentMenu.value = '/'
}

const putMenu = () => {
  isCollapse.value = !isCollapse.value;
  if (isCollapse.value) {
    data.icon = markRaw(Expand);
  } else {
    data.icon = markRaw(Fold);
  }
}

const breadcrumb = () => {
  const routeList = route.matched.map(item => {
    item.name = item.path === '/' ? 'home' : item.name
    return item
  })
  routeList[0].name === 'home'
  breadcrumbList.value = routeList
}
breadcrumb()
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

    :deep(.el-card__body) {
      padding: 20px 12px;
    }

    .aside {
      height: 100%;
      background-color: var(--el-card-bgColor);
      text-align: center;
      padding-bottom: 60px;
      overflow: hidden;

      img {
        transition-property: width, border-radius;
        transition-duration: 0.5s;
        width: 110px;
        border-radius: 55px;
        margin-bottom: 10px;
      }

      .collapseImg {
        width: 50px;
        border-radius: 25px;
      }

      .menu {
        padding: 0 8px;
        height: calc(100% - 110px - 10px - 10px);
        overflow-y: overlay;
      }
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

    .el-card {
      position: relative;
      height: 100%;
      padding: 30px;
      box-sizing: border-box;
    }
  }

  .el-footer {
    height: 40px;
    text-align: center;
    background-color: var(--el-footer-bgColor);
    line-height: 30px;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
  }
}
</style>

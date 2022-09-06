<template>
  <div id="overview">
    <div class="todaysFlow">
      <img :src="todaysFlow" alt="">
    </div>
    <div class="statistics">
      <div class="item">
        <div class="selectList"></div>
        <div class="chart">
          <chartVue />
        </div>
      </div>
      <div class="item"></div>
    </div>
  </div>
</template>

<script setup>
import todaysFlow from '@/assets/admin/jrll.png'
import chartVue from '@/components/chart.vue';
import api from '@/api/index.js'
import { ref } from 'vue'

const data = ref({})
// 获取数据
const getOverview = async() => {
  const res = await api.overview()
  if (res.code === 200) {
    console.log(res, 966)
    data.value = res.data
  } else {
    refreshToken()
  }
}
getOverview()
// 刷新token
const refreshToken = async() => {
  const res = await api.refreshToken()
  if (res.code === 200) {
    getOverview()
  }
}
</script>

<style lang="scss" scoped>
#overview {
  height: 100%;
  .todaysFlow {
    margin-bottom: 20px;
    img {
      width: 100%;
      border-radius: 30px;
    }
  }
  .statistics {
    display: flex;
    width: 100%;
    height: calc(100% - 182px - 20px);
    justify-content: space-between;
    align-items: center;
    .item {
      width: 49%;
      height: 100%;
      background: var(--div-bgColor);
      border-radius: 30px;
      .chart {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

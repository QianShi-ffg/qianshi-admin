<template>
  <div id="overview">
    <div class="todaysFlow">
      <div class="todaysFlowItem">
        <img src="@/assets/admin/qingfenketang.svg" alt="" />
        <div>
          <p>近90天总访问量</p>
          <p>
            <span>{{ data.sum }}</span>
            <span>次</span>
          </p>
        </div>
      </div>
      <div class="todaysFlowItem">
        <img src="@/assets/admin/yinliurenwu.svg" alt="" />
        <div>
          <p>昨日访问量</p>
          <p>
            <span>{{ data.yesterdayData }}</span>
            <span>次</span>
          </p>
        </div>
      </div>
      <div class="todaysFlowItem">
        <img src="@/assets/admin/dapanfenxi.svg" alt=""/>
        <div>
          <p>今日访问量</p>
          <p>
            <span>{{ data.todayData }}</span>
            <span>次</span>
          </p>
        </div>
      </div>
      <div class="todaysFlowItem last">
        <img src="@/assets/admin/see.png" alt=""/>
      </div>
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
    dataInit(res.data.items)
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

const dataInit = (value) => {
  const sum = value[1].map(item => {
    if (item[0] !== '--') {
      return item[0]
    }
  }).reduce((a, b) => {
    if (a) {
      if (b) {
        return a + b
      } else {
        return a + 0
      }
    } else {
      if (b) {
        return 0 + b
      } else {
        return 0
      }
    }
  })
  data.value = {
    todayData: value[1][value[1].length - 1][0],
    yesterdayData: value[1][value[1].length - 2][0],
    sum: sum
  }
}
</script>

<style lang="scss" scoped>
#overview {
  height: 100%;
  .todaysFlow {
    margin-bottom: 20px;
    height: 200px;
    background: var(--div-bgColor);
    border-radius: 30px;
    display: flex;
    align-items: center;
    padding-left: 50px;
    .todaysFlowItem {
      display: flex;
      justify-content: start;
      align-items: center;
      width: 240px;
      height: 80%;
      margin-right: 120px;
      padding-left: 20px;
      img {
        width: 50px;
        margin-right: 20px;
      }
      p:last-child {
        margin-top: 10px;
        span:first-child {
          font-size: 20px;
          font-weight: 700;
          margin-right: 5px;
        }
        span:last-child {
          font-size: 12px;
        }
      }
      &.last {
        img {
          width: 95%;
          height: 110%;
        }
      }
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

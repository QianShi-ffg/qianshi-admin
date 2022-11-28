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
        <div class="chart">
          <chartLine :chartLineData="chartLineData" ref="chart1"/>
        </div>
      </div>
      <div class="item">
        <div class="chart">
          <chartPie :chartPieData="chartPieData" ref="chart2"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import todaysFlow from '@/assets/admin/jrll.png'
import chartLine from '@/components/chartLine.vue';
import chartPie from '@/components/chartPie.vue'
import api from '@/api/index.js'
import { onMounted, ref } from 'vue'

const data = ref({})
const chartLineData = ref({})
const chartPieData = ref({})
const chart1 = ref(null)
const chart2 = ref(null)

onMounted(()=> {
  getOverview()
  articleClassifyCount()
  window.onresize = () => {
    chart1.value.refresh()
    chart2.value.refresh()
  }
})
// 获取数据
const getOverview = async() => {
  const res = await api.overview()
  if (res.code === 200) {
    console.log(res, 966)
    data.value = res.data
    chartDataInit(res.data.items)
    dataInit(res.data.items)
  } else {
    refreshToken()
  }
}
// 刷新token
const refreshToken = async() => {
  const res = await api.refreshToken()
  if (res.code === 200) {
    getOverview()
  }
}

const articleClassifyCount = async() => {
  const res = await api.articleClassifyCount()
  if (res.code === 200) {
    console.log(res)
    chartPieData.value = {
      data: res.data.rows,
      total: res.data.total
    }
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

const chartDataInit = (value) => {
  const arr = value[0].slice(value[0].length -7, value[0].length).flat(Infinity)
  let arr1 = []
  let arr2 = []
  value[1].slice(-7).map(item => {
    arr1.push(item[0])
    arr2.push(item[1])
  })
  chartLineData.value = {
    x: arr,
    y1: arr1,
    y2: arr2
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

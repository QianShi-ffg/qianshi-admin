<template>
  <div id="chart"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts';

onMounted(() => {
  init()
})
const init = () => {
  const chartDom = document.getElementById('chart');
  const myChart = echarts.init(chartDom);
  let option;

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }
  option && myChart.setOption(option);
  window.onresize = myChart.resize
}


</script>

<style lang="scss" scoped>
#chart {
  width: 100%;
  height: 100%;
}
</style>
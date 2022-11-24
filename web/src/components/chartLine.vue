<template>
  <div id="chartLine"></div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts';

const props = defineProps({
  chartLineData: Object
})

const thisChart = ref({})

watch(() => props.chartLineData, (newVal, oldVal) => {
  console.log(newVal, 2233)
  if (newVal !== oldVal) {
    init()
  }
})

onMounted(() => {
  init()
})

const init = () => {
  const chartDom = document.getElementById('chartLine');
  const myChart = echarts.init(chartDom);
  thisChart.value = myChart
  let option = {}
  option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['PV', 'UV', '']
    },
    grid: {
      left: '3%',
      right: '5%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.chartLineData.x
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'PV',
        type: 'line',
        stack: 'Total',
        data: props.chartLineData.y1
      },
      {
        name: 'UV',
        type: 'line',
        stack: 'Total',
        data: props.chartLineData.y2
      }
    ]
  };
  option && myChart.setOption(option);
}

const refresh = () => {
  thisChart.value.resize()
}

defineExpose({
  refresh
})

</script>

<style lang="scss" scoped>
#chartLine {
  width: 100%;
  height: 100%;
  padding: 15px;
}
</style>
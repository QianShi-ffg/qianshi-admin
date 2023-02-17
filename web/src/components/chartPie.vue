<template>
  <div id="chartPie"></div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  chartPieData: Object,
});
const thisChart = ref({})


watch(
  () => props.chartPieData,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      init();
    }
  }
);

onMounted(() => {
  init();
});

const init = () => {
  const chartDom = document.getElementById("chartPie");
  const myChart = echarts.init(chartDom);
  thisChart.value = myChart
  let option;
  let index = 0;
  const colorList = [
    '#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#f8bc31', '#fb7293', '#e7bcf3', '#8378ea', '#bf41ff', '#45b787', '#ed5a65', '#e3b4b8', '#7a7374', '#12a182', '#f1ca17', '#5a1f1b', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#f8bc31', '#fb7293', '#e7bcf3', '#8378ea', '#bf41ff', '#45b787', '#ed5a65'
  ];
  option = {
    title: {
      text: props.chartPieData.total,
      x: "center",
      y: "center",
      textStyle: {
        fontSize: 20,
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: 'vertical',
      icon: 'circle',
      x: '80%',
      y: 'center',
      align: 'left',
      formatter: function (name) {
        let res = props.chartPieData.data.filter(v => v.name === name);
        res = res[0] || {};
        return name + ' ' + res.value
      }
    },
    series: [
      {
        type: "pie",
        center: ["50%", "50%"],
        radius: ["24%", "45%"],
        clockwise: true,
        avoidLabelOverlap: true,
        hoverOffset: 15,
        itemStyle: {
          normal: {
            color: function (params) {
              return colorList[params.dataIndex];
            },
          },
        },
        label: {
          show: true,
          position: "outside",
          formatter: "{b|{b}}\n{a|{d}%}\n{hr|}",
          rich: {
            hr: {
              backgroundColor: "t",
              width: 3,
              height: 3,
              borderRadius: 3,
              padding: [3, 3, 0, -12],
            },
            a: {
              align: "center",
              padding: [-20, 10, 0, 10],
              height: 20,
            },
            b: {
              padding: [-20, 10, -30, 10],
            },
          },
        },
        labelLine: {
          normal: {
            length: 20,
            length2: 30,
            lineStyle: {
              width: 1,
            },
          },
        },
        data: props.chartPieData.data
      },
    ],
  };

  option && myChart.setOption(option);
};

const refresh = () => {
  thisChart.value.resize()
}

defineExpose({
  refresh
})

</script>

<style lang="scss" scoped>
#chartPie {
  width: 100%;
  height: 100%;
  padding: 15px;
}
</style>

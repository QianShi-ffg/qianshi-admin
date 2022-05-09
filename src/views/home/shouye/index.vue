<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>首页</span>
      </div>
      <img src="../../../assets/4.png" alt="" class="img1">
      <!-- <div>
        <div id="map" style="width: 1100px;height:500px;"></div>
      </div> -->
      <div class="left">
        <div id="main" style="width: 500px;height:400px;"></div>
      </div>
      <div class="right">
        <div id="bing" style="width: 400px;height:400px;"></div>
        <!-- <div id="main" style="width: 500px;height:200px;"></div> -->
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'shouye',
  mounted () {
    this.setOption1()
    this.bing()
  },
  methods: {
    setOption1 () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '文章分类统计'
        },
        tooltip: {},
        xAxis: {
          data: ['发型', '妆容', '日常', '讨论', '避雷', '安利', '手作']
        },
        yAxis: {},
        series: [
          {
            name: '数量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    },
    bing () {
      var myChart = echarts.init(document.getElementById('bing'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['发型', '妆容', '日常', '讨论', '避雷', '安利', '手作']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '发型' },
              { value: 310, name: '妆容' },
              { value: 234, name: '日常' },
              { value: 135, name: '讨论' },
              { value: 1548, name: '避雷' },
              { value: 1548, name: '安利' },
              { value: 1548, name: '手作' }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="less">
.left {
  float: left;
}
.right {
  float: right;
}
.el-card {
  position: relative;
  .img1 {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>

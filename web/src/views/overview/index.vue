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

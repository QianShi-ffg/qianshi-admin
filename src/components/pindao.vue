<template>
  <el-select v-model="child" placeholder="请选择" clearable>
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'channel',
  props: {
    cid: {
      default: 0
    }
  },
  data () {
    return {
      child: '', // 当前频道id
      channelList: '' // 服务器端真实频道数据(数组对象集)
    }
  },
  watch: {
    // 接收新的值，父给子传值
    cid: function (newvl, oldvl) {
      this.child = newvl
    },
    // 给父亲传值
    child: function (newValue, oldValue) {
      console.log(newValue)
      this.$emit('xgg', newValue)
    }
  },
  created () {
    this.channelList1()
  },
  methods: {
    channelList1 () {
      this.$http.get('http://188.131.164.41:3421/channels')
        .then(result => {
          console.log(result)
          console.log(result.data.message)
          if (result.data.message === 'OK') {
            this.channelList = result.data.data.channels
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped></style>

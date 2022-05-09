<template>
  <!--卡片区-->
  <div>
  <el-card class="box-card">
    <!--命名插槽，头部内容设置-->
    <div slot="header" class="clearfix">
      <span>素材管理</span>
      <!-- 默认上传行为要执行自己的ajax，而服务器端处于认证考虑，要求我们传递token，这样还要给el-upload额外设置属性，具体为headers
          服务器端要求上传好的图片要通过“image”名称进行传递，默认是"file"名称，具体要通过name属性配置 -->
      <!-- 设置图片上传成功方法 -->
      <el-upload
        style="float: right; padding: 3px 0"
        action="http://188.131.164.41:3421/userimg"
        :headers="setToken"
        name="image"
        :show-file-list="false"
        :on-success="onSuccess"
      >
        <el-button size="small" type="primary">上传图片</el-button>
      </el-upload>
    </div>
    <!--匿名插槽，卡片主体内容-->
    <div class="text item">
      <ul>
        <li class="image-box" v-for="item in imgList" :key="item.id">
          <img :src="item.url" alt />
          <div class="image-bot">
            <el-button
              type="success"
              icon="el-icon-star-off"
              circle
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
        </li>
      </ul>
    </div>
  </el-card>
  <el-card>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querycdt.page"
        :page-sizes="[20, 30, 40]"
        :page-size="querycdt.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_count"
      >
      </el-pagination>
    </div>
  </el-card>
  </div>
</template>

<script>
export default {
  name: 'sc',
  data () {
    return {
      imgList: [],
      querycdt: {
        collect: false,
        page: 1,
        per_page: 20
      },
      total_count: 0
    }
  },
  computed: {
    setToken () {
      let token = JSON.parse(window.sessionStorage.getItem('userinfo')).token
      return { Authorization: 'Bearer ' + token }
    }
  },
  created () {
    this.getimg()
  },
  methods: {
    getimg () {
      this.$http
        .get('http://188.131.164.41:3421/user/img', { params: this.querycdt })
        .then(result => {
          if (result.data.message === 'OK') {
            console.log(result)
            this.imgList = result.data.data.results
            this.total_count = result.data.data.total_count
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSuccess () {
      console.log('上传成功')
      this.getimg()
    },
    handleSizeChange (val) {
      // val每页条数变化的新值
      this.querycdt.per_page = val
      this.getimg()
    },
    handleCurrentChange (val) {
      // val变化后的页码值
      this.querycdt.page = val
      this.getimg()
    }
  }
}
</script>

<style scoped lang="less">
.image-box {
  list-style: none;
  width: 200px;
  height: 250px;
  background-color: rgb(146, 143, 143);
  margin: 10px;
  float: left;
  border: 1px solid #eee;
  img {
    width: 200px;
    height: 180px;
  }
  .image-bot {
    width: 200px;
    height: 80px;
    line-height: 60px;
    text-align: center;
  }
}
// .block {
//   position: absolute;
//   bottom: 0;
//   left: 50%;
//   right: 0;
// }
</style>

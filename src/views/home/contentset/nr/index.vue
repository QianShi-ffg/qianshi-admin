<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <div class="text item"></div>
      <el-form ref="Formref" :model="Form">
        <el-form-item label="文章状态:">
          <el-radio v-model="Form.status" label="">全部</el-radio>
          <el-radio v-model="Form.status" :label="0">草稿</el-radio>
          <el-radio v-model="Form.status" :label="1">已发布</el-radio>
        </el-form-item>
        <el-form-item label="频道列表:">
           <pindao @xgg="xgg" :cid="Form.channel_id"></pindao>
        </el-form-item>
        <el-form-item label="时间选择:">
          <el-date-picker
            v-model="timetotime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form> </el-card
    ><br />

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{ tot }}条符合条件的内容</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="cover.images" label="文章图片" width="180">
          <img
            slot-scope="stData"
            :src="stData.row.cover.images[0]"
            alt=""
            width="150px"
            height="150px"
          />
        </el-table-column>
        <el-table-column prop="pubdate" label="时间" width="180">
          <template slot-scope="stData">
            <span>{{stData.row.time}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="文章状态">
          <template slot-scope="stData">
            <el-tag v-if="stData.row.status === ''">全部</el-tag>
            <el-tag v-else-if="stData.row.status === 0">草稿</el-tag>
            <el-tag v-else-if="stData.row.status === 1" type="success">已发布</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="Form.channel_id" label="频道"> </el-table-column> -->
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="title" label="操作">
          <template slot-scope="stData">
            <el-button type="primary" @click="$router.push(`/xg/${stData.row.id}`)">修改</el-button>
            <el-button type="primary" @click="del(stData.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- @size-change="handleSizeChange" //每页显示条数变化处理事件
          @current-change="handleCurrentChange"//当前页码变化的回调处理事件
          :current-page="currentPage4" // 默认当前页码1
          :page-sizes="[100, 200, 300, 400]" // 下拉列表，设计每页显示条数
          :page-size="100" // 默认每页显示条数
          layout="total, sizes, prev, pager, next, jumper" // 分页元素构成设计
          :total="400" //总条数
          -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Form.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="Form.per_page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tot"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import pindao from '../../../../components/pindao'
export default {
  components: {
    pindao
  },
  data () {
    return {
      channelList: '',
      timetotime: [],
      tableData: [],
      tot: 0,
      Form: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 10
      }
    }
  },
  watch: {
    timetotime: function (newValue, oldValue) {
      if (newValue) {
        this.Form.begin_pubdate = newValue[0]
        this.Form.end_pubdate = newValue[1]
      } else {
        this.Form.begin_pubdate = ''
        this.Form.end_pubdate = ''
      }
    },
    Form: {
      handler: function handler (newValue, oldValue) {
        if (newValue) {
          // console.log(newValue)
          this.act()
        } else {
          console.log(1)
        }
      },
      deep: true
    }
  },
  created () {
    this.act()
  },
  methods: {
    xgg (val) {
      // console.log(val)
      this.Form.channel_id = val
    },
    del (id) {
      // console.log(id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('http://188.131.164.41:3421/delarticle', { id: id })
            .then(result => {
              console.log(result)
              this.act()
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    act () {
      // 把searchForm内部为空的成员都过滤掉
      let searchData = {}
      for (var i in this.Form) {
        // i:代表对象的成员属性名称, status、channel_id、begin_pudate等等
        if (this.Form[i] || this.Form[i] === 0) {
          // 成员值非空
          searchData[i] = this.Form[i]
        }
        // else {
        //   searchData = {}
        // }
      }
      // 发送axios请求，将form表单中的数据作为参数发送出去
      this.$http
        .get('http://188.131.164.41:3421/articles/list', { params: searchData })
        .then(result => {
          // console.log(result)
          if (result.data.message === 'OK') {
            // console.log(result)
            this.tableData = result.data.data.results
            this.tot = result.data.data.total_count

            // this.src = this.tableData.cover.images[0]
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSizeChange (val) {
      // val每页条数变化的新值
      this.Form.per_page = val
      this.act()
    },
    handleCurrentChange (val) {
      // val变化后的页码值
      this.Form.page = val
      this.act()
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 30px;
}
</style>

<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <div class="text item">
        <el-form ref="addFormref" :model="addForm" :rules="Formrules">
          <el-form-item label="标题" prop="title">
            <el-input v-model="addForm.title"></el-input>
          </el-form-item>

          <el-form-item label="内容" prop="content">
            <quill-editor v-model="addForm.content"></quill-editor>
          </el-form-item>
          <el-form-item label="封面" prop="cover.type" class="fengmian">
            <el-radio-group v-model="addForm.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <ul class="upload">
              <li class="uploadbox" v-for="item in num" :key="item" @click="dialogVisible1(item)">
                <span>点击图标选择/更换图片</span>
                <img
                v-if="addForm.cover.images[item - 1]"

                  :src="addForm.cover.images[item - 1]"
                  alt=""
                />
                <div
                v-else
                  class="el-icon-picture-outline"
                >
                </div>
              </li>
            </ul>
          </el-form-item>
          <el-dialog
            title="素材图片"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
            @close="clearimg"
          >
          <div class="ulfb">

            <ul>
              <li class="image-box" v-for="item in imgList" :key="item.id" >
                <img :src="item.url" alt @click="click11"/>
              </li>
            </ul>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="querycdt.page"
                :page-size="9"
                layout="prev, pager, next, jumper"
                :total="total_count"
              >
              </el-pagination>
            </div>
          </div>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="click12"
                >确 定</el-button
              >
            </span>
          </el-dialog>

          <el-form-item label="频道" prop="channel_id">
            <pindao @xgg="xgg" :cid="addForm.channel_id"></pindao>
          </el-form-item>
          <hr/>
          <el-form-item>
            <div class="button">
              <el-button type="primary" @click="addart(false)">发表</el-button>
              <el-button type="success" @click="addart(true)"
                >存为草稿</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import pindao from '../../../../components/pindao'
// 引入编辑器模块
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'fb',
  components: {
    quillEditor,
    pindao
  },
  data () {
    return {
      dialogVisible: false,
      xu: '',
      imgurl: '',
      Formrules: {
        title: [
          { required: true, message: '标题必须填' },
          { min: 5, max: 30, message: '长度介于5到30' }
        ],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道必选' }]
      },
      channelList: '',
      addForm: {
        title: '',
        content: '',
        cover: {
          type: 3,
          images: []
        },
        channel_id: ''
      },
      imgList: [],
      querycdt: {
        collect: false,
        page: 1,
        per_page: 9
      },
      total_count: 0
    }
  },
  // ??????
  computed: {
    num () {
      if (this.addForm.cover.type >= 0) {
        return this.addForm.cover.type
      }
      return 0
    }
  },
  created () {
    // this.channelList1()
    this.getimg()
  },
  methods: {
    dialogVisible1 (item) {
      this.dialogVisible = true
      // console.log(item + '7777777')
      this.xu = item
    },
    click11 (e) {
      // 点击关闭dialog
      // this.dialogVisible = false
      var lis = document.querySelectorAll('.image-box')
      for (var i = 0; i < lis.length; i++) {
        lis[i].style.border = ''
      }
      // e是当前事件对象，设置事件时不要加括号
      // console.log(e)
      // e.target: 触发当前事件的dom节点对象(img)
      e.target.parentNode.style.border = '3px solid rgb(250, 7, 7)'
      this.imgurl = e.target.src
    },
    // 确认图片事件
    click12 (e) {
      this.dialogVisible = false
      this.addForm.cover.images[this.xu - 1] = this.imgurl
    },
    // 清除选中事件
    clearimg () {
      var lis = document.querySelectorAll('.image-box')
      for (var i = 0; i < lis.length; i++) {
        lis[i].style.border = ''
      }
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
    },
    getimg () {
      this.$http
        .get('http://188.131.164.41:3421/user/img', { params: this.querycdt })
        .then(result => {
          if (result.data.message === 'OK') {
            // console.log(result)
            this.imgList = result.data.data.results
            this.total_count = result.data.data.total_count
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    xgg (val) {
      console.log(val)
      this.addForm.channel_id = val
    },
    addart (flag) {
      // 表单校验
      this.$refs.addFormref.validate(aaa => {
        //  在验证通过后发送axios请求
        if (aaa) {
          // 根据接口文档，post请求传参
          this.$http
            .post('http://188.131.164.41:3421/articles', this.addForm, { params: { draft: flag } })
            .then(result => {
              console.log(result)
              this.$router.push('/nr')
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.quill-editor {
  width: 93%;
  margin-left: 50px;
}
.el-form /deep/.ql-editor {
  height: 200px;
}
.el-input {
  width: 30%;
}
.el-button {
  width: 120px;
  margin-top: 20px;
  /* margin-left: 40px; */
}
.fengmian {
  margin-left: 10px;
  .el-radio-group {
    margin-left: 20px;
  }
}
.button {
  margin-left: 100px;
}
.upload {
  margin-left: 30px;
}
.uploadbox {
  list-style: none;
  width: 200px;
  height: 200px;
  margin: 10px;
  float: left;
  cursor: pointer;
  border: 2px dashed #eee;
  border-radius: 5px;
  color: #ccc;
  span {
    width: 200px;
    height: 50px;
    line-height: 50px;
    display: block;
    text-align: center;
  }
  div {
    width: 200px;
    height: 150px;
    font-size: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  .el-icon-picture-outline {
    color: rgb(194, 191, 191);
  }
  img {
    width: 200px;
    height: 150px;
  }
}
.ulfb {
  height: 500px;
}
.image-box {
  list-style: none;
  width: 200px;
  height: 140px;
  background-color: #fff;
  margin: 10px;
  float: left;
  border: 1px solid #eee;
  cursor: pointer;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
  }
}
.el-dialog {
  position: relative;
  .block {
    position: absolute;
    bottom: 20px;
  }
}
</style>

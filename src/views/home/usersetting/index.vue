<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户管理</span>
      </div>
<div class="el-card__body">
<div class="form">
        <el-form ref="Formref" :model="Form" :rules="rulesForm">
          <el-form-item label="用户名:" prop="name">
            <el-input type="text" v-model="Form.name" label=""></el-input>
          </el-form-item>
          <hr />
          <el-form-item label="手机号码:" prop="mobile">
            <el-input type="tel" v-model="Form.mobile" label="" :disabled="true"></el-input>
          </el-form-item>
          <hr />
          <el-form-item label="邮箱:" prop="email">
            <el-input type="email" v-model="Form.email" label=""
              ></el-input
            >
          </el-form-item>
          <hr />
          <el-form-item label="简介:" prop="intro">
            <el-input type="text" v-model="Form.intro" label=""></el-input>
          </el-form-item>
          <hr />
        </el-form>
        <el-button type="primary"  v-model="Form.intro" label="" @click="submit" :plain="true">修改</el-button>
        </div>
        <div class="upload">
          <el-upload
          :show-file-list="false"
          action="http://188.131.164.41:3421/userphoto"
            :http-request="httpRequest"
          >
            <img v-if="Form.photo" :src="Form.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon">{{Form.photo}}</i>
          </el-upload>
          <span>点击上传头像</span>
        </div>

</div>

    </el-card>
  </div>
</template>

<script>
import bus from '../../../utils/bus'
export default {
  name: 'user',
  data () {
    return {
      Form: {
        name: '',
        mobile: '',
        email: '',
        intro: '',
        photo: ''
      },
      rulesForm: {
        name: [
          { required: true, message: '名字不可为空' },
          { min: 3, max: 6, message: '长度不符，必须3-6个字' }
        ],
        mobile: [
          { required: true, message: '手机号不可为空' }
        ],
        email: [
          { required: true, message: '邮箱不可为空' }
        ],
        intro: [
          { min: 5, max: 25, message: '长度为5-25字符' }
        ]
      }
    }
  },
  created () {
    this.getuser()
  },
  methods: {
    // httpRequest自带参数，resource
    // resource包含上传图片的各种信息
    httpRequest (resource) {
      // 将生成的临时地址给form.photo，实现实时变换头像
      // this.Form.photo = URL.createObjectURL(resource.file)
      // 通过FormData提交上传文件信息，将其交给axios
      let fd = new FormData()
      // 将上传文件的信息通过对象的方式添加到FormData对象里
      // 可以通过fd.get('photo')来获取
      fd.append('photo', resource.file)
      // console.log(fd)
      this.$http.post('http://188.131.164.41:3421/userphoto', fd).then(
        result => {
          // console.log(result.data.data.photo)
          // 将返回的数据给Form也可以实现实时变换头像
          this.Form.photo = result.data.data.photo
          console.log(this.Form.photo)
          bus.$emit('changephoto', result.data.data.photo)
        }
      ).catch(err => {
        console.log(err)
      })
    },
    getuser () {
      let id1 = JSON.parse(window.sessionStorage.getItem('userinfo')).id
      this.$http.get('http://188.131.164.41:3421/usersetting', { params: { id: id1 } }).then(result => {
        if (result.data.message === 'OK') {
          this.Form = result.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    submit () {
      this.$refs.Formref.validate(aaa => {
        if (aaa) {
          this.$http.post('http://188.131.164.41:3421/submit', this.Form).then(
            result => {
              if (result.data.message === 'OK') {
                // console.log(result)
                bus.$emit('changename', result.data.data.name)
              }
            }
          ).catch(
            err => {
              console.log(err)
            }
          )
        }
      })
      this.open2()
    },
    open2 () {
      this.$message({
        showClose: true,
        message: '修改成功',
        type: 'success'
      })
    },
    change () {

    }
  }
}
</script>

<style scoped lang="less">
.form {
// flex: 50%;
width: 600px;
.el-button {
  margin-left: 150px;
  width: 100px;
}
  .el-form {
    hr {
      margin-bottom: 30px;
    }
    .el-form-item {
      width: 80%;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 30px;
      .el-input {
        width: 350px;
      }
    }
  }
}
.el-card__body{
  display: flex;
.upload{
  // flex: 50%;
  width: 400px;
  position: relative;
  span {
    position: absolute;
    right: 0;
    left: 0;
    top: 180px;
    margin: auto;
    text-align: center;
    color: rgb(131, 129, 129);
  }
  img {
    width: 150px;
    height: 150px;
     position: absolute;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 15px;
  }
  i {
    position: absolute;
    right: 0;
    left: 0;
    margin: auto;
    width: 150px;
    height: 150px;
    font-size: 45px;
    color: #ccc;
    line-height: 150px;
    border: 1px dashed rgb(221, 214, 214);
    border-radius: 15px;
  }
}
}
</style>

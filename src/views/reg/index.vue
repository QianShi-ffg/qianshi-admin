<template>
  <div class="login1">
    <img src="../../assets/1.png" alt />
    <el-form ref="Formref" :model="Form" :rules="Formrules">
      <el-form-item prop="mobile">
        <el-input v-model="Form.mobile" placeholder="请输入用户名或手机号">
          <i slot="prefix" class="iconfont icon-shouji"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="password" v-model="Form.code" placeholder="请输入密码">
          <i slot="prefix" class="iconfont icon-mima"></i>
        </el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="reg">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      Form: {
        mobile: '',
        code: ''
      },
      Formrules: {
        mobile: [
          { required: true, message: '手机号码必填' },
          { pattern: /^1[35789]\d{9}$/, message: '用户名或手机号码格式不对' }
        ],
        code: [{ required: true, message: '密码必填' }]
      }
    }
  },
  methods: {
    reg () {
      // console.log(this.$refs.Formref.validate())
      this.$refs.Formref.validate(aaa => {
        console.log(aaa)
        console.log(this.Form)
        if (aaa) {
          this.$http
            .post('http://188.131.164.41:3421/reg', this.Form)
            .then(result => {
              console.log(result)
              if (result.data.message === 'OK') {
                this.$router.push('/') // 进入首页
                window.sessionStorage.setItem('userinfo', JSON.stringify(result.data.data))
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
      console.log(this)

      //   console.log(valid)
    }
  }
}
</script>

<style lang="less" scoped>
.login1 {
  width: 400px;
  border-radius: 8px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.527);
  margin: auto;
  display: flex;
  flex-direction: column;
 img {
      width: 60%;
      margin: auto;
      margin-top: 15px;
      margin-bottom: 10px;
    }
  .el-form {
    text-align: center;
    width: 80%;
    margin: auto;
  }
}
</style>

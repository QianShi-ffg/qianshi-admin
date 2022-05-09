<template>
<div class="kuang">

 <div class="searchBlock">
      <vue-particles color="#726f68" :particleOpacity="0.4" :particlesNumber="50" shapeType="circle" :particleSize="25" linesColor="#fff" :linesWidth="0" :lineLinked="false" :lineOpacity="0" :linesDistance="200" :moveSpeed="2" :hoverEffect="false" hoverMode="grab" :clickEffect="true" clickMode="push" class="lizi">
      </vue-particles>
      <div>
       <div class="login1">
    <img class="img2" src="../../assets/1.png" alt />
    <img class="img1" src="../../assets/loginkuang.png" alt="">
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
      <el-form-item prop="type">
        <el-checkbox v-model="Form.type">
          <span>
            我已阅读并同意用户协议和
            <a href>隐私条款</a>
          </span>
        </el-checkbox>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="login" :loading="flag" :disabled="flag">登录</el-button>
        <el-button type="primary" @click="reg">注册</el-button>
      </el-form-item>
    </el-form>
</div>
      </div>
    </div>
</div> 

</template>

<script>
import '../../assets/js/gt'
import '../../assets/iconfont/iconfont.css'
export default {
  name: 'login',
  data () {
    var type250 = (rule, value, callback) => {
      // if (value) {
      //   callback()
      // } else {
      //   return callback(new Error('请无条件遵守规矩'))
      // }
      value ? callback() : callback(new Error('请无条件遵守规矩'))
    }
    return {
      flag: false,
      obj: null,
      Form: {
        mobile: '',
        code: '',
        type: false
      },
      Formrules: {
        mobile: [
          { required: true, message: '手机号码必填' },
          { pattern: /^1[35789]\d{9}$/, message: '用户名或手机号码格式不对' }
          //   { pattern: /^1[35789]\d{9}$/, message: '手机号码格式不对' }
        ],
        code: [{ required: true, message: '密码必填' }],
        type: [{ validator: type250 }]
      }
    }
  },
  methods: {
    login () {
      // console.log(this.$refs.Formref.validate())
      this.$refs.Formref.validate(aaa => {
        if (aaa) {
          if (this.obj !== null) {
            return this.obj.verify()
          }
          this.flag = true
          // 极验
          this.$http
            .get(`/captchas/${this.Form.mobile}`)
            .then(result => {
              let { data } = result.data
              window.initGeetest(
                {
                  // 必须的配置参数
                  gt: data.gt,
                  challenge: data.challenge,
                  new_captcha: data.new_captcha,
                  success: data.success,
                  // 没有按钮，通过登录按钮激活验证
                  product: 'bind'
                },
                captchaObj => {
                  captchaObj
                    .onReady(() => {
                      // 验证码ready之后才能调用verify方法显示验证码
                      console.log(captchaObj)
                      // 将对象存起来
                      this.obj = captchaObj
                      captchaObj.verify()
                      this.flag = false
                    })
                    .onSuccess(() => {
                      // your code
                      this.loginAct()
                    })
                    .onError(() => {
                      // your code
                    })
                }
              )
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    loginAct () {
      this.$http
        .post('http://188.131.164.41:3421/login', this.Form)
        .then(result => {
          // console.log(result.data)
          if (result.data.message === 'OK') {
            // 进入首页
            this.$router.push('/home')
            console.log(result)
            let taken = window.sessionStorage.getItem('userinfo')
            if (!taken) {
              taken = window.sessionStorage.setItem(
                'userinfo',
                JSON.stringify(result.data.data)
              )
              console.log(window.sessionStorage.getItem('userinfo'))
            }
          }
        })
        .catch(err => {
          console.log(err)
          alert('用户名或密码错误')
        })
    },
    reg () {
      this.$router.push('/reg')
    }
  }
}
</script>

<style lang="less" scoped >
.kuang {
   width:100%;
    height:100%;
    position:relative;
  .searchBlock {
    width: 100%;
    height: 100%;
    #particles-js {
      height: 100%;
    }
  }
  .login1 {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 400px;
    border-radius: 8px;
    height: 350px;
    // background-color: rgba(255, 255, 255, 0.247);
    // background-color: rgba(250, 10, 10, 0.555);
    margin: auto;
    display: flex;
    flex-direction: column;
    .img1 {
      position: absolute;
      top: -10px;
      width: 450px;
      left: -20px;
      height: 375px;
    }
    .img2 {
      position: absolute;
      width: 75%;
      top: -60px;
      left: -10px;
      right: 0;
      margin: auto;
    }

    .el-form {
      position: absolute;
      text-align: center;
      width: 85%;
      left: 0;
      right: 0;
      margin: auto;
      margin-top: 100px;
    }
  }
}
</style>

<template>
  <el-container>
    <el-aside :style="{ width: collapse ? '68px' : '200px' }">
      <el-menu
        class="el-menu-vertical-demo"
        style="height:100%;width:100%;"
        :collapse="collapse"
        :collapse-transition="flag"
        :default-active="$route.path" router>
        <div class="tu" v-if="collapse">
          <img class="userimg1" :src="photo1" alt="" />
          <img class="img1" src="../../assets/6.png" alt="">
        </div>
        <div class="tu2" v-else>
          <img class="userimg2" :src="photo1" alt="" />
          <img class="img2" src="../../assets/6.png" alt="">
          <span class="span1">
              {{ name1 }}
            </span>
        </div>
        <el-menu-item index="/shouye">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item
            :index="item.name"
            v-for="(item, i) in navList1"
            :key="i"
            >{{ item.navItem }}</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="/user">
          <i class="el-icon-setting"></i>
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <img src="../../assets/5.png" alt="" class="img2" />
        <div class="lf">
          <i
            :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="click1"
          ></i>
          <span>君醉小馆·后台管理系统</span>
        </div>
        <div class="rg">
          <el-tooltip
            class="item"
            effect="dark"
            content="搜索"
            placement="bottom"
          >
            <el-input type="text" placeholder="请输入内容" size="small">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="消息"
            placement="bottom"
          >
            <span>消息</span>
          </el-tooltip>
          <!-- <span>消息</span> -->
          <img class="userimg" :src="photo1" alt="" />

          <el-dropdown>
            <span class="el-dropdown-link">
              {{ name1 }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="user">个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <el-dropdown-item divided @click.native="out"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import bus from '../../utils/bus'
export default {
  data () {
    return {
      collapse: false,
      flag: false,
      name1: '',
      photo1: '',
      navList1: [
        { name: '/fb', navItem: '发布文章' },
        { name: '/nr', navItem: '内容列表' },
        { name: '/sc', navItem: '素材管理' }
      ]
    }
  },
  created () {
    this.getinfo()
    // 通过bus组件声明事件，name 和photo为兄弟传过来的值
    bus.$on('changename', name => {
      // 将session中的userinfo拿出来
      let userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
      // 将兄弟传过来的值赋值sessionStorage里存放userinfo的name
      userinfo.name = name
      // 将修改后的值交给this.name1
      this.name1 = userinfo.name
      // 将修改后的值放回session中
      window.sessionStorage.setItem('userinfo', JSON.stringify(userinfo))
      console.log(name)
    })
    bus.$on('changephoto', photo => {
      let userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
      userinfo.photo = photo
      this.photo1 = userinfo.photo
      console.log(this.photo1)
      window.sessionStorage.setItem('userinfo', JSON.stringify(userinfo))
    })
  },
  methods: {
    // 声明一个方法，定义name1和photo1的取值来源，在created方法中调用，使得页面加载就获取修改后的新数据
    getinfo () {
      this.name1 = JSON.parse(window.sessionStorage.getItem('userinfo')).name
      this.photo1 = JSON.parse(window.sessionStorage.getItem('userinfo')).photo
    },
    click1 () {
      this.collapse = !this.collapse
      console.log(this.collapse)
      console.log(!this.collapse)
      console.log(JSON.parse(window.sessionStorage.getItem('userinfo')).name)
    },
    out () {
      window.sessionStorage.clear('userinfo')
      this.$router.push('/')
    },
    user () {
      this.$router.push('/user')
    }
  },
  computed: {
    name () {
      return JSON.parse(window.sessionStorage.getItem('userinfo')).name
    },
    photo () {
      return JSON.parse(window.sessionStorage.getItem('userinfo')).photo
    }
  }
}
</script>

<style scoped lang="less">
.el-container {
  width: 100%;
  height: 100%;
  .el-aside {
    // height: 100%;
    background-color: white;
    transition: width 500ms;
    position: relative;
    .tu {
      height: 70px;
      position: relative;
      .img1 {
        position: absolute;
        top: 0;
        width: 65px;
        height: 65px;

      }
      .userimg1 {
        position: absolute;
        top: 0;
        left: 6px;
        top: 5px;
        width: 55px;
        height: 55px;
        border-radius: 30px;
      }
    }
    .tu2 {
      height: 70px;
      position: relative;
      .img2 {
        position: absolute;
        top: 0;
        width: 65px;
        height: 65px;

      }
      .userimg2 {
        position: absolute;
        top: 0;
        left: 6px;
        top: 5px;
        width: 55px;
        height: 55px;
        border-radius: 30px;
      }
      .span1 {
        position: absolute;
        left: 75px;
        top: 25px;
        font-size: 18px;
      }
    }
    .el-menu {
      border: 0;
    }
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    position: relative;
    .img2 {
      position: absolute;
      left: 50px;
      top: -90px;
      width: 40%;
      height: 400%;
    }
    .lf {
      display: flex;
      // text-align: center;
      width: 320px;
      height: 100%;
      //   background-color: burlywood;
      i {
        font-size: 20px;
        margin: auto 0;
      }
      span {
        font-size: 16px;
        margin: auto 10px;
      }
    }
    .rg {
      display: flex;
      width: 550px;
      height: 100%;
      align-items: center;
      justify-content: flex-end;
      .el-input {
        width: 230px;
        margin-right: 20px;
      }
      .userimg {
        margin: 0 5px 0 10px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
      }
      .el-dropdown {
        color: #000;
      }
    }
    background-color: rgba(243, 250, 250, 0.952);
  }
  .el-main {
    background-color: rgba(247, 242, 239, 0.466);
  }
}
</style>

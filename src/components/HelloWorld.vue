<template>
  <div class="login">
  <div>
    <el-row type="flex"  justify="center">
      <el-col span="6">
        <div class="grid-content">用户名：
        <el-input  v-model="name" placeholder="请输入用户名" ></el-input>
        </div>
      </el-col>
      <el-col span="2">
        <div class="grid-content" id="error1">{{error1}}</div>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-col span="6">
        <div class="grid-content">
          密码：&nbsp;&nbsp;&nbsp;&nbsp;
          <el-input  v-model="password" placeholder="请输入密码" show-password ></el-input>
        </div>
      </el-col>
      <el-col span="2">
        <div class="grid-content" id="error2">{{error2}}</div>
      </el-col>
    </el-row>
    <el-button type="primary" @click="login">登录</el-button>
    <div id="error3">{{error3}}</div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      name: '',
      password: '',
      error1: '',
      error2: '',
      error3: ''
    }
  },
  methods: {
    login: function () {
      this.error1 = ''
      this.error2 = ''
      if (this.name.length === 0 && this.name === '') {
        this.error1 = '用户名不能为空'
      } else if (this.password.length === 0 && this.password === '') {
        this.error2 = '密码不能为空'
      } else {
        this.$axios({
          method: 'post',
          url: '/home/login',
          params: {'name': this.name,
            'password': this.password
          }
        }).then(res => {
          if (res.data.password === this.password) {
            this.$router.replace({
              path: '/welcome',
              query: {res}
            }
            )
          } else {
            this.error3 = '用户名密码错误'
          }
        })
          .catch(res => {
            alert('服务器错误')
          })
      }
    }}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-input{
    width:300px
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  #error1 , #error2 ,#error3{
    color: red;
  }
  .login{
    position:absolute;
    width:100%;
    height:100%;
    background-image: url("../assets/hello.jpg");
  }
</style>

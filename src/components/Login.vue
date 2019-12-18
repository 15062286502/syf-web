<template>
  <div class="login">
    <el-form :model="formLogin" :rules="rules" ref="formLogin" class="login-container" label-position="left"
             label-width="0px" v-loading="loading">
      <h3 class="login_title">系统登录</h3>
      <el-form-item prop="name">
        <el-input type="text" v-model="formLogin.name"
                  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="formLogin.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <Slider :success-fun="sliderFun"></Slider>
      <el-form-item class="error">{{error}}</el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login('formLogin')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import user from './user/user'
import Slider from './tool/Slider'
import store from '../../store'
export default {
  name: 'HelloWorld',
  components: {
    Slider
  },
  data () {
    return {
      formLogin: {
        name: null,
        password: null
      },
      error: '',
      rules: {
        name: [{validator: user.checkName, trigger: 'blur'}],
        password: [{validator: user.checkPassword, trigger: 'blur'}]
      },
      slider: ''
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.slider === 'success') {
          this.$axios({
            method: 'post',
            url: '/home/login',
            data: this.formLogin
          }).then(res => {
            if (typeof res.data !== 'undefined' && res.data.isLogin === 'true') {
              store.saveToken(res.data.token)
              this.$router.replace({
                path: '/index',
                name: 'Index',
                params: {
                  userInfo: res.data.returnObj
                }
              }
              )
            } else {
              this.error = '用户名或密码错误！'
            }
          })
            .catch(res => {
              alert('服务器错误')
            })
        }
      })
    },
    sliderFun () {
      this.slider = 'success'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    background: url("../assets/timg.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .error{
    color: red;
  }
</style>

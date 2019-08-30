<template>
  <div class="login">
    <img src="../assets/hello.jpg">
    <div>
      用户名：
     <el-input  v-model="name" placeholder="请输入用户名" ></el-input>
      {{error1}}
    </div>
  <br/>
    <div>
      密码：&nbsp;&nbsp;&nbsp;&nbsp;
    <el-input  v-model="password" placeholder="请输入密码" show-password ></el-input>
      {{error2}}
    </div>
    <button @click="login">登录</button>
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
      error2: ''
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
</style>

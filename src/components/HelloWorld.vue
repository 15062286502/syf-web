<template>
  <div class="login">
    <div>
    用户名：
     <el-input  v-model="name" placeholder="请输入用户名" ></el-input>
    </div>
  <br/>
    <div>
      密码：&nbsp;&nbsp;&nbsp;&nbsp;
    <el-input  v-model="password" placeholder="请输入密码" show-password ></el-input>
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
      password: ''
    }
  },
  methods: {
    login: function () {
      this.$axios({
        method: 'post',
        url: '/home/login',
        params: {'name': this.name,
          'password': this.password
        }
      }).then(res => {
        this.test = res.data
      })
        .catch(res => {
        // eslint-disable-next-line no-undef
          console.log(error)
        })
    }}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-input{
    width:300px
  }
</style>

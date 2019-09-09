<template>
  <div>
    <div v-for="m in test" :key="m">测试！1成功1!!!! {{m.username}} {{m.password}}</div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      test: []
    }
  },
  created () {
    this.$axios({
      method: 'post',
      url: '/test'
    }).then(res => {
      this.test = res.data
    }
    ).catch(res => {
      alert('服务器错误')
    })
  }
}
</script>

<style scoped>

</style>

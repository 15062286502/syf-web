<template>
    <div>
      欢迎！{{user}}
    </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      user: ''
    }
  },
  created () {
    this.user = JSON.parse(this.$route.query.response)
  }
}
</script>

<style scoped>

</style>

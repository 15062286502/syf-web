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
      user: this.$route.query.res.data.name
    }
  }
}
</script>

<style scoped>

</style>

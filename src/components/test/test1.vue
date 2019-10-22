<template>
  <user-add :state="newstate" :add-user-form="test"></user-add>
</template>

<script>
import userAdd from '../user/UserAdd'
export default {
  name: 'test1',
  components: {
    userAdd
  },
  data () {
    return {
      newstate: true
    }
  },
  methods: {
    test () {
      console.log(111)
    }
  }
}
</script>

<style scoped>

</style>

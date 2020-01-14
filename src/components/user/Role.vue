<template>
  <div style="width: 80%;height: 100%">
    <el-container>
      <el-header style="text-align: left;background-color: slategrey">
        <el-breadcrumb separator="/" style="margin-top: 25px">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div id="query">
          <div id="userquery">
            角色：
            <el-select  placeholder="请选择角色" v-model="selectRole" @change="roleSelected">
              <el-option label="店长" value="店长"></el-option>
              <el-option label="骑手" value="骑手"></el-option>
              <el-option label="服务员" value="服务员"></el-option>
            </el-select>
          </div>
        </div>
        <div id="transfer">
          <el-transfer v-model="value" :data="data"></el-transfer>
        </div>
        <div id="role">
          <el-button type="primary"  @click="modifity ()">确认授权</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Role',
  data () {
    return {
      selectRole: '',
      data: [],
      value: []
    }
  },
  methods: {
    roleSelected () {
      this.$axios({
        method: 'post',
        url: '/home/getMenuByRole',
        data: this.selectRole
      }).then(res => {
        this.data = res.data.returnObj.all
        this.value = res.data.returnObj.already
      })
    },
    modifity () {
      if (this.selectRole === '') {
        this.$message({
          message: '请选择角色',
          type: 'warning'
        })
      } else {
        this.$axios({
          method: 'post',
          url: '/home/setMenuByRole',
          data: [this.selectRole, this.value]
        }).then(res => {
          if (res.data.isLogin === 'true') {
            this.$message({
              message: '授权成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '授权失败',
              type: 'error'
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  #query{
    height: 50px;
  }
  #userquery{
    margin-top: 20px;
    text-align: left;
  }
  #transfer{
    margin-top: 30px;
  }
  #role{
    margin-top: 30px;
  }
</style>

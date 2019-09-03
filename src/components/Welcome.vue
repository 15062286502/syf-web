<template>
      <el-container style="height: 600px; border: 1px solid #eee">
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{user}}</span>
        </el-header>
        <el-container>
        <el-aside width="200px">
          <el-menu :default-openeds="['1', '3']" v-for="m in menulist" :key="m">
            <el-submenu index="m.id">
              <template slot="title"><i class="el-icon-message"></i>{{m.name}}</template>
              <el-menu-item-group>
                <el-menu-item>111</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
          <el-main>
            <el-table :data="tableData">
              <el-table-column prop="date" label="日期" width="140">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-container>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      user: '',
      menulist: []
    }
  },
  created () {
    this.user = JSON.parse(this.$route.query.response)
    this.$axios({
      method: 'post',
      url: '/menus'
    }).then(res => {
      this.menulist = res.data
    }
    ).catch(res => {
      alert('服务器错误')
    })
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>

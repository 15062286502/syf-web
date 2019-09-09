<template>
      <el-container style="height: 700px; border: 1px solid #eee">
        <el-header>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{user}}</span>
        </el-header>
        <el-container>
        <el-aside>
          <el-menu :default-openeds="['1', menulist.size]" v-for="m in menulist" :key="m" router>
            <el-submenu :index="m.id">
              <template slot="title"><i class="el-icon-message"></i>{{m.name}}</template>
              <el-menu-item-group v-for="c in m.childMenus" :key="c">
                <el-menu-item :index="c.url">{{c.name}}</el-menu-item>
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
            <router-view/>
          </el-main>
        </el-container>
        <el-footer>
          <span>Copyright © 2019 - 2019 . All Rights Reserved.南航syf版权所有</span>
        </el-footer>
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
    text-align: right;
    font-size: 12px
  }

  .el-aside {
    background-color: #cac6c6;
    color: #333;
  }
  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-footer{
    text-align: center;
  }
  .el-menu{
    background-color:#cac6c6;
  }
  .el-menu-item-group{
    background-color: #cac6c6;
  }
</style>

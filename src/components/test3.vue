<template>
  <el-container style="height: 700px">
    <el-header>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{role}}</span>
      <span>{{realName}}</span>
      <Dropdown trigger="click" style="margin-right: 50px">
        <img src="../assets/user.jpg">
      </Dropdown>
    </el-header>
    <el-container>
      <el-aside width="100px"></el-aside>
      <el-table
        :data="tableData"
        border
        width="300px"
        height="450"
      >
        <el-table-column
          prop="name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="真实姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <el-footer>
      <span>Copyright © 2019 - 2019 . All Rights Reserved.syf版权所有</span>
    </el-footer>
  </el-container>
</template>

<script>
import store from '../../store'
export default {
  name: 'Welcome',
  data () {
    return {
      realName: store.fetch(),
      menulist: store.getMenu(),
      role: store.getRole()
    }
  },
  created () {
    this.realName = this.$route.params.userInfo.realName
    this.role = this.$route.params.userInfo.role
    this.$axios({
      method: 'post',
      url: '/menus',
      data: this.role
    }).then(res => {
      this.menulist = res.data
    }
    ).catch(res => {
      alert('服务器错误')
    })
  },
  watch: {
    realName: {
      handler: function (val, oldVal) {
        store.save(val)
      },
      deep: true
    },
    menulist: {
      handler: function (val, oldVal) {
        store.saveMenu(val)
      },
      deep: true
    },
    role: {
      handler: function (val, oldVal) {
        store.saveRole(val)
      },
      deep: true
    }
  },
  methods: {
    logout: function () {
      localStorage.clear()
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
  .el-header {
    background: #e9eaec;
    color: #333;
    line-height: 60px;
    text-align: right;
    font-size: 12px
  }

  .el-aside {
    background: #464c5b;
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
    background: #464c5b;
  }
  .el-menu-item-group{
    background: #464c5b;
  }
  img{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    margin-top: 10px;
    /*margin-right: 50px;*/
  }
</style>

<template>
  <div style="width: 80%;height: 100%">
    <el-container>
      <el-header style="text-align: left;background-color: slategrey">
        <el-breadcrumb separator="/" style="margin-top: 25px">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div id="query">
          <div id="userquery">
          用户名：
          <el-input
            prefix-icon="el-icon-search"
            placeholder="请输入内容"
            v-model="loginName"
            clearable style="width: 300px">
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        </div>
        </div>
        <div id="add_user">
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增用户</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          height="450"
          width="100%"
        >
          <el-table-column
            prop="name"
            label="用户名"
            min-width="50%"
            >
          </el-table-column>
          <el-table-column
            prop="realName"
            label="真实姓名"
            >
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系方式"
            >
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="e=>{sizeChangeSearch(e)}"
          @current-change="e=>{pageSearch(e)}"
          :current-page="1"
          :page-sizes="[5, 10, 15, 20]"
          :page-size=this.pageInfo.pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total=this.total>
        </el-pagination>
        <UserAdd  :addState="dialogFormVisible" :submit="addUserForm" :user-new="userNew" :add-cancel="editCancel"></UserAdd>
        <UserEdit :edit-state="editFormVisible" :edit-user="editUser" :submit="editUserForm" :close="closeDialog" :edit-cancel="editCancel"></UserEdit>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import UserAdd from '../user/UserAdd'
import UserEdit from '../user/UserEdit'
export default {
  name: 'UserManagement',
  components: {UserEdit, UserAdd},
  data () {
    return {
      tableData: [],
      loginName: '',
      pageInfo: {
        page: 0,
        pageSize: 5
      },
      dialogFormVisible: false,
      /* 用于添加的user实体 */
      userNew: {
        id: null,
        name: null,
        password: null,
        passwordAgain: null,
        realName: null,
        role: null,
        address: null,
        phone: null
      },
      total: 0,
      editFormVisible: false,
      editUser: []
    }
  },
  created () {
    this.getTable({
      'pageInfo': this.pageInfo,
      'loginName': this.loginName
    })
  },
  methods: {
    handleEdit (index, row) {
      this.editFormVisible = true
      this.editUser = row
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'post',
          url: '/home/userDelete',
          data: row.name
        }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getTable({
            'pageInfo': this.pageInfo,
            'loginName': this.loginName
          })
        }
        ).catch(res => {
          alert('服务器错误')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getTable (e) {
      this.$axios({
        method: 'get',
        url: '/home/usermanage',
        params: {
          'page': e.pageInfo.page,
          'pageSize': e.pageInfo.pageSize,
          'loginName': e.loginName
        }
      }).then(res => {
        this.tableData = res.data.data
        this.total = res.data.total
      }
      ).catch(res => {
        alert('服务器错误')
      })
    },
    pageSearch (e) {
      this.pageInfo.page = e - 1
      this.getTable({
        'pageInfo': this.pageInfo,
        'loginName': this.loginName
      })
    },
    sizeChangeSearch (e) {
      this.pageInfo.pageSize = e
      this.getTable({
        'pageInfo': this.pageInfo,
        'loginName': this.loginName
      })
    },
    initPageInfo () {
      this.pageInfo.page = 0
      this.pageInfo.pageSize = 10
    },
    search () {
      this.initPageInfo()
      this.getTable({
        'pageInfo': this.pageInfo,
        'loginName': this.loginName
      })
    },
    addUserForm () {
      this.dialogFormVisible = false
      this.$axios({
        method: 'post',
        url: '/home/userAdd',
        data: this.userNew
      }).then(res => {
        if (res.data === 'success') {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getTable({
            'pageInfo': this.pageInfo,
            'loginName': this.loginName
          })
        } else {
          this.$message({
            message: '该用户已存在',
            type: 'error'
          })
        }
      }
      ).catch(res => {
        alert('服务器错误')
      })
    },
    closeDialog () {
      this.editFormVisible = false
      this.getTable({
        'pageInfo': this.pageInfo,
        'loginName': this.loginName
      })
    },
    editUserForm () {
      this.editFormVisible = false
      this.$axios({
        method: 'post',
        url: '/home/userEdit',
        data: this.editUser
      }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.getTable({
          'pageInfo': this.pageInfo,
          'loginName': this.loginName
        })
      }).catch(res => {
        alert('服务器错误')
      })
    },
    editCancel () {
      this.editFormVisible = false
      this.dialogFormVisible = false
      this.$message({
        type: 'info',
        message: '取消操作'
      })
    }
  }
}
</script>

<style scoped>
  #query{
    height: 50px;
  }
#userquery{
    text-align: left;
}
  #add_user{
    margin-bottom: 9px;
  }
</style>

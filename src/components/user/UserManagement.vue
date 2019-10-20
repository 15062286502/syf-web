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
        <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="30%" destroy-on-close="true">
          <el-form v-loading="loading" :model="userNew" :rules="add_rules" ref="addUser">
            <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
              <el-input auto-complete="off" v-model="userNew.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
              <el-input type="password" v-model="userNew.password"
                        auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordAgain" :label-width="formLabelWidth">
              <el-input type="password" v-model="userNew.passwordAgain"
                        auto-complete="off" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item label="角色"  :label-width="formLabelWidth" prop="role">
              <el-select  placeholder="请选择角色" v-model="userNew.role">
                <el-option label="店长" value="店长"></el-option>
                <el-option label="骑手" value="骑手"></el-option>
                <el-option label="服务员" value="服务员"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
              <el-input auto-complete="off" v-model="userNew.realName"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
              <el-input auto-complete="off" v-model="userNew.address"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
              <el-input auto-complete="off" v-model="userNew.phone"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="addUserForm('addUser')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑用户" :visible.sync="editFormVisible" width="30%" destroy-on-close="true">
          <el-form v-loading="loading" :model="editUser" :rules="add_rules" ref="editUser">
            <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
              <el-input auto-complete="off" v-model="editUser.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
              <el-input type="password" v-model="editUser.password"
                        auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordAgain" :label-width="formLabelWidth">
              <el-input type="password" v-model="editUser.passwordAgain"
                        auto-complete="off" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item label="角色"  :label-width="formLabelWidth" prop="role">
              <el-select  placeholder="请选择角色" v-model="editUser.role">
                <el-option label="店长" value="店长"></el-option>
                <el-option label="骑手" value="骑手"></el-option>
                <el-option label="服务员" value="服务员"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
              <el-input auto-complete="off" v-model="editUser.realName"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
              <el-input auto-complete="off" v-model="editUser.address"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
              <el-input auto-complete="off" v-model="editUser.phone"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="editUserForm('editUser')">确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import user from './user'
export default {
  name: 'UserManagement',
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
      formLabelWidth: '80px',
      add_rules: {
        name: [{validator: user.checkName, trigger: 'blur'}],
        password: [{validator: user.checkPassword, trigger: 'blur'}],
        realName: [{required: true, message: '请输入正确的真实姓名', trigger: 'blur'}],
        passwordAgain: [{validator: this.checkPasswordAgain, message: '密码不一致', trigger: 'blur'}],
        role: [{required: true, message: '请选择角色', trigger: ['blur', 'change']}],
        address: [{required: true, message: '请输入正确的地址', trigger: 'blur'}],
        phone: [{validator: user.checkPhone, trigger: 'blur'}]
      },
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
    cancel () {
      this.dialogFormVisible = false
      this.editFormVisible = false
      this.$message({
        type: 'info',
        message: '取消操作'
      })
    },
    addUserForm (addUser) {
      this.$refs[addUser].validate((valid) => {
        if (valid) {
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
        }
      })
    },
    checkPasswordAgain (rule, value, callback) {
      let first = this.userNew.password
      let edit = this.editUser.password
      if (value) {
        if (first !== value || edit !== value) {
          return callback(new Error('密码不一致！'))
        } else {
          callback()
        }
      } else {
        return callback(new Error('密码不能为空'))
      }
    },
    checkRole (rule, value, callback) {
      if (value) {
        callback()
      } else {
        return callback(new Error('请选择角色'))
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
    text-align: left;
}
  #add_user{
    margin-bottom: 9px;
  }
</style>

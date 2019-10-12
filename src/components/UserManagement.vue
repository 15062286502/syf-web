<template>
  <div>
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
          登录名：
          <el-input
            prefix-icon="el-icon-search"
            placeholder="请输入内容"
            v-model="loginName"
            clearable style="width: 300px">
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        </div>
        </div>
        <el-table
          :data="tableData"
          width="100"
          border
          height="450"
        >
          <el-table-column
            prop="name"
            label="用户名"
            width="150"
            >
          </el-table-column>
          <el-table-column
            prop="realName"
            label="真实姓名"
            width="200"
            >
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            width="200">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="200">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系方式"
            width="200">
          </el-table-column>
          <el-table-column label="操作" width="200">
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
          :current-page="currentPage4"
          :page-sizes="[5, 10, 15, 20]"
          :page-size=this.pageInfo.pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total=this.total>
        </el-pagination>
      </el-main>
    </el-container>
  </div>

</template>

<script>
export default {
  name: 'UserManagement',
  data () {
    return {
      tableData: [],
      loginName: '',
      pageInfo: {
        page: 0,
        pageSize: 10
      },
      total: 0
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
      console.log(index, row)
    },
    handleDelete (index, row) {
      this.$axios({
        method: 'post',
        url: '/home/userDelete',
        data: row.name
      }).then(res => {
        this.getTable({
          'pageInfo': this.pageInfo,
          'loginName': this.loginName
        })
      }
      ).catch(res => {
        alert('服务器错误')
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
</style>

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
            v-model="userQuery"
            clearable style="width: 300px">
          </el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
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
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
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
      userQuery: ''
    }
  },
  created () {
    this.$axios({
      method: 'post',
      url: '/home/usermanage',
      data: this.role
    }).then(res => {
      this.tableData = res.data
    }
    ).catch(res => {
      alert('服务器错误')
    })
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped>
  #query{
    height: 100px;
    background-color: red;
  }
#userquery{
    text-align: left;
}
</style>

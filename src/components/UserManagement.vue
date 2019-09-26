<template>
  <div>
    <span>用户管理界面</span>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
export default {
  name: 'UserManagement',
  data () {
    return {
      tableData: []
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

</style>

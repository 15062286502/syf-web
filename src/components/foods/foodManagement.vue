<template>
  <div style="width: 80%;height: 100%">
    <el-container>
      <el-header style="text-align: left;background-color: slategrey">
        <el-breadcrumb separator="/" style="margin-top: 25px">
          <el-breadcrumb-item>菜单设置</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div id="query">
          <div id="userquery">
            商品名：
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
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增商品</el-button>
          <el-button type="danger" @click="handleDelete()">删除
          </el-button>
        </div>
        <el-table
          :data="tableData"
          border
          height="470"
          width="100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="商品价格"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="kind"
            label="商品类型"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="imgUrl"
            label="商品图片"
            width="90"
            fixed
          >
            <template   slot-scope="scope">
              <img :src="scope.row.imgUrl"  width="60" height="60" />
            </template>
          </el-table-column>
          <el-table-column
            prop="goodDesc"
            label="商品说明"
            fixed
          >
          </el-table-column>
          <el-table-column label="操作" fixed  width="90">
            <template slot-scope="scope">
              <el-button
                @click="handleEdit(scope.$index, scope.row)">编辑
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'foods',
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
      editUser: [],
      multipleSelection: []
    }
  },
  created () {
    this.getTable({
      'pageInfo': this.pageInfo,
      'loginName': this.loginName
    })
  },
  mounted () {
    setTimeout(() => {
      this.$refs.table.doLayout()
    }, 1200)
  },
  methods: {
    getTable (e) {
      this.$axios({
        method: 'get',
        url: '/good/goodsManage',
        params: {
          'page': e.pageInfo.page,
          'pageSize': e.pageInfo.pageSize,
          'loginName': e.loginName
        }
      }).then(res => {
        console.log(res.data.returnObj)
        this.tableData = res.data.returnObj.data
        this.total = res.data.returnObj.total
      }
      ).catch(res => {
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
    sizeChangeSearch (e) {
      this.pageInfo.pageSize = e
      this.getTable({
        'pageInfo': this.pageInfo,
        'loginName': this.loginName
      })
    },
    pageSearch (e) {
      this.pageInfo.page = e - 1
      this.getTable({
        'pageInfo': this.pageInfo,
        'loginName': this.loginName
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleDelete () {
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

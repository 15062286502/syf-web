<template>
  <div style="width: 80%;height: 100%">
    <el-container>
      <el-header style="text-align: left;background-color: slategrey">
        <el-breadcrumb separator="/" style="margin-top: 25px">
          <el-breadcrumb-item>菜单设置</el-breadcrumb-item>
          <el-breadcrumb-item>店内订单</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div id="query">
          <div id="userquery">
            订单号：
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
          <el-button type="primary"  @click="open()">批量完成</el-button>
          <el-button type="danger" @click="handleDelete()">删除
          </el-button>
        </div>
        <el-table
          :data="tableData"
          border
          height="470"
          @selection-change="handleSelectionChange"
          ref="multipleTable"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column type="expand"  fixed >
            <template slot-scope="scope" >
              <div class="card">
                <div v-for="c in (JSON.parse(scope.row.orderDesc))" :key="c">
              <el-card  inline style="margin-right: 23px;margin-bottom: 5px;background-color: aquamarine">
                  <div>商品名:{{c.name}}</div>
                <div>商品价格:{{c.price}}</div>
                <div>商品数量:{{c.number}}</div>
                <div>规格:{{c.detail}}</div>
              </el-card>
              </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="identifier"
            label="订单号"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="mealNumber"
            label="取餐号"
            width="80"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="cupNumber"
            label="商品数量"
            width="80"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="sumMoney"
            label="总价"
            width="80"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            show-overflow-tooltip
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="90"
            fixed
          >
            <template   slot-scope="scope">
              <el-tag :type="scope.row.state=='0'?'danger':'success'" :underline="false">{{scope.row.state==='0'?'制餐中':'已完成'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作"   width="150">
            <template slot-scope="scope">
              <el-button
                type="success"
                @click="handleEdit(scope.$index, scope.row)">完成
              </el-button>
              <el-button
                type="danger"
                @click="eachDelete(scope.$index, scope.row)">删除
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
  name: 'takeInManagement',
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
      userNew: [],
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
  methods: {
    getTable (e) {
      this.$axios({
        method: 'get',
        url: '/takeIn/getAllTakeInOrder',
        params: {
          'page': e.pageInfo.page,
          'pageSize': e.pageInfo.pageSize,
          'loginName': e.loginName
        }
      }).then(res => {
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
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请至少选择一项后进行操作',
          type: 'warning'
        })
      } else {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'post',
            url: '/takeIn/takeInDelete',
            data: this.multipleSelection
          }).then(res => {
            if (res.data.isLogin === 'true') {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '删除失败',
                type: 'error'
              })
            }

            this.getTable({
              'pageInfo': this.pageInfo,
              'loginName': this.loginName
            })
          }
          ).catch(res => {
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    eachDelete (index, row) {
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(row, true)
      this.handleDelete()
    },
    open () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请至少选择一项后进行操作',
          type: 'warning'
        })
      } else {
        this.$confirm('确定要完成吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'post',
            url: '/takeIn/takeInComplete',
            data: this.multipleSelection
          }).then(res => {
            if (res.data.isLogin === 'true') {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '操作失败',
                type: 'error'
              })
            }

            this.getTable({
              'pageInfo': this.pageInfo,
              'loginName': this.loginName
            })
          }
          ).catch(res => {
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    },
    handleEdit (index, row) {
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(row, true)
      this.open()
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
  .card{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
  }
</style>

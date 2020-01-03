<template>
  <div style="width: 80%;height: 100%">
    <el-container>
      <el-header style="text-align: left;background-color: slategrey">
        <el-breadcrumb separator="/" style="margin-top: 25px">
          <el-breadcrumb-item>菜单设置</el-breadcrumb-item>
          <el-breadcrumb-item>外卖订单</el-breadcrumb-item>
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
                <el-card  inline style="margin-right: 23px;margin-bottom: 5px;background-color: blanchedalmond;">
                  <div>门牌号:{{JSON.parse(scope.row.address).detail}}</div>
                  <div>姓名:{{JSON.parse(scope.row.address).person}}</div>
                  <div>性别:{{JSON.parse(scope.row.address).sex}}</div>
                  <div>联系方式:{{JSON.parse(scope.row.address).phone}}</div>
                </el-card>
                <el-card  inline style="margin-right: 23px;margin-bottom: 5px;background-color: gainsboro;">
                  <div>骑手评分:{{personScore(scope.row.evaluate==null?"":JSON.parse(scope.row.evaluate).emojiNum)}}</div>
                  <div>店铺评分:<el-rate
                    :value="scope.row.evaluate==null?0:parseInt(JSON.parse(scope.row.evaluate).startNum) + 1"
                    disabled
                    show-score
                    text-color="#ff9900">
                  </el-rate></div>
                  <div>文字评价:{{scope.row.evaluate==null?"":JSON.parse(scope.row.evaluate).writtenWords}}</div>
                </el-card>
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
            width="150"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="deliveryPerson"
            label="骑手"
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
            width="140"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="80"
            fixed
          >
            <template   slot-scope="scope">
              <el-tag :type="scope.row.state=='0'?'danger':'success'" :underline="false">{{scope.row.state==='0'?'制餐中':'已完成'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作"   width="240">
            <template slot-scope="scope">
              <el-button
                type="success"
                @click="handleEdit(scope.$index, scope.row)">完成
              </el-button>
              <el-button
                type="danger"
                @click="eachDelete(scope.$index, scope.row)">删除
              </el-button>
              <el-button
                type="primary"
                @click="givePerson(scope.$index, scope.row)">分配骑手
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
        <el-dialog title="订单指派" :visible.sync="state" width="30%" destroy-on-close="true" @close="clearUpload">
          <el-form v-loading="loading" :model="personForm" ref="personForm">
            <el-form-item label="选择骑手">
              <el-select v-model="personForm.region" placeholder="请选择骑手" @visible-change="e=>{getData(e)}">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="配送时间">
              <el-col :span="8">
                <el-date-picker type="date" placeholder="选择日期" v-model="personForm.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="8">
                <el-time-picker placeholder="选择时间" v-model="personForm.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="clearUpload">取 消</el-button>
            <el-button type="primary" @click="submit('personForm')">确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'takeOutManagement',
  data () {
    return {
      tableData: [],
      loginName: '',
      pageInfo: {
        page: 0,
        pageSize: 5
      },
      /* 用于添加的user实体 */
      userNew: [],
      total: 0,
      editUser: [],
      multipleSelection: [],
      star: 0,
      state: false,
      personForm: {region: '', outId: ''},
      options: []
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
        url: '/takeOut/getAllTakeOutOrder',
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
            url: '/takeOut/takeOutDelete',
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
            url: '/takeOut/takeOutComplete',
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
    },
    personScore (e) {
      let emoji = ''
      switch (e) {
        case '0':emoji = '超赞'
          break
        case '1':emoji = '一般'
          break
        case '2':emoji = '非常差'
          break
      }
      return emoji
    },
    givePerson (index, row) {
      this.state = true
      this.personForm.outId = row.id
    },
    getData (e) {
      if (e === true) {
        this.$axios({
          method: 'post',
          url: '/takeOut/getAllDelivery'
        }).then(res => {
          if (res.data.isLogin === 'true') {
            this.options = res.data.returnObj
          }
        }
        ).catch(res => {
        })
      }
    },
    submit () {
      this.$axios({
        method: 'post',
        url: '/takeOut/setDelivery',
        data: this.personForm
      }).then(res => {
        if (res.data.isLogin === 'true') {
          this.getTable({
            'pageInfo': this.pageInfo,
            'loginName': this.loginName
          })
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '操作失败',
            type: 'success'
          })
        }
      }
      ).catch(res => {
      })
      this.clearUpload()
    },
    clearUpload () {
      this.personForm = {}
      this.state = false
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

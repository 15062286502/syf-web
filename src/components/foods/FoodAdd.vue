<template>
  <el-dialog :title="userNew.id==null?'新增商品':'编辑商品'" :visible.sync="addState" width="30%" destroy-on-close="true" @close="closeGood">
    <el-form v-loading="loading" :model="userNew" :rules="add_rules" ref="addUser">
      <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
        <el-input auto-complete="off" v-model="userNew.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price" :label-width="formLabelWidth">
        <el-input  v-model="userNew.price"
                  auto-complete="off" placeholder="商品价格"></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="kind" :label-width="formLabelWidth">
        <el-input  v-model="userNew.kind"
                  auto-complete="off" placeholder="商品类型"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" :label-width="formLabelWidth" prop="imgUrl">
        <div class="upLoader">
          <el-upload
            :class="{hide:hideUpload}"
            action="/api/good/uploadGoodImg"
            :data="{'name':userNew.name}"
            list-type="picture-card"
            :file-list="fileList"
            limit="1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarFileUpload"
            :on-remove="handleRemove"
            :on-change="handleEditChange">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="商品说明" :label-width="formLabelWidth" prop="goodDesc">
        <el-input auto-complete="off" v-model="userNew.goodDesc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addCancelGood">取 消</el-button>
      <el-button type="primary" @click="addUserForm('addUser')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'FoodAdd',
  props: {
    submit: {
      type: Function
    },
    userNew: {
      type: Object
    },
    addState: {
      type: Boolean
    },
    addCancel: {
      type: Function
    },
    close: {
      type: Function
    }
  },
  data () {
    return {
      add_rules: {
        name: [{required: true, message: '请输入商品名', trigger: 'blur'}],
        price: [{required: true, message: '请输入价格', trigger: 'blur'}],
        kind: [{required: true, message: '请输入类型', trigger: 'blur'}]
      },
      formLabelWidth: '80px',
      hideUpload: false,
      fileList: [],
      imgUrl: ''
    }
  },
  methods: {
    addUserForm (addUser) {
      this.$refs[addUser].validate((valid) => {
        if (valid) {
          this.submit()
          this.clearUpload()
        }
      })
    },
    handleEditChange (file, fileList) {
      this.hideUpload = fileList.length >= 1
    },
    handleRemove (file, fileList) {
      if (fileList.length === 0) {
        this.fileList = []
      } else {
        let dl = this.fileList.indexOf(file)
        this.fileList.splice(dl, 1)
      }
      this.hideUpload = fileList.length >= 1
    },
    beforeAvatarFileUpload (file) {
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024
      if (extension === 'jpg' & size < 2) {
        return true
      } else {
        this.$message({
          message: '头像只能是jpg格式且不能大于2M',
          type: 'warning'
        })
        return false
      }
    },
    handleAvatarSuccess (res, file) {
      this.imgUrl = res
      this.$emit('getImgUrl', this.imgUrl)
    },
    addCancelGood () {
      this.clearUpload()
      this.addCancel()
    },
    closeGood () {
      this.clearUpload()
      this.close()
    },
    clearUpload () {
      this.fileList = []
      this.hideUpload = false
    }
  }
}
</script>

<style>
.upLoader{
  display: flex;
  margin-left:auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
.hide .el-upload--picture-card {
  display: none;
}
</style>

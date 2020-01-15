<template>
  <el-container>
    <el-header style="text-align: left;background-color: slategrey">
      <el-breadcrumb separator="/" style="margin-top: 25px">
        <el-breadcrumb-item>菜单设置</el-breadcrumb-item>
        <el-breadcrumb-item>批量导入</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
  <div id="import">
    <el-card>
      <div slot="header">
        <span>批量导入商品</span>
      </div>
      <el-upload
        class="avatar-uploader"
        action="/api/good/importGoods"
        drag
        multiple
        :before-upload="beforeAvatarFileUpload"
        :on-success="handleAvatarSuccess"
        >  <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传excel文件，图片需要到商品管理界面添加</div>
      </el-upload>
    </el-card>
  </div>
  </el-container>
</template>

<script>
export default {
  name: 'FoodImport',
  methods: {
    beforeAvatarFileUpload (file) {
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024
      if ((extension === 'xls' || extension === 'xlsx') && size < 2) {
        return true
      } else {
        this.$message({
          message: '文件不能为空且必须是excel文件',
          type: 'warning'
        })
        return false
      }
    },
    handleAvatarSuccess (res, file) {
      if (res.isLogin === 'true') {
        this.$notify({
          title: '成功',
          message: '导入商品成功',
          type: 'success',
          offset: 100
        })
      } else {
        this.$notify({
          title: '失败',
          message: res.returnObj,
          type: 'error',
          offset: 100
        })
      }
    }
  }
}
</script>

<style scoped>
#import{
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
}
</style>

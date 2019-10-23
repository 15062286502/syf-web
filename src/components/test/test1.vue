<template>
  <el-upload
    class="avatar-uploader"
    action="#"
    :on-success="handleAvatarFileSuccess"
    :before-upload="beforeAvatarFileUpload"
    limit="1">
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarFileSuccess (res, file) {
      this.$message.success('上传文件成功！')
    },
    beforeAvatarFileUpload (file) {
      let formData = new FormData()
      formData.append('file', file)
      this.$axios({
        method: 'post',
        url: '/home/userImage',
        data: formData
      }).then(res => {
      }
      ).catch(res => {
        alert('服务器错误')
      })
    }
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

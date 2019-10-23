<template>
      <el-container style="height: 700px">
        <el-header>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              <el-dropdown-item>
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :on-success="handleAvatarFileSuccess"
                  :before-upload="beforeAvatarFileUpload"
                  limit="1">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{role}}</span>
          <span>{{realName}}</span>
          <Dropdown trigger="click" style="margin-right: 50px">
            <img src="../assets/user.jpg">
          </Dropdown>
        </el-header>
        <el-container>
        <el-aside>
          <el-menu active-text-color="#ffd04b" text-color="#fff"  :default-openeds="['1', m.size]" v-for="m in menulist" :key="m" router>
            <el-submenu :index="m.id">
              <template slot="title"><i class="el-icon-message"></i>{{m.name}}</template>
              <el-menu-item-group v-for="c in m.childMenus" :key="c">
                <el-menu-item :index="c.url">{{c.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
             <router-view/>
        </el-container>
        <el-footer>
          <span>Copyright © 2019 - 2019 . All Rights Reserved.syf版权所有</span>
        </el-footer>
      </el-container>
</template>

<script>
import store from '../../store'
export default {
  name: 'Welcome',
  data () {
    return {
      realName: store.fetch(),
      menulist: [],
      role: store.getRole()
    }
  },
  created () {
    this.realName = this.$route.params.userInfo.realName
    this.role = this.$route.params.userInfo.role
  },
  mounted () {
    this.$axios({
      method: 'post',
      url: '/menus',
      data: this.role
    }).then(res => {
      this.menulist = res.data
    }
    ).catch(res => {
      alert('服务器错误')
    })
  },
  watch: {
    realName: {
      handler: function (val, oldVal) {
        store.save(val)
      },
      deep: true
    },
    role: {
      handler: function (val, oldVal) {
        store.saveRole(val)
      },
      deep: true
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.replace('/')
    },
    handleAvatarFileSuccess (res, file) {
      this.$message.success('上传文件成功！')
    },
    beforeAvatarFileUpload (file) {
      let formData = new FormData()
      formData.append('file', file)
      formData.append('userName', this.realName)
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
  .el-header {
    background: #e9eaec;
    color: #333;
    line-height: 60px;
    text-align: right;
    font-size: 12px
  }

  .el-aside {
    background: #464c5b;
  }
  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-footer{
    text-align: center;
  }
  .el-menu{
    background: #464c5b;
  }
  .el-menu-item-group{
    background: #464c5b;
  }
  img{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    margin-top: 10px;
    /*margin-right: 50px;*/
  }
</style>

<template>
      <el-container style="height: 700px">
        <el-header>
          <el-dropdown trigger="click">
            <i class="el-icon-setting" style="margin-right: 15px;color: white"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              <el-dropdown-item>
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :before-upload="beforeAvatarFileUpload"
                  limit="1">
                  <span>上传新头像</span>
                </el-upload>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{role}}</span>
          <span>{{realName}}</span>
          <Dropdown trigger="click" style="margin-right: 50px">
            <img :src = "imgUrl">
          </Dropdown>
        </el-header>
        <el-container>
        <el-aside>
          <el-menu active-text-color="#ffd04b" text-color="#fff"  :default-openeds="['1', m.size]" v-for="m in menulist" :key="m" router @open="openSubmenu(m.url)" @close="openSubmenu(m.url)">
            <el-submenu :index="m.url" >
              <template slot="title"><i :class="m.icon"></i>{{m.name}}</template>
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
      role: store.getRole(),
      userName: store.getUserName(),
      imgUrl: store.getImgUrl()
    }
  },
  created () {
    this.realName = this.$route.params.userInfo.realName
    this.role = this.$route.params.userInfo.role
    this.userName = this.$route.params.userInfo.name
    this.imgUrl = this.$route.params.userInfo.image
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
    },
    userName: {
      handler: function (val, oldVal) {
        store.saveUserName(val)
      },
      deep: true
    },
    imgUrl: {
      handler: function (val, oldVal) {
        store.saveImgUrl(val)
      },
      deep: true
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.replace('/')
    },
    beforeAvatarFileUpload (file) {
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024
      if (extension === 'jpg' & size < 2) {
        let formData = new FormData()
        formData.append('file', file)
        formData.append('userName', this.userName)
        this.$axios({
          method: 'post',
          url: '/home/userImage',
          data: formData
        }).then(res => {
          this.imgUrl = res.data
          this.$notify({
            title: '成功',
            message: '上传头像成功',
            type: 'success',
            offset: 100
          })
        }
        ).catch(res => {
        })
      } else {
        this.$message({
          message: '头像只能是jpg格式且不能大于2M',
          type: 'warning'
        })
        return false
      }
    },
    openSubmenu (index) {
      this.$router.replace(index)
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #242f42;
    color: white;
    line-height: 60px;
    text-align: right;
    font-size: 12px
  }

  .el-aside {
    background:  #324157;
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
    background-color: #324157;
    text-color: #bfcbd9;
    active-text-color: #20a0ff;
  }
  .el-menu-item-group{
    background: #324157;
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

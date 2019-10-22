<template>
  <el-dialog title="编辑用户" :visible.sync="editState" width="30%" destroy-on-close="true" @close="close">
    <el-form v-loading="loading" :model="editUser" :rules="edit_rules" ref="editUser">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
        <el-input auto-complete="off" v-model="editUser.name"  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input type="password" v-model="editUser.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordAgain" :label-width="formLabelWidth">
        <el-input type="password" v-model="editUser.passwordAgain"
                  auto-complete="off" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="角色"  :label-width="formLabelWidth" prop="role">
        <el-select  placeholder="请选择角色" v-model="editUser.role">
          <el-option label="店长" value="店长"></el-option>
          <el-option label="骑手" value="骑手"></el-option>
          <el-option label="服务员" value="服务员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
        <el-input auto-complete="off" v-model="editUser.realName"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
        <el-input auto-complete="off" v-model="editUser.address"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
        <el-input auto-complete="off" v-model="editUser.phone"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editCancel">取 消</el-button>
      <el-button type="primary" @click="editUserForm('editUser')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import user from './user'
export default {
  name: 'UserEdit',
  props: {
    editUser: {
      type: Object
    },
    close: {
      type: Function
    },
    editState: {
      type: Boolean
    },
    submit: {
      type: Function
    },
    editCancel: {
      type: Function
    }
  },
  data () {
    return {
      edit_rules: {
        name: [{validator: user.checkName, trigger: 'blur'}],
        password: [{validator: user.checkPassword, trigger: 'blur'}],
        realName: [{required: true, message: '请输入正确的真实姓名', trigger: 'blur'}],
        passwordAgain: [{validator: this.checkEditPasswordAgain, message: '密码不一致', trigger: 'blur'}],
        role: [{required: true, message: '请选择角色', trigger: ['blur', 'change']}],
        address: [{required: true, message: '请输入正确的地址', trigger: 'blur'}],
        phone: [{validator: user.checkPhone, trigger: 'blur'}]
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    checkEditPasswordAgain (rule, value, callback) {
      let edit = this.editUser.password
      if (value) {
        if (edit !== value) {
          return callback(new Error('密码不一致！'))
        } else {
          callback()
        }
      } else {
        return callback(new Error('密码不能为空'))
      }
    },
    editUserForm (editUser) {
      this.$refs[editUser].validate((valid) => {
        if (valid) {
          this.submit()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

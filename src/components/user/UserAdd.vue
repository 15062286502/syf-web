<template>
  <el-dialog title="新增用户" :visible.sync="add_State" width="30%" destroy-on-close="true">
    <el-form v-loading="loading" :model="userNew" :rules="add_rules" ref="addUser">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
        <el-input auto-complete="off" v-model="userNew.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input type="password" v-model="userNew.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordAgain" :label-width="formLabelWidth">
        <el-input type="password" v-model="userNew.passwordAgain"
                  auto-complete="off" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="角色"  :label-width="formLabelWidth" prop="role">
        <el-select  placeholder="请选择角色" v-model="userNew.role">
          <el-option label="店长" value="店长"></el-option>
          <el-option label="骑手" value="骑手"></el-option>
          <el-option label="服务员" value="服务员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
        <el-input auto-complete="off" v-model="userNew.realName"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
        <el-input auto-complete="off" v-model="userNew.address"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
        <el-input auto-complete="off" v-model="userNew.phone"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addCancel">取 消</el-button>
      <el-button type="primary" @click="addUserForm('addUser')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import user from './user'
export default {
  name: 'UserAdd',
  props: {
    submit: {
      type: Function
    },
    userNew: {
      type: Object
    },
    addState: {
      type: String
    }
  },
  data () {
    return {
      add_rules: {
        name: [{validator: user.checkName, trigger: 'blur'}],
        password: [{validator: user.checkPassword, trigger: 'blur'}],
        realName: [{required: true, message: '请输入正确的真实姓名', trigger: 'blur'}],
        passwordAgain: [{validator: this.checkAddPasswordAgain, message: '密码不一致', trigger: 'blur'}],
        role: [{required: true, message: '请选择角色', trigger: ['blur', 'change']}],
        address: [{required: true, message: '请输入正确的地址', trigger: 'blur'}],
        phone: [{validator: user.checkPhone, trigger: 'blur'}]
      },
      formLabelWidth: '80px',
      add_State: this.addState
    }
  },
  methods: {
    checkAddPasswordAgain (rule, value, callback) {
      let add = this.userNew.password
      if (value) {
        if (add !== value) {
          return callback(new Error('密码不一致！'))
        } else {
          callback()
        }
      } else {
        return callback(new Error('密码不能为空'))
      }
    },
    addCancel () {
      this.addState = false
      this.$message({
        type: 'info',
        message: '取消操作'
      })
    },
    addUserForm (addUser) {
      this.$refs[addUser].validate((valid) => {
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

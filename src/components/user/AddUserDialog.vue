<template>
  <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="30%" destroy-on-close="true">
    <el-form v-loading="loading" :model="userNew" :rules="add_rules">
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
      <el-form-item label="角色" prop="role" :label-width="formLabelWidth" >
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
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="addUserForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddUserBox',
  data () {
    return {
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
      formLabelWidth: '80px',
      add_rules: {
        name: [{required: true, message: '请输入正确的用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入正确的密码', trigger: 'blur'}],
        realName: [{required: true, message: '请输入正确的真实姓名', trigger: 'blur'}],
        role: [{required: true, message: '请选择角色', trigger: 'blur'}],
        address: [{required: true, message: '请输入正确的地址', trigger: 'blur'}],
        phone: [{required: true, message: '请输入正确的手机号', trigger: 'blur'}]
      }
    }
  }
}
</script>

<style scoped>

</style>

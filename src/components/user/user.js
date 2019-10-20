export default {
  checkName (rule, value, callback) {
    let name = /^[a-zA-Z][a-zA-Z0-9_-]{2,16}$/
    if (value) {
      if (!(name.test(value))) {
        return callback(new Error('用户名至少3位以英文开头，且不能为中文！'))
      } else {
        callback()
      }
    } else {
      return callback(new Error('用户名不能为空'))
    }
  },
  checkPassword (rule, value, callback) {
    let password = /^.*(?=.{6,})(?=.*\d)(?=.*[a-zA-Z!@#$%^&*? ]).*$/
    if (value) {
      if (!(password.test(value))) {
        return callback(new Error('密码至少6位数字和字母的组合！'))
      } else {
        callback()
      }
    } else {
      return callback(new Error('密码不能为空'))
    }
  },
  checkPhone (rule, value, callback) {
    let phone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
    if (value) {
      if (!(phone.test(value))) {
        return callback(new Error('手机号为11位纯数字'))
      } else {
        callback()
      }
    } else {
      return callback(new Error('手机号不能为空'))
    }
  }
}

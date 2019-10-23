const STORAGE_KEY = 'todos-vuejs'
const ROLEINFO = 'roleinfo'
const USERNAME = 'username'
const IMGURL = 'imgurl'
export default {
  fetch: function() {
    return window.JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save: function(user) {
    window.localStorage.setItem(STORAGE_KEY, window.JSON.stringify(user))
  },
  getRole: function () {
    return window.JSON.parse(window.localStorage.getItem(ROLEINFO) || '[]')
  },
  saveRole: function (role) {
    window.localStorage.setItem(ROLEINFO, window.JSON.stringify(role))
  },
  getUserName: function () {
    return window.JSON.parse(window.localStorage.getItem(USERNAME) || '[]')
  },
  saveUserName: function (userName) {
    window.localStorage.setItem(USERNAME, window.JSON.stringify(userName))
  },
  getImgUrl: function () {
    return window.JSON.parse(window.localStorage.getItem(IMGURL) || '[]')
  },
  saveImgUrl: function (imgUrl) {
    window.localStorage.setItem(IMGURL, window.JSON.stringify(imgUrl))
  }

}

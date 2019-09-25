const STORAGE_KEY = 'todos-vuejs'
const MENUINFO = 'menuinfo'
const ROLEINFO = 'roleinfo'
export default {
  fetch: function() {
    return window.JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save: function(user) {
    window.localStorage.setItem(STORAGE_KEY, window.JSON.stringify(user))
  },
  getMenu: function(){
    return window.JSON.parse(window.localStorage.getItem(MENUINFO) || '[]')
  },
  saveMenu: function (menu) {
    window.localStorage.setItem(MENUINFO, window.JSON.stringify(menu))
  },
  getRole: function () {
    return window.JSON.parse(window.localStorage.getItem(ROLEINFO) || '[]')
  },
  saveRole: function (role) {
    window.localStorage.setItem(ROLEINFO, window.JSON.stringify(role))
  }

}

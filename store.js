const STORAGE_KEY = 'todos-vuejs'
const MENUINFO = 'menuinfo'
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
  }
}

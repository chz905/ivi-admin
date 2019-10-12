import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuItems: [
      {
        name: 'home', //要跳转路由的名称
        size: 18, //icon大小
        type: 'md-home', //icon类型
        text: '主页'//文本内容
      },
      {
        text: '二级菜单',
        type: 'ios-paper',
        children: [
          {
            type: 'ios-grid',
            name: 't1',
            text: '表格'
          },
          {
            type: 'ios-notifications-outline',
            name: 'msg',
            text: '查看消息'
          },
          {
            type: 'md-lock',
            name: 'password',
            text: '修改密码'
          },
          {
            type: 'md-person',
            name: 'userinfo',
            text: '基本资料',
          }
        ]
      }
    ]
  },
  mutations: {

  },
  actions: {

  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuItems: [
      {
        type: 'ios-paper', //icon类型
        text: '内容管理',//文本内容
        children:[
          {
            to: 'home', //要跳转路由的名称
            type: '文章管理'
          },
          {
            to: '', //要跳转路由的名称
            type: '评论管理'
          },
          {
            to: '', //要跳转路由的名称
            type: '举报管理'
          },
        ]
      },
      {
        type: 'ios-people', //icon类型
        text: '用户管理',//文本内容
        children:[
          {
            to: '', //要跳转路由的名称
            type: '新增用户'
          },
          {
            to: '', //要跳转路由的名称
            type: '活跃用户'
          }
        ]
      },
      {
        type: 'ios-stats', //icon类型
        text: '统计分析',//文本内容
        children:[
          {
            to: '', //要跳转路由的名称
            type: '新增和启动'
          },
          {
            to: '', //要跳转路由的名称
            type: '活跃分析'
          },
          {
            to: '', //要跳转路由的名称
            type: '时段分析'
          },
          {
            to: '', //要跳转路由的名称
            type: '用户留存'
          },
          {
            to: '', //要跳转路由的名称
            type: '流失用户'
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

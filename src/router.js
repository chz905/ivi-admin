import Vue from 'vue'
import Router from 'vue-router'
import { LoadingBar,Message } from 'iview'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./components/Index.vue'),
      children:[
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/message',
          name: 'message',
          component: () => import('./views/Message.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/Login.vue')
    },
    {path : "*" , redirect: '/'}
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//路由守卫

router.beforeEach((to,from,next) => {

  LoadingBar.start()
  const isLogin = localStorage.token ? true : false;
  if (to.path == '/login') {
    next();
  } else {
    // 是否在登录状态下
    if(isLogin){
      next()
    }else{
      LoadingBar.finish()
      Message.error('请先登录')
      next('/login')
    }
  }
});

router.afterEach(() => {
  LoadingBar.finish()
})

export default router;

import Vue from 'vue'
import Router from 'vue-router'
import { LoadingBar,Message } from 'iview'


// components
const Index = () => import('./components/Index.vue') //主页
const Login = () => import('./components/Login.vue') //登录

//views
//  系统管理  system
const Manageusers = () => import('./views/system/Manageusers');  //管理用户 Manageusers
const Role = () => import('./views/system/Role');  //角色管理 Role
const Permissions = () => import('./views/system/Permissions');  //角色菜单授权 Permissions
//车辆跟踪  cartracking
const Cartrack = () => import('./views/cartracking/Cartrack');  //车辆跟踪 Cartrack
const Carpath = () => import('./views/cartracking/Carpath');  //车辆轨迹 Carpath
// 车辆管理  Caradm
const Caradm = () => import('./views/caradm/Caradm');  //车辆管理 Caradm
// 保险管理 insurance
const Insurance = () => import('./views/insurance/Insurance');  //保险套餐管理 Insurance
// 商品管理 shopadm
const Banner = () => import('./views/shopadm/Banner');  //轮播管理 Banner
const Goodsadm = () => import('./views/shopadm/Goodsadm');  //商品管理 Goodsadm
// Gps终端管理 gpscmd
const Gpscmd = () => import('./views/gpscmd/Gpscmd');  //gps终端管理 Gpscmd
// 统计分析 statistical
const Sales = () => import('./views/statistical/Sales');  //商品销量统计 Sales
const Findcarnum = () => import('./views/statistical/Findcarnum');  //查询车辆新增数量 Findcarnum


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/manageusers',
      meta: { name: '首页' },
      children:[
        {
          path: '/manageusers',
          name: 'manageusers',
          component: Manageusers,
          meta: { name: '用户管理' },
        },
        {
          path: '/role',
          name: 'role',
          component: Role,
          meta: { name: '角色管理' },
        },
        {
          path: '/permissions',
          name: 'permissions',
          component: Permissions,
          meta: { name: '角色菜单授权' },
        },
        {
          path: '/cartrack',
          name: 'cartrack',
          component: Cartrack,
          meta: { name: '车辆跟踪' },
        },
        {
          path: '/carpath',
          name: 'carpath',
          component: Carpath,
          meta: { name: '车辆轨迹' },
        },
        {
          path: '/caradm',
          name: 'caradm',
          component: Caradm,
          meta: { name: '车辆管理' },
        },
        {
          path: '/insurance',
          name: 'insurance',
          component: Insurance,
          meta: { name: '保险套餐管理' },
        },
        {
          path: '/banner',
          name: 'banner',
          component: Banner,
          meta: { name: '轮播管理' },
        },
        {
          path: '/goodsadm',
          name: 'goodsadm',
          component: Goodsadm,
          meta: { name: '商品管理' },
        },
        {
          path: '/gpscmd',
          name: 'gpscmd',
          component: Gpscmd,
          meta: { name: 'Gps终端管理' },
        },
        {
          path: '/sales',
          name: 'sales',
          component: Sales,
          meta: { name: '商品销量统计' },
        },
        {
          path: '/findcarnum',
          name: 'findcarnum',
          component: Findcarnum,
          meta: { name: '查询车辆新增数量' },
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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

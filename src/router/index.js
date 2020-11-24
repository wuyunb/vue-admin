import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"login",
    hidden:true,
    meta:{
      name:'主页'
    }
  },
  {
    path: '/login',
    name: 'login',
    hidden:true,
    meta:{
      name:'登录'
    },
    component: () => import( '../views/login/index.vue') 
  },
  {
    path: '/console',
    name: 'console',
    hidden:false,
    redirect:'index',
    meta:{
      name:'控制台',
      icon:'folder'
    },
    component: () => import( '../views/layout/index.vue'),
    children:[
      {
        path: '/index',
        name: 'index',
        meta:{
          name:'首页',
          icon:'el-icon-refresh-left'
        },
        component: () => import( '../views/console/index.vue'),
      }
    ]
  },
  {
    path: '/info',
    name: 'info',
    hidden:false,
    meta:{
      name:'信息管理'
    },
    component: () => import( '../views/layout/index.vue'),
    children:[
      {
        path: '/infoIndex',
        name: 'infoIndex',
        meta:{
          name:'信息列表' 
        },
        component: () => import( '../views/info/index.vue'),
      },
      {
        path: '/infoCategory',
        name: 'infoCategory',
        meta:{
          name:'信息分类'
        },
        component: () => import( '../views/info/infoCategory.vue'),
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    hidden:false,
    meta:{
      name:'用户管理',
      icon:'user'
    },
    component: () => import( '../views/layout/index.vue'),
    children:[
      {
        path: '/userIndex',
        name: 'userIndex',
        meta:{
          name:'用户列表' 
        },
        component: () => import( '../views/user/index.vue'),
      }
    ]
  },

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

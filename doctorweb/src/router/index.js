import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import detail from '../views/detail.vue'
import prescribe from '../views/prescribe.vue'
import consultRecords from '../views/consultRecords.vue'
import prescribeApply from '../views/prescribeApply.vue'

Vue.use(VueRouter)

const routes = [ 
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/detail',
    name: 'datail',
    component: detail
  },
  {
    path: '/consultRecords',
    name: 'consultRecords',
    component: consultRecords
  },
  {
    path: '/prescribe',
    name: 'prescribe',
    component: prescribe
  },
  {
    //开处方
    path: '/prescribeApply',
    name: 'prescribeApply',
    component: prescribeApply
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

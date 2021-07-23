import Vue from 'vue'
import VueRouter from 'vue-router'
import Head from '../views/Head.vue'
import Login from '../views/login.vue'
import detail from '../views/detail.vue'
import prescribe from '../views/prescribe.vue'
import consultRecords from '../views/consultRecords.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/head',
    name: 'Head',
    component: Head
  },
 
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

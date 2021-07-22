import Vue from 'vue'
import VueRouter from 'vue-router'
import Head from '../views/Head.vue'
import Login from '../views/login.vue'
import form from '../views/form.vue'
import detail from '../views/detail.vue'
import consultRecords from '../views/consultRecords.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/head',
    name: 'Head',
    component: Head
  },
  {
    path: '/form',
    name: 'form',
    component: form
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

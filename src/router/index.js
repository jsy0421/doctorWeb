import Vue from 'vue'
import VueRouter from 'vue-router'
import Head from '../views/Head.vue'
import Login from '../views/login.vue'
import form from '../views/form.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

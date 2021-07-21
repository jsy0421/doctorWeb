import Vue from 'vue'
import VueRouter from 'vue-router'
import Head from '../views/Head.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Head',
    component: Head
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

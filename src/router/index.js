import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Feeds',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/views/Feeds')
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      '@/views/Details')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

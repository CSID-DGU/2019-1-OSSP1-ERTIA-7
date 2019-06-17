import Vue from 'vue'
import Router from 'vue-router'
import VueFire from 'vuefire'

Vue.use(Router)
Vue.use(VueFire)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    //home router
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    //about router
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    //main router
    {
      path: '/Main',
      name: 'Main',
      component: () => import('./views/Main.vue')
    },
    //user router
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/user.vue')
    }
  ]
})

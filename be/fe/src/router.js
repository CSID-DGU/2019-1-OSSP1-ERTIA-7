import Vue from 'vue'
import Router from 'vue-router'
import VueFire from 'vuefire'

Vue.use(Router)
Vue.use(VueFire)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/Main',
      name: 'Main',
      component: () => import('./views/Main.vue')
    }
  ]
})

import '@babel/polyfill'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFire from 'vuefire'

Vue.config.productionTip = false

//Vue routing
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//Googleapi config
Vue.use(VueGoogleMaps, {
  load: {

  }
})

Vue.use(VueFire)

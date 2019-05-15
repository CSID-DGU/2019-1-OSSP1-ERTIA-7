import '@babel/polyfill'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFire from 'vuefire'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: 'places,drawing'
  },
})

Vue.use(VueFire)